// Overflow sweep: visit every route, then every tab of every tablist (and each later tablist's tabs for
// every tab of an earlier one), and report any state where the page is wider than the phone.
// Optional full-page 390×844 screenshots into .ui-check/. Needs `npm run dev` on :5173.
//   node scripts/ui-check.cjs --lang en --widths 360,390 --shots /,/settings --base http://localhost:5173
const puppeteer = require(process.env.APPDATA + '/npm/node_modules/@modelcontextprotocol/server-puppeteer/node_modules/puppeteer-core');
const os = require('os'), path = require('path'), fs = require('fs');

const ROUTES = ['/', '/kana', '/vocab', '/kanji', '/review', '/grammar', '/reading', '/listening', '/speaking', '/writing', '/business', '/progress', '/settings', '/login', '/register'];

function arg(name, fallback) {
  const i = process.argv.indexOf('--' + name);
  return i > 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}
const lang = arg('lang', 'vi');
const widths = arg('widths', '360,390').split(',').map(Number);
// Git Bash rewrites arguments that start with "/" into Windows paths, so routes may also be given
// without the slash: `--shots home,settings` (or run with MSYS_NO_PATHCONV=1).
const shots = arg('shots', '').split(',').filter(Boolean)
  .map((r) => (r === 'home' ? '/' : r.startsWith('/') ? r : '/' + r));
const base = arg('base', 'http://localhost:5173');
const OUT = path.join(__dirname, '..', '.ui-check');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: 'new',
    userDataDir: fs.mkdtempSync(path.join(os.tmpdir(), 'ns-ui-')),
  });
  const page = await browser.newPage();
  await page.evaluateOnNewDocument((lang) => {
    if (!localStorage.getItem('ns.settings')) localStorage.setItem('ns.settings', JSON.stringify({ state: { lang }, version: 0 }));
  }, lang);
  const settle = () => new Promise((r) => setTimeout(r, 350));

  if (shots.length) {
    fs.mkdirSync(OUT, { recursive: true });
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
    for (const route of shots) {
      await page.goto(base + route, { waitUntil: 'networkidle0' });
      await settle();
      const name = route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '-');
      const file = path.join(OUT, `${lang}-${name}.png`);
      await page.screenshot({ path: file, fullPage: true });
      console.log('shot', path.relative(process.cwd(), file));
    }
  }

  const problems = [];
  let states = 0;
  const check = async (w, label) => {
    states++;
    const r = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      if (document.documentElement.scrollWidth <= vw) return null;
      const over = [...document.querySelectorAll('body *')]
        .filter((e) => { const b = e.getBoundingClientRect(); return b.width && b.right > vw + 0.5; })
        .filter((e) => ![...e.children].some((c) => c.getBoundingClientRect().right > vw + 0.5))
        .filter((e) => !e.closest('nav.fixed'))
        .map((e) => `${e.tagName.toLowerCase()}.${String(e.className).slice(0, 60)} right=${Math.round(e.getBoundingClientRect().right)} "${(e.textContent || '').trim().slice(0, 30)}"`);
      return { scrollW: document.documentElement.scrollWidth, over: [...new Set(over)].slice(0, 5) };
    });
    if (r) problems.push({ w, label, ...r });
  };
  // Tab groups by index; the VI|EN language switch is skipped so the sweep never flips the language.
  const tabGroups = () => page.evaluate(() => [...document.querySelectorAll('[role=tablist]')].map((g) => {
    const tabs = [...g.querySelectorAll('[role=tab]')].map((t) => t.textContent.trim());
    return tabs.join('|') === 'VI|EN' ? [] : tabs;
  }));
  const clickTab = (gi, text) => page.evaluate((gi, text) => {
    const g = document.querySelectorAll('[role=tablist]')[gi];
    [...(g?.querySelectorAll('[role=tab]') ?? [])].find((t) => t.textContent.trim() === text)?.click();
  }, gi, text);

  for (const w of widths) {
    await page.setViewport({ width: w, height: 800, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
    for (const route of ROUTES) {
      await page.goto(base + route, { waitUntil: 'networkidle0' });
      await settle();
      await check(w, route);
      const groups = await tabGroups();
      for (let gi = 0; gi < groups.length; gi++)
        for (const t of groups[gi]) {
          await clickTab(gi, t); await settle();
          await check(w, `${route} [${t}]`);
          const now = await tabGroups();
          for (let gj = gi + 1; gj < now.length; gj++)
            for (const t2 of now[gj]) { await clickTab(gj, t2); await settle(); await check(w, `${route} [${t}] [${t2}]`); }
        }
    }
  }
  console.log('lang:', lang, '· states checked:', states);
  console.log(problems.length ? JSON.stringify(problems, null, 1) : 'NO OVERFLOW');
  await browser.close();
  process.exit(problems.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
