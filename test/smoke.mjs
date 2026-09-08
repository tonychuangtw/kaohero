/* 瀏覽器 smoke test：用 CDP 驅動 chrome-headless-shell 把站點實際走一遍。
   找不到 shell 就跳過（exit 0）。用法：node test/smoke.mjs */
import { spawn } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { setTimeout as sleep } from 'node:timers/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// 索引的實際卷數／題數（測試不寫死數字，加新考試不必改這支）
const IDX = (() => {
  globalThis.window = {};
  const src = readFileSync(resolve(ROOT, 'js/data/exams.js'), 'utf8');
  (0, eval)(src);
  const ex = globalThis.window.APP_EXAMS;
  return { n: ex.length, q: ex.reduce((a, b) => a + b.n, 0) };
})();
const SHELL = process.env.CHROME_SHELL ||
  process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-linux64/chrome-headless-shell';
if (!existsSync(SHELL)) {
  console.log('⚠️  跳過瀏覽器 smoke test：找不到 ' + SHELL);
  process.exit(process.env.SMOKE_REQUIRED ? 1 : 0);
}
const fails = [];
const ok = (c, m) => { console.log((c ? '  ✓ ' : '  ✗ ') + m); if (!c) fails.push(m); };
const PORT = 8931 + (process.pid % 300);
const srv = spawn('python3', ['-m', 'http.server', String(PORT), '-b', '127.0.0.1'], { cwd: ROOT, stdio: 'ignore' });
const chrome = spawn(SHELL, ['--headless', '--disable-gpu', '--no-sandbox',
  '--remote-debugging-port=0', '--remote-allow-origins=*', 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
let wsUrl = '';
chrome.stderr.on('data', d => { const m = String(d).match(/ws:\/\/[^\s]+/); if (m && !wsUrl) wsUrl = m[0]; });
for (let i = 0; i < 100 && !wsUrl; i++) await sleep(100);
if (!wsUrl) { console.log('無法啟動 chrome-headless-shell'); srv.kill(); chrome.kill(); process.exit(1); }
const ws = new WebSocket(wsUrl); await new Promise(r => ws.onopen = r);
let id = 0; const waits = new Map(); const logs = [];
/* 本機測試伺服器的 origin（127.0.0.1:89xx）不在 Google OAuth 的允許清單裡，
   GSI 一定會抱怨一句 "The given origin is not allowed for the given client ID"。
   那是測試環境的必然結果、不是站上的 bug（正式站 tonychuangtw.github.io 已登記），
   所以只忽略這一句，其他 console 錯誤照樣要抓。 */
const IGNORE = [/GSI_LOGGER.*origin is not allowed/i];
ws.onmessage = e => {
  const m = JSON.parse(e.data);
  if (m.id && waits.has(m.id)) { waits.get(m.id)(m); waits.delete(m.id); }
  if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') {
    const line = m.params.args.map(a => a.value ?? a.description).join(' ');
    if (!IGNORE.some(re => re.test(line))) logs.push(line);
  }
  if (m.method === 'Runtime.exceptionThrown')
    logs.push('EXCEPTION ' + (m.params.exceptionDetails?.exception?.description || ''));
};
const send = (method, params = {}, sessionId) => new Promise(r => {
  const i = ++id; waits.set(i, r); ws.send(JSON.stringify({ id: i, method, params, sessionId }));
});
const { result: { targetId } } = await send('Target.createTarget', { url: 'about:blank' });
const { result: { sessionId } } = await send('Target.attachToTarget', { targetId, flatten: true });
await send('Runtime.enable', {}, sessionId); await send('Page.enable', {}, sessionId);
await send('Emulation.setDeviceMetricsOverride', { width: 430, height: 900, deviceScaleFactor: 2, mobile: true }, sessionId);
const ev = async (e) => {
  const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true }, sessionId);
  if (r.result?.exceptionDetails) throw new Error(r.result.exceptionDetails.text);
  return r.result?.result?.value;
};
const go = async (hash) => {
  await send('Page.navigate', { url: `http://127.0.0.1:${PORT}/index.html${hash || ''}` }, sessionId);
  for (let i = 0; i < 120; i++) { await sleep(100); if (await ev('document.readyState === "complete"')) break; }
  await sleep(350);
};
const hash = async (h) => { await ev(`location.hash='${h}'`); await sleep(320); };

console.log('\n考古英雄 smoke test');
await go('');

// --- 資料 ---
// 卷數與題數不寫死：直接跟 js/data/exams.js 的實際內容比對（加新考試就不用改測試）
ok(await ev(`window.APP_EXAMS.length === ${IDX.n}`), `索引載入 ${IDX.n} 卷`);
ok(await ev(`window.APP_EXAMS.reduce((a,b)=>a+b.n,0) === ${IDX.q}`), `索引合計 ${IDX.q.toLocaleString('en-US')} 題`);
ok(await ev('window.APP_CATS.length >= 4'), '至少四個考試分類');

// --- 首頁 ---
ok(await ev('document.querySelectorAll("#main .hero").length === 1'), '首頁有 hero 區塊');
ok(await ev('document.querySelectorAll("#main .card").length >= 6'), '首頁列出考試類別卡片');
ok((await ev('document.querySelector("#main .hero").textContent')).includes(IDX.q.toLocaleString('en-US')), 'hero 顯示總題數');
ok(await ev('document.querySelectorAll("#nav a").length === 5'), '導覽列五個項目');  // 2026-09-08 起「考取心得」暫時移出導覽
ok(await ev('document.querySelectorAll(".ft a").length >= 5'), '頁尾有連結');

// --- 導覽到考試 → 科目 → 卷 ---
await hash('#/exams');
ok(await ev('document.querySelectorAll("#main .cards").length >= 4'), '題庫總覽列出各分類');
await hash('#/exam/doctor');
ok(await ev('document.querySelectorAll("#main .panel .it").length >= 6'), '醫師頁列出六個科目');
ok((await ev('document.getElementById("main").textContent')).includes('第二階段'), '醫師頁含第二階段');
await hash('#/subject/doctor/med3');
ok((await ev('document.querySelector(".pg-h").textContent')).includes('醫學（三）'), '進入醫學（三）科目頁');
ok(await ev('document.querySelectorAll("#main .panel .it").length >= 20'), '科目頁列出各年份卷別');

// --- 牙醫師（2026-09-06 新增）---
await hash('#/exam/dentist');
ok(await ev('document.querySelectorAll("#main .panel .it").length >= 6'), '牙醫師頁列出六個科目');
ok((await ev('document.getElementById("main").textContent')).includes('第二階段'), '牙醫師頁含第二階段');
await hash('#/subject/dentist/dent5');
ok((await ev('document.querySelector(".pg-h").textContent')).includes('牙醫學（五）'), '進入牙醫學（五）科目頁');
ok(await ev('document.querySelectorAll("#main .panel .it").length >= 20'), '牙醫學（五）列出各年份卷別');

// --- 中醫師（2026-09-06 新增）---
await hash('#/exam/cm');
ok(await ev('document.querySelectorAll("#main .panel .it").length >= 6'), '中醫師頁列出六個科目');
await hash('#/subject/cm/cmc4');
ok((await ev('document.querySelector(".pg-h").textContent')).includes('中醫臨床醫學（四）'), '進入中醫臨床醫學（四）科目頁');
ok(await ev('document.querySelectorAll("#main .panel .it").length >= 20'), '中醫臨床醫學（四）列出各年份卷別');

// --- 藥師（2026-09-06 新增）---
await hash('#/exam/pharm');
ok(await ev('document.querySelectorAll("#main .panel .it").length >= 6'), '藥師頁列出六個科目');
await hash('#/subject/pharm/ph1');
ok((await ev('document.querySelector(".pg-h").textContent')).includes('藥學（一）'), '進入藥學（一）科目頁');
ok(await ev('document.querySelectorAll("#main .panel .it").length >= 20'), '藥學（一）列出各年份卷別');

await hash('#/exam/lawyer');
ok(await ev('document.querySelectorAll("#main .panel .it").length === 4'), '律師頁列出四個科目');
const lawPid = await ev(`window.APP_EXAMS.filter(e=>e.exam==='lawyer')[0].id`);
await hash('#/paper/' + lawPid);
for (let i = 0; i < 60 && !(await ev('!!document.querySelector("#main .opt")')); i++) await sleep(100);
ok(await ev('document.querySelectorAll("#main .opt").length === 4'), '律師卷可以作答');

// --- 整卷測驗 ---
const pid = await ev(`window.APP_EXAMS.filter(e=>e.subj==='med3')[0].id`);
await hash('#/paper/' + pid);
for (let i = 0; i < 60 && !(await ev('!!document.querySelector("#main .opt")')); i++) await sleep(100);
ok(await ev('document.querySelectorAll("#main .opt").length === 4'), '整卷測驗載入並顯示四個選項');
ok((await ev('document.querySelector("#main .stem").textContent.trim().length')) > 5, '題幹有內容');
await ev(`document.querySelectorAll('#main .opt')[0].click()`); await sleep(250);
ok(await ev('document.querySelectorAll("#main .opt.correct").length === 1'), '作答後標出正解');
ok(await ev('!!localStorage.getItem("kaoguhero.v1")'), '作答紀錄寫入 localStorage');
await ev(`[...document.querySelectorAll('#main .btn')].find(b=>/下一題|看結果/.test(b.textContent)).click()`);
await sleep(250);
ok((await ev(`document.querySelector('#main .qmeta span').textContent`)).includes('第 2 /'), '可以進到第 2 題');
await ev(`[...document.querySelectorAll('#main .btn')].find(b=>b.textContent.includes('結束')).click()`);
await sleep(300);
ok(await ev('!!document.querySelector("#main .big")'), '結束後顯示成績');

// --- 送分題 ---
const vp = await ev(`(async()=>{ for (const e of window.APP_EXAMS) {
   const t = await fetch('js/data/exam/'+e.id+'.js').then(r=>r.text()).catch(()=>'');
   if (t.indexOf('"void"') >= 0) {
     await new Promise(r=>{const s=document.createElement('script');s.src='js/data/exam/'+e.id+'.js';s.onload=r;s.onerror=r;document.head.appendChild(s);});
     return e.id; } } return '';})()`);
ok(!!vp, '找得到含送分題的卷別：' + vp);
ok(await ev(`window.APP_EXAM_PAPERS['${vp}'].qs.filter(q=>q.void).every(q=>typeof q.a==='number')`),
   '送分題仍保有可作答的結構');

// --- 圖片題 ---
ok(await ev(`window.APP_EXAMS.length>0`), '索引可用');
const figPaper = await ev(`(async()=>{ for (const e of window.APP_EXAMS) {
   if(!window.APP_EXAM_PAPERS[e.id]) continue;
   const p=window.APP_EXAM_PAPERS[e.id]; if(p.qs.some(q=>q.fig)) return e.id; } return '';})()`);
if (figPaper) {
  const src = await ev(`window.APP_EXAM_PAPERS['${figPaper}'].qs.find(q=>q.fig).fig`);
  ok(await ev(`fetch('${src}').then(r=>r.ok).catch(()=>false)`), '圖片題的圖檔存在：' + src);
}

// --- 詳解 ---
await ev(`new Promise(r=>{const s=document.createElement('script');s.src='js/data/exam/doc-115-2-med1.js';s.onload=r;s.onerror=r;document.head.appendChild(s);})`);
const expN = await ev(`window.APP_EXAM_PAPERS['doc-115-2-med1'].qs.filter(q=>q.exp).length`);
ok(expN > 0, `已寫詳解 ${expN} 題`);
ok(await ev(`window.APP_EXAMS.filter(e=>e.exp>0).length > 0`), '索引記錄了各卷的詳解題數');
ok(await ev(`window.APP_EXAMS.every(e=>typeof e.exp==='number' && e.exp<=e.n)`), '詳解題數不超過該卷題數');
ok(await ev(`window.APP_EXAM_PAPERS['doc-115-2-med1'].qs.filter(q=>q.exp).every(q=>q.exp.indexOf('📚')>=0)`),
   '每則詳解都附出處');
await hash('#/paper/doc-115-2-med1');
for (let i = 0; i < 60 && !(await ev('!!document.querySelector("#main .opt")')); i++) await sleep(100);
await ev(`document.querySelectorAll('#main .opt')[0].click()`); await sleep(250);
ok((await ev(`document.querySelector('#main .fb')?.textContent || ''`)).includes('📚'), '作答後看得到詳解與出處');

// --- 錯題本／統計 ---
await hash('#/wrong');
ok(!!(await ev('document.querySelector(".pg-h")')), '錯題本頁可開啟');
await hash('#/stats');
ok((await ev('document.getElementById("main").textContent')).includes('正確率'), '弱點統計頁可開啟');

// --- 內容頁 ---
for (const [h, kw] of [['#/guide', '準備方式'], ['#/stories', '考取心得'],
                       ['#/sponsor', '贊助'], ['#/support', '客服'], ['#/about', '版本紀錄']]) {
  await hash(h);
  ok((await ev('document.getElementById("main").textContent')).includes(kw), h + ' 內容頁可開啟');
}
await hash('#/no-such-page');
ok((await ev('document.getElementById("main").textContent')).includes('找不到'), '未知網址顯示找不到頁面');

// --- 顯示設定：字級／配色／語言 ---
await hash('#/');
ok(await ev('!!document.getElementById("gear")'), '頁首有顯示設定按鈕');
await ev(`document.getElementById('gear').click()`); await sleep(200);
ok(await ev(`document.getElementById('prefs').classList.contains('open')`), '設定面板可展開');
ok(await ev(`document.querySelectorAll('#prefs .chips').length === 3`), '面板有字級／配色／語言三組');

// 字級
const base = await ev(`parseFloat(getComputedStyle(document.body).fontSize)`);
await ev(`[...document.querySelectorAll('#prefs .chips')][0].lastChild.click()`); await sleep(200);
const big = await ev(`parseFloat(getComputedStyle(document.body).fontSize)`);
ok(big > base + 1, `字級可放大（${base}px → ${big}px）`);
ok(await ev(`document.documentElement.getAttribute('data-fs') === 'xl'`), '字級設定寫進 data-fs');

// 配色
await ev(`[...document.querySelectorAll('#prefs .chips')][1].children[2].click()`); await sleep(200);
ok(await ev(`document.documentElement.getAttribute('data-theme') === 'dark'`), '可切換到深色');
const darkBg = await ev(`getComputedStyle(document.body).backgroundColor`);
await ev(`[...document.querySelectorAll('#prefs .chips')][1].children[3].click()`); await sleep(200);
ok(await ev(`getComputedStyle(document.body).backgroundColor !== '${darkBg}'`), '護眼米配色與深色不同');

// 語言
await ev(`[...document.querySelectorAll('#prefs .chips')][2].lastChild.click()`); await sleep(300);
ok(await ev(`document.documentElement.lang === 'en'`), '切英文後 html lang=en');
ok((await ev(`document.getElementById('nav').textContent`)).includes('Question banks'), '導覽列變成英文');
ok((await ev(`document.getElementById('main').textContent`)).includes('Others give you a letter'), '首頁文案變成英文');
ok((await ev(`document.querySelector('.ft').textContent`)).includes('About Kaoguhero'), '頁尾也變成英文');
// 題目內容不翻譯
await hash('#/paper/doc-115-2-med1');
for (let i = 0; i < 60 && !(await ev('!!document.querySelector("#main .opt")')); i++) await sleep(100);
ok(/[\u4e00-\u9fff]/.test(await ev(`document.querySelector('#main .stem').textContent`)), '英文模式下題幹仍是中文原文');
ok((await ev(`document.getElementById('main').textContent`)).includes('Q 1 /'), '英文模式的題號是英文格式');
// 設定會存起來
ok(await ev(`JSON.parse(localStorage.getItem('kaoguhero.prefs')).lang === 'en'`), '設定寫入 localStorage');
await go('');
ok(await ev(`document.documentElement.lang === 'en' && document.documentElement.getAttribute('data-fs') === 'xl'`),
   '重新載入後設定保留');
// 切回中文，免得影響後續
await ev(`document.getElementById('gear').click()`); await sleep(150);
await ev(`[...document.querySelectorAll('#prefs .chips')][2].firstChild.click()`); await sleep(250);
ok((await ev(`document.getElementById('nav').textContent`)).includes('考試題庫'), '可以切回中文');


// ---- 登入／同步／回報／後台（2026-09-08）----
await go('');
ok(await ev(`!!document.querySelector('.hd-in .sync-ui')`), '頁首有同步元件掛載點');
ok(await ev(`!!document.querySelector('.sync-login')`), '未登入時顯示登入鈕');
ok(await ev(`document.querySelector('.sync-login').getBoundingClientRect().height >= 40`),
   '登入鈕觸控目標 ≥40px');
// 同步用的 key 一律不可用 kaoguhero. 開頭，否則會被整包推上雲端
ok(await ev(`['khsync.token','khsync.sess','khsync.owner','khsync.ts']
     .every(k => k.indexOf('kaoguhero.') !== 0)`), '同步自身的 key 不在同步範圍內');
ok(await ev(`window.KH_CONFIG && !!window.KH_CONFIG.API_BASE && window.KH_CONFIG.APP === 'kaoguhero'`),
   'API 位址集中在 js/config.js');

// 答完一題之後有「回報這題」，點下去會開對話框
await hash('#/paper/doc-115-2-med1');
for (let i = 0; i < 60 && !(await ev('!!document.querySelector("#main .opt")')); i++) await sleep(100);
await ev(`document.querySelector('#main .opt').click()`); await sleep(200);
ok(await ev(`!!document.querySelector('.rp-link')`), '答題後出現回報入口');
await ev(`document.querySelector('.rp-link').click()`); await sleep(200);
ok(await ev(`!!document.querySelector('.rp-box')`), '回報對話框可開啟');
ok((await ev(`document.querySelector('.rp-sub').textContent`)).includes('doc-115-2-med1'),
   '回報對話框帶著卷代碼');
ok(await ev(`document.querySelectorAll('.rp-kind').length === 4`), '回報有四種類型可選');
// 沒寫內容不可送出
await ev(`document.querySelector('.rp-go').click()`); await sleep(150);
ok((await ev(`document.querySelector('.rp-msg').textContent`)).length > 0, '空白回報會被擋下');
await ev(`document.querySelector('.rp-box .rp-btn').click()`); await sleep(150);
ok(await ev(`!document.querySelector('.rp-box')`), '回報對話框可關閉');

// 後台未登入時只給提示，不會炸掉
await hash('#/admin'); await sleep(250);
ok((await ev(`document.getElementById('main').textContent`)).includes('站務後台'), '#/admin 可開啟');
ok((await ev(`document.getElementById('main').textContent`)).includes('登入'), '未登入的後台顯示登入提示');

// ---- 手機版面：不可橫向溢出（Tony 2026-09-08「手機也都要可以順順看」，之後要上架 App）----
// 這個瀏覽器全程跑在 430×900 的手機模擬下；這裡再壓到 360px（常見 Android 寬度）掃一遍。
await send('Emulation.setDeviceMetricsOverride',
  { width: 360, height: 780, deviceScaleFactor: 2, mobile: true }, sessionId);
for (const [h, name] of [['#/', '首頁'], ['#/exams', '題庫總覽'], ['#/wrong', '錯題本'],
                         ['#/stats', '弱點統計'], ['#/about', '使用說明'], ['#/admin', '站務後台']]) {
  await hash(h); await sleep(120);
  const over = await ev(`document.documentElement.scrollWidth - window.innerWidth`);
  ok(over <= 1, `360px 寬時 ${name} 不橫向溢出（多出 ${over}px）`);
}
// 作答畫面與回報對話框也要塞得下
await hash('#/paper/doc-115-2-med1');
for (let i = 0; i < 60 && !(await ev('!!document.querySelector("#main .opt")')); i++) await sleep(100);
ok(await ev(`document.documentElement.scrollWidth - window.innerWidth <= 1`), '360px 寬時作答畫面不橫向溢出');
ok(await ev(`document.querySelector('#main .opt').getBoundingClientRect().height >= 44`),
   '選項按鈕觸控目標 ≥44px');
await ev(`document.querySelector('#main .opt').click()`); await sleep(200);
await ev(`document.querySelector('.rp-link').click()`); await sleep(200);
ok(await ev(`document.querySelector('.rp-box').getBoundingClientRect().width <= window.innerWidth`),
   '回報對話框不超出畫面寬度');
ok(await ev(`document.querySelector('.rp-go').getBoundingClientRect().height >= 44`),
   '回報送出鈕觸控目標 ≥44px');
await ev(`document.querySelector('.rp-box .rp-btn').click()`); await sleep(120);
await send('Emulation.setDeviceMetricsOverride',
  { width: 430, height: 900, deviceScaleFactor: 2, mobile: true }, sessionId);

// ---- 站內對話框（2026-09-08 Tony：原生 confirm 框「太難看」）----
await go('');
ok(await ev(`!!window.KHDialog && typeof KHDialog.confirm === 'function'`), 'KHDialog 已載入');
// window.alert 已換成站內 toast，不會再跳系統框
ok(await ev(`window.alert.toString().indexOf('toast') > 0`), 'alert 已換成站內浮出提示');
// void：Runtime.evaluate 帶 awaitPromise，直接丟 Promise 進去會等到有人按鈕才回，測試會卡死
await ev(`void window.KHDialog.confirm('測試訊息')`); await sleep(220);
ok(await ev(`!!document.querySelector('.dlg-back .dlg')`), '確認框可開啟');
ok((await ev(`document.querySelector('.dlg-msg').textContent`)) === '測試訊息', '確認框顯示訊息');
ok(await ev(`document.querySelectorAll('.dlg-btns .dlg-btn').length === 2`), '確認框有取消與確定');
ok(await ev(`document.querySelector('.dlg-ok').getBoundingClientRect().height >= 44`),
   '對話框按鈕觸控目標 ≥44px');
ok(await ev(`document.querySelector('.dlg').getBoundingClientRect().width <= window.innerWidth`),
   '對話框不超出畫面寬度');
await ev(`document.querySelector('.dlg-btns .dlg-btn').click()`); await sleep(300);
ok(await ev(`!document.querySelector('.dlg-back')`), '確認框可關閉');
// 單鍵告知框只有一顆按鈕
await ev(`void window.KHDialog.info('只有一顆鈕')`); await sleep(220);
ok(await ev(`document.querySelectorAll('.dlg-btns .dlg-btn').length === 1`), '告知框只有一顆按鈕');
await ev(`document.querySelector('.dlg-ok').click()`); await sleep(300);

ok(logs.length === 0, 'console 沒有錯誤' + (logs.length ? '：' + logs.slice(0, 2).join(' | ') : ''));
ws.close(); chrome.kill(); srv.kill();
console.log(fails.length ? `\n✗ ${fails.length} 項失敗` : '\n全部通過');
process.exit(fails.length ? 1 : 0);
