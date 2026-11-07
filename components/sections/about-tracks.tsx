"use client";

import { Fragment, startTransition, useEffect, useRef, useState, ViewTransition, type KeyboardEvent, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export type AboutTrack = { id: string; title: string; content: ReactNode };

// Pistas de Sobre mí (Figma V2-D10): pestañas accesibles. Cambiar de pista funde el contenido
// (misma "página", distinto contenido). En escritorio el panel se desplaza por dentro; en móvil crece
// y se desplaza toda la vista (<main>). El #hash permite enlazar una pista (#gear desde Contacto).
export function AboutTracks({ tracks, label }: { tracks: AboutTrack[]; label: string }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // El #hash es un sistema externo: se lee en un callback (al montar y en cada hashchange).
  useEffect(() => {
    const sync = () => {
      const fromHash = tracks.findIndex((t) => `#${t.id}` === window.location.hash);
      if (fromHash >= 0) setActive(fromHash);
    };
    const frame = requestAnimationFrame(sync);
    window.addEventListener("hashchange", sync);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", sync);
    };
  }, [tracks]);

  function select(index: number, focus = false) {
    const i = (index + tracks.length) % tracks.length;
    startTransition(() => setActive(i));
    window.history.replaceState(null, "", `#${tracks[i].id}`);
    if (focus) tabRefs.current[i]?.focus();
  }

  function onKeyDown(e: KeyboardEvent) {
    const keys: Record<string, number> = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: tracks.length - 1 };
    if (e.key in keys) {
      e.preventDefault();
      select(keys[e.key], true);
    }
  }

  return (
    <div className="flex flex-col gap-5 md:min-h-0 md:flex-1">
      <div role="tablist" aria-label={label} onKeyDown={onKeyDown} className="-mx-1 -mt-1 flex shrink-0 gap-1 overflow-x-auto px-1 pt-1 pb-1 [scrollbar-width:none]">
        {tracks.map((track, index) => {
          const selected = index === active;
          return (
            <button
              key={track.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${track.id}`}
              aria-selected={selected}
              aria-controls={`panel-${track.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(index)}
              className={cn(
                "text-body-sm inline-flex h-11 shrink-0 items-center gap-2 rounded-full border px-4 transition-colors",
                selected ? "border-primary bg-card text-foreground" : "border-border text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <span className={cn("text-mono", selected ? "text-primary" : "text-muted-foreground")}>
                {String(index + 1).padStart(2, "0")}
              </span>
              {track.title}
            </button>
          );
        })}
      </div>
      {/* Todas las pistas van en el HTML (las inactivas con hidden): así los buscadores leen la trayectoria y el
          equipo, y siguen los enlaces a las fichas, aunque nadie pulse la pestaña. Mejora 44.
          La activa anima el cambio (sale una y entra otra). default="none": que otras actualizaciones (abrir una
          ficha de tecnología encima) no lancen una transición de página. */}
      {tracks.map((track, index) => {
        const panel = (
          <div
            role="tabpanel"
            id={`panel-${track.id}`}
            aria-labelledby={`tab-${track.id}`}
            tabIndex={index === active ? 0 : -1}
            hidden={index !== active}
            className="rounded-md md:min-h-0 md:flex-1 md:overflow-y-auto md:pr-1"
          >
            {track.content}
          </div>
        );
        return index === active ? (
          <ViewTransition key={track.id} enter="auto" exit="auto" default="none">
            {panel}
          </ViewTransition>
        ) : (
          <Fragment key={track.id}>{panel}</Fragment>
        );
      })}
    </div>
  );
}
