#!/usr/bin/env node
/* set-note.js — 寫「勘誤提醒」（q.note）到題庫。

   用法：node tools/set-note.js <patch.json> [--write]
   patch：[{pid, n, note}]

   這是給「寫不出正常詳解」的題用的第二條路（2026-09-23 Tony「全都做」的第二項）：
   官方公布的答案與現行法規或教科書衝突、或修法後變成兩個選項都對。
   這種題不能照 ✅／❌ 三行的格式硬寫（會寫出誤導內容），但也不該在站上留一片空白——
   考生自己算出「答案好像是別的」時，最需要有人告訴他官方答案是什麼、現在的法條又是什麼。

   格式規則（本檔會擋）：
   - 第一個字是 ⚠
   - 要寫到「官方」與「答案」（必須明講官方公布的答案是哪一個）
   - 40～400 字，最多 4 行
   - 不可以出現 ✅／❌／📚（那是詳解的格式，兩種混在一起前端會分不清）

   寫完記得：node tools/build-index.js --write && node test/test.js
   ⚠ note 不算「自撰詳解」，首頁與卷卡片的詳解數不會因此增加（那個數字只數 q.exp）。 */
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const WRITE = process.argv.includes('--write');
const src = process.argv[2];
if (!src) { console.log('用法：node tools/set-note.js <patch.json> [--write]'); process.exit(1); }
const patch = JSON.parse(fs.readFileSync(src, 'utf8'));
const byPid = {};
patch.forEach(p => (byPid[p.pid] = byPid[p.pid] || []).push(p));
const errs = [];
let done = 0, papers = 0;
for (const pid of Object.keys(byPid)) {
  const f = path.join(ROOT, 'js/data/exam', pid + '.js');
  if (!fs.existsSync(f)) { errs.push(pid + '：沒有這一卷'); continue; }
  global.window = {};
  delete require.cache[require.resolve(f)];
  require(f);
  const paper = window.APP_EXAM_PAPERS[pid];
  let touched = 0;
  byPid[pid].forEach(p => {
    const q = paper.qs.find(q => q.n === p.n);
    if (!q) { errs.push(`${pid} #${p.n}：卷裡沒有這一題`); return; }
    const t = (p.note || '').trim();
    if (t[0] !== '⚠') { errs.push(`${pid} #${p.n}：開頭要是 ⚠`); return; }
    if (!/官方/.test(t) || !/答案/.test(t)) { errs.push(`${pid} #${p.n}：要明講官方公布的答案是哪一個`); return; }
    if (t.length < 40 || t.length > 400) { errs.push(`${pid} #${p.n}：長度 ${t.length}，要 40～400 字`); return; }
    if (t.split('\n').length > 4) { errs.push(`${pid} #${p.n}：最多 4 行`); return; }
    if (/[✅❌📚]/.test(t)) { errs.push(`${pid} #${p.n}：勘誤提醒不要用 ✅／❌／📚`); return; }
    if (q.exp) { errs.push(`${pid} #${p.n}：這題已經有詳解了，不要再加勘誤提醒`); return; }
    q.note = t; done++; touched++;
  });
  if (WRITE && touched && !errs.length) {
    const head = fs.readFileSync(f, 'utf8').split('window.APP_EXAM_PAPERS =')[0];
    fs.writeFileSync(f, head + 'window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};\n' +
      `window.APP_EXAM_PAPERS['${pid}'] = ` + JSON.stringify(paper, null, 1) + ';\n', 'utf8');
    papers++;
  }
}
if (errs.length) errs.slice(0, 20).forEach(e => console.log('  ✗ ' + e));
console.log(`${WRITE ? '已寫入' : '試跑'}：${done} 題勘誤提醒、${papers} 卷改寫${errs.length ? `、問題 ${errs.length} 筆` : ''}`);
process.exit(errs.length ? 1 : 0);
