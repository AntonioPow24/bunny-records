"use client";

import { useEffect, useImperativeHandle, useRef, type Ref } from "react";

import { cn } from "@/lib/utils";

import "./bunny.css";
import {
  BunnyEngine,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  FULL_REST,
  HALO,
  layerSrc,
  type BunnyMode,
  type BunnyPose,
  type BunnySide,
} from "./engine";

export type BunnyHandle = {
  /** Punto de la cabeza en pantalla, para decidir hacia qué lado mira. */
  headPoint: () => { x: number; y: number } | null;
  setHover: (side: BunnySide | null) => void;
  present: (side: BunnySide, ms?: number) => void;
  gesture: (pose: BunnyPose, ms?: number) => void;
  dance: () => void;
};

type BunnyProps = {
  /** "full": escenario de la colección (poses, mirada). "lite": bandeja (reposo, parpadeo y respiración). */
  mode?: BunnyMode;
  /** Pose fija en modo full (no sigue al puntero). */
  hold?: BunnyPose;
  /** Si se pasa, el conejo es un botón que baila al pulsarlo; si no, es decorativo. */
  danceLabel?: string;
  /** Carga prioritaria de la imagen fija (cuando el conejo es lo primero que se ve). */
  priority?: boolean;
  className?: string;
  ref?: Ref<BunnyHandle>;
};

const HEAD_X = 600 / CANVAS_WIDTH;
const HEAD_Y = 944.9 / CANVAS_HEIGHT;

const pct = (value: number, total: number) => `${(value / total) * 100}%`;

/**
 * Conejo anfitrión. Se pinta primero como imagen fija (servidor, sin JavaScript); el montaje por capas la
 * sustituye cuando el reposo está descodificado. Con prefers-reduced-motion se queda la imagen fija.
 */
export function Bunny({ mode = "lite", hold, danceLabel, priority = false, className, ref }: BunnyProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<BunnyEngine | null>(null);

  useImperativeHandle(ref, () => ({
    headPoint: () => {
      const r = rootRef.current?.getBoundingClientRect();
      if (!r) return null;
      return { x: r.left + r.width * HEAD_X, y: r.top + r.height * HEAD_Y };
    },
    setHover: (side) => engineRef.current?.setHover(side),
    present: (side, ms) => engineRef.current?.present(side, ms),
    gesture: (pose, ms) => engineRef.current?.gesture(pose, ms),
    dance: () => engineRef.current?.dance(),
  }));

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const fit = () => canvas.style.setProperty("--bunny-scale", String(root.clientWidth / CANVAS_WIDTH));
    const resize = new ResizeObserver(fit);
    resize.observe(root);
    fit();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let onScreen = true;
    const syncPause = () => engineRef.current?.setPaused(!onScreen || document.hidden);
    const start = () => {
      if (reduced.matches || engineRef.current) return;
      engineRef.current = new BunnyEngine(canvas, mode, hold ?? null);
      syncPause();
    };
    const stop = () => {
      engineRef.current?.destroy();
      engineRef.current = null;
    };
    const onMotionChange = () => (reduced.matches ? stop() : start());

    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      syncPause();
    });
    visibility.observe(root);
    document.addEventListener("visibilitychange", syncPause);
    reduced.addEventListener("change", onMotionChange);
    start();

    // Al ocultarse la página (Activity) o desmontarse, el motor se detiene y libera sus temporizadores.
    return () => {
      resize.disconnect();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", syncPause);
      reduced.removeEventListener("change", onMotionChange);
      stop();
    };
  }, [mode, hold]);

  const still = (
    // eslint-disable-next-line @next/next/no-img-element -- capa posicionada sobre el lienzo de 1200×1600, no una foto
    <img
      className="bunny-still"
      src={layerSrc("bunny-full-rest")}
      alt=""
      draggable={false}
      fetchPriority={priority ? "high" : undefined}
      loading={priority ? "eager" : "lazy"}
      style={{
        left: pct(FULL_REST.x, CANVAS_WIDTH),
        top: pct(FULL_REST.y, CANVAS_HEIGHT),
        width: pct(FULL_REST.w, CANVAS_WIDTH),
        height: pct(FULL_REST.h, CANVAS_HEIGHT),
      }}
    />
  );
  const halo = (
    <span
      className="bunny-halo"
      style={{
        left: pct(HALO.center[0] - HALO.half_width * 1.15, CANVAS_WIDTH),
        top: pct(HALO.center[1] - HALO.half_width * 0.28, CANVAS_HEIGHT),
        width: pct(HALO.half_width * 2.3, CANVAS_WIDTH),
        height: pct(HALO.half_width * 0.56, CANVAS_HEIGHT),
      }}
    />
  );
  const body = (
    <>
      {halo}
      {still}
      <div ref={canvasRef} className="bunny-canvas" />
    </>
  );

  if (danceLabel) {
    return (
      <div ref={rootRef} className={cn("bunny", className)}>
        <button
          type="button"
          aria-label={danceLabel}
          onClick={() => engineRef.current?.dance()}
          className="absolute inset-0 cursor-pointer rounded-lg"
        >
          {body}
        </button>
      </div>
    );
  }

  return (
    <div ref={rootRef} className={cn("bunny", className)} aria-hidden="true">
      {body}
    </div>
  );
}
