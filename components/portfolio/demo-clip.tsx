"use client";

import { Dialog } from "@base-ui/react/dialog";
import { Maximize2, X } from "lucide-react";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type DemoClipProps = {
  mp4: string;
  webm?: string;
  poster: string;
  /** Qué se ve en el clip (para lectores de pantalla). */
  description: string;
  labels: { caption: string; play: string; pause: string; expand: string; close: string };
  className?: string;
};

const PERFORATIONS = 6;

// Videoclip bajo la portada del álbum (Figma T15; BUNNY-RECORDS.md §5.2.1): ventana de película con marco mate y
// perforaciones decorativas. Clip de 6 s, mudo y en bucle, que arranca solo y sin controles visibles: la caja
// entera es el botón que pausa o reanuda. Se pausa cuando no se ve (fuera de pantalla, pestaña oculta o página
// oculta por <Activity>, que desmonta los efectos). Con prefers-reduced-motion no arranca solo.
// "Ampliar", junto al rótulo y fuera de la caja, abre el mismo clip centrado y más grande (hasta su tamaño real,
// 960 px, para no verlo borroso). Mientras está abierto, el clip pequeño queda en pausa y luego sigue por donde iba.
export function DemoClip({ mp4, webm, poster, description, labels, className }: DemoClipProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const boxRef = useRef<HTMLButtonElement>(null);
  /** Pausa elegida por el visitante (o por movimiento reducido): manda sobre la visibilidad. */
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const descriptionId = useId();
  const expandedVideoRef = useRef<HTMLVideoElement>(null);
  const expandedRef = useRef(false);
  const [expanded, setExpanded] = useState(false);
  const [expandedPlaying, setExpandedPlaying] = useState(false);

  // Con <Activity> la página oculta conserva el estado: el modal se cierra al ocultarse.
  useLayoutEffect(
    () => () => {
      expandedRef.current = false;
      setExpanded(false);
    },
    [],
  );

  useEffect(() => {
    const video = videoRef.current;
    const box = boxRef.current;
    if (!video || !box) return;
    userPaused.current ||= window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let inView = false;

    const sync = () => {
      if (!userPaused.current && !expandedRef.current && inView && !document.hidden) video.play().catch(() => {});
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

  function toggle(video: HTMLVideoElement | null) {
    if (!video) return;
    userPaused.current = !video.paused;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  }

  function setOpen(open: boolean) {
    const video = videoRef.current;
    expandedRef.current = open;
    setExpanded(open);
    if (!video) return;
    if (open) {
      video.pause();
      return;
    }
    const big = expandedVideoRef.current;
    if (big) video.currentTime = big.currentTime;
    if (!userPaused.current && !document.hidden) video.play().catch(() => {});
  }

  // El clip grande empieza donde iba el pequeño y respeta la pausa elegida (o el movimiento reducido).
  function startExpanded() {
    const big = expandedVideoRef.current;
    if (!big) return;
    big.currentTime = videoRef.current?.currentTime ?? 0;
    if (!userPaused.current) big.play().catch(() => {});
  }

  return (
    <figure className={cn("relative flex flex-col gap-2", className)}>
      <figcaption className="text-label flex items-center gap-2 text-primary">
        <span aria-hidden="true" className="h-3 w-1 rounded-full bg-primary" />
        {labels.caption}
      </figcaption>
      <Dialog.Root open={expanded} onOpenChange={setOpen}>
        <Dialog.Trigger className="text-label absolute top-0 right-0 flex items-center gap-1 text-primary transition-colors after:absolute after:-inset-x-2 after:-inset-y-4 hover:text-foreground">
          {labels.expand}
          <Maximize2 aria-hidden="true" className="size-3" />
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-50 bg-scrim/70 transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
          <Dialog.Popup className="surface-lit fixed top-1/2 left-1/2 z-50 flex w-[min(92vw,60rem,calc((100dvh-8rem)*16/9))] -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded-lg border border-border bg-card p-3 transition-[opacity,scale] duration-200 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0">
            <div className="flex items-center justify-between gap-2 pl-1">
              <Dialog.Title className="text-label flex items-center gap-2 text-primary">
                <span aria-hidden="true" className="h-3 w-1 rounded-full bg-primary" />
                {labels.caption}
              </Dialog.Title>
              <Dialog.Close
                aria-label={labels.close}
                className="-my-2 inline-flex size-11 items-center justify-center rounded-full transition-colors hover:bg-secondary"
              >
                <X className="size-5" />
              </Dialog.Close>
            </div>
            <Dialog.Description className="sr-only">{description}</Dialog.Description>
            <button
              type="button"
              onClick={() => toggle(expandedVideoRef.current)}
              aria-label={expandedPlaying ? labels.pause : labels.play}
              className="relative flex items-start gap-2 rounded-md border border-border bg-background p-2"
            >
              <Perforations />
              <video
                ref={expandedVideoRef}
                muted
                loop
                playsInline
                poster={poster}
                aria-hidden="true"
                tabIndex={-1}
                onLoadedMetadata={startExpanded}
                onPlay={() => setExpandedPlaying(true)}
                onPause={() => setExpandedPlaying(false)}
                className="aspect-video min-w-0 flex-1 rounded-sm bg-background object-cover"
              >
                {webm && <source src={webm} type="video/webm" />}
                <source src={mp4} type="video/mp4" />
              </video>
              <Perforations />
            </button>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
      <button
        ref={boxRef}
        type="button"
        onClick={() => toggle(videoRef.current)}
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
