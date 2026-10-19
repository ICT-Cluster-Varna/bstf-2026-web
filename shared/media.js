/* Media coverage page renderer: data/media.js (window.CONNEXUS_MEDIA) ->
   #cx-media-root. Host pages: media/{year}/index.html, en/media/{year}/index.html.

   Media.init({ lang: 'bg' | 'en', year: 2026 })

   Renders: key numbers in the cover ([data-media-stats]), the featured
   video, then one white board: tabs (one panel at a time) and per section a
   table-like list grouped by month, newest first:
   outlet | title | date | external icon.

   Adding a later edition = a new year key in data/media.js plus a copy of the
   two host pages under media/{year}/; the year switch in the cover appears by
   itself once there is more than one year. */
(function () {
  'use strict';

  var T = {
    bg: {
      stats: {
        items: function (n) { return n === 1 ? 'медиен материал' : 'медийни материала'; },
        outlets: function (n) { return n === 1 ? 'медия' : 'медии'; },
        videos: function (n) { return n === 1 ? 'видеоинтервю' : 'видеа'; }
      },
      after: 'Отразяване на форума',
      before: 'Преди форума',
      sections: 'Раздели',
      listKicker: 'Всички публикации',
      listTitle: 'Какво писаха медиите',
      cols: ['Медия', 'Заглавие', 'Дата'],
      read: 'Прочети',
      watch: 'Гледай',
      video: 'Видео',
      featuredTag: 'ТВ интервю',
      featuredLink: 'Прочети статията и гледай интервюто',
      empty: 'Скоро тук ще има публикации.',
      noVideo: 'Браузърът ви не може да покаже видеото.',
      months: ['януари', 'февруари', 'март', 'април', 'май', 'юни', 'юли', 'август', 'септември', 'октомври', 'ноември', 'декември'],
      newTab: 'отваря се в нов прозорец'
    },
    en: {
      stats: {
        items: function (n) { return n === 1 ? 'media item' : 'media items'; },
        outlets: function (n) { return n === 1 ? 'outlet' : 'outlets'; },
        videos: function (n) { return n === 1 ? 'video interview' : 'videos'; }
      },
      after: 'Forum coverage',
      before: 'Before the forum',
      sections: 'Sections',
      listKicker: 'All coverage',
      listTitle: 'What the media wrote',
      cols: ['Outlet', 'Title', 'Date'],
      read: 'Read',
      watch: 'Watch',
      video: 'Video',
      featuredTag: 'TV interview',
      featuredLink: 'Read the article and watch the interview',
      empty: 'Coverage will be added here soon.',
      noVideo: 'Your browser cannot play this video.',
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      newTab: 'opens in a new tab'
    }
  };

  var ICON = {
    external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></svg>',
    watch: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>'
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // data/media.js paths are site-root relative; the BG and EN trees have
  // different <base> hrefs, so make them absolute here.
  function asset(p) { return '/' + String(p).replace(/^\/+/, ''); }

  function outletKey(name) { return String(name || '').toLowerCase().replace(/^www\./, ''); }

  function parts(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || '');
    return m ? { y: +m[1], m: +m[2], d: +m[3] } : null;
  }

  function fmtDate(iso, t) {
    var p = parts(iso);
    return p ? p.d + ' ' + t.months[p.m - 1] + ' ' + p.y : '';
  }

  // Newest first. A date without a time sorts after the timed items of its day;
  // ties keep the order of data/media.js.
  function sortItems(items) {
    return items.map(function (it, i) { return { it: it, i: i, k: (it.date || '').length === 10 ? it.date + 'T00:00' : (it.date || '') }; })
      .sort(function (a, b) { return a.k === b.k ? a.i - b.i : (a.k < b.k ? 1 : -1); })
      .map(function (x) { return x.it; });
  }

  // Short date for the list: 14.10.2026 in BG, 14 Oct 2026 in EN.
  function shortDate(iso, lang, t) {
    var p = parts(iso);
    if (!p) return '';
    if (lang === 'en') return p.d + ' ' + t.months[p.m - 1].slice(0, 3) + ' ' + p.y;
    return (p.d < 10 ? '0' : '') + p.d + '.' + (p.m < 10 ? '0' : '') + p.m + '.' + p.y;
  }

  // Sorted items -> [{ key: 'YYYY-MM', items: [...] }], order kept.
  function byMonth(items) {
    var out = [];
    items.forEach(function (it) {
      var key = (it.date || '').slice(0, 7);
      var last = out[out.length - 1];
      if (last && last.key === key) last.items.push(it);
      else out.push({ key: key, items: [it] });
    });
    return out;
  }

  // Outlet logo (data/media.js -> CONNEXUS_MEDIA_LOGOS) or, without one, the
  // first letter. A logo that fails to load falls back to the letter too
  // (see wireLogos).
  function monoHtml(name) {
    var key = outletKey(name), letter = esc(key.charAt(0));
    var logo = (window.CONNEXUS_MEDIA_LOGOS || {})[key];
    return logo
      ? '<span class="cx-media-mono has-logo" aria-hidden="true" data-letter="' + letter + '">' +
          '<img src="' + esc(asset(logo)) + '" alt="" width="36" height="36" loading="lazy" decoding="async"></span>'
      : '<span class="cx-media-mono" aria-hidden="true">' + letter + '</span>';
  }

  function wireLogos(root) {
    [].forEach.call(root.querySelectorAll('.cx-media-mono img'), function (img) {
      img.addEventListener('error', function () {
        var box = img.parentNode;
        box.classList.remove('has-logo');
        box.textContent = box.getAttribute('data-letter');
      });
    });
  }

  function monthLabel(key, t) {
    var p = parts(key + '-01');
    if (!p) return '';
    var m = t.months[p.m - 1];
    return m.charAt(0).toUpperCase() + m.slice(1) + ' ' + p.y;
  }

  // One table-like row per item: outlet | title | date | external icon.
  function itemHtml(it, t, lang) {
    var isVideo = it.type === 'video';
    var label = isVideo ? t.watch : t.read;
    var tag = it.platform ? esc(it.platform) : (isVideo ? t.video : '');
    return '<li class="cx-media-item' + (isVideo ? ' is-video' : '') + '">' +
      '<a href="' + esc(it.url) + '" target="_blank" rel="noopener" aria-label="' + esc(label + ': ' + it.title + ' (' + it.media + ', ' + t.newTab + ')') + '">' +
        '<span class="cx-media-outlet">' +
          monoHtml(it.media) +
          '<span class="cx-media-outlet-name">' + esc(it.media) +
            (tag ? '<span class="cx-media-tag">' + tag + '</span>' : '') +
          '</span>' +
        '</span>' +
        '<span class="cx-media-title">' + esc(it.title) + '</span>' +
        '<time class="cx-media-date" datetime="' + esc((it.date || '').slice(0, 10)) + '">' + shortDate(it.date, lang, t) + '</time>' +
        '<span class="cx-media-ext" aria-hidden="true">' + ICON.external + '</span>' +
      '</a>' +
    '</li>';
  }

  function featuredHtml(f, t) {
    return '<figure class="cx-media-featured">' +
      '<video controls preload="none" playsinline poster="' + esc(asset(f.poster)) + '">' +
        '<source src="' + esc(asset(f.video)) + '" type="video/mp4">' +
        '<p>' + t.noVideo + ' <a href="' + esc(f.url) + '" target="_blank" rel="noopener">' + esc(t.featuredLink) + '</a></p>' +
      '</video>' +
      '<figcaption class="cx-media-featured-body">' +
        '<span class="cx-media-featured-tag">' + ICON.watch + t.featuredTag + '</span>' +
        '<p class="cx-media-featured-outlet">' + esc(f.media) + '</p>' +
        '<p class="cx-media-featured-title">' + esc(f.title) + '</p>' +
        '<p class="cx-media-featured-meta">' + fmtDate(f.date, t) + '</p>' +
        '<div class="cx-media-featured-links">' +
          '<a class="btn btn-primary btn-sm" href="' + esc(f.url) + '" target="_blank" rel="noopener">' + ICON.external + '<span>' + t.featuredLink + '</span></a>' +
          '<a class="cx-media-site" href="' + esc(f.site) + '" target="_blank" rel="noopener">' + esc(f.media) + ICON.external + '</a>' +
        '</div>' +
      '</figcaption>' +
    '</figure>';
  }

  function panelHtml(s, t, lang, active) {
    var items = sortItems(s.items || []);
    return '<section class="cx-media-panel" id="' + s.id + '" role="tabpanel" aria-labelledby="' + s.id + '-tab"' + (active ? '' : ' hidden') + '>' +
      '<h3 class="cx-media-sr">' + s.title + '</h3>' +
      (items.length
        ? '<div class="cx-media-cols" aria-hidden="true"><span>' + t.cols[0] + '</span><span>' + t.cols[1] + '</span><span>' + t.cols[2] + '</span></div>' +
          byMonth(items).map(function (g) {
            return '<div class="cx-media-group">' +
              '<h4 class="cx-media-month">' + monthLabel(g.key, t) + '<span>' + g.items.length + '</span></h4>' +
              '<ul class="cx-media-list">' + g.items.map(function (it) { return itemHtml(it, t, lang); }).join('') + '</ul>' +
            '</div>';
          }).join('')
        : '<p class="cx-media-empty">' + t.empty + '</p>') +
    '</section>';
  }

  // Host pages set <base href>, so a bare "#id" would resolve to the site
  // root; anchor on this page's own path instead.
  function tabsHtml(sections, t, activeId) {
    var here = esc(window.location.pathname);
    return '<div class="cx-media-tabs" role="tablist" aria-label="' + t.sections + '">' + sections.map(function (s) {
      var on = s.id === activeId;
      return '<a href="' + here + '#' + s.id + '" id="' + s.id + '-tab" role="tab" aria-controls="' + s.id + '"' +
        ' aria-selected="' + on + '" tabindex="' + (on ? '0' : '-1') + '">' +
        '<span>' + s.title + '<span class="cx-media-badge">' + (s.items || []).length + '</span></span></a>';
    }).join('') + '</div>';
  }

  function statsHtml(data, t) {
    var all = (data.after || []).concat(data.before || []);
    if (!all.length) return '';
    var outlets = {}, videos = 0;
    all.forEach(function (it) { outlets[outletKey(it.media)] = 1; if (it.type === 'video') videos++; });
    var n = Object.keys(outlets).length;
    var rows = [[all.length, t.stats.items(all.length)], [n, t.stats.outlets(n)]];
    if (videos) rows.push([videos, t.stats.videos(videos)]);
    return rows.map(function (r) {
      return '<div class="cx-media-stat"><dt>' + r[1] + '</dt><dd>' + r[0] + '</dd></div>';
    }).join('');
  }

  function yearsHtml(all, year, lang) {
    var years = Object.keys(all).sort().reverse();
    if (years.length < 2) return '';
    return '<nav class="cx-media-years" aria-label="' + (lang === 'en' ? 'Editions' : 'Издания') + '">' + years.map(function (y) {
      return '<a href="' + (lang === 'en' ? '/en' : '') + '/media/' + y + '/"' + (String(y) === String(year) ? ' class="active" aria-current="page"' : '') + '>' + y + '</a>';
    }).join('') + '</nav>';
  }

  // Tabs show one panel at a time; the URL hash (#coverage / #before) keeps
  // the choice linkable. Arrow keys move between tabs (ARIA tabs pattern).
  function wireTabs(root) {
    var tabs = [].slice.call(root.querySelectorAll('[role="tab"]'));
    function select(id, focus) {
      tabs.forEach(function (a) {
        var on = a.getAttribute('aria-controls') === id;
        a.setAttribute('aria-selected', String(on));
        a.tabIndex = on ? 0 : -1;
        document.getElementById(a.getAttribute('aria-controls')).hidden = !on;
        if (on && focus) a.focus();
      });
      if (window.history.replaceState) window.history.replaceState(null, '', window.location.pathname + '#' + id);
    }
    tabs.forEach(function (a, i) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        select(a.getAttribute('aria-controls'));
      });
      a.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        select(tabs[(i + d + tabs.length) % tabs.length].getAttribute('aria-controls'), true);
      });
    });
    window.addEventListener('hashchange', function () {
      var id = window.location.hash.slice(1);
      if (document.getElementById(id + '-tab')) select(id);
    });
  }

  function init(opts) {
    var lang = opts.lang === 'en' ? 'en' : 'bg';
    var t = T[lang];
    var all = window.CONNEXUS_MEDIA || {};
    var data = all[opts.year] || {};
    var root = document.getElementById('cx-media-root');
    var stats = document.querySelector('[data-media-stats]');
    var years = document.querySelector('[data-media-years]');
    if (stats) stats.innerHTML = statsHtml(data, t);
    if (years) years.outerHTML = yearsHtml(all, opts.year, lang);
    if (!root) return;
    var sections = [
      { id: 'coverage', title: t.after, items: data.after },
      { id: 'before', title: t.before, items: data.before }
    ];
    var hash = window.location.hash.slice(1);
    var activeId = sections.some(function (s) { return s.id === hash; }) ? hash : sections[0].id;
    root.innerHTML = (data.featured ? featuredHtml(data.featured, t) : '') +
      '<div class="cx-media-list-head"><p class="cx-media-kicker">' + t.listKicker + '</p>' +
        '<h2 class="cx-media-list-title">' + t.listTitle + '</h2></div>' +
      '<div class="cx-media-board">' +
        tabsHtml(sections, t, activeId) +
        sections.map(function (s) { return panelHtml(s, t, lang, s.id === activeId); }).join('') +
      '</div>';
    wireTabs(root);
    wireLogos(root);
  }

  window.Media = { init: init };
})();
