"use client";

import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useSyncExternalStore, type CSSProperties } from "react";

import {
  LEVELS_BANDS,
  LEVELS_FPS,
  currentTime,
  getMusicState,
  getServerMusicState,
  loadLevels,
  seek,
  setVolume,
  subscribeMusic,
  toggleMuted,
  togglePlay,
} from "@/lib/music";
import { cn } from "@/lib/utils";

export type MusicLabels = {
  pause: string;
  play: string;
  mute: string;
  unmute: string;
  volume: string;
  volumeValue: string;
  position: string;
  positionValue: string;
};

export function useMusic() {
  return useSyncExternalStore(subscribeMusic, getMusicState, getServerMusicState);
}

function clock(seconds: number) {
  const total = Number.isFinite(seconds) ? Math.floor(seconds) : 0;
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

const iconButton = "inline-flex size-11 shrink-0 items-center justify-center rounded-full transition-colors";

export function MusicToggle({ labels }: { labels: MusicLabels }) {
  const { playing } = useMusic();
  const label = playing ? labels.pause : labels.play;
  const Icon = playing ? Pause : Play;
  return (
    <button
      type="button"
      onClick={togglePlay}
      aria-label={label}
      title={label}
      className={cn(iconButton, "bg-primary text-primary-foreground hover:bg-foreground hover:text-background")}
    >
      <Icon className="size-4 fill-current" />
    </button>
  );
}

// Barra de volumen solo en escritorio: en móvil se usan los botones del teléfono (iOS no deja cambiarlo por código).
export function VolumeControl({ labels }: { labels: MusicLabels }) {
  const { volume, muted } = useMusic();
  const label = muted ? labels.unmute : labels.mute;
  const Icon = muted ? VolumeX : Volume2;
  const percent = muted ? 0 : Math.round(volume * 100);
  return (
    <div className="flex shrink-0 items-center gap-1">
      <button type="button" onClick={toggleMuted} aria-label={label} title={label} className={cn(iconButton, "hover:bg-secondary")}>
        <Icon className="size-4" />
      </button>
      <input
        type="range"
        min={0}
        max={100}
        step={5}
        value={percent}
        onChange={(e) => setVolume(Number(e.target.value) / 100)}
        aria-label={labels.volume}
        aria-valuetext={labels.volumeValue.replace("{value}", String(percent))}
        style={{ "--value": `${percent}%` } as CSSProperties}
        className="audio-range hidden w-24 lg:block"
      />
    </div>
  );
}

// Tiempo de la canción: en el centro de la bandeja con el nombre debajo (escritorio) o en su borde superior (móvil).
export function TimeBar({ song, labels, edge = false }: { song: string; labels: MusicLabels; edge?: boolean }) {
  const { time, duration } = useMusic();
  const max = duration || 0;
  const percent = max ? Math.min(100, (time / max) * 100) : 0;
  const range = (
    <input
      type="range"
      min={0}
      max={Math.floor(max)}
      step={1}
      value={Math.floor(time)}
      disabled={!max}
      onChange={(e) => seek(Number(e.target.value))}
      aria-label={labels.position.replace("{song}", song)}
      aria-valuetext={labels.positionValue.replace("{time}", clock(time)).replace("{total}", clock(max))}
      style={{ "--value": `${percent}%` } as CSSProperties}
      className={cn("audio-range", edge ? "audio-range-edge absolute inset-x-0 top-0 w-full -translate-y-1/2 lg:hidden" : "min-w-0 flex-1")}
    />
  );
  if (edge) return range;
  return (
    <div className="absolute top-1/2 left-1/2 hidden w-90 -translate-x-1/2 -translate-y-1/2 flex-col items-center lg:flex">
      <div className="flex w-full items-center gap-2.5">
        <span className="text-mono w-9 shrink-0 text-right text-muted-foreground tabular-nums">{clock(time)}</span>
        {range}
        <span className="text-mono w-9 shrink-0 text-muted-foreground tabular-nums">{clock(max)}</span>
      </div>
      <p className="text-body-sm max-w-full truncate">{song}</p>
    </div>
  );
}

// Visualizador de audio: decorativo, detrás del contenido y justo encima de la bandeja. Sigue los niveles calculados
// de antemano (scripts/audio-levels.mjs). En pausa se queda quieto; con movimiento reducido no se anima.
export function AudioBars() {
  const { slug, playing } = useMusic();
  const canvas = useRef<HTMLCanvasElement>(null);
  const heights = useRef<number[]>([]);

  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx || !slug) return;
    let cancelled = false;
    let frame = 0;
    const still = !playing || matchMedia("(prefers-reduced-motion: reduce)").matches;

    void loadLevels(slug).then((levels) => {
      if (cancelled || !levels) return;
      const draw = () => {
        const dpr = Math.min(2, devicePixelRatio);
        const { width, height } = el.getBoundingClientRect();
        if (el.width !== Math.round(width * dpr) || el.height !== Math.round(height * dpr)) {
          el.width = Math.round(width * dpr);
          el.height = Math.round(height * dpr);
        }
        const wide = width >= 1024;
        const barWidth = wide ? 14 : 8;
        const gap = wide ? 8 : 4;
        const count = Math.floor((width + gap) / (barWidth + gap));
        const offset = (width - (count * (barWidth + gap) - gap)) / 2;
        const position = Math.floor(currentTime() * LEVELS_FPS) * LEVELS_BANDS;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = getComputedStyle(el).color;
        for (let i = 0; i < count; i++) {
          const band = Math.min(LEVELS_BANDS - 1, Math.floor((i / count) * LEVELS_BANDS));
          const target = (levels[position + band] ?? 0) / 255;
          const previous = heights.current[i] ?? 0;
          const value = still ? Math.max(previous, target) : previous + (target - previous) * 0.35;
          heights.current[i] = value;
          const bar = Math.max(4, value * height);
          ctx.beginPath();
          ctx.roundRect(offset + i * (barWidth + gap), height - bar, barWidth, bar, [3, 3, 0, 0]);
          ctx.fill();
        }
        if (!still) frame = requestAnimationFrame(draw);
      };
      draw();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [slug, playing]);

  return (
    <canvas
      ref={canvas}
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-[65px] -z-1 h-14 w-full text-primary transition-opacity duration-1000 md:bottom-[73px] lg:h-24",
        slug ? "opacity-20" : "opacity-0",
      )}
    />
  );
}
