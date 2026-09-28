/**
 * Generates the branded Open Graph card -> public/og-image.png (1200x630).
 *
 * Why this exists: the page used to hotlink a third-party Unsplash photo as its
 * og:image. That is a third-party dependency (the scraper must fetch someone
 * else's CDN), it cannot carry the brand, and its alt text ("birthday cake")
 * did not even match the photo (a chocolate drip cake). This renders a static,
 * self-hosted card from the real brand palette + logo instead.
 *
 * Usage: node tools/make-og.mjs
 */

import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9334;
const WIDTH = 1200;
const HEIGHT = 630;

const OUT = resolve('public/og-image.png');
// The logo is rendered in isolation, so it can be embedded verbatim.
const LOGO = readFileSync(resolve('src/assets/branding/logo.svg'), 'utf8');

const WHATSAPP_GLYPH =
  '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.38a9.87 9.87 0 0 0 4.74 1.2h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.14.82.84-3.07-.2-.31a8.17 8.17 0 0 1-1.25-4.35c0-4.54 3.7-8.23 8.24-8.23Zm-2.6 4.1c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.43 1.02 2.6.12.17 1.75 2.8 4.33 3.82 2.14.84 2.58.67 3.05.63.46-.04 1.49-.61 1.7-1.2.21-.59.21-1.09.15-1.2-.06-.11-.23-.17-.47-.29-.23-.13-1.49-.73-1.71-.82-.23-.08-.39-.12-.55.13-.17.24-.64.81-.78.98-.15.16-.29.19-.52.06-.24-.12-1-.37-1.9-1.18-.7-.62-1.17-1.4-1.31-1.63-.14-.24-.02-.36.1-.48.11-.11.24-.29.36-.44.12-.14.16-.24.24-.4.08-.17.04-.31-.02-.44-.06-.12-.55-1.34-.76-1.83-.2-.48-.4-.41-.55-.42h-.47Z"/></svg>';

const card = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Outfit:wght@300..800&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: ${WIDTH}px; height: ${HEIGHT}px; overflow: hidden; }
  body {
    font-family: "Outfit", system-ui, sans-serif;
    color: #4A2C1A;
    background:
      radial-gradient(760px 520px at 8% 8%, #FFE7F0 0%, rgba(255,231,240,0) 62%),
      radial-gradient(680px 520px at 92% 96%, #F9EDCB 0%, rgba(249,237,203,0) 58%),
      radial-gradient(520px 420px at 74% 6%, #FDEFF6 0%, rgba(253,239,246,0) 60%),
      #FFFCF6;
    position: relative;
  }
  /* gold hairline frame, echoes the logo's ring */
  body::after {
    content: ""; position: absolute; inset: 22px;
    border: 2px solid #E3B84F; border-radius: 34px; opacity: .5;
  }
  .wrap { position: relative; height: 100%; display: flex; align-items: center; padding: 0 84px; gap: 56px; }
  .copy { flex: 1; }
  .eyebrow {
    display: inline-flex; align-items: center; gap: 10px;
    background: #fff; border: 1px solid #F6B3CE; color: #A3164E;
    font-size: 19px; font-weight: 700; letter-spacing: .16em;
    padding: 11px 24px; border-radius: 999px; box-shadow: 0 8px 24px rgba(194,30,92,.10);
  }
  h1 {
    font-family: "Playfair Display", Georgia, serif;
    font-size: 84px; line-height: 1.02; font-weight: 800;
    letter-spacing: -.015em; margin-top: 30px; color: #2A170D;
  }
  h1 em { font-style: italic; font-weight: 600; color: #C21E5C; }
  .sub { margin-top: 22px; font-size: 27px; font-weight: 400; color: #6B4226; }
  .cta {
    margin-top: 34px; display: inline-flex; align-items: center; gap: 14px;
    background: #25D366; color: #06301A; font-size: 26px; font-weight: 700;
    padding: 17px 34px; border-radius: 999px;
    box-shadow: 0 14px 34px rgba(37,211,102,.34);
  }
  .cta svg { width: 31px; height: 31px; }
  .cta small { font-size: 22px; font-weight: 600; opacity: .72; }
  .logo { width: 370px; height: 370px; flex: none; filter: drop-shadow(0 26px 46px rgba(122,31,74,.30)); }
  .ring { position: absolute; right: -46px; top: -46px; width: 540px; height: 540px; border-radius: 50%; border: 2px dashed #E8639A; opacity: .26; }
</style>
</head>
<body>
  <div class="ring"></div>
  <div class="wrap">
    <div class="copy">
      <div class="eyebrow">&#10022; THIRUMANGALAM &middot; MADURAI</div>
      <h1>Homemade<br><em>Happiness,</em><br>Baked Fresh</h1>
      <p class="sub">Cakes &middot; Cookies &middot; Brownies<br>Cupcakes &middot; Customized Treats</p>
      <div class="cta">
        ${WHATSAPP_GLYPH}
        <span>Order on WhatsApp <small>+91 82201 99389</small></span>
      </div>
    </div>
    <div class="logo">${LOGO}</div>
  </div>
</body>
</html>`;

const htmlPath = join(tmpdir(), 'gcs-og-card.html');
writeFileSync(htmlPath, card, 'utf8');


const chrome = spawn(CHROME, [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  '--hide-scrollbars',
  '--force-device-scale-factor=1',
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

try {
  ws = new WebSocket(await connect());
  await new Promise((r) => ws.addEventListener('open', r, { once: true }));

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

  await send('Emulation.setDeviceMetricsOverride', {
    width: WIDTH, height: HEIGHT, deviceScaleFactor: 1, mobile: false,
  }, sessionId);

  await send('Page.navigate', { url: `file:///${htmlPath.replace(/\\/g, '/')}` }, sessionId);
  await sleep(3000);

  // Block on real webfont loading so the card never ships a fallback serif.
  const fonts = await send('Runtime.evaluate', {
    expression: `(async () => {
      await Promise.all([
        document.fonts.load('800 84px "Playfair Display"'),
        document.fonts.load('italic 600 84px "Playfair Display"'),
        document.fonts.load('700 27px "Outfit"'),
        document.fonts.load('700 19px "Outfit"'),
      ]);
      await document.fonts.ready;
      return document.fonts.check('800 84px "Playfair Display"') && document.fonts.check('700 27px "Outfit"');
    })()`,
    returnByValue: true,
    awaitPromise: true,
  }, sessionId);
  console.log('webfonts loaded:', fonts.result.value === true ? 'yes' : 'NO (fallback serif will be used)');
  await sleep(600);

  const shot = await send('Page.captureScreenshot', {
    format: 'png', captureBeyondViewport: false,
  }, sessionId);

  mkdirSync(resolve('public'), { recursive: true });
  const buf = Buffer.from(shot.data, 'base64');
  writeFileSync(OUT, buf);
  console.log(`og image -> ${OUT} (${WIDTH}x${HEIGHT}, ${(buf.length / 1024).toFixed(1)} kB)`);
} finally {
  try { ws?.close(); } catch { /* already closed */ }
  chrome.kill();
  rmSync(htmlPath, { force: true });
}

process.exit(0);
