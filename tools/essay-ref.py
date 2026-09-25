# -*- coding: utf-8 -*-
"""申論題「參考架構」（q.ref）的挑題與寫入。批次流程見 tools/essay-ref-batch.sh。

  python3 tools/essay-ref.py targets [--limit 12] [--out q.txt]   倒出下一批要寫的題（同一科、新→舊）
  python3 tools/essay-ref.py set <refs.json> [--write]            驗格式、寫回 js/data/essay/<f>.js 與 essays.js 的計數

挑題順序：先挑 PRIORITY 類科的科目（考生最多的行政類），再依「掛幾個類科」由多到少；
同一科從最新年度往回寫。有圖表／公式警示（q.warn）的題不寫——看不到圖寫出來的架構不可靠。
一批只挑同一科的題，prompt 比較集中、模型也比較不會把不同科的觀念混在一起。
"""
import os, sys, re, json

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)
from gen_essay import load_papers

PRIORITY = ['社會行政', '一般行政', '一般民政', '人事行政', '勞工行政', '教育行政', '戶政', '法制', '財稅行政',
            '經建行政', '地政', '會計', '廉政', '司法行政', '行政警察']
RECENT = int(os.environ.get('ESSAY_RECENT', 110))   # 近年門檻（民國年）
REJ = os.path.join(HERE, 'essay-ref-rejects.json')   # 格式退回次數
SKIP = os.path.join(HERE, 'essay-ref-skips.json')   # 模型判定寫不出來的題，記下來不再挑（不然會無限重挑）
IDX = os.path.join(ROOT, 'js/data/essays.js')


def load_idx():
    t = open(IDX, encoding='utf-8').read()
    return json.loads(t[t.index('= ') + 2:t.rindex(';')])


def save_idx(idx):
    open(IDX, 'w', encoding='utf-8').write(
        '/* 申論題科目索引（tools/gen_essay.py 產生，勿手改） */\nwindow.APP_ESSAY_SUBJ = '
        + json.dumps(idx, ensure_ascii=False, separators=(',', ':')) + ';\n')


def save_papers(f, key, ps):
    fn = os.path.join(ROOT, 'js/data/essay', f + '.js')
    head = open(fn, encoding='utf-8').read().split('window.APP_ESSAY_PAPERS[')[0]
    open(fn, 'w', encoding='utf-8').write(head + 'window.APP_ESSAY_PAPERS[%s] = %s;\n' % (
        json.dumps(key, ensure_ascii=False), json.dumps(ps, ensure_ascii=False, separators=(',', ':'))))


def skips():
    return set(json.load(open(SKIP))) if os.path.exists(SKIP) else set()


def rank(k, e):
    tr = [t.split('-', 1)[1] for t in e['tracks']]
    pri = min([PRIORITY.index(t) for t in tr if t in PRIORITY] or [99])
    return (pri, -len(e['tracks']), -e['nq'], k)


def targets(limit, out):
    idx = load_idx(); sk = skips()
    # 兩輪：先把所有科目的近年（RECENT 年起）寫完，再回頭寫舊年度（Tony 2026-09-25「好」：全部 5.6 萬題要一個月以上，近 5 年先上）
    total = 0; recent = 0; pick = None; old = None
    for k in sorted(idx, key=lambda k: rank(k, idx[k])):
        ps = load_papers(idx[k]['f'], k)
        todo = [(p, q) for p in ps for q in p['qs']
                if not q.get('ref') and not q.get('warn') and '%s|%d|%d' % (k, p['roc'], q['n']) not in sk]
        new = [t for t in todo if t[0]['roc'] >= RECENT]
        total += len(todo); recent += len(new)
        if new and pick is None: pick = (k, new[:limit])
        if todo and old is None: old = (k, todo[:limit])
    pick = pick or old
    if not pick:
        print('0 題（全部 0）'); return
    k, todo = pick
    e = idx[k]
    lines = ['科目：%s（%s，%s）' % (e['name'], {'gao': '高普考', 'local': '地方特考', 'pol': '警察特考'}[e['exam']], e['lv']),
             '考這科的類科：' + '、'.join(t.split('-', 1)[1] for t in e['tracks'][:12]), '']
    for p, q in todo:
        lines += ['### key=%s roc=%d n=%d（%d 分）' % (k, p['roc'], q['n'], q['pt']), q['q'], '']
    open(out, 'w', encoding='utf-8').write('\n'.join(lines))
    print('%d 題（全部 %d，%d 年起 %d）→ %s' % (len(todo), total, RECENT, recent, out))


BAD = re.compile('[✅❌📚]')


def check(r):
    ref = r.get('ref', '')
    if not isinstance(ref, str): return '不是字串'
    n = len(ref)
    if n < 150 or n > 1500: return '長度 %d 不在 150～1500' % n
    if '【答題架構】' not in ref: return '缺【答題架構】'
    if BAD.search(ref): return '用了 ✅❌📚'
    return None


def set_refs(path, write):
    refs = json.load(open(path, encoding='utf-8'))
    idx = load_idx(); sk = skips()
    bad = []; by = {}
    for r in refs:
        k = r.get('key'); roc = r.get('roc'); n = r.get('n')
        if k not in idx: bad.append('%s 不是科目 key' % k); continue
        if r.get('skip'):
            sk.add('%s|%d|%d' % (k, roc, n)); continue
        why = check(r)
        if why: bad.append('%s %s #%s：%s' % (k, roc, n, why)); continue
        by.setdefault(k, []).append(r)
    # 部分退回：格式不合的題不寫、也不記 skip（下一批會再挑到重寫），其餘照寫。
    # 以前整批退回＋批次停止，一題超長就把整批 12 題丟掉（2026-09-24 21:12）
    # 同一題第二次被退回就記進 skip，不然一科只剩這題時會每批挑到同一題、批次停住（2026-09-25 04:58）
    if bad:
        print('退回：', *bad, sep='\n  ')
        rj = json.load(open(REJ, encoding='utf-8')) if os.path.exists(REJ) else {}
        for r in refs:
            k = '%s|%s|%s' % (r.get('key'), r.get('roc'), r.get('n'))
            if r.get('skip') or r.get('key') not in idx or not check(r): continue
            rj[k] = rj.get(k, 0) + 1
            if rj[k] >= 2: sk.add('%s|%d|%d' % (r['key'], r['roc'], r['n']))
        if write: json.dump(rj, open(REJ, 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
    got = 0
    for k, rs in by.items():
        ps = load_papers(idx[k]['f'], k)
        m = {(p['roc'], q['n']): q for p in ps for q in p['qs']}
        for r in rs:
            q = m.get((r['roc'], r['n']))
            if not q: print('找不到 %s %s #%s' % (k, r['roc'], r['n'])); sys.exit(1)
            q['ref'] = r['ref'].strip(); got += 1
        idx[k]['ref'] = sum(1 for p in ps for q in p['qs'] if q.get('ref'))
        if write: save_papers(idx[k]['f'], k, ps)
    if write:
        save_idx(idx)
        json.dump(sorted(sk), open(SKIP, 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
    print('寫入 %d 題%s' % (got, '' if write else '（試跑，未寫檔）'))


if __name__ == '__main__':
    a = sys.argv[1:]
    if a and a[0] == 'targets':
        targets(int(a[a.index('--limit') + 1]) if '--limit' in a else 12,
                a[a.index('--out') + 1] if '--out' in a else '/dev/stdout')
    elif a and a[0] == 'set':
        set_refs(a[1], '--write' in a)
    else:
        sys.exit(__doc__)
