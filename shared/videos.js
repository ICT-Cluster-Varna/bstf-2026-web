/* Conference recordings page (video/{year}/), data in data/videos.js.
   Two views (user 2026-10-29):
   - Browse: filters „Всички / Ден 1-3“ and „Всички / зала“ plus a search
     box; the matching videos in a YouTube-like grid (the page scrolls).
     Opens with Всички + Всички, i.e. every video.
   - Watch (a video is open): the player, under it the speakers, slides,
     subtitles and „Следва“; beside it the same filtered list as a queue,
     each row saying which day and hall it is from — only that list scrolls.
   The player shows a self-hosted thumbnail until play is pressed, so
   YouTube (youtube-nocookie) is contacted only then.
   Links: #den-N filters a day, #v-<id> opens one video. Host pages set
   <base href>, so links use location.pathname. */
(function () {
  'use strict';

  var TXT = {
    bg: {
      all: 'Всички', search: 'Търси по име, тема…', back: 'Всички видеа', none: 'Няма намерени видеа.',
      count: function (n) { return n + (n === 1 ? ' видео' : ' видеа'); },
      prev: 'Предишно', next: 'Следващо', play: 'Пусни',
      subs: 'Субтитри', subsOff: 'Без субтитри', subsOrig: 'Оригинален език', subsTo: 'Превод на',
      subsNote: 'Автоматични субтитри и превод от YouTube',
      subsHint: 'Ако преводът не се появи, изберете „Оригинален език“.', subsLoading: 'Зарежда се превод…',
      upNext: 'Следва', slides: 'Презентация (PDF)', profile: 'Профил на лектора',
      days: 'Дни на форума', halls: 'Зали', empty: 'Няма записи за тази година.'
    },
    en: {
      all: 'All', search: 'Search by name, topic…', back: 'All videos', none: 'No videos found.',
      count: function (n) { return n + (n === 1 ? ' video' : ' videos'); },
      prev: 'Previous', next: 'Next', play: 'Play',
      subs: 'Subtitles', subsOff: 'No subtitles', subsOrig: 'Original language', subsTo: 'Translate to',
      subsNote: 'Automatic captions and translation by YouTube',
      subsHint: 'If the translation does not appear, choose “Original language”.', subsLoading: 'Loading translation…',
      upNext: 'Up next', slides: 'Slides (PDF)', profile: 'Speaker profile',
      days: 'Forum days', halls: 'Halls', empty: 'No recordings for this year.'
    }
  };

  // Subtitles (user 2026-10-29; YouTube only, reviewer 2026-11-02): YouTube's
  // auto-captions of the talk, machine-translated by YouTube into the chosen
  // language - no files of our own to maintain, and YouTube Studio counts the
  // views per subtitle language. 'orig' = the talk's own language. The choice
  // is remembered for every next video.
  // A translation (timedtext &tlang=) answers HTTP 429 on a network YouTube
  // takes for automated, so every choice is asked for ONCE (see applySubs).
  var SUB_LANGS = [
    ['bg', 'Български'], ['en', 'English'], ['de', 'Deutsch'], ['it', 'Italiano'], ['fr', 'Français'],
    ['es', 'Español'], ['tr', 'Türkçe'], ['ru', 'Русский'], ['uk', 'Українська'], ['el', 'Ελληνικά'],
    ['ro', 'Română'], ['nl', 'Nederlands'], ['pl', 'Polski'], ['pt', 'Português'], ['ar', 'العربية'],
    ['zh-Hans', '中文'], ['ja', '日本語']
  ];
  var SUB_KEY = 'cx-video-subtitles';
  function subPref() {
    var v = 'off';
    try { v = localStorage.getItem(SUB_KEY) || 'off'; } catch (e) {}
    return v === 'orig' || SUB_LANGS.some(function (l) { return l[0] === v; }) ? v : 'off';
  }
  function langName(code) {
    var hit = SUB_LANGS.filter(function (l) { return l[0] === code; })[0];
    return hit ? hit[1] : '';
  }
  function setSubPref(v) { try { localStorage.setItem(SUB_KEY, v); } catch (e) {} }

  // The YouTube IFrame API (needed to switch subtitles) is loaded on the first
  // play only, so nothing is fetched from YouTube before someone presses play.
  var apiWaiting = null;
  function withApi(cb) {
    if (window.YT && window.YT.Player) { cb(); return; }
    if (!apiWaiting) {
      apiWaiting = [];
      var before = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = function () {
        if (before) before();
        var q = apiWaiting; apiWaiting = [];
        q.forEach(function (f) { f(); });
      };
      var s = document.createElement('script');
      s.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(s);
    }
    apiWaiting.push(cb);
  }

  var PLAY = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>';
  var LOUPE = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M20 20l-4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function button(cls, text) {
    var b = el('button', cls, text);
    b.type = 'button';
    return b;
  }

  function speakersLine(list, lang, links) {
    var p = el('span', 'cx-vid-speakers');
    (list || []).forEach(function (s, i) {
      if (i) p.appendChild(document.createTextNode(', '));
      if (links && s.slug) {
        var a = el('a', null, s[lang]);
        a.href = (lang === 'en' ? 'en/' : '') + 'speakers/' + s.slug + '/';
        p.appendChild(a);
      } else {
        p.appendChild(document.createTextNode(s[lang]));
      }
    });
    return p;
  }

  // thumbnails carry the edition's `thumbs` stamp (bump it when a thumbnail is replaced)
  var thumbV = '';
  function thumb(v, year) {
    var b = el('span', 'cx-vid-thumb');
    var i = el('img');
    i.src = 'images/video/' + year + '/' + v.id + '.jpg' + thumbV;
    i.alt = '';
    i.loading = 'lazy';
    i.decoding = 'async';
    b.appendChild(i);
    if (v.dur) b.appendChild(el('span', 'cx-vid-dur', v.dur));
    return b;
  }

  // case- and accent-insensitive text for the search
  function fold(s) {
    return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  function init(opts) {
    var lang = opts.lang === 'en' ? 'en' : 'bg', t = TXT[lang], year = opts.year;
    var root = document.getElementById('cx-videos-root');
    var edition = (window.CONNEXUS_VIDEOS || {})[year];
    var halls = window.CONNEXUS_VIDEO_HALLS || {};
    if (!root) return;
    if (!edition) { root.appendChild(el('p', 'cx-vid-empty', t.empty)); return; }
    var days = edition.days;
    thumbV = edition.thumbs ? '?v=' + edition.thumbs : '';

    // Every uploaded video in program order (day -> hall -> session -> playlist
    // order). An entry without id is announced, not uploaded: not listed.
    var ALL = [], byId = {};
    days.forEach(function (d, di) {
      d.halls.forEach(function (h) {
        h.sessions.forEach(function (s) {
          (s.videos || []).forEach(function (v) {
            if (!v.id) return;
            var info = halls[h.hall] || {};
            var x = {
              v: v, d: d, di: di, h: h.hall, s: s,
              hallName: info[lang] || h.hall,
              hallShort: (lang === 'bg' ? info.shortBg : info.shortEn) || info[lang] || h.hall
            };
            x.text = fold([v.bg, v.en, s.bg, s.en, d.title.bg, d.title.en, info.bg, info.en]
              .concat((v.speakers || []).map(function (p) { return p.bg + ' ' + p.en; })).join(' '));
            ALL.push(x);
            byId[v.id] = x;
          });
        });
      });
    });
    function meta(x) { return x.d.title[lang] + ' · ' + x.hallShort + ' · ' + x.s.time; }

    // ---- state: filters, search, open video ----
    var st = { day: 'all', hall: 'all', q: '', cur: null };
    function matches(x, ignoreDay) {
      if (!ignoreDay && st.day !== 'all' && x.di !== st.day) return false;
      if (st.hall !== 'all' && x.h !== st.hall) return false;
      if (st.q) {
        var words = fold(st.q).split(/\s+/).filter(Boolean);
        for (var i = 0; i < words.length; i++) if (x.text.indexOf(words[i]) < 0) return false;
      }
      return true;
    }
    function list() { return ALL.filter(function (x) { return matches(x); }); }

    // ---- skeleton (built once) ----
    var top = el('div', 'cx-vid-top');
    var title = root.querySelector('.cx-vid-title');
    if (title) top.appendChild(title);
    // back to the grid, shown while a video is open (kept on the title line
    // so the watch view still fits one screen)
    var back = button('cx-vid-back', '← ' + t.back);
    back.hidden = true;
    top.appendChild(back);
    root.insertBefore(top, root.firstChild);

    var bar = el('div', 'cx-vid-filters');
    var dayBox = el('div', 'cx-vid-seg');
    dayBox.setAttribute('role', 'group');
    dayBox.setAttribute('aria-label', t.days);
    var hallBox = el('div', 'cx-vid-seg');
    hallBox.setAttribute('role', 'group');
    hallBox.setAttribute('aria-label', t.halls);
    var searchBox = el('label', 'cx-vid-search');
    var loupe = el('span', 'cx-vid-search-icon');
    loupe.innerHTML = LOUPE;
    searchBox.appendChild(loupe);
    var search = el('input');
    search.type = 'search';
    search.placeholder = t.search;
    search.setAttribute('aria-label', t.search);
    searchBox.appendChild(search);
    bar.appendChild(dayBox);
    bar.appendChild(hallBox);
    bar.appendChild(searchBox);
    root.appendChild(bar);

    var browse = el('section', 'cx-vid-browse');
    var count = el('p', 'cx-vid-count');
    var grid = el('div', 'cx-vid-grid');
    browse.appendChild(count);
    browse.appendChild(grid);
    root.appendChild(browse);

    var watch = el('section', 'cx-vid-watch');
    var stage = el('div', 'cx-vid-stage');
    var left = el('div', 'cx-vid-left');
    var player = el('div', 'cx-vid-player');
    var info = el('div', 'cx-vid-info');
    left.appendChild(player);
    left.appendChild(info);
    var side = el('div', 'cx-vid-side');
    stage.appendChild(left);
    stage.appendChild(side);
    watch.appendChild(stage);
    root.appendChild(watch);

    function seg(box, items, cur, pick) {
      box.innerHTML = '';
      items.forEach(function (it) {
        var b = button(it[0] === cur ? 'is-on' : '', it[1]);
        b.setAttribute('aria-pressed', it[0] === cur ? 'true' : 'false');
        if (it[2]) b.appendChild(el('i', null, it[2]));
        b.addEventListener('click', function () { pick(it[0]); });
        box.appendChild(b);
      });
    }

    // keeps the history entry's state (the Back/Forward guard below lives in it)
    var curHash = '';
    function setHash(h) {
      curHash = h ? '#' + h : '';
      history.replaceState(history.state, '', location.pathname + curHash);
    }
    function filterHash() { return st.day === 'all' ? '' : days[st.day].key; }

    // ---- YouTube player ----
    // the YT.Player on screen (null until ready); ytInst = the one being built,
    // destroyed properly when the player is removed; curV = the open video
    var yt = null, ytInst = null, curV = null;
    function dropPlayer() {
      if (ytInst) { quiet(ytInst); try { ytInst.destroy(); } catch (e) {} }
      ytInst = yt = null;
    }
    // Before the player leaves a video: YouTube's captions off (no request) and nothing of
    // ours pending. Left on, YouTube re-applies the last language by itself on the next
    // video (measured on the Bulgarian talks: 2 translation requests before ours).
    function quiet(p) {
      clearTimeout(p.cxT);
      p.cxGo = null;
      if (p.cxMod && p.cxKey) { try { p.setOption('captions', 'track', {}); } catch (e) {} }
      p.cxKey = '';
    }
    // YouTube needs 1-2.5 s to translate (measured): the CC menu says so meanwhile
    // (nothing of ours is drawn over the player, and its iframe cannot be read)
    var busyT = 0;
    function showLoading() {
      var lb = info.querySelector('.cx-vid-subs-label');
      if (!lb) return;
      clearTimeout(busyT);
      lb.textContent = t.subsLoading;
      busyT = setTimeout(function () { lb.textContent = subLabel(menuVal(curV)); }, 2500);
    }
    // Show the remembered subtitle choice: the talk's own auto-captions, or
    // YouTube's translation of them.
    // One choice = ONE request to YouTube (measured 2026-11-02: every setOption of an
    // existing track is exactly one timedtext request, loadModule sends none, the same
    // choice twice is two requests - nothing is cached). So the same choice is never
    // sent twice, a run of quick clicks sends only the last one (at most one request
    // per 1.2 s), and nothing is retried or repeated on state/API changes. Whether it
    // worked cannot be told from here: getOption('captions', ...) reads back empty and
    // the iframe is cross-origin.
    function applySubs() {
      var cur = yt, v = curV, want = subPref();
      if (!cur || !cur.setOption || !v) return;
      cur.cxDone = true;
      clearTimeout(cur.cxT);
      if (want === 'off') {
        // a loaded module is switched off with an empty track (no request); unloading it
        // would make YouTube re-apply the last language on the next load = one more request
        if (cur.cxMod) { try { cur.setOption('captions', 'track', {}); } catch (e) {} }
        else { try { cur.unloadModule('captions'); } catch (e) {} }
        cur.cxKey = ''; cur.cxGo = null;
        return;
      }
      var key = v.id + '|' + want;
      if (cur.cxKey === key) return;
      // A checked video (v.track = the language of its YouTube track): ONE track is asked
      // for. A new one (v.track empty): every language - a track that does not exist is
      // ignored for free (measured: 0 requests), so only the real one is fetched and a new
      // upload in any language works (measured: 1 translation request + 2 plain ones).
      var codes = v.track ? [v.track] : SUB_LANGS.map(function (l) { return l[0]; });
      var tracks = codes.map(function (c) {
        var one = { languageCode: c, kind: 'asr' };
        // without languageName YouTube's own label reads "undefined"
        if (want !== 'orig' && want !== c) one.translationLanguage = { languageCode: want, languageName: langName(want) };
        return one;
      });
      function set() {
        if (cur !== yt || curV !== v) return;
        cur.cxKey = key;
        cur.cxLast = Date.now();
        tracks.forEach(function (one) { try { cur.setOption('captions', 'track', one); } catch (e) {} });
        if (want !== 'orig' && want !== v.track) showLoading();
      }
      function send() { cur.cxT = setTimeout(set, Math.max(0, (cur.cxLast || 0) + 1200 - Date.now())); }
      if (cur.cxMod) { send(); return; }
      cur.cxMod = true;
      try { cur.loadModule('captions'); } catch (e) {}
      // go when the module reports in (onApiChange), at the latest after 900 ms (measured:
      // with cc_load_policy 0 it does not report, so the first choice goes after 900 ms)
      cur.cxGo = function () { cur.cxGo = null; send(); };
      setTimeout(function () { if (cur.cxGo) cur.cxGo(); }, 900);
    }
    function startPlayer(v) {
      // Another video reuses the player already on screen (loadVideoById):
      // a second player built on the same page never got its captions back.
      if (yt && yt.getIframe && player.contains(yt.getIframe())) {
        // the remembered choice is asked for once this video plays (onStateChange)
        quiet(yt);
        yt.cxDone = false;
        yt.loadVideoById(v.id);
        try { yt.getIframe().title = v[lang]; } catch (e) {}
        return;
      }
      dropPlayer();
      player.innerHTML = '';
      // the API builds the iframe itself (attaching it to a hand-made iframe
      // left the captions module unreachable)
      var holder = el('div');
      player.appendChild(holder);
      withApi(function () {
        if (!holder.isConnected) return;
        var inst = ytInst = new window.YT.Player(holder, {
          host: 'https://www.youtube-nocookie.com',
          videoId: v.id,
          // cc_load_policy 0: captions are not forced on; the page loads the module and
          // asks for the one track it wants (see applySubs)
          playerVars: { autoplay: 1, rel: 0, modestbranding: 1, playsinline: 1, hl: lang, cc_load_policy: 0 },
          events: {
            onReady: function () {
              yt = inst;
              try { inst.getIframe().title = v[lang]; } catch (e) {}
            },
            onApiChange: function () { if (yt === inst && inst.cxGo) inst.cxGo(); },
            // once per video, when it plays: nothing is asked for a video nobody watches
            onStateChange: function (e) { if (e.data === 1 && yt === inst && !inst.cxDone) applySubs(); }
          }
        });
      });
    }
    function showPoster(v) {
      dropPlayer();
      player.innerHTML = '';
      var poster = button('cx-vid-poster');
      poster.setAttribute('aria-label', t.play + ': ' + v[lang]);
      poster.appendChild(thumb(v, year));
      var ring = el('span', 'cx-vid-play');
      ring.innerHTML = PLAY;
      poster.appendChild(ring);
      poster.addEventListener('click', function () { draw(true); });
      player.appendChild(poster);
    }

    // ---- rendering ----
    function drawFilters() {
      var dayItems = [['all', t.all, String(ALL.filter(function (x) { return matches(x, true); }).length)]];
      days.forEach(function (d, i) {
        var n = ALL.filter(function (x) { return x.di === i && matches(x, true); }).length;
        dayItems.push([i, d.title[lang], n ? String(n) : '']);
      });
      seg(dayBox, dayItems, st.day, function (k) {
        st.day = k; st.cur = null; draw(false); setHash(filterHash());
      });
      var hallItems = [['all', t.all]];
      Object.keys(halls).forEach(function (k) { hallItems.push([k, halls[k][lang]]); });
      seg(hallBox, hallItems, st.hall, function (k) {
        st.hall = k; st.cur = null; draw(false); setHash(filterHash());
      });
    }

    function drawGrid() {
      var items = list();
      count.textContent = t.count(items.length);
      grid.innerHTML = '';
      if (!items.length) { grid.appendChild(el('p', 'cx-vid-empty', t.none)); return; }
      items.forEach(function (x) {
        var card = button('cx-vid-card');
        card.appendChild(thumb(x.v, year));
        var ring = el('span', 'cx-vid-card-play');
        ring.innerHTML = PLAY;
        card.firstChild.appendChild(ring);
        card.appendChild(el('span', 'cx-vid-card-title', x.v[lang]));
        if (x.v.speakers && x.v.speakers.length) card.appendChild(speakersLine(x.v.speakers, lang, false));
        card.appendChild(el('span', 'cx-vid-meta', meta(x)));
        card.addEventListener('click', function () { open(x.v.id, true); });
        grid.appendChild(card);
      });
    }

    // ---- subtitle menu (styled popover instead of the native <select>) ----
    var CHECK = '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    var CARET = '<svg viewBox="0 0 10 6" width="10" height="6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>';
    // what the menu shows as chosen for this video (the talk's own language counts as 'orig')
    function menuVal(v) {
      var p = subPref();
      return v && p === v.cc ? 'orig' : p;
    }
    function subLabel(val) {
      if (val === 'off') return t.subsOff;
      if (val === 'orig') return t.subsOrig;
      return langName(val) || t.subsOff;
    }
    function closeMenus() {
      root.querySelectorAll('.cx-vid-subs.is-open').forEach(function (m) {
        m.classList.remove('is-open');
        m.querySelector('.cx-vid-subs-btn').setAttribute('aria-expanded', 'false');
      });
    }
    function subsMenu(v) {
      var cur = menuVal(v);
      var wrap = el('div', 'cx-vid-subs' + (cur === 'off' ? '' : ' is-on'));
      var trig = button('cx-vid-subs-btn');
      trig.setAttribute('aria-haspopup', 'menu');
      trig.setAttribute('aria-expanded', 'false');
      trig.title = t.subs;
      trig.appendChild(el('span', 'cx-vid-subs-cc', 'CC'));
      var lbl = el('span', 'cx-vid-subs-label', subLabel(cur));
      trig.appendChild(lbl);
      var caret = el('span', 'cx-vid-subs-caret');
      caret.innerHTML = CARET;
      trig.appendChild(caret);
      wrap.appendChild(trig);

      var menu = el('div', 'cx-vid-subs-menu');
      menu.setAttribute('role', 'menu');
      menu.setAttribute('aria-label', t.subs);
      function option(val, text, code) {
        var on = cur === val;
        var o = button('cx-vid-subs-opt' + (on ? ' is-on' : ''));
        o.setAttribute('role', 'menuitemradio');
        o.setAttribute('aria-checked', on ? 'true' : 'false');
        if (code) o.appendChild(el('span', 'cx-vid-subs-code', code));
        o.appendChild(el('span', 'cx-vid-subs-name', text));
        var ck = el('span', 'cx-vid-subs-check');
        ck.innerHTML = CHECK;
        o.appendChild(ck);
        o.addEventListener('click', function () {
          setSubPref(val);
          closeMenus();
          clearTimeout(busyT);
          lbl.textContent = subLabel(val);
          wrap.classList.toggle('is-on', val !== 'off');
          menu.querySelectorAll('.cx-vid-subs-opt').forEach(function (b) {
            b.classList.toggle('is-on', b === o);
            b.setAttribute('aria-checked', b === o ? 'true' : 'false');
          });
          trig.focus({ preventScroll: true });
          applySubs();
        });
        return o;
      }
      var main = el('div', 'cx-vid-subs-main');
      main.appendChild(option('off', t.subsOff));
      main.appendChild(option('orig', t.subsOrig, v.cc ? v.cc.toUpperCase() : ''));
      menu.appendChild(main);
      menu.appendChild(el('p', 'cx-vid-subs-head', t.subsTo));
      var langs = el('div', 'cx-vid-subs-langs');
      // the talk's own language is 'orig', not a translation
      SUB_LANGS.forEach(function (l) { if (l[0] !== v.cc) langs.appendChild(option(l[0], l[1], l[0].split('-')[0].toUpperCase())); });
      menu.appendChild(langs);
      menu.appendChild(el('p', 'cx-vid-subs-note', t.subsNote + '. ' + t.subsHint));
      wrap.appendChild(menu);

      trig.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = !wrap.classList.contains('is-open');
        closeMenus();
        if (open) {
          wrap.classList.add('is-open');
          trig.setAttribute('aria-expanded', 'true');
          var cur = menu.querySelector('.cx-vid-subs-opt.is-on') || menu.querySelector('.cx-vid-subs-opt');
          cur.focus({ preventScroll: true });
        }
      });
      // arrow keys move between the options
      menu.addEventListener('keydown', function (e) {
        var opts = [].slice.call(menu.querySelectorAll('.cx-vid-subs-opt'));
        var i = opts.indexOf(document.activeElement);
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); opts[Math.min(opts.length - 1, i + 1)].focus(); }
        else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); opts[Math.max(0, i - 1)].focus(); }
      });
      return wrap;
    }
    document.addEventListener('click', function (e) {
      if (!e.target.closest || !e.target.closest('.cx-vid-subs-menu')) closeMenus();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var open = root.querySelector('.cx-vid-subs.is-open .cx-vid-subs-btn');
      closeMenus();
      if (open) open.focus({ preventScroll: true });
    });

    function drawWatch(play) {
      var x = byId[st.cur];
      var v = x.v;
      curV = v;
      var items = list();
      if (items.indexOf(x) < 0) { st.day = 'all'; st.hall = 'all'; st.q = ''; search.value = ''; items = list(); drawFilters(); }
      var pos = items.indexOf(x);

      // queue = the filtered list, the open video highlighted
      side.innerHTML = '';
      side.appendChild(el('p', 'cx-vid-side-head', t.count(items.length)));
      items.forEach(function (y, i) {
        var b = button('cx-vid-item' + (y === x ? ' is-on' : ''));
        if (y === x) b.setAttribute('aria-current', 'true');
        b.appendChild(el('span', 'cx-vid-n', String(i + 1)));
        b.appendChild(thumb(y.v, year));
        var tx = el('span', 'cx-vid-item-text');
        tx.appendChild(el('span', 'cx-vid-item-title', y.v[lang]));
        if (y.v.speakers && y.v.speakers.length) tx.appendChild(speakersLine(y.v.speakers, lang, false));
        tx.appendChild(el('span', 'cx-vid-meta', y.d.title[lang] + ' · ' + y.hallShort));
        b.appendChild(tx);
        b.addEventListener('click', function () { open(y.v.id, true); });
        side.appendChild(b);
      });
      var on = side.querySelector('.cx-vid-item.is-on');
      if (on) side.scrollTop = Math.max(0, on.offsetTop - side.clientHeight / 2 + on.clientHeight / 2);

      if (play) { startPlayer(v); setHash('v-' + v.id); } else showPoster(v);

      info.innerHTML = '';
      var topRow = el('div', 'cx-vid-info-top');
      var head = el('div', 'cx-vid-now');
      head.appendChild(el('h2', 'cx-vid-title-now', v[lang]));
      head.appendChild(el('span', 'cx-vid-meta', meta(x) + ' · ' + x.s[lang]));
      topRow.appendChild(head);
      var nav = el('div', 'cx-vid-nav');
      nav.appendChild(subsMenu(v));
      var p = button('cx-vid-step', '←'), n = button('cx-vid-step', '→');
      p.setAttribute('aria-label', t.prev);
      n.setAttribute('aria-label', t.next);
      p.disabled = pos === 0;
      n.disabled = pos === items.length - 1;
      p.addEventListener('click', function () { open(items[pos - 1].v.id, true); });
      n.addEventListener('click', function () { open(items[pos + 1].v.id, true); });
      nav.appendChild(p);
      nav.appendChild(el('span', 'cx-vid-pos', (pos + 1) + ' / ' + items.length));
      nav.appendChild(n);
      topRow.appendChild(nav);
      info.appendChild(topRow);

      // what is useful while watching: who speaks, their slides, what comes next
      var extra = el('div', 'cx-vid-extra');
      (v.speakers || []).forEach(function (sp) {
        var prof = sp.slug && window.bstfGetSpeaker && window.bstfGetSpeaker(sp.slug);
        var card = el(prof ? 'a' : 'span', 'cx-vid-person');
        if (prof) {
          card.href = (lang === 'en' ? 'en/' : '') + 'speakers/' + sp.slug + '/';
          card.target = '_blank';
          card.rel = 'noopener';
          card.title = t.profile;
          var img = el('img');
          img.src = prof.img;
          img.alt = '';
          img.loading = 'lazy';
          if (prof.objectPosition) img.style.objectPosition = prof.objectPosition;
          card.appendChild(img);
        } else {
          card.appendChild(el('span', 'cx-vid-person-initial', sp[lang].replace(/^(д-р|доц\.|проф\.|инж\.|Dr\.?|Prof\.|Eng\.)\s+/i, '').charAt(0)));
        }
        var pt = el('span', 'cx-vid-person-text');
        pt.appendChild(el('span', 'cx-vid-person-name', sp[lang]));
        var role = prof && (lang === 'bg' ? prof.roleBg || prof.role : prof.role);
        if (role) pt.appendChild(el('span', 'cx-vid-person-role', role.split(' | ')[0]));
        card.appendChild(pt);
        extra.appendChild(card);
      });
      var deckUrl = v.deck && window.connexusDeckUrl && window.connexusDeckUrl(v.deck);
      if (deckUrl) {
        var deck = el('a', 'cx-vid-deck');
        deck.href = deckUrl;
        deck.target = '_blank';
        deck.rel = 'noopener';
        deck.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M9 13h6M9 17h6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        deck.appendChild(document.createTextNode(t.slides));
        extra.appendChild(deck);
      }
      var nextX = items[pos + 1];
      if (nextX) {
        var nx = button('cx-vid-next');
        nx.appendChild(thumb(nextX.v, year));
        var nt = el('span', 'cx-vid-next-text');
        nt.appendChild(el('span', 'cx-vid-next-label', t.upNext));
        nt.appendChild(el('span', 'cx-vid-next-title', nextX.v[lang]));
        nx.appendChild(nt);
        nx.addEventListener('click', function () { open(nextX.v.id, true); });
        extra.appendChild(nx);
      }
      info.appendChild(extra);
    }

    function draw(play) {
      drawFilters();
      var watching = !!(st.cur && byId[st.cur]);
      browse.hidden = watching;
      watch.hidden = !watching;
      back.hidden = !watching;
      if (watching) drawWatch(play);
      else {
        // The player stays (stopped, hidden) and the next video reuses it (loadVideoById):
        // a NEW player of a Bulgarian talk gets YouTube's remembered translation from
        // YouTube itself (measured: 2 requests, whatever the page does).
        if (yt) { quiet(yt); try { yt.stopVideo(); } catch (e) {} }
        else { dropPlayer(); player.innerHTML = ''; }
        drawGrid();
      }
    }

    function open(id, play) {
      if (!byId[id]) return;
      st.cur = id;
      draw(play);
      if (!play) setHash('v-' + id);
      window.scrollTo(0, 0);
    }
    function close() {
      st.cur = null;
      draw(false);
      setHash(filterHash());
    }

    back.addEventListener('click', close);

    var typing = null;
    search.addEventListener('input', function () {
      st.q = search.value.trim();
      clearTimeout(typing);
      typing = setTimeout(function () {
        if (st.cur) { st.cur = null; setHash(filterHash()); }
        draw(false);
      }, 120);
    });

    // Previous / next video in the current list. Before the first one, Back
    // returns to the grid. false = nothing there.
    function move(dir) {
      if (!st.cur) return false;
      var items = list(), pos = items.indexOf(byId[st.cur]);
      if (items[pos + dir]) { open(items[pos + dir].v.id, true); return true; }
      if (dir < 0) { close(); return true; }
      return false;
    }

    function route() {
      curHash = location.hash;
      var h = location.hash.slice(1);
      if (h.indexOf('v-') === 0 && byId[h.slice(2)]) { open(h.slice(2), false); return; }
      var di = days.map(function (d) { return d.key; }).indexOf(h);
      st.day = di < 0 ? 'all' : di;
      st.cur = null;
      draw(false);
    }

    // Browser / mouse Back = previous video, Forward = next video (user
    // 2026-10-29). The page keeps three history entries — [back guard,
    // current, forward guard]; landing on a guard steps the video and
    // returns to the middle. From the grid, Back leaves the page.
    // Armed on the first click/key: Chrome skips history entries a page adds
    // before the visitor has interacted with it.
    var GUARD = 'cxVideoGuard', settling = 0, armed = false;
    function guardState(n) { var o = {}; o[GUARD] = n; return o; }
    function armHistory() {
      armed = true;
      var url = location.pathname + location.hash;
      history.replaceState(guardState(-1), '', url);
      history.pushState(guardState(0), '', url);
      history.pushState(guardState(1), '', url);
      settling++;
      history.back();
    }
    window.addEventListener('popstate', function (e) {
      var g = e.state && e.state[GUARD];
      if (g === undefined || g === null) { route(); if (armed) armHistory(); return; }   // a hash typed or followed by hand
      if (g === 0) {
        if (settling) settling--;
        history.replaceState(e.state, '', location.pathname + curHash);
        return;
      }
      if (settling) return;
      if (g === -1) {
        if (move(-1)) { settling++; history.forward(); } else history.back();
      } else {
        move(1);
        settling++;
        history.back();
      }
    });
    function armOnce() {
      document.removeEventListener('pointerdown', armOnce, true);
      document.removeEventListener('keydown', armOnce, true);
      if (!armed) armHistory();
    }
    document.addEventListener('pointerdown', armOnce, true);
    document.addEventListener('keydown', armOnce, true);

    route();
  }

  window.Videos = { init: init };
})();
