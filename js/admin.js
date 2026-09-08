/* 考古英雄 — 站務後台（#/admin）
 *
 * 2026-09-08 Tony：「後台做出來」。這一版只做三件真的會用到的事：
 *   1. 使用者概況（有多少人同步了紀錄、七日／三十日活躍）
 *   2. 題目回報收件匣（待處理 / 已修正 / 不修改）
 *   3. 使用者清單（email 與最後同步時間）
 * 權限完全由後端把關（OWNER_EMAIL），前端只是介面；沒登入或不是站長會拿到 403。
 *
 * 之後階段 3 的購買紀錄也掛在這一頁，不另外開站。
 */
(function () {
  var CFG = window.KH_CONFIG || {};
  var API = CFG.API_BASE;

  function el(t, c, x) {
    var n = document.createElement(t);
    if (c) n.className = c;
    if (x != null) n.textContent = x;
    return n;
  }
  function fmt(ts) {
    if (!ts) return '—';
    var d = new Date(Number(ts));
    function p(x) { return (x < 10 ? '0' : '') + x; }
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) +
      ' ' + p(d.getHours()) + ':' + p(d.getMinutes());
  }
  function req(method, path, body, cb) {
    var tk = window.KHSync && window.KHSync.token && window.KHSync.token();
    if (!tk) return cb('nologin');
    var xhr = new XMLHttpRequest();
    xhr.open(method, API + path);
    xhr.setRequestHeader('Authorization', 'Bearer ' + tk);
    if (body) xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
      if (xhr.status === 403) return cb('forbidden');
      if (xhr.status === 401) return cb('nologin');
      if (xhr.status < 200 || xhr.status >= 300) return cb('http ' + xhr.status);
      var d = null;
      try { d = JSON.parse(xhr.responseText); } catch (e) {}
      cb(null, d);
    };
    xhr.onerror = function () { cb('network'); };
    xhr.send(body ? JSON.stringify(body) : null);
  }

  var KIND_LABEL = { answer: '答案有疑問', exp: '詳解問題', typo: '錯字排版', other: '其他' };
  var STATUS_LABEL = { open: '待處理', fixed: '已修正', wontfix: '不修改' };

  function render(main) {
    main.appendChild(el('h1', null, '站務後台'));
    var note = el('p', 'lead', '只有站長帳號看得到內容。使用者回報的文字一律當資料顯示，不會被當成指令執行。');
    main.appendChild(note);

    if (!API) {
      main.appendChild(el('div', 'warnbox', '尚未設定 API 位址（js/config.js）。'));
      return;
    }
    if (!(window.KHSync && window.KHSync.signedIn && window.KHSync.signedIn())) {
      var w = el('div', 'warnbox', '請先用站長帳號登入（右上角「登入」）。');
      main.appendChild(w);
      return;
    }

    var sum = el('div', 'ad-sum');
    main.appendChild(sum);
    var box = el('div', 'panel');
    box.style.padding = '16px';
    main.appendChild(box);

    req('GET', '/api/kgh/admin/summary', null, function (err, d) {
      if (err) {
        sum.appendChild(el('div', 'warnbox',
          err === 'forbidden' ? '這個帳號不是站長，沒有後台權限。' : '讀取失敗：' + err));
        return;
      }
      var r = d.reports || {};
      [['同步使用者', d.users], ['7 日活躍', d.active7d], ['30 日活躍', d.active30d],
       ['待處理回報', r.open || 0]].forEach(function (p) {
        var c = el('div', 'ad-stat');
        c.appendChild(el('b', null, String(p[1])));
        c.appendChild(el('span', null, p[0]));
        sum.appendChild(c);
      });
    });

    var tabs = el('div', 'ad-tabs');
    var cur = 'open';
    var body = el('div');
    [['open', '待處理'], ['fixed', '已修正'], ['wontfix', '不修改'], ['all', '全部'],
     ['users', '使用者']].forEach(function (t) {
      var b = el('button', 'ad-tab' + (t[0] === cur ? ' on' : ''), t[1]);
      b.type = 'button';
      b.onclick = function () {
        cur = t[0];
        [].forEach.call(tabs.children, function (x) { x.className = 'ad-tab'; });
        b.className = 'ad-tab on';
        load();
      };
      tabs.appendChild(b);
    });
    box.appendChild(tabs);
    box.appendChild(body);

    function load() {
      body.innerHTML = '';
      body.appendChild(el('p', 'lead', '載入中…'));
      if (cur === 'users') {
        req('GET', '/api/kgh/admin/users?limit=300', null, function (err, d) {
          body.innerHTML = '';
          if (err) { body.appendChild(el('div', 'warnbox', '讀取失敗：' + err)); return; }
          var us = (d && d.users) || [];
          if (!us.length) { body.appendChild(el('p', 'lead', '目前還沒有人登入同步。')); return; }
          var tb = el('div', 'ad-table');
          us.forEach(function (u) {
            var row = el('div', 'ad-row');
            row.appendChild(el('span', 'ad-c1', u.email || '（未記錄 email）'));
            row.appendChild(el('span', 'ad-c2', fmt(u.updatedAt)));
            row.appendChild(el('span', 'ad-c3', Math.round((u.size || 0) / 1024) + ' KB'));
            tb.appendChild(row);
          });
          body.appendChild(tb);
        });
        return;
      }
      req('GET', '/api/kgh/admin/reports?status=' + cur + '&limit=300', null, function (err, d) {
        body.innerHTML = '';
        if (err) { body.appendChild(el('div', 'warnbox', '讀取失敗：' + err)); return; }
        var rs = (d && d.reports) || [];
        if (!rs.length) { body.appendChild(el('p', 'lead', '這一類目前沒有回報。')); return; }
        rs.forEach(function (r) { body.appendChild(reportCard(r, load)); });
      });
    }

    function reportCard(r, reload) {
      var c = el('div', 'ad-rep');
      var head = el('div', 'ad-rephd');
      head.appendChild(el('span', 'ad-pid', r.pid + (r.n ? ' · 第 ' + r.n + ' 題' : '')));
      head.appendChild(el('span', 'ad-kind', KIND_LABEL[r.kind] || r.kind));
      head.appendChild(el('span', 'ad-st ad-st-' + r.status, STATUS_LABEL[r.status] || r.status));
      c.appendChild(head);
      // 使用者輸入：只當文字顯示（textContent，不用 innerHTML）
      c.appendChild(el('p', 'ad-body', r.body));
      var meta = el('p', 'ad-meta',
        fmt(r.created_at) + '　' + (r.reporter || '匿名'));
      c.appendChild(meta);
      if (r.note) c.appendChild(el('p', 'ad-note', '處理備註：' + r.note));

      var row = el('div', 'ad-acts');
      [['fixed', '標記已修正'], ['wontfix', '標記不修改'], ['open', '退回待處理']]
        .filter(function (a) { return a[0] !== r.status; })
        .forEach(function (a) {
          var b = el('button', 'ad-act', a[1]);
          b.type = 'button';
          b.onclick = function () {
            var ask = window.KHDialog
              ? KHDialog.prompt('處理備註（可留空）：', { title: a[1], value: r.note || '' })
              : Promise.resolve(prompt('處理備註（可留空）：', r.note || ''));
            ask.then(function (note) {
              if (note === null) return;
              b.disabled = true;
              req('PATCH', '/api/kgh/admin/reports/' + r.id, { status: a[0], note: note },
                function (err) {
                  if (err) {
                    b.disabled = false;
                    if (window.KHDialog) KHDialog.toast('更新失敗：' + err); else alert('更新失敗：' + err);
                    return;
                  }
                  reload();
                });
            });
          };
          row.appendChild(b);
        });
      c.appendChild(row);
      return c;
    }

    load();
  }

  // 登入狀態一改變就重畫後台頁（否則「登入了還是進不去」——畫面停在登入提示）
  window.addEventListener('kh-auth', function () {
    if (!/^#\/admin(\/|$)/.test(location.hash || '')) return;
    var main = document.getElementById('main');
    if (!main) return;
    main.innerHTML = '';
    render(main);
  });

  window.KHAdmin = { render: render };
})();
