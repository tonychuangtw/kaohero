#!/usr/bin/env bash
# daily-release.sh — 每日小更新（2026-11-05 Tony：「想一個可以每天更新一點的…每天更新一點點這樣保持網站有更新」）
#
# 每天台北 07:00 由 daily-release.timer 跑，純腳本、不花 AI 額度：
#   1) 待上架區 tools/release-queue.json 的下一組詳解寫完了 → 放出來：build-index、test、build-pages（全量，日期沒變的頁不重寫）、
#      commit、push、部署、IndexNow 送新網址，在本線頻道回報
#      還沒寫完 → 今天不放，回報差幾題；queue 空了 → 回報一次「待上架區空了，該備下一種考試」
#   2) moex-watch.py：考選部出了本站已收考試的新考期 → 通知本線去轉檔
# 用法：bash tools/daily-release.sh [--dry]      紀錄 ~/.claude/daily-release.log
set -uo pipefail
cd "$(dirname "$0")/.."
LOG="$HOME/.claude/daily-release.log"
TG="$HOME/TelegramClaude/claude-shared/machines/claudebot500/tg-sessions/tg-send.sh"
DRY=0; [ "${1:-}" = "--dry" ] && DRY=1
log() { echo "$(TZ=Asia/Taipei date '+%m/%d %H:%M') $*" >> "$LOG"; }
say() { log "通知：$*"; [ $DRY = 1 ] && { echo "$*"; return; }; bash "$TG" kaohero <<< "$*" >/dev/null 2>&1 || log "tg-send 失敗"; }

exec 9> "$HOME/.cache/kaohero-release.lock"
flock -n 9 || { log "上一輪還在跑，略過"; exit 0; }

# ---- 1) 放下一組 ----
ST=$(node tools/release-next.js)
QUEUED=$(node -pe "JSON.parse(process.argv[1]).queued" "$ST")
if [ "$QUEUED" = 0 ]; then
  FLAG="$HOME/.cache/kaohero-release-empty"
  if [ ! -f "$FLAG" ]; then
    say "📦 每日小更新：待上架區空了，今天沒有新卷可放。要備下一種考試（順序見 https://tony-plans.pages.dev/kaohero/daily-update ）。"
    [ $DRY = 1 ] || touch "$FLAG"
  fi
  log "queue 空"
else
  rm -f "$HOME/.cache/kaohero-release-empty"
  NAME=$(node -pe "JSON.parse(process.argv[1]).name" "$ST")
  READY=$(node -pe "JSON.parse(process.argv[1]).ready" "$ST")
  if [ "$READY" != true ]; then
    LEFT=$(node -pe "JSON.parse(process.argv[1]).left" "$ST")
    log "$NAME 還差 $LEFT 題詳解，今天不放"
    say "⏸ 每日小更新：今天沒放。下一組「$NAME」還有 $LEFT 題詳解沒寫完，寫完的隔天早上 7 點自動上架。"
  elif [ $DRY = 1 ]; then
    echo "（--dry）會放：$NAME"
  else
    cp tools/release-queue.json "$HOME/.cache/release-queue.bak.json"
    OUT=$(node tools/release-next.js --pop)
    PIDS=$(node -e "console.log(JSON.parse(process.argv[1]).pids.join(' '))" "$OUT")
    node tools/build-index.js --write >> "$LOG" 2>&1
    if ! node test/test.js > /tmp/kh-release-test.txt 2>&1; then
      cp "$HOME/.cache/release-queue.bak.json" tools/release-queue.json
      node tools/build-index.js --write >> "$LOG" 2>&1
      log "測試失敗，已還原：$(tail -3 /tmp/kh-release-test.txt | tr '\n' ' ')"
      say "🔴 每日小更新：「$NAME」上架前測試沒過，已退回待上架區，今天不放。錯誤：$(tail -3 /tmp/kh-release-test.txt)"
      exit 1
    fi
    node tools/build-pages.js --write >> "$LOG" 2>&1
    N=$(echo $PIDS | wc -w)
    NQ=$(node -e "let n=0;global.window={};for(const p of process.argv.slice(1)){require('./js/data/exam/'+p+'.js');n+=window.APP_EXAM_PAPERS[p].qs.length}console.log(n)" $PIDS)
    for i in 1 2 3; do
      git add tools/release-queue.json js/data/exams.js exam mock sitemap.xml \
        && git commit -q -m "每日小更新：上架 $NAME（$N 卷、$NQ 題）" && break
      sleep 20
    done
    git push -q >> "$LOG" 2>&1 || log "push 失敗（本機已 commit，cf-deploy 照樣部署工作目錄）"
    CF_WAIT=1 bash tools/cf-deploy.sh >> "$LOG" 2>&1 || log "部署失敗，見 ~/.claude/cf-deploy.log"
    PATHS=$(for p in $PIDS; do echo -n " /exam/$p/"; done)
    node tools/indexnow-ping.mjs / /exam/ /mock/ $PATHS >> "$LOG" 2>&1
    REM=$(node -pe "JSON.parse(require('fs').readFileSync('tools/release-queue.json','utf8')).queue.length")
    log "上架 $NAME：$N 卷 $NQ 題；待上架還有 $REM 組"
    say "🆕 每日小更新：上架「$NAME」$N 卷、$NQ 題（含詳解）。待上架區還有 $REM 組。https://kaohero.com/exam/"
  fi
fi

# ---- 2) 新考期 ----
NEWS=$(timeout 300 python3 tools/moex-watch.py $([ $DRY = 1 ] && echo --all) 2>> "$LOG")
if [ -n "$NEWS" ]; then
  log "考選部新考期：$(echo "$NEWS" | cut -f1 | tr '\n' ' ')"
  say "📥 考選部有新考期本站還沒收，要轉檔上架：
$(echo "$NEWS" | sed 's/\t/ /')"
fi
exit 0
