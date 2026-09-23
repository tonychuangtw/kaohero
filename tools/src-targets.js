#!/usr/bin/env node
/* src-targets.js — 找出「有詳解，但 📚 出處那一行歸不出考點」的題。

   用法：
     node tools/src-targets.js --papers            # 每卷一行：pid 待修題數 標題（按待修數多的排前面）
     node tools/src-targets.js --dump <pid>        # 倒出該卷要修的題（題目＋現有詳解），給模型看
     node tools/src-targets.js --subj dent1,ot1    # 只看這些科目（預設就是下面 POOR 那幾科）
     node tools/src-targets.js --all               # 不限科目

   判準直接用 js/diagnose.js 的 topicOf()：它回 null 就代表弱點診斷抓不到考點。
   最常見的原因是出處只寫書名版次（「Moore《Clinically Oriented Anatomy》第 8 版」），
   沒有章節名 → 診斷表上只會看到一排書名，補弱題單也抽不到題（2026-09-21 抽查結論）。

   POOR＝2026-09-21 topic-audit 評為「差」的 8 科（覆蓋率 6～34%），先修這些最有感。 */
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const POOR = ['dent1', 'dent2', 'dent3', 'dent4', 'dent5', 'dent6', 'ot1', 'nut1'];
const LAB = ['A', 'B', 'C', 'D'];

const w = {};
new Function('window', fs.readFileSync(path.join(ROOT, 'js/diagnose.js'), 'utf8'))(w);
const topicOf = w.KHDiag.topicOf;

global.window = {};
require(path.join(ROOT, 'js/data/exams.js'));
const EXAMS = window.APP_EXAMS;
const subjs = args.includes('--all') ? null : new Set(opt('--subj', POOR.join(',')).split(','));
const load = pid => { require(path.join(ROOT, 'js/data/exam', pid + '.js')); return window.APP_EXAM_PAPERS[pid]; };

if (args.includes('--dump')) {
  const pid = opt('--dump', '');
  const p = load(pid);
  if (!p) { console.error('沒有這一卷：' + pid); process.exit(2); }
  const out = p.qs.filter(q => q.exp && !topicOf(q)).map(q => [
    `### #${q.n}`,
    q.q,
    ...(q.o || []).map((o, i) => `  ${LAB[i]}) ${o}`),
    `正解：${LAB[q.a]}`,
    `現有詳解最後一行：${(q.exp.split('\n').pop() || '').trim()}`,
  ].join('\n')).join('\n\n');
  console.log(out);
  process.exit(0);
}

const rows = [];
for (const e of EXAMS) {
  if (subjs && !subjs.has(e.subj)) continue;
  const p = load(e.id);
  if (!p) continue;
  const n = p.qs.filter(q => q.exp && !topicOf(q)).length;
  if (n) rows.push([e.id, n, p.title]);
}
rows.sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? 1 : -1));
const lim = parseInt(opt('--limit', '0'), 10);
(lim ? rows.slice(0, lim) : rows).forEach(r => console.log(r.join(' ')));
console.error('%d 卷、%d 題出處歸不出考點', rows.length, rows.reduce((a, b) => a + b[1], 0));
