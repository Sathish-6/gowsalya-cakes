/**
 * Lightweight Chrome DevTools Protocol check (no external deps).
 *
 * Verifies, across several viewports:
 *   - no console errors / page exceptions
 *   - no horizontal overflow (a common Tailwind + absolute-decor regression)
 *   - all in-page anchor links resolve to a real element
 *   - WhatsApp links point at the right number and are properly encoded
 *
 * Usage: node tools/verify.mjs [url]
 */

import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';

const URL_ = process.argv[2] || 'http://localhost:4173/';
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9222;

const VIEWPORTS = [
  { name: '320 (smallest)', width: 320, height: 720 },
  { name: '390 (phone)', width: 390, height: 844 },
  // 768/1024/1280 bracket the band where the desktop nav first appears and
  // has to fit 7 links + phone + CTA without crowding. 1440 alone hides this.
  { name: '768 (tablet)', width: 768, height: 1024 },
  { name: '1024 (small laptop)', width: 1024, height: 768 },
  { name: '1280 (laptop)', width: 1280, height: 800 },
  { name: '1440 (desktop)', width: 1440, height: 900 },
];

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
const consoleErrors = [];
const exceptions = [];
const badResponses = [];
const failedRequests = [];

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

const wsUrl = await connect();
ws = new WebSocket(wsUrl);
await new Promise((resolve) => ws.addEventListener('open', resolve, { once: true }));

ws.addEventListener('message', (event) => {
  const msg = JSON.parse(event.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    if (msg.error) reject(new Error(msg.error.message));
    else resolve(msg.result);
    return;
  }
  if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
    consoleErrors.push(msg.params.args.map((a) => a.value ?? a.description ?? '').join(' '));
  }
  if (msg.method === 'Runtime.exceptionThrown') {
    exceptions.push(
      msg.params.exceptionDetails.exception?.description ||
        msg.params.exceptionDetails.text ||
        'unknown exception'
    );
  }
  if (msg.method === 'Network.responseReceived' && msg.params.response.status >= 400) {
    badResponses.push(`${msg.params.response.status} ${msg.params.response.url}`);
  }
  if (msg.method === 'Network.loadingFailed' && msg.params.errorText !== 'net::ERR_ABORTED') {
    failedRequests.push(`${msg.params.errorText} (${msg.params.type})`);
  }
});

const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });

await send('Page.enable', {}, sessionId);
await send('Runtime.enable', {}, sessionId);
// Network domain: catches a broken asset reference (e.g. a renamed or moved
// image) that Page/Runtime alone would silently ignore.
await send('Network.enable', {}, sessionId);

const evaluate = async (expression) => {
  const res = await send(
    'Runtime.evaluate',
    { expression, returnByValue: true, awaitPromise: true },
    sessionId
  );
  if (res.exceptionDetails) throw new Error(res.exceptionDetails.text);
  return res.result.value;
};

let failures = 0;

for (const vp of VIEWPORTS) {
  await send(
    'Emulation.setDeviceMetricsOverride',
    { width: vp.width, height: vp.height, deviceScaleFactor: 1, mobile: vp.width < 768 },
    sessionId
  );
  await send('Page.navigate', { url: URL_ }, sessionId);

  // The splash screen covers the page for ~2.7s and then unmounts, so the
  // settled-page sweep below can never see its logo image. Probe it while up.
  await sleep(1200);
  const splash = await evaluate(`(() => {
    const img = document.querySelector('img.splash-logo');
    if (!img) return { present: false };
    return { present: true, naturalWidth: img.naturalWidth, src: img.currentSrc || img.src };
  })()`);
  await sleep(2400);

  const report = await evaluate(`(() => {
    const de = document.documentElement;
    const overflow = de.scrollWidth - de.clientWidth;
    const offenders = [];
    if (overflow > 1) {
      document.querySelectorAll('*').forEach((el) => {
        const r = el.getBoundingClientRect();
        if ((r.right > de.clientWidth + 1 || r.left < -1) && r.width > 0 && r.width < 4000) {
          const cls = typeof el.className === 'string' ? el.className.split(' ').slice(0, 2).join('.') : '';
          offenders.push(el.tagName.toLowerCase() + (cls ? '.' + cls : '') + ' [' + Math.round(r.left) + '..' + Math.round(r.right) + ']');
        }
      });
    }
    const anchors = [...document.querySelectorAll('a[href^="#"]')]
      .map((a) => a.getAttribute('href'))
      .filter((h) => h && h.length > 1);
    const broken = [...new Set(anchors.filter((h) => !document.getElementById(h.slice(1))))];
    const wa = [...document.querySelectorAll('a[href*="wa.me"]')].map((a) => a.href);
    return {
      overflow,
      offenders: offenders.slice(0, 6),
      brokenAnchors: broken,
      waCount: wa.length,
      badWa: wa.filter((h) => !h.startsWith('https://wa.me/918220199389?text=')).slice(0, 3),
      sampleWa: wa[0] || null,
      rootChildren: document.getElementById('root') ? document.getElementById('root').childElementCount : 0,
      imgs: document.querySelectorAll('img').length,
      // A missing asset is NOT reliably a 4xx: vite preview's SPA fallback answers
      // unknown paths with 200 text/html, which an <img> then silently renders as
      // broken. naturalWidth === 0 is the only trustworthy signal.
      brokenImgs: [...document.querySelectorAll('img')]
        .filter((img) => img.complete && img.naturalWidth === 0)
        .map((img) => img.currentSrc || img.src)
        .slice(0, 5),
    };
  })()`);

  const ok =
    report.overflow <= 1 &&
    report.brokenAnchors.length === 0 &&
    report.badWa.length === 0 &&
    report.brokenImgs.length === 0;
  if (!ok) failures += 1;

  console.log(`\n=== ${vp.name} ===`);
  console.log(`  horizontal overflow : ${report.overflow}px ${ok ? 'OK' : 'FAIL'}`);
  if (report.offenders.length) console.log(`  offenders           : ${report.offenders.join(' | ')}`);
  console.log(`  broken anchors      : ${report.brokenAnchors.length ? report.brokenAnchors.join(', ') : 'none'}`);
  console.log(`  whatsapp links      : ${report.waCount} (bad: ${report.badWa.length})`);
  console.log(`  root children       : ${report.rootChildren}, images: ${report.imgs}`);
  console.log(`  broken images       : ${report.brokenImgs.length ? report.brokenImgs.join(', ') : 'none'}`);
  console.log(
    `  splash logo         : ${
      !splash.present ? 'not on screen' : splash.naturalWidth > 0 ? 'LOADED' : 'BROKEN'
    }${splash.present ? ` (naturalWidth=${splash.naturalWidth})` : ''}`
  );
  if (splash.present && splash.naturalWidth === 0) failures += 1;
  if (report.sampleWa) console.log(`  sample wa link      : ${report.sampleWa.slice(0, 160)}`);
}

console.log('\n=== console errors ===');
console.log(consoleErrors.length ? consoleErrors.join('\n') : 'none');
console.log('=== uncaught exceptions ===');
console.log(exceptions.length ? exceptions.join('\n') : 'none');

// Only same-origin failures should fail the run. A third-party font/CDN hiccup
// is outside this project's control and must not mask a real regression.
const localBad = badResponses.filter((r) => /localhost|127\.0\.0\.1/.test(r));
console.log('=== bad responses / failed requests ===');
console.log(
  badResponses.length || failedRequests.length
    ? [...badResponses, ...failedRequests].join('\n')
    : 'none'
);

if (consoleErrors.length || exceptions.length || localBad.length) failures += 1;

console.log(`\nRESULT: ${failures === 0 ? 'ALL CHECKS PASSED' : failures + ' CHECK(S) FAILED'}`);

ws.close();
chrome.kill();
process.exit(failures === 0 ? 0 : 1);
