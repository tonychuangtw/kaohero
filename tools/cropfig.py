# -*- coding: utf-8 -*-
"""把某一題整題（題幹＋選項）從原始 PDF 裁成圖，給「選項是圖片／①②③在 pdftotext 讀不出來」的題用。
   用 pdftotext -bbox-layout 取得每個字的座標，抓「第 N 題起點」到「第 N+1 題起點」之間；
   跨頁時本頁裁到頁底、下一頁裁頁首，再用 ffmpeg vstack 接起來。"""
import re, subprocess, os, sys, tempfile

DPI = 200
def boxes(pdf):
    x = subprocess.run(['pdftotext', '-bbox-layout', pdf, '-'], capture_output=True).stdout.decode('utf-8', 'ignore')
    pages = []
    for pm in re.finditer(r'<page width="([\d.]+)" height="([\d.]+)">(.*?)</page>', x, re.S):
        w, h, body = float(pm.group(1)), float(pm.group(2)), pm.group(3)
        lines = []
        for lm in re.finditer(r'<line xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">(.*?)</line>', body, re.S):
            words = re.findall(r'<word[^>]*>(.*?)</word>', lm.group(5), re.S)
            lines.append({'x0': float(lm.group(1)), 'y0': float(lm.group(2)),
                          'x1': float(lm.group(3)), 'y1': float(lm.group(4)),
                          't': ''.join(words)})
        lines.sort(key=lambda l: (l['y0'], l['x0']))
        pages.append({'w': w, 'h': h, 'lines': lines})
    return pages

def find_q(pages, n):
    """回傳 (page_index, y0)；題號要在該行行首、且靠左（避免內文裡的『30.』）"""
    # 題號兩種寫法：「12.」與舊卷的「 12   」（號碼後面直接空好幾格）
    pat = re.compile(r'^[ \t]*%d(?:[ \t]*[.．、]|[ \t]{2,}|$)' % n)
    best = None
    for pi, pg in enumerate(pages):
        for l in pg['lines']:
            if l['x0'] < 80 and pat.match(l['t']):
                if best is None: best = (pi, l['y0'])
    return best

def crop(pdf, n, out, pad_top=10, pad_bot=4):
    pages = boxes(pdf)
    a = find_q(pages, n)
    b = find_q(pages, n + 1)
    if a is None: raise SystemExit('找不到第 %d 題' % n)
    pi, y0 = a
    k = DPI / 72.0
    pg = pages[pi]
    # 內文左右邊界（取整頁文字的實際範圍）
    xs = [l['x0'] for p in pages for l in p['lines']] or [40]
    xe = [l['x1'] for p in pages for l in p['lines']] or [pg['w'] - 40]
    x0, x1 = max(min(xs) - 6, 0), min(max(xe) + 6, pg['w'])
    def render(pidx, ytop, ybot, path):
        args = ['-x', str(int(x0 * k)), '-y', str(int(ytop * k)),
                '-W', str(int((x1 - x0) * k)), '-H', str(int((ybot - ytop) * k))]
        subprocess.run(['pdftoppm', '-r', str(DPI), '-f', str(pidx + 1), '-l', str(pidx + 1),
                        '-png', '-singlefile'] + args + [pdf, path[:-4]], check=True)
    # 上邊界取「上一行底部＋2」與「本行頂端−pad」的較大者：pad 開太大會把上一題的最後一行帶進來
    prev = [l['y1'] for l in pg['lines'] if l['y1'] <= y0 + 1]
    ytop = max(max(prev) + 2, y0 - pad_top) if prev else y0 - pad_top
    with tempfile.TemporaryDirectory() as td:
        parts = []
        if b and b[0] == pi:
            render(pi, ytop, b[1] - pad_bot, td + '/p0.png'); parts.append(td + '/p0.png')
        else:
            if b is None and pi + 1 < len(pages):
                # 最後一題：本頁 y0 以下湊不齊 A~D 就代表續到下一頁
                have = sum(1 for L in 'ABCD'
                           if any(l['y0'] >= y0 and re.match(r'^\s*%s\s*[.．、]' % L, l['t']) for l in pg['lines']))
                if have < 4: b = (pi + 1, pages[pi + 1]['h'] - 12)
            last = b[0] if b else pi
            # ⚠ 一題可能橫跨三頁以上（選項是整頁圖時常見）：中間每一頁都要接進來，不能只接頭尾
            for p in range(pi, last + 1):
                top = ytop if p == pi else 20.0
                bot = (b[1] - pad_bot) if (b and p == b[0]) else pages[p]['h'] - 12
                if bot - top < 8: continue
                f = td + '/p%d.png' % p
                render(p, top, bot, f); parts.append(f)
        if len(parts) == 1:
            png = parts[0]
        else:
            args = []
            for f in parts: args += ['-i', f]
            ins = ''.join('[%d:v]' % i for i in range(len(parts)))
            subprocess.run(['ffmpeg', '-y', '-loglevel', 'error'] + args +
                           ['-filter_complex', ins + 'vstack=inputs=%d[o]' % len(parts), '-map', '[o]', td + '/c.png'], check=True)
            png = td + '/c.png'
        os.makedirs(os.path.dirname(out) or '.', exist_ok=True)
        subprocess.run(['cwebp', '-quiet', '-q', '82', png, '-o', out], check=True)
    return out

if __name__ == '__main__':
    crop(sys.argv[1], int(sys.argv[2]), sys.argv[3])
    print(sys.argv[3], os.path.getsize(sys.argv[3]))
