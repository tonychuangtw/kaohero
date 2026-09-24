# -*- coding: utf-8 -*-
"""各類科「最近一年要考、但本站沒有」的科目表，給類科頁列出來（js/data/essay.js）。

起因（2026-09-24）：考社會行政的考生說「有些科目沒有」。其實缺的是高考三級的社會學、社會工作、
社會福利政策與法規——全是申論卷，沒有選擇題也沒有標準答案，本站收不了；但類科頁只列有卷的科目，
看起來就像漏收。所以把最近一年該類科的完整科目表對一次，沒收的分兩種標：
  essay：申論卷（考選部平臺查不到測驗式答案，moex-sweep 留下 <code>_<c>_<s>_a.none）
  miss ：有選擇題答案、但題庫裡沒有這一卷（轉檔被擋掉，見 <spec>-skipped.json）

用法：python3 tools/essay-map.py         → 寫 js/data/essay.js（先跑 gen_essay.py，申論科目才連得到申論題庫）
類科 id 的算法跟 civil-index-merge.py 一樣（<exam><等別>-<類科名去空白>），改一邊要改另一邊。
"""
import os, sys, re, json, glob, collections

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
PDFS = os.path.expanduser('~/exam-pdfs')
sys.path.insert(0, HERE)
import gen_civil as C
import gen_essay as GE

# 申論題庫已有的科目（js/data/essays.js，gen_essay.py 產生）；要先跑 gen_essay 再跑這支
try:
    _t = open(os.path.join(ROOT, 'js/data/essays.js'), encoding='utf-8').read()
    ESUBJ = set(json.loads(_t[_t.index('= ') + 2:_t.rindex(';')]))
except (OSError, ValueError):
    ESUBJ = set()
ESK = {}

# (PDF 目錄, gen_civil 的 spec 名稱)
SOURCES = [('gao', 'gao'), ('local', 'local'), ('pol', 'pol'), ('chu', 'chu')]


_ls = {}


def kind(work, code, s):
    """同一份卷只以「第一個類科」的代碼存檔，類科代碼不一定是這一列的 c，所以只比 code 與 s。
       （一列一次 glob 會掃上萬個檔、跑好幾分鐘，改成整個目錄讀一次建表）"""
    if work not in _ls:
        m = {}
        for f in os.listdir(os.path.join(work, 'pdf')):
            p = f.split('_')
            if len(p) == 4 and p[3] in ('a.pdf', 'a.none'):
                k = (p[0], p[2])
                if p[3] == 'a.pdf' or k not in m: m[k] = 'mcq' if p[3] == 'a.pdf' else 'essay'
        _ls[work] = m
    return _ls[work].get((code, s))


def one(work, spec_name):
    C.SPEC = C.SPECS[spec_name]
    reg = json.load(open(os.path.join(HERE, '%s-subjects.json' % spec_name), encoding='utf-8'))
    exam = C.SPEC['exam']
    rows = C.papers_of(work)
    global ESK
    ESK = GE.subject_key(spec_name, [r for r in rows if kind(work, r[1], r[4]) == 'essay' and C.lvl_of(r[3])]) \
        if spec_name in ('gao', 'local', 'pol') else {}
    C.SPEC = C.SPECS[spec_name]
    dup = C.collisions([r for r in rows if kind(work, r[1], r[4]) == 'mcq'])
    # 類科 → 最近一年；那一年的科目
    latest = {}
    for roc, code, c, cn, s, sn, trs in rows:
        for t in trs:
            lvl = C.lvl_of(t)
            if not lvl: continue
            k = (lvl, C.track_name(t, lvl))
            latest[k] = max(latest.get(k, 0), roc)
    out = {}
    for roc, code, c, cn, s, sn, trs in rows:
        kd = kind(work, code, s)
        if not kd: continue
        for t in trs:
            lvl = C.lvl_of(t)
            if not lvl: continue
            tn = C.track_name(t, lvl)
            if latest[(lvl, tn)] != roc: continue
            tid = '%s%d-%s' % (exam, lvl, re.sub(r'\s+', '', tn))
            name = C.canon(sn)
            e = out.setdefault(tid, {'roc': roc, 'essay': [], 'miss': []})
            if kd == 'essay':
                # [名字, 申論題庫的科目 key]；key 用 gen_essay 同一套算法，題庫裡真的有才給（沒有就只列名字）
                k = ESK.get((roc, code, s))
                k = k[0] if k and k[0] in ESUBJ else None
                if name not in [x[0] for x in e['essay']]: e['essay'].append([name, k])
                continue
            if (lvl, name) in dup:
                pr = C.primary(trs, lvl)
                if pr: name = '%s（%s組）' % (name, pr)
            r = reg.get('%d|%s' % (lvl, name))
            pid = r and '%s-%d-1-%s' % (C.SPEC['prefix'], roc, r['key'])
            if not pid or not os.path.exists(os.path.join(ROOT, 'js/data/exam/%s.js' % pid)):
                if C.canon(sn) not in e['miss']: e['miss'].append(C.canon(sn))
    return {k: v for k, v in out.items() if v['essay'] or v['miss']}


def main():
    allm = {}
    for d, spec in SOURCES:
        work = os.path.join(PDFS, d)
        if not glob.glob(os.path.join(work, 'rows-*.json')):
            print('略過 %s：沒有 rows-*.json' % d); continue
        m = one(work, spec)
        print('%s：%d 個類科有未收科目（申論 %d、未收錄 %d 科次）' % (
            spec, len(m), sum(len(v['essay']) for v in m.values()), sum(len(v['miss']) for v in m.values())))
        allm.update(m)
    js = ('/* 各類科最近一年要考、但本站沒有的科目（tools/essay-map.py 產生，勿手改）。\n'
          '   essay＝申論卷（沒有選擇題），miss＝有選擇題但轉檔未收。 */\n'
          'window.APP_ESSAY = ' + json.dumps(allm, ensure_ascii=False, sort_keys=True, separators=(',', ':')) + ';\n')
    open(os.path.join(ROOT, 'js/data/essay.js'), 'w', encoding='utf-8').write(js)
    print('寫入 js/data/essay.js（%d KB）' % (len(js.encode()) // 1024))


if __name__ == '__main__':
    main()
