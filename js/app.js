/* 考英雄 — 前端全部邏輯
   純 vanilla JS、無 build；用 hash route，GitHub Pages 不需要伺服器端改寫。 */
(function () {
  'use strict';

  var CATS = window.APP_CATS || [];
  var SUBJ = window.APP_SUBJECTS || {};
  var EXAMS = window.APP_EXAMS || [];
  var PAPERS = window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};
  var VER = '20260908j';
  var KEY = 'kaohero.v1';
  var LAB = ['A', 'B', 'C', 'D', 'E'];   // 少數卷是五選一（地方特考五等國文、103~106 年律師第一試）
  var T = (window.KH && window.KH.T) || function (s) { return s; };
  function unitQ() { return T(' 題'); }
  function unitP() { return T(' 卷'); }
  function isEn() { return !!(window.KH && window.KH.lang() === 'en'); }
  function qLabel(n) { return isEn() ? ('Q ' + n) : ('第 ' + n + ' 題'); }
  function origQ(n) { return isEn() ? ('Paper Q ' + n) : ('原卷第 ' + n + ' 題'); }

  /* ============ 進度 ============ */
  var state = { stats: {}, wrong: [], last: null, drafts: {}, mocks: [], nick: null };
  /* 未完成的整卷測驗（2026-09-11）。以卷代碼為 key，只存「做到第幾題、每題選了什麼」，
     不存題目本身（題本另外動態載入），一份約 300 bytes。
     最多留 DRAFT_MAX 份（考生常同時刷好幾科），超過就丟最舊的；DRAFT_TTL 天沒碰自動清掉。 */
  var DRAFT_MAX = 5, DRAFT_TTL = 14 * 86400000;
  function load() {
    try {
      var o = JSON.parse(localStorage.getItem(KEY) || '{}');
      state.stats = o.stats || {}; state.wrong = o.wrong || []; state.last = o.last || null;
      state.drafts = o.drafts || {}; state.mocks = o.mocks || []; state.nick = o.nick || null;
    } catch (e) {}
    pruneDrafts();
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
  function draftDone(d) {
    var n = 0; (d && d.ans || []).forEach(function (x) { if (x != null) n++; }); return n;
  }
  function pruneDrafts() {
    var now = Date.now(), ids = [];
    for (var k in state.drafts) {
      if (!Object.prototype.hasOwnProperty.call(state.drafts, k)) continue;
      var d = state.drafts[k];
      if (!d || !d.ans || !draftDone(d) || (now - (d.updatedAt || 0)) > DRAFT_TTL) delete state.drafts[k];
      else ids.push(k);
    }
    if (ids.length > DRAFT_MAX) {
      ids.sort(function (a, b) { return (state.drafts[b].updatedAt || 0) - (state.drafts[a].updatedAt || 0); });
      ids.slice(DRAFT_MAX).forEach(function (k) { delete state.drafts[k]; });
    }
  }
  function latestDraft() {
    var best = null;
    for (var k in state.drafts) {
      if (!Object.prototype.hasOwnProperty.call(state.drafts, k)) continue;
      if (!best || (state.drafts[k].updatedAt || 0) > (best.updatedAt || 0)) best = state.drafts[k];
    }
    return best;
  }
  function saveDraft() {
    if (!quiz || quiz.mode !== 'paper' || quiz.done) return;
    if (!draftDone(quiz)) return;                    // 一題都還沒答就不留紀錄
    state.drafts[quiz.pid] = { pid: quiz.pid, title: quiz.title, i: quiz.i,
      ans: quiz.ans.slice(), ok: quiz.ok, total: quiz.qs.length, updatedAt: Date.now() };
    pruneDrafts(); save();
  }
  function clearDraft(pid) {
    if (pid && state.drafts[pid]) { delete state.drafts[pid]; save(); }
  }
  load();

  /* ============ 小工具 ============ */
  function el(t, c, x) { var n = document.createElement(t); if (c) n.className = c; if (x != null) n.textContent = x; return n; }
  function frag() { return document.createDocumentFragment(); }
  function pct(a, b) { return b ? Math.round(a * 1000 / b) / 10 : 0; }
  function totals() {
    var n = 0, ok = 0;
    for (var k in state.stats) { n += state.stats[k].n; ok += state.stats[k].ok; }
    return { n: n, ok: ok, rate: pct(ok, n) };
  }
  function examOf(id) { for (var i = 0; i < EXAMS.length; i++) if (EXAMS[i].id === id) return EXAMS[i]; return null; }
  function catOf(id) { for (var i = 0; i < CATS.length; i++) if (CATS[i].id === id) return CATS[i]; return null; }

  /* ============ 題本載入 ============ */
  var pend = {};
  function loadPaper(id, cb) {
    if (PAPERS[id]) return cb(PAPERS[id]);
    if (pend[id]) return pend[id].push(cb);
    pend[id] = [cb];
    var s = document.createElement('script');
    s.src = 'js/data/exam/' + id + '.js?v=' + VER;
    s.onload = s.onerror = function () {
      var fns = pend[id]; pend[id] = null;
      fns.forEach(function (f) { f(PAPERS[id] || null); });
    };
    document.head.appendChild(s);
  }
  function loadMany(ids, cb) {
    var left = ids.length, out = [];
    if (!left) return cb(out);
    ids.forEach(function (id) { loadPaper(id, function (p) { if (p) out.push(p); if (!--left) cb(out); }); });
  }

  /* ============ 版面元件 ============ */
  function sectionHead(title, moreText, moreHash) {
    var h = el('div', 'sec-h'); h.appendChild(el('h2', null, title));
    if (moreText) { var a = el('a', 'more', moreText); a.href = moreHash; a.setAttribute('data-nav', ''); h.appendChild(a); }
    return h;
  }
  function card(icon, title, desc, hash, badge, dim) {
    var n = el(hash ? 'a' : 'div', 'card' + (dim ? ' soon' : ''));
    if (hash) { n.href = hash; n.setAttribute('data-nav', ''); }
    var row = el('div', 'row');
    row.appendChild(el('span', 'ico', icon));
    var box = el('div');
    var h3 = el('h3', null, title);
    if (badge) { var b = el('span', 'badge' + (badge === T('已上線') ? ' b' : ''), badge); h3.appendChild(b); }
    box.appendChild(h3); row.appendChild(box); n.appendChild(row);
    n.appendChild(el('p', null, desc));
    return n;
  }
  function item(icon, title, sub, onClick, hash) {
    var n = el(hash ? 'a' : 'button', 'it');
    if (hash) { n.href = hash; n.setAttribute('data-nav', ''); }
    if (onClick) n.onclick = onClick;
    if (icon) n.appendChild(el('span', 'ico', icon));
    var t = el('span', 't'); t.appendChild(el('b', null, title));
    if (sub) t.appendChild(el('span', null, sub));
    n.appendChild(t); n.appendChild(el('span', 'go', '›'));
    return n;
  }
  function kpis(list) {
    var g = el('div', 'kpis');
    list.forEach(function (k) {
      var d = el('div', 'kpi'); d.appendChild(el('b', null, k[0])); d.appendChild(el('span', null, k[1])); g.appendChild(d);
    });
    return g;
  }
  function btn(text, cls, onClick, hash) {
    var n = el(hash ? 'a' : 'button', 'btn' + (cls ? ' ' + cls : ''), text);
    if (hash) { n.href = hash; n.setAttribute('data-nav', ''); }
    if (onClick) n.onclick = onClick;
    return n;
  }

  /* ============ 導覽 ============ */
  // 2026-09-08 Tony：考取心得先暫時從導覽拿掉（內容還沒累積真實案例）。
  // 路由 #/stories 與 viewStories 都保留，之後有內容把這一項加回 NAV 即可。
  var NAV = [['#/', '首頁'], ['#/exams', '考試題庫'], ['#/mock', '模擬考'], ['#/wrong', '錯題本'], ['#/guide', '準備方式'],
             ['#/sponsor', '贊助我們'], ['#/support', '客服中心']];
  function buildNav() {
    var nav = document.getElementById('nav'), dw = document.getElementById('drawer');
    nav.innerHTML = ''; dw.innerHTML = '';
    NAV.map(function (p) { return [p[0], T(p[1])]; }).forEach(function (p) {
      // 錯題本帶未消題數，否則使用者不知道裡面有東西（2026-09-11）
      var label = p[1] + (p[0] === '#/wrong' && state.wrong.length ? '（' + state.wrong.length + '）' : '');
      var a = el('a', null, label); a.href = p[0]; a.setAttribute('data-nav', ''); nav.appendChild(a);
      var b = el('a', null, label); b.href = p[0]; b.setAttribute('data-nav', ''); dw.appendChild(b);
    });
  }
  function markNav() {
    var h = location.hash || '#/';
    var base = '#/' + (h.split('/')[1] || '');
    [].forEach.call(document.querySelectorAll('#nav a'), function (a) {
      a.className = (a.getAttribute('href') === base) ? 'on' : '';
    });
  }
  /* 站務後台入口（2026-09-08 Tony 回報「登入了還是進不去後台」）：
     #/admin 原本沒有任何連結，只能手打網址。登入後在頁尾補一個入口；
     真正的權限仍由後端 OWNER_EMAIL 把關，非站長點進去只會看到一行「沒有後台權限」。 */
  function showAdminLink(on) {
    var col = document.querySelectorAll('.ft-in > div');
    col = col && col[col.length - 1];
    if (!col) return;
    var cur = document.getElementById('adminLink');
    if (!on) { if (cur) cur.remove(); return; }
    if (cur) return;
    var a = el('a', null, T('🛠 站務後台'));
    a.id = 'adminLink'; a.href = '#/admin'; a.setAttribute('data-nav', '');
    col.appendChild(a);
  }
  /* 只有站長看得到入口（2026-09-08 Tony：「不要給一般使用者看到」）。
     站長的 email 不寫進前端程式碼（避免公開、也避免被改），改問後端 /api/kgh/whoami，
     由後端回答是與否；真正的權限本來就在後端把關，這裡只管顯不顯示。 */
  function syncAdminLink() {
    var cfg = window.KH_CONFIG || {};
    var tk = window.KHSync && window.KHSync.token && window.KHSync.token();
    if (!tk || !cfg.API_BASE) { showAdminLink(false); return; }
    var xhr = new XMLHttpRequest();
    xhr.open('GET', cfg.API_BASE + '/api/kgh/whoami');
    xhr.setRequestHeader('Authorization', 'Bearer ' + tk);
    xhr.onload = function () {
      var owner = false;
      try { owner = !!JSON.parse(xhr.responseText).owner; } catch (e) {}
      showAdminLink(xhr.status >= 200 && xhr.status < 300 && owner);
    };
    xhr.onerror = function () { showAdminLink(false); };
    xhr.send();
  }
  window.addEventListener('kh-auth', syncAdminLink);

  /* 登入狀態晚一步才知道（2026-09-11 Tony 回報「有登入但還是叫我登入」）：
     sync.js 排在 app.js 後面，app.js 最底下的 render() 跑的時候 window.KHSync 還不存在，
     所以看登入與否的頁面（好友、模考英雄榜）第一次畫出來一律是「請先登入」。
     sync.js 備妥後會派 kh-auth，這裡收到就把這些頁重畫一次；答題中的頁面不動，免得作答被洗掉。 */
  var AUTH_VIEWS = { friends: 1, mock: 1, result: 1 };
  var authWas = null;
  window.addEventListener('kh-auth', function (e) {
    var now = !!(e && e.detail);
    if (now === authWas) return;
    authWas = now;
    if (AUTH_VIEWS[(location.hash.replace(/^#\/?/, '').split('/')[0] || 'home')]) render();
  });

  document.getElementById('burger').onclick = function () {
    var d = document.getElementById('drawer'), open = d.classList.toggle('open');
    this.setAttribute('aria-expanded', open ? 'true' : 'false');
  };
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-nav]');
    if (a) document.getElementById('drawer').classList.remove('open');
  });

  /* ============ 首頁 ============ */
  /* 首頁（2026-09-06 改版：Tony 從三個提案選了 A「金榜學術風」）
     版型重點：深色金字的 hero＋四個大數字、三張優勢卡、
     「同樣一題，兩種待遇」左右對照（左邊只有一個大大的Ａ＝別站，右邊是本站完整詳解）。
     對照用的示範題是站上真的一題：110 年第一次 醫學（一）第 5 題。 */
  /* 首頁對照區的示範題：站上真實題目，可切換考科（醫事／法律各一，證明不是只有醫科） */
  var DEMOS = [{
    tab: '醫師國考',
    src: '110 年第一次　專技高考醫師分階段考試　醫學（一）　第 5 題',
    q: '下列何者傳遞角膜（cornea）的一般感覺？',
    o: ['鼻睫神經（nasociliary nerve）', '額神經（frontal nerve）',
        '眶上神經（supraorbital nerve）', '動眼神經（oculomotor nerve）'],
    a: 0,
    exp: ['✅ (A) 角膜的一般感覺由三叉神經第一分支（眼神經）→ 鼻睫神經 → 睫狀長神經傳入，這正是角膜反射的傳入路徑（傳出為顏面神經支配眼輪匝肌）。',
          '❌ (B) 額神經也是眼神經的分支，但分布在前額與上眼瞼皮膚，不進入眼球。',
          '❌ (C) 眶上神經是額神經的終末分支，管前額與頭皮的感覺。',
          '❌ (D) 動眼神經是運動與副交感神經，不傳遞角膜的一般感覺。'],
    srcline: "📚 出處：Moore's Clinically Oriented Anatomy, 8th ed., Ch.7 Head（Orbit）；Gray's Anatomy for Students, 4th ed.。"
  }, {
    tab: '律師司法官',
    src: '115 年　律師／司法官第一試　綜合法學（一）憲法組　第 11 題',
    q: '依司法院解釋意旨，下列何者不屬於憲法服公職權保障之範圍？',
    o: ['公務人員依法令晉敘陞遷之權利', '公務人員之在職進修',
        '公務人員依法取得之官等', '公務人員之俸給'],
    a: 1,
    exp: ['✅ (B) 公務人員之在職進修：進修屬機關內部人事管理與培訓措施，未涉及身分、官等、俸給等重要權利的變動，大法官認其不在憲法第 18 條服公職權的保障範圍內。',
          '❌ (A) 依法令晉敘陞遷之權利：屬服公職權保障範圍，涉及身分上的重要權利，受侵害時得循訴訟途徑救濟。',
          '❌ (C) 依法取得之官等：官等為公務人員身分的核心表徵，非依法定事由與程序不得剝奪。',
          '❌ (D) 公務人員之俸給：屬服公職權中的財產上重要給付，與退休金同受保障。'],
    srcline: '📚 出處：中華民國憲法第 18 條；司法院釋字第 575 號（官等與身分保障）、第 605 號（晉敘陞遷）、第 658 號（退休金）、第 785 號（權益救濟範圍）。'
  }];

  function viewHome(main) {
    var liveN = EXAMS.length, liveQ = EXAMS.reduce(function (a, b) { return a + b.n; }, 0);
    var expQ = EXAMS.reduce(function (a, b) { return a + (b.exp || 0); }, 0);
    var years = EXAMS.map(function (e) { return e.roc; });

    /* ---- Hero ---- */
    var hero = el('section', 'hero');
    hero.appendChild(el('span', 'kicker', T('★ 免費・無廣告・不用註冊')));
    var h1 = el('h1', 'serif');
    h1.appendChild(document.createTextNode(T('國家考試考古題，')));
    h1.appendChild(document.createElement('br'));
    h1.appendChild(document.createTextNode(T('刷到')));
    h1.appendChild(el('em', null, T('會為止')));
    h1.appendChild(document.createTextNode('。'));
    hero.appendChild(h1);
    hero.appendChild(el('p', 'sub', liveQ.toLocaleString() + T(' 題歷屆試題與標準答案，取自考選部與教育部公開資料；其中 ')
      + expQ.toLocaleString() + T(' 題附上本站自己寫的逐題詳解——每題告訴你正解為什麼對、其他選項錯在哪，並附教科書章節或法條出處。')));
    var br = el('div', 'btnrow');
    br.appendChild(btn(T('開始刷題 →'), 'g', null, '#/exams'));
    // 2026-09-10 Tony 回報「進去是空的」：這顆鈕原本 href='#demo'，會被 hash 路由當成
    // 不存在的頁面而落到 viewNotFound。詳解實例本來就在首頁下方，改成捲動到該區塊即可。
    br.appendChild(btn(T('看看詳解長什麼樣'), '', function (e) {
      e.preventDefault();
      var t = document.getElementById('demo');
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }));
    hero.appendChild(br);
    var nums = el('div', 'nums');
    [[liveQ.toLocaleString(), T('題（持續增加）')], [liveN.toLocaleString(), T('卷完整考古卷')],
     [expQ.toLocaleString(), T('題自撰詳解')],
     [Math.min.apply(null, years) + '–' + Math.max.apply(null, years), T('民國年份跨度')]].forEach(function (x) {
      var d = el('div', 'num'); d.appendChild(el('b', null, x[0])); d.appendChild(el('span', null, x[1]));
      nums.appendChild(d);
    });
    hero.appendChild(nums);
    main.appendChild(hero);

    /* ---- 三個優勢 ---- */
    var s0 = el('section', 'sec');
    s0.appendChild(el('p', 'eyebrow', T('為什麼選考英雄')));
    s0.appendChild(el('h2', 'big-h serif', T('別人給你答案，我們給你為什麼')));
    s0.appendChild(el('p', 'lead', T('市面上的考古題網站多半只給一個字母。答錯了還是不知道錯在哪，下次照樣錯——尤其是醫學這種「一條神經、一個症候群」差一點就全錯的科目。')));
    var eg = el('div', 'edge');
    [['✍️', T('詳解是自己寫的'), T('不是抄來的懶人包。每題四個選項逐一說明，醫學題引教科書章節、法律題引法條與釋字，錯的選項也講清楚錯在哪一個字。'), T('已完成 ') + expQ.toLocaleString() + unitQ()],
     ['🆓', T('真的全部免費'), T('不擋題、不限次數、不用註冊，沒有「解鎖完整詳解」的按鈕。進度存在你自己的瀏覽器裡。'), T('無廣告・無付費牆')],
     ['🎯', T('錯的才值得再做'), T('錯題自動進錯題本，答對就移除；弱點統計依科目與年份排序，讓你把時間花在最弱的那一塊。'), T('整卷測驗＋無限刷題')]
    ].forEach(function (x) {
      var d = el('div', 'e');
      d.appendChild(el('i', null, x[0]));
      d.appendChild(el('h3', null, x[1]));
      d.appendChild(el('p', null, x[2]));
      d.appendChild(el('span', 'tag', x[3]));
      eg.appendChild(d);
    });
    s0.appendChild(eg); main.appendChild(s0);

    /* ---- 同樣一題，兩種待遇 ---- */
    var s1 = el('section', 'sec'); s1.id = 'demo';
    s1.appendChild(el('p', 'eyebrow', T('詳解實例')));
    s1.appendChild(el('h2', 'big-h serif', T('同樣一題，兩種待遇')));

    /* 考科切換：同一個版位換題，不把頁面拉長一倍 */
    var tabs = el('div', 'demo-tabs'), srcLine = el('p', 'lead demo-src'), vsWrap = el('div');
    function renderDemo(D) {
      srcLine.textContent = '📄 ' + D.src;
      vsWrap.innerHTML = '';
      var vs = el('div', 'vs');

      var colA = el('div', 'vs-col');
      colA.appendChild(el('p', 'vs-h', T('一般考古題網站')));
      var other = el('div', 'other');
      var obody = el('div', 'body');
      obody.appendChild(el('p', 'stem', D.q));
      /* 選項兩邊都印，差別只在右邊多了詳解 */
      D.o.forEach(function (o, i) {
        var d = el('div', 'opt' + (i === D.a ? ' ok' : ''));
        d.appendChild(el('b', null, LAB[i])); d.appendChild(el('span', null, o));
        if (i === D.a) d.appendChild(el('em', 'ans-tag', T('答案')));
        obody.appendChild(d);
      });
      var ovoid = el('div', 'void');
      ovoid.appendChild(el('div', 'big-a', LAB[D.a]));
      ovoid.appendChild(el('p', 'after', T('…就這樣沒了。為什麼其他三個不行？差在哪一個字？下次換個問法來考，還是會錯。')));
      obody.appendChild(ovoid);
      other.appendChild(obody); colA.appendChild(other); vs.appendChild(colA);

      var ours = el('div', 'vs-col ours');
      ours.appendChild(el('p', 'vs-h', T('考英雄')));
      var demo = el('div', 'demo');
      var body = el('div', 'body');
      body.appendChild(el('p', 'stem', D.q));
      D.o.forEach(function (o, i) {
        var d = el('div', 'opt' + (i === D.a ? ' ok' : ''));
        d.appendChild(el('b', null, LAB[i])); d.appendChild(el('span', null, o));
        body.appendChild(d);
      });
      var exp = el('div', 'exp');
      D.exp.forEach(function (line, i) {      // ✅ 那一行放大、加粗，錯選項維持原級
        exp.appendChild(el('p', i === 0 ? 'exp-l exp-ok' : 'exp-l', line));
      });
      exp.appendChild(el('span', 'src', D.srcline));
      body.appendChild(exp);
      body.appendChild(el('p', 'note', T('每一題的詳解都是這個規格：✅ 正解理由 ／ ❌ 三個錯誤選項各錯在哪 ／ 📚 可查證的出處。')));
      demo.appendChild(body); ours.appendChild(demo); vs.appendChild(ours);
      vsWrap.appendChild(vs);
    }
    DEMOS.forEach(function (D, i) {
      var b = el('button', 'demo-tab' + (i ? '' : ' on'), T(D.tab));
      b.type = 'button';
      b.onclick = function () {
        Array.prototype.forEach.call(tabs.children, function (c) { c.className = 'demo-tab'; });
        b.className = 'demo-tab on';
        renderDemo(D);
      };
      tabs.appendChild(b);
    });
    s1.appendChild(tabs); s1.appendChild(srcLine);
    renderDemo(DEMOS[0]);
    s1.appendChild(vsWrap); main.appendChild(s1);

    /* ---- 考試分類 ---- */
    var s2 = el('section', 'sec');
    s2.appendChild(sectionHead(T('選擇考試類別'), T('全部類別 →'), '#/exams'));
    var g = el('div', 'cards');
    CATS.forEach(function (c) {
      c.exams.forEach(function (x) {
        var n = EXAMS.filter(function (e) { return e.exam === x.id; });
        g.appendChild(card(x.icon, x.name, x.live && n.length
            ? (n.length + T(' 卷 · ') + n.reduce(function (a, b) { return a + b.n; }, 0).toLocaleString() + unitQ())
            : x.note,
          x.live ? '#/exam/' + x.id : null, x.live ? T('已上線') : T('建置中'), !x.live));
      });
    });
    s2.appendChild(g); main.appendChild(s2);

    /* ---- 我的練習狀況 ---- */
    var t = totals();
    var s3 = el('section', 'sec');
    s3.appendChild(sectionHead(T('我的練習狀況'), T('看完整統計 →'), '#/stats'));
    s3.appendChild(kpis([[t.n.toLocaleString(), T('已作答')],
      [t.n ? t.rate + '%' : '—', T('正確率')], [String(state.wrong.length), T('錯題待複習')]]));
    var br2 = el('div', 'btnrow'); br2.style.marginTop = '12px';
    var dr = latestDraft();
    if (dr) {
      br2.appendChild(btn(T('接續：') + dr.title + T('（第 ') + ((dr.i || 0) + 1) + T(' 題）'), '',
        function () { resumeAsked[dr.pid] = 'go'; }, '#/paper/' + dr.pid));
    } else if (state.last) {
      br2.appendChild(btn(T('再做一次：') + state.last.label, 'o', null, '#/paper/' + state.last.id));
    }
    br2.appendChild(btn(T('複習錯題本'), 'o', null, '#/wrong'));
    br2.appendChild(btn(T('⏱️ 模擬考'), 'o', null, '#/mock'));
    s3.appendChild(br2); main.appendChild(s3);

    /* ---- 三步驟＋資料來源 ---- */
    var s4 = el('section', 'sec');
    s4.appendChild(el('p', 'eyebrow', T('怎麼用')));
    s4.appendChild(el('h2', 'big-h serif', T('三步就開始')));
    var steps = el('div', 'steps');
    [[T('選考試與科目'), T('從考試分類進去，挑一個科目，看看哪一年還沒做過。')],
     [T('整卷或隨機'), T('整卷測驗模擬真實節奏；沒空就用無限刷題，答完立刻看詳解。')],
     [T('回頭清錯題'), T('錯題本累積你的弱點，統計頁告訴你哪一科、哪一年最需要補。')]
    ].forEach(function (x) {
      var d = el('div', 'st'); d.appendChild(el('h3', null, x[0])); d.appendChild(el('p', null, x[1]));
      steps.appendChild(d);
    });
    s4.appendChild(steps);
    var note = el('div', 'src-note');
    note.appendChild(el('b', null, T('資料來源：')));
    note.appendChild(document.createTextNode(
      T('試題與標準答案取自考選部「考畢試題查詢平臺」與教育部教師資格考試網站公開之資料（政府資訊公開）。站上的詳解與所有文案皆為本站自撰，未取用任何第三方網站的解析內容。')));
    s4.appendChild(note);
    main.appendChild(s4);
  }

  /* ============ 考試總覽 ============ */
  function viewExams(main) {
    main.appendChild(el('h1', 'pg-h', T('考試題庫')));
    main.appendChild(el('p', 'lead', T('所有已建置與規劃中的考試類別。已上線的可以直接開始練習。')));
    CATS.forEach(function (c) {
      var s = el('section', 'sec');
      s.appendChild(sectionHead(c.icon + T('　') + c.name));
      var g = el('div', 'cards');
      c.exams.forEach(function (x) {
        var n = EXAMS.filter(function (e) { return e.exam === x.id; });
        g.appendChild(card(x.icon, x.name, x.live && n.length
            ? (n.length + T(' 卷 · ') + n.reduce(function (a, b) { return a + b.n; }, 0).toLocaleString() + unitQ())
            : x.note,
          x.live ? '#/exam/' + x.id : null, x.live ? T('已上線') : T('建置中'), !x.live));
      });
      s.appendChild(g); main.appendChild(s);
    });
  }

  /* ============ 單一考試（分階段、分科目） ============ */
  function viewExam(main, examId) {
    var meta = null, cat = null;
    CATS.forEach(function (c) { c.exams.forEach(function (x) { if (x.id === examId) { meta = x; cat = c; } }); });
    if (!meta) return viewNotFound(main);
    main.appendChild(el('h1', 'pg-h', meta.name));
    main.appendChild(el('p', 'lead', meta.note || ''));
    if (!meta.live) {
      var w = el('div', 'panel'); w.style.padding = '18px';
      w.appendChild(el('p', null, T('這個考試的題庫還在建置中，敬請期待。')));
      main.appendChild(w); return;
    }
    if ((meta.stages || []).some(function (st) { return st.groups; })) return viewExamTree(main, meta, examId);
    (meta.stages || []).forEach(function (st) {
      var s = el('section', 'sec');
      s.appendChild(sectionHead(st.name + T('　') + st.note));
      var p = el('div', 'panel');
      st.subjects.forEach(function (sid) {
        var list = EXAMS.filter(function (e) { return e.exam === examId && e.subj === sid; });
        if (!list.length) return;
        var stat = list.reduce(function (a, e) {
          var s2 = state.stats[e.id]; if (s2) { a.n += s2.n; a.ok += s2.ok; } return a;
        }, { n: 0, ok: 0 });
        var ex = list.reduce(function (a, b) { return a + (b.exp || 0); }, 0);
        p.appendChild(item('📘', SUBJ[sid].name,
          list.length + T(' 卷 · ') + list.reduce(function (a, b) { return a + b.n; }, 0) + T(' 題　')
          + SUBJ[sid].note + (ex ? T('　｜✍ 詳解 ') + ex + unitQ() : '')
          + (stat.n ? T('　｜已作答 ') + stat.n + T(' 題，正確率 ') + pct(stat.ok, stat.n) + '%' : ''),
          null, '#/subject/' + examId + '/' + sid));
      });
      s.appendChild(p); main.appendChild(s);
    });
  }

  /* ============ 類科很多的考試（高普考）：等別 → 類群 → 類科 ============ */
  function papersOf(examId, sids) {
    return EXAMS.filter(function (e) { return e.exam === examId && sids.indexOf(e.subj) >= 0; });
  }
  function sumQ(list) { return list.reduce(function (a, b) { return a + b.n; }, 0); }

  function viewExamTree(main, meta, examId) {
    var box = el('div', 'panel'); box.style.padding = '12px 14px';
    var inp = el('input', 'find');
    inp.type = 'search'; inp.placeholder = T('搜尋類科或科目，例如：一般行政、行政法');
    inp.setAttribute('aria-label', T('搜尋類科'));
    box.appendChild(inp); main.appendChild(box);

    var host = el('div'); main.appendChild(host);
    function draw(kw) {
      host.innerHTML = '';
      kw = (kw || '').trim();
      var hit = 0;
      (meta.stages || []).forEach(function (st) {
        var sec = el('section', 'sec'), any = false;
        sec.appendChild(sectionHead(st.name));
        if (st.note) sec.appendChild(el('p', 'lead', st.note));
        (st.groups || []).forEach(function (g) {
          var tracks = g.tracks.filter(function (t) {
            if (!kw) return true;
            if (t.name.indexOf(kw) >= 0) return true;
            return t.subjects.some(function (sid) { return SUBJ[sid] && SUBJ[sid].name.indexOf(kw) >= 0; });
          }).filter(function (t) { return papersOf(examId, t.subjects).length; });
          if (!tracks.length) return;
          any = true; hit += tracks.length;
          var h = el('h3', 'grp', g.name); sec.appendChild(h);
          var p = el('div', 'panel');
          tracks.forEach(function (t) {
            var list = papersOf(examId, t.subjects);
            var subs = {}; list.forEach(function (e) { subs[e.subj] = 1; });
            p.appendChild(item('📁', t.name,
              Object.keys(subs).length + T(' 科　') + list.length + T(' 卷 ') + sumQ(list) + unitQ(),
              null, '#/track/' + examId + '/' + encodeURIComponent(t.id)));
          });
          sec.appendChild(p);
        });
        if (any) host.appendChild(sec);
      });
      if (!hit) host.appendChild(el('p', 'lead', T('沒有符合的類科，換個關鍵字試試。')));
    }
    inp.oninput = function () { draw(inp.value); };
    draw('');
  }

  function findTrack(examId, tid) {
    var out = null;
    CATS.forEach(function (c) {
      c.exams.forEach(function (x) {
        if (x.id !== examId) return;
        (x.stages || []).forEach(function (st) {
          (st.groups || []).forEach(function (g) {
            g.tracks.forEach(function (t) { if (t.id === tid) out = { t: t, g: g, st: st, x: x }; });
          });
        });
      });
    });
    return out;
  }

  function viewTrack(main, examId, tid) {
    var f = findTrack(examId, decodeURIComponent(tid || ''));
    if (!f) return viewNotFound(main);
    var list = papersOf(examId, f.t.subjects);
    main.appendChild(el('h1', 'pg-h', f.st.name + T('　') + f.t.name));
    main.appendChild(el('p', 'lead', f.x.name + T('　·　') + f.g.name + T('　·　')
      + list.length + T(' 卷 ') + sumQ(list) + unitQ()));

    var s0 = el('section', 'sec');
    var g0 = el('div', 'cards');
    var c1 = card('♾️', T('這個類科隨機刷題'), T('把這個類科所有科目、所有年份混在一起出題'), null);
    c1.style.cursor = 'pointer';
    c1.onclick = function () { startDrillMany(f.t.subjects, f.t.name); };
    g0.appendChild(c1);
    s0.appendChild(g0); main.appendChild(s0);

    var s = el('section', 'sec');
    s.appendChild(sectionHead(T('科目')));
    var p = el('div', 'panel');
    f.t.subjects.forEach(function (sid) {
      var ls = EXAMS.filter(function (e) { return e.exam === examId && e.subj === sid; });
      if (!ls.length || !SUBJ[sid]) return;
      var stat = ls.reduce(function (a, e) {
        var s2 = state.stats[e.id]; if (s2) { a.n += s2.n; a.ok += s2.ok; } return a;
      }, { n: 0, ok: 0 });
      p.appendChild(item('📘', SUBJ[sid].name,
        ls.length + T(' 卷 · ') + sumQ(ls) + unitQ()
        + (SUBJ[sid].note ? T('　') + SUBJ[sid].note : '')
        + (stat.n ? T('　｜已作答 ') + stat.n + T(' 題，正確率 ') + pct(stat.ok, stat.n) + '%' : ''),
        null, '#/subject/' + examId + '/' + sid));
    });
    s.appendChild(p); main.appendChild(s);
  }

  /* ============ 單一科目：刷題入口＋年份卷別 ============ */
  function viewSubject(main, examId, sid) {
    if (!SUBJ[sid]) return viewNotFound(main);
    var list = EXAMS.filter(function (e) { return e.exam === examId && e.subj === sid; });
    main.appendChild(el('h1', 'pg-h', SUBJ[sid].name));
    main.appendChild(el('p', 'lead', SUBJ[sid].note + T('　·　') + list.length + T(' 卷 ')
      + list.reduce(function (a, b) { return a + b.n; }, 0) + unitQ()));

    var s0 = el('section', 'sec');
    var g = el('div', 'cards');
    var c1 = card('♾️', T('無限刷題'), T('從這一科所有年份隨機出題，答完立刻看答案與詳解'), null);
    c1.onclick = function () { startDrill(sid); }; c1.className = 'card'; c1.style.cursor = 'pointer';
    g.appendChild(c1);
    var wn = state.wrong.filter(function (w) { var e = examOf(w.pid); return e && e.subj === sid; }).length;
    var c2 = card('📕', T('只練這科的錯題') + (wn ? '（' + wn + unitQ() + '）' : ''),
      wn ? T('複習你在這一科答錯過的題目') : T('這一科目前沒有錯題'), null, null, !wn);
    if (wn) { c2.onclick = function () { startWrong(sid); }; c2.style.cursor = 'pointer'; }
    g.appendChild(c2);
    var c3 = card('⏱️', T('模擬考'), T('照這一科的正式題數與時間限時作答，交卷後才看得到答案'), null);
    c3.onclick = function () { startMock(sid, 'full'); }; c3.style.cursor = 'pointer';
    g.appendChild(c3);
    s0.appendChild(g); main.appendChild(s0);

    var s = el('section', 'sec');
    s.appendChild(sectionHead(T('整卷測驗')));
    s.appendChild(el('p', 'lead', T('一次做完一整卷，作答完成後計分並列出對錯。')));
    var p = el('div', 'panel');
    list.forEach(function (e) {
      var st = state.stats[e.id];
      p.appendChild(item('📄', e.label,
        e.n + unitQ() + (e.exp ? T('　｜✍ 詳解 ') + e.exp + unitQ() : '')
        + (st ? T('　｜已作答 ') + st.n + T(' 題，正確率 ') + pct(st.ok, st.n) + '%' : ''),
        null, '#/paper/' + e.id));
    });
    s.appendChild(p); main.appendChild(s);
  }

  /* ============ 作答 ============ */
  var quiz = null;

  var loadingPid = null;
  function startPaper(id, resume) {
    if (loadingPid === id) return;
    loadingPid = id;
    loadPaper(id, function (p) {
      loadingPid = null;
      if (!p) return toast(T('題本載入失敗，請重新整理再試一次。'));
      quiz = { mode: 'paper', pid: id, title: p.title, qs: p.qs.slice(), i: 0, ans: [], ok: 0 };
      var d = resume && state.drafts[id];
      if (d && d.total === quiz.qs.length) {          // 題數對不上代表題本改過，寧可重來
        quiz.ans = d.ans.slice(); quiz.ok = d.ok || 0;
        quiz.i = Math.min(d.i || 0, quiz.qs.length - 1);
      } else clearDraft(id);
      state.last = { id: id, label: p.title }; save();
      render();
    });
  }
  function startDrill(sid) {
    var ids = EXAMS.filter(function (e) { return !sid || e.subj === sid; }).map(function (e) { return e.id; });
    shuffle(ids);
    loadMany(ids.slice(0, 5), function (ps) {
      if (!ps.length) return toast(T('題本載入失敗，請重新整理再試一次。'));
      var pool = [];
      ps.forEach(function (p) { p.qs.forEach(function (q) { pool.push({ q: q, pid: p.id, title: p.title }); }); });
      shuffle(pool);
      var take = pool.slice(0, 40);
      quiz = { mode: 'drill', sid: sid, title: T('無限刷題 · ') + (sid ? SUBJ[sid].name : T('全部')),
        meta: take, qs: take.map(function (x) { return x.q; }), i: 0, ans: [], ok: 0 };
      location.hash = '#/quiz';
    });
  }
  function startDrillMany(sids, label) {
    var ids = EXAMS.filter(function (e) { return sids.indexOf(e.subj) >= 0; }).map(function (e) { return e.id; });
    if (!ids.length) return toast(T('這個範圍還沒有題目。'));
    shuffle(ids);
    loadMany(ids.slice(0, 6), function (ps) {
      if (!ps.length) return toast(T('題本載入失敗，請重新整理再試一次。'));
      var pool = [];
      ps.forEach(function (p) { p.qs.forEach(function (q) { pool.push({ q: q, pid: p.id, title: p.title }); }); });
      shuffle(pool);
      var take = pool.slice(0, 40);
      quiz = { mode: 'drill', sid: null, title: T('無限刷題 · ') + label,
        meta: take, qs: take.map(function (x) { return x.q; }), i: 0, ans: [], ok: 0 };
      location.hash = '#/quiz';
    });
  }
  function startWrong(sid) {
    var ws = state.wrong.filter(function (w) {
      if (!sid) return true; var e = examOf(w.pid); return e && e.subj === sid;
    });
    if (!ws.length) return toast(T('這個範圍目前沒有錯題。'));
    var ids = []; ws.forEach(function (w) { if (ids.indexOf(w.pid) < 0) ids.push(w.pid); });
    loadMany(ids, function () {
      var items = [];
      ws.forEach(function (w) {
        var p = PAPERS[w.pid]; if (!p) return;
        var q = p.qs.filter(function (z) { return z.n === w.n; })[0];
        if (q) items.push({ q: q, pid: w.pid, title: p.title });
      });
      if (!items.length) return toast(T('錯題本是空的。'));
      shuffle(items);
      quiz = { mode: 'wrong', sid: sid, title: T('錯題複習') + (sid ? ' · ' + SUBJ[sid].name : ''),
        meta: items, qs: items.map(function (x) { return x.q; }), i: 0, ans: [], ok: 0 };
      location.hash = '#/quiz';
    });
  }
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } }
  function curMeta() { return quiz.mode === 'paper' ? { pid: quiz.pid, title: quiz.title } : quiz.meta[quiz.i]; }

  function viewQuiz(main) {
    if (!quiz) { location.hash = '#/'; return; }
    var q = quiz.qs[quiz.i];
    if (!q) return viewResult(main);
    saveDraft();
    var m = curMeta();

    var bar = el('div', 'prog'); var i2 = el('i'); i2.style.width = (quiz.i / quiz.qs.length * 100) + '%';
    bar.appendChild(i2); main.appendChild(bar);

    var c = el('div', 'panel'); c.style.padding = '16px';
    var meta = el('div', 'qmeta');
    meta.appendChild(el('span', null, (T('第 ') + (quiz.i + 1) + ' / ' + quiz.qs.length + unitQ())));
    meta.appendChild(el('span', null, quiz.mode === 'paper' ? origQ(q.n) : m.title));
    c.appendChild(meta);
    // 題組短文（閱讀測驗、克漏字）：每一題都自帶一份，單看一題也讀得懂
    if (q.psg) {
      var pb = el('div', 'psg');
      pb.appendChild(el('b', null, T('短文')));
      pb.appendChild(el('p', null, q.psg));
      c.appendChild(pb);
    }
    c.appendChild(el('div', 'stem', q.q));

    if (q.fig) {
      var im = el('img', 'qfig'); im.src = q.fig; im.loading = 'lazy';
      im.alt = qLabel(q.n) + T(' 題的原始題目圖（含選項）');
      c.appendChild(im);
      c.appendChild(el('p', 'lead', T('這一題的選項含有圖形，上方為原始試卷的圖，請依圖作答。')));
    } else if (q.needfig) {
      c.appendChild(el('div', 'warnbox', T('⚠ 這一題的選項在原始試卷上是圖片，本站尚未補上圖檔，暫時無法作答。')));
      c.appendChild(btn(T('跳過這一題'), 'w', function () { quiz.i++; render(); }));
      main.appendChild(c); return;
    }

    var picked = quiz.ans[quiz.i];
    q.o.forEach(function (txt, k) {
      var b = el('button', 'opt');
      b.appendChild(el('span', 'lab', LAB[k] + '.'));
      b.appendChild(document.createTextNode(txt && txt.trim() ? txt : T('（見上圖）')));
      if (picked != null) {
        b.disabled = true;
        if (isRight(q, k)) b.className = 'opt correct';
        else if (k === picked) b.className = 'opt wrong';
      } else b.onclick = function () { answer(k); };
      c.appendChild(b);
    });

    if (picked != null) {
      var good = isRight(q, picked);
      var fb = el('div', 'fb ' + (good ? 'ok' : 'no'));
      fb.appendChild(el('b', null, q.void ? T('⭕ 本題送分') : (good ? T('✅ 答對了') : T('❌ 答錯了'))));
      if (q.void) fb.appendChild(document.createTextNode(
        T('　考選部公布本題送分，四個選項均給分，因此不論你選哪一個都算答對。')));
      else if (q.alt && q.alt.length) fb.appendChild(document.createTextNode(
        T('　考選部公布本題有多個答案均給分：') + [q.a].concat(q.alt).map(function (i) { return LAB[i]; }).join('、')));
      if (q.exp) {
        // 詳解逐行拆開：✅ 正解那行放大加粗（那是答案本身），❌ 三行維持原級當佐證，
        // 📚 出處另起一段。整段黏成一坨最難讀，這是 Tony 2026-09-08 提的。
        var xw = el('div', 'fb-exp');
        q.exp.split('\n').forEach(function (line) {
          if (!line) return;
          var cls = 'x-l';
          if (line.indexOf('✅') === 0) cls += ' x-ok';
          else if (line.indexOf('📚') === 0) cls += ' x-src';
          xw.appendChild(el('p', cls, line));
        });
        fb.appendChild(xw);
      }
      else if (!q.void) {
        fb.appendChild(document.createTextNode(T('　標準答案：') + LAB[q.a] + '. ' + q.o[q.a]));
        var nt = el('div', 'lead', T('（本題詳解尚未撰寫，會分批補上。）')); nt.style.margin = '6px 0 0';
        fb.appendChild(nt);
      }
      c.appendChild(fb);
      // 題目回報入口（2026-09-08）：使用者指出錯誤 → 後台收件匣 → 修正後標修訂日期。
      // 「這裡有問題會修，而且查得到」才是護城河，不是詳解的字數。
      if (window.KHReport) {
        var rw = el('div', 'rp-wrap');
        rw.appendChild(window.KHReport.link(m.pid || quiz.pid || '', q.n));
        c.appendChild(rw);
      }
      c.appendChild(btn(quiz.i + 1 < quiz.qs.length ? T('下一題 →') : T('看結果'), 'w',
        function () { quiz.i++; render(); }));
    }
    main.appendChild(c);
    var row = el('div', 'btnrow'); row.style.marginTop = '12px';
    row.appendChild(btn(T('結束並看成績'), 'o', function () { quiz.done = true; render(); }));
    main.appendChild(row);
  }

  // 判對的唯一入口：送分題（void）全部算對；考選部公布「答Ａ、Ｂ 均給分」的題，alt 裡的也算對
  function isRight(q, k) {
    return !!q.void || k === q.a || (q.alt || []).indexOf(k) >= 0;
  }

  /* 記一題的統計與錯題狀態。整卷測驗是答一題記一次，模擬考則在交卷時整卷記一次。 */
  function recordAnswer(pid, n, good) {
    var st = state.stats[pid] || (state.stats[pid] = { n: 0, ok: 0 });
    st.n++; if (good) st.ok++;
    var wi = -1;
    state.wrong.forEach(function (w, idx) { if (w.pid === pid && w.n === n) wi = idx; });
    if (good) {
      if (wi >= 0) {
        var w0 = state.wrong[wi];
        w0.s = (w0.s || 0) + 1;
        if (w0.s >= 2) state.wrong.splice(wi, 1);
      }
    } else if (wi < 0) state.wrong.push({ pid: pid, n: n, s: 0 });
    else state.wrong[wi].s = 0;
  }

  function answer(k) {
    var q = quiz.qs[quiz.i], m = curMeta();
    quiz.ans[quiz.i] = k;
    var good = isRight(q, k); if (good) quiz.ok++;
    recordAnswer(m.pid, q.n, good);
    save(); buildNav(); markNav(); render();
  }

  function viewResult(main) {
    if (quiz.mode === 'paper') clearDraft(quiz.pid);
    var done = quiz.ans.filter(function (x) { return x != null; }).length;
    var c = el('div', 'panel'); c.style.padding = '20px';
    c.appendChild(el('h2', null, quiz.title));
    c.appendChild(el('div', 'big', done ? pct(quiz.ok, done) + '%' : '—'));
    c.appendChild(el('p', 'lead', T('作答 ') + done + T(' 題，答對 ') + quiz.ok + T(' 題，答錯 ') + (done - quiz.ok) + T(' 題。')
      + (quiz.mode === 'paper' ? T('（本卷共 ') + quiz.qs.length + T(' 題）') : '')));
    main.appendChild(c);

    var wrongList = [];
    quiz.ans.forEach(function (a, i) {
      if (a != null && !quiz.qs[i].void && a !== quiz.qs[i].a) wrongList.push({ i: i, q: quiz.qs[i], a: a });
    });
    if (wrongList.length) {
      var wc = el('section', 'sec'); wc.style.marginTop = '16px';
      wc.appendChild(sectionHead(T('答錯的題目（') + wrongList.length + T('）')));
      var p = el('div', 'panel');
      wrongList.forEach(function (w) {
        p.appendChild(item(null, (quiz.mode === 'paper' ? origQ(w.q.n) : qLabel(w.i + 1)),
          T('你選 ') + LAB[w.a] + T('　正解 ')
            + [w.q.a].concat(w.q.alt || []).map(function (i) { return LAB[i]; }).join('、'), null));
      });
      wc.appendChild(p);
      wc.appendChild(el('p', 'lead',
        T('答錯的題目已自動加入錯題本，連續答對 2 次才會移除（答對一次就移除的話，猜對的題會永久消失）。')));
      var wr = el('div', 'btnrow'); wr.style.marginTop = '12px';
      wr.appendChild(btn(T('立即重練這些錯題'), '', function () {
        startWrongList(wrongList.map(function (w) { return { pid: curPidOf(w), n: w.q.n }; }));
      }));
      wr.appendChild(btn(T('前往錯題本 →'), 'o', null, '#/wrong'));
      wc.appendChild(wr);
      main.appendChild(wc);
    }
    var row = el('div', 'btnrow'); row.style.marginTop = '16px';
    row.appendChild(btn(T('再來一輪'), '', function () {
      if (quiz.mode === 'paper') { quiz.done = false; startPaper(quiz.pid); }
      else if (quiz.mode === 'drill') startDrill(quiz.sid);
      else startWrong(quiz.sid);
    }));
    row.appendChild(btn(T('回首頁'), 'o', null, '#/'));
    main.appendChild(row);
    if (quiz.mode === 'paper') main.appendChild(sponsorStrip());
  }

  /* 做完一整卷之後的輕量贊助提示。沒設定連結就什麼都不顯示，不擋路、不跳窗。 */
  function sponsorStrip() {
    var link = (window.APP_SPONSOR && window.APP_SPONSOR.buymeacoffee) || '';
    if (!link) return frag();
    var box = el('div', 'panel spon-strip');
    var tx = el('div', 'spon-tx',
      T('這一卷的詳解是我們一題一題自己寫的，標了出處，沒有廣告也不收費。')
      + T('如果它幫到你，請我們喝杯咖啡就是最直接的支持。'));
    var a = el('a', 'btn', T('☕ 請我們喝杯咖啡'));
    a.href = link; a.target = '_blank'; a.rel = 'noopener';
    box.appendChild(tx); box.appendChild(a);
    return box;
  }

  /* 結算頁「立即重練這些錯題」：只練剛才答錯的那幾題，不摻其他科目的舊錯題。 */
  function curPidOf(w) { return quiz.mode === 'paper' ? quiz.pid : (quiz.meta[w.i] || {}).pid; }
  function startWrongList(list) {
    if (!list.length) return;
    var ids = {}; list.forEach(function (w) { ids[w.pid] = 1; });
    loadMany(Object.keys(ids), function () {
      var qs = [], meta = [];
      list.forEach(function (w) {
        var p = PAPERS[w.pid]; if (!p) return;
        for (var i = 0; i < p.qs.length; i++) if (p.qs[i].n === w.n) {
          qs.push(p.qs[i]); meta.push({ pid: w.pid, title: p.title }); break;
        }
      });
      if (!qs.length) return toast(T('這些題目載入失敗，請重新整理再試一次。'));
      quiz = { mode: 'wrong', sid: null, title: T('重練本卷錯題'), qs: qs, meta: meta, i: 0, ans: [], ok: 0 };
      location.hash = '#/quiz'; render();
    });
  }

  /* 上次沒做完的卷，再進來時先問一次。resumeAsked[pid] = 'go'（接續）或 'new'（重來）。 */
  var resumeAsked = {};
  function viewResumeAsk(main, pid, d) {
    main.appendChild(el('h1', 'pg-h', d.title || T('整卷測驗')));
    var c = el('div', 'panel'); c.style.padding = '20px';
    c.appendChild(el('h3', 'ph', T('這一卷還沒做完')));
    c.appendChild(el('p', null,
      T('上次做到第 ') + ((d.i || 0) + 1) + T(' 題，已作答 ') + draftDone(d) + ' / ' + d.total + unitQ() + '。'));
    var row = el('div', 'btnrow');
    row.appendChild(btn(T('接續作答'), '', function () {
      resumeAsked[pid] = 'go'; render();
    }));
    row.appendChild(btn(T('從第 1 題重新開始'), 'o', function () {
      resumeAsked[pid] = 'new'; clearDraft(pid); render();
    }));
    c.appendChild(row);
    main.appendChild(c);
  }

  /* ============ 模擬考英雄榜 ============
     榜單由兩種來源組成，依分數排序後取前 BOARD_N 名：
       1. 基準線：不是人，是對照用的分數線（及格 60），以特別顏色標示
       2. 真人：登入後的跨使用者真實成績；沒登入時只有本機使用者自己的最佳成績
       3. 種子名次：程式產生的假名次，用來讓初期的榜單不致空白

     ⚠️ BOARD_SEED 的歷程（改動前先看完，不要又繞回去）：
       2026-09-11 Tony 決定保留（避免初期榜單空白）
       2026-09-20 上午 依 docs/monetization-plan.md「賣排名之前不能混假資料」關掉
       2026-09-20 中午 Tony 看到後要求「一樣先改成有，但加入規則讓它定時會跳動，
                       有真人分數上去時都再檢視一次然後盡量做真一點」→ 改成下面這套
     要整個關掉仍然只要把 BOARD_SEED 設成 false。

     ⚠️ 原本還有一條「歷年上榜水準 78」基準線，2026-09-20 移除且不要加回來：
     78 這個數字沒有出處，而且各考試錄取標準差很多（錄取制看排名不看絕對分數），
     寫成一條線會誤導。要放回來就要先有可查證的來源（考選部各類科錄取分數）。

     ───── 種子名次的三條規則（2026-09-20）─────
     1. 人是穩定的、分數會慢慢動。每 SEED_EPOCH_H 小時換一個「期」，同一期內不管重整幾次
        都完全一樣（原本的要求：不要每次重整就換一批人）；跨期時每個人的分數小幅漂移
        ±0~3 分，偶爾有人「重考進步」跳 4~10 分。
     2. 名單會慢慢換血。種子池有 SEED_POOL 個人，每個人有自己的出現期與停留長度，
        所以每隔一段時間會有人上榜、有人不見，而不是某一天整批 50 人全換掉。
     3. 有真人成績就以真人為準校準。真人越多，(a) 種子數量越少（每 1 個真人擠掉 2 個種子，
        約 25 人之後種子歸零自動退場）、(b) 種子的分數分布往真人的平均與離散度靠攏、
        (c) 種子分數不會離真人的最高分太遠。校準在每次拿到後端榜時重跑（Tony：「有真人
        分數上去時都再檢視一次」）。 */
  var BOARD_N = 50, BOARD_SEED = true;
  var SEED_EPOCH_H = 24;      // 幾小時算一期（同一期內榜單完全固定）
  var SEED_POOL = 110;        // 種子池人數，比 BOARD_N 多才有換血空間
  var SEED_CYCLE = 180;       // 換血週期（期）；每個人在週期裡只出現 SEED_LIFE 那段
  var SEED_LIFE = [45, 150];  // 一個種子在榜上停留幾期（隨機落在這個區間）

  /* 後端榜（2026-09-11）：登入後成績會交到 /api/kgh，大家看同一張榜。
     沒登入就只看得到基準線與種子資料，並提示要登入——Tony：「要強制有登入才能進排行榜」。 */
  function kghApi(method, path, body, cb) {
    var base = (window.KH_CONFIG || {}).API_BASE;
    var tk = window.KHSync && window.KHSync.token && window.KHSync.token();
    if (!base || !tk) return cb('nologin');
    var xhr = new XMLHttpRequest();
    xhr.open(method, base + '/api/kgh' + path);
    xhr.setRequestHeader('Authorization', 'Bearer ' + tk);
    if (body) xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
      if (xhr.status === 401) return cb('nologin');
      if (xhr.status < 200 || xhr.status >= 300) return cb('http ' + xhr.status);
      var d = null; try { d = JSON.parse(xhr.responseText); } catch (e) {}
      cb(null, d);
    };
    xhr.onerror = function () { cb('network'); };
    xhr.send(body ? JSON.stringify(body) : null);
  }
  function signedIn() { return !!(window.KHSync && window.KHSync.signedIn && window.KHSync.signedIn()); }
  var boardCache = {};           // 'sid|spec|scope' → {rows, my}；同一次瀏覽不重複打 API
  var boardScope = 'all';        // 'all' 全站榜 / 'friends' 只看互為好友者
  var myCode = null;             // 自己的好友碼，/me 或 /friends 回來後填入
  var SPECS = [['full', '全真'], ['half', '半卷'], ['quick', '20 題']];
  function specName(s) { for (var i = 0; i < SPECS.length; i++) if (SPECS[i][0] === s) return T(SPECS[i][1]); return s; }

  function rng32(seed) {                       // mulberry32：小而穩定的種子亂數
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function hashStr(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }

  var NICK_A = ['考前', '半夜', '通勤', '圖書館', '補習班', '離島', '轉職', '二戰', '三戰', '兼職',
    '早八', '咖啡因', '零基礎', '在職', '應屆', '重考', '南部', '東部', '陪考', '裸考'];
  var NICK_B = ['小廢物', '衝刺犬', '刷題狂', '筆記控', '夜貓', '苦主', '戰神', '學霸', '肝王', '鹹魚',
    '倖存者', '練習生', '老兵', '新手', '狙擊手', '拖延症', '複習機', '錯題王', '救世主', '路人'];
  var NICK_EN = ['Ken', 'Mia', 'Leo', 'Vicky', 'Ray', 'Jimmy', 'Nina', 'Oscar', 'Zoe', 'Hank',
    'PassOrDie', 'nightowl', 'coffee_only', 'justonemore', 'QQ', 'lucky7', 'no_sleep_club',
    'ExamSurvivor', 'Mr.Wrong', 'plzpass'];
  var NICK_SOLO = ['阿明', '小魚', '陳同學', '想上榜', '拜託給過', '今年一定', '我只想睡覺', '報名費很貴',
    '第三次了', '媽我在這', '不要問我', '考完就辭職', '正在放棄', '還沒讀完', '明天再說'];
  function seedNick(r) {
    var k = r();
    if (k < 0.30) return NICK_SOLO[Math.floor(r() * NICK_SOLO.length)];
    if (k < 0.55) return NICK_EN[Math.floor(r() * NICK_EN.length)];
    var n = NICK_A[Math.floor(r() * NICK_A.length)] + NICK_B[Math.floor(r() * NICK_B.length)];
    if (r() < 0.25) n += String(Math.floor(r() * 90) + 10);
    return n;
  }
  /* 分數分布：多數落在 45～85，少數高分。用三個亂數取平均做出中間厚、兩端薄的形狀。 */
  function seedScore(r) {
    var v = (r() + r() + r()) / 3;             // 近似常態
    return Math.max(18, Math.min(98, Math.round(32 + v * 62)));
  }

  /* 現在是第幾期。localStorage 的 kaohero.boardEpoch 可以指定期數，
     smoke test 靠它驗「同一期固定、跨期會跳動」（重新載入後仍然有效）。 */
  function seedEpoch() {
    try {
      var o = localStorage.getItem('kaohero.boardEpoch');
      if (o !== null && o !== '' && isFinite(+o)) return parseInt(o, 10);
    } catch (e) {}
    return Math.floor(Date.now() / (SEED_EPOCH_H * 3600 * 1000));
  }

  /* 種子池：一張榜固定的一群「人」。每個人的暱稱、底分、出現期、停留長度都只由
     (sid, spec, 池內編號) 決定，所以跨期、跨裝置、跨重整都是同一批人。 */
  function seedPool(sid, spec) {
    var r = rng32(hashStr('kh|' + sid + '|' + spec)), used = {}, pool = [];
    for (var i = 0; i < SEED_POOL; i++) {
      var nk = seedNick(r), guard = 0;
      while (used[nk] && guard++ < 12) nk = seedNick(r);
      if (used[nk]) continue;                  // 撞名撞不開就少一個人，不要重複暱稱
      used[nk] = 1;
      pool.push({
        nick: nk,
        base: seedScore(r),
        enter: Math.floor(r() * SEED_CYCLE),   // 在換血週期裡從第幾期開始出現
        life: SEED_LIFE[0] + Math.floor(r() * (SEED_LIFE[1] - SEED_LIFE[0]))
      });
    }
    return pool;
  }

  /* 這一期這個人的分數：底分 + 小幅漂移，偶爾一次「重考進步」。 */
  function seedScoreAt(p, sid, spec, epoch) {
    var r = rng32(hashStr(p.nick + '|' + sid + '|' + spec + '|' + epoch));
    var v = Math.round((r() * 2 - 1) * 3);                  // −3 ~ +3 的日常起伏
    if (r() < 0.06) v += 4 + Math.floor(r() * 7);           // 6% 的人這期進步 4~10 分
    return Math.max(18, Math.min(98, p.base + v));
  }

  /* 依真人成績校準種子（Tony 2026-09-20：「有真人分數上去時都再檢視一次，盡量做真一點」）。
     真人 0 個時原樣輸出；真人越多，種子的平均與離散度越靠近真人，最高分也被真人的最高分壓住。 */
  function calibrateSeeds(seeds, real) {
    if (!real.length || !seeds.length) return seeds;
    var w = Math.min(1, real.length / 30);                  // 真人滿 30 個就完全以真人為準
    var mr = real.reduce(function (a, b) { return a + b; }, 0) / real.length;
    var ms = seeds.reduce(function (a, b) { return a + b.score; }, 0) / seeds.length;
    var sd = function (xs, m) {
      if (xs.length < 2) return 0;
      return Math.sqrt(xs.reduce(function (a, x) { return a + (x - m) * (x - m); }, 0) / (xs.length - 1));
    };
    var sr = sd(real, mr), ss = sd(seeds.map(function (x) { return x.score; }), ms);
    var k = (ss > 0.5 && sr > 0.5) ? (1 - w) + w * (sr / ss) : 1;
    var cap = real.length >= 5 ? Math.max(70, Math.max.apply(null, real) + 6) : 100;
    seeds.forEach(function (x) {
      var v = (ms + (x.score - ms) * k) * (1 - w) + (mr + (x.score - ms) * k) * w;
      x.score = Math.max(18, Math.min(cap, Math.round(v)));
    });
    return seeds;
  }

  function boardRows(sid, spec) {
    var rows = [];
    rows.push({ kind: 'mark', nick: T('及格基準線'), score: 60 });
    var srvEarly = boardCache[sid + '|' + spec + '|' + boardScope];
    var realScores = (srvEarly && srvEarly.rows ? srvEarly.rows : []).map(function (x) { return x.score; });
    if (BOARD_SEED && boardScope !== 'friends') {          // 好友榜只放真人，放種子會很奇怪
      // 真人越多、種子越少：每 1 個真人擠掉 2 個種子，約 25 人之後種子自動退場
      var want = Math.max(0, BOARD_N - realScores.length * 2);
      if (want > 0) {
        var ep = seedEpoch();
        var live = seedPool(sid, spec).filter(function (p) {
          var d = ((ep - p.enter) % SEED_CYCLE + SEED_CYCLE) % SEED_CYCLE;
          return d < p.life;                                // 只有在自己那段期間才在榜上
        });
        var seeds = live.map(function (p) {
          return { kind: 'seed', nick: p.nick, score: seedScoreAt(p, sid, spec, ep) };
        });
        calibrateSeeds(seeds, realScores);
        seeds.sort(function (a, b) { return b.score - a.score; });
        seeds.slice(0, want).forEach(function (x) { rows.push(x); });
      }
    }
    var srv = boardCache[sid + '|' + spec + '|' + boardScope];
    if (srv && srv.rows) {
      // 有後端資料就用真人榜；種子只是把空位補滿，真人一律排在自己的分數位置
      srv.rows.forEach(function (r) {
        rows.push({ kind: r.me ? 'me' : 'real', nick: r.nick, score: r.score });
      });
    }
    (state.mocks || []).forEach(function (m) {
      if (m.sid !== sid || (m.spec || 'full') !== spec) return;
      if (srv && srv.rows && srv.rows.some(function (r) { return r.me; })) return;  // 後端已有自己的成績
      rows.push({ kind: 'me', nick: state.nick || T('我'), score: Math.round(m.ok * 100 / m.total), date: m.date });
    });
    // 同一個人只留最佳成績
    var best = null, out = [];
    rows.forEach(function (x) { if (x.kind !== 'me') return; if (!best || x.score > best.score) best = x; });
    rows.forEach(function (x) { if (x.kind === 'me' && x !== best) return; out.push(x); });
    out.sort(function (a, b) {
      if (b.score !== a.score) return b.score - a.score;
      return a.kind === 'me' ? -1 : (b.kind === 'me' ? 1 : 0);   // 同分時真人在前
    });
    // 名次只算人，基準線不占位
    var rank = 0;
    out.forEach(function (x) { if (x.kind !== 'mark') x.rank = ++rank; });
    // 取前 BOARD_N 名「人」；兩條基準線只是對照線，不占名額
    // （2026-09-11 Tony：「排名現在是 48 人，不含那兩個標準線要 50 人」）
    var top = [], people = 0, mine = null;
    out.forEach(function (x) {
      if (x.kind === 'mark') { top.push(x); return; }
      if (people < BOARD_N) { top.push(x); people++; }
    });
    out.forEach(function (x) { if (x.kind === 'me') mine = x; });
    if (mine && top.indexOf(mine) < 0) top.push(mine);   // 掉出前 50 也要讓自己看得到名次
    return top;
  }

  function loadBoard(sid, spec, cb) {
    var key = sid + '|' + spec + '|' + boardScope;
    if (boardCache[key] || !signedIn()) return cb();
    kghApi('GET', '/board?sid=' + encodeURIComponent(sid) + '&spec=' + spec
      + '&scope=' + boardScope + '&limit=' + BOARD_N, null, function (err, d) {
        boardCache[key] = err ? { rows: [] } : (d || { rows: [] });
        cb();
      });
  }

  function viewBoard(main, sid, spec) {
    var s = el('section', 'sec'); s.style.marginTop = '18px';
    s.appendChild(sectionHead(((SUBJ[sid] && SUBJ[sid].name) || sid) + '　' + specName(spec)
      + T('　前 ') + BOARD_N + T(' 名英雄榜')));
    var tabs = el('div', 'chips');
    SPECS.forEach(function (sp) {
      var b = el('button', sp[0] === spec ? 'on' : null, T(sp[1]));
      b.onclick = function () { boardSpec = sp[0]; render(); };
      tabs.appendChild(b);
    });
    s.appendChild(tabs);
    var scopes = el('div', 'chips'); scopes.style.marginTop = '8px';
    [['all', T('全站')], ['friends', T('只看好友')]].forEach(function (sc) {
      var b = el('button', sc[0] === boardScope ? 'on' : null, sc[1]);
      b.onclick = function () { boardScope = sc[0]; render(); };
      scopes.appendChild(b);
    });
    s.appendChild(scopes);
    // 沒有快取就先抓一次，回來再重繪（render 會再走一遍這裡，屆時快取已在）
    var key = sid + '|' + spec + '|' + boardScope;
    if (signedIn() && !boardCache[key]) loadBoard(sid, spec, function () { render(); });
    var p = el('div', 'panel bd-list');
    var rows = boardRows(sid, spec), people = 0;
    rows.forEach(function (x) {
      if (x.kind !== 'mark') people++;
      var row = el('div', 'bd-row' + (x.kind === 'mark' ? ' mark' : '') + (x.kind === 'me' ? ' me' : ''));
      row.appendChild(el('span', 'bd-no', x.kind === 'mark' ? '—' : String(x.rank)));
      row.appendChild(el('span', 'bd-nk', x.nick));
      row.appendChild(el('span', 'bd-sc', x.score + T(' 分')));
      p.appendChild(row);
    });
    s.appendChild(p);
    // 榜上一個人都沒有（只看好友、或 BOARD_SEED 關掉時會發生）就照實說，不要留一張空表。
    if (!people) {
      s.appendChild(el('div', 'warnbox', T('這張榜還沒有人留下成績——你考完就是第 1 名。')));
    }
    s.appendChild(el('p', 'lead',
      T('榜上「及格基準線」是分數對照線，不是人。你的成績會以暱稱顯示，沒設暱稱時顯示「我」。')));
    if (!signedIn()) {
      s.appendChild(el('div', 'warnbox',
        T('要讓自己的成績上榜、看到其他人的真實成績，請先登入（右上角「登入」）。')));
    }
    var br = el('div', 'btnrow');
    br.appendChild(btn(state.nick ? T('更改暱稱（目前：') + state.nick + T('）') : T('設定我的暱稱'), 'o', askNick));
    if (signedIn()) br.appendChild(btn(T('好友'), 'o', null, '#/friends'));
    s.appendChild(br);
    main.appendChild(s);
  }

  /* 好友頁：交換 8 碼好友碼，雙方都加了才算朋友，好友榜才看得到對方 */
  function viewFriends(main) {
    main.appendChild(el('h1', 'pg-h', T('好友')));
    main.appendChild(el('p', 'lead',
      T('把自己的好友碼給對方、再把對方的碼加進來，雙方都加了才算朋友，模考英雄榜的「只看好友」才會看到彼此。')));
    if (!signedIn()) {
      main.appendChild(el('div', 'warnbox', T('請先登入（右上角「登入」）。')));
      return;
    }
    var c = el('div', 'panel'); c.style.padding = '20px';
    var mine = el('p', 'lead', T('讀取中…'));
    c.appendChild(mine);
    var list = el('div', 'panel'); list.style.marginTop = '12px';
    var row = el('div', 'btnrow');
    row.appendChild(btn(T('加入好友碼'), '', function () {
      KHDialog.prompt(T('輸入對方的好友碼（8 碼英數字）')).then(function (v) {
        if (v == null) return;
        kghApi('POST', '/friends', { code: String(v).toUpperCase().replace(/[^A-Z0-9]/g, '') },
          function (err) {
            if (err === 'http 404') return toast(T('找不到這個好友碼。'));
            if (err) return toast(T('加入失敗，請稍後再試。'));
            boardCache = {}; toast(T('已加入，對方也加你之後就會互相看得到。')); render();
          });
      });
    }));
    c.appendChild(row);
    main.appendChild(c); main.appendChild(list);
    kghApi('GET', '/friends', null, function (err, d) {
      if (err || !d) { mine.textContent = T('讀取失敗，請稍後再試。'); return; }
      myCode = d.me && d.me.code;
      mine.textContent = T('我的好友碼：') + (myCode || '—') + T('　暱稱：') + ((d.me && d.me.nick) || '—');
      list.innerHTML = '';
      if (!d.friends.length) { list.appendChild(el('p', 'lead', T('還沒有加任何人。'))); return; }
      d.friends.forEach(function (f) {
        list.appendChild(item(f.mutual ? '🤝' : '⏳', f.nick,
          f.code + '　' + (f.mutual ? T('互為好友') : T('等對方也加你')), null));
      });
    });
  }

  function askNick() {
    KHDialog.prompt(T('上榜時要顯示的暱稱（20 字以內，不要用真名）'), { value: state.nick || '' })
      .then(function (v) {
        if (v == null) return;
        v = String(v).trim().slice(0, 20);
        state.nick = v || null; save();
        if (v && signedIn()) {
          kghApi('POST', '/me', { nick: v }, function () { boardCache = {}; render(); });
        } else render();
        if (v) toast(T('暱稱已設定為 ') + v);
      });
  }

  /* ============ 模擬考（2026-09-11 Tony 要求）============
     與「無限刷題」的差別：全真題數與倒數計時、作答中完全不揭曉答案、交卷後才整卷批改。
     抽題不一次載十幾個題本（手機會卡）：先隨機抽 MOCK_POOL 份考卷載進來，再從池子裡抽題。 */
  var MOCK_POOL = 5;
  var mockTimer = null;
  /* 模考規格：全真＝該科正式題數與時間；半卷＝各取一半；20 題速刷＝固定 20 題、依比例給時間 */
  function specOf(std, spec) {
    if (spec === 'half') return { n: Math.ceil(std.n / 2), mins: Math.ceil(std.mins / 2) };
    if (spec === 'quick') return { n: Math.min(20, std.n), mins: Math.max(5, Math.round(std.mins * Math.min(20, std.n) / std.n)) };
    return { n: std.n, mins: std.mins };
  }
  var pickSpec = 'full', boardSpec = 'full';
  var mkCat = null, mkExam = null, mkSubj = null;   // 記住模考設定頁的三層選擇，切規格重繪時不會被重設
  function stopMockTimer() { if (mockTimer) { clearInterval(mockTimer); mockTimer = null; } }

  function viewMock(main) {
    main.appendChild(el('h1', 'pg-h', T('模擬考')));
    main.appendChild(el('p', 'lead',
      T('從一個科目的歷年考古題隨機抽題，照該科的正式題數與時間限時作答。作答中不會顯示答案，交卷後才整卷批改。')));

    var c = el('div', 'panel'); c.style.padding = '20px';
    c.appendChild(el('h3', 'ph', T('選擇範圍')));
    var selC = el('select', 'mk-sel'), selE = el('select', 'mk-sel'), selS = el('select', 'mk-sel');
    [selC, selE, selS].forEach(function (x) { x.style.width = '100%'; });

    function opt(sel, val, txt) { var o = el('option', null, txt); o.value = val; sel.appendChild(o); }
    CATS.forEach(function (ct) { opt(selC, ct.id, ct.name); });
    if (mkCat) { selC.value = mkCat; if (selC.value !== mkCat) selC.selectedIndex = 0; }

    function keep(sel, want) { if (want) { sel.value = want; if (sel.value !== want) sel.selectedIndex = 0; } }
    function fillExams() {
      selE.innerHTML = '';
      var ct = catOf(selC.value) || CATS[0];
      (ct.exams || []).forEach(function (e) { if (e.live !== false) opt(selE, e.id, e.name); });
      keep(selE, mkExam);
      fillSubjects();
    }
    function fillSubjects() {
      selS.innerHTML = '';
      var seen = {};
      EXAMS.forEach(function (e) {
        if (e.exam !== selE.value || seen[e.subj]) return;
        seen[e.subj] = 1;
        opt(selS, e.subj, (SUBJ[e.subj] && SUBJ[e.subj].name) || e.subjName || e.subj);
      });
      keep(selS, mkSubj);
      mkCat = selC.value; mkExam = selE.value; mkSubj = selS.value;
      showSpec();
    }
    var spec = el('p', 'lead');
    function stdOf(sid) {
      var list = EXAMS.filter(function (e) { return e.subj === sid; });
      if (!list.length) return null;
      list.sort(function (a, b) { return (b.roc || 0) - (a.roc || 0); });
      return { n: list[0].n, mins: list[0].mins || Math.round(list[0].n * 1.2), papers: list.length };
    }
    function showSpec() {
      var st = stdOf(selS.value);
      if (!st) { spec.textContent = T('這個科目還沒有題目。'); return; }
      var g = specOf(st, pickSpec);
      spec.textContent = T('這次會考：') + g.n + unitQ() + ' / ' + g.mins + T(' 分鐘')
        + T('　·　正式規格 ') + st.n + unitQ() + ' / ' + st.mins + T(' 分鐘')
        + T('　·　題庫共 ') + st.papers + unitP();
    }
    selC.onchange = function () { mkCat = selC.value; mkExam = null; mkSubj = null; fillExams(); render(); };
    selE.onchange = function () { mkExam = selE.value; mkSubj = null; fillSubjects(); render(); };
    selS.onchange = function () { mkSubj = selS.value; showSpec(); render(); };

    var g = el('div', 'mk-form');
    [[T('考試類別'), selC], [T('考試'), selE], [T('科目'), selS]].forEach(function (r) {
      var w = el('label', 'mk-row');
      w.appendChild(el('span', 'mk-lb', r[0]));
      w.appendChild(r[1]);
      g.appendChild(w);
    });
    c.appendChild(g);

    var chips = el('div', 'chips'); chips.style.marginTop = '10px';
    var btns = [];
    [['full', T('全真規格')], ['half', T('半卷（通勤用）')], ['quick', T('20 題速刷')]].forEach(function (sp) {
      var b = el('button', sp[0] === pickSpec ? 'on' : null, sp[1]);
      b.onclick = function () {
        pickSpec = sp[0];
        btns.forEach(function (x) { x[1].className = x[0] === pickSpec ? 'on' : ''; });
        showSpec(); boardSpec = pickSpec; render();
      };
      btns.push([sp[0], b]); chips.appendChild(b);
    });
    c.appendChild(chips);
    c.appendChild(spec);

    var go = btn(T('開始模擬考'), '', function () {
      if (!selS.value) return toast(T('這個科目還沒有題目。'));
      startMock(selS.value, pickSpec);
    });
    go.style.marginTop = '14px';
    c.appendChild(go);
    main.appendChild(c);
    fillExams();
    if (selS.value) viewBoard(main, selS.value, boardSpec);

    if ((state.mocks || []).length) {
      var s2 = el('section', 'sec'); s2.style.marginTop = '18px';
      s2.appendChild(sectionHead(T('我的模擬考紀錄')));
      var p2 = el('div', 'panel');
      state.mocks.slice(0, 12).forEach(function (r) {
        p2.appendChild(item(r.ok * 100 / r.total >= 60 ? '🟢' : '🔴', r.title,
          Math.round(r.ok * 100 / r.total) + T(' 分　·　') + r.ok + '/' + r.total + unitQ()
          + T('　·　用時 ') + Math.round(r.secs / 60) + T(' 分鐘') + T('　·　') + r.date, null));
      });
      s2.appendChild(p2); main.appendChild(s2);
    }
  }

  function startMock(sid, spec) {
    spec = spec || 'full';
    var list = EXAMS.filter(function (e) { return e.subj === sid; });
    if (!list.length) return toast(T('這個科目還沒有題目。'));
    var top = list.slice().sort(function (a, b) { return (b.roc || 0) - (a.roc || 0); })[0];
    var std = { n: top.n, mins: top.mins || Math.round(top.n * 1.2) };
    var g = specOf(std, spec), want = g.n, mins = g.mins;
    var pool = list.slice(); shuffle(pool);
    var pick = [], have = 0;
    for (var i = 0; i < pool.length && (have < want * 1.5 || pick.length < 2) && pick.length < MOCK_POOL; i++) {
      pick.push(pool[i].id); have += pool[i].n;
    }
    toast(T('正在抽題…'));
    loadMany(pick, function () {
      var bank = [], meta = [];
      pick.forEach(function (pid) {
        var p = PAPERS[pid]; if (!p) return;
        p.qs.forEach(function (q) {
          if (q.needfig && !q.fig) return;           // 選項在圖上又沒有圖檔的題不能考
          bank.push({ q: q, pid: pid, title: p.title });
        });
      });
      if (bank.length < 5) return toast(T('題目載入失敗，請重新整理再試一次。'));
      shuffle(bank);
      var use = bank.slice(0, Math.min(want, bank.length));
      quiz = { mode: 'mock', sid: sid, spec: spec,
        title: (SUBJ[sid] && SUBJ[sid].name || sid) + T('　模擬考') + '（' + specName(spec) + '）',
        qs: use.map(function (x) { return x.q; }), meta: use, i: 0, ans: [], ok: 0,
        flags: {}, mins: mins, endAt: Date.now() + mins * 60000, secs: 0, graded: false };
      location.hash = '#/quiz'; render();
    });
  }

  function mockLeft() { return Math.max(0, Math.round((quiz.endAt - Date.now()) / 1000)); }
  function mmss(s) { var m = Math.floor(s / 60); return (m < 10 ? '0' : '') + m + ':' + (s % 60 < 10 ? '0' : '') + (s % 60); }

  function viewMockQuiz(main) {
    var q = quiz.qs[quiz.i], m = quiz.meta[quiz.i];
    var doneN = 0; quiz.ans.forEach(function (x) { if (x != null) doneN++; });

    var top = el('div', 'mk-bar');
    var clk = el('span', 'mk-clock', mmss(mockLeft()));
    top.appendChild(clk);
    top.appendChild(el('span', 'mk-cnt', T('已作答 ') + doneN + ' / ' + quiz.qs.length));
    main.appendChild(top);
    stopMockTimer();
    mockTimer = setInterval(function () {
      var left = mockLeft();
      clk.textContent = mmss(left);
      clk.className = 'mk-clock' + (left <= 300 ? ' hot' : (left <= 600 ? ' warm' : ''));
      if (left <= 0) { stopMockTimer(); gradeMock(true); }
    }, 1000);

    var bar = el('div', 'prog'); var i2 = el('i');
    i2.style.width = (quiz.i / quiz.qs.length * 100) + '%'; bar.appendChild(i2); main.appendChild(bar);

    var c = el('div', 'panel'); c.style.padding = '16px';
    var meta = el('div', 'qmeta');
    meta.appendChild(el('span', null, T('第 ') + (quiz.i + 1) + ' / ' + quiz.qs.length + unitQ()));
    meta.appendChild(el('span', null, m.title));
    c.appendChild(meta);
    if (q.psg) {
      var pb = el('div', 'psg');
      pb.appendChild(el('b', null, T('短文'))); pb.appendChild(el('p', null, q.psg));
      c.appendChild(pb);
    }
    c.appendChild(el('div', 'stem', q.q));
    if (q.fig) {
      var im = el('img', 'qfig'); im.src = q.fig; im.loading = 'lazy';
      im.alt = qLabel(q.n) + T(' 題的原始題目圖（含選項）');
      c.appendChild(im);
    }
    q.o.forEach(function (txt, k) {
      var b = el('button', 'opt' + (quiz.ans[quiz.i] === k ? ' picked' : ''));
      b.appendChild(el('span', 'lab', LAB[k] + '.'));
      b.appendChild(document.createTextNode(txt && txt.trim() ? txt : T('（見上圖）')));
      b.onclick = function () { quiz.ans[quiz.i] = k; render(); };   // 模考中可以改答案，不揭曉對錯
      c.appendChild(b);
    });
    main.appendChild(c);

    var row = el('div', 'btnrow'); row.style.marginTop = '12px';
    if (quiz.i > 0) row.appendChild(btn(T('← 上一題'), 'o', function () { quiz.i--; render(); }));
    if (quiz.i + 1 < quiz.qs.length) row.appendChild(btn(T('下一題 →'), 'w', function () { quiz.i++; render(); }));
    row.appendChild(btn(quiz.flags[quiz.i] ? T('取消標記') : T('🚩 標記待檢查'), 'g', function () {
      if (quiz.flags[quiz.i]) delete quiz.flags[quiz.i]; else quiz.flags[quiz.i] = 1;
      render();
    }));
    main.appendChild(row);

    var s = el('section', 'sec'); s.style.marginTop = '16px';
    s.appendChild(sectionHead(T('答題卡')));
    var grid = el('div', 'mk-grid');
    quiz.qs.forEach(function (_, k) {
      var g2 = el('button', 'mk-n' + (quiz.ans[k] != null ? ' ok' : '') + (quiz.flags[k] ? ' fl' : '')
        + (k === quiz.i ? ' cur' : ''), String(k + 1));
      g2.onclick = function () { quiz.i = k; render(); };
      grid.appendChild(g2);
    });
    s.appendChild(grid);
    var sb = el('div', 'btnrow'); sb.style.marginTop = '12px';
    sb.appendChild(btn(T('交卷'), '', function () {
      var miss = quiz.qs.length - doneN;
      if (miss) {
        KHDialog.confirm(T('還有 ') + miss + T(' 題沒作答，確定要交卷嗎？'))
          .then(function (y) { if (y) gradeMock(false); });
      } else gradeMock(false);
    }));
    s.appendChild(sb);
    main.appendChild(s);
  }

  function gradeMock(timeUp) {
    stopMockTimer();
    quiz.ok = 0;
    quiz.qs.forEach(function (q, k) {
      var pid = quiz.meta[k].pid, a = quiz.ans[k];
      // 未作答的題不進統計、也不進錯題本：那不是「答錯」，只是沒寫到。
      // 全部算進去的話，中途放棄一次模考就會把整科的正確率打到谷底、錯題本塞進上百題。
      if (a == null) return;
      var good = isRight(q, a); if (good) quiz.ok++;
      recordAnswer(pid, q.n, good);
    });
    quiz.secs = Math.min(quiz.mins * 60, quiz.mins * 60 - mockLeft());
    quiz.graded = true; quiz.done = true; quiz.timeUp = !!timeUp;
    state.mocks = state.mocks || [];
    state.mocks.unshift({ sid: quiz.sid, spec: quiz.spec || 'full', title: quiz.title,
      ok: quiz.ok, total: quiz.qs.length, secs: quiz.secs,
      date: new Date().toISOString().slice(0, 10) });
    state.mocks = state.mocks.slice(0, 30);
    save();
    if (signedIn()) {
      kghApi('POST', '/score', {
        sid: quiz.sid, spec: quiz.spec || 'full', nick: state.nick || undefined,
        score: Math.round(quiz.ok * 100 / quiz.qs.length), total: quiz.qs.length,
      }, function () { boardCache = {}; render(); });
    }
    buildNav(); markNav(); render();
  }

  function viewMockResult(main) {
    var score = Math.round(quiz.ok * 100 / quiz.qs.length);
    var c = el('div', 'panel'); c.style.padding = '20px';
    c.appendChild(el('h2', null, quiz.title));
    c.appendChild(el('div', 'big', score + T(' 分')));
    c.appendChild(el('p', 'lead',
      (quiz.timeUp ? T('時間到，自動交卷。') : '')
      + T('答對 ') + quiz.ok + ' / ' + quiz.qs.length + unitQ()
      + T('　·　用時 ') + mmss(quiz.secs) + T('　·　限時 ') + quiz.mins + T(' 分鐘')));
    c.appendChild(el('p', 'lead', score >= 60
      ? T('高於 60 分的一般及格標準 ') + (score - 60) + T(' 分。')
      : T('距離 60 分的一般及格標準還差 ') + (60 - score) + T(' 分。')));
    var note = el('p', 'lead', T('※ 這是從歷年考古題隨機抽出的卷，難度未經校準，分數只作練習參考；各類科的實際及格或錄取標準請以考選部公告為準。'));
    note.style.opacity = '.8';
    c.appendChild(note);
    main.appendChild(c);

    var hist = (state.mocks || []).filter(function (r) {
      return r.sid === quiz.sid && (r.spec || 'full') === (quiz.spec || 'full');
    }).slice(0, 8);
    if (hist.length > 1) {
      var sh = el('section', 'sec'); sh.style.marginTop = '16px';
      sh.appendChild(sectionHead(T('這一科的模擬考趨勢')));
      var ph = el('div', 'panel'); var bars = el('div', 'mk-trend');
      hist.slice().reverse().forEach(function (r) {
        var v = Math.round(r.ok * 100 / r.total);
        var col = el('div', 'mk-tb');
        var b2 = el('i'); b2.style.height = Math.max(4, v) + '%'; col.appendChild(b2);
        col.appendChild(el('span', null, String(v)));
        col.title = r.date;
        bars.appendChild(col);
      });
      ph.appendChild(bars); sh.appendChild(ph); main.appendChild(sh);
    }

    var wrong = [];
    quiz.qs.forEach(function (q, k) { if (quiz.ans[k] == null || !isRight(q, quiz.ans[k])) wrong.push(k); });
    if (wrong.length) {
      var s = el('section', 'sec'); s.style.marginTop = '16px';
      s.appendChild(sectionHead(T('答錯與未作答（') + wrong.length + T('）')));
      var p = el('div', 'panel');
      wrong.forEach(function (k) {
        var q = quiz.qs[k];
        p.appendChild(item(null, T('第 ') + (k + 1) + unitQ() + '　' + quiz.meta[k].title,
          (quiz.ans[k] == null ? T('未作答') : T('你選 ') + LAB[quiz.ans[k]])
          + T('　正解 ') + [q.a].concat(q.alt || []).map(function (x) { return LAB[x]; }).join('、'), null));
      });
      s.appendChild(p);
      var wb = el('div', 'btnrow'); wb.style.marginTop = '12px';
      wb.appendChild(btn(T('立即重練這些錯題'), '', function () {
        startWrongList(wrong.map(function (k) { return { pid: quiz.meta[k].pid, n: quiz.qs[k].n }; }));
      }));
      wb.appendChild(btn(T('前往錯題本 →'), 'o', null, '#/wrong'));
      s.appendChild(wb);
      main.appendChild(s);
    }

    var row = el('div', 'btnrow'); row.style.marginTop = '16px';
    var sid0 = quiz.sid, spec0 = quiz.spec || 'full';
    row.appendChild(btn(T('再考一次'), '', function () { startMock(sid0, spec0); }));
    row.appendChild(btn(T('回模擬考設定'), 'o', null, '#/mock'));
    main.appendChild(row);
    viewBoard(main, quiz.sid, quiz.spec || 'full');
    main.appendChild(sponsorStrip());
  }

  /* ============ 錯題本 / 統計 ============ */
  function viewWrong(main) {
    main.appendChild(el('h1', 'pg-h', T('錯題本')));
    if (!state.wrong.length) {
      main.appendChild(el('p', 'lead', T('目前沒有錯題。答錯的題目會自動收進這裡，連續答對兩次之後才會移除。')));
      main.appendChild(btn(T('去刷題'), '', null, '#/exams')); return;
    }
    main.appendChild(el('p', 'lead', T('共 ') + state.wrong.length + T(' 題。連續答對兩次才會自動移除。')));
    var row = el('div', 'btnrow');
    row.appendChild(btn(T('開始複習'), '', function () { startWrong(null); }));
    row.appendChild(btn(T('清空錯題本'), 'o', function () {
      if (confirm(T('確定要清空錯題本嗎？此動作無法復原。'))) { state.wrong = []; save(); render(); }
    }));
    main.appendChild(row);

    /* 分布改成以「科目」為主（2026-09-11）。只按卷分組時，同一科跨十年的錯題會被切成
       十幾列，對實際複習沒有幫助；考生想的是「我這一科還有幾題沒搞懂」。 */
    var bySubj = {}, byPid = {};
    state.wrong.forEach(function (w) {
      byPid[w.pid] = (byPid[w.pid] || 0) + 1;
      var e = examOf(w.pid); if (!e) return;
      var b = bySubj[e.subj] || (bySubj[e.subj] = { n: 0, hard: 0 });
      b.n++; if (!(w.s || 0)) b.hard++;
    });
    var s = el('section', 'sec'); s.style.marginTop = '18px';
    s.appendChild(sectionHead(T('依科目')));
    s.appendChild(el('p', 'lead', T('點一列就只練那一科。「還沒答對過」是連一次都還沒答對的題，考前優先看這些。')));
    var p = el('div', 'panel');
    Object.keys(bySubj).sort(function (a, b) { return bySubj[b].n - bySubj[a].n; }).forEach(function (sid) {
      var b = bySubj[sid];
      var row = item('📕', SUBJ[sid] ? SUBJ[sid].name : sid,
        b.n + unitQ() + (b.hard ? T('　｜還沒答對過 ') + b.hard + unitQ() : T('　｜都至少答對過一次')),
        function () { startWrong(sid); });
      p.appendChild(row);
    });
    s.appendChild(p); main.appendChild(s);

    var s2 = el('section', 'sec'); s2.style.marginTop = '18px';
    s2.appendChild(sectionHead(T('依考卷')));
    var p2 = el('div', 'panel');
    Object.keys(byPid).sort().forEach(function (pid) {
      var e = examOf(pid);
      p2.appendChild(item('📄', e ? (SUBJ[e.subj].name + T('　') + e.label) : pid, byPid[pid] + unitQ(),
        null, '#/paper/' + pid));
    });
    s2.appendChild(p2); main.appendChild(s2);
  }

  function viewStats(main) {
    main.appendChild(el('h1', 'pg-h', T('弱點統計')));
    var t = totals();
    if (!t.n) { main.appendChild(el('p', 'lead', T('還沒有作答紀錄，先去刷幾題吧。')));
      main.appendChild(btn(T('去刷題'), '', null, '#/exams')); return; }
    main.appendChild(kpis([[t.n.toLocaleString(), T('已作答')], [t.rate + '%', T('正確率')],
      [String(state.wrong.length), T('錯題待複習')]]));

    var bySubj = {};
    Object.keys(state.stats).forEach(function (k) {
      var e = examOf(k); if (!e) return;
      var b = bySubj[e.subj] || (bySubj[e.subj] = { n: 0, ok: 0 });
      b.n += state.stats[k].n; b.ok += state.stats[k].ok;
    });
    var s1 = el('section', 'sec'); s1.style.marginTop = '18px';
    s1.appendChild(sectionHead(T('依科目')));
    var p1 = el('div', 'panel');
    Object.keys(bySubj).sort().forEach(function (sid) {
      var b = bySubj[sid];
      p1.appendChild(item('📘', SUBJ[sid] ? SUBJ[sid].name : sid,
        T('作答 ') + b.n + T(' 題　正確率 ') + pct(b.ok, b.n) + '%', null));
    });
    s1.appendChild(p1); main.appendChild(s1);

    var rows = Object.keys(state.stats).map(function (k) {
      var e = examOf(k), st = state.stats[k];
      return { label: e ? (SUBJ[e.subj].name + T('　') + e.label) : k, n: st.n, ok: st.ok, r: pct(st.ok, st.n) };
    }).sort(function (a, b) { return a.r - b.r; });
    var s2 = el('section', 'sec');
    s2.appendChild(sectionHead(T('依卷別（正確率低的排前面）')));
    var p2 = el('div', 'panel');
    rows.forEach(function (r) { p2.appendChild(item('📄', r.label, T('作答 ') + r.n + T(' 題　正確率 ') + r.r + '%', null)); });
    s2.appendChild(p2); main.appendChild(s2);

    var row = el('div', 'btnrow'); row.style.marginTop = '14px';
    row.appendChild(btn(T('清除所有作答紀錄'), 'o', function () {
      if (confirm(T('確定要清除所有作答紀錄與統計嗎？此動作無法復原。'))) {
        state.stats = {}; state.last = null; save(); render();
      }
    }));
    main.appendChild(row);
  }

  /* ============ 內容頁 ============ */
  function prose(main, title, blocks) {
    main.appendChild(el('h1', 'pg-h', title));
    var c = el('div', 'panel'); c.style.padding = '20px';
    blocks.forEach(function (b) {
      if (b[0] === 'h') c.appendChild(el('h3', 'ph', b[1]));
      else if (b[0] === 'p') c.appendChild(el('p', null, b[1]));
      else if (b[0] === 'note') c.appendChild(el('div', 'warnbox', b[1]));
      else if (b[0] === 'ul') {
        var ul = document.createElement('ul'); ul.className = 'ul';
        b[1].forEach(function (x) { ul.appendChild(el('li', null, x)); });
        c.appendChild(ul);
      }
    });
    main.appendChild(c);
  }

  function viewGuide(main) {
    prose(main, T('準備方式介紹'), [
      ['p', T('這一頁整理的是「怎麼用考古題準備國家考試」的通則。各科的細節會隨題庫上線陸續補上。')],
      ['h', T('一、先摸清楚考試的長相')],
      ['p', T('動筆之前，先確認三件事：考幾科、每科幾題、怎麼計分。以醫師第一階段為例，醫學（一）與醫學（二）各 100 題單選、每題 1 分；第二階段的醫學（三）～（六）各 80 題。知道題數與時間，才知道每題可以花多久。')],
      ['h', T('二、先做一份近年考卷，當作健康檢查')],
      ['p', T('不要從第一年開始按順序做。先挑最近一次的整卷測驗做完，看正確率落在哪裡、哪一科最弱，再決定時間怎麼分配。這一步花兩小時，可以省掉之後幾十小時的亂讀。')],
      ['h', T('三、用錯題本，而不是重做整卷')],
      ['p', T('考古題的價值不在「做過」，而在「錯過的有沒有補起來」。本站答錯的題目會自動進錯題本，答對一次才移除；複習時優先清錯題本，比重做整卷有效率得多。')],
      ['h', T('四、看詳解要看到「為什麼別的選項不對」')],
      ['p', T('只記正解，換個問法就會錯。本站的詳解一律寫成「正解為什麼對 → 其他三個選項各錯在哪 → 出處」，把四個選項都吃透，等於一題當四題用。')],
      ['h', T('五、遇到有疑問的題目，去查出處')],
      ['p', T('詳解都附了書名、版次與章節。看到跟你印象不同的說法，直接翻回原始教科書確認——考古題偶爾有爭議題，自己查過的記憶也最牢。')],
      ['note', T('這一頁是通用的準備原則。若你希望看到某一科的專門準備方式，歡迎從客服中心告訴我們。')]
    ]);
  }

  function viewStories(main) {
    main.appendChild(el('h1', 'pg-h', T('考取心得分享')));
    main.appendChild(el('p', 'lead', T('這裡會刊登考生實際投稿的準備心得。')));
    var c = el('div', 'panel'); c.style.padding = '20px';
    c.appendChild(el('h3', 'ph', T('目前還沒有投稿')));
    c.appendChild(el('p', null,
      T('本站不會編造心得文章。這一區會等真的有考生願意分享之後，經同意再刊登，並註明作者與考取年度。')));
    c.appendChild(el('p', null,
      T('如果你用這個站考上了，非常歡迎投稿——不論篇幅長短，寫下你怎麼分配時間、踩過哪些坑，都會幫到後面的人。')));
    c.appendChild(btn(T('我要投稿心得'), '', null, '#/support'));
    main.appendChild(c);
  }

  function viewSponsor(main) {
    main.appendChild(el('h1', 'pg-h', T('贊助我們')));
    main.appendChild(el('p', 'lead', T('考英雄是免費的，沒有廣告，也不會把題目或詳解放到付費牆後面。')));
    var c = el('div', 'panel'); c.style.padding = '20px';
    c.appendChild(el('h3', 'ph', T('為什麼需要贊助')));
    c.appendChild(el('p', null,
      T('題目與答案雖然是公開資料，但整理、校對與逐題撰寫詳解都需要時間；網站本身則有網域與維護的成本。')
      + T('如果這個站幫到你，請我們喝杯咖啡，就是最直接的支持。')));
    c.appendChild(el('h3', 'ph', T('贊助方式')));
    var link = (window.APP_SPONSOR && window.APP_SPONSOR.buymeacoffee) || '';
    if (link) {
      var a = el('a', 'btn', T('☕ 到 Buy Me a Coffee 贊助'));
      a.href = link; a.target = '_blank'; a.rel = 'noopener';
      c.appendChild(a);
      var qr = el('div', 'spon-qr');
      var img = document.createElement('img');
      img.src = 'img/bmc-qr.jpg'; img.width = 200; img.height = 200; img.loading = 'lazy';
      img.alt = T('考英雄 Buy Me a Coffee 贊助頁 QR Code');
      qr.appendChild(img);
      qr.appendChild(el('p', 'spon-qr-cap', T('用手機掃這個 QR Code 也可以。')));
      c.appendChild(qr);
    } else {
      c.appendChild(el('div', 'warnbox',
        T('☕ Buy Me a Coffee 的贊助連結尚未設定，站長設定完成後這裡就會出現按鈕。')));
    }
    c.appendChild(el('h3', 'ph', T('不方便贊助也沒關係')));
    c.appendChild(el('p', null,
      T('把這個站分享給正在準備同一個考試的同學、或是回報你發現的錯誤，對我們一樣有幫助。')));
    main.appendChild(c);
  }

  function viewSupport(main) {
    main.appendChild(el('h1', 'pg-h', T('客服中心')));
    main.appendChild(el('p', 'lead', T('題目有錯、詳解有疑問、想投稿心得，或是希望我們加開某個考試，都歡迎告訴我們。')));
    var c = el('div', 'panel'); c.style.padding = '20px';
    c.appendChild(el('h3', 'ph', T('聯絡方式')));
    var mail = (window.APP_SUPPORT && window.APP_SUPPORT.email) || '';
    if (mail) {
      var a = el('a', 'btn', T('✉ 寄信給我們')); a.href = 'mailto:' + mail; c.appendChild(a);
      c.appendChild(el('p', 'lead', mail));
    } else {
      c.appendChild(el('div', 'warnbox', T('✉ 客服信箱尚未設定，站長設定完成後這裡就會出現聯絡方式。')));
    }
    c.appendChild(el('h3', 'ph', T('回報題目或詳解的問題')));
    c.appendChild(el('p', null, T('每一題答完後都有「⚑ 回報這題」，直接點就能送出，不必登入；'
      + '系統會自動帶上卷代碼與題號。若知道正確答案或出處，也請一併寫下，我們查證後會修正並標上修訂日期。')));
    c.appendChild(el('h3', 'ph', T('常見問題')));
    c.appendChild(el('h3', 'ph', T('Q：答案是誰訂的？')));
    c.appendChild(el('p', null, T('A：標準答案完全採用考選部公布的版本；若該題有公布更正答案，本站以更正後的為準。')));
    c.appendChild(el('h3', 'ph', T('Q：我的作答紀錄會不見嗎？')));
    c.appendChild(el('p', null, T('A：不登入時，紀錄只存在你自己的瀏覽器裡（localStorage），不會上傳；'
      + '清除瀏覽器資料或換裝置就會不見。登入之後會同步到雲端，換手機也看得到，並且隨時可以匯出帶走。')));
    c.appendChild(el('h3', 'ph', T('Q：要收費嗎？')));
    c.appendChild(el('p', null, T('A：不收費。全部題目與詳解都免費，也沒有廣告。')));
    main.appendChild(c);
  }

  function viewAbout(main) {
    main.appendChild(el('h1', 'pg-h', T('使用說明與版本紀錄')));
    var c = el('div', 'panel'); c.style.padding = '20px';
    c.appendChild(el('h3', 'ph', T('這個站是什麼')));
    c.appendChild(el('p', null, T('考英雄收錄國家考試的歷屆考古題，提供整卷測驗、無限刷題、錯題本與弱點統計，全部免費。')));
    c.appendChild(el('p', 'muted', T('本站原名「考古英雄」，2026-09-09 更名為「考英雄」，網址 kaohero.com；內容與紀錄不受影響。')));
    c.appendChild(el('h3', 'ph', T('資料來源')));
    c.appendChild(el('p', null,
      T('試題與標準答案取自考選部「考畢試題查詢平臺」公開之考畢試題與測驗式試題標準答案（政府資訊公開資料）。')
      + T('若標準答案有公布更正，本站以更正後的答案為準。站上的詳解與所有文案皆為本站自行撰寫。')));
    c.appendChild(el('h3', 'ph', T('資料存在哪裡')));
    c.appendChild(el('p', null, T('作答紀錄、錯題本與統計都存在你這台裝置的瀏覽器裡，不會上傳；換裝置或清除瀏覽器資料就會不見。')));
    c.appendChild(el('h3', 'ph', T('版本紀錄')));
    (window.APP_VERSIONS || []).forEach(function (v) {
      c.appendChild(el('h3', 'ph', v.v + T('　') + v.date));
      var ul = document.createElement('ul'); ul.className = 'ul';
      v.items.forEach(function (x) { ul.appendChild(el('li', null, x)); });
      c.appendChild(ul);
    });
    main.appendChild(c);
  }

  function viewNotFound(main) {
    main.appendChild(el('h1', 'pg-h', T('找不到這個頁面')));
    main.appendChild(el('p', 'lead', T('網址可能打錯了，或這個頁面已經移除。')));
    main.appendChild(btn(T('回首頁'), '', null, '#/'));
  }

  /* ============ toast ============ */
  var tEl = null;
  function toast(msg) {
    if (!tEl) { tEl = el('div', 'toast'); document.body.appendChild(tEl); }
    tEl.textContent = msg; tEl.className = 'toast on';
    clearTimeout(tEl._t); tEl._t = setTimeout(function () { tEl.className = 'toast'; }, 2600);
  }

  /* ============ 路由 ============ */
  function render() {
    var main = document.getElementById('main');
    main.innerHTML = '';
    var h = (location.hash || '#/').replace(/^#\/?/, '');
    var seg = h.split('/').filter(Boolean);
    var top = seg[0] || '';
    // 首頁整頁走 A 案的深色金字配色（css 裡以 body[data-page="home"] 換掉一整組色票），
    // 其餘頁面維持原本的淺色／深色主題。
    document.body.setAttribute('data-page', top || 'home');
    // 結束後顯示成績；但如果網址指向的是另一份卷子，就要開新的那一份，不能停在舊成績
    if (top !== 'quiz') stopMockTimer();          // 離開作答畫面就停掉模考的倒數
    if (quiz && quiz.done && (top === 'quiz' ||
        (top === 'paper' && quiz.mode === 'paper' && quiz.pid === seg[1]))) {
      if (quiz.mode === 'mock') viewMockResult(main); else viewResult(main);
      markNav(); return;
    }
    if (top === '') viewHome(main);
    else if (top === 'exams') viewExams(main);
    else if (top === 'exam') viewExam(main, seg[1]);
    else if (top === 'subject') viewSubject(main, seg[1], seg[2]);
    else if (top === 'track') viewTrack(main, seg[1], seg[2]);
    else if (top === 'paper') {
      // 題本是動態載入的，還沒到就先顯示載入中，startPaper 載完會再 render 一次
      if (!quiz || quiz.mode !== 'paper' || quiz.pid !== seg[1] || quiz.done) {
        var dft = state.drafts[seg[1]];
        if (dft && !resumeAsked[seg[1]]) { viewResumeAsk(main, seg[1], dft); }
        else {
          startPaper(seg[1], resumeAsked[seg[1]] === 'go');
          main.appendChild(el('p', 'lead', T('題本載入中…')));
        }
      } else viewQuiz(main);
    }
    else if (top === 'quiz') { if (quiz && quiz.mode === 'mock') viewMockQuiz(main); else viewQuiz(main); }
    else if (top === 'mock') viewMock(main);
    else if (top === 'friends') viewFriends(main);
    else if (top === 'wrong') viewWrong(main);
    else if (top === 'stats') viewStats(main);
    else if (top === 'guide') viewGuide(main);
    else if (top === 'stories') viewStories(main);
    else if (top === 'sponsor') viewSponsor(main);
    else if (top === 'support') viewSupport(main);
    else if (top === 'about') viewAbout(main);
    else if (top === 'admin') {
      // 站務後台：權限由後端 OWNER_EMAIL 把關，前端只是介面
      if (window.KHAdmin) window.KHAdmin.render(main);
      else main.appendChild(el('p', 'lead', T('後台元件尚未載入。')));
    }
    else viewNotFound(main);
    markNav();
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', render);
  buildNav();
  render();
  syncAdminLink();
  if (window.KH && window.KH.initPanel) {
    window.KH.initPanel(function () { buildNav(); render(); });
  }
})();
