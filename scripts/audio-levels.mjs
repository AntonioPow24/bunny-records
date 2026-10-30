// Genera public/audio/<slug>.levels: los niveles del visualizador de cada canción, calculados de antemano
// (no dependen de Web Audio, que falla en iOS con <audio>). Binario: 15 fotogramas/s × 32 bandas, un byte cada una.
// Uso: node scripts/audio-levels.mjs (tras cambiar un .mp3 de public/audio/). Requiere ffmpeg en el PATH.
import { spawnSync } from "node:child_process";
import { readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dir = "public/audio";
const rate = 22050;
const fps = 15;
const bands = 32;
const size = 2048;
const minHz = 60;
const maxHz = 10000;

// FFT radix-2 sobre re/im; devuelve las magnitudes de la primera mitad.
function magnitudes(re, im) {
  for (let i = 1, j = 0; i < size; i++) {
    let bit = size >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) {
      [re[i], re[j]] = [re[j], re[i]];
      [im[i], im[j]] = [im[j], im[i]];
    }
  }
  for (let len = 2; len <= size; len <<= 1) {
    const angle = (-2 * Math.PI) / len;
    for (let i = 0; i < size; i += len) {
      for (let k = 0; k < len / 2; k++) {
        const wr = Math.cos(angle * k);
        const wi = Math.sin(angle * k);
        const a = i + k;
        const b = a + len / 2;
        const tr = re[b] * wr - im[b] * wi;
        const ti = re[b] * wi + im[b] * wr;
        re[b] = re[a] - tr;
        im[b] = im[a] - ti;
        re[a] += tr;
        im[a] += ti;
      }
    }
  }
  return Float64Array.from({ length: size / 2 }, (_, i) => Math.hypot(re[i], im[i]));
}

const window = Float64Array.from({ length: size }, (_, i) => 0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (size - 1)));
const edges = Array.from({ length: bands + 1 }, (_, i) => minHz * (maxHz / minHz) ** (i / bands));
const binOf = (hz) => Math.round((hz * size) / rate);

for (const file of readdirSync(dir).filter((f) => f.endsWith(".mp3"))) {
  const { stdout, status } = spawnSync(
    "ffmpeg",
    ["-v", "error", "-i", join(dir, file), "-ac", "1", "-ar", String(rate), "-f", "f32le", "-"],
    { maxBuffer: 1024 ** 3 },
  );
  if (status !== 0) throw new Error(`ffmpeg falló con ${file}`);
  const samples = new Float32Array(stdout.buffer, stdout.byteOffset, Math.floor(stdout.length / 4));

  const hop = Math.round(rate / fps);
  const frames = Math.floor(samples.length / hop);
  const values = new Float32Array(frames * bands);
  for (let frame = 0; frame < frames; frame++) {
    const re = new Float64Array(size);
    const im = new Float64Array(size);
    for (let i = 0; i < size; i++) re[i] = (samples[frame * hop + i] ?? 0) * window[i];
    const mags = magnitudes(re, im);
    for (let band = 0; band < bands; band++) {
      const from = binOf(edges[band]);
      const to = Math.max(from + 1, binOf(edges[band + 1]));
      let sum = 0;
      for (let bin = from; bin < to; bin++) sum += mags[bin];
      values[frame * bands + band] = 20 * Math.log10(sum / (to - from) + 1e-6);
    }
  }

  // Normaliza cada banda por su propio rango: si no, los graves llenarían siempre la izquierda y los agudos nunca se moverían.
  const out = new Uint8Array(values.length);
  for (let band = 0; band < bands; band++) {
    const sorted = Array.from({ length: frames }, (_, f) => values[f * bands + band]).sort((a, b) => a - b);
    const low = sorted[Math.floor(frames * 0.1)];
    const high = sorted[Math.floor(frames * 0.99)];
    for (let f = 0; f < frames; f++) {
      const t = Math.min(1, Math.max(0, (values[f * bands + band] - low) / (high - low || 1)));
      out[f * bands + band] = Math.round(t ** 1.5 * 255);
    }
  }

  const target = join(dir, file.replace(/\.mp3$/, ".levels"));
  writeFileSync(target, out);
  console.log(`${target}: ${frames} fotogramas, ${Math.round(out.length / 1024)} KB`);
}
