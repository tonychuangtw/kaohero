# -*- coding: utf-8 -*-
"""考選部考畢試題平臺：把某一種考試（類科名稱關鍵字）的歷年試題與答案整批抓下來。

用法：
  python3 tools/moex-fetch.py 牙醫師 <工作目錄> [起始民國年] [結束民國年]
會在工作目錄產生：
  pdf/<code>_<c>_<s>_{q,a,m}.pdf   q=試題 a=標準答案 m=更正答案（沒有就不會有）
  inv.json                          [{code, title, subs:[[c, 類科名, s, 科目名], ...]}]

⚠ 查舊年份一定要先把年度下拉切過去再查（moexlib.exam_subjects 已內建），
   不然回傳會是空的——102～114 曾經整批掃出 0 卷就是這個原因。
"""
import sys, os, json, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import moexlib as M

def main():
    if len(sys.argv) < 3: sys.exit(__doc__)
    kw, work = sys.argv[1], sys.argv[2]
    y0 = int(sys.argv[3]) if len(sys.argv) > 3 else 102
    y1 = int(sys.argv[4]) if len(sys.argv) > 4 else 115
    os.makedirs(os.path.join(work, 'pdf'), exist_ok=True)
    inv = []
    for roc in range(y0, y1 + 1):
        try: codes = M.year_codes(roc + 1911)
        except Exception as e:
            print('年度 %d 取代碼失敗：%s' % (roc, e)); continue
        for code, title in codes:
            if kw not in title: continue
            subs = [t for t in M.exam_subjects(code, roc + 1911) if kw in t[1]]
            if not subs: continue
            inv.append({'code': code, 'title': title, 'subs': subs})
            print(roc, code, len(subs), '卷')
            time.sleep(0.2)
    got = miss = 0
    for e in inv:
        for c, cn, s, sn in e['subs']:
            for t, tag in (('Q', 'q'), ('S', 'a'), ('M', 'm')):
                p = os.path.join(work, 'pdf', '%s_%s_%s_%s.pdf' % (e['code'], c, s, tag))
                if os.path.exists(p): continue
                r = M.download(e['code'], c, s, t, p)
                if r is None:
                    if t != 'M': miss += 1
                else: got += 1
    json.dump(inv, open(os.path.join(work, 'inv.json'), 'w'), ensure_ascii=False, indent=1)
    print('共 %d 次考試、%d 卷；下載 %d 檔，必要檔缺 %d' %
          (len(inv), sum(len(e['subs']) for e in inv), got, miss))

if __name__ == '__main__':
    main()
