# -*- coding: utf-8 -*-
"""考選部 PDF → kaoguhero 的 js/data/exam/<prefix>-<年>-<次別>-<科目>.js

用法（在工作目錄底下跑，該目錄要有 moex-fetch.py 產生的 pdf/ 與 inv.json）：
  python3 ~/TelegramClaude/kaoguhero/tools/gen_bank.py <spec 名稱>
  → 產生 out/*.js 與 outimg/*.webp（暫存），檢查無誤後再搬進 repo，
    接著 node tools/build-index.js --write、node test/test.js、node test/smoke.mjs。

⚠ 先寫暫存、檢查過才搬（醫師卷那次直接覆寫，把人工詳解洗掉過）。
⚠ 圖檔名一定要帶類科代碼 c：同一年不同考試的科目代碼會重複（113020 的醫師與牙醫師都是 11/22），
   只用 (code, s, n) 會蓋掉別的考試的圖。搬檔前務必檢查目的檔不存在。
"""
import os, re, json, sys, subprocess
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import parse as P

LAB = 'ABCD'
CN = '一二三四五六'

def _num(ch):
    return CN.index(ch) + 1

SPECS = {
    # 牙醫師：牙醫學（一）～（六）；一、二為第一階段，三～六為第二階段
    'dentist': {
        'prefix': 'den', 'cat': 'medical', 'exam': 'dentist',
        'pat': r'牙醫學\s*[（(]([一二三四五六])[）)]',
        'key': lambda m: 'dent%d' % _num(m.group(1)),
        'stage': lambda m: 1 if _num(m.group(1)) <= 2 else 2,
        'name': lambda m: '牙醫學（%s）' % m.group(1),
    },
    # 中醫師：中醫基礎醫學（一）（二）為第一階段，中醫臨床醫學（一）～（四）為第二階段
    'cm': {
        'prefix': 'tcm', 'cat': 'medical', 'exam': 'cm',
        'pat': r'中醫(基礎|臨床)醫學\s*[（(]([一二三四])[）)]',
        'key': lambda m: ('cmb' if m.group(1) == '基礎' else 'cmc') + str(_num(m.group(2))),
        'stage': lambda m: 1 if m.group(1) == '基礎' else 2,
        'name': lambda m: '中醫%s醫學（%s）' % (m.group(1), m.group(2)),
    },
    # 藥師：藥學（一）～（六）。⚠ 科目名稱歷年寫法不同——114 年起才叫「藥學(一)(包括藥理學與藥物化學)」，
    #      之前直接寫科目本名（藥理學與藥物化學／藥劑學（包括生物藥劑學）…），要兩種都認。
    'pharm': {
        'prefix': 'pha', 'cat': 'medical', 'exam': 'pharm',
        'resolve': lambda sn: _pharm(sn),
    },
}

_PHARM = [('ph1', '藥理學與藥物化學'), ('ph2', '藥物分析與生藥學'), ('ph3', '藥劑學'),
          ('ph4', '調劑學與臨床藥學'), ('ph5', '藥物治療學'), ('ph6', '藥事行政與法規')]

def _pharm(sn):
    s = sn.replace(' ', '')
    m = re.match(r'藥學[（(]([一二三四五六])[）)]', s)
    k = None
    if m: k = 'ph%d' % _num(m.group(1))
    else:
        for key, pat in _PHARM:
            if s.startswith(pat): k = key; break
    if not k: return None
    i = int(k[2])
    return k, (1 if i <= 3 else 2), '藥學（%s）' % CN[i - 1]

def mins_of(pdf):
    t = P.text(pdf)
    m = re.search(r'考試時間[：:]\s*(\d+)\s*小時\s*(\d+)?\s*分?', t)
    if not m: return 60
    return int(m.group(1)) * 60 + (int(m.group(2)) if m.group(2) else 0)

def subs_of(entry):
    """inv.json 兩種格式都吃：subs 是 list（[[c,cn,s,sn],...]）或 dict（{key:[c,cn,s,sn]}）"""
    v = entry['subs']
    return list(v.values()) if isinstance(v, dict) else v

def build(spec):
    inv = json.load(open('inv.json'))
    os.makedirs('out', exist_ok=True); os.makedirs('outimg', exist_ok=True)
    papers, figs = [], []
    for e in inv:
        code = e['code']; roc = int(code[:3])
        nth = e.get('nth') or (1 if '第一次' in e['title'] else 2)
        for c, cn, s, sn in subs_of(e):
            if 'resolve' in spec:
                r = spec['resolve'](sn)
                if not r: continue
                key, stage, subj_name = r
            else:
                m = re.search(spec['pat'], sn)
                if not m: continue
                key, stage, subj_name = spec['key'](m), spec['stage'](m), spec['name'](m)
            qp = 'pdf/%s_%s_%s_q.pdf' % (code, c, s)
            ap = 'pdf/%s_%s_%s_a.pdf' % (code, c, s)
            mp = 'pdf/%s_%s_%s_m.pdf' % (code, c, s)
            # 交叉驗證：PDF 表頭的科目名稱要跟平臺一致（表頭常換行，讀不到就略過）
            hdr = P.header_info(qp)[1] or ''
            if 'pat' in spec:
                hm = re.search(spec['pat'], hdr)
                if hm and spec['key'](hm) != key:
                    raise SystemExit('%s %s %s 科目不一致：平臺 %s / 表頭 %s' % (code, c, s, key, spec['key'](hm)))
            else:
                hr = spec['resolve'](hdr)
                if hr and hr[0] != key:
                    raise SystemExit('%s %s %s 科目不一致：平臺 %s / 表頭 %s' % (code, c, s, key, hr[0]))
            qs_raw = P.parse_questions(qp)
            ans = P.parse_answers(ap)
            corr = P.parse_corrections(mp) if os.path.exists(mp) else {}
            pid = '%s-%d-%d-%s' % (spec['prefix'], roc, nth, key)
            qs = []
            for q in qs_raw:
                n = q['n']
                item = {'n': n, 'pt': 1, 'type': 'single', 'q': q['q'], 'o': q['o']}
                if q.get('needfig'):
                    item['needfig'] = True
                    fn = 'img/q/%s_%s_%s_%d.webp' % (code, c, s, n)
                    item['fig'] = fn
                    item['q'] = q['q'] or '（本題題幹與選項都在圖上，請見下圖作答）'
                    item['o'] = ['', '', '', '']
                    figs.append([qp, n, os.path.join('outimg', os.path.basename(fn)), fn])
                acc, a0 = corr.get(n), ans.get(n, '#')
                if acc:
                    if len(acc) >= 4: item['void'] = True; item['a'] = 0
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
            papers.append({
                'id': pid, 'cat': spec['cat'], 'exam': spec['exam'], 'stage': stage,
                'roc': roc, 'nth': nth, 'code': code, 'subj': key,
                'title': '%d 年第%s次　%s' % (roc, CN[nth - 1], subj_name),
                'subjName': subj_name,
                'src': '考選部考畢試題查詢平臺公開之試題與標準答案',
                'mins': mins_of(qp), 'qs': qs,
            })
    return papers, figs

def main():
    if len(sys.argv) < 2 or sys.argv[1] not in SPECS:
        sys.exit(__doc__ + '\n可用的 spec：' + '、'.join(SPECS))
    spec = SPECS[sys.argv[1]]
    papers, figs = build(spec)
    ids = [p['id'] for p in papers]
    assert len(set(ids)) == len(ids), '有重複的卷 id：' + str([i for i in ids if ids.count(i) > 1][:5])
    for p in papers:
        js = ('/* %s（%d 題）\n   試題與標準答案為考選部考畢試題查詢平臺公開資料；解析為本站自撰。 */\n'
              'window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};\n'
              "window.APP_EXAM_PAPERS['%s'] = %s;\n") % (
              p['title'], len(p['qs']), p['id'], json.dumps(p, ensure_ascii=False, indent=1))
        open(os.path.join('out', p['id'] + '.js'), 'w', encoding='utf-8').write(js)
    json.dump(figs, open('figs.json', 'w'), ensure_ascii=False)
    print('卷 %d、題 %d、需裁圖 %d、送分 %d、多答案 %d' % (
        len(papers), sum(len(p['qs']) for p in papers), len(figs),
        sum(1 for p in papers for q in p['qs'] if q.get('void')),
        sum(1 for p in papers for q in p['qs'] if q.get('alt'))))

if __name__ == '__main__':
    main()
