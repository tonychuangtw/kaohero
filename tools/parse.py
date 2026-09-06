# -*- coding: utf-8 -*-
"""考選部試題 PDF → 題目結構。牙醫師卷用；沿用醫師卷那套的防呆。"""
import re, subprocess, unicodedata

FW = '　！＂＃＄％＆＇（）＊＋，－．／０１２３４５６７８９：；＜＝＞？＠ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ'
def half(s):
    return ''.join(chr(ord(c) - 0xFEE0) if 0xFF01 <= ord(c) <= 0xFF5E else (' ' if c == '　' else c) for c in s)

def text(pdf, layout=True):
    cmd = ['pdftotext'] + (['-layout'] if layout else []) + [pdf, '-']
    return subprocess.run(cmd, capture_output=True).stdout.decode('utf-8', 'ignore')

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
    for m in re.finditer(r'(?m)^\s*(\d{1,3})\s*[.．、]\s*', flat):
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
            ans.append([FWA.get(c, c) for c in re.findall(r'[ＡＢＣＤＥ＃]', s)])
    out = {}
    for ns, as_ in zip(nums, ans):
        for n, a in zip(ns, as_): out[n] = a
    return out

def parse_corrections(pdf):
    """更正答案 PDF 的備註 → {題號: set('A','D')}；『一律給分』回全 4 個"""
    t = half(text(pdf))
    m = re.search(r'備\s*註[：:]\s*(.*)$', t, re.S)
    if not m: return {}
    s = re.sub(r'\s+', '', m.group(1))
    out = {}
    for mm in re.finditer(r'第(\d{1,3})題(一律給分|答([ＡＢＣＤABCD、]+)給分)', s):
        n = int(mm.group(1))
        if mm.group(2) == '一律給分': out[n] = set('ABCD')
        else: out[n] = set(FWA.get(c, c) for c in mm.group(3) if c not in '、')
    return out
