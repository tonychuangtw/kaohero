#!/usr/bin/env node
/* exp-dump.js — 把一卷「待寫」的題目整理成純文字，給 exp-worker.sh 塞進模型 prompt。
   用法：node tools/exp-dump.js <pid> [--only 1,2,3] [--from N --count M] [--skip-fig] [--list]
     --only    只印這幾題（給 deepseek 引擎切段、重試用）
     --from/--count  待寫清單的第 N 題起、共 M 題（1 起算）
     --skip-fig      跳過有圖檔的題（純文字 API 讀不了圖）
     --list          不印題目，改印 JSON 清單 [{"n":題號,"fig":true/false}]
   每題印：題號、題幹（前面若有 psg 文章就先印【文章】）、A～D 選項、ANS、有圖的話印圖檔絕對路徑。
   另外在最前面附一則同科目已寫好的詳解當風格範例（同卷優先，沒有就找同科目代碼的其他年度）。
   模型只看得到這份，看不到題庫檔 —— 這是刻意的：每卷開新 session 只帶這卷，context 才壓得下來。 */
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const { isForeignProse } = require('./exp-lang.js');
// 圖檔要印哪一台的絕對路徑：模型跑在 runner（EXP_ENGINE=agy）時要印 runner 的 clone 路徑，
// 不然它 Read 不到圖，會憑選項字母硬掰（2026-09-16 實測過）。
const FIG_ROOT = process.env.EXP_FIG_ROOT || ROOT;
const argv = process.argv.slice(2);
const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d; };
const has = k => argv.includes(k);
const VAL = new Set(['--only', '--from', '--count']);   // 這幾個旗標後面跟的是值，不是 pid
let pid = null;
for (let i = 0; i < argv.length; i++) {
  if (VAL.has(argv[i])) { i++; continue; }
  if (!argv[i].startsWith('--') && !pid) pid = argv[i];
}
if (!pid) { console.error('用法：node tools/exp-dump.js <pid> [--only 1,2,3] [--from N --count M] [--skip-fig] [--list]'); process.exit(2); }
const only = opt('--only', '') ? new Set(String(opt('--only')).split(',').map(x => parseInt(x, 10))) : null;
const from = parseInt(opt('--from', '1'), 10) || 1;
const count = parseInt(opt('--count', '0'), 10) || 0;
const L = ['A', 'B', 'C', 'D'];
let skips = {};
try { skips = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools/exp-skips.json'), 'utf8')); } catch {}
const load = id => { global.window = {}; require(path.join(ROOT, 'js/data/exam', id + '.js')); return window.APP_EXAM_PAPERS[id]; };
const p = load(pid);
if (!p) { console.error('找不到卷：' + pid); process.exit(2); }
const sk = new Set((skips[pid] || []).map(s => s.n));
let todo = p.qs.filter(q => !q.exp && !q.void && !q.alt && !sk.has(q.n));
if (has('--list')) { console.log(JSON.stringify(todo.map(q => ({ n: q.n, fig: !!q.fig })))); process.exit(0); }
if (has('--skip-fig')) todo = todo.filter(q => !q.fig);
if (only) todo = todo.filter(q => only.has(q.n));
else if (count) todo = todo.slice(from - 1, from - 1 + count);

// 風格範例：同卷已寫的題；沒有就找同科目代碼（pid 最後一段）其他年度已寫的。
// ⚠ 範例本身若是「整段用日文／韓文寫的解析」就不能拿來當範例：模型會照抄範例的語言，
// 一卷寫成日文後同科目後面每一卷都跟著寫成日文，一路繁殖（2026-09-18 Tony 抓到，
// tou-110-1-d005 80 題、tou-106-1-l005 76 題全中）。挑範例時用 exp-lang.js 濾掉。
const ok = q => q.exp && !isForeignProse(q.exp);
let ex = p.qs.find(ok);
if (!ex) {
  const subj = pid.split('-').pop();
  for (const f of fs.readdirSync(path.join(ROOT, 'js/data/exam')).sort().reverse()) {
    if (!f.endsWith('-' + subj + '.js') || f === pid + '.js') continue;
    const o = load(f.replace(/\.js$/, ''));
    ex = o && o.qs.find(ok);
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
