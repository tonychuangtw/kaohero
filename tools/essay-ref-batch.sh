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
# REF_ENGINE=agy → ssh 到 runner 用 Gemini flash 寫（Google AI Pro 訂閱，不吃 Claude 額度）。
# 法律科目不給 flash 寫：agy 批次請搭 ESSAY_SCOPE=nolaw，claude 批次搭 ESSAY_SCOPE=law，兩支可同時跑（科目不重疊）
ENGINE="${REF_ENGINE:-claude}"
AGY_HOST="${REF_AGY_HOST:-tonychuangtw@192.168.1.173}"
AGY_MODEL="${REF_AGY_MODEL:-gemini-3.8-flash-high}"
SSHOPT=(-o ConnectTimeout=10 -o ServerAliveInterval=60 -o BatchMode=yes)
[ "$ENGINE" = agy ] && export ESSAY_NO_ARTICLE=1   # flash 不准寫條號，essay-ref.py set 會擋
SIZE="${1:-12}"; MAXB="${2:-0}"
LOG="$HOME/.claude/essay-ref${ESSAY_SCOPE:+-$ESSAY_SCOPE}.log"
STOP="$HOME/.claude/essay-ref${ESSAY_SCOPE:+-$ESSAY_SCOPE}.stop"
LOCK="$HOME/.claude/essay.lock"
T="${XDG_RUNTIME_DIR:-/tmp}/essay-ref.$$"; mkdir -p "$T"
AT="/tmp/essay-ref-agy.$$"   # runner 上的暫存目錄
trap 'rm -rf "$T"; [ "$ENGINE" = agy ] && ssh "${SSHOPT[@]}" "$AGY_HOST" "rm -rf $AT" >/dev/null 2>&1' EXIT
export PATH="$HOME/bin:$HOME/.npm-global/bin:/usr/local/bin:/usr/bin:/bin"
export DISABLE_AUTOUPDATER=1
unset TELEGRAM_STATE_DIR
cd "$ROOT" || exit 1
now() { TZ=Asia/Taipei date '+%m/%d %H:%M'; }
TG="$HOME/TelegramClaude/claude-shared/machines/claudebot500/tg-sessions/tg-send.sh"
tg() { "$TG" kaohero <<<"$1" >/dev/null 2>&1 || true; }   # 背景腳本沒有 TELEGRAM_STATE_DIR，一定要帶線名
REPORT=$((2*3600))   # 每 2 小時回報一次進度（shared.md §17）
MAXFAIL=3            # 連續失敗幾批才停（單次 timeout 常是 04:00 重啟或網路抖動）
commit() {   # exp-worker 也在 commit，撞到 index.lock 就等一下再試
  for i in 1 2 3 4 5 6; do
    git add js/data/essay js/data/essays.js tools/essay-ref-skips.json tools/essay-ref-rejects.json >/dev/null 2>&1 &&
    git commit -q -m "$1" >/dev/null 2>&1 && return 0
    git diff --cached --quiet 2>/dev/null && git diff --quiet -- js/data/essay js/data/essays.js 2>/dev/null && return 0
    sleep 5
  done
  return 1
}

b=0; fail=0; done_n=0; last_rep=$(date +%s)
while :; do
  [ -e "$STOP" ] && { echo "$(now) 收到停止記號" | tee -a "$LOG"; rm -f "$STOP"; break; }
  python3 tools/essay-ref.py targets --limit "$SIZE" --out "$T/q.txt" > "$T/cnt.txt" 2>&1 || { cat "$T/cnt.txt" >> "$LOG"; break; }
  left=$(sed -n 's/.*全部 \([0-9]*\).*/\1/p' "$T/cnt.txt")
  rec=$(sed -n 's/.*年起 \([0-9]*\).*/\1/p' "$T/cnt.txt")
  grep -q '^0 題' "$T/cnt.txt" && { echo "$(now) 已無待寫的題" | tee -a "$LOG"; tg "✅ 申論參考架構全部寫完（本次 $done_n 題）"; break; }
  subj=$(sed -n '1s/^科目：//p' "$T/q.txt")
  b=$((b+1)); t0=$(date +%s)
  rm -f "$T/refs.json"
  OUTP="$T/refs.json"; [ "$ENGINE" = agy ] && OUTP="$AT/refs.json"
  sed -e "s|__OUT__|$OUTP|g" tools/essay-ref-prompt.md \
    | sed -e "/__QUESTIONS__/{r $T/q.txt" -e 'd}' > "$T/prompt.md"
  [ "$ENGINE" = agy ] && sed -i 's|^- \*\*條號一定要有把握才寫\*\*.*|- **這一批完全不准寫條號**（「第幾條」一律不要出現，寫了整題會被退回）：只寫法規名稱與制度內容，例：「依土地登記規則」。|' "$T/prompt.md"
  if [ "$ENGINE" = agy ]; then
    # agy 的 -p 不吃 stdin，prompt 當參數傳；--print-timeout 預設 5 分鐘不夠
    ssh "${SSHOPT[@]}" "$AGY_HOST" "rm -rf $AT; mkdir -p $AT" >/dev/null 2>&1
    scp -q "${SSHOPT[@]}" "$T/prompt.md" "$AGY_HOST:$AT/prompt.md" 2>> "$T/err.txt"
    timeout 2700 ssh "${SSHOPT[@]}" "$AGY_HOST" \
      "cd $AT && timeout 2400 \$HOME/.local/bin/agy --model $AGY_MODEL --dangerously-skip-permissions \
       --disable-slash-commands --print-timeout 40m --output-format json -p \"\$(cat $AT/prompt.md)\" \
       > $AT/out.json 2> $AT/err.txt" >/dev/null 2>> "$T/err.txt"
    rc=$?
    scp -q "${SSHOPT[@]}" "$AGY_HOST:$AT/out.json" "$T/out.json" 2>/dev/null
    scp -q "${SSHOPT[@]}" "$AGY_HOST:$AT/refs.json" "$T/refs.json" 2>/dev/null
    ssh "${SSHOPT[@]}" "$AGY_HOST" "cat $AT/err.txt" >> "$T/err.txt" 2>/dev/null
  else
    timeout 2400 "$CLAUDE" -p --model "$MODEL" --allowedTools "Read,Write" --dangerously-skip-permissions \
      --no-session-persistence --disable-slash-commands --output-format json \
      < "$T/prompt.md" > "$T/out.json" 2>> "$T/err.txt"
    rc=$?
  fi
  if [ $rc -ne 0 ] || [ ! -s "$T/refs.json" ]; then
    fail=$((fail+1)); b=$((b-1))
    msg="第 $((b+1)) 批失敗（rc=$rc，連續 $fail 次）$(tail -c 300 "$T/out.json" "$T/err.txt" 2>/dev/null | tr '\n' ' ')"
    echo "$(now) $msg" | tee -a "$LOG"
    if [ $fail -ge $MAXFAIL ]; then
      tg "🔴 申論參考架構［${ENGINE}］批次停了：$msg。本次共寫 $done_n 題，剩 ${left:-?} 題（近年 ${rec:-?}）。可能是額度用完，重跑：bash tools/essay-ref-batch.sh 12 0"
      break
    fi
    rm -f "$T/err.txt"; sleep 180; continue
  fi
  fail=0
  got=$(node -e "console.log(JSON.parse(require('fs').readFileSync('$T/refs.json','utf8')).filter(r=>!r.skip).length)")
  if ! flock "$LOCK" python3 tools/essay-ref.py set "$T/refs.json" --write > "$T/set.txt" 2>&1; then
    echo "$(now) 第 $b 批格式退回：$(tail -4 "$T/set.txt" | tr '\n' ' ')" | tee -a "$LOG"
    tg "🔴 申論參考架構［${ENGINE}］批次停了：第 $b 批格式退回（見 ~/.claude/essay-ref.log）。本次共寫 $done_n 題"; break
  fi
  grep -q '^退回' "$T/set.txt" && echo "$(now) 第 $b 批部分退回：$(grep '^  ' "$T/set.txt" | tr '\n' ' ')" >> "$LOG"
  got=$(sed -n 's/^寫入 \([0-9]*\) 題.*/\1/p' "$T/set.txt")
  commit "申論參考架構 +${got} 題（${subj}）${ENGINE/claude/}" || echo "$(now) commit 失敗，檔案已寫入" >> "$LOG"
  echo "$(now) 第 $b 批：${subj} 寫 $got 題，剩 ${left:-?} 題（近年 ${rec:-?}），$(( $(date +%s) - t0 ))s" | tee -a "$LOG"
  done_n=$((done_n+${got:-0}))
  if [ $(( $(date +%s) - last_rep )) -ge $REPORT ]; then
    tg "📝 申論參考架構［${ENGINE}］進度 $(now)：本次已寫 $done_n 題（$b 批），剛完成「${subj}」；剩 ${left:-?} 題，其中 110 年起 ${rec:-?} 題"
    last_rep=$(date +%s)
  fi
  # 一批寫 0 題＝這批模型全判 skip，已記進 essay-ref-skips.json，下一批會挑別的，不會空轉
  [ "$MAXB" -gt 0 ] && [ "$b" -ge "$MAXB" ] && break
done
git pull -q --rebase 2>/dev/null; git push -q 2>/dev/null || true
