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

    // blurred backdrop behind each uncropped slide: reuse its small thumbnail, so lazy slides stay lazy
    Array.prototype.forEach.call(track.children, function (li, i) {
      var thumb = thumbs[i] && thumbs[i].querySelector('img');
      if (thumb) li.style.setProperty('--slide-bg', 'url("' + thumb.getAttribute('src') + '")');
    });

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

  // "Plan Your Trip" card: no booking or payment at this stage. A departure picked on the Journeys page
  // (?departure=YYYY-MM-DD) is preselected; the inquiry is emailed through window.bpSendInquiry (main.js).
  var plan = document.querySelector('.plan-form');
  if (plan) {
    var wanted = new URLSearchParams(location.search).get('departure');
    var dep = plan.querySelector('[name="departure"]');
    if (wanted && dep.querySelector('option[value="' + wanted + '"]')) dep.value = wanted;
    // each departure belongs to one journey: keep the two selects in step
    var jour = plan.querySelector('[name="journey"]');
    var depJourney = function () { var o = dep.options[dep.selectedIndex]; return o ? o.getAttribute('data-journey') : null; };
    dep.addEventListener('change', function () { if (depJourney()) jour.value = depJourney(); });
    jour.addEventListener('change', function () { if (depJourney() && depJourney() !== jour.value) dep.value = ''; });
    if (depJourney()) jour.value = depJourney();
    var button = plan.querySelector('.book-form__submit');
    var note = document.createElement('p');
    note.className = 'plan-form__note';
    note.setAttribute('role', 'status');
    note.hidden = true;
    plan.appendChild(note);
    plan.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = function (n) { var el = plan.querySelector('[name="' + n + '"]'); return el ? el.value.trim() : ''; };
      var txt = function (n) { var el = plan.querySelector('[name="' + n + '"]'); return el && el.selectedIndex > -1 ? el.options[el.selectedIndex].text : ''; };
      var name = (v('first_name') + ' ' + v('last_name')).trim();
      button.disabled = true;
      button.textContent = 'Sending…';
      note.hidden = true;
      window.bpSendInquiry({
        _subject: 'Plan my trip: ' + txt('journey') + (name ? ' (' + name + ')' : ''),
        'Full name': name || '—',
        email: v('email'),
        'Phone': v('phone') || '—',
        'Journey': txt('journey'),
        'Preferred departure': v('departure') ? txt('departure') : 'Not chosen yet',
        'Guests': v('guests'),
        'Message': v('message') || '—'
      }).then(function () {
        plan.reset();
        note.textContent = 'Thank you for reaching out. We look forward to connecting with you.';
        note.className = 'plan-form__note is-sent';
      }, function () {
        note.innerHTML = 'Sorry, your inquiry could not be sent just now. Please try again, or email <a href="mailto:travel@bloomingpassage.com">travel@bloomingpassage.com</a>.';
        note.className = 'plan-form__note';
      }).then(function () {
        note.hidden = false;
        button.disabled = false;
        button.textContent = 'Plan Your Trip';
      });
    });
  }
})();
