// Tour detail: image gallery + thumbnails, booking tabs and price total, review dialog, sort menu.
(function () {
  // Gallery: main slide follows the active thumbnail; thumbnail strip pages with its arrows.
  var gallery = document.querySelector('[data-gallery]');
  if (gallery) {
    var track = gallery.querySelector('.tgal__track');
    var slides = track.children.length;
    var thumbs = gallery.querySelectorAll('.tgal__strip button');
    var strip = gallery.querySelector('.tgal__strip');
    var navPrev = gallery.querySelector('.tgal__nav--prev');
    var navNext = gallery.querySelector('.tgal__nav--next');
    var current = 0;
    var first = 0;

    var perView = function () {
      return parseInt(getComputedStyle(strip).getPropertyValue('--per'), 10) || 4;
    };
    var placeStrip = function () {
      var per = perView();
      first = Math.max(0, Math.min(first, thumbs.length - per));
      var item = strip.children[0];
      var step = item.getBoundingClientRect().width + (parseFloat(getComputedStyle(strip).columnGap) || 0);
      strip.style.transform = 'translateX(' + (-first * step) + 'px)';
      navPrev.disabled = first === 0;
      navNext.disabled = first >= thumbs.length - per;
    };
    var go = function (index) {
      current = (index + slides) % slides;
      track.style.transform = 'translateX(' + (-current * 100) + '%)';
      thumbs.forEach(function (b, i) { b.classList.toggle('is-active', i === current); });
      var per = perView();
      if (current < first) first = current;
      if (current >= first + per) first = current - per + 1;
      placeStrip();
    };

    thumbs.forEach(function (b, i) { b.addEventListener('click', function () { go(i); }); });
    gallery.querySelectorAll('.tgal__arrow').forEach(function (b) {
      b.addEventListener('click', function () { go(current + Number(b.dataset.dir)); });
    });
    [navPrev, navNext].forEach(function (b) {
      b.addEventListener('click', function () { first += Number(b.dataset.dir) * perView(); placeStrip(); });
    });
    window.addEventListener('resize', placeStrip);
    placeStrip();
  }

  // Booking card: Book / Inquiry tabs.
  var tabs = document.querySelectorAll('.booking__tab');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', String(on));
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
    });
  });

  // Booking form: total = tickets x price + extras; enabled once a departure is chosen.
  var book = document.querySelector('.book-form');
  if (book) {
    var unit = Number(book.dataset.price);
    var money = function (n) {
      return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };
    var update = function () {
      var qty = Math.max(1, parseInt(book.querySelector('[data-qty]').value, 10) || 1);
      var extras = 0;
      book.querySelectorAll('[data-extra]:checked').forEach(function (c) { extras += Number(c.value); });
      book.querySelector('[data-total]').textContent = money(qty * unit + extras);
      book.querySelector('.book-form__submit').disabled = !book.querySelector('select').value;
    };
    book.addEventListener('input', update);
    book.addEventListener('change', update);
    book.addEventListener('submit', function (e) { e.preventDefault(); });
    // Departure chosen from the home page ("Reserve →" links carry ?departure=YYYY-MM-DD).
    var wanted = new URLSearchParams(location.search).get('departure');
    var select = book.querySelector('select');
    if (wanted && select.querySelector('option[value="' + wanted + '"]')) select.value = wanted;
    update();
  }
  var inquiry = document.querySelector('.inquiry-form');
  if (inquiry) inquiry.addEventListener('submit', function (e) { e.preventDefault(); });

  // "Write a Review" dialog (static form, nothing is sent).
  var dialog = document.querySelector('.review-dialog');
  var openReview = document.querySelector('[data-open-review]');
  if (dialog && openReview && dialog.showModal) {
    openReview.addEventListener('click', function () { dialog.showModal(); });
    dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
  }

  // Sort menu: pick an option, update the label, close.
  var sort = document.querySelector('.sort-menu');
  if (sort) {
    sort.querySelectorAll('ul button').forEach(function (b) {
      b.addEventListener('click', function () {
        sort.querySelector('summary').firstChild.textContent = b.textContent;
        sort.open = false;
      });
    });
  }
})();
