# -*- coding: utf-8 -*-
"""考選部試題 PDF → 題目結構。牙醫師卷用；沿用醫師卷那套的防呆。"""
import re, subprocess, unicodedata

FW = '　！＂＃＄％＆＇（）＊＋，－．／０１２３４５６７８９：；＜＝＞？＠ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ'
def half(s):
    return ''.join(chr(ord(c) - 0xFEE0) if 0xFF01 <= ord(c) <= 0xFF5E else (' ' if c == '　' else c) for c in s)

# 舊卷（中醫師 102～111、醫師 102～104）把選項代號與圈號存成私用區字元，
# pdftotext 讀出來是 \ue18c 這種，不還原的話整題會只剩題幹、選項全空。
PUA = {'\ue18c': 'A.', '\ue18d': 'B.', '\ue18e': 'C.', '\ue18f': 'D.',
       '\ue129': '①', '\ue12a': '②', '\ue12b': '③',
       '\ue12c': '④', '\ue12d': '⑤', '\ue12e': '⑥'}

def text(pdf, layout=True):
    cmd = ['pdftotext'] + (['-layout'] if layout else []) + [pdf, '-']
    t = subprocess.run(cmd, capture_output=True).stdout.decode('utf-8', 'ignore')
    for k, v in PUA.items(): t = t.replace(k, v)
    return t

HDR = re.compile(r'^\s*(代\s*號|類科名稱|科目名稱|考試時間|座號|※|全一張|全一頁|共\s*\d+\s*頁|第\s*\d+\s*頁|請\s*接|背\s*面|\(請接背面\))')

def clean_lines(t):
    out = []
    for ln in t.split('\n'):
        ln = ln.replace('\x0c', ' ').rstrip()
        s = ln.strip()
        if not s: continue
        if HDR.match(s): continue
        if re.match(r'^\d+\s*$', s): continue           # 頁碼
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

def parse_questions(pdf):
    """回傳 [{n, q, o[4], needfig}]；題號只認 1,2,3… 遞增序列。"""
    lines = clean_lines(text(pdf))
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
    for m in re.finditer(r'(?m)^[ \t]{0,1}(\d{1,3})(?:[ \t]*[.．、][ \t]*|[ \t]{2,})', flat):
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
