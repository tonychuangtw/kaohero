#!/usr/bin/env bash
# cf-deploy.sh — 把網站部署到 Cloudflare Pages（專案 kaohero），題目圖片同步到 R2（2026-10-04 從 GitHub Pages 搬過來）
#
# 為什麼搬：GitHub Pages 整站上限 1GB，10/04 已用 733MB。Cloudflare Pages 沒有總量上限，但一次部署最多 2 萬個檔，
# 所以 img/q/ 的 5 千多張題圖放 R2（bucket kaohero-img，網址 https://img.kaohero.com/q/…），前端由 js/config.js 的 IMG_BASE 換址。
#
# 用法：bash tools/cf-deploy.sh [--force]     （cf-deploy.timer 每 10 分跑一次；HEAD 沒變就什麼都不做）
# 憑證：~/.config/cloudflare/kaohero.env 的 CF_PAGES_TOKEN、CF_ACCOUNT_ID（不進 git）
set -uo pipefail
cd "$(dirname "$0")/.."
set -a; . "$HOME/.config/cloudflare/kaohero.env"; set +a
export CLOUDFLARE_API_TOKEN="$CF_PAGES_TOKEN" CLOUDFLARE_ACCOUNT_ID="$CF_ACCOUNT_ID"
PROJECT=kaohero
BUCKET=kaohero-img
STAGE="$HOME/.cache/kaohero-deploy"
STATE="$HOME/.cache/kaohero-deploy.head"
R2DONE="$HOME/.cache/kaohero-r2.list"      # 已上傳到 R2 的檔名清單
LOG="$HOME/.claude/cf-deploy.log"
log() { echo "$(TZ=Asia/Taipei date '+%m/%d %H:%M') $*" >> "$LOG"; }

exec 9> "$HOME/.cache/kaohero-deploy.lock"
flock -n 9 || exit 0

HEAD=$(git rev-parse HEAD)
[ "${1:-}" != "--force" ] && [ -f "$STATE" ] && [ "$(cat "$STATE")" = "$HEAD" ] && exit 0

# 1) 新的題圖先上 R2（前端指過去之前圖要先在）
touch "$R2DONE"
NEW=$(comm -23 <(ls img/q | sort) <(sort -u "$R2DONE"))
if [ -n "$NEW" ]; then
  n=0; fail=0
  while read -r f; do
    [ -z "$f" ] && continue
    code=$(curl -s -o /dev/null -w '%{http_code}' -X PUT \
      -H "Authorization: Bearer $CF_PAGES_TOKEN" -H "Content-Type: image/webp" \
      --data-binary @"img/q/$f" \
      "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/r2/buckets/$BUCKET/objects/q/$f")
    if [ "$code" = 200 ]; then echo "$f" >> "$R2DONE"; n=$((n+1)); else fail=$((fail+1)); fi
  done <<< "$NEW"
  log "R2 上傳 $n 張、失敗 $fail 張"
  [ $fail -gt 0 ] && exit 1
fi

# 2) 只放網站要用的檔（工具、文件、測試、題圖都不上 Pages）
mkdir -p "$STAGE"
rsync -a --delete \
  --exclude .git --exclude tools --exclude docs --exclude test --exclude 'img/q' \
  --exclude '*.md' --exclude CNAME --exclude node_modules \
  ./ "$STAGE/"
files=$(find "$STAGE" -type f | wc -l)
if [ "$files" -ge 19500 ]; then log "🔴 檔案數 $files 逼近 Pages 2 萬上限，停止部署"; exit 1; fi

# 3) 部署（wrangler 只上傳內容有變的檔）
out=$(npx --yes wrangler@4 pages deploy "$STAGE" --project-name "$PROJECT" --branch main \
  --commit-hash "$HEAD" --commit-message "$(git log -1 --format=%s | head -c 200)" --commit-dirty=true 2>&1)
rc=$?
if [ $rc -eq 0 ]; then
  echo "$HEAD" > "$STATE"
  log "部署 ${HEAD:0:9}（$files 檔）"
else
  log "🔴 部署失敗 rc=$rc：$(echo "$out" | tail -3 | tr '\n' ' ')"
  exit 1
fi
