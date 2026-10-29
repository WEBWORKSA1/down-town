// Build _data/cities.json from v1 data + new cities + per-city sidecars (_build/sidecars/<slug>.json).
const fs = require('fs'), path = require('path');
const base = JSON.parse(fs.readFileSync(path.join(__dirname, 'cities-base.json'), 'utf8'));
const extra = JSON.parse(fs.readFileSync(path.join(__dirname, 'new-cities.json'), 'utf8'));
const out = [];
const strip = t => t.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/\s+/g, ' ').trim();
for (const c of base.concat(extra)) {
  const sc = path.join(__dirname, 'sidecars', c.slug + '.json');
  if (fs.existsSync(sc)) Object.assign(c, JSON.parse(fs.readFileSync(sc, 'utf8')));
  // events: the guide body is the source of truth (div.events in explore/<slug>.html)
  const gp = path.join(__dirname, '..', 'explore', c.slug + '.html');
  if (fs.existsSync(gp)) {
    const body = fs.readFileSync(gp, 'utf8');
    const m = body.match(/<div class="events">([\s\S]*?)<\/div>\s*(?:<p|<h2|\n)/);
    if (m) {
      const evs = [...m[1].matchAll(/<span class="when">([\s\S]*?)<\/span>\s*<span>\s*<strong>([\s\S]*?)<\/strong>\s*[—–-]?\s*([\s\S]*?)<\/span>/g)]
        .map(x => ({ when: strip(x[1]), name: strip(x[2]), desc: strip(x[3]).replace(/^[—–-]\s*/, '') }));
      if (evs.length) c.events = evs;
    }
  }
  if (!c.index) { const s = Object.values(c.s).reduce((a, b) => a + b, 0); c.index = Math.round(s * 1.25); }
  out.push(c);
}
const order = ['north-america', 'europe', 'asia-pacific', 'middle-east-africa', 'latin-america', 'south-asia'];
fs.writeFileSync(path.join(__dirname, '..', '_data', 'cities.json'), '[\n' + out.map(c => JSON.stringify(c)).join(',\n') + '\n]\n');
console.log('cities:', out.length, 'with video:', out.filter(c => c.video).length, 'with events:', out.filter(c => c.events).length);
