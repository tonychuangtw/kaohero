# -*- coding: utf-8 -*-
"""每日小更新：查考選部有沒有「本站已收的考試」出了新考期、本站還沒收（2026-11-05）。

只負責發現、不自動轉檔：每種考試的轉檔各有眉角（護理師要 nurse-inv-fix、公職要 rows-<roc>.json、圖要另裁），
自動硬轉出錯比晚一天上架糟。發現了由 daily-release.sh 通知本線，本線先問 Tony，收到明確同意後才照 CLAUDE.md 轉檔上架。

用法：python3 tools/moex-watch.py [--all]
  印出每個新考期一行「代碼<TAB>名稱」；同一個代碼通知過就記在 ~/.cache/kaohero-moex-watch.json，不再印（--all 照印）。
判法：考選部該年度考試清單的名稱含本站考試的關鍵字，而且本站題本檔裡沒有任何一卷的 code 是它。
"""
import os, re, sys, json, glob, datetime
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import moexlib as M

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STATE = os.path.expanduser('~/.cache/kaohero-moex-watch.json')
# 本站已收的考試（教師檢定不是考選部辦的，不在這裡）
KW = re.compile(r'醫師|藥師|護理師|醫事檢驗師|物理治療師|職能治療師|營養師|律師考試（第一試）|律師考試\(第一試\)'
                r'|高等考試三級|初等考試|地方政府公務人員|警察人員|導遊|領隊')
SKIP = re.compile(r'第二試|升官等|升資')

def main():
    have = set()
    for f in glob.glob(os.path.join(ROOT, 'js/data/exam/*.js')):
        m = re.search(r'"code":\s*"(\d+)"', open(f, encoding='utf-8').read(4000))
        if m: have.add(m.group(1))
    try: seen = set(json.load(open(STATE)))
    except Exception: seen = set()
    y = datetime.date.today().year
    new = []
    for yy in (y - 1, y):
        try: codes = M.year_codes(yy)
        except Exception as e:
            print('查 %d 年失敗：%s' % (yy - 1911, e), file=sys.stderr); continue
        for code, title in codes:
            if code in have or not KW.search(title) or SKIP.search(title): continue
            if code in seen and '--all' not in sys.argv: continue
            new.append((code, title))
    for code, title in new:
        print('%s\t%s' % (code, title))
    if '--all' not in sys.argv and new:
        os.makedirs(os.path.dirname(STATE), exist_ok=True)
        json.dump(sorted(seen | {c for c, _ in new}), open(STATE, 'w'))

if __name__ == '__main__':
    main()
