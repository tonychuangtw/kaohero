/* 考古英雄 — 前端全部邏輯
   純 vanilla JS、無 build；用 hash route，GitHub Pages 不需要伺服器端改寫。 */
(function () {
  'use strict';

  var CATS = window.APP_CATS || [];
  var SUBJ = window.APP_SUBJECTS || {};
  var EXAMS = window.APP_EXAMS || [];
  var PAPERS = window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};
  var VER = '20260908j';
  var KEY = 'kaoguhero.v1';
  var LAB = ['A', 'B', 'C', 'D', 'E'];   // 少數卷是五選一（地方特考五等國文、103~106 年律師第一試）
  var T = (window.KH && window.KH.T) || function (s) { return s; };
  function unitQ() { return T(' 題'); }
  function unitP() { return T(' 卷'); }
  function isEn() { return !!(window.KH && window.KH.lang() === 'en'); }
  function qLabel(n) { return isEn() ? ('Q ' + n) : ('第 ' + n + ' 題'); }
  function origQ(n) { return isEn() ? ('Paper Q ' + n) : ('原卷第 ' + n + ' 題'); }

  /* ============ 進度 ============ */
  var state = { stats: {}, wrong: [], last: null };
  function load() {
    try {
      var o = JSON.parse(localStorage.getItem(KEY) || '{}');
      state.stats = o.stats || {}; state.wrong = o.wrong || []; state.last = o.last || null;
    } catch (e) {}
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
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
  var NAV = [['#/', '首頁'], ['#/exams', '考試題庫'], ['#/guide', '準備方式'],
             ['#/stories', '考取心得'], ['#/sponsor', '贊助我們'], ['#/support', '客服中心']];
  function buildNav() {
    var nav = document.getElementById('nav'), dw = document.getElementById('drawer');
    nav.innerHTML = ''; dw.innerHTML = '';
    NAV.map(function (p) { return [p[0], T(p[1])]; }).forEach(function (p) {
      var a = el('a', null, p[1]); a.href = p[0]; a.setAttribute('data-nav', ''); nav.appendChild(a);
      var b = el('a', null, p[1]); b.href = p[0]; b.setAttribute('data-nav', ''); dw.appendChild(b);
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
  var DEMO = {
    src: '110 年第一次　專技高考醫師分階段考試　醫學（一）　第 5 題',
    bar: '110 年第一次　醫學（一）　·　第 5 題',
    q: '下列何者傳遞角膜（cornea）的一般感覺？',
    o: ['鼻睫神經（nasociliary nerve）', '額神經（frontal nerve）',
        '眶上神經（supraorbital nerve）', '動眼神經（oculomotor nerve）'],
    a: 0,
    exp: ['✅ (A) 角膜的一般感覺由三叉神經第一分支（眼神經）→ 鼻睫神經 → 睫狀長神經傳入，這正是角膜反射的傳入路徑（傳出為顏面神經支配眼輪匝肌）。',
          '❌ (B) 額神經也是眼神經的分支，但分布在前額與上眼瞼皮膚，不進入眼球。',
          '❌ (C) 眶上神經是額神經的終末分支，管前額與頭皮的感覺。',
          '❌ (D) 動眼神經是運動與副交感神經，不傳遞角膜的一般感覺。'],
    srcline: "📚 出處：Moore's Clinically Oriented Anatomy, 8th ed., Ch.7 Head（Orbit）；Gray's Anatomy for Students, 4th ed.。"
  };

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
    br.appendChild(btn(T('看看詳解長什麼樣'), '', null, '#demo'));
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
    s0.appendChild(el('p', 'eyebrow', T('為什麼選考古英雄')));
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
    s1.appendChild(el('p', 'lead', DEMO.src));
    var vs = el('div', 'vs');

    /* 左欄：一般考古題網站 */
    var colA = el('div', 'vs-col');
    colA.appendChild(el('p', 'vs-h', T('一般考古題網站')));
    var other = el('div', 'other');
    other.appendChild(el('div', 'bar', '📄 ' + DEMO.bar));
    var obody = el('div', 'body');
    obody.appendChild(el('p', 'stem', DEMO.q));
    var ovoid = el('div', 'void');
    ovoid.appendChild(el('p', 'ans-lab', T('答案')));
    ovoid.appendChild(el('div', 'big-a', 'Ａ'));
    ovoid.appendChild(el('p', 'after', T('…然後呢？為什麼額神經不行？眶上神經又差在哪？下次換一條神經來考，還是會錯。')));
    obody.appendChild(ovoid);
    other.appendChild(obody);
    colA.appendChild(other);
    vs.appendChild(colA);

    /* 右欄：考古英雄 */
    var ours = el('div', 'vs-col ours');
    ours.appendChild(el('p', 'vs-h', T('考古英雄')));
    var demo = el('div', 'demo');
    demo.appendChild(el('div', 'bar', '📄 ' + DEMO.bar));
    var body = el('div', 'body');
    body.appendChild(el('p', 'stem', DEMO.q));
    DEMO.o.forEach(function (o, i) {
      var d = el('div', 'opt' + (i === DEMO.a ? ' ok' : ''));
      d.appendChild(el('b', null, LAB[i])); d.appendChild(el('span', null, o));
      body.appendChild(d);
    });
    var exp = el('div', 'exp');
    exp.appendChild(document.createTextNode(DEMO.exp.join('\n')));
    exp.appendChild(el('span', 'src', DEMO.srcline));
    body.appendChild(exp);
    body.appendChild(el('p', 'note', T('每一題的詳解都是這個規格：✅ 正解理由 ／ ❌ 三個錯誤選項各錯在哪 ／ 📚 可查證的出處。')));
    demo.appendChild(body); ours.appendChild(demo); vs.appendChild(ours);
    s1.appendChild(vs); main.appendChild(s1);

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
    if (state.last) br2.appendChild(btn(T('接續上次：') + state.last.label, 'o', null, '#/paper/' + state.last.id));
    br2.appendChild(btn(T('複習錯題本'), 'o', null, '#/wrong'));
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
    var c2 = card('📕', T('只練這科的錯題'), T('複習你在這一科答錯過的題目'), null);
    c2.onclick = function () { startWrong(sid); }; c2.style.cursor = 'pointer';
    g.appendChild(c2);
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
  function startPaper(id) {
    if (loadingPid === id) return;
    loadingPid = id;
    loadPaper(id, function (p) {
      loadingPid = null;
      if (!p) return toast(T('題本載入失敗，請重新整理再試一次。'));
      quiz = { mode: 'paper', pid: id, title: p.title, qs: p.qs.slice(), i: 0, ans: [], ok: 0 };
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
      if (q.exp) { fb.appendChild(document.createElement('br')); fb.appendChild(document.createTextNode(q.exp)); }
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

  function answer(k) {
    var q = quiz.qs[quiz.i], m = curMeta();
    quiz.ans[quiz.i] = k;
    var good = isRight(q, k); if (good) quiz.ok++;
    var st = state.stats[m.pid] || (state.stats[m.pid] = { n: 0, ok: 0 });
    st.n++; if (good) st.ok++;
    var wi = -1;
    state.wrong.forEach(function (w, idx) { if (w.pid === m.pid && w.n === q.n) wi = idx; });
    if (good) { if (wi >= 0) state.wrong.splice(wi, 1); }
    else if (wi < 0) state.wrong.push({ pid: m.pid, n: q.n });
    save(); render();
  }

  function viewResult(main) {
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
      wc.appendChild(el('p', 'lead', T('答錯的題目已自動加入錯題本。')));
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
  }

  /* ============ 錯題本 / 統計 ============ */
  function viewWrong(main) {
    main.appendChild(el('h1', 'pg-h', T('錯題本')));
    if (!state.wrong.length) {
      main.appendChild(el('p', 'lead', T('目前沒有錯題。答錯的題目會自動收進這裡，答對一次之後就會移除。')));
      main.appendChild(btn(T('去刷題'), '', null, '#/exams')); return;
    }
    main.appendChild(el('p', 'lead', T('共 ') + state.wrong.length + T(' 題。答對一次就會自動移除。')));
    var row = el('div', 'btnrow');
    row.appendChild(btn(T('開始複習'), '', function () { startWrong(null); }));
    row.appendChild(btn(T('清空錯題本'), 'o', function () {
      if (confirm(T('確定要清空錯題本嗎？此動作無法復原。'))) { state.wrong = []; save(); render(); }
    }));
    main.appendChild(row);

    var by = {};
    state.wrong.forEach(function (w) { by[w.pid] = (by[w.pid] || 0) + 1; });
    var s = el('section', 'sec'); s.style.marginTop = '18px';
    s.appendChild(sectionHead(T('錯題分布')));
    var p = el('div', 'panel');
    Object.keys(by).sort().forEach(function (pid) {
      var e = examOf(pid);
      p.appendChild(item('📄', e ? (SUBJ[e.subj].name + T('　') + e.label) : pid, by[pid] + unitQ(), null));
    });
    s.appendChild(p); main.appendChild(s);
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
    main.appendChild(el('p', 'lead', T('考古英雄是免費的，沒有廣告，也不會把題目或詳解放到付費牆後面。')));
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
    c.appendChild(el('p', null, T('考古英雄收錄國家考試的歷屆考古題，提供整卷測驗、無限刷題、錯題本與弱點統計，全部免費。')));
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
    if (quiz && quiz.done && (top === 'quiz' ||
        (top === 'paper' && quiz.mode === 'paper' && quiz.pid === seg[1]))) {
      viewResult(main); markNav(); return;
    }
    if (top === '') viewHome(main);
    else if (top === 'exams') viewExams(main);
    else if (top === 'exam') viewExam(main, seg[1]);
    else if (top === 'subject') viewSubject(main, seg[1], seg[2]);
    else if (top === 'track') viewTrack(main, seg[1], seg[2]);
    else if (top === 'paper') {
      // 題本是動態載入的，還沒到就先顯示載入中，startPaper 載完會再 render 一次
      if (!quiz || quiz.mode !== 'paper' || quiz.pid !== seg[1] || quiz.done) {
        startPaper(seg[1]);
        main.appendChild(el('p', 'lead', T('題本載入中…')));
      } else viewQuiz(main);
    }
    else if (top === 'quiz') viewQuiz(main);
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
