#!/usr/bin/env node
/* exp-dump.js — 把一卷「待寫」的題目整理成純文字，給 exp-worker.sh 塞進模型 prompt。
   用法：node tools/exp-dump.js <pid>
   每題印：題號、題幹（前面若有 psg 文章就先印【文章】）、A～D 選項、ANS、有圖的話印圖檔絕對路徑。
   另外在最前面附一則同科目已寫好的詳解當風格範例（同卷優先，沒有就找同科目代碼的其他年度）。
   模型只看得到這份，看不到題庫檔 —— 這是刻意的：每卷開新 session 只帶這卷，context 才壓得下來。 */
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
// 圖檔要印哪一台的絕對路徑：模型跑在 runner（EXP_ENGINE=agy）時要印 runner 的 clone 路徑，
// 不然它 Read 不到圖，會憑選項字母硬掰（2026-09-16 實測過）。
const FIG_ROOT = process.env.EXP_FIG_ROOT || ROOT;
const pid = process.argv[2];
if (!pid) { console.error('用法：node tools/exp-dump.js <pid>'); process.exit(2); }
const L = ['A', 'B', 'C', 'D'];
let skips = {};
try { skips = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools/exp-skips.json'), 'utf8')); } catch {}
const load = id => { global.window = {}; require(path.join(ROOT, 'js/data/exam', id + '.js')); return window.APP_EXAM_PAPERS[id]; };
const p = load(pid);
if (!p) { console.error('找不到卷：' + pid); process.exit(2); }
const sk = new Set((skips[pid] || []).map(s => s.n));
const todo = p.qs.filter(q => !q.exp && !q.void && !q.alt && !sk.has(q.n));

// 風格範例：同卷已寫的題；沒有就找同科目代碼（pid 最後一段）其他年度已寫的
let ex = p.qs.find(q => q.exp);
if (!ex) {
  const subj = pid.split('-').pop();
  for (const f of fs.readdirSync(path.join(ROOT, 'js/data/exam')).sort().reverse()) {
    if (!f.endsWith('-' + subj + '.js') || f === pid + '.js') continue;
    const o = load(f.replace(/\.js$/, ''));
    ex = o && o.qs.find(q => q.exp);
    if (ex) break;
  }
}
const out = [];
out.push(`卷：${pid}　${p.title}　待寫 ${todo.length} 題`);
if (ex) {
  out.push('', '=== 風格範例（同科目已寫好的一題）===', `#${ex.n} ${ex.q}`);
  ex.o.forEach((o, i) => out.push(`  ${L[i]}) ${o}`));
  out.push(`  ANS=${L[ex.a]}`, '--- exp ---', ex.exp, '--- end ---');
}
out.push('', '=== 待寫題目 ===');
let last = null;
for (const q of todo) {
  if (q.psg && q.psg !== last) { out.push('', '【文章】' + q.psg); last = q.psg; }
  out.push('', `#${q.n} ${q.q}`);
  q.o.forEach((o, i) => out.push(`  ${L[i]}) ${o}`));
  out.push(`  ANS=${L[q.a]}`);
  if (q.fig) out.push(`  圖檔：${path.join(FIG_ROOT, q.fig)}`);
}
console.log(out.join('\n'));
console.error(`${todo.length} 題`);
