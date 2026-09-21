#!/usr/bin/env python3
"""把考古英雄的題目＋自撰詳解打包成 Anki 牌組（.apkg）。

用法：
    python3 tools/build-anki.py <papers.json> <輸出.apkg> [--deck 牌組名稱] [--limit N] [--owner 授權對象]

papers.json 由 tools/export-json.js 產生。
需要 genanki（本機裝在 /tmp/ankienv，見 docs）。
"""
import sys, re, json, html, hashlib, argparse, random

try:
    import genanki
except ImportError:
    sys.exit("需要 genanki：python3 -m venv /tmp/ankienv && /tmp/ankienv/bin/pip install genanki\n"
             "然後用 /tmp/ankienv/bin/python 執行本腳本。")

LAB = ['A', 'B', 'C', 'D']

CSS = """
.card{
  font-family:"Noto Sans TC","PingFang TC","Microsoft JhengHei",sans-serif;
  font-size:19px; line-height:1.85; text-align:left;
  color:#16202B; background:#F6F5F1; padding:4px 2px;
}
.nightMode .card, .card.nightMode{ color:#E7E8E4; background:#12181F; }
.tagline{
  font-family:ui-monospace,monospace; font-size:12px; letter-spacing:.08em;
  color:#A8332B; margin-bottom:10px;
}
.nightMode .tagline{ color:#E4796D; }
.q{ font-weight:500; margin-bottom:14px; }
.q .psg{ border-left:3px solid #DCD9D1; padding:2px 0 2px 12px; margin-bottom:10px;
  font-size:16px; color:#5A6472; white-space:pre-wrap; }
.nightMode .q .psg{ border-left-color:#2C353F; color:#9AA3AE; }
.q .fig{ margin:10px 0 0; }
.q .fig img{ max-width:100%; height:auto; border-radius:6px; }
.opts{ list-style:none; margin:0; padding:0; }
.opts li{ margin:6px 0 6px 0; padding-left:26px; text-indent:-26px; }
.k{ font-family:ui-monospace,monospace; font-weight:600; color:#6A7079; }
.nightMode .k{ color:#8E969F; }
hr#answer{ border:none; border-top:2px solid #16202B; margin:18px 0 14px; }
.nightMode hr#answer{ border-top-color:#E7E8E4; }
.ans{ font-family:"Noto Serif TC",serif; font-size:21px; font-weight:700; margin-bottom:12px; }
.exp{ font-size:17px; line-height:1.9; white-space:pre-wrap; }
.exp .ok{ color:#2C6E52; font-weight:600; }
.nightMode .exp .ok{ color:#6FB392; }
.exp .no{ color:#A8332B; }
.nightMode .exp .no{ color:#E4796D; }
.exp .src{ color:#6A7079; }
.nightMode .exp .src{ color:#8E969F; }
.foot{
  margin-top:18px; padding-top:10px; border-top:1px solid #DCD9D1;
  font-family:ui-monospace,monospace; font-size:11px; color:#6A7079;
}
.nightMode .foot{ border-top-color:#2C353F; color:#8E969F; }
"""

FRONT = """<div class="tagline">{{來源}}</div>
<div class="q">{{題目}}</div>
<ul class="opts">{{選項}}</ul>"""

BACK = """{{FrontSide}}
<hr id="answer">
<div class="ans">正解：{{正解}}</div>
<div class="exp">{{詳解}}</div>
<div class="foot">{{授權}}</div>"""


def esc(s):
    return html.escape(s or '', quote=False)


def paint_exp(exp):
    """把 ✅ / ❌ / 📚 開頭的行上色。"""
    out = []
    for line in (exp or '').split('\n'):
        cls = 'ok' if line.startswith('✅') else 'no' if line.startswith('❌') else 'src' if line.startswith('📚') else ''
        line = esc(line)
        out.append(f'<span class="{cls}">{line}</span>' if cls else line)
    return '<br>'.join(out)


def front_q(q, imgbase):
    """卡片正面的題幹：題組短文與題目圖都要帶上，單看一張卡也讀得懂。
       圖是連到站上的絕對網址（Anki 不內嵌遠端圖，離線時看不到圖）。"""
    h = []
    if q.get('psg'):
        h.append('<div class="psg">' + esc(q['psg']) + '</div>')
    h.append('<div>' + esc(q['q']) + '</div>')
    if q.get('fig') and imgbase:
        h.append('<div class="fig"><img src="' + esc(imgbase.rstrip('/') + '/' + q['fig'].lstrip('/')) + '"></div>')
    return ''.join(h)


def ans_of(q):
    """正解字母。送分題（void）與多答案題（alt）都要照實寫，不能只印 q['a']。"""
    if q.get('void'):
        return '送分（四個選項均給分）'
    ks = [q['a']] + list(q.get('alt') or [])
    return '、'.join(LAB[k] for k in ks if isinstance(k, int) and 0 <= k < len(LAB))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('src'); ap.add_argument('dst')
    ap.add_argument('--deck', default='考古英雄')
    ap.add_argument('--limit', type=int, default=0, help='每卷最多取幾題（0=全部）')
    ap.add_argument('--owner', default='', help='浮水印上的授權對象')
    # 錯題本匯出會挑到「還沒寫詳解」的題：那些題考生照樣答錯過、照樣要背，
    # 卡片背面就只放正解。整卷講義用的預設維持「只收有詳解的題」不變。
    ap.add_argument('--all', action='store_true', help='連還沒寫詳解的題也收')
    ap.add_argument('--flat', action='store_true', help='不分年度／科目子牌組，全部放同一個牌組')
    ap.add_argument('--imgbase', default='https://kaohero.com', help='圖片題要連回哪個站台')
    a = ap.parse_args()

    data = json.load(open(a.src, encoding='utf-8'))
    seed = int(hashlib.md5(a.deck.encode()).hexdigest()[:8], 16)
    model = genanki.Model(
        seed | 1, '考古英雄 選擇題',
        fields=[{'name': n} for n in ('題目', '選項', '正解', '詳解', '來源', '授權')],
        templates=[{'name': '作答', 'qfmt': FRONT, 'afmt': BACK}],
        css=CSS)

    owner = f'本檔案授權給 {a.owner} 使用' if a.owner else '考古英雄 kaohero'
    footer = f'{owner} · 詳解為本站自撰，禁止轉載散布'

    decks, total = {}, 0
    for p in data['papers']:
        m = p['meta']
        sub = m.get('subjName') or m.get('subj') or ''
        name = a.deck if a.flat else f"{a.deck}::{m['roc']} 年::{sub}"
        if name not in decks:
            # 牌組 id 要「同名同 id」才不會每次匯入都長出一個新牌組；
            # Python 的 hash() 對 str 每次執行都加鹽，換成 md5 才穩定。
            did = int(hashlib.md5(name.encode()).hexdigest()[:9], 16)
            decks[name] = genanki.Deck(did, name)
        deck = decks[name]
        qs = p['qs'] if a.all else [q for q in p['qs'] if q.get('exp')]
        if a.limit:
            qs = qs[:a.limit]
        for q in qs:
            opts = ''.join(
                f'<li><span class="k">({LAB[i]})</span> {esc(o) if (o or "").strip() else "（見上圖）"}</li>'
                for i, o in enumerate(q.get('o') or []))
            ans = ans_of(q)
            src = f"{m['label']}　第 {q['n']} 題"
            exp = paint_exp(q['exp']) if q.get('exp') else '（這一題的詳解還沒寫，會分批補上。）'
            deck.add_note(genanki.Note(
                model=model,
                fields=[front_q(q, a.imgbase), opts, ans, exp, esc(src), esc(footer)],
                # Anki 的標籤以空白分隔，標籤本身不能含任何空白（含全形空白）
                tags=[t for t in [f"民國{m['roc']}年", re.sub(r'\s+', '', sub), m['id']] if t],
                guid=genanki.guid_for(m['id'], q['n'])))
            total += 1

    genanki.Package(list(decks.values())).write_to_file(a.dst)
    print(f'✅ {total} 張卡、{len(decks)} 個子牌組 → {a.dst}')


if __name__ == '__main__':
    main()
