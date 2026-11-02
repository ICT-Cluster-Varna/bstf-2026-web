// capture.js <outDir> <id> [id...]  — opens each YouTube watch page in Edge, turns captions on
// and saves the player's own timedtext response (ms-precise, word-level) to <outDir>/<id>.json
const { chromium } = require('playwright-core');
const fs = require('fs'), path = require('path');
const [out, ...ids] = process.argv.slice(2);
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:' + (process.env.CDP_PORT || 9334));
  const ctx = browser.contexts()[0];
  const page = ctx.pages()[0] || await ctx.newPage();
  let got = null, translated = 0, throttled = false;
  page.on('response', async r => {
    if (!/\/api\/timedtext/.test(r.url())) return;
    try {
      const t = await r.text();
      const hasWords = t.indexOf('tOffsetMs') > -1;
      if (process.env.DEBUG) console.log('  timedtext status', r.status(), 'len', t.length, 'words:', hasWords, r.url().replace(/^[^?]*\?/, '').split('&').filter(x => !/^(sig|pot|ip|ipbits|expire|sparams|ei|opi|signature|cver|c)=/.test(x)).join('&'));
      if (/[?&]tlang=/.test(r.url())) { console.log('  (ignored a TRANSLATED track, status ' + r.status() + ') - the profile remembers a translation language'); translated++; return; }
      if (r.status() === 429) { throttled = true; return; }
      if (t.length > 200 && t.indexOf('"events"') > -1 && (!got || (hasWords && !got.words))) got = { url: r.url(), body: t, words: hasWords };
    } catch (e) {}
  });
  let fails = 0;
  for (const id of ids) {
    if (throttled) { console.log('STOP: YouTube answered 429, not asking any more'); break; }
    if (translated >= 2) { console.log('STOP: the profile keeps asking for a translation, use a clean profile'); break; }
    if (fails >= 2) { console.log('STOP: two failures in a row, not asking YouTube any more'); break; }
    got = null;
    try {
      await page.goto('https://www.youtube.com/watch?v=' + id, { waitUntil: 'domcontentloaded' });
      try { await page.getByRole('button', { name: /reject all/i }).first().click({ timeout: 4000 }); await sleep(1500); } catch (e) {}
      await page.waitForSelector('.ytp-subtitles-button', { timeout: 20000, state: 'attached' });
      await sleep(2500);
      const tracks = await page.evaluate(() => {
        const c = (window.ytInitialPlayerResponse || {}).captions;
        const t = c && c.playerCaptionsTracklistRenderer && c.playerCaptionsTracklistRenderer.captionTracks;
        return (t || []).map(x => [x.languageCode, x.kind || '']);
      });
      await page.evaluate(() => { const v = document.querySelector('video'); if (v) v.pause(); });
      for (let i = 0; i < 4 && !got; i++) {
        await page.evaluate(() => document.querySelector('.ytp-subtitles-button').click());
        for (let k = 0; k < 8 && !got; k++) await sleep(1000);
        if (!got) await page.evaluate(() => document.querySelector('.ytp-subtitles-button').click());
      }
      if (!got) { console.log(id, 'NO TIMEDTEXT', JSON.stringify(tracks)); fails++; continue; }
      fails = 0;
      const lang = (/[?&]lang=([^&]+)/.exec(got.url) || /[?&]hl=([^&]+)/.exec(got.url) || [])[1];
      fs.writeFileSync(path.join(out, id + '.json'), got.body);
      fs.writeFileSync(path.join(out, id + '.meta.json'), JSON.stringify({ tracks, lang, len: got.body.length }));
      console.log(id, 'ok', got.body.length, JSON.stringify(tracks));
    } catch (e) { console.log(id, 'ERR', String(e).slice(0, 200)); fails++; }
    await sleep(15000 + Math.random() * 5000);
  }
  await browser.close();
})();
