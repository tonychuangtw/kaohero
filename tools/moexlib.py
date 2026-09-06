# -*- coding: utf-8 -*-
"""考選部考畢試題平臺：列考試代碼、列某次考試的類科／科目、下載試題與答案 PDF。
   下載端點是單純 GET：wHandExamQandA_File.ashx?t=Q|S|M|A&code=&c=&s=&q=1"""
import re, urllib.parse, urllib.request, http.cookiejar, os, html
UA = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36'}
BASE = 'https://wwwq.moex.gov.tw/exam/wFrmExamQandASearch.aspx'
FILE = 'https://wwwq.moex.gov.tw/exam/wHandExamQandA_File.ashx'
_cj = http.cookiejar.CookieJar()
_op = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(_cj))

def _get(url):
    return _op.open(urllib.request.Request(url, headers=UA), timeout=60).read()

def _post(url, data):
    body = urllib.parse.urlencode(data).encode()
    req = urllib.request.Request(url, data=body, headers={**UA, 'Content-Type': 'application/x-www-form-urlencoded'})
    return _op.open(req, timeout=90).read().decode('utf-8', 'ignore')

def _hidden(h):
    d = {}
    for m in re.finditer(r'<input[^>]*type="hidden"[^>]*>', h):
        t = m.group(0); n = re.search(r'name="([^"]+)"', t); v = re.search(r'value="([^"]*)"', t)
        if n: d[n.group(1)] = html.unescape(v.group(1)) if v else ''
    return d

def year_codes(year_ad):
    """某西元年（下拉選單的 value）底下所有考試代碼 [(code, 名稱)]"""
    h = _get(BASE).decode('utf-8', 'ignore')
    d = _hidden(h)
    for k in re.findall(r'name="(ctl00\$holderContent\$wUctlExamYear\w+\$ddlExamYear)"', h):
        d[k] = str(year_ad)
    d['ctl00$holderContent$btnYear'] = ''
    r = _post(BASE, d)
    m = re.search(r'<select[^>]*ddlExamCode[^>]*>(.*?)</select>', r, re.S)
    if not m: return []
    return [(v, html.unescape(t)) for v, t in re.findall(r'<option[^>]*value="([^"]*)"[^>]*>([^<]*)</option>', m.group(1)) if v]

def exam_subjects(code, year_ad=None):
    """某次考試底下的 [(c, 類科名, s, 科目名)]。
       ⚠ 一定要先把年度下拉選到該考試的年份（btnYear）再查，否則舊年份查出來是空的。"""
    if year_ad is None: year_ad = int(code[:3]) + 1911
    h = _get(BASE).decode('utf-8', 'ignore')
    d = _hidden(h)
    for k in re.findall(r'name="(ctl00\$holderContent\$wUctlExamYear\w+\$ddlExamYear)"', h): d[k] = str(year_ad)
    d['ctl00$holderContent$btnYear'] = ''
    h2 = _post(BASE, d)
    d = _hidden(h2)
    for k in re.findall(r'name="(ctl00\$holderContent\$wUctlExamYear\w+\$ddlExamYear)"', h2): d[k] = str(year_ad)
    d['ctl00$holderContent$ddlExamCode'] = code
    d['ctl00$holderContent$btnSearch'] = '查詢'
    r = _post(BASE, d)
    out = []; cur_c = None; cur_name = ''
    for m in re.finditer(r'chk_%s_(\d+)(?:_(\w+))?"[^>]*>(?:.*?)<label[^>]*>([^<]*)</label>' % code, r, re.S):
        c, s, name = m.group(1), m.group(2), html.unescape(m.group(3)).strip()
        if s is None:
            cur_c, cur_name = c, name
        else:
            out.append((c, cur_name if c == cur_c else '', s, name))
    return out

def download(code, c, s, t, path):
    url = '%s?t=%s&code=%s&c=%s&s=%s&q=1' % (FILE, t, code, c, s)
    b = _get(url)
    if not b.startswith(b'%PDF'): return None
    open(path, 'wb').write(b); return len(b)
