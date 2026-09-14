#!/usr/bin/env node
/* exp-next.js — 列出還有「可寫但未寫」詳解的卷，給 exp-worker.sh 挑下一卷用。
   用法：node tools/exp-next.js [--match <pid 正規式>] [--limit N]
   輸出：每行 "pid 待寫題數 標題"，pid 由新到舊（字串倒序：年份大的先）。
   排除：q.exp 已有、q.void 廢題、q.alt、以及 tools/exp-skips.json 記錄過「寫不出來」的題。
   為什麼要有 skips 檔：以前跳過的題只寫在 commit message 裡，worker 每輪都會再挑到同一卷、再問一次模型。
   記進檔案才不會無限重試（2026-09-14 每卷新 session 改制時加）。 */
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const match = new RegExp(opt('--match', '.'));
const limit = parseInt(opt('--limit', '0'), 10) || 0;
let skips = {};
try { skips = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools/exp-skips.json'), 'utf8')); } catch {}
const rows = [];
for (const f of fs.readdirSync(path.join(ROOT, 'js/data/exam'))) {
  if (!f.endsWith('.js')) continue;
  const pid = f.replace(/\.js$/, '');
  if (!match.test(pid)) continue;
  global.window = {};
  require(path.join(ROOT, 'js/data/exam', f));
  const p = window.APP_EXAM_PAPERS[pid];
  if (!p) continue;
  const sk = new Set((skips[pid] || []).map(s => s.n));
  const n = p.qs.filter(q => !q.exp && !q.void && !q.alt && !sk.has(q.n)).length;
  if (n) rows.push([pid, n, p.title]);
}
rows.sort((a, b) => (a[0] < b[0] ? 1 : a[0] > b[0] ? -1 : 0));
(limit ? rows.slice(0, limit) : rows).forEach(r => console.log(r.join(' ')));
console.error(`剩 ${rows.length} 卷、${rows.reduce((a, b) => a + b[1], 0)} 題`);
