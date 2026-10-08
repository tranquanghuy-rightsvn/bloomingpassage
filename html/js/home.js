// Home page: hero slideshow, experience tabs, gallery lightbox.
(function () {
  // Hero slideshow: the first Hoi An photo shows at once; the rest load lazily and cross-fade in turn.
  // Paused off-screen and in background tabs; reduced motion / data saver keep the first photo still.
  var hero = document.querySelector('.hero');
  var slides = hero ? Array.prototype.slice.call(hero.querySelectorAll('.hero__slide')) : [];
  var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    (navigator.connection && navigator.connection.saveData);
  if (slides.length > 1 && !calm) {
    var current = 0;
    var timer = null;
    var waiting = false;
    var load = function (slide) {
      if (slide.dataset.srcset) { slide.srcset = slide.dataset.srcset; slide.removeAttribute('data-srcset'); }
    };
    var next = function () {
      if (waiting) return; // the next photo is still loading
      var from = slides[current];
      var to = slides[(current + 1) % slides.length];
      var go = function () {
        waiting = false;
        from.classList.remove('is-active');
        from.classList.add('is-leaving');
        setTimeout(function () { from.classList.remove('is-leaving'); }, 1900);
        to.classList.add('is-active');
        current = slides.indexOf(to);
        load(slides[(current + 1) % slides.length]); // warm up the one after
      };
      if (to.complete && to.currentSrc) go(); else { waiting = true; load(to); to.addEventListener('load', go, { once: true }); }
    };
    var start = function () { if (!timer) timer = setInterval(next, 6000); };
    var stop = function () { clearInterval(timer); timer = null; };
    load(slides[1]);
    var visible = true;
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible && !document.hidden) start(); else stop();
    }).observe(hero);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else if (visible) start();
    });
  }

  // Scroll reveal: blocks appear once, one after another in reading order (top→bottom, left→right).
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduce) {
    var groups = [
      ['.exp-tab__title', 'up'],
      ['.facet', 'up'],
      ['.tour-card', 'up'],
      ['.care-item', 'up'],
      ['.place:not(.place--reverse) .place__img, .place--reverse .place__body', 'left'],
      ['.place:not(.place--reverse) .place__body, .place--reverse .place__img', 'right'],
      ['.lens__item', 'zoom']
    ];
    var targets = [];
    groups.forEach(function (g) {
      document.querySelectorAll(g[0]).forEach(function (el) { el.dataset.reveal = g[1]; targets.push(el); });
    });
    document.documentElement.classList.add('js-reveal');
    var done = function (el) {
      // Back to the component's own transitions (hover effects) once revealed.
      el.removeAttribute('data-reveal');
      el.style.removeProperty('--reveal-delay');
    };
    var pending = targets.slice();
    var reveal = function (shown) {
      shown = shown.filter(function (el) { return pending.indexOf(el) !== -1; });
      shown.sort(function (a, b) {
        var ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
        return Math.abs(ra.top - rb.top) > 24 ? ra.top - rb.top : ra.left - rb.left;
      });
      shown.forEach(function (el, i) {
        io.unobserve(el);
        pending.splice(pending.indexOf(el), 1);
        el.style.setProperty('--reveal-delay', Math.min(i * 120, 960) + 'ms');
        el.classList.add('is-in');
        el.addEventListener('transitionend', function end(e) {
          if (e.propertyName !== 'transform') return;
          el.removeEventListener('transitionend', end);
          done(el);
        });
      });
    };
    var io = new IntersectionObserver(function (entries) {
      reveal(entries.filter(function (e) { return e.isIntersecting; }).map(function (e) { return e.target; }));
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.15 });
    targets.forEach(function (el) { io.observe(el); });
    // A jump (anchor link, restored scroll position) skips blocks without them ever intersecting:
    // reveal anything that is already above the bottom of the viewport.
    var ticking = false;
    var catchUp = function () {
      ticking = false;
      var passed = pending.filter(function (el) { return el.getBoundingClientRect().top < innerHeight * 0.92; });
      if (passed.length) reveal(passed);
    };
    window.addEventListener('scroll', function () {
      if (!ticking && pending.length) { ticking = true; requestAnimationFrame(catchUp); }
    }, { passive: true });
    window.addEventListener('load', catchUp);
    // Ink-painted photo (About): its layers appear in sequence once the figure is in view (see home.css).
    document.querySelectorAll('.ink-art').forEach(function (art) {
      var show = function () { art.classList.add('is-in'); };
      var artIo = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { show(); artIo.disconnect(); }
      }, { rootMargin: '0px 0px -10% 0px', threshold: 0.3 });
      artIo.observe(art);
      window.addEventListener('scroll', function passed() {
        if (art.getBoundingClientRect().top < innerHeight * 0.5) { show(); artIo.disconnect(); window.removeEventListener('scroll', passed); }
      }, { passive: true });
    });

    // Experience images animate in CSS whenever a tab opens; the first time, wait until the section is seen.
    var exp = document.querySelector('.experience');
    if (exp) {
      var expIo = new IntersectionObserver(function (entries) {
        if (entries.some(function (e) { return e.isIntersecting; })) { exp.classList.add('is-seen'); expIo.disconnect(); }
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.15 });
      exp.querySelectorAll('.exp-panel__gallery').forEach(function (g) { expIo.observe(g); });
      window.addEventListener('scroll', function seen() {
        if (exp.getBoundingClientRect().top < innerHeight * 0.6) { exp.classList.add('is-seen'); window.removeEventListener('scroll', seen); }
      }, { passive: true });
    }
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
