#!/usr/bin/env bash
# essay-ref-batch.sh — 分批寫申論題「參考架構」（q.ref）。一批＝同一科最多 SIZE 題，一個全新 claude session。
#
# 用法：tools/essay-ref-batch.sh [每批題數，預設 12] [批數上限，0=全部]
# 流程：essay-ref.py targets → claude -p 寫 refs.json → essay-ref.py set --write → commit（只收申論檔）
# 紀錄：~/.claude/essay-ref.log（每批一行）　停止：touch ~/.claude/essay-ref.stop
# 鎖：寫檔包在 flock ~/.claude/essay.lock 裡；重跑 gen_essay.py 也要拿同一把鎖，
#     不然轉檔讀舊檔、這邊剛寫進去的參考架構會被洗掉。
set -u
ROOT="$HOME/TelegramClaude/kaoguhero"
CLAUDE="$HOME/bin/claude"            # 走 shim，不搶 kaohero 線的 Telegram poller（shared.md §12）
MODEL="${REF_MODEL:-claude-opus-5}"
SIZE="${1:-12}"; MAXB="${2:-0}"
LOG="$HOME/.claude/essay-ref.log"
STOP="$HOME/.claude/essay-ref.stop"
LOCK="$HOME/.claude/essay.lock"
T="${XDG_RUNTIME_DIR:-/tmp}/essay-ref.$$"; mkdir -p "$T"
trap 'rm -rf "$T"' EXIT
export PATH="$HOME/bin:$HOME/.npm-global/bin:/usr/local/bin:/usr/bin:/bin"
export DISABLE_AUTOUPDATER=1
unset TELEGRAM_STATE_DIR
cd "$ROOT" || exit 1
now() { TZ=Asia/Taipei date '+%m/%d %H:%M'; }
commit() {   # exp-worker 也在 commit，撞到 index.lock 就等一下再試
  for i in 1 2 3 4 5 6; do
    git add js/data/essay js/data/essays.js tools/essay-ref-skips.json tools/essay-ref-rejects.json >/dev/null 2>&1 &&
    git commit -q -m "$1" >/dev/null 2>&1 && return 0
    git diff --cached --quiet 2>/dev/null && git diff --quiet -- js/data/essay js/data/essays.js 2>/dev/null && return 0
    sleep 5
  done
  return 1
}

b=0
while :; do
  [ -e "$STOP" ] && { echo "$(now) 收到停止記號" | tee -a "$LOG"; rm -f "$STOP"; break; }
  python3 tools/essay-ref.py targets --limit "$SIZE" --out "$T/q.txt" > "$T/cnt.txt" 2>&1 || { cat "$T/cnt.txt" >> "$LOG"; break; }
  left=$(sed -n 's/.*全部 \([0-9]*\).*/\1/p' "$T/cnt.txt")
  rec=$(sed -n 's/.*年起 \([0-9]*\).*/\1/p' "$T/cnt.txt")
  grep -q '^0 題' "$T/cnt.txt" && { echo "$(now) 已無待寫的題" | tee -a "$LOG"; break; }
  subj=$(sed -n '1s/^科目：//p' "$T/q.txt")
  b=$((b+1)); t0=$(date +%s)
  rm -f "$T/refs.json"
  sed -e "s|__OUT__|$T/refs.json|g" tools/essay-ref-prompt.md \
    | sed -e "/__QUESTIONS__/{r $T/q.txt" -e 'd}' > "$T/prompt.md"
  timeout 2400 "$CLAUDE" -p --model "$MODEL" --allowedTools "Read,Write" --dangerously-skip-permissions \
    --no-session-persistence --disable-slash-commands --output-format json \
    < "$T/prompt.md" > "$T/out.json" 2>> "$T/err.txt"
  rc=$?
  if [ $rc -ne 0 ] || [ ! -s "$T/refs.json" ]; then
    echo "$(now) 第 $b 批失敗（rc=$rc）$(tail -c 300 "$T/out.json" "$T/err.txt" 2>/dev/null | tr '\n' ' ')" | tee -a "$LOG"; break
  fi
  got=$(node -e "console.log(JSON.parse(require('fs').readFileSync('$T/refs.json','utf8')).filter(r=>!r.skip).length)")
  if ! flock "$LOCK" python3 tools/essay-ref.py set "$T/refs.json" --write > "$T/set.txt" 2>&1; then
    echo "$(now) 第 $b 批格式退回：$(tail -4 "$T/set.txt" | tr '\n' ' ')" | tee -a "$LOG"; break
  fi
  grep -q '^退回' "$T/set.txt" && echo "$(now) 第 $b 批部分退回：$(grep '^  ' "$T/set.txt" | tr '\n' ' ')" >> "$LOG"
  got=$(sed -n 's/^寫入 \([0-9]*\) 題.*/\1/p' "$T/set.txt")
  commit "申論參考架構 +${got} 題（${subj}）" || echo "$(now) commit 失敗，檔案已寫入" >> "$LOG"
  echo "$(now) 第 $b 批：${subj} 寫 $got 題，剩 ${left:-?} 題（近年 ${rec:-?}），$(( $(date +%s) - t0 ))s" | tee -a "$LOG"
  # 一批寫 0 題＝這批模型全判 skip，已記進 essay-ref-skips.json，下一批會挑別的，不會空轉
  [ "$MAXB" -gt 0 ] && [ "$b" -ge "$MAXB" ] && break
done
git pull -q --rebase 2>/dev/null; git push -q 2>/dev/null || true
