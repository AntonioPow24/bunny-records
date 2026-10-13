"use client";

import { useEffect, useId, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type DemoClipProps = {
  mp4: string;
  webm?: string;
  poster: string;
  /** Qué se ve en el clip (para lectores de pantalla). */
  description: string;
  labels: { caption: string; play: string; pause: string };
  className?: string;
};

const PERFORATIONS = 6;

// Videoclip bajo la portada del álbum (Figma T15; BUNNY-RECORDS.md §5.2.1): ventana de película con marco mate y
// perforaciones decorativas. Clip de 6 s, mudo y en bucle, que arranca solo y sin controles visibles: la caja
// entera es el botón que pausa o reanuda. Se pausa cuando no se ve (fuera de pantalla, pestaña oculta o página
// oculta por <Activity>, que desmonta los efectos). Con prefers-reduced-motion no arranca solo.
export function DemoClip({ mp4, webm, poster, description, labels, className }: DemoClipProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const boxRef = useRef<HTMLButtonElement>(null);
  /** Pausa elegida por el visitante (o por movimiento reducido): manda sobre la visibilidad. */
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const descriptionId = useId();

  useEffect(() => {
    const video = videoRef.current;
    const box = boxRef.current;
    if (!video || !box) return;
    userPaused.current ||= window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let inView = false;

    const sync = () => {
      if (!userPaused.current && inView && !document.hidden) video.play().catch(() => {});
      else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    observer.observe(box);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      video.pause();
    };
  }, []);

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    userPaused.current = !video.paused;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  }

  return (
    <figure className={cn("relative flex flex-col gap-2", className)}>
      <figcaption className="text-label flex items-center gap-2 text-primary">
        <span aria-hidden="true" className="h-3 w-1 rounded-full bg-primary" />
        {labels.caption}
      </figcaption>
      <button
        ref={boxRef}
        type="button"
        onClick={toggle}
        aria-label={playing ? labels.pause : labels.play}
        aria-describedby={descriptionId}
        className="surface-lit relative flex items-start gap-2 rounded-md border border-border bg-card p-2"
      >
        <Perforations />
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          aria-hidden="true"
          tabIndex={-1}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className="aspect-video min-w-0 flex-1 rounded-sm bg-background object-cover"
        >
          {webm && <source src={webm} type="video/webm" />}
          <source src={mp4} type="video/mp4" />
        </video>
        <Perforations />
      </button>
      <p id={descriptionId} className="sr-only">
        {description}
      </p>
    </figure>
  );
}

function Perforations() {
  return (
    <span aria-hidden="true" className="flex w-1 shrink-0 flex-col justify-evenly self-stretch py-1">
      {Array.from({ length: PERFORATIONS }, (_, i) => (
        <span key={i} className="h-1.5 w-1 rounded-[1px] bg-muted-foreground/30" />
      ))}
    </span>
  );
}
