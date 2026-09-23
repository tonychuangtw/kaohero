# -*- coding: utf-8 -*-
"""建立 pid → 原始試題 PDF 的對照表，給補圖用（tools/figfill.py）。

用法：python3 tools/figmap.py [--check]
產出：tools/pid-pdf.json　{pid: ["<PDF 目錄>", "<code>_<c>_<s>"]}

為什麼要有這支：題庫的 js 檔只留 `code`（例 112020），沒留類科代碼 c 與科目代碼 s，
而圖檔名是 `<code>_<c>_<s>_<題號>.webp`、PDF 是 `pdf/<code>_<c>_<s>_q.pdf`。
要回頭補圖就得把 pid 重新對回那三段，作法是把 gen_civil／gen_bank／gen_tqa
當初決定 pid 的那段邏輯原樣再跑一次（直接 import 它們的 SPECS 與 key 函式，不另抄一份）。

--check 會拿題庫裡「已經有圖」的卷驗證：該卷 fig 檔名的前三段必須等於本表算出來的，
不一致就列出來。2026-09-23 首次建表時 647 卷有圖可驗、全部一致（另 122 卷的原始 PDF 不在本機，表上沒有）。
"""
import os, sys, json, re, glob, collections

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
PDFS = os.path.expanduser('~/exam-pdfs')
sys.path.insert(0, HERE)

# prefix → (PDF 目錄, 產生器, 產生器的 spec 名稱)
SOURCES = [
    ('chu', 'chu', 'civil', 'chu'),
    ('gao', 'gao', 'civil', 'gao'),
    ('loc', 'local', 'civil', 'local'),
    ('pol', 'pol', 'civil', 'pol'),
    ('tou', 'tour', 'civil', 'tour'),
    ('den', 'den', 'bank', 'dentist'),
    ('tcm', 'tcm', 'bank', 'cm'),
    ('pha', 'pha', 'bank', 'pharm'),
    ('nur', 'nurse', 'bank', 'nurse'),
    ('mlt', 'med4', 'bank', 'mlt'),
    ('pt', 'med4', 'bank', 'pt'),
    ('ot', 'med4', 'bank', 'ot'),
    ('nut', 'med4', 'bank', 'nut'),
]


def map_civil(work, spec_name):
    """gen_civil：pid 由 (等別, 正規化科目名) 查科目登記表得到 key 組成。"""
    import gen_civil as C
    C.SPEC = C.SPECS[spec_name]
    C.REG = os.path.join(HERE, '%s-subjects.json' % spec_name)
    reg = C.load_reg()
    rows = C.papers_of(work)
    dup = C.collisions([r for r in rows
                        if os.path.exists(os.path.join(work, 'pdf/%s_%s_%s_a.pdf' % (r[1], r[2], r[4])))])
    out = {}
    for roc, code, c, cn, s, sn, trs in rows:
        lvl = C.lvl_of(cn)
        if not lvl: continue
        name = C.canon(sn)
        if (lvl, name) in dup:
            marks = C.SPEC.get('dupmark')
            if marks:
                ts = [C.track_name(t, lvl) for t in trs if C.lvl_of(t) == lvl]
                lab = next((label for kw, label in marks
                            if ts and all(t.startswith(kw) for t in ts)), '')
                if lab: name = '%s（%s組）' % (name, lab)
            else:
                pr = C.primary(trs, lvl)
                if pr: name = '%s（%s組）' % (name, pr)
        key = C.key_of(reg, lvl, name)
        out.setdefault('%s-%d-1-%s' % (C.SPEC['prefix'], roc, key), []).append('%s_%s_%s' % (code, c, s))
    return out


def map_bank(work, spec_name):
    """gen_bank：pid 由 inv.json 的科目名稱經 spec 的 pat／resolve 得到 key 組成。"""
    import gen_bank as B
    spec = B.SPECS[spec_name]
    inv = json.load(open(os.path.join(work, 'inv.json'), encoding='utf-8'))
    out = {}
    for e in inv:
        code = e['code']; roc = int(code[:3])
        nth = e.get('nth') or (1 if '第一次' in e['title'] else 2)
        for c, cn, s, sn in B.subs_of(e):
            if 'track' in spec and not spec['track'](cn): continue
            if 'resolve' in spec:
                r = spec['resolve'](sn)
                if not r: continue
                key = r[0]
            else:
                m = re.search(spec['pat'], sn)
                if not m: continue
                key = spec['key'](m)
            pid = '%s-%d-%d-%s' % (spec['prefix'], roc, nth, key)
            # 同一科可能掛在兩個類科代碼底下（藥師的 305／307），兩邊都是合法候選，
            # 真正被收進題庫的是哪一份由 build() 的 pick() 決定（2026-09-23）
            out.setdefault(pid, []).append('%s_%s_%s' % (code, c, s))
    return out


# 教檢（tea）的 pid 要靠 gen_tqa 的科目正規化才推得出來，這裡不重抄；
# figfill.py 對這種卷改用「同一卷既有 fig 檔名的前綴」來補，推不出來就跳過。


def repo_figs():
    """題庫裡每一卷「已經有的圖檔前綴」與題數，用來從多個候選裡挑出當初真的收進來的那一份。"""
    import subprocess
    js = subprocess.run(['node', '-e', """
global.window={};const fs=require('fs');const out={};
for(const f of fs.readdirSync('js/data/exam')){const pid=f.replace('.js','');
 require('./js/data/exam/'+f);const p=window.APP_EXAM_PAPERS[pid];if(!p)continue;
 const q=p.qs.find(q=>q.fig&&/^img\\/q\\/\\d/.test(q.fig));
 out[pid]=[q?q.fig.split('/').pop().split('_').slice(0,3).join('_'):null,p.qs.length];}
process.stdout.write(JSON.stringify(out));"""], cwd=ROOT, capture_output=True)
    return json.loads(js.stdout.decode() or '{}')


def pick(pid, stems, work, info):
    """多個候選時：① 跟題庫既有圖檔對得上的優先 ② 答案張數＝本卷題數的優先 ③ 都不行就第一個。"""
    if len(stems) == 1: return stems[0]
    have = info.get(pid) or [None, 0]
    for st in stems:
        if have[0] and st == have[0]: return st
    if have[1]:
        import parse as P
        for st in stems:
            ap = os.path.join(work, 'pdf', st + '_a.pdf')
            try:
                if os.path.exists(ap) and len(P.parse_answers(ap)) == have[1]: return st
            except Exception:
                pass
    return stems[0]


def build():
    m = {}
    info = repo_figs()
    for prefix, d, kind, spec in SOURCES:
        work = os.path.join(PDFS, d)
        if not os.path.isdir(os.path.join(work, 'pdf')):
            print('略過 %-4s：%s 沒有 pdf/（原始卷不在本機）' % (prefix, work)); continue
        cwd = os.getcwd()
        try:
            os.chdir(work)
            fn = {'civil': map_civil, 'bank': map_bank}[kind]
            got = fn(work, spec)
        except Exception as ex:
            print('略過 %-4s：%s' % (prefix, ex)); got = {}
        finally:
            os.chdir(cwd)
        for pid, stems in got.items():
            stems = [st for st in stems if os.path.exists(os.path.join(work, 'pdf', st + '_q.pdf'))]
            if stems: m[pid] = [work, pick(pid, stems, work, info)]
        print('%-4s %5d 卷' % (prefix, len([1 for p in got if p in m])))
    return m


def check(m):
    """拿已經有圖的卷驗證：fig 檔名前三段要等於本表算出來的 stem。"""
    import subprocess
    js = subprocess.run(['node', '-e', '''
global.window={};const fs=require('fs');const out={};
for(const f of fs.readdirSync('js/data/exam')){const pid=f.replace('.js','');
 require('./js/data/exam/'+f);const p=window.APP_EXAM_PAPERS[pid];if(!p)continue;
 const q=p.qs.find(q=>q.fig&&/^img\\/q\\/\\d/.test(q.fig));if(q)out[pid]=q.fig;}
process.stdout.write(JSON.stringify(out));'''], cwd=ROOT, capture_output=True)
    have = json.loads(js.stdout.decode())
    ok = bad = miss = 0
    for pid, fig in have.items():
        stem = '_'.join(os.path.basename(fig).split('_')[:3])
        if pid not in m: miss += 1; continue
        if m[pid][1] == stem: ok += 1
        else:
            bad += 1
            if bad <= 10: print('不一致 %s：表 %s / 圖 %s' % (pid, m[pid][1], stem))
    print('驗證：一致 %d、不一致 %d、表上沒有 %d' % (ok, bad, miss))


if __name__ == '__main__':
    m = build()
    json.dump(m, open(os.path.join(HERE, 'pid-pdf.json'), 'w'), ensure_ascii=False, indent=0)
    print('共 %d 卷 → tools/pid-pdf.json' % len(m))
    if '--check' in sys.argv: check(m)
