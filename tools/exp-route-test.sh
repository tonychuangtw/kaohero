#!/usr/bin/env bash
# exp-route-test.sh — 試 exp-worker.sh 的三段路線（Claude 贈額 → OpenAI 贈額 → 訂閱），全部用 --dry：不寫題庫、不 commit、不送 TG。
#
#   bash tools/exp-route-test.sh fake     0 token：三段全用假的，只驗路線判斷（含「only 模式第一次撞到用完、回 1＋立旗標」那條）
#   bash tools/exp-route-test.sh real     三段各真打一次（各 1～2 題，約 US$0.1 以內＋訂閱 1 題）；失敗用假的模擬，不真的燒光贈額
#
# 用已寫好的題重寫（--redo），所以全站寫完也能試。假的旗標放暫存目錄，⛔ 不碰真的 ~/.config/anthropic-credits/exhausted
# （那是全線共用的，立起來別條線會一起改走訂閱）。
set -u
cd "$(dirname "$0")/.." || exit 1
PID="${TEST_PID:-fir-102-1-f001}"     # #1 純文字、#27 有圖
MODE="${1:-fake}"
W="$(mktemp -d)"; trap 'rm -rf "$W"' EXIT
REAL_CC="$HOME/TelegramClaude/claude-shared/tools/claude-credit.sh"
OUT="$HOME/.cache/exp-dry"
pass=0; fail=0
ok() { echo "✅ $1"; pass=$((pass+1)); }
ng() { echo "❌ $1"; fail=$((fail+1)); }

# 假 claude-credit.sh：CLAUDE_CREDIT=only 時照 FAKE_ONLY 行事；其他模式照 FAKE_SUB 行事
#   FAKE_ONLY=3 → 回 3（贈額暫停）；FAKE_ONLY=flag → 立假旗標、回 1（only 模式第一次撞到用完的樣子）；FAKE_ONLY=real → 真的跑
#   FAKE_SUB=real → 真的走訂閱（CLAUDE_CREDIT=off）；FAKE_SUB=write → 假裝寫好（從 prompt 撈 patch 路徑，寫一題合格詳解）
cat > "$W/fake-cc.sh" <<'SH'
#!/usr/bin/env bash
echo "fake-cc CLAUDE_CREDIT=$CLAUDE_CREDIT" >> "$FAKE_TRACE"
if [ "$CLAUDE_CREDIT" = only ]; then
  case "$FAKE_ONLY" in
    3) echo "claude-credit: API 暫停中（假的），CLAUDE_CREDIT=only 不退回訂閱" >&2; exit 3 ;;
    flag) touch "$EXP_CREDIT_FLAG"; echo '{"type":"result","is_error":true,"result":"Credit balance is too low"}'; exit 1 ;;
    real) exec "$REAL_CC" "$@" ;;
    fail) echo '{"type":"result","is_error":true,"subtype":"error_during_execution"}'; exit 1 ;;
  esac
fi
case "$FAKE_SUB" in
  real) CLAUDE_CREDIT=off exec "$REAL_CC" "$@" ;;
  write) d=$(grep -oE '/[^ ]+/patch\.json' | head -1 | xargs dirname)
         node -e "const [d,pid]=process.argv.slice(1);global.window={};require(process.cwd()+'/js/data/exam/'+pid+'.js');
           const q=window.APP_EXAM_PAPERS[pid].qs.find(q=>q.n===1);
           require('fs').writeFileSync(d+'/patch.json',JSON.stringify([{pid,n:1,exp:q.exp}]));
           require('fs').writeFileSync(d+'/skip.json','[]')" "$d" "$FAKE_PID"
         echo '{"type":"result","total_cost_usd":0,"usage":{}}' ;;
esac
SH
cat > "$W/fake-oa.js" <<'JS'
#!/usr/bin/env node
const fs = require('fs'), [pid, outdir] = process.argv.slice(2);
fs.appendFileSync(process.env.FAKE_TRACE, 'fake-oa\n');
if (process.env.FAKE_OA === 'write') {   // 假裝 OpenAI 寫好了（用題庫裡現成的詳解）
  global.window = {}; require(process.cwd() + '/js/data/exam/' + pid + '.js');
  const q = window.APP_EXAM_PAPERS[pid].qs.find(q => q.n === 1);
  fs.writeFileSync(outdir + '/patch.json', JSON.stringify([{ pid, n: 1, exp: q.exp }]));
  fs.writeFileSync(outdir + '/skip.json', '[]');
  console.log('{"usage":{},"total_cost_usd":0,"num_turns":1}'); process.exit(0);
}
if (process.env.FAKE_OA === 'defer') {   // 每段都沒回來：只有 DEFER-OA，算沒寫成
  fs.writeFileSync(outdir + '/patch.json', '[]');
  fs.writeFileSync(outdir + '/skip.json', JSON.stringify([{ n: 1, reason: 'DEFER-OA：OpenAI 未回傳，留給 claude 補' }]));
  console.log('{}'); process.exit(0);
}
console.error('[oa] 贈額暫停（假的）'); console.log('{"paused":true}'); process.exit(10);
JS
chmod +x "$W/fake-cc.sh" "$W/fake-oa.js"
export REAL_CC FAKE_TRACE="$W/trace" FAKE_PID="$PID" EXP_CREDIT_FLAG="$W/exhausted"

run() {   # $1=說明 $2=期望路線 $3=redo；其餘是環境變數設定
  local desc="$1" want="$2" redo="$3"; shift 3
  : > "$FAKE_TRACE"; rm -f "$EXP_CREDIT_FLAG"
  local line; line=$(env "$@" bash tools/exp-worker.sh --pid "$PID" --redo "$redo" --dry 2>"$W/stderr" | grep '^dry:')
  if [ -n "$line" ] && grep -q "路線=$want（" <<<"$line"; then ok "$desc → $line"
  else ng "$desc（期望 $want）：${line:-沒有 dry 結果} $(tail -3 "$OUT/worker.log" 2>/dev/null | tr '\n' ' ')"; fi
  echo "   經過：$(tr '\n' ' ' < "$FAKE_TRACE")"
  grep -h '🔀\|路線' "$W/stderr" "$OUT/worker.log" 2>/dev/null | sed 's/^/   /' | head -4
}

if [ "$MODE" = fake ]; then
  run "①贈額暫停(rc=3) → ②OpenAI 也暫停(rc=10) → ③訂閱" sub 1 \
      EXP_CLAUDE_BIN="$W/fake-cc.sh" EXP_OA_BIN="$W/fake-oa.js" FAKE_ONLY=3 FAKE_SUB=write
  run "①剛撞到用完（rc=1＋旗標）→ ②暫停 → ③訂閱" sub 1 \
      EXP_CLAUDE_BIN="$W/fake-cc.sh" EXP_OA_BIN="$W/fake-oa.js" FAKE_ONLY=flag FAKE_SUB=write
  run "①贈額暫停(rc=3) → ②OpenAI 寫好" openai 1 \
      EXP_CLAUDE_BIN="$W/fake-cc.sh" EXP_OA_BIN="$W/fake-oa.js" FAKE_ONLY=3 FAKE_OA=write FAKE_SUB=write
  run "①暫停 → ②只有 DEFER-OA（沒寫成）→ ③訂閱" sub 1 \
      EXP_CLAUDE_BIN="$W/fake-cc.sh" EXP_OA_BIN="$W/fake-oa.js" FAKE_ONLY=3 FAKE_OA=defer FAKE_SUB=write
  run "EXP_AUTO_OA=0：①暫停 → 直接③" sub 1 \
      EXP_CLAUDE_BIN="$W/fake-cc.sh" EXP_OA_BIN="$W/fake-oa.js" FAKE_ONLY=3 FAKE_SUB=write EXP_AUTO_OA=0
  grep -q fake-oa "$FAKE_TRACE" && ng "EXP_AUTO_OA=0 還是叫了 OpenAI" || ok "EXP_AUTO_OA=0 沒叫 OpenAI"
  # 一般失敗（沒旗標、不是 rc=3）不換路線：照舊記失敗，不去燒 OpenAI／訂閱
  : > "$FAKE_TRACE"; rm -f "$EXP_CREDIT_FLAG"
  EXP_CLAUDE_BIN="$W/fake-cc.sh" EXP_OA_BIN="$W/fake-oa.js" FAKE_ONLY=fail FAKE_SUB=write \
    bash tools/exp-worker.sh --pid "$PID" --redo 1 --dry >/dev/null 2>&1
  if [ "$(tr '\n' ' ' < "$FAKE_TRACE")" = "fake-cc CLAUDE_CREDIT=only " ] && grep -q '失敗：模型沒寫' "$OUT/worker.log"; then ok "一般失敗不換路線、記失敗"
  else ng "一般失敗卻換了路線：$(tr '\n' ' ' < "$FAKE_TRACE")"; fi
elif [ "$MODE" = real ]; then
  run "①真打 Claude 贈額（1 題）" credit 1
  run "①假暫停 → ②真打 OpenAI 贈額（#1 文字＋#27 圖）" openai 1,27 \
      EXP_CLAUDE_BIN="$W/fake-cc.sh" FAKE_ONLY=3
  run "①假暫停 → ②假暫停 → ③真走訂閱（1 題）" sub 1 \
      EXP_CLAUDE_BIN="$W/fake-cc.sh" EXP_OA_BIN="$W/fake-oa.js" FAKE_ONLY=3 FAKE_SUB=real
else echo "用法：exp-route-test.sh fake|real" >&2; exit 2; fi
echo "通過 $pass、失敗 $fail"
[ "$fail" = 0 ]
