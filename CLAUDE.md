# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BSTF2026 (Black Sea Technology Forum) — a conference/event landing page for ICT Cluster Varna. This repository contains only the **production build output**, not source code.

## Repository Structure

- `index.html` — Self-contained SPA (~500KB). React bundle (minified) + custom `<script>` block with post-render enhancements (modal, i18n, ticket card selection, scroll fixes, etc.).
- `images/` — 8 JPG background images (hero_bg, hall_wide_bg, speaker_close_bg, expo_floor_bg, audience_bg, networking_evening_bg, stage_presenter_bg, varna_seaside_bg).
- `development/` — Planning and documentation.
  - `requirements.md` — SEO/UX audit recommendations (in Bulgarian). 9 items covering i18n, sticky header, scroll fixes, CTA cleanup, etc.
  - `dev-plan.md` — Detailed implementation plan with prioritized tasks, step-by-step instructions, and dependency graph.

## Tech Stack (inferred from bundle)

- **React** (modern, bundled inline) — components: Navigation, HeroSection, ProgramAtAGlanceSection, ThreeDayArcSection, SpeakersSection, HallsAndTracksSection, TicketsAndDetailsSection, VenueAndCitySection, SideEventsSection, ExpoAndStartupsSection, ClosingAndFooterSection
- **Tailwind CSS** (fully compiled into inline `<style>` tag, mobile-first with `md:` breakpoint)
- **GSAP + ScrollTrigger** — scroll-based animations, scrub effects (pinning and snap disabled via custom fixes)
- **Vite** (inferred from module preload patterns)
- **Fonts:** Space Grotesk, Inter, IBM Plex Mono (Google Fonts)

## Site Architecture

- **Navigation:** Fixed header (`nav.fixed`, `z-index: 200`). Hash-based anchors (`#program`, `#speakers`, `#tickets`, `#venue`, `#expo`) with smooth scroll and `scroll-margin-top: 84px` offset. Nav click handlers use `history.replaceState` to update URL hash.
- **Sections (in order):** Hero → Program at a Glance → Three Day Arc → Speakers → Halls and Tracks → Tickets and Details → Venue and City → Side Events → Expo and Startups → Closing/Footer.
- **Scroll behavior:** GSAP ScrollTrigger with `pin:false` on all sections and `scrub:0.6`. No scroll snapping. Custom T7-fix CSS (`.section-pinned * { opacity:1 !important; transform:none !important; }`) prevents GSAP from hiding content on scroll-back.
- **Ticket cards:** Custom JS (`initTicketCards()`) adds `.bstf-card-wrap` class, `.active`/`.inactive` toggle, cyan outline + "Selected/Избрано" badge on active card. Uses `waitForDOM()` retry to handle React async rendering. `MutationObserver` re-initializes if React re-renders cards.
- **Registration modal:** `#bstf-overlay` (outside `#root`, `z-index: 300`). Contains form with name, email, phone, ticket type select. Opened via `openModal(ticketType)`. Dropdown options have `data-en`/`data-bg` attributes, translated by `updateModalLang()`.
- **Language:** `<html lang="bg">`, Bulgarian default. Language switcher (BG/EN toggle) in nav. `localStorage` key: `bstf-lang`. Translation engine uses TreeWalker + dictionary (300+ entries). Modal is excluded from TreeWalker to prevent native `<select>` interference.
- **CTA flow:** All "Register now" buttons (nav, hero, ticket cards, mobile sticky CTA) open the registration modal via capture-phase click interceptors. Intercept listeners skip clicks inside `#bstf-overlay`.
- **Mobile sticky CTA:** `#bstf-mob-cta` fixed at bottom, hidden on `md:` via `display:none`. IntersectionObserver hides when hero or tickets section is visible.
- **Back to Top:** `#bstf-btt` fixed button, appears after 1.5× viewport scroll, `bottom: 5rem` on mobile (above sticky CTA).
- **ICT Cluster info:** `.ict-cluster-info` injected before hero `h1`, BG/EN aware.
- **Contact:** hello@bstf2026.bg

## Custom Script Architecture

The custom `<script>` block before `</body>` contains all post-render enhancements. Key patterns:

- **Timing:** Uses `waitForDOM(testFn, cb, maxMs)` helper with 150ms polling to wait for React-rendered elements before initializing (e.g., ticket cards, mobile CTA).
- **Translation:** `applyTranslations()` uses TreeWalker on `document.body` but **excludes `#bstf-overlay`** (modal has its own ID-based translation logic). `MutationObserver` on `document.body` re-applies translations on React re-renders, also excluding overlay mutations.
- **Click interceptors:** Two capture-phase (`true`) listeners intercept "Register now" clicks in nav and hero to open modal instead of default behavior. Both have `if(e.target.closest('#bstf-overlay')) return;` guard.
- **Modal lang sync:** `updateModalLang()` updates `<option>` text from `data-bg`/`data-en` attributes. Called only from `openModal()` and language switcher click — NOT from `applyTranslations()` to avoid interfering with native `<select>` popup.

## Working with the Minified Bundle

- **Search by visible text** (e.g., "Register now", "Speakers"), not by variable names — they are mangled.
- **Add new CSS** at the end of the inline `<style>` block or as a new `<style>` element in `<head>`.
- **Add new JS** in the existing custom `<script>` block before `</body>` — do not modify the React minified code unless necessary.
- **Always `git commit` before starting a task** to enable safe rollback.
- **Test locally** with `npx serve .` and Chrome DevTools responsive mode.
- **Beware of MutationObserver loops** — any DOM change in `applyTranslations()` can trigger the transObserver. The `isTranslating` flag and overlay exclusion prevent infinite loops.
- **Native `<select>` elements** are fragile — do not rewrite option text while popup is open. Use dedicated update functions called at specific moments, not from continuous observers.

## Implementation Status (vs requirements.md)

All 9 requirements from the SEO/UX audit are implemented:

1. Bulgarian i18n (default BG, EN toggle) — done
2. Sticky header (always visible) — done
3. Back to Top button — done
4. CTA cleanup (Register now → modal) — done
5. Mobile sticky CTA — done
6. Anchor navigation with smooth scroll — done
7. Scroll optimization (no snap/pin) — done
8. Ticket card visual feedback — done
9. ICT Cluster info in hero — done

## Shared Nav/Footer Component

`index.html`, `speakers.html`, `speakers/{slug}/index.html` (see below), and `sponsors.html` no longer carry their own `<nav>`/`<footer>` markup inline. Each has an empty `<div id="site-nav-root"></div>` / `<div id="site-footer-root"></div>` placeholder, a `<script src="shared/site-chrome.js?v=YYYYMMDD">` include, and one init call: `SiteChrome.renderNav('home'|'speakers'|'speaker'|'sponsors', lang, overridePath)` / `SiteChrome.renderFooter(...)`. `shared/site-chrome.js` derives all per-page differences (in-page anchor vs `index.html#anchor` hrefs, active nav link, home-only dual white/black logo) from that single pageKey string — added 2026-08-05 to de-duplicate markup that previously had to be hand-edited in 4 places. The optional 3rd `overridePath` argument (added 2026-08-24) exists because per-speaker pages don't have one fixed filename for the BG⇄EN toggle to link to — each generated page passes its own `speakers/{slug}/` so `otherTreeLink()` builds the correct cross-language URL; every other caller omits it and falls back to the static `PAGE_FILE` map as before. The render calls must run before any other inline script that queries `.main-nav`/`.main-footer` elements (mobile-menu toggle, language toggle, copy-to-clipboard), since those still live in each page's own script and assume the elements already exist — this works because the script tags execute in document order and the render calls are placed where the old inline nav/footer markup used to be. Modal markup/JS is intentionally NOT part of this shared component (see below).

## Per-Speaker Pages (`speakers/{slug}/`, `en/speakers/{slug}/`)

As of 2026-08-24, each speaker has a real, server-delivered page at `speakers/{slug}/index.html` (BG) and `en/speakers/{slug}/index.html` (EN) — 26 speakers × 2 languages = 52 files — instead of the old single `speaker.html#slug` hash-routed page. **These files are generated, not hand-edited.** They're produced by a Node script from `data/speakers-data.js` (content) and a copy of the old `speaker.html`/`en/speaker.html` markup (CSS, modals, GTM, footer JS — all preserved verbatim as the template shell). Each page carries a per-speaker `<title>`/meta description (formula: `{Name}, лектор на CONNEXUS 2026` / `{Name}, speaker at CONNEXUS 2026`; meta description: `{Name}, {first-clause of role}, на CONNEXUS 2026, 5-7 октомври, Варна. Тема: {topic}.` and EN equivalent), per-speaker canonical/hreflang/OG tags, and a `ProfilePage`+`Person` JSON-LD block.

To add/edit a speaker: change `data/speakers-data.js` only, then re-run the generator to regenerate all 52 files (do not hand-edit files under `speakers/`/`en/speakers/` — a regeneration will silently overwrite manual edits). The generator also owns `document.title`'s language-toggle value inside each page (baked as two static strings, no runtime lookup) — this is intentionally different from `speakers.html`/`sponsors.html`, which look up their title strings from a small in-page `if` rather than a data file, because a speaker page has no equivalent small fixed set.

`speaker.html`/`en/speaker.html` still exist but are now thin **redirect shims** (`<meta name="robots" content="noindex">`): they read `location.hash` (or `?id=`) and `location.replace()` to the matching `speakers/{slug}/`, falling back to `speakers.html` if no slug is present. This preserves already-indexed/bookmarked/shared old-style links. Do not delete these two files or restore their old hash-rendering logic.

`speakers.html`/`en/speakers.html`'s speaker cards (`renderCard()`) and their `CollectionPage` JSON-LD `itemListElement[].url` fields point at the new `speakers/{slug}/` URLs — keep both in sync if the URL scheme ever changes again.

## Modals — Per-Page, Not Shared

Each page still defines its own modal markup and `openModal`/`closeModal`/focus-trap JS. `speakers.html` and every generated `speakers/{slug}/index.html` share a near-identical implementation (Tab-key focus trap, `role="dialog" aria-modal="true"`) — each of the 52 speaker pages carries its own copy, inherited verbatim from the old `speaker.html` template by the generator (see above), not shared at runtime. `index.html` has a materially different implementation (CSS closing-animation via a `.closing` class, heavier client-side validation, promo-code lookup) — its focus-trap was ported in on 2026-08-05 but the closing-animation behavior was deliberately left as index.html-only rather than reconciled across files. `sponsors.html` has 4 modals (exhibitor, contact, soldout, register) using the same focus-trap pattern as speakers.html/speakers/{slug}/. All modal "forms" are real `<form>` elements with `type="submit"` CTA buttons (as of 2026-08-05) so native `required`/`type="email"` validation fires before the existing `submitX()` fetch logic runs; the `submitX()` functions themselves are unchanged. Do not attempt to merge modal markup into `shared/site-chrome.js` without first deciding which page's JS behavior (index.html's vs. the other three's) becomes canonical.

## Parked Pages — Do Not Touch or Analyze

`participants.html` and `expo.html` are **parked/unused** — they are not live/usable pages on the current site. Do NOT edit, "fix," rebrand, or otherwise touch them, and do NOT include them in audits, reviews, or analysis passes (grep sweeps, consistency checks, etc.), even if a finding would technically apply to them. Skip them entirely unless the user explicitly names one of these two files and asks for work on it.

## Deployment

Host `index.html` and the `images/` directory together. No build step required.

## Cache-Busting (always do this automatically)

Every deployable file uses static `?v=YYYYMMDD` cache-busting query strings on scripts/styles. Whenever you edit any of these files, bump every `?v=YYYYMMDD` in it to today's date — do this automatically, without being asked:

- `expo.html` — `floorplan3d_v2.html?v=YYYYMMDD` (iframe src)
- `3d-model/floorplan3d_v2.html` — all `<script src="...?v=YYYYMMDD">` tags
- `speakers.html` — `data/speakers-data.js?v=YYYYMMDD` (`speaker.html` no longer loads this file — it's now a redirect shim, see above)
- `index.html`, `expo.html`, `speakers.html`, `sponsors.html` — `og:image`/`twitter:image` URL (`images/og-cover.jpg?v=YYYYMMDD`), only if `og-cover.jpg` itself changes
- **All local image references** (`<img src="images/...">` and CSS `background:url('images/...')`) across `index.html`, `expo.html`, and `sponsors.html` — every one carries `?v=YYYYMMDD` (added 2026-07-03, per client request since deploys are manual via Cloudflare and edge-cached images were showing stale). Bump every one of these when its file changes; new `<img>`/`url()` references to `images/` must get a `?v=YYYYMMDD` from the start.
- `index.html`, `speakers.html`, `sponsors.html` — `shared/site-chrome.js?v=YYYYMMDD` (added 2026-08-05). Bump in these 3 files, plus **re-run the speaker-page generator** (see "Per-Speaker Pages" above) whenever `shared/site-chrome.js` changes — the 52 generated files carry their own copy of this `<script src>` line and won't pick up a bump otherwise.

If a same-day edit needs a second cache-bust, append a suffix instead of faking a date, e.g. `20260702-2`.

Do NOT switch this to a dynamic `Date.now()`/`document.write()` scheme — that was tried and rejected: it disables browser caching entirely and `document.write` is a deprecated, parser-blocking pattern.

### HTML cache headers — `web.config` (IIS)

`?v=` solves stale *assets*. It cannot solve a stale **HTML document** — the HTML is the file that
*carries* the new `?v=` strings, so if it is cached the new versions are never seen. That is handled
by HTTP headers instead:

- **`web.config` at the site root is the live cache policy.** HTML (and anything else not listed
  below) is served `Cache-Control: max-age=120, must-revalidate` — the browser trusts its copy for
  2 minutes, then must re-check with the server. A revalidation that finds no change is a `304`
  with a 0-byte body, so a returning visitor never re-downloads an unchanged page, and anyone who
  comes back more than 2 minutes later always gets the current deploy.
- Do **not** read this as "the site has no cache". `no-cache`/`must-revalidate` means *revalidate*,
  not *do not store* — that would be `no-store`. Measured on the live site: full page 53 KB gzipped
  / ~190 ms, revalidation 0 bytes / ~180 ms. Almost all of that 180 ms is origin round-trip, since
  Cloudflare serves HTML as `DYNAMIC`; that is what the 2-minute window buys back for in-session
  navigation. The ~35 MB of images/videos/3d-model is never revalidated at all.
- `images/`, `videos/`, `shared/`, `data/`, `3d-model/` keep `max-age=2678400` (31 days). Safe
  because everything in them is referenced with `?v=YYYYMMDD`.
- **Exception:** `data/promo-codes.json` is on the same 2-minute policy as the HTML. `index.html`/`en/index.html` fetch it as a
  bare `fetch('data/promo-codes.json')` with no `?v=`, so under the 31-day rule an edited promo code
  would not reach a returning visitor for a month.

`.htaccess` in this repo is **inert** — the server is IIS, not Apache. Do not "fix" caching there.
The `<meta http-equiv="Cache-Control">` tags in the page `<head>`s are also inert; browsers ignore
meta cache directives for the document itself. Neither is worth removing, but neither does anything.

Verify after a deploy (expect `max-age=120, must-revalidate` on the first, `max-age=2678400` on the second):

```bash
curl -sS -o /dev/null -D - https://www.blackseatech.org/ | grep -i cache
curl -sS -o /dev/null -D - https://www.blackseatech.org/shared/site-chrome.js | grep -i cache
```

If HTML still comes back as `max-age=2592000` after `web.config` is uploaded, the value is coming
from **Cloudflare**, not the origin — set Caching → Configuration → Browser Cache TTL to
*Respect Existing Headers*, then purge the cache.


## Tag Manager (always do this automatically)

No build step exists, so the GTM container is hardcoded (script + `<noscript>` iframe) in every page rather than shared from one place. If the GTM ID `GTM-K6JDS83T` ever changes, update it in all 6 hand-authored files, plus the speaker-page template + regenerate:

- `index.html`
- `sponsors.html`
- `speakers.html`
- `speaker.html` (now a thin redirect shim, but still carries GTM)
- `participants.html`
- `expo.html`

The 52 generated `speakers/{slug}/index.html` files also carry GTM (inherited from the old `speaker.html` template at generation time) — update the ID in the generator script's template source, then re-run it, rather than hand-editing any of the 52 files.
