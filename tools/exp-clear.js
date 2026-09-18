#!/usr/bin/env node
/* exp-clear.js — 依正規式清掉一批詳解，讓 worker 重寫（清掉的原文先備份）。
   用法：node tools/exp-clear.js --grep '第\\d+條' [--match '^tou-'] [--sub 'l002|l009'] [--write]
     --grep   詳解內容符合這個正規式的才清（必填）
     --match  只處理符合的 pid（預設全部）
     --sub    只處理科目代碼（pid 最後一段）符合的卷
     --pids   只處理這個檔裡列出的 pid（一行一個；用來限定「某一批引擎寫的卷」）
     不加 --write 只列出會清掉幾題。備份寫到 tools/exp-clear-backup.json（同一個檔會被覆蓋）。

   為什麼要有（2026-09-18）：DeepSeek 寫的法規題，說明正確但**條號常常是掰的** ——
   同一個考點「責任保險證件遺失 2,000 元」在三卷分別寫成旅行業管理規則第 24／12／5 條，
   正確是第 66 條（舊編第 53 條）。條號錯會害考生背錯，所以引了條號的題要用 claude 重寫。
   對照：claude 寫的同一考點三題都寫第 39 條（舊編），一致且正確。
   清掉 exp 後 exp-next.js 會把那幾卷重新排進佇列。 */
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const WRITE = args.includes('--write');
const grep = opt('--grep', '');
if (!grep) { console.error("用法：node tools/exp-clear.js --grep '第\\\\d+條' [--match '^tou-'] [--sub 'l002|l009'] [--write]"); process.exit(2); }
const grepRe = new RegExp(grep);
const matchRe = new RegExp(opt('--match', '.'));
const subRe = opt('--sub', '') ? new RegExp('-(' + opt('--sub') + ')$') : null;
const only = opt('--pids', '') ? new Set(fs.readFileSync(opt('--pids'), 'utf8').split('\n').map(x => x.trim()).filter(Boolean)) : null;
const backup = [];
let total = 0, papers = 0;
for (const f of fs.readdirSync(path.join(ROOT, 'js/data/exam'))) {
  if (!f.endsWith('.js')) continue;
  const pid = f.replace(/\.js$/, '');
  if (!matchRe.test(pid) || (subRe && !subRe.test(pid)) || (only && !only.has(pid))) continue;
  const file = path.join(ROOT, 'js/data/exam', f);
  global.window = {};
  delete require.cache[require.resolve(file)];
  require(file);
  const paper = window.APP_EXAM_PAPERS[pid];
  if (!paper) continue;
  const hit = paper.qs.filter(q => q.exp && grepRe.test(q.exp));
  if (!hit.length) continue;
  console.log(`${pid} ${paper.title}：${hit.length} 題`);
  total += hit.length; papers++;
  hit.forEach(q => backup.push({ pid, n: q.n, exp: q.exp }));
  if (!WRITE) continue;
  hit.forEach(q => { delete q.exp; });
  const head = fs.readFileSync(file, 'utf8').split('window.APP_EXAM_PAPERS =')[0];
  fs.writeFileSync(file,
    head + 'window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};\n' +
    `window.APP_EXAM_PAPERS['${pid}'] = ` + JSON.stringify(paper, null, 1) + ';\n', 'utf8');
}
if (WRITE && backup.length) fs.writeFileSync(path.join(ROOT, 'tools/exp-clear-backup.json'), JSON.stringify(backup, null, 1));
console.log(`共 ${papers} 卷、${total} 題` + (WRITE ? '已清掉（原文備份在 tools/exp-clear-backup.json），等 worker 重寫' : '（未加 --write，尚未動檔）'));
