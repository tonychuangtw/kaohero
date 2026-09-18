#!/usr/bin/env bash
# exp-engine.sh — 切換詳解 worker 的引擎並重啟。
#
#   tools/exp-engine.sh agy [模型]   → 改走 runner 的 agy（Google AI Pro 訂閱，不吃 Claude 額度）
#   tools/exp-engine.sh claude       → 改回本機 claude -p
#   tools/exp-engine.sh deepseek     → 改走 DeepSeek API（預付按量，2026-09-18 起；讀不了圖，圖片題會延後）
#   tools/exp-engine.sh status       → 只看現在是哪一個
#
# 2026-09-16 Tony 定案：Claude 週限撞 83% → 先切 agy／gemini-3.8-flash-high；
# 台北週五 04:00 週限重置後改回 claude（tools/exp-engine-restore.timer 會自動做並通知）。
set -u
UNIT="$HOME/.config/systemd/user/exp-worker.service"
SRC="$HOME/TelegramClaude/kaoguhero/tools/exp-worker.service"
TGSEND="$HOME/TelegramClaude/claude-shared/machines/claudebot500/tg-sessions/tg-send.sh"
cmd="${1:-status}"

cur() { grep -oP '(?<=^Environment=EXP_ENGINE=).*' "$UNIT" 2>/dev/null || echo claude; }
curmodel() { grep -oP '(?<=^Environment=EXP_AGY_MODEL=).*' "$UNIT" 2>/dev/null || echo gemini-3.8-flash-high; }

case "$cmd" in
  status) echo "引擎：$(cur)（agy 模型 $(curmodel)）；worker $(systemctl --user is-active exp-worker)"; exit 0 ;;
  agy|claude|deepseek) ;;
  *) echo "用法：exp-engine.sh agy|claude|deepseek|status [模型]" >&2; exit 2 ;;
esac

# 切到 agy 沒指定模型時一律回到 gemini-3.8-flash-high，不繼承上一次的設定：
# 09/17 為了實驗把 EXP_AGY_MODEL 留成 claude-sonnet-4-6，若就這樣切回 agy，批次會去燒
# agy 裡的 Claude 桶（按請求計量，一卷吃 17～18% 週限、只夠 5～6 卷），跟 CLAUDE.md 定的
# 「批次主力永遠是 flash」相反（2026-09-18 發現）。要用 Claude 模型得在命令列明講。
model="${2:-gemini-3.8-flash-high}"
cp "$SRC" "$UNIT"
{ echo "Environment=EXP_ENGINE=$cmd"; echo "Environment=EXP_AGY_MODEL=$model"; } >> "$UNIT"
systemctl --user daemon-reload

# 乾淨換手：讓它做完手上這卷再停，避免半卷被截斷（最多等 45 分）
if systemctl --user is-active --quiet exp-worker; then
  touch "$HOME/.claude/exp-worker.stop"
  for _ in $(seq 1 90); do systemctl --user is-active --quiet exp-worker || break; sleep 30; done
  systemctl --user stop exp-worker 2>/dev/null
fi
rm -f "$HOME/.claude/exp-worker.stop"
systemctl --user start exp-worker
msg="🔧 $(TZ=Asia/Taipei date '+%m/%d %H:%M') 詳解 worker 引擎切為 $cmd$( [ "$cmd" = agy ] && printf '（%s）' "$model" )，已重啟"
echo "$msg"
printf '%s\n' "$msg" | "$TGSEND" kaohero >/dev/null 2>&1 || true
