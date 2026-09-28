/*
 * Workshops list (workshops.html) and one workshop's page (workshop.html?id=...),
 * both rendered from data/workshops.json, plus the registration form modal.
 *
 * Usage: Workshops.init({ page: 'list' | 'detail', lang: 'bg', dataUrl: 'data/workshops.json?v=...', formUrl: 'send-email.asp' });
 */
(function () {
  'use strict';

  // Day 1 of the forum. "Day N" on the workshop page is counted from this date.
  var FORUM_START = '2026-10-05';
  var FORUM_DAYS = 3;
  var GRAPHICS_DIR = '/images/workshops/graphics/';
  var GRAPHICS_V = '20260924';
  var DEFAULT_COVER_BG = '#193852';
  var SITE = 'https://www.blackseatech.org';
  var STATUSES = { open: true, full: true, closed: true, soon: true };

  // Same checks as the site's other forms (index.html) and send-email.asp.
  var NAME_RE = /^[A-Za-zÀ-ſЀ-ӿ]{2,}([\s'-][A-Za-zÀ-ſЀ-ӿ]{2,})*$/;
  var EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
  var PHONE_RE = /^(\+[1-9]\d{6,14}|0\d{6,11})$/;

  var MONTHS = {
    bg: ['януари', 'февруари', 'март', 'април', 'май', 'юни', 'юли', 'август', 'септември', 'октомври', 'ноември', 'декември'],
    bgShort: ['яну', 'фев', 'мар', 'апр', 'май', 'юни', 'юли', 'авг', 'сеп', 'окт', 'ное', 'дек'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    enShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  };

  var T = {
    bg: {
      learnMore: 'Научи повече',
      register: 'Регистрация',
      waitlist: 'Списък с чакащи',
      closed: 'Регистрацията е затворена',
      soon: 'Регистрацията предстои',
      full: 'Няма свободни места',
      min: 'мин',
      day: 'Ден',
      seatsLeft: function (n) { return n === 1 ? '1 свободно място' : n + ' свободни места'; },
      lastSeats: function (n) { return n === 1 ? 'Последно свободно място' : 'Последни ' + n + ' места'; },
      seatsTotal: function (n) { return n === 1 ? '1 място' : n + ' места'; },
      eyebrow: 'CONNEXUS 2026 · ОБУЧЕНИЯ',
      about: 'За обучението',
      learn: 'Какво ще научите',
      audience: 'За кого е',
      bring: 'Какво да носите',
      presenter: 'Водещ',
      presenters: 'Водещи',
      seatsNote: 'Местата са ограничени. Регистрацията отнема под минута.',
      waitlistNote: 'Запишете се и ще ви уведомим, ако се освободи място.',
      newTab: '(отваря се в нов раздел)',
      back: 'Всички обучения',
      more: 'Още обучения',
      share: 'Сподели',
      copied: 'Линкът е копиран',
      pageTitle: 'Обучения на CONNEXUS 2026',
      notFound: 'Това обучение не е намерено или вече не е в програмата.',
      loadError: 'Програмата на обученията се обновява, моля опитайте по-късно.',
      regTitle: 'Регистрация за обучение',
      waitlistTitle: 'Списък с чакащи',
      submit: 'Запази място',
      submitWaitlist: 'Запиши ме в списъка с чакащи',
      sending: 'Изпращане...',
      errNameMissing: 'Моля, въведете име и фамилия.',
      errName: 'Моля, въведете истинско име (само букви).',
      errEmailMissing: 'Моля, въведете имейл.',
      errEmail: 'Моля, въведете валиден имейл адрес.',
      errPhone: 'Моля, въведете валиден телефонен номер (само цифри, 8-15 символа).',
      errConsent: 'Необходимо е съгласие, за да изпратите регистрацията.',
      errSend: 'Възникна грешка. Моля, опитайте отново.'
    },
    en: {
      learnMore: 'Learn more',
      register: 'Register',
      waitlist: 'Join waitlist',
      closed: 'Registration closed',
      soon: 'Registration opens soon',
      full: 'Fully booked',
      min: 'min',
      day: 'Day',
      seatsLeft: function (n) { return n === 1 ? '1 seat left' : n + ' seats left'; },
      lastSeats: function (n) { return n === 1 ? 'Last seat' : 'Last ' + n + ' seats'; },
      seatsTotal: function (n) { return n === 1 ? '1 seat' : n + ' seats'; },
      eyebrow: 'CONNEXUS 2026 · WORKSHOPS',
      about: 'About the workshop',
      learn: 'What you will learn',
      audience: 'Who it is for',
      bring: 'What to bring',
      presenter: 'Presenter',
      presenters: 'Presenters',
      seatsNote: 'Seats are limited. Registration takes less than a minute.',
      waitlistNote: 'Sign up and we will let you know if a seat frees up.',
      newTab: '(opens in a new tab)',
      back: 'All workshops',
      more: 'More workshops',
      share: 'Share',
      copied: 'Link copied',
      pageTitle: 'Workshops at CONNEXUS 2026',
      notFound: 'This workshop could not be found or is no longer in the programme.',
      loadError: 'The workshop programme is being updated, please try again later.',
      regTitle: 'Workshop registration',
      waitlistTitle: 'Join the waitlist',
      submit: 'Save my seat',
      submitWaitlist: 'Add me to the waitlist',
      sending: 'Sending...',
      errNameMissing: 'Please enter your full name.',
      errName: 'Please enter your real name (letters only).',
      errEmailMissing: 'Please enter your email.',
      errEmail: 'Please enter a valid email address.',
      errPhone: 'Please enter a valid phone number (digits only, 8-15 characters).',
      errConsent: 'Your consent is required to send the registration.',
      errSend: 'Something went wrong. Please try again.'
    }
  };

  var ICONS = {
    calendar: '<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    pin: '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    people: '<path d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20"/><circle cx="10" cy="8" r="3.5"/><path d="M20 20v-1.5a3.5 3.5 0 0 0-2.5-3.35"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    check: '<path d="M5 12l5 5 9-10"/>',
    back: '<path d="M19 12H5M11 18l-6-6 6-6"/>',
    share: '<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M8.2 10.8l7.6-4.4M8.2 13.2l7.6 4.4"/>',
    target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="0.8" fill="currentColor"/>',
    laptop: '<rect x="4" y="5" width="16" height="11" rx="1.5"/><path d="M2 19h20"/>'
  };

  var lang = 'bg';
  var t = T.bg;
  var opts = {};
  var settings = {};
  var topics = {};
  var halls = {};
  var list = [];
  var byId = {};

  // ---------- small helpers ----------

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // A visible text is { bg, en }; an empty or missing "en" falls back to "bg".
  // A plain string is accepted too and shown in both languages.
  function txt(v) {
    if (v == null) return '';
    if (typeof v === 'string') return v;
    if (typeof v !== 'object') return String(v);
    var en = typeof v.en === 'string' ? v.en.trim() : '';
    var bg = typeof v.bg === 'string' ? v.bg.trim() : '';
    return lang === 'en' ? (en || bg) : (bg || en);
  }

  function hasText(v) { return txt(v) !== ''; }

  function icon(name, cls) {
    return '<svg class="' + (cls || 'ws-ico') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + ICONS[name] + '</svg>';
  }

  function parseDate(s) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || '');
    if (!m) return null;
    var y = +m[1], mo = +m[2], d = +m[3];
    var dt = new Date(Date.UTC(y, mo - 1, d));
    if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== mo - 1 || dt.getUTCDate() !== d) return null;
    return { y: y, m: mo, d: d, utc: dt.getTime() };
  }

  function parseTime(s) {
    var m = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(s || '');
    return m ? (+m[1]) * 60 + (+m[2]) : null;
  }

  function shortDate(s) {
    var d = parseDate(s);
    if (!d) return s;
    return lang === 'en' ? MONTHS.enShort[d.m - 1] + ' ' + d.d : d.d + ' ' + MONTHS.bgShort[d.m - 1];
  }

  // "Ден 1 · 5 октомври" / "Day 1 · October 5"; no day prefix outside the forum days.
  function longDate(s) {
    var d = parseDate(s);
    if (!d) return s;
    var date = lang === 'en' ? MONTHS.en[d.m - 1] + ' ' + d.d : d.d + ' ' + MONTHS.bg[d.m - 1];
    var start = parseDate(FORUM_START);
    var day = Math.round((d.utc - start.utc) / 86400000) + 1;
    return day >= 1 && day <= FORUM_DAYS ? t.day + ' ' + day + ' · ' + date : date;
  }

  function timeRange(w) { return w.start + ' – ' + w.end; }
  function duration(w) { return (parseTime(w.end) - parseTime(w.start)) + ' ' + t.min; }

  function own(obj, key) { return Object.prototype.hasOwnProperty.call(obj, key); }

  function hallText(h) {
    if (typeof h === 'string') return own(halls, h) ? txt(halls[h]) : h;
    return txt(h);
  }

  function topicOf(w) { return own(topics, w.topic) ? topics[w.topic] : {}; }

  function isCssColor(s) {
    return typeof s === 'string' && /^(#[0-9a-f]{3,8}|(rgb|hsl)a?\([\d\s.,%a-z]+\)|[a-z]+)$/i.test(s.trim());
  }

  function isSafeUrl(s) {
    return typeof s === 'string' && s.trim() !== '' && !/^\s*(javascript|data|vbscript):/i.test(s);
  }

  function isLinkUrl(s) {
    return typeof s === 'string' && /^(https?:\/\/|\/)/i.test(s.trim());
  }

  function initials(name) {
    var words = String(name || '').trim().split(/\s+/).filter(Boolean);
    if (!words.length) return '?';
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
  }

  // ---------- data ----------

  function validate(w, index, seen) {
    var problems = [];
    if (!w || typeof w !== 'object') return ['not an object'];
    if (typeof w.id !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(w.id)) problems.push('"id" is missing or not a slug (latin letters, digits, dashes)');
    else if (seen[w.id]) problems.push('duplicate "id"');
    if (!parseDate(w.date)) problems.push('"date" is missing or not YYYY-MM-DD');
    var s = parseTime(w.start), e = parseTime(w.end);
    if (s === null) problems.push('"start" is missing or not HH:MM');
    if (e === null) problems.push('"end" is missing or not HH:MM');
    if (s !== null && e !== null && e <= s) problems.push('"end" is not after "start"');
    if (!(typeof w.hall === 'string' ? w.hall.trim() : hasText(w.hall))) problems.push('"hall" is missing');
    if (typeof w.topic !== 'string' || !w.topic) problems.push('"topic" is missing');
    else if (!own(topics, w.topic)) problems.push('"topic" "' + w.topic + '" is not in "topics"');
    if (!hasText(w.title)) problems.push('"title" is missing');
    if (!hasText(w.summary)) problems.push('"summary" is missing');
    if (!Array.isArray(w.presenters) || !w.presenters.length) problems.push('"presenters" is missing or empty');
    else w.presenters.forEach(function (p, i) {
      if (!p || !hasText(p.name)) problems.push('"presenters[' + i + '].name" is missing');
    });
    if (w.status != null && !STATUSES[w.status]) problems.push('"status" must be open, full, closed or soon');
    return problems;
  }

  function prepare(data) {
    settings = data.settings || {};
    topics = data.topics || {};
    halls = data.halls || {};
    var seen = {};
    var out = [];
    (Array.isArray(data.workshops) ? data.workshops : []).forEach(function (w, i) {
      if (w && w.visible === false) return;
      var problems = validate(w, i, seen);
      if (problems.length) {
        console.warn('[workshops] Skipped workshops[' + i + '] "' + (w && w.id ? w.id : '?') + '": ' + problems.join('; '));
        return;
      }
      seen[w.id] = true;
      out.push(w);
    });
    out.sort(function (a, b) {
      return a.date < b.date ? -1 : a.date > b.date ? 1 : (a.start < b.start ? -1 : a.start > b.start ? 1 : 0);
    });
    list = out;
    byId = {};
    list.forEach(function (w) { byId[w.id] = w; });
  }

  // A workshop still marked "open" with zero seats left behaves as "full".
  function statusOf(w) {
    var st = w.status || 'open';
    if (st === 'open' && w.seats && w.seats.left === 0) return 'full';
    return st;
  }

  function registrationOf(w) {
    var base = settings.registration || {};
    var r = w.registration || base;
    if (r.type === 'link') {
      if (isLinkUrl(r.url)) return { type: 'link', url: r.url.trim() };
      console.warn('[workshops] "' + w.id + '": registration.type "link" needs an http(s) "url"; using the form instead.');
    }
    // An endpoint from the JSON is relative to the site root, also on /en/ pages.
    var endpoint = r.endpoint || base.endpoint;
    return { type: 'modal', endpoint: endpoint ? new URL(endpoint, location.origin + '/').href : opts.formUrl };
  }

  // Seats label for the status row: { text, low } or null.
  function seatsInfo(w) {
    var seats = w.seats || {};
    if (typeof seats.left === 'number' && seats.left > 0) {
      return seats.left <= 3 ? { text: t.lastSeats(seats.left), low: true } : { text: t.seatsLeft(seats.left), low: false };
    }
    if (seats.left == null && typeof seats.total === 'number') return { text: t.seatsTotal(seats.total), low: false };
    return null;
  }

  // ---------- rendering ----------

  // Cover: graphic | photo | icon | color | html. Any image that fails to
  // load is removed, which leaves the "color" cover (background + dots).
  function coverHtml(w, extraClass, inner) {
    var c = w.cover && typeof w.cover === 'object' ? w.cover : { type: 'graphic' };
    var topic = topicOf(w);
    var bg = isCssColor(c.bg) ? c.bg.trim() : DEFAULT_COVER_BG;
    var media = '';
    var type = c.type || 'graphic';
    if (type === 'graphic') {
      var g = c.graphic || topic.graphic;
      if (typeof g === 'string' && /^[A-Za-z0-9_-]+$/.test(g)) {
        media = '<img class="ws-cover-graphic" src="' + GRAPHICS_DIR + g + '.svg?v=' + GRAPHICS_V + '" alt="" width="410" height="170" loading="lazy" decoding="async" data-ws-cover-img>';
      }
    } else if (type === 'photo') {
      if (isSafeUrl(c.src)) {
        var pos = typeof c.position === 'string' ? ' style="object-position:' + esc(c.position) + '"' : '';
        media = '<img class="ws-cover-photo" src="' + esc(c.src) + '" alt="' + esc(txt(c.alt)) + '" width="820" height="340" loading="lazy" decoding="async"' + pos + ' data-ws-cover-img>';
      }
    } else if (type === 'icon') {
      var src = c.src || topic.icon;
      if (isSafeUrl(src)) {
        media = '<img class="ws-cover-icon" src="' + esc(src) + '" alt="" width="96" height="96" loading="lazy" decoding="async" data-ws-cover-img>';
      }
    } else if (type === 'html') {
      if (typeof c.html === 'string') media = '<div class="ws-cover-html" aria-hidden="true">' + sanitize(c.html) + '</div>';
    } else if (type !== 'color') {
      console.warn('[workshops] "' + w.id + '": unknown cover.type "' + type + '"; using "color".');
    }
    return '<div class="ws-cover ws-cover--' + esc(type) + (extraClass ? ' ' + extraClass : '') + '" style="background-color:' + esc(bg) + '">' +
      media + (inner || '') + '</div>';
  }

  // cover.type "html" is decorative: drop scripts, embeds, SVG animations,
  // links, event handlers and any script URL (checked after removing the
  // whitespace/control characters browsers ignore inside a URL).
  function sanitize(html) {
    var tpl = document.createElement('template');
    tpl.innerHTML = html;
    var root = tpl.content;
    Array.prototype.forEach.call(root.querySelectorAll('script,iframe,frame,object,embed,link,meta,style,base,form,input,button,textarea,select,foreignObject,animate,animateMotion,animateTransform,set,use'), function (el) {
      el.parentNode.removeChild(el);
    });
    Array.prototype.forEach.call(root.querySelectorAll('a'), function (el) {
      while (el.firstChild) el.parentNode.insertBefore(el.firstChild, el);
      el.parentNode.removeChild(el);
    });
    Array.prototype.forEach.call(root.querySelectorAll('*'), function (el) {
      Array.prototype.slice.call(el.attributes).forEach(function (a) {
        var n = a.name.toLowerCase();
        var v = a.value.replace(/[\u0000-\u0020\u007f-\u009f]+/g, '').toLowerCase();
        if (n.indexOf('on') === 0 || /(^|:)href$/.test(n) || /^(javascript|vbscript|data):/.test(v)) el.removeAttribute(a.name);
      });
    });
    return tpl.innerHTML;
  }

  function avatarHtml(p, cls) {
    var name = txt(p.name);
    if (isSafeUrl(p.photo)) {
      var pos = typeof p.photoPosition === 'string' ? ' style="object-position:' + esc(p.photoPosition) + '"' : '';
      return '<img class="' + cls + '" src="' + esc(p.photo) + '" alt="' + esc(name) + '" width="96" height="96" loading="lazy" decoding="async"' + pos + ' data-ws-avatar data-initials="' + esc(initials(name)) + '">';
    }
    return '<span class="' + cls + ' ws-avatar--initials" role="img" aria-label="' + esc(name) + '">' + esc(initials(name)) + '</span>';
  }

  function metaItem(name, text) {
    return '<li>' + icon(name) + '<span>' + esc(text) + '</span></li>';
  }

  // Primary action for a card or the workshop page, driven by status and registration type.
  // inCard: the list repeats the button once per workshop, so its accessible
  // name gets the workshop title (the workshop page is about one workshop).
  function actionHtml(w, extraClass, inCard) {
    var st = statusOf(w);
    var cls = 'ws-btn' + (extraClass ? ' ' + extraClass : '');
    var sr = inCard ? '<span class="sr-only">: ' + esc(txt(w.title)) + '</span>' : '';
    if (st === 'closed' || st === 'soon') {
      return '<button type="button" class="' + cls + ' ws-btn--disabled" disabled>' + esc(st === 'closed' ? t.closed : t.soon) + '</button>';
    }
    var full = st === 'full';
    var label = (full ? esc(t.waitlist) : esc(t.register) + icon('arrow')) + sr;
    var variant = full ? ' ws-btn--soft' : ' ws-btn--primary';
    var reg = registrationOf(w);
    if (reg.type === 'link') {
      return '<a class="' + cls + variant + '" href="' + esc(reg.url) + '" target="_blank" rel="noopener">' + label + '<span class="sr-only"> ' + esc(t.newTab) + '</span></a>';
    }
    return '<button type="button" class="' + cls + variant + '" data-ws-register="' + esc(w.id) + '"' + (full ? ' data-ws-waitlist' : '') + ' aria-haspopup="dialog">' + label + '</button>';
  }

  function statusRowHtml(w) {
    var st = statusOf(w);
    var html = '<span class="ws-chip ws-chip--dur">' + esc(duration(w)) + '</span>';
    if (st === 'full') {
      html += '<span class="ws-chip ws-chip--full">' + esc(t.full) + '</span>';
    } else if (st === 'open') {
      var s = seatsInfo(w);
      if (s) html += '<span class="ws-seats' + (s.low ? ' ws-seats--low' : '') + '">' + icon('people') + esc(s.text) + '</span>';
    }
    return html;
  }

  // Relative on purpose: <base href> makes it /workshop.html or /en/workshop.html.
  function detailUrl(id) { return 'workshop.html?id=' + encodeURIComponent(id); }

  function cardHtml(w) {
    var ps = w.presenters;
    var names = ps.map(function (p) { return txt(p.name); }).join(', ');
    var role = txt(ps[0].role);
    var titleId = 'ws-card-title-' + w.id;
    return '<article class="ws-card" id="ws-card-' + esc(w.id) + '" aria-labelledby="' + esc(titleId) + '">' +
      coverHtml(w, '') +
      '<div class="ws-card-body">' +
      '<div class="ws-presenter-row">' +
      '<div class="ws-avatars' + (ps.length > 1 ? ' ws-avatars--multi' : '') + '">' + ps.map(function (p) { return avatarHtml(p, 'ws-avatar'); }).join('') + '</div>' +
      '<div class="ws-presenter-text"><span class="ws-presenter-name">' + esc(names) + '</span>' +
      (role ? '<span class="ws-presenter-role">' + esc(role) + '</span>' : '') + '</div>' +
      '</div>' +
      '<ul class="ws-meta">' + metaItem('calendar', shortDate(w.date)) + metaItem('clock', timeRange(w)) + metaItem('pin', hallText(w.hall)) + '</ul>' +
      '<h3 class="ws-card-title" id="' + esc(titleId) + '">' + esc(txt(w.title)) + '</h3>' +
      '<p class="ws-card-summary">' + esc(txt(w.summary)) + '</p>' +
      '<div class="ws-card-spacer"></div>' +
      '<div class="ws-status-row">' + statusRowHtml(w) + '</div>' +
      '<div class="ws-actions">' +
      '<a class="ws-btn ws-btn--outline" href="' + esc(detailUrl(w.id)) + '">' + esc(t.learnMore) + '<span class="sr-only">: ' + esc(txt(w.title)) + '</span></a>' +
      actionHtml(w, '', true) +
      '</div>' +
      '</div>' +
      '</article>';
  }

  function detailHtml(w) {
    var d = w.details && typeof w.details === 'object' ? w.details : {};
    var st = statusOf(w);
    var seats = st === 'open' ? seatsInfo(w) : null;
    var learn = Array.isArray(d.learn) ? d.learn.filter(hasText) : [];
    var boxes = [];
    if (hasText(d.audience)) boxes.push('<div class="ws-d-box"><div class="ws-d-box-head">' + icon('target', 'ws-ico ws-ico--lg') + '<h2 class="ws-d-heading">' + esc(t.audience) + '</h2></div><p>' + esc(txt(d.audience)) + '</p></div>');
    if (hasText(d.bring)) boxes.push('<div class="ws-d-box"><div class="ws-d-box-head">' + icon('laptop', 'ws-ico ws-ico--lg') + '<h2 class="ws-d-heading">' + esc(t.bring) + '</h2></div><p>' + esc(txt(d.bring)) + '</p></div>');

    var meta = '<ul class="ws-d-meta">' +
      metaItem('calendar', longDate(w.date)) +
      metaItem('clock', timeRange(w) + ' · ' + duration(w)) +
      metaItem('pin', hallText(w.hall)) +
      (seats ? '<li class="' + (seats.low ? 'ws-d-meta--low' : '') + '">' + icon('people') + '<span>' + esc(seats.text) + '</span></li>' : '') +
      (st === 'full' ? '<li class="ws-d-meta--full"><span>' + esc(t.full) + '</span></li>' : '') +
      '</ul>';

    var people = w.presenters.map(function (p) {
      return '<div class="ws-d-person">' + avatarHtml(p, 'ws-d-avatar') +
        '<div class="ws-d-person-name">' + esc(txt(p.name)) + '</div>' +
        (hasText(p.role) ? '<div class="ws-d-person-role">' + esc(txt(p.role)) + '</div>' : '') +
        (hasText(p.bio) ? '<p class="ws-d-person-bio">' + esc(txt(p.bio)) + '</p>' : '') +
        '</div>';
    }).join('');

    var ctaHead = '';
    if (seats) ctaHead = '<div class="ws-d-cta-seats' + (seats.low ? ' ws-seats--low' : '') + '">' + icon('people', 'ws-ico ws-ico--lg') + esc(seats.text) + '</div>';
    else if (st === 'full') ctaHead = '<div class="ws-d-cta-seats"><span class="ws-chip ws-chip--full">' + esc(t.full) + '</span></div>';
    var note = st === 'open' ? t.seatsNote : st === 'full' ? t.waitlistNote : '';

    return '<article class="ws-detail" aria-labelledby="ws-detail-title">' +
      coverHtml(w, 'ws-d-cover', '<div class="ws-d-cover-text"><span class="ws-d-eyebrow">' + esc(t.eyebrow) + '</span></div>') +
      '<div class="ws-d-body">' +
      '<div class="ws-d-main">' +
      '<div class="ws-d-head"><h1 class="ws-d-title" id="ws-detail-title">' + esc(txt(w.title)) + '</h1>' + meta + '</div>' +
      '<section class="ws-d-section"><h2 class="ws-d-heading">' + esc(t.about) + '</h2><p class="ws-d-text">' + esc(txt(hasText(d.description) ? d.description : w.summary)) + '</p></section>' +
      (learn.length ? '<section class="ws-d-section ws-d-section--learn"><h2 class="ws-d-heading">' + esc(t.learn) + '</h2><ul class="ws-d-learn">' +
        learn.map(function (item) { return '<li><span class="ws-d-check">' + icon('check', 'ws-ico ws-ico--sm') + '</span><span>' + esc(txt(item)) + '</span></li>'; }).join('') +
        '</ul></section>' : '') +
      (boxes.length ? '<div class="ws-d-boxes' + (boxes.length === 1 ? ' ws-d-boxes--single' : '') + '">' + boxes.join('') + '</div>' : '') +
      '</div>' +
      '<aside class="ws-d-aside">' +
      '<div class="ws-d-presenters"><h2 class="ws-d-label">' + esc(w.presenters.length > 1 ? t.presenters : t.presenter) + '</h2>' + people + '</div>' +
      '<div class="ws-d-cta">' + ctaHead + (note ? '<p class="ws-d-cta-note">' + esc(note) + '</p>' : '') +
      '<div class="ws-d-cta-action">' + actionHtml(w, 'ws-btn--lg') + '</div>' +
      '<button type="button" class="ws-btn ws-btn--outline ws-btn--lg ws-share" data-ws-share>' + icon('share') + '<span>' + esc(t.share) + '</span></button>' +
      '<p class="sr-only" role="status" data-ws-share-status></p>' +
      '</div>' +
      '</aside>' +
      '</div>' +
      '</article>';
  }

  function detailSkeletonHtml() {
    return '<div class="ws-detail ws-skel" aria-hidden="true"><div class="ws-cover ws-d-cover"></div><div class="ws-d-body"><div class="ws-d-main">' +
      '<span class="ws-skel-line ws-skel-line--lg" style="width:80%"></span><span class="ws-skel-line ws-skel-line--lg" style="width:55%"></span>' +
      '<span class="ws-skel-line" style="width:60%"></span><span class="ws-skel-line"></span><span class="ws-skel-line" style="width:90%"></span><span class="ws-skel-line" style="width:70%"></span>' +
      '</div></div></div>';
  }

  function skeletonHtml() {
    var one = '<div class="ws-card ws-skel" aria-hidden="true"><div class="ws-cover"></div><div class="ws-card-body">' +
      '<div class="ws-presenter-row"><div class="ws-avatars"><span class="ws-avatar"></span></div><div class="ws-presenter-text"><span class="ws-skel-line" style="width:60%"></span><span class="ws-skel-line" style="width:80%"></span></div></div>' +
      '<span class="ws-skel-line" style="width:70%"></span><span class="ws-skel-line ws-skel-line--lg"></span><span class="ws-skel-line ws-skel-line--lg" style="width:75%"></span>' +
      '<span class="ws-skel-line"></span><span class="ws-skel-line" style="width:85%"></span><div class="ws-card-spacer"></div>' +
      '<div class="ws-actions"><span class="ws-skel-btn"></span><span class="ws-skel-btn"></span></div></div></div>';
    return one + one + one;
  }

  // ---------- registration modal ----------

  var current = null; // { overlay, returnTo, onClose }

  function focusables(root) {
    return Array.prototype.slice.call(
      root.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')
    ).filter(function (el) { return el.offsetParent !== null; });
  }

  function openOverlay(overlay, returnTo, onClose, focusEl) {
    if (current) closeOverlay(false);
    current = { overlay: overlay, returnTo: returnTo, onClose: onClose };
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    var dialog = overlay.querySelector('[role="dialog"]');
    (focusEl || focusables(dialog)[0] || dialog).focus();
  }

  function closeOverlay(restoreFocus) {
    if (!current) return;
    var c = current;
    current = null;
    c.overlay.classList.remove('open');
    document.body.style.overflow = '';
    if (c.onClose) c.onClose();
    if (restoreFocus !== false && c.returnTo && document.contains(c.returnTo)) c.returnTo.focus();
  }

  function bindOverlay(overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay || e.target.closest('[data-ws-close]')) closeOverlay();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (!current) return;
    if (e.key === 'Escape') { e.preventDefault(); closeOverlay(); return; }
    if (e.key !== 'Tab') return;
    var dialog = current.overlay.querySelector('[role="dialog"]');
    var items = focusables(dialog);
    if (!items.length) { e.preventDefault(); dialog.focus(); return; }
    var first = items[0], last = items[items.length - 1];
    if (!dialog.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
    else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  // Old share links pointed at the list page's modal (#workshop-<id>).
  function hashId() {
    var m = /^#workshop-(.+)$/.exec(location.hash);
    if (!m) return null;
    try { return decodeURIComponent(m[1]); } catch (e) { return null; }
  }

  // ---------- registration form ----------

  var form, fields = {};

  function fieldError(input, msg) {
    var err = document.getElementById(input.id + '-err');
    input.classList.toggle('field-invalid', !!msg);
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (err) { err.textContent = msg || ''; err.hidden = !msg; }
  }

  function checkForm() {
    var firstBad = null;
    function report(input, msg) { fieldError(input, msg); if (msg && !firstBad) firstBad = input; }
    var name = fields.name.value.trim();
    report(fields.name, fields.name.validity.valueMissing || !name ? t.errNameMissing : (!NAME_RE.test(name) ? t.errName : ''));
    var email = fields.email.value.trim();
    report(fields.email, fields.email.validity.valueMissing || !email ? t.errEmailMissing : (fields.email.validity.typeMismatch || !EMAIL_RE.test(email) ? t.errEmail : ''));
    var phone = fields.phone.value.replace(/[\s\-()]/g, '');
    var phoneBad = phone !== '' && (!PHONE_RE.test(phone) || /^(\d)\1+$/.test(phone.replace(/^\+/, '')));
    report(fields.phone, phoneBad ? t.errPhone : '');
    report(fields.consent, fields.consent.validity.valueMissing ? t.errConsent : '');
    if (firstBad) firstBad.focus();
    return !firstBad;
  }

  function openRegister(id, waitlist, returnTo) {
    var w = byId[id];
    var overlay = document.getElementById('ws-register-modal');
    if (!w || !overlay || !form) return;
    var reg = registrationOf(w);
    form.dataset.endpoint = reg.endpoint || '';
    form.elements.workshop_id.value = w.id;
    form.elements.workshop_title.value = (w.title && w.title.bg) || txt(w.title);
    form.elements.waitlist.value = waitlist ? 'true' : 'false';
    document.getElementById('ws-reg-title').textContent = waitlist ? t.waitlistTitle : t.regTitle;
    document.getElementById('ws-reg-submit').textContent = waitlist ? t.submitWaitlist : t.submit;
    document.getElementById('ws-reg-summary').innerHTML =
      '<div class="ws-reg-summary-title">' + esc(txt(w.title)) + '</div>' +
      '<ul class="ws-meta ws-meta--sm">' + metaItem('calendar', longDate(w.date)) + metaItem('clock', timeRange(w)) + metaItem('pin', hallText(w.hall)) + '</ul>' +
      (waitlist ? '<span class="ws-chip ws-chip--full">' + esc(t.waitlist) + '</span>' : '');
    ['name', 'email', 'phone', 'consent'].forEach(function (k) { fieldError(fields[k], ''); });
    var error = document.getElementById('ws-reg-error');
    error.hidden = true; error.textContent = '';
    form.hidden = false;
    document.getElementById('ws-reg-success').hidden = true;
    openOverlay(overlay, returnTo, null, fields.name);
  }

  function submitForm(e) {
    e.preventDefault();
    if (!checkForm()) return;
    var btn = document.getElementById('ws-reg-submit');
    var error = document.getElementById('ws-reg-error');
    var ticket = form.querySelector('input[name="hasTicket"]:checked');
    // TODO(workshops): send-email.asp only knows formType register / exhibitor /
    // speaker and answers {"success":false,"message":"Unknown form type"} to
    // "workshop", so until it gets a "workshop" branch this form ends in the
    // error message below. Set settings.registration.endpoint in
    // data/workshops.json to send somewhere else instead.
    var payload = {
      formType: 'workshop',
      name: fields.name.value.trim(),
      email: fields.email.value.trim(),
      phone: fields.phone.value.trim(),
      company: fields.company.value.trim(),
      hasTicket: ticket ? ticket.value : '',
      consent: 'yes',
      workshop_id: form.elements.workshop_id.value,
      workshop_title: form.elements.workshop_title.value,
      waitlist: form.elements.waitlist.value,
      lang: lang
    };
    var label = btn.textContent;
    error.hidden = true; error.textContent = '';
    btn.disabled = true; btn.textContent = t.sending;
    fetch(form.dataset.endpoint || opts.formUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(payload).toString()
    }).then(function (res) { return res.json(); }).then(function (data) {
      if (data && data.success) {
        form.reset();
        form.hidden = true;
        var ok = document.getElementById('ws-reg-success');
        ok.hidden = false;
        document.getElementById('ws-reg-success-title').focus();
      } else {
        error.textContent = t.errSend; error.hidden = false;
      }
    }).catch(function () {
      error.textContent = t.errSend; error.hidden = false;
    }).then(function () {
      btn.disabled = false; btn.textContent = label;
      // The disabled button dropped focus to <body>; put it back in the dialog.
      if (!form.hidden && (document.activeElement === document.body || !document.activeElement)) btn.focus();
    });
  }

  function initForm() {
    form = document.getElementById('ws-reg-form');
    if (!form) return;
    ['name', 'email', 'phone', 'company', 'consent'].forEach(function (k) {
      fields[k] = document.getElementById('ws-reg-' + k);
    });
    form.addEventListener('submit', submitForm);
    ['name', 'email', 'phone'].forEach(function (k) {
      fields[k].addEventListener('input', function () { fieldError(fields[k], ''); });
    });
    fields.consent.addEventListener('change', function () { fieldError(fields.consent, ''); });
  }

  // ---------- page ----------

  function renderContact() {
    var row = document.getElementById('ws-contact');
    if (!row) return;
    var email = settings.contactEmail, phone = settings.contactPhone;
    var links = [];
    if (email) links.push('<a href="mailto:' + esc(email) + '">' + esc(email) + '</a>');
    if (phone) links.push('<a href="tel:' + esc(String(phone).replace(/[^\d+]/g, '')) + '">' + esc(phone) + '</a>');
    if (!links.length) return;
    row.querySelector('[data-ws-contact-links]').innerHTML = links.join(' · ');
    row.hidden = false;
    // Keep the success screen's contacts in line with the data file.
    var ok = document.getElementById('ws-reg-success-contacts');
    if (ok) ok.innerHTML = links.join('<br>');
  }

  function showMessage(grid, text) {
    grid.innerHTML = '<p class="ws-grid-msg" role="status">' + esc(text) + '</p>';
    grid.setAttribute('aria-busy', 'false');
  }

  function render(grid) {
    if (!list.length) { showMessage(grid, t.loadError); return; }
    grid.innerHTML = list.map(cardHtml).join('');
    grid.setAttribute('aria-busy', 'false');
  }

  function onImgError(e) {
    var img = e.target;
    if (!img || img.tagName !== 'IMG') return;
    if (img.hasAttribute('data-ws-cover-img')) {
      // Falls back to the plain "color" cover.
      var cover = img.closest('.ws-cover');
      img.parentNode.removeChild(img);
      if (cover) cover.className = cover.className.replace(/ws-cover--\w+/, 'ws-cover--color');
    } else if (img.hasAttribute('data-ws-avatar')) {
      var span = document.createElement('span');
      span.className = img.className + ' ws-avatar--initials';
      span.setAttribute('role', 'img');
      span.setAttribute('aria-label', img.alt);
      span.textContent = img.getAttribute('data-initials');
      img.parentNode.replaceChild(span, img);
    }
  }

  function addHeadLink(rel, href, hreflang) {
    var l = document.createElement('link');
    l.rel = rel;
    l.href = href;
    if (hreflang) l.hreflang = hreflang;
    document.head.appendChild(l);
  }

  // The HTML carries only generic tags (one file serves every workshop), so
  // title, description, canonical and hreflang are set once the id is known.
  function setPageMeta(w) {
    document.title = txt(w.title) + ' — ' + t.pageTitle;
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', txt(w.summary));
    var q = '?id=' + encodeURIComponent(w.id);
    var bg = SITE + '/workshop.html' + q, en = SITE + '/en/workshop.html' + q;
    addHeadLink('canonical', lang === 'en' ? en : bg);
    addHeadLink('alternate', bg, 'bg');
    addHeadLink('alternate', en, 'en');
    addHeadLink('alternate', bg, 'x-default');
  }

  function share(btn) {
    var url = location.href.split('#')[0];
    var status = document.querySelector('[data-ws-share-status]');
    function copied() {
      var label = btn.querySelector('span');
      var text = label.textContent;
      label.textContent = t.copied;
      if (status) status.textContent = t.copied;
      setTimeout(function () { label.textContent = text; if (status) status.textContent = ''; }, 2000);
    }
    if (navigator.share) {
      navigator.share({ title: document.title, url: url }).catch(function () {});
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(copied, function () {});
    }
  }

  function renderDetail(root, more) {
    var id = new URLSearchParams(location.search).get('id');
    var w = id && own(byId, id) ? byId[id] : null;
    root.setAttribute('aria-busy', 'false');
    if (!w) {
      if (id) console.warn('[workshops] No visible workshop with id "' + id + '".');
      root.innerHTML = '<p class="ws-grid-msg" role="status">' + esc(list.length ? t.notFound : t.loadError) + '</p>';
    } else {
      root.innerHTML = detailHtml(w);
      setPageMeta(w);
      // On phones the action is pinned to the bottom of the screen; only when
      // there is something to press.
      var st = statusOf(w);
      var bar = document.getElementById('ws-mobilebar');
      if (bar && (st === 'open' || st === 'full')) {
        bar.innerHTML = actionHtml(w, 'ws-btn--lg');
        bar.hidden = false;
        document.body.classList.add('ws-has-mobilebar');
      }
    }
    if (more) {
      var others = list.filter(function (o) { return !w || o.id !== w.id; }).slice(0, 3);
      if (others.length) {
        more.querySelector('.ws-grid').innerHTML = others.map(cardHtml).join('');
        more.hidden = false;
      }
    }
  }

  function init(options) {
    opts = options || {};
    lang = opts.lang === 'en' ? 'en' : 'bg';
    t = T[lang];
    var detail = opts.page === 'detail';
    var root = document.getElementById(detail ? 'ws-detail' : 'ws-grid');
    if (!root) return;

    // A link to the old "Learn more" modal opens the workshop's own page.
    var legacy = !detail && hashId();
    if (legacy) { location.replace(detailUrl(legacy)); return; }

    root.innerHTML = detail ? detailSkeletonHtml() : skeletonHtml();
    root.setAttribute('aria-busy', 'true');
    initForm();

    // Image errors do not bubble, so listen in the capture phase.
    document.addEventListener('error', onImgError, true);

    var register = document.getElementById('ws-register-modal');
    if (register) bindOverlay(register);

    document.addEventListener('click', function (e) {
      var reg = e.target.closest('[data-ws-register]');
      if (reg) { openRegister(reg.getAttribute('data-ws-register'), reg.hasAttribute('data-ws-waitlist'), reg); return; }
      var sh = e.target.closest('[data-ws-share]');
      if (sh) share(sh);
    });

    // Owner edits of the JSON must reach returning visitors without a new
    // ?v= (data/ is cached for 31 days), so always revalidate; an unchanged
    // file costs a 304.
    fetch(opts.dataUrl, { cache: 'no-cache' })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (data) {
        prepare(data || {});
        if (detail) renderDetail(root, document.getElementById('ws-more'));
        else render(root);
        renderContact();
      })
      .catch(function (err) {
        console.warn('[workshops] Could not load ' + opts.dataUrl + ': ' + err.message);
        showMessage(root, t.loadError);
      });
  }

  window.Workshops = { init: init };
})();
