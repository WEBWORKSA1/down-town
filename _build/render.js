#!/usr/bin/env node
// Local preview renderer that mirrors GitHub Pages' Jekyll closely enough to test Down.Town.
// Usage: node _build/render.js [outDir]   (default: ../_site-preview next to the repo)
// GitHub Pages builds the real site with Jekyll; this exists so the site can be checked without Ruby.
const fs = require('fs'), path = require('path');
const matter = require('gray-matter');
const yaml = require('js-yaml');
const { Liquid } = require('liquidjs');
const src = path.resolve(__dirname, '..');
const out = path.resolve(process.argv[2] || path.join(src, '..', '_site-preview'));
const cfg = yaml.load(fs.readFileSync(path.join(src, '_config.yml'), 'utf8')) || {};
const exclude = new Set((cfg.exclude || []).concat(['.git', '_site', 'node_modules', '.gitignore']));
const engine = new Liquid({ root: [path.join(src, '_includes')], layouts: path.join(src, '_layouts'), extname: '.html', jekyllInclude: true, dynamicPartials: false, strictFilters: true, timezoneOffset: 0 });
const esc = v => String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
engine.registerFilter('jsonify', v => JSON.stringify(v === undefined ? null : v));
engine.registerFilter('relative_url', v => v);
engine.registerFilter('absolute_url', v => (cfg.url || '') + '/' + String(v).replace(/^\//, ''));
engine.registerFilter('xml_escape', esc);
engine.registerFilter('cgi_escape', v => encodeURIComponent(String(v ?? '')));
engine.registerFilter('slugify', v => String(v ?? '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
engine.registerFilter('number_of_words', v => String(v ?? '').split(/\s+/).filter(Boolean).length);
const toDate = v => (v instanceof Date ? v : new Date(String(v).length === 10 ? v + 'T00:00:00Z' : v));
engine.registerFilter('date_to_xmlschema', v => toDate(v).toISOString().replace('.000Z', '+00:00'));
engine.registerFilter('date_to_rfc822', v => toDate(v).toUTCString().replace('GMT', '+0000'));
engine.registerFilter('where', (arr, k, v) => (arr || []).filter(x => x && x[k] == v));
engine.registerFilter('sort', (arr, k) => [...(arr || [])].sort((a, b) => { const x = k ? a[k] : a, y = k ? b[k] : b; return x > y ? 1 : x < y ? -1 : 0; }));
engine.registerFilter('group_by', (arr, k) => { const m = new Map(); for (const x of arr || []) { const g = x[k]; if (!m.has(g)) m.set(g, []); m.get(g).push(x); } return [...m].map(([name, items]) => ({ name, items, size: items.length })); });

const data = {};
const dataDir = path.join(src, '_data');
if (fs.existsSync(dataDir)) for (const f of fs.readdirSync(dataDir)) {
  const p = path.join(dataDir, f), k = f.replace(/\.(json|ya?ml)$/, '');
  data[k] = f.endsWith('.json') ? JSON.parse(fs.readFileSync(p, 'utf8')) : yaml.load(fs.readFileSync(p, 'utf8'));
}
function walk(d, rel = '') {
  let r = [];
  for (const f of fs.readdirSync(d)) {
    const rp = rel ? rel + '/' + f : f;
    if (exclude.has(f) || exclude.has(rp)) continue;
    if (f.startsWith('_') || (f.startsWith('.') && f !== '.nojekyll' && f !== '.well-known')) continue;
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) r = r.concat(walk(p, rp)); else r.push(rp);
  }
  return r;
}
const urlOf = rp => '/' + rp.replace(/(^|\/)index\.html$/, '$1');
async function renderLayouts(html, page, site, layoutName) {
  while (layoutName) {
    const lm = matter(fs.readFileSync(path.join(src, '_layouts', layoutName + '.html'), 'utf8'));
    html = await engine.parseAndRender(lm.content, { site, page, content: html, layout: lm.data });
    layoutName = lm.data.layout;
  }
  return html;
}
(async () => {
  fs.rmSync(out, { recursive: true, force: true });
  const files = walk(src);
  const pages = [];
  for (const rp of files) {
    if (!/\.(html|md|xml|txt|json|js|css|webmanifest|svg)$/.test(rp)) continue;
    const s = fs.readFileSync(path.join(src, rp), 'utf8');
    if (!s.startsWith('---')) continue;
    const m = matter(s);
    const fm = m.data;
    if (!('layout' in fm)) fm.layout = 'default';
    pages.push(Object.assign({}, fm, { url: urlOf(rp), path: rp, name: path.basename(rp), _body: m.content }));
  }
  const site = Object.assign({}, cfg, { data, pages: pages.map(p => { const c = Object.assign({}, p); delete c._body; return c; }), time: new Date() });
  let n = 0, errs = 0;
  const byPath = new Map(pages.map(p => [p.path, p]));
  for (const rp of files) {
    const o = path.join(out, rp);
    fs.mkdirSync(path.dirname(o), { recursive: true });
    const pg = byPath.get(rp);
    if (!pg) { fs.copyFileSync(path.join(src, rp), o); continue; }
    try {
      const page = Object.assign({}, pg); delete page._body;
      let body = await engine.parseAndRender(pg._body, { site, page });
      body = await renderLayouts(body, page, site, page.layout);
      fs.writeFileSync(o, body); n++;
    } catch (e) { errs++; console.error('ERR', rp, e.message.split('\n')[0]); }
  }
  console.log(`rendered ${n} pages, ${errs} errors -> ${out}`);
  process.exitCode = errs ? 1 : 0;
})();
