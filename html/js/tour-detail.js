// Tour detail: image gallery + thumbnails, reservation tabs and price total.
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

  // "Plan Your Journey" card: no booking or payment while departures are tentative. A departure picked on the
  // Journeys page (?departure=YYYY-MM-DD) is preselected; sending opens the visitor's email app with the details filled in.
  var plan = document.querySelector('.plan-form');
  if (plan) {
    var wanted = new URLSearchParams(location.search).get('departure');
    var dep = plan.querySelector('[name="departure"]');
    if (wanted && dep.querySelector('option[value="' + wanted + '"]')) dep.value = wanted;
    plan.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = function (n) { var el = plan.querySelector('[name="' + n + '"]'); return el ? el.value.trim() : ''; };
      var txt = function (n) { var el = plan.querySelector('[name="' + n + '"]'); return el && el.selectedIndex > -1 ? el.options[el.selectedIndex].text : ''; };
      var body = [
        'Name: ' + (v('first_name') + ' ' + v('last_name')).trim(),
        'Email: ' + v('email'),
        'Phone: ' + v('phone'),
        'Preferred departure: ' + (v('departure') ? txt('departure') : 'Not chosen yet'),
        'Journey: ' + txt('journey'),
        'Guests: ' + v('guests'),
        '',
        v('message')
      ].join('\n');
      location.href = 'mailto:travel@bloomingpassage.com?subject=' + encodeURIComponent('Plan my journey: ' + txt('journey')) + '&body=' + encodeURIComponent(body);
    });
  }
})();
