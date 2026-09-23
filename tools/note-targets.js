#!/usr/bin/env node
/* note-targets.js — 列出「該寫勘誤提醒」的題，並把題目內容一起倒出來給模型看。

   用法：node tools/note-targets.js [--out <檔>] [--limit N] [--skip N] [--list]
     --list  只印 pid #題號 與當初跳過的理由（不含題目全文）

   挑的是 exp-skips.json 裡「官方答案與現行法規衝突／修法後答案不唯一」那一類，
   排除掉圖表毀損、轉檔壞掉那種（那種要走補圖或直接放棄）。

   ⚠ 當初記下來的理由是模型寫的，裡面的法條條號不一定可靠
     （2026-09-18 已知 DeepSeek 會掰條號），所以輸出裡標成「當初的判斷（要自己重新確認）」，
     prompt 也要求重新查證後再寫。 */
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const LAB = ['A', 'B', 'C', 'D'];
const YES = /修正|現行|已廢止|修法|改制|已更名|舊法|不唯一|均給分|送分|存疑|衝突|皆正確|皆錯誤|兩個選項|答案有誤/;
const NO = /圖|轉檔|毀損|未隨|缺公式|亂碼/;
const skips = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools/exp-skips.json'), 'utf8'));
const rows = [];
for (const pid of Object.keys(skips).sort()) {
  const hits = skips[pid].filter(s => YES.test(s.reason || '') && !NO.test(s.reason || ''));
  if (!hits.length) continue;
  const f = path.join(ROOT, 'js/data/exam', pid + '.js');
  if (!fs.existsSync(f)) continue;
  global.window = {};
  require(f);
  const p = window.APP_EXAM_PAPERS[pid];
  hits.forEach(h => {
    const q = p.qs.find(q => q.n === h.n);
    if (!q || q.exp || q.note) return;
    rows.push({ pid, n: h.n, title: p.title, subj: p.subjName, roc: p.roc,
                q: q.q, o: q.o, ans: LAB[q.a], why: h.reason });
  });
}
const skip = parseInt(opt('--skip', '0'), 10), limit = parseInt(opt('--limit', '0'), 10);
const use = rows.slice(skip, limit ? skip + limit : undefined);
let out;
if (args.includes('--list')) {
  out = use.map(r => `${r.pid} #${r.n}　${r.why}`).join('\n');
} else {
  out = use.map(r => [
    `### ${r.pid} #${r.n}　${r.roc} 年　${r.subj}`,
    r.q,
    ...r.o.map((o, i) => `  ${LAB[i]}) ${o}`),
    `官方公布答案：${r.ans}`,
    `當初跳過的判斷（要自己重新確認，條號可能是錯的）：${r.why}`,
  ].join('\n')).join('\n\n');
}
const dest = opt('--out', '');
if (dest) { fs.writeFileSync(dest, out + '\n'); console.log(`${use.length} 題（全部 ${rows.length}）→ ${dest}`); }
else console.log(out);
