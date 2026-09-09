# 考英雄

國家考試歷屆考古題線上練習站。

- 網址：https://tonychuangtw.github.io/kaohero/
- 收錄（民國 102～115 年）：
  - 醫事人員：醫師、牙醫師、中醫師、藥師（各分兩階段）
  - 律師／司法官 第一試：綜合法學（一）（二）
  - 高普考：共同科目（國文測驗部分、法學知識與英文），專業科目陸續加入
  - 分類：類別 → 考試 → 等別／階段 →（高普考再分 類群 → 類科）→ 科目 → 年份卷
- 功能：整卷測驗、無限刷題、錯題本、弱點統計（進度存在瀏覽器本機）

## 資料來源

試題與標準答案取自考選部「考畢試題查詢平臺」公開之考畢試題與測驗式試題標準答案
（<https://wwwq.moex.gov.tw/>），屬政府資訊公開資料。標準答案如有更正，本站以更正後的答案為準。

**站上的解析與頁面文案皆為本站自撰**，未取用任何第三方網站的詳解或內容。

## 開發

純靜態 vanilla JS，無 build 步驟，GitHub Pages 由 main 分支根目錄部署。

```
node test/test.js     # 資料完整性（索引 vs 實檔、每題結構、答案範圍）
node test/smoke.mjs   # 瀏覽器 smoke test（用 chrome-headless-shell 真的點過一遍）
```

改到 `js/` 或 `css/` 後，記得把 `index.html` 裡的 `?v=` 換成當天日期，
避免使用者拿到 GitHub Pages 快取的舊檔（`js/app.js` 頂端的 `VER` 控制題本檔快取，要一起改）。

### 顯示設定（字級／配色／語言）

`js/i18n.js` 管三件事，設定存在 `localStorage` 的 `kaohero.prefs`：

- **字級**：`<html data-fs="s|m|l|xl">`，CSS 裡每個 `font-size` 都寫成
  `calc(Npx * var(--fs,1))`，新增樣式時請沿用這個寫法，否則那段字不會跟著縮放。
- **配色**：`<html data-theme="light|dark|sepia|hc">`；不設就是「跟隨系統」
  （`prefers-color-scheme` 的深色區塊已排除這三個明確值）。要加新配色就在
  `css/v2.css` 末端多一組 CSS 變數。
- **語言**：`window.KH.T('中文字串')` 查 `js/i18n.js` 的 `EN` 字典，查不到就原樣回傳——
  因此**題目、標準答案與詳解永遠不會被翻譯**。`js/app.js` 裡所有介面字串都已包在 `T()` 內，
  新增介面文字時請一併加進字典；頁首頁尾等靜態 HTML 由 `translateStatic()` 處理。

## 目錄

```
js/data/exams.js        卷別索引（自動產生）
js/data/exam/<id>.js    各卷題目（自動產生）
img/q/                  選項是圖片的題目，從官方 PDF 裁下來的原圖
js/app.js               前端全部邏輯
```

## 匯出成 Anki 牌組 / 列印講義

```bash
# 1. 先把要出的卷匯成 JSON（可用卷號前綴）
node tools/export-json.js /tmp/out.json doc-115 doc-114

# 2a. Anki 牌組（.apkg）—— 需要 genanki
python3 -m venv /tmp/ankienv && /tmp/ankienv/bin/pip install genanki
/tmp/ankienv/bin/python tools/build-anki.py /tmp/out.json out.apkg \
    --deck "考英雄 醫師一階" --owner "買家 Email"

# 2b. 列印講義（先產 HTML，再用 headless Chrome 印成 PDF）
python3 tools/build-pdf.py /tmp/out.json /tmp/out.html \
    --title "115 年 醫師國考第一階段 完整詳解" --owner "買家 Email"
~/.cache/ms-playwright/chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell \
    --headless --disable-gpu --no-sandbox --no-pdf-header-footer \
    --print-to-pdf=out.pdf "file:///tmp/out.html"
```

`--owner` 會印在每張卡的頁尾與 PDF 每一頁下方（明碼浮水印）；`--limit N` 每卷只取前 N 題，用來做試看樣本。
