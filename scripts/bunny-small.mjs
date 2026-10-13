// Genera public/bunny/sm/: las capas del conejo a la mitad de resolución (paso 13).
// El motor las usa cuando el conejo se ve a menos de ~660 px reales (móvil, bandeja, escritorio a 1x):
// en esos casos la resolución completa (lienzo de 1200 px) solo añadía peso.
// Uso: node scripts/bunny-small.mjs (tras regenerar las capas de public/bunny/). sharp viene con Next.
import { mkdir, readdir, stat } from "node:fs/promises";
import { join } from "node:path";

import sharp from "sharp";

const src = "public/bunny";
const out = join(src, "sm");
await mkdir(out, { recursive: true });

let before = 0;
let after = 0;
for (const file of (await readdir(src)).filter((f) => f.endsWith(".webp"))) {
  const input = sharp(join(src, file));
  const { width } = await input.metadata();
  const info = await input
    .resize({ width: Math.max(1, Math.round(width / 2)) })
    .webp({ quality: 82, alphaQuality: 90, effort: 6 })
    .toFile(join(out, file));
  before += (await stat(join(src, file))).size;
  after += info.size;
}
console.log(`sm/: ${Math.round(before / 1024)} KB -> ${Math.round(after / 1024)} KB`);
