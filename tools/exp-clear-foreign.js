#!/usr/bin/env node
/* exp-clear-foreign.js — 清掉「整段用日文／韓文寫的」詳解，讓 worker 依修好的 prompt 重寫。
   用法：node tools/exp-clear-foreign.js [--match <pid 正規式>] [--write]
   判斷交給 exp-lang.js；不加 --write 只列出不動檔。
   背景：2026-09-18 Tony 抓到外語科目的解析整段用該語言寫，台灣考生看不懂。
   成因在 exp-dump.js 的「風格範例」會挑到同科目的外語解析，一路照抄繁殖（已一併修掉）。
   清掉 exp 後 exp-next.js 就會把那幾卷重新排進待寫佇列。 */
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const { isForeignProse } = require('./exp-lang.js');
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const match = new RegExp(opt('--match', '.'));
const WRITE = args.includes('--write');
let total = 0;
for (const f of fs.readdirSync(path.join(ROOT, 'js/data/exam'))) {
  if (!f.endsWith('.js')) continue;
  const pid = f.replace(/\.js$/, '');
  if (!match.test(pid)) continue;
  const file = path.join(ROOT, 'js/data/exam', f);
  global.window = {};
  delete require.cache[require.resolve(file)];
  require(file);
  const paper = window.APP_EXAM_PAPERS[pid];
  if (!paper) continue;
  const hit = paper.qs.filter(q => q.exp && isForeignProse(q.exp));
  if (!hit.length) continue;
  console.log(`${pid} ${paper.title}：${hit.length} 題`);
  total += hit.length;
  if (!WRITE) continue;
  hit.forEach(q => { delete q.exp; });
  const head = fs.readFileSync(file, 'utf8').split('window.APP_EXAM_PAPERS =')[0];
  fs.writeFileSync(file,
    head + 'window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};\n' +
    `window.APP_EXAM_PAPERS['${pid}'] = ` + JSON.stringify(paper, null, 1) + ';\n', 'utf8');
}
console.log(`共 ${total} 題` + (WRITE ? '已清掉，等 worker 重寫' : '（未加 --write，尚未動檔）'));
