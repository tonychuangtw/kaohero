#!/usr/bin/env node
/* 弱點診斷的「主題歸類」品質抽查（2026-09-21 Tony 要求）
 *
 * `js/diagnose.js` 的 topicOf() 是從詳解的「📚 出處：」啟發式歸類出來的，各科出處寫法不同，
 * 品質差很多。這支把每一科抽幾卷跑一遍，回答三個問題：
 *   1. 歸得出主題的比例（cover）——太低代表那一科的診斷表會很空
 *   2. 平均每個主題幾題（avg）——接近 1 代表主題太細，等於沒有歸類
 *   3. 補弱題單抽得到幾題（hit）——拿第一卷當模考，看其餘卷能抽出幾題同主題的
 *
 * 用法：
 *   node tools/topic-audit.js                 # 全部科目，每科 4 卷
 *   node tools/topic-audit.js --papers 6      # 每科 6 卷
 *   node tools/topic-audit.js --subj med1,e001
 *   node tools/topic-audit.js --cat medical   # 只跑某個分類
 *   node tools/topic-audit.js --csv out.csv
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const argv = process.argv.slice(2);
const opt = (name, def) => {
  const i = argv.indexOf('--' + name);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : def;
};
const PAPERS = Number(opt('papers', 6));
const ONLY = (opt('subj', '') || '').split(',').filter(Boolean);
const CAT = opt('cat', '');
const CSV = opt('csv', '');

// diagnose.js 是瀏覽器端的 IIFE：塞一個假 window 進去就能拿到 KHDiag
const w = {};
new Function('window', fs.readFileSync(path.join(ROOT, 'js/diagnose.js'), 'utf8'))(w);
const topicOf = w.KHDiag.topicOf;
// 站上是「一份卷一份卷」決定主題粗細（法規題會依卷況在法規名稱／條號之間切換），
// 量測也要照同一條路走，否則把好幾卷混在一起算會失真。
const topicsFor = w.KHDiag.topicsFor;

global.window = {};
require(path.join(ROOT, 'js/data/exams.js'));
const EXAMS = global.window.APP_EXAMS;
const SUBJ = global.window.APP_SUBJECTS;
const CATS = global.window.APP_CATS;

// 科目 → 分類（診斷品質是按「考試類別」在差，報表要分得出來）
const catOf = {};
CATS.forEach((c) => c.exams.forEach((x) => (x.stages || []).forEach((st) => {
  (st.subjects || []).forEach((sid) => { catOf[sid] = c.id; });
  (st.groups || []).forEach((g) => g.tracks.forEach((t) => t.subjects.forEach((sid) => { catOf[sid] = c.id; })));
})));

const norm = (s) => String(s || '').toLowerCase()
  .replace(/[\s·．.,，、;；:：'"“”「」『』（）()《》〈〉—－–…]/g, '');
const srcOf = (q) => ((q.exp || '').split('\n').filter((l) => l.indexOf('📚') === 0)[0] || '');

function loadPaper(id) {
  const f = path.join(ROOT, 'js/data/exam', id + '.js');
  if (!fs.existsSync(f)) return null;
  delete require.cache[require.resolve(f)];
  require(f);
  const p = global.window.APP_EXAM_PAPERS[id];
  delete global.window.APP_EXAM_PAPERS[id];   // 卷本體很大，量完就丟，不然 300 科會吃光記憶體
  return p;
}

const subjects = [...new Set(EXAMS.map((e) => e.subj))]
  .filter((sid) => (!ONLY.length || ONLY.includes(sid)) && (!CAT || catOf[sid] === CAT));

const rows = [];
for (const sid of subjects) {
  const list = EXAMS.filter((e) => e.subj === sid)
    .sort((a, b) => (b.roc || 0) - (a.roc || 0)).slice(0, PAPERS);
  const papers = list.map((e) => ({ id: e.id, p: loadPaper(e.id) })).filter((x) => x.p);
  if (!papers.length) continue;

  let tot = 0, got = 0;
  const count = {};
  papers.forEach(({ p }) => {
    const list = topicsFor(p.qs);
    p.qs.forEach((q, k) => {
      tot++;
      const t = list[k];
      if (t) { got++; count[t] = (count[t] || 0) + 1; }
    });
  });
  const topics = Object.keys(count);

  // 補弱題單模擬：拿第一卷當模考，弱主題取前 5 個，看其餘卷抽得到幾題
  let hit = 0;
  if (papers.length > 1) {
    const weak = [...new Set(topicsFor(papers[0].p.qs).filter(Boolean))].slice(0, 5).map(norm)
      .filter((k) => k.length >= 2);
    papers.slice(1).forEach(({ p }) => p.qs.forEach((q) => {
      const src = norm(srcOf(q));
      if (src && weak.some((k) => src.indexOf(k) >= 0)) hit++;
    }));
  }

  rows.push({
    cat: catOf[sid] || '?',
    sid,
    name: (SUBJ[sid] && SUBJ[sid].name) || sid,
    papers: papers.length,
    qs: tot,
    cover: tot ? Math.round(got * 100 / tot) : 0,
    topics: topics.length,
    avg: topics.length ? +(got / topics.length).toFixed(1) : 0,
    hit,
    top: Object.entries(count).sort((a, b) => b[1] - a[1]).slice(0, 3)
      .map(([t, n]) => t + '×' + n).join('、'),
  });
}

/* 品質判讀。看的是「站上實際會怎樣」：
   - cover 太低＝診斷表會空（那一科的出處多半只寫書名，歸不出考點）
   - avg 太低＝主題太細，表上每列都是「錯 1/1」，看得到名字但看不出趨勢
   - hit 是補弱題單抽不抽得到題（在站上還會再多載幾卷，所以門檻放寬）
   ⚠️ 抽樣卷數會影響 avg 與 hit：--papers 3 會低估，站上一次模考會載 5~10 卷。 */
function grade(r) {
  if (r.cover < 35) return '差';
  if (r.cover >= 70 && r.avg >= 2) return '好';
  return '普通';
}

rows.sort((a, b) => (a.cat === b.cat ? b.cover - a.cover : (a.cat < b.cat ? -1 : 1)));
const pad = (s, n) => {
  s = String(s);
  // 中文字寬度算 2，欄位才對得齊
  let w2 = 0;
  for (const ch of s) w2 += /[　-鿿＀-￯]/.test(ch) ? 2 : 1;
  return s + ' '.repeat(Math.max(0, n - w2));
};
console.log(pad('分類', 10) + pad('科目', 26) + pad('卷', 4) + pad('題', 6)
  + pad('歸類%', 7) + pad('主題數', 8) + pad('每主題題數', 12) + pad('可抽', 6) + '判讀');
rows.forEach((r) => {
  console.log(pad(r.cat, 10) + pad(r.name.slice(0, 12), 26) + pad(r.papers, 4) + pad(r.qs, 6)
    + pad(r.cover + '%', 7) + pad(r.topics, 8) + pad(r.avg, 12) + pad(r.hit, 6) + grade(r));
});

const byCat = {};
rows.forEach((r) => {
  const b = byCat[r.cat] || (byCat[r.cat] = { n: 0, cover: 0, avg: 0, hit: 0, good: 0, bad: 0 });
  b.n++; b.cover += r.cover; b.avg += r.avg; b.hit += r.hit;
  if (grade(r) === '好') b.good++;
  if (grade(r) === '差') b.bad++;
});
console.log('\n依分類平均：');
Object.keys(byCat).sort().forEach((c) => {
  const b = byCat[c];
  console.log('  ' + pad(c, 10) + '科目 ' + pad(b.n, 5)
    + '歸類 ' + pad(Math.round(b.cover / b.n) + '%', 7)
    + '每主題 ' + pad((b.avg / b.n).toFixed(1), 6)
    + '平均可抽 ' + pad(Math.round(b.hit / b.n), 6)
    + '好 ' + pad(b.good, 5) + '差 ' + b.bad);
});

if (CSV) {
  const head = 'cat,sid,name,papers,qs,cover,topics,avgPerTopic,drillHits,grade\n';
  const body = rows.map((r) => [r.cat, r.sid, '"' + r.name + '"', r.papers, r.qs, r.cover,
    r.topics, r.avg, r.hit, grade(r)].join(',')).join('\n');
  fs.writeFileSync(CSV, head + body + '\n', 'utf8');
  console.log('\n→ ' + CSV);
}
