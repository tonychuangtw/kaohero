/* 重建 js/data/exams.js（題庫索引）
   來源＝tools/index-spec.json（分類／考試／科目，手動維護）＋ js/data/exam/*.js（每一卷）
   用法：node tools/build-index.js [--write]
   ⚠ 這支不依賴 scratchpad 的轉檔腳本；加完新卷或補完詳解都可以直接重跑。*/
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const spec = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools/index-spec.json'), 'utf8'));

global.window = {};
const dir = path.join(ROOT, 'js/data/exam');
fs.readdirSync(dir).filter(f => f.endsWith('.js')).forEach(f => {
  delete require.cache[require.resolve(path.join(dir, f))];
  require(path.join(dir, f));
});
const papers = window.APP_EXAM_PAPERS || {};

// 分類 → 考試 的排序權重，讓同一個考試的卷子排在一起、年份由新到舊
const catOrder = {}; spec.cats.forEach((c, i) => catOrder[c.id] = i);
const examOrder = {}; spec.cats.forEach(c => c.exams.forEach((x, i) => examOrder[x.id] = i));
const subjOrder = Object.keys(spec.subjects);

const exams = Object.values(papers).map(p => ({
  id: p.id, cat: p.cat, exam: p.exam, stage: p.stage, roc: p.roc, nth: p.nth,
  subj: p.subj, subjName: p.subjName, label: p.title,
  n: p.qs.length,
  exp: p.qs.filter(q => q.exp && q.exp.trim()).length,
  mins: p.mins,
})).sort((a, b) =>
  (catOrder[a.cat] - catOrder[b.cat]) || (examOrder[a.exam] - examOrder[b.exam]) ||
  (b.roc - a.roc) || (a.nth - b.nth) ||
  (subjOrder.indexOf(a.subj) - subjOrder.indexOf(b.subj)));

const out = '/* 考古英雄 — 題庫索引與考試分類（node tools/build-index.js 產生，勿手改；'
  + '分類與科目改 tools/index-spec.json） */\n'
  + 'window.APP_CATS = ' + JSON.stringify(spec.cats, null, 1) + ';\n'
  + 'window.APP_SUBJECTS = ' + JSON.stringify(spec.subjects, null, 1) + ';\n'
  + 'window.APP_EXAMS = ' + JSON.stringify(exams, null, 1) + ';\n';

if (process.argv.includes('--write')) {
  fs.writeFileSync(path.join(ROOT, 'js/data/exams.js'), out);
  console.log('已寫入 js/data/exams.js：' + exams.length + ' 卷、'
    + exams.reduce((s, e) => s + e.n, 0) + ' 題、已有詳解 ' + exams.reduce((s, e) => s + e.exp, 0) + ' 題');
} else {
  console.log('（未加 --write，只試算）' + exams.length + ' 卷、'
    + exams.reduce((s, e) => s + e.n, 0) + ' 題、已有詳解 ' + exams.reduce((s, e) => s + e.exp, 0) + ' 題');
}
