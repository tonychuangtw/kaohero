/* 考英雄 — 站內對話框（2026-09-08 Tony：「這太難看，改成像 poker 那方式的 pop 框」）
 *
 * 瀏覽器原生的 alert／confirm／prompt 會頂著網址列跳出灰白色系統框，跟站的樣式完全脫節，
 * 手機上尤其醜。這支提供同一組介面的站內彈窗，樣式跟著站的主題（深色／護眼米／高對比）走。
 *
 *   KHDialog.info(msg)                → Promise（單鍵「知道了」）
 *   KHDialog.confirm(msg, opts)       → Promise<boolean>
 *   KHDialog.prompt(msg, opts)        → Promise<string|null>
 *   KHDialog.toast(msg)               → 浮出提示，自動消失
 *
 * 並把 window.alert 換成 toast，讓沒改到的舊呼叫也不會再跳系統框。
 * ⚠️ 原生 confirm／prompt 是同步的、覆寫不了，呼叫點必須改寫成 .then()。
 */
(function () {
  'use strict';
  var T = (window.KH && window.KH.T) || function (s) { return s; };

  /* 浮出提示：站上本來就有 .toast 的樣式，沿用同一個節點 */
  var tEl = null, tTimer = null;
  function toast(msg) {
    if (!tEl) {
      tEl = document.createElement('div');
      tEl.className = 'toast';
      tEl.setAttribute('role', 'alert');
      document.body.appendChild(tEl);
    }
    tEl.textContent = String(msg);
    tEl.className = 'toast on';
    clearTimeout(tTimer);
    tTimer = setTimeout(function () { tEl.className = 'toast'; }, 3200);
  }

  function build(msg, opts) {
    opts = opts || {};
    var bk = document.createElement('div');
    bk.className = 'dlg-back';
    var box = document.createElement('div');
    box.className = 'dlg';
    box.setAttribute('role', opts.input ? 'dialog' : 'alertdialog');
    box.setAttribute('aria-modal', 'true');
    if (opts.title) {
      var h = document.createElement('h3');
      h.className = 'dlg-h';
      h.textContent = opts.title;
      box.appendChild(h);
    }
    var body = document.createElement('div');
    body.className = 'dlg-msg';
    body.textContent = String(msg);       // 一律 textContent，不用 innerHTML
    box.appendChild(body);
    var input = null;
    if (opts.input) {
      input = document.createElement('input');
      input.type = 'text';
      input.className = 'dlg-input';
      if (opts.placeholder) input.placeholder = opts.placeholder;
      if (opts.value) input.value = opts.value;
      box.appendChild(input);
    }
    var row = document.createElement('div');
    row.className = 'dlg-btns';
    var btnNo = document.createElement('button');
    btnNo.type = 'button';
    btnNo.className = 'dlg-btn';
    btnNo.textContent = opts.cancelLabel || T('取消');
    var btnOk = document.createElement('button');
    btnOk.type = 'button';
    btnOk.className = 'dlg-btn dlg-ok';
    btnOk.textContent = opts.okLabel || T('確定');
    if (!opts.hideCancel) row.appendChild(btnNo);
    row.appendChild(btnOk);
    box.appendChild(row);
    bk.appendChild(box);
    return { bk: bk, box: box, input: input, ok: btnOk, no: btnNo };
  }

  /* 手機鍵盤會蓋住輸入框（2026-09-11 Tony 回報「按設定我的暱稱會變成這樣子看不到輸入的地方」）：
     .dlg-back 是 position:fixed + inset:0，參照的是「版面視窗」，而 iOS 叫出鍵盤時只縮小
     「可視視窗」（visualViewport），版面視窗高度不變，所以靠底對齊的彈窗整個被鍵盤壓在下面。
     這裡聽 visualViewport 的 resize／scroll，把 bottom 墊高鍵盤的高度，讓彈窗浮在鍵盤上方。
     沒有 visualViewport 的瀏覽器（桌機舊版）維持原樣，不受影響。 */
  function followKeyboard(bk) {
    var vv = window.visualViewport;
    if (!vv) return function () {};
    function apply() {
      var kb = Math.max(0, Math.round(window.innerHeight - vv.height - vv.offsetTop));
      bk.style.bottom = kb ? kb + 'px' : '';
    }
    vv.addEventListener('resize', apply);
    vv.addEventListener('scroll', apply);
    apply();
    return function () {
      vv.removeEventListener('resize', apply);
      vv.removeEventListener('scroll', apply);
    };
  }

  function open(msg, opts, okValue, cancelValue) {
    return new Promise(function (resolve) {
      var d = build(msg, opts);
      var prev = document.activeElement;
      var offKb = function () {};
      function done(val) {
        offKb();
        document.removeEventListener('keydown', onKey, true);
        d.bk.classList.remove('show');
        setTimeout(function () { if (d.bk.parentNode) d.bk.parentNode.removeChild(d.bk); }, 180);
        try { if (prev && prev.focus) prev.focus(); } catch (e) {}
        resolve(val);
      }
      function onKey(e) {
        if (e.key === 'Escape') { e.stopPropagation(); done(cancelValue()); }
        if (e.key === 'Enter' && (!d.input || document.activeElement === d.input)) {
          e.stopPropagation(); done(okValue(d));
        }
      }
      d.ok.onclick = function () { done(okValue(d)); };
      d.no.onclick = function () { done(cancelValue()); };
      d.bk.onclick = function (e) { if (e.target === d.bk) done(cancelValue()); };
      document.addEventListener('keydown', onKey, true);
      document.body.appendChild(d.bk);
      offKb = followKeyboard(d.bk);
      requestAnimationFrame(function () { d.bk.classList.add('show'); });
      (d.input || d.ok).focus();
    });
  }

  function confirmDlg(msg, opts) {
    return open(msg, opts, function () { return true; }, function () { return false; });
  }
  function promptDlg(msg, opts) {
    opts = opts || {};
    opts.input = true;
    return open(msg, opts, function (d) { return d.input.value; }, function () { return null; });
  }
  function infoDlg(msg, opts) {
    opts = opts || {};
    opts.hideCancel = true;
    opts.okLabel = opts.okLabel || T('知道了');
    return open(msg, opts, function () { return true; }, function () { return true; });
  }

  window.KHDialog = { toast: toast, confirm: confirmDlg, prompt: promptDlg, info: infoDlg };
  // 沒改到的舊 alert 也不再跳系統框
  window.alert = function (msg) { toast(msg); };
})();
