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

  function cfgFor(pageKey) {
    return PAGES[pageKey] || PAGES.home;
  }

  function href(cfg, anchor) {
    return cfg.isHome ? anchor : 'index.html' + anchor;
  }

  function navLinksHtml(cfg) {
    var links = [
      { key: 'program', href: href(cfg, '#program'), bg: 'Програма', en: 'Program' },
      { key: 'speakers', href: 'speakers.html', bg: 'Лектори', en: 'Speakers' },
      { key: 'sponsors', href: 'sponsors.html', bg: 'Изложители', en: 'Exhibitors' },
      { key: 'contact', href: href(cfg, '#contact'), bg: 'Контакти', en: 'Contact' }
    ];
    return links.map(function (l) {
      var cls = l.key === cfg.activeNavKey ? ' class="active"' : '';
      return '<a href="' + l.href + '"' + cls + ' data-bg="' + l.bg + '" data-en="' + l.en + '">' + l.bg + '</a>';
    }).join('');
  }

  function logoHtml(cfg) {
    if (cfg.isHome) {
      return '<a href="#" class="logo cx-nav-logo">' +
        '<img src="images/Connexus - WHITE.svg?v=20260731" alt="Connexus" class="cx-nav-logo-img cx-nav-logo-img--white">' +
        '<img src="images/Connexus - BLACK.svg?v=20260731" alt="Connexus" class="cx-nav-logo-img cx-nav-logo-img--black">' +
        '<span class="cx-nav-tagline">black sea tech forum</span>' +
        '</a>';
    }
    return '<a href="index.html" class="cx-nav-logo">' +
      '<img src="images/Connexus - BLACK.svg?v=20260731" alt="Connexus" class="cx-nav-logo-img">' +
      '<span class="cx-nav-tagline"><span class="cx-nav-tagline-inner">black sea tech forum</span></span>' +
      '</a>';
  }

  function renderNav(pageKey) {
    var root = document.getElementById('site-nav-root');
    if (!root) return;
    var cfg = cfgFor(pageKey);
    var links = navLinksHtml(cfg);
    root.outerHTML =
      '<nav class="main-nav">' +
      '<div class="nav-inner">' +
      logoHtml(cfg) +
      '<div class="nav-links">' + links + '</div>' +
      '<div class="nav-right">' +
      '<div class="lang-toggle"><button class="active" data-lang="bg">BG</button><button data-lang="en">EN</button></div>' +
      '<button id="nav-cta-btn" class="btn btn-primary btn-sm nav-register-btn" data-bg="Купи Билет" data-en="Buy Ticket">Купи Билет</button>' +
      '<button class="mobile-menu-btn" aria-label="Menu"><span></span><span></span><span></span></button>' +
      '</div>' +
      '</div>' +
      '</nav>' +
      '<div class="mobile-nav-backdrop" id="mobile-nav-backdrop"></div>' +
      '<div class="mobile-nav" id="mobile-nav">' +
      links +
      '<a href="' + href(cfg, '#tickets') + '" class="btn btn-primary" style="width:100%;margin-top:16px;text-align:center;display:block" data-bg="Купи Билет" data-en="Buy Ticket">Купи Билет</a>' +
      '</div>';
  }

  function renderFooter(pageKey) {
    var root = document.getElementById('site-footer-root');
    if (!root) return;
    var cfg = cfgFor(pageKey);
    root.outerHTML =
      '<footer class="main-footer" id="contact">' +
      '<div class="container">' +
      '<div class="footer-grid">' +
      '<div class="footer-brand">' +
      '<img src="images/Connexus - WHITE.svg?v=20260731" alt="Connexus" style="height:28px;margin-bottom:14px">' +
      '<p class="footer-tagline" style="font-size:9px;font-weight:600;letter-spacing:0.6em;white-space:nowrap;color:rgba(255,255,255,0.85);margin-bottom:12px" data-bg="black sea tech forum" data-en="black sea tech forum">black sea tech forum</p>' +
      '<p style="font-size:0.75rem;color:rgba(255,255,255,0.6)" data-bg="Черноморски технологичен форум" data-en="Black Sea Technology Forum">Черноморски технологичен форум</p>' +
      '<p style="font-size:0.8rem;color:rgba(255,255,255,0.5);margin-top:8px" data-bg="Технологии от 7-мо поколение без граници" data-en="7th-gen technologies without borders">Технологии от 7-мо поколение без граници</p>' +
      '</div>' +
      '<div class="footer-col">' +
      '<h4 data-bg="Събитие" data-en="Event">Събитие</h4>' +
      '<a href="' + href(cfg, '#program') + '" data-bg="Програма" data-en="Program">Програма</a>' +
      '<a href="speakers.html" data-bg="Лектори" data-en="Speakers">Лектори</a>' +
      '<a href="' + href(cfg, '#venue') + '" data-bg="Място" data-en="Venue">Място</a>' +
      '<a href="' + href(cfg, '#tickets') + '" data-bg="Билети" data-en="Tickets">Билети</a>' +
      '<a href="sponsors.html" data-bg="Изложители" data-en="Exhibitors">Изложители</a>' +
      '<a href="' + href(cfg, '#contact') + '" data-bg="Контакти" data-en="Contact">Контакти</a>' +
      '</div>' +
      '<div class="footer-col">' +
      '<h4 data-bg="Правни" data-en="Legal">Правни</h4>' +
      '<a href="privacy-policy.html" data-bg="Политика за поверителност" data-en="Privacy Policy">Политика за поверителност</a>' +
      '<a href="terms-and-conditions.html" data-bg="Условия за ползване" data-en="Terms of Use">Условия за ползване</a>' +
      '</div>' +
      '<div class="footer-col">' +
      '<h4 data-bg="Контакт" data-en="Contact">Контакт</h4>' +
      '<div class="footer-email-row">' +
      '<a href="mailto:bstf@ictclustervarna.com">bstf@ictclustervarna.com</a>' +
      '<button type="button" class="copy-email-btn" data-email="bstf@ictclustervarna.com" aria-label="Copy email" title="Copy email"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg></button>' +
      '<span class="copy-email-msg" hidden data-bg="Копирано!" data-en="Copied!">Копирано!</span>' +
      '</div>' +
      '<a href="tel:+359876658296">+359 876 658 296</a>' +
      '<div class="footer-social" style="display:flex;gap:12px;margin-top:16px;justify-content:center">' +
      '<a href="https://www.linkedin.com/showcase/connexus-black-s%D0%B5%D0%B0-%D1%82ech-forum" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style="width:36px;height:36px;border-radius:8px;background:rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center"><svg width="18" height="18" viewBox="0 0 24 24" fill="var(--white)"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="footer-bottom">' +
      '<span data-bg="&copy; 2026 Черноморски технологичен форум. Всички права запазени." data-en="&copy; 2026 Black Sea Technology Forum. All rights reserved.">&copy; 2026 Черноморски технологичен форум. Всички права запазени.</span>' +
      '<span data-bg="Организирано от ИКТ Клъстер - Варна" data-en="Organized by ICT Cluster - Varna">Организирано от ИКТ Клъстер - Варна</span>' +
      '</div>' +
      '</div>' +
      '</footer>';
  }

  window.SiteChrome = { renderNav: renderNav, renderFooter: renderFooter };
})();
