/* 考英雄 — 模考後的弱點診斷與補弱題單（2026-09-21）
 *
 * 交卷後只給一個分數，考生不知道下一步要做什麼。這一段回答三件事：
 *   1. 這次考壞在哪裡？——依「詳解出處」歸出主題，列出錯最多的幾個
 *   2. 是不是時間不夠？——前半段與後半段的正確率、未作答題數
 *   3. 然後呢？——就那幾個弱主題，從同一科的其他年份抽一份「補弱題單」直接練
 *
 * ⚠️ 主題是**從詳解的「📚 出處：」那一行自動歸類**的，不是人工標的科目大綱：
 *    出處寫法各科不一（醫科多半是教科書章名、國文多半是「應用文—題辭」這種），
 *    所以歸類會有雜訊。介面上要誠實講這件事，不要讓人以為是官方的命題大綱分類。
 * ⚠️ 補弱題單只從「已經載進來的同科考卷」抽，不夠才多載幾份（手機一次載十幾份會卡）。
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

  var MAX_TOPICS = 6;      // 診斷表最多列幾個主題
  var WEAK_TOPICS = 5;     // 補弱題單依幾個弱主題抽題
  var DRILL_N = 20;        // 補弱題單題數
  var EXTRA_PAPERS = 5;    // 題目不夠時最多再多載幾份考卷
  var MIN_PER_TOPIC = 4;   // 每個弱主題至少要湊到幾題，不夠就用關鍵詞／章名再找一輪

  /* 從詳解的出處行歸出主題。歸不出來就回 null（那題不進診斷表）。
     fine=true 時不把法規題聚合到法規名稱（保留條號），給「整份卷都是同一部法」的科目用。 */
  function topicOf(q, fine) {
    var line = null;
    (q && q.exp || '').split('\n').forEach(function (l) {
      if (!line && l.indexOf('📚') === 0) line = l;
    });
    if (!line) return null;
    var raw = line.replace(/^📚\s*/, '').replace(/^出處[：:]\s*/, '');
    var t = raw;
    // 章節標記後面「直接接括號」時，括號裡就是章名，不是舉例：
    //   「Guyton…, 14th ed., Ch.64（Swallowing）」「第 11 章（腦神經核）」
    // 這要在下面那行把括號剝掉之前先攔，否則章名會連同括號一起被丟掉，整句只剩書名版次
    // → 被當成「只有書名」而歸不出主題（2026-09-23 抽查牙醫與解剖生理，7,344 題有 527 題是這樣）。
    var chp = raw.match(/(?:\b(?:ch|chap|chapter)\.?\s*[\d–—-]+|第\s*[\d–—-]+\s*章)\s*[（(]([^）)]+)[）)]/i);
    if (chp) return clip(chp[1].split(/[；;，,]/)[0].trim());
    // 先把括號內容拿掉：那是舉例（「成語辨正（嘆為觀止、斷章取義）」），不是主題本身。
    // 一定要在找「章」之前拿掉，否則「斷章取義）」裡的那個章會被當成章節標記（2026-09-21 踩過）。
    t = t.replace(/（[^）]*）/g, '').replace(/\([^)]*\)/g, '');
    // 醫科的出處是「書名＋章」，章名在「章」字的哪一邊要看寫法：
    //   「…，第 11 章 Cranial Nerve Nuclei；…」「…Head 章 External ear innervation；…」→ 章在名字前
    //   「…第 8 版，腦神經核章；…」「…，視丘章。」                                    → 章在名字後
    // 兩種都要認：只認一種的話有一半的卷整份歸不出主題（實測 6 卷只有 1 卷歸得出）。
    // 牙醫那種全英文出處「Moore's Clinically Oriented Anatomy, 8th ed., Ch.8 Head；…」：Ch.N 後面才是章名
    var che = t.match(/\b(?:ch|chap|chapter)\.?\s*\d+\s*[:.]?\s*([A-Za-z][^;；，,。]*)/i);
    var ch = che ? null : t.match(/章\s*([^；;，,。]{2,})/);
    var ch2 = (che || ch) ? null : t.match(/[，,；;]\s*([^，,；;。]{2,14})章/);
    if (che || ch || ch2) {
      t = (che || ch || ch2)[1];
    } else {
      // 剩下的都是「大類＋細目」的寫法，取大類那一段：
      //   「應用文—題辭」（國文）、「餐旅英語會話：餐廳點餐」（外語）、「日語文法／N3文法…」（日語）
      // 只認破折號的話，外語科每一題都會自成一個主題（實測 29 個觀光科目有 21 個判定為「差」）。
      t = t.split(/[—－–：:／/]/)[0].split(/[；;]/)[0];
    }
    t = t.replace(/[。，,、：:；;]+$/, '').replace(/^[。，,、：:；;]+/, '').trim();
    // 法科的出處是條號（「行政訴訟法第 6 條、第 2 條」），一條一個主題等於沒有主題：
    // 同一個考點在不同年份會引不同條號，聚合到「法規名稱」才看得出哪一部法不熟。
    // ⚠️ 量詞下限是 1 不是 2：寫 {2,14} 的話「民法第 27 條」會整個比不到
    //    （「民法」把結尾的「法」吃掉之後，前綴只剩 1 個字）。後面的「第 N 條」是錨點，
    //    所以懶惰比對不會把「憲法訴訟法」切成「憲法」。
    var law = fine ? null : t.match(/^(.{1,14}?(?:法|條例|規則|細則|通則|辦法|標準|準則|公約))\s*第\s*\d+/);
    var ref = (fine || law) ? null : t.match(/^(.{0,6}釋字)\s*第\s*\d+/);
    if (law || ref) t = (law || ref)[1];
    else if (fine) t = t.replace(/(第\s*\d+\s*條)[^]*$/, '$1');   // 只留第一個條號，條號串不算不同主題
    // 只剩教科書出處（「第 8 版」「Moore《…》」）的話就不當主題：那是「書」不是「考點」，
    // 拿它當主題只會在診斷表上看到一排書名。國文那種《易經·乾卦》九五爻辭則是真的考點，留著。
    if (/第\s*\d+\s*版/.test(t) || /\b\d+\s*(?:st|nd|rd|th)\s*ed\b/i.test(t)
        || /^[A-Za-z][A-Za-z.&'\s-]*《/.test(t)) return bookTail(raw);
    return clip(t);
  }

  /* 出處只剩書名版次時的救援：醫科詳解的寫法其實把考點寫在書名「後面」或「括號裡」，
     整行丟掉等於把 4,000 多題的考點一起丟掉（2026-09-23 抽查 8 個「差」的科目，
     7,344 題歸不出主題裡有 6,800 多題其實寫了考點）：
       「Moore《Clinically Oriented Anatomy》腰神經叢；Netter 圖譜…」        → 》後面那段
       「Wheeler's …, 11th ed.（The primary dentition：maxillary canine）」→ 句尾括號裡那段
     只看第一個分號前的那一段：後面的是補充書目，不是這一題的考點。 */
  function bookTail(raw) {
    var seg = String(raw).split(/[；;]/)[0];
    var m = seg.match(/》\s*([^；;。]{2,})/);
    if (!m) m = seg.match(/[（(]([^）)]{2,})[）)]\s*[。.]?\s*$/);
    if (!m) return null;
    var s = m[1].split(/[—－–：:／/]/)[0].replace(/[。，,、：:；;]+$/, '').trim();
    // 剝完還是書名版次（「8th ed.」「第 8 版」）就真的沒有考點可歸
    if (/第\s*\d+\s*版/.test(s) || /\b\d+\s*(?:st|nd|rd|th)\s*ed\b/i.test(s)) return null;
    return clip(s);
  }

  /* 主題太長就截斷（診斷表一行放不下），截到最後一個空白避免把英文字切一半。 */
  function clip(t) {
    t = String(t || '').replace(/[。，,、：:；;]+$/, '').trim();
    if (t.length > 24) {
      var cut = t.slice(0, 24);
      var sp = cut.lastIndexOf(' ');
      t = (sp > 12 ? cut.slice(0, sp) : cut).trim() + '…';
    }
    return t.replace(/…$/, '').length >= 2 ? t : null;
  }

  /* 一份卷該用多粗的主題。
     法規題預設聚合到法規名稱（「行政訴訟法」），但「民法概要」那種整份都考同一部法的卷，
     聚合完只剩一個主題＝等於沒診斷；那就退回條號（「民法第 95 條」）。 */
  function topicsFor(qs) {
    var coarse = qs.map(function (q) { return topicOf(q); });
    var n = distinct(coarse);
    if (n >= 3) return coarse;
    var fine = qs.map(function (q) { return topicOf(q, true); });
    return distinct(fine) > n ? fine : coarse;
  }
  function distinct(list) {
    var seen = {}, n = 0;
    list.forEach(function (t) { if (t && !seen[t]) { seen[t] = 1; n++; } });
    return n;
  }

  /* 這次模考的主題統計：每個主題考了幾題、錯幾題。 */
  function byTopic(qs, ans, isRight) {
    var map = {}, list = topicsFor(qs);
    qs.forEach(function (q, k) {
      var t = list[k];
      if (!t) return;
      var b = map[t] || (map[t] = { topic: t, n: 0, bad: 0, src: srcOf(q) });
      b.n++;
      if (ans[k] == null || !isRight(q, ans[k])) b.bad++;
    });
    return Object.keys(map).map(function (k) { return map[k]; })
      .sort(function (a, b) {
        if (b.bad !== a.bad) return b.bad - a.bad;       // 錯得多的排前面
        return (a.n - a.bad) / a.n - (b.n - b.bad) / b.n; // 同樣錯幾題時，正確率低的排前面
      });
  }

  /* 前半段 vs 後半段的正確率：分數一樣，但「越後面越差」多半是時間不夠或疲勞，處方不同。 */
  function pace(qs, ans, isRight) {
    var half = Math.floor(qs.length / 2), a = { n: 0, ok: 0 }, b = { n: 0, ok: 0 };
    qs.forEach(function (q, k) {
      var box = k < half ? a : b;
      box.n++;
      if (ans[k] != null && isRight(q, ans[k])) box.ok++;
    });
    var blank = 0;
    qs.forEach(function (q, k) { if (ans[k] == null) blank++; });
    return { first: a, second: b, blank: blank };
  }

  function pct(a, b) { return b ? Math.round(a * 100 / b) : 0; }

  /* 一題的出處原文（用來做寬鬆比對）。 */
  function srcOf(q) {
    var line = null;
    (q && q.exp || '').split('\n').forEach(function (l) {
      if (!line && l.indexOf('📚') === 0) line = l;
    });
    return line || '';
  }
  // 比對用的正規化：大小寫、空白、標點都不算數（「The Thalamus」對得上「the thalamus,」）
  function norm(s) {
    return String(s || '').toLowerCase().replace(/[\s·．.,，、;；:：'"“”「」『』（）()《》〈〉—－–…]/g, '');
  }

  /* 主題的「關鍵詞」：整串對不到時的退路。
     醫科的考點常被寫成一整句（「Dentin–pulp complex：pulp 的神經分布」），
     同一個考點換一年就換一種寫法，整串比對幾乎抽不到題
     （2026-09-23 出處解析改善後主題變細，牙醫類可抽題數從 155 掉到 10）。
     改成拆出關鍵詞：英文取 4 個字母以上的單字、中文取 2 字以上的連續片段，
     任何一個出現在那題的出處行裡就算同主題。
     ⚠️ 刻意不收太常見的字（見 STOP）：'anatomy'、'第 8 版' 那種會把整科的題都拉進來。 */
  var STOP = ['anatomy', 'physiology', 'textbook', 'clinical', 'clinically', 'oriented',
              'dental', 'medical', 'oral', 'principles', 'handbook', 'contemporary',
              'edition', 'chapter', '出處', '教科書', '第版'];
  /* 出處行裡的「章」那一層（Ch.8 Head／第 11 章 Cranial Nerve Nuclei／腦神經核章）。
     這正是 2026-09-21 舊版 topicOf 歸出來的主題，粒度粗但跨年份對得上，
     所以拿來當補弱題單的最後一道退路（2026-09-23）。 */
  function chapterKey(line) {
    var t = String(line || '').replace(/^📚\s*/, '').replace(/^出處[：:]\s*/, '')
      .replace(/（[^）]*）/g, '').replace(/\([^)]*\)/g, '');
    var m = t.match(/\b(?:ch|chap|chapter)\.?\s*\d+\s*[:.]?\s*([A-Za-z][^;；，,。]*)/i)
      || t.match(/章\s*([^；;，,。]{2,})/)
      || t.match(/[，,；;]\s*([^，,；;。]{2,14})章/);
    var k = m ? norm(m[1]) : '';
    return k.length >= 3 ? k : '';
  }

  function topicKeys(t) {
    var s = String(t || '').replace(/…$/, '');
    var out = [];
    (s.match(/[A-Za-z][A-Za-z'’-]{3,}/g) || []).forEach(function (w) {
      var k = norm(w);
      if (k.length >= 4 && STOP.indexOf(k) < 0) out.push(k);
    });
    (s.match(/[\u4e00-\u9fff]{2,}/g) || []).forEach(function (w) {
      // 中文考點多半是「腰神經叢」「下肢肌肉章節」這種一長串，整串比對只對得到自己；
      // 先剝掉「章節／分類／概論」這類尾巴，再補一個 3 字前綴當關鍵詞（「腰神經叢」→「腰神經」），
      // 不同年份的詳解才對得起來（2026-09-23 解剖生理科實測：不補前綴幾乎抽不到題）。
      var k = norm(w).replace(/(章節|章|節|分類|特徵|概論|概念|原則|機轉|作用|附著點|一節)$/, '');
      if (k.length >= 2 && STOP.indexOf(k) < 0) out.push(k);
      if (k.length >= 4) out.push(k.slice(0, 3));
    });
    return out.slice(0, 5);
  }

  /* 補弱題單：從已載入的同科考卷裡，抽出「屬於弱主題、這次沒考到」的題。
     比對用寬鬆規則——主題字串出現在那題的出處行裡就算同主題。
     嚴格比對（主題字串完全相等）在醫科幾乎抽不到題：同一個考點在不同年份的詳解裡，
     出處可能寫成章名、中文譯名或書名＋章名，只有包含關係對得起來。
     各弱主題輪流取一題（round-robin），免得整份都是同一個主題。 */
  function buildDrill(weak, used, sid) {
    var want = {}, keys = [];
    weak.forEach(function (w) {
      want[w.topic] = [];
      var alt = topicKeys(w.topic);
      var ck = chapterKey(w.src);
      if (ck && alt.indexOf(ck) < 0) alt.push(ck);
      keys.push({ topic: w.topic, key: norm(w.topic), alt: alt });
    });
    var ids = A.EXAMS.filter(function (e) { return e.subj === sid; }).map(function (e) { return e.id; });
    var scan = function (useAlt) {
      ids.forEach(function (pid) {
        var p = A.papers[pid];
        if (!p) return;
        p.qs.forEach(function (q) {
          if (q.needfig && !q.fig) return;               // 選項在圖上又沒圖檔的題不能練
          if (used[pid + '#' + q.n]) return;             // 這次模考考過的不重複
          var src = norm(srcOf(q));
          if (!src) return;
          for (var i = 0; i < keys.length; i++) {
            if (useAlt && want[keys[i].topic].length >= MIN_PER_TOPIC) continue;   // 抽夠的主題不用退路
            var hit = useAlt
              ? keys[i].alt.some(function (k) { return src.indexOf(k) >= 0; })
              : (keys[i].key.length >= 2 && src.indexOf(keys[i].key) >= 0);
            if (hit) {
              want[keys[i].topic].push({ pid: pid, n: q.n, q: q, title: p.title });
              break;                                    // 一題只算一個主題，避免同一題被兩個池子搶
            }
          }
        });
      });
    };
    scan(false);
    if (keys.some(function (k) { return want[k.topic].length < MIN_PER_TOPIC && k.alt.length; })) scan(true);
    var pools = weak.map(function (w) { return want[w.topic] || []; });
    pools.forEach(shuffle);
    var out = [], guard = 0;
    while (out.length < DRILL_N && guard++ < DRILL_N * 4) {
      var got = false;
      for (var i = 0; i < pools.length && out.length < DRILL_N; i++) {
        if (pools[i].length) { out.push(pools[i].pop()); got = true; }
      }
      if (!got) break;
    }
    return out;
  }

  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
    }
  }

  /* 已載入的卷不夠時，再多載幾份同科的卷（優先載還沒載過的、年份新的）。 */
  function loadMore(sid, cb) {
    var more = A.EXAMS.filter(function (e) { return e.subj === sid && !A.papers[e.id]; })
      .sort(function (a, b) { return (b.roc || 0) - (a.roc || 0); })
      .slice(0, EXTRA_PAPERS).map(function (e) { return e.id; });
    if (!more.length) return cb(false);
    A.loadMany(more, function () { cb(true); });
  }

  /* ============ 介面 ============ */
  function render(main, ctx) {
    A = ctx;
    var qs = A.quiz.qs, ans = A.quiz.ans, isRight = A.isRight;
    var topics = byTopic(qs, ans, isRight);
    var p = pace(qs, ans, isRight);

    var sec = el('section', 'sec'); sec.style.marginTop = '16px';
    sec.appendChild(A.sectionHead(T('弱點診斷')));

    var pan = el('div', 'panel'); pan.style.padding = '16px';

    // 1) 節奏：前半 vs 後半
    var r1 = pct(p.first.ok, p.first.n), r2 = pct(p.second.ok, p.second.n);
    var pc = el('div', 'dg-pace');
    pc.appendChild(paceBox(T('前半段'), r1, p.first.n));
    pc.appendChild(paceBox(T('後半段'), r2, p.second.n));
    pc.appendChild(paceBox(T('未作答'), null, p.blank));
    pan.appendChild(pc);
    pan.appendChild(el('p', 'dg-note', paceAdvice(r1, r2, p.blank, qs.length)));

    // 2) 主題表
    if (topics.length) {
      var bad = topics.filter(function (t) { return t.bad > 0; });
      pan.appendChild(el('h3', 'ph', bad.length ? T('錯最多的主題') : T('這次每個主題都全對')));
      if (bad.length) {
        var tb = el('div', 'dg-list');
        bad.slice(0, MAX_TOPICS).forEach(function (t) {
          var row = el('div', 'dg-row');
          var nm = el('b', 'dg-t', t.topic);
          var meter = el('span', 'dg-bar');
          var fill = el('i'); fill.style.width = pct(t.bad, t.n) + '%';
          meter.appendChild(fill);
          row.appendChild(nm);
          row.appendChild(meter);
          row.appendChild(el('span', 'dg-n', T('錯 ') + t.bad + ' / ' + t.n + unitQ()));
          tb.appendChild(row);
        });
        pan.appendChild(tb);
      }
      // 有些科（例如牙醫）的出處多半只寫書名版次，歸得出考點的題數很少：
      // 那種情況下，主題表只代表那一小撮題，不講清楚會讓人以為「我就弱在這幾個主題」。
      var classified = 0;
      topics.forEach(function (t) { classified += t.n; });
      if (classified < qs.length * 0.25) {
        pan.appendChild(el('p', 'dg-fine', T('※ 這一科只有 ') + classified + ' / ' + qs.length
          + T(' 題的詳解出處歸得出考點，下面的主題只代表那幾題，不是整份卷的全貌。')));
      }
      pan.appendChild(el('p', 'dg-fine',
        T('※ 主題是依每題詳解的「出處」自動歸類的，不是官方的命題大綱；各科出處寫法不同，歸類可能有誤差。')));
    } else {
      pan.appendChild(el('p', 'dg-note',
        T('這份卷的題目還沒有詳解出處可以歸類主題，所以這次只看節奏與錯題清單。')));
    }
    sec.appendChild(pan);

    // 3) 補弱題單
    var weak = topics.filter(function (t) { return t.bad > 0; }).slice(0, WEAK_TOPICS);
    // 付費牆（2026-09-21）：診斷本身免費（分數、節奏、錯最多的主題都看得到），
    // 擋的只是「幫你把同主題的題抓出來變成一份題單」這個省時間的動作。
    if (weak.length && window.KHPay && !window.KHPay.can(A.quiz.sid)) {
      sec.appendChild(window.KHPay.lockCard(T('補弱題單是付費功能'),
        T('上面的診斷是免費的。付費的是「就這幾個弱主題，自動從其他年份抓一份題單給你練」。')));
      main.appendChild(sec);
      return;
    }
    if (weak.length) {
      var used = {};
      qs.forEach(function (q, k) { used[A.quiz.meta[k].pid + '#' + q.n] = 1; });
      var row = el('div', 'btnrow'); row.style.marginTop = '12px';
      var b = A.btn(T('練同主題的其他題'), '', function () {
        b.disabled = true; b.textContent = T('抽題中…');
        var list = buildDrill(weak, used, A.quiz.sid);
        var go = function () {
          b.disabled = false; b.textContent = T('練同主題的其他題');
          if (list.length < 5) {
            return A.toast(T('這一科同主題的題目不夠（只找到 ') + list.length
              + T(' 題），先把這次的錯題重練一次吧。'));
          }
          if (list.length < DRILL_N) A.toast(T('同主題只找到 ') + list.length + T(' 題，先練這些。'));
          A.startList(list.map(function (x) { return { pid: x.pid, n: x.n }; }),
            T('補弱練習 · ') + weak[0].topic + (weak.length > 1 ? T(' 等 ') + weak.length + T(' 個主題') : ''));
        };
        if (list.length >= DRILL_N) return go();
        // 已載入的卷抽不滿，再多載幾份同科的卷試一次
        loadMore(A.quiz.sid, function (loaded) {
          if (loaded) list = buildDrill(weak, used, A.quiz.sid);
          go();
        });
      });
      row.appendChild(b);
      sec.appendChild(row);
      sec.appendChild(el('p', 'dg-fine',
        T('補弱題單會從同一科的其他年份，抽出上面這幾個主題的題目（最多 ') + DRILL_N + T(' 題），這次考過的不重複。')));
    }
    main.appendChild(sec);
  }

  function unitQ() { return T(' 題'); }

  function paceBox(label, rate, n) {
    var d = el('div', 'dg-p');
    d.appendChild(el('b', null, rate == null ? String(n) : rate + '%'));
    // 未作答那格的大數字本身就是題數，標籤再補一個「題」會變成「未作答 題」
    d.appendChild(el('span', null, label + (rate == null ? '' : T('　') + n + unitQ())));
    return d;
  }

  function paceAdvice(r1, r2, blank, total) {
    if (blank >= Math.max(3, Math.round(total * 0.1))) {
      return T('有 ') + blank + T(' 題沒作答——先練配速：遇到不會的先標記跳過，把會的題全部寫完再回頭。');
    }
    if (r1 - r2 >= 15) {
      return T('後半段掉了 ') + (r1 - r2) + T(' 個百分點，多半是時間壓力或疲勞，不一定是不會；下次試著把前半段的速度再加快一點。');
    }
    if (r2 - r1 >= 15) {
      return T('後半段反而比前半段好 ') + (r2 - r1) + T(' 個百分點，通常是一開始還沒進入狀況；正式考前先做 5 題暖身。');
    }
    return T('前後半段的正確率差不多，節奏穩定；接下來把下面那幾個主題補起來就好。');
  }

  window.KHDiag = { render: render, topicOf: topicOf, topicsFor: topicsFor, byTopic: byTopic,
                    topicKeys: topicKeys, chapterKey: chapterKey, norm: norm };
})();
