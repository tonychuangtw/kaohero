/* 產生每一卷的靜態頁 exam/<pid>/index.html，並重寫 sitemap.xml。
   目的：題庫頁原本只有 `#/paper/<pid>` 這種 hash 路由，搜尋引擎只索引得到首頁一頁；
   靜態頁讓 2,377 卷各自有一個可被索引的網址，長尾搜尋才進得來。
   這支腳本只「新增」檔案，不動 index.html 與既有的 hash 路由。

   用法：node tools/build-pages.js [--write] [--limit N] [--only <pid>]
   不加 --write 只試算並印出統計。 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'exam');
const SITE = 'https://kaohero.com';
const WRITE = process.argv.includes('--write');
const LIMIT = (function () { const i = process.argv.indexOf('--limit'); return i > 0 ? parseInt(process.argv[i + 1], 10) : 0; })();
const ONLY = (function () { const i = process.argv.indexOf('--only'); return i > 0 ? process.argv[i + 1] : ''; })();
const TODAY = new Date(Date.now() + 8 * 3600e3).toISOString().slice(0, 10);   // 台北日期

/* 寫頁但保留舊日期：內容（日期以外）沒變就不重寫、沿用舊的「最後更新」，sitemap 的 lastmod 也跟著用它。
   以前每次全量重產都把四千多頁蓋成今天，Google 會認定這站的 lastmod 不可信（2026-11-05 改）。 */
const LASTMOD = {};
function put(file, html, url) {
  let day = TODAY;
  try {
    const old = fs.readFileSync(file, 'utf8');
    const m = old.match(/<time datetime="(\d{4}-\d{2}-\d{2})"/) || old.match(/"dateModified":"(\d{4}-\d{2}-\d{2})"/);
    if (m && html.split(TODAY).join(m[1]) === old) day = m[1];
  } catch (e) {}
  if (day === TODAY) fs.writeFileSync(file, html, 'utf8');
  LASTMOD[url] = day;
  return day;
}

global.window = {};
require(path.join(ROOT, 'js/config.js'));
/* 題目圖片位址：IMG_BASE 設了（R2）就用絕對網址，沒設就照舊站內絕對路徑 /img/q/… */
const figSrc = p => { const u = window.khImg(p); return /^https?:/.test(u) ? u : '/' + u; };
require(path.join(ROOT, 'js/data/exams.js'));
const EXAMS = window.APP_EXAMS;
const CATS = window.APP_CATS;

/* 分類與考試的中文名，用來組麵包屑與說明文字 */
const CAT = {}, EXAM = {};
CATS.forEach(c => {
  CAT[c.id] = c.name;
  (c.exams || []).forEach(e => { EXAM[e.id] = { name: e.name, cat: c.id }; });
});

const L = ['A', 'B', 'C', 'D', 'E', 'F'];
const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function loadPaper(id) {
  const f = path.join(ROOT, 'js/data/exam', id + '.js');
  if (!fs.existsSync(f)) return null;
  delete require.cache[require.resolve(f)];
  require(f);
  return window.APP_EXAM_PAPERS[id];
}

/* 詳解本體是五行純文字（✅／三行 ❌／📚 出處），逐行包成 <p> 才不會在頁面上黏成一段 */
function expHtml(exp) {
  return String(exp).split('\n').filter(Boolean)
    .map(line => '<p>' + esc(line) + '</p>').join('');
}

/* 靜態頁只放前 PREVIEW 題的詳解當試讀，其餘不寫進 HTML。
   原因：docs/monetization-plan.md 階段 0 的目標就是「把付費詳解移出公開靜態檔」，
   若把 10.6 萬題詳解全部烘進靜態頁並讓 Google 索引，之後要收回會很麻煩。
   題目、選項與標準答案是考選部公開資料，照登沒問題。 */
const PREVIEW = 3;

function qHtml(q, paperLabel, idx) {
  const parts = [];
  parts.push('<li class="kq" id="q' + q.n + '">');
  if (q.psgHead) parts.push('<div class="kpsg">' + esc(q.psg) + '</div>');
  parts.push('<p class="kqt"><span class="kn">' + q.n + '</span>' + esc(q.q) + '</p>');
  if (q.fig) parts.push('<p class="kfig"><img src="' + esc(figSrc(q.fig)) + '" alt="' +
    esc(paperLabel + ' 第 ' + q.n + ' 題附圖') + '" loading="lazy"></p>');
  const opts = (q.o || []).filter(o => String(o).trim() !== '');
  if (opts.length) {
    parts.push('<ol class="kopt">');
    (q.o || []).forEach((o, i) => {
      if (String(o).trim() === '') return;
      parts.push('<li' + (i === q.a ? ' class="ok"' : '') + '><b>(' + L[i] + ')</b> ' + esc(o) + '</li>');
    });
    parts.push('</ol>');
  }
  if (q.void) parts.push('<p class="kans">本題經考選部公告不計分。</p>');
  else parts.push('<p class="kans">正解：<b>(' + L[q.a] + ')</b></p>');
  if (q.exp && idx < PREVIEW) {
    parts.push('<div class="kexp"><p class="ktag">逐題詳解（免費試讀）</p>' + expHtml(q.exp) + '</div>');
  } else if (q.exp) {
    parts.push('<p class="kexp-lock">本題附有逐題詳解，<a href="/#/paper/' + esc(q.pid) + '">線上作答後</a>即可看到。</p>');
  }
  parts.push('</li>');
  return parts.join('');
}

/* 同一科目的其他年份，放在頁尾做站內連結（對長尾搜尋與爬蟲的探索都有用） */
function siblings(e) {
  return EXAMS.filter(x => x.exam === e.exam && x.subj === e.subj && x.id !== e.id)
    .sort((a, b) => (b.roc - a.roc) || (b.nth - a.nth))
    .slice(0, 12);
}

function pageHtml(e, paper) {
  const examName = (EXAM[e.exam] && EXAM[e.exam].name) || e.exam;
  const url = SITE + '/exam/' + e.id + '/';
  const title = examName + ' ' + e.label.replace(/\s+/g, ' ').trim() + ' 考古題詳解｜考英雄';
  const desc = examName + ' ' + e.label.replace(/\s+/g, ' ').trim() + '，共 ' + e.n + ' 題，附考選部標準答案與本站自撰的逐題詳解（' +
    e.exp + ' 題）。可線上免費作答，答完立即看解析。';

  /* 題組原文（q.psg）同一段會重複掛在好幾題上，只在該段第一題印一次 */
  let last = null;
  paper.qs.forEach(q => { q.psgHead = !!(q.psg && q.psg !== last); if (q.psg) last = q.psg; });

  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', position: 1, name: '考英雄', item: SITE + '/' },
          { '@type': 'ListItem', position: 2, name: '全部題庫', item: SITE + '/exam/' },
          { '@type': 'ListItem', position: 3, name: examName, item: SITE + '/exam/' + e.exam + '/' },
          { '@type': 'ListItem', position: 4, name: e.label.replace(/\s+/g, ' ').trim() }
        ]
      },
      {
        '@type': 'WebPage', '@id': url + '#webpage', url: url, name: title,
        description: desc, inLanguage: 'zh-Hant', dateModified: TODAY,
        isPartOf: { '@id': SITE + '/#website' },
        publisher: { '@id': SITE + '/#org' }
      }
    ]
  };

  const sib = siblings(e);
  const out = [];
  out.push('<!DOCTYPE html>');
  out.push('<html lang="zh-Hant">');
  out.push('<head>');
  out.push('<meta charset="utf-8">');
  out.push('<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">');
  out.push('<title>' + esc(title) + '</title>');
  out.push('<meta name="description" content="' + esc(desc) + '">');
  out.push('<link rel="canonical" href="' + url + '">');
  out.push('<meta property="og:type" content="article">');
  out.push('<meta property="og:url" content="' + url + '">');
  out.push('<meta property="og:site_name" content="考英雄">');
  out.push('<meta property="og:locale" content="zh_TW">');
  out.push('<meta property="og:title" content="' + esc(title) + '">');
  out.push('<meta property="og:description" content="' + esc(desc) + '">');
  out.push('<meta property="og:image" content="' + SITE + '/img/og.png">');
  out.push('<meta name="twitter:card" content="summary_large_image">');
  out.push('<script type="application/ld+json">' + JSON.stringify(ld) + '</scr' + 'ipt>');
  out.push('<link rel="stylesheet" href="/css/paper.css?v=20260912a">');
  out.push('</head>');
  out.push('<body>');
  out.push('<header class="kh"><a class="klogo" href="/">考英雄</a>' +
    '<nav class="knav"><a href="/#/exams">考試題庫</a><a href="/#/guide">準備方式</a><a href="/#/support">客服中心</a></nav></header>');
  out.push('<main class="kwrap">');
  out.push('<nav class="kbc" aria-label="麵包屑"><a href="/">首頁</a> › <a href="/exam/">全部題庫</a> › <a href="/exam/' +
    esc(e.exam) + '/">' + esc(examName) + '考古題</a> › <span>' + esc(e.label.replace(/\s+/g, ' ').trim()) + '</span></nav>');
  out.push('<h1>' + esc(examName + '　' + e.label.replace(/\s+/g, ' ').trim()) + '　考古題與詳解</h1>');
  out.push('<p class="klead">本卷共 <b>' + e.n + '</b> 題，其中 <b>' + e.exp + '</b> 題附有本站自撰的逐題詳解。' +
    '題目與標準答案取自考選部「考畢試題查詢平臺」的公開資料；詳解由本站撰寫並標註出處。' +
    '本頁列出全部題目與標準答案，並免費試讀前 ' + PREVIEW + ' 題的詳解；其餘詳解在線上作答時逐題顯示。</p>');
  out.push('<p class="kcta"><a class="kbtn" href="/#/paper/' + esc(e.id) + '">▶ 線上作答這一卷（' + e.n + ' 題，建議 ' + e.mins + ' 分鐘）</a></p>');
  out.push('<ol class="klist">');
  paper.qs.forEach((q, i) => { q.pid = e.id; out.push(qHtml(q, e.label.replace(/\s+/g, ' ').trim(), i)); });
  out.push('</ol>');
  out.push('<p class="kcta"><a class="kbtn" href="/#/paper/' + esc(e.id) + '">▶ 線上作答這一卷</a></p>');
  if (sib.length) {
    out.push('<section class="krel"><h2>' + esc(examName + ' ' + e.subjName) + ' 其他年度</h2><ul>');
    sib.forEach(s => out.push('<li><a href="/exam/' + esc(s.id) + '/">' +
      esc(s.label.replace(/\s+/g, ' ').trim()) + '</a>（' + s.n + ' 題）</li>'));
    out.push('</ul></section>');
  }
  out.push('<p class="kfine">題目與標準答案來源：<a href="https://wwwq.moex.gov.tw/exam/wFrmExamQandA.aspx" rel="noopener">考選部考畢試題查詢平臺</a>（政府資訊公開資料）。' +
    '最後更新：<time datetime="' + TODAY + '">' + TODAY + '</time>。</p>');
  out.push('</main>');
  out.push('<footer class="kft"><a href="/">考英雄首頁</a>　·　<a href="/#/exams">考試題庫總覽</a>　·　<a href="/#/about">使用說明</a></footer>');
  out.push('</body></html>');
  return out.join('\n');
}

let list = EXAMS.slice();
if (ONLY) list = list.filter(e => e.id === ONLY);
if (LIMIT) list = list.slice(0, LIMIT);

let bytes = 0, made = 0, missing = 0;
list.forEach(e => {
  const paper = loadPaper(e.id);
  if (!paper) { missing++; return; }
  const html = pageHtml(e, paper);
  bytes += Buffer.byteLength(html);
  made++;
  if (WRITE) {
    const dir = path.join(OUT, e.id);
    fs.mkdirSync(dir, { recursive: true });
    put(path.join(dir, 'index.html'), html, '/exam/' + e.id + '/');
  }
});

/* 總覽頁與各考試頁共用的頁首頁尾 */
function shellHead(title, desc, url, ld) {
  const out = [];
  out.push('<!DOCTYPE html>\n<html lang="zh-Hant">\n<head>');
  out.push('<meta charset="utf-8">');
  out.push('<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">');
  out.push('<title>' + esc(title) + '</title>');
  out.push('<meta name="description" content="' + esc(desc) + '">');
  out.push('<link rel="canonical" href="' + url + '">');
  out.push('<meta property="og:type" content="website"><meta property="og:url" content="' + url + '"><meta property="og:title" content="' + esc(title) + '">');
  out.push('<meta property="og:description" content="' + esc(desc) + '"><meta property="og:site_name" content="考英雄"><meta property="og:locale" content="zh_TW">');
  out.push('<meta property="og:image" content="' + SITE + '/img/og.png"><meta name="twitter:card" content="summary_large_image">');
  if (ld) out.push('<script type="application/ld+json">' + JSON.stringify(ld) + '</scr' + 'ipt>');
  out.push('<link rel="stylesheet" href="/css/paper.css?v=20260912a">');
  out.push('</head>\n<body>');
  out.push('<header class="kh"><a class="klogo" href="/">考英雄</a>' +
    '<nav class="knav"><a href="/exam/">全部題庫</a><a href="/mock/">線上模擬考</a><a href="/#/guide">準備方式</a><a href="/#/support">客服中心</a></nav></header>');
  out.push('<main class="kwrap">');
  return out;
}
function shellFoot(out) {
  out.push('<p class="kfine">題目與標準答案來源：<a href="https://wwwq.moex.gov.tw/exam/wFrmExamQandA.aspx" rel="noopener">考選部考畢試題查詢平臺</a>（政府資訊公開資料）。最後更新：<time datetime="' + TODAY + '">' + TODAY + '</time>。</p>');
  out.push('</main>');
  out.push('<footer class="kft"><a href="/">考英雄首頁</a>　·　<a href="/exam/">全部題庫</a>　·　<a href="/essay/">申論題庫</a>　·　<a href="/#/about">使用說明</a></footer>');
  out.push('</body></html>');
  return out.join('\n');
}
const fmt = n => n.toLocaleString('en-US');
const byNew = (a, b) => (b.roc - a.roc) || (b.nth - a.nth) || String(a.subj).localeCompare(String(b.subj));
/* 考試頁的稱呼：用大家搜尋時的叫法 */
const HUBNAME = { lawyer: '律師一試', teacher: '教師資格考' };
const hubName = x => HUBNAME[x.id] || x.name;
const ESSAY_EXAMS = { gao: 1, local: 1, pol: 1 };
const HUBS = [];
CATS.forEach(c => (c.exams || []).forEach(x => {
  const list = EXAMS.filter(e => e.exam === x.id).sort(byNew);
  if (list.length) HUBS.push({ c, x, list });
}));

/* 卷頁總覽 exam/index.html：讓爬蟲不必只靠 sitemap 就能走到每一卷 */
function indexHtml() {
  const url = SITE + '/exam/';
  const nq = EXAMS.reduce((s, e) => s + e.n, 0);
  const title = '國考考古題全部題庫總覽（' + fmt(EXAMS.length) + ' 卷）｜考英雄';
  const desc = '考英雄收錄的 ' + fmt(EXAMS.length) + ' 卷、' + fmt(nq) + ' 題國家考試考古題總覽，依考試與年度排列，每一卷都附考選部標準答案與本站自撰的逐題詳解，可免費線上模擬考。';
  const ld = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: '考英雄', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: '全部題庫' }] },
    { '@type': 'CollectionPage', '@id': url + '#webpage', url: url, name: title, description: desc, inLanguage: 'zh-Hant',
      dateModified: TODAY, isPartOf: { '@id': SITE + '/#website' }, publisher: { '@id': SITE + '/#org' } }] };
  const out = shellHead(title, desc, url, ld);
  out.push('<nav class="kbc" aria-label="麵包屑"><a href="/">首頁</a> › <span>全部題庫</span></nav>');
  out.push('<h1>國考考古題全部題庫總覽</h1>');
  out.push('<p class="klead">共 ' + fmt(EXAMS.length) + ' 卷、' + fmt(nq) +
    ' 題。點進任一卷可看該卷全部題目與標準答案，並免費試讀前 ' + PREVIEW + ' 題詳解；點考試名稱可看該考試依年度整理的頁面。</p>');
  out.push('<ul class="kidx">');
  HUBS.forEach(h => out.push('<li><a href="/exam/' + esc(h.x.id) + '/">' + esc(hubName(h.x)) + '考古題</a>　<span class="kmut">' + h.list.length + ' 卷</span></li>'));
  out.push('</ul>');
  HUBS.forEach(h => {
    out.push('<h2><a href="/exam/' + esc(h.x.id) + '/">' + esc(h.c.name + '｜' + h.x.name) + '</a>（' + h.list.length + ' 卷）</h2>');
    out.push('<ul class="kidx">');
    h.list.forEach(e => out.push('<li><a href="/exam/' + esc(e.id) + '/">' +
      esc(e.label.replace(/\s+/g, ' ').trim()) + '</a>　<span class="kmut">' + e.n + ' 題・詳解 ' + e.exp + ' 題</span></li>'));
    out.push('</ul>');
  });
  return shellFoot(out);
}

/* 各考試頁 exam/<考試>/index.html：依年度列出該考試全部考卷。
   首頁 → 考試頁 → 卷頁 三層都是一般連結，Google 不必靠 sitemap 才找得到卷頁；
   也是「高普考考古題 115」這類搜尋的落地頁。 */
function hubHtml(h) {
  const { x, list } = h;
  const name = hubName(x);
  const url = SITE + '/exam/' + x.id + '/';
  const years = [...new Set(list.map(e => e.roc))];
  const lo = Math.min(...years), hi = Math.max(...years);
  const nq = list.reduce((s, e) => s + e.n, 0), nx = list.reduce((s, e) => s + e.exp, 0);
  const subjs = new Set(list.map(e => e.subj)).size;
  const title = name + '考古題詳解（民國 ' + lo + '～' + hi + ' 年，' + fmt(list.length) + ' 卷）｜考英雄';
  const desc = name + '歷屆考古題 ' + fmt(list.length) + ' 卷、' + fmt(nq) + ' 題，民國 ' + lo + ' 至 ' + hi +
    ' 年，每卷附考選部公布的標準答案與本站自撰的逐題詳解，可免費線上模擬考、答完立即看解答。';
  const ld = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: '考英雄', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: '全部題庫', item: SITE + '/exam/' },
      { '@type': 'ListItem', position: 3, name: name + '考古題' }] },
    { '@type': 'CollectionPage', '@id': url + '#webpage', url: url, name: title, description: desc, inLanguage: 'zh-Hant',
      dateModified: TODAY, isPartOf: { '@id': SITE + '/#website' }, publisher: { '@id': SITE + '/#org' } }] };
  const out = shellHead(title, desc, url, ld);
  out.push('<nav class="kbc" aria-label="麵包屑"><a href="/">首頁</a> › <a href="/exam/">全部題庫</a> › <span>' + esc(name) + '考古題</span></nav>');
  out.push('<h1>' + esc(name) + '考古題與詳解</h1>');
  out.push('<p class="klead">收錄民國 ' + lo + ' 至 ' + hi + ' 年' + esc(name) + '考古題 <b>' + fmt(list.length) + '</b> 卷、<b>' + fmt(nq) +
    '</b> 題，涵蓋 ' + subjs + ' 個科目。標準答案取自考選部「考畢試題查詢平臺」，其中 <b>' + fmt(nx) +
    '</b> 題附有本站自撰的逐題詳解：說明正解理由、逐一點出其他選項錯在哪，並標註出處。點進任一卷可看全部題目與解答，或直接線上模擬考。</p>');
  out.push('<p class="kcta"><a class="kbtn" href="/mock/' + esc(x.id) + '/">▶ ' + esc(name) + '線上模擬考（' + subjs + ' 科，照正式題數限時）</a></p>');
  if (ESSAY_EXAMS[x.id]) out.push('<p>申論題：歷屆申論試題與參考答題架構在 <a href="/essay/">申論題庫</a>。</p>');
  out.push('<p class="kmut">年度：' + years.map(y => '<a href="#y' + y + '">' + y + '</a>').join('　') + '</p>');
  years.forEach(y => {
    const ys = list.filter(e => e.roc === y);
    out.push('<h2 id="y' + y + '">' + esc(name) + '考古題 ' + y + ' 年（' + ys.length + ' 卷）</h2>');
    out.push('<ul class="kidx">');
    ys.forEach(e => out.push('<li><a href="/exam/' + esc(e.id) + '/">' +
      esc(e.label.replace(/\s+/g, ' ').trim()) + '</a>　<span class="kmut">' + e.n + ' 題・詳解 ' + e.exp + ' 題</span></li>'));
    out.push('</ul>');
  });
  return shellFoot(out);
}

/* 各考試模擬考頁 mock/<考試>/index.html（2026-11-05 Tony #SCGO「A 做」）：
   「高普考模擬考」「醫師國考模擬考」這類搜尋的落地頁。內容全是本站實際的出題規格（題數、時間、卷數、年度），
   每科一顆按鈕連到 #/mock/<考試>/<科目>（app.js 的 viewMock 會帶入選擇），不另做一份模考程式。
   題數與時間的算法要跟 app.js 的 stdOf()／specOf() 一致：同科目全部卷裡最新一卷的題數與時間。 */
const MOCKCSS = '/css/paper.css?v=20261105a';
function stdOf(sid) {
  const l = EXAMS.filter(e => e.subj === sid).sort((a, b) => (b.roc || 0) - (a.roc || 0));
  if (!l.length) return null;
  const n = l[0].n, mins = l[0].mins || Math.round(l[0].n * 1.2);
  const ys = l.map(e => e.roc);
  return { n, mins, papers: l.length, lo: Math.min(...ys), hi: Math.max(...ys),
           exp: l.reduce((t, e) => t + e.exp, 0), nq: l.reduce((t, e) => t + e.n, 0) };
}
const SUBJS = window.APP_SUBJECTS || {};
const subjName = (sid, e) => (SUBJS[sid] && SUBJS[sid].name) || (e && e.subjName) || sid;
function mockStages(h) {
  const has = new Set(h.list.map(e => e.subj)), seen = new Set(), out = [];
  (h.x.stages || []).forEach(st => {
    const subs = (st.subjects || []).filter(sid => has.has(sid) && !seen.has(sid));
    subs.forEach(sid => seen.add(sid));
    if (subs.length) out.push({ name: st.name, note: st.note, subs });
  });
  const rest = [...has].filter(sid => !seen.has(sid));
  if (rest.length) out.push({ name: '其他科目', note: '', subs: rest });
  return out;
}
function mockHtml(h) {
  const { x, list } = h;
  const name = hubName(x);
  const url = SITE + '/mock/' + x.id + '/';
  const years = list.map(e => e.roc), lo = Math.min(...years), hi = Math.max(...years);
  const nq = list.reduce((t, e) => t + e.n, 0), nx = list.reduce((t, e) => t + e.exp, 0);
  const stages = mockStages(h);
  const nsub = stages.reduce((t, st) => t + st.subs.length, 0);
  const title = name + '線上模擬考｜免費限時、照正式題數，' + nsub + ' 科歷屆考古題｜考英雄';
  const desc = name + '線上模擬考：' + nsub + ' 個科目，從民國 ' + lo + '～' + hi + ' 年 ' + fmt(list.length) +
    ' 卷考古題隨機抽題，照正式題數與時間限時作答，交卷整卷批改、附逐題詳解與弱點診斷。免費、免註冊。';
  const faq = [
    [name + '模擬考的題目從哪裡來？',
     '全部來自考選部公布的' + name + '歷屆試題：民國 ' + lo + ' 至 ' + hi + ' 年共 ' + fmt(list.length) + ' 卷、' + fmt(nq) +
     ' 題，標準答案以考選部公告為準（含更正答案與送分題）。其中 ' + fmt(nx) + ' 題附有本站自撰的逐題詳解。'],
    ['一次考幾題、考多久？',
     '預設「全真規格」：照該科最近一次正式考試的題數與作答時間（各科規格列在上方）。時間不夠可選「半卷」（題數與時間各減半），或「20 題速刷」。'],
    ['交卷後看得到什麼？',
     '整卷批改與分數、每題的正解與詳解；答錯的題自動進「錯題本」排間隔複習，並依詳解標註的出處歸納弱點主題、產生補弱題單。'],
    ['同一科每次考的題目一樣嗎？',
     '一般模擬考每次從該科全部歷屆題庫隨機抽題，所以每次不同。想跟別人比分數就用「本週排名賽」：同一週同一科所有人拿到同一份題組，交卷後看得到自己贏過多少人。'],
    ['要付費或註冊嗎？',
     '模擬考免費、免註冊，打開就能考。用 Google 帳號登入可以把作答紀錄與錯題本同步到其他裝置。']
  ];
  const ld = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: '考英雄', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: '線上模擬考', item: SITE + '/mock/' },
      { '@type': 'ListItem', position: 3, name: name + '模擬考' }] },
    { '@type': 'WebPage', '@id': url + '#webpage', url: url, name: title, description: desc, inLanguage: 'zh-Hant',
      isPartOf: { '@id': SITE + '/#website' }, publisher: { '@id': SITE + '/#org' } },
    { '@type': 'FAQPage', mainEntity: faq.map(f => ({ '@type': 'Question', name: f[0],
      acceptedAnswer: { '@type': 'Answer', text: f[1] } })) }] };
  const out = shellHead(title, desc, url, ld).map(l => l.replace('/css/paper.css?v=20260912a', MOCKCSS));
  out.push('<nav class="kbc" aria-label="麵包屑"><a href="/">首頁</a> › <a href="/mock/">線上模擬考</a> › <span>' + esc(name) + '模擬考</span></nav>');
  out.push('<h1>' + esc(name) + '線上模擬考</h1>');
  out.push('<p class="klead">' + esc(x.note || '') + (x.note ? '。' : '') + '下面 ' + nsub + ' 個科目，每科都從民國 ' + lo + '～' + hi +
    ' 年的歷屆考古題隨機抽題，照正式題數與時間限時作答；作答中不顯示答案，交卷後整卷批改。</p>');
  out.push('<p class="kcta"><a class="kbtn" href="/#/mock/' + esc(x.id) + '">▶ 開始' + esc(name) + '模擬考</a></p>');
  stages.forEach(st => {
    out.push('<h2>' + esc(st.name) + (st.note ? '<span class="kmut">　' + esc(st.note) + '</span>' : '') + '</h2>');
    out.push('<ul class="kmk">');
    st.subs.forEach(sid => {
      const sd = stdOf(sid);
      const e0 = list.find(e => e.subj === sid);
      out.push('<li><div class="kmk-t"><b>' + esc(subjName(sid, e0)) + '</b>' +
        '<span class="kmut">正式規格 ' + sd.n + ' 題／' + sd.mins + ' 分鐘・題庫 ' + sd.papers + ' 卷（' +
        (sd.lo === sd.hi ? sd.lo : sd.lo + '～' + sd.hi) + ' 年）・詳解 ' + fmt(sd.exp) + ' 題</span></div>' +
        '<a class="kbtn kbtn-s" href="/#/mock/' + esc(x.id) + '/' + esc(sid) + '">開始模擬考</a></li>');
    });
    out.push('</ul>');
  });
  out.push('<h2>常見問題</h2>');
  faq.forEach(f => out.push('<h3>' + esc(f[0]) + '</h3><p>' + esc(f[1]) + '</p>'));
  out.push('<p>想先看整卷題目與解答：<a href="/exam/' + esc(x.id) + '/">' + esc(name) + '考古題（依年度）</a>' +
    (ESSAY_EXAMS[x.id] ? '；申論題在 <a href="/essay/">申論題庫</a>' : '') + '。其他考試的模擬考：<a href="/mock/">線上模擬考總覽</a>。</p>');
  return shellFoot(out);
}
function mockIndexHtml() {
  const url = SITE + '/mock/';
  const nq = EXAMS.reduce((t, e) => t + e.n, 0);
  const title = '國考線上模擬考｜高普考、地方特考、醫事國考、教檢免費限時模考｜考英雄';
  const desc = '國家考試線上模擬考：' + HUBS.length + ' 種考試、' + fmt(EXAMS.length) + ' 卷、' + fmt(nq) +
    ' 題歷屆考古題，照各科正式題數與時間限時作答，交卷整卷批改、附逐題詳解。免費、免註冊。';
  const ld = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: '考英雄', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: '線上模擬考' }] },
    { '@type': 'CollectionPage', '@id': url + '#webpage', url: url, name: title, description: desc, inLanguage: 'zh-Hant',
      isPartOf: { '@id': SITE + '/#website' }, publisher: { '@id': SITE + '/#org' } }] };
  const out = shellHead(title, desc, url, ld).map(l => l.replace('/css/paper.css?v=20260912a', MOCKCSS));
  out.push('<nav class="kbc" aria-label="麵包屑"><a href="/">首頁</a> › <span>線上模擬考</span></nav>');
  out.push('<h1>國考線上模擬考</h1>');
  out.push('<p class="klead">選一種考試，再挑科目開考。題目從考選部公布的歷屆試題隨機抽，題數與作答時間照該科正式規格；' +
    '作答中不顯示答案，交卷後整卷批改、看逐題詳解，錯題自動進錯題本。全部免費、免註冊。</p>');
  let lastCat = null;
  HUBS.forEach(h => {
    if (h.c.id !== lastCat) {
      if (lastCat) out.push('</ul>');
      out.push('<h2>' + esc(h.c.name) + '</h2><ul class="kmk">');
      lastCat = h.c.id;
    }
    const nsub = mockStages(h).reduce((t, st) => t + st.subs.length, 0);
    out.push('<li><div class="kmk-t"><a href="/mock/' + esc(h.x.id) + '/"><b>' + esc(hubName(h.x)) + '模擬考</b></a>' +
      '<span class="kmut">' + nsub + ' 科・' + fmt(h.list.length) + ' 卷</span></div></li>');
  });
  if (lastCat) out.push('</ul>');
  out.push('<p>只想看題目與解答：<a href="/exam/">全部考古題總覽</a>。</p>');
  return shellFoot(out);
}

/* 總覽、各考試頁與 sitemap：首頁 + 卷頁總覽 + 考試頁 + 全部卷頁 */
if (WRITE && !ONLY && !LIMIT) {
  fs.mkdirSync(OUT, { recursive: true });
  put(path.join(OUT, 'index.html'), indexHtml(), '/exam/');
  HUBS.forEach(h => {
    const dir = path.join(OUT, h.x.id);
    fs.mkdirSync(dir, { recursive: true });
    put(path.join(dir, 'index.html'), hubHtml(h), '/exam/' + h.x.id + '/');
  });
  const MOCK = path.join(ROOT, 'mock');
  fs.mkdirSync(MOCK, { recursive: true });
  put(path.join(MOCK, 'index.html'), mockIndexHtml(), '/mock/');
  HUBS.forEach(h => {
    const dir = path.join(MOCK, h.x.id);
    fs.mkdirSync(dir, { recursive: true });
    put(path.join(dir, 'index.html'), mockHtml(h), '/mock/' + h.x.id + '/');
  });
  const LM = Object.values(LASTMOD).sort().pop() || TODAY;   // 首頁跟著最新一頁走
  const u = (loc, pri) => '  <url><loc>' + SITE + loc + '</loc><lastmod>' + (LASTMOD[loc] || LM) + '</lastmod><priority>' + pri + '</priority></url>';
  const urls = [u('/', '1.0'), u('/exam/', '0.9')];
  HUBS.forEach(h => urls.push(u('/exam/' + h.x.id + '/', '0.8')));
  urls.push(u('/mock/', '0.9'));
  HUBS.forEach(h => urls.push(u('/mock/' + h.x.id + '/', '0.8')));
  EXAMS.forEach(e => urls.push(u('/exam/' + e.id + '/', '0.7')));
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'),
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.join('\n') + '\n</urlset>\n', 'utf8');
}

console.log('產生 ' + made + ' 頁，缺題本 ' + missing + ' 卷，合計 ' +
  (bytes / 1024 / 1024).toFixed(1) + ' MB，平均 ' + Math.round(bytes / made / 1024) + ' KB／頁' +
  (WRITE ? '，已寫入 exam/' + (ONLY || LIMIT ? '' : ' 與 sitemap.xml') : '（未加 --write）'));
