#!/usr/bin/env node
/* set-fig.js — 把 tools/figfill.py 裁好的圖掛回題庫（只加 q.fig，不動題幹與選項）。

   用法：node tools/set-fig.js <figfill 產生的 -done.json> [--write]
   輸入：{ "<pid>": { "<題號>": "img/q/xxx.webp" } }

   這批題的文字本來就讀得出來，只是缺圖表才答不了，所以**不加 needfig、不清空選項**
   （needfig 的意思是「題幹與選項都在圖上」，清了文字反而讓搜尋與朗讀讀不到題目）。
   同一題已經有 fig 就跳過，不覆蓋。
   寫完記得：node tools/build-index.js --write && node test/test.js */
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const WRITE = process.argv.includes('--write');
const src = process.argv[2];
if (!src) { console.log('用法：node tools/set-fig.js <-done.json> [--write]'); process.exit(1); }
const data = JSON.parse(fs.readFileSync(src, 'utf8'));
const errs = [];
let done = 0, skip = 0, papers = 0;
for (const pid of Object.keys(data)) {
  const f = path.join(ROOT, 'js/data/exam', pid + '.js');
  if (!fs.existsSync(f)) { errs.push(pid + '：沒有這一卷'); continue; }
  global.window = {};
  delete require.cache[require.resolve(f)];
  require(f);
  const paper = window.APP_EXAM_PAPERS[pid];
  let touched = 0;
  for (const [ns, fig] of Object.entries(data[pid])) {
    const n = parseInt(ns, 10);
    const q = paper.qs.find(q => q.n === n);
    if (!q) { errs.push(`${pid} #${n}：卷裡沒有這一題`); continue; }
    if (!fs.existsSync(path.join(ROOT, fig))) { errs.push(`${pid} #${n}：${fig} 不存在`); continue; }
    if (q.fig) { skip++; continue; }
    q.fig = fig; done++; touched++;
  }
  if (WRITE && touched && !errs.length) {
    const head = fs.readFileSync(f, 'utf8').split('window.APP_EXAM_PAPERS =')[0];
    fs.writeFileSync(f, head + 'window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};\n' +
      `window.APP_EXAM_PAPERS['${pid}'] = ` + JSON.stringify(paper, null, 1) + ';\n', 'utf8');
    papers++;
  }
}
if (errs.length) { errs.slice(0, 20).forEach(e => console.log('  ✗ ' + e)); }
console.log(`${WRITE ? '已寫入' : '試跑'}：${done} 題補圖、${skip} 題本來就有圖、${papers} 卷改寫${errs.length ? `、問題 ${errs.length} 筆` : ''}`);
process.exit(errs.length ? 1 : 0);
