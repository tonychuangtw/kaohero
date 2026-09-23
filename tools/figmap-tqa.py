# -*- coding: utf-8 -*-
"""教檢（tea-*）的 pid → 原始 PDF 對照，用「內容對得上」找，不重抄 gen_tqa 的科目正規化。

用法：python3 tools/figmap-tqa.py [--write]
      --write 會把結果併進 tools/pid-pdf.json（figmap.py 產生的那一份）。

為什麼另外一支：教檢的 pid 是由科目名稱正規化後查表得到的（gen_tqa.py），
同一個科目在不同師資類科（幼兒園／國小／中等／特教）各考一份，檔名是 <年>_<類科>_<第幾科>。
把那段邏輯抄過來容易抄歪，改用最不會錯的方式：同一年的候選 PDF 逐一比對
「答案張數＝本卷題數」而且「第 1 題題幹開頭對得上」，對得上的就是同一份卷。
已經有圖的卷可以直接從既有檔名反推，這支只補沒有圖的那些。
"""
import os, re, sys, json, subprocess

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
WORK = os.path.expanduser('~/exam-pdfs/tqa')
sys.path.insert(0, HERE)
import parse as P


def papers():
    """題庫裡每一份教檢卷：pid → (題數, 第 1 題題幹, 既有圖檔前綴)"""
    js = subprocess.run(['node', '-e', """
global.window={};const fs=require('fs');const out={};
for(const f of fs.readdirSync('js/data/exam')){if(!f.startsWith('tea-'))continue;
 const pid=f.replace('.js','');require('./js/data/exam/'+f);const p=window.APP_EXAM_PAPERS[pid];if(!p)continue;
 const q=p.qs.find(q=>q.fig);
 out[pid]=[p.qs.length,(p.qs[0]&&p.qs[0].q||'').slice(0,18),
           q?q.fig.split('/').pop().replace(/_\\d+\\.webp$/,''):null];}
process.stdout.write(JSON.stringify(out));"""], cwd=ROOT, capture_output=True)
    return json.loads(js.stdout.decode() or '{}')


def main():
    have = papers()
    out, miss = {}, []
    for pid, (nq, q1, stem) in sorted(have.items()):
        if stem:                       # 已經有圖的卷直接反推，不必再比對
            out[pid] = stem
            continue
        roc = pid.split('-')[1].lstrip('0')
        cands = sorted(f[:-6] for f in os.listdir(os.path.join(WORK, 'pdf'))
                       if f.endswith('_q.pdf') and f.startswith(roc + '_'))
        hit = None
        for st in cands:
            ap = os.path.join(WORK, 'pdf', st + '_a.pdf')
            qp = os.path.join(WORK, 'pdf', st + '_q.pdf')
            if not os.path.exists(ap):
                continue
            try:
                if len(P.parse_answers(ap)) != nq:
                    continue
                head = re.sub(r'\s+', '', P.text(qp)[:4000])
                if re.sub(r'\s+', '', q1)[:10] in head:
                    hit = st
                    break
            except Exception:
                continue
        if hit: out[pid] = hit
        else: miss.append(pid)
    print('對到 %d 卷，對不到 %d 卷%s' % (len(out), len(miss), ('：' + '、'.join(miss[:8])) if miss else ''))
    if '--write' in sys.argv:
        f = os.path.join(HERE, 'pid-pdf.json')
        m = json.load(open(f, encoding='utf-8'))
        for pid, st in out.items():
            m[pid] = [WORK, st]
        json.dump(m, open(f, 'w'), ensure_ascii=False, indent=0)
        print('已併進 tools/pid-pdf.json（共 %d 卷）' % len(m))


if __name__ == '__main__':
    main()
