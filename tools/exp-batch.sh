#!/usr/bin/env bash
# exp-batch.sh — 跨卷湊批寫詳解的 worker（補舊科目零星漏題用）。
#
# 跟 exp-worker.sh 的分工（2026-09-20 加）：
#   exp-worker.sh  一整卷都沒寫的新科目 → 逐卷開新 session，同卷共用 context 才划算
#   exp-batch.sh   舊科目補漏，剩下的題散在幾百卷、每卷只剩 1～2 題
#                  → 逐卷做要為了 1 題讀整卷 80 題，實測每卷 $0.37、828 卷估 $300；
#                    湊成一批 15 題（來自不同卷）後同樣 1,595 題估 $40。
#
# 三個 mode（見 tools/exp-batch-dump.js）依序跑：
#   text  純文字題，一批 15
#   fig   有圖檔的題，模型要 Read webp，一批 6
#   nofig 題幹提到圖表但沒有圖檔，多數會被判跳過，一批 40
#
# 用法：tools/exp-batch.sh --match <pid 正規式> [--mode text|fig|nofig|all] [--limit N 批] [--once]
# 控制：touch ~/.claude/exp-batch.stop   做完手上這批就停
# 紀錄：~/.claude/exp-batch.log（每批一行）
set -u
ROOT="$HOME/TelegramClaude/kaoguhero"
CLAUDE="$HOME/bin/claude"            # 走 shim：TELEGRAM_STATE_DIR 會被清掉，不會搶 kaohero 線的 bot
MODEL="${EXP_MODEL:-claude-opus-5}"
MATCH="${EXP_MATCH:-^(loc|gao|den|pha|chu|tcm|tea|nur)-}"
MODES="text fig nofig"
LIMIT=0; ONCE=0
while [ $# -gt 0 ]; do case "$1" in
  --match) MATCH="$2"; shift 2 ;;
  --mode)  [ "$2" = all ] || MODES="$2"; shift 2 ;;
  --limit) LIMIT="$2"; shift 2 ;;
  --once)  ONCE=1; shift ;;
  *) echo "用法見檔頭" >&2; exit 2 ;; esac; done
LOG="$HOME/.claude/exp-batch.log"
STOP="$HOME/.claude/exp-batch.stop"
LOCK="$HOME/.claude/exp-batch.lock"
TGSEND="$HOME/TelegramClaude/claude-shared/machines/claudebot500/tg-sessions/tg-send.sh"
PAUSED="$HOME/.claude/channels/telegram-kaohero/paused-until"
LSTATE="$HOME/.claude/session-limit.state"
T="${XDG_RUNTIME_DIR:-/tmp}/exp-batch.$$"; mkdir -p "$T"
cleanup() { rm -rf "$T"; rm -f "$LOCK"; return 0; }
trap cleanup EXIT
export PATH="$HOME/bin:$HOME/.npm-global/bin:/usr/local/bin:/usr/bin:/bin"
export DISABLE_AUTOUPDATER=1
unset TELEGRAM_STATE_DIR

now() { TZ=Asia/Taipei date '+%m/%d %H:%M'; }
log() { printf '%s %s\n' "$(now)" "$1" >> "$LOG"; }
report() { printf '%s\n' "$1" | "$TGSEND" kaohero >/dev/null 2>&1 || true; }

# 一次只准一個：exp-worker 與 exp-batch 都會改題庫與 push，不能並行
if [ -f "$LOCK" ] && kill -0 "$(cat "$LOCK" 2>/dev/null)" 2>/dev/null; then echo "已有 exp-batch 在跑（pid $(cat "$LOCK")）"; exit 1; fi
if [ -f "$HOME/.claude/exp-worker.lock" ] && kill -0 "$(cat "$HOME/.claude/exp-worker.lock" 2>/dev/null)" 2>/dev/null; then echo "exp-worker 正在跑，先停它"; exit 1; fi
echo $$ > "$LOCK"
rm -f "$STOP"
cd "$ROOT" || exit 1

wait_quota() {
  while :; do
    local until_ts; until_ts=$(cat "$PAUSED" 2>/dev/null || echo 0)
    if [ "${until_ts:-0}" -gt "$(date +%s)" ] 2>/dev/null; then log "wait paused-until $(TZ=Asia/Taipei date -d "@$until_ts" '+%H:%M')"; sleep 300; continue; fi
    if grep -qE '^mode=(pause|hit)' "$LSTATE" 2>/dev/null; then log "wait session-limit"; sleep 300; continue; fi
    break
  done
}

mode_note() {   # 每個 mode 給模型的額外交代
  case "$1" in
    fig)   printf '%s' '本批每一題都有「圖檔：」那一行，一定要先 Read 圖再寫。' ;;
    nofig) printf '%s' '本批是「題幹提到圖／表、但檔案裡沒有圖檔」的題，預期多數要跳過。但請逐題判斷：若該題其實不必看圖也能作答（例如圖只是背景、關鍵資訊已寫在題幹或選項裡），仍然要寫詳解，不要整批一律跳過。' ;;
    *)     printf '%s' '本批都是純文字題，正常情況每一題都該寫得出詳解；真的有毀損或答案有問題的才進 skip.json。' ;;
  esac
}

done_batches=0; done_q=0; done_skip=0; fails=0; consec_fail=0
last_report=$(date +%s); stall_key=""; stall_n=0
left_line() { node tools/exp-batch-dump.js --match "$MATCH" --count 2>/dev/null; }

for MODE in $MODES; do
 while :; do
  [ -f "$STOP" ] && { log "stop 記號，收工"; break 2; }
  wait_quota
  rm -f "$T"/patch.json "$T"/skip.json "$T"/out.json "$T"/manifest.json; : > "$T/err.txt"
  if ! node tools/exp-batch-dump.js --match "$MATCH" --mode "$MODE" --manifest "$T/manifest.json" \
        > "$T/q.txt" 2>"$T/dump.txt"; then
    log "mode=$MODE 已無待處理題（$(tail -1 "$T/dump.txt")）"; break
  fi
  nq=$(python3 -c "import json,sys;print(len(json.load(open(sys.argv[1]))))" "$T/manifest.json")
  head_key=$(python3 -c "import json,sys;d=json.load(open(sys.argv[1]));print(d[0]['pid']+'#'+str(d[0]['n']))" "$T/manifest.json")
  sed -e "s|__ROOT__|$ROOT|g" -e "s|__T__|$T|g" -e "s|__MODE_NOTE__|$(mode_note "$MODE")|" tools/exp-prompt-batch.md \
    | sed -e "/__QUESTIONS__/{r $T/q.txt" -e 'd}' > "$T/prompt.md"

  t0=$(date +%s)
  timeout 2400 "$CLAUDE" -p --model "$MODEL" --allowedTools "Read,Write" --dangerously-skip-permissions \
    --no-session-persistence --disable-slash-commands --output-format json < "$T/prompt.md" > "$T/out.json" 2>>"$T/err.txt"
  rc=$?; secs=$(( $(date +%s) - t0 ))
  usage=$(python3 - "$T/out.json" <<'PY' 2>/dev/null
import json,sys
try: d=json.load(open(sys.argv[1]))
except Exception: print("in=? out=? cost=?"); sys.exit()
u=d.get("usage",{}) or {}
i=(u.get("input_tokens",0)+u.get("cache_read_input_tokens",0)+u.get("cache_creation_input_tokens",0))
c=d.get("total_cost_usd")
print(f"in={i//1000}k out={u.get('output_tokens',0)//1000}k"+(f" cost=${c:.2f}" if isinstance(c,(int,float)) else "")+f" turns={d.get('num_turns','?')}")
PY
)
  # 撞額度／連線：不算失敗，等 30 分再試同一批
  if grep -qiE 'usage limit|rate limit|overloaded|login|credit balance|HTTP 40[12]|authentication|quota|connection (refused|closed)' "$T/err.txt" "$T/out.json" 2>/dev/null && [ ! -s "$T/patch.json" ]; then
    log "額度或連線問題（rc=$rc）：$(tr '\n' ' ' < "$T/err.txt" | cut -c1-160)，等 30 分"
    consec_fail=$((consec_fail+1))
    [ "$consec_fail" -ge 6 ] && { report "⚠️ $(now) exp-batch 連續 6 次撞額度／連線問題，先停。查 ~/.claude/exp-batch.log"; break 2; }
    sleep 1800; continue
  fi
  [ -s "$T/patch.json" ] || echo '[]' > "$T/patch.json"
  [ -s "$T/skip.json" ]  || echo '[]' > "$T/skip.json"

  # 驗格式；錯了把錯誤送回去修一次
  if ! node tools/set-exp.js "$T/patch.json" > "$T/chk.txt" 2>&1; then
    log "mode=$MODE 格式退回，重試一次"
    { cat "$T/prompt.md"; printf '\n\n=== 上一次的 patch.json 被退回，錯誤如下，請修正後重新寫 patch.json 與 skip.json ===\n'; cat "$T/chk.txt"; } > "$T/prompt2.md"
    timeout 2400 "$CLAUDE" -p --model "$MODEL" --allowedTools "Read,Write" --dangerously-skip-permissions \
      --no-session-persistence --disable-slash-commands --output-format json < "$T/prompt2.md" > "$T/out2.json" 2>>"$T/err.txt"
    if ! node tools/set-exp.js "$T/patch.json" > "$T/chk.txt" 2>&1; then
      log "mode=$MODE 失敗：格式兩次不過 $(head -3 "$T/chk.txt" | tr '\n' ' ')"
      fails=$((fails+1)); consec_fail=$((consec_fail+1))
      [ "$consec_fail" -ge 3 ] && { report "⚠️ $(now) exp-batch 連續 3 批失敗（mode=$MODE），先停。查 ~/.claude/exp-batch.log"; break 2; }
      [ "$ONCE" = 1 ] && break 2; continue
    fi
  fi

  n_written=$(python3 -c "import json,sys;print(len(json.load(open(sys.argv[1]))))" "$T/patch.json" 2>/dev/null || echo 0)
  n_skip=$(node tools/exp-skip-bulk.js "$T/skip.json" 2>/dev/null || echo 0)
  if [ "$n_written" -gt 0 ]; then
    node tools/set-exp.js "$T/patch.json" --write > /dev/null 2>&1
    node tools/build-index.js --write > /dev/null 2>&1
    if ! node test/test.js > "$T/test.txt" 2>&1; then
      log "mode=$MODE 失敗：test.js 不過，全批還原 $(tail -2 "$T/test.txt" | tr '\n' ' ')"
      git checkout -- js/data/exam js/data/exams.js 2>/dev/null
      fails=$((fails+1)); consec_fail=$((consec_fail+1))
      [ "$consec_fail" -ge 3 ] && { report "⚠️ $(now) exp-batch 連續 3 批 test 不過，先停"; break 2; }
      [ "$ONCE" = 1 ] && break 2; continue
    fi
    python3 -c "
import json,sys
print('\n'.join(sorted({p['pid'] for p in json.load(open(sys.argv[1]))})))" "$T/patch.json" \
      | while read -r wp; do [ -n "$wp" ] && node tools/build-pages.js --only "$wp" --write > /dev/null 2>&1; done
  fi

  # 漏題防呆：manifest 裡既沒進 patch 也沒進 skip 的題，下一輪還會被挑到同一批 → 會卡死。
  # 同一個批頭連續出現 3 次就把漏掉的題暫記 DEFER，讓清單往前走；
  # 之後可用 node tools/exp-skip-drop.js --reason-match '^DEFER' --write 放回來重做。
  if [ "$head_key" = "$stall_key" ]; then stall_n=$((stall_n+1)); else stall_key="$head_key"; stall_n=1; fi
  if [ "$stall_n" -ge 3 ]; then
    python3 - "$T/manifest.json" "$T/patch.json" "$T/skip.json" "$T/defer.json" <<'PY'
import json,sys
man,pat,skp,out=sys.argv[1:]
done={(x['pid'],x['n']) for f in (pat,skp) for x in json.load(open(f))}
left=[{'pid':m['pid'],'n':m['n'],'reason':'DEFER-批次連續三輪未回覆此題'} for m in json.load(open(man)) if (m['pid'],m['n']) not in done]
json.dump(left,open(out,'w'),ensure_ascii=False)
print(len(left))
PY
    d=$(node tools/exp-skip-bulk.js "$T/defer.json" 2>/dev/null || echo 0)
    log "mode=$MODE 批頭 $head_key 連三輪沒動，DEFER $d 題讓清單往前"
    stall_n=0
  fi

  if [ "$n_written" -gt 0 ] || [ "$n_skip" -gt 0 ]; then
    git add js/data/exam js/data/exams.js exam sitemap.xml tools/exp-skips.json 2>/dev/null
    git commit -q -m "詳解批次（$MODE）：寫 ${n_written} 題、跳過 ${n_skip} 題，來自 $(python3 -c "
import json,sys;print(len({p['pid'] for p in json.load(open(sys.argv[1]))+json.load(open(sys.argv[2]))}))" "$T/patch.json" "$T/skip.json" 2>/dev/null) 卷

exp-batch: $usage ${secs}s match=$MATCH" 2>/dev/null
    for i in 1 2 3; do git push -q 2>/dev/null && break; git pull --rebase -q 2>/dev/null; sleep 5; done
  fi
  log "mode=$MODE 批 ${nq} 題 → 寫 $n_written 跳 $n_skip $usage ${secs}s"
  done_batches=$((done_batches+1)); done_q=$((done_q+n_written)); done_skip=$((done_skip+n_skip)); consec_fail=0
  if [ $(( $(date +%s) - last_report )) -ge 7200 ]; then
    report "📝 $(now) 補舊科目詳解（跨卷批次）進行中
本輪累計：${done_batches} 批、${done_q} 題已寫、${done_skip} 題跳過、${fails} 批失敗
剩餘 $(left_line)"
    last_report=$(date +%s)
  fi
  [ "$ONCE" = 1 ] && break 2
  [ "$LIMIT" -gt 0 ] && [ "$done_batches" -ge "$LIMIT" ] && break 2
 done
done
log "收工：${done_batches} 批、${done_q} 題、跳 ${done_skip}、失敗 ${fails}"
report "✅ $(now) 補舊科目詳解（跨卷批次）收工
${done_batches} 批、${done_q} 題已寫、${done_skip} 題跳過、${fails} 批失敗
剩餘 $(left_line)"
