#!/usr/bin/env node
/* exp-skip-drop.js — 把 tools/exp-skips.json 裡「暫時延後」的題放回待寫佇列。
   用法：node tools/exp-skip-drop.js --reason-match '^DEFER' [--match '^tou-'] [--write]
     --reason-match  要清掉的 skip 理由（正規式，比對 reason 欄）
     --only <json>   只放回這個檔案列到的題：{pid: [題號…]} 或 {pid: {題號: …}}。
                     搭配 --has-fig 用，才不會把「本來就有圖、但圖看不清楚而跳過」的題也放回去
                     （那種放回去 worker 只會再跳過一次，白跑一輪）。
     --has-fig       改成「這一題現在已經有圖了就放回」（不看 reason）。
                     2026-09-23 回頭補圖那批用這個：當初跳過的理由是「圖沒有隨轉檔保留」，
                     圖補上去之後這些題就答得了，也寫得出詳解了。
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
const HASFIG = args.includes('--has-fig');
const onlyF = opt('--only', '');
const only = onlyF ? JSON.parse(fs.readFileSync(onlyF, 'utf8')) : null;
const onlyNs = pid => {
  if (!only || !only[pid]) return null;
  const v = only[pid];
  return new Set((Array.isArray(v) ? v : Object.keys(v)).map(Number));
};
const figOf = pid => {           // pid → 這一卷「已經有圖」的題號集合
  const f = path.join(ROOT, 'js/data/exam', pid + '.js');
  if (!fs.existsSync(f)) return new Set();
  global.window = {};
  delete require.cache[require.resolve(f)];
  require(f);
  const p = window.APP_EXAM_PAPERS[pid];
  return new Set((p ? p.qs : []).filter(q => q.fig && !q.exp).map(q => q.n));
};
const F = path.join(ROOT, 'tools/exp-skips.json');
let all = {};
try { all = JSON.parse(fs.readFileSync(F, 'utf8')); } catch { console.error('讀不到 ' + F); process.exit(2); }
let papers = 0, qs = 0;
for (const pid of Object.keys(all)) {
  if (!pidRe.test(pid)) continue;
  const lim = onlyNs(pid);
  if (only && !lim) continue;
  const has = HASFIG ? figOf(pid) : null;
  const keep = all[pid].filter(s => (lim && !lim.has(s.n)) ? true
    : (HASFIG ? !has.has(s.n) : !reasonRe.test(String(s.reason || ''))));
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
