/* 申論題每一科一個靜態頁 essay/<f>/index.html＋總覽 essay/index.html＋sitemap-essay.xml（2026-10-04 Tony「好」）。
   目的：申論題庫原本只有 `#/essay/<key>` 的 hash 路由，Google 一頁都看不到；「科目＋申論＋擬答」是考生常搜的詞。

   ⚠ 容量：GitHub Pages 整站上限 1GB，10/04 已用約 780MB。所以參考架構只放開頭的【破題】一段，
   完整架構連回站內（以後付費也能把完整版留在站內，不必從 Google 收回）。題目原文是考選部公開資料，照登。
   sitemap 另開一份 sitemap-essay.xml（robots.txt 有列）：tools/build-pages.js 全量重建時會整個重寫 sitemap.xml，
   寫在同一份會被洗掉。

   用法：node tools/build-essay-pages.js [--write] [--only <科目 key>]
   essay-ref-batch.sh 每批寫完會用 --only 重產該科。 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'essay');
const SITE = 'https://kaohero.com';
const WRITE = process.argv.includes('--write');
const ONLY = (function () { const i = process.argv.indexOf('--only'); return i > 0 ? process.argv[i + 1] : ''; })();
const TODAY = new Date().toISOString().slice(0, 10);
const EXAM = { gao: '高普考', local: '地方特考', pol: '警察特考' };

global.window = {};
require(path.join(ROOT, 'js/data/essays.js'));
const SUBJ = window.APP_ESSAY_SUBJ;

const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const appUrl = k => '/#/essay/' + encodeURIComponent(k);
/* 等別名稱：高普考的 lv 已經是「高考三級」「普考」，地方特考／警察特考的 lv 是「三等」，要補考試名 */
const lab = e => /考/.test(e.lv) ? e.lv : (EXAM[e.exam] || e.exam) + e.lv;
const sumName = e => e.name + '（' + lab(e) + '）';

function loadSubj(k) {
  const f = path.join(ROOT, 'js/data/essay', SUBJ[k].f + '.js');
  if (!fs.existsSync(f)) return null;
  global.window = {};
  require(f);
  return window.APP_ESSAY_PAPERS[k];
}

/* 參考架構的【破題】段；沒有這個標題就取開頭一段 */
function lead(ref) {
  const m = String(ref).match(/【破題】\s*([\s\S]*?)(?=\n?【|$)/);
  let t = (m ? m[1] : String(ref).split(/\n\s*\n/)[0]).trim();
  if (t.length > 260) t = t.slice(0, 250).replace(/[，、；。,;.\s]*[^，、；。,;.\s]*$/, '') + '…';
  return t;
}

const para = s => String(s).split('\n').filter(x => x.trim()).map(x => '<p>' + esc(x) + '</p>').join('');

function head(title, desc, url, ld) {
  return ['<!DOCTYPE html>', '<html lang="zh-Hant">', '<head>', '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">',
    '<title>' + esc(title) + '</title>',
    '<meta name="description" content="' + esc(desc) + '">',
    '<link rel="canonical" href="' + url + '">',
    '<meta property="og:type" content="article">',
    '<meta property="og:url" content="' + url + '">',
    '<meta property="og:site_name" content="考英雄">',
    '<meta property="og:locale" content="zh_TW">',
    '<meta property="og:title" content="' + esc(title) + '">',
    '<meta property="og:description" content="' + esc(desc) + '">',
    '<meta property="og:image" content="' + SITE + '/img/og.png">',
    '<meta name="twitter:card" content="summary_large_image">',
    ld ? '<script type="application/ld+json">' + JSON.stringify(ld) + '</scr' + 'ipt>' : '',
    '<link rel="icon" href="/img/logo.png" type="image/png">',
    '<link rel="stylesheet" href="/css/paper.css?v=20260912a">',
    '</head>', '<body>',
    '<header class="kh"><a class="klogo" href="/">考英雄</a>' +
    '<nav class="knav"><a href="/#/exams">考試題庫</a><a href="/essay/">申論題庫</a><a href="/#/support">客服中心</a></nav></header>',
    '<main class="kwrap">'].filter(Boolean);
}

const FOOT = ['</main>',
  '<footer class="kft"><a href="/">考英雄首頁</a>　·　<a href="/essay/">申論題庫總覽</a>　·　<a href="/exam/">選擇題考古題總覽</a></footer>',
  '</body></html>'];
const SRC_NOTE = '<p class="kfine">題目來源：<a href="https://wwwq.moex.gov.tw/exam/wFrmExamQandA.aspx" rel="noopener">考選部考畢試題查詢平臺</a>（政府資訊公開資料）；' +
  '參考架構為本站自撰，僅供準備方向參考，非官方標準答案。最後更新：<time datetime="' + TODAY + '">' + TODAY + '</time>。</p>';

function pageHtml(k, e, ps) {
  const url = SITE + '/essay/' + e.f + '/';
  const yrs = ps.map(p => p.roc);
  const span = Math.min(...yrs) + '～' + Math.max(...yrs);
  const title = e.name + ' 申論題歷屆試題與參考架構（' + lab(e) + '）｜考英雄';
  const nref = ps.reduce((s, p) => s + p.qs.filter(q => q.ref).length, 0);
  const desc = lab(e) + '「' + e.name + '」申論題，民國 ' + span + ' 年共 ' + e.nq + ' 題原題，' +
    (nref ? nref + ' 題附本站自撰的參考答題架構（破題、架構、關鍵字、作答提醒）。' : '附原卷 PDF 連結。');
  const tracks = (e.tracks || []).map(t => t.split('-').slice(1).join('-'));
  const ld = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: '考英雄', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: '申論題庫', item: SITE + '/essay/' },
      { '@type': 'ListItem', position: 3, name: sumName(e) }] },
    { '@type': 'WebPage', '@id': url + '#webpage', url: url, name: title, description: desc, inLanguage: 'zh-Hant',
      dateModified: TODAY, isPartOf: { '@id': SITE + '/#website' }, publisher: { '@id': SITE + '/#org' } },
    { '@type': 'WebSite', '@id': SITE + '/#website', url: SITE + '/', name: '考英雄', inLanguage: 'zh-Hant' },
    { '@type': 'Organization', '@id': SITE + '/#org', name: '考英雄', url: SITE + '/',
      logo: { '@type': 'ImageObject', url: SITE + '/img/logo.png', width: 512, height: 512 } }] };
  const out = head(title, desc, url, ld);
  out.push('<nav class="kbc" aria-label="麵包屑"><a href="/">首頁</a> › <a href="/essay/">申論題庫</a> › <span>' + esc(sumName(e)) + '</span></nav>');
  out.push('<h1>' + esc(e.name + '　申論題歷屆試題與參考架構') + '</h1>');
  out.push('<p class="klead">' + esc(lab(e)) + '，民國 ' + span + ' 年共 <b>' + ps.length + '</b> 份試卷、<b>' + e.nq +
    '</b> 題' + (nref ? '，其中 <b>' + nref + '</b> 題附參考答題架構' : '') + '。' +
    (tracks.length ? '考這一科的類科：' + esc(tracks.slice(0, 12).join('、')) + (tracks.length > 12 ? ' 等 ' + tracks.length + ' 個類科' : '') + '。' : '') +
    '本頁列出歷年全部題目，參考架構只列開頭的「破題」，完整的答題架構、關鍵字與作答提醒請到站內查看。</p>');
  out.push('<p class="kcta"><a class="kbtn" href="' + appUrl(k) + '">▶ 看完整參考架構（' + esc(e.name) + '）</a></p>');
  ps.forEach(p => {
    out.push('<section class="krel"><h2>' + p.roc + ' 年' + (p.mins ? '（考試時間 ' + p.mins + ' 分鐘）' : '') +
      '　<a href="' + esc(p.src) + '" rel="noopener nofollow">原卷 PDF</a></h2><ol class="klist">');
    p.qs.forEach(q => {
      out.push('<li class="kq"><div class="kqt"><span class="kn">' + q.n + '</span>' + para(q.q) +
        (q.pt ? '<p class="kmut">（' + q.pt + ' 分）</p>' : '') + '</div>');
      if (q.ref) out.push('<div class="kexp"><p class="ktag">參考架構・破題</p><p>' + esc(lead(q.ref)) +
        '</p><p class="kexp-lock">完整答題架構與關鍵字：<a href="' + appUrl(k) + '">到站內看全文</a></p></div>');
      else if (q.warn && (q.warn.includes('fig') || q.warn.includes('math')))
        out.push('<p class="kexp-lock">本題含圖表或公式，請對照<a href="' + esc(p.src) + '" rel="noopener nofollow">原卷 PDF</a>。</p>');
      out.push('</li>');
    });
    out.push('</ol></section>');
  });
  const sib = Object.keys(SUBJ).filter(x => x !== k && SUBJ[x].name === e.name);
  if (sib.length) {
    out.push('<section class="krel"><h2>其他等別的「' + esc(e.name) + '」</h2><ul>');
    sib.forEach(x => out.push('<li><a href="/essay/' + SUBJ[x].f + '/">' + esc(sumName(SUBJ[x])) + '</a>（' + SUBJ[x].nq + ' 題）</li>'));
    out.push('</ul></section>');
  }
  out.push(SRC_NOTE);
  return out.concat(FOOT).join('\n');
}

function indexHtml() {
  const url = SITE + '/essay/';
  const keys = Object.keys(SUBJ);
  const nq = keys.reduce((s, k) => s + SUBJ[k].nq, 0), nref = keys.reduce((s, k) => s + (SUBJ[k].ref || 0), 0);
  const title = '國考申論題歷屆試題與參考架構總覽（' + keys.length.toLocaleString('en-US') + ' 科）｜考英雄';
  const desc = '高普考、地方特考、警察特考 ' + keys.length.toLocaleString('en-US') + ' 個申論科目、' + nq.toLocaleString('en-US') +
    ' 題歷屆原題，' + nref.toLocaleString('en-US') + ' 題附本站自撰的參考答題架構。';
  const out = head(title, desc, url, null);
  out.push('<nav class="kbc"><a href="/">首頁</a> › <span>申論題庫</span></nav>');
  out.push('<h1>國考申論題歷屆試題與參考架構</h1>');
  out.push('<p class="klead">' + esc(desc) + '點進任一科可看歷年全部題目與每題的破題方向。</p>');
  ['gao', 'local', 'pol'].forEach(ex => {
    const ks = keys.filter(k => SUBJ[k].exam === ex);
    const lvs = [...new Set(ks.map(k => SUBJ[k].lvl))].sort((a, b) => a - b);
    lvs.forEach(lv => {
      const list = ks.filter(k => SUBJ[k].lvl === lv).sort((a, b) => SUBJ[a].name.localeCompare(SUBJ[b].name, 'zh-Hant'));
      out.push('<h2>' + esc(EXAM[ex] + '｜' + SUBJ[list[0]].lv) + '（' + list.length + ' 科）</h2><ul class="kidx">');
      list.forEach(k => out.push('<li><a href="/essay/' + SUBJ[k].f + '/">' + esc(SUBJ[k].name) + '</a>　<span class="kmut">' +
        SUBJ[k].nq + ' 題' + (SUBJ[k].ref ? '・架構 ' + SUBJ[k].ref + ' 題' : '') + '</span></li>'));
      out.push('</ul>');
    });
  });
  out.push(SRC_NOTE);
  return out.concat(FOOT).join('\n');
}

let keys = Object.keys(SUBJ);
if (ONLY) keys = keys.filter(k => k === ONLY);
let bytes = 0, made = 0;
keys.forEach(k => {
  const ps = loadSubj(k);
  if (!ps || !ps.length) return;
  const html = pageHtml(k, SUBJ[k], ps);
  bytes += Buffer.byteLength(html); made++;
  if (WRITE) {
    fs.mkdirSync(path.join(OUT, SUBJ[k].f), { recursive: true });
    fs.writeFileSync(path.join(OUT, SUBJ[k].f, 'index.html'), html, 'utf8');
  }
});
if (WRITE) {
  // 總覽頁的計數每批都會變，--only 也一併重產（很小）
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, 'index.html'), indexHtml(), 'utf8');
  if (!ONLY) {
    const urls = ['  <url><loc>' + SITE + '/essay/</loc><lastmod>' + TODAY + '</lastmod><priority>0.9</priority></url>'];
    Object.keys(SUBJ).forEach(k => urls.push('  <url><loc>' + SITE + '/essay/' + SUBJ[k].f + '/</loc><lastmod>' + TODAY + '</lastmod><priority>0.6</priority></url>'));
    fs.writeFileSync(path.join(ROOT, 'sitemap-essay.xml'),
      '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
      urls.join('\n') + '\n</urlset>\n', 'utf8');
  }
}
console.log('產生 ' + made + ' 頁，合計 ' + (bytes / 1024 / 1024).toFixed(1) + ' MB，平均 ' +
  Math.round(bytes / Math.max(made, 1) / 1024) + ' KB／頁' + (WRITE ? '，已寫入 essay/' : '（未加 --write）'));
