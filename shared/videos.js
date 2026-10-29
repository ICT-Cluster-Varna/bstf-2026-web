/* Conference recordings page (video/{year}/), data in data/videos.js.
   One screen, no long scroll (user 2026-10-28): title + day and hall
   switches on one line, then the player with the hall's sessions beside
   it — the open session lists its videos, only that list scrolls (the
   row of session chips was dropped 2026-10-29: its sideways scroll
   annoyed the user).
   The player shows a self-hosted thumbnail until play is pressed, so
   YouTube (youtube-nocookie) is contacted only then.
   Links: #den-N opens a day, #v-<id> opens one video (day, hall and
   session follow). Host pages set <base href>, so links use
   location.pathname. */
(function () {
  'use strict';

  var TXT = {
    bg: {
      soon: 'скоро',       pending: 'Записът на тази сесия предстои.',       prev: 'Предишно', next: 'Следващо', play: 'Пусни',
      upNext: 'Следва', nextSession: 'Следваща сесия', slides: 'Презентация (PDF)', profile: 'Профил на лектора',
      days: 'Дни на форума', halls: 'Зали', empty: 'Няма записи за тази година.'
    },
    en: {
      soon: 'soon',       pending: 'This session’s recording is coming soon.',       prev: 'Previous', next: 'Next', play: 'Play',
      upNext: 'Up next', nextSession: 'Next session', slides: 'Slides (PDF)', profile: 'Speaker profile',
      days: 'Forum days', halls: 'Halls', empty: 'No recordings for this year.'
    }
  };

  var PLAY = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>';

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
    var p = el('p', 'cx-vid-speakers');
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
    i.decoding = 'async';
    b.appendChild(i);
    if (v.dur) b.appendChild(el('span', 'cx-vid-dur', v.dur));
    return b;
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

    // where every video sits, for #v-<id> links
    var where = {};
    days.forEach(function (d, di) {
      d.halls.forEach(function (h) {
        h.sessions.forEach(function (s, si) {
          (s.videos || []).forEach(function (v, vi) { if (v.id) where[v.id] = { d: di, h: h.hall, s: si, i: vi }; });
        });
      });
    });
    // videos already on YouTube (an entry without id is announced, not uploaded)
    function ready(list) { return (list || []).filter(function (v) { return v.id; }); }
    function dayCount(d) {
      var n = 0;
      d.halls.forEach(function (h) { h.sessions.forEach(function (s) { n += ready(s.videos).length; }); });
      return n;
    }

    // ---- skeleton ----
    var top = el('div', 'cx-vid-top');
    var title = root.querySelector('.cx-vid-title');
    if (title) top.appendChild(title);
    var ctr = el('div', 'cx-vid-switches');
    var dayBox = el('div', 'cx-vid-seg');
    dayBox.setAttribute('role', 'group');
    dayBox.setAttribute('aria-label', t.days);
    var hallBox = el('div', 'cx-vid-seg');
    hallBox.setAttribute('role', 'group');
    hallBox.setAttribute('aria-label', t.halls);
    ctr.appendChild(dayBox);
    ctr.appendChild(hallBox);
    top.appendChild(ctr);
    root.insertBefore(top, root.firstChild);

    var stage = el('div', 'cx-vid-stage');
    var left = el('div', 'cx-vid-left');
    var player = el('div', 'cx-vid-player');
    var info = el('div', 'cx-vid-info');
    left.appendChild(player);
    left.appendChild(info);
    var side = el('div', 'cx-vid-side');
    stage.appendChild(left);
    stage.appendChild(side);
    root.appendChild(stage);

    // ---- state ----
    var st = { d: 0, h: null, s: null, i: 0 };
    function hallOf() {
      return days[st.d].halls.filter(function (h) { return h.hall === st.h; })[0] || days[st.d].halls[0];
    }
    // first hall of the day with videos, then its first session with videos
    function pickDefaults(keepHall) {
      var d = days[st.d];
      if (!keepHall || !d.halls.some(function (h) { return h.hall === st.h; })) {
        var withVideos = d.halls.filter(function (h) { return h.sessions.some(function (s) { return s.videos; }); })[0];
        st.h = (withVideos || d.halls[0]).hall;
      }
      var h = hallOf();
      var k = h.sessions.findIndex(function (s) { return s.videos; });
      st.s = k < 0 ? 0 : k;
      st.i = 0;
    }

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

    function setHash(h) { history.replaceState(null, '', location.pathname + '#' + h); }

    function iframe(v) {
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + v.id + '?autoplay=1&rel=0&modestbranding=1';
      f.title = v[lang];
      f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      f.allowFullscreen = true;
      f.referrerPolicy = 'strict-origin-when-cross-origin';
      return f;
    }

    function draw(play) {
      var d = days[st.d];
      seg(dayBox, days.map(function (x, i) {
        var n = dayCount(x);
        return [i, x.title[lang], n ? String(n) : ''];
      }), st.d, function (i) { st.d = i; pickDefaults(true); setHash(days[i].key); draw(false); });
      seg(hallBox, d.halls.map(function (h) { return [h.hall, (halls[h.hall] || {})[lang] || h.hall]; }), st.h,
        function (k) { st.h = k; pickDefaults(true); draw(false); });

      var h = hallOf();
      var s = h.sessions[st.s];
      side.innerHTML = '';
      player.innerHTML = '';
      info.innerHTML = '';

      // the hall's sessions in program order; the open one shows its videos
      function item(x, i) {
        if (!x.id) {
          var row = el('div', 'cx-vid-item is-soon');
          row.appendChild(el('span', 'cx-vid-n', String(i + 1)));
          var ph = el('span', 'cx-vid-thumb');
          ph.appendChild(el('span', 'cx-vid-soon', t.soon));
          row.appendChild(ph);
          var ptx = el('span', 'cx-vid-item-text');
          ptx.appendChild(el('span', 'cx-vid-item-title', x[lang]));
          if (x.speakers && x.speakers.length) ptx.appendChild(speakersLine(x.speakers, lang, false));
          row.appendChild(ptx);
          return row;
        }
        var b = button('cx-vid-item' + (i === st.i ? ' is-on' : ''));
        if (i === st.i) b.setAttribute('aria-current', 'true');
        b.appendChild(el('span', 'cx-vid-n', String(i + 1)));
        b.appendChild(thumb(x, year));
        var tx = el('span', 'cx-vid-item-text');
        tx.appendChild(el('span', 'cx-vid-item-title', x[lang]));
        if (x.speakers && x.speakers.length) tx.appendChild(speakersLine(x.speakers, lang, false));
        b.appendChild(tx);
        b.addEventListener('click', function () { st.i = i; draw(true); });
        return b;
      }
      if (s && s.videos && (!s.videos[st.i] || !s.videos[st.i].id)) st.i = s.videos.indexOf(ready(s.videos)[0]);
      h.sessions.forEach(function (x, k) {
        var open = k === st.s && x.videos;
        var head = x.videos ? button('cx-vid-sess' + (open ? ' is-on' : '')) : el('div', 'cx-vid-sess is-soon');
        if (x.videos) {
          head.setAttribute('aria-expanded', open ? 'true' : 'false');
          head.addEventListener('click', function () { st.s = k; st.i = 0; draw(false); });
        }
        head.appendChild(el('span', 'cx-vid-time', x.time));
        head.appendChild(el('span', 'cx-vid-sess-title', x[lang]));
        head.appendChild(x.videos ? el('span', 'cx-vid-sess-count', String(ready(x.videos).length)) : el('span', 'cx-vid-soon', t.soon));
        side.appendChild(head);
        if (open) {
          var group = el('div', 'cx-vid-sess-videos');
          x.videos.forEach(function (v2, i) { group.appendChild(item(v2, i)); });
          side.appendChild(group);
        }
      });

      if (!s || !s.videos) {
        var empty = el('div', 'cx-vid-pending');
        if (s) empty.appendChild(el('strong', null, s[lang]));
        empty.appendChild(el('span', null, t.pending));
        player.appendChild(empty);
        return;
      }

      var list = s.videos;
      var v = list[st.i];
      var playable = ready(list);
      var cur = side.querySelector('.cx-vid-item.is-on');
      var sh = side.querySelector('.cx-vid-sess.is-on');
      if (cur && sh) side.scrollTop = Math.max(0, Math.min(sh.offsetTop - 6, cur.offsetTop - side.clientHeight / 2 + cur.clientHeight / 2));

      if (play) {
        player.appendChild(iframe(v));
        setHash('v-' + v.id);
      } else {
        var poster = button('cx-vid-poster');
        poster.setAttribute('aria-label', t.play + ': ' + v[lang]);
        poster.appendChild(thumb(v, year));
        var ring = el('span', 'cx-vid-play');
        ring.innerHTML = PLAY;
        poster.appendChild(ring);
        poster.addEventListener('click', function () { draw(true); });
        player.appendChild(poster);
      }

      var topRow = el('div', 'cx-vid-info-top');
      topRow.appendChild(el('h2', 'cx-vid-title-now', v[lang]));
      info.appendChild(topRow);

      var nav = el('div', 'cx-vid-nav');
      var p = button('cx-vid-step', '←'), n = button('cx-vid-step', '→');
      p.setAttribute('aria-label', t.prev);
      n.setAttribute('aria-label', t.next);
      // prev/next skip announced-but-missing videos
      var pos = playable.indexOf(v);
      p.disabled = pos === 0;
      n.disabled = pos === playable.length - 1;
      p.addEventListener('click', function () { st.i = list.indexOf(playable[pos - 1]); draw(true); });
      n.addEventListener('click', function () { st.i = list.indexOf(playable[pos + 1]); draw(true); });
      nav.appendChild(p);
      nav.appendChild(el('span', 'cx-vid-count', (pos + 1) + ' / ' + playable.length));
      nav.appendChild(n);
      topRow.appendChild(nav);

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

      // up next: the next video, or the first one of the hall's next session
      var nextV = playable[pos + 1], nextS = null;
      if (!nextV) {
        for (var k = st.s + 1; k < h.sessions.length; k++) {
          if (ready(h.sessions[k].videos).length) { nextS = k; nextV = ready(h.sessions[k].videos)[0]; break; }
        }
      }
      if (nextV) {
        var nx = button('cx-vid-next');
        var thumbBox = thumb(nextV, year);
        nx.appendChild(thumbBox);
        var nt = el('span', 'cx-vid-next-text');
        nt.appendChild(el('span', 'cx-vid-next-label', nextS === null ? t.upNext : t.nextSession));
        nt.appendChild(el('span', 'cx-vid-next-title', nextV[lang]));
        nx.appendChild(nt);
        nx.addEventListener('click', function () {
          if (nextS !== null) { st.s = nextS; st.i = h.sessions[nextS].videos.indexOf(nextV); }
          else st.i = list.indexOf(nextV);
          draw(true);
        });
        extra.appendChild(nx);
      }
      info.appendChild(extra);
    }

    function route() {
      var h = location.hash.slice(1);
      if (h.indexOf('v-') === 0 && where[h.slice(2)]) {
        var w = where[h.slice(2)];
        st.d = w.d; st.h = w.h; st.s = w.s; st.i = w.i;
        draw(false);
        return;
      }
      var di = days.map(function (d) { return d.key; }).indexOf(h);
      st.d = di < 0 ? 0 : di;
      pickDefaults(false);
      draw(false);
    }
    window.addEventListener('hashchange', route);
    route();
  }

  window.Videos = { init: init };
})();
