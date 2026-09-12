# -*- coding: utf-8 -*-
"""考選部試題 PDF → 題目結構。牙醫師卷用；沿用醫師卷那套的防呆。"""
import re, subprocess, unicodedata

FW = '　！＂＃＄％＆＇（）＊＋，－．／０１２３４５６７８９：；＜＝＞？＠ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ'
def half(s):
    return ''.join(chr(ord(c) - 0xFEE0) if 0xFF01 <= ord(c) <= 0xFF5E else (' ' if c == '　' else c) for c in s)

# 舊卷（中醫師 102～111、醫師 102～104）把選項代號與圈號存成私用區字元，
# pdftotext 讀出來是 \ue18c 這種，不還原的話整題會只剩題幹、選項全空。
PUA = {'\ue18c': 'A.', '\ue18d': 'B.', '\ue18e': 'C.', '\ue18f': 'D.', '\ue190': 'E.',
       '\ue129': '①', '\ue12a': '②', '\ue12b': '③',
       '\ue12c': '④', '\ue12d': '⑤', '\ue12e': '⑥'}

# Symbol 字型（數學卷、經濟學卷常用）被 pdftotext 讀成 U+F0xx，不還原的話題目裡會是一排豆腐。
# 對照表＝Symbol 編碼：數字與運算符號原樣、英文字母是希臘字母、上段是各種數學符號。
_SYM_LOW = {0x2D: '−', 0x2B: '+', 0x3D: '=', 0x3C: '<', 0x3E: '>', 0x2A: '×', 0x2F: '/'}
_GREEK_L = 'αβχδεφγηιϕκλμνοπθρστυϖωξψζ'
_GREEK_U = 'ΑΒΧΔΕΦΓΗΙϑΚΛΜΝΟΠΘΡΣΤΥςΩΞΨΖ'
_SYM_HI = {0xA3: '≤', 0xB3: '≥', 0xB4: '×', 0xB8: '÷', 0xB9: '≠', 0xBB: '≈', 0xB1: '±',
           0xA5: '∞', 0xAE: '→', 0xAC: '←', 0xAD: '↑', 0xAF: '↓', 0xD7: '·', 0xD6: '√',
           0xE5: '∑', 0xF2: '∫', 0xB6: '∂', 0xD0: '◊', 0xC7: '∩', 0xC8: '∪', 0xCE: '∈',
           0xA2: '′', 0xB0: '°', 0xBA: '≡', 0xBC: '…', 0xA9: '↔'}
for _c in range(0x20, 0x7F):
    _v = _SYM_LOW.get(_c)
    if _v is None:
        if 0x61 <= _c <= 0x7A: _v = _GREEK_L[_c - 0x61]
        elif 0x41 <= _c <= 0x5A: _v = _GREEK_U[_c - 0x41]
        else: _v = chr(_c)
    PUA[chr(0xF000 + _c)] = _v
for _c, _v in _SYM_HI.items(): PUA[chr(0xF000 + _c)] = _v

def text(pdf, layout=True):
    cmd = ['pdftotext'] + (['-layout'] if layout else []) + [pdf, '-']
    t = subprocess.run(cmd, capture_output=True).stdout.decode('utf-8', 'ignore')
    for k, v in PUA.items(): t = t.replace(k, v)
    return t

def _gutter(pdf):
    """找兩欄之間的空白帶（每一頁一個 x 座標）；找不到就回 None。"""
    xml = subprocess.run(['pdftotext', '-bbox', pdf, '-'], capture_output=True).stdout.decode('utf-8', 'ignore')
    outs = []
    for pm in re.finditer(r'<page width="([\d.]+)" height="([\d.]+)">(.*?)</page>', xml, re.S):
        w = float(pm.group(1))
        xs = [(float(a), float(b)) for a, b in
              re.findall(r'<word xMin="([\d.]+)" yMin="[\d.]+" xMax="([\d.]+)"', pm.group(3))]
        if not xs: outs.append(None); continue
        step = max(w / 200.0, 1.0)
        cov = [0] * (int(w / step) + 2)
        for a, b in xs:
            for i in range(int(a / step), min(int(b / step) + 1, len(cov))): cov[i] = 1
        best, cur = (0, None), None
        for i in range(int(len(cov) * 0.3), int(len(cov) * 0.72)):
            if not cov[i]:
                cur = i if cur is None else cur
                if i - cur + 1 > best[0]: best = (i - cur + 1, (cur + i) / 2.0 * step)
            else:
                cur = None
        outs.append(best[1] if best[0] >= 4 else None)
    return outs


def text_cols(pdf, cols=2, shift=0.0):
    """兩欄排版的卷（教檢 95～102 年）：-layout 會把左右欄交錯、原始閱讀順序也是亂的。
       改成先找出兩欄之間的空白帶，再把每一頁切成左右兩塊分別讀，依「先左後右」接起來。"""
    info = subprocess.run(['pdfinfo', pdf], capture_output=True).stdout.decode('utf-8', 'ignore')
    m = re.search(r'Page size:\s*([\d.]+)\s*x\s*([\d.]+)', info)
    n = re.search(r'Pages:\s*(\d+)', info)
    if not (m and n): return text(pdf)
    w, h, pages = float(m.group(1)), float(m.group(2)), int(n.group(1))
    guts = _gutter(pdf)
    out = []
    for p in range(1, pages + 1):
        g = guts[p - 1] if p - 1 < len(guts) and guts[p - 1] else w / 2.0
        g = min(max(g + shift * w, w * 0.25), w * 0.75)   # 空白帶抓得不夠準時，左右挪一點再試
        for x0, x1 in ((0, g), (g, w)):
            cmd = ['pdftotext', '-layout', '-f', str(p), '-l', str(p),
                   '-x', str(int(x0)), '-y', '0', '-W', str(max(int(x1 - x0), 10)), '-H', str(int(h)), pdf, '-']
            t = subprocess.run(cmd, capture_output=True).stdout.decode('utf-8', 'ignore')
            for k, v in PUA.items(): t = t.replace(k, v)
            out.append(t)
    return '\n'.join(out)

HDR = re.compile(r'^\s*(代\s*號|類科名稱|科目名稱|考試時間|座號|※|全一張|全一頁|共\s*\d+\s*頁|第\s*\d+\s*頁|請\s*接|背\s*面|\(請接背面\))')

def clean_lines(t, keep_nums=False):
    """keep_nums=True 時保留「整行只有數字」的行。
       預設丟掉是因為那通常是頁碼；但有些卷（護理師 110110 內外科護理學第 26 題）
       的題號會被 pdftotext 拆到自己一行，丟掉就再也切不出那一題之後的所有題目。"""
    out = []
    for ln in t.split('\n'):
        ln = ln.replace('\x0c', ' ').rstrip()
        s = ln.strip()
        if not s: continue
        if HDR.match(s): continue
        if not keep_nums and re.match(r'^\d+\s*$', s): continue           # 頁碼
        if re.match(r'^[（(]請接背面[）)]', s): continue
        out.append(ln)
    return out

def header_info(pdf):
    """讀 PDF 第一頁的『類科名稱／科目名稱』，科目一定要靠這個判定（s 代碼跨階段會撞）。"""
    t = text(pdf)
    cls = re.search(r'類科名稱[：:]\s*(\S+)', t)
    sub = re.search(r'科目名稱[：:]\s*(\S+)', t)
    return (cls.group(1) if cls else ''), (sub.group(1) if sub else '')

OPT = 'ABCD'

def parse_questions(pdf, relaxed=False):
    """回傳 [{n, q, o[4], needfig}]；題號只認 1,2,3… 遞增序列。

    relaxed=True 時，題號後面只隔「一個空白」也算（護理師 104～110 的舊卷是這種排版：
    「 1 下列有關上皮組織的敘述…」）。預設不開，因為單一空白的條件太鬆，
    斷行後的數值（例：「 54.3 mL/min」）可能剛好等於下一個期待題號而被誤判。
    呼叫端（gen_bank.py）的用法是：先用嚴格模式，題數對不上答案張數時再用 relaxed 重跑，
    兩者都不吻合就報錯，不要默默收下被截斷的卷。"""
    lines = clean_lines(text(pdf), keep_nums=relaxed)
    body = '\n'.join(lines)
    # half() 是 1:1 字元對映，索引與 body 完全對齊：用 flat 找標記、用 body 取內容，
    # 這樣全形標點（，？（））才不會被改掉。
    flat = half(body)
    # 找題號位置：行首「N.」或「N．」，且 N 必須是下一個期待的題號
    pos = []
    want = 1
    # 題號有兩種寫法：「1.」（近年）與「 1   」（舊卷，號碼後面直接空好幾格）
    # 題號一定頂在最左邊（最多一個前導空白）。放寬成 ^\s* 會把換行後的檢驗數值當成題號
    # ——「…eGFR」斷行接「  54.3 mL/min」就會被當成第 54 題，把第 53 題整個切掉。
    gap = r'[ \t]{1,}' if relaxed else r'[ \t]{2,}'
    # relaxed 另外認「整行只有題號」的寫法，但限題號 ≥ 10 才認——
    # 頁碼也是整行只有數字，通常是個位數，這樣才不會把第 3 頁的「3」當成第 3 題。
    pat = r'(?m)^[ \t]{0,1}(\d{1,3})(?:[ \t]*[.．、][ \t]*|%s|[ \t]*$)' % gap if relaxed \
        else r'(?m)^[ \t]{0,1}(\d{1,3})(?:[ \t]*[.．、][ \t]*|%s)' % gap
    for m in re.finditer(pat, flat):
        # 「整行只有題號」＝比對完就到行尾。個位數的那種先排除，避免把頁碼當題號。
        bare = m.end() >= len(flat) or flat[m.end()] == '\n'
        if relaxed and bare and int(m.group(1)) < 10: continue
        if int(m.group(1)) == want:
            pos.append((want, m.start(), m.end()))
            want += 1
    qs = []
    for i, (n, st, en) in enumerate(pos):
        e0 = pos[i + 1][1] if i + 1 < len(pos) else len(body)
        seg, segf = body[en:e0], flat[en:e0]
        # 依序鏈找 A. B. C. D.（選項可能與題幹同一行）
        idx = []
        p = 0
        for L in OPT:
            m = re.compile(r'(?m)(?:^|\s)%s\s*[.．、]\s*' % L).search(segf, p)
            if not m: idx = None; break
            idx.append((m.start(), m.end())); p = m.end()
        if idx is None:
            alt = _opts_by_columns(seg)
            if alt:
                qs.append({'n': n, 'q': alt[0], 'o': alt[1]}); continue
            qs.append({'n': n, 'q': norm(seg), 'o': [], 'needfig': True}); continue
        stem = seg[:idx[0][0]]
        opts = []
        for k in range(4):
            e = idx[k + 1][0] if k + 1 < 4 else len(seg)
            opts.append(norm(seg[idx[k][1]: e]))
        q = {'n': n, 'q': norm(stem), 'o': opts}
        if any(not o for o in opts) or not q['q']: q['needfig'] = True
        qs.append(q)
    return qs

def _opts_by_columns(seg):
    """找不到 A. B. C. D. 時的備援：靠版面欄位把四個選項切出來。

    起因：護理師 103 年第二次與 105 年第一次的卷（共 10 份、800 題），選項代號是子集字型畫的
    圈圈字，沒有 ToUnicode 對照，pdftotext 直接吐不出任何字元——選項文字都在，就是沒有代號。
    這種卷的排版是固定的：題幹一行，接下來每一行放 2 個或 4 個選項，欄與欄之間空很多格。
    所以把題幹之後的每一行用「連續 3 個以上空白」切開，剛好湊滿 4 段才採用；
    不滿或超過就回 None，交回原流程當圖片題處理，不要硬猜。

    回傳 (題幹, [四個選項]) 或 None。"""
    lines = [l for l in seg.split('\n') if l.strip()]
    if len(lines) < 2: return None
    stem, rest = lines[0], lines[1:]
    parts = []
    for ln in rest:
        cols = [c.strip() for c in re.split(r'[ \t]{3,}', ln.strip()) if c.strip()]
        if not cols: return None
        parts += cols
    if len(parts) != 4: return None
    if not norm(stem) or any(not p for p in parts): return None
    return norm(stem), [norm(p) for p in parts]

def norm(s):
    s = re.sub(r'[ \t]+', ' ', s)
    s = re.sub(r'\s*\n\s*', '', s)
    return s.strip()

FWA = {'Ａ': 'A', 'Ｂ': 'B', 'Ｃ': 'C', 'Ｄ': 'D', 'Ｅ': 'E', '＃': '#'}

def parse_answers(pdf):
    """標準答案 PDF → {題號: 'A'|'#'}"""
    t = text(pdf)
    nums, ans = [], []
    for ln in t.split('\n'):
        s = ln.strip()
        if s.startswith('題號') or s.startswith('題序'):
            nums.append([int(x) for x in re.findall(r'\d{1,3}', s)])
        elif s.startswith('答案'):
            # 近年用全形ＡＢＣＤ，102～105 的舊卷用半形 A B C D：一律先轉半形再抓
            ans.append(re.findall(r'[A-E#]', half(s)))
    out = {}
    for ns, as_ in zip(nums, ans):
        for n, a in zip(ns, as_): out[n] = a
    return out

def parse_corrections(pdf):
    """更正答案 PDF 的備註 → {題號: set('A','D')}；『一律給分』回全部四個。

    各年度／各考試的措辭不一樣，實際看過的有：
      第75題答Ａ、Ｄ給分。
      第48題答Ｄ給分。
      第13題答Ｂ或Ｄ或BD者均給分。
      第27題一律給分。
    所以不寫死句型：先把備註切成一句一句（以「第N題」為界），再從那一句裡撿 A~D。
    """
    t = half(text(pdf))
    m = re.search(r'備\s*註[：:]\s*(.*)$', t, re.S)
    if not m: return {}
    s = re.sub(r'\s+', '', m.group(1))
    hits = list(re.finditer(r'第(\d{1,3})題', s))
    out = {}
    for i, h in enumerate(hits):
        seg = s[h.end(): hits[i + 1].start() if i + 1 < len(hits) else len(s)]
        n = int(h.group(1))
        if '一律給分' in seg or '均給分' in seg and len(set(re.findall(r'[A-D]', seg))) >= 4:
            out[n] = set('ABCD'); continue
        letters = set(re.findall(r'[A-D]', seg))
        if letters: out[n] = letters
    return out
