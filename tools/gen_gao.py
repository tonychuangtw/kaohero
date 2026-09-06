# -*- coding: utf-8 -*-
"""高普考（公務人員高等考試三級考試暨普通考試）題庫轉檔。

跟醫事類（gen_bank.py）分開寫，因為高普考多了三件事：
  ① 一年 800~1,200 個「類科×科目」，但同一份卷掛在幾十個類科底下 → 以科目代碼 s 去重，
     同時把「這份卷屬於哪些類科」記下來，之後拿來長出「等別 → 類群 → 類科 → 科目」的分類樹。
  ② 科目名稱跨年份會變（國文（作文、公文與測驗）→ 國文（作文與測驗）），
     所以用「去掉括號說明後的名字」當同一科，變體名字收進 note。
  ③ 只有選擇題卷做得起來：申論卷沒有標準答案（平臺 t=S 回非 PDF），直接跳過。

用法（在工作目錄裡跑，需有 rows-<roc>.json 與 pdf/）：
  python3 ~/TelegramClaude/kaoguhero/tools/gen_gao.py [--figs] [--limit N]
產出：out/<pid>.js、outimg/*.webp、gao-index.json、gao-skipped.json
"""
import os, re, sys, json, glob, collections
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import parse as P
import parse_gao as G

LAB = 'ABCD'
LVL = {'高考三級': 1, '普通考試': 2}
LVLKEY = {1: 'g', 2: 'p'}
REG = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'gao-subjects.json')


def sane(qs):
    """卷級健康檢查：題數對得上不代表內容是對的。
       實際踩過的三種爛掉的樣子——題幹空掉只剩單一字母選項、選項裡混進別的選項代號
       （「在 A、B 兩人…」被當成 A. 選項）、選項空白（黏到下一題）。有一題爛就整卷不收。"""
    bad = []
    for q in qs:
        if q.get('needfig'): continue
        st = (q['q'] or '').strip()
        if len(st) < 8 and not q.get('psg'): bad.append((q['n'], '題幹過短'))
        for o in q['o']:
            o = (o or '').strip()
            if not o: bad.append((q['n'], '空選項'))
            elif re.search(r'(?:^|\s)[A-D]\s*[.．、]\s*\S', o): bad.append((q['n'], '選項裡混到別的選項代號'))
        # 單字母選項（K／N／M 這種）＝版面被拆爛了；真的很短的選項（「縣」「0」「50/3」）是正常的，不能一起擋
        if sum(1 for o in q['o'] if len((o or '').strip()) == 1 and (o or '').strip().isascii()
               and (o or '').strip().isalpha()) >= 3:
            bad.append((q['n'], '選項只剩單一字母'))
    return bad


def mins_of(pdf, nq):
    """卷首的「考試時間」。國文（作文與測驗）的 2 小時大半是寫作文，本站只收「乙、測驗部分」，
       所以那種卷改用 3 分鐘/題（取整到 5 分）估，不要標成 120 分鐘誤導人。"""
    t = P.text(pdf)
    if G.TESTPART.search(t):
        return max(15, int(round(nq * 3 / 5.0)) * 5)
    m = re.search(r'考試時間[：:]\s*(\d+)\s*小時\s*(\d+)?\s*分?', t)
    if not m: return 60
    return int(m.group(1)) * 60 + (int(m.group(2)) if m.group(2) else 0)


def canon(sn):
    """科目名稱正規化：去掉括號裡的說明，(一)(二) 這種序號要保留。"""
    s = sn.replace(' ', '').replace('　', '')
    s = re.sub(r'[（(](?![一二三四五六七八九十]\s*[）)])[^（()）]*[）)]', '', s)
    return s.strip() or sn.strip()


def load_reg():
    return json.load(open(REG, encoding='utf-8')) if os.path.exists(REG) else {}


def save_reg(reg):
    json.dump(reg, open(REG, 'w', encoding='utf-8'), ensure_ascii=False, indent=1, sort_keys=True)


def key_of(reg, lvl, name):
    k = '%d|%s' % (lvl, name)
    if k not in reg:
        n = 1 + sum(1 for v in reg.values() if v['lvl'] == lvl)
        reg[k] = {'key': '%s%03d' % (LVLKEY[lvl], n), 'name': name, 'lvl': lvl}
    return reg[k]['key']


def papers_of(work):
    """[(roc, code, c, cn(第一個類科), s, sn, [所有類科名])]，每份卷一筆"""
    out = []
    for fn in sorted(glob.glob(os.path.join(work, 'rows-*.json'))):
        d = json.load(open(fn))
        roc = int(os.path.basename(fn)[5:8])
        seen = collections.OrderedDict()
        for c, cn, s, sn in d['rows']:
            e = seen.setdefault(s, {'c': c, 'cn': cn, 'sn': sn, 'tracks': []})
            if cn and cn not in e['tracks']: e['tracks'].append(cn)
        for s, e in seen.items():
            out.append((roc, d['code'], e['c'], e['cn'], s, e['sn'], e['tracks']))
    return out


def collisions(rows):
    """同一年、同一等別、同名卻是兩份不同的卷（例：行政法有「一般行政組」與「法制組」兩份）。
       回傳會撞號的 (等別, 正規化科目名) 集合——這些科目一律用「主類科」加註區分，
       而且是整個科目家族都加註（不要有的年份加、有的年份不加，那會變成兩個不相干的科目）。"""
    seen, dup = {}, set()
    for roc, code, c, cn, s_, sn, trs in rows:
        lvl = LVL.get((cn or '').split('_')[0])
        if not lvl: continue
        k = (roc, lvl, canon(sn))
        if k in seen and seen[k] != s_: dup.add((lvl, canon(sn)))
        seen[k] = s_
    return dup


def primary(trs, lvl):
    """這份卷的「主類科」＝平臺列出來的第一個類科（順序穩定，跨年份不會亂跳）。"""
    for t in trs:
        if LVL.get(t.split('_')[0]) == lvl:
            tn = t.split('_', 1)[1] if '_' in t else t
            return re.sub(r'[（(]選試[^）)]*[）)]', '', tn).strip()
    return ''


def main():
    work = os.getcwd()
    want_figs = '--figs' in sys.argv
    limit = int(sys.argv[sys.argv.index('--limit') + 1]) if '--limit' in sys.argv else 0
    reg = load_reg()
    os.makedirs('out', exist_ok=True); os.makedirs('outimg', exist_ok=True)
    rows = [r for r in papers_of(work)
            if os.path.exists('pdf/%s_%s_%s_a.pdf' % (r[1], r[2], r[4]))]
    dup = collisions(rows)
    done, skipped, figs = [], [], []
    tracks = collections.defaultdict(lambda: collections.defaultdict(set))   # lvl → 類科 → {key}
    notes = collections.defaultdict(set)
    for roc, code, c, cn, s, sn, trs in papers_of(work):
        ap = 'pdf/%s_%s_%s_a.pdf' % (code, c, s)
        qp = 'pdf/%s_%s_%s_q.pdf' % (code, c, s)
        mp = 'pdf/%s_%s_%s_m.pdf' % (code, c, s)
        if not os.path.exists(ap): continue          # 申論卷
        if not os.path.exists(qp):
            skipped.append([roc, code, s, sn, '沒有試題 PDF']); continue
        lvl = LVL.get((cn or '').split('_')[0])
        if not lvl:
            skipped.append([roc, code, s, sn, '無法判斷等別：' + cn]); continue
        name = canon(sn)
        if (lvl, name) in dup:
            pr = primary(trs, lvl)
            if pr: name = '%s（%s組）' % (name, pr)
        key = key_of(reg, lvl, name)
        notes[key].add(sn)
        for t in trs:
            tn = t.split('_', 1)[1] if '_' in t else t
            tn = re.sub(r'[（(]選試[^）)]*[）)]', '', tn).strip()   # 僑務行政(選試英文/法文…) 併成同一個類科
            if LVL.get(t.split('_')[0]) == lvl: tracks[lvl][tn].add(key)
        ans = P.parse_answers(ap)
        if not ans:
            skipped.append([roc, code, s, sn, '答案讀不出來']); continue
        try:
            qs_raw = G.parse_questions(qp, expect=len(ans))
        except Exception as ex:
            skipped.append([roc, code, s, sn, '解析失敗：%s' % ex]); continue
        if len(qs_raw) != len(ans):
            skipped.append([roc, code, s, sn, '題數 %d≠答案 %d' % (len(qs_raw), len(ans))]); continue
        corr = P.parse_corrections(mp) if os.path.exists(mp) else {}
        pid = 'gao-%d-1-%s' % (roc, key)   # 第三段固定 1（高普考一年一次），等別在 key 的 g/p 前綴
        qs = []
        for q in qs_raw:
            n = q['n']
            item = {'n': n, 'pt': 1, 'type': 'single', 'q': q['q'], 'o': q['o']}
            if q.get('psg'):
                item['psg'] = q['psg']
                if not item['q']: item['q'] = '（依上面的短文，選出最適當的答案）'
            if q.get('needfig'):
                fn = 'img/q/%s_%s_%s_%d.webp' % (code, c, s, n)
                item['needfig'] = True; item['fig'] = fn
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
                if a0 not in LAB:
                    skipped.append([roc, code, s, sn, '答案異常 %r' % a0]); qs = None; break
                item['a'] = LAB.index(a0)
            qs.append(item)
        if qs is None: continue
        # 少數幾題解析爛掉（版面拆錯）時不要整卷丟掉：那幾題改成裁原卷的圖來作答；
        # 爛超過四成才判定這一卷不能收。
        prob = sorted({n for n, _ in sane(qs)})
        if prob and len(prob) > max(3, len(qs) * 0.4):
            skipped.append([roc, code, s, sn, '內容檢查不過（%d/%d 題）：%s' % (
                len(prob), len(qs), '、'.join('#%d %s' % x for x in sane(qs)[:3]))])
            continue
        for n in prob:
            item = [q for q in qs if q['n'] == n][0]
            fn = 'img/q/%s_%s_%s_%d.webp' % (code, c, s, n)
            item['needfig'] = True; item['fig'] = fn
            item['q'] = '（本題題幹與選項都在圖上，請見下圖作答）'
            item['o'] = ['', '', '', '']
            item.pop('psg', None)
            figs.append([qp, n, os.path.join('outimg', os.path.basename(fn)), fn])
        lvname = '高考三級' if lvl == 1 else '普通考試'
        paper = {'id': pid, 'cat': 'civil', 'exam': 'gao', 'stage': lvl,
                 'roc': roc, 'nth': 1, 'code': code, 'subj': key,
                 'title': '%d 年　%s　%s' % (roc, lvname, name),
                 'subjName': name,
                 'src': '考選部考畢試題查詢平臺公開之試題與標準答案',
                 'mins': mins_of(qp, len(qs)), 'qs': qs}
        js = ('/* %s（%d 題）\n   試題與標準答案為考選部考畢試題查詢平臺公開資料；解析為本站自撰。 */\n'
              'window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};\n'
              "window.APP_EXAM_PAPERS['%s'] = %s;\n") % (
              paper['title'], len(qs), pid, json.dumps(paper, ensure_ascii=False, indent=1))
        open(os.path.join('out', pid + '.js'), 'w', encoding='utf-8').write(js)
        done.append([pid, len(qs)])
        if limit and len(done) >= limit: break
    save_reg(reg)
    idx = {'subjects': {v['key']: {'name': v['name'], 'lvl': v['lvl'],
                                   'note': sorted(notes[v['key']])} for v in reg.values()
                        if v['key'] in notes},
           'tracks': {str(l): {t: sorted(ks) for t, ks in sorted(d.items())} for l, d in tracks.items()}}
    json.dump(idx, open('gao-index.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    json.dump(skipped, open('gao-skipped.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    json.dump(figs, open('figs.json', 'w', encoding='utf-8'), ensure_ascii=False)
    print('成卷 %d、題 %d、需裁圖 %d、跳過 %d' % (
        len(done), sum(n for _, n in done), len(figs), len(skipped)))
    if skipped:
        c2 = collections.Counter(x[4].split('：')[0].split(' ')[0] for x in skipped)
        print('  跳過原因：', dict(c2))


if __name__ == '__main__':
    main()
