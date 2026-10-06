// Share button: toggle panel, close on outside click / Esc, copy link.
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
})();
