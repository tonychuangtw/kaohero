# -*- coding: utf-8 -*-
"""牙醫師卷：考選部 PDF → kaoguhero 的 js/data/exam/den-*.js

流程（在一個工作目錄底下跑，該目錄要有 moex-fetch.py 產生的 pdf/ 與 inv.json）：
  python3 tools/moex-fetch.py 牙醫師 <工作目錄>
  cd <工作目錄> && python3 ~/TelegramClaude/kaoguhero/tools/gen_dent.py
  → 產生 out/*.js 與 outimg/*.webp（暫存），確認無誤再搬進 repo，
    然後 node tools/build-index.js --write、node test/test.js。

⚠ 先寫暫存、檢查過才搬（醫師卷那次直接覆寫，把人工詳解洗掉過）。
⚠ 圖檔名一定要帶類科代碼 c：113020 這種年份，醫師與牙醫師的 s 都是 11/22，
   只用 (code, s, n) 會蓋掉醫師卷的圖。
"""
import os, re, json, sys, subprocess, shutil
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import parse as P

REPO = os.path.expanduser('~/TelegramClaude/kaoguhero')
OUT = 'out'          # 暫存
IMG = 'outimg'       # 暫存圖
LAB = 'ABCD'
SUBJ_NO = {'一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6}
CN = '一二三四五六'

def subj_of(subject_name):
    m = re.search(r'牙醫學\s*[（(]([一二三四五六])[）)]', subject_name)
    if not m: return None
    k = SUBJ_NO[m.group(1)]
    return 'dent%d' % k, k

def mins_of(pdf):
    t = P.text(pdf)
    m = re.search(r'考試時間[：:]\s*(\d+)\s*小時\s*(\d+)?\s*分?', t)
    if not m: return 60
    return int(m.group(1)) * 60 + (int(m.group(2)) if m.group(2) else 0)

def build():
    inv = json.load(open('inv.json' if os.path.exists('inv.json') else 'dent_inv.json'))
    os.makedirs(OUT, exist_ok=True); os.makedirs(IMG, exist_ok=True)
    papers, figs = [], []
    for e in inv:
        code = e['code']; roc = int(code[:3])
        nth = 1 if '第一次' in e['title'] else 2
        for c, cn, s, sn in e['subs']:
            qp = 'pdf/%s_%s_%s_q.pdf' % (code, c, s)
            ap = 'pdf/%s_%s_%s_a.pdf' % (code, c, s)
            mp = 'pdf/%s_%s_%s_m.pdf' % (code, c, s)
            # 科目以平臺的科目名稱為準，並用 PDF 表頭交叉驗證（表頭常換行，讀不到就跳過檢查）
            _, hdr = P.header_info(qp)
            key, k = subj_of(sn)
            hs = subj_of(hdr or '')
            if hs and hs[0] != key:
                raise SystemExit('%s %s %s 科目不一致：平臺 %s / 表頭 %s' % (code, c, s, key, hs[0]))
            stage = 1 if k <= 2 else 2
            qs_raw = P.parse_questions(qp)
            ans = P.parse_answers(ap)
            corr = P.parse_corrections(mp) if os.path.exists(mp) else {}
            pid = 'den-%d-%d-%s' % (roc, nth, key)
            qs = []
            for q in qs_raw:
                n = q['n']
                acc = corr.get(n)
                a0 = ans.get(n, '#')
                item = {'n': n, 'pt': 1, 'type': 'single', 'q': q['q'], 'o': q['o']}
                if q.get('needfig'):
                    item['needfig'] = True
                    # ⚠ 檔名一定要帶類科代碼 c：113020 這種年份裡，醫師與牙醫師的 s 都是 11/22，只用 (code,s,n) 會撞名蓋掉醫師的圖
                    fn = 'img/q/%s_%s_%s_%d.webp' % (code, c, s, n)
                    item['fig'] = fn
                    item['q'] = q['q'] or '（本題題幹與選項都在圖上，請見下圖作答）'
                    item['o'] = ['', '', '', '']   # 沿用醫師卷的做法：選項留空，前端顯示「（見上圖）」
                    figs.append((qp, n, os.path.join(IMG, os.path.basename(fn)), fn))
                if acc:
                    if len(acc) >= 4:
                        item['void'] = True; item['a'] = 0
                    else:
                        idx = sorted(LAB.index(x) for x in acc if x in LAB)
                        item['a'] = idx[0]
                        if len(idx) > 1: item['alt'] = idx[1:]
                elif a0 == '#':
                    item['void'] = True; item['a'] = 0
                else:
                    if a0 not in LAB: raise SystemExit('%s #%d 答案異常 %r' % (pid, n, a0))
                    item['a'] = LAB.index(a0)
                qs.append(item)
            paper = {
                'id': pid, 'cat': 'medical', 'exam': 'dentist', 'stage': stage,
                'roc': roc, 'nth': nth, 'code': code, 'subj': key,
                'title': '%d 年第%s次　牙醫學（%s）' % (roc, '一二'[nth - 1], CN[k - 1]),
                'subjName': '牙醫學（%s）' % CN[k - 1],
                'src': '考選部考畢試題查詢平臺公開之試題與標準答案',
                'mins': mins_of(qp), 'qs': qs,
            }
            papers.append(paper)
    return papers, figs

def write(papers):
    for p in papers:
        js = ('/* %s（%d 題）\n   試題與標準答案為考選部考畢試題查詢平臺公開資料；解析為本站自撰。 */\n'
              'window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};\n'
              "window.APP_EXAM_PAPERS['%s'] = %s;\n") % (p['title'], len(p['qs']), p['id'], json.dumps(p, ensure_ascii=False, indent=1))
        open(os.path.join(OUT, p['id'] + '.js'), 'w', encoding='utf-8').write(js)

if __name__ == '__main__':
    papers, figs = build()
    write(papers)
    json.dump([[a, b, c, d] for a, b, c, d in figs], open('figs.json', 'w'), ensure_ascii=False)
    print('卷', len(papers), '題', sum(len(p['qs']) for p in papers), '需裁圖', len(figs))
    from collections import Counter
    print('void', sum(1 for p in papers for q in p['qs'] if q.get('void')),
          'alt', sum(1 for p in papers for q in p['qs'] if q.get('alt')))
