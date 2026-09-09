# kaohero — 考英雄（國家考試考古題站）

這是 `claude-telegram@kaohero` 線的 workdir（bot 由 Tony 於 2026-09-09 開設）。
2026-09-09 從 chinese 線分出：chinese 專心 K12Review／LanExamMock／補習複習，本線專責考英雄。

## 站台

- 站名：**考英雄**（2026-09-09 由「考古英雄」更名，取「靠英雄」諧音並與網址 kaohero 一致）。網頁 title 仍保留「國家考試考古題」關鍵字，說明頁有一行舊名對照
- repo：github.com/tonychuangtw/kaohero（2026-09-09 已從 kaoguhero 改名）
- **正式網址：https://kaohero.com** （2026-09-09 上線，Cloudflare Registrar 註冊、DNS 在 Cloudflare、站台仍由 GitHub Pages 供應）
  - DNS：4 筆 A 記錄指 GitHub Pages（185.199.108-111.153）＋ www 的 CNAME，全部 DNS only（灰雲）；改橘雲前要先確認 GitHub 憑證不受影響
  - repo 根目錄的 `CNAME` 檔不可刪，刪了自訂網域會失效
  - 後端已在 `.env` 加 `EXTRA_ORIGINS=https://kaohero.com,https://www.kaohero.com`（server.js 既有機制，不必改程式）
  - Google OAuth 的 authorized JavaScript origins 已加入兩個新網域
  - 舊網址 https://tonychuangtw.github.io/kaohero/ 仍可用；更舊的 /kaoguhero/ 由 rootsite 404 MAP 轉址救援
- 內部識別碼 2026-09-09 一併改為 kaohero（Tony：「現在還沒有使用者，直接改以免以後麻煩」）：`js/config.js` 的 `APP: 'kaohero'`、localStorage 的 `kaohero.v1` / `kaohero.prefs`、後端 `claude-shared/projects/LanExamMock/backend/kaohero.js` 與 `server.js` 的 `APPS.kaohero`、DB `progress.app` 值
- 本機 clone：`~/TelegramClaude/kaoguhero`（目錄名維持舊名，避免動到 tg session／unit 設定）
- 純靜態站，vanilla JS、無 build、GitHub Pages 部署（push 到 main 即上線）
- 規模：2,377 卷 / 109,281 題，四大類（醫事、高普考、地方特考、專技）

## 逐題詳解（目前主線工作）

Tony 2026-09-06 15:40「依序開始全部寫解析」、「除非有什麼解決不了一定要問的問題，不然都做到完為止」。

**格式硬規則**（`tools/set-exp.js` 會擋）：
- 第一行 `✅ (正解字母) …`，字母必須等於該題 `a` 索引
- 中間**剛好三行** `❌ (X) …`
- 最後一行 `📚 出處：…`

**每卷做法**：
1. 讀題：
   ```
   cd ~/TelegramClaude/kaoguhero && node -e "global.window={};require('./js/data/exam/<pid>.js');const p=window.APP_EXAM_PAPERS['<pid>'];const L=['A','B','C','D'];p.qs.filter(q=>q.n<=40).forEach(q=>{console.log('#'+q.n+' '+q.q);q.o.forEach((o,i)=>console.log('  '+L[i]+') '+o));console.log('  ANS='+L[q.a])})"
   ```
   （後半改 `q.n>40`；一次讀 40 題，避免單次輸出過長）

   **閱讀測驗類（教師檢定 `tea-*` 的國語文、高普考國文等）題目掛在 `q.psg` 的文章上，上面那行指令看不到文章，一定要改用這行**：
   ```
   cd ~/TelegramClaude/kaoguhero && node -e "global.window={};require('./js/data/exam/<pid>.js');const p=window.APP_EXAM_PAPERS['<pid>'];const L=['A','B','C','D'];let last=null;p.qs.filter(q=>q.n<=15).forEach(q=>{if(q.psg&&q.psg!==last){console.log('【文章】'+q.psg);last=q.psg;}console.log('#'+q.n+' '+q.q);q.o.forEach((o,i)=>console.log('  '+L[i]+') '+o));console.log('  ANS='+L[q.a])})"
   ```
   （教檢每卷只有 25～40 題，分兩批讀即可；轉檔時下一段的引文常被黏在上一題最後一個選項的尾巴，屬已知瑕疵，不影響作答）
2. 用 **Write 工具**寫 patch JSON（`[{pid,n,exp}]`）到 scratchpad，heredoc 容易被跳脫字元咬掉
3. `node tools/set-exp.js <patch> --write && node tools/build-index.js --write && node test/test.js`
4. commit + push

⚠️ **每寫完一卷一定要跑 `node tools/build-index.js --write`**，否則首頁與各卷卡片上的「自撰詳解」數字不會更新（2026-09-08 Tony 回報「數字怎麼都沒增加」）。

**該跳過不要硬寫的題**：
- 選項在圖上、題庫只存到空字串的題
- 題幹或選項在轉檔時毀損、缺公式的題
- 官方答案與教科書明顯衝突的題（寧可不寫，不要寫出誤導內容）

## 其他

- 登入同步／後台已完成並上線，見 `docs/monetization-plan.md` 一之二節
- 題解分離、變現四階段計畫：`docs/monetization-plan.md`（詳解寫完再動工）
- 決策與實驗紀錄：`docs/plan-log.md`
- 回報用 `~/TelegramClaude/claude-shared/machines/claudebot500/tg-sessions/tg-send.sh kaohero`
