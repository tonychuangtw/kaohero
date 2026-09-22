/* motion.js — 共用動效包（配 motion.css，2026-09-22 brain）
 * 載入方式：<script src="motion.js" defer></script>
 * 做的事：加 html.m-js → .m-reveal 進視窗才顯示 → .m-count 數字跑動 → .m-bar 進度條。
 * 對外 API（給 SPA 換內容後重新掃描、給作答回饋用）：
 *   Motion.scan(root)            新插入的 DOM 再掃一次（reveal + count）
 *   Motion.feedback(el, ok)      答對／答錯：加 .m-ok 或 .m-no，動完自動移除
 *   Motion.count(el, to, ms)     手動跑一個數字（例：EV 計算結果）
 */
(function () {
  'use strict';
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('m-on'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px' }) : null;

  function fmt(n, el) {
    var d = el.getAttribute('data-decimals');
    return d ? n.toFixed(+d) : Math.round(n).toLocaleString();
  }

  function count(el, to, ms) {
    to = (to != null) ? +to : +(el.getAttribute('data-count') || 0);
    ms = ms || +(el.getAttribute('data-ms') || 1400);
    if (reduce || !isFinite(to)) { el.textContent = fmt(to, el); return; }
    var from = +(el.getAttribute('data-from') || 0), t0 = null;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min(1, (t - t0) / ms); p = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(from + (to - from) * p, el);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function scan(scope) {
    scope = scope || document;
    scope.querySelectorAll('.m-reveal:not(.m-on)').forEach(function (el) {
      var r = el.getBoundingClientRect();
      // 載入時已在視窗內的直接顯示（m-now 不跑淡入）：不留空白給第一眼，也不拖慢 LCP
      if (!io || r.top < window.innerHeight) el.classList.add('m-on', 'm-now'); else io.observe(el);
    });
    scope.querySelectorAll('.m-count[data-count]:not([data-m-done])').forEach(function (el) {
      el.setAttribute('data-m-done', '1');
      if (io && !reduce) {
        var o = new IntersectionObserver(function (es) {
          if (es[0].isIntersecting) { o.disconnect(); count(el); }
        });
        o.observe(el);
      } else count(el);
    });
  }

  function feedback(el, ok) {
    var c = ok ? 'm-ok' : 'm-no';
    el.classList.remove('m-ok', 'm-no');
    void el.offsetWidth; // 重新觸發 animation
    el.classList.add(c);
    el.addEventListener('animationend', function h() { el.classList.remove(c); el.removeEventListener('animationend', h); });
  }

  function bar() {
    var b = document.querySelector('.m-bar'); if (!b) return;
    var h = root;
    function prog() { var max = h.scrollHeight - h.clientHeight; b.style.width = (max > 0 ? (h.scrollTop / max * 100) : 0) + '%'; }
    window.addEventListener('scroll', prog, { passive: true }); prog();
  }

  root.classList.add('m-js');
  scan(); bar();
  window.Motion = { scan: scan, count: count, feedback: feedback };
})();
