// applyfix.js <scratch> — apply S/fix/<id>/p<k>.tsv lines to S/work/<id>/<lang>.p<k>.tsv ; keeps a log of old -> new
const fs = require('fs'), path = require('path');
const [scratch] = process.argv.slice(2);
const fixRoot = path.join(scratch, 'fix');
if (!fs.existsSync(fixRoot)) { console.log('no fixes'); process.exit(0); }
const log = [];
let applied = 0, rejected = 0, skipped = 0;
fs.readdirSync(fixRoot).forEach(id => {
  fs.readdirSync(path.join(fixRoot, id)).filter(f => /^p\d+\.tsv$/.test(f)).forEach(f => {
    const part = f.match(/^p(\d+)/)[1];
    fs.readFileSync(path.join(fixRoot, id, f), 'utf8').split(/\r?\n/).filter(Boolean).forEach(line => {
      const c = line.split('\t');
      if (c.length < 3) { rejected++; return; }
      const lang = c[0].trim(), n = c[1].trim(), text = c[2].trim();
      if (!/^(orig|bg|en|de|it|tr)$/.test(lang) || !/^\d+$/.test(n) || !text || text.length > 84 || /\t/.test(text)) { rejected++; log.push('REJECT ' + id + ' ' + line.slice(0, 120)); return; }
      const file = path.join(scratch, 'work', id, lang + '.p' + part + '.tsv');
      if (!fs.existsSync(file)) { skipped++; return; }
      const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
      const i = lines.findIndex(l => l.split('\t')[0] === n);
      if (i < 0) { skipped++; return; }
      const old = lines[i].split('\t')[1] || '';
      if (old === text) { skipped++; return; }
      lines[i] = n + '\t' + text;
      fs.writeFileSync(file, lines.join('\n'), 'utf8');
      applied++;
      log.push(id + ' ' + lang + ' #' + n + ': ' + old + '  ->  ' + text + '   [' + (c[3] || '') + ']');
    });
  });
});
fs.writeFileSync(path.join(scratch, 'fixlog.txt'), log.join('\n') + '\n');
console.log('applied', applied, 'rejected', rejected, 'skipped', skipped);
