#!/usr/bin/env bash
# essay-refresh.sh — 題目 PDF 補下載後重新轉申論題庫並上線（保留已寫的參考架構）。
# 跟 essay-ref-batch.sh 共用 ~/.claude/essay.lock：拿著鎖轉檔，批次那邊就不會在轉檔途中寫參考架構。
set -eu
cd "$HOME/TelegramClaude/kaoguhero"
flock "$HOME/.claude/essay.lock" bash -c '
  python3 tools/gen_essay.py | grep -v 私用區
  python3 tools/essay-map.py | tail -1
  node test/test.js | tail -1
  for i in 1 2 3 4 5 6; do
    git add js/data/essay js/data/essays.js js/data/essay.js &&
    git commit -q -m "申論題庫：重新轉檔（補下載的題目）" && break
    git diff --cached --quiet && break
    sleep 5
  done'
git pull -q --rebase && git push -q
