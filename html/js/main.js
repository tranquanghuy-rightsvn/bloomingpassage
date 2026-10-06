// Shared behaviour: mobile menu, back-to-top, mobile bottom bar.
(function () {
  var body = document.body;
  var toggle = document.querySelector('.menu-toggle');
  function setMenu(open) {
    body.classList.toggle('is-menu-open', open);
    if (toggle) toggle.setAttribute('aria-expanded', String(open));
  }
  if (toggle) toggle.addEventListener('click', function () { setMenu(true); });
  document.querySelectorAll('.menu-close, .menu-overlay').forEach(function (el) {
    el.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  // Inner pages keep their content offset independent of the header height (see main.css).
  var header = document.querySelector('.site-header');
  if (header && body.classList.contains('is-inner') && window.ResizeObserver) {
    new ResizeObserver(function () {
      document.documentElement.style.setProperty('--header-h', header.getBoundingClientRect().height + 'px');
    }).observe(header);
  }

  var backTop = document.querySelector('.back-top');
  var bar = document.querySelector('.mobile-bar');
  var lastY = window.scrollY;
  var ticking = false;
  function onScroll() {
    var y = window.scrollY;
    if (backTop) backTop.classList.toggle('is-visible', y > 600);
    if (bar) bar.classList.toggle('is-hidden', y > lastY && y > 200);
    lastY = y;
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  if (backTop) backTop.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
