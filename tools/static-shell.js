/* static-shell.js — 靜態頁（exam/、mock/、essay/）共用的頁首（2026-11-05 Tony：「這UI為什麼沒和全站一致」）。
   樣式在 css/paper.css，配色、字型、頁首照 css/v2.css 抄（預設金榜深色，使用者在站內選的主題與字級也照用）；
   靜態頁不載 app.js，所以手機不做漢堡選單，導覽改成可橫捲的一列。改版型後 CSS 版本號在這裡改，再全量重產三種頁。 */
const CSS = '/css/paper.css?v=20261105c';

const NAV = [['/', '首頁'], ['/exam/', '考試題庫'], ['/mock/', '模擬考'], ['/essay/', '申論題庫'],
             ['/#/wrong', '錯題本'], ['/#/guide', '準備方式'], ['/#/support', '客服中心']];

/* 跟 index.html 同一份方章 logo */
const LOGO = '<svg class="mk" viewBox="0 0 40 40" aria-hidden="true" focusable="false"><defs><linearGradient id="lgmk" x1="0" y1="0" x2="1" y2="1">' +
  '<stop offset="0" stop-color="var(--lg1)"/><stop offset="1" stop-color="var(--lg2)"/></linearGradient></defs>' +
  '<rect x="1" y="1" width="38" height="38" rx="11" fill="url(#lgmk)"/>' +
  '<text x="20" y="20" text-anchor="middle" dominant-baseline="central" font-size="26" font-weight="800" fill="var(--lg3)">考</text></svg>';

/* head 裡：讀站內的顯示偏好（kaohero.prefs），第一格就是使用者選的配色與字級 */
const PREFS = '<script>(function(r){try{var o=JSON.parse(localStorage.getItem("kaohero.prefs")||"{}");' +
  'if(o.fs)r.setAttribute("data-fs",o.fs);if(o.theme&&o.theme!=="auto")r.setAttribute("data-theme",o.theme);}catch(e){}})(document.documentElement)</scr' + 'ipt>';

function head() {
  return '<link rel="icon" href="/img/logo.png" type="image/png">\n<link rel="stylesheet" href="' + CSS + '">\n' + PREFS;
}

/* cur＝目前所在的區（'/exam/'、'/mock/'、'/essay/'），那一顆亮起來 */
function header(cur) {
  return '<header class="hd"><div class="hd-in"><a class="logo" href="/" aria-label="考英雄">' + LOGO +
    '<span class="tx" aria-hidden="true">英雄</span></a><nav class="knav" aria-label="主選單">' +
    NAV.map(([h, t]) => '<a href="' + h + '"' + (h === cur ? ' class="on" aria-current="page"' : '') + '>' + t + '</a>').join('') +
    '</nav></div></header>';
}

module.exports = { CSS, head, header };
