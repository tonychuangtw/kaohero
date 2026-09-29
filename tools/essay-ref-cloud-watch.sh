#!/usr/bin/env bash
# essay-ref-cloud-watch.sh — 雲端 session 申論參考架構 branch 看守（0 token；essay-cloud-watch.timer 每 15 分叫一次）
#   branch 有新 commit → 每 2 小時回報 kaohero 頻道（每條幾批、幾題、最後更新時間）
#   全部 branch 都 45 分沒動（這輪做完或卡住）→ essay-ref-merge.py 合併 → test.js → push main → 回報；同一組 head 只合併一次
# 停：systemctl --user stop essay-cloud-watch.timer（試點結束時）。流程說明 tools/essay-ref-cloud.md
set -u
export PATH="$HOME/bin:$HOME/.npm-global/bin:/usr/local/bin:/usr/bin:/bin"
ROOT="$HOME/TelegramClaude/kaoguhero"; cd "$ROOT" || exit 1
ST="$HOME/.claude/essay-ref-cloud.state"; REP="$HOME/.claude/essay-ref-cloud.lastrep"; MERGED="$HOME/.claude/essay-ref-cloud.merged"
TG="$HOME/TelegramClaude/claude-shared/machines/claudebot500/tg-sessions/tg-send.sh"
tg() { "$TG" kaohero <<<"$1" >/dev/null 2>&1 || true; }   # 背景腳本一定要帶線名（shared.md §12）
tpe() { TZ=Asia/Taipei date -d "@$1" '+%m/%d %H:%M'; }
now=$(date +%s); IDLE=2700
heads=$(git ls-remote origin 'refs/heads/cloud/essay-ref-*' 2>/dev/null) || exit 0
[ -n "$heads" ] || exit 0
git fetch -q origin '+refs/heads/cloud/*:refs/remotes/origin/cloud/*' 2>/dev/null || exit 0
touch "$ST"; changed=0; idle_all=1; total=0; lines=""; state=""
while read -r sha ref; do
  [ -n "$sha" ] || continue
  br=${ref#refs/heads/}
  read -r psha pt <<<"$(awk -v b="$br" '$1==b{print $2, $3}' "$ST")"
  if [ "$sha" != "${psha:-}" ]; then pt=$now; changed=1; fi
  [ $((now - pt)) -lt $IDLE ] && idle_all=0
  base=$(git merge-base HEAD "origin/$br" 2>/dev/null) || continue
  subj=$(git log --format=%s "$base..origin/$br" 2>/dev/null | grep 'cloud$')
  n=$(sed -n 's/^申論參考架構 +\([0-9]*\) 題.*/\1/p' <<<"$subj" | paste -sd+ | bc 2>/dev/null)
  b=$(grep -c '^申論參考架構 +' <<<"$subj")
  total=$((total + ${n:-0}))
  lines+="• ${br#cloud/}：${b} 批、${n:-0} 題（最後更新 $(tpe "$pt")）"$'\n'
  state+="$br $sha $pt"$'\n'
done <<<"$heads"
printf '%s' "$state" > "$ST"
last=$(cat "$REP" 2>/dev/null || echo 0)
if [ "$changed" = 1 ] && [ $((now - last)) -ge 7200 ]; then
  tg "☁️ 申論參考架構［雲端］進度 $(tpe "$now")：三條累計 ${total} 題"$'\n'"${lines}"
  echo "$now" > "$REP"
fi
cur=$(awk '{print $2}' "$ST" | sort | tr '\n' ' ')
if [ "$idle_all" = 1 ] && [ "$cur" != "$(cat "$MERGED" 2>/dev/null)" ]; then
  echo "$cur" > "$MERGED"   # 不論成敗同一組 head 只處理一次，免得每 15 分洗頻
  out=$(python3 tools/essay-ref-merge.py 2>&1) || { tg "🔴 雲端參考架構合併失敗：$(tail -3 <<<"$out")"; exit 1; }
  if node test/test.js > "$HOME/.claude/essay-ref-cloud.test.log" 2>&1; then
    git push -q origin HEAD:main 2>/dev/null && pushed="已 push 上線" || pushed="push 失敗（本機批次收工時會一起推）"
    tg "✅ 雲端參考架構：這輪的 branch 都停了 45 分，已合併。$(tail -1 <<<"$out")，test 全過，${pushed}。"$'\n'"${lines}要不要跑下一輪看贈額餘額，等 Tony 決定。"
  else
    tg "🔴 雲端參考架構合併後 test.js 沒過，沒 push：$(tail -3 "$HOME/.claude/essay-ref-cloud.test.log" | tr '\n' ' ')"
  fi
fi
