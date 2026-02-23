# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BSTF2026 (Black Sea Technology Forum) — a conference/event landing page for ICT Cluster Varna. This repository contains only the **production build output**, not source code.

## Repository Structure

- `index.html` — Self-contained SPA (~475KB). All React JS and Tailwind CSS are compiled and inlined.
- `images/` — 8 JPG background images (hero_bg, hall_wide_bg, speaker_close_bg, expo_floor_bg, audience_bg, networking_evening_bg, stage_presenter_bg, varna_seaside_bg).
- `development/` — Planning and documentation.
  - `requirements.md` — SEO/UX audit recommendations (in Bulgarian). 9 items covering i18n, sticky header, scroll fixes, CTA cleanup, etc.
  - `dev-plan.md` — Detailed implementation plan with prioritized tasks, step-by-step instructions, and dependency graph.

## Tech Stack (inferred from bundle)

- **React** (modern, bundled inline) — components: Navigation, HeroSection, ProgramAtAGlanceSection, ThreeDayArcSection, SpeakersSection, HallsAndTracksSection, TicketsAndDetailsSection, VenueAndCitySection, SideEventsSection, ExpoAndStartupsSection, ClosingAndFooterSection
- **Tailwind CSS** (fully compiled into inline `<style>` tag, mobile-first with `md:` breakpoint)
- **GSAP + ScrollTrigger** — scroll-based animations, section pinning, parallax effects
- **Vite** (inferred from module preload patterns)
- **Fonts:** Space Grotesk, Inter, IBM Plex Mono (Google Fonts)

## Site Architecture

- **Navigation:** Hash-based anchors (`#program`, `#speakers`, `#tickets`, `#venue`, `#expo`). Currently uses `position: sticky` with GSAP-controlled visibility.
- **Sections (in order):** Hero → Program at a Glance → Three Day Arc → Speakers → Halls and Tracks → Tickets and Details → Venue and City → Side Events → Expo and Startups → Closing/Footer.
- **Scroll behavior:** GSAP ScrollTrigger with scroll snapping (`scroll-snap-strictness: proximity`), section pinning, and scrub animations. This is identified as problematic — see dev plan Task 7.
- **Ticket cards:** Interactive selection with hover/active states and `aria-selected`. Current visual feedback is ambiguous (card 1 stays visually active regardless of selection).
- **Language:** `<html lang="en">`, English only. Translation infrastructure traces exist in the bundle.
- **Contact:** hello@bstf2026.bg

## Working with the Minified Bundle

- **Search by visible text** (e.g., "Get tickets", "Register", "Speakers"), not by variable names — they are mangled.
- **Add new CSS** at the end of the inline `<style>` block or as a new `<style>` element in `<head>`.
- **Add new JS** as a new `<script>` block before `</body>` — do not modify existing minified code unless necessary.
- **Always `git commit` before starting a task** to enable safe rollback.
- **Test locally** with `npx serve .` and Chrome DevTools responsive mode.

## Deployment

Host `index.html` and the `images/` directory together. No build step required.
