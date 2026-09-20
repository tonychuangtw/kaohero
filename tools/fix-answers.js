#!/usr/bin/env node
/* fix-answers.js — 依 check-answers.py 找出的座標版答案，修正題庫裡存錯的正解。

   用法：node tools/fix-answers.js <bad.json> <答案PDF目錄> [--write]
     bad.json  = python3 tools/check-answers.py <目錄> --json bad.json 的輸出
   做的事：
     1. 用 zip 版答案去比對，找出是哪一卷（同一份 PDF 可能被兩個類科共用，會一起修）
     2. 把 a 改成座標版的第一個字母；同一格有兩個字母（例 "A/B"，兩個答案都給分）→ a + alt
     3. ⚠ 這題若已經寫好詳解，詳解是照錯答案寫的 → 一併清掉 exp，讓 worker 重寫
   --write 才會真的改檔；不加只印出要改什麼。

   背景見 tools/check-answers.py 檔頭：parse_answers 的 zip 配對遇到「A/B」這種
   兩個答案的格子會多抓一個字母，該列後面整排位移。 */
const fs = require('fs'), path = require('path'), cp = require('child_process');
const ROOT = path.resolve(__dirname, '..');
const [badFile, pdfDir] = process.argv.slice(2);
const WRITE = process.argv.includes('--write');
if (!badFile || !pdfDir) { console.error('用法：node tools/fix-answers.js <bad.json> <答案PDF目錄> [--write]'); process.exit(2); }
const LAB = ['A', 'B', 'C', 'D', 'E'];
const bad = JSON.parse(fs.readFileSync(badFile, 'utf8'));
const DIR = pdfDir.replace(/^~/, process.env.HOME);

// 先把全站題庫的「答案序列」建起來，用來把 PDF 對回卷
const load = pid => {
  const f = path.join(ROOT, 'js/data/exam', pid + '.js');
  delete require.cache[require.resolve(f)];
  global.window = {};
  require(f);
  return window.APP_EXAM_PAPERS[pid];
};
const pids = fs.readdirSync(path.join(ROOT, 'js/data/exam')).filter(f => f.endsWith('.js')).map(f => f.replace(/\.js$/, ''));

const pyBox = pdf => JSON.parse(cp.execSync(
  `python3 -c "import importlib.util,json,sys;` +
  `spec=importlib.util.spec_from_file_location('ca','tools/check-answers.py');` +
  `m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);` +
  `print(json.dumps(m.parse_answers_bbox(sys.argv[1])))" ${JSON.stringify(pdf)}`,
  { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 24 }));
const pyZip = pdf => JSON.parse(cp.execSync(
  `python3 -c "import sys,json;sys.path.insert(0,'tools');import parse as P;` +
  `print(json.dumps(P.parse_answers(sys.argv[1])))" ${JSON.stringify(pdf)}`,
  { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 24 }));

let totalFixed = 0, totalExpCleared = 0;
const touched = new Set();
for (const b of bad) {
  const pdf = path.join(DIR, b.pdf);
  const zip = pyZip(pdf), box = pyBox(pdf);
  // 找符合的卷：題號集合涵蓋 zip 版，而且每一題存的正解都等於 zip 版（題庫本來就是這樣建的）。
  // ⚠ zip 版可能整格漏掉（例 106_21_2 第 40 題），所以漏的那題不比、也不能拿來否決比對；
  //   題數也不能硬性相等 —— 答案表漏一格時 gen_tqa.py 仍會收，卷的題數會比 zip 多 1～2 題。
  const hits = [];
  for (const pid of pids) {
    const p = load(pid);
    if (!p) continue;
    if (Math.abs(p.qs.length - Object.keys(zip).length) > 2) continue;
    let ok = true, cmp = 0;
    for (const q of p.qs) {
      const z = zip[q.n];
      if (!z || q.void) continue;                  // 漏格與送分題不比
      cmp++;
      if (LAB[q.a] !== z) { ok = false; break; }
    }
    if (ok && cmp >= p.qs.length - 3) hits.push(pid);
  }
  if (!hits.length) { console.log(`${b.pdf}：找不到對應的卷（可能沒收錄），跳過`); continue; }
  for (const pid of hits) {
    const p = load(pid);
    const changes = [];
    for (const q of p.qs) {
      const v = box[q.n];
      if (!v) continue;
      const letters = String(v).split('/').filter(x => LAB.includes(x));
      if (!letters.length) continue;
      const a = LAB.indexOf(letters[0]);
      const alt = letters.slice(1).map(x => LAB.indexOf(x)).filter(i => i >= 0 && i !== a);
      const oldA = q.a, oldAlt = (q.alt || []).join(',');
      // void 也要比：zip 版漏格時 gen_tqa 會把該題存成 a=0+void（當送分），
      // 座標版讀得到答案就該還原成一般題（例 106_21_2 第 40 題）
      if (oldA === a && oldAlt === alt.join(',') && !q.void) continue;
      changes.push(`#${q.n} ${q.void ? '送分' : LAB[oldA] + (oldAlt ? '(+' + oldAlt + ')' : '')} → ${letters.join('/')}` +
        (q.exp ? '（已有詳解，一併清掉）' : ''));
      q.a = a;
      if (alt.length) q.alt = alt; else delete q.alt;
      if (q.void) delete q.void;                   // 有明確答案了就不是送分題
      if (q.exp) { delete q.exp; totalExpCleared++; }   // 照錯答案寫的詳解一定要清掉
      totalFixed++;
    }
    if (!changes.length) continue;
    console.log(`${pid}（${b.pdf}）：${changes.join('；')}`);
    touched.add(pid);
    if (WRITE) {
      const f = path.join(ROOT, 'js/data/exam', pid + '.js');
      const head = fs.readFileSync(f, 'utf8').split('window.APP_EXAM_PAPERS =')[0];
      fs.writeFileSync(f, head + 'window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};\n' +
        `window.APP_EXAM_PAPERS['${pid}'] = ` + JSON.stringify(p, null, 1) + ';\n', 'utf8');
    }
  }
}
console.log(`\n${WRITE ? '已修正' : '待修正'} ${totalFixed} 題、清掉 ${totalExpCleared} 則照錯答案寫的詳解，涉及 ${touched.size} 卷` +
  (WRITE ? '' : '（未加 --write，尚未寫入）'));
