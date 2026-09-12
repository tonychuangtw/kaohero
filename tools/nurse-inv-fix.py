# -*- coding: utf-8 -*-
"""護理師：把 moex-fetch.py 產生的 inv.json 補上正確的次別。

為什麼要這一支：gen_bank.py 預設的次別判斷是「標題有第一次就是 1，否則 2」，
但護理師有兩個例外——
  ① 112、113、114 年各多一次「第三次專門職業及技術人員高等考試護理師考試」
  ② 106 年有兩場都叫第二次：106110 是正常場、106111 是「花東考區補辦考試」
沒處理的話，同一年會產生兩個 nur-<年>-2-<科目>，後生成的會蓋掉先生成的。

用法（在 ~/exam-pdfs/nurse 底下跑）：
  python3 ~/TelegramClaude/kaoguhero/tools/nurse-inv-fix.py
會就地改寫 inv.json，替每一筆補上 nth 與（必要時）ntag。
重複執行不會有副作用。
"""
import json, re, sys, os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import parse as P

CN = '一二三四五六'
work = sys.argv[1] if len(sys.argv) > 1 else '.'
p = os.path.join(work, 'inv.json')
inv = json.load(open(p, encoding='utf-8'))


def head(e):
    """平臺上的 title 會被截斷成「…」，106110 與 106111 兩場截出來一模一樣，
       所以「是不是補辦場」只能從試題 PDF 的表頭判斷。"""
    c, cn, s, sn = e['subs'][0]
    f = os.path.join(work, 'pdf', '%s_%s_%s_q.pdf' % (e['code'], c, s))
    try:
        return re.sub(r'\s+', '', P.text(f)[:600])
    except Exception:
        return ''


for e in inv:
    t = e['title']
    m = re.search(r'第([一二三四五六])次', t)
    n = CN.index(m.group(1)) + 1 if m else 1
    e['nth'] = n
    e.pop('ntag', None)
    # 花東考區補辦：同一年同一次別會撞號，另給一個次別並標明出處
    if '補辦' in head(e):
        e['nth'] = n + 2          # 第二次補辦 → 4，避開既有的 1/2/3
        e['ntag'] = '第%s次（花東考區補辦）' % CN[n - 1]

ids = [(e['code'][:3], e['nth']) for e in inv]
dup = sorted({x for x in ids if ids.count(x) > 1})
if dup:
    sys.exit('還有撞號的（年, 次別）：%s' % dup)

json.dump(inv, open(p, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('已補 nth：%d 次考試；次別分布 %s' %
      (len(inv), sorted({e['nth'] for e in inv})))
