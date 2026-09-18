# -*- coding: utf-8 -*-
"""考選部 PDF → kaohero 的 js/data/exam/<prefix>-<年>-<次別>-<科目>.js

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
    # 護理師：單一階段五科，102～115 的科目名稱完全一致（實測 32 次考試、每個名稱各出現 32 次）。
    # ⚠ 次別不能只靠「第一次／否則第二次」：112～114 有第三次，106 有「花東考區補辦考試」，
    #   所以 inv.json 要先用 tools/nurse-inv-fix.py 補上 nth 與 ntag（見該檔）。
    'nurse': {
        'prefix': 'nur', 'cat': 'medical', 'exam': 'nurse',
        'resolve': lambda sn: _nurse(sn),
    },
    # 其他醫事類（2026-09-19 加）：醫事檢驗師、物理治療師、職能治療師、營養師。
    # 四種都是單一階段六科，且共用同一份 inv.json（~/exam-pdfs/med4），所以一定要有 track
    # 把類科分開——不然不同類科的同名科目（例：職能「解剖學與生理學」vs 營養「生理學與生物化學」）
    # 會撞在一起。⚠ 平臺的類科名前綴歷年寫法不一（專技高考_／高考_／高等_／高等考試_），
    # 只能比對後半的類科名，不能比對整串。
    'mlt': {
        'prefix': 'mlt', 'cat': 'medical', 'exam': 'mlt',
        'track': lambda cn: '醫事檢驗師' in cn,
        'resolve': lambda sn: _bysub(_MLT, sn),
    },
    'pt': {
        'prefix': 'pt', 'cat': 'medical', 'exam': 'pt',
        'track': lambda cn: '物理治療師' in cn,
        'resolve': lambda sn: _bysub(_PT, sn),
    },
    'ot': {
        'prefix': 'ot', 'cat': 'medical', 'exam': 'ot',
        'track': lambda cn: '職能治療師' in cn,
        'resolve': lambda sn: _bysub(_OT, sn),
    },
    'nut': {
        'prefix': 'nut', 'cat': 'medical', 'exam': 'nut',
        'track': lambda cn: '營養師' in cn,
        'resolve': lambda sn: _bysub(_NUT, sn),
    },
}

# [(科目代碼, (平臺／PDF 表頭可能出現的開頭字樣, ...), 站上顯示名稱)]，單一階段所以 stage 固定 1
_MLT = [('mlt1', ('臨床生理學',), '臨床生理學與病理學'),
        ('mlt2', ('臨床血液學',), '臨床血液學與血庫學'),
        ('mlt3', ('生物化學',), '生物化學與臨床生化學'),
        ('mlt4', ('臨床血清免疫學',), '臨床血清免疫學與臨床病毒學'),
        # 102～103 年叫「臨床鏡檢學（包括寄生蟲學）」，之後改叫「醫學分子檢驗學與臨床鏡檢學」
        ('mlt5', ('醫學分子檢驗學', '臨床鏡檢學'), '醫學分子檢驗學與臨床鏡檢學'),
        ('mlt6', ('微生物學',), '微生物學與臨床微生物學')]

_PT = [('pt1', ('物理治療基礎學',), '物理治療基礎學'),
       ('pt2', ('物理治療學概論',), '物理治療學概論'),
       ('pt3', ('物理治療技術學',), '物理治療技術學'),
       ('pt4', ('神經疾病物理治療學',), '神經疾病物理治療學'),
       ('pt5', ('骨科疾病物理治療學',), '骨科疾病物理治療學'),
       ('pt6', ('心肺疾病與小兒疾病物理治療學', '心肺疾病物理治療學'), '心肺疾病與小兒疾病物理治療學')]

_OT = [('ot1', ('解剖學與生理學',), '解剖學與生理學'),
       ('ot2', ('職能治療學概論',), '職能治療學概論'),
       ('ot3', ('生理障礙職能治療學',), '生理障礙職能治療學'),
       ('ot4', ('心理障礙職能治療學',), '心理障礙職能治療學'),
       ('ot5', ('小兒職能治療學',), '小兒職能治療學'),
       ('ot6', ('職能治療技術學',), '職能治療技術學')]

_NUT = [('nut1', ('生理學與生物化學',), '生理學與生物化學'),
        ('nut2', ('營養學',), '營養學'),
        ('nut3', ('膳食療養學',), '膳食療養學'),
        ('nut4', ('團體膳食設計與管理',), '團體膳食設計與管理'),
        ('nut5', ('公共衛生營養學',), '公共衛生營養學'),
        ('nut6', ('食品衛生與安全',), '食品衛生與安全')]


def _bysub(table, sn):
    s = sn.replace(' ', '').replace('\u3000', '')
    for key, pats, name in table:
        if any(s.startswith(x) for x in pats): return key, 1, name
    return None

_NURSE = [('nur1', '基礎醫學', '基礎醫學'),
          ('nur2', '基本護理學', '基本護理學與護理行政'),
          ('nur3', '內外科護理學', '內外科護理學'),
          ('nur4', '產兒科護理學', '產兒科護理學'),
          ('nur5', '精神科與社區衛生護理學', '精神科與社區衛生護理學')]


def _nurse(sn):
    s = sn.replace(' ', '').replace('　', '')
    for key, pat, name in _NURSE:
        if s.startswith(pat): return key, 1, name
    return None

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

def build(spec, lenient=False):
    inv = json.load(open('inv.json'))
    os.makedirs('out', exist_ok=True); os.makedirs('outimg', exist_ok=True)
    papers, figs, skipped = [], [], []
    for e in inv:
        code = e['code']; roc = int(code[:3])
        nth = e.get('nth') or (1 if '第一次' in e['title'] else 2)
        for c, cn, s, sn in subs_of(e):
            # 同一份 inv.json 裡混了好幾個類科時（例：med4 一次抓四種醫事人員），
            # 用 track 只收這個 spec 要的類科，否則不同類科的同名科目會撞在一起。
            if 'track' in spec and not spec['track'](cn): continue
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
            bad = None
            if 'pat' in spec:
                hm = re.search(spec['pat'], hdr)
                if hm and spec['key'](hm) != key:
                    bad = '%s %s %s 科目不一致：平臺 %s / 表頭 %s' % (code, c, s, key, spec['key'](hm))
            else:
                hr = spec['resolve'](hdr)
                if hr and hr[0] != key:
                    bad = '%s %s %s 科目不一致：平臺 %s / 表頭 %s' % (code, c, s, key, hr[0])
            if bad:
                if not lenient: raise SystemExit(bad)
                skipped.append(bad); continue
            ans = P.parse_answers(ap)
            # 整份是掃描影像、抽不出文字的卷（例：護理師 108020_106_0505）先跳過並印出來，
            # 不要硬切成 0 題收進題庫。要收的話得先 OCR，這台目前沒有 tesseract。
            if len(P.text(qp)) < 2000:
                skipped.append('%s %s %s（%s）PDF 無可抽取文字，需 OCR' % (code, c, s, sn[:14]))
                continue
            # 先嚴格切題；題數與答案張數對不上就用 relaxed（題號後只隔一個空白）重切。
            # ⚠ 兩種都對不上一律中止：以前沒有這一關，被截斷的卷會默默少收題。
            qs_raw = P.parse_questions(qp)
            if len(qs_raw) != len(ans):
                alt = P.parse_questions(qp, relaxed=True)
                if len(alt) == len(ans): qs_raw = alt
                elif len(alt) > len(qs_raw): qs_raw = alt
            if len(qs_raw) != len(ans):
                msg = ('%s %s %s（%s）題數 %d ≠ 答案 %d，先修 parse 再跑'
                       % (code, c, s, sn[:14], len(qs_raw), len(ans)))
                if not lenient: raise SystemExit(msg)
                skipped.append(msg); continue
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
                # ntag 讓 inv.json 可以覆寫次別的顯示文字（例：106 年的「第二次花東考區補辦」），
                # 沒給就照 nth 生成「第 N 次」。
                'title': '%d 年%s　%s' % (roc, e.get('ntag') or ('第%s次' % CN[nth - 1]), subj_name),
                'subjName': subj_name,
                'src': '考選部考畢試題查詢平臺公開之試題與標準答案',
                'mins': mins_of(qp), 'qs': qs,
            })
    if skipped:
        print('⚠ 跳過 %d 卷：' % len(skipped))
        for x in skipped: print('   ' + x)
    return papers, figs

def main():
    if len(sys.argv) < 2 or sys.argv[1] not in SPECS:
        sys.exit(__doc__ + '\n可用的 spec：' + '、'.join(SPECS))
    spec = SPECS[sys.argv[1]]
    # --lenient：轉一整批（例：其他醫事類 636 卷）時，個別卷壞掉不要整批中止，
    #            改成跳過並在最後列出來；⛔ 不是「默默收下」，跳掉的一定會印出來。
    papers, figs = build(spec, lenient='--lenient' in sys.argv)
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
