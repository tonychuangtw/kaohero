STATUS: in-progress
OBJECTIVE: 把考古英雄 2,377 卷的逐題詳解寫完（目前主線＝藥師 168 卷 12,600 題）
NEXT_ACTION: 打開 `js/data/exam/pha-110-2-ph4.js` 讀題（指令見 CLAUDE.md），寫 patch JSON → `node tools/set-exp.js <patch> --write && node tools/build-index.js --write && node test/test.js` → commit push；同梯次依 ph1→ph6 做完再往前一個梯次（110-1、109-2…102-1）
VALIDATION: `node test/test.js` 全綠（33,162 項檢查）；`node tools/build-index.js --write` 後首頁「自撰詳解」數字會增加
BLOCKERS: 無
PATHS: js/data/exam/*.js（題庫本體）、js/data/exams.js（build-index 產生，勿手改）、tools/set-exp.js、tools/build-index.js、test/test.js
UPDATED: 2026-09-09 09:10 台北

---

## 這條線是怎麼來的

2026-09-09 Tony：「我想同時做 k12review 和國考這個是不是沒辦法? 我想把國考英雄另開一個頻道分出去可以嗎?」
→ 分線。chinese 線專心 K12Review／LanExamMock／補習複習，本線專責考古英雄。
同時指示：**repo 從 kaoguhero 改名為 kaohero，因為網址要用這個。**

## 待辦

- [x] **repo 改名 kaoguhero → kaohero**（2026-09-09 完成）。GitHub repo 已改名、本機 remote 已換 `git@github.com:tonychuangtw/kaohero.git`、新站 https://tonychuangtw.github.io/kaohero/ 回 200、rootsite `404.html` MAP 加 `kaohero` 並把舊鍵 `kaoguhero` 指向新站（GitHub Pages 對舊路徑不會自動轉址，靠這層救援）。內部識別碼 `APP: 'kaoguhero'` 與 localStorage `kaoguhero.*` 刻意不動，避免既有使用者紀錄與雲端同步斷掉
- [ ] 藥師詳解續做（見 NEXT_ACTION）
- [ ] 詳解全部寫完後：題解分離、變現四階段（`docs/monetization-plan.md`）

## 藥師詳解進度（`pha-*`，168 卷 12,600 題）

已完成 **10 個梯次又 3 卷，共 4,536 題**：

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
| 110-2 | 72 | 78 | 72 | — | — | — | 222（做到 ph3） |

未寫的題全是：選項在圖上而題庫只存到空字串、題幹或選項轉檔毀損、官方答案與教科書衝突者。這三類刻意跳過，不要硬寫。

## 之前已完成的其他類別

- **中醫師**（`tcm-*`）168 卷 13,440 題 → 已寫 13,104 題（97.5%），全數做完
- **高普考共同科目**（`gao-*`）115～102 年 → 1,406 題，全數做完
- **地方特考共同科目**（`loc-*`）102～114 年 → 1,975 題，全數做完
- 牙醫師、醫師等類別的完成度見 chinese 線舊 PROGRESS.md 的紀錄

## 申論題 AI 批改小實驗（2026-09-08 完成）

結論記在 `docs/plan-log.md`。
