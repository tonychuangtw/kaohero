# -*- coding: utf-8 -*-
"""教檢（高級中等以下學校及幼兒園教師資格考試）題庫轉檔。

跟公職那條線不同的地方：
  ① 一份卷只有前半段是選擇題，後面是綜合題與寫作 → 從「綜合題」那裡切斷，只收選擇題
  ② 國語文能力測驗、數學能力測驗是「全類科」共用的同一份卷（同一個檔案掛在每個類科底下）
     → 用檔案雜湊去重，共用的歸到「共同科目（全類科）」，其餘照類科分
  ③ 類科名稱與科目名稱歷年會改（教育原理與制度 → 教育理念與實務…），科目 key 用註冊表保持穩定

用法（在 ~/exam-pdfs/tqa 底下跑，需有 fetch.py 產生的 inv.json 與 pdf/）：
  python3 ~/TelegramClaude/kaoguhero/tools/gen_tqa.py
產出：out/*.js、outimg/*.webp、tqa-index.json、tqa-skipped.json、figs.json
"""
import os, re, sys, json, hashlib, collections
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import parse as P
import parse_gao as G

LAB = 'ABCD'
HERE = os.path.dirname(os.path.abspath(__file__))
REG = os.path.join(HERE, 'tqa-subjects.json')
# 選擇題到哪裡結束
CUT = re.compile(r'綜合題(?:\s*[（(]占|\s*[（(]第)|寫作題?\s*[（(]占|問答題\s*[（(]占|申論題')
KIND = {'10': '幼兒園師資類科', '21': '特殊教育（身心障礙組）', '22': '特殊教育（資賦優異組）',
        '30': '國民小學師資類科', '40': '中等學校師資類科'}
STAGE = {'common': 1, '10': 2, '30': 3, '40': 4, '21': 5, '22': 5}
STAGE_NAME = {1: '共同科目（全類科）', 2: '幼兒園師資類科', 3: '國民小學師資類科',
              4: '中等學校師資類科', 5: '特殊教育類科'}
SPED = {'21': '身心障礙組', '22': '資賦優異組'}


def canon(sn):
    s = sn.replace(' ', '').replace('　', '')
    return re.sub(r'[（(][^（()）]*[）)]', '', s).strip() or sn.strip()


def load_reg():
    return json.load(open(REG, encoding='utf-8')) if os.path.exists(REG) else {}


def key_of(reg, stage, name):
    k = '%d|%s' % (stage, name)
    if k not in reg:
        n = 1 + sum(1 for v in reg.values() if v['stage'] == stage)
        reg[k] = {'key': 't%d%03d' % (stage, n), 'name': name, 'stage': stage}
    return reg[k]['key']


def md5(p):
    return hashlib.md5(open(p, 'rb').read()).hexdigest()


def parse_paper(qp, nans):
    """只解「選擇題」那一段。-layout 與原始閱讀順序都試一次，挑題數對得上的那個
       —— 舊制（95～102 年）的卷是兩欄排版，-layout 會把左右欄交錯，題號序列整個斷掉。"""
    best = None      # (分數, 題目)；分數越小越好
    for mode in ('layout', 'raw', 'cols', 'cols+', 'cols++', 'cols-'):
        if mode.startswith('cols'):
            t = P.text_cols(qp, shift={'cols': 0.0, 'cols+': 0.02, 'cols++': 0.05, 'cols-': -0.02}[mode])
        else:
            t = P.text(qp, layout=(mode == 'layout'))
        m = CUT.search(t)
        if m: t = t[:m.start()]
        body = '\n'.join(l for l in P.clean_lines(t) if not G.PAGEHDR.match(l))
        flat = P.half(body)
        ws = sorted(G._dw(l.rstrip()) for l in body.split('\n') if l.strip())
        wide = (ws[int(len(ws) * 0.97)] if ws else 999) - 8
        for loose in (False, True):
            qs = G._cut(None, body, flat, G._find_pos(flat, loose), wide)
            G._attach_tail(qs); G._attach_psg(qs, body, flat)
            for q in qs: q.pop('_st', None); q.pop('_tail', None)
            if len(qs) == nans and not any(q.get('needfig') for q in qs): return qs
            # 題數一樣時，挑「缺選項的題數比較少」的那一版（欄位切點差幾點就會切掉選項）
            sc = (abs(len(qs) - nans), sum(1 for q in qs if q.get('needfig')))
            if best is None or sc < best[0]: best = (sc, qs)
    return best[1] if best else []


def main():
    inv = json.load(open('inv.json', encoding='utf-8'))
    reg = load_reg()
    os.makedirs('out', exist_ok=True); os.makedirs('outimg', exist_ok=True)
    # 先看哪些卷是「同一個檔案掛在多個類科底下」＝全類科共同科目
    seen = collections.defaultdict(set)
    files = {}
    for key, v in inv.items():
        for i, name in v['subjects']:
            qp = 'pdf/%s_%s_%d_q.pdf' % (v['year'], v['kind'], i)
            if not os.path.exists(qp): continue
            h = md5(qp)
            seen[h].add(v['kind'])
            files[(v['year'], v['kind'], i)] = (h, name)
    # 科目歸哪一層：同一份卷被三個以上類科共用＝全類科共同科目；只有特教兩組共用＝特殊教育類科；
    # 其餘照該類科。用整份資料的多數決決定，才不會同一科在不同年份跑到不同層。
    per = collections.defaultdict(lambda: collections.defaultdict(set))
    for key, v in inv.items():
        for i, name in v['subjects']:
            kk = (v['year'], v['kind'], i)
            if kk not in files: continue
            h, _ = files[kk]
            per[canon(name)][(v['year'], h)].add(v['kind'])
    stage_of = {}
    for cname, groups in per.items():
        allk = set().union(*groups.values())
        wide = sum(1 for ks in groups.values() if len(ks) >= 3)
        own = sum(1 for ks in groups.values() if len(ks) < 3)
        if wide >= own: stage_of[cname] = 1
        elif allk <= {'21', '22'}: stage_of[cname] = 5
        else:
            kinds_ = collections.Counter(k for ks in groups.values() for k in ks)
            stage_of[cname] = STAGE.get(kinds_.most_common(1)[0][0], 5)
    done, skipped, figs = [], [], []
    made = set()
    for key, v in sorted(inv.items(), key=lambda x: (-int(x[1]['year']), x[1]['kind'])):
        roc, kind = int(v['year']), v['kind']
        for i, name in v['subjects']:
            qp = 'pdf/%s_%s_%d_q.pdf' % (v['year'], kind, i)
            ap = 'pdf/%s_%s_%d_a.pdf' % (v['year'], kind, i)
            if not os.path.exists(qp):
                skipped.append([roc, kind, name, '沒有試題 PDF']); continue
            if not os.path.exists(ap):
                skipped.append([roc, kind, name, '沒有參考答案']); continue
            h, _ = files[(v['year'], kind, i)]
            cname = canon(name)
            # 全類科共用的科目一律歸到「共同科目」那一層（就算某一年只掛在一個類科底下）；
            # 其餘一律照這份卷自己的類科走，才不會同一科在不同年份跑到不同層。
            stage = 1 if stage_of.get(cname) == 1 else STAGE.get(kind, 5)
            if stage == 5 and len(seen[h]) < 2:
                cname = '%s（%s）' % (cname, SPED.get(kind, ''))   # 身障組與資優組各自的卷
            k = key_of(reg, stage, cname)
            pid = 'tea-%03d-1-%s' % (roc, k)   # 民國 94~99 也要補成三位數，id 格式才過得了 test.js
            if (h, stage) in made or pid in [d[0] for d in done]:
                continue                      # 共用卷只收一次
            made.add((h, stage))
            ans = P.parse_answers(ap)
            if not ans:
                skipped.append([roc, kind, name, '答案讀不出來']); continue
            best = parse_paper(qp, len(ans))
            nums = {q['n'] for q in best}
            # 參考答案表偶爾會漏一格（例：106 教育原理與制度第 30 題），
            # 只要題目本身是連號的 1..N、而且答案表的題號都在裡面，就收，漏的那題當送分。
            ok_cnt = (best and nums == set(range(1, len(best) + 1))
                      and set(ans) <= nums and len(best) - len(ans) <= 2)
            if not ok_cnt:
                skipped.append([roc, kind, name, '題數 %d≠答案 %d' % (len(best), len(ans))]); continue
            qs = []
            ok = True
            for q in best:
                item = {'n': q['n'], 'pt': 1, 'type': 'single', 'q': q['q'], 'o': q['o']}
                if q.get('psg'): item['psg'] = q['psg']
                a0 = ans.get(q['n'], '#')
                if q.get('needfig') or a0 not in LAB or len(q['o']) != 4:
                    fn = 'img/q/tea_%d_%s_%d_%d.webp' % (roc, kind, i, q['n'])
                    item['needfig'] = True; item['fig'] = fn
                    item['q'] = '（本題題幹與選項都在圖上，請見下圖作答）'
                    item['o'] = ['', '', '', '']
                    figs.append([qp, q['n'], os.path.join('outimg', os.path.basename(fn)), fn])
                item['a'] = LAB.index(a0) if a0 in LAB else 0
                if a0 not in LAB: item['void'] = True
                qs.append(item)
            paper = {'id': pid, 'cat': 'teacher', 'exam': 'teacher', 'stage': stage,
                     'roc': roc, 'nth': 1, 'code': '%s%s' % (roc, kind), 'subj': k,
                     'title': '%d 年　%s　%s' % (roc, STAGE_NAME[stage], cname),
                     'subjName': cname,
                     'src': '教育部高級中等以下學校及幼兒園教師資格考試網站公開之試題與參考答案',
                     'mins': 80, 'qs': qs}
            js = ('/* %s（%d 題）\n   試題與參考答案為教育部教師資格考試網站公開資料；解析為本站自撰。 */\n'
                  'window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};\n'
                  "window.APP_EXAM_PAPERS['%s'] = %s;\n") % (
                  paper['title'], len(qs), pid, json.dumps(paper, ensure_ascii=False, indent=1))
            open(os.path.join('out', pid + '.js'), 'w', encoding='utf-8').write(js)
            done.append([pid, len(qs)])
    json.dump(reg, open(REG, 'w', encoding='utf-8'), ensure_ascii=False, indent=1, sort_keys=True)
    idx = {'exam': 'teacher',
           'levels': [{'no': n, 'name': STAGE_NAME[n], 'note': ''} for n in sorted(STAGE_NAME)],
           'subjects': {v['key']: {'name': v['name'], 'lvl': v['stage'], 'note': []} for v in reg.values()},
           'tracks': {}}
    json.dump(idx, open('tqa-index.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    json.dump(skipped, open('tqa-skipped.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    json.dump(figs, open('figs.json', 'w', encoding='utf-8'), ensure_ascii=False)
    print('成卷 %d、題 %d、需裁圖 %d、跳過 %d' % (
        len(done), sum(n for _, n in done), len(figs), len(skipped)))
    c = collections.Counter(x[3].split('：')[0].split(' ')[0] for x in skipped)
    if c: print('  跳過原因：', dict(c))


if __name__ == '__main__':
    main()
