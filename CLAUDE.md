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

**⚠️ 圖片題其實有圖，不要當成不能作答**（2026-09-11 查證）：選項是空字串的題，題目物件裡有 `needfig:true` 與 `fig:"img/q/xxx.webp"`，圖檔就在 repo 裡、網頁上也顯示得出來，考生看得到圖。用終端機讀題只會看到空字串，**要用 Read 工具打開那個 webp 檔**（Read 讀得了 webp）判讀後再寫解析。全站 1,603 題有圖，藥師 199 題、高普考 574、地方特考 658。

**該跳過不要硬寫的題**：
- 題幹寫「下圖／下表」但物件裡沒有 `fig` 欄位（真的沒圖）
- 題幹或選項在轉檔時毀損、缺公式的題
- 官方答案與教科書明顯衝突的題（寧可不寫，不要寫出誤導內容）

## exp-worker 停下來時怎麼判（踩過的坑，2026-09-17）

worker 從不「掛掉」，`systemctl --user is-active exp-worker` 永遠是 active —— 它撞到錯就睡 30 分再重試，
所以**光看 active 看不出它其實在空轉**。判斷一律看 `tail ~/.claude/exp-worker.log` 的最後幾行有沒有在寫卷。

**症狀 A：`額度或連線問題（rc=1）：error: Individual quota reached ... Resets in NNNh`**
- 認法：`Resets in` 後面是**幾十～一百多小時**（不是 1h 內）＝ agy 的 **Gemini 週限**被用光，不是暫時塞車。
  同一行如果是 `Resets in 1h24m` 那種，就真的只是小時級限流，等它自己過。
- 查證：`bash ~/TelegramClaude/claude-shared/tools/agy-usage.sh`（會直接印「Gemini 週限：已用 100%（台北 MM/DD HH:MM 重置）」）。
- 處理：**不要提早 `exp-engine.sh claude`**，除非 Claude 週限也剛重置。Claude 週限的窗口是台北每週五 04:00，
  `exp-engine-restore.timer` 就是排在 04:10 接手；提早切只是把舊窗口最後那點額度燒掉，可能兩邊一起撞牆。
  用 `systemctl --user list-timers exp-engine-restore` 確認 timer 還在，然後讓它空轉等即可（重試本身幾乎不花錢）。
- 實例：2026-09-17 20:38 最後一卷 tou-110-1-d006，之後每 30 分重試一次同樣的錯，Gemini 週限 09/23 10:26 才重置。

**症狀 B：`~/.claude/exp-worker.failed` 裡有卷** → 那是真的失敗（工具或題庫問題），要查原因、修完再 `systemctl --user start exp-worker`。

引擎只有 agy／claude 兩種（`tools/exp-engine.sh`），沒有 deepseek／codex 選項，別想用第三家頂替。

**⛔ Gemini 桶用完時不要改用 agy 裡的 Claude 模型頂替（2026-09-17 實測，Tony 問過一次）**
agy 的配額分兩桶：`Gemini Models` 與 `Claude and GPT models`（`agy models` 可用的有 claude-opus-4-6-thinking、
claude-sonnet-4-6、gpt-oss-120b-medium）。Gemini 桶爆掉時 Claude 桶通常還很滿，看起來可以頂替 —— **但不行**：
- **Claude/GPT 桶是按「請求／session」計量，不是按 token**。實測一卷 80 題：
  opus-4-6-thinking 週限 95%→78%（‑17%）、耗時 1006s；sonnet-4-6 週限 78%→60%（‑18%）、耗時 396s。
  **換便宜模型完全不省**，兩者每卷都吃掉約 17～18% 週限 → 整個桶只夠 **5～6 卷**，5 小時桶只夠 **2 卷**。
- 品質兩者都好（80/80 全寫、格式合規、錯誤選項有實質理由），所以判斷依據是配額不是品質。
- 對照：gemini-3.8-flash-high 每卷約 3.5 分、一個 Gemini 週期可跑 200 卷以上 —— **批次的主力永遠是 flash**。
- 結論：Gemini 桶爆了就等它重置（週限，要等好幾天），中間用本機 claude 撐；agy 的 Claude 桶留給 ask-codex 的第二意見。
查配額：`ssh tonychuangtw@192.168.1.173 'agy -p "/usage"'`（四行：兩個家族 × 週限／5 小時，欄位是**剩餘** %）。

## 其他

- 登入同步／後台已完成並上線，見 `docs/monetization-plan.md` 一之二節
- 題解分離、變現四階段計畫：`docs/monetization-plan.md`（詳解寫完再動工）
- 決策與實驗紀錄：`docs/plan-log.md`
- 回報用 `~/TelegramClaude/claude-shared/machines/claudebot500/tg-sessions/tg-send.sh kaohero`
