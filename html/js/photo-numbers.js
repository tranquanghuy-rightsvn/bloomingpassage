// TEMPORARY: shows the number of every photo (img[data-num]) so the client can comment "use photo 1 instead of photo 2".
// The same photo keeps the same number on every page; the Gallery numbers its own tiles (gallery.css .lens__num).
// Remove this script (and the data-num attributes) once the photos are settled.
(function () {
  var css = document.createElement('style');
  css.textContent =
    '.photo-num{position:absolute;z-index:5;display:grid;place-items:center;min-width:34px;height:34px;padding:0 8px;' +
    'font:700 15px/1 Montserrat,Helvetica,Arial,sans-serif;color:#fff;background:#b5553a;border:2px solid #fff;' +
    'border-radius:999px;box-shadow:0 4px 12px rgba(0,0,0,.25);pointer-events:none}' +
    '.photo-num--sm{min-width:24px;height:24px;padding:0 5px;font-size:11px;border-width:1.5px}';
  document.head.appendChild(css);

  document.querySelectorAll('img[data-num]').forEach(function (img) {
    var box = img.parentElement;
    if (getComputedStyle(box).position === 'static') box.style.position = 'relative';
    var tag = document.createElement('span');
    tag.className = 'photo-num';
    tag.setAttribute('aria-hidden', 'true');
    tag.textContent = img.getAttribute('data-num');
    box.appendChild(tag);
    var place = function () {
      // pin the badge to the photo's own top-left corner, wherever it sits inside its parent
      tag.classList.toggle('photo-num--sm', img.offsetWidth > 0 && img.offsetWidth < 200);
      tag.style.left = (img.offsetLeft + 8) + 'px';
      tag.style.top = (img.offsetTop + 8) + 'px';
    };
    place();
    img.addEventListener('load', place);
    if ('ResizeObserver' in window) new ResizeObserver(place).observe(img);
  });
})();
