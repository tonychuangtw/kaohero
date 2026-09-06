# -*- coding: utf-8 -*-
"""把 gen_gao.py 產出的 gao-index.json（科目表＋類科表）併進 tools/index-spec.json。

分類樹：等別（高考三級／普通考試）→ 類群（tools/gao-groups.json 人工維護）→ 類科 → 科目 → 年份卷。
用法：python3 tools/gao-index-merge.py <工作目錄的 gao-index.json>
"""
import json, os, sys, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SPEC = os.path.join(ROOT, 'tools/index-spec.json')
GRP = os.path.join(ROOT, 'tools/gao-groups.json')


def main():
    src = json.load(open(sys.argv[1], encoding='utf-8'))
    spec = json.load(open(SPEC, encoding='utf-8'))
    groups = {k: v for k, v in json.load(open(GRP, encoding='utf-8')).items() if not k.startswith('_')}
    where = {t: g for g, ts in groups.items() for t in ts}

    for key, v in sorted(src['subjects'].items()):
        # note 只留「最完整的那個官方全名」（含括號說明），跟顯示名一樣就不必再寫一次
        base = re.sub(r'（[^）]*組）$', '', v['name'])
        note = sorted((x for x in v['note'] if x != base), key=len, reverse=True)
        spec['subjects'][key] = {'name': v['name'],
                                 'note': note[0] if note else '',
                                 'stage': v['lvl']}
    stages = []
    for lvl, lvname, note in ((1, '高考三級', '大學（含）以上程度，多數類科需專業科目申論'),
                              (2, '普通考試', '高中職（含）以上程度，專業科目多為測驗題')):
        trs = src['tracks'].get(str(lvl), {})
        by = {}
        for tn, keys in trs.items():
            keys = [k for k in keys if k in src['subjects']]
            if not keys: continue
            by.setdefault(where.get(tn, '其他類科'), []).append(
                {'id': '%s-%s' % ('g' if lvl == 1 else 'p', re.sub(r'\s+', '', tn)),
                 'name': tn, 'subjects': sorted(keys)})
        order = list(groups) + ['其他類科']
        gs = [{'name': g, 'tracks': sorted(by[g], key=lambda t: t['name'])}
              for g in order if g in by]
        allk = sorted({k for t in trs.values() for k in t if k in src['subjects']})
        if allk:
            stages.append({'no': lvl, 'name': lvname, 'note': note,
                           'subjects': allk, 'groups': gs})
    for c in spec['cats']:
        for x in c['exams']:
            if x['id'] == 'gao':
                x['live'] = bool(stages); x['stages'] = stages
    json.dump(spec, open(SPEC, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print('高普考：科目 %d、等別 %d；類科 %d' % (
        len(src['subjects']), len(stages),
        sum(len(t['tracks']) for s in stages for t in s['groups'])))
    miss = sorted({tn for lvl in src['tracks'] for tn in src['tracks'][lvl]} - set(where))
    if miss: print('⚠ 沒分群（會落到「其他類科」）：', '、'.join(miss))


if __name__ == '__main__':
    main()
