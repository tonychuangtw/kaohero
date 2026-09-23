/* 本週排名賽「固定題組」的測試（2026-09-23）
   重點只有一個：同一週、同一科、同一規格，任何人抽到的題目與順序都必須完全一樣，
   否則分數不能互比，百分位與分數分布就是假的。
   跑法：node test/rank-test.js */
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const w = {};
new Function('window', fs.readFileSync(path.join(ROOT, 'js/rank.js'), 'utf8'))(w);
const R = w.KHRank;

const fails = [];
const ok = (c, m) => { console.log((c ? '  ✓ ' : '  ✗ ') + m); if (!c) fails.push(m); };

console.log('\n本週排名賽 固定題組 test');

// 週次：ISO 8601，且用台北時間切
ok(R.setId(new Date('2026-01-01T00:00:00Z')) === '2026W01', '2026-01-01 是第 1 週');
ok(/^\d{4}W\d{2}$/.test(R.setId()), '週次格式是 YYYYWnn');
// 台北時間週一 00:30（= UTC 週日 16:30）已經算新的一週
const monTpe = new Date('2026-09-20T16:30:00Z');
const sunTpe = new Date('2026-09-20T15:30:00Z');
ok(R.setId(monTpe) !== R.setId(sunTpe), '台北時間跨到週一就換一組題（不是照 UTC 換）');

// 用真的題庫抽兩次，結果要一模一樣
global.window = {};
require(path.join(ROOT, 'js/data/exams.js'));
const EXAMS = global.window.APP_EXAMS;
const papers = {};
const api = {
  EXAMS,
  papers,
  loadMany: (ids, cb) => {
    ids.forEach((id) => {
      if (papers[id]) return;
      try {
        require(path.join(ROOT, 'js/data/exam', id + '.js'));
        papers[id] = global.window.APP_EXAM_PAPERS[id];
      } catch (e) { /* 卷不在就當沒載到，pick 會自己跳過 */ }
    });
    cb();
  },
};
const sid = EXAMS[0].subj;
const sig = (list) => list.map((x) => x.pid + '#' + x.q.n).join(',');

let a = null, b = null, setA = null;
R.pick(api, sid, 'quick', 20, (err, use, s) => { a = use; setA = s; });
R.pick(api, sid, 'quick', 20, (err, use) => { b = use; });
ok(a && a.length === 20, '抽得到 20 題');
ok(a && b && sig(a) === sig(b), '同一週同一科抽兩次，題目與順序完全一樣');
ok(setA === R.setId(), 'pick 回傳的 setid 就是本週週次');

let c = null;
R.pick(api, sid, 'full', 20, (err, use) => { c = use; });
ok(c && sig(c) !== sig(a), '換一種規格就是另一組題');

// 題號沒有重複（同一題不會出現兩次）
const seen = {};
let dup = 0;
a.forEach((x) => { const k = x.pid + '#' + x.q.n; if (seen[k]) dup++; seen[k] = 1; });
ok(dup === 0, '題組裡沒有重複的題');
ok(a.every((x) => !(x.q.needfig && !x.q.fig)), '沒有把「選項在圖上又缺圖」的題收進來');

console.log(fails.length ? `\n✗ ${fails.length} 項失敗` : '\n全部通過');
process.exit(fails.length ? 1 : 0);
