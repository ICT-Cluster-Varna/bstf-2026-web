---
name: add-speaker
description: Add a new CONNEXUS 2026 speaker end-to-end from a photo and a description (name, role/org, track, talk topic, bio, optional session details) — appends them to data/speakers-data.js, places the photo, and regenerates the per-speaker pages, the speakers.html/en/speakers.html listing JSON-LD, the Event.performer JSON-LD on index.html/en/index.html, and the sitemap.xml entries. Use when the user provides or describes a new speaker and asks to add them to the site.
argument-hint: "[speaker name] [photo file path] [bio/description]"
metadata:
  author: claudekit
  version: "1.3.0"
---

# Add Speaker

Adds one new CONNEXUS 2026 speaker across every place speaker content lives:
`data/speakers-data.js` (the single source of truth), the speaker's own page
in both languages (`speakers/{id}/index.html`, `en/speakers/{id}/index.html`),
their photo under `images/speakers/`, the hand-authored `ItemList` JSON-LD on
`speakers.html`/`en/speakers.html`, the hand-authored `Event.performer`
JSON-LD on `index.html`/`en/index.html`, and the per-speaker `<url>` entries
in `sitemap.xml`. There is no separate "speakers" database or CMS —
everything is driven off the `SPEAKERS` array in `data/speakers-data.js`, and
all of the above are **generated, not hand-edited** (see repo `CLAUDE.md`,
"Per-Speaker Pages", and this generator's own header comment for exactly
which files it owns).

`participants.html` and `expo.html` are parked/unused — don't touch or
reference them for this. `bstf-` prefixed ids/classes/localStorage keys
elsewhere in the codebase are an unrelated legacy naming remnant from before
the CONNEXUS rebrand — don't rename them and don't let them confuse you into
thinking they're related to speakers.

## What you need from the user

Ask for whatever wasn't already given. Don't invent any of these — if
something's missing or ambiguous, ask rather than guess:

1. **Full name** — native/display script (Cyrillic for Bulgarian speakers,
   Latin as-is for others) for the `name` field, and a separate Latin
   `nameEn` **only if the native name isn't already Latin** (e.g. a Bulgarian
   speaker needs both `name: 'Мартин Куванджиев'` and
   `nameEn: 'Martin Kuvandzhiev'`; a Dutch speaker whose name is already
   Latin just gets `name: 'Dr. Teade Punter'` with no `nameEn` at all — the
   generator falls back to `name` wherever `nameEn` is absent).
2. **Role / title**, matching the existing `"Title @ Org"` or
   `"Title @ Org | Second title @ Second org"` style already used throughout
   the data file (see "How role parsing works" below — the exact shape of
   this string drives several derived fields, so get it right). Set the
   `role` field to this. If the speaker's title genuinely reads differently
   per language (e.g. a Bulgarian job title vs. its English equivalent —
   most existing speakers just reuse the same, often English-leaning, title
   on both language pages, but that's not a hard rule), also set `roleBg`
   and `roleEn` — see "Optional: per-language role (roleBg/roleEn)" below.
3. **Track** — one of the existing tracks (ask, or infer from context and
   confirm), currently:
   | id | BG label | EN label |
   |---|---|---|
   | `ai` | Изкуствен интелект | Artificial Intelligence |
   | `smart-city` | Умен град | Smart City |
   | `cybersecurity` | Киберсигурност | Cybersecurity |
   | `biotech` | Биотехнологии | BioTech |
   | `marine` | Морски технологии | Marine Tech |
   | `tourism` | Туризъм | Tourism |
   | `regional-innovation-policy` | Регионални иновационни политики | Regional Innovation Policy |
   | `automation` | Автоматизация и роботика | Automation and Robotics |
   | `agritech` | Агротехнологии | AgriTech |
   | `transport` | Бъдеще на транспорта | Future of Transport |

   (This list grows over time — always check the current `TRACKS` array in
   `data/speakers-data.js` rather than trusting this table blindly.)

   Don't silently invent a new track — if the talk genuinely doesn't fit any
   existing one, say so and confirm with the user before adding a new entry
   to the `TRACKS` array (see "Adding a new track" below). This has happened
   before (the `transport` track above was added exactly this way for the
   first speaker in that space) — it's a legitimate, occasional part of this
   workflow, not something to avoid, just something to flag rather than do
   silently.
4. **Talk topic**, in BG and EN (`topicBg`/`topicEn`).
5. **Bio**, in BG and EN (`bioBg`/`bioEn` — each an array of paragraph
   strings, one entry per `<p>`). If the user only gives you one language,
   write a faithful, professional third-person adaptation in the other
   language — matching the existing voice (see several `bioEn`/`bioBg` pairs
   in `data/speakers-data.js` for tone) — **not** a literal machine
   translation, and say so explicitly when you report back what you did.
6. **A photo file** (jpg/png — see "Placing the photo" below).
7. **Optional**: a session description and key takeaways, in BG and EN
   (`sessionDescBg`/`sessionDescEn`/`takeawaysBg`/`takeawaysEn`). Only some
   speakers have these — they render as an extra "About the talk" section on
   the speaker page. Each of the two (session description, takeaways) is
   independent: a speaker can have a session description with no takeaways
   (or vice versa) and only that one sub-block renders.

## How role parsing works (read this before writing the role string)

The generator derives `<title>`/meta-description text, the `jobTitle`, and
the `worksFor` organization for the per-speaker JSON-LD **from the `role`
string itself** — there's no separate structured field for these. Verified
against ~20 real speakers with different role shapes:

- The meta-description clause is `role.split('|')[0].trim()` — the first
  `|`-segment, kept whole (not cut at `@`).
- `jobTitle` = that same first segment, cut before its first `@` if it has
  one; otherwise the whole first segment.
- `worksFor` = the first `@` found **anywhere** in the full role string
  (not just the first segment), text after it up to the next `|` or end of
  string. This is why `"Cybersecurity Compliance Director | Chair @ DIH
  Trakia"` yields `jobTitle: "Cybersecurity Compliance Director"` (no
  "Chair") but `worksFor: "DIH Trakia"` — the org comes from the *second*
  segment even though the job title comes from the first. If the role has
  no `@` anywhere, `worksFor` is omitted entirely.

So: put the primary title/org first (before any `|`), and if there's a
second affiliation, either give it its own `@Org` or just leave it as a
second job title (like `"Founder @ Encorp | Co-founder, Bitcoin Gold"`,
where the second half never surfaces in structured data at all — that's
expected, matches the existing pattern).

One existing speaker (kristina-bliznakova, `"Associate Professor @ TU Varna
| Medical University Varna"`) is a hardcoded exception in the generator
(`MULTI_ORG_OVERRIDES`) producing a `worksFor` *array* of both
organizations — this doesn't follow from the general rule above, it was a
one-off editorial call in the original hand-authored pages. Don't try to
reproduce that shape for a new speaker by role-string trickery; if you
genuinely need it, add an explicit entry to `MULTI_ORG_OVERRIDES` in
`scripts/generate-speaker-pages.js` instead.

### Honorific titles ("Dr.", "Prof.", "проф.", "доц.", "д-р")

If the speaker's name carries an honorific, the generator strips it into a
separate `honorificPrefix` JSON-LD field — but only for prefixes it
recognizes:

- BG side strips from `name`: `"д-р "`, `"проф. "`, `"доц. "`.
- EN side strips from `nameEn || name`: `"Assoc. Prof. "`, `"Prof. "`,
  `"Dr. "`.

A title not in these lists (or a Latin title like "Dr." sitting inside a BG
`name` field with no separate `nameEn`) is simply left in place, untouched,
with no `honorificPrefix` — that's correct existing behavior (e.g.
teade-punter's BG page keeps "Dr. Teade Punter" whole; only his EN page
splits off "Dr."). If you add a speaker with a title outside these two
lists, add it to `BG_TITLES`/`EN_TITLES` at the top of
`scripts/generate-speaker-pages.js`.

### Optional: per-language role (`roleBg`/`roleEn`)

Every original speaker only has a single `role` string, shown verbatim on
both the BG and EN pages (e.g. "Founder @ Encorp" appears in English even on
the Bulgarian page) — that's the default and still the simplest choice for a
new speaker with an English-only or bilingual-anyway title.

If you're given (or write) a genuinely different title per language — e.g.
speaker Hristo Hristov's `roleBg: 'Търговски и оперативен мениджър @
TopMobility'` vs. `roleEn: 'Commercial and Operational Manager @
TopMobility'` — set both `roleBg` and `roleEn` **in addition to** `role`
(keep `role` as a fallback, e.g. equal to `roleEn`). When present, the
generator uses `roleBg`/`roleEn` for that language's hero text, meta
description, `<title>`-derived text, and JSON-LD `jobTitle`/`worksFor`
(parsed independently per language — so a bilingual title can legitimately
produce a different `jobTitle` on each language's JSON-LD, which is correct,
not a bug). `role` alone is used only as the fallback when the
language-specific field is missing.

## Adding a new track

If the talk genuinely doesn't fit any existing track (confirmed with the
user first, per "What you need from the user" above), add a new object to
the `TRACKS` array in `data/speakers-data.js`, matching the existing shape:

```js
{
  id: 'new-track-id',
  nameBg: 'ИМЕ НА ТРАКА С ГЛАВНИ БУКВИ',
  nameEn: 'TRACK NAME IN CAPS',
  labelBg: 'Име на трака',
  labelEn: 'Track Name',
  descBg: 'Кратко описание.',
  descEn: 'Short description.',
  dot: '#00cdff',
  countPluralBg: 'лектора'
}
```

`speakers.html`/`en/speakers.html` render a track's jump-nav link and
section automatically for any track with at least one speaker (see
`window.bstfSpeakersByTrack` filter in `speakers.html`) — no other wiring is
needed there. Also don't touch the "40+ ЛЕКТОРИ" stat badge on `index.html` —
it's a static, rounded marketing number, not derived from the data file.

Three different "how many tracks" numbers exist on the site, with three
different levels of automation — know which is which before touching any of
them:

1. `speakers.html`/`en/speakers.html`'s visible "N ТЕМАТИЧНИ ТРАКА"/"N
   THEMATIC TRACKS" stat badge — computed at runtime in the page's own JS
   (`tracks.length` over tracks with ≥1 speaker). Always correct on its own,
   never needs touching.
2. `speakers.html`/`en/speakers.html`'s hand-authored `<meta
   name="description">`/`og:description`/`twitter:description`/JSON-LD
   `"description"` copy — "N тематични направления"/"N tracks" (8 spots: 4
   per file). **The generator keeps this one in sync automatically now**
   (`updateActiveTrackCountCopy`/`countTracksWithSpeakers`, same "tracks
   with ≥1 speaker" definition as #1) — found hardcoded at a stale "7" while
   the real count had already drifted to 9, fixed once by hand then wired
   into the generator per an explicit user request so it can't go stale
   again. No action needed from you here either.
3. `index.html`/`en/index.html`'s hero subtitle + section-heading copy — "N
   тематични области"/"N thematic areas" (6 spots: 3 per file). **Never
   auto-edited, by explicit user decision** — this number has never tracked
   any single derivable count (even before any of this session's work it
   undercounted the actual icon grid, which also lists non-track marketing
   entries like "Гейминг"), so there's no safe automatic replacement value.
   The generator only prints a WARNING (`checkThematicAreasHeroCountCopy`)
   when this number no longer matches `TRACKS.length`, naming the exact 2
   files/6 spots to hand-review — it will never touch them itself. If you
   see this warning, tell the user and let them pick the new wording; don't
   "fix" it yourself even though you now know the arithmetic.

### Other places a track's label needs to exist — checked, never auto-edited

Six more spots on the site carry track labels but are hand-authored and NOT
derived from `TRACKS` at runtime: `index.html`/`en/index.html`'s
`Event.about[]` JSON-LD, their `<select id="spk-stream">` (apply-as-speaker
modal), `speakers.html`/`en/speakers.html`'s own `<select id="sp-stream">`
copy of that same modal, the per-speaker template's own copy of that same
`<select id="sp-stream">` (fixed once, propagates to every generated page —
see below), and `index.html`/`en/index.html`'s hero "N thematic areas" icon
grid and `PROGRAM_TRACKS` (3-day program filter pills — only relevant once
the track has an actual scheduled session).

Every generator run checks all of these for the current `TRACKS` and prints
a **warning**, never an automatic edit, for anything that looks missing. Read
those warnings before assuming a new track is fully wired up. Do NOT trust a
missing-warning as certain proof the label is truly absent, though, and
— more importantly — do NOT trust its absence (no warning) as certain proof
it's covered: the check is a literal substring match against
`track.labelBg`/`labelEn`, and several existing tracks are represented on
these surfaces under **different wording** than their `TRACKS` label (e.g.
the `biotech` track's `labelBg` is "Биотехнологии", but `index.html`'s
about[]/hero-grid/dropdowns all say "BioTech" instead — a pre-existing,
apparently intentional style choice). A warning for one of those tracks is a
false positive to dismiss, not a bug to fix.

**Real finding from adding the `transport` track (now resolved)**: the six
hand-authored spots above were already fully populated for `transport`
before any of this generator work happened (icon file included:
`images/streams/transport.png`, dated well before this track was added to
`TRACKS`) — EXCEPT they used different wording than `TRACKS.transport` on
*both* languages: the pre-existing content said BG "Транспорт на бъдещето" /
EN "Transport of the Future", while `TRACKS.transport.labelBg`/`labelEn`
(per the spec that introduced this track) was "Бъдеще на транспорта" /
"Future of Transport" — same meaning, reversed word order, not a missing
entry. This was flagged to the user rather than silently "fixed" in either
direction (picking the canonical phrasing is an editorial call, not a
technical one); the user chose "Бъдеще на транспорта"/"Future of Transport",
so all six spots — including the per-speaker template, which then
propagated the fix into all 54 generated pages on the next regen — were
hand-aligned to that wording. If you hit a similar mismatch for a future
track, do the same: surface it, don't silently pick a winner, then once the
user decides, fix every spot the checker named (template files included) and
re-run the generator to propagate.

## Choosing the id/slug

Latin transliteration of the name, lowercase, hyphenated (e.g. "Мартин
Куванджиев" → `martin-kuvandzhiev`). Check it doesn't already exist as an
`id:` in `data/speakers-data.js` before using it.

## Placing the photo

Copy the provided file to `images/speakers/{id}.{ext}`, preserving its
original format (jpg stays jpg, png stays png — don't force-convert). Bump
its cache-bust to today (`?v=YYYYMMDD`) in the new speaker's `img` field,
e.g. `img: '/images/speakers/{id}.jpg?v=YYYYMMDD'`. No resizing is required
— cards render at a fixed 400×533 box regardless of the source photo's
actual dimensions (unlike `add-media-partner`, this generator does not read
or need the photo's real pixel size).

## Editing data/speakers-data.js

Append a new object to the `SPEAKERS` array — field shape:

```js
{
  id: 'new-speaker-id', track: 'ai',
  img: '/images/speakers/new-speaker-id.jpg?v=20260827', alt: 'Latin Name',
  objectPosition: 'center top',   // CSS object-position for the photo crop
  name: 'Native/display name',
  nameEn: 'Latin name',           // omit entirely if `name` is already Latin
  role: 'Title @ Org',
  topicBg: '...', topicEn: '...',
  bioBg: ['Paragraph 1.', 'Paragraph 2.'],
  bioEn: ['Paragraph 1.', 'Paragraph 2.'],
  // optional:
  roleBg: '...', roleEn: '...',   // only if the title genuinely differs per language — see above
  sessionDescBg: '...', sessionDescEn: '...',
  takeawaysBg: '...', takeawaysEn: '...'
}
```

`bioBg`/`bioEn` must be the same length, paired by index (paragraph *i* in
one is the translation of paragraph *i* in the other) — the generator warns
and truncates to the shorter array if they mismatch, which is a sign
something's wrong.

Array position doesn't affect rendering (cards on `speakers.html` group by
`track` at runtime) — placing the new object near the matching
`// ── TrackName ──` comment is a nice-to-have for readability, not a
requirement.

## Running the generator

```bash
node .claude/skills/add-speaker/scripts/generate-speaker-pages.js
```

This does a **full regen** of everything derived from
`data/speakers-data.js` in one shot — the intended workflow, not an
incremental patch:

- `speakers/{id}/index.html` + `en/speakers/{id}/index.html` for every
  speaker in the data file (2 files per speaker — check the script's own
  summary output for the current total, don't rely on a number written here).
- The `itemListElement`/`numberOfItems` JSON-LD block on `speakers.html`
  and `en/speakers.html`, in place.
- The `data/speakers-data.js?v=YYYYMMDD` cache-bust reference in both of
  those two files, bumped to today.
- The `Event.performer` JSON-LD array on `index.html` and `en/index.html`
  (one `Person` per speaker, same role-parsing rules as the per-speaker
  JSON-LD above — so `roleBg`/`roleEn`, if set, correctly produce a
  different `jobTitle` on each language's homepage).
- The per-speaker `<url>` block section of `sitemap.xml` (2 blocks per
  speaker: the BG page and the EN page, each with all 3 hreflang links).

Pass `--dry-run` to preview without writing anything. The script prints a
summary (speaker count, files written) and exits non-zero with a warnings
list if any speaker couldn't be processed (unknown track, template anchor
not found, etc.) — read those before assuming it worked.

The generator lifts the entire page shell (CSS, GTM, modals, footer JS) from
the **current** `speakers/martin-kuvandzhiev/index.html` /
`en/speakers/martin-kuvandzhiev/index.html`, locating every per-speaker
touch point by its surrounding static HTML (not by martin's specific text) —
so it stays correct even as the shared shell evolves (e.g. the sitewide font
change), and it will throw a clear "template anchor not found" error rather
than silently corrupting output if that shell's structure ever changes in a
way the anchors don't expect.

## Self-test this generator was verified against

Before this generator was considered done, it was run against the live,
unmodified `data/speakers-data.js` and confirmed to reproduce every existing
`speakers/{id}/index.html` + `en/speakers/{id}/index.html`, `index.html`,
`en/index.html`, and `sitemap.xml` byte-for-byte, and to change nothing in
`speakers.html`/`en/speakers.html` beyond the intended cache-bust date bump.
The `roleBg`/`roleEn` support, `Event.performer` regen, and `sitemap.xml`
regen were added and verified the same way later (real-world case: adding
speaker `hristo-hristov` in a new `transport` track with genuinely
per-language role text). If you ever suspect the generator drifted (e.g.
after editing the anchored regexes), re-run that same check: back up
`speakers/`, `en/speakers/`, `speakers.html`, `en/speakers.html`,
`index.html`, `en/index.html`, `sitemap.xml` first (plain file copy, not
`git checkout` — the working tree may carry legitimate uncommitted changes
you must not discard), run the generator, diff against the backup, and
expect only the version-bump line(s) to differ.

### Line endings — why every read goes through `readText()`

Every template anchor in the script is written against LF. The files are
stored in git as LF, but this repo is cloned with `core.autocrlf=true`, so the
**working copy is CRLF**. Reading it raw made each anchor that contains a
newline — the per-speaker JSON-LD block, the sitemap `<url>` block — match 0
times, so on 2026-09-10 a run silently skipped all 60 speaker pages *and*
`sitemap.xml`, wrote only 4 files, and still printed a summary and exited 0.
The only clue was a wall of "Template anchor ... matched 0 time(s)" warnings
under the summary, which is easy to scroll past.

`readText()` normalizes CRLF to LF on read; the script always writes LF, which
matches the committed form. Do not go back to bare `fs.readFileSync` for any
of these files, and if you add an anchor, keep writing it with `\n`. A run that
reports far fewer than `2 × speakers + 5` files written is this bug returning.

### `hreflang="x-default"` points at the BG URL

Both the per-speaker pages and the `sitemap.xml` blocks used to emit the EN URL
here, which disagreed with every other page on the site (`index.html`,
`speakers.html`, `sponsors.html` all point x-default at the BG version).
Fixed 2026-09-10 in both places. The `canonical`, by contrast, is
self-referencing per language — BG page → BG URL, EN page → EN URL — which is
deliberate and must stay that way; the 26 EN pages that used to canonicalise to
their BG counterpart were telling Google to drop them from the index.

### A pre-existing bug this uncovered and fixed (not generator-owned code)

`speakers.html`/`en/speakers.html`'s runtime `renderCard()` function (plain
JS baked into those two pages, not generated) already had partial
bilingual-role support — `pick(spk.role, spk.roleEn || spk.role)` — but only
on the EN side; the BG branch always rendered the raw `spk.role` field with
no `spk.roleBg` fallback. This never mattered while every speaker shared one
`role` string, but with `hristo-hristov` set to `roleBg`/`roleEn` it made
the **listing card** show the English title even on the Bulgarian page (the
individual speaker page was already correct, since the generator's own
`hero-desc`/`sp-role` logic does check `roleBg`). Fixed in both files:
`pick(spk.roleBg || spk.role, spk.roleEn || spk.role)`. This fix is now
live and doesn't need repeating — mentioned here so it's not mistaken for a
new gap if you're reasoning about `role` handling in the future.

## After running

Report back to the user:

- The new speaker's `id`.
- Files created/changed: `images/speakers/{id}.{ext}`,
  `data/speakers-data.js`, `speakers/{id}/index.html`,
  `en/speakers/{id}/index.html`, `speakers.html`, `en/speakers.html`,
  `index.html`, `en/index.html`, `sitemap.xml` — and, if you added one,
  the new `TRACKS` entry.
- If you wrote a bio-language adaptation rather than a literal translation,
  say so plainly. Same for a role-language adaptation if you wrote
  `roleBg`/`roleEn` yourself rather than being given both.
- This only edits files — it does not commit. Per project convention, leave
  the changes uncommitted unless the user explicitly asks you to commit.
- `participants.html`/`expo.html` are parked and were not touched.
- `bstf-` prefixed ids/classes/localStorage keys elsewhere in the codebase
  are unrelated and were not touched.
- `index.html`'s static "40+ ЛЕКТОРИ" stat badge is an aspirational,
  hand-set marketing number, not tied to the real speaker count — it does
  **not** need updating when a speaker is added. `speakers.html`'s "N
  ТЕМАТИЧНИ ТРАКА" stat badge and its meta/JSON-LD "N тематични
  направления"/"N tracks" copy, by contrast, both stay correct on their own
  (one computed at runtime, the other regenerated by this script) — see "Other
  places a track's label needs to exist" above for the full breakdown of
  which "how many tracks" number is auto-managed and which isn't.
- If you added a new track, mention that `index.html`'s "N thematic areas"
  marketing grid (static copy near the top of the homepage, separate from
  `TRACKS`) was **not** updated with the new track's icon/row — flag it for
  the user/designer rather than adding it yourself (see "Adding a new
  track" above).
