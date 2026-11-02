// build.js <scratch> <worktree> <id...>
// src/<id>.tsv (timing) + work/<id>/<lang>.p<k>.tsv or <lang>.tsv (texts) -> <worktree>/subtitles/2026/<id>/<lang>.vtt, with checks
const fs = require('fs'), path = require('path');
const [scratch, wt, ...ids] = process.argv.slice(2);
const MAX = 84;
const ts = ms => {
  const h = Math.floor(ms / 3600000), m = Math.floor(ms / 60000) % 60, s = Math.floor(ms / 1000) % 60, x = Math.round(ms % 1000);
  return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0') + '.' + String(x).padStart(3, '0');
};
let bad = 0;
ids.forEach(id => {
  const src = fs.readFileSync(path.join(scratch, 'src', id + '.tsv'), 'utf8').trim().split('\n').map(l => l.split('\t'));
  const dir = path.join(scratch, 'work', id);
  // files of one language: <lang>.tsv or <lang>.p1.tsv, <lang>.p2.tsv ... (cue ranges), read together
  const byLang = {};
  fs.readdirSync(dir).filter(f => /\.tsv$/.test(f)).forEach(f => {
    const m = /^([a-z]+)(?:\.p(\d+))?\.tsv$/.exec(f);
    if (!m) return;
    (byLang[m[1]] = byLang[m[1]] || []).push({ f, p: +(m[2] || 0) });
  });
  Object.keys(byLang).forEach(lang => {
    const txt = new Map();
    byLang[lang].sort((a, b) => a.p - b.p).forEach(({ f }) => {
      fs.readFileSync(path.join(dir, f), 'utf8').split(/\r?\n/).filter(Boolean).forEach(l => {
        const i = l.indexOf('\t') < 0 ? l.length : l.indexOf('\t');
        txt.set(l.slice(0, i).trim(), l.slice(i + 1).trim());
      });
    });
    const out = ['WEBVTT', ''];
    let n = 0, long = 0, missing = 0;
    src.forEach(r => {
      if (!txt.has(r[0])) { missing++; return; }
      const t = txt.get(r[0]);
      if (!t) return;
      if (t.length > MAX) { long++; console.log('  LONG', id, lang, '#' + r[0], t.length, t); }
      if (/-->/.test(t)) console.log('  BAD ARROW', id, lang, r[0]);
      out.push(String(++n), ts(+r[1]) + ' --> ' + ts(+r[2]), t, '');
    });
    if (missing) { bad++; console.log('  MISSING', id, lang, 'missing', missing, 'have', txt.size, 'src', src.length); }
    const o = path.join(wt, 'subtitles', '2026', id);
    fs.mkdirSync(o, { recursive: true });
    fs.writeFileSync(path.join(o, lang + '.vtt'), out.join('\n'), 'utf8');
    console.log(id, lang, n + ' cues', long ? long + ' too long' : '');
  });
});
process.exit(bad ? 1 : 0);
