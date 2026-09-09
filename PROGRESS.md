STATUS: in-progress
OBJECTIVE: 把考英雄 2,377 卷的逐題詳解寫完（藥師已完成；目前主線＝教師檢定 261 卷 8,103 題）
NEXT_ACTION: 教師檢定（`tea-*`，261 卷 8,103 題）續做：打開 `js/data/exam/tea-113-1-t1001.js` 讀題（**閱讀測驗要用 CLAUDE.md 裡帶 `q.psg` 的那行指令**），寫 patch JSON → `node tools/set-exp.js <patch> --write && node tools/build-index.js --write && node test/test.js` → commit push；同年度 15 卷做完再往前一年。同年度的「教育理念與實務」四個類科考卷有大量重複題，先做一卷再跑 `python3 tools/reuse-exp.py <目標pid> <來源pid>...`（輸出目錄用環境變數 REUSE_OUT 指定，預設為當前目錄） 產生可直接套用的 patch。教檢做完再補高普考（gao，17,995 題只寫 1,406）、地方特考（loc，27,010 題只寫 2,020）
VALIDATION: `node test/test.js` 全綠（33,162 項檢查）；`node tools/build-index.js --write` 後首頁「自撰詳解」數字會增加
BLOCKERS: 無
PATHS: js/data/exam/*.js（題庫本體）、js/data/exams.js（build-index 產生，勿手改）、tools/set-exp.js、tools/build-index.js、test/test.js
UPDATED: 2026-09-11 05:20 台北

---

## 這條線是怎麼來的

2026-09-09 Tony：「我想同時做 k12review 和國考這個是不是沒辦法? 我想把國考英雄另開一個頻道分出去可以嗎?」
→ 分線。chinese 線專心 K12Review／LanExamMock／補習複習，本線專責考英雄。
同時指示：**repo 從 kaoguhero 改名為 kaohero，因為網址要用這個。**

## 待辦

- [x] **repo 改名 kaoguhero → kaohero**（2026-09-09 完成）。GitHub repo 已改名、本機 remote 已換 `git@github.com:tonychuangtw/kaohero.git`、新站 https://tonychuangtw.github.io/kaohero/ 回 200、rootsite `404.html` MAP 加 `kaohero` 並把舊鍵 `kaoguhero` 指向新站（GitHub Pages 對舊路徑不會自動轉址，靠這層救援）。內部識別碼 `APP: 'kaoguhero'` 與 localStorage `kaoguhero.*` 刻意不動，避免既有使用者紀錄與雲端同步斷掉
- [x] **藥師 168 卷 12,600 題全數做完**（2026-09-10，寫了 12,123 題）
- [ ] 教師檢定 → 高普考 → 地方特考 補解析（見 NEXT_ACTION）
- [x] **自訂網域正式上線**（2026-09-09 完成，https://kaohero.com）。建議 kaohero.com（RDAP 查過未註冊），Cloudflare Registrar 註冊、DNS 留 Cloudflare、站台續用 GitHub Pages 自訂網域。等 Tony 買完網域後：① DNS 記錄（A/AAAA 或 CNAME 到 tonychuangtw.github.io，先設 DNS only 讓 GitHub 簽憑證）② repo 加 CNAME 檔 ③ GitHub Pages 設 custom domain + Enforce HTTPS ④ 後端加 `EXTRA_ORIGINS=https://kaohero.com`（server.js 已有此環境變數機制，不必改程式）⑤ Google Identity 的 authorized JavaScript origins 加新網域（要 Tony 在 Google Cloud Console 操作）⑥ rootsite 舊網址轉到新網域。已完成：Cloudflare 5 筆 DNS 記錄（DNS only）、repo CNAME 檔、GitHub Pages custom domain、強制 HTTPS（Let's Encrypt 憑證已簽發）、後端 EXTRA_ORIGINS、Google OAuth origins（Tony 操作）。驗證：三個網址皆 200、CORS 放行、站內資源可正常載入
- [ ] **SEO／AEO 上線清單（依 shared.md §22，2026-09-09 起跑）**。已登記進 seoaeo 監控站（https://tonychuangtw.github.io/seoaeo/ ，站名「考英雄」、線名 kaohero、主關鍵字：國考考古題／高普考考古題／考古題詳解）。首次檢查 SEO 37%／AEO 35% → 三輪修正後 **SEO 77%／AEO 71%（AEO 已無 ❌）**
  - 已做：title 與 description 帶主關鍵字、canonical、og:url／og:image／twitter 大圖卡、JSON-LD（WebSite／Organization 含 logo／WebPage dateModified／FAQPage 七題）、首頁 1,200 字靜態內容（H1、問句式 H2＋直答段落、分類清單、FAQ 可見文字、站內外連結、更新日期）、robots.txt（明示不擋 AI 爬蟲）、sitemap.xml、llms.txt、img/og.png 與 img/logo.png
  - 還沒做（要 Tony 登入的手動項，做完用 `node ~/TelegramClaude/seoaeo/tools/mark.js kaohero.com <id> done "備註"` 打勾）：~~`gsc`~~、~~`gsc-sitemap`~~、~~`gsc-index`~~（2026-09-09 全部完成：Google 自動偵測 Cloudflare 走 OAuth 驗證網域；Tony 另建 GCP 服務帳戶 kaohero-seo@lanexammock.iam.gserviceaccount.com 並在 GSC 給「完整」權限，金鑰在 `~/.config/gcloud-sa/kaohero-gsc.json`（chmod 600，不進 git），工具是 `seoaeo/tools/gsc.py`，可查資源／送 sitemap／拉搜尋成效；sitemap.xml 已送出、要求索引已按）、`bing`（從 GSC 一鍵匯入）、`analytics`（建議 Cloudflare Web Analytics，免 cookie）、`kw-rank-check`、`cwv`、`indexnow`、上線兩週後的 `ai-cite-*` 三項引用測試
  - 剩下的自動項 ❌ 只有 `kw-coverage` 3/16：其餘建議關鍵字是 dcard／ptt／臨床心理師／消防設備師／不動產經紀人／高點等我們沒收錄的科目或別家品牌，硬塞違反 §22「不要為了衝分數硬塞關鍵字」，維持現狀
  - 待評估的大工程：題庫頁目前是 `#/paper/<id>` 的 hash 路由，Google 只算首頁一頁。要讓 2,377 卷各自被索引，需改成 `/exam/<id>/` 靜態頁並列進 sitemap（build 腳本產生）。這會同時大幅提升長尾搜尋流量，但要動路由與部署流程，等詳解主線告一段落再做
- [ ] **擴充新科目（Tony 2026-09-09 定案的順序）**：現有八類的解析全部做完後，再一科一科加；每加一科就把該科解析寫完，才動下一科。順序：護理師 → 初等考試 → 警察特考 → 導遊領隊 → 其他醫事類（醫檢師、物理治療師、營養師、職能治療師）
  - 建築師、會計師暫緩：主力是申論與手繪設計題，站台的單選題架構只吃得下部分測驗題；等申論批改功能成熟再收（`docs/plan-log.md` 有申論 AI 批改實驗結論）
  - 站上「題多解少」的缺口：地方特考 27,010 題只寫了 2,020、高普考 17,995 題只寫了 1,406、教師檢定 8,103 題 0 解析——這三塊是現有八類裡的主要待補
- [ ] 詳解全部寫完後：題解分離、變現四階段（`docs/monetization-plan.md`）

## 藥師詳解進度（`pha-*`，168 卷 12,600 題）

已完成 **28 個梯次（全部），共 12,123 題／12,600 題（96.2%）**：

| 梯次 | 藥一 | 藥二 | 藥三 | 藥四 | 藥五 | 藥六 | 小計 |
|---|---|---|---|---|---|---|---|
| 115-2 | 74 | 76 | 76 | 80 | 79 | 49 | 434 |
| 115-1 | 66 | 77 | 77 | 80 | 79 | 49 | 428 |
| 114-2 | 73 | 77 | 76 | 80 | 80 | 47 | 433 |
| 114-1 | 73 | 75 | 77 | 80 | 80 | 50 | 435 |
| 113-2 | 66 | 77 | 77 | 79 | 80 | 50 | 429 |
| 113-1 | 73 | 76 | 75 | 79 | 80 | 49 | 432 |
| 112-2 | 66 | 78 | 80 | 78 | 80 | 49 | 431 |
| 112-1 | 70 | 76 | 74 | 79 | 80 | 50 | 429 |
| 111-2 | 73 | 76 | 77 | 80 | 80 | 50 | 436 |
| 111-1 | 71 | 76 | 70 | 80 | 80 | 50 | 427 |
| 110-2 | 72 | 78 | 72 | 79 | 79 | 49 | 429 |
| 110-1 | 75 | 77 | 77 | 80 | 80 | 50 | 439 |
| 109-2 | 69 | 73 | 70 | 79 | 80 | 49 | 420 |
| 109-1 | 74 | 77 | 74 | 78 | 79 | 50 | 432 |
| 108-2 | 70 | 77 | 73 | 80 | 80 | 50 | 430 |
| 108-1 | 71 | 79 | 76 | 80 | 80 | 50 | 436 |
| 107-2 | 73 | 78 | 74 | 78 | 80 | 50 | 433 |
| 107-1 | 74 | 79 | 73 | 80 | 80 | 50 | 436 |
| 106-2 | 71 | 79 | 73 | 80 | 79 | 50 | 432 |
| 106-1 | 74 | 78 | 77 | 80 | 80 | 50 | 439 |
| 105-2 | 74 | 80 | 78 | 80 | 80 | 50 | 442 |
| 105-1 | 69 | 77 | 77 | 77 | 80 | 50 | 430 |
| 104-2 | 72 | 78 | 79 | 80 | 80 | 50 | 439 |
| 104-1 | 73 | 78 | 71 | 78 | 80 | 50 | 430 |
| 103-2 | 72 | 77 | 76 | 79 | 78 | 50 | 432 |
| 103-1 | 75 | 80 | 74 | 80 | 80 | 50 | 439 |
| 102-2 | 72 | 78 | 76 | 80 | 80 | 50 | 436 |
| 102-1 | 71 | 78 | 76 | 80 | 79 | 50 | 434 |

未寫的題全是：選項在圖上而題庫只存到空字串、題幹或選項轉檔毀損、官方答案與教科書衝突者。這三類刻意跳過，不要硬寫。

## 教師檢定進度（`tea-*`，261 卷 8,103 題）

已完成 **115 年 15 卷 362 題、114 年 16 卷 394 題**，合計 756 題。

| 年度 | 卷數 | 已寫題數 |
|---|---|---|
| 115 | 15 | 362 |
| 114 | 16 | 394 |

跳過的題：選項或題幹在圖上（數學能力測驗較多）、轉檔缺公式、官方答案與教科書明顯衝突者。
每年 15 卷的結構：國語文 1、數學 1、其餘為幼兒園／國小／中等／特教四類科的「教育理念與實務」「學習者發展與適性輔導」「課程教學與評量」。四類科的「教育理念與實務」重複率極高（115 年四卷幾乎完全相同），用 `tools/reuse-exp.py` 套用即可。

## 之前已完成的其他類別

- **中醫師**（`tcm-*`）168 卷 13,440 題 → 已寫 13,104 題（97.5%），全數做完
- **高普考共同科目**（`gao-*`）115～102 年 → 1,406 題，全數做完
- **地方特考共同科目**（`loc-*`）102～114 年 → 1,975 題，全數做完
- 牙醫師、醫師等類別的完成度見 chinese 線舊 PROGRESS.md 的紀錄

## 申論題 AI 批改小實驗（2026-09-08 完成）

結論記在 `docs/plan-log.md`。
