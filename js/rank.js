/* 考英雄 — 本週排名賽（2026-09-23）
 *
 * 一般模擬考是隨機抽題，每個人的卷子不一樣，分數本來就不能互比。
 * 排名賽改成「固定題組」：用（科目, 規格, 週次）當亂數種子抽題，
 * 同一週打開同一科的人拿到完全一樣的一份卷，分數才有可比性，
 * 交卷後才給得出百分位與同科分數分布。
 *
 * ⚠️ 題組是前端算出來的，不是後端發的：後端只拿 setid 當分組鍵。
 *    所以「同一份卷」的前提是兩邊的題庫版本一樣——題庫更新（例如補圖讓某題從不能考變成能考）
 *    會讓當週題組變動一次。這是刻意的取捨：不必為了排名賽在後端存一份題號快照。
 * ⚠️ 沒有防作弊（分數是前端送的），定位同英雄榜：看看自己大概在哪個位置，不是正式成績。
 */
(function () {
  'use strict';

  var A = null;
  function T(s) { return A && A.T ? A.T(s) : s; }
  function el(t, c, x) {
    var n = document.createElement(t);
    if (c) n.className = c;
    if (x != null) n.textContent = x;
    return n;
  }

  var MAX_PAPERS = 8;        // 一份題組最多抽幾份考卷（手機一次載十幾份會卡）

  /* 台北時間的 ISO 週次，例 '2026W39'。
     用台北時間算：跨日、跨週的時間點要跟考生的日曆一致，不能用 UTC。 */
  function setId(d) {
    var now = d || new Date();
    // 先換算成台北時間的「當地日期」，再照 ISO 8601 算週次
    var tpe = new Date(now.getTime() + (now.getTimezoneOffset() + 480) * 60000);
    var t = new Date(Date.UTC(tpe.getFullYear(), tpe.getMonth(), tpe.getDate()));
    var day = t.getUTCDay() || 7;                     // 週一=1 … 週日=7
    t.setUTCDate(t.getUTCDate() + 4 - day);           // 移到該週的週四（ISO 週以週四定年）
    var y0 = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
    var wk = Math.ceil(((t - y0) / 86400000 + 1) / 7);
    return t.getUTCFullYear() + 'W' + (wk < 10 ? '0' + wk : wk);
  }

  /* 字串 → 32 bit 種子（FNV-1a）。同樣的 sid/spec/週次一定得到同一個種子。 */
  function seedOf(s) {
    var h = 2166136261;
    for (var i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = (h + (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24)) >>> 0;
    }
    return h >>> 0;
  }
  /* mulberry32：夠亂、夠短、跨瀏覽器結果一致（Math.random 不能用，每個人都不一樣）。 */
  function rng(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function shuffle(arr, rand) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(rand() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

  /* 抽出本週題組。回傳的順序也固定——不然每個人的第幾題不一樣，討論起來會對不上。
     cb(null, [{q, pid, title}, …]) 或 cb('錯誤訊息')。 */
  function pick(api, sid, spec, want, cb) {
    A = api;
    var sets = setId();
    var rand = rng(seedOf(sid + '|' + spec + '|' + sets));
    var list = api.EXAMS.filter(function (e) { return e.subj === sid; })
      .map(function (e) { return e.id; }).sort();          // 先排序：EXAMS 的順序不保證跨版本一樣
    if (!list.length) return cb('nopaper');
    var use = shuffle(list.slice(), rand).slice(0, MAX_PAPERS);
    api.loadMany(use, function () {
      var bank = [];
      use.slice().sort().forEach(function (pid) {          // 建題庫時用固定順序，不用抽卷的順序
        var p = api.papers[pid];
        if (!p) return;
        p.qs.slice().sort(function (a, b) { return a.n - b.n; }).forEach(function (q) {
          if (q.needfig && !q.fig) return;                 // 選項在圖上又沒圖檔的題不能考
          bank.push({ q: q, pid: pid, title: p.title });
        });
      });
      if (bank.length < 5) return cb('nodata');
      shuffle(bank, rng(seedOf('q|' + sid + '|' + spec + '|' + sets)));
      cb(null, bank.slice(0, Math.min(want, bank.length)), sets);
    });
  }

  /* 交成績並取回分布。沒登入就不送（後端要 Bearer token），只把畫面上的說明換掉。 */
  function submit(api, payload, cb) {
    A = api;
    api.kghApi('POST', '/rank', payload, function (err, d) { cb(err, d); });
  }
  function load(api, sid, spec, sets, cb) {
    A = api;
    api.kghApi('GET', '/rank?sid=' + encodeURIComponent(sid) + '&spec=' + spec
      + '&setid=' + encodeURIComponent(sets), null, cb);
  }

  /* 成績單上的排名區塊：百分位、同科分數分布、前十名。 */
  function render(main, api, ctx) {
    A = api;
    var s = el('section', 'sec'); s.style.marginTop = '18px';
    s.appendChild(api.sectionHead(T('本週排名賽　') + ctx.setid));
    if (!api.signedIn()) {
      s.appendChild(el('div', 'warnbox',
        T('要比名次請先登入（右上角「登入」）。沒登入也照常可以考，只是成績不會進排名。')));
      main.appendChild(s);
      return;
    }
    var d = ctx.data;
    if (!d) {
      s.appendChild(el('p', 'lead', T('成績上傳中…')));
      main.appendChild(s);
      return;
    }
    var p = el('div', 'panel');
    if (d.my) {
      var big = el('div', 'rk-top');
      big.appendChild(el('div', 'rk-pct', T('贏過 ') + d.my.percentile + '%'));
      big.appendChild(el('div', 'lead',
        T('本週這一科有 ') + d.n + T(' 人考過同一份題組，你排第 ') + d.my.rank
        + T(' 名，分數 ') + d.my.score + T(' 分；平均 ') + (d.mean == null ? '—' : d.mean) + T(' 分。')));
      p.appendChild(big);
    }
    // 分數分布：10 分一格，自己那一格標色
    var mine = d.my ? Math.min(Math.floor(d.my.score / 10), 9) : -1;
    var max = 1;
    d.hist.forEach(function (n) { if (n > max) max = n; });
    var chart = el('div', 'rk-hist');
    d.hist.forEach(function (n, i) {
      var col = el('div', 'rk-bar' + (i === mine ? ' me' : ''));
      var bar = el('div', 'rk-fill');
      bar.style.height = Math.round(n * 100 / max) + '%';
      bar.title = (i * 10) + '–' + (i === 9 ? 100 : i * 10 + 9) + T(' 分：') + n + T(' 人');
      col.appendChild(bar);
      col.appendChild(el('span', 'rk-lb', i * 10));
      chart.appendChild(col);
    });
    p.appendChild(chart);
    p.appendChild(el('p', 'lead', T('橫軸是分數（每 10 分一格），縱軸是人數；你所在的那一格會標色。')));
    s.appendChild(p);

    if (d.top && d.top.length) {
      var bd = el('div', 'panel bd-list'); bd.style.marginTop = '12px';
      d.top.forEach(function (r, i) {
        var row = el('div', 'bd-row' + (r.me ? ' me' : ''));
        row.appendChild(el('span', 'bd-no', String(i + 1)));
        row.appendChild(el('span', 'bd-nk', r.nick));
        row.appendChild(el('span', 'bd-sc', r.score + T(' 分')));
        bd.appendChild(row);
      });
      s.appendChild(bd);
    }
    s.appendChild(el('p', 'lead',
      T('排名賽每週換一次題組，同一週內同一科的每個人拿到的是同一份卷；重考只會留最好的那一次。')));
    main.appendChild(s);
  }

  window.KHRank = { setId: setId, pick: pick, submit: submit, load: load, render: render };
})();
