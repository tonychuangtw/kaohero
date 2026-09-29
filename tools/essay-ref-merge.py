# -*- coding: utf-8 -*-
"""把雲端 session 的申論參考架構 branch 逐題合併回本機（不走 git merge）。

  python3 tools/essay-ref-merge.py [--dry] [branch ...]
      不給 branch → 先 git fetch，合併全部 origin/cloud/essay-ref-*

為什麼不用 git merge：每科一個檔、整份 JSON 一行，本機法律批次同時在 commit 別的科，
雲端 branch 又改到同一份 essays.js／skips／rejects，git 合併一定衝突。
做法：branch 上有 ref、本機沒有的題補進來（兩邊都有就留本機）；skips 聯集、rejects 取大；
essays.js 的 ref 數依合併後重算。寫檔拿 ~/.claude/essay.lock（跟批次、轉檔同一把），最後只 commit 申論檔。
可重複跑：合併過的題不會再動。雲端流程見 tools/essay-ref-cloud.md
"""
import os, sys, json, subprocess, fcntl, importlib.util

HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(HERE)
spec = importlib.util.spec_from_file_location('essay_ref', os.path.join(HERE, 'essay-ref.py'))
er = importlib.util.module_from_spec(spec); spec.loader.exec_module(er)
LOCK = os.path.expanduser('~/.claude/essay.lock')


def git(*a, check=True):
    r = subprocess.run(['git', *a], cwd=ROOT, capture_output=True, text=True)
    if check and r.returncode: sys.exit('git %s 失敗：%s' % (' '.join(a), r.stderr.strip()))
    return r.stdout


def show(br, path):
    r = subprocess.run(['git', 'show', '%s:%s' % (br, path)], cwd=ROOT, capture_output=True, text=True)
    return r.stdout if r.returncode == 0 else None


def papers_of(text):
    return json.loads(text[text.index('] = ', text.index('APP_ESSAY_PAPERS[')) + 4:text.rindex(';')])


def main():
    a = sys.argv[1:]; dry = '--dry' in a; brs = [x for x in a if not x.startswith('--')]
    if not brs:
        git('fetch', '-q', 'origin')
        brs = [b for b in git('for-each-ref', '--format=%(refname:short)', 'refs/remotes/origin/cloud/').split() if 'essay-ref' in b]
    if not brs:
        print('沒有雲端 branch'); return
    total = 0; touched = set(); report = []
    with open(LOCK, 'a') as lk:
        fcntl.flock(lk, fcntl.LOCK_EX)
        idx = er.load_idx(); byf = {e['f']: k for k, e in idx.items()}
        sk = er.skips()
        rj = json.load(open(er.REJ, encoding='utf-8')) if os.path.exists(er.REJ) else {}
        for br in brs:
            base = git('merge-base', 'HEAD', br).strip()
            files = [p for p in git('diff', '--name-only', base, br, '--', 'js/data/essay/').split() if p.endswith('.js')]
            add = 0
            for p in files:
                f = os.path.basename(p)[:-3]; k = byf.get(f); t = show(br, p)
                if not k or t is None: continue
                theirs = {(pp['roc'], q['n']): q['ref'] for pp in papers_of(t) for q in pp['qs'] if q.get('ref')}
                ps = er.load_papers(f, k); n = 0
                for pp in ps:
                    for q in pp['qs']:
                        r = theirs.get((pp['roc'], q['n']))
                        if r and not q.get('ref'): q['ref'] = r; n += 1
                if n:
                    add += n; touched.add(k)
                    idx[k]['ref'] = sum(1 for pp in ps for q in pp['qs'] if q.get('ref'))
                    if not dry: er.save_papers(f, k, ps)
            t = show(br, 'tools/essay-ref-skips.json')
            if t: sk |= set(json.loads(t))
            t = show(br, 'tools/essay-ref-rejects.json')
            if t:
                for kk, v in json.loads(t, strict=False).items(): rj[kk] = max(rj.get(kk, 0), v)
            report.append('%s：+%d 題（branch 動到 %d 個科檔）' % (br, add, len(files)))
            total += add
        if not dry:
            er.save_idx(idx)
            json.dump(sorted(sk), open(er.SKIP, 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
            json.dump(rj, open(er.REJ, 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
            if total:
                msg = '申論參考架構：合併雲端 %s（+%d 題）' % ('、'.join(b.split('/')[-1] for b in brs), total)
                for _ in range(6):   # 本機批次也在 commit，撞 index.lock 就等一下
                    git('add', 'js/data/essay', 'js/data/essays.js', er.SKIP, er.REJ, check=False)
                    if subprocess.run(['git', 'commit', '-q', '-m', msg], cwd=ROOT).returncode == 0: break
                    __import__('time').sleep(5)
    print('\n'.join(report))
    print('合計 +%d 題、%d 科%s' % (total, len(touched), '（試跑，未寫檔）' if dry else ''))


if __name__ == '__main__':
    main()
