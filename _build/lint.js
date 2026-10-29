#!/usr/bin/env node
// Down.Town content linter. Usage: node _build/lint.js <file.html> [more files...]   (or --all)
// Checks front matter, allowed Liquid, HTML balance, internal links, word counts and banned strings.
const fs = require('fs'), path = require('path');
const yaml = require('js-yaml');
const ROOT = path.resolve(__dirname, '..');
const cities = JSON.parse(fs.readFileSync(path.join(ROOT, '_data/cities.json'), 'utf8'));
const urls = new Set(fs.readFileSync(path.join(__dirname, 'urls.txt'), 'utf8').split('\n').map(s => s.trim()).filter(s => s && !s.startsWith('#')));
for (const c of cities) { urls.add('/explore/' + c.slug + '.html'); urls.add('/space/' + c.slug + '.html'); }
const INCLUDES = new Set(fs.readdirSync(path.join(ROOT, '_includes')).concat(['cta.html', 'ad.html', 'video.html', 'intent-grid.html', 'tool-card.html']));
const MIN_WORDS = { city: 1150, space: 900, article: 1050 };
const REQ = { city: ['title', 'description', 'city', 'section', 'updated', 'faq'], space: ['title', 'description', 'city', 'section', 'updated', 'faq'], article: ['title', 'description', 'section', 'lede', 'updated'] };
const VOID = new Set(['br', 'hr', 'img', 'input', 'meta', 'link', 'source', 'wbr', 'col', 'area', 'base', 'embed', 'param', 'track']);
const BANNED = [/webworksa1/i, /gmail/i, /@[a-z0-9-]+\.(com|net|org)/i, /lorem ipsum/i, /\bTODO\b/, /\bTBD\b/, /testimonial/i, /\[insert/i, /as an ai\b/i];

function lint(file) {
  const errs = [], warns = [];
  const rel = path.relative(ROOT, path.resolve(file));
  const s = fs.readFileSync(file, 'utf8');
  const m = s.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { rel, errs: ['missing front matter'], warns };
  let fm;
  try { fm = yaml.load(m[1]); } catch (e) { return { rel, errs: ['YAML: ' + e.message.split('\n')[0]], warns }; }
  const body = m[2];
  const L = fm.layout;
  for (const k of (REQ[L] || [])) if (fm[k] === undefined || fm[k] === '') errs.push('front matter missing: ' + k);
  if (fm.title && fm.title.length > 75) warns.push(`title is ${fm.title.length} chars (aim <= 70)`);
  if (fm.description && (fm.description.length < 110 || fm.description.length > 170)) warns.push(`description is ${fm.description.length} chars (aim 120-160)`);
  if ((L === 'city' || L === 'space') && !cities.find(c => c.slug === fm.city)) errs.push('unknown city slug: ' + fm.city);
  if (fm.faq) {
    if (!Array.isArray(fm.faq) || fm.faq.length < 3 || fm.faq.length > 8) errs.push('faq must be a list of 3-8 {q, a}');
    else fm.faq.forEach((f, i) => { if (!f.q || !f.a) errs.push('faq item ' + i + ' needs q and a'); });
  }
  // Liquid: only includes allowed in bodies
  const liquid = body.match(/\{\{[\s\S]*?\}\}|\{%[\s\S]*?%\}/g) || [];
  for (const t of liquid) {
    const inc = t.match(/^\{%\s*include\s+([a-z0-9-]+\.html)(\s+[a-z_]+="[^"]*")*\s*%\}$/);
    if (!inc) errs.push('Liquid not allowed in body: ' + t.slice(0, 60));
    else if (!INCLUDES.has(inc[1])) errs.push('unknown include: ' + inc[1]);
  }
  if (/\{\{|\{%/.test(body.replace(/\{%\s*include[^%]*%\}/g, ''))) errs.push('stray {{ or {% in body');
  // HTML balance
  const stack = [];
  const re = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*?(\/?)>/g; let t;
  const clean = body.replace(/<!--[\s\S]*?-->/g, '').replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');
  while ((t = re.exec(clean))) {
    const name = t[1].toLowerCase(), closing = t[0][1] === '/';
    if (VOID.has(name) || t[2] === '/') continue;
    if (!closing) stack.push(name);
    else {
      if (stack[stack.length - 1] === name) stack.pop();
      else { errs.push(`HTML: </${name}> does not match <${stack[stack.length - 1] || 'nothing'}> near "${clean.slice(Math.max(0, t.index - 50), t.index).replace(/\s+/g, ' ')}"`); break; }
    }
  }
  if (stack.length) errs.push('HTML: unclosed ' + stack.slice(-3).join(', '));
  if (/<h1[\s>]/.test(body) && (L === 'city' || L === 'space' || L === 'article')) errs.push('no <h1> in body (layout renders it)');
  // links
  for (const h of body.matchAll(/href="([^"]+)"/g)) {
    const u = h[1];
    if (/^(https?:|mailto:|tel:|#)/.test(u)) { if (/^mailto:/.test(u)) errs.push('mailto links are not allowed'); continue; }
    const p = u.split(/[?#]/)[0];
    if (!p.startsWith('/')) { errs.push('use root-relative links (start with /): ' + u); continue; }
    if (!urls.has(p)) errs.push('link to unknown page: ' + u);
  }
  // words
  const text = body.replace(/\{%[\s\S]*?%\}/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ');
  const words = text.split(/\s+/).filter(w => /[A-Za-zÀ-ÿ0-9]/.test(w)).length;
  const faqWords = (fm.faq || []).reduce((n, f) => n + String(f.a || '').split(/\s+/).length + String(f.q || '').split(/\s+/).length, 0);
  if (MIN_WORDS[L] && words < MIN_WORDS[L]) errs.push(`body has ${words} words; needs >= ${MIN_WORDS[L]}`);
  for (const b of BANNED) if (b.test(m[1] + body)) errs.push('banned text: ' + b);
  return { rel, errs, warns, words, faqWords };
}

let files = process.argv.slice(2);
if (files[0] === '--all') {
  files = [];
  const walk = d => { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (/^(_|\.|node_modules)/.test(f)) continue; if (fs.statSync(p).isDirectory()) walk(p); else if (/\.html$/.test(f)) files.push(p); } };
  walk(ROOT);
  files = files.filter(f => { const s = fs.readFileSync(f, 'utf8'); return /^---\nlayout: (city|space|article)\b/m.test(s); });
}
let bad = 0;
for (const f of files) {
  const r = lint(f);
  const ok = !r.errs.length;
  if (!ok) bad++;
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${r.rel}${r.words ? `  (${r.words} words + ${r.faqWords} in FAQ)` : ''}`);
  r.errs.forEach(e => console.log('   ERROR ' + e));
  r.warns.forEach(w => console.log('   warn  ' + w));
}
process.exit(bad ? 1 : 0);
