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
      subsNote: 'Текстът е разпознат автоматично и редактиран; преводите са машинни.',
      subsLoading: 'Зарежда се превод…', subsMore: 'Други езици (превод от YouTube)', subsNoteYt: 'Автоматични субтитри и превод от YouTube',
      fs: 'Цял екран', fsExit: 'Изход от цял екран',
      upNext: 'Следва', slides: 'Презентация (PDF)', profile: 'Профил на лектора',
      days: 'Дни на форума', halls: 'Зали', empty: 'Няма записи за тази година.'
    },
    en: {
      all: 'All', search: 'Search by name, topic…', back: 'All videos', none: 'No videos found.',
      count: function (n) { return n + (n === 1 ? ' video' : ' videos'); },
      prev: 'Previous', next: 'Next', play: 'Play',
      subs: 'Subtitles', subsOff: 'No subtitles', subsOrig: 'Original language', subsTo: 'Translate to',
      subsNote: 'Speech recognised automatically and edited; translations are machine-made.',
      subsLoading: 'Loading translation…', subsMore: 'More languages (translated by YouTube)', subsNoteYt: 'Automatic captions and translation by YouTube',
      fs: 'Full screen', fsExit: 'Exit full screen',
      upNext: 'Up next', slides: 'Slides (PDF)', profile: 'Speaker profile',
      days: 'Forum days', halls: 'Halls', empty: 'No recordings for this year.'
    }
  };

  // Subtitles (user 2026-10-29; own files 2026-10-30; hybrid 2026-11-02).
  // 1) Our own files (subtitles/{year}/{id}/*.vtt, drawn over the player): the
  //    talk's own text + bg en de it tr. Nothing is asked from YouTube. Used
  //    wherever a file exists.
  // 2) Everything else - a video without files yet (a new upload works at once)
  //    or a language we have no file for - is YouTube's own auto-caption,
  //    machine-translated by YouTube (the old behaviour). That breaks with an
  //    HTTP 429 on a network YouTube takes for automated, so it is asked for ONCE
  //    per choice (two sets 2.5 s apart: YouTube re-applies the language it
  //    remembers), never in a loop.
  // 'orig' = the talk's own language; the choice is remembered for every next video.
  var SUB_LANGS = [['bg', 'Български'], ['en', 'English'], ['de', 'Deutsch'], ['it', 'Italiano'], ['tr', 'Türkçe']];
  var YT_LANGS = [
    ['bg', 'Български'], ['en', 'English'], ['de', 'Deutsch'], ['it', 'Italiano'], ['fr', 'Français'],
    ['es', 'Español'], ['tr', 'Türkçe'], ['ru', 'Русский'], ['uk', 'Українська'], ['el', 'Ελληνικά'],
    ['ro', 'Română'], ['nl', 'Nederlands'], ['pl', 'Polski'], ['pt', 'Português'], ['ar', 'العربية'],
    ['zh-Hans', '中文'], ['ja', '日本語']
  ];
  var SUB_KEY = 'cx-video-subtitles';
  function subPref() {
    var v = 'off';
    try { v = localStorage.getItem(SUB_KEY) || 'off'; } catch (e) {}
    return v === 'orig' || YT_LANGS.some(function (l) { return l[0] === v; }) ? v : 'off';
  }
  function setSubPref(v) { try { localStorage.setItem(SUB_KEY, v); } catch (e) {} }

  // WebVTT -> [{s, e, t}] (seconds; text with \n between lines)
  function vttTime(x) {
    var p = x.trim().split(':'), sec = parseFloat(p.pop().replace(',', '.'));
    return (p.length > 1 ? +p[p.length - 2] * 3600 : 0) + (p.length ? +p[p.length - 1] * 60 : 0) + sec;
  }
  function parseVtt(txt) {
    var out = [];
    txt.replace(/\r/g, '').split(/\n\n+/).forEach(function (blk) {
      var lines = blk.split('\n'), i = 0;
      while (i < lines.length && lines[i].indexOf('-->') < 0) i++;
      if (i >= lines.length) return;
      var m = lines[i].split('-->');
      var text = lines.slice(i + 1).join('\n').replace(/<[^>]+>/g, '').trim();
      if (text) out.push({ s: vttTime(m[0]), e: vttTime(m[1].trim().split(/\s+/)[0]), t: text });
    });
    return out.sort(function (x, y) { return x.s - y.s; });
  }

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
    var subV = edition.subs ? '?v=' + edition.subs : '';

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
    // frame = what goes full screen (picture + our subtitles); box = the 16:9 picture;
    // player = what the page fills with the poster / the YouTube iframe
    var frame = el('div', 'cx-vid-frame');
    var box = el('div', 'cx-vid-player');
    var player = el('div', 'cx-vid-screen');
    var subBox = el('div', 'cx-vid-sub');
    subBox.hidden = true;
    var ov = el('div', 'cx-vid-ov');
    var ovSubs = el('div', 'cx-vid-ov-subs');
    ov.appendChild(ovSubs);
    box.appendChild(player);
    box.appendChild(subBox);
    box.appendChild(ov);
    frame.appendChild(box);
    var info = el('div', 'cx-vid-info');
    left.appendChild(frame);
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
    // YouTube is only the picture and the sound: its own captions are switched
    // off and our subtitles are drawn over it, driven by the player's clock.
    // yt = the YT.Player on screen (null until ready); ytInst = the one being
    // built, destroyed properly when the player is removed.
    var yt = null, ytInst = null, curV = null;
    function dropPlayer() {
      stopClock();
      if (ytInst) { try { ytInst.destroy(); } catch (e) {} }
      ytInst = yt = null;
      showCue(null);
    }
    function noYtCaptions(p) {
      ['captions', 'cc'].forEach(function (m) { try { p.unloadModule(m); } catch (e) {} });
    }
    // YouTube's own captions / translation: only for a choice we have no file for
    function ytWant() {
      var p = effPref(curV);
      return p === 'off' || oursFile(curV, p) ? 'off' : p;
    }
    // One choice = ONE request to YouTube (measured 2026-11-02: every setOption of the
    // captions module is exactly one timedtext request, nothing else sends any; the same
    // choice twice is two requests, going back to a language is a new request again).
    // So: the same choice is never sent twice, a run of quick clicks sends only the last
    // one, and nothing is ever retried or sent in a loop.
    function applyYt() {
      var cur = yt, v = curV, want = ytWant();
      if (!cur || !cur.setOption || !v) return;
      cur.cxDone = true;
      clearTimeout(cur.cxT);
      if (want === 'off') {
        // a loaded module is switched off with an empty track (no request); unloading it would make
        // YouTube re-apply the last language on the next load = one more request
        if (cur.cxMod) { try { cur.setOption('captions', 'track', {}); } catch (e) {} } else noYtCaptions(cur);
        cur.cxKey = ''; cur.cxGo = null;
        return;
      }
      var key = v.id + '|' + want;
      if (cur.cxKey === key) return;
      // A checked video: its talk's language is known, ONE track is asked for. A new video (language not
      // checked yet, v.track empty) gets every language asked for: a track that does not exist is ignored
      // for free (measured: 0 requests), only the real one is fetched - so a new upload in any language
      // works without anyone listing its language (measured: 1 translation request + 2 plain ones).
      var codes = v.track ? [v.track] : YT_LANGS.map(function (l) { return l[0]; });
      var tracks = codes.map(function (c) {
        var one = { languageCode: c };
        if (want !== 'orig' && want !== c) one.translationLanguage = { languageCode: want, languageName: langName(want) };
        return one;
      });
      // YouTube needs 1-2 s to translate: say so instead of showing nothing
      showCue(t.subsLoading);
      setTimeout(function () { if (!cues && subBox.textContent === t.subsLoading) showCue(null); }, 3500);
      function set() {
        if (cur !== yt || curV !== v) return;
        cur.cxKey = key;
        cur.cxLast = Date.now();
        tracks.forEach(function (one) { try { cur.setOption('captions', 'track', one); } catch (e) {} });
      }
      // at most one request per 1.2 s: the first click goes at once, a quick run keeps the last
      function send() { cur.cxT = setTimeout(set, Math.max(0, (cur.cxLast || 0) + 1200 - Date.now())); }
      if (cur.cxMod) { send(); return; }       // module already loaded: no waiting
      cur.cxMod = true;
      try { cur.loadModule('captions'); } catch (e) {}
      // go as soon as the module reports in (onApiChange, ~25 ms), at the latest after 900 ms
      cur.cxGo = function () { cur.cxGo = null; send(); };
      setTimeout(function () { if (cur.cxGo) cur.cxGo(); }, 900);
    }
    // a new choice: ours is drawn by us, YouTube's is asked for once
    function applySubs() {
      loadCues();
      if (yt) { yt.cxDone = false; applyYt(); }
    }

    // ---- our subtitles ----
    var cues = null, cueGen = 0, shown = -1, raf = 0, rdT = 0, rdAt = 0, vttCache = {};
    function effPref(v) { return v ? subPref() : 'off'; }
    // the file of our own subtitles for this choice, or null (then YouTube's own is used)
    function oursFile(v, p) {
      if (!v || !v.subs || p === 'off') return null;
      if (p === 'orig' || p === v.cc) return 'orig';
      return v.subs.indexOf(p) > -1 ? p : null;
    }
    function showCue(text) {
      subBox.textContent = '';
      subBox.hidden = !text;
      if (text) subBox.appendChild(el('span', null, text));
    }
    function cuesOf(v, file) {
      var url = 'subtitles/' + year + '/' + v.id + '/' + file + '.vtt' + subV;
      return vttCache[url] || (vttCache[url] = fetch(url).then(function (r) {
        if (!r.ok) throw new Error(r.status);
        return r.text();
      }).then(parseVtt).catch(function (e) { delete vttCache[url]; throw e; }));
    }
    // all of a video's files, in the background once its player runs (a few KB each)
    function prefetchCues() {
      var v = curV;
      if (v && v.subs) ['orig'].concat(v.subs).forEach(function (f) { cuesOf(v, f).catch(function () {}); });
    }
    function loadCues() {
      var v = curV, p = effPref(v), gen = ++cueGen;
      cues = null; shown = -1; showCue(null);
      var file = oursFile(v, p);
      if (!file) return;
      var got = cuesOf(v, file);
      got.then(function (c) {
        if (gen !== cueGen) return;
        subBox.lang = file === 'orig' ? v.cc : file;
        cues = c;
      }).catch(function () {});
    }
    // The player's clock: getCurrentTime() is delivered in steps, so between two
    // readings it is carried forward on our own clock (while playing) and
    // re-synced at every new reading; a seek is picked up at once.
    function clock() {
      var p = yt;
      if (!p || !p.getCurrentTime) return -1;
      var t = p.getCurrentTime(), now = performance.now(), st = -2, rate = 1;
      try { st = p.getPlayerState(); rate = p.getPlaybackRate() || 1; } catch (e) {}
      if (t !== rdT) { rdT = t; rdAt = now; }
      return st === 1 ? t + Math.min(now - rdAt, 350) / 1000 * rate : t;
    }
    function cueAt(t) {   // last cue starting at or before t
      var lo = 0, hi = cues.length - 1, r = -1;
      while (lo <= hi) {
        var m = (lo + hi) >> 1;
        if (cues[m].s <= t) { r = m; lo = m + 1; } else hi = m - 1;
      }
      return r;
    }
    function tick() {
      raf = requestAnimationFrame(tick);
      if (!cues || !cues.length) return;
      var t = clock(), i = t < 0 ? -1 : cueAt(t);
      if (i >= 0 && t >= cues[i].e) i = -1;
      if (i !== shown) { shown = i; showCue(i < 0 ? null : cues[i].t); }
    }
    function startClock() { if (!raf) raf = requestAnimationFrame(tick); }
    function stopClock() { if (raf) cancelAnimationFrame(raf); raf = 0; shown = -1; }

    // ---- full screen: our frame (picture + subtitles), not YouTube's button ----
    var fsOn = frame.requestFullscreen || frame.webkitRequestFullscreen;
    function inFs() { return (document.fullscreenElement || document.webkitFullscreenElement) === frame; }
    function toggleFs() {
      if (inFs()) { (document.exitFullscreen || document.webkitExitFullscreen).call(document); return; }
      var r = fsOn.call(frame);
      // phones: landscape while full screen (best effort)
      if (r && r.then) r.then(function () {
        try { screen.orientation.lock('landscape').catch(function () {}); } catch (e) {}
      }, function () {});
    }
    function onFsChange() {
      var on = inFs();
      frame.classList.toggle('is-fs', on);
      closeMenus();
      root.querySelectorAll('.cx-vid-fs').forEach(function (b) {
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
        b.title = on ? t.fsExit : t.fs;
        var lb = b.querySelector('span');
        if (lb) lb.textContent = on ? t.fsExit : t.fs;
      });
      if (!on) { try { screen.orientation.unlock(); } catch (e) {} }
    }
    document.addEventListener('fullscreenchange', onFsChange);
    document.addEventListener('webkitfullscreenchange', onFsChange);
    var FS_ICON = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    function fsButton(withLabel) {
      var b = button('cx-vid-fs');
      b.title = inFs() ? t.fsExit : t.fs;
      b.setAttribute('aria-label', t.fs);
      b.setAttribute('aria-pressed', inFs() ? 'true' : 'false');
      b.innerHTML = FS_ICON;
      if (withLabel) b.appendChild(el('span', null, inFs() ? t.fsExit : t.fs));
      b.addEventListener('click', toggleFs);
      return b;
    }

    if (fsOn) ov.appendChild(fsButton(false));

    function startPlayer(v) {
      // Another video reuses the player already on screen (loadVideoById):
      // a second player built on the same page never got its captions back.
      if (yt && yt.getIframe && player.contains(yt.getIframe())) {
        yt.cxDone = false;
        yt.loadVideoById(v.id);
        try { yt.getIframe().title = v[lang]; } catch (e) {}
        return;
      }
      dropPlayer();
      player.innerHTML = '';
      // the API builds the iframe itself
      var holder = el('div');
      player.appendChild(holder);
      withApi(function () {
        if (!holder.isConnected) return;
        var inst = ytInst = new window.YT.Player(holder, {
          host: 'https://www.youtube-nocookie.com',
          videoId: v.id,
          // fs 0: no YouTube full-screen button (ours takes the frame, with our subtitles,
          // full screen); YouTube's captions only where we have no file for the choice
          playerVars: { autoplay: 1, rel: 0, modestbranding: 1, playsinline: 1, hl: lang, cc_load_policy: ytWant() === 'off' ? 0 : 1, fs: 0, iv_load_policy: 3 },
          events: {
            onReady: function () {
              yt = inst;
              try { inst.getIframe().title = v[lang]; } catch (e) {}
              startClock();
              applyYt();
              prefetchCues();
            },
            onApiChange: function () { if (yt === inst && inst.cxGo) inst.cxGo(); },
            onStateChange: function (e) {
              // once per video: our choice (or YouTube's own "always show captions") is put right on play
              if (e.data === 1 && yt === inst && !inst.cxDone) applyYt();
            }
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
      var p = effPref(v);
      return p === v.cc ? 'orig' : p;
    }
    function subLabel(val) {
      if (val === 'off') return t.subsOff;
      if (val === 'orig') return t.subsOrig;
      return langName(val) || t.subsOff;
    }
    function langName(code) {
      var hit = YT_LANGS.filter(function (l) { return l[0] === code; })[0];
      return hit ? hit[1] : '';
    }
    function closeMenus() {
      root.querySelectorAll('.cx-vid-subs.is-open').forEach(function (m) {
        m.classList.remove('is-open');
        m.querySelector('.cx-vid-subs-btn').setAttribute('aria-expanded', 'false');
      });
    }
    // two copies of the menu: under the player, and over it in full screen
    var navSubs = null;
    function renderMenus() {
      [navSubs, ovSubs].forEach(function (h) {
        if (!h) return;
        h.innerHTML = '';
        if (curV) h.appendChild(subsMenu(h));
      });
    }
    function subsMenu(host) {
      var v = curV, cur = menuVal(v);
      var wrap = el('div', 'cx-vid-subs' + (cur === 'off' ? '' : ' is-on'));
      var trig = button('cx-vid-subs-btn');
      trig.setAttribute('aria-haspopup', 'menu');
      trig.setAttribute('aria-expanded', 'false');
      trig.title = t.subs;
      trig.appendChild(el('span', 'cx-vid-subs-cc', 'CC'));
      trig.appendChild(el('span', 'cx-vid-subs-label', subLabel(cur)));
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
          renderMenus();
          var b = host.querySelector('.cx-vid-subs-btn');
          if (b) b.focus({ preventScroll: true });
          applySubs();
        });
        return o;
      }
      var main = el('div', 'cx-vid-subs-main');
      main.appendChild(option('off', t.subsOff));
      main.appendChild(option('orig', t.subsOrig, v.cc ? v.cc.toUpperCase() : ''));
      menu.appendChild(main);
      function group(head, items) {
        if (!items.length) return;
        menu.appendChild(el('p', 'cx-vid-subs-head', head));
        var g = el('div', 'cx-vid-subs-langs');
        items.forEach(function (l) { g.appendChild(option(l[0], l[1], l[0].split('-')[0].toUpperCase())); });
        menu.appendChild(g);
      }
      // our files first; every other language is YouTube's translation
      var own = SUB_LANGS.filter(function (l) { return l[0] !== v.cc && v.subs && v.subs.indexOf(l[0]) > -1; });
      var more = YT_LANGS.filter(function (l) { return l[0] !== v.cc && !own.some(function (o) { return o[0] === l[0]; }); });
      group(t.subsTo, own);
      group(own.length ? t.subsMore : t.subsTo, more);
      menu.appendChild(el('p', 'cx-vid-subs-note', v.subs ? t.subsNote : t.subsNoteYt));
      wrap.appendChild(menu);

      trig.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = !wrap.classList.contains('is-open');
        closeMenus();
        if (open) {
          wrap.classList.add('is-open');
          trig.setAttribute('aria-expanded', 'true');
          var c = menu.querySelector('.cx-vid-subs-opt.is-on') || menu.querySelector('.cx-vid-subs-opt');
          c.focus({ preventScroll: true });
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
      loadCues();

      info.innerHTML = '';
      var topRow = el('div', 'cx-vid-info-top');
      var head = el('div', 'cx-vid-now');
      head.appendChild(el('h2', 'cx-vid-title-now', v[lang]));
      head.appendChild(el('span', 'cx-vid-meta', meta(x) + ' · ' + x.s[lang]));
      topRow.appendChild(head);
      var nav = el('div', 'cx-vid-nav');
      navSubs = el('div', 'cx-vid-subs-host');
      nav.appendChild(navSubs);
      if (fsOn) nav.appendChild(fsButton(true));
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
      renderMenus();

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
      else { dropPlayer(); player.innerHTML = ''; drawGrid(); }
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
