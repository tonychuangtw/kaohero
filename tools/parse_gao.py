# -*- coding: utf-8 -*-
"""高普考卷專用的題目解析（醫事類的 parse.py 不動，避免影響已上線的題庫）。

跟醫事類卷不一樣的四件事：
  ① 題號後面可能只有一個空格（英文題「 22 To lower the crime rate...」），
     parse.py 的 strict 規則（要「N.」或 N 後面兩個以上空白）抓不到 → 這裡先 strict 再 loose，
     用標準答案的題數當驗收：抓到的題數要等於答案數才算過。
  ② 英文克漏字的底線是用空白排出來的，norm() 會把它吃掉（「was      to raise」→「was to raise」）
     → 英文題（ASCII 佔多數）的 5 格以上空白換成 ＿＿＿。
  ③ 閱讀測驗／克漏字題組的短文放在「請依下文回答第 N 題至第 M 題：」後面，
     題目本身沒有題幹 → 短文接到該組每一題的題幹前面（前綴【短文】），
     這樣無限刷題單看一題也讀得懂。
  ④ 國文（作文與測驗）要從「乙、測驗部分」以後才開始找題號，前面的作文題不算。
"""
import re, unicodedata
import parse as P

OPT = 'ABCD'
# 102～106 的國文卷把題號 1~10 存成私用區字元 \ue0c6~\ue0cf（一份卷剛好連續十個、各出現一次），
# pdftotext 讀出來不是數字，題號序列就整個斷掉 → 只在「行首」還原成數字，避免誤傷別的用途。
QNUM = re.compile(r'(?m)^([ \t]*)([\ue0c6-\ue0cf])')
PSG = re.compile(r'請依下(?:文|列)(?:短文)?回答第\s*(\d+)\s*題至第\s*(\d+)\s*題[：:]?')
TESTPART = re.compile(r'乙[、,]\s*測驗部分')
# parse.py 的表頭過濾沒收「頁次」，它會混進題目段落把選項拆解弄壞（115 法學第 45 題）
PAGEHDR = re.compile(r'^\s*(?:(頁\s*次|代\s*號|類\s*科|科\s*目)\s*[：:]|\d+\s*年公務人員|全一張|全一頁|[（(]背面[）)])')


def _is_en(s):
    a = sum(1 for c in s if 'a' <= c.lower() <= 'z')
    return a >= 10 and a >= len(s.replace(' ', '')) * 0.5


def _norm(s, en=None):
    if en is None: en = _is_en(s)
    s = s.strip()
    if en: s = re.sub(r'(?<=\S)[ \t]{5,}(?=\S)', ' ＿＿＿ ', s)
    return P.norm(s)


def _find_pos(flat, loose):
    if loose:
        # 107 國文那種題號縮排 5 格的卷：放寬到 8 格，靠「題號要接續」與「題數＝答案數」把關
        rx = re.compile(r'(?m)^[ \t]{0,8}(\d{1,3})(?:[ \t]*[.．、][ \t]*|[ \t]+)(?=\S)')
    else:
        rx = re.compile(r'(?m)^[ \t]{0,1}(\d{1,3})(?:[ \t]*[.．、][ \t]*|[ \t]{2,})')
    pos, want = [], 1
    for m in rx.finditer(flat):
        if int(m.group(1)) == want:
            pos.append((want, m.start(), m.end())); want += 1
    return pos


def _dw(s):
    """顯示寬度：中日韓全形字算 2 欄，才能跟英文行比右邊界。"""
    return sum(2 if unicodedata.east_asian_width(c) in 'WF' else 1 for c in s)


def _split_letterless(seg, stem_col, wide):
    """有些卷（103、115 的法學知識與英文…）選項代號 A~D 在 PDF 裡沒有文字層，
       pdftotext 讀出來只有四段選項文字。用縮排還原：
         · 選項縮排＝比題幹起始欄（stem_col）更深、且出現次數最多的那個縮排
           （題幹折行也會比 stem_col 深，但通常只有一兩行，取眾數就不會被它帶走）
         · 一列可能是 1 欄、2 欄或 4 欄（欄間 3 格以上空白），順序先左後右、先上後下
         · 比選項縮排更深、或前一行寫到右邊界（wide）的單欄列＝上一個選項的折行
       回傳 (題幹, [四個選項]) 或 None。"""
    lines = [l for l in seg.split('\n') if l.strip()]
    if not lines: return None
    ind = [len(l) - len(l.lstrip()) for l in lines]
    cand = [i for i, v in enumerate(ind) if i > 0 and v > stem_col]
    if not cand:
        # 克漏字題：題號、四個選項全在同一行（「41   in addition   however   by the way   consequently」）
        cells = [x for x in re.split(r'[ \t]{3,}', lines[0].strip()) if x]
        if len(cells) == 4: return '', cells
        if len(cells) == 5: return cells[0], cells[1:]
        return None
    cnt = {}
    for i in cand: cnt[ind[i]] = cnt.get(ind[i], 0) + 1
    base = max(cnt, key=lambda v: (cnt[v], v))
    optline = [i for i in cand if ind[i] >= base]
    if not optline: return None
    i0 = optline[0]
    stem = ' '.join(lines[:i0])
    rows = []
    for i in optline:
        parts = [x for x in re.split(r'[ \t]{3,}', lines[i].strip()) if x]
        if ind[i] > base and rows:          # 縮排更深＝上一個選項的折行
            rows[-1][1][-1] += parts[0]; parts = parts[1:]
            if not parts: continue
        rows.append((i, parts))
    # 還是多出來的（折行跟選項同縮排）：一列只有一欄、而且前一列寫得最長的那個，最可能是折行
    while sum(len(r[1]) for r in rows) > 4 and len(rows) > 1:
        cand2 = [j for j in range(1, len(rows)) if len(rows[j][1]) == 1]
        if not cand2: return None
        j = max(cand2, key=lambda j: _dw(lines[rows[j - 1][0]].rstrip()))
        rows[j - 1][1][-1] += rows[j][1][0]
        rows.pop(j)
    cells = [c for r in rows for c in r[1]]
    if len(cells) == 1 and '\u3000' not in cells[0]:
        # 105 國文那種：四個短選項只用「一個空白」分隔，前面的規則會併成一欄
        parts = [x for x in cells[0].split(' ') if x]
        if len(parts) == 4: cells = parts
    if len(cells) != 4: return None
    return stem, cells


QNLINE = re.compile(r'^[ \t]{0,2}\d{1,3}(?:[ \t]*[.．、]|[ \t]+)')


def _split_tail(seg):
    """把「黏在題目後面的題組短文」切出來。
       有些卷沒有『請依下文回答第 N 題至第 M 題』這行（112、108、102 的法學英文克漏字），
       短文就直接跟在上一題的最後一個選項後面，接著幾題只剩四個選項沒有題幹。
       判準：選項之後出現「縮排 ≤2、長度 ≥60 欄、又不是題號開頭」的長行。"""
    lines = seg.split('\n')
    for j in range(1, len(lines)):
        l = lines[j]
        if not l.strip(): continue
        ind = len(l) - len(l.lstrip())
        if ind <= 2 and _dw(l.rstrip()) >= 60 and not QNLINE.match(l):
            return '\n'.join(lines[:j]), '\n'.join(lines[j:]).strip()
    return seg, None


def _cut(qs, body, flat, pos, wide=999):
    out = []
    for i, (n, st, en) in enumerate(pos):
        e0 = pos[i + 1][1] if i + 1 < len(pos) else len(body)
        seg, segf = body[en:e0], flat[en:e0]
        seg, tail = _split_tail(seg)
        segf = segf[:len(seg)] if tail else segf
        idx, p = [], 0
        for L in OPT:
            m = re.compile(r'(?m)(?:^|\s)%s\s*[.．、]\s*' % L).search(segf, p)
            if not m: idx = None; break
            idx.append((m.start(), m.end())); p = m.end()
        if idx is None:
            ls = body.rfind('\n', 0, en)
            pm = PSG.search(segf)          # 題組短文屬於後面那幾題，先切掉再拆選項
            r = _split_letterless(seg[:pm.start()] if pm else seg, en - ls - 1, wide)
            if r:
                en_q = _is_en(seg)
                out.append({'n': n, 'q': _norm(r[0], en_q),
                            'o': [_norm(x, en_q) for x in r[1]], '_st': st, '_tail': tail})
            else:
                out.append({'n': n, 'q': _norm(seg), 'o': [], 'needfig': True, '_st': st, '_tail': tail})
            continue
        stem = seg[:idx[0][0]]
        en_q = _is_en(stem) or _is_en(seg)
        opts = []
        for k in range(4):
            e = idx[k + 1][0] if k + 1 < 4 else len(seg)
            opts.append(_norm(seg[idx[k][1]: e], en_q))
        q = {'n': n, 'q': _norm(stem, en_q), 'o': opts, '_st': st, '_tail': tail}
        if any(not o for o in opts): q['needfig'] = True
        out.append(q)
    return out


def _cut_nonum(body, flat):
    """題號整個沒有文字層時（112、104 的普考國文）：用 A. 選項當切點，一題一塊，題號自己編。"""
    starts = [m.start() for m in re.finditer(r'(?m)^[ \t]*A[ \t]*[.．、]', flat)]
    if not starts: return []
    out = []
    for i, a in enumerate(starts):
        s0 = 0 if i == 0 else ends[-1]
        e0 = starts[i + 1] if i + 1 < len(starts) else len(body)
        seg, segf = body[s0:e0], flat[s0:e0]
        idx, p = [], 0
        for L in OPT:
            m = re.compile(r'(?m)(?:^|\s)%s\s*[.．、]\s*' % L).search(segf, p)
            if not m: idx = None; break
            idx.append((m.start(), m.end())); p = m.end()
        if idx is None: return []
        ends = [s0 + idx[3][1]]
        stem = seg[:idx[0][0]]
        en_q = _is_en(seg)
        opts = []
        for k in range(4):
            e = idx[k + 1][0] if k + 1 < 4 else len(seg)
            opts.append(_norm(seg[idx[k][1]: e], en_q))
        out.append({'n': i + 1, 'q': _norm(stem, en_q), 'o': opts, '_st': s0})
    return out


def _cut_plain(body, wide, expect):
    """題號與選項代號都沒有文字層時（105、103 的國文卷）：純靠縮排還原。
       題幹與選項各自對齊在兩個固定縮排（出現最多的兩個），較淺的是題幹、較深的是選項；
       「淺縮排的行接在選項後面」＝下一題開始。題組短文（「閱讀下文，回答第…題」）
       接到下一題，若再下一題以「承上文」開頭也一併帶上。"""
    lines = [l for l in body.split('\n') if l.strip()]
    if len(lines) < 4: return []
    cnt = {}
    for l in lines:
        v = len(l) - len(l.lstrip()); cnt[v] = cnt.get(v, 0) + 1
    top = sorted(cnt, key=lambda v: -cnt[v])[:2]
    if len(top) < 2: return []
    si, oi = min(top), max(top)
    if oi <= si: return []
    blocks, cur, seen_opt, psg, pend = [], [], False, None, None
    for l in lines:
        v = len(l) - len(l.lstrip())
        if v not in (si, oi):
            if v < si and cur and seen_opt:       # 題組短文夾在兩題中間
                if pend is None: pend = []
                pend.append(l.strip())
            continue
        if v == si and seen_opt and cur:
            blocks.append((cur, psg)); cur = []; seen_opt = False
            if pend is not None: psg = ' '.join(pend); pend = None
        if v == oi: seen_opt = True
        cur.append(l)
    if cur: blocks.append((cur, psg))
    out = []
    for i, (b, ps) in enumerate(blocks):
        r = _split_letterless('\n'.join(b), si, wide)
        if not r: return []
        en_q = _is_en('\n'.join(b))
        q = {'n': i + 1, 'q': _norm(r[0], en_q),
             'o': [_norm(x, en_q) for x in r[1]], '_st': 0}
        if ps: q['psg'] = re.sub(r'\s{2,}', ' ', ps).strip()
        out.append(q)
    # 「承上文」的題沿用前一題的短文
    for i in range(1, len(out)):
        if not out[i].get('psg') and out[i]['q'].startswith(('承上文', '承上題')) and out[i - 1].get('psg'):
            out[i]['psg'] = out[i - 1]['psg']
    return out


def _one(pdf, expect, layout):
    t = P.text(pdf, layout=layout)
    t = QNUM.sub(lambda m: '%s%d. ' % (m.group(1), ord(m.group(2)) - 0xE0C6 + 1), t)
    m = TESTPART.search(t)
    if m: t = t[m.end():]
    body = '\n'.join(l for l in P.clean_lines(t) if not PAGEHDR.match(l))
    flat = P.half(body)
    ws = sorted(_dw(l.rstrip()) for l in body.split('\n') if l.strip())
    wide = (ws[int(len(ws) * 0.97)] if ws else 999) - 8
    best = None
    for loose in (False, True):
        pos = _find_pos(flat, loose)
        qs = _cut(None, body, flat, pos, wide)
        if expect and len(qs) == expect and not any(q.get('needfig') for q in qs):
            best = qs; break
        if best is None or len(qs) > len(best): best = qs
    if expect and (len(best) != expect or any(q.get('needfig') for q in best)):
        for fn in (lambda: _cut_nonum(body, flat), lambda: _cut_plain(body, wide, expect)):
            qs = fn()
            if len(qs) == expect and not any(q.get('needfig') for q in qs):
                best = qs; break
    _attach_tail(best)
    _attach_psg(best, body, flat)
    for q in best or []: q.pop('_st', None); q.pop('_tail', None)
    return best or []


def _attach_tail(best):
    if not best: return
    for i, q in enumerate(best):
        tail = q.pop('_tail', None)
        if not tail: continue
        en = _is_en(tail)
        psg = re.sub(r'\s*\n\s*', ' ' if en else '', tail).strip()
        psg = re.sub(r'[ \t]{2,}', ' ', psg)
        if len(psg) < 60: continue
        hit = 0
        for j in range(i + 1, len(best)):
            if best[j]['q'].strip(): break
            best[j]['psg'] = psg; hit += 1
        if not hit and not q['q'].strip(): q['psg'] = psg


def _attach_psg(best, body, flat):
    """題組短文：抓「請依下文回答第 N 題至第 M 題：」到該組第一題之間的文字，接到該組每一題。"""
    marks = [(int(m.group(1)), int(m.group(2)), m.end()) for m in PSG.finditer(flat)]
    if not (marks and best): return
    by_n = {q['n']: q for q in best}
    for a, b, end in marks:
        q0 = by_n.get(a)
        if not q0 or '_st' not in q0: continue
        txt = body[end: q0['_st']].strip()
        if len(txt) < 40: continue
        en = _is_en(txt)
        psg = re.sub(r'\s*\n\s*', ' ' if en else '', txt).strip()
        psg = re.sub(r'[ \t]{2,}', ' ', psg)
        for n in range(a, b + 1):
            q = by_n.get(n)
            if q: q['psg'] = psg


def parse_questions(pdf, expect=None):
    """回傳 [{n,q,o[4],needfig?,psg?}]；expect＝標準答案的題數。
       先用 -layout（版面對齊，縮排還原用得到），失敗再退回原始閱讀順序
       —— 英文區塊排成兩欄時 -layout 會把題號順序打亂（103 高考法學第 47~50 題）。"""
    qs = _one(pdf, expect, True)
    if expect and (len(qs) != expect or any(q.get('needfig') for q in qs)):
        alt = _one(pdf, expect, False)
        if len(alt) == expect and not any(q.get('needfig') for q in alt):
            return alt
        if expect and len(qs) != expect and len(alt) == expect:
            return alt
    return qs
