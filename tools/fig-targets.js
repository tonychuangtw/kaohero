#!/usr/bin/env node
/* fig-targets.js — 列出「題目文字明講要看圖／看表，卻沒有 fig 圖檔」而被跳過的題。
   這些題在站上是答不了的（看不到圖），但原始 PDF 裡圖還在，可以回頭裁圖補上。

   用法：node tools/fig-targets.js [--out <json>] [--match <pid 正規式>]
   輸出：{ "<pid>": [題號, ...] }，預設印到 stdout。

   判定：沒有 exp、沒有 void／alt、在 exp-skips.json 裡、沒有 fig，
   而且題幹或選項裡出現「下圖／附圖／如表／Figure…」這類字眼。
   ⚠ 不要改成只看 exp-skips.json 的 reason 文字：那是模型寫的自由格式，
     「考績表」「圖利罪」都會被誤判成要看圖（2026-09-23 試過一次）。 */
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const match = new RegExp(opt('--match', '.'));
const FIG = /下圖|上圖|右圖|左圖|如圖|附圖|圖中|圖示|下表|如表|圖形|圖\s*[一二三四12345]|Figure|figure/;
let skips = {};
try { skips = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools/exp-skips.json'), 'utf8')); } catch {}
const out = {};
for (const f of fs.readdirSync(path.join(ROOT, 'js/data/exam'))) {
  if (!f.endsWith('.js')) continue;
  const pid = f.replace(/\.js$/, '');
  if (!match.test(pid)) continue;
  global.window = {};
  require(path.join(ROOT, 'js/data/exam', f));
  const p = window.APP_EXAM_PAPERS[pid];
  if (!p) continue;
  const sk = new Set((skips[pid] || []).map(s => s.n));
  const ns = p.qs.filter(q => !q.exp && !q.void && !q.alt && !q.fig && sk.has(q.n)
                              && FIG.test((q.q || '') + (q.o || []).join(''))).map(q => q.n);
  if (ns.length) out[pid] = ns;
}
const dest = opt('--out', '');
const js = JSON.stringify(out, null, 0);
if (dest) { fs.writeFileSync(dest, js); console.log('%d 卷 %d 題 → %s', Object.keys(out).length,
  Object.values(out).reduce((a, b) => a + b.length, 0), dest); }
else console.log(js);
