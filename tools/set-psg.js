#!/usr/bin/env node
/* set-psg.js — 把 tools/psg-recover.py 從原始 PDF 救回來的題組文章掛回題庫（2026-10-04）。

   用法：node tools/set-psg.js <psg-recover 輸出.json> [--write]
   輸入：{ pid: { psg: {起點題號: 文章}, grp: {題號: 起點題號}, opts?: {題號: [選項…]} } }

   做三件事：
   1. grp 列到的題掛 q.psg（已經有 psg 的不覆蓋）
   2. 克漏字題原本是「題幹與選項都在圖上」的空白題（needfig＋fig 只裁到選項那一行），
      opts 有讀到選項文字的：補 q.o、題幹改成「依短文選出第 N 格」，拿掉 needfig／fig（文字比圖好搜尋、好朗讀）
   3. 題組起點的上一題，最後一個選項尾巴如果黏著文章開頭或引導語（轉檔把文章當成選項續行），切掉
   寫完：node tools/exp-skip-drop.js --reason-match '閱讀測驗|克漏字|本文|文章|題組' --only <同一個檔> --write
         node tools/build-index.js --write && node test/test.js */
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const WRITE = process.argv.includes('--write');
const src = process.argv[2];
if (!src) { console.log('用法：node tools/set-psg.js <json> [--write]'); process.exit(1); }
const data = JSON.parse(fs.readFileSync(src, 'utf8'));
const nsp = s => (s || '').replace(/\s+/g, '');
// 黏在選項尾巴的引導語
const GLUE = /(請?依下(?:文|列)|請回答|Прочитайте|【\d|閱讀下文|以下の文を|次の文を|다음 (?:글|문장)|Lea el texto|Read the|第\s*\d+\s*題(?:至|到)第)/;
let nPsg = 0, nOpt = 0, nFix = 0, papers = 0;
const errs = [], fixes = [];
for (const [pid, r] of Object.entries(data)) {
  const f = path.join(ROOT, 'js/data/exam', pid + '.js');
  if (!fs.existsSync(f)) { errs.push(pid + '：沒有這一卷'); continue; }
  global.window = {};
  delete require.cache[require.resolve(f)];
  require(f);
  const paper = window.APP_EXAM_PAPERS[pid];
  const byn = {}; paper.qs.forEach(q => { byn[q.n] = q; });
  let touched = 0;
  for (const [ns, st] of Object.entries(r.grp)) {
    const q = byn[+ns], psg = r.psg[String(st)];
    if (!q || !psg) { errs.push(`${pid} #${ns}：找不到題或文章`); continue; }
    if (!q.psg) { q.psg = psg; nPsg++; touched++; }
    const o = r.opts && r.opts[ns];
    if (o && q.needfig && !(q.o || []).some(x => nsp(x))) {
      q.o = o.map(x => x.replace(/^[A-E][.．]\s*/, '').trim());
      q.q = `依短文選出第 ${q.n} 格最適合的答案`;
      delete q.needfig; delete q.fig;
      nOpt++; touched++;
    }
  }
  // 上一題最後一個選項尾巴黏著文章
  for (const st of Object.keys(r.psg)) {
    const prev = byn[+st - 1];
    if (!prev || !prev.o || !prev.o.length) continue;
    const k = prev.o.length - 1, o = prev.o[k];
    const head = r.psg[st].slice(0, 12);
    let at = head.length >= 8 ? o.indexOf(head) : -1;
    const g = o.search(GLUE);
    if (g > 0 && (at < 0 || g < at)) at = g;
    if (at > 0) {
      const cut = o.slice(0, at).trim();
      if (cut) { fixes.push(`${pid} #${prev.n} ${JSON.stringify(o.slice(0, 50))} → ${JSON.stringify(cut)}`); prev.o[k] = cut; nFix++; touched++; }
    }
  }
  if (WRITE && touched) {
    const head = fs.readFileSync(f, 'utf8').split('window.APP_EXAM_PAPERS =')[0];
    fs.writeFileSync(f, head + 'window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};\n' +
      `window.APP_EXAM_PAPERS['${pid}'] = ` + JSON.stringify(paper, null, 1) + ';\n', 'utf8');
    papers++;
  }
}
if (process.argv.includes('--show')) fixes.forEach(x => console.log('  ✂ ' + x));
errs.slice(0, 20).forEach(e => console.log('  ✗ ' + e));
console.log(`${WRITE ? '已寫入' : '試跑'}：掛文章 ${nPsg} 題、克漏字補選項 ${nOpt} 題、切掉黏住的選項尾巴 ${nFix} 處、${papers} 卷改寫${errs.length ? `、問題 ${errs.length} 筆` : ''}`);
