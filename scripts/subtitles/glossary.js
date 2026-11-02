// glossary.js <worktree> <out> — every person/organisation named in program-2026.html (EN | BG | role), de-duplicated
const fs = require('fs');
const [wt, out] = process.argv.slice(2);
const html = fs.readFileSync(wt + '/program-2026.html', 'utf8').split(/\r?\n/);
const strs = l => [...l.matchAll(/'((?:[^'\\]|\\.)*)'/g)].map(m => m[1].replace(/\\'/g, "'"));
const seen = new Set(), rows = [];
html.forEach(l => {
  let m = /\bPERSON\(/.exec(l), a;
  if (m) { a = strs(l.slice(m.index)); if (a.length >= 4) { const k = a[1]; if (!seen.has(k)) { seen.add(k); rows.push(a[1] + ' | ' + a[0] + ' | ' + a[3] + ' | ' + a[2]); } } return; }
  m = /\bLABEL\(/.exec(l);
  if (m) { a = strs(l.slice(m.index)); if (a.length >= 4 && /,/.test(a[3])) { const k = a[3]; if (!seen.has(k)) { seen.add(k); rows.push(a[3] + ' | ' + a[2]); } } }
});
fs.writeFileSync(out, '# Names in the CONNEXUS 2026 programme: English | Bulgarian | role (EN) | role (BG)\n' + rows.join('\n') + '\n');
console.log(rows.length, 'entries');
