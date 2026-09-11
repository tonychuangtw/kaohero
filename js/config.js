/* 考英雄 — 站台設定（唯一一處要改的地方）
 *
 * 2026-09-08 Tony 定案：之後會換正式網域並改走 Cloudflare。
 * 所有對外位址一律集中在這裡，換網域時只改這個檔，程式碼一行都不用動。
 *
 *  API_BASE  後端 API 的根位址。
 *            2026-09-11 起：api.kaohero.com，brain 上的 Cloudflare Tunnel
 *            （systemd --user 的 cloudflared-kaohero.service）指到 127.0.0.1:4100。
 *            舊的 Tailscale Funnel 位址還活著，但不要再用：那個名字在有開 Tailscale
 *            的機器上會解析成 100.x 內網位址，Chrome 會跳「存取區域網路上的其他裝置」
 *            權限框，使用者按封鎖就整個後端連不上。
 *            ⚠️ 換位址時要同步在後端的 EXTRA_ORIGINS 加上新的前端網域，否則 CORS 會擋。
 *  APP       後端 /api/progress 的 app 名稱，對應 server.js 的 APPS。
 *  CLIENT_ID Google Identity Services 的 OAuth client id（與其他站共用同一個專案）。
 *
 * ⚠️ 登入一律用 Bearer token（存 localStorage），不使用 cookie。
 *    cookie 綁 domain，換網域會全部失效；token 不受影響。
 */
/* 贊助連結（#/sponsor 頁的按鈕）。留空字串＝不顯示按鈕，改顯示「尚未設定」提示。 */
window.APP_SPONSOR = {
  buymeacoffee: 'https://buymeacoffee.com/kaohero'
};

window.KH_CONFIG = {
  API_BASE: 'https://api.kaohero.com',
  APP: 'kaohero',
  LEVEL: 'main',
  CLIENT_ID: '481860179039-gb37qsdogd4vgnn2g5umh73jen02avj4.apps.googleusercontent.com'
};
