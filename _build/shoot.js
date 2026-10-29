// Screenshot pages from a local static dir. Usage: node shoot.js <siteDir> <outDir> <width> page1 page2 ...
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const [siteDir, outDir, width, ...pages] = process.argv.slice(2);
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.svg': 'image/svg+xml', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.xml': 'application/xml', '.txt': 'text/plain' };
const srv = http.createServer((req, res) => {
  let u = decodeURIComponent(req.url.split('?')[0]); if (u.endsWith('/')) u += 'index.html';
  const p = path.join(siteDir, u);
  if (!fs.existsSync(p)) { res.writeHead(404); return res.end('nf'); }
  res.writeHead(200, { 'Content-Type': types[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(res);
}).listen(0, async () => {
  const port = srv.address().port;
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: +width, height: 900 }, deviceScaleFactor: 1, colorScheme: process.env.DARK ? 'dark' : 'light' });
  const errors = [];
  for (const pg of pages) {
    const page = await ctx.newPage();
    page.on('pageerror', e => errors.push(pg + ': ' + e.message));
    page.on('console', m => { if (m.type() === 'error' && !/googlesyndication|fonts\.g|ERR_|Failed to load resource/.test(m.text())) errors.push(pg + ' console: ' + m.text()); });
    // block external network to keep it fast
    await page.route(/^https?:\/\/(?!localhost|127\.0\.0\.1)/, r => r.abort());
    await page.goto(`http://127.0.0.1:${port}/${pg}`, { waitUntil: 'load' }).catch(e => errors.push(pg + ' nav ' + e.message));
    await page.waitForTimeout(400);
    const full = process.env.FULL === '1';
    const name = pg.replace(/[\/?=&#]/g, '_') + `-${width}.png`;
    await page.screenshot({ path: path.join(outDir, name), fullPage: full });
    const ov = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (ov > 1) errors.push(pg + ` horizontal overflow ${ov}px`);
    await page.close();
  }
  await browser.close(); srv.close();
  console.log(errors.length ? errors.join('\n') : 'no errors');
});
