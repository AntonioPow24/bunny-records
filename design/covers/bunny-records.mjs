// Portada del álbum Bunny Records (el propio portfolio): un vinilo visto desde arriba con el logo en la etiqueta,
// en el estilo de las demás portadas (fondo medianoche, marco y trazos marfil finos, un solo acento teal).
// Uso: node design/covers/bunny-records.mjs   (necesita Google Chrome instalado; usa sharp de node_modules)
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync, copyFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import sharp from "sharp";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const TMP = join(HERE, "_tmp");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const S = 1024;
mkdirSync(TMP, { recursive: true });

const logo = readFileSync(join(ROOT, "design", "logo", "bunny-logo.svg"), "utf8");
const grooves = Array.from({ length: 14 }, (_, i) => {
  const r = 250 + i * 13;
  return `<circle cx="512" cy="512" r="${r}" fill="none" stroke="#F4F4F2" stroke-opacity="${i % 4 === 0 ? 0.32 : 0.14}" stroke-width="1.5"/>`;
}).join("");

writeFileSync(join(TMP, "cover.html"), `<!doctype html><html><head><meta charset="utf-8"><style>
html,body{margin:0;width:${S}px;height:${S}px;overflow:hidden;background:#0C111C}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(244,244,242,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(244,244,242,.05) 1px,transparent 1px);background-size:32px 32px}
.glow{position:absolute;inset:0;background:radial-gradient(45% 45% at 50% 50%,rgba(50,157,168,.22),transparent 70%)}
.frame{position:absolute;inset:20px;border:2px solid rgba(244,244,242,.55)}
svg.disc{position:absolute;inset:0}
.logo{position:absolute;left:50%;top:50%;width:250px;transform:translate(-50%,-52%)}
.logo svg{width:100%;height:auto;display:block}
</style></head><body>
<div class="grid"></div><div class="glow"></div><div class="frame"></div>
<svg class="disc" viewBox="0 0 ${S} ${S}">
  <circle cx="512" cy="512" r="440" fill="#080A0D" stroke="#F4F4F2" stroke-opacity=".6" stroke-width="2"/>
  ${grooves}
  <path d="M512 92 A420 420 0 0 1 870 290" fill="none" stroke="#F4F4F2" stroke-opacity=".35" stroke-width="3" stroke-linecap="round"/>
  <circle cx="512" cy="512" r="205" fill="#329DA8"/>
  <circle cx="512" cy="512" r="205" fill="none" stroke="#F4F4F2" stroke-opacity=".7" stroke-width="2"/>
  <circle cx="512" cy="512" r="9" fill="#0C111C"/>
</svg>
<div class="logo">${logo}</div>
</body></html>`);

const png = join(TMP, "cover.png");
execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
  `--window-size=${S},${S}`, `--screenshot=${png}`, pathToFileURL(join(TMP, "cover.html")).href], { stdio: "ignore" });
const out = join(HERE, "bunny-records.jpg");
await sharp(png).jpeg({ quality: 88, mozjpeg: true }).toFile(out);
copyFileSync(out, join(ROOT, "public", "images", "projects", "bunny-records", "cover.jpg"));
rmSync(TMP, { recursive: true, force: true });
console.log("ok", out);
