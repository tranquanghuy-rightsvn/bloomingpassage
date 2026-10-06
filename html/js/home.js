// Home page: hero slideshow, experience tabs, gallery lightbox.
(function () {
  // Hero background slideshow (fade + Ken Burns via CSS)
  var hero = document.querySelector('.hero');
  if (hero) {
    var slides = hero.querySelectorAll('.hero__slide');
    var current = 0;
    window.addEventListener('load', function () {
      hero.classList.add('is-ready');
      setInterval(function () {
        slides[current].classList.remove('is-active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('is-active');
      }, 5000);
    });
  }

  // Experience tabs: <details name> already makes them exclusive;
  // on desktop keep one tab open at all times (tab behaviour).
  var tabQuery = window.matchMedia('(min-width: 768px)');
  document.querySelectorAll('.exp-tab__title').forEach(function (summary) {
    summary.addEventListener('click', function (e) {
      var tab = summary.parentElement;
      if (tabQuery.matches && tab.open) { e.preventDefault(); return; }
      if (!('name' in HTMLDetailsElement.prototype)) {
        document.querySelectorAll('.exp-tab[open]').forEach(function (other) {
          if (other !== tab) other.open = false;
        });
      }
    });
  });

  // Lightbox for gallery links
  var box = document.querySelector('.lightbox');
  if (!box) return;
  var img = box.querySelector('.lightbox__img');
  var items = [];
  var index = 0;
  function show(i) {
    index = (i + items.length) % items.length;
    img.src = items[index].getAttribute('href');
  }
  function close() { box.hidden = true; img.src = ''; }
  document.querySelectorAll('[data-lightbox]').forEach(function (group) {
    var links = Array.prototype.slice.call(group.querySelectorAll('a'));
    links.forEach(function (link, i) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        items = links;
        show(i);
        box.hidden = false;
      });
    });
  });
  box.querySelector('.lightbox__close').addEventListener('click', close);
  box.querySelector('.lightbox__nav--prev').addEventListener('click', function () { show(index - 1); });
  box.querySelector('.lightbox__nav--next').addEventListener('click', function () { show(index + 1); });
  box.addEventListener('click', function (e) { if (e.target === box) close(); });
  document.addEventListener('keydown', function (e) {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });
})();
