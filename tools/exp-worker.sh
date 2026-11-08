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
# 啟動瘦身（2026-11-06 主線查帳：每卷 US$0.77–0.95，其中約 US$0.35 是每卷重新載入規則檔寫進快取）：
#   --setting-sources ""   不載 user／project 設定 → 不載 ~/.claude/CLAUDE.md（shared.md）、本 repo CLAUDE.md、MEMORY.md。
#                          系統提示 65.7k → 22.4k token（Haiku 實測）；換到空目錄跑只降到 44.5k（user 層躲不掉），所以用這個。
#                          格式規則全在 exp-prompt.md，模型用不到那兩份規則。key 走環境變數，不受影響。
#   --exclude-dynamic-system-prompt-sections   cwd／git status 移出系統提示，靜態前綴（約 17k）跨卷讀快取
#   --max-turns 1（有圖的卷 2）  寫完兩個檔就停，省掉「把剛寫的 patch 再寫進快取＋回一句話」那一輪（約 US$0.11）。
#                          會回 rc=1、subtype=error_max_turns，屬正常；檔有寫就照常處理。
#                          同一卷連續第二次（上次沒寫完的題）不加上限，免得模型分兩則寫檔時一直漏 skip.json。
#   試寫 soc-102-1-s002／s001（40 題卷）：US$0.41／0.41，同兩卷舊設定 US$0.92／0.91，格式 36/36、39/39 一次過，品質與舊卷相當。
#   剩下的錢幾乎都是輸出（約 13–15k token 含思考 2–5k ≈ US$0.3），再省就要動品質或改直接打 API。
#
# 引擎（2026-09-16 Tony 定案，Claude 週限撞 83%）：
#   EXP_ENGINE=claude（預設）→ 自動三段（2026-11-08 shared.md §11「全部都要接上」，主線派工 1108-1034-25）：
#       ① Claude API 贈額：claude-credit.sh 帶 CLAUDE_CREDIT=only（贈額用完／暫停回 3，或剛撞到用完時立起旗標）
#       ② OpenAI API 贈額：同一卷改跑 tools/exp-openai.js（gpt-6-astra flex，圖片題帶 --image）
#       ③ 訂閱：②回 10（贈額暫停／31 天上限）或沒寫出東西才走，不帶 only 的 claude-credit.sh，先過 wait_quota
#     起因：11/06 舊版只走 claude-credit.sh 的自動模式，Claude 贈額用完直接掉訂閱（當天 235 次吃完贈額、110 次掉訂閱）。
#     每卷都從①開始試：①在旗標有效時（6 小時）是立刻回 3、不打 API，所以不用另記狀態。路線換了會在本線頻道講一次。
#     EXP_AUTO_OA=0 跳過②（①→③）。DEFER-OA 的題（OpenAI 沒回來）照舊記進 exp-skips.json，之後用 exp-skip-drop 放回。
#     試跑：tools/exp-worker.sh --pid <卷> --redo 1,2 --dry（不寫題庫、不 commit、不通知；結果在 ~/.cache/exp-dry/）
#       模擬失敗：EXP_CLAUDE_BIN／EXP_OA_BIN 換成假的、EXP_CREDIT_FLAG 換假旗標路徑（tools/exp-route-test.sh 有範例）
#   EXP_ENGINE=agy           → ssh 到 runner 跑 agy（Antigravity CLI，Google AI Pro 訂閱，$0 API、不吃 Claude 額度）
#   EXP_ENGINE=deepseek      → tools/exp-deepseek.js（ssh 到 runner 打 DeepSeek API，預付按量、極便宜）
#   EXP_ENGINE=openai        → tools/exp-openai.js（經 openai-credit.py 吃 OpenAI API 贈額；EXP_OA_MODEL 預設 gpt-6-astra＋flex）
#                              贈額暫停（rc=10）就整個 worker 停下通知，不重試；要接續由人切回 claude
#     2026-09-18 Tony 定案接成第三個引擎。一卷 80 題 29 秒、費用量不出來（餘額兩位數沒動）；
#     缺點是讀不了圖 —— 有 fig 的題會被標成 DEFER-FIG 延後，最後用 claude 補：
#       node tools/exp-skip-drop.js --reason-match '^DEFER' --match '^tou-' --write
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
CLAUDE="${EXP_CLAUDE_BIN:-$HOME/TelegramClaude/claude-shared/tools/claude-credit.sh}"   # Max 每月 API 贈額／訂閱都經它；內部仍走 ~/bin/claude shim，不搶 kaohero 線的 bot
OA_BIN="${EXP_OA_BIN:-$HOME/TelegramClaude/kaoguhero/tools/exp-openai.js}"
CREDIT_FLAG="${EXP_CREDIT_FLAG:-$HOME/.config/anthropic-credits/exhausted}"   # claude-credit.sh 的停用旗標（只看 mtime，不讀 key）
AUTO_OA="${EXP_AUTO_OA:-1}"
export CLAUDE_CREDIT_TAG=kaohero-exp-worker
MODEL="${EXP_MODEL:-claude-opus-5-5}"
ENGINE="${EXP_ENGINE:-claude}"          # claude | agy | deepseek | openai
AGY_HOST="${EXP_AGY_HOST:-tonychuangtw@192.168.1.173}"
AGY_ROOT="${EXP_AGY_ROOT:-/home/tonychuangtw/TelegramClaude/kaoguhero}"
AGY_MODEL="${EXP_AGY_MODEL:-gemini-3.8-flash-high}"
SSHOPT=(-o ConnectTimeout=10 -o ServerAliveInterval=60 -o BatchMode=yes)
AGY_T="/tmp/exp-agy.$$"                 # runner 上的暫存目錄（prompt 進、兩個 json 出）；帶 PID：
                                        # 前一輪被砍掉的 agy 還在跑時，兩邊共用同一個路徑會互相蓋掉 patch.json
MATCH="${EXP_MATCH:-^chu-10[2-5]-}"
LIMIT=0; ONCE=0; DRY=0; ONE_PID=""
while [ $# -gt 0 ]; do case "$1" in
  --match) MATCH="$2"; shift 2 ;; --limit) LIMIT="$2"; shift 2 ;; --once) ONCE=1; shift ;;
  --pid) ONE_PID="$2"; ONCE=1; shift 2 ;; --redo) export EXP_REDO="$2"; shift 2 ;; --dry) DRY=1; ONCE=1; shift ;;
  *) echo "用法見檔頭" >&2; exit 2 ;; esac; done
[ -n "${EXP_REDO:-}" ] && { [ "$DRY" = 1 ] && [ -n "$ONE_PID" ] || { echo "--redo 只能配 --pid 與 --dry" >&2; exit 2; }; }
LOG="$HOME/.claude/exp-worker.log"
FAILED="$HOME/.claude/exp-worker.failed"
DRYDIR="$HOME/.cache/exp-dry"
if [ "$DRY" = 1 ]; then mkdir -p "$DRYDIR"; rm -f "$DRYDIR"/*; LOG="$DRYDIR/worker.log"; FAILED="$DRYDIR/failed"; fi
STOP="$HOME/.claude/exp-worker.stop"
LOCK="$HOME/.claude/exp-worker.lock"
TGSEND="$HOME/TelegramClaude/claude-shared/machines/claudebot500/tg-sessions/tg-send.sh"
PAUSED="$HOME/.claude/channels/telegram-kaohero/paused-until"
LSTATE="$HOME/.claude/session-limit.state"
T="${XDG_RUNTIME_DIR:-/tmp}/exp-worker.$$"; mkdir -p "$T"
cleanup() { rm -rf "$T"; rm -f "$LOCK"; [ "${ENGINE:-claude}" = agy ] && ssh "${SSHOPT[@]}" "$AGY_HOST" "rm -rf $AGY_T" >/dev/null 2>&1; return 0; }
trap cleanup EXIT
export PATH="$HOME/bin:$HOME/.npm-global/bin:/usr/local/bin:/usr/bin:/bin"
export DISABLE_AUTOUPDATER=1
unset TELEGRAM_STATE_DIR

now() { TZ=Asia/Taipei date '+%m/%d %H:%M'; }
log() { printf '%s %s\n' "$(now)" "$1" >> "$LOG"; }
report() { if [ "$DRY" = 1 ]; then printf '[dry 不送 TG] %s\n' "$1" >&2; else printf '%s\n' "$1" | "$TGSEND" kaohero >/dev/null 2>&1 || true; fi; }

# 一次只准一個 worker：兩個一起跑會同時改題庫、push 互撞
if [ -f "$LOCK" ] && kill -0 "$(cat "$LOCK" 2>/dev/null)" 2>/dev/null; then echo "已有 worker 在跑（pid $(cat "$LOCK")）"; exit 1; fi
echo $$ > "$LOCK"
rm -f "$STOP"
cd "$ROOT" || exit 1

wait_quota() {   # 額度守門：session-limit 暫停中或 paused-until 未到就等，不要在撞頂時空轉燒重試
  # 這兩個記號是 Claude 訂閱的額度：只在三段的第③段（訂閱）前叫，贈額兩段與 agy／deepseek／openai 引擎不受影響
  while :; do
    local until_ts; until_ts=$(cat "$PAUSED" 2>/dev/null || echo 0)
    if [ "${until_ts:-0}" -gt "$(date +%s)" ] 2>/dev/null; then log "wait paused-until $(TZ=Asia/Taipei date -d "@$until_ts" '+%H:%M')"; sleep 300; continue; fi
    if grep -qE '^mode=(pause|hit)' "$LSTATE" 2>/dev/null; then log "wait session-limit"; sleep 300; continue; fi
    break
  done
}

# prompt 裡的路徑要填模型看得到的那一台：claude 跑本機，agy 跑 runner
if [ "$ENGINE" = agy ]; then P_ROOT="$AGY_ROOT"; P_T="$AGY_T"; ENGINE_NAME="agy/$AGY_MODEL"
elif [ "$ENGINE" = deepseek ]; then P_ROOT="$ROOT"; P_T="$T"; ENGINE_NAME="deepseek/${EXP_DS_MODEL:-deepseek-flash}"
elif [ "$ENGINE" = openai ]; then P_ROOT="$ROOT"; P_T="$T"; ENGINE_NAME="openai/${EXP_OA_MODEL:-gpt-6-astra}"
else P_ROOT="$ROOT"; P_T="$T"; ENGINE_NAME="claude/$MODEL"; fi

run_model() {   # $1=prompt 檔（本機）  $2=out.json 落點（本機）；patch/skip 一律回到 $T
  local pf="$1" of="$2" rc=0
  # deepseek 沒有 agent loop，prompt 檔用不到：切段、撈 JSON、驗格式、寫 patch/skip 都在 exp-deepseek.js 裡
  if [ "$ENGINE" = deepseek ]; then
    node tools/exp-deepseek.js "$pid" "$T" > "$of" 2>> "$T/err.txt"
    return $?
  fi
  # openai 同 deepseek：全在 exp-openai.js 裡；rc=10＝贈額暫停
  if [ "$ENGINE" = openai ]; then
    node tools/exp-openai.js "$pid" "$T" > "$of" 2>> "$T/err.txt"
    return $?
  fi
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
  # claude 引擎＝三段：Claude 贈額 → OpenAI 贈額 → 訂閱（檔頭）。格式退回的重試（RETRY_STAGE）沿用第一次成功的那段
  if [ -n "${RETRY_STAGE:-}" ]; then
    STAGE="$RETRY_STAGE"
    case "$STAGE" in
      credit) claude_call only "$pf" "$of" ;; openai) oa_call "$of" ;; *) wait_quota; claude_call auto "$pf" "$of" ;;
    esac
    return $?
  fi
  STAGE=credit
  claude_call only "$pf" "$of"; rc=$?
  if [ "$rc" -ne 3 ] && { has_output || ! flag_fresh; }; then return $rc; fi
  STAGE_WHY="Claude 贈額不能用（rc=$rc：$(grep -m1 'claude-credit:' "$T/err.txt" | cut -c1-80)）"
  if [ "$AUTO_OA" = 1 ]; then
    STAGE=openai; rm -f "$T/patch.json" "$T/skip.json"
    oa_call "$of"; rc=$?
    if [ "$rc" -eq 0 ] && oa_wrote; then return 0; fi
    STAGE_WHY="$STAGE_WHY；OpenAI 贈額$( [ "$rc" -eq 10 ] && echo '暫停（rc=10）' || echo "沒寫成（rc=$rc）")"
  fi
  STAGE=sub; rm -f "$T/patch.json" "$T/skip.json"
  wait_quota
  claude_call auto "$pf" "$of"
}
# $1=only（只用 API 贈額）| auto（claude-credit.sh 自己決定：旗標有效＝訂閱）。err.txt 只留這一段的 stderr，
# 下面「撞額度」的判斷只看最後一段；全部的 stderr 累積在 err-all.txt
claude_call() {
  local mt=(); [ -n "${MAXT:-}" ] && mt=(--max-turns "$MAXT")
  CLAUDE_CREDIT="$1" timeout 2400 "$CLAUDE" -p --model "$MODEL" --allowedTools "Read,Write" --dangerously-skip-permissions \
    --no-session-persistence --disable-slash-commands --output-format json \
    --setting-sources "" --exclude-dynamic-system-prompt-sections "${mt[@]}" < "$2" > "$3" 2> "$T/err.txt"
  local rc=$?; { echo "--- claude CLAUDE_CREDIT=$1 rc=$rc"; cat "$T/err.txt"; } >> "$T/err-all.txt"; return $rc
}
oa_call() {   # exp-openai.js 自己切段、驗格式、寫 patch/skip；rc=10＝OpenAI 贈額暫停（整卷不寫）
  node "$OA_BIN" "$pid" "$T" > "$1" 2> "$T/err.txt"
  local rc=$?; { echo "--- openai rc=$rc"; cat "$T/err.txt"; } >> "$T/err-all.txt"; return $rc
}
has_output() { [ -s "$T/patch.json" ] || [ -s "$T/skip.json" ]; }
# 旗標 6 小時內立起＝贈額剛用完或 key 被拒：only 模式第一次撞到時 claude-credit.sh 回的是 API 的結束碼（不是 3），靠旗標認
flag_fresh() { [ -f "$CREDIT_FLAG" ] && [ $(( $(date +%s) - $(stat -c %Y "$CREDIT_FLAG") )) -lt 21600 ]; }
# OpenAI 有沒有真的寫出東西：patch 有題，或 skip 裡有模型自己判的跳過（全是 DEFER-OA＝每段都沒回來，算失敗）
oa_wrote() {
  python3 - "$T/patch.json" "$T/skip.json" <<'PY2' 2>/dev/null
import json,sys
try: p=json.load(open(sys.argv[1]))
except Exception: p=[]
try: s=json.load(open(sys.argv[2]))
except Exception: s=[]
sys.exit(0 if p or any(not str(x.get('reason','')).startswith('DEFER-OA') for x in s) else 1)
PY2
}

done_papers=0; done_q=0; done_skip=0; fails=0; consec_fail=0; prev_pid=""; last_stage=credit
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
  if [ -n "$ONE_PID" ]; then
    n1=$(node tools/exp-dump.js "$ONE_PID" --list | python3 -c 'import json,sys;print(len(json.load(sys.stdin)))')
    [ "${n1:-0}" -gt 0 ] 2>/dev/null || { log "$ONE_PID 沒有待寫題"; break; }
    line="$ONE_PID $n1 $(node -e "global.window={};require('./js/data/exam/$ONE_PID.js');console.log(window.APP_EXAM_PAPERS['$ONE_PID'].title)")"
  else
    line=$(node tools/exp-next.js --match "$MATCH" --limit 1 2>/dev/null | head -1)
  fi
  [ -n "$line" ] || { log "範圍 $MATCH 已無待寫卷"; report_progress "初等考試詳解批次完成（範圍 ${MATCH} 已無待寫卷）"; break; }
  pid=${line%% *}; rest=${line#* }; n_todo=${rest%% *}; title=${rest#* }
  year=$(printf '%s' "$pid" | cut -d- -f2)
  # 年份換了 → 回報上一個年份（§17：每完成一個自然段落回報一次）
  if [ -n "$last_year" ] && [ "$year" != "$last_year" ]; then
    report_progress "${last_year} 年做完：${year_papers} 卷、${year_q} 題已寫、${year_skip} 題跳過；接著做 ${year} 年"
    year_papers=0; year_q=0; year_skip=0
  fi
  last_year="$year"
  rm -f "$T"/patch.json "$T"/skip.json "$T"/out.json; : > "$T/err.txt"; : > "$T/err-all.txt"; STAGE=""; STAGE_WHY=""
  # agy 是在 runner 上讀題庫的圖檔，clone 要先跟上（題庫本體沒圖就不影響，純保險）
  [ "$ENGINE" = agy ] && ssh "${SSHOPT[@]}" "$AGY_HOST" "git -C $AGY_ROOT pull -q --rebase" >/dev/null 2>&1
  EXP_FIG_ROOT="$P_ROOT" node tools/exp-dump.js "$pid" > "$T/q.txt" 2>/dev/null
  sed -e "s|__ROOT__|$P_ROOT|g" -e "s|__PID__|$pid|g" -e "s|__T__|$P_T|g" tools/exp-prompt.md | sed -e "/__QUESTIONS__/{r $T/q.txt" -e 'd}' > "$T/prompt.md"
  # 回合上限：沒圖 1（一則回覆寫兩個檔）、有圖 2（先一次 Read 全部圖）；同一卷連續第二次不設限
  MAXT=1; grep -q '圖檔：' "$T/q.txt" && MAXT=2; [ "$pid" = "$prev_pid" ] && MAXT=""; prev_pid="$pid"
  t0=$(date +%s)
  run_model "$T/prompt.md" "$T/out.json"
  rc=$?; secs=$(( $(date +%s) - t0 ))
  # 這一卷實際走哪一段（claude 引擎＝三段）；路線換了在本線頻道講一次
  eng="$ENGINE_NAME"
  if [ "$ENGINE" = claude ]; then
    case "$STAGE" in
      credit) eng="claude/$MODEL（Claude 贈額）" ;;
      openai) eng="openai/${EXP_OA_MODEL:-gpt-6-astra}（OpenAI 贈額）" ;;
      sub)    eng="claude/$MODEL（訂閱，扣週額度）" ;;
    esac
    if [ "$STAGE" != "$last_stage" ]; then
      log "$pid 路線 $last_stage → $STAGE${STAGE_WHY:+：$STAGE_WHY}"
      report "🔀 $(now) 詳解 worker 改走 $eng（$pid 起）${STAGE_WHY:+
原因：$STAGE_WHY}"
      last_stage="$STAGE"
    fi
  fi
  if [ "$ENGINE" = openai ] && [ "$rc" -eq 10 ]; then
    log "$pid OpenAI 贈額暫停（rc=10），worker 停下：$(tail -c 200 "$T/err.txt" | tr '\n' ' ')"
    report "⏸ $(now) 詳解 worker（openai）停下：OpenAI 贈額暫停（到上限、用完或金鑰被拒），$pid 沒寫。要接續：bash tools/exp-engine.sh claude"
    break
  fi
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
  if grep -qiE 'usage limit|rate limit|overloaded|login|credit balance|insufficient balance|HTTP 40[12]|authentication|resource_exhausted|quota|permission denied|connection (refused|closed)' "$T/err.txt" "$T/out.json" 2>/dev/null && [ ! -s "$T/patch.json" ]; then
    log "$pid 額度或連線問題（rc=$rc）：$(tr '\n' ' ' < "$T/err.txt" | cut -c1-160)，等 30 分"
    [ "$DRY" = 1 ] && break
    consec_fail=$((consec_fail+1)); [ "$consec_fail" -ge 6 ] && { report "⚠️ $(now) 詳解 worker 連續 6 次撞額度／連線問題，先停。查 ~/.claude/exp-worker.log"; break; }
    sleep 1800; continue
  fi
  if [ ! -s "$T/patch.json" ] && [ ! -s "$T/skip.json" ]; then
    log "$pid 失敗：模型沒寫 patch/skip（rc=$rc $usage ${secs}s）$(tail -c 200 "$T/err.txt" | tr '\n' ' ')"
    fails=$((fails+1)); consec_fail=$((consec_fail+1))
    printf '%s\n' "$pid" >> "$FAILED"
    [ "$consec_fail" -ge 3 ] && { report "⚠️ $(now) 詳解 worker 連續 3 卷失敗（最後 $pid），先停。查 ~/.claude/exp-worker.log"; break; }
    [ "$ONCE" = 1 ] && break; continue
  fi
  [ -s "$T/patch.json" ] || echo '[]' > "$T/patch.json"
  [ -s "$T/skip.json" ] || echo '[]' > "$T/skip.json"
  # 驗格式（set-exp 逐題擋）。有錯就把錯誤送回給模型修一次；再錯就這卷記失敗
  if ! node tools/set-exp.js "$T/patch.json" > "$T/chk.txt" 2>&1; then
    log "$pid 格式退回，重試一次：$(grep -c '' "$T/chk.txt") 行"
    { cat "$T/prompt.md"; printf '\n\n=== 上一次的 patch.json 被退回，錯誤如下，請修正後重新寫 patch.json 與 skip.json ===\n'; cat "$T/chk.txt"; printf '\n=== 上一次的 patch.json ===\n'; cat "$T/patch.json"; } > "$T/prompt2.md"
    RETRY_STAGE="${STAGE:-}" run_model "$T/prompt2.md" "$T/out2.json"
    if ! node tools/set-exp.js "$T/patch.json" > "$T/chk.txt" 2>&1; then
      log "$pid 失敗：格式兩次不過 $(head -3 "$T/chk.txt" | tr '\n' ' ')"
      fails=$((fails+1)); consec_fail=$((consec_fail+1)); printf '%s\n' "$pid" >> "$FAILED"
      [ "$consec_fail" -ge 3 ] && { report "⚠️ $(now) 詳解 worker 連續 3 卷失敗（最後 $pid），先停"; break; }
      [ "$ONCE" = 1 ] && break; continue
    fi
  fi
  n_written=$(python3 -c "import json,sys;print(len(json.load(open(sys.argv[1]))))" "$T/patch.json" 2>/dev/null || echo 0)
  if [ "$DRY" = 1 ]; then   # 試跑：格式驗過就停，不動題庫、exp-skips.json、PROGRESS.md、git
    cp "$T"/patch.json "$T"/skip.json "$T"/out.json "$T"/err-all.txt "$DRYDIR"/ 2>/dev/null
    n_skip=$(python3 -c "import json,sys;print(len(json.load(open(sys.argv[1]))))" "$T/skip.json" 2>/dev/null || echo 0)
    log "$pid [dry] 路線=${STAGE:-$ENGINE} 寫 $n_written 跳 $n_skip $usage ${secs}s"
    echo "dry: $pid 路線=${STAGE:-$ENGINE}（$eng）寫 $n_written 跳 $n_skip $usage ${secs}s → $DRYDIR"
    break
  fi
  n_skip=$(node tools/exp-skip-add.js "$pid" "$T/skip.json" 2>/dev/null || echo 0)
  if [ "$n_written" -gt 0 ]; then
    node tools/set-exp.js "$T/patch.json" --write > /dev/null 2>&1
    node tools/build-index.js --write > /dev/null 2>&1
    if ! node test/test.js > "$T/test.txt" 2>&1; then
      log "$pid 失敗：test.js 不過，還原 $(tail -2 "$T/test.txt" | tr '\n' ' ')"
      git checkout -- js/data/exam/"$pid".js js/data/exams.js 2>/dev/null
      fails=$((fails+1)); consec_fail=$((consec_fail+1)); printf '%s\n' "$pid" >> "$FAILED"
      [ "$consec_fail" -ge 3 ] && { report "⚠️ $(now) 詳解 worker 連續 3 卷 test 不過（最後 $pid），先停"; break; }
      [ "$ONCE" = 1 ] && break; continue
    fi
    node tools/build-pages.js --only "$pid" --write > /dev/null 2>&1
  fi
  # 進度區塊寫進 PROGRESS.md（喚醒腳本與接手的人只看這個檔；§17）
  # 同一個理由的題號併成一行（deepseek 引擎一卷可能跳 70 幾題圖片題，逐題列會把 commit 訊息洗爆）
  skipreasons=$(python3 -c "
import json,sys,collections
g=collections.OrderedDict()
for s in json.load(open(sys.argv[1])): g.setdefault(s['reason'],[]).append(str(s['n']))
print('；'.join('#'+','.join(ns[:20])+('…' if len(ns)>20 else '')+' '+r for r,ns in list(g.items())[:8]))" "$T/skip.json" 2>/dev/null)
  python3 - "$ROOT/PROGRESS.md" "$pid" "$title" "$n_written" "$n_skip" "$(now)" "$MATCH" "$eng" <<'PY'
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
  # 只 add 存在的路徑：待上架區的卷沒有 exam/<pid> 靜態頁，路徑不存在 git add 會整個失敗、什麼都沒暫存，
  # commit 就靜默失敗（2026-11-05 不動產經紀人／記帳士 97 卷全部沒 commit，靠 04:00 存檔才收進 git）
  addp=(); for x in js/data/exam/"$pid".js js/data/exams.js exam/"$pid" sitemap.xml tools/exp-skips.json PROGRESS.md; do [ -e "$x" ] && addp+=("$x"); done
  git add "${addp[@]}" 2>/dev/null
  git commit -q -m "詳解：${title} ${n_written} 題$( [ "$n_skip" -gt 0 ] && printf '（跳過 %s 題：%s）' "$n_skip" "$skipreasons")

worker: $usage ${secs}s engine=$eng" 2>/dev/null
  for i in 1 2 3; do git push -q 2>/dev/null && break; git pull --rebase -q 2>/dev/null; sleep 5; done
  log "$pid 寫 $n_written／待 $n_todo 跳 $n_skip $usage ${secs}s ${STAGE:+route=$STAGE}"
  done_papers=$((done_papers+1)); done_q=$((done_q+n_written)); done_skip=$((done_skip+n_skip)); consec_fail=0
  year_papers=$((year_papers+1)); year_q=$((year_q+n_written)); year_skip=$((year_skip+n_skip))
  [ $(( $(date +%s) - last_report )) -ge 7200 ] && report_progress "進度（${year} 年進行中，剛做完 ${pid}）"
  [ "$ONCE" = 1 ] && break
  [ "$LIMIT" -gt 0 ] && [ "$done_papers" -ge "$LIMIT" ] && break
done
log "收工：${done_papers} 卷、${done_q} 題、跳 ${done_skip}、失敗 ${fails}"
