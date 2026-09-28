/**
 * One-off layout probe (no external deps).
 * Reports real element geometry in a fixed viewport so a full-page
 * screenshot cannot mislead us about 100vh-based sizing.
 *
 * Usage: node tools/measure.mjs [url]
 */

import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';

const URL_ = process.argv[2] || 'http://localhost:4173/';
const WIDTHS = [1024, 1152, 1280, 1440, 1680];
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9333;

const chrome = spawn(CHROME, [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  `--remote-debugging-port=${PORT}`,
  '--remote-allow-origins=*',
  'about:blank',
], { stdio: 'ignore' });

let ws;
let msgId = 0;
const pending = new Map();

function send(method, params = {}, sessionId) {
  const id = ++msgId;
  const payload = { id, method, params };
  if (sessionId) payload.sessionId = sessionId;
  ws.send(JSON.stringify(payload));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}

async function connect() {
  for (let i = 0; i < 40; i += 1) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      const info = await res.json();
      return info.webSocketDebuggerUrl;
    } catch {
      await sleep(250);
    }
  }
  throw new Error('Chrome DevTools endpoint never came up');
}

ws = new WebSocket(await connect());
await new Promise((resolve) => ws.addEventListener('open', resolve, { once: true }));

ws.addEventListener('message', (event) => {
  const msg = JSON.parse(event.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    if (msg.error) reject(new Error(msg.error.message));
    else resolve(msg.result);
  }
});

const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
await send('Page.enable', {}, sessionId);
await send('Runtime.enable', {}, sessionId);

const evaluate = async (expression) => {
  const res = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }, sessionId);
  if (res.exceptionDetails) throw new Error(res.exceptionDetails.text);
  return res.result.value;
};

// --- Nav headroom probe -------------------------------------------------
// The desktop nav only exists at >=1024px (lg:). Below that it is a burger,
// so adding an 8th link only risks crowding inside the 1024-1280 band.
// Measure the actual free space there instead of guessing.
const navReport = [];
for (const width of WIDTHS) {
  await send('Emulation.setDeviceMetricsOverride', {
    width, height: 900, deviceScaleFactor: 1, mobile: false,
  }, sessionId);
  await send('Page.navigate', { url: URL_ }, sessionId);
  await sleep(2500);

  navReport.push(await evaluate(`(() => {
    const nav = document.querySelector('header nav');
    if (!nav) return { width: ${width}, desktopNav: false };
    const row = nav.querySelector('ul');
    if (!row) return { width: ${width}, desktopNav: false };
    // The <ul> is one flex child sitting between the brand lockup and the
    // phone/CTA group, so "nav inner - links total" is NOT free space.
    // The real slack is the gap between the link row and what sits to its right.
    const rowBox = row.getBoundingClientRect();
    const cta = nav.querySelector('a[href^="tel:"]')?.closest('div');
    const ctaBox = cta ? cta.getBoundingClientRect() : null;
    return {
      width: ${width},
      desktopNav: true,
      linkCount: row.children.length,
      rowW: Math.round(rowBox.width),
      gapToCta: ctaBox ? Math.round(ctaBox.left - rowBox.right) : null,
    };
  })()`));
}
console.log('=== nav headroom (desktop, lg+) ===');
console.table(navReport);

await send('Emulation.setDeviceMetricsOverride', {
  width: 1440, height: 900, deviceScaleFactor: 1, mobile: false,
}, sessionId);
await send('Page.navigate', { url: URL_ }, sessionId);
await sleep(3000);

const report = await evaluate(`(() => {
  const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { top: Math.round(b.top + window.scrollY), h: Math.round(b.height) }; };
  const hero = document.getElementById('home');
  const h1 = document.querySelector('#home h1');
  const badge = [...document.querySelectorAll('#home div')].find((d) => d.textContent.replace(/\\s+/g,'') === 'Freshlybakeddaily');
  const disc = badge ? badge.closest('.rounded-full') : null;
  return {
    innerHeight: window.innerHeight,
    hero: r(hero),
    h1: r(h1),
    badgeFound: !!badge,
    discTransform: disc ? getComputedStyle(disc).transform : null,
    ringTransform: disc && disc.parentElement ? getComputedStyle(disc.parentElement).transform : null,
  };
})()`);

console.log(JSON.stringify(report, null, 2));

// Viewport-clipped capture: honest framing (full-page capture inflates 100vh).
const OUT = process.env.SHOT_OUT || 'hero.png';
const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false }, sessionId);
const { writeFileSync } = await import('node:fs');
writeFileSync(OUT, Buffer.from(shot.data, 'base64'));
console.log('screenshot ->', OUT);

ws.close();
chrome.kill();
process.exit(0);
