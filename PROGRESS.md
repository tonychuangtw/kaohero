STATUS: in-progress
OBJECTIVE: 把考古英雄 2,377 卷的逐題詳解寫完（目前主線＝藥師 168 卷 12,600 題）
NEXT_ACTION: 打開 `js/data/exam/pha-109-1-ph1.js` 讀題（指令見 CLAUDE.md），寫 patch JSON → `node tools/set-exp.js <patch> --write && node tools/build-index.js --write && node test/test.js` → commit push；同梯次依 ph1→ph6 做完再往前一個梯次（108-2、108-1…102-1）
VALIDATION: `node test/test.js` 全綠（33,162 項檢查）；`node tools/build-index.js --write` 後首頁「自撰詳解」數字會增加
BLOCKERS: 無
PATHS: js/data/exam/*.js（題庫本體）、js/data/exams.js（build-index 產生，勿手改）、tools/set-exp.js、tools/build-index.js、test/test.js
UPDATED: 2026-09-09 11:10 台北

---

## 這條線是怎麼來的

2026-09-09 Tony：「我想同時做 k12review 和國考這個是不是沒辦法? 我想把國考英雄另開一個頻道分出去可以嗎?」
→ 分線。chinese 線專心 K12Review／LanExamMock／補習複習，本線專責考古英雄。
同時指示：**repo 從 kaoguhero 改名為 kaohero，因為網址要用這個。**

## 待辦

- [x] **repo 改名 kaoguhero → kaohero**（2026-09-09 完成）。GitHub repo 已改名、本機 remote 已換 `git@github.com:tonychuangtw/kaohero.git`、新站 https://tonychuangtw.github.io/kaohero/ 回 200、rootsite `404.html` MAP 加 `kaohero` 並把舊鍵 `kaoguhero` 指向新站（GitHub Pages 對舊路徑不會自動轉址，靠這層救援）。內部識別碼 `APP: 'kaoguhero'` 與 localStorage `kaoguhero.*` 刻意不動，避免既有使用者紀錄與雲端同步斷掉
- [ ] 藥師詳解續做（見 NEXT_ACTION）
- [x] **自訂網域正式上線**（2026-09-09 完成，https://kaohero.com）。建議 kaohero.com（RDAP 查過未註冊），Cloudflare Registrar 註冊、DNS 留 Cloudflare、站台續用 GitHub Pages 自訂網域。等 Tony 買完網域後：① DNS 記錄（A/AAAA 或 CNAME 到 tonychuangtw.github.io，先設 DNS only 讓 GitHub 簽憑證）② repo 加 CNAME 檔 ③ GitHub Pages 設 custom domain + Enforce HTTPS ④ 後端加 `EXTRA_ORIGINS=https://kaohero.com`（server.js 已有此環境變數機制，不必改程式）⑤ Google Identity 的 authorized JavaScript origins 加新網域（要 Tony 在 Google Cloud Console 操作）⑥ rootsite 舊網址轉到新網域。已完成：Cloudflare 5 筆 DNS 記錄（DNS only）、repo CNAME 檔、GitHub Pages custom domain、強制 HTTPS（Let's Encrypt 憑證已簽發）、後端 EXTRA_ORIGINS、Google OAuth origins（Tony 操作）。驗證：三個網址皆 200、CORS 放行、站內資源可正常載入
- [ ] **擴充新科目（Tony 2026-09-09 定案的順序）**：現有八類的解析全部做完後，再一科一科加；每加一科就把該科解析寫完，才動下一科。順序：護理師 → 初等考試 → 警察特考 → 導遊領隊 → 其他醫事類（醫檢師、物理治療師、營養師、職能治療師）
  - 建築師、會計師暫緩：主力是申論與手繪設計題，站台的單選題架構只吃得下部分測驗題；等申論批改功能成熟再收（`docs/plan-log.md` 有申論 AI 批改實驗結論）
  - 站上「題多解少」的缺口：地方特考 27,010 題只寫了 2,020、高普考 17,995 題只寫了 1,406、教師檢定 8,103 題 0 解析——這三塊是現有八類裡的主要待補
- [ ] 詳解全部寫完後：題解分離、變現四階段（`docs/monetization-plan.md`）

## 藥師詳解進度（`pha-*`，168 卷 12,600 題）

已完成 **13 個梯次，共 5,602 題**：

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

未寫的題全是：選項在圖上而題庫只存到空字串、題幹或選項轉檔毀損、官方答案與教科書衝突者。這三類刻意跳過，不要硬寫。

## 之前已完成的其他類別

- **中醫師**（`tcm-*`）168 卷 13,440 題 → 已寫 13,104 題（97.5%），全數做完
- **高普考共同科目**（`gao-*`）115～102 年 → 1,406 題，全數做完
- **地方特考共同科目**（`loc-*`）102～114 年 → 1,975 題，全數做完
- 牙醫師、醫師等類別的完成度見 chinese 線舊 PROGRESS.md 的紀錄

## 申論題 AI 批改小實驗（2026-09-08 完成）

結論記在 `docs/plan-log.md`。
