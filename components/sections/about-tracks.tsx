"use client";

import { startTransition, useEffect, useRef, useState, ViewTransition, type KeyboardEvent, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export type AboutTrack = { id: string; title: string; content: ReactNode };

// Pistas de Sobre mí (Figma V2-D10): pestañas accesibles. Cambiar de pista funde el contenido
// (misma "página", distinto contenido). El #hash permite enlazar una pista (#gear desde Contacto).
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

  const current = tracks[active];

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-5">
      <div role="tablist" aria-label={label} onKeyDown={onKeyDown} className="-mx-1 flex shrink-0 gap-1 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
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
      {/* Solo anima el cambio de pista (la key cambia: sale una y entra otra). default="none": que otras
          actualizaciones (abrir una ficha de tecnología encima) no lancen una transición de página. */}
      <ViewTransition key={current.id} enter="auto" exit="auto" default="none">
        <div
          role="tabpanel"
          id={`panel-${current.id}`}
          aria-labelledby={`tab-${current.id}`}
          tabIndex={0}
          className="min-h-0 flex-1 overflow-y-auto rounded-md pr-1"
        >
          {current.content}
        </div>
      </ViewTransition>
    </div>
  );
}
