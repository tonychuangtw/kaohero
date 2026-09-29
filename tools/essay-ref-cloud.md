# 申論參考架構：雲端 session 作業說明（2026-09-29）

你在 Claude Code 雲端 session 裡，替考英雄（kaohero.com）的申論題寫「參考架構」。brain 本機另有批次在寫其他分片（法律科、Gemini 那份），
你只做開工訊息給的分片，結果 push 到指定 branch；本機會來 merge。整輪不需要問任何人。

## 開工訊息會給三個參數
- `SHARD`（例 `0/4`）　- `BRANCH`（例 `cloud/essay-ref-0`）　- `MAXB`（這一輪最多做幾批；沒給＝60）

先跑一次：`bash tools/essay-ref-cloud.sh init <SHARD> <BRANCH>`（之後的指令不用再帶參數）。

## 每一批（同一科最多 12 題）
1. `bash tools/essay-ref-cloud.sh next`
   印「N 題（全部 X，110 年起 Y）」並組好 `/tmp/essay-ref/prompt.md`。印「0 題」→ 到「收工」。
2. 用 Agent 工具開一個子代理（`model: "sonnet"`）寫這批，prompt 只要這段：
   「讀 /tmp/essay-ref/prompt.md，那是完整的指令與題目，照裡面的規定做；結果用 Write 工具寫到 /tmp/essay-ref/refs.json。
   除了 Read 那個檔、Write 這個檔，不要做任何其他事，做完直接結束。」
   ⚠️ 參考架構一律交給子代理寫；你自己不寫、也不要把 prompt.md 或 refs.json 讀進主對話，主對話才不會撐爆。
3. `bash tools/essay-ref-cloud.sh set`
   驗格式、寫回、commit。輸出裡「退回：」幾題是正常的（下一批會再挑到，第二次退回自動記 skip），不用處理。
4. 每 5 批 `bash tools/essay-ref-cloud.sh push`。

## 異常
- `set` 印「沒有 refs.json」：同一批再開一個子代理重做一次；再沒有 → `bash tools/essay-ref-cloud.sh skip`，繼續下一批。
- 子代理回報 content filtering（API Error 400 Output blocked）：改成一題一題（`next 1` → 子代理 → `set`）；單題仍被擋 → `skip`。
- `set` 非零結束（refs.json 壞掉）：同一批重開子代理一次；再壞 → `skip`。
- 其他錯誤連續 3 次：`push`、印出錯誤內容、停下。

## 收工
做滿 MAXB 批、或 `next` 印「0 題」：`push` 一次，`bash tools/essay-ref-cloud.sh status`，印一行總結
「本輪寫 N 題、skip M 題、B 批，最後一科：…，此分片剩 X 題（110 年起 Y）」然後結束這一輪。
之後收到「continue」就從流程 1 接著做（MAXB 重新計）。

## 不准
- 不改任何程式；只有 `essay-ref-cloud.sh` 會動 `js/data/essay/`、`js/data/essays.js`、`tools/essay-ref-skips.json`、`tools/essay-ref-rejects.json`
- 不跑 test、不開 PR、不 merge、不 rebase、不 push 到 main
- 不問問題、不等回覆；卡住就 push 目前進度並停下
