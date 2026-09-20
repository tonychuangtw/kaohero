#!/usr/bin/env node
/* exp-batch-dump.js — 跨卷挑「還沒寫詳解」的題，湊成一批印給模型看。

   為什麼要有這支（2026-09-20）：
     舊科目補寫時，剩下的題散在 675 卷裡、每卷只剩 1～2 題。用 exp-worker.sh 逐卷做，
     每卷都要為了 1 題把整卷 80 題塞進 context，實測每卷約 $0.37、828 卷估 $300。
     改成跨卷湊批（一次 15 題，各來自不同卷）後，同樣 1,595 題估 $40 上下。
     ⛔ 一整卷都沒寫的新科目仍然走 exp-worker.sh —— 那種情況逐卷才對（同卷共用 context 才划算）。

   用法：node tools/exp-batch-dump.js --match <pid 正規式> [--mode text|fig|nofig] [--size N]
                                      [--manifest <路徑>] [--fig-root <路徑>] [--count]
     --mode text   純文字、沒有圖檔、題幹也沒提到圖表 → 直接寫（預設，一批 15 題）
     --mode fig    題目物件有 fig 圖檔 → 模型要 Read 那個 webp 再寫（一批 6 題）
     --mode nofig  題幹提到圖／表但物件裡沒有 fig → 十之八九是轉檔時圖沒留下來，
                   交給模型確認「真的要看圖才能答」就記跳過，看得懂的還是要寫（一批 40 題）
     --count       只印各 mode 還剩幾題，不印題目
     --manifest    把這一批的 [{pid,n}] 寫成 JSON，給 exp-batch.sh 對帳用

   排除：q.exp 已有、q.void 廢題、q.alt、tools/exp-skips.json 記錄過的題（同 exp-next.js）。
   永遠取清單最前面 N 題：寫完的會自動從清單消失，所以不需要 offset。 */
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const { isForeignProse } = require('./exp-lang.js');

const argv = process.argv.slice(2);
const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d; };
const has = k => argv.includes(k);
const match = new RegExp(opt('--match', '.'));
const mode = opt('--mode', 'text');
const SIZE_DEFAULT = { text: 15, fig: 6, nofig: 40 };
const size = parseInt(opt('--size', String(SIZE_DEFAULT[mode] || 15)), 10);
const FIG_ROOT = opt('--fig-root', process.env.EXP_FIG_ROOT || ROOT);
const manifest = opt('--manifest', '');
const L = ['A', 'B', 'C', 'D'];

/* 「題幹要看圖表、但檔案裡沒有圖」的判斷式。
   只用來分流（決定這題進 text 批還是 nofig 批），不會自己寫進 exp-skips.json ——
   誤判的代價是「該寫的題被永久藏起來」，所以最後仍由模型逐題確認。
   ⚠ 不要簡化成 /[圖表]/：「企圖」「圖書館學」「代表」都會中。 */
const FIGRE = /下[圖表]|上[圖表]|右[圖表]|左[圖表]|如[下上右左]?[圖表]|附[圖表]|圖中|表中|該[圖表]|本[圖表]|此[圖表]|莖葉圖|直方圖|示意圖|折線圖|長條圖|下列.{0,4}[圖表]|【圖|［圖|\(圖|（圖/;

let skips = {};
try { skips = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools/exp-skips.json'), 'utf8')); } catch {}

// 挑風格範例時會再讀一次掃描階段已經讀過的檔，require 有快取 → 第二次不會重新塞 window，
// 拿到的是 undefined。每次都先清快取（2026-09-20 踩到 "Cannot read properties of undefined"）。
const load = id => {
  const f = path.join(ROOT, 'js/data/exam', id + '.js');
  if (!fs.existsSync(f)) return null;
  delete require.cache[require.resolve(f)];
  global.window = {};
  require(f);
  return (global.window.APP_EXAM_PAPERS || {})[id] || null;
};

const classify = q => {
  if (q.fig) return 'fig';
  const txt = String(q.q || '') + ' ' + (q.o || []).join(' ');
  if ((q.o || []).some(o => !String(o).trim())) return 'nofig';   // 選項空白又沒圖＝轉檔掉了
  return FIGRE.test(txt) ? 'nofig' : 'text';
};

const pool = { text: [], fig: [], nofig: [] };
const files = fs.readdirSync(path.join(ROOT, 'js/data/exam')).filter(f => f.endsWith('.js')).sort().reverse();
for (const f of files) {
  const pid = f.replace(/\.js$/, '');
  if (!match.test(pid)) continue;
  const p = load(pid);
  if (!p) continue;
  const sk = new Set((skips[pid] || []).map(s => s.n));
  for (const q of p.qs) {
    if (q.exp || q.void || q.alt || sk.has(q.n)) continue;
    pool[classify(q)].push({ pid, title: p.title, q });
  }
}

if (has('--count')) {
  console.log(JSON.stringify({ text: pool.text.length, fig: pool.fig.length, nofig: pool.nofig.length }));
  process.exit(0);
}

const batch = (pool[mode] || []).slice(0, size);
if (!batch.length) { console.error('本 mode 已無待處理題'); process.exit(3); }

/* 風格範例：優先挑同科目代碼（pid 最後一段）已寫好的一題，挑不到就全站找一題。
   ⚠ 不能挑「整段用外語寫的解析」當範例，模型會照抄語言（2026-09-18 的教訓，見 exp-dump.js）。 */
const okEx = q => q.exp && !isForeignProse(q.exp);
let ex = null, exPid = null;
const subj = batch[0].pid.split('-').pop();
for (const f of files) {
  if (!f.endsWith('-' + subj + '.js')) continue;
  const id = f.replace(/\.js$/, ''), o = load(id);
  const e = o && o.qs.find(okEx);
  if (e) { ex = e; exPid = id; break; }
}
if (!ex) for (const f of files) {
  const id = f.replace(/\.js$/, ''), o = load(id);
  const e = o && o.qs.find(okEx);
  if (e) { ex = e; exPid = id; break; }
}

const out = [];
if (ex) {
  out.push('=== 風格範例（站上已寫好的一題，只看格式與語氣，不要照抄內容）===', `${exPid} #${ex.n} ${ex.q}`);
  ex.o.forEach((o, i) => out.push(`  ${L[i]}) ${o}`));
  out.push(`  ANS=${L[ex.a]}`, '--- exp ---', ex.exp, '--- end ---', '');
}
out.push(`=== 本批題目（${batch.length} 題，來自 ${new Set(batch.map(b => b.pid)).size} 卷）===`);
let lastPid = null;
for (const b of batch) {
  const q = b.q;
  if (b.pid !== lastPid) { out.push('', `【卷 ${b.pid}】${b.title}`); lastPid = b.pid; }
  if (q.psg) out.push('【文章】' + q.psg);
  out.push('', `pid=${b.pid} n=${q.n}`, `題目：${q.q}`);
  q.o.forEach((o, i) => out.push(`  ${L[i]}) ${o}`));
  out.push(`  ANS=${L[q.a]}`);
  if (q.fig) out.push(`  圖檔：${path.join(FIG_ROOT, q.fig)}`);
}
console.log(out.join('\n'));
if (manifest) fs.writeFileSync(manifest, JSON.stringify(batch.map(b => ({ pid: b.pid, n: b.q.n })), null, 1));
console.error(`${batch.length} 題（mode=${mode}，剩 text=${pool.text.length} fig=${pool.fig.length} nofig=${pool.nofig.length}）`);
