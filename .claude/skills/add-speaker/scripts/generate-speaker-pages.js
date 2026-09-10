#!/usr/bin/env node
'use strict';
/*
 * Regenerates every per-speaker page (speakers/{id}/index.html,
 * en/speakers/{id}/index.html) from data/speakers-data.js, plus the
 * hand-authored CollectionPage/ItemList JSON-LD block in speakers.html and
 * en/speakers.html. Full regen every run — this is the intended workflow
 * (see repo CLAUDE.md, "Per-Speaker Pages").
 *
 * The BG/EN shells (CSS, GTM, modals, footer JS) are lifted verbatim from
 * the current speakers/martin-kuvandzhiev/ + en/speakers/martin-kuvandzhiev/
 * pages via anchored, structural replacements (never a blind find/replace
 * of the old speaker's literal text) — every touch point is located by its
 * surrounding static HTML (tag name, attribute name, id, comment), so the
 * generator does not care which speaker currently occupies the template
 * files. If a touch point's surrounding markup ever changes by hand, this
 * script will throw ("Expected exactly 1 match for ...") rather than
 * silently writing something wrong — that is the intended failure mode.
 *
 * Usage:
 *   node generate-speaker-pages.js [--dry-run]
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..', '..', '..', '..'); // scripts -> add-speaker -> skills -> .claude -> repo root
const SITE = 'https://www.blackseatech.org';

// ---------------------------------------------------------------------------
// Every template anchor below is written against LF line endings, which is how
// all of these files are stored in git. This repo is cloned with
// core.autocrlf=true, so the WORKING COPY is CRLF - reading it raw made each
// newline-bearing anchor (the per-speaker JSON-LD block, the sitemap <url>
// block) match 0 times, silently skipping all 60 speaker pages + sitemap.xml
// while still reporting exit 0. Normalize on read; we always write LF, which
// matches the committed form.
// ---------------------------------------------------------------------------
function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
}

function fail(msg) {
  console.error('Error: ' + msg);
  process.exit(1);
}

function todayStamp() {
  const d = new Date();
  const p = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}`;
}

// ---------------------------------------------------------------------------
// Load data/speakers-data.js (an IIFE that attaches to a `global` param, not
// a CommonJS module) safely via vm, instead of eval()-ing it into this
// process's scope.
// ---------------------------------------------------------------------------
function loadSpeakersData() {
  const dataPath = path.join(ROOT, 'data', 'speakers-data.js');
  if (!fs.existsSync(dataPath)) fail(`Expected file not found: ${dataPath}`);
  const src = readText(dataPath);
  const sandbox = {};
  sandbox.window = sandbox; // the IIFE is invoked as `(function(global){...})(window)`
  sandbox.global = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox, { filename: dataPath });
  const TRACKS = sandbox.BSTF_TRACKS;
  const SPEAKERS = sandbox.BSTF_SPEAKERS;
  if (!Array.isArray(TRACKS) || !Array.isArray(SPEAKERS)) {
    fail('data/speakers-data.js did not attach BSTF_TRACKS/BSTF_SPEAKERS as expected.');
  }
  return { TRACKS, SPEAKERS };
}

// ---------------------------------------------------------------------------
// Escaping helper. Verified against the real generated pages (e.g.
// alexander-minchev's EN bio, "the company's renovated..."): the existing
// pages escape &, ", ', <, > the SAME way in BOTH double-quoted attribute
// values (data-bg="...") AND element inner text/HTML — there is no reduced
// escaping for inner text. One function covers both contexts.
// ---------------------------------------------------------------------------
function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
const attrEsc = esc;
const textEsc = esc;
function jsStrEsc(s) {
  // For embedding inside a single-quoted JS string literal.
  return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}
function jsonStr(s) {
  return JSON.stringify(String(s));
}

// ---------------------------------------------------------------------------
// Role-string parsing.
//
// Reverse-engineered from ~20 real generated pages with varying role shapes
// (verified, not guessed — see the add-speaker SKILL.md "How role parsing
// works" section for the worked examples this was derived from):
//
//   metaRoleClause = role.split('|')[0].trim()
//     — used verbatim in <title>/meta description/og/twitter (kept whole,
//       NOT cut at "@" even if it contains one).
//
//   jobTitle = if metaRoleClause contains '@', text before the first '@'
//              (trimmed); else metaRoleClause itself.
//     — derived from the FIRST pipe-segment only.
//
//   worksFor = the first '@' found ANYWHERE in the full role string (not
//              just the first pipe-segment), text after it up to the next
//              '|' or end of string, trimmed. Omitted entirely if the role
//              has no '@' anywhere.
//     — this is why e.g. "Cybersecurity Compliance Director | Chair @ DIH
//       Trakia" yields jobTitle "Cybersecurity Compliance Director" (no
//       "Chair") but worksFor "DIH Trakia" (from the second segment).
// ---------------------------------------------------------------------------
function parseRole(role) {
  const metaRoleClause = role.split('|')[0].trim();
  let jobTitle = metaRoleClause;
  const atInClause = metaRoleClause.indexOf('@');
  if (atInClause !== -1) jobTitle = metaRoleClause.slice(0, atInClause).trim();

  let org = null;
  const atIdx = role.indexOf('@');
  if (atIdx !== -1) {
    let rest = role.slice(atIdx + 1);
    const pipeIdx = rest.indexOf('|');
    if (pipeIdx !== -1) rest = rest.slice(0, pipeIdx);
    org = rest.trim();
  }
  return { metaRoleClause, jobTitle, org };
}

// ---------------------------------------------------------------------------
// roleBg/roleEn: optional per-language override of `role`. Every existing
// speaker only has `role` (one string shown verbatim on both language
// versions, e.g. "Founder @ Encorp" on the BG page too) — that behavior is
// preserved exactly when roleBg/roleEn are absent. A speaker that genuinely
// needs a translated title (e.g. a Bulgarian job title on the BG page, an
// English one on the EN page) can set roleBg/roleEn instead; `role` should
// still be set too (used as the fallback if only one of roleBg/roleEn is
// given, and kept as the single source other tooling may read).
// ---------------------------------------------------------------------------
function roleFor(sp, lang) {
  if (lang === 'bg') return sp.roleBg || sp.role;
  return sp.roleEn || sp.role;
}

// ---------------------------------------------------------------------------
// Honorific-title stripping for the JSON-LD Person.name / the speakers.html
// ItemList entries. Reverse-engineered from real pages (hristian-daskalov,
// anton-tonchev, elitsa-encheva, krastena-nikolova, kristina-bliznakova,
// oskan-tasinov, teade-punter, lars-frolund):
//
//   BG side only strips known CYRILLIC title prefixes off the `name` field.
//   EN side only strips known LATIN title prefixes off (nameEn || name).
//
// A Latin "Dr."/"Prof." prefix sitting inside a BG `name` field (e.g.
// teade-punter's name is "Dr. Teade Punter" — he has no separate nameEn) is
// NOT stripped on the BG side, only on the EN side. If you add a speaker
// with a title not in these two lists, add it here — this is the single
// most fragile piece of derived logic in this generator.
// ---------------------------------------------------------------------------
const BG_TITLES = ['д-р ', 'проф. ', 'доц. '];
const EN_TITLES = ['Assoc. Prof. ', 'Prof. ', 'Dr. '];

// ---------------------------------------------------------------------------
// Hand-verified exception: kristina-bliznakova's role ("Associate Professor
// @ TU Varna | Medical University Varna") is the one case among all current
// speakers where a bare (no "@") trailing pipe-segment IS folded into
// worksFor as a second Organization — every other multi-segment role
// (martin-kuvandzhiev's "Co-founder, Bitcoin Gold", elitza-stoilova's
// "AI2B Zone", etc.) does NOT get its trailing segment added. There is no
// clean rule that explains the difference (it reads as an editorial choice
// in the original hand-authored pages, not a formula) — rather than guess a
// heuristic that might misfire on a normal future speaker, this is a tiny,
// explicit override table. Add an entry here only if you hit the same
// "role lists two affiliations separated by |" shape again.
// ---------------------------------------------------------------------------
const MULTI_ORG_OVERRIDES = {
  'kristina-bliznakova': ['TU Varna', 'Medical University Varna']
};

function stripTitle(name, titleList) {
  for (const t of titleList) {
    if (name.startsWith(t)) {
      return { honorific: t.trim(), name: name.slice(t.length) };
    }
  }
  return { honorific: null, name };
}

// ---------------------------------------------------------------------------
// Anchored replacement helpers — every touch point is located by unique
// surrounding static markup, never by the old speaker's literal values.
// ---------------------------------------------------------------------------
function replaceOnce(html, regex, replacer, label) {
  const flags = regex.flags.includes('g') ? regex.flags : regex.flags + 'g';
  const re = new RegExp(regex.source, flags);
  const matches = html.match(re);
  const count = matches ? matches.length : 0;
  if (count !== 1) {
    throw new Error(`Template anchor "${label}" matched ${count} time(s) (expected exactly 1). The template shell may have changed — inspect speakers/martin-kuvandzhiev/index.html.`);
  }
  const single = new RegExp(regex.source, regex.flags.replace('g', ''));
  return html.replace(single, replacer);
}

// ---------------------------------------------------------------------------
// Builds the #sp-root inner markup (track pill, name, role, topic, photo,
// bio paragraphs, and the optional "About the talk" section) from scratch —
// this region is never lifted from an existing file, since the optional
// session block changes the DOM shape.
// ---------------------------------------------------------------------------
function buildSpRoot(sp, track, lang) {
  const pick = (bg, en) => (lang === 'bg' ? bg : en);
  const nameEnFull = sp.nameEn || sp.name;
  const displayName = pick(sp.name, nameEnFull);
  const topicPick = pick(sp.topicBg, sp.topicEn);

  let h = '<div id="sp-root">';
  h += `<div class="sp-profile" data-track="${attrEsc(sp.track)}">`;
  h += '<div class="sp-card">';
  h += `<div class="sp-photo"><img loading="eager" decoding="async" width="400" height="533" src="${attrEsc(sp.img)}" alt="${attrEsc(sp.alt)}" style="object-position:${attrEsc(sp.objectPosition)}"></div>`;
  h += '<div class="sp-body">';
  h += `<span class="sp-track-pill" data-bg="${attrEsc(track.labelBg)}" data-en="${attrEsc(track.labelEn)}">${textEsc(pick(track.labelBg, track.labelEn))}</span>`;
  h += `<h2 class="sp-name" data-bg="${attrEsc(sp.name)}" data-en="${attrEsc(nameEnFull)}">${textEsc(displayName)}</h2>`;
  h += `<div class="sp-role" data-bg="${attrEsc(roleFor(sp, 'bg'))}" data-en="${attrEsc(roleFor(sp, 'en'))}">${textEsc(pick(roleFor(sp, 'bg'), roleFor(sp, 'en')))}</div>`;
  h += `<div class="sp-topic"><span class="sp-topic-label" data-bg="Тема на лекцията" data-en="Talk Topic">${textEsc(pick('Тема на лекцията', 'Talk Topic'))}</span><span data-bg="${attrEsc(sp.topicBg)}" data-en="${attrEsc(sp.topicEn)}">${textEsc(topicPick)}</span></div>`;
  h += `<div class="sp-cta-row"><a href="index.html#program" class="btn btn-primary" data-bg="Виж програмата" data-en="See program">${textEsc(pick('Виж програмата', 'See program'))}</a><a href="speakers.html" class="btn btn-outline" data-bg="Всички лектори" data-en="All speakers">${textEsc(pick('Всички лектори', 'All speakers'))}</a></div>`;
  h += '</div>'; // sp-body
  h += '</div>'; // sp-card
  h += '<div class="sp-details">';
  h += `<div class="sp-section"><h3 class="sp-section-title" data-bg="За лектора" data-en="About the speaker">${textEsc(pick('За лектора', 'About the speaker'))}</h3><div class="sp-bio">`;

  const bioBg = sp.bioBg || [];
  const bioEn = sp.bioEn || [];
  const n = Math.min(bioBg.length, bioEn.length);
  if (bioBg.length !== bioEn.length) {
    console.warn(`  WARNING: ${sp.id} has bioBg.length=${bioBg.length} but bioEn.length=${bioEn.length}; using first ${n} paragraph(s) only.`);
  }
  for (let i = 0; i < n; i++) {
    const bg = bioBg[i], en = bioEn[i];
    h += `<p data-bg="${attrEsc(bg)}" data-en="${attrEsc(en)}">${textEsc(pick(bg, en))}</p>`;
  }
  h += '</div></div>'; // sp-bio, sp-section(bio)

  // The two sub-blocks (session description, takeaways) are independent —
  // some speakers (e.g. krastena-nikolova, oskan-tasinov, michael-roux,
  // paul-lambert) have a sessionDesc but no takeaways. Verified against
  // those real pages: each sub-block renders only if its own field pair is
  // present, not as an all-or-nothing unit.
  const hasSessionDesc = sp.sessionDescBg || sp.sessionDescEn;
  const hasTakeaways = sp.takeawaysBg || sp.takeawaysEn;
  if (hasSessionDesc || hasTakeaways) {
    h += `<div class="sp-section"><h3 class="sp-section-title" data-bg="За лекцията" data-en="About the talk">${textEsc(pick('За лекцията', 'About the talk'))}</h3>`;
    if (hasSessionDesc) {
      h += `<div class="sp-topic"><span class="sp-topic-label" data-bg="Описание на лекцията" data-en="Talk Description">${textEsc(pick('Описание на лекцията', 'Talk Description'))}</span><span data-bg="${attrEsc(sp.sessionDescBg || '')}" data-en="${attrEsc(sp.sessionDescEn || '')}">${textEsc(pick(sp.sessionDescBg || '', sp.sessionDescEn || ''))}</span></div>`;
    }
    if (hasTakeaways) {
      h += `<div class="sp-topic"><span class="sp-topic-label" data-bg="Основни изводи за аудиторията" data-en="Key Takeaways">${textEsc(pick('Основни изводи за аудиторията', 'Key Takeaways'))}</span><span data-bg="${attrEsc(sp.takeawaysBg || '')}" data-en="${attrEsc(sp.takeawaysEn || '')}">${textEsc(pick(sp.takeawaysBg || '', sp.takeawaysEn || ''))}</span></div>`;
    }
    h += '</div>';
  }

  h += '</div>'; // sp-details
  h += '</div>'; // sp-profile
  h += '</div>'; // #sp-root
  return h;
}

// ---------------------------------------------------------------------------
// Builds the ProfilePage + Person JSON-LD block text (without the
// surrounding <script> tags), matching the exact indentation of the
// existing hand-formatted blocks.
// ---------------------------------------------------------------------------
function buildJsonLd(sp, lang, fields) {
  const isBg = lang === 'bg';
  const url = isBg ? fields.canonicalUrl : fields.hreflangEn;
  const id = `${url}#profilepage`;
  const title = isBg ? fields.titleBg : fields.titleEn;
  const rawName = isBg ? sp.name : (sp.nameEn || sp.name);
  const titles = isBg ? BG_TITLES : EN_TITLES;
  const { honorific, name: strippedName } = stripTitle(rawName, titles);
  const description = isBg ? sp.topicBg : sp.topicEn;

  const lines = [];
  lines.push('{');
  lines.push(`  "@context": "https://schema.org",`);
  lines.push(`  "@type": "ProfilePage",`);
  lines.push(`  "@id": ${jsonStr(id)},`);
  lines.push(`  "name": ${jsonStr(title)},`);
  lines.push(`  "url": ${jsonStr(url)},`);
  lines.push(`  "isPartOf": {`);
  lines.push(`    "@id": "${SITE}/#website"`);
  lines.push(`  },`);
  lines.push(`  "about": {`);
  lines.push(`    "@id": "${SITE}/#event"`);
  lines.push(`  },`);
  lines.push(`  "inLanguage": ${jsonStr(lang)},`);
  lines.push(`  "mainEntity": {`);
  lines.push(`    "@type": "Person",`);
  lines.push(`    "name": ${jsonStr(strippedName)},`);
  if (honorific) lines.push(`    "honorificPrefix": ${jsonStr(honorific)},`);
  lines.push(`    "jobTitle": ${jsonStr(fields.jobTitle)},`);
  const multiOrg = MULTI_ORG_OVERRIDES[sp.id];
  if (multiOrg) {
    lines.push(`    "worksFor": [`);
    multiOrg.forEach((orgName, i) => {
      lines.push(`      {`);
      lines.push(`        "@type": "Organization",`);
      lines.push(`        "name": ${jsonStr(orgName)}`);
      lines.push(i === multiOrg.length - 1 ? `      }` : `      },`);
    });
    lines.push(`    ],`);
  } else if (fields.org) {
    lines.push(`    "worksFor": {`);
    lines.push(`      "@type": "Organization",`);
    lines.push(`      "name": ${jsonStr(fields.org)}`);
    lines.push(`    },`);
  }
  lines.push(`    "image": ${jsonStr(fields.ogImage)},`);
  lines.push(`    "description": ${jsonStr(description)}`);
  lines.push(`  }`);
  lines.push('}');
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Transforms one language's template into the final page for one speaker.
// ---------------------------------------------------------------------------
function transformDoc(template, sp, track, lang) {
  const isBg = lang === 'bg';
  const id = sp.id;
  const nameEnFull = sp.nameEn || sp.name;
  const roleBgResolved = roleFor(sp, 'bg');
  const roleEnResolved = roleFor(sp, 'en');
  const { metaRoleClause: metaRoleClauseBg, jobTitle: jobTitleBg, org: orgBg } = parseRole(roleBgResolved);
  const { metaRoleClause: metaRoleClauseEn, jobTitle: jobTitleEn, org: orgEn } = parseRole(roleEnResolved);
  const metaRoleClause = isBg ? metaRoleClauseBg : metaRoleClauseEn;
  const jobTitle = isBg ? jobTitleBg : jobTitleEn;
  const org = isBg ? orgBg : orgEn;

  const canonicalUrl = `${SITE}/speakers/${id}/`;
  const hreflangEn = `${SITE}/en/speakers/${id}/`;
  const ownUrl = isBg ? canonicalUrl : hreflangEn;
  const ogImage = `${SITE}${sp.img.split('?')[0]}`;

  const titleBg = `${sp.name}, лектор на CONNEXUS 2026`;
  const titleEn = `${nameEnFull}, speaker at CONNEXUS 2026`;
  const metaDescBg = `${sp.name}, ${metaRoleClauseBg}, на CONNEXUS 2026, 5-7 октомври, Варна. Тема: ${sp.topicBg}.`;
  const metaDescEn = `${nameEnFull}, ${metaRoleClauseEn}, at CONNEXUS 2026, 5-7 October, Varna. Talk: ${sp.topicEn}.`;
  const title = isBg ? titleBg : titleEn;
  const metaDesc = isBg ? metaDescBg : metaDescEn;

  let html = template;

  html = replaceOnce(html, /<title>[\s\S]*?<\/title>/, () => `<title>${textEsc(title)}</title>`, '<title>');
  html = replaceOnce(html, /<meta name="description" content="[^"]*">/, () => `<meta name="description" content="${attrEsc(metaDesc)}">`, 'meta description');
  html = replaceOnce(html, /<link rel="canonical" href="[^"]*">/, () => `<link rel="canonical" href="${attrEsc(ownUrl)}">`, 'canonical');
  html = replaceOnce(html, /<link rel="alternate" hreflang="bg" href="[^"]*">/, () => `<link rel="alternate" hreflang="bg" href="${attrEsc(canonicalUrl)}">`, 'hreflang bg');
  html = replaceOnce(html, /<link rel="alternate" hreflang="en" href="[^"]*">/, () => `<link rel="alternate" hreflang="en" href="${attrEsc(hreflangEn)}">`, 'hreflang en');
  html = replaceOnce(html, /<link rel="alternate" hreflang="x-default" href="[^"]*">/, () => `<link rel="alternate" hreflang="x-default" href="${attrEsc(canonicalUrl)}">`, 'hreflang x-default');
  html = replaceOnce(html, /<meta property="og:title" content="[^"]*">/, () => `<meta property="og:title" content="${attrEsc(title)}">`, 'og:title');
  html = replaceOnce(html, /<meta property="og:description" content="[^"]*">/, () => `<meta property="og:description" content="${attrEsc(metaDesc)}">`, 'og:description');
  html = replaceOnce(html, /<meta property="og:url" content="[^"]*">/, () => `<meta property="og:url" content="${attrEsc(ownUrl)}">`, 'og:url');
  html = replaceOnce(html, /<meta property="og:image" content="[^"]*">/, () => `<meta property="og:image" content="${attrEsc(ogImage)}">`, 'og:image');
  html = replaceOnce(html, /<meta name="twitter:title" content="[^"]*">/, () => `<meta name="twitter:title" content="${attrEsc(title)}">`, 'twitter:title');
  html = replaceOnce(html, /<meta name="twitter:description" content="[^"]*">/, () => `<meta name="twitter:description" content="${attrEsc(metaDesc)}">`, 'twitter:description');
  html = replaceOnce(html, /<meta name="twitter:image" content="[^"]*">/, () => `<meta name="twitter:image" content="${attrEsc(ogImage)}">`, 'twitter:image');

  const jsonLd = buildJsonLd(sp, lang, { canonicalUrl, hreflangEn, titleBg, titleEn, jobTitle, org, ogImage });
  html = replaceOnce(html, /<script type="application\/ld\+json">\n[\s\S]*?\n<\/script>/, () => `<script type="application/ld+json">\n${jsonLd}\n</script>`, 'JSON-LD block');

  html = replaceOnce(html, /<script>SiteChrome\.renderNav\('speaker', '(?:bg|en)', '[^']*'\);<\/script>/, () => `<script>SiteChrome.renderNav('speaker', '${lang}', 'speakers/${id}/');</script>`, 'renderNav call');
  html = replaceOnce(html, /<script>SiteChrome\.renderFooter\('speaker', '(?:bg|en)', '[^']*'\);<\/script>/, () => `<script>SiteChrome.renderFooter('speaker', '${lang}', 'speakers/${id}/');</script>`, 'renderFooter call');

  const pick = (bg, en) => (isBg ? bg : en);
  html = replaceOnce(
    html,
    /<p class="hero-eyebrow" data-bg="[^"]*" data-en="[^"]*">[^<]*<\/p>/,
    () => `<p class="hero-eyebrow" data-bg="${attrEsc(track.labelBg)}" data-en="${attrEsc(track.labelEn)}">${textEsc(pick(track.labelBg, track.labelEn))}</p>`,
    'hero-eyebrow'
  );
  html = replaceOnce(
    html,
    /<h1 data-bg="[^"]*" data-en="[^"]*">[^<]*<\/h1>/,
    () => `<h1 data-bg="${attrEsc(sp.name)}" data-en="${attrEsc(nameEnFull)}">${textEsc(pick(sp.name, nameEnFull))}</h1>`,
    'h1'
  );
  html = replaceOnce(
    html,
    /<p class="hero-desc" data-bg="[^"]*" data-en="[^"]*">[^<]*<\/p>/,
    () => `<p class="hero-desc" data-bg="${attrEsc(roleBgResolved)}" data-en="${attrEsc(roleEnResolved)}">${textEsc(pick(roleBgResolved, roleEnResolved))}</p>`,
    'hero-desc'
  );

  html = replaceOnce(html, /<div id="sp-root">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/, () => buildSpRoot(sp, track, lang), '#sp-root');

  html = replaceOnce(
    html,
    /document\.title = lang === 'bg' \? '[\s\S]*?' : '[\s\S]*?';/,
    () => `document.title = lang === 'bg' ? '${jsStrEsc(titleBg)}' : '${jsStrEsc(titleEn)}';`,
    'document.title'
  );

  return html;
}

// ---------------------------------------------------------------------------
// Regenerates the hand-authored CollectionPage/ItemList JSON-LD block in
// speakers.html / en/speakers.html, and bumps the data/speakers-data.js
// cache-bust version in both files.
// ---------------------------------------------------------------------------
function buildItemList(SPEAKERS, lang) {
  const isBg = lang === 'bg';
  const items = SPEAKERS.map((sp, i) => {
    const rawName = isBg ? sp.name : (sp.nameEn || sp.name);
    const titles = isBg ? BG_TITLES : EN_TITLES;
    const { name } = stripTitle(rawName, titles);
    const url = `${SITE}/${isBg ? '' : 'en/'}speakers/${sp.id}/`;
    return [
      '      {',
      '        "@type": "ListItem",',
      `        "position": ${i + 1},`,
      `        "name": ${jsonStr(name)},`,
      `        "url": ${jsonStr(url)}`,
      '      }'
    ].join('\n');
  });
  return items.join(',\n');
}

// ---------------------------------------------------------------------------
// The number of tracks WITH AT LEAST ONE SPEAKER (matches the logic of the
// visible, already-dynamic "N ТЕМАТИЧНИ ТРАКА"/"N THEMATIC TRACKS" stat
// badge on this same page — see window.bstfSpeakersByTrack in speakers.html)
// — as opposed to TRACKS.length, which counts every defined track even ones
// with zero speakers so far (e.g. smart-city, currently empty). Used to
// keep the hand-authored meta description / og / twitter / JSON-LD
// "description" copy on speakers.html/en/speakers.html from going stale the
// way it had (found hardcoded at "7" while the real count had already
// drifted to 9 — unrelated to any one speaker/track addition, just old
// content debt). Deliberately scoped to ONLY these 4×2 spots on
// speakers.html/en/speakers.html — index.html's separate "N thematic areas"
// hero copy uses a different, broader count (it includes areas with no
// track/speaker yet, like "Гейминг") and was left alone on request.
// ---------------------------------------------------------------------------
function countTracksWithSpeakers(TRACKS, SPEAKERS) {
  const idsWithSpeakers = new Set(SPEAKERS.map(sp => sp.track));
  return TRACKS.filter(t => idsWithSpeakers.has(t.id)).length;
}

function updateActiveTrackCountCopy(html, count, lang) {
  if (lang === 'bg') {
    return html.replace(/(\sв )\d+( тематични направления)/g, `$1${count}$2`);
  }
  return html.replace(/(across )\d+( (?:thematic )?tracks)/g, `$1${count}$2`);
}

function updateListingPage(html, filePath, SPEAKERS, lang, version, TRACKS) {
  html = updateActiveTrackCountCopy(html, countTracksWithSpeakers(TRACKS, SPEAKERS), lang);
  const itemList = buildItemList(SPEAKERS, lang);
  html = replaceOnce(
    html,
    /"itemListElement": \[\n[\s\S]*?\n    \]/,
    () => `"itemListElement": [\n${itemList}\n    ]`,
    `itemListElement (${filePath})`
  );
  html = replaceOnce(
    html,
    /"numberOfItems": \d+,/,
    () => `"numberOfItems": ${SPEAKERS.length},`,
    `numberOfItems (${filePath})`
  );
  html = replaceOnce(
    html,
    /data\/speakers-data\.js\?v=[0-9a-zA-Z-]+/,
    () => `data/speakers-data.js?v=${version}`,
    `speakers-data.js cache-bust (${filePath})`
  );

  return html;
}

// ---------------------------------------------------------------------------
// Regenerates the hand-authored Event.performer JSON-LD array in index.html
// / en/index.html — one Person per speaker, in SPEAKERS array order (same
// name-stripping/role-parsing rules as the per-speaker JSON-LD above).
// ---------------------------------------------------------------------------
function buildPerformerArray(SPEAKERS, trackById, lang) {
  const isBg = lang === 'bg';
  const entries = SPEAKERS.map(sp => {
    const rawName = isBg ? sp.name : (sp.nameEn || sp.name);
    const titles = isBg ? BG_TITLES : EN_TITLES;
    const { honorific, name } = stripTitle(rawName, titles);
    const role = roleFor(sp, lang);
    const { jobTitle, org } = parseRole(role);
    const ogImage = `${SITE}${sp.img.split('?')[0]}`;

    const lines = [];
    lines.push('        {');
    lines.push('          "@type": "Person",');
    lines.push(`          "name": ${jsonStr(name)},`);
    if (honorific) lines.push(`          "honorificPrefix": ${jsonStr(honorific)},`);
    lines.push(`          "jobTitle": ${jsonStr(jobTitle)},`);
    const multiOrg = MULTI_ORG_OVERRIDES[sp.id];
    if (multiOrg) {
      lines.push('          "worksFor": [');
      multiOrg.forEach((orgName, i) => {
        lines.push('            {');
        lines.push('              "@type": "Organization",');
        lines.push(`              "name": ${jsonStr(orgName)}`);
        lines.push(i === multiOrg.length - 1 ? '            }' : '            },');
      });
      lines.push(org ? '          ],' : '          ]');
    } else if (org) {
      lines.push('          "worksFor": {');
      lines.push('            "@type": "Organization",');
      lines.push(`            "name": ${jsonStr(org)}`);
      lines.push('          },');
    }
    lines.push(`          "image": ${jsonStr(ogImage)}`);
    lines.push('        }');
    return lines.join('\n');
  });
  return entries.join(',\n');
}

function updateEventPerformerPage(html, filePath, SPEAKERS, trackById, lang) {
  const performer = buildPerformerArray(SPEAKERS, trackById, lang);
  html = replaceOnce(
    html,
    /"performer": \[\n[\s\S]*?\n      \]/,
    () => `"performer": [\n${performer}\n      ]`,
    `Event.performer (${filePath})`
  );
  return html;
}

// ---------------------------------------------------------------------------
// Regenerates the hand-authored per-speaker <url> block section of
// sitemap.xml — the block runs from right after the .../en/speakers.html
// <url> entry to right before </urlset>, two <url> blocks (BG + EN) per
// speaker in SPEAKERS array order. Full-section replace, same anchoring
// approach as everything else in this generator.
// ---------------------------------------------------------------------------
function buildSitemapUrlBlock(loc, hreflangBgUrl, hreflangEnUrl) {
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    `    <xhtml:link rel="alternate" hreflang="bg" href="${hreflangBgUrl}"/>`,
    `    <xhtml:link rel="alternate" hreflang="en" href="${hreflangEnUrl}"/>`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${hreflangBgUrl}"/>`,
    '  </url>'
  ].join('\n');
}

function buildSitemapSpeakersSection(SPEAKERS) {
  const blocks = [];
  for (const sp of SPEAKERS) {
    const bgUrl = `${SITE}/speakers/${sp.id}/`;
    const enUrl = `${SITE}/en/speakers/${sp.id}/`;
    blocks.push(buildSitemapUrlBlock(bgUrl, bgUrl, enUrl));
    blocks.push(buildSitemapUrlBlock(enUrl, bgUrl, enUrl));
  }
  return blocks.join('\n');
}

function updateSitemap(filePath, SPEAKERS) {
  let xml = readText(filePath);
  // Anchor on the <loc> of the en/speakers.html entry specifically (not the
  // bg one) — both that block and the bg speakers.html block share the same
  // hreflang="x-default" closing text (x-default always points at the bg
  // URL), so anchoring on the closing text alone would match the wrong
  // (earlier) block. The per-speaker <url> section starts right after this
  // block's own </url>.
  const locMarker = `<loc>${SITE}/en/speakers.html</loc>`;
  const locIdx = xml.indexOf(locMarker);
  if (locIdx === -1) {
    throw new Error(`Template anchor "sitemap en/speakers.html <loc>" not found in ${filePath} — sitemap structure may have changed.`);
  }
  const closeTag = '</url>\n';
  const closeIdx = xml.indexOf(closeTag, locIdx);
  if (closeIdx === -1) {
    throw new Error(`Closing </url> for the en/speakers.html entry not found in ${filePath}.`);
  }
  const sectionStart = closeIdx + closeTag.length;
  const urlsetCloseIdx = xml.indexOf('</urlset>', sectionStart);
  if (urlsetCloseIdx === -1) {
    throw new Error(`</urlset> not found in ${filePath}.`);
  }
  const before = xml.slice(0, sectionStart);
  const after = xml.slice(urlsetCloseIdx);
  const speakersSection = buildSitemapSpeakersSection(SPEAKERS);
  return `${before}\n${speakersSection}\n\n${after}`;
}

// ---------------------------------------------------------------------------
// Track coverage sync. When a new track is added to TRACKS, several
// hand-authored spots elsewhere on the site carry the same track labels but
// are NOT derived from TRACKS at runtime (unlike speakers.html's sections,
// which auto-render any track with >=1 speaker) — so a brand-new track can
// silently be missing from them. Verified by reading every one of these
// real files before writing this (see add-speaker SKILL.md "Adding a new
// track" for the full writeup):
//
//   - index.html / en/index.html: Event.about[] JSON-LD (Thing[])
//   - index.html / en/index.html: the "apply as speaker" modal's
//     <select id="spk-stream"> options
//   - speakers.html / en/speakers.html: the same modal's own copy,
//     <select id="sp-stream">
//   - the per-speaker template's own copy of <select id="sp-stream">
//     (speakers/martin-kuvandzhiev/index.html + en/ counterpart)
//   - index.html / en/index.html: the hero "N thematic areas" icon grid
//   - index.html / en/index.html: PROGRAM_TRACKS (3-day program filter pills)
//
// IMPORTANT — this is WARN-ONLY, it never auto-edits any of the above.
// An earlier version of this generator tried "insert the track's labelBg/
// labelEn if not found verbatim" for the JSON-LD/dropdown spots, and it was
// wrong on the very first real use: several existing tracks are represented
// on these hand-authored surfaces under a DIFFERENT string than
// `TRACKS.labelBg`/`labelEn` (e.g. the `biotech` track's `labelBg` is
// "Биотехнологии", but index.html's about[]/hero-grid/dropdowns all say
// "BioTech" instead — an intentional pre-existing wording choice, not a
// gap). A naive presence check couldn't tell "already covered under a
// different name" apart from "genuinely missing", so it inserted
// DUPLICATE near-identical entries next to the existing ones. That is worse
// than doing nothing — silently duplicated JSON-LD/dropdown options on a
// live, publicly indexed page. Do not reintroduce auto-insertion here
// without a much more reliable way to recognize existing synonyms; when in
// doubt, a false-positive warning a human dismisses in five seconds is far
// cheaper than a false "fix" that ships duplicate content.
// ---------------------------------------------------------------------------
function checkListCoverage(html, filePath, TRACKS, label, findRegion, describe, warnings) {
  const region = findRegion(html);
  if (region == null) {
    warnings.push(`${filePath}: ${label} not found — skipped its track-coverage check.`);
    return;
  }
  for (const track of TRACKS) {
    if (!describe(region, track)) {
      warnings.push(`${filePath}: track "${track.id}" (${track.labelBg}) not found verbatim in ${label} — VERIFY MANUALLY before assuming it's missing (it may already be represented under different wording, the way "biotech"/"Биотехнологии" appears as "BioTech" in several of these spots). Only add it by hand if it's genuinely absent.`);
    }
  }
}

function findJsonLdAboutRegion(html) {
  const match = html.match(/"about": \[\n([\s\S]*?)\n      \],/);
  return match ? match[1] : null;
}

function findModalStreamRegion(html, selectId) {
  const re = new RegExp(`<select id="${selectId}">\\n([\\s\\S]*?)\\n\\s*</select>`);
  const match = html.match(re);
  return match ? match[1] : null;
}

function findHeroGridRegion(html) {
  const gridIdx = html.indexOf('class="streams-inner-grid"');
  return gridIdx === -1 ? null : html.slice(gridIdx, gridIdx + 8000);
}

function findProgramTracksRegion(html) {
  const match = html.match(/var PROGRAM_TRACKS = \[([\s\S]*?)\];/);
  return match ? match[1] : null;
}

// ---------------------------------------------------------------------------
// The "N тематични области"/"N thematic areas" heading/hero copy on
// index.html/en/index.html (NOT the same thing as speakers.html's
// auto-computed "N ТЕМАТИЧНИ ТРАКА" stat, and NOT auto-fixed — see below).
// Appears 3x per file: the hero subtitle paragraph (data-bg/data-en pair +
// its own rendered text) and the "N тематични области./N thematic areas."
// section heading (data-bg only — its data-en counterpart uses different
// wording entirely, no number in it, so only the BG data-bg + rendered BG
// text carry this number on that particular element).
//
// Deliberately NOT auto-updated (explicit user decision — see project
// memory): this number has never tracked any single derivable count (it
// undercounts the actual "streams-inner-grid" icon list even today, which
// includes non-track marketing entries like "Гейминг"), so picking a
// replacement value automatically would just trade one unmaintained number
// for a different unmaintained number. Every run prints a WARNING with the
// exact 2 files/6 spots to hand-review whenever it looks out of date vs.
// TRACKS.length — never edits them.
// ---------------------------------------------------------------------------
function checkThematicAreasHeroCountCopy(html, filePath, TRACKS, warnings) {
  const re = /(\d+)\s+(?:тематични области|thematic areas)/g;
  const found = new Set();
  let m;
  while ((m = re.exec(html))) found.add(m[1]);
  if (found.size === 0) {
    warnings.push(`${filePath}: could not find the "N thematic areas" hero/heading copy — skipped its count check.`);
    return;
  }
  for (const n of found) {
    if (Number(n) !== TRACKS.length) {
      warnings.push(`${filePath}: hero/heading copy says "${n} тематични области"/"${n} thematic areas", but TRACKS now has ${TRACKS.length} entries — this number is NOT auto-updated (by design, see generator source comment), review by hand in BOTH index.html and en/index.html (hero subtitle + section heading, 3 spots per file) and decide the right wording; don't just plug in ${TRACKS.length} without checking it still reads naturally.`);
    }
  }
}

function checkTrackCoverage(TRACKS, templateBg, templateEn, warnings) {
  const indexPath = path.join(ROOT, 'index.html');
  const enIndexPath = path.join(ROOT, 'en', 'index.html');
  const speakersHtmlPath = path.join(ROOT, 'speakers.html');
  const enSpeakersHtmlPath = path.join(ROOT, 'en', 'speakers.html');

  const indexHtml = readText(indexPath);
  const enIndexHtml = readText(enIndexPath);
  const speakersHtml = readText(speakersHtmlPath);
  const enSpeakersHtml = readText(enSpeakersHtmlPath);

  const byLabelBg = (region, track) => region.includes(`data-bg="${attrEsc(track.labelBg)}"`) || region.includes(`"name": ${jsonStr(track.labelBg)}`);
  const byLabelEn = (region, track) => region.includes(`data-bg="${attrEsc(track.labelBg)}"`) || region.includes(`"name": ${jsonStr(track.labelEn)}`);

  checkListCoverage(indexHtml, indexPath, TRACKS, 'Event.about[] JSON-LD', findJsonLdAboutRegion, byLabelBg, warnings);
  checkListCoverage(enIndexHtml, enIndexPath, TRACKS, 'Event.about[] JSON-LD', findJsonLdAboutRegion, byLabelEn, warnings);
  checkListCoverage(indexHtml, indexPath, TRACKS, '<select id="spk-stream"> (apply-as-speaker modal)', h => findModalStreamRegion(h, 'spk-stream'), byLabelBg, warnings);
  checkListCoverage(enIndexHtml, enIndexPath, TRACKS, '<select id="spk-stream"> (apply-as-speaker modal)', h => findModalStreamRegion(h, 'spk-stream'), byLabelEn, warnings);
  checkListCoverage(speakersHtml, speakersHtmlPath, TRACKS, '<select id="sp-stream"> (apply-as-speaker modal)', h => findModalStreamRegion(h, 'sp-stream'), byLabelBg, warnings);
  checkListCoverage(enSpeakersHtml, enSpeakersHtmlPath, TRACKS, '<select id="sp-stream"> (apply-as-speaker modal)', h => findModalStreamRegion(h, 'sp-stream'), byLabelEn, warnings);
  checkListCoverage(templateBg, 'speakers/martin-kuvandzhiev/index.html (per-speaker template)', TRACKS, '<select id="sp-stream"> (apply-as-speaker modal)', h => findModalStreamRegion(h, 'sp-stream'), byLabelBg, warnings);
  checkListCoverage(templateEn, 'en/speakers/martin-kuvandzhiev/index.html (per-speaker template)', TRACKS, '<select id="sp-stream"> (apply-as-speaker modal)', h => findModalStreamRegion(h, 'sp-stream'), byLabelEn, warnings);
  checkListCoverage(indexHtml, indexPath, TRACKS, 'the homepage "N thematic areas" icon grid', findHeroGridRegion, byLabelBg, warnings);
  checkListCoverage(enIndexHtml, enIndexPath, TRACKS, 'the homepage "N thematic areas" icon grid', findHeroGridRegion, byLabelEn, warnings);
  checkListCoverage(indexHtml, indexPath, TRACKS, 'PROGRAM_TRACKS (3-day program filter pills)', findProgramTracksRegion, (region, track) => region.includes(`id: '${track.id}'`), warnings);
  checkListCoverage(enIndexHtml, enIndexPath, TRACKS, 'PROGRAM_TRACKS (3-day program filter pills)', findProgramTracksRegion, (region, track) => region.includes(`id: '${track.id}'`), warnings);

  checkThematicAreasHeroCountCopy(indexHtml, indexPath, TRACKS, warnings);
  checkThematicAreasHeroCountCopy(enIndexHtml, enIndexPath, TRACKS, warnings);
}

// ---------------------------------------------------------------------------
function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');

  const { TRACKS, SPEAKERS } = loadSpeakersData();
  const trackById = new Map(TRACKS.map(t => [t.id, t]));

  const templateBgPath = path.join(ROOT, 'speakers', 'martin-kuvandzhiev', 'index.html');
  const templateEnPath = path.join(ROOT, 'en', 'speakers', 'martin-kuvandzhiev', 'index.html');
  for (const p of [templateBgPath, templateEnPath]) {
    if (!fs.existsSync(p)) fail(`Template file not found: ${p}`);
  }
  const templateBg = readText(templateBgPath);
  const templateEn = readText(templateEnPath);

  const version = todayStamp();
  const written = [];
  const warnings = [];

  const speakersHtmlPath = path.join(ROOT, 'speakers.html');
  const enSpeakersHtmlPath = path.join(ROOT, 'en', 'speakers.html');
  const indexHtmlPath = path.join(ROOT, 'index.html');
  const enIndexHtmlPath = path.join(ROOT, 'en', 'index.html');

  // Warn-only — see checkTrackCoverage's own header comment for why this
  // never auto-edits anything.
  try {
    checkTrackCoverage(TRACKS, templateBg, templateEn, warnings);
  } catch (e) {
    warnings.push(`Track coverage check: ${e.message}`);
  }

  for (const sp of SPEAKERS) {
    const track = trackById.get(sp.track);
    if (!track) {
      warnings.push(`Speaker "${sp.id}" references unknown track "${sp.track}" — skipped.`);
      continue;
    }
    let bgHtml, enHtml;
    try {
      bgHtml = transformDoc(templateBg, sp, track, 'bg');
      enHtml = transformDoc(templateEn, sp, track, 'en');
    } catch (e) {
      warnings.push(`Speaker "${sp.id}": ${e.message}`);
      continue;
    }

    const bgOutPath = path.join(ROOT, 'speakers', sp.id, 'index.html');
    const enOutPath = path.join(ROOT, 'en', 'speakers', sp.id, 'index.html');

    if (!dryRun) {
      fs.mkdirSync(path.dirname(bgOutPath), { recursive: true });
      fs.mkdirSync(path.dirname(enOutPath), { recursive: true });
      fs.writeFileSync(bgOutPath, bgHtml, 'utf8');
      fs.writeFileSync(enOutPath, enHtml, 'utf8');
    }
    written.push(bgOutPath, enOutPath);
  }

  try {
    const speakersHtmlOut = updateListingPage(readText(speakersHtmlPath), speakersHtmlPath, SPEAKERS, 'bg', version, TRACKS);
    const enSpeakersHtmlOut = updateListingPage(readText(enSpeakersHtmlPath), enSpeakersHtmlPath, SPEAKERS, 'en', version, TRACKS);
    if (!dryRun) {
      fs.writeFileSync(speakersHtmlPath, speakersHtmlOut, 'utf8');
      fs.writeFileSync(enSpeakersHtmlPath, enSpeakersHtmlOut, 'utf8');
    }
    written.push(speakersHtmlPath, enSpeakersHtmlPath);
  } catch (e) {
    warnings.push(`speakers.html / en/speakers.html: ${e.message}`);
  }

  try {
    const indexHtmlOut = updateEventPerformerPage(readText(indexHtmlPath), indexHtmlPath, SPEAKERS, trackById, 'bg');
    const enIndexHtmlOut = updateEventPerformerPage(readText(enIndexHtmlPath), enIndexHtmlPath, SPEAKERS, trackById, 'en');
    if (!dryRun) {
      fs.writeFileSync(indexHtmlPath, indexHtmlOut, 'utf8');
      fs.writeFileSync(enIndexHtmlPath, enIndexHtmlOut, 'utf8');
    }
    written.push(indexHtmlPath, enIndexHtmlPath);
  } catch (e) {
    warnings.push(`index.html / en/index.html Event.performer: ${e.message}`);
  }

  const sitemapPath = path.join(ROOT, 'sitemap.xml');
  try {
    const sitemapOut = updateSitemap(sitemapPath, SPEAKERS);
    if (!dryRun) fs.writeFileSync(sitemapPath, sitemapOut, 'utf8');
    written.push(sitemapPath);
  } catch (e) {
    warnings.push(`sitemap.xml: ${e.message}`);
  }

  console.log(`${dryRun ? '[DRY RUN] ' : ''}Speakers processed: ${SPEAKERS.length}`);
  console.log(`Files ${dryRun ? 'that would be written' : 'written'}: ${written.length}`);
  if (!dryRun) written.forEach(f => console.log('  ' + f));
  console.log(`Cache-bust version stamped on data/speakers-data.js references: ?v=${version}`);
  if (warnings.length) {
    console.log('\nWarnings:');
    warnings.forEach(w => console.log('  - ' + w));
    process.exitCode = 1;
  }
}

main();
