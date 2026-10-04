# -*- coding: utf-8 -*-
"""psg-recover.py — 閱讀測驗／克漏字題組的文章在轉檔時掉了，從原始 PDF 把文章救回來（2026-10-04）。

起因：exp-skips.json 裡約 1,650 題的跳過理由是「閱讀測驗題組本文未提供」。文章其實在 PDF 裡，
parse_gao 只認得「請依下文回答第 N 題至第 M 題」那種引導語，沒有引導語的卷（導遊領隊外語、警察特考英文…）
文章就被當成上一題最後一個選項的續行黏在選項尾巴（症狀：選項 D 後面接著一大段英文）。

做法（純規則，不用模型）：
  1. P.text(pdf, layout=False) 讀出原始閱讀順序，逐題找出題號行（用題庫的題幹前幾個字驗證）
  2. 第 n 題之前、第 n-1 題最後一個選項之後的文字＝第 n 題開始的題組文章
     最後一個選項如果寫滿整行（接近右邊界），下一行算選項續行，不算文章
  3. 文章接到「從 n 起、連續被跳過」的題（引導語寫了「第 N 題至第 M 題」就以它為準）
  4. 上一題最後一個選項尾巴如果黏著文章開頭，一併切掉（fix 欄）

用法：python3 tools/psg-recover.py <題庫 dump.json> <輸出.json> [--pid <pid>] [--show]
  dump.json 由 node tools/psg-recover-dump.js 產生；輸出交給 node tools/set-psg.js 寫回。
"""
import sys, os, re, json, unicodedata
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import parse as P
import parse_gao as G

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LANG = {'chu', 'gao', 'loc', 'pol', 'tou'}   # 有題組文章的類科；醫事類的跳過理由多半是「承上題」，不是文章
INTRO = re.compile(r'^(?:請?依下文|閱讀下文)?[，,]?\s*(?:回答)?\s*第[^題]{0,6}題\s*(?:至|到)\s*第[^題]{0,6}題(?:[，,][^。]{0,20}?者|的\S{0,4}文章)?[：:，,]?\s*')
SKIP_RX = re.compile(r'閱讀測驗|克漏字|本文|文章|題組')
NOISE = re.compile(r'^\s*(?:請依下(?:文|列)|請閱讀下|閱讀測驗|克漏字|Reading|Cloze|第\s*[一二三四五]\s*部分|'
                   r'[一二三四五六]\s*[、.]\s*(?:閱讀|克漏字)|請回答第|回答第)')


def nsp(s):
    return re.sub(r'\s+', '', P.half(s or ''))


def dw(s):
    return sum(2 if unicodedata.east_asian_width(c) in 'WF' else 1 for c in s)


def lines_of(pdf, layout=True):
    t = P.text(pdf, layout=layout)
    t = G.QNUM.sub(lambda m: '%s%d. ' % (m.group(1), ord(m.group(2)) - 0xE0C6 + 1), t)
    out = []
    for ln in P.clean_lines(t):
        if G.PAGEHDR.match(ln): continue
        out.append(ln.rstrip())
    return out


def ind(l):
    return len(l) - len(l.lstrip())


def find_q(lines, qs):
    """{n: 行號}：行首（縮排 ≤3）的題號，用題幹前幾個字（去空白）驗證；題幹空白的題（克漏字）只認題號。"""
    pos, start = {}, 0
    for q in qs:
        n = q['n']
        rx = re.compile(r'^\s{0,3}%d(?:\s*[.．、]\s*|\s+|(?=[^\d\s.]))(.*)$' % n)
        stem = '' if q.get('q', '').startswith('（本題題幹') else nsp(q.get('q', ''))[:8]
        for i in range(start, len(lines)):
            m = rx.match(P.half(lines[i]))
            if not m: continue
            rest = nsp(m.group(1)) + nsp(lines[i + 1] if i + 1 < len(lines) else '')
            if stem and stem[:4] not in rest[:60]: continue
            pos[n] = i; start = i + 1; break
    return pos


OPTLINE = re.compile(r'^\s*[A-E][.．、)]|\S\s{3,}\S')


def passage_in(seg):
    """題與題之間的一段行：文章＝第一個「靠左（縮排 ≤2）」的非選項行起到最後；
       段落首行縮排的情況：縮排行後面緊接靠左行，也算起點。"""
    for i, l in enumerate(seg):
        if OPTLINE.match(P.half(l)) and ind(l) > 2: continue
        if ind(l) <= 2: return seg[i:]
        if i + 1 < len(seg) and ind(seg[i + 1]) <= 2 and not OPTLINE.search(P.half(l.strip())):
            return seg[i:]
    return []


def recover(paper, pdf, want):
    lines = lines_of(pdf)
    qs = paper['qs']
    byn = {q['n']: q for q in qs}
    pos = find_q(lines, qs)
    found, opts = {}, {}
    for q in qs:
        n = q['n']
        if n not in pos: continue
        if q.get('q', '').startswith('（本題題幹') and not any(nsp(o) for o in q.get('o') or []):
            m = re.match(r'^\s{0,3}%d\s+(.*)$' % n, P.half(lines[pos[n]]))
            parts = [x.strip() for x in re.split(r'\s{3,}', m.group(1).strip())] if m else []
            if len(parts) == len(q.get('o') or []) and all(parts): opts[n] = parts
        a = pos.get(n - 1)
        if a is None:
            if n - 1 in byn: continue
            a = -1
        seg = [l for l in lines[a + 1:pos[n]] if not NOISE.match(l)]
        seg = passage_in(seg)
        txt = '\n'.join(l.strip() for l in seg).strip()
        if len(nsp(txt)) < 60: continue
        # 醫事類卷沒有題組文章，切到的通常是上一題的選項（A.… B.… C.…）
        if re.search(r'A[.．]\s*\S.{0,200}B[.．]\s*\S.{0,200}C[.．]', P.half(txt), re.S): continue
        en = G._is_en(txt)
        psg = re.sub(r'\s*\n\s*', ' ' if en else '', txt).strip()
        psg = re.sub(r'[ \t]{2,}', ' ', psg)
        # 開頭的引導語（「閱讀下文，回答第 7 題至第 8 題」「第 41 題至第 45 題，請依文意…者」）拿掉
        cut = re.sub(INTRO, '', psg)
        if len(nsp(cut)) >= 60: psg = cut
        found[n] = psg
    rng = {}
    flat = P.half('\n'.join(lines))
    for m in G.PSG.finditer(flat):
        g = [x for x in m.groups() if x]
        if len(g) == 2: rng[int(g[0])] = int(g[1])
    starts = sorted(found)
    REF = r'passage|article|text|文中|本文|作者|上文|短文|according|下列|文章|空格|空欄|\(\d+\)|（\d+）|_'
    out = {}
    for n in sorted(want):
        st = max([s for s in starts if s <= n], default=None)
        if st is None: continue
        if st in rng:
            if n > rng[st]: continue
        elif n - st > 4 and not all(m in want or re.search(REF, byn[m].get('q', ''), re.I) or not nsp(byn[m].get('q', ''))
                     for m in range(st, n)):
            continue
        out[n] = st
    return found, out, pos, opts


def main():
    dump, dst = sys.argv[1], sys.argv[2]
    only = sys.argv[sys.argv.index('--pid') + 1] if '--pid' in sys.argv else None
    show = '--show' in sys.argv
    papers = json.load(open(dump))
    pdfmap = json.load(open(os.path.join(ROOT, 'tools/pid-pdf.json')))
    skips = json.load(open(os.path.join(ROOT, 'tools/exp-skips.json')))
    res, stat = {}, {'題': 0, '救回': 0, '卷': 0, '沒PDF': 0}
    for pid, paper in papers.items():
        if only and pid != only: continue
        if pid.split('-')[0] not in LANG: continue
        want = {x['n'] for x in skips.get(pid, []) if SKIP_RX.search(x.get('reason', ''))}
        if not want: continue
        stat['題'] += len(want)
        v = pdfmap.get(pid)
        pdf = v and os.path.join(v[0], 'pdf', v[1] + '_q.pdf')
        if not pdf or not os.path.exists(pdf): stat['沒PDF'] += 1; continue
        found, out, pos, opts = recover(paper, pdf, want)
        if not out:
            if show: print('✗', pid, sorted(want), '題號行找到', len(pos), '/', len(paper['qs']), '題組起點', sorted(found))
            continue
        stat['卷'] += 1; stat['救回'] += len(out)
        r = res[pid] = {'psg': {}, 'grp': {}, 'miss': sorted(want - set(out))}
        for n, st in out.items():
            r['grp'][str(n)] = st
            r['psg'][str(st)] = found[st]
            if n in opts: r.setdefault('opts', {})[str(n)] = opts[n]
        if show:
            print('✓', pid, '救回', sorted(out), '沒救到', r['miss'])
            for st, p in r['psg'].items(): print('   [%s] %s … %s' % (st, p[:90], p[-60:]))
    json.dump(res, open(dst, 'w'), ensure_ascii=False, indent=1)
    print(stat)


if __name__ == '__main__':
    main()
