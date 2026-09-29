#!/usr/bin/env bash
# essay-ref-cloud.sh — 雲端 session 用的「一批」流程（主代理呼叫；寫參考架構交給子代理）。作業說明 tools/essay-ref-cloud.md
#   bash tools/essay-ref-cloud.sh init <i/n> <branch>   記住分片與 push 目標（寫在 /tmp/essay-ref/params.sh，之後不用再帶）
#   bash tools/essay-ref-cloud.sh next [題數]           挑下一批、組好 /tmp/essay-ref/prompt.md；印「N 題（全部 X，110 年起 Y）」或「0 題」
#   bash tools/essay-ref-cloud.sh set                   驗格式寫回 + commit；印「寫入 N 題」
#   bash tools/essay-ref-cloud.sh skip                  把這批（/tmp/essay-ref/q.txt）的題記 skip + commit（內容過濾單題仍被擋、或子代理兩次沒寫檔）
#   bash tools/essay-ref-cloud.sh push                  push 到 branch；印 pushed
#   bash tools/essay-ref-cloud.sh status                印這輪累計（寫了幾題、幾批、最後一科）
# 預設 ESSAY_SCOPE=nolaw、ESSAY_RECENT_ONLY=1（只寫 110 年起）；要改就 init 之前 export。
set -uo pipefail
cd "$(dirname "$0")/.." || exit 1
D=/tmp/essay-ref; mkdir -p "$D"; P="$D/params.sh"; LOG="$D/log.txt"
now() { TZ=Asia/Taipei date '+%m/%d %H:%M'; }
if [ "${1:-}" = init ]; then
  [ $# -ge 3 ] || { echo "用法：init <i/n> <branch>"; exit 1; }
  printf 'export ESSAY_SHARD=%q BRANCH=%q ESSAY_SCOPE=%q ESSAY_RECENT_ONLY=%q\n' "$2" "$3" "${ESSAY_SCOPE:-nolaw}" "${ESSAY_RECENT_ONLY:-1}" > "$P"
  git config user.email >/dev/null || { git config user.name "kaohero-cloud"; git config user.email "cloud@kaohero.com"; }
  : > "$LOG"; echo "ok: $(cat "$P")"; exit 0
fi
[ -f "$P" ] || { echo "先跑 init <i/n> <branch>"; exit 1; }
. "$P"
case "${1:-}" in
  next)
    rm -f "$D/refs.json"
    python3 tools/essay-ref.py targets --limit "${2:-12}" --out "$D/q.txt" | tee "$D/cnt.txt"
    grep -q '^0 題' "$D/cnt.txt" && exit 0
    sed -e "s|__OUT__|$D/refs.json|g" tools/essay-ref-prompt.md | sed -e "/__QUESTIONS__/{r $D/q.txt" -e 'd}' > "$D/prompt.md"
    echo "prompt 已組好：$D/prompt.md　科目：$(sed -n '1s/^科目：//p' "$D/q.txt")";;
  set)
    [ -s "$D/refs.json" ] || { echo "沒有 refs.json（子代理沒寫檔）"; exit 2; }
    python3 tools/essay-ref.py set "$D/refs.json" --write | tee "$D/set.txt" || exit 3
    got=$(sed -n 's/^寫入 \([0-9]*\) 題.*/\1/p' "$D/set.txt"); subj=$(sed -n '1s/^科目：//p' "$D/q.txt")
    git add js/data/essay js/data/essays.js tools/essay-ref-skips.json tools/essay-ref-rejects.json
    git commit -q -m "申論參考架構 +${got:-0} 題（${subj}）cloud" 2>/dev/null
    echo "$(now) ${subj} 寫 ${got:-0} 題" | tee -a "$LOG";;
  skip)
    python3 tools/essay-ref.py skip "$D/q.txt"
    git add tools/essay-ref-skips.json && git commit -q -m "申論參考架構：記 skip（cloud）" 2>/dev/null
    echo "$(now) skip：$(grep -c '^### ' "$D/q.txt") 題" | tee -a "$LOG";;
  push)
    git push -q -u origin "HEAD:$BRANCH" && echo "pushed to $BRANCH ($(git rev-parse --short HEAD))";;
  status)
    awk -v n=0 -v w=0 -v k=0 '/ 寫 [0-9]+ 題/{n++; sub(/.* 寫 /,""); sub(/ 題.*/,""); w+=$0} /skip：/{sub(/.*skip：/,""); sub(/ 題.*/,""); k+=$0} END{printf "批數 %d　寫入 %d 題　skip %d 題\n", n, w, k}' "$LOG"
    tail -1 "$LOG" 2>/dev/null;;
  *) sed -n '2,9p' "$0"; exit 1;;
esac
