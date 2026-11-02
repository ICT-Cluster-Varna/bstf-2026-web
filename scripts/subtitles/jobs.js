// jobs.js <scratch> [chunk=220] — one job per video and cue range: prints JSON lines {id, part, from, to, spoken, targets, cues}
const fs = require('fs'), path = require('path');
const [scratch, chunkArg] = process.argv.slice(2);
const CHUNK = +chunkArg || 220;
const ALL = ['bg', 'en', 'de', 'it', 'tr'];
const out = [];
fs.readdirSync(path.join(scratch, 'src')).filter(f => /\.tsv$/.test(f)).forEach(f => {
  const id = f.replace('.tsv', '');
  const metaFile = path.join(scratch, 'raw-brave', id + '.meta.json');
  if (!fs.existsSync(metaFile)) return;
  const spoken = (JSON.parse(fs.readFileSync(metaFile, 'utf8')).lang || 'en').split('-')[0];
  const n = fs.readFileSync(path.join(scratch, 'src', f), 'utf8').trim().split('\n').length;
  const parts = Math.ceil(n / CHUNK);
  for (let p = 1; p <= parts; p++) out.push({ id, part: p, parts, from: (p - 1) * CHUNK + 1, to: Math.min(n, p * CHUNK), spoken, targets: ALL.filter(l => l !== spoken), cues: n });
});
out.forEach(j => console.log(JSON.stringify(j)));
