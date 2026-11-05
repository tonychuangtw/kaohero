#!/usr/bin/env node
/* release-next.js — 每日小更新：看／放出待上架區（tools/release-queue.json）的下一組。
   用法：node tools/release-next.js            看下一組準備好了沒（不改檔）
         node tools/release-next.js --pop      下一組準備好就移到 done（之後要 build-index、build-pages）
         node tools/release-next.js --pop --force   詳解沒寫完也放
   「準備好」＝那組每一卷都沒有「可寫但未寫」的題（判法同 exp-next.js：排除廢題、多答案、exp-skips 記過的題）。
   輸出一行 JSON：{name, pids, ready, left, queued}；--pop 成功時多 popped:true。 */
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const QF = path.join(ROOT, 'tools/release-queue.json');
const args = process.argv.slice(2);
const Q = JSON.parse(fs.readFileSync(QF, 'utf8'));
let skips = {};
try { skips = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools/exp-skips.json'), 'utf8')); } catch {}

const g = Q.queue[0];
if (!g) { console.log(JSON.stringify({ queued: 0 })); process.exit(0); }

let left = 0;
global.window = {};
g.pids.forEach(pid => {
  const f = path.join(ROOT, 'js/data/exam', pid + '.js');
  if (!fs.existsSync(f)) { left += 999; return; }
  require(f);
  const p = window.APP_EXAM_PAPERS[pid];
  const sk = new Set((skips[pid] || []).map(s => s.n));
  left += p.qs.filter(q => !q.exp && !q.void && !q.alt && !sk.has(q.n)).length;
});
const out = { name: g.name, pids: g.pids, ready: left === 0, left, queued: Q.queue.length };
if (args.includes('--pop') && (out.ready || args.includes('--force'))) {
  Q.queue.shift();
  Q.done.push({ name: g.name, n: g.pids.length,
    day: new Date(Date.now() + 8 * 3600e3).toISOString().slice(0, 10) });
  fs.writeFileSync(QF, JSON.stringify(Q, null, 1) + '\n');
  out.popped = true;
}
console.log(JSON.stringify(out));
