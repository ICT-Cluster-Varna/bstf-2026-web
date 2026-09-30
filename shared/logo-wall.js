/*
 * Logo wall balancing — index.html partner rows + sponsors.html exhibitors table.
 *
 * Every logo sits in an equal-size tile (CSS). Two things make logos look
 * uneven in equal tiles, and both are corrected here:
 *  1. Built-in padding: many files carry white/transparent margins around the
 *     mark. The visible "ink" box is measured on a canvas and the image is
 *     scaled/shifted so that box — not the file's canvas — is what gets sized
 *     (the tile has overflow:hidden, so only empty margin is ever clipped).
 *  2. Shape: a wide wordmark and a square crest at the same height differ
 *     wildly in weight. Size follows h = C * ratio^-0.4 (between equal height
 *     and equal area), clamped to the tile's inner box.
 * Fine-tune one logo with `--logo-scale` on its tile (multiplies the size).
 *
 * Without JS the CSS fallback (max-width/max-height: contain) still applies.
 */
(function () {
  var SELECTOR = '.partner-row--logos .partner-logo img, .exhibitor-logo img';
  var FILL = 0.5;   // share of the tile's inner box a square logo covers
  var SHAPE = 0.4;  // 0.5 = equal area, 0 = equal height
  var SAMPLE = 320; // canvas width used to find the ink box

  function naturalSize(img) {
    var w = img.naturalWidth, h = img.naturalHeight;
    if (!w || !h) { // SVG without intrinsic size: fall back to the attributes
      w = +img.getAttribute('width');
      h = +img.getAttribute('height');
    }
    return w && h ? { w: w, h: h } : null;
  }

  // Fractional bbox of pixels that are neither transparent nor near-white.
  function inkBox(img, n) {
    if (img._ink !== undefined) return img._ink;
    var box = null;
    try {
      var cw = Math.min(SAMPLE, Math.max(1, Math.round(n.w)));
      var ch = Math.max(1, Math.round(cw * n.h / n.w));
      var c = document.createElement('canvas');
      c.width = cw; c.height = ch;
      var ctx = c.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0, cw, ch);
      var d = ctx.getImageData(0, 0, cw, ch).data;
      var x0 = cw, y0 = ch, x1 = -1, y1 = -1;
      for (var y = 0; y < ch; y++) {
        for (var x = 0; x < cw; x++) {
          var i = (y * cw + x) * 4;
          if (d[i + 3] < 20) continue;
          if (d[i] > 240 && d[i + 1] > 240 && d[i + 2] > 240) continue;
          if (x < x0) x0 = x;
          if (x > x1) x1 = x;
          if (y < y0) y0 = y;
          if (y > y1) y1 = y;
        }
      }
      if (x1 >= x0 && y1 >= y0) {
        box = { x: x0 / cw, y: y0 / ch, w: (x1 - x0 + 1) / cw, h: (y1 - y0 + 1) / ch };
      }
    } catch (e) { /* tainted canvas etc. — size by the full file */ }
    img._ink = box || { x: 0, y: 0, w: 1, h: 1 };
    return img._ink;
  }

  function fit(img) {
    var n = naturalSize(img);
    if (!n) return;
    var tile = img.closest('.partner-logo, .exhibitor-logo');
    if (!tile) return;
    var cs = getComputedStyle(tile);
    var bw = tile.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    var bh = tile.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    if (bw <= 0 || bh <= 0) return;

    var ink = inkBox(img, n);
    var r = (ink.w * n.w) / (ink.h * n.h); // aspect ratio of the visible mark
    var scale = parseFloat(cs.getPropertyValue('--logo-scale')) || 1;
    var h = Math.sqrt(FILL * bw * bh) * scale * Math.pow(r, -SHAPE);
    var w = h * r;
    if (w > bw) { w = bw; h = w / r; }
    if (h > bh) { h = bh; w = h * r; }

    // Size the whole file so its ink box comes out w×h, then shift the ink
    // box onto the tile's centre.
    var fw = w / ink.w, fh = h / ink.h;
    var dx = (0.5 - (ink.x + ink.w / 2)) * fw;
    var dy = (0.5 - (ink.y + ink.h / 2)) * fh;
    img.style.maxWidth = 'none';
    img.style.maxHeight = 'none';
    img.style.flex = 'none';
    img.style.width = Math.round(fw) + 'px';
    img.style.height = Math.round(fh) + 'px';
    img.style.transform = 'translate(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px)';
  }

  function fitAll() {
    var imgs = document.querySelectorAll(SELECTOR);
    for (var i = 0; i < imgs.length; i++) {
      if (imgs[i].complete) fit(imgs[i]);
    }
  }

  function init() {
    var imgs = document.querySelectorAll(SELECTOR);
    for (var i = 0; i < imgs.length; i++) {
      imgs[i].addEventListener('load', function () { fit(this); });
    }
    fitAll();
    // Re-fit whenever a tile changes size (breakpoints, or a page that was
    // laid out while hidden); fall back to window resize on old browsers.
    if (window.ResizeObserver) {
      var ro = new ResizeObserver(function (entries) {
        for (var k = 0; k < entries.length; k++) {
          var img = entries[k].target.querySelector('img');
          if (img && img.complete) fit(img);
        }
      });
      var tiles = document.querySelectorAll('.partner-row--logos .partner-logo, .exhibitor-logo');
      for (var j = 0; j < tiles.length; j++) ro.observe(tiles[j]);
    } else {
      var t;
      window.addEventListener('resize', function () {
        clearTimeout(t);
        t = setTimeout(fitAll, 120);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
