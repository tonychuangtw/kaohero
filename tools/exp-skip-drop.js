#!/usr/bin/env node
/* exp-skip-drop.js — 把 tools/exp-skips.json 裡「暫時延後」的題放回待寫佇列。
   用法：node tools/exp-skip-drop.js --reason-match '^DEFER' [--match '^tou-'] [--write]
     --reason-match  要清掉的 skip 理由（正規式，比對 reason 欄）
     --match         只處理符合這個正規式的卷（預設全部）
     不加 --write 只列出會清掉哪些，不動檔案。

   為什麼要有（2026-09-18）：DeepSeek 引擎讀不了圖，有圖的題會先記成 DEFER-FIG 跳過，
   否則那一卷永遠有未寫題、worker 每輪都再挑到它、無限重做。等文字題整批跑完，
   用這支把 DEFER-* 的題放回佇列，再把引擎切回 claude 補圖片題。
   真正「寫不出來」的題（轉檔毀損、官方答案有疑義）理由不是 DEFER 開頭，不會被這支清掉。 */
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const WRITE = args.includes('--write');
const reasonRe = new RegExp(opt('--reason-match', '^DEFER'));
const pidRe = new RegExp(opt('--match', '.'));
const F = path.join(ROOT, 'tools/exp-skips.json');
let all = {};
try { all = JSON.parse(fs.readFileSync(F, 'utf8')); } catch { console.error('讀不到 ' + F); process.exit(2); }
let papers = 0, qs = 0;
for (const pid of Object.keys(all)) {
  if (!pidRe.test(pid)) continue;
  const keep = all[pid].filter(s => !reasonRe.test(String(s.reason || '')));
  const drop = all[pid].length - keep.length;
  if (!drop) continue;
  papers++; qs += drop;
  console.log(`${pid} 放回 ${drop} 題`);
  if (keep.length) all[pid] = keep; else delete all[pid];
}
console.log(`共 ${papers} 卷、${qs} 題${WRITE ? '，已放回佇列' : '（未加 --write，沒有真的改）'}`);
if (WRITE && qs) {
  const sorted = {}; Object.keys(all).sort().forEach(k => sorted[k] = all[k]);
  fs.writeFileSync(F, JSON.stringify(sorted, null, 1) + '\n');
}
