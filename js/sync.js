/* 考古英雄 — 登入與跨裝置同步
 *
 * 用 Google Identity Services 登入，把本機 localStorage 的練習紀錄（kaohero.* 這些 key）
 * 同步到 LanExamMock backend 的 /api/progress（app=kaohero）。
 * 這套流程與 chinese／poker／mathwu 各站同源，已在那些站上跑過一年，坑都踩過了。
 *
 * ⚠️ 所有對外位址都來自 js/config.js，換網域只改那個檔（Tony 2026-09-08）。
 * ⚠️ 換網域時 localStorage 會整包歸零（origin 變了），所以登入同步一定要「先做」，
 *    使用者的錯題本才不會在搬家那天憑空消失。
 */
(function () {
  var CFG = window.KH_CONFIG || {};
  var API_BASE = CFG.API_BASE, APP = CFG.APP || 'kaohero';
  var LEVEL = CFG.LEVEL || 'main', CLIENT_ID = CFG.CLIENT_ID;
  if (!API_BASE || !CLIENT_ID || typeof window === 'undefined') return;

  var QS = '?level=' + encodeURIComponent(LEVEL) + '&app=' + encodeURIComponent(APP);

  /* App 內建瀏覽器（LINE／FB／Telegram webview）：Google 封鎖 webview 內的 OAuth，
     硬點只會開出一片空白，所以這類環境改給「用外部瀏覽器開」的指引。
     ⚠️ 不可拿 window.webkit.messageHandlers 判斷 —— iOS 的 Chrome／Edge／Firefox 全是
     WKWebView 殼，會被誤判成 App 內建瀏覽器而整站登入不了。 */
  var IN_WEBVIEW = (function () {
    var ua = navigator.userAgent || '';
    return /\bwv\b/.test(ua) ||
      (/iPhone|iPad|iPod/.test(ua) && !/Safari\//.test(ua)) ||
      /Line\/|FBAN|FBAV|Instagram|MicroMessenger|Telegram|LIFF/i.test(ua) ||
      !!window.TelegramWebviewProxy;
  })();
  // LINE 有官方逃生參數：網址帶 openExternalBrowser=1 會自動改用外部瀏覽器開
  if (/Line\//i.test(navigator.userAgent || '') && !/[?&]openExternalBrowser=/.test(location.search)) {
    var q0 = location.search ? location.search + '&openExternalBrowser=1' : '?openExternalBrowser=1';
    location.replace(location.origin + location.pathname + q0 + location.hash);
  }
  var WEBVIEW_MSG = 'Google 不允許在 App 內建瀏覽器（LINE／Telegram 等）裡登入，硬走只會看到空白頁。\n' +
    '請點畫面角落的選單（⋯ 或分享鈕），選「用 Safari／Chrome 開啟」，再登入即可同步紀錄。';
  var GIS_RETRY_MSG = '連不上 Google 登入元件（accounts.google.com 沒有回應），' +
    '可能是網路不穩或擋廣告套件在擋。要再試一次嗎？';

  /* ⚠️ 這幾個 key 一律不可用 PREFIX 開頭：gatherKeys() 會把 PREFIX 開頭的東西整包推上雲端，
     token 跟著上去就等於把帳號送到別人的瀏覽器。 */
  var PREFIX = 'kaohero.';        // 要同步的本機資料（kaohero.v1 進度、kaohero.prefs 偏好）
  var TOKEN_KEY = 'khsync.token';   // 剛登入時的 Google ID token（sessionStorage，1 小時）
  var SESS_KEY = 'khsync.sess';     // 後端簽的 30 天長效 token（localStorage）
  var PROFILE_KEY = 'khsync.profile';
  var OWNER_KEY = 'khsync.owner';   // 這台裝置上的本機紀錄是「誰的」，換帳號防護用
  var TS_KEY = 'khsync.ts';         // 本機看過的雲端版本時間戳
  var PUSH_INTERVAL_MS = 60000;
  var lastPushedHash = null;

  /* 站內彈窗；KHDialog 若因混版快取沒載到，退回原生框保底 */
  function dlgToast(m) { if (window.KHDialog) KHDialog.toast(m); else alert(m); }
  function dlgInfo(m) { if (window.KHDialog) KHDialog.info(m); else alert(m); }
  function dlgConfirm(m, ok) {
    if (window.KHDialog) KHDialog.confirm(m).then(function (y) { if (y) ok(); });
    else if (confirm(m)) ok();
  }

  function ls(k) { try { return localStorage.getItem(k) || ''; } catch (e) { return ''; } }
  function ss(k) { try { return sessionStorage.getItem(k) || ''; } catch (e) { return ''; } }
  function token() { return ls(SESS_KEY) || ss(TOKEN_KEY); }
  function setToken(t) { try { sessionStorage.setItem(TOKEN_KEY, t); } catch (e) {} }
  function setSess(t) {
    try { localStorage.setItem(SESS_KEY, t); sessionStorage.removeItem(TOKEN_KEY); } catch (e) {}
  }
  function clearToken() {
    try { sessionStorage.removeItem(TOKEN_KEY); } catch (e) {}
    try { localStorage.removeItem(SESS_KEY); localStorage.removeItem(PROFILE_KEY); } catch (e) {}
  }

  function b64Payload(seg) {
    try { return JSON.parse(atob(String(seg).replace(/-/g, '+').replace(/_/g, '/'))); }
    catch (e) { return null; }
  }
  function jwtPayload(t) { return t ? b64Payload(String(t).split('.')[1] || '') : null; }
  function profile() { try { return JSON.parse(ls(PROFILE_KEY) || 'null'); } catch (e) { return null; } }
  // 兩種 token 格式都吃：sess.<payload>.<sig>（後端 HMAC）與 Google ID token（JWT）
  function signedIn() {
    var t = token();
    if (!t) return null;
    if (t.indexOf('sess.') === 0) {
      var s = b64Payload(t.split('.')[1] || '');
      if (!s || !s.e || !(s.x > Date.now())) return null;
      var pr = profile() || {};
      return { email: s.e, sub: s.s, name: pr.name, given_name: pr.given_name };
    }
    var p = jwtPayload(t);
    return p && p.exp * 1000 > Date.now() ? p : null;
  }

  function gatherKeys() {
    var out = {};
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && k.indexOf(PREFIX) === 0) out[k] = localStorage.getItem(k);
      }
    } catch (e) {}
    return out;
  }
  function blobHash(obj) {
    var s = JSON.stringify(obj), h = 0;
    for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
    return h + ':' + s.length;
  }
  /* 主紀錄（kaohero.v1）不要整包覆蓋（2026-09-11）。
     舊作法是雲端版本一律蓋掉本機，兩台裝置同時練習時，後同步的一方會把另一台
     剛做的東西整個洗掉（手機做 12 題、電腦做 20 題，可能只剩 12 題）。
     改成逐欄合併：統計取作答數較多者、錯題取聯集、未完成的卷同卷比已作答題數，
     平手才比時間。其餘 key 仍照舊整包覆蓋。 */
  function answered(d) {
    var n = 0, a = (d && d.ans) || [];
    for (var i = 0; i < a.length; i++) if (a[i] != null) n++;
    return n;
  }
  function mergeMain(localStr, remoteStr) {
    var L, R, k;
    try { R = JSON.parse(remoteStr || '{}'); } catch (e) { return localStr; }
    try { L = JSON.parse(localStr || '{}'); } catch (e) { return remoteStr; }
    var out = { stats: {}, wrong: [], last: L.last || R.last || null, drafts: {} };
    var ls = L.stats || {}, rs = R.stats || {};
    for (k in ls) if (Object.prototype.hasOwnProperty.call(ls, k)) out.stats[k] = ls[k];
    for (k in rs) if (Object.prototype.hasOwnProperty.call(rs, k)) {
      var a = out.stats[k], b = rs[k];
      out.stats[k] = (!a || (b.n || 0) > (a.n || 0)) ? b : a;
    }
    var seen = {};
    (L.wrong || []).concat(R.wrong || []).forEach(function (w) {
      if (!w || !w.pid) return;
      var id = w.pid + '#' + w.n;
      if (seen[id]) return;
      seen[id] = 1; out.wrong.push(w);
    });
    var ld = L.drafts || {}, rd = R.drafts || {};
    for (k in ld) if (Object.prototype.hasOwnProperty.call(ld, k)) out.drafts[k] = ld[k];
    for (k in rd) if (Object.prototype.hasOwnProperty.call(rd, k)) {
      var x = out.drafts[k], y = rd[k];
      if (!x) { out.drafts[k] = y; continue; }
      var nx = answered(x), ny = answered(y);
      out.drafts[k] = (ny > nx || (ny === nx && (y.updatedAt || 0) > (x.updatedAt || 0))) ? y : x;
    }
    return JSON.stringify(out);
  }
  var MAIN_KEY = PREFIX + 'v1';
  function applyBlob(blob) {
    try {
      Object.keys(blob || {}).forEach(function (k) {
        if (k.indexOf(PREFIX) !== 0) return;
        if (k === MAIN_KEY) localStorage.setItem(k, mergeMain(localStorage.getItem(k), blob[k]));
        else localStorage.setItem(k, blob[k]);
      });
    } catch (e) {}
  }
  // 雲端與本機內容其實一樣時不要重載（重載會把做到一半的測驗打斷）
  function sameAsLocal(blob) {
    if (!blob) return false;
    var local = gatherKeys(), k;
    for (k in blob) {
      if (!Object.prototype.hasOwnProperty.call(blob, k)) continue;
      if (k.indexOf(PREFIX) !== 0) continue;
      if (local[k] !== blob[k]) return false;
    }
    for (k in local) {
      if (!Object.prototype.hasOwnProperty.call(local, k)) continue;
      if (local[k] !== blob[k]) return false;
    }
    return true;
  }
  /* 作答中不重載：quiz 狀態只存在記憶體，reload 會直接跳回首頁，看起來就像閃退。
     等使用者離開作答畫面再套用雲端資料。 */
  function busyNow() { return /^#\/(quiz|paper)(\/|$)/.test(location.hash || ''); }
  var reloadTimer = null;
  function safeReload() {
    if (!busyNow()) { location.reload(); return; }
    if (reloadTimer) return;
    setStatus('雲端有新紀錄，離開這頁後更新');
    reloadTimer = setInterval(function () {
      if (busyNow()) return;
      clearInterval(reloadTimer); reloadTimer = null;
      location.reload();
    }, 3000);
  }

  function req(method, path, body, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, API_BASE + path);
    xhr.setRequestHeader('Authorization', 'Bearer ' + token());
    if (body) xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
      if (xhr.status === 401) { clearToken(); renderUi(); cb('auth'); return; }
      if (xhr.status === 409) {
        var conflict = null;
        try { conflict = JSON.parse(xhr.responseText); } catch (e) {}
        cb('conflict', conflict); return;
      }
      if (xhr.status < 200 || xhr.status >= 300) { cb('http ' + xhr.status); return; }
      var data = null;
      try { data = JSON.parse(xhr.responseText); } catch (e) {}
      cb(null, data);
    };
    xhr.onerror = function () { cb('network'); };
    xhr.send(body ? JSON.stringify(body) : null);
  }
  function api(method, body, cb) { req(method, '/api/progress' + QS, body, cb); }
  // 條件更新：帶上「我看到的雲端版本」，不符時後端回 409 並附上雲端現值，避免兩台互蓋
  function putProgress(body, cb) {
    req('PUT', '/api/progress' + QS + '&baseUpdatedAt=' + encodeURIComponent(String(syncTs())), body, cb);
  }
  // 拿現有 token 換一顆 30 天的長效 token；每次開頁換一次＝只要 30 天內用過就不必重登
  function refreshSession(done) {
    if (!token()) { if (done) done('no token'); return; }
    req('POST', '/api/session', {}, function (err, res) {
      if (!err && res && res.token) { setSess(res.token); renderUi(); }
      if (done) done(err || null);
    });
  }

  function syncTs() { try { return parseInt(ls(TS_KEY) || '0', 10) || 0; } catch (e) { return 0; } }
  function setSyncTs(ts) { try { localStorage.setItem(TS_KEY, String(ts)); } catch (e) {} }
  function dataOwner() { return ls(OWNER_KEY); }
  function setDataOwner(email) { try { localStorage.setItem(OWNER_KEY, String(email || '')); } catch (e) {} }
  function wipeLocalProgress() {
    try {
      var kill = [];
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && k.indexOf(PREFIX) === 0) kill.push(k);
      }
      kill.forEach(function (k) { localStorage.removeItem(k); });
    } catch (e) {}
    try { localStorage.removeItem(TS_KEY); } catch (e) {}
    lastPushedHash = null;
  }

  function pull(done) {
    api('GET', null, function (err, res) {
      if (err || !res || !res.blob) { if (done) done(err); return; }
      var serverTs = res.updatedAt || 0;
      if (serverTs > syncTs()) {
        if (sameAsLocal(res.blob)) { setSyncTs(serverTs); if (done) done(null, false); return; }
        applyBlob(res.blob);
        setSyncTs(serverTs);
        if (done) done(null, true);
        return;
      }
      if (done) done(null, false);
    });
  }

  function push(done) {
    var data = gatherKeys();
    var h = blobHash(data);
    if (h === lastPushedHash) { if (done) done(null, false); return; }
    // 推送前先看雲端時間戳：比本機新代表別台寫過，改成套用雲端而不是盲蓋
    api('GET', null, function (gerr, gres) {
      if (gerr) { if (done) done(gerr); return; }   // 雲端狀態未知時寧可不推
      if (gres && (gres.updatedAt || 0) > syncTs() && sameAsLocal(gres.blob)) {
        setSyncTs(gres.updatedAt);
      } else if (gres && (gres.updatedAt || 0) > syncTs() && gres.blob) {
        applyBlob(gres.blob); setSyncTs(gres.updatedAt); safeReload(); return;
      }
      putProgress(data, function (err, res) {
        if (err === 'conflict') {
          if (res && res.blob) {
            applyBlob(res.blob); setSyncTs(res.updatedAt || 0);
            if (sameAsLocal(res.blob)) { if (done) done(null, false); return; }
            safeReload(); return;
          }
          if (done) done('conflict'); return;
        }
        if (err) { if (done) done(err); return; }
        lastPushedHash = h;
        if (res && res.updatedAt) setSyncTs(res.updatedAt);
        setStatus('✓ 已同步');
        if (done) done(null, true);
      });
    });
  }

  /* ---------------- 匯出（Tony 2026-09-08：允許匯出，不靠扣住資料留人） ---------------- */
  function exportData() {
    var blob = new Blob([JSON.stringify({
      app: APP, exportedAt: new Date().toISOString(), data: gatherKeys()
    }, null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'kaohero-' + new Date().toISOString().slice(0, 10) + '.json';
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }

  /* 登入狀態改變時通知全站（2026-09-08 Tony 回報「登入了還是進不去後台」）：
     後台頁是在路由當下畫一次的，登入發生在那之後，畫面不會自己更新。
     派一個事件出去，讓後台頁與頁尾入口重畫，免得使用者以為沒權限。 */
  function announce() {
    try { window.dispatchEvent(new CustomEvent('kh-auth', { detail: signedIn() })); } catch (e) {}
  }

  /* ---------------- UI ---------------- */
  var ui = null, statusEl = null, statusTimer = null;
  function setStatus(msg) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    clearTimeout(statusTimer);
    statusTimer = setTimeout(function () { statusEl.textContent = ''; }, 3000);
  }

  function renderUi() {
    announce();
    if (!ui) return;
    ui.innerHTML = '';
    var p = signedIn();
    if (p) {
      statusEl = document.createElement('span');
      statusEl.className = 'sync-status';
      var chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'sync-chip';
      chip.title = (p.email || '') + ' — 點擊登出';
      chip.setAttribute('aria-label', '已登入 ' + (p.email || '') + '，點擊登出');
      chip.textContent = (p.given_name || p.name || p.email || '?').charAt(0).toUpperCase();
      chip.onclick = function () {
        dlgConfirm('登出雲端同步？\n（本機紀錄會保留在這台裝置）', function () {
          clearToken(); lastPushedHash = null; renderUi();
        });
      };
      ui.appendChild(statusEl);
      ui.appendChild(chip);
    } else {
      statusEl = null;
      var wrap = document.createElement('div');
      wrap.className = 'sync-login-wrap';
      var pill = document.createElement('button');
      pill.type = 'button';
      pill.className = 'sync-login';
      pill.textContent = '登入';
      pill.title = 'Google 登入，換手機也看得到自己的錯題本';
      pill.onclick = function () {
        if (!IN_WEBVIEW && window.google && google.accounts && google.accounts.id) {
          google.accounts.id.prompt();
        } else if (IN_WEBVIEW) { dlgInfo(WEBVIEW_MSG); }
        else if (gisFailed) {
          dlgConfirm(GIS_RETRY_MSG, function () { gisFailed = false; gisAttempts = 0; loadGis(); });
        } else { dlgToast('Google 登入元件還在載入，請稍候幾秒再點一次。'); }
      };
      var slot = document.createElement('div');
      slot.className = 'gsi-slot';
      // 空 slot 會蓋在 pill 上把點擊整個吃掉（webview 裡 GSI 不載入時登入鈕就按不動），
      // 所以預設關掉 pointer-events，等官方按鈕真的掛上去才打開
      slot.style.pointerEvents = 'none';
      wrap.appendChild(pill);
      if (!IN_WEBVIEW) wrap.appendChild(slot);
      ui.appendChild(wrap);
      if (!IN_WEBVIEW && window.google && google.accounts && google.accounts.id) {
        slot.style.pointerEvents = '';
        google.accounts.id.renderButton(slot, { type: 'icon', shape: 'circle', size: 'medium' });
      }
    }
  }

  function onCredential(resp) {
    if (!resp || !resp.credential) return;
    var p = jwtPayload(resp.credential) || {};
    var email = String(p.email || '').toLowerCase();
    var owner = String(dataOwner() || '').toLowerCase();
    // 換帳號防護：共用裝置上 A 登出、B 登入時，本機還留著 A 的紀錄。
    // 直接推上去會蓋掉 B 的資料，也把 A 的作答紀錄洩漏給 B。
    if (owner && email && owner !== email) {
      dlgConfirm('這台裝置上存的是 ' + owner + ' 的練習紀錄。\n' +
        '要改用 ' + email + ' 登入嗎？這台的資料會換成 ' + email + ' 的雲端紀錄\n' +
        '（' + owner + ' 的紀錄仍在他自己的帳號裡，重新登入就看得到）。',
        function () { wipeLocalProgress(); setDataOwner(email); finishSignIn(resp.credential, p); });
      return;
    }
    if (email) setDataOwner(email);
    finishSignIn(resp.credential, p);
  }

  function finishSignIn(credential, p) {
    setToken(credential);
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify({
        email: p.email || '', name: p.name || '', given_name: p.given_name || ''
      }));
    } catch (e) {}
    renderUi();
    setStatus('同步中…');
    refreshSession(function () {
      pull(function (err, applied) {
        if (applied) { safeReload(); return; }
        push();
      });
    });
  }

  /* gsi/client 偶發載不進來時自動重試，最多 3 次、每次 8 秒 */
  var gisAttempts = 0, gisFailed = false;
  function loadGis() {
    gisAttempts++;
    var settled = false;
    var s = document.createElement('script');
    s.src = 'https://accounts.google.com/gsi/client';
    s.async = true;
    s.onload = function () {
      settled = true; gisFailed = false;
      google.accounts.id.initialize({ client_id: CLIENT_ID, callback: onCredential, auto_select: true });
      renderUi();
    };
    s.onerror = function () { if (!settled) { settled = true; retryOrFail(); } };
    setTimeout(function () {
      if (settled || (window.google && google.accounts && google.accounts.id)) return;
      settled = true; retryOrFail();
    }, 8000);
    document.head.appendChild(s);
  }
  function retryOrFail() { if (gisAttempts < 3) loadGis(); else gisFailed = true; }

  function boot() {
    var hd = document.querySelector('.hd-in');
    if (!hd) return;
    ui = document.createElement('div');
    ui.className = 'sync-ui';
    var gear = document.getElementById('gear');
    if (gear) hd.insertBefore(ui, gear); else hd.appendChild(ui);
    renderUi();   // 先畫出登入鈕：GSI 被擋時入口也不能消失

    if (!IN_WEBVIEW) loadGis();

    /* ⚠️ 每一輪都要先 pull 再 push。push() 開頭有「本機沒變動就直接 return」的短路，
       只呼叫 push() 會讓「開著沒動的分頁永遠拉不到別台的新紀錄」。 */
    setInterval(function () {
      if (!signedIn()) return;
      if (document.visibilityState === 'hidden') return;
      pull(function (err, applied) { if (applied) safeReload(); else push(); });
    }, PUSH_INTERVAL_MS);
    document.addEventListener('visibilitychange', function () {
      if (!signedIn()) return;
      if (document.visibilityState === 'hidden') push();
      else pull(function (err, applied) { if (applied) safeReload(); });
    });
    // 桌機／平板常常是「分頁一直可見、只是切走視窗」，那不會觸發 visibilitychange
    window.addEventListener('focus', function () {
      if (signedIn()) pull(function (err, applied) { if (applied) safeReload(); });
    });
    window.addEventListener('pageshow', function (e) {
      if (e.persisted && signedIn()) pull(function (err, applied) { if (applied) safeReload(); });
    });
    if (signedIn()) {
      var me = (profile() || {}).email || '';
      if (me && !dataOwner()) setDataOwner(String(me).toLowerCase());
      refreshSession();
      pull(function (err, applied) { if (applied) safeReload(); });
    }
  }

  window.KHSync = {
    signedIn: signedIn, token: token, apiBase: API_BASE,
    pull: pull, push: push, exportData: exportData,
    promptLogin: function () {
      try { if (window.google && google.accounts && google.accounts.id) google.accounts.id.prompt(); } catch (e) {}
    }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
