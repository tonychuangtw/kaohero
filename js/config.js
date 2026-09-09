/* 考英雄 — 站台設定（唯一一處要改的地方）
 *
 * 2026-09-08 Tony 定案：之後會換正式網域並改走 Cloudflare。
 * 所有對外位址一律集中在這裡，換網域時只改這個檔，程式碼一行都不用動。
 *
 *  API_BASE  後端 API 的根位址。
 *            現在：本機 LanExamMock backend 經 Tailscale Funnel 對外。
 *            之後：改成 https://api.<正式網域>（Cloudflare Tunnel 指到同一支後端）即可。
 *            ⚠️ 換位址時要同步在後端的 EXTRA_ORIGINS 加上新的前端網域，否則 CORS 會擋。
 *  APP       後端 /api/progress 的 app 名稱，對應 server.js 的 APPS。
 *  CLIENT_ID Google Identity Services 的 OAuth client id（與其他站共用同一個專案）。
 *
 * ⚠️ 登入一律用 Bearer token（存 localStorage），不使用 cookie。
 *    cookie 綁 domain，換網域會全部失效；token 不受影響。
 */
window.KH_CONFIG = {
  API_BASE: 'https://claudebot500.tailfcf67f.ts.net',
  APP: 'kaohero',
  LEVEL: 'main',
  CLIENT_ID: '481860179039-gb37qsdogd4vgnn2g5umh73jen02avj4.apps.googleusercontent.com'
};
