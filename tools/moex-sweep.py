# -*- coding: utf-8 -*-
"""考選部：先把某次考試「每一份不同的試卷」的標準答案抓下來，用來判斷哪些是選擇題卷。

高普考一年 800~1200 個 (類科, 科目) 列，但同一份卷會掛在幾十個類科底下（科目代碼 s 相同），
所以先用 s 去重，一份卷只抓一次；申論卷沒有標準答案（t=S 回非 PDF），正好當篩選條件。

用法（工作目錄需有 inv-full.py 產生的 rows-<roc>.json）：
  python3 tools/moex-sweep.py <工作目錄> [S|Q|M]
產出：pdf/<code>_<c>_<s>_{a,q,m}.pdf、sweep-<t>.log
"""
import sys, os, json, glob, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import moexlib as M

TAG = {'Q': 'q', 'S': 'a', 'M': 'm'}

def picks(work):
    """[(code, c, s, sn, cn)]：每個 (code, s) 取第一個類科"""
    out = []
    for fn in sorted(glob.glob(os.path.join(work, 'rows-*.json'))):
        d = json.load(open(fn))
        seen = set()
        for c, cn, s, sn in d['rows']:
            if s in seen: continue
            seen.add(s)
            out.append((d['code'], c, s, sn, cn))
    return out

def main():
    work = sys.argv[1]
    t = sys.argv[2] if len(sys.argv) > 2 else 'S'
    arg3 = sys.argv[3] if len(sys.argv) > 3 else None
    # --has-answer：只抓「已經有標準答案」的那些卷（申論卷不用抓試題）
    only = None
    if arg3 == '--has-answer':
        only = set(f[:-6] for f in os.listdir(os.path.join(work, 'pdf')) if f.endswith('_a.pdf'))
    elif arg3:
        only = set(json.load(open(arg3)))
    os.makedirs(os.path.join(work, 'pdf'), exist_ok=True)
    ps = picks(work)
    got = miss = skip = 0
    log = open(os.path.join(work, 'sweep-%s.log' % t), 'a')
    for i, (code, c, s, sn, cn) in enumerate(ps):
        stem = '%s_%s_%s' % (code, c, s)
        if only is not None and stem not in only: continue
        p = os.path.join(work, 'pdf', '%s_%s.pdf' % (stem, TAG[t]))
        mark = os.path.join(work, 'pdf', '%s_%s.none' % (stem, TAG[t]))
        if os.path.exists(p) or os.path.exists(mark): skip += 1; continue
        try:
            r = M.download(code, c, s, t, p)
        except Exception as e:
            log.write('ERR %s %s\n' % (stem, e)); log.flush(); time.sleep(3); continue
        if r is None:
            open(mark, 'w').close(); miss += 1
        else:
            got += 1
        if i % 100 == 0:
            log.write('%d/%d got=%d none=%d skip=%d\n' % (i, len(ps), got, miss, skip)); log.flush()
        time.sleep(0.05)
    log.write('DONE %s got=%d none=%d skip=%d\n' % (t, got, miss, skip)); log.flush()
    print('DONE', t, 'got', got, 'none', miss, 'skip', skip)

if __name__ == '__main__':
    main()
