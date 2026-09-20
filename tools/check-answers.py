# -*- coding: utf-8 -*-
"""check-answers.py — 抓出題庫裡「存的正解與題目對不上」的題。

為什麼要有這支（2026-09-12 Tony 問教檢時發現，09-20 動工）：
  parse.py 的 parse_answers 是把答案表的「題號」列與「答案」列用 zip 配對：

      題號  21 22 23 24 25 26 ...
      答案  Ｃ  Ａ  Ｂ     Ａ  Ｄ ...      ← 第 24 題那格是空的／沒被 pdftotext 讀到

  只要有一格沒讀到，zip 就會把 25 的答案配給 24、26 的配給 25……整列往前位移，
  而且**不會報錯**。已知至少 13 題受害（教檢），站上把錯的選項標成正解會誤導考生。

這支怎麼抓：改用 pdftotext -bbox 的座標，把每個答案字母對到 x 座標最接近的題號欄，
對不到就留空。座標版與 zip 版對同一份 PDF 給出不同答案 → 那份就是受害卷。
不需要重新下載官方檔案，本機 ~/exam-pdfs/*/pdf/*_a.pdf 就是官方原檔。

用法：
  python3 tools/check-answers.py <答案PDF目錄> [--json 輸出.json] [--limit N]
    例：python3 tools/check-answers.py ~/exam-pdfs/tqa/pdf
  輸出每份有出入的 PDF：題號、zip 版答案、座標版答案，最後印總表。
"""
import sys, os, re, glob, json, subprocess, collections

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__))))
import parse as P


def words(pdf):
    """pdftotext -bbox → [(page, xmid, ymid, text)]，已還原全形與私用區字元。"""
    xml = subprocess.run(['pdftotext', '-bbox', pdf, '-'],
                         capture_output=True).stdout.decode('utf-8', 'ignore')
    out = []
    for pi, pm in enumerate(re.finditer(r'<page .*?>(.*?)</page>', xml, re.S)):
        for m in re.finditer(
                r'<word xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">(.*?)</word>',
                pm.group(1), re.S):
            x0, y0, x1, y1, t = m.groups()
            t = re.sub(r'&amp;', '&', re.sub(r'&lt;', '<', re.sub(r'&gt;', '>', t)))
            for k, v in P.PUA.items():
                t = t.replace(k, v)
            out.append((pi, (float(x0) + float(x1)) / 2, (float(y0) + float(y1)) / 2, t))
    return out


def lines(ws, ytol=3.0):
    """把同一列的 word 收在一起（y 中心相差 < ytol 視為同列），每列依 x 排序。"""
    rows = []
    for w in sorted(ws, key=lambda w: (w[0], w[2], w[1])):
        if rows and rows[-1][0][0] == w[0] and abs(rows[-1][0][2] - w[2]) < ytol:
            rows[-1].append(w)
        else:
            rows.append([w])
    return [sorted(r, key=lambda w: w[1]) for r in rows]


def parse_answers_bbox(pdf):
    """座標版 {題號: 'A' 或 'A/B'}。

    作法與 zip 版相反：不是「第 k 個題號配第 k 個字母」，而是每個答案字母去找 x 座標
    最近的題號欄。所以一格寫 "A/B"（兩個答案都給分）時，A 與 B 會一起落在同一欄，
    回傳 'A/B'，後面的題不會整排位移 —— 這正是 zip 版出錯的主因
    （實測 115_10_3_a.pdf：第 5 題 A/B 讓 6~10 題全部往前挪一格）。
    """
    rows = lines(words(pdf))
    out, pending = {}, None
    for r in rows:
        txt = P.half(''.join(w[3] for w in r)).strip()
        if txt.startswith('題號') or txt.startswith('題序'):
            cells = []
            for w in r:
                for m in re.finditer(r'\d{1,3}', P.half(w[3])):
                    cells.append((w[1], int(m.group())))       # 一個 word 可能黏了多個題號
            pending = [c for c in cells if c[1] > 0]
        elif txt.startswith('答案') and pending:
            letters = []
            for w in r:
                for m in re.finditer(r'[A-E#]', P.half(w[3])):
                    letters.append((w[1], m.group()))
            xs = [c[0] for c in pending]
            gaps = sorted(b - a for a, b in zip(xs, xs[1:])) if len(xs) > 1 else [20.0]
            step = gaps[len(gaps) // 2] if gaps else 20.0       # 欄距取中位數
            got = collections.defaultdict(list)
            for lx, la in letters:
                n, d = None, step * 0.75
                for x, nn in pending:
                    if abs(lx - x) < d:
                        n, d = nn, abs(lx - x)
                if n is not None:
                    got[n].append(la)
            for n, v in got.items():
                out[n] = '/'.join(v)
            pending = None
    return out


def main():
    args = sys.argv[1:]
    if not args:
        print(__doc__)
        sys.exit(2)
    d = os.path.expanduser(args[0])
    jsonout = args[args.index('--json') + 1] if '--json' in args else None
    limit = int(args[args.index('--limit') + 1]) if '--limit' in args else 0

    files = sorted(glob.glob(os.path.join(d, '*_a.pdf')))
    if limit:
        files = files[:limit]
    bad, stats = [], collections.Counter()
    for f in files:
        try:
            a_zip = P.parse_answers(f)
            a_box = parse_answers_bbox(f)
        except Exception as e:                       # 壞檔不要讓整批停掉
            stats['讀取失敗'] += 1
            continue
        if not a_zip or not a_box:
            stats['其中一版讀不出答案'] += 1
            continue
        diff = {n: (a_zip.get(n), a_box.get(n)) for n in set(a_zip) | set(a_box)
                if a_box.get(n) is not None and a_zip.get(n) != a_box.get(n)}
        stats['檢查'] += 1
        if diff:
            stats['有出入'] += 1
            bad.append({'pdf': os.path.basename(f), 'n_q': len(a_zip),
                        'diff': {str(k): {'zip': v[0], 'bbox': v[1]} for k, v in sorted(diff.items())}})
            print('%s  %d 題有出入：%s' % (
                os.path.basename(f), len(diff),
                '、'.join('#%d %s→%s' % (k, v[0], v[1]) for k, v in sorted(diff.items())[:12])))
    print('\n檢查 %d 份，%d 份有出入（%s）' % (stats['檢查'], stats['有出入'],
                                        '、'.join('%s %d' % kv for kv in stats.items())))
    if jsonout:
        json.dump(bad, open(jsonout, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
        print('明細寫到 ' + jsonout)


if __name__ == '__main__':
    main()
