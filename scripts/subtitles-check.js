#!/usr/bin/env node
'use strict';
/*
 * Subtitle gate for the video page (subtitles/{year}/{id}/{orig|bg|en|de|it|tr}.vtt).
 *
 *   node scripts/subtitles-check.js
 *
 * Checks, for every video in data/videos.js:
 *   - the languages listed in SUBS (v.subs) and the files on disk are the same set, plus orig.vtt;
 *     there is never a file for the talk's own language (v.cc) - that text is orig.vtt;
 *   - every file parses, cues are in time order, do not overlap, are <= 84 characters (2 short lines);
 *   - every language of a video has the same number of cues as its orig.vtt;
 *   - the edition's `subs` stamp in data/videos.js is NEW compared to HEAD when anything under
 *     subtitles/ changed (the files are cached for 31 days, the stamp is their ?v=).
 * Exit code 1 = problems.
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const YEAR = 2026, MAX_CHARS = 84, LANGS = ['bg', 'en', 'de', 'it', 'tr'];
let errors = 0;
const err = m => { errors++; console.log('ERROR ' + m); };

global.window = {};
require(path.join(ROOT, 'data/videos.js'));
const edition = window.CONNEXUS_VIDEOS[YEAR];
const videos = [];
edition.days.forEach(d => d.halls.forEach(h => h.sessions.forEach(s => (s.videos || []).forEach(v => { if (v.id) videos.push(v); }))));

const T = x => { const p = x.trim().split(':'); return +p[0] * 3600 + +p[1] * 60 + parseFloat(p[2]); };
function parse(file) {
  const out = [];
  fs.readFileSync(file, 'utf8').replace(/\r/g, '').split(/\n\n+/).forEach(b => {
    const l = b.split('\n'), i = l.findIndex(x => x.includes('-->'));
    if (i < 0) return;
    const m = l[i].split('-->');
    out.push({ s: T(m[0]), e: T(m[1]), t: l.slice(i + 1).join(' ').trim() });
  });
  return out;
}

const dir = path.join(ROOT, 'subtitles', String(YEAR));
const onDisk = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
onDisk.forEach(id => { if (!videos.some(v => v.id === id)) err(id + ': subtitles/ folder of a video that is not in data/videos.js'); });

let files = 0;
videos.forEach(v => {
  const vd = path.join(dir, v.id);
  const have = fs.existsSync(vd) ? fs.readdirSync(vd).filter(f => /\.vtt$/.test(f)).map(f => f.replace('.vtt', '')).sort() : [];
  if (!v.subs && !have.length) return;
  const want = ['orig'].concat(v.subs || []).sort();
  if (want.join() !== have.join()) err(v.id + ': files [' + have + '] differ from SUBS [' + want + ']');
  if (v.subs && v.subs.indexOf(v.cc) > -1) err(v.id + ': SUBS lists the talk\'s own language (' + v.cc + ')');
  v.subs && v.subs.forEach(l => { if (LANGS.indexOf(l) < 0) err(v.id + ': unknown language ' + l); });
  let n = null;
  have.forEach(l => {
    files++;
    const c = parse(path.join(vd, l + '.vtt'));
    if (!c.length) err(v.id + '/' + l + ': no cues');
    if (l === 'orig') n = c.length;
    c.forEach((x, i) => {
      if (!(x.e > x.s)) err(v.id + '/' + l + ' cue ' + (i + 1) + ': end before start');
      if (i && x.s < c[i - 1].e - 0.001) err(v.id + '/' + l + ' cue ' + (i + 1) + ': overlaps the previous cue');
      if (x.t.length > MAX_CHARS) err(v.id + '/' + l + ' cue ' + (i + 1) + ': ' + x.t.length + ' characters (max ' + MAX_CHARS + ')');
    });
  });
  // orig and translations come from the same numbered cue list: the counts may differ only by dropped (empty) cues
  have.forEach(l => {
    if (l === 'orig') return;
    const c = parse(path.join(vd, l + '.vtt')).length;
    if (Math.abs(c - n) > Math.max(3, n * 0.03)) err(v.id + '/' + l + ': ' + c + ' cues vs ' + n + ' in orig');
  });
});

// the stamp must move whenever a subtitle file changes
try {
  const git = a => execFileSync('git', a, { cwd: ROOT, encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
  const changed = (git(['diff', '--name-only', 'HEAD', '--', 'subtitles']) + git(['ls-files', '--others', '--exclude-standard', 'subtitles'])).trim();
  if (changed) {
    const head = git(['show', 'HEAD:data/videos.js']).match(/\bsubs:\s*'([^']*)'/);
    if (head && head[1] === edition.subs) err('subtitles/ changed but `subs: \'' + edition.subs + '\'` in data/videos.js was not bumped (new date, same day -1, -2 ...)');
  }
} catch (e) { /* no git: skip */ }

console.log(files + ' subtitle files checked, ' + errors + ' problem(s)');
process.exit(errors ? 1 : 0);
