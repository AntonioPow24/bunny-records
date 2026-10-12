// Genera los recursos de metadatos (favicon, iconos de app, Open Graph) a partir de los SVG del logo.
// Uso: node design/logo/meta/build.mjs   (necesita Google Chrome instalado; no instala nada)
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync, copyFileSync, rmSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const LOGO = join(HERE, '..');
const CHAR = join(HERE, '..', '..', 'character');
const TMP = join(HERE, '_tmp');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const MIDNIGHT = '#0C111C', TEAL = '#329DA8', IVORY = '#F4F4F2';
mkdirSync(TMP, { recursive: true });

const url = p => pathToFileURL(p).href;
const icon = url(join(LOGO, 'bunny-icon.svg'));
const logo = url(join(LOGO, 'bunny-logo.svg'));
const bunny = url(join(CHAR, 'layers', 'bunny-full-rest.png'));

function shot(name, w, h, body, { transparent = false } = {}) {
  const html = join(TMP, name + '.html');
  writeFileSync(html, `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700&display=block" rel="stylesheet">
<style>html,body{margin:0;width:${w}px;height:${h}px;overflow:hidden;background:${transparent ? 'transparent' : MIDNIGHT}}
*{box-sizing:border-box}</style></head><body>${body}</body></html>`);
  const out = join(HERE, name + '.png');
  execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
    `--window-size=${w},${h}`, '--virtual-time-budget=4000',
    ...(transparent ? ['--default-background-color=00000000'] : []),
    `--screenshot=${out}`, url(html)], { stdio: 'ignore' });
  return out;
}
const centered = (src, size, pad) =>
  `<div style="width:100%;height:100%;display:grid;place-items:center"><img src="${src}" style="width:${size - 2 * pad}px;height:${size - 2 * pad}px"></div>`;

// iconos cuadrados
const pngs = {};
for (const s of [16, 32, 48]) pngs[s] = shot(`_fav-${s}`, s, s, centered(icon, s, 0), { transparent: true });
shot('apple-touch-icon', 180, 180, centered(icon, 180, 18));                       // iOS: fondo opaco, iOS redondea solo
shot('icon-192', 192, 192, centered(icon, 192, 12), { transparent: true });
shot('icon-512', 512, 512, centered(icon, 512, 32), { transparent: true });
shot('icon-maskable-512', 512, 512, centered(icon, 512, 112));                    // contenido dentro del 80 % central

// favicon.ico con PNG de 16, 32 y 48 px dentro (formato ICO con entradas PNG)
const imgs = [16, 32, 48].map(s => ({ s, buf: readFileSync(pngs[s]) }));
const header = Buffer.alloc(6); header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(imgs.length, 4);
let offset = 6 + 16 * imgs.length;
const dir = imgs.map(({ s, buf }) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(s, 0); e.writeUInt8(s, 1); e.writeUInt8(0, 2); e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6); e.writeUInt32LE(buf.length, 8); e.writeUInt32LE(offset, 12);
  offset += buf.length; return e;
});
writeFileSync(join(HERE, 'favicon.ico'), Buffer.concat([header, ...dir, ...imgs.map(i => i.buf)]));
copyFileSync(join(LOGO, 'bunny-icon.svg'), join(HERE, 'icon.svg'));

// Open Graph 1200 × 630: el conejo en el centro (WhatsApp recorta un cuadrado central en la vista pequeña)
shot('og-default', 1200, 630, `
<div style="position:absolute;inset:0;background:radial-gradient(60% 75% at 50% 100%, rgba(50,157,168,.28), transparent 70%)"></div>
<img src="${bunny}" style="position:absolute;left:50%;bottom:-40px;height:690px;transform:translateX(-50%)">
<img src="${logo}" style="position:absolute;left:80px;top:50%;width:190px;transform:translateY(-50%)">
<div id="wm" style="position:absolute;right:34px;top:50%;transform:translateY(-50%);font:700 52px/1.04 Sora,sans-serif;color:${IVORY};text-align:right;letter-spacing:-.01em">Bunny<br><span style="color:${TEAL}">Records</span></div>`);
// comprobación: la marca de texto debe quedar fuera del cuadrado central (x 285–915) que recorta WhatsApp

// manifiesto de la app (los textos los pone la web por idioma; aquí solo iconos y colores)
writeFileSync(join(HERE, 'site.webmanifest'), JSON.stringify({
  name: 'Bunny Records', short_name: 'Bunny', start_url: '/', display: 'standalone',
  background_color: MIDNIGHT, theme_color: MIDNIGHT,
  icons: [
    { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
}, null, 2) + '\n');

rmSync(TMP, { recursive: true, force: true });
for (const s of [16, 32, 48]) rmSync(pngs[s], { force: true });
for (const f of ['favicon.ico', 'icon.svg', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'og-default.png', 'site.webmanifest'])
  console.log(f.padEnd(24), Math.round(statSync(join(HERE, f)).size / 1024) + ' KB');
