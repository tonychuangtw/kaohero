#!/usr/bin/env node
// IndexNow：部署後通知 Bing 等搜尋引擎「這些網址更新了」（ChatGPT 搜尋走 Bing 的索引）。
// 用法：node tools/indexnow-ping.mjs                    → 正式站 sitemap.xml＋sitemap-essay.xml 的全部網址
//       node tools/indexnow-ping.mjs /exam/gao/ /essay/  → 只送這幾頁
// 金鑰＝repo 根目錄「32 位十六進位.txt」，內容就是檔名（公開的，搜尋引擎抓它確認網站是我們的）。
// 先部署再送：正式站抓不到金鑰檔會被拒。一次最多 1 萬個網址，超過自動分批。
import { readdirSync } from 'node:fs';

const SITE = 'https://kaohero.com';
const key = (readdirSync(new URL('../', import.meta.url)).find(f => /^[0-9a-f]{32}\.txt$/.test(f)) || '').slice(0, 32);
if (!key) { console.error('根目錄沒有 IndexNow 金鑰檔'); process.exit(1); }
const live = await fetch(`${SITE}/${key}.txt`).then(r => (r.ok ? r.text() : '')).catch(() => '');
if (live.trim() !== key) { console.error(`正式站還沒有 ${SITE}/${key}.txt（先部署）`); process.exit(1); }

const args = process.argv.slice(2);
let urls = [];
if (args.length) urls = args.map(a => (a.startsWith('http') ? a : SITE + (a.startsWith('/') ? a : '/' + a)));
else for (const sm of ['/sitemap.xml', '/sitemap-essay.xml']) {
  const xml = await (await fetch(SITE + sm)).text();
  urls.push(...[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]));
}
let bad = 0;
for (let i = 0; i < urls.length; i += 10000) {
  const urlList = urls.slice(i, i + 10000);
  const r = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: 'kaohero.com', key, keyLocation: `${SITE}/${key}.txt`, urlList }),
  });
  console.log(`IndexNow ${r.status}（200／202＝收到）：${urlList.length} 個網址`);
  if (!r.ok) { console.log(await r.text()); bad++; }
}
process.exit(bad ? 1 : 0);
