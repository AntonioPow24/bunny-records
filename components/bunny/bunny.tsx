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
  SMALL_MAX_PX,
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
  /** Baila solo 4 s cada 8 s (el conejo de la colección). */
  autoDance?: boolean;
  /** Carga prioritaria de la imagen fija (cuando el conejo es lo primero que se ve). */
  priority?: boolean;
  className?: string;
  ref?: Ref<BunnyHandle>;
};

/** Espera tras montarse antes de arrancar el motor: lo que dura la transición de página (320 ms) y un margen. */
const START_DELAY_MS = 360;

const HEAD_X = 600 / CANVAS_WIDTH;
const HEAD_Y = 944.9 / CANVAS_HEIGHT;

const pct = (value: number, total: number) => `${(value / total) * 100}%`;

/**
 * Conejo anfitrión. Se pinta primero como imagen fija (servidor, sin JavaScript); el montaje por capas la
 * sustituye cuando el reposo está descodificado. Con prefers-reduced-motion se queda la imagen fija.
 */
export function Bunny({ mode = "lite", hold, danceLabel, autoDance = false, priority = false, className, ref }: BunnyProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<BunnyEngine | null>(null);
  const engineKeyRef = useRef("");

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
    const key = `${mode}|${hold ?? ""}|${autoDance}`;
    let onScreen = true;
    let delay: number | null = null;
    let idle: number | null = null;
    const syncPause = () => engineRef.current?.setPaused(!onScreen || document.hidden);
    const stop = () => {
      engineRef.current?.destroy();
      engineRef.current = null;
    };
    const start = () => {
      if (reduced.matches || engineRef.current) return;
      // Pantallas táctiles: sin puntero que seguir, sobran las poses de "mirar arriba" (~40 capas menos).
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      const only: BunnyPose[] | null =
        mode === "full" && !hold && coarse ? ["curious-left", "curious-right", "present-left", "present-right"] : null;
      // Píxeles reales del conejo: por debajo de SMALL_MAX_PX bastan las capas a media resolución (~1/3 del peso).
      const small = root.clientWidth * window.devicePixelRatio <= SMALL_MAX_PX;
      engineRef.current = new BunnyEngine(canvas, mode, hold ?? null, only, small);
      if (autoDance) engineRef.current.startAutoDance();
      engineKeyRef.current = key;
      syncPause();
    };
    // Paso 7.5: el motor no arranca durante la transición de página (competía con ella y provocaba tirones).
    // Mientras tanto se ve la imagen fija; arranca al terminar la transición, cuando el navegador queda libre.
    const scheduleStart = () => {
      if (engineRef.current && engineKeyRef.current !== key) stop();
      if (engineRef.current) return syncPause(); // Activity vuelve a mostrar la página: se reanuda
      delay = window.setTimeout(() => {
        if ("requestIdleCallback" in window) idle = window.requestIdleCallback(start, { timeout: 600 });
        else start();
      }, START_DELAY_MS);
    };
    const onMotionChange = () => (reduced.matches ? stop() : scheduleStart());

    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      syncPause();
    });
    visibility.observe(root);
    document.addEventListener("visibilitychange", syncPause);
    reduced.addEventListener("change", onMotionChange);
    scheduleStart();

    return () => {
      resize.disconnect();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", syncPause);
      reduced.removeEventListener("change", onMotionChange);
      if (delay !== null) window.clearTimeout(delay);
      if (idle !== null && "cancelIdleCallback" in window) window.cancelIdleCallback(idle);
      // Activity oculta la página sin sacarla del DOM: el motor queda en pausa y se reanuda al volver.
      // Si el conejo sale del documento de verdad, se destruye y libera sus temporizadores.
      const engine = engineRef.current;
      engine?.setPaused(true);
      window.setTimeout(() => {
        if (engine && !canvas.isConnected) {
          engine.destroy();
          if (engineRef.current === engine) engineRef.current = null;
        }
      }, 0);
    };
  }, [mode, hold, autoDance]);

  const still = (
    // eslint-disable-next-line @next/next/no-img-element -- capa posicionada sobre el lienzo de 1200×1600, no una foto
    <img
      className="bunny-still"
      src={layerSrc("bunny-full-rest")}
      // Paso 13: la versión a media resolución (596 px) basta casi siempre; la completa, en pantallas densas grandes.
      srcSet={`${layerSrc("bunny-full-rest", true)} ${Math.round(FULL_REST.w / 2)}w, ${layerSrc("bunny-full-rest")} ${FULL_REST.w}w`}
      sizes={mode === "lite" ? "64px" : "(min-width: 48rem) 22vw, 60vw"}
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
    // La caja del lienzo (3:4) es mucho más ancha que la figura y tapaba las portadas vecinas: el
    // contenedor deja pasar los clics y solo la silueta (cabeza + cuerpo) es pulsable.
    return (
      <div ref={rootRef} className={cn("bunny pointer-events-none", className)}>
        {body}
        <button
          type="button"
          aria-label={danceLabel}
          onClick={() => engineRef.current?.dance()}
          className="pointer-events-auto absolute top-[9%] right-[25%] bottom-[8%] left-[25%] cursor-pointer rounded-[45%]"
        />
      </div>
    );
  }

  return (
    <div ref={rootRef} className={cn("bunny", className)} aria-hidden="true">
      {body}
    </div>
  );
}
