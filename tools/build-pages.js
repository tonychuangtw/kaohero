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
const TODAY = new Date().toISOString().slice(0, 10);

global.window = {};
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
  if (q.fig) parts.push('<p class="kfig"><img src="/' + esc(q.fig) + '" alt="' +
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
  const catName = CAT[e.cat] || e.cat;
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
          { '@type': 'ListItem', position: 2, name: catName, item: SITE + '/#/exams' },
          { '@type': 'ListItem', position: 3, name: examName, item: SITE + '/#/exam/' + e.exam },
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
  out.push('<nav class="kbc" aria-label="麵包屑"><a href="/">首頁</a> › <a href="/#/exams">' + esc(catName) +
    '</a> › <a href="/#/exam/' + esc(e.exam) + '">' + esc(examName) + '</a> › <span>' + esc(e.label.replace(/\s+/g, ' ').trim()) + '</span></nav>');
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
    fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
  }
});

/* 卷頁總覽 exam/index.html：讓爬蟲不必只靠 sitemap 就能走到每一卷 */
function indexHtml() {
  const url = SITE + '/exam/';
  const title = '國考考古題全部題庫總覽（2,377 卷）｜考英雄';
  const desc = '考英雄收錄的 2,377 卷國家考試考古題總覽，依考試與年度排列，每一卷都附考選部標準答案與本站自撰的逐題詳解。';
  const out = [];
  out.push('<!DOCTYPE html>\n<html lang="zh-Hant">\n<head>');
  out.push('<meta charset="utf-8">');
  out.push('<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">');
  out.push('<title>' + esc(title) + '</title>');
  out.push('<meta name="description" content="' + esc(desc) + '">');
  out.push('<link rel="canonical" href="' + url + '">');
  out.push('<meta property="og:url" content="' + url + '"><meta property="og:title" content="' + esc(title) + '">');
  out.push('<meta property="og:description" content="' + esc(desc) + '"><meta property="og:site_name" content="考英雄">');
  out.push('<link rel="stylesheet" href="/css/paper.css?v=20260912a">');
  out.push('</head>\n<body>');
  out.push('<header class="kh"><a class="klogo" href="/">考英雄</a>' +
    '<nav class="knav"><a href="/#/exams">考試題庫</a><a href="/#/guide">準備方式</a><a href="/#/support">客服中心</a></nav></header>');
  out.push('<main class="kwrap">');
  out.push('<nav class="kbc"><a href="/">首頁</a> › <span>全部題庫</span></nav>');
  out.push('<h1>國考考古題全部題庫總覽</h1>');
  out.push('<p class="klead">共 ' + EXAMS.length + ' 卷、' + EXAMS.reduce((s, e) => s + e.n, 0).toLocaleString('en-US') +
    ' 題。點進任一卷可看該卷全部題目與標準答案，並免費試讀前 ' + PREVIEW + ' 題詳解。</p>');
  CATS.forEach(c => {
    (c.exams || []).forEach(x => {
      const list = EXAMS.filter(e => e.exam === x.id)
        .sort((a, b) => (b.roc - a.roc) || (b.nth - a.nth) || String(a.subj).localeCompare(String(b.subj)));
      if (!list.length) return;
      out.push('<h2>' + esc(c.name + '｜' + x.name) + '（' + list.length + ' 卷）</h2>');
      out.push('<ul class="kidx">');
      list.forEach(e => out.push('<li><a href="/exam/' + esc(e.id) + '/">' +
        esc(e.label.replace(/\s+/g, ' ').trim()) + '</a>　<span class="kmut">' + e.n + ' 題・詳解 ' + e.exp + ' 題</span></li>'));
      out.push('</ul>');
    });
  });
  out.push('<p class="kfine">題目與標準答案來源：<a href="https://wwwq.moex.gov.tw/exam/wFrmExamQandA.aspx" rel="noopener">考選部考畢試題查詢平臺</a>（政府資訊公開資料）。最後更新：<time datetime="' + TODAY + '">' + TODAY + '</time>。</p>');
  out.push('</main>');
  out.push('<footer class="kft"><a href="/">考英雄首頁</a>　·　<a href="/#/exams">考試題庫總覽</a>　·　<a href="/#/about">使用說明</a></footer>');
  out.push('</body></html>');
  return out.join('\n');
}

/* sitemap：首頁 + 卷頁總覽 + 全部卷頁 */
if (WRITE && !ONLY && !LIMIT) {
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, 'index.html'), indexHtml(), 'utf8');
}
if (WRITE && !ONLY && !LIMIT) {
  const urls = ['  <url><loc>' + SITE + '/</loc><lastmod>' + TODAY + '</lastmod><priority>1.0</priority></url>',
                '  <url><loc>' + SITE + '/exam/</loc><lastmod>' + TODAY + '</lastmod><priority>0.9</priority></url>'];
  EXAMS.forEach(e => urls.push('  <url><loc>' + SITE + '/exam/' + e.id + '/</loc><lastmod>' + TODAY + '</lastmod><priority>0.7</priority></url>'));
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'),
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.join('\n') + '\n</urlset>\n', 'utf8');
}

console.log('產生 ' + made + ' 頁，缺題本 ' + missing + ' 卷，合計 ' +
  (bytes / 1024 / 1024).toFixed(1) + ' MB，平均 ' + Math.round(bytes / made / 1024) + ' KB／頁' +
  (WRITE ? '，已寫入 exam/' + (ONLY || LIMIT ? '' : ' 與 sitemap.xml') : '（未加 --write）'));
