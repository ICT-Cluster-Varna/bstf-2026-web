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

## Deployment

Host `index.html` and the `images/` directory together. No build step required.
