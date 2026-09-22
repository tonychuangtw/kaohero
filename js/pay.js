/* 考英雄 — 付費方案與我的帳戶（2026-09-21）
 *
 * 金流走綠界（ECPay）全方位金流的一次性付款，後端在 /api/kgh/pay/*：
 *   1. 前端 POST /pay/checkout（要登入）→ 後端建單並回一張綠界表單
 *   2. 這支把表單塞進頁面自動送出 → 使用者在綠界付款
 *   3. 綠界 server-to-server 打後端的 /pay/notify 才真的開通權益
 *   4. 使用者的瀏覽器被導回 #/account?paid=1，這裡再跟後端確認一次權益
 *
 * ⛔ 不在前端判斷「有沒有付錢」以外的任何金額邏輯：金額、天數、開通與否全部由後端決定。
 * ⚠️ 付費牆（後端環境變數 KAOHERO_PAYWALL）預設是關的：關著的時候 can() 一律回 true，
 *    三個付費入口照常免費使用。金流驗完、Tony 決定開賣那天才打開。
 */
(function () {
  'use strict';

  var CFG = window.KH_CONFIG || {};
  var API = CFG.API_BASE || '';
  var A = null;
  function T(s) { return A && A.T ? A.T(s) : s; }

  function el(t, c, x) {
    var n = document.createElement(t);
    if (c) n.className = c;
    if (x != null) n.textContent = x;
    return n;
  }

  // 後端回來的權益快取。paywall=false 代表整個站還沒開始收費。
  var state = { loaded: false, paywall: false, live: false, plans: [], items: [] };

  function signedIn() {
    try { return !!(window.KHSync && window.KHSync.signedIn()); } catch (e) { return false; }
  }
  function authHeaders() {
    var h = { 'Content-Type': 'application/json' };
    try {
      var t = window.KHSync && window.KHSync.token && window.KHSync.token();
      if (t) h.Authorization = 'Bearer ' + t;
    } catch (e) {}
    return h;
  }
  function qs() {
    var m = /\?(.*)$/.exec(location.hash || '');
    var out = {};
    (m ? m[1] : '').split('&').forEach(function (kv) {
      if (!kv) return;
      var i = kv.indexOf('=');
      out[decodeURIComponent(i < 0 ? kv : kv.slice(0, i))] = i < 0 ? '' : decodeURIComponent(kv.slice(i + 1));
    });
    return out;
  }
  function fmtDate(ms) {
    var d = new Date(ms), p = function (n) { return (n < 10 ? '0' : '') + n; };
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
  }
  function daysLeft(ms) { return Math.max(0, Math.ceil((ms - Date.now()) / 86400000)); }

  /* 載入方案與（登入時的）權益。後端連不上就當「沒開始收費」，不要把人擋在外面。 */
  function load(cb) {
    if (!API) { state.loaded = true; return cb && cb(); }
    var left = signedIn() ? 2 : 1, done = function () { if (!--left) { state.loaded = true; cb && cb(); } };
    fetch(API + '/api/kgh/pay/plans')
      .then(function (r) { return r.json(); })
      .then(function (j) {
        state.plans = j.plans || [];
        state.paywall = !!j.paywall;
        state.live = !!j.live;
      })
      .catch(function () {})
      .then(done);
    if (signedIn()) {
      fetch(API + '/api/kgh/pay/entitlement', { headers: authHeaders() })
        .then(function (r) { return r.json(); })
        .then(function (j) { state.items = j.items || []; if (j.paywall != null) state.paywall = !!j.paywall; })
        .catch(function () {})
        .then(done);
    }
  }

  /* 這個範圍現在能不能用付費功能。
     ⚠️ 付費牆沒開、或還沒跟後端確認過，一律放行——寧可少收錢，不要擋到沒付費以前就在用的人。 */
  function can(scope) {
    if (!state.loaded || !state.paywall) return true;
    var now = Date.now();
    return state.items.some(function (x) {
      return x.expires_at > now && (x.scope === 'all' || (scope && x.scope === scope));
    });
  }

  /* 擋下來時要顯示什麼：一張說明卡＋去看方案。呼叫端自己決定要不要畫。 */
  function lockCard(title, why) {
    var box = el('div', 'panel pay-lock');
    box.appendChild(el('h3', 'ph', title || T('這是付費功能')));
    box.appendChild(el('p', null, why || T('題目、答案、詳解、刷題、錯題本與弱點統計永遠免費；'
      + '這一項是幫你省時間的加值功能。')));
    var row = el('div', 'btnrow');
    row.appendChild(A.btn(T('看方案'), '', null, '#/plans'));
    box.appendChild(row);
    return box;
  }

  /* 送去綠界：後端回一張表單，這裡塞進頁面自動送出（綠界只收 form post，不收 fetch）。 */
  function checkout(plan, sid, sidName, btn) {
    if (!signedIn()) {
      A.toast(T('請先登入，付款後權益才綁得到你的帳號。'));
      try { window.KHSync && window.KHSync.promptLogin && window.KHSync.promptLogin(); } catch (e) {}
      return;
    }
    if (btn) { btn.disabled = true; btn.textContent = T('前往付款…'); }
    fetch(API + '/api/kgh/pay/checkout', {
      method: 'POST', headers: authHeaders(),
      body: JSON.stringify({ plan: plan, sid: sid || '', sidName: sidName || '' })
    }).then(function (r) {
      if (!r.ok) throw new Error('http-' + r.status);
      return r.json();
    }).then(function (j) {
      var f = document.createElement('form');
      f.method = 'POST';
      f.action = j.action;
      f.style.display = 'none';
      Object.keys(j.fields).forEach(function (k) {
        var i = document.createElement('input');
        i.type = 'hidden'; i.name = k; i.value = j.fields[k];
        f.appendChild(i);
      });
      document.body.appendChild(f);
      f.submit();
    }).catch(function () {
      if (btn) { btn.disabled = false; btn.textContent = T('前往付款'); }
      A.toast(T('無法連到付款伺服器，請稍後再試。'));
    });
  }

  /* ============ 方案頁 ============ */
  function viewPlans(main) {
    main.appendChild(el('h1', 'pg-h', T('付費方案')));
    main.appendChild(el('p', 'lead', T('題目、標準答案、逐題詳解、刷題、錯題本與弱點統計'
      + '永遠免費，不會放進任何方案裡。付費買的是幫你省時間的三件事：'
      + '錯題匯出（PDF／Anki）、每日的間隔重複複習排程、模考後的弱點診斷與補弱題單。')));

    if (!state.paywall) {
      var note = el('div', 'panel'); note.style.padding = '16px';
      note.appendChild(el('h3', 'ph', T('目前全部免費')));
      note.appendChild(el('p', null, T('付費功能還在試營運，現在每個人都能直接用，不必付款。'
        + '下面的方案與價格先公開讓你知道未來會怎麼收費。')));
      main.appendChild(note);
    }
    if (state.live === false && state.paywall) {
      var warn = el('div', 'warnbox', T('⚠ 目前是金流測試環境，請不要在這裡輸入真實信用卡卡號。'));
      main.appendChild(warn);
    }

    var sec = el('section', 'sec'); sec.style.marginTop = '18px';
    sec.appendChild(A.sectionHead(T('方案')));
    var pan = el('div', 'panel');

    // 單科方案要先選科目：預設帶使用者練最多題的那一科
    var pick = el('select', 'mk-sel');
    (A.subjects || []).forEach(function (s) {
      var o = document.createElement('option');
      o.value = s.sid;
      o.textContent = s.name + (s.n ? T('　已練 ') + s.n + T(' 題') : '');
      pick.appendChild(o);
    });

    (state.plans.length ? state.plans : [
      { code: 'subj180', name: '單科 180 天', amount: 990, days: 180, needSubject: true }
    ]).forEach(function (p) {
      var card = el('div', 'pay-plan');
      var head = el('div', 'pay-head');
      head.appendChild(el('b', null, p.name));
      head.appendChild(el('span', 'pay-price', 'NT$ ' + p.amount));
      card.appendChild(head);
      card.appendChild(el('p', 'lead', T('一次買斷 ') + p.days + T(' 天，不自動續約、不綁信用卡。')));
      if (p.needSubject) {
        var row = el('div', 'mk-row');
        row.appendChild(el('span', 'mk-lb', T('選擇科目')));
        row.appendChild(pick);
        card.appendChild(row);
      }
      var b = A.btn(T('前往付款'), '', function () {
        var sid = p.needSubject ? pick.value : '';
        var nm = p.needSubject ? (pick.options[pick.selectedIndex] || {}).text : '';
        checkout(p.code, sid, (nm || '').split('　')[0], b);
      });
      var br = el('div', 'btnrow'); br.appendChild(b);
      card.appendChild(br);
      pan.appendChild(card);
    });
    sec.appendChild(pan);
    main.appendChild(sec);

    var s2 = el('section', 'sec'); s2.style.marginTop = '18px';
    s2.appendChild(A.sectionHead(T('付款與退款')));
    var p2 = el('div', 'panel');
    [[T('付款方式'), T('信用卡一次付清，由綠界科技（ECPay）處理。本站不會經手也不會儲存你的卡號。')],
     [T('開通時間'), T('付款完成後立刻開通，回到站上重新整理就看得到。')],
     [T('不自動續約'), T('買斷制，到期就停止，不會自動扣款，也不需要取消訂閱。')],
     [T('退款'), T('功能與免費試用內容都寫在這一頁；如果開通後發現與說明不符，請從客服中心聯絡我們。')]
    ].forEach(function (r) {
      var d = el('div', 'px-how');
      d.appendChild(el('b', null, r[0]));
      d.appendChild(el('p', null, r[1]));
      p2.appendChild(d);
    });
    s2.appendChild(p2);
    main.appendChild(s2);

    var back = el('div', 'btnrow'); back.style.marginTop = '16px';
    back.appendChild(A.btn(T('我的帳戶'), 'o', null, '#/account'));
    main.appendChild(back);
  }

  /* ============ 我的帳戶 ============ */
  function viewAccount(main) {
    main.appendChild(el('h1', 'pg-h', T('我的帳戶')));
    var q = qs();
    if (q.paid === '1') {
      var okBox = el('div', 'panel pay-ok'); okBox.style.padding = '16px';
      okBox.appendChild(el('h3', 'ph', T('付款完成，已為你開通')));
      okBox.appendChild(el('p', null, T('訂單編號 ') + (q.order || '') + T('。權益已經生效，'
        + '下面會列出到期日。如果沒有馬上出現，稍等幾秒再重新整理。')));
      main.appendChild(okBox);
    } else if (q.paid === '0') {
      var noBox = el('div', 'panel'); noBox.style.padding = '16px';
      noBox.appendChild(el('h3', 'ph', T('這次沒有付款成功')));
      noBox.appendChild(el('p', null, T('沒有扣款。你可以回方案頁再試一次，或換一種付款方式。')));
      main.appendChild(noBox);
    }

    if (!signedIn()) {
      main.appendChild(el('p', 'lead', T('登入後才看得到自己的權益與訂單。')));
      var b = A.btn(T('登入'), '', function () {
        try { window.KHSync && window.KHSync.promptLogin && window.KHSync.promptLogin(); } catch (e) {}
      });
      main.appendChild(b);
      return;
    }

    var sec = el('section', 'sec'); sec.style.marginTop = '12px';
    sec.appendChild(A.sectionHead(T('我的權益')));
    var pan = el('div', 'panel');
    if (!state.items.length) {
      var p0 = el('div'); p0.style.padding = '16px';
      p0.appendChild(el('p', 'lead', state.paywall
        ? T('目前沒有已開通的付費權益。')
        : T('目前全部功能免費開放，不需要購買。')));
      pan.appendChild(p0);
    } else {
      state.items.slice().sort(function (a, b) { return a.expires_at - b.expires_at; })
        .forEach(function (x) {
          var nm = x.scope === 'all' ? T('全部科目') : subjName(x.scope);
          pan.appendChild(A.item('🎫', nm,
            T('到期日 ') + fmtDate(x.expires_at) + T('　剩 ') + daysLeft(x.expires_at) + T(' 天'), null));
        });
    }
    sec.appendChild(pan);
    main.appendChild(sec);

    var s2 = el('section', 'sec'); s2.style.marginTop = '18px';
    s2.appendChild(A.sectionHead(T('訂單紀錄')));
    var pan2 = el('div', 'panel');
    var loading = el('div'); loading.style.padding = '16px';
    loading.appendChild(el('p', 'lead', T('載入中…')));
    pan2.appendChild(loading);
    s2.appendChild(pan2);
    main.appendChild(s2);

    fetch(API + '/api/kgh/pay/orders', { headers: authHeaders() })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        pan2.innerHTML = '';
        var list = j.orders || [];
        if (!list.length) {
          var e0 = el('div'); e0.style.padding = '16px';
          e0.appendChild(el('p', 'lead', T('還沒有訂單。')));
          pan2.appendChild(e0);
          return;
        }
        list.forEach(function (o) {
          var st = o.status === 'paid' ? T('已付款') : o.status === 'failed' ? T('未完成') : T('等待付款');
          pan2.appendChild(A.item('🧾',
            (o.scope === 'all' ? T('全部科目') : subjName(o.scope)) + T('　NT$ ') + o.amount,
            st + T('　') + fmtDate(o.created_at) + T('　訂單 ') + o.id, null));
        });
      })
      .catch(function () {
        pan2.innerHTML = '';
        var e1 = el('div'); e1.style.padding = '16px';
        e1.appendChild(el('p', 'lead', T('訂單載入失敗，請稍後再試。')));
        pan2.appendChild(e1);
      });

    var row = el('div', 'btnrow'); row.style.marginTop = '16px';
    row.appendChild(A.btn(T('看方案'), 'o', null, '#/plans'));
    main.appendChild(row);
  }

  function subjName(sid) {
    var hit = (A.subjects || []).filter(function (s) { return s.sid === sid; })[0];
    return hit ? hit.name : sid;
  }

  /* ============ 進入點 ============ */
  function render(main, page, api) {
    A = api;
    var draw = function () {
      // 非同步載完才畫，避免先畫一次「免費」再跳成「已購買」
      // 載完時使用者可能已經換頁了：不是這一頁就不畫，否則會蓋掉別頁（2026-09-22 smoke 抓到）
      if (((location.hash || '').replace(/^#\/?/, '').split(/[\/?]/)[0]) !== page) return;
      main.innerHTML = '';
      if (page === 'plans') viewPlans(main); else viewAccount(main);
    };
    if (state.loaded) return draw();
    main.appendChild(el('p', 'lead', T('載入中…')));
    load(draw);
  }

  // 付款回來後要重新跟後端拿一次權益（付款當下快取還是舊的）
  function refresh(cb) { state.loaded = false; load(cb); }

  /* 有沒有任何一張還有效的票（跨科目的功能用，例如「今日複習」會混到好幾科的錯題）。 */
  function canAny() {
    if (!state.loaded || !state.paywall) return true;
    var now = Date.now();
    return state.items.some(function (x) { return x.expires_at > now; });
  }

  window.KHPay = {
    render: render, can: can, canAny: canAny, load: load, refresh: refresh, lockCard: lockCard,
    paywall: function () { return state.paywall; },
    items: function () { return state.items.slice(); }
  };

  // 開站就先問一次（成本是一個很小的 GET），三個付費入口才知道要不要擋
  if (API) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { load(); });
    else load();
  }
})();
