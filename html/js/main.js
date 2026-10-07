// Shared behaviour: mobile menu, header height, site search, back-to-top, mobile bottom bar.
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

  // --header-h: inner pages keep their content offset independent of the header height,
  // the home hero fits the viewport below it (see main.css / home.css).
  var header = document.querySelector('.site-header');
  if (header && window.ResizeObserver) {
    new ResizeObserver(function () {
      document.documentElement.style.setProperty('--header-h', header.getBoundingClientRect().height + 'px');
    }).observe(header);
  }

  // Site search: a small client-side index of the pages (static site, no server search).
  var PAGES = [
    ['Home', '/', 'Intentional travel and proactive longevity for women in Central Vietnam.', 'blooming passage time to bloom culture wellness beauty connection'],
    ['About Us', '/about-us/', 'A passage through Vietnam, a return to yourself: small groups, care and discovery.', 'story approach intention longevity discovery connection small group women wellbeing'],
    ['Journeys', '/tours/', 'Three journeys, your own pace: 7, 10 or 14 days in Central Vietnam.', 'tours journeys trips packages itinerary price'],
    ['7-Day Curated Essence', '/tours/7-day-curated-essence/', 'A beautiful introduction to Central Vietnam. 7 days · 6 nights.', '7 days seven week hoi an hue da nang cooking tea tailoring massage facial beach'],
    ['10-Day Balanced Journey', '/tours/10-day-balanced-journey/', 'More time to explore and restore. 10 days · 9 nights.', '10 days ten vespa food orchard fruit farm spa beauty tailoring hoi an hue da nang'],
    ['14-Day Deep Pause', '/tours/14-day-deep-pause/', 'The full Blooming Passage experience. 14 days · 13 nights.', '14 days fourteen two weeks wellness medical dental health check longevity spa relaxation'],
    ['Contact', '/contact-us/', 'A small step, a beautiful beginning. Tell us about your passage.', 'contact enquiry inquiry email phone plan book question'],
    ['FAQs', '/faqs/', 'A few answers to help you feel at home with Blooming Passage.', 'faq questions group size travel alone included optional wellness departure booking'],
    ['Blog – The Passage Journal', '/blog/', 'Stories, travel inspiration and little moments worth keeping.', 'blog journal stories articles hoi an hue da nang'],
    ['Hoi An: Lanterns, Craft and a Little Wonder', '/hoi-an-lanterns-craft-and-a-little-wonder/', 'Lantern-lit streets, local flavours, countryside gardens and makers.', 'hoi an lanterns craft food cao lau tra que cam thanh an bang beach evening blog']
  ];
  var fold = function (t) { return t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); };
  var panel, input, results, label, lastFocus;
  function render(q) {
    var words = fold(q).split(/\s+/).filter(Boolean);
    // every word must match somewhere; rank title matches above keywords above description
    var hits = PAGES.map(function (p, i) {
      var t = fold(p[0]), k = fold(p[3]), d = fold(p[2]), score = 0;
      var ok = words.every(function (w) {
        var s = (t.indexOf(w) !== -1 ? 3 : 0) + (k.indexOf(w) !== -1 ? 2 : 0) + (d.indexOf(w) !== -1 ? 1 : 0);
        score += s;
        return s > 0;
      });
      return ok && { p: p, score: score, i: i };
    }).filter(Boolean).sort(function (a, b) { return b.score - a.score || a.i - b.i; }).map(function (h) { return h.p; });
    if (!words.length) hits = PAGES.slice(2, 6);
    label.textContent = words.length ? (hits.length ? 'Results' : '') : 'Popular';
    results.innerHTML = '';
    hits.slice(0, 8).forEach(function (p) {
      var li = document.createElement('li'), a = document.createElement('a'), t = document.createElement('strong'), d = document.createElement('span');
      a.href = p[1]; t.textContent = p[0]; d.textContent = p[2];
      a.appendChild(t); a.appendChild(d); li.appendChild(a); results.appendChild(li);
    });
    panel.querySelector('.search-panel__empty').hidden = !(words.length && !hits.length);
  }
  function buildPanel() {
    panel = document.createElement('div');
    panel.className = 'search-panel';
    panel.hidden = true;
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-label', 'Search the site');
    panel.innerHTML =
      '<div class="search-panel__backdrop"></div>' +
      '<div class="search-panel__box"><div class="search-panel__inner">' +
      '<form class="search-panel__form" role="search">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="10.875" cy="10.875" r="7.125"/><path d="M15.95 15.95 20.5 20.5"/></svg>' +
      '<input class="search-panel__input" type="search" placeholder="Search journeys, places, experiences…" aria-label="Search" autocomplete="off">' +
      '<button class="search-panel__close" type="button" aria-label="Close search">×</button>' +
      '</form>' +
      '<p class="search-panel__label"></p><ul class="search-panel__results"></ul>' +
      '<p class="search-panel__empty" hidden>Nothing found. Try “Hue”, “massage”, “14 days” or “contact”.</p>' +
      '</div></div>';
    body.appendChild(panel);
    input = panel.querySelector('.search-panel__input');
    results = panel.querySelector('.search-panel__results');
    label = panel.querySelector('.search-panel__label');
    input.addEventListener('input', function () { render(input.value); });
    panel.querySelector('form').addEventListener('submit', function (e) {
      e.preventDefault();
      var first = results.querySelector('a');
      if (first) location.href = first.href;
    });
    panel.querySelector('.search-panel__close').addEventListener('click', closeSearch);
    panel.querySelector('.search-panel__backdrop').addEventListener('click', closeSearch);
  }
  function openSearch(e) {
    if (e) e.preventDefault();
    if (!panel) buildPanel();
    setMenu(false);
    lastFocus = document.activeElement;
    panel.hidden = false;
    body.classList.add('is-search-open');
    input.value = '';
    render('');
    input.focus();
  }
  function closeSearch() {
    if (!panel || panel.hidden) return;
    panel.hidden = true;
    body.classList.remove('is-search-open');
    if (lastFocus) lastFocus.focus();
  }
  document.querySelectorAll('[data-search-open]').forEach(function (el) { el.addEventListener('click', openSearch); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeSearch(); });

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
