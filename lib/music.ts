// Reproductor de la música de los álbumes (BUNNY-RECORDS.md §5.2.2): un solo <audio> fuera de React, para que
// siga sonando al navegar y para poder arrancarlo dentro del propio clic (los navegadores exigen ese gesto).

export const MUSIC_DEFAULT_VOLUME = 0.5;
export const LEVELS_FPS = 15;
export const LEVELS_BANDS = 32;

const FADE_IN_MS = 1000;
const FADE_OUT_MS = 1000;
const STORAGE_KEY = "bunny-music";

export type MusicState = {
  slug: string | null;
  playing: boolean;
  time: number;
  duration: number;
  volume: number;
  muted: boolean;
};

let state: MusicState = { slug: null, playing: false, time: 0, duration: 0, volume: MUSIC_DEFAULT_VOLUME, muted: false };
const serverState = state;
const listeners = new Set<() => void>();
let audio: HTMLAudioElement | null = null;
let fadeTimer: ReturnType<typeof setInterval> | null = null;
// La pausa manual se respeta en los demás álbumes durante la visita; no se guarda entre visitas.
let pausedByUser = false;

function update(patch: Partial<MusicState>) {
  state = { ...state, ...patch };
  listeners.forEach((listener) => listener());
}

function savePrefs() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ volume: state.volume, muted: state.muted }));
  } catch {
    // Almacenamiento bloqueado: el ajuste dura solo esta visita.
  }
}

function loadPrefs() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null") as Partial<MusicState> | null;
    if (typeof saved?.volume === "number") state = { ...state, volume: Math.min(1, Math.max(0, saved.volume)) };
    if (typeof saved?.muted === "boolean") state = { ...state, muted: saved.muted };
  } catch {
    // Sin preferencias guardadas: valores por defecto.
  }
}

function element() {
  if (audio) return audio;
  loadPrefs();
  audio = new Audio();
  audio.loop = true;
  audio.preload = "metadata";
  audio.muted = state.muted;
  audio.volume = state.volume;
  audio.addEventListener("play", () => update({ playing: true }));
  audio.addEventListener("pause", () => update({ playing: false }));
  audio.addEventListener("timeupdate", () => update({ time: audio?.currentTime ?? 0 }));
  audio.addEventListener("loadedmetadata", () => update({ duration: audio?.duration ?? 0 }));
  return audio;
}

function cancelFade() {
  if (fadeTimer) clearInterval(fadeTimer);
  fadeTimer = null;
}

// En iOS `volume` es de solo lectura: el fundido no se oye, pero el final (la pausa) sí ocurre.
function fade(from: number, to: number, ms: number, done?: () => void) {
  cancelFade();
  const el = element();
  const start = performance.now();
  el.volume = from;
  fadeTimer = setInterval(() => {
    const t = Math.min(1, (performance.now() - start) / ms);
    el.volume = from + (to - from) * t;
    if (t === 1) {
      cancelFade();
      done?.();
    }
  }, 30);
}

function setSource(slug: string) {
  const el = element();
  cancelFade();
  el.src = `/audio/${slug}.mp3`;
  el.volume = state.volume;
  update({ slug, time: 0, duration: 0, playing: false, muted: state.muted, volume: state.volume });
}

function playWithFade() {
  const el = element();
  el.volume = 0;
  // Si el navegador lo rechaza, no llega el evento "play" y el botón sigue mostrando ▶.
  el.play().then(
    () => fade(0, state.volume, FADE_IN_MS),
    () => {
      el.volume = state.volume;
    },
  );
}

/** Para llamar dentro del clic que abre un álbum: lo carga y, salvo pausa manual, empieza a sonar. */
export function startAlbum(slug: string) {
  if (state.slug !== slug || !element().src) setSource(slug);
  if (!pausedByUser && element().paused) playWithFade();
}

/** Mantiene el reproductor al día con la ruta: entrar sin clic deja la canción lista en pausa; salir la apaga. */
export function syncAlbum(slug: string | null) {
  if (slug === state.slug) return;
  if (slug) {
    setSource(slug);
    return;
  }
  const el = audio;
  update({ slug: null, time: 0, duration: 0 });
  if (!el) return;
  fade(el.volume, 0, el.paused ? 0.01 : FADE_OUT_MS, () => {
    el.pause();
    el.removeAttribute("src");
    el.load();
    el.volume = state.volume;
  });
}

export function togglePlay() {
  const el = element();
  cancelFade();
  el.volume = state.volume;
  if (el.paused) {
    pausedByUser = false;
    el.play().catch(() => {});
  } else {
    pausedByUser = true;
    el.pause();
  }
}

export function seek(seconds: number) {
  element().currentTime = seconds;
  update({ time: seconds });
}

export function setVolume(volume: number) {
  const el = element();
  cancelFade();
  el.volume = volume;
  el.muted = volume === 0;
  update({ volume, muted: volume === 0 });
  savePrefs();
}

export function toggleMuted() {
  const el = element();
  // Desilenciar con el volumen a cero no se oiría: vuelve al volumen inicial.
  const volume = state.muted && state.volume === 0 ? MUSIC_DEFAULT_VOLUME : state.volume;
  el.muted = !state.muted;
  if (!fadeTimer) el.volume = volume;
  update({ muted: !state.muted, volume });
  savePrefs();
}

/** Posición real de la canción, para el visualizador (más fina que `state.time`). */
export function currentTime() {
  return audio?.currentTime ?? 0;
}

export function subscribeMusic(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export const getMusicState = () => state;
export const getServerMusicState = () => serverState;

const levelsCache = new Map<string, Promise<Uint8Array | null>>();

export function loadLevels(slug: string) {
  let levels = levelsCache.get(slug);
  if (!levels) {
    levels = fetch(`/audio/${slug}.levels`)
      .then((res) => (res.ok ? res.arrayBuffer() : null))
      .then((buffer) => (buffer ? new Uint8Array(buffer) : null))
      .catch(() => null);
    levelsCache.set(slug, levels);
  }
  return levels;
}
