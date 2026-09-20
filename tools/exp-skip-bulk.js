#!/usr/bin/env node
/* exp-skip-bulk.js — 跨卷版的 exp-skip-add.js：一個 skip.json 裡可以有很多卷的題。
   用法：node tools/exp-skip-bulk.js <skip.json>
   skip.json 格式：[{"pid":"chu-106-1-e017","n":8,"reason":"…"}, ...]
   只收真的存在、目前沒有 exp 的題號；重複的以新理由覆蓋。印出實際新增的筆數。
   （exp-batch.sh 用；逐卷的 exp-worker.sh 仍用 exp-skip-add.js） */
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const file = process.argv[2];
if (!file) { console.error('用法：node tools/exp-skip-bulk.js <skip.json>'); process.exit(2); }
const F = path.join(ROOT, 'tools/exp-skips.json');
let all = {}; try { all = JSON.parse(fs.readFileSync(F, 'utf8')); } catch {}
let list = []; try { list = JSON.parse(fs.readFileSync(file, 'utf8')); } catch { list = []; }
if (!Array.isArray(list)) list = [];
const today = new Date().toISOString().slice(0, 10);
const papers = {};
const load = pid => {
  if (pid in papers) return papers[pid];
  const f = path.join(ROOT, 'js/data/exam', pid + '.js');
  if (!fs.existsSync(f)) return (papers[pid] = null);
  global.window = {}; require(f);
  return (papers[pid] = window.APP_EXAM_PAPERS[pid] || null);
};
let added = 0;
for (const s of list) {
  const pid = String(s.pid || ''), n = parseInt(s.n, 10);
  const p = load(pid);
  const q = p && p.qs.find(z => z.n === n);
  if (!q || q.exp) continue;
  const cur = new Map((all[pid] || []).map(x => [x.n, x]));
  cur.set(n, { n, reason: String(s.reason || '').slice(0, 120), at: today });
  all[pid] = [...cur.values()].sort((a, b) => a.n - b.n);
  added++;
}
const sorted = {}; Object.keys(all).sort().forEach(k => sorted[k] = all[k]);
fs.writeFileSync(F, JSON.stringify(sorted, null, 1) + '\n');
console.log(added);
