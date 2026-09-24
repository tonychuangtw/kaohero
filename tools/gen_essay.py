# -*- coding: utf-8 -*-
"""申論題庫轉檔（2026-09-24 開工）：高普考、地方特考、警察特考的申論卷 → js/data/essay*。

申論卷沒有標準答案（moex-sweep S 掃過留下 _a.none），題目 PDF 用 `moex-sweep.py <dir> Q --essay` 抓。
站上只放題目原文＋（之後）AI 寫的參考架構，不假裝是官方答案。

產出：
  js/data/essays.js            window.APP_ESSAY_SUBJ = {科目 key: {name, exam, lvl, lv, tracks, years, nq, f}}
  js/data/essay/<f>.js         window.APP_ESSAY_PAPERS[key] = [{roc, lv, mins, src, qs:[{n,q,pt,warn?}]}]（新→舊）
  科目 key＝<exam><等別>-<正規化科目名>（例 gao1-社會學），f＝key 的 sha1 前 10 碼（檔名不放中文）。
  同一年同名卻是兩份卷時（例：不同組別各出一份），跟 gen_civil 一樣加「（主類科組）」區分。

用法：python3 tools/gen_essay.py [--only gao|local|pol] [--report]
  --report 只印統計與沒認得的私用區字元，不寫檔。
"""
import os, sys, re, json, glob, hashlib, subprocess, collections

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
PDFS = os.path.expanduser('~/exam-pdfs')
sys.path.insert(0, HERE)
import gen_civil as C

SOURCES = [('gao', 'gao'), ('local', 'local'), ('pol', 'pol')]
FILE = 'https://wwwq.moex.gov.tw/exam/wHandExamQandA_File.ashx?t=Q&code=%s&c=%s&s=%s&q=1'

# 考選部試卷用 EUDC 造字放小題編號。對過原卷圖： 起依序是 ㈠㈡㈢…（選擇題卷的 parse.py 把同一段對成 ①②③，
# 那是選擇題卷的用法；申論卷的畫面是括號國字）。沒認得的留著，--report 會列出來。
NUMS = '一二三四五六七八九十'
PUA = {chr(0xe129 + i): '（%s）' % NUMS[i] for i in range(10)}
QHEAD = re.compile(r'^\s{0,4}([一二三四五六七八九十]{1,2})、')
PTS = re.compile(r'[（(]\s*(?:每小題\s*\d+\s*分\s*[，,]\s*)?共?\s*(\d+)\s*分\s*[）)]')
JUNK = re.compile(r'^\s*(（?請接背面）?|（?背面尚有試題）?|請接第.頁|頁次[：:].*|代號[：:].*|座號[：:].*|\d+\s*$)\s*$')
FIGHINT = re.compile(r'下圖|如圖|附圖|圖\s*[一二三四1-9]|下表|如表|附表|表\s*[一二三四1-9]|如下所示')
CJK = re.compile(r'[　-〿㐀-鿿＀-￯]')


def ptext(pdf):
    return subprocess.run(['pdftotext', '-layout', pdf, '-'], capture_output=True, text=True).stdout


def looks_math(lines):
    """-layout 把公式上下標拆成好幾行、中間塞一堆空白。行內有 3 段以上 4 格空白＝多半是公式或表格。"""
    return any(len(re.findall(r'\S\s{4,}(?=\S)', l.strip())) >= 3 for l in lines)


def join(lines):
    """把換行接回來：中文接中文不留空白，英文接英文留一格；小題編號、條列另起一行。"""
    out = ''
    for l in lines:
        l = l.strip()
        if not l: continue
        if not out: out = l; continue
        if re.match(r'^(（[一二三四五六七八九十]）|[⑴-⒇①-⑳]|\d+[.、．]\s|[A-Ea-e][.)．]\s|甲、|乙、)', l):
            out += '\n' + l
        elif CJK.match(l[0]) or CJK.match(out[-1]):
            out += l
        else:
            out += ' ' + l
    return out


def parse(pdf):
    raw = ptext(pdf)
    for k, v in PUA.items(): raw = raw.replace(k, v)
    lines = raw.split('\n')
    mins = 120
    m = re.search(r'考試時間[：:]\s*(\d+)\s*小時\s*(\d+)?', raw)
    if m: mins = int(m.group(1)) * 60 + int(m.group(2) or 0)
    blocks, cur = [], None
    for l in lines:
        if '\f' in l: l = l.replace('\f', '')
        if JUNK.match(l) or re.search(r'公務人員.*考試試題|考試時間|類\s*科[：:]|科\s*目[：:]|※注意|不必抄題|本科目除專門名詞|禁止使用電子計算器|本試題為', l):
            continue
        mm = QHEAD.match(l)
        n = mm and (NUMS.index(mm.group(1)[-1]) + 1 + (10 if len(mm.group(1)) == 2 else 0))
        # 題目裡引用的法條條列也長「一、二、」（刑訴強制辯護那題），只認比上一題大的號碼；
        # 跳號（圖片擋掉一題）交給 parse() 最後的連號檢查整卷擋下
        if mm and n > (blocks[-1]['n'] if blocks else 0) and (len(l) - len(l.lstrip())) <= (4 if not blocks else 1):
            cur = {'n': n, 'lines': [l[mm.end():]]}
            blocks.append(cur)
        elif cur is not None:
            cur['lines'].append(l)
    qs, warn_any = [], False
    for b in blocks:
        text = join(b['lines'])
        if not text: continue
        pts = [int(x) for x in PTS.findall(text)]
        tail = PTS.search(text[-20:])
        pt = int(tail.group(1)) if tail and len(pts) == 1 else (sum(pts) if pts else 0)
        # 「（每小題 6 分，共 24 分）」這種：取「共」後面那個數
        mm = re.search(r'共\s*(\d+)\s*分', text)
        if mm: pt = int(mm.group(1))
        q = {'n': b['n'], 'q': text, 'pt': pt}
        w = []
        if FIGHINT.search(text): w.append('fig')
        if looks_math(b['lines']): w.append('math')
        if re.search('[-]', text): w.append('pua')
        if w: q['warn'] = w; warn_any = True
        qs.append(q)
    # 題號要連續從 1 開始，不然就是切錯了
    ok = bool(qs) and [q['n'] for q in qs] == list(range(1, len(qs) + 1))
    return mins, qs, ok


def load_papers(f, key):
    fn = os.path.join(ROOT, 'js/data/essay', f + '.js')
    if not os.path.exists(fn): return []
    t = open(fn, encoding='utf-8').read()
    t = t[t.index('] = ', t.index('APP_ESSAY_PAPERS[')) + 4:t.rindex(';')]
    return json.loads(t)


def fkey(key):
    return hashlib.sha1(key.encode('utf-8')).hexdigest()[:10]


def kinds(work):
    m = {}
    for f in os.listdir(os.path.join(work, 'pdf')):
        p = f.split('_')
        if len(p) == 4 and p[3] in ('a.pdf', 'a.none'):
            k = (p[0], p[2])
            if p[3] == 'a.pdf' or k not in m: m[k] = 'mcq' if p[3] == 'a.pdf' else 'essay'
    return m


def rows_of(work, spec_name):
    """[(roc, code, c, cn, s, sn, trs)]：只留申論卷、判得出等別的。"""
    C.SPEC = C.SPECS[spec_name]
    kd = kinds(work)
    return [r for r in C.papers_of(work) if kd.get((r[1], r[4])) == 'essay' and C.lvl_of(r[3])]


def subject_key(spec_name, rows):
    """回傳 {(roc, code, s): key}，同名撞號時加主類科組別（跟 gen_civil.collisions 同一套想法）。"""
    C.SPEC = C.SPECS[spec_name]
    exam = C.SPEC['exam']
    seen, dup = {}, set()
    for roc, code, c, cn, s, sn, trs in rows:
        k = (roc, C.lvl_of(cn), C.canon(sn))
        if k in seen and seen[k] != s: dup.add(k[1:])
        seen[k] = s
    out = {}
    for roc, code, c, cn, s, sn, trs in rows:
        lvl = C.lvl_of(cn); name = C.canon(sn)
        if (lvl, name) in dup:
            pr = C.primary(trs, lvl)
            if pr: name = '%s（%s組）' % (name, pr)
        out[(roc, code, s)] = ('%s%d-%s' % (exam, lvl, name), name, lvl)
    return out


def main():
    only = sys.argv[sys.argv.index('--only') + 1] if '--only' in sys.argv else None
    report = '--report' in sys.argv
    subj, papers = {}, collections.defaultdict(list)
    stat = collections.Counter(); bad = []; pua = collections.Counter()
    for d, spec in SOURCES:
        if only and d != only: continue
        work = os.path.join(PDFS, d)
        rows = rows_of(work, spec)
        keys = subject_key(spec, rows)
        exam = C.SPECS[spec]['exam']
        lvname = {no: nm for no, nm, _ in C.SPECS[spec]['levels']}
        for roc, code, c, cn, s, sn, trs in rows:
            qp = os.path.join(work, 'pdf', '%s_%s_%s_q.pdf' % (code, c, s))
            if not os.path.exists(qp): stat['沒有題目檔'] += 1; continue
            mins, qs, ok = parse(qp)
            for q in qs:
                for ch in re.findall('[-]', q['q']): pua[ch] += 1
            if not ok:
                stat['切題失敗'] += 1; bad.append(qp); continue
            key, name, lvl = keys[(roc, code, s)]
            stat['成卷'] += 1; stat['題數'] += len(qs)
            stat['有警示的題'] += sum(1 for q in qs if q.get('warn'))
            e = subj.setdefault(key, {'name': name, 'exam': exam, 'lvl': lvl, 'lv': lvname[lvl],
                                      'tracks': set(), 'years': set(), 'nq': 0, 'f': fkey(key)})
            e['years'].add(roc); e['nq'] += len(qs)
            for t in trs:
                if C.lvl_of(t) == lvl:
                    e['tracks'].add('%s%d-%s' % (exam, lvl, re.sub(r'\s+', '', C.track_name(t, lvl))))
            papers[key].append({'roc': roc, 'mins': mins, 'src': FILE % (code, c, s), 'qs': qs})
    print(dict(stat), '科目', len(subj))
    if pua: print('沒認得的私用區字元：', ' '.join('U+%04X×%d' % (ord(k), v) for k, v in pua.most_common(20)))
    if bad: print('切題失敗（前 10）：', *bad[:10], sep='\n  ')
    if report: return
    os.makedirs(os.path.join(ROOT, 'js/data/essay'), exist_ok=True)
    for key, ps in papers.items():
        ps.sort(key=lambda p: -p['roc'])
        f = subj[key]['f']
        # 參考架構（q.ref）是之後另外寫進題庫檔的（tools/set-essay-ref.js），重新轉檔不能把它洗掉：
        # 先讀舊檔，依（年度, 題號）接回去
        old = load_papers(f, key)
        refs = {(p['roc'], q['n']): q['ref'] for p in old for q in p['qs'] if q.get('ref')}
        for p in ps:
            for q in p['qs']:
                r = refs.get((p['roc'], q['n']))
                if r: q['ref'] = r
        subj[key]['ref'] = sum(1 for p in ps for q in p['qs'] if q.get('ref'))
        js = ('/* 申論題：%s（tools/gen_essay.py 產生，勿手改）\n'
              '   題目為考選部考畢試題查詢平臺公開資料；參考架構為本站自撰，非官方答案。 */\n'
              'window.APP_ESSAY_PAPERS = window.APP_ESSAY_PAPERS || {};\n'
              'window.APP_ESSAY_PAPERS[%s] = %s;\n') % (
            key, json.dumps(key, ensure_ascii=False), json.dumps(ps, ensure_ascii=False, separators=(',', ':')))
        open(os.path.join(ROOT, 'js/data/essay', f + '.js'), 'w', encoding='utf-8').write(js)
    idx = {k: dict(v, tracks=sorted(v['tracks']), years=sorted(v['years'], reverse=True)) for k, v in sorted(subj.items())}
    open(os.path.join(ROOT, 'js/data/essays.js'), 'w', encoding='utf-8').write(
        '/* 申論題科目索引（tools/gen_essay.py 產生，勿手改） */\nwindow.APP_ESSAY_SUBJ = '
        + json.dumps(idx, ensure_ascii=False, separators=(',', ':')) + ';\n')
    print('寫入 %d 科、%d 檔' % (len(idx), len(papers)))


if __name__ == '__main__':
    main()
