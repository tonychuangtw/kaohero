#!/usr/bin/env bash
# exp-worker.sh — 逐卷寫詳解的批次 worker：每一卷開一個全新的 claude -p session，只帶這一卷。
#
# 為什麼（2026-09-14 Tony 定案「1 改每卷新 session 先做」）：
#   之前逐卷詳解全在 kaohero 那條 Telegram 對話裡做，做到第 30 卷時每一步都把前面 29 卷的題目、
#   詳解、測試輸出一起重送 —— 本週 5,492 次呼叫、每次 context 535k，83% 是在重送舊東西，
#   一條線吃掉全部額度 84%。改成每卷新 session 後每步 context 約 40–60k。
#
# 模型只做兩件事：讀 prompt 裡的題目（必要時 Read 圖檔）、Write patch.json 與 skip.json。
# 其餘全是這支腳本做：選卷、出題、驗格式、寫入題庫、build-index、test、build-pages、commit、push、
# 進度回報、記錄跳過的題。模型不跑 Bash，也不需要知道 repo 長什麼樣。
#
# 引擎（2026-09-16 Tony 定案，Claude 週限撞 83%）：
#   EXP_ENGINE=claude（預設）→ 本機 claude -p
#   EXP_ENGINE=agy           → ssh 到 runner 跑 agy（Antigravity CLI，Google AI Pro 訂閱，$0 API、不吃 Claude 額度）
#   實測同一卷 pol-102-1-b002：flash 190s／pro 233s／agy 內的 opus-4-6 282s，三家格式都一次過、
#   跳過判斷一致；但 opus 一卷就吃掉 agy 內 Claude 週限 5%（一週只夠 20 卷），gemini 兩卷半週限沒動 → 用 gemini。
#   ⛔ 台北週五 04:00 Claude 週限重置後要改回 claude（Tony 指定），見 tools/exp-engine.sh。
#
# 用法：tools/exp-worker.sh [--match <pid 正規式>] [--limit N] [--once]
#   預設 EXP_MATCH（環境變數）或 '^chu-10[2-5]-'；--once 只做一卷（測試用）。
# 控制：
#   touch ~/.claude/exp-worker.stop        做完手上這卷就停（unit 也可直接 systemctl --user stop）
#   ~/.claude/channels/telegram-kaohero/paused-until  session-limit 留的記號，時間未到就等
#   ~/.claude/session-limit.state          mode=pause|hit 時等 5 分鐘再看
# 紀錄：~/.claude/exp-worker.log（每卷一行：pid、題數、跳過、tokens、費用、秒數、結果）
# 回報：每做完一個年份、或距上次回報滿 2 小時，用 tg-send.sh kaohero 發一則（shared.md §17 批次回報規則）
set -u
ROOT="$HOME/TelegramClaude/kaoguhero"
CLAUDE="$HOME/bin/claude"            # 走 shim：TELEGRAM_STATE_DIR 一定被清成誘餌，不會搶 kaohero 線的 bot
MODEL="${EXP_MODEL:-claude-opus-5}"
ENGINE="${EXP_ENGINE:-claude}"          # claude | agy
AGY_HOST="${EXP_AGY_HOST:-tonychuangtw@192.168.1.173}"
AGY_ROOT="${EXP_AGY_ROOT:-/home/tonychuangtw/TelegramClaude/kaoguhero}"
AGY_MODEL="${EXP_AGY_MODEL:-gemini-3.8-flash-high}"
AGY_T="/tmp/exp-agy"                    # runner 上的暫存目錄（prompt 進、兩個 json 出）
MATCH="${EXP_MATCH:-^chu-10[2-5]-}"
LIMIT=0; ONCE=0
while [ $# -gt 0 ]; do case "$1" in
  --match) MATCH="$2"; shift 2 ;; --limit) LIMIT="$2"; shift 2 ;; --once) ONCE=1; shift ;;
  *) echo "用法見檔頭" >&2; exit 2 ;; esac; done
LOG="$HOME/.claude/exp-worker.log"
STOP="$HOME/.claude/exp-worker.stop"
LOCK="$HOME/.claude/exp-worker.lock"
TGSEND="$HOME/TelegramClaude/claude-shared/machines/claudebot500/tg-sessions/tg-send.sh"
PAUSED="$HOME/.claude/channels/telegram-kaohero/paused-until"
LSTATE="$HOME/.claude/session-limit.state"
T="${XDG_RUNTIME_DIR:-/tmp}/exp-worker.$$"; mkdir -p "$T"
trap 'rm -rf "$T"; rm -f "$LOCK"' EXIT
export PATH="$HOME/bin:$HOME/.npm-global/bin:/usr/local/bin:/usr/bin:/bin"
export DISABLE_AUTOUPDATER=1
unset TELEGRAM_STATE_DIR

now() { TZ=Asia/Taipei date '+%m/%d %H:%M'; }
log() { printf '%s %s\n' "$(now)" "$1" >> "$LOG"; }
report() { printf '%s\n' "$1" | "$TGSEND" kaohero >/dev/null 2>&1 || true; }

# 一次只准一個 worker：兩個一起跑會同時改題庫、push 互撞
if [ -f "$LOCK" ] && kill -0 "$(cat "$LOCK" 2>/dev/null)" 2>/dev/null; then echo "已有 worker 在跑（pid $(cat "$LOCK")）"; exit 1; fi
echo $$ > "$LOCK"
rm -f "$STOP"
cd "$ROOT" || exit 1

wait_quota() {   # 額度守門：session-limit 暫停中或 paused-until 未到就等，不要在撞頂時空轉燒重試
  while :; do
    local until_ts; until_ts=$(cat "$PAUSED" 2>/dev/null || echo 0)
    if [ "${until_ts:-0}" -gt "$(date +%s)" ] 2>/dev/null; then log "wait paused-until $(TZ=Asia/Taipei date -d "@$until_ts" '+%H:%M')"; sleep 300; continue; fi
    if grep -qE '^mode=(pause|hit)' "$LSTATE" 2>/dev/null; then log "wait session-limit"; sleep 300; continue; fi
    break
  done
}

# prompt 裡的路徑要填模型看得到的那一台：claude 跑本機，agy 跑 runner
if [ "$ENGINE" = agy ]; then P_ROOT="$AGY_ROOT"; P_T="$AGY_T"; ENGINE_NAME="agy/$AGY_MODEL"
else P_ROOT="$ROOT"; P_T="$T"; ENGINE_NAME="claude/$MODEL"; fi
SSHOPT=(-o ConnectTimeout=10 -o ServerAliveInterval=60 -o BatchMode=yes)

run_model() {   # $1=prompt 檔（本機）  $2=out.json 落點（本機）；patch/skip 一律回到 $T
  local pf="$1" of="$2" rc=0
  if [ "$ENGINE" = agy ]; then
    ssh "${SSHOPT[@]}" "$AGY_HOST" "mkdir -p $AGY_T && rm -f $AGY_T/patch.json $AGY_T/skip.json $AGY_T/out.json $AGY_T/err.txt" >/dev/null 2>&1
    scp -q "${SSHOPT[@]}" "$pf" "$AGY_HOST:$AGY_T/prompt.md" >/dev/null 2>&1 || { echo "scp prompt 失敗" >> "$T/err.txt"; return 1; }
    # -p 不吃 stdin，prompt 要當參數傳；--print-timeout 預設只有 5 分鐘，50 題卷不夠
    timeout 2700 ssh "${SSHOPT[@]}" "$AGY_HOST" \
      "cd $AGY_ROOT && timeout 2400 \$HOME/.local/bin/agy --model $AGY_MODEL --dangerously-skip-permissions \
       --disable-slash-commands --print-timeout 40m --output-format json -p \"\$(cat $AGY_T/prompt.md)\" \
       > $AGY_T/out.json 2> $AGY_T/err.txt" >/dev/null 2>>"$T/err.txt"
    rc=$?
    scp -q "${SSHOPT[@]}" "$AGY_HOST:$AGY_T/out.json" "$of" >/dev/null 2>&1
    scp -q "${SSHOPT[@]}" "$AGY_HOST:$AGY_T/patch.json" "$T/patch.json" >/dev/null 2>&1
    scp -q "${SSHOPT[@]}" "$AGY_HOST:$AGY_T/skip.json" "$T/skip.json" >/dev/null 2>&1
    ssh "${SSHOPT[@]}" "$AGY_HOST" "cat $AGY_T/err.txt" >> "$T/err.txt" 2>/dev/null
    return $rc
  fi
  timeout 2400 "$CLAUDE" -p --model "$MODEL" --allowedTools "Read,Write" --dangerously-skip-permissions \
    --no-session-persistence --disable-slash-commands --output-format json < "$pf" > "$of" 2>> "$T/err.txt"
}

done_papers=0; done_q=0; done_skip=0; fails=0; consec_fail=0
last_report=$(date +%s); last_year=""; year_papers=0; year_q=0; year_skip=0
report_progress() {   # $1 = 標題
  local left; left=$(node tools/exp-next.js --match "$MATCH" 2>&1 >/dev/null | tail -1)
  report "📝 $(now) $1
本輪累計：${done_papers} 卷、${done_q} 題已寫、${done_skip} 題跳過、${fails} 卷失敗
${left}（範圍 ${MATCH}）"
  last_report=$(date +%s)
}

while :; do
  [ -f "$STOP" ] && { log "stop 記號，收工"; break; }
  wait_quota
  line=$(node tools/exp-next.js --match "$MATCH" --limit 1 2>/dev/null | head -1)
  [ -n "$line" ] || { log "範圍 $MATCH 已無待寫卷"; report_progress "初等考試詳解批次完成（範圍 ${MATCH} 已無待寫卷）"; break; }
  pid=${line%% *}; rest=${line#* }; n_todo=${rest%% *}; title=${rest#* }
  year=$(printf '%s' "$pid" | cut -d- -f2)
  # 年份換了 → 回報上一個年份（§17：每完成一個自然段落回報一次）
  if [ -n "$last_year" ] && [ "$year" != "$last_year" ]; then
    report_progress "${last_year} 年做完：${year_papers} 卷、${year_q} 題已寫、${year_skip} 題跳過；接著做 ${year} 年"
    year_papers=0; year_q=0; year_skip=0
  fi
  last_year="$year"
  rm -f "$T"/patch.json "$T"/skip.json "$T"/out.json; : > "$T/err.txt"
  # agy 是在 runner 上讀題庫的圖檔，clone 要先跟上（題庫本體沒圖就不影響，純保險）
  [ "$ENGINE" = agy ] && ssh "${SSHOPT[@]}" "$AGY_HOST" "git -C $AGY_ROOT pull -q --rebase" >/dev/null 2>&1
  EXP_FIG_ROOT="$P_ROOT" node tools/exp-dump.js "$pid" > "$T/q.txt" 2>/dev/null
  sed -e "s|__ROOT__|$P_ROOT|g" -e "s|__PID__|$pid|g" -e "s|__T__|$P_T|g" tools/exp-prompt.md | sed -e "/__QUESTIONS__/{r $T/q.txt" -e 'd}' > "$T/prompt.md"
  t0=$(date +%s)
  run_model "$T/prompt.md" "$T/out.json"
  rc=$?; secs=$(( $(date +%s) - t0 ))
  usage=$(python3 - "$T/out.json" <<'PY' 2>/dev/null
import json,sys
try: d=json.load(open(sys.argv[1]))
except Exception: print("in=? out=? cost=?"); sys.exit()
u=d.get("usage",{}) or {}
i=(u.get("input_tokens",0)+u.get("cache_read_input_tokens",0)
   +u.get("cache_creation_input_tokens",0)+u.get("cache_read_tokens",0))
c=d.get("total_cost_usd")                      # agy（訂閱制）不回這欄
cost=f" cost=${c:.2f}" if isinstance(c,(int,float)) else ""
print(f"in={i//1000}k out={u.get('output_tokens',0)//1000}k{cost} turns={d.get('num_turns','?')}")
PY
)
  # 撞額度／登入問題：不算失敗，等 30 分再試同一卷
  if grep -qiE 'usage limit|rate limit|overloaded|login|credit balance|authentication|resource_exhausted|quota|permission denied|connection (refused|closed)' "$T/err.txt" "$T/out.json" 2>/dev/null && [ ! -s "$T/patch.json" ]; then
    log "$pid 額度或連線問題（rc=$rc）：$(tr '\n' ' ' < "$T/err.txt" | cut -c1-160)，等 30 分"
    consec_fail=$((consec_fail+1)); [ "$consec_fail" -ge 6 ] && { report "⚠️ $(now) 詳解 worker 連續 6 次撞額度／連線問題，先停。查 ~/.claude/exp-worker.log"; break; }
    sleep 1800; continue
  fi
  if [ ! -s "$T/patch.json" ] && [ ! -s "$T/skip.json" ]; then
    log "$pid 失敗：模型沒寫 patch/skip（rc=$rc $usage ${secs}s）$(tail -c 200 "$T/err.txt" | tr '\n' ' ')"
    fails=$((fails+1)); consec_fail=$((consec_fail+1))
    printf '%s\n' "$pid" >> "$HOME/.claude/exp-worker.failed"
    [ "$consec_fail" -ge 3 ] && { report "⚠️ $(now) 詳解 worker 連續 3 卷失敗（最後 $pid），先停。查 ~/.claude/exp-worker.log"; break; }
    [ "$ONCE" = 1 ] && break; continue
  fi
  [ -s "$T/patch.json" ] || echo '[]' > "$T/patch.json"
  [ -s "$T/skip.json" ] || echo '[]' > "$T/skip.json"
  # 驗格式（set-exp 逐題擋）。有錯就把錯誤送回給模型修一次；再錯就這卷記失敗
  if ! node tools/set-exp.js "$T/patch.json" > "$T/chk.txt" 2>&1; then
    log "$pid 格式退回，重試一次：$(grep -c '' "$T/chk.txt") 行"
    { cat "$T/prompt.md"; printf '\n\n=== 上一次的 patch.json 被退回，錯誤如下，請修正後重新寫 patch.json 與 skip.json ===\n'; cat "$T/chk.txt"; printf '\n=== 上一次的 patch.json ===\n'; cat "$T/patch.json"; } > "$T/prompt2.md"
    run_model "$T/prompt2.md" "$T/out2.json"
    if ! node tools/set-exp.js "$T/patch.json" > "$T/chk.txt" 2>&1; then
      log "$pid 失敗：格式兩次不過 $(head -3 "$T/chk.txt" | tr '\n' ' ')"
      fails=$((fails+1)); consec_fail=$((consec_fail+1)); printf '%s\n' "$pid" >> "$HOME/.claude/exp-worker.failed"
      [ "$consec_fail" -ge 3 ] && { report "⚠️ $(now) 詳解 worker 連續 3 卷失敗（最後 $pid），先停"; break; }
      [ "$ONCE" = 1 ] && break; continue
    fi
  fi
  n_written=$(python3 -c "import json,sys;print(len(json.load(open(sys.argv[1]))))" "$T/patch.json" 2>/dev/null || echo 0)
  n_skip=$(node tools/exp-skip-add.js "$pid" "$T/skip.json" 2>/dev/null || echo 0)
  if [ "$n_written" -gt 0 ]; then
    node tools/set-exp.js "$T/patch.json" --write > /dev/null 2>&1
    node tools/build-index.js --write > /dev/null 2>&1
    if ! node test/test.js > "$T/test.txt" 2>&1; then
      log "$pid 失敗：test.js 不過，還原 $(tail -2 "$T/test.txt" | tr '\n' ' ')"
      git checkout -- js/data/exam/"$pid".js js/data/exams.js 2>/dev/null
      fails=$((fails+1)); consec_fail=$((consec_fail+1)); printf '%s\n' "$pid" >> "$HOME/.claude/exp-worker.failed"
      [ "$consec_fail" -ge 3 ] && { report "⚠️ $(now) 詳解 worker 連續 3 卷 test 不過（最後 $pid），先停"; break; }
      [ "$ONCE" = 1 ] && break; continue
    fi
    node tools/build-pages.js --only "$pid" --write > /dev/null 2>&1
  fi
  # 進度區塊寫進 PROGRESS.md（喚醒腳本與接手的人只看這個檔；§17）
  skipreasons=$(python3 -c "import json,sys;print('；'.join(f\"#{s['n']} {s['reason']}\" for s in json.load(open(sys.argv[1]))[:12]))" "$T/skip.json" 2>/dev/null)
  python3 - "$ROOT/PROGRESS.md" "$pid" "$title" "$n_written" "$n_skip" "$(now)" "$MATCH" "$ENGINE_NAME" <<'PY'
import sys,re
f,pid,title,w,s,ts,match,engine=sys.argv[1:]
txt=open(f,encoding='utf-8').read()
block=f"<!-- exp-worker:start -->\n（自動更新，勿手改）詳解批次由 tools/exp-worker.sh 逐卷開新 session 執行（範圍 {match}，引擎 {engine}）。最後一卷：{pid} {title}，寫 {w} 題、跳過 {s} 題，{ts} 台北。跳過的題記在 tools/exp-skips.json；失敗的卷在 ~/.claude/exp-worker.failed；每卷紀錄 ~/.claude/exp-worker.log。\n<!-- exp-worker:end -->"
if '<!-- exp-worker:start -->' in txt:
    txt=re.sub(r'<!-- exp-worker:start -->.*?<!-- exp-worker:end -->',lambda m:block,txt,flags=re.S)
else:
    txt=txt.replace('\n## ',f"\n{block}\n\n## ",1)
open(f,'w',encoding='utf-8').write(txt)
PY
  git add js/data/exam/"$pid".js js/data/exams.js exam/"$pid" sitemap.xml tools/exp-skips.json PROGRESS.md 2>/dev/null
  git commit -q -m "詳解：${title} ${n_written} 題$( [ "$n_skip" -gt 0 ] && printf '（跳過 %s 題：%s）' "$n_skip" "$skipreasons")

worker: $usage ${secs}s engine=$ENGINE_NAME" 2>/dev/null
  for i in 1 2 3; do git push -q 2>/dev/null && break; git pull --rebase -q 2>/dev/null; sleep 5; done
  log "$pid 寫 $n_written／待 $n_todo 跳 $n_skip $usage ${secs}s"
  done_papers=$((done_papers+1)); done_q=$((done_q+n_written)); done_skip=$((done_skip+n_skip)); consec_fail=0
  year_papers=$((year_papers+1)); year_q=$((year_q+n_written)); year_skip=$((year_skip+n_skip))
  [ $(( $(date +%s) - last_report )) -ge 7200 ] && report_progress "進度（${year} 年進行中，剛做完 ${pid}）"
  [ "$ONCE" = 1 ] && break
  [ "$LIMIT" -gt 0 ] && [ "$done_papers" -ge "$LIMIT" ] && break
done
log "收工：${done_papers} 卷、${done_q} 題、跳 ${done_skip}、失敗 ${fails}"
