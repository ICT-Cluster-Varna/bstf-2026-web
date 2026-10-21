/* Media coverage page renderer: data/media.js (window.CONNEXUS_MEDIA) ->
   #cx-media-root. Host pages: media/{year}/index.html, en/media/{year}/index.html.

   Media.init({ lang: 'bg' | 'en', year: 2026 })

   The cover has no key numbers on purpose: the organizers did not want
   item/outlet counts shown as an achievement (2026-10-20).

   Renders the featured video under its own heading, then "CONNEXUS в
   медиите" and one white board: tabs (one panel at a time) and per section a table-like list,
   newest first: outlet | title | date | external icon.

   Adding a later edition = a new year key in data/media.js plus a copy of the
   two host pages under media/{year}/; the year switch in the cover appears by
   itself once there is more than one year. */
(function () {
  'use strict';

  var T = {
    bg: {
      after: 'Отразяване на форума',
      before: 'Преди форума',
      sections: 'Раздели',
      listTitle: 'CONNEXUS в медиите',
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
      after: 'Forum coverage',
      before: 'Before the forum',
      sections: 'Sections',
      listTitle: 'CONNEXUS in the media',
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
          '<ul class="cx-media-list">' + items.map(function (it) { return itemHtml(it, t, lang); }).join('') + '</ul>'
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

  // Structured data for search engines, built from the same data/media.js
  // that draws the list, so the two can never disagree: an ItemList of every
  // listed item and a VideoObject for the self-hosted featured interview.
  function structuredData(data, t, fHead) {
    var canon = (document.querySelector('link[rel="canonical"]') || {}).href || window.location.href.split('#')[0];
    var origin = canon.replace(/^(https?:\/\/[^\/]+).*$/, '$1');
    var items = sortItems(data.after || []).concat(sortItems(data.before || []));
    var nodes = [];
    if (items.length) {
      nodes.push({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        '@id': canon + '#coverage-list',
        name: t.listTitle,
        numberOfItems: items.length,
        itemListElement: items.map(function (it, i) {
          return { '@type': 'ListItem', position: i + 1, url: it.url, name: it.title };
        })
      });
    }
    var f = data.featured;
    if (f && f.video) {
      nodes.push({
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: fHead || f.title,
        description: f.title + ' (' + f.media + ')',
        thumbnailUrl: origin + asset(f.poster),
        contentUrl: origin + asset(f.video),
        uploadDate: String(f.date || '').slice(0, 10),
        inLanguage: 'bg',
        isPartOf: { '@id': canon + '#webpage' }
      });
    }
    nodes.forEach(function (n) {
      var s = document.createElement('script');
      s.type = 'application/ld+json';
      s.textContent = JSON.stringify(n).replace(/</g, '\\u003c');
      document.head.appendChild(s);
    });
  }

  function init(opts) {
    var lang = opts.lang === 'en' ? 'en' : 'bg';
    var t = T[lang];
    var all = window.CONNEXUS_MEDIA || {};
    var data = all[opts.year] || {};
    var root = document.getElementById('cx-media-root');
    var years = document.querySelector('[data-media-years]');
    if (years) years.outerHTML = yearsHtml(all, opts.year, lang);
    if (!root) return;
    var sections = [
      { id: 'coverage', title: t.after, items: data.after },
      { id: 'before', title: t.before, items: data.before }
    ];
    var hash = window.location.hash.slice(1);
    var activeId = sections.some(function (s) { return s.id === hash; }) ? hash : sections[0].id;
    var f = data.featured;
    var fHead = f && ((lang === 'en' && f.headingEn) || f.heading);
    var note = (lang === 'en' && data.noteEn) || data.note;
    root.innerHTML = (f
        ? (fHead ? '<div class="cx-media-featured-head"><h2 class="cx-media-heading">' + esc(fHead) + '</h2></div>' : '') +
          featuredHtml(f, t)
        : '') +
      '<div class="cx-media-list-head"><h2 class="cx-media-heading">' + t.listTitle + '</h2></div>' +
      '<div class="cx-media-board">' +
        tabsHtml(sections, t, activeId) +
        sections.map(function (s) { return panelHtml(s, t, lang, s.id === activeId); }).join('') +
      '</div>' +
      (note ? '<p class="cx-media-note">' + esc(note) + '</p>' : '');
    wireTabs(root);
    wireLogos(root);
    structuredData(data, t, fHead);
  }

  window.Media = { init: init };
})();
