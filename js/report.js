/* 考古英雄 — 題目回報
 *
 * 站上每一題答完後都有「回報這題」，寄到後端的 /api/kgh/report。
 * 這是「可查證的品質」那條護城河的入口：使用者指出錯誤 → 後台看得到 → 修正後標記。
 * 不強迫登入才能回報（有登入就順便記下是誰報的）。
 *
 * 版面以手機優先：對話框滿版、輸入框夠大、按鈕高度 ≥44px。
 */
(function () {
  var CFG = window.KH_CONFIG || {};
  var API = CFG.API_BASE;
  if (!API) return;

  var KINDS = [
    ['answer', '答案有疑問'],
    ['exp', '詳解寫錯或看不懂'],
    ['typo', '錯字／排版'],
    ['other', '其他']
  ];

  function el(t, c, x) {
    var n = document.createElement(t);
    if (c) n.className = c;
    if (x != null) n.textContent = x;
    return n;
  }

  function open(pid, n) {
    var back = el('div', 'rp-back');
    var box = el('div', 'rp-box');
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', '回報這一題');

    box.appendChild(el('h3', 'rp-h', '回報這一題'));
    var sub = '卷代碼 ' + pid + (n ? '　原卷第 ' + n + ' 題' : '');
    box.appendChild(el('p', 'rp-sub', sub));

    var kindWrap = el('div', 'rp-kinds');
    var kind = 'answer';
    var kbtns = KINDS.map(function (k) {
      var b = el('button', 'rp-kind' + (k[0] === kind ? ' on' : ''), k[1]);
      b.type = 'button';
      b.onclick = function () {
        kind = k[0];
        kbtns.forEach(function (x) { x.className = 'rp-kind'; });
        b.className = 'rp-kind on';
      };
      kindWrap.appendChild(b);
      return b;
    });
    box.appendChild(kindWrap);

    var ta = el('textarea', 'rp-ta');
    ta.rows = 5;
    ta.maxLength = 2000;
    ta.placeholder = '請說明哪裡有問題。若知道正確答案或出處，也請一併寫下，我們會查證後修正。';
    box.appendChild(ta);

    var msg = el('p', 'rp-msg', '');
    box.appendChild(msg);

    var row = el('div', 'rp-row');
    var cancel = el('button', 'rp-btn', '取消');
    cancel.type = 'button';
    cancel.onclick = close;
    var send = el('button', 'rp-btn rp-go', '送出回報');
    send.type = 'button';
    send.onclick = function () {
      var body = ta.value.trim();
      if (!body) { msg.textContent = '請先寫下問題內容。'; ta.focus(); return; }
      send.disabled = true;
      send.textContent = '送出中…';
      var xhr = new XMLHttpRequest();
      xhr.open('POST', API + '/api/kgh/report');
      xhr.setRequestHeader('Content-Type', 'application/json');
      var tk = window.KHSync && window.KHSync.token && window.KHSync.token();
      if (tk) xhr.setRequestHeader('Authorization', 'Bearer ' + tk);
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          box.innerHTML = '';
          box.appendChild(el('h3', 'rp-h', '收到了，謝謝你'));
          box.appendChild(el('p', 'rp-sub',
            '我們會查證後修正，並在該題標上修訂日期。'));
          var ok = el('button', 'rp-btn rp-go', '關閉');
          ok.type = 'button';
          ok.onclick = close;
          var r2 = el('div', 'rp-row');
          r2.appendChild(ok);
          box.appendChild(r2);
          ok.focus();
          return;
        }
        send.disabled = false;
        send.textContent = '送出回報';
        msg.textContent = xhr.status === 429
          ? '回報太頻繁了，請稍後再試。'
          : '送出失敗（' + xhr.status + '），請稍後再試。';
      };
      xhr.onerror = function () {
        send.disabled = false;
        send.textContent = '送出回報';
        msg.textContent = '連不上伺服器，請檢查網路後再試。';
      };
      xhr.send(JSON.stringify({ pid: pid, n: n, kind: kind, body: body }));
    };
    row.appendChild(cancel);
    row.appendChild(send);
    box.appendChild(row);

    back.appendChild(box);
    back.onclick = function (e) { if (e.target === back) close(); };
    function onKey(e) { if (e.key === 'Escape') close(); }
    function close() {
      document.removeEventListener('keydown', onKey);
      back.remove();
    }
    document.addEventListener('keydown', onKey);
    document.body.appendChild(back);
    ta.focus();
  }

  // app.js 在答題回饋區呼叫這支，拿到一個「回報這題」的連結
  function link(pid, n) {
    var a = el('button', 'rp-link', '⚑ 回報這題');
    a.type = 'button';
    a.onclick = function () { open(pid, n); };
    return a;
  }

  window.KHReport = { open: open, link: link };
})();
