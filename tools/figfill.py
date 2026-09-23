# -*- coding: utf-8 -*-
"""把「題目要看圖、題庫裡卻沒有圖」的題從原始 PDF 裁圖補回來。

用法：
  node tools/fig-targets.js --out /tmp/fig.json          # 先列出要補的題
  python3 tools/figfill.py /tmp/fig.json [--limit N] [--match <pid 正規式>]
  node tools/set-fig.js /tmp/fig-done.json --write       # 再把 fig 欄位寫進題庫

產出：img/q/<code>_<c>_<s>_<題號>.webp（已存在就跳過）與 <輸入檔>-done.json
      {pid: {題號: "img/q/…webp"}}；裁不出來的記在 <輸入檔>-bad.json。

對照表來自 tools/pid-pdf.json（tools/figmap.py 產生），每筆是
[PDF 目錄, PDF 檔名前綴, 圖檔名前綴（可省略，省略就跟 PDF 前綴一樣）]。找不到對照的卷會跳過並列出來——
牙醫／中醫／藥師的原始 PDF 2026-09-23 當時不在本機，要先用 tools/moex-fetch.py 重抓。
"""
import os, sys, json, time, collections

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)
import cropfig


def main():
    if len(sys.argv) < 2: sys.exit(__doc__)
    src = sys.argv[1]
    limit = int(sys.argv[sys.argv.index('--limit') + 1]) if '--limit' in sys.argv else 0
    match = sys.argv[sys.argv.index('--match') + 1] if '--match' in sys.argv else None
    targets = json.load(open(src, encoding='utf-8'))
    pmap = json.load(open(os.path.join(HERE, 'pid-pdf.json'), encoding='utf-8'))
    done, bad, nomap = collections.defaultdict(dict), [], collections.Counter()
    t0 = time.time(); npaper = nq = 0
    for pid in sorted(targets):
        if match and match not in pid: continue
        if pid not in pmap:
            nomap[pid.split('-')[0]] += len(targets[pid]); continue
        row = pmap[pid]
        work, stem = row[0], row[1]
        img = row[2] if len(row) > 2 else stem      # 教檢的圖檔名有 tea_ 前綴，PDF 檔名沒有
        pdf = os.path.join(work, 'pdf', stem + '_q.pdf')
        pages = None
        for n in targets[pid]:
            fn = 'img/q/%s_%d.webp' % (img, n)
            dst = os.path.join(ROOT, fn)
            if os.path.exists(dst):
                done[pid][n] = fn; continue
            try:
                if pages is None: pages = cropfig.boxes(pdf)
                cropfig.crop(pdf, n, dst, pages=pages)
                done[pid][n] = fn; nq += 1
            except BaseException as e:
                bad.append([pid, n, str(e)[:120]])
        npaper += 1
        if npaper % 20 == 0:
            print('%d 卷／新裁 %d 張／失敗 %d　%.0fs' % (npaper, nq, len(bad), time.time() - t0), flush=True)
        if limit and npaper >= limit: break
    base = src.rsplit('.', 1)[0]
    json.dump(done, open(base + '-done.json', 'w'), ensure_ascii=False, indent=0)
    json.dump(bad, open(base + '-bad.json', 'w'), ensure_ascii=False, indent=1)
    print('完成：%d 卷、新裁 %d 張、失敗 %d、沒有對照表 %s' % (
        len(done), nq, len(bad), dict(nomap) or '無'))
    print('→ %s-done.json' % base)


if __name__ == '__main__':
    main()
