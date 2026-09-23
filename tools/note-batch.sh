#!/usr/bin/env bash
# note-batch.sh — 分批寫「勘誤提醒」（q.note）：官方答案與現行法衝突、或修法後答案不唯一的題。
#
# 用法：tools/note-batch.sh [每批題數，預設 25] [批數上限，0=全部]
# 流程：note-targets.js 倒題目 → claude -p 寫 notes.json → set-note.js 驗格式並寫進題庫
#       → build-index.js → test.js → commit。每批一個全新 session（同 exp-worker 的理由：不重送前面幾批）。
# 紀錄：~/.claude/note-batch.log（每批一行）
# 停止：touch ~/.claude/note-batch.stop
set -u
ROOT="$HOME/TelegramClaude/kaoguhero"
CLAUDE="$HOME/bin/claude"            # 走 shim，不搶 kaohero 線的 Telegram poller（shared.md §12）
MODEL="${NOTE_MODEL:-claude-opus-5}"
SIZE="${1:-25}"; MAXB="${2:-0}"
LOG="$HOME/.claude/note-batch.log"
STOP="$HOME/.claude/note-batch.stop"
T="${XDG_RUNTIME_DIR:-/tmp}/note-batch.$$"; mkdir -p "$T"
trap 'rm -rf "$T"' EXIT
export PATH="$HOME/bin:$HOME/.npm-global/bin:/usr/local/bin:/usr/bin:/bin"
export DISABLE_AUTOUPDATER=1
unset TELEGRAM_STATE_DIR
cd "$ROOT" || exit 1
now() { TZ=Asia/Taipei date '+%m/%d %H:%M'; }

b=0
while :; do
  [ -e "$STOP" ] && { echo "$(now) 收到停止記號" | tee -a "$LOG"; rm -f "$STOP"; break; }
  # 每一輪都重新挑（寫進去的題會自動從候選消失，所以固定取最前面 SIZE 題）
  node tools/note-targets.js --limit "$SIZE" --out "$T/q.txt" > "$T/cnt.txt" 2>&1 || break
  left=$(sed -n 's/.*全部 \([0-9]*\)).*/\1/p' "$T/cnt.txt")
  grep -q '^0 題' "$T/cnt.txt" && { echo "$(now) 已無待寫的勘誤題" | tee -a "$LOG"; break; }
  b=$((b+1)); t0=$(date +%s)
  rm -f "$T/notes.json"
  sed -e "s|__OUT__|$T/notes.json|g" tools/note-prompt.md \
    | sed -e "/__QUESTIONS__/{r $T/q.txt" -e 'd}' > "$T/prompt.md"
  timeout 2400 "$CLAUDE" -p --model "$MODEL" --allowedTools "Read,Write" --dangerously-skip-permissions \
    --no-session-persistence --disable-slash-commands --output-format json \
    < "$T/prompt.md" > "$T/out.json" 2>> "$T/err.txt"
  rc=$?
  if [ $rc -ne 0 ] || [ ! -s "$T/notes.json" ]; then
    echo "$(now) 第 $b 批失敗（rc=$rc）$(tail -c 200 "$T/err.txt" 2>/dev/null)" | tee -a "$LOG"; break
  fi
  if ! node tools/set-note.js "$T/notes.json" --write >> "$T/set.txt" 2>&1; then
    echo "$(now) 第 $b 批格式退回：$(tail -3 "$T/set.txt")" | tee -a "$LOG"; break
  fi
  got=$(node -e "console.log(JSON.parse(require('fs').readFileSync('$T/notes.json','utf8')).length)")
  node tools/build-index.js --write > /dev/null && node test/test.js > "$T/test.txt" 2>&1 || {
    echo "$(now) 第 $b 批 test 沒過，停手：$(tail -3 "$T/test.txt")" | tee -a "$LOG"; break; }
  git add js/data/exam js/data/exams.js tools/exp-skips.json >/dev/null 2>&1
  git commit -q -m "勘誤提醒 +${got} 題（官方答案與現行法規衝突的題）" >/dev/null 2>&1
  echo "$(now) 第 $b 批：寫 $got 題，剩 ${left:-?} 題候選，$(( $(date +%s) - t0 ))s" | tee -a "$LOG"
  [ "$MAXB" -gt 0 ] && [ "$b" -ge "$MAXB" ] && break
done
git push -q 2>/dev/null || true
