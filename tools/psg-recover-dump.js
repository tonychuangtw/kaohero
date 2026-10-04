#!/usr/bin/env node
/* psg-recover-dump.js — 把「跳過理由是缺閱讀測驗文章」的卷倒成 JSON，給 tools/psg-recover.py 讀。
   用法：node tools/psg-recover-dump.js <輸出.json> */
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const RX = /閱讀測驗|克漏字|本文|文章|題組/;
const skips = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools/exp-skips.json'), 'utf8'));
const out = {};
for (const [pid, arr] of Object.entries(skips)) {
  if (!arr.some(x => RX.test(x.reason || ''))) continue;
  const f = path.join(ROOT, 'js/data/exam', pid + '.js');
  if (!fs.existsSync(f)) continue;
  global.window = {};
  require(f);
  const p = window.APP_EXAM_PAPERS[pid];
  out[pid] = { qs: p.qs.map(q => ({ n: q.n, q: q.q || '', o: q.o || [], psg: q.psg || '' })) };
}
fs.writeFileSync(process.argv[2], JSON.stringify(out));
console.log(Object.keys(out).length + ' 卷');
