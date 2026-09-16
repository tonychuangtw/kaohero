STATUS: in-progress
OBJECTIVE: 把考英雄全站的逐題詳解寫完（藥師、中醫師、教師檢定、高普考、地方特考、護理師、初等考試皆已完成）；目前＝警察特考 596 卷 19,410 題的詳解，由 exp-worker 逐卷跑
NEXT_ACTION: 本線不做事，等 worker 跑完警察特考（`^pol-`）。**2026-09-16 起引擎改成 agy／gemini-3.8-flash-high**（Claude 週限撞 83%，Tony 指示先切 Gemini）：模型在 runner 上跑、$0 API、不吃 Claude 額度，其餘流程完全不變。
　⏰ **台北 09/18（週五）04:10 會自動切回 claude**（`exp-engine-restore.timer`，一次性，跑完自己 disable，並發 TG 通知）。手動切換：`tools/exp-engine.sh agy|claude|status`。
　本線只做四件事：（1）回 Tony 的訊息；（2）Tony 問進度時看 `systemctl --user status exp-worker`、`tail ~/.claude/exp-worker.log`、下方「exp-worker」自動區塊；（3）worker 停下來（連續失敗告警、或 `~/.claude/exp-worker.failed` 有卷）時查原因、修工具、`systemctl --user start exp-worker` 重啟；（4）worker 做完一科後，依 Tony 2026-09-09 定的順序轉檔下一科（警察特考 → **導遊領隊** → 其他醫事類：醫檢師、物理治療師、營養師、職能治療師），轉檔流程見下方「新增科目：警察特考」那節，照抄即可。
　換科目＝改 `tools/exp-worker.service` 的 `EXP_MATCH` 後 `cp tools/exp-worker.service ~/.config/systemd/user/ && systemctl --user daemon-reload && systemctl --user restart exp-worker`（注意：`exp-engine.sh` 會用 repo 裡那份覆蓋 unit 再補兩行 Environment，改 EXP_MATCH 要改 repo 裡的檔）。
　⛔ 不要自己再逐卷寫詳解、不要手動跑 set-exp／build-pages 改題庫（會跟 worker 互撞）。Tony 09-14 定案，原因：之前全在本線對話裡做，每步 context 535k、一週吃掉全線額度 84%。
VALIDATION: `node test/test.js` 全綠（48,832 項檢查）；`node tools/build-index.js --write` 後首頁「自撰詳解」數字會增加
BLOCKERS: 無
PATHS: js/data/exam/*.js（題庫本體）、js/data/exams.js（build-index 產生，勿手改）、tools/exp-worker.sh、tools/exp-worker.service、tools/gen_civil.py、tools/civil-index-merge.py、tools/index-spec.json、tools/build-index.js、test/test.js、~/exam-pdfs/pol
UPDATED: 2026-09-16 10:06 台北

<!-- exp-worker:start -->
（自動更新，勿手改）詳解批次由 tools/exp-worker.sh 逐卷開新 session 執行（範圍 ^pol-，引擎 agy/gemini-3.8-flash-high）。最後一卷：pol-104-1-b005 104 年　三等考試　社會學與社會工作，寫 25 題、跳過 0 題，09/17 03:22 台北。跳過的題記在 tools/exp-skips.json；失敗的卷在 ~/.claude/exp-worker.failed；每卷紀錄 ~/.claude/exp-worker.log。
<!-- exp-worker:end -->

## 初等考試 106～115 年人工逐卷時期的紀錄（2026-09-13～14，由 kaohero 線在對話裡做；之後改 worker）

**115 年已全部做完（2026-09-13）**，只剩下列刻意跳過的題：
- `e017` #22（樣本數決定，官方答案 162 與 (z(α/2)+z(β))²σ²/δ²＝81 不符）
- `e026` #24（考績法第 12 條下，選項 B 與 D 皆為錯誤敘述，官方只給一個答案）
- `e027` #25（選項 B「禁止停車標誌標線」依道安規則仍得臨時停車，與官方單一答案衝突）
- `e029` 13 題、`e030` 16 題（題幹指向電路圖，但轉檔沒有 fig 圖檔）
**114 年已全部做完（2026-09-14）**，只剩下列刻意跳過的題：
- `e002` #41～#45（克漏字題組，本文未隨轉檔保留，圖檔只剩選項那一行）
- `e028` #38 #46（題幹附表未隨轉檔保留）
- `e029` 4 題、`e030` 12 題（題幹指向電路圖／波形圖，但轉檔沒有 fig 圖檔）
**113 年已全部做完（2026-09-14）**（27 卷），只剩下列刻意跳過的題：`e030` 14 題、`e029` 3 題（電路圖未隨轉檔保留）、`e028` #44 #49、`e017` #15、`e010` #43、`e008` #15 #35（官方答案與教科書／法條衝突或兩選項皆可）。
**112 年已全部做完（2026-09-14）**（29 卷），只剩下列刻意跳過的題：`e030` 13 題、`e029` 9 題（電路圖／波形圖未隨轉檔保留）、`e018` #46 #47 #49 #50（程式碼圖未保留）、`e002` #46～#50（克漏字本文未隨轉檔保留）、`e026` #29、`e017` #2、`e013` #16 #24、`e012` #8（官方答案與法條／教科書衝突，或題幹選項轉檔毀損）。
**111 年已全部做完（2026-09-14）**（33 卷），只剩下列刻意跳過的題：`e030` 16 題、`e029` 22 題（電路圖未隨轉檔保留，其中 e029 #35 轉移函數、#40 二階濾波器轉檔毀損）、`e028` #13、`e025` #15、`e021` #20、`e019` #39、`e018` #39、`e017` #33、`e012` #24、`e002` #35（官方答案與教科書定義衝突或題目圖表未保留）。
**110 年已全部做完（2026-09-14）**（26 卷），只剩下列刻意跳過的題：`e030` 18 題、`e029` 26 題（電路圖／波形圖未隨轉檔保留）、`e031` #42、`e028` #5 #6、`e027` #20 #37 #44、`e026` #12 #47、`e025` #13、`e021` #28、`e015` #34、`e013` #16 #46、`e012` #37、`e011` #42（官方答案與現行法條／教科書衝突，或兩選項皆可）。110 年起多了 `e015` 貨幣銀行學大意、`e016` 保險學大意兩科。
**109 年已全部做完（2026-09-14）**（27 卷），只剩下列刻意跳過的題：`e030` 24 題、`e029` 15 題（電路圖／波形圖未隨轉檔保留）、`e017` #10 #30 #37（公式上標轉檔錯位、選項與波松計算不符）、`e019` #1 #27 #31、`e018` #47（二元樹圖未保留）、`e025` #15（排架號碼交錯毀損）、`e011` #16 #46 #50、`e031` #1（官方答案與現行條文衝突或兩選項皆可）。
**108 年已全部做完（2026-09-14）**（27 卷），只剩下列刻意跳過的題：`e030` 27 題、`e029` 24 題（電路圖／波形圖未隨轉檔保留）、`e022` #45 #49、`e021` #5 #9 #10（圖形題與需求函數轉檔毀損）、`e019` #43、`e018` #16、`e012` #38 #46、`e011` #18、`e010` #39（官方答案與法條／定義有疑義）。
**106 年已全部做完（2026-09-14）**（29 卷，略過題見各 commit）。**下一步＝105 年**（31 卷，多了 e032 臺灣原住民族史、e033 原住民族行政及法規），由 `e033` 開始依序往 e032…e002。做完 105 年再往 104…一路到 102 年。
初等考試的特性：全部是四選一測驗題、一年一次（第三段固定為 1）、只有一個等別，考科多為「◯◯大意」（法學大意、行政學大意、社會工作大意、會計學大意、基本電學大意…），難度低於高普考，寫解析時要對應的是「大意」層級的基本概念。
護理師（159 卷 11,280 題）已於 2026-09-13 全部做完，已寫 11,185 題／99.2%；剩 95 題全是寫不出來的（廢題 22、官方雙答案 12、①②③④組合選項在轉檔時全變成同一個圈圈字 31、要看圖但沒有 fig 或官方答案與教科書衝突 30）。
⚠ 全站「選項排多欄、文字黏在題幹尾端但有 fig」的未寫題還有 gao 107、loc 167、tcm 6、den 1、tea 1（共 282 題），這些是可以寫的（做法見下），等初等考試告一段落再回頭補。
之後的科目順序（Tony 2026-09-09 定）：初等考試 → 警察特考 → 導遊領隊 → 其他醫事類（醫檢師、物理治療師、營養師、職能治療師）。
每卷流程：讀題 → Write patch JSON 到 scratchpad → `node $SP/chk.js` → `node tools/set-exp.js <patch> --write` → `node tools/build-index.js --write` → `node test/test.js` → `node tools/build-pages.js --only <pid> --write` → `git add js/data/exam/<pid>.js js/data/exams.js exam/<pid> sitemap.xml` → commit+push。SP=`/tmp/claude-1000/-home-tony-TelegramClaude-kaoguhero/<session>/scratchpad`，換 session 要重寫 chk.js（規格見下）。
⚠ 111 年以前每卷多為 80 題，讀題分兩批（q.n<=40 / >40）。全站 2,536 卷、120,561 題，已寫詳解 118,032 題。護理師五科：nur1 基礎醫學、nur2 基本護理學與護理行政、nur3 內外科護理學、nur4 產兒科護理學、nur5 精神科與社區衛生護理學（108 年第一次沒有 nur5）。⚠ 要跳過的題（都要在 commit 訊息寫明）：`void:true` 送分題（set-exp 會擋）、題幹提到圖表但物件沒有 `fig` 欄位、圖檔解析度不足無法可靠判讀、官方答案與教科書／計算衝突或雙答案題。寫完護理師再依 Tony 2026-09-09 定的順序做下一科：初等考試 → 警察特考 → 導遊領隊 → 其他醫事類。

掃「選項全空但有 fig、尚未寫詳解」的題：
```
node -e "const fs=require('fs');const norm=s=>String(s||'').normalize('NFKC').replace(/[\s]/g,'');const by={};fs.readdirSync('js/data/exam').forEach(f=>{global.window={};require(process.cwd()+'/js/data/exam/'+f);const pid=f.replace('.js','');const p=window.APP_EXAM_PAPERS[pid];if(!p)return;let c=0;p.qs.forEach(q=>{if(q.exp||q.void)return;const o=q.o.map(norm);if((new Set(o).size<o.length||o.some(x=>!x))&&q.fig)c++});if(c)by[pid]=c});console.log(by)"
```


## 剩下的 2,737 題是什麼（2026-09-12 全站盤點，不是漏做）

| 類別 | 題數 | 說明 |
|---|---|---|
| 廢題（`void:true`） | 101 | 官方公告不計分，本來就不寫 |
| 有 fig 但寫不出來 | 282 | 幾乎都是英文／國文的克漏字與閱讀題組：圖檔只截到「選項那一行」，題組原文那一段在轉檔時只剩前一題選項 (D) 尾端的一兩句，整段遺失。另有少數中醫藥材辨識照片、牙科 X 光片、生藥圖，無法可靠判讀 |
| 沒有 fig 也寫不出來 | 2,354 | ①電路圖／波形圖題但物件沒有 fig 欄位（基本電學、電子學、數位邏輯）②有機化學結構式、矩陣、公式在轉檔時掉成亂碼 ③題組原文整段遺失 ④官方答案與法條／教科書算式衝突（每一題都寫在該卷的 commit message 裡） |

判斷「有 fig 的題組能不能寫」的方法（下次要再掃時用）：題組 [a..b] 的原文，通常排在第 a-1 題那張圖的下半部。所以
`fig(a-1)` 或 `fig(a)` 是大檔（>40KB）才有機會；如果第 a-1 題沒有 fig，原文就只剩它選項 (D) 尾端那一兩句，寫不出來。
## ⚠️ 待查：題庫裡「存的正解跟題目對不上」的題（2026-09-12 Tony 問教檢時發現）

重掃教檢剩下的 91 題時發現，其中**至少 13 題不是內容遺失，而是題庫存的 `a`（正解索引）與題目內容明顯不符**，例如：

| 卷 | 題 | 存的正解 | 看起來應該是 |
|---|---|---|---|
| tea-112-1-t2002 | #17 | 老師將藥物混入果糖讓幼兒服用 | (C) 請家長填妥餵藥單後協助餵服 |
| tea-111-1-t5002 | #24 | 忽視法的運用 | (A) 行為塑造 |
| tea-111-1-t5002 | #25 | 該生無法透過教學訓練改善發音 | (B) 需評估是否有聽力損失 |
| tea-115-1-t2002 | #7 | 遞移推論 | (C) 觀點取替 |
| tea-115-1-t2002 | #10 | 甲乙丁（含「用酒精替代漂白水」） | (D) 丙丁戊 |
| tea-106-1-t5007 | #37 | 人本主義取向 | (B) 認知主義取向 |
| tea-106-1-t5007 | #39 | 種族偶像 | (C) 市場偶像 |

其餘：tea-106-1-t4005 #29、tea-105-1-t5009 #11、tea-104-1-t5008 #10、tea-100-1-t5008 #25、tea-115-1-t2002 #6 #9。

- 同一卷前後題的答案都對，**不是整卷位移**，比較像個別題在建題庫時對錯行（`tools/parse.py` 的 `parse_answers` 是把「題號」列與「答案」列 zip 起來，某一列少抓到一個字母，那一列後面就會整排位移）。
- **影響**：這些題目前沒有詳解，所以沒有寫出錯誤的解析；但站上仍會把存的答案標成「正解」，會誤導人。
- **要做的話**：教檢的試題與參考答案是教育部教師資格考試網站公布的（不是考選部），要另外寫一支抓取＋核對。已在 Telegram 問 Tony 要不要做，等他決定。
- **順帶**：全站 commit message 裡有 153 個 commit 記過「官方答案與法條／算式衝突所以跳過」，那一批也是同一個可疑來源，值得一起查。

## 新增科目：警察特考（2026-09-15 轉檔完成，詳解由 worker 進行中）

- 考選部把警察人員、一般警察人員、交通事業鐵路人員、退除役軍人轉任、國家安全情報人員、移民行政人員
  **綁在同一個考試代碼底下**（例：115060）。本站只收前兩種（警察人員＝警大警專畢業生的內軌、
  一般警察人員＝一般生的外軌），其餘四種是不同考試，日後要收再另開科目。
- 擋法：`tools/gen_civil.py` 的 SPEC 新增 `require: ('警察',)`，類科名前綴不含「警察」就不收。
- 兩軌有同名類科（都有「行政警察人員」），靠 SPEC 的 `tmark` 在類科名前加「一般警察・」／「警察人員・」
  區分，否則分類樹會把兩者併成同一個節點。`civil-index-merge.py` 查分群時會把「・」前綴切掉。
- `papers_of()` 多一層保險：同一份卷掛在好幾個類科底下，平臺列出來的第一個若是被 `require` 擋掉的
  （例：國文同時掛在鐵路高員三級與警察三等，鐵路排前面），改挑第一個判得出等別的類科，
  否則整卷會被誤判成「無法判斷等別」丟掉。下載用的 `c` 不變。
- 等別：二等（a）／三等（b）／四等（c）。102～115 年每年一次，去重後 2,791 份卷探標準答案，
  其中 1,057 份是選擇題卷；三等多為申論卷（沒有標準答案 PDF，自動被篩掉）。
- **結果：成卷 596、19,410 題、49 個科目、34 個類科，裁圖 837 張全部成功。**
  跳過 461 卷：459 卷是被 require 擋掉的鐵路／退除役／國安／移民行政（本來就不收），
  真正失敗只有 2 卷 —— 107 年英文（50 題中 21 題選項混到別的選項代號）、
  107 年普通物理學概要與普通化學概要（題數 31≠答案 40）。
- `tools/index-spec.json` 的 civil 分類已手動加一筆 `pol` 考試項目（civil-index-merge 只更新既有 id，
  不會自己新增）。`tools/gao-groups.json` 已補 5 個警察類群：警察行政與管理、刑事與犯罪防治、
  交通與警察資訊、消防與水上警察、外事與國境警察。
- `track_name()` 改成整串移除「類別」兩字：警察特考把分組類科寫成「交通警察人員類別交通組」，
  只去尾巴的話同一個類科會裂成兩個節點。
- 工作目錄 `~/exam-pdfs/pol`（codes.json、rows-*.json、pdf/、out/、outimg/ 都留著，要重跑不用重抓）。
- **轉檔完整指令（下一科導遊領隊照抄，把 pol 換成新代號）**：
  ```
  mkdir -p ~/exam-pdfs/<代號>/{pdf,out,outimg}
  # codes.json：用 moexlib.year_codes(西元年) 掃 102~115，挑該考試的主代碼
  cp ~/exam-pdfs/pol/{inv-full.py,docrop.py} ~/exam-pdfs/<代號>/
  cd ~/exam-pdfs/<代號> && python3 inv-full.py
  python3 ~/TelegramClaude/kaoguhero/tools/moex-sweep.py ~/exam-pdfs/<代號> S              # 探標準答案，慢，背景跑
  python3 ~/TelegramClaude/kaoguhero/tools/moex-sweep.py ~/exam-pdfs/<代號> Q --has-answer # 抓試題
  python3 ~/TelegramClaude/kaoguhero/tools/moex-sweep.py ~/exam-pdfs/<代號> M --has-answer # 抓更正答案
  # gen_civil.py 先加該考試的 SPEC（等別、lvlkey、prefix、必要時 require／tmark）
  python3 ~/TelegramClaude/kaoguhero/tools/gen_civil.py <代號> --limit 25   # 先試跑抽驗
  python3 ~/TelegramClaude/kaoguhero/tools/gen_civil.py <代號>
  python3 docrop.py
  # index-spec.json 的分類底下先手動加一筆該考試項目（live:false、stages:[]）
  cd ~/TelegramClaude/kaoguhero
  python3 tools/civil-index-merge.py ~/exam-pdfs/<代號>/<代號>-index.json
  cp ~/exam-pdfs/<代號>/out/*.js js/data/exam/ && cp ~/exam-pdfs/<代號>/outimg/*.webp img/q/
  node tools/build-index.js --write && node test/test.js && node tools/build-pages.js --write
  git add -A && git commit && git push
  ```

## 新增科目：初等考試（2026-09-13 完成轉檔，詳解待寫）

- 規模：385 卷、18,710 題，102～115 年各一次，35 個科目（`e001`～`e035`）。
- 工作目錄 `~/exam-pdfs/chu`（pdf/、out/、outimg/ 都留著，要重跑不用重抓）。
- 流程：`codes.json`（掃 year_codes 找「初等考試」）→ `inv-full.py` 產 `rows-<roc>.json`
  → `tools/moex-sweep.py ~/exam-pdfs/chu S|Q|M`（以科目代碼去重，402 份卷）
  → `python3 tools/gen_civil.py chu` → `docrop.py`（裁 188 張圖）
  → `python3 tools/civil-index-merge.py ~/exam-pdfs/chu/chu-index.json`
  → 搬 out/*.js 進 `js/data/exam/`、outimg/*.webp 進 `img/q/`
  → `node tools/build-index.js --write` → `node test/test.js` → `node tools/build-pages.js --write`。
- 工具改了兩處：`tools/gen_civil.py` 加 `chu` SPEC（單一等別、prefix `chu`、lvlkey `e`）；
  `tools/index-spec.json` 的 civil 分類要「先手動加一筆 chu 考試項目」，civil-index-merge 才填得進去
  （它只會更新已存在的 exam id，不會自己新增）。
- **跳過 17 卷**：15 卷國文含複選題（本站作答介面尚未支援）、2 卷題數與標準答案張數不符。
  因此 `e001`／`e005` 國文只各有 2 卷。
- 102～106 年的國文、公民與英文、法學大意各有兩份不同的卷（一般行政組／社會行政組），
  gen_civil 的 collisions() 會自動加「（◯◯組）」區分，107 年起只剩一份。

## 新增科目：護理師（2026-09-12 轉檔、2026-09-13 詳解全部寫完）

- 規模：159 卷、11,280 題，102～115 年共 32 次考試，五科（nur1～nur5）。
- 流程：`moex-fetch.py 護理師 ~/exam-pdfs/nurse 102 115` → `tools/nurse-inv-fix.py`（補次別）→
  `gen_bank.py nurse` → `crop-all.py`（裁 265 張圖）→ 搬進 repo → `build-index.js --write` →
  `test/test.js` → `build-pages.js --write`。工作目錄 `~/exam-pdfs/nurse` 保留著，要重跑不用重抓。
- **次別有三個例外**：112～114 年各有第三次；106 年另有「第二次花東考區補辦考試」（平臺標題被截斷成一樣，
  只能讀 PDF 表頭才分得出來），記為第 4 次、標題寫「第二次（花東考區補辦）」。`test/test.js` 的次別斷言已放寬到 1～4。
- **跳過 1 卷**：`108020` 精神科與社區衛生護理學整份是掃描影像，pdftotext 抽不出文字，需 OCR（這台沒有 tesseract）。
- 轉檔過程修了三個共用工具的問題，之後加科都會受益，細節見該次 commit：
  ① `parse.py` 的 relaxed 模式（題號後只隔一個空白、題號被拆成單獨一行）
  ② `parse.py` 的 `_opts_by_columns()`（選項代號是子集字型的圈圈字、pdftotext 讀不出來時，改用版面欄位切選項；
     救回 103 年第二次與 105 年第一次共 10 卷、800 題，否則整題會變成圖片題）
  ③ `gen_bank.py` 的硬性檢查（題數 ≠ 標準答案張數就中止，不再默默收下被截斷的卷）
- 手修 1 題：`nur-106-1-nur2` #14「醫囑中 A.D. 的含義」的 `A.D.` 被當成選項代號。

## 靜態頁 /exam/<pid>/（2026-09-12 上線）

- 產生器：`node tools/build-pages.js [--write] [--only <pid>] [--limit N]`，產出 `exam/<pid>/index.html`（2,377 頁，平均 35 KB，合計 80 MB）、總覽 `exam/index.html`，並重寫 `sitemap.xml`。樣式在 `css/paper.css`（獨立輕量，不吃 v2.css 的主題變數）。
- 每頁內容：該卷全部題目、選項與考選部標準答案；**前 3 題詳解免費試讀，其餘詳解不寫進 HTML**。這一條是刻意的——`docs/monetization-plan.md` 階段 0 的目標就是「把付費詳解移出公開靜態檔」，若先把 10.6 萬題詳解烘進靜態頁並被 Google 索引，之後要收回會很麻煩。要改試讀題數改 `tools/build-pages.js` 的 `PREVIEW`。
- 另有 canonical／og／BreadcrumbList 與 WebPage JSON-LD、同科目其他年度的站內連結、一顆連回 `#/paper/<pid>` 的作答 CTA。
- **只新增檔案**，沒有動 index.html 的 SPA 與既有 hash 路由；index.html 只多一行連到 `/exam/`。
- 題本內容有改（補詳解、修題目）之後要重跑 `node tools/build-pages.js --write` 才會同步；不跑不影響現有站台，只是靜態頁的數字會舊。

一次重跑清單的指令：
```
node -e "const fs=require('fs');fs.readdirSync('js/data/exam').forEach(f=>{global.window={};require(process.cwd()+'/js/data/exam/'+f);const p=window.APP_EXAM_PAPERS[f.replace('.js','')];if(!p)return;p.qs.forEach(q=>{if(!q.exp&&!q.void&&q.fig)console.log(f.replace('.js','')+' #'+q.n+' '+q.fig)})})"
```


---

## 這條線是怎麼來的

2026-09-09 Tony：「我想同時做 k12review 和國考這個是不是沒辦法? 我想把國考英雄另開一個頻道分出去可以嗎?」
→ 分線。chinese 線專心 K12Review／LanExamMock／補習複習，本線專責考英雄。
同時指示：**repo 從 kaoguhero 改名為 kaohero，因為網址要用這個。**

## 待辦

- [x] **repo 改名 kaoguhero → kaohero**（2026-09-09 完成）。GitHub repo 已改名、本機 remote 已換 `git@github.com:tonychuangtw/kaohero.git`、新站 https://tonychuangtw.github.io/kaohero/ 回 200、rootsite `404.html` MAP 加 `kaohero` 並把舊鍵 `kaoguhero` 指向新站（GitHub Pages 對舊路徑不會自動轉址，靠這層救援）。內部識別碼 `APP: 'kaoguhero'` 與 localStorage `kaoguhero.*` 刻意不動，避免既有使用者紀錄與雲端同步斷掉
- [x] **藥師 168 卷 12,600 題全數做完**（2026-09-10 寫了 12,123 題；2026-09-11 再補完全部 199 題圖片題，現為 12,322 題／97.8%）
- [ ] 教師檢定 → 高普考 → 地方特考 補解析（見 NEXT_ACTION）
- [x] **牙醫、中醫的圖片題補完**（2026-09-09）：這兩科先前宣告完工時，和藥師同樣漏掉「選項在圖上」的題。牙醫 57 題補了 56 題（`den-109-1-dent5` #79 四張髁頭影像只差在投照角度，判讀不可靠故跳過）；中醫 73 題補了 67 題（餘 6 題是生藥辨識，三個誘答選項的藥材無法可靠辨識，依「寧可不寫」規則跳過）。高普考 574 題、地方特考 658 題的圖片題，等主線做到那兩科時一起補
- [x] **藥師圖片題 199 題全數補完**（2026-09-11）：查證發現「選項是空字串」的題其實都有 `fig` 圖檔（img/q/*.webp），網頁上看得到圖、考生能作答，之前是用終端機讀題看不到圖才跳過。做法＝用 Read 工具開 webp 判讀後再寫（CLAUDE.md 已記）。剩下的 278 題未寫是另兩類：題幹寫「下圖／下表」但題庫沒有 `fig` 欄位、以及官方答案與教科書明顯衝突者，依規則跳過。已在 Telegram 回覆 Tony：不刪這些題（刪了會與考選部原卷缺號對不起來）
- [x] **自訂網域正式上線**（2026-09-09 完成，https://kaohero.com）。建議 kaohero.com（RDAP 查過未註冊），Cloudflare Registrar 註冊、DNS 留 Cloudflare、站台續用 GitHub Pages 自訂網域。等 Tony 買完網域後：① DNS 記錄（A/AAAA 或 CNAME 到 tonychuangtw.github.io，先設 DNS only 讓 GitHub 簽憑證）② repo 加 CNAME 檔 ③ GitHub Pages 設 custom domain + Enforce HTTPS ④ 後端加 `EXTRA_ORIGINS=https://kaohero.com`（server.js 已有此環境變數機制，不必改程式）⑤ Google Identity 的 authorized JavaScript origins 加新網域（要 Tony 在 Google Cloud Console 操作）⑥ rootsite 舊網址轉到新網域。已完成：Cloudflare 5 筆 DNS 記錄（DNS only）、repo CNAME 檔、GitHub Pages custom domain、強制 HTTPS（Let's Encrypt 憑證已簽發）、後端 EXTRA_ORIGINS、Google OAuth origins（Tony 操作）。驗證：三個網址皆 200、CORS 放行、站內資源可正常載入
- [ ] **SEO／AEO 上線清單（依 shared.md §22，2026-09-09 起跑）**。已登記進 seoaeo 監控站（https://tonychuangtw.github.io/seoaeo/ ，站名「考英雄」、線名 kaohero、主關鍵字：國考考古題／高普考考古題／考古題詳解）。首次檢查 SEO 37%／AEO 35% → 三輪修正後 **SEO 77%／AEO 71%（AEO 已無 ❌）**
  - 已做：title 與 description 帶主關鍵字、canonical、og:url／og:image／twitter 大圖卡、JSON-LD（WebSite／Organization 含 logo／WebPage dateModified／FAQPage 七題）、首頁 1,200 字靜態內容（H1、問句式 H2＋直答段落、分類清單、FAQ 可見文字、站內外連結、更新日期）、robots.txt（明示不擋 AI 爬蟲）、sitemap.xml、llms.txt、img/og.png 與 img/logo.png
  - 還沒做（要 Tony 登入的手動項，做完用 `node ~/TelegramClaude/seoaeo/tools/mark.js kaohero.com <id> done "備註"` 打勾）：~~`gsc`~~、~~`gsc-sitemap`~~、~~`gsc-index`~~（2026-09-09 全部完成：Google 自動偵測 Cloudflare 走 OAuth 驗證網域；Tony 另建 GCP 服務帳戶 kaohero-seo@lanexammock.iam.gserviceaccount.com 並在 GSC 給「完整」權限，金鑰在 `~/.config/gcloud-sa/kaohero-gsc.json`（chmod 600，不進 git），工具是 `seoaeo/tools/gsc.py`，可查資源／送 sitemap／拉搜尋成效；sitemap.xml 已送出、要求索引已按）、`bing`（從 GSC 一鍵匯入）、`analytics`（建議 Cloudflare Web Analytics，免 cookie）、`kw-rank-check`、`cwv`、`indexnow`、上線兩週後的 `ai-cite-*` 三項引用測試
  - 剩下的自動項 ❌ 只有 `kw-coverage` 3/16：其餘建議關鍵字是 dcard／ptt／臨床心理師／消防設備師／不動產經紀人／高點等我們沒收錄的科目或別家品牌，硬塞違反 §22「不要為了衝分數硬塞關鍵字」，維持現狀
  - 待評估的大工程：題庫頁目前是 `#/paper/<id>` 的 hash 路由，Google 只算首頁一頁。要讓 2,377 卷各自被索引，需改成 `/exam/<id>/` 靜態頁並列進 sitemap（build 腳本產生）。這會同時大幅提升長尾搜尋流量，但要動路由與部署流程，等詳解主線告一段落再做
- [ ] **擴充新科目（Tony 2026-09-09 定案的順序）**：現有八類的解析全部做完後，再一科一科加；每加一科就把該科解析寫完，才動下一科。順序：護理師 → 初等考試 → 警察特考 → 導遊領隊 → 其他醫事類（醫檢師、物理治療師、營養師、職能治療師）
  - 建築師、會計師暫緩：主力是申論與手繪設計題，站台的單選題架構只吃得下部分測驗題；等申論批改功能成熟再收（`docs/plan-log.md` 有申論 AI 批改實驗結論）
  - 站上「題多解少」的缺口：地方特考 27,010 題只寫了 2,020；高普考 17,995 題已寫 5,280+（29%＋；2026-09-09～10 這輪從 1,406 一路推上來）；教師檢定已完成
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

## 教師檢定進度（`tea-*`，261 卷 8,098 題）

已完成 **115～109 年、106～99 年共 205 卷、6,516 題（80.5%）**。教檢**沒有 107、108 兩個年度的卷**（考選部那兩年未舉辦或題庫未收）。

| 年度 | 卷數 | 已寫／總題數 |
|---|---|---|
| 115 | 15 | 362／376 |
| 114 | 16 | 394／401 |
| 113 | 15 | 370／376 |
| 112 | 15 | 369／376 |
| 111 | 15 | 369／376 |
| 110 | 15 | 375／376 |
| 109 | 14 | 456／460 |
| 106 | 15 | 474／485 |
| 105 | 15 | 486／490 |
| 104 | 15 | 478／490 |
| 103 | 15 | 479／490 |
| 102 | 12 | 412／415 |
| 101 | 14 | 485／485 |
| 100 | 15 | 524／525 |
| 99 | 14 | 485／485 |
| 98 | 13 | 470／470 |
| 97 | 14 | 509／511 |
| 96 | 14 | 510／511 |

跳過的題：選項或題幹在圖上（數學能力測驗較多）、轉檔缺公式、官方答案與教科書明顯衝突者。
每年 15 卷的結構：國語文 1、數學 1、其餘為幼兒園／國小／中等／特教四類科的「教育理念與實務」「學習者發展與適性輔導」「課程教學與評量」。四類科的「教育理念與實務」重複率極高（115 年四卷幾乎完全相同），用 `tools/reuse-exp.py` 套用即可。

## 之前已完成的其他類別

- **中醫師**（`tcm-*`）168 卷 13,440 題 → 已寫 13,104 題（97.5%），全數做完
- **高普考**（`gao-*`）633 卷 17,995 題 → 已寫 17,455 題（97.0%），115～102 年全數做完（2026-09-11）
- **地方特考**（`loc-*`）774 卷 27,010 題 → 進行中，已寫 19,816 題（73.4%）；114～105 十個年度全部完成，進行中為 104 年
- **地方特考共同科目**（`loc-*`）102～114 年 → 1,975 題，全數做完
- 牙醫師、醫師等類別的完成度見 chinese 線舊 PROGRESS.md 的紀錄

## 申論題 AI 批改小實驗（2026-09-08 完成）

結論記在 `docs/plan-log.md`。
