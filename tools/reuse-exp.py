#!/usr/bin/env python3
"""把已寫好詳解的卷子，套用到同年度其他類科的相同題目上（教師檢定四類科共題率高）。

用法：python3 reuse.py <目標pid> <來源pid> [來源pid...]
輸出：<目標pid>.reuse.json（可直接餵 set-exp.js），並印出還沒有詳解的題號。
比對條件：題幹、四個選項、正解索引都相同（忽略轉檔殘留的 ▲≥◆◇ 與空白）。
"""
import json, io, re, subprocess, sys, os

REPO = os.path.expanduser('~/TelegramClaude/kaoguhero')
OUT = os.environ.get('REUSE_OUT', os.getcwd())


def load(pid):
    js = ("global.window={};require('./js/data/exam/%s.js');"
          "const p=window.APP_EXAM_PAPERS['%s'];"
          "console.log(JSON.stringify(p.qs.map(q=>({n:q.n,q:q.q,o:q.o,a:q.a,exp:q.exp||''}))))" % (pid, pid))
    return json.loads(subprocess.check_output(['node', '-e', js], cwd=REPO).decode())


def norm(s):
    return re.sub(r'[▲▽△▼≥≡◆◇●○■□★☆\s]', '', s or '')


def key(q):
    return (norm(q['q']), tuple(norm(o) for o in q['o']), q['a'])


def main():
    target, sources = sys.argv[1], sys.argv[2:]
    bank = {}
    for s in sources:
        for q in load(s):
            if q['exp']:
                bank.setdefault(key(q), q['exp'])
    out, todo = [], []
    for q in load(target):
        if q['exp']:
            continue
        exp = bank.get(key(q))
        if exp:
            out.append({"pid": target, "n": q['n'], "exp": exp})
        else:
            todo.append(q['n'])
    path = os.path.join(OUT, target + '.reuse.json')
    io.open(path, 'w', encoding='utf-8').write(json.dumps(out, ensure_ascii=False, indent=1))
    print('可套用 %d 題 → %s' % (len(out), path))
    print('要自己寫的題號：' + (','.join(map(str, todo)) if todo else '無'))


if __name__ == '__main__':
    main()
