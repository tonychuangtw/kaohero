#!/usr/bin/env node
/* exp-skip-add.js — 把模型回報「寫不出來」的題記進 tools/exp-skips.json（exp-next／exp-dump 會排除）。
   用法：node tools/exp-skip-add.js <pid> <skip.json>   skip.json 格式 [{"n":題號,"reason":"…"}]
   只收本卷真的存在、目前沒有 exp 的題號；重複的以新理由覆蓋。印出實際新增的筆數。 */
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const [pid, file] = process.argv.slice(2);
if (!pid || !file) { console.error('用法：node tools/exp-skip-add.js <pid> <skip.json>'); process.exit(2); }
const F = path.join(ROOT, 'tools/exp-skips.json');
let all = {}; try { all = JSON.parse(fs.readFileSync(F, 'utf8')); } catch {}
let list = []; try { list = JSON.parse(fs.readFileSync(file, 'utf8')); } catch { list = []; }
if (!Array.isArray(list)) list = [];
global.window = {}; require(path.join(ROOT, 'js/data/exam', pid + '.js'));
const p = window.APP_EXAM_PAPERS[pid];
const cur = new Map((all[pid] || []).map(s => [s.n, s]));
let added = 0;
for (const s of list) {
  const n = parseInt(s.n, 10);
  const q = p && p.qs.find(z => z.n === n);
  if (!q || q.exp) continue;
  cur.set(n, { n, reason: String(s.reason || '').slice(0, 120), at: new Date().toISOString().slice(0, 10) });
  added++;
}
if (cur.size) all[pid] = [...cur.values()].sort((a, b) => a.n - b.n); else delete all[pid];
const sorted = {}; Object.keys(all).sort().forEach(k => sorted[k] = all[k]);
fs.writeFileSync(F, JSON.stringify(sorted, null, 1) + '\n');
console.log(added);
