/* CONNEXUS 2026 photo gallery (gallery.html, en/gallery.html).
   Renders window.GALLERY_DATA (data/gallery-data.js) into the page:
   cover, sticky category bar, per-scene photo grids, lightbox, favourites.
   Photos are served from Google Drive by file id; see data/gallery-data.js.

   Grid rules, measured on the photographer's gallery:
   - viewport >= 1440px: 4 photos per row, >= 1024px: 3 per row; every row is
     scaled so its photos fill the width at one shared height.
   - below 1024px: justified rows. Photos are added to a row while it is still
     taller than TARGET_ROW_H, then whichever of the last two candidate rows is
     closer to TARGET_ROW_H wins. */
window.Gallery = (function () {
  'use strict';

  var TARGET_ROW_H = 240;
  var FAV_KEY = 'cx-gallery-favs';

  var T = {
    bg: {
      dates: '5–7 октомври 2026',
      credit: 'Снимки:',
      downloadAll: 'Всички снимки в Google Drive',
      favourites: 'Любими',
      share: 'Сподели',
      download: 'Изтегли',
      addFav: 'Добави в любими',
      removeFav: 'Махни от любими',
      close: 'Затвори',
      prev: 'Предишна снимка',
      next: 'Следваща снимка',
      scrollDown: 'Към снимките',
      copied: 'Линкът е копиран',
      favEmpty: 'Все още нямате любими снимки. Натиснете сърцето върху снимка, за да я добавите.',
      favTitle: 'Любими',
      openPhoto: 'Отвори снимката',
      photoOf: ' от ',
      dl: 'Изтегли',
      favShort: 'Любими',
      shareShort: 'Сподели',
      categories: 'Категории'
    },
    en: {
      dates: 'October 5–7, 2026',
      credit: 'Photos:',
      downloadAll: 'All photos on Google Drive',
      favourites: 'Favourites',
      share: 'Share',
      download: 'Download',
      addFav: 'Add to favourites',
      removeFav: 'Remove from favourites',
      close: 'Close',
      prev: 'Previous photo',
      next: 'Next photo',
      scrollDown: 'To the photos',
      copied: 'Link copied',
      favEmpty: 'No favourites yet. Tap the heart on a photo to add it.',
      favTitle: 'Favourites',
      openPhoto: 'Open photo',
      photoOf: ' of ',
      dl: 'Download',
      favShort: 'Favourites',
      shareShort: 'Share',
      categories: 'Categories'
    }
  };

  var ICON = {
    download: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M9 1.5v10M4.8 7.6 9 11.8l4.2-4.2M1.5 12.5v3.2h15v-3.2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    share: '<svg width="20" height="17" viewBox="0 0 20 17" fill="none" aria-hidden="true"><path d="M11.6 1.3 18.7 7.6l-7.1 6.3v-3.6C6.4 10.3 3.3 12 1.3 15.7 2 10.4 4.9 5.6 11.6 4.9V1.3Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
    heart: '<svg width="18" height="16" viewBox="0 0 18 16" fill="none" aria-hidden="true"><path d="M9 15.2 2.2 8.6A4.1 4.1 0 0 1 9 3.3a4.1 4.1 0 0 1 6.8 5.3Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
    close: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M1.5 1.5l13 13M14.5 1.5l-13 13" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
    prev: '<svg width="10" height="18" viewBox="0 0 10 18" fill="none" aria-hidden="true"><path d="M9 1 1 9l8 8" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    next: '<svg width="10" height="18" viewBox="0 0 10 18" fill="none" aria-hidden="true"><path d="m1 1 8 8-8 8" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    down: '<svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden="true"><path d="m1 1 6 6 6-6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  var data, t, lang;
  var scenesEl, lb, lbImg, lbCaption, lbCount, lbPrev, lbNext, lbFav, lbDl, toastEl;
  var flat = [];          // every photo object, in page order
  var shown = [];         // photos currently in the grid (all, or favourites only)
  var grids = [];         // { el, photos } per rendered scene
  var favs = loadFavs();
  var favMode = false;
  var lbIndex = -1;
  var lastFocus = null;
  var lastWidth = 0;

  // ---------- helpers ----------
  function img(id, w) { return 'https://lh3.googleusercontent.com/d/' + id + '=w' + w; }
  // Google rate-limits Drive image requests by Referer (seen as HTTP 429 for
  // every photo once one referring site has made many requests), so every
  // photo request goes out without a Referer.
  function driveImage() { var i = new Image(); i.referrerPolicy = 'no-referrer'; return i; }
  function dlUrl(id) { return 'https://drive.google.com/uc?export=download&id=' + id; }
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function photoName(p) { return 'Connexus Day ' + p.day + '-' + p.num + '.jpg'; }
  function photoHash(p) { return p.scene + '-' + p.num; }
  // Pages carry <base href="/"> ("/en/" on EN), so a bare '#x' href or
  // replaceState('#x') would resolve against the site root, not this page.
  // Always build links from the current path instead.
  function pageUrl(hash) { return location.href.split('#')[0] + (hash ? '#' + hash : ''); }
  function setHash(hash) { history.replaceState(null, '', location.pathname + location.search + (hash ? '#' + hash : '')); }

  function loadFavs() {
    try { return JSON.parse(localStorage.getItem(FAV_KEY)) || {}; } catch (e) { return {}; }
  }
  function saveFavs() {
    try { localStorage.setItem(FAV_KEY, JSON.stringify(favs)); } catch (e) { /* private mode */ }
  }
  function favCount() { return Object.keys(favs).length; }

  function toast(msg) {
    if (!toastEl) { toastEl = el('div', 'cx-gal-toast'); toastEl.setAttribute('role', 'status'); document.body.appendChild(toastEl); }
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(function () { toastEl.classList.remove('show'); }, 1800);
  }

  function share(url) {
    var title = document.title;
    if (navigator.share) {
      navigator.share({ title: title, url: url }).catch(function () {});
      return;
    }
    function done() { toast(t.copied); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(done, function () { fallbackCopy(url); done(); });
    } else { fallbackCopy(url); done(); }
  }
  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
  }

  // ---------- layout ----------
  function rowsFixed(photos, width, cols) {
    var rows = [], lastH = null;
    for (var i = 0; i < photos.length; i += cols) {
      var row = photos.slice(i, i + cols);
      var sum = row.reduce(function (a, p) { return a + p.ar; }, 0);
      var h = width / sum;
      // a short last row keeps a normal height instead of blowing up to fill the width
      if (row.length < cols && lastH) h = Math.min(h, lastH);
      rows.push({ items: row, h: h, full: row.length === cols });
      lastH = h;
    }
    return rows;
  }

  function rowsJustified(photos, width) {
    var rows = [], i = 0;
    while (i < photos.length) {
      var row = [photos[i]], sum = photos[i].ar, h = width / sum;
      i++;
      while (h > TARGET_ROW_H && i < photos.length) {
        var nextSum = sum + photos[i].ar, nextH = width / nextSum;
        if (nextH < TARGET_ROW_H && Math.abs(h - TARGET_ROW_H) <= Math.abs(nextH - TARGET_ROW_H)) break;
        row.push(photos[i]); sum = nextSum; h = nextH; i++;
      }
      var full = h <= TARGET_ROW_H * 1.6 || i < photos.length;
      if (!full) h = TARGET_ROW_H;
      rows.push({ items: row, h: h, full: full });
    }
    return rows;
  }

  function layoutGrid(g) {
    var width = g.el.clientWidth;
    if (!width) return;
    var vw = window.innerWidth;
    var rows = vw >= 1024 ? rowsFixed(g.photos, width, vw >= 1440 ? 4 : 3) : rowsJustified(g.photos, width);
    var y = 0;
    rows.forEach(function (r) {
      var h = Math.round(r.h), x = 0;
      r.items.forEach(function (p, k) {
        var w = (r.full && k === r.items.length - 1) ? width - x : Math.round(p.ar * r.h);
        var s = p.tile.style;
        s.left = x + 'px'; s.top = y + 'px'; s.width = w + 'px'; s.height = h + 'px';
        p.img.sizes = w + 'px';
        x += w;
      });
      y += h;
    });
    g.el.style.height = y + 'px';
  }

  function layoutAll() {
    lastWidth = window.innerWidth;
    grids.forEach(layoutGrid);
  }

  // ---------- tiles ----------
  function tileFor(p) {
    var a = el('a', 'cx-gal-tile' + (favs[p.id] ? ' fav' : ''));
    a.href = pageUrl(photoHash(p));
    a.setAttribute('aria-label', t.openPhoto + ' ' + photoName(p));
    var inner = el('div', 'cx-gal-tile-inner');
    var im = driveImage();
    im.alt = '';
    im.loading = 'lazy';
    im.decoding = 'async';
    im.srcset = [400, 800, 1200, 1600].map(function (w) { return img(p.id, w) + ' ' + w + 'w'; }).join(', ');
    im.sizes = '400px';
    im.src = img(p.id, 800);
    im.onload = function () { im.classList.add('loaded'); };
    inner.appendChild(im);

    var actions = el('div', 'cx-gal-tile-actions');
    var d = el('a', '', ICON.download);
    d.href = dlUrl(p.id); d.setAttribute('download', photoName(p)); d.rel = 'noopener';
    d.setAttribute('aria-label', t.download); d.title = t.download;
    var sh = el('button', '', ICON.share);
    sh.type = 'button'; sh.setAttribute('aria-label', t.share); sh.title = t.share;
    var fv = el('button', 'cx-gal-fav-btn' + (favs[p.id] ? ' on' : ''), ICON.heart);
    fv.type = 'button';
    actions.appendChild(d); actions.appendChild(sh); actions.appendChild(fv);
    inner.appendChild(actions);
    a.appendChild(inner);

    d.addEventListener('click', function (e) { e.stopPropagation(); });
    sh.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); share(pageUrl(photoHash(p))); });
    fv.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); toggleFav(p); });
    a.addEventListener('click', function (e) {
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) return;
      e.preventDefault();
      openLightbox(shown.indexOf(p));
    });

    p.tile = a; p.img = im; p.favBtn = fv;
    syncFavLabel(p);
    return a;
  }

  function syncFavLabel(p) {
    var on = !!favs[p.id];
    if (p.tile) p.tile.classList.toggle('fav', on);
    if (p.favBtn) {
      p.favBtn.classList.toggle('on', on);
      p.favBtn.setAttribute('aria-label', on ? t.removeFav : t.addFav);
      p.favBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
      p.favBtn.title = on ? t.removeFav : t.addFav;
    }
  }

  function toggleFav(p) {
    if (favs[p.id]) delete favs[p.id]; else favs[p.id] = 1;
    saveFavs();
    syncFavLabel(p);
    updateFavCounts();
    if (lbIndex >= 0 && shown[lbIndex] === p) syncLightboxFav();
    if (favMode && !favs[p.id] && lbIndex < 0) renderScenes();
  }

  function updateFavCounts() {
    var n = favCount();
    document.querySelectorAll('[data-gal-fav-count]').forEach(function (c) {
      c.textContent = n; c.hidden = n === 0;
    });
    document.querySelectorAll('[data-gal-fav-toggle]').forEach(function (b) {
      b.classList.toggle('on', favMode);
      b.setAttribute('aria-pressed', favMode ? 'true' : 'false');
    });
  }

  // ---------- scenes ----------
  function renderScenes() {
    scenesEl.innerHTML = '';
    grids = [];
    var list;
    if (favMode) {
      list = [{ id: 'favourites', title: t.favTitle + ' (' + favCount() + ')', photos: flat.filter(function (p) { return favs[p.id]; }) }];
    } else {
      list = data.scenes.map(function (s) { return { id: s.id, title: s[lang], photos: s.photos }; });
    }
    shown = [];
    list.forEach(function (s) {
      var sec = el('section', 'cx-gal-scene');
      sec.id = s.id;
      sec.setAttribute('aria-labelledby', s.id + '-title');
      var h = el('h2', 'cx-gal-title');
      h.id = s.id + '-title';
      h.textContent = s.title;
      sec.appendChild(h);
      if (!s.photos.length) {
        sec.appendChild(el('p', 'cx-gal-empty', t.favEmpty));
      } else {
        var grid = el('div', 'cx-gal-grid');
        s.photos.forEach(function (p) { grid.appendChild(p.tile || tileFor(p)); shown.push(p); });
        sec.appendChild(grid);
        grids.push({ el: grid, photos: s.photos });
      }
      scenesEl.appendChild(sec);
    });
    document.querySelectorAll('.cx-gal-tabs').forEach(function (tabs) { tabs.hidden = favMode; });
    layoutAll();
    observeScenes();
  }

  function toggleFavMode() {
    favMode = !favMode;
    renderScenes();
    updateFavCounts();
    var top = document.querySelector('.cx-gal-bar');
    window.scrollTo({ top: top.getBoundingClientRect().top + window.scrollY - navH(), behavior: 'instant' });
  }

  function navH() {
    var n = document.querySelector('nav.main-nav');
    return n ? n.getBoundingClientRect().height : 72;
  }

  // ---------- category bar ----------
  var sceneObs;
  function observeScenes() {
    if (sceneObs) sceneObs.disconnect();
    if (!('IntersectionObserver' in window)) return;
    var tabs = document.querySelectorAll('.cx-gal-tab');
    sceneObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        tabs.forEach(function (tab) {
          var on = tab.getAttribute('data-scene') === en.target.id;
          tab.classList.toggle('active', on);
          if (on) {
            tab.setAttribute('aria-current', 'true');
            var bar = tab.parentElement;
            if (bar.scrollWidth > bar.clientWidth) {
              var left = tab.getBoundingClientRect().left - bar.getBoundingClientRect().left + bar.scrollLeft;
              bar.scrollTo({ left: left - 16, behavior: 'smooth' });
            }
          } else tab.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    scenesEl.querySelectorAll('.cx-gal-scene').forEach(function (s) { sceneObs.observe(s); });
  }

  function buildBar(bar) {
    var tabs = bar.querySelector('.cx-gal-tabs');
    tabs.setAttribute('aria-label', t.categories);
    data.scenes.forEach(function (s) {
      var a = el('a', 'cx-gal-tab');
      a.href = pageUrl(s.id);
      a.setAttribute('data-scene', s.id);
      a.textContent = s[lang];
      tabs.appendChild(a);
    });
    tabs.addEventListener('click', function (e) {
      var a = e.target.closest('.cx-gal-tab');
      if (!a) return;
      e.preventDefault();
      var target = document.getElementById(a.getAttribute('data-scene'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setHash(target.id);
      }
    });
  }

  function bindActions(root) {
    root.querySelectorAll('[data-gal-share]').forEach(function (b) {
      b.addEventListener('click', function () { share(pageUrl('')); });
    });
    root.querySelectorAll('[data-gal-fav-toggle]').forEach(function (b) {
      b.addEventListener('click', toggleFavMode);
    });
    root.querySelectorAll('[data-gal-drive]').forEach(function (a) { a.href = data.driveFolder; });
  }

  // ---------- lightbox ----------
  function buildLightbox() {
    lb = el('div', 'cx-gal-lb');
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', document.title);
    lb.innerHTML =
      '<div class="cx-gal-lb-count" aria-live="polite"></div>' +
      '<div class="cx-gal-lb-top">' +
        '<a class="cx-gal-lb-dl" rel="noopener" aria-label="' + t.download + '" title="' + t.download + '">' + ICON.download + '</a>' +
        '<button type="button" class="cx-gal-lb-share" aria-label="' + t.share + '" title="' + t.share + '">' + ICON.share + '</button>' +
        '<button type="button" class="cx-gal-lb-fav">' + ICON.heart + '</button>' +
        '<button type="button" class="cx-gal-lb-close" aria-label="' + t.close + '" title="' + t.close + '">' + ICON.close + '</button>' +
      '</div>' +
      '<button type="button" class="cx-gal-lb-prev" aria-label="' + t.prev + '">' + ICON.prev + '</button>' +
      '<div class="cx-gal-lb-stage"><img alt=""></div>' +
      '<button type="button" class="cx-gal-lb-next" aria-label="' + t.next + '">' + ICON.next + '</button>' +
      '<div class="cx-gal-lb-caption"></div>';
    document.body.appendChild(lb);
    lbImg = lb.querySelector('.cx-gal-lb-stage img');
    lbImg.referrerPolicy = 'no-referrer';
    lbCaption = lb.querySelector('.cx-gal-lb-caption');
    lbCount = lb.querySelector('.cx-gal-lb-count');
    lbPrev = lb.querySelector('.cx-gal-lb-prev');
    lbNext = lb.querySelector('.cx-gal-lb-next');
    lbFav = lb.querySelector('.cx-gal-lb-fav');
    lbDl = lb.querySelector('.cx-gal-lb-dl');

    lbPrev.addEventListener('click', function () { step(-1); });
    lbNext.addEventListener('click', function () { step(1); });
    lb.querySelector('.cx-gal-lb-close').addEventListener('click', closeLightbox);
    lb.querySelector('.cx-gal-lb-share').addEventListener('click', function () { share(pageUrl(photoHash(shown[lbIndex]))); });
    lbFav.addEventListener('click', function () { toggleFav(shown[lbIndex]); });

    lb.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.preventDefault(); closeLightbox(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
      else if (e.key === 'Tab') {
        var f = [].slice.call(lb.querySelectorAll('a[href], button:not([disabled])'));
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    // swipe
    var sx = null, sy = null;
    var stage = lb.querySelector('.cx-gal-lb-stage');
    stage.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    stage.addEventListener('touchend', function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
      sx = sy = null;
    });
    stage.addEventListener('click', function (e) { if (e.target === stage) closeLightbox(); });
  }

  function lbWidth() {
    var w = Math.max(window.innerWidth, window.innerHeight * 1.5) * Math.min(window.devicePixelRatio || 1, 2);
    return Math.min(3000, Math.ceil(w / 400) * 400);
  }

  function showPhoto() {
    var p = shown[lbIndex];
    var big = img(p.id, lbWidth());
    lbImg.src = img(p.id, 800);           // already cached from the grid: instant
    lbImg.alt = photoName(p);
    var hi = driveImage();
    hi.onload = function () { if (shown[lbIndex] === p) lbImg.src = big; };
    hi.src = big;
    lbCaption.textContent = photoName(p);
    lbCount.textContent = (lbIndex + 1) + t.photoOf + shown.length;
    lbDl.href = dlUrl(p.id);
    lbDl.setAttribute('download', photoName(p));
    lbPrev.disabled = lbIndex === 0;
    lbNext.disabled = lbIndex === shown.length - 1;
    syncLightboxFav();
    setHash(photoHash(p));
    [lbIndex - 1, lbIndex + 1].forEach(function (i) {
      if (shown[i]) driveImage().src = img(shown[i].id, lbWidth());
    });
  }

  function syncLightboxFav() {
    var on = !!favs[shown[lbIndex].id];
    lbFav.classList.toggle('on', on);
    lbFav.setAttribute('aria-label', on ? t.removeFav : t.addFav);
    lbFav.setAttribute('aria-pressed', on ? 'true' : 'false');
    lbFav.title = on ? t.removeFav : t.addFav;
  }

  function step(d) {
    var i = lbIndex + d;
    if (i < 0 || i >= shown.length) return;
    lbIndex = i;
    showPhoto();
  }

  function openLightbox(i) {
    if (i < 0) return;
    lastFocus = document.activeElement;
    lbIndex = i;
    lb.classList.add('open');
    document.body.classList.add('cx-gal-lock');
    showPhoto();
    lb.querySelector('.cx-gal-lb-close').focus();
  }

  function closeLightbox() {
    if (lbIndex < 0) return;
    var p = shown[lbIndex];
    lb.classList.remove('open');
    document.body.classList.remove('cx-gal-lock');
    lbIndex = -1;
    lbImg.removeAttribute('src');
    setHash('');
    if (favMode && !favs[p.id]) { renderScenes(); return; }
    // bring the photo you ended on into view, then hand focus back to it
    var r = p.tile.getBoundingClientRect();
    if (r.top < navH() + 64 || r.bottom > window.innerHeight) {
      window.scrollTo({ top: r.top + window.scrollY - window.innerHeight / 3, behavior: 'instant' });
    }
    (p.tile || lastFocus).focus({ preventScroll: true });
  }

  function openFromHash() {
    var h = decodeURIComponent(location.hash.slice(1));
    if (!h) return;
    var m = h.match(/^(.+)-(\d+)$/);
    if (!m) return;
    for (var i = 0; i < shown.length; i++) {
      if (shown[i].scene === m[1] && String(shown[i].num) === m[2]) { openLightbox(i); return; }
    }
  }

  // ---------- init ----------
  function init(opts) {
    data = window.GALLERY_DATA;
    lang = opts.lang === 'en' ? 'en' : 'bg';
    t = T[lang];
    if (!data) return;

    data.scenes.forEach(function (s) {
      s.photos = s.photos.map(function (r) {
        var p = { id: r[0], ar: r[1] / r[2], num: r[3], day: s.day, scene: s.id };
        flat.push(p);
        return p;
      });
    });

    var hero = document.querySelector('.cx-gal-hero');
    if (hero) {
      var cover = hero.querySelector('.cx-gal-hero-img');
      cover.referrerPolicy = 'no-referrer';
      cover.srcset = [1200, 1800, 2400, 3000].map(function (w) { return img(data.cover, w) + ' ' + w + 'w'; }).join(', ');
      cover.sizes = '100vw';
      cover.src = img(data.cover, 2400);
      var down = hero.querySelector('.cx-gal-hero-down');
      down.innerHTML = ICON.down;
      down.setAttribute('aria-label', t.scrollDown);
      down.addEventListener('click', function () {
        var bar = document.querySelector('.cx-gal-bar');
        window.scrollTo({ top: bar.getBoundingClientRect().top + window.scrollY - navH(), behavior: 'smooth' });
      });
    }

    document.querySelectorAll('.cx-gal-bar').forEach(buildBar);
    bindActions(document);
    document.querySelectorAll('[data-gal-icon]').forEach(function (s) { s.innerHTML = ICON[s.getAttribute('data-gal-icon')]; });

    scenesEl = document.getElementById('cx-gal-scenes');
    buildLightbox();
    renderScenes();
    updateFavCounts();
    openFromHash();
    // a plain #day-2 style link: the grids are built now, so jump to it
    if (lbIndex < 0 && location.hash) {
      var target = document.getElementById(location.hash.slice(1));
      if (target) target.scrollIntoView({ behavior: 'instant' });
    }

    var raf = 0;
    window.addEventListener('resize', function () {
      if (window.innerWidth === lastWidth) return;   // ignore mobile URL-bar height changes
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(layoutAll);
    });
  }

  return { init: init };
})();
