#!/usr/bin/env node
'use strict';
/*
 * Cache-bust gate for the CONNEXUS site.
 *
 * Browsers keep everything under images/ videos/ shared/ data/ 3d-model/ for 31 days
 * (web.config). The only thing that makes a visitor fetch a CHANGED file is a CHANGED
 * URL, so:
 *
 *   RULE 1  Every added/changed file in those folders must be referenced with
 *           ?v=<stamp>, and the stamp must be NEW:
 *             - the date of the change (YYYYMMDD), never an old one;
 *             - strictly greater than the stamp the same file had at HEAD;
 *             - several changes on one day: YYYYMMDD, YYYYMMDD-1, YYYYMMDD-2, ...
 *   RULE 2  PDFs in presentations/ carry NO ?v=. They are never edited in place:
 *           a corrected deck is a NEW file name (dimitar-karlovski-v2.pdf).
 *           Names are latin kebab-case; > 30 MB is refused.
 *
 * Usage
 *   node scripts/cache-bust-check.js            staged changes (what .githooks/pre-commit runs)
 *   node scripts/cache-bust-check.js --working  working tree vs HEAD (+ untracked)
 *   node scripts/cache-bust-check.js --fix      also rewrite the stamps to the correct next value
 *
 * Exit code 1 = errors (commit is blocked). Warnings never block.
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const WORKING = args.includes('--working');
const FIX = args.includes('--fix');

const CACHED_DIRS = ['images', 'videos', 'shared', 'data', '3d-model'];
const EXEMPT = new Set(['data/promo-codes.json']);              // 2-minute policy, fetched without ?v=
const TEXT_EXT = /\.(html|js|css|json)$/i;
// participants.html and expo.html are parked pages - not live, never audited.
const SKIP_PREFIX = ['_backup-2026/', 'node_modules/', 'specs/', 'development/', 'docs/', 'presentations/', 'scripts/', '.claude/', 'participants.html', 'expo.html'];
const PDF_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*\.pdf$/;
const PDF_MAX = 30 * 1024 * 1024;
const PDF_WARN = 10 * 1024 * 1024;

function git(argv, opts) {
  return execFileSync('git', argv, Object.assign({ cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 30, stdio: ['pipe', 'pipe', 'ignore'] }, opts || {}));
}

// ---- stamps ---------------------------------------------------------------
const STAMP_RE = /^(\d{8})(?:-(\d+))?$/;
function parse(s) { const m = STAMP_RE.exec(s || ''); return m ? { d: m[1], n: m[2] ? parseInt(m[2], 10) : 0 } : null; }
function cmp(a, b) { return a.d !== b.d ? (a.d < b.d ? -1 : 1) : a.n - b.n; }
function fmt(p) { return p.n ? `${p.d}-${p.n}` : p.d; }
function ymd(date) {
  const p = n => String(n).padStart(2, '0');
  return `${date.getFullYear()}${p(date.getMonth() + 1)}${p(date.getDate())}`;
}
// Next stamp that is both >= the change date and > what HEAD had.
function nextStamp(changeDate, headMax) {
  if (!headMax || headMax.d < changeDate) return changeDate;
  return fmt({ d: headMax.d, n: headMax.n + 1 });
}

// ---- which files changed --------------------------------------------------
function changedFiles() {
  const out = [];
  const diff = git(WORKING
    ? ['diff', 'HEAD', '--name-status', '-M', '-z', '--diff-filter=ACMRD']
    : ['diff', '--cached', '--name-status', '-M', '-z', '--diff-filter=ACMRD']);
  const parts = diff.split('\0').filter(Boolean);
  for (let i = 0; i < parts.length;) {
    const st = parts[i][0];
    if (st === 'R' || st === 'C') { out.push({ status: 'R', from: parts[i + 1], path: parts[i + 2] }); i += 3; }
    else { out.push({ status: st, path: parts[i + 1] }); i += 2; }
  }
  if (WORKING) {
    git(['ls-files', '--others', '--exclude-standard', '-z']).split('\0').filter(Boolean)
      .forEach(p => out.push({ status: 'A', path: p }));
  }
  return out;
}

// ---- file contents: what WILL be committed ---------------------------------
function readBlobs(entries) {          // entries: [{path, sha}] -> Map(path -> string)
  const res = new Map();
  if (!entries.length) return res;
  const buf = execFileSync('git', ['cat-file', '--batch'], { cwd: ROOT, input: entries.map(e => e.sha).join('\n') + '\n', maxBuffer: 1 << 30 });
  let pos = 0;
  for (const e of entries) {
    const nl = buf.indexOf(10, pos);
    const header = buf.slice(pos, nl).toString('utf8').split(' ');
    const size = parseInt(header[2], 10);
    res.set(e.path, buf.slice(nl + 1, nl + 1 + size).toString('utf8'));
    pos = nl + 1 + size + 1;
  }
  return res;
}
function lsEntries(treeish) {
  const raw = treeish === 'INDEX' ? git(['ls-files', '-s', '-z']) : git(['ls-tree', '-r', '-z', treeish]);
  return raw.split('\0').filter(Boolean).map(l => {
    if (treeish === 'INDEX') { const m = /^\d+ ([0-9a-f]+) \d\t(.*)$/.exec(l); return { sha: m[1], path: m[2] }; }
    const m = /^\d+ blob ([0-9a-f]+)\t(.*)$/.exec(l); return m ? { sha: m[1], path: m[2] } : null;
  }).filter(Boolean);
}
const textWanted = p => TEXT_EXT.test(p) && !SKIP_PREFIX.some(s => p.startsWith(s));

// ---- references -----------------------------------------------------------
const REF_RE = /(^|["'(=\s,])((?:\.\.\/|\/)?(?:images|videos|shared|data|3d-model)\/[A-Za-z0-9_\-./%@+]+?\.[A-Za-z0-9]+)(\?v=([^"'\s)&<>]*))?/g;
// Mentions inside comments are not loads - drop them before scanning.
function stripComments(t) {
  return t.replace(/<!--[\s\S]*?-->/g, '').replace(/\/\*[\s\S]*?\*\//g, '').replace(/^[ \t]*\/\/.*$/gm, '');
}
function refsIn(text, file, into) {
  text = stripComments(text);
  let m; REF_RE.lastIndex = 0;
  while ((m = REF_RE.exec(text))) {
    if (m[3] !== undefined && m[4] === '') continue;   // ?v= + concatenation: stamp is built at run time
    const asset = m[2].replace(/^(\.\.\/|\/)+/, '');
    if (!into.has(asset)) into.set(asset, []);
    into.get(asset).push({ file, stamp: m[4] === undefined ? null : m[4] });
  }
}

// ---------------------------------------------------------------------------
const errors = [], warnings = [];
const changed = changedFiles();

const cachedChanged = changed.filter(c => c.status !== 'D' && CACHED_DIRS.some(d => c.path.startsWith(d + '/')) && !EXEMPT.has(c.path));
const pdfChanged = changed.filter(c => c.path.startsWith('presentations/'));

// Current references (index content when staged, working tree when --working)
const cur = new Map();
let headRefs = new Map();
if (cachedChanged.length || pdfChanged.length) {
  let entries;
  let texts;
  if (WORKING) {
    const files = git(['ls-files', '-co', '--exclude-standard', '-z']).split('\0').filter(textWanted);
    texts = new Map(files.filter(f => fs.existsSync(path.join(ROOT, f))).map(f => [f, fs.readFileSync(path.join(ROOT, f), 'utf8')]));
  } else {
    entries = lsEntries('INDEX').filter(e => textWanted(e.path));
    texts = readBlobs(entries);
  }
  for (const [f, t] of texts) refsIn(t, f, cur);

  const headTexts = readBlobs(lsEntries('HEAD').filter(e => textWanted(e.path)));
  for (const [f, t] of headTexts) refsIn(t, f, headRefs);

  // RULE 2 (links): no ?v= on a PDF link, anywhere
  for (const [f, t] of texts) {
    const m = /presentations\/[A-Za-z0-9_.-]+\.pdf\?[^\s"')]*/.exec(t);
    if (m) errors.push(`${f}: PDF link with a query string (${m[0]}). PDFs are immutable - no ?v=; a new version = a new file name.`);
  }
}

// RULE 1
const fixes = new Map();        // asset -> new stamp
for (const c of cachedChanged) {
  const refs = cur.get(c.path) || [];
  const wtPath = path.join(ROOT, c.path);
  const mtime = fs.existsSync(wtPath) ? ymd(fs.statSync(wtPath).mtime) : ymd(new Date());
  const hist = (headRefs.get(c.status === 'R' ? c.from : c.path) || []).map(r => parse(r.stamp)).filter(Boolean);
  const headMax = hist.length ? hist.reduce((a, b) => (cmp(a, b) >= 0 ? a : b)) : null;
  const wanted = nextStamp(mtime, c.status === 'A' ? null : headMax);
  if (!refs.length) { warnings.push(`${c.path}: changed but nothing references it - nothing to bust (is it used from JS?).`); continue; }
  const bad = [];
  for (const r of refs) {
    const p = parse(r.stamp);
    if (!r.stamp) bad.push(`${r.file}: no ?v=`);
    else if (!p) bad.push(`${r.file}: malformed stamp "${r.stamp}"`);
    else if (p.d < mtime) bad.push(`${r.file}: stamp ${r.stamp} is older than the change (${mtime})`);
    else if (c.status !== 'A' && headMax && cmp(p, headMax) <= 0) bad.push(`${r.file}: stamp ${r.stamp} was already used at HEAD (${fmt(headMax)}) - file changed, URL did not`);
  }
  if (bad.length) {
    fixes.set(c.path, wanted);
    const shown = bad.slice(0, 3).join('\n      ');
    errors.push(`${c.path} -> use ?v=${wanted}\n      ${shown}${bad.length > 3 ? `\n      ... and ${bad.length - 3} more reference(s)` : ''}`);
  }
}

// RULE 2 (files)
for (const c of pdfChanged) {
  const name = path.basename(c.path);
  if (c.status === 'D') continue;
  if (c.status === 'M') errors.push(`${c.path}: edited in place. PDFs are immutable - save the corrected deck as a NEW name (e.g. ${name.replace(/(-v\d+)?\.pdf$/, m => (m === '.pdf' ? '-v2.pdf' : m))}) and point data/presentations.js at it.`);
  if (!/\.pdf$/i.test(name)) { errors.push(`${c.path}: only .pdf belongs in presentations/.`); continue; }
  if (!PDF_NAME.test(name)) errors.push(`${c.path}: file name must be latin kebab-case, no spaces/capitals (dimitar-karlovski.pdf, dimitar-karlovski-v2.pdf).`);
  const wt = path.join(ROOT, c.path);
  if (fs.existsSync(wt)) {
    const size = fs.statSync(wt).size;
    if (size > PDF_MAX) errors.push(`${c.path}: ${(size / 1048576).toFixed(1)} MB - over the 30 MB limit, compress it first.`);
    else if (size > PDF_WARN) warnings.push(`${c.path}: ${(size / 1048576).toFixed(1)} MB - consider compressing (> 10 MB).`);
  }
}

// presentations.js must only point at files that exist
const presJs = path.join(ROOT, 'data', 'presentations.js');
if (fs.existsSync(presJs)) {
  for (const m of fs.readFileSync(presJs, 'utf8').matchAll(/file:\s*"([^"]+)"/g)) {
    if (!fs.existsSync(path.join(ROOT, 'presentations', m[1]))) errors.push(`data/presentations.js: presentations/${m[1]} does not exist.`);
  }
}

// ---- --fix ------------------------------------------------------------------
if (FIX && fixes.size) {
  const touched = new Set();
  for (const [asset, stamp] of fixes) {
    for (const r of cur.get(asset) || []) {
      const file = path.join(ROOT, r.file);
      const raw = fs.readFileSync(file, 'utf8');
      const esc = asset.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(`((?:^|["'(=\\s,])(?:\\.\\./|/)?${esc})\\?v=[^"'\\s)&<>]*`, 'g');
      const next = raw.replace(re, `$1?v=${stamp}`);
      if (next !== raw) { fs.writeFileSync(file, next); touched.add(r.file); }
    }
  }
  console.log(`--fix: re-stamped ${fixes.size} asset(s) in ${touched.size} file(s). Re-stage them, then re-run the check.`);
  console.log('       (generated speaker pages: re-run the generator instead of trusting a hand patch)');
}

warnings.forEach(w => console.log('WARN  ' + w));
if (errors.length) {
  console.log(`\ncache-bust check FAILED (${errors.length}):`);
  errors.forEach(e => console.log('  ERROR ' + e));
  console.log('\nRule: changed file => new ?v= (change date; same day -1, -2, ...). PDFs: new file name, no ?v=. See .claude/skills/cache-bust/SKILL.md');
  process.exit(1);
}
console.log(`cache-bust check OK (${cachedChanged.length} cached file(s), ${pdfChanged.length} presentation file(s) checked).`);
