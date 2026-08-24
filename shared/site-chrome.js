(function () {
  'use strict';

  // pageKey drives the small set of real per-page differences: whether
  // in-page anchors need an "index.html" prefix, which nav link is "active",
  // and (home only) the transparent-over-hero dual-logo nav variant.
  var PAGES = {
    home: { isHome: true, activeNavKey: null },
    speakers: { isHome: false, activeNavKey: 'speakers' },
    speaker: { isHome: false, activeNavKey: 'speakers' },
    sponsors: { isHome: false, activeNavKey: 'sponsors' }
  };

  var PAGE_FILE = {
    home: 'index.html',
    speakers: 'speakers.html',
    speaker: 'speaker.html',
    sponsors: 'sponsors.html'
  };

  function cfgFor(pageKey) {
    return PAGES[pageKey] || PAGES.home;
  }

  // Single source of truth for "which language string do I show." Nav/footer
  // render the correct text immediately from this, instead of always emitting
  // Bulgarian and relying on each page's own applyTranslations() TreeWalker to
  // flip it after the fact — that made the chrome's language correctness depend
  // on a separate script existing and running in time, with no fallback if it
  // didn't. data-bg/data-en attributes are still written on every element so
  // the existing per-page TreeWalker keeps working unchanged (it will just find
  // the text already matches and do nothing).
  function pick(bg, en, lang) {
    return lang === 'en' ? en : bg;
  }

  function href(cfg, anchor) {
    return cfg.isHome ? anchor : 'index.html' + anchor;
  }

  // The href strings built below are attacker-influenced (location.search/hash
  // come straight from the URL), so escape before they land inside an
  // HTML attribute value via outerHTML. Browsers already percent-encode the
  // characters that would break out of an attribute, but that's a platform
  // behavior, not something this file should rely on as its only defense.
  function escAttr(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // Cross-tree link for the BG/EN nav toggle: each language now lives at its
  // own URL (root = BG, /en/ = EN) instead of an in-page JS swap, so the
  // toggle must navigate to the sibling file in the other tree.
  function otherTreeLink(pageKey, lang, overridePath) {
    // overridePath is used by generated per-speaker pages (speakers/{slug}/index.html),
    // which don't have a single fixed filename in PAGE_FILE -- each slug needs its own
    // cross-language target (e.g. speakers/martin-kuvandzhiev/), not the shared 'speaker.html'.
    var file = overridePath || PAGE_FILE[pageKey] || PAGE_FILE.home;
    // Preserve the current query string and hash (e.g. legacy ?id=... links) so
    // switching language keeps you on the same selection instead of dropping back
    // to the page with nothing selected.
    var suffix = window.location.search + window.location.hash;
    return escAttr((lang === 'bg' ? 'en/' + file : '../' + file) + suffix);
  }

  function langToggleHtml(pageKey, lang, overridePath) {
    var bgHref = lang === 'bg' ? '#' : otherTreeLink(pageKey, lang, overridePath);
    var enHref = lang === 'en' ? '#' : otherTreeLink(pageKey, lang, overridePath);
    var bgCls = lang === 'bg' ? ' class="active"' : '';
    var enCls = lang === 'en' ? ' class="active"' : '';
    return '<div class="lang-toggle">' +
      '<a href="' + bgHref + '"' + bgCls + ' data-lang="bg">BG</a>' +
      '<a href="' + enHref + '"' + enCls + ' data-lang="en">EN</a>' +
      '</div>';
  }

  function navLinksHtml(cfg, lang) {
    var links = [
      { key: 'program', href: href(cfg, '#program'), bg: 'Програма', en: 'Program' },
      { key: 'speakers', href: 'speakers.html', bg: 'Лектори', en: 'Speakers' },
      { key: 'sponsors', href: 'sponsors.html', bg: 'Изложители', en: 'Exhibitors' },
      { key: 'contact', href: href(cfg, '#contact'), bg: 'Контакти', en: 'Contact' }
    ];
    return links.map(function (l) {
      var cls = l.key === cfg.activeNavKey ? ' class="active"' : '';
      return '<a href="' + l.href + '"' + cls + ' data-bg="' + l.bg + '" data-en="' + l.en + '">' + pick(l.bg, l.en, lang) + '</a>';
    }).join('');
  }

  function logoHtml(cfg) {
    if (cfg.isHome) {
      return '<a href="#" class="logo cx-nav-logo">' +
        '<img src="/images/Connexus - WHITE.svg?v=20260731" alt="Connexus" class="cx-nav-logo-img cx-nav-logo-img--white">' +
        '<img src="/images/Connexus - BLACK.svg?v=20260731" alt="Connexus" class="cx-nav-logo-img cx-nav-logo-img--black">' +
        '<span class="cx-nav-tagline">black sea tech forum</span>' +
        '</a>';
    }
    return '<a href="index.html" class="cx-nav-logo">' +
      '<img src="/images/Connexus - BLACK.svg?v=20260731" alt="Connexus" class="cx-nav-logo-img">' +
      '<span class="cx-nav-tagline"><span class="cx-nav-tagline-inner">black sea tech forum</span></span>' +
      '</a>';
  }

  function renderNav(pageKey, lang, overridePath) {
    var root = document.getElementById('site-nav-root');
    if (!root) return;
    lang = lang || 'bg';
    var cfg = cfgFor(pageKey);
    var links = navLinksHtml(cfg, lang);
    var ctaText = pick('Купи Билет', 'Buy Ticket', lang);
    root.outerHTML =
      '<nav class="main-nav">' +
      '<div class="nav-inner">' +
      logoHtml(cfg) +
      '<div class="nav-links">' + links + '</div>' +
      '<div class="nav-right">' +
      langToggleHtml(pageKey, lang, overridePath) +
      '<button id="nav-cta-btn" class="btn btn-primary btn-sm nav-register-btn" data-bg="Купи Билет" data-en="Buy Ticket">' + ctaText + '</button>' +
      '<button class="mobile-menu-btn" aria-label="Menu"><span></span><span></span><span></span></button>' +
      '</div>' +
      '</div>' +
      '</nav>' +
      '<div class="mobile-nav-backdrop" id="mobile-nav-backdrop"></div>' +
      '<div class="mobile-nav" id="mobile-nav">' +
      links +
      '<a href="' + href(cfg, '#tickets') + '" class="btn btn-primary" style="width:100%;margin-top:16px;text-align:center;display:block" data-bg="Купи Билет" data-en="Buy Ticket">' + ctaText + '</a>' +
      '</div>';
  }

  function renderFooter(pageKey, lang) {
    var root = document.getElementById('site-footer-root');
    if (!root) return;
    lang = lang || 'bg';
    var cfg = cfgFor(pageKey);
    var year = new Date().getFullYear();
    root.outerHTML =
      '<footer class="main-footer" id="contact">' +
      '<div class="container">' +
      '<div class="footer-grid">' +
      '<div class="footer-brand">' +
      '<img src="/images/Connexus - WHITE.svg?v=20260731" alt="Connexus" style="height:28px;margin-bottom:14px">' +
      '<p class="footer-tagline" style="font-size:9px;font-weight:600;letter-spacing:0.6em;white-space:nowrap;color:rgba(255,255,255,0.85);margin-bottom:12px" data-bg="black sea tech forum" data-en="black sea tech forum">black sea tech forum</p>' +
      '<p style="font-size:0.75rem;color:rgba(255,255,255,0.6)" data-bg="Черноморски технологичен форум" data-en="Black Sea Technology Forum">' + pick('Черноморски технологичен форум', 'Black Sea Technology Forum', lang) + '</p>' +
      '<p style="font-size:0.8rem;color:rgba(255,255,255,0.5);margin-top:8px" data-bg="Технологии от 7-мо поколение без граници" data-en="7th-gen technologies without borders">' + pick('Технологии от 7-мо поколение без граници', '7th-gen technologies without borders', lang) + '</p>' +
      '</div>' +
      '<div class="footer-col">' +
      '<h4 data-bg="Събитие" data-en="Event">' + pick('Събитие', 'Event', lang) + '</h4>' +
      '<a href="' + href(cfg, '#program') + '" data-bg="Програма" data-en="Program">' + pick('Програма', 'Program', lang) + '</a>' +
      '<a href="speakers.html" data-bg="Лектори" data-en="Speakers">' + pick('Лектори', 'Speakers', lang) + '</a>' +
      '<a href="' + href(cfg, '#venue') + '" data-bg="Място" data-en="Venue">' + pick('Място', 'Venue', lang) + '</a>' +
      '<a href="' + href(cfg, '#tickets') + '" data-bg="Билети" data-en="Tickets">' + pick('Билети', 'Tickets', lang) + '</a>' +
      '<a href="sponsors.html" data-bg="Изложители" data-en="Exhibitors">' + pick('Изложители', 'Exhibitors', lang) + '</a>' +
      '<a href="' + href(cfg, '#contact') + '" data-bg="Контакти" data-en="Contact">' + pick('Контакти', 'Contact', lang) + '</a>' +
      '</div>' +
      '<div class="footer-col">' +
      '<h4 data-bg="Правни" data-en="Legal">' + pick('Правни', 'Legal', lang) + '</h4>' +
      '<a href="privacy-policy.html" data-bg="Политика за поверителност" data-en="Privacy Policy">' + pick('Политика за поверителност', 'Privacy Policy', lang) + '</a>' +
      '<a href="terms-and-conditions.html" data-bg="Условия за ползване" data-en="Terms of Use">' + pick('Условия за ползване', 'Terms of Use', lang) + '</a>' +
      '</div>' +
      '<div class="footer-col">' +
      '<h4 data-bg="Контакт" data-en="Contact">' + pick('Контакт', 'Contact', lang) + '</h4>' +
      '<div class="footer-email-row">' +
      '<a href="mailto:bstf@ictclustervarna.com">bstf@ictclustervarna.com</a>' +
      '<button type="button" class="copy-email-btn" data-email="bstf@ictclustervarna.com" aria-label="Copy email" title="Copy email"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg></button>' +
      '<span class="copy-email-msg" hidden data-bg="Копирано!" data-en="Copied!">' + pick('Копирано!', 'Copied!', lang) + '</span>' +
      '</div>' +
      '<a href="tel:+359876658296">+359 876 658 296</a>' +
      '<div class="footer-social" style="display:flex;gap:12px;margin-top:16px;justify-content:center">' +
      '<a href="https://www.linkedin.com/showcase/connexus-black-s%D0%B5%D0%B0-%D1%82ech-forum" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style="width:36px;height:36px;border-radius:8px;background:rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center"><svg width="18" height="18" viewBox="0 0 24 24" fill="var(--white)"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>' +
      '<a href="https://www.facebook.com/people/Connexus-Black-Sea-Tech-Forum/61592355459711/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style="width:36px;height:36px;border-radius:8px;background:rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center"><svg width="18" height="18" viewBox="0 0 24 24" fill="var(--white)"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="footer-bottom">' +
      '<span data-bg="&copy; ' + year + ' Черноморски технологичен форум. Всички права запазени." data-en="&copy; ' + year + ' Black Sea Technology Forum. All rights reserved.">' + pick('&copy; ' + year + ' Черноморски технологичен форум. Всички права запазени.', '&copy; ' + year + ' Black Sea Technology Forum. All rights reserved.', lang) + '</span>' +
      '<span data-bg="Организирано от ИКТ Клъстер - Варна" data-en="Organized by ICT Cluster - Varna">' + pick('Организирано от ИКТ Клъстер - Варна', 'Organized by ICT Cluster - Varna', lang) + '</span>' +
      '</div>' +
      '</div>' +
      '</footer>';
  }

  window.SiteChrome = { renderNav: renderNav, renderFooter: renderFooter };
})();
