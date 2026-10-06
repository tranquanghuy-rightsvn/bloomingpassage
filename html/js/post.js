// Blog post: share panel, copy link, related-stories slider, static comment form.
(function () {
  var share = document.querySelector('.share');
  if (share) {
    var toggle = share.querySelector('.share__toggle');
    var setOpen = function (open) {
      share.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      setOpen(!share.classList.contains('is-open'));
    });
    document.addEventListener('click', function (e) {
      if (!share.querySelector('.share__panel').contains(e.target)) setOpen(false);
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
    var copyBtn = share.querySelector('.share__copy-btn');
    var input = share.querySelector('.share__url');
    copyBtn.addEventListener('click', function () {
      var done = function () {
        copyBtn.textContent = 'Copied';
        setTimeout(function () { copyBtn.textContent = 'Copy'; }, 1500);
      };
      if (navigator.clipboard) navigator.clipboard.writeText(input.value).then(done, done);
      else { input.select(); document.execCommand('copy'); done(); }
    });
  }

  var track = document.querySelector('.related__track');
  if (track) {
    var prev = document.querySelector('.related__arrow--prev');
    var next = document.querySelector('.related__arrow--next');
    var update = function () {
      var max = track.scrollWidth - track.clientWidth;
      prev.disabled = track.scrollLeft <= 1;
      next.disabled = track.scrollLeft >= max - 1;
    };
    var step = function (dir) {
      var card = track.firstElementChild;
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      track.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: 'smooth' });
    };
    prev.addEventListener('click', function () { step(-1); });
    next.addEventListener('click', function () { step(1); });
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  var form = document.querySelector('.comment-form');
  if (form) form.addEventListener('submit', function (e) { e.preventDefault(); });
})();
