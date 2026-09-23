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

引擎有 agy／claude／deepseek 三種（`tools/exp-engine.sh`，deepseek 2026-09-18 接上），沒有 codex。

**⛔ 除非 Tony 當次指定，不然不要用 DeepSeek（2026-09-19 11:40 Tony 定案：「除非我有指定，不然不要再用 DeepSeek」）**
起因：09/18 抽查發現它引的法條條號常常是掰的（詳見下段），09/19 又發現該修的 558 題一直沒修。
預設引擎＝claude（`tools/exp-engine.sh claude`）；agy／gemini flash 在 Claude 週限吃緊時仍可用。
已經由 DeepSeek 寫好的詳解暫時保留（內容抽查品質良好，問題只在條號），引條號的已全部清掉重寫。

**⛔ 法規題不要用 DeepSeek（2026-09-18 Tony 抽查後定案：「deepseek 不懂台灣法條，以後不適合做這塊」）**
內容判斷與外語、史地、常識題都好（103 卷 7,428 題／59 分鐘／US$0.86，格式零退件），
但**引用的法條條號常常是掰的，同一個考點在不同卷給不同條號**：旅行業責任保險「證件遺失 2,000 元」
被寫成第 24／12／5 條（實際第 66 條、舊編 53）、緊急事故 24 小時報備寫第 54 條（實際 52／舊編 39）。
→ 導遊實務（二）`d002`／`d017`、領隊實務（二）`l002`／`l009` 這類會引條號的科目一律用 claude。
清掉已寫錯的：`node tools/exp-clear.js --grep '第\s*\d+\s*條' --pids <卷清單> --write`（原文會備份）。

**⚠ DeepSeek 一定要帶 `--no-think`**：`deepseek-flash` 預設先思考，思考字數也算 `max_tokens`，
一次寫 15 題時 8192 全被吃光 —— API 回 200、usage 顯示 out=8192，但 content 是空字串、不報錯
（症狀：撈不到任何 JSON、每段都「少了 N 題」）。`tools/exp-deepseek.js` 已內建。

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

## 改前端時會踩到的三個坑（2026-09-21 做錯題匯出時踩過）

1. **改完 `localStorage` 一定要整頁重載，換 hash 沒用**。`js/app.js` 的 `state` 是開頁時
   `load()` 讀一次就留在記憶體，換 hash 只跑同頁路由。smoke test 裡直接寫 `kaohero.v1`
   再 `location.hash='#/xxx'`，畫面看到的還是舊資料（症狀：明明塞了錯題，匯出頁卻說「錯題本是空的」）。
   → `test/smoke.mjs` 已有 `reload()` helper，改完 storage 呼叫它。
2. **`js/i18n.js` 的 EN 字典有重複 key 會靜默覆蓋**（同一個物件字面值，後面那筆贏）。
   新增翻譯前先掃一次：
   `node -e "const s=require('fs').readFileSync('js/i18n.js','utf8');const k={},d=[];const re=/^\s*'((?:[^'\\]|\\.)*)':/gm;let m;while((m=re.exec(s))){if(k[m[1]])d.push(m[1]);k[m[1]]=1}console.log(d)"`
   撞到就把新字串改成獨一無二的說法（例：`選擇範圍` → `選擇要匯出的範圍`），不要硬蓋掉舊的。
   現存 4 組重複是舊有的，其中只有 `科目`（Subjects／Subject）兩邊值不同。
3. **列印樣式要用 `!important` 壓 body 底色**。`css/v2.css` 有一條
   `:root:not([data-theme="light"]):not(...):not(...) body{background:...}`，權重 (0,4,2) 比
   `body.kh-printing` (0,1,1) 高；不加 `!important`，使用者在列印選項勾了「背景圖形」就會印出整頁深色底。

4. **動效（`js/motion.js`／`css/motion.css`，2026-09-22）**：首屏 `.m-in` 序列、區塊 `.m-reveal` 捲動揭示，
   `render()` 結尾會 `Motion.scan(main)`。載入時已在視窗內的 reveal 一定要直接顯示（`m-now`，不跑淡入），
   否則 Lighthouse 會把它選成 LCP、多 1.7 s。量效能別用本機 python http.server（沒 gzip、分數失真），
   要比新舊就兩個版本同條件跑 `lighthouse --throttling-method=devtools`。
   另：`pkill -f "<字串>"`／`pgrep -f "<字串>"` 會比對到正在跑這行的 shell 自己（exit 144），
   字串裡放一個方括號就不會自己比到自己：`pgrep -f "lh/[g]z.js"`。
5. **首頁效能的四個機關（2026-09-22 Tony「做穩定」，線上 Lighthouse 手機 10 次 97～100，改之前是 73～99 亂跳）**，動任何一個都要重量：
   - **hero 寫死在 `index.html` 的 `#herowrap`（main 外面）**，不等 JS 就畫得出來。`viewHome` 同語言時只換數字與副標、
     **不重建節點**（重建＝新的 LCP 候選，會被算到 JS 跑完之後）；hero 標題是 `p.hero-t[role=heading]`，
     靜態 HTML 的唯一 `<h1>` 留給 SSR 那段（seoaeo h1-single／h1-kw）。資料變多時 hero 裡寫死的數字不必手改，開頁會被即時值蓋掉
   - **body 開頭 inline script** 先設 `data-page`、`m-js` 與顯示偏好（字級／主題／語言），第一格就是對的配色
   - **腳本不用 `<script src>`**，由 body 尾端的 loader 在收到 `first-contentful-paint` 後依序插入（`async=false`）。
     `defer` 或單層 rAF 都會偶發搶在首次繪製前發出請求，Lighthouse 就把 LCP 算成依賴 app.js（4 s）。
     **新增 js 檔要加進那個 loader 的清單**，版本號也在那裡改
   - **hero 標題與副標只滑不淡**（`kh-slide`）：LCP 元素從 opacity 0（連 .01 也一樣）淡入，Chrome 不算第一格繪製

## 補圖：題目要看圖但題庫裡沒圖（2026-09-23 做過一輪）

有一批題題幹寫著「下圖／下表」，但圖在轉檔時沒被保留，站上等於答不了，當初都記進 `exp-skips.json` 跳過。
原始 PDF 裡圖還在，可以整題裁回來。2026-09-23 補了 1,686 題（chu 334、den 424、loc 241、pt 135、pha 122、
mlt 115、tcm 110、pol 66、tou 39、ot 37、gao 31、tea 23、nur 6、nut 3），只有 1 題沒補到。

```bash
python3 tools/figmap.py --check                      # 建 pid → 原始 PDF 對照表並驗證
node tools/fig-targets.js --out /tmp/fig.json        # 挑出要補圖的題
python3 tools/figfill.py /tmp/fig.json               # 批次裁圖到 img/q/
node tools/set-fig.js /tmp/fig-done.json --write     # 掛回題庫（只加 q.fig，不動題幹選項）
node tools/exp-skip-drop.js --has-fig --only /tmp/fig-done.json --write   # 放回詳解佇列
node tools/build-index.js --write && node test/test.js
```

**踩到的坑：**
- **題庫的 js 只留 `code`（例 112020），沒留類科代碼 c 與科目代碼 s**，但圖檔名與 PDF 檔名要三段都有。
  `figmap.py` 是直接 import `gen_civil`／`gen_bank` 的 SPECS 與 key 函式重跑一次，不另抄一份邏輯；
  **一定要跑 `--check`**（拿已經有圖的 1,026 卷驗證檔名前綴），不一致就是對照錯了。
- **同一科可能掛在兩個類科代碼底下**（藥師 305／307），硬挑會對到另一份卷。`pick()` 的順序是
  ① 跟既有圖檔對得上 ② 答案張數＝本卷題數 ③ 第一個。不加這段當時有 13 卷對錯。
- **牙醫／中醫／藥師的原始 PDF 不在 `~/exam-pdfs`**（當初收完就刪了），要先重抓：
  `python3 tools/moex-fetch.py 牙醫師 ~/exam-pdfs/den 102 115`（中醫師／藥師同理，各約 10 分鐘）。
- **教檢（tea-*）的 pid 推不回檔名**（科目名稱正規化在 gen_tqa 裡），用 `tools/figmap-tqa.py`
  以「答案張數＋第 1 題題幹」比對，206 卷對得上（民國 96、97 年那幾卷比不到，還有 1 題沒補）。
- **教檢的圖檔名有 `tea_` 前綴，PDF 檔名沒有**（`tea_103_30_5_18.webp` ↔ `103_30_5_q.pdf`）。
  拿圖檔名當 PDF 路徑會讀到空檔，`cropfig` 回的錯是 **「找不到第 N 題」**，看起來像題號認不出來，
  其實是檔案根本不存在——遇到這個錯先確認 PDF 路徑存不存在。`pid-pdf.json` 因此改成三段
  `[目錄, PDF 前綴, 圖檔前綴]`，第三段省略時跟 PDF 前綴一樣。
- **`cropfig.crop()` 每次都會把整份 PDF 重跑一次 `pdftotext -bbox-layout`**，一卷裁 10 題就是 10 倍時間。
  已加 `pages=` 參數讓呼叫端快取（`figfill.py` 就是這樣用的）。
- **補圖的題保留題目文字、只多一張圖**（不設 `needfig`、不清空選項）。因此 `test/test.js` 的
  「needfig 數＝有圖數」已改成「needfig 的題一定有圖」，不要改回去。
- 補完要 `exp-skip-drop --has-fig` **加 `--only`**：不加 `--only` 會把「本來就有圖、但圖看不清楚而跳過」
  的題也放回去，worker 只會再跳過一次、白跑一輪。

## 勘誤提醒 q.note（2026-09-23）

官方公布答案與現行法規／教科書衝突、或修法後兩個選項都對的題，不能照 ✅／❌ 三行硬寫詳解（會寫出誤導內容），
但也不該在站上留一片空白。改寫一段 `q.note`：講清楚官方答案是什麼、哪一年改了什麼、考生該怎麼辦。

```bash
node tools/note-targets.js --list            # 看候選（從 exp-skips.json 挑，排除圖表毀損那種）
bash tools/note-batch.sh 25 0                # 分批寫（每批一個新 session），紀錄 ~/.claude/note-batch.log
```

- 格式檢查在 `tools/set-note.js`：開頭 ⚠、要明講官方答案、40～400 字、最多 4 行、不准用 ✅❌📚。
- 前端畫在 `js/app.js` 的「尚未撰寫詳解」那一支，樣式 `.fb-note`（虛線框，刻意跟詳解長得不一樣）。
- **`note` 不算「自撰詳解」**，首頁與卷卡片的數字只數 `q.exp`。
- ⚠ **勘誤候選清不到 0 是正常的**：剩下的題模型判定不該寫（多半是轉檔毀損），它們永遠留在候選裡。
  舊版 note-batch 只在「候選 0 題」才停，2026-09-24 因此每批挑同一批、寫 0 題，空轉 180 批（約 7.5 小時 Claude 額度）。
  現在一批寫 0 題就收工；log 出現連續「寫 0 題」就是這個症狀。
- ⚠ prompt 特別要求「條號沒把握就不要寫」：當初記的跳過理由是別的模型寫的，已知會掰條號。

## 本週排名賽（2026-09-23）

一般模擬考隨機抽題，每個人的卷不一樣，分數不能互比（舊的英雄榜只是排好玩的）。排名賽改成固定題組：
`js/rank.js` 用（科目, 規格, 週次）當種子抽題，同一週同一科所有人拿到同一份卷，才給得出百分位與分數分布。

- 週次 `setId()` 用**台北時間**算 ISO 週（`2026W39`）；種子 FNV-1a ＋ mulberry32，
  `Math.random` 不能用（每個人都不一樣）。抽卷、建題庫、排序每一步都要固定順序，
  不然同一週不同人的第幾題會對不上。驗證：`node test/rank-test.js`
- 後端 `/api/kgh/rank`（`claude-shared/.../kaohero.js` 的 `kgh_ranked` 表），setid 只當分組鍵，
  後端不自己推算時間。百分位＝贏過多少人（同分各算一半），只有自己一個人時給 50 不給 100。
  驗證：`node test/kgh-rank-test.js`（後端目錄）
- ⚠ 題組是前端算的，**題庫更新會讓當週題組變動一次**（例：補圖讓某題從不能考變成能考）。
  這是刻意取捨：不為排名賽在後端存題號快照。

## 主題歸類（弱點診斷）怎麼運作，改之前先看這段

`js/diagnose.js` 的 `topicOf()` 是從詳解的「📚 出處：」那一行**猜**主題的，沒有人工標的大綱。
各科出處寫法差很多，規則是一條一條踩出來的（2026-09-21），動它之前先跑抽樣：

```bash
node -e "const fs=require('fs');const w={};new Function('window',fs.readFileSync('js/diagnose.js','utf8'))(w);
global.window={};require('./js/data/exams.js');
const E=global.window.APP_EXAMS.filter(e=>e.subj==='med1').slice(0,4);
E.forEach(e=>{require('./js/data/exam/'+e.id+'.js');const p=global.window.APP_EXAM_PAPERS[e.id];
console.log(e.id, p.qs.map(w.KHDiag.topicOf).filter(Boolean).slice(0,5).join(' | '))})"
```

現有規則與各自的來由：
- **括號內容先拿掉**：「成語辨正（嘆為觀止、斷章取義）」裡的「斷章」會被誤判成章節標記
- **「章」兩邊都要看**：`第 11 章 Cranial Nerve Nuclei`（章在名字前）與 `腦神經核章`（章在名字後）都有，
  只認一種的話實測 6 卷裡有 5 卷整份歸不出主題
- **英文 `Ch.8 Head`**：牙醫科的出處是全英文書目，靠這個才抓得到章名
- **章節標記後面直接接括號時，括號裡就是章名**（2026-09-23 加，要在剝括號之前先攔）：
  `Ch.64（Swallowing）`、`第 11 章（腦神經核）`。不先攔的話章名會連括號一起被丟掉，
  整句只剩書名版次 → 被當成「只有書名」而歸不出主題
- **只有書名就回 null → 改成先試 `bookTail()`**（2026-09-23）：醫科詳解其實把考點寫在書名**後面**或括號裡，
  `Moore《Clinically Oriented Anatomy》腰神經叢` 取 `》` 後面那段、
  `Wheeler's …, 11th ed.（The primary dentition）` 取句尾括號那段；只看第一個分號前那一段
  （後面的是補充書目，不是這題的考點）。剝完還是書名版次才回 null
- **法規題聚合到法規名稱**：`行政訴訟法第 6 條、第 2 條` → `行政訴訟法`。一條一個主題等於沒有主題，
  同一個考點在不同年份會引不同條號
- **外語科「大類：細目」「大類／細目」要切大類**：`餐旅英語會話：餐廳點餐` → `餐旅英語會話`；
  不切的話外語科每題自成一個主題
- **法規名稱的懶惰量詞下限是 1 不是 2**：`{2,14}` 會讓「民法第 27 條」整個比不到
  （「民法」把結尾的「法」吃掉後前綴只剩 1 個字）
- **`topicsFor()` 會依卷況自動選粗細**：聚合後不到 3 個主題就退回條號
  （民法概要 → `民法第 95 條`；綜合法學 → `行政訴訟法`）
- 補弱題單的比對是**寬鬆包含**（主題字串出現在該題出處行裡就算），不是字串相等——
  嚴格比對在醫科幾乎抽不到題
- **補弱題單有兩段退路**（2026-09-23 加）：主題變細之後整串比對抽不到題（牙醫六 155→10），
  所以某個弱主題湊不到 `MIN_PER_TOPIC`（4）題時，改用 `topicKeys()`（英文 4 字母以上的單字、
  中文剝掉「章節／分類／概論」等尾巴再加一個 3 字前綴）與該主題第一題的 `chapterKey()`（章那一層）
  再找一輪。`topic-audit.js` 用同一套規則，兩邊要一起改

品質抽查：`node tools/topic-audit.js --papers 6 --csv out.csv`（299 科約 10 分鐘）。
2026-09-23 結果：**135 科好、164 普通、0 差**（2026-09-21 是 135／156／8）。
那 8 個「差」的科目（牙醫一～六、解剖學與生理學、生理學與生物化學）歸類率 6～34% → 81～99%，
**不是靠重寫詳解，是靠上面那兩條解析規則**——詳解本來就有寫考點，只是被解析器丟掉了。
教訓：判定「內容品質差」之前先確認不是自己的解析器吃掉的（當時估要重寫 16,077 題，實際一題都不用重寫）。

## 付費／金流（2026-09-21 起）

- 前端：`js/pay.js` ＋ `#/plans`、`#/account`；付費牆用 `KHPay.can(科目)` 與 `KHPay.canAny()`，
  擋在三個入口：`js/export.js` 的 `render()`、`js/app.js` 的 `viewWrong()`（今日複習那張卡）、
  `js/diagnose.js` 的補弱題單。**牆關著或還沒問到後端時一律放行**（寧可少收錢也不要擋到現有使用者）
- 後端：`claude-shared/projects/LanExamMock/backend/ecpay.js` ＋ `kaohero.js` 的 `/api/kgh/pay/*`
- 環境變數（後端 `.env`）：
  `ECPAY_MERCHANT_ID`／`ECPAY_HASH_KEY`／`ECPAY_HASH_IV`（**三個都設齊才切到正式環境**，少一個就整組
  退回綠界測試帳號）、`KAOHERO_PAYWALL=on`（預設關）、`KAOHERO_SITE`、`KAOHERO_API`、
  `KAOHERO_PRICE_SUBJ180`／`KAOHERO_PRICE_ALL180`
- ⚠️ **只有 `/pay/notify`（綠界 server-to-server）能開通權益**；`/pay/result` 是使用者的瀏覽器被導回來的，
  可以偽造，只拿來換頁
- ⚠️ 金額一律以後端方案表為準，不接受前端傳的金額；回呼會比對 `TradeAmt` 與訂單金額
- ⚠️ CheckMacValue 錯的話綠界只回「CheckMacValue Error」，不會說錯在哪。算法已用官方文件的範例值
  釘在 `test/kgh-pay-test.js`，改動那段之後一定要跑：`node test/kgh-pay-test.js`
- 驗整條流程：`node test/kgh-pay-test.js`（32 項）；要真的打綠界測試環境就把 `buildCheckout` 產的
  表單 POST 到 `https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5`，回「選擇支付方式」頁就是對的

## 其他

- 間隔重複排程：`js/app.js` 的 `bumpWrongSchedule`／`dueList`（錯題帶 `box` 1~3 與 `due`）；
  舊資料只有 `s`，開頁時換算並寫回
- 模考弱點診斷與補弱題單：`js/diagnose.js`，掛在模考結算頁（`viewMockResult` → `diagApi()`）
- 錯題匯出（PDF／Anki）：`js/export.js` ＋ `#/export`。PDF 與純文字匯入檔是純前端；
  **`.apkg` 走後端** `POST /api/kgh/export/anki`（`claude-shared/projects/LanExamMock/backend/kaohero.js`），
  由 `tools/pick-json.js` 挑題 → `tools/build-anki.py`（genanki，venv 在 brain 的 `~/.venvs/anki`）產檔。
  ⚠️ 那個 venv 不在 repo 裡，重灌或換機要重建：`python3 -m venv ~/.venvs/anki && ~/.venvs/anki/bin/pip install genanki`；
  沒有它後端回 503、前端自動退回純文字匯入檔（不會壞掉，只是手機版 Anki 用不了）。
  細節與「要收費時改哪裡」見 `docs/monetization-plan.md` 四之二節
- 登入同步／後台已完成並上線，見 `docs/monetization-plan.md` 一之二節
- 題解分離、變現四階段計畫：`docs/monetization-plan.md`（詳解寫完再動工）
- 決策與實驗紀錄：`docs/plan-log.md`
- 回報用 `~/TelegramClaude/claude-shared/machines/claudebot500/tg-sessions/tg-send.sh kaohero`
