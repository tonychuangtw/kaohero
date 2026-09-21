#!/usr/bin/env node
/* 挑出指定的「卷＋題號」，輸出成 build-anki.py／build-pdf.py 吃的 papers.json。
 *
 * 用法：node tools/pick-json.js <挑選清單.json> <輸出.json>
 *   挑選清單：{"items":[{"pid":"doc-115-2-med1","n":1}, …]}
 *
 * 跟 export-json.js 的差別：那支是「整卷匯出」，這支是「挑題匯出」，
 * 給個人錯題本用（後端 /api/kgh/export/anki 會呼叫這支）。
 *
 * ⚠️ 挑選清單是使用者送上來的資料：pid 一律用白名單比對（要在 js/data/exams.js 的索引裡），
 *    絕不直接拿來拼檔名，避免 ../ 之類的路徑穿越。
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
global.window = {};
require(path.join(ROOT, 'js', 'data', 'exams.js'));
const EXAMS = window.APP_EXAMS;
const SUBJ = window.APP_SUBJECTS || {};
const BY_ID = new Map(EXAMS.map((e) => [e.id, e]));

const [, , src, dst] = process.argv;
if (!src || !dst) {
  console.error('用法：node tools/pick-json.js <挑選清單.json> <輸出.json>');
  process.exit(1);
}

const sel = JSON.parse(fs.readFileSync(src, 'utf8'));
const items = Array.isArray(sel.items) ? sel.items : [];

// pid → 該卷要的題號（去重）
const want = new Map();
for (const it of items) {
  const pid = String((it && it.pid) || '');
  const n = Number(it && it.n);
  if (!BY_ID.has(pid) || !Number.isInteger(n) || n < 1 || n > 500) continue;
  if (!want.has(pid)) want.set(pid, new Set());
  want.get(pid).add(n);
}

window.APP_EXAM_PAPERS = {};
const papers = [];
let miss = 0;
// 排序：科目 → 卷 → 題號（跟站上匯出頁一致，印出來才跟複習的心智模型一樣）
const pids = [...want.keys()].sort((a, b) => {
  const ea = BY_ID.get(a), eb = BY_ID.get(b);
  const na = (SUBJ[ea.subj] && SUBJ[ea.subj].name) || ea.subj;
  const nb = (SUBJ[eb.subj] && SUBJ[eb.subj].name) || eb.subj;
  return na === nb ? (a < b ? -1 : 1) : (na < nb ? -1 : 1);
});
for (const pid of pids) {
  const f = path.join(ROOT, 'js', 'data', 'exam', pid + '.js');
  if (!fs.existsSync(f)) { miss++; continue; }
  delete require.cache[require.resolve(f)];
  require(f);
  const p = window.APP_EXAM_PAPERS[pid];
  if (!p) { miss++; continue; }
  const ns = want.get(pid);
  const qs = p.qs.filter((q) => ns.has(q.n)).sort((a, b) => a.n - b.n);
  if (!qs.length) { miss++; continue; }
  const meta = BY_ID.get(pid);
  papers.push({ meta: Object.assign({}, meta, { subjName: (SUBJ[meta.subj] || {}).name || meta.subj }), qs });
  // 記憶體：卷本體很大，挑完就從快取丟掉（後端是長駐行程，這支是子行程也一樣別留）
  delete window.APP_EXAM_PAPERS[pid];
}

fs.writeFileSync(dst, JSON.stringify({ papers }), 'utf8');
const n = papers.reduce((s, p) => s + p.qs.length, 0);
console.log(JSON.stringify({ papers: papers.length, questions: n, missing: miss }));
