#!/usr/bin/env node
// Post-render checks on the preview build: internal links, Liquid leaks, exposed addresses, JSON-LD.
const fs = require('fs'), path = require('path');
const out = path.resolve(process.argv[2] || path.join(__dirname, '..', '..', '_site-preview'));
const files = []; (function w(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); fs.statSync(p).isDirectory() ? w(p) : files.push(p); } })(out);
const exists = u => { let p = u.split(/[?#]/)[0]; if (!p || p === '/') p = '/index.html'; if (p.endsWith('/')) p += 'index.html'; return fs.existsSync(path.join(out, decodeURIComponent(p))); };
let bad = 0; const report = (f, m) => { bad++; console.log(path.relative(out, f) + ': ' + m); };
for (const f of files) {
  if (!/\.(html|xml|js|txt|json|webmanifest)$/.test(f)) continue;
  const s = fs.readFileSync(f, 'utf8');
  if (/\{\{|\{%/.test(s) && !f.endsWith('.js')) report(f, 'Liquid leaked into output');
  if (/webworksa1@|gmail\.com|webworksa1\s*@/i.test(s)) report(f, 'exposed address');
  const emails = s.replace(/@(context|type|graph|id|media|font-face|keyframes|supports|import|charset)/g, '').match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,}/g);
  if (emails && !/example\.(org|com)/.test(emails.join(' '))) report(f, 'email-like string: ' + emails.slice(0, 3).join(', '));
  if (!f.endsWith('.html')) continue;
  for (const m of s.matchAll(/\shref="(\/[^"]*)"/g)) if (!exists(m[1].replace(/&amp;/g, '&'))) report(f, 'broken link ' + m[1]);
  for (const m of s.matchAll(/\ssrc="(\/[^"]*)"/g)) if (!exists(m[1])) report(f, 'missing asset ' + m[1]);
  for (const m of s.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) { try { JSON.parse(m[1]); } catch (e) { report(f, 'bad JSON-LD: ' + e.message); } }
  const t = (s.match(/<title>([^<]*)<\/title>/) || [])[1]; if (!t) report(f, 'no <title>');
  const h1 = (s.match(/<h1[\s>]/g) || []).length; if (h1 !== 1) report(f, h1 + ' <h1> elements');
}
console.log(bad ? bad + ' problems' : 'all checks passed', '(' + files.length + ' files)');
process.exitCode = bad ? 1 : 0;
