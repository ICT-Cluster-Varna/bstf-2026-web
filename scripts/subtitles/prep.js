// prep.js <scratch> <worktree> <id...>   (RAW=<dir name under scratch>, default raw)
// raw timedtext JSON -> src/<id>.tsv (N, startMs, endMs, text) and ctx/<id>.txt
// Two data formats come from YouTube: word-level (every word has tOffsetMs) and sentence-level (one text per event).
const fs = require('fs'), path = require('path');
const [scratch, wt, ...ids] = process.argv.slice(2);
global.window = {};
require(path.join(wt, 'data/videos.js'));
const E = window.CONNEXUS_VIDEOS[2026], info = {};
E.days.forEach(d => d.halls.forEach(h => h.sessions.forEach(s => (s.videos || []).forEach(v => {
  if (v.id) info[v.id] = { d, h, s, v };
}))));
fs.mkdirSync(path.join(scratch, 'src'), { recursive: true });
fs.mkdirSync(path.join(scratch, 'ctx'), { recursive: true });
const RAW = process.env.RAW || 'raw';
ids.forEach(id => {
  const j = JSON.parse(fs.readFileSync(path.join(scratch, RAW, id + '.json'), 'utf8'));
  const meta = JSON.parse(fs.readFileSync(path.join(scratch, RAW, id + '.meta.json'), 'utf8'));
  const hasWords = j.events.some(e => e.segs && e.segs.length > 2 && e.segs.some(sg => sg.tOffsetMs > 0));
  let rows;
  if (hasWords) {
    // word-level: absolute ms of every word, cues built from the words
    const words = [];
    let inTag = false;
    j.events.forEach(e => {
      if (!e.segs || e.aAppend) return;
      e.segs.forEach(sg => {
        sg.utf8.split(/\s+/).filter(Boolean).forEach(tok => {
          if (tok === '>>') return;
          if (tok[0] === '[') inTag = true;
          const skip = inTag;
          if (inTag && tok[tok.length - 1] === ']') inTag = false;
          if (skip) return;
          words.push({ t: e.tStartMs + (sg.tOffsetMs || 0), w: tok });
        });
      });
    });
    words.sort((x, y) => x.t - y.t);
    const sentEnd = w => /[.!?…]["”')]*$/.test(w);
    const groups = [];
    let cur = [];
    const textLen = c => c.map(x => x.w).join(' ').length;
    words.forEach(w => {
      if (cur.length) {
        const prev = cur[cur.length - 1], len = textLen(cur);
        if (len + 1 + w.w.length > 68 || (sentEnd(prev.w) && len >= 24) || (/[,;:]$/.test(prev.w) && len >= 44) ||
            (w.t - prev.t > 1500 && len >= 16) || w.t - cur[0].t > 6500) { groups.push(cur); cur = []; }
      }
      cur.push(w);
    });
    if (cur.length) groups.push(cur);
    rows = groups.map((g, i) => {
      const start = g[0].t, nxt = groups[i + 1];
      let end = g[g.length - 1].t + 550;
      if (nxt && nxt[0].t < end + 400) end = nxt[0].t;
      end = Math.max(end, start + 900);
      if (nxt && end > nxt[0].t) end = nxt[0].t;
      return [start, end, g.map(x => x.w).join(' ')];
    });
  } else {
    // sentence-level: one cue per YouTube event (what YouTube's own CC shows, at its time); long ones split in two by length
    const evs = j.events.filter(e => e.segs && !e.aAppend && e.segs.some(sg => sg.utf8 && sg.utf8.trim()));
    rows = [];
    evs.forEach((e, i) => {
      const text = e.segs.map(sg => sg.utf8).join('').replace(/\s*\n\s*/g, ' ').replace(/>>\s*/g, '').replace(/\[[^\]]*\]/g, ' ').replace(/\s+/g, ' ').trim();
      if (!text) return;
      const nxt = evs[i + 1];
      let end = e.tStartMs + (e.dDurationMs || 3000);
      if (nxt && nxt.tStartMs < end) end = nxt.tStartMs;
      end = Math.max(end, e.tStartMs + 900);
      if (text.length <= 72) { rows.push([e.tStartMs, end, text]); return; }
      let cut = -1, best = 1e9;
      for (let k = 20; k < text.length - 20; k++) {
        if (text[k] === ' ' && /[.!?,;:]$/.test(text.slice(0, k))) { const d = Math.abs(k - text.length / 2); if (d < best) { best = d; cut = k; } }
      }
      if (cut < 0) for (let k = 20; k < text.length - 20; k++) { if (text[k] === ' ') { const d = Math.abs(k - text.length / 2); if (d < best) { best = d; cut = k; } } }
      if (cut < 0) { rows.push([e.tStartMs, end, text]); return; }
      const mid = Math.round(e.tStartMs + (end - e.tStartMs) * cut / text.length);
      rows.push([e.tStartMs, mid, text.slice(0, cut).trim()], [mid, end, text.slice(cut).trim()]);
    });
  }
  fs.writeFileSync(path.join(scratch, 'src', id + '.tsv'), rows.map((r, i) => [i + 1, r[0], r[1], r[2]].join('\t')).join('\n') + '\n');
  const x = info[id], sp = lang => (x.v.speakers || []).map(s => s[lang]).join('; ');
  fs.writeFileSync(path.join(scratch, 'ctx', id + '.txt'), [
    'Video: ' + id,
    'Spoken language of the talk: ' + (meta.lang || (meta.tracks[0] || [])[0]),
    'Title (EN): ' + x.v.en, 'Title (BG): ' + x.v.bg,
    'Speakers (EN): ' + sp('en'), 'Speakers (BG): ' + sp('bg'),
    'Session (EN): ' + x.s.en, 'Session (BG): ' + x.s.bg,
    'Event: CONNEXUS 2026 (Black Sea Technology Forum, formerly BSTF), Varna, Bulgaria, 29 Sep-1 Oct 2026; organiser ICT Cluster Varna',
    ''
  ].join('\n'));
  console.log(id, rows.length, 'cues', meta.lang, hasWords ? 'word-level' : 'sentence-level');
});
