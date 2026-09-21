/* 考英雄 — 個人錯題匯出（列印／PDF 與 Anki 匯入檔）
 *
 * 全部在瀏覽器裡做。錯題本本來就只存在這台裝置，匯出不經過伺服器，
 * 沒登入、離線也能用，也不會把個人作答紀錄送到任何地方。
 *
 * 為什麼 PDF 走「瀏覽器列印」而不是前端 PDF 函式庫：
 *   中文字型要嵌進 PDF，函式庫得自帶好幾 MB 的字型檔（純靜態站不划算，手機下載也慢）；
 *   改走列印就直接用系統字型，桌機 Chrome／Edge 的「另存為 PDF」與 iOS/Android 的
 *   「列印 → 儲存成 PDF」都是內建功能，排版還能照 @page 控制。
 * 為什麼 Anki 走純文字而不是 .apkg：
 *   .apkg 是內含 SQLite 的 zip，瀏覽器端要生得載 sql.js（約 1MB wasm）。
 *   Anki 官方的純文字匯入（#separator／#html／#deck／#tags column 標頭）本來就支援，
 *   零相依、檔案小、使用者也看得懂內容。
 *
 * 版面以手機優先：選項列、按鈕高度 ≥44px，360px 寬不得橫向溢出。
 */
(function () {
  'use strict';

  var LAB = ['A', 'B', 'C', 'D', 'E'];
  var A = null;                 // app.js 注入的介面（見 app.js 的 exportApi）
  function T(s) { return A && A.T ? A.T(s) : s; }

  function el(t, c, x) {
    var n = document.createElement(t);
    if (c) n.className = c;
    if (x != null) n.textContent = x;
    return n;
  }

  /* ============ 選取範圍 ============ */
  // 預設：全部科目、含已答對過的、含詳解與圖片
  var opt = { sid: '', hardOnly: false, withExp: true, withFig: true };

  function subjOf(pid) {
    var e = A.examOf(pid);
    return e ? e.subj : '';
  }
  function subjName(sid) {
    return (A.SUBJ[sid] && A.SUBJ[sid].name) || sid;
  }
  function picked() {
    return A.wrong.filter(function (w) {
      if (opt.sid && subjOf(w.pid) !== opt.sid) return false;
      if (opt.hardOnly && (w.s || 0) > 0) return false;
      return true;
    });
  }

  /* 把選到的錯題湊成可排版的清單。題本是動態載入的，先 loadMany 再組。
     排序用「科目 → 卷 → 原卷題號」，印出來才跟複習時的心智模型一致
     （考生想的是「我這一科還有哪幾題沒搞懂」，不是「我什麼時候答錯的」）。 */
  function collect(cb) {
    var ws = picked();
    var ids = [];
    ws.forEach(function (w) { if (ids.indexOf(w.pid) < 0) ids.push(w.pid); });
    A.loadMany(ids, function () {
      var out = [];
      ws.forEach(function (w) {
        var p = A.papers[w.pid];
        if (!p) return;
        var q = null;
        for (var i = 0; i < p.qs.length; i++) if (p.qs[i].n === w.n) { q = p.qs[i]; break; }
        if (!q) return;
        var e = A.examOf(w.pid);
        out.push({
          pid: w.pid, n: w.n, q: q, s: w.s || 0, exam: e,
          subj: e ? e.subj : '', label: (e && e.label) || (p && p.title) || w.pid
        });
      });
      out.sort(function (a, b) {
        var an = subjName(a.subj), bn = subjName(b.subj);
        if (an !== bn) return an < bn ? -1 : 1;
        if (a.pid !== b.pid) return a.pid < b.pid ? -1 : 1;
        return a.n - b.n;
      });
      cb(out);
    });
  }

  /* ============ 共用的題目零件 ============ */
  function answerText(q) {
    if (q.void) return T('本題送分（四個選項均給分）');
    var list = [q.a].concat(q.alt || []);
    return list.map(function (i) { return LAB[i]; }).join('、');
  }
  function isKey(q, k) {
    return !!q.void || k === q.a || (q.alt || []).indexOf(k) >= 0;
  }
  function optText(q, k) {
    var t = q.o[k];
    return (t && t.trim()) ? t : T('（見上圖）');
  }
  function expLines(q) {
    return (q.exp || '').split('\n').filter(function (l) { return !!l; });
  }
  function lineCls(line) {
    if (line.indexOf('✅') === 0) return 'ok';
    if (line.indexOf('📚') === 0) return 'src';
    if (line.indexOf('❌') === 0) return 'bad';
    return '';
  }
  function today() {
    var d = new Date(), p = function (x) { return (x < 10 ? '0' : '') + x; };
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
  }
  function stamp() { return today().replace(/-/g, ''); }
  function scopeName() {
    var s = opt.sid ? subjName(opt.sid) : T('全部科目');
    return s + (opt.hardOnly ? T('（只含還沒答對過的題）') : '');
  }
  function owner() {
    var p = null;
    try { p = window.KHSync && window.KHSync.profile && window.KHSync.profile(); } catch (e) {}
    return (p && (p.email || p.name)) || A.nick || '';
  }

  /* ============ 一、列印版（存成 PDF） ============ */
  function buildPrintDoc(items) {
    var root = el('div', 'px-doc');

    var cov = el('section', 'px-cover');
    cov.appendChild(el('div', 'px-kick', 'KAOHERO · ' + T('個人錯題本')));
    cov.appendChild(el('h1', null, T('我的錯題本')));
    cov.appendChild(el('p', 'px-dek', opt.withExp
      ? T('這份講義只收你自己答錯過的題，附正解與本站自撰的逐題詳解，可直接帶著複習。')
      : T('這份講義只收你自己答錯過的題，不含答案與詳解，可當成考前自我測驗卷。')));
    var dl = el('dl', 'px-meta');
    [[T('收錄範圍'), scopeName()], [T('題數'), items.length + T(' 題')],
     [T('卷數'), countPapers(items) + T(' 卷')], [T('匯出日期'), today()],
     [T('匯出者'), owner() || T('（未登入）')]].forEach(function (r) {
      dl.appendChild(el('dt', null, r[0]));
      dl.appendChild(el('dd', null, r[1]));
    });
    cov.appendChild(dl);
    cov.appendChild(el('p', 'px-note', T(
      '題目與標準答案取自考選部「考畢試題查詢平臺」與教育部公開之考畢試題與標準答案，屬政府資訊公開資料；'
      + '標準答案如有更正，以更正後的答案為準。詳解為考英雄自撰之原創著作，僅供個人備考使用，'
      + '請勿重製散布。本檔不構成醫療診斷建議或個案法律意見。')));
    root.appendChild(cov);

    var lastSubj = null, sec = null, i = 0;
    items.forEach(function (it) {
      if (it.subj !== lastSubj) {
        lastSubj = it.subj;
        sec = el('section', 'px-sec');
        sec.appendChild(el('h2', null, subjName(it.subj)));
        root.appendChild(sec);
      }
      i++;
      sec.appendChild(printItem(it, i));
    });

    root.appendChild(el('p', 'px-end',
      T('— 全部 ') + items.length + T(' 題，出自考英雄 kaohero.com —')));
    return root;
  }

  function countPapers(items) {
    var seen = {}, n = 0;
    items.forEach(function (it) { if (!seen[it.pid]) { seen[it.pid] = 1; n++; } });
    return n;
  }

  function printItem(it, i) {
    var q = it.q;
    var box = el('article', 'px-item');

    var head = el('div', 'px-head');
    head.appendChild(el('span', 'px-i', String(i)));
    head.appendChild(el('span', 'px-src', it.label + T('　原卷第 ') + q.n + T(' 題')));
    if (!it.s) head.appendChild(el('span', 'px-tag', T('還沒答對過')));
    box.appendChild(head);

    if (q.psg) {
      var pg = el('div', 'px-psg');
      pg.appendChild(el('b', null, T('短文')));
      pg.appendChild(el('p', null, q.psg));
      box.appendChild(pg);
    }
    box.appendChild(el('p', 'px-q', q.q));

    if (q.fig && opt.withFig) {
      var im = el('img', 'px-fig');
      im.src = q.fig;
      im.alt = T('原始試卷的題目圖');
      box.appendChild(im);
    } else if (q.fig || q.needfig) {
      box.appendChild(el('p', 'px-warn', T('（這一題的題目或選項是圖片，請回站上看原圖。）')));
    }

    var ul = el('ul', 'px-opts');
    (q.o || []).forEach(function (t, k) {
      var li = el('li', opt.withExp && isKey(q, k) ? 'px-key' : null);
      li.appendChild(el('b', null, '(' + LAB[k] + ')'));
      li.appendChild(document.createTextNode(' ' + optText(q, k)));
      ul.appendChild(li);
    });
    box.appendChild(ul);

    if (opt.withExp) {
      var ans = el('p', 'px-ans');
      ans.appendChild(el('b', null, T('正解：')));
      ans.appendChild(document.createTextNode(answerText(q)));
      box.appendChild(ans);
      var lines = expLines(q);
      if (lines.length) {
        var xw = el('div', 'px-exp');
        lines.forEach(function (l) { xw.appendChild(el('p', 'px-' + (lineCls(l) || 'l'), l)); });
        box.appendChild(xw);
      } else {
        box.appendChild(el('p', 'px-none', T('（這一題的詳解還沒寫，會分批補上。）')));
      }
    }
    return box;
  }

  /* 把列印版掛到 body 底下、只在列印時顯示，印完就拆掉。
     開新視窗會被手機的彈出視窗阻擋，所以用同一頁列印。 */
  function printNow(doc, done) {
    var host = document.getElementById('khprint');
    if (!host) { host = el('div'); host.id = 'khprint'; document.body.appendChild(host); }
    host.innerHTML = '';
    host.appendChild(doc);
    document.body.className += ' kh-printing';

    var cleared = false;
    function clear() {
      if (cleared) return; cleared = true;
      document.body.className = document.body.className.replace(/\s*kh-printing/g, '');
      host.innerHTML = '';
      if (window.removeEventListener) window.removeEventListener('afterprint', clear);
      if (done) done();
    }
    if (window.addEventListener) window.addEventListener('afterprint', clear);
    // 有些瀏覽器不發 afterprint（舊版 Safari），保險起見再補一個超時清除
    imagesReady(host, function () {
      try { window.print(); } catch (e) {}
      setTimeout(clear, 1200);
    });
  }

  /* 圖片沒載完就 print()，印出來會是空白框。等它們載完（最多 6 秒）。 */
  function imagesReady(node, cb) {
    var imgs = node.querySelectorAll('img'), left = 0, fired = false;
    function go() { if (!fired) { fired = true; cb(); } }
    for (var i = 0; i < imgs.length; i++) {
      if (imgs[i].complete) continue;
      left++;
      imgs[i].onload = imgs[i].onerror = function () { if (!--left) go(); };
    }
    if (!left) return setTimeout(go, 30);
    setTimeout(go, 6000);
  }

  /* ============ 二、Anki 匯入檔 ============ */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  // 欄位裡不能有 tab 與換行（那是欄位／列的分隔字元），一律換成空白或 <br>
  function cell(s) {
    return String(s).replace(/\t/g, ' ').replace(/\r?\n/g, ' ');
  }
  function abs(u) {
    try { return new URL(u, location.href).href; } catch (e) { return u; }
  }

  function ankiFront(it) {
    var q = it.q, h = [];
    h.push('<div class=kh-src>' + esc(it.label + '　' + T('原卷第 ') + q.n + T(' 題')) + '</div>');
    if (q.psg) h.push('<div class=kh-psg>' + esc(q.psg) + '</div>');
    h.push('<div class=kh-q>' + esc(q.q) + '</div>');
    if (q.fig) h.push('<div class=kh-fig><img src="' + esc(abs(q.fig)) + '"></div>');
    var li = (q.o || []).map(function (t, k) {
      return '<li><b>(' + LAB[k] + ')</b> ' + esc(optText(q, k)) + '</li>';
    }).join('');
    h.push('<ul class=kh-opts>' + li + '</ul>');
    return h.join('');
  }

  function ankiBack(it) {
    var q = it.q, h = [];
    h.push('<div class=kh-ans>' + esc(T('正解：') + answerText(q)) + '</div>');
    var lines = expLines(q);
    if (lines.length) {
      h.push('<div class=kh-exp>' + lines.map(function (l) {
        var c = lineCls(l);
        return c ? '<span class=kh-' + c + '>' + esc(l) + '</span>' : esc(l);
      }).join('<br>') + '</div>');
    } else {
      h.push('<div class=kh-exp>' + esc(T('（這一題的詳解還沒寫，會分批補上。）')) + '</div>');
    }
    h.push('<div class=kh-foot>' + esc('考英雄 kaohero.com'
      + (owner() ? ' · ' + owner() : '') + T(' · 詳解為本站自撰，請勿轉載散布')) + '</div>');
    return h.join('');
  }

  function ankiTags(it) {
    // Anki 的標籤用空白分隔，所以每個標籤本身不能有空白
    var t = ['考英雄'];
    if (it.exam) t.push('民國' + it.exam.roc + '年');
    var s = subjName(it.subj).replace(/\s+/g, '');
    if (s) t.push(s);
    t.push(it.pid);
    if (!it.s) t.push('還沒答對過');
    return t.join(' ');
  }

  function ankiText(items) {
    // Anki 2.1.55+ 認得的檔頭；#tags column 指到第 3 欄。
    // 刻意不寫 #notetype：牌型名稱會隨 Anki 介面語言不同（Basic／基本），
    // 指定到不存在的牌型會整份匯入失敗，留給匯入畫面挑最保險。
    var out = [
      '#separator:tab',
      '#html:true',
      '#deck:' + T('考英雄::錯題本'),
      '#tags column:3'
    ];
    items.forEach(function (it) {
      out.push(cell(ankiFront(it)) + '\t' + cell(ankiBack(it)) + '\t' + cell(ankiTags(it)));
    });
    return out.join('\n') + '\n';
  }

  function download(name, text) {
    var blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = el('a');
    a.href = url; a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 400);
  }

  /* ============ 介面 ============ */
  function render(main, api) {
    A = api;
    main.appendChild(el('h1', 'pg-h', T('錯題匯出')));

    if (!A.wrong.length) {
      main.appendChild(el('p', 'lead',
        T('錯題本目前是空的。答錯的題目會自動收進錯題本，之後就能匯出成講義或 Anki 卡片。')));
      main.appendChild(A.btn(T('去刷題'), '', null, '#/exams'));
      return;
    }
    main.appendChild(el('p', 'lead', T(
      '把錯題本整理成可以列印的講義（存成 PDF）或 Anki 卡片。'
      + '整個過程都在你的瀏覽器裡完成，作答紀錄不會上傳。')));

    var sec = el('section', 'sec');
    sec.appendChild(A.sectionHead(T('選擇要匯出的範圍')));
    var pan = el('div', 'panel px-pan');

    // 科目（用 chip，跟回報／後台的樣式一致）
    var bySubj = {};
    A.wrong.forEach(function (w) {
      var s = subjOf(w.pid); if (!s) return;
      bySubj[s] = (bySubj[s] || 0) + 1;
    });
    var chips = el('div', 'px-chips');
    var list = [['', T('全部'), A.wrong.length]].concat(
      Object.keys(bySubj).sort(function (a, b) { return bySubj[b] - bySubj[a]; })
        .map(function (s) { return [s, subjName(s), bySubj[s]]; }));
    list.forEach(function (row) {
      var b = el('button', 'px-chip' + (opt.sid === row[0] ? ' on' : ''),
        row[1] + '（' + row[2] + '）');
      b.onclick = function () { opt.sid = row[0]; refresh(); };
      chips.appendChild(b);
    });
    pan.appendChild(chips);

    pan.appendChild(check('hardOnly', T('只匯出「還沒答對過」的題'),
      T('連一次都還沒答對的題，考前優先看這些')));
    pan.appendChild(check('withExp', T('含正解與詳解'),
      T('取消勾選就變成純測驗卷，答案不印出來')));
    pan.appendChild(check('withFig', T('含題目圖片'),
      T('少數題目的選項是圖，列印時會一起帶上')));

    sec.appendChild(pan);
    main.appendChild(sec);

    var sel = picked(), cnt = sel.length;
    // 第三格刻意放數字而不是科目名：科目名動輒十來個字，塞進 KPI 方塊會擠成兩三行
    var pids = {};
    sel.forEach(function (w) { pids[w.pid] = 1; });
    main.appendChild(A.kpis([
      [String(cnt), T('本次匯出題數')],
      [String(Object.keys(pids).length), T('涵蓋卷數')],
      [String(A.wrong.length), T('錯題本總題數')]
    ]));

    var row = el('div', 'btnrow'); row.style.marginTop = '16px';
    var pb = A.btn(T('列印 / 存成 PDF'), '', function () {
      if (!cnt) return A.toast(T('這個範圍目前沒有錯題。'));
      pb.disabled = true; pb.textContent = T('整理中…');
      collect(function (items) {
        pb.disabled = false; pb.textContent = T('列印 / 存成 PDF');
        if (!items.length) return A.toast(T('題本載入失敗，請重新整理再試一次。'));
        printNow(buildPrintDoc(items));
      });
    });
    var ab = A.btn(T('下載 Anki 匯入檔'), 'o', function () {
      if (!cnt) return A.toast(T('這個範圍目前沒有錯題。'));
      ab.disabled = true; ab.textContent = T('整理中…');
      collect(function (items) {
        ab.disabled = false; ab.textContent = T('下載 Anki 匯入檔');
        if (!items.length) return A.toast(T('題本載入失敗，請重新整理再試一次。'));
        download('kaohero-wrong-' + stamp() + '.txt', ankiText(items));
        A.toast(T('已下載 ') + items.length + T(' 張卡片的匯入檔。'));
      });
    });
    row.appendChild(pb); row.appendChild(ab);
    main.appendChild(row);

    var s2 = el('section', 'sec'); s2.style.marginTop = '22px';
    s2.appendChild(A.sectionHead(T('匯出後怎麼用')));
    var p2 = el('div', 'panel');
    [[T('存成 PDF'), T('按「列印 / 存成 PDF」後，在列印視窗把印表機選成「另存為 PDF」'
        + '（手機是分享選單裡的「列印 → 儲存成 PDF」）。版面已設定成 A4，一題不會被切成兩頁。')],
     [T('匯入 Anki'), T('下載的是 Anki 官方的純文字匯入檔。開啟電腦版 Anki → 檔案 → 匯入 → '
        + '選這個 .txt 檔；牌組會自動建成「考英雄::錯題本」，欄位第一欄是題目、第二欄是答案與詳解。'
        + '牌型請選「基本／Basic」，並確認「允許 HTML」有打勾。')],
     [T('圖片題'), T('Anki 卡片裡的圖是連到本站的網址，離線時會看不到圖；'
        + 'PDF 則會把圖一起印進去。')]].forEach(function (r) {
      var d = el('div', 'px-how');
      d.appendChild(el('b', null, r[0]));
      d.appendChild(el('p', null, r[1]));
      p2.appendChild(d);
    });
    s2.appendChild(p2);
    main.appendChild(s2);

    var back = el('div', 'btnrow'); back.style.marginTop = '16px';
    back.appendChild(A.btn(T('← 回錯題本'), 'o', null, '#/wrong'));
    main.appendChild(back);
  }

  function check(key, title, sub) {
    var lb = el('label', 'px-ck');
    var cb = el('input');
    cb.type = 'checkbox';
    cb.checked = !!opt[key];
    cb.onchange = function () { opt[key] = cb.checked; refresh(); };
    lb.appendChild(cb);
    var t = el('span', 'px-ck-t');
    t.appendChild(el('b', null, title));
    if (sub) t.appendChild(el('span', null, sub));
    lb.appendChild(t);
    return lb;
  }

  // 選項改變就重畫這一頁（狀態存在模組層的 opt，不進 localStorage）。
  // 刻意不捲回頂端：使用者是在畫面中段勾選項，捲上去會讓他找不到剛按的那一列。
  function refresh() {
    var main = document.getElementById('main');
    if (!main) return;
    var y = window.pageYOffset || 0;
    main.innerHTML = '';
    render(main, A);
    window.scrollTo(0, y);
  }

  /* render 之外再開兩個方法：兩樣匯出成品各自可以單獨取得。
     smoke test 用它們驗內容（不能真的按下列印，headless 會卡在列印對話框），
     之後若要在後端產 .apkg，也是餵同一份 items。 */
  window.KHExport = {
    render: render,
    ankiText: function (cb) { collect(function (items) { cb(ankiText(items), items); }); },
    printHtml: function (cb) { collect(function (items) { cb(buildPrintDoc(items).outerHTML, items); }); }
  };
})();
