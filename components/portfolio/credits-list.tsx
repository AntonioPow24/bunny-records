"use client";

import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  addTransitionType,
  startTransition,
  useLayoutEffect,
  useState,
  ViewTransition,
  type KeyboardEvent,
} from "react";

import { Disc } from "@/components/brand/disc";
import { cn } from "@/lib/utils";

type CreditItem = { id: string; name: string; role: string; href: string };
/** Un lado del disco = un área (Frontend, Backend y datos…), con su letra y sus créditos. */
export type CreditSide = { letter: string; area: string; count: string; items: CreditItem[] };

type CreditSleevesProps = {
  /** Único por página (los álbumes ocultos por <Activity> siguen en el DOM). */
  id: string;
  title: string;
  /** Resumen ya traducido: "10 créditos · 3 lados". */
  summary: string;
  sides: CreditSide[];
  labels: { side: string; hint: string; prev: string; next: string; all: string };
};

const TONES = ["teal", "ivory", "deep"] as const;
const sideName = (template: string, letter: string) => template.replace("{letter}", letter);

// Créditos como sobres (mejora 8; Figma "Mejoras · T9"). En reposo, un sobre por lado (A, B, C…) con su vinilo
// asomando. Al elegir uno, el sobre pasa a la izquierda (los demás quedan apilados detrás) y a la derecha salen
// sus créditos. Se cambia de lado como en la colección (‹ › o el sobre que asoma); el sobre activo vuelve al
// reposo. El movimiento es una View Transition con tipo "sleeve": otras navegaciones no la disparan.
export function CreditSleeves({ id, title, summary, sides, labels }: CreditSleevesProps) {
  const [active, setActive] = useState<number | null>(null);

  // Next oculta las páginas con <Activity>: al ocultarse el álbum, los créditos vuelven al reposo.
  useLayoutEffect(() => () => setActive(null), []);

  function choose(index: number | null) {
    startTransition(() => {
      addTransitionType("sleeve");
      setActive(index === null ? null : (index + sides.length) % sides.length);
    });
  }

  function onKeyDown(e: KeyboardEvent) {
    if (active === null) return;
    if (e.key === "Escape") choose(null);
    else if (e.key === "ArrowRight") choose(active + 1);
    else if (e.key === "ArrowLeft") choose(active - 1);
    else return;
    e.preventDefault();
  }

  const panelId = `${id}-panel`;
  const current = active === null ? null : sides[active];

  return (
    <section aria-labelledby={id} className="flex flex-col gap-4" onKeyDown={onKeyDown}>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 id={id} className="font-display text-[1.0625rem] font-semibold">
          {title}
        </h2>
        <p className="text-label text-muted-foreground">{summary}</p>
      </div>

      {current === null || active === null ? (
        <>
          <ul className="grid grid-cols-3 gap-3 md:gap-4">
            {sides.map((side, index) => (
              <li key={side.letter}>
                <button
                  type="button"
                  aria-expanded={false}
                  aria-controls={panelId}
                  onClick={() => choose(index)}
                  className="group block w-full rounded-md text-left"
                >
                  <SleeveArt id={id} side={side} tone={TONES[index % 3]} sideLabel={labels.side} />
                </button>
              </li>
            ))}
          </ul>
          <p className="text-label text-muted-foreground">{labels.hint}</p>
        </>
      ) : (
        <div className="flex flex-col gap-4 md:grid md:grid-cols-[12.5rem_minmax(0,1fr)] md:gap-7">
          <div className="flex items-center gap-4 md:flex-col md:items-start">
            {/* Pila: el activo delante; los demás asoman detrás (se pueden pulsar para cambiar). */}
            <div className="relative w-24 shrink-0 pt-3.5 pr-4 md:w-[10.5rem]">
              {sides.map((side, index) => {
                const depth = (index - active + sides.length) % sides.length;
                if (depth === 0) return null;
                return (
                  <button
                    key={side.letter}
                    type="button"
                    tabIndex={-1}
                    aria-hidden="true"
                    onClick={() => choose(index)}
                    className="absolute top-0 left-0 w-[calc(100%-1rem)]"
                    style={{
                      translate: `${depth * 0.55}rem ${0.875 - depth * 0.45}rem`,
                      zIndex: 10 - depth,
                      opacity: 1 - depth * 0.3,
                    }}
                  >
                    <SleeveArt id={id} side={side} tone={TONES[index % 3]} sideLabel={labels.side} back />
                  </button>
                );
              })}
              <button
                type="button"
                aria-expanded
                aria-controls={panelId}
                aria-label={labels.all}
                title={labels.all}
                onClick={() => choose(null)}
                className="relative z-20 block w-full rounded-md text-left"
              >
                <SleeveArt id={id} side={current} tone={TONES[active % 3]} sideLabel={labels.side} active compact />
              </button>
            </div>

            <div className="flex min-w-0 flex-col gap-2 md:w-full md:items-center">
              <p className="text-body-strong md:hidden">
                {sideName(labels.side, current.letter)} · {current.area}
              </p>
              <p className="text-label text-muted-foreground md:hidden">{current.count}</p>
              <div className="flex items-center gap-2">
                <button type="button" aria-label={labels.prev} title={labels.prev} onClick={() => choose(active - 1)} className={arrow}>
                  <ChevronLeft className="size-4" />
                </button>
                <span className="text-label flex gap-1.5" aria-hidden="true">
                  {sides.map((side, index) => (
                    <span key={side.letter} className={index === active ? "text-primary" : "text-muted-foreground"}>
                      {side.letter}
                    </span>
                  ))}
                </span>
                <button type="button" aria-label={labels.next} title={labels.next} onClick={() => choose(active + 1)} className={arrow}>
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </div>

          <ViewTransition key={current.letter} enter={{ sleeve: "track-body", default: "none" }} exit="none" default="none">
            <div id={panelId} role="region" aria-labelledby={`${panelId}-title`} className="relative flex min-w-0 flex-col gap-3.5">
              {/* En móvil ya lo dice la fila de la pila: solo para lectores de pantalla. */}
              <h3 id={`${panelId}-title`} className="text-label text-muted-foreground max-md:sr-only">
                {sideName(labels.side, current.letter)} · {current.area} · {current.items.length}
              </h3>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3.5">
                {current.items.map((item) => (
                  <li key={item.id}>
                    <Link href={item.href} prefetch className="group flex flex-col gap-0.5 rounded-sm">
                      <span className="flex items-center gap-1.5 text-[0.9375rem] font-medium transition-colors group-hover:text-primary">
                        {item.name}
                        <ArrowUpRight aria-hidden="true" className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                      </span>
                      <span className="text-[0.8125rem] leading-snug text-muted-foreground">{item.role}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </ViewTransition>
        </div>
      )}
    </section>
  );
}

const arrow =
  "inline-flex size-11 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary";

type SleeveArtProps = {
  id: string;
  side: CreditSide;
  tone: (typeof TONES)[number];
  sideLabel: string;
  active?: boolean;
  /** En la pila: sin el pie (área y número). */
  compact?: boolean;
  /** Sobre de detrás en la pila: sin vinilo ni textos. */
  back?: boolean;
};

/** Funda cuadrada con el vinilo (el de Sobre mí / Contacto, sin conejo) asomando por la derecha. */
function SleeveArt({ id, side, tone, sideLabel, active = false, compact = false, back = false }: SleeveArtProps) {
  return (
    <ViewTransition
      name={`${id}-sleeve-${side.letter}`}
      share={{ sleeve: "sleeve-morph", default: "none" }}
      update={{ sleeve: "sleeve-morph", default: "none" }}
      default="none"
    >
      {/* En reposo la funda ocupa el 69 % de la columna: el resto es el vinilo que asoma (media galleta). */}
      <span className={cn("relative block", back || compact ? "w-full" : "w-[69%]")}>
        {!back && (
          <Disc
            kind="about"
            bunny={false}
            tone={tone}
            className="absolute top-[5%] left-[50%] w-[90%] transition-transform duration-300 group-hover:translate-x-[6%]"
          />
        )}
        <span
          className={cn(
            "relative flex aspect-square flex-col justify-between rounded-md border bg-card p-2.5 shadow-[6px_8px_18px_rgb(0_0_0/0.35)] md:p-3.5",
            active ? "border-primary/80" : "border-border",
          )}
        >
          {!back && (
            <>
              <span className="text-label text-muted-foreground max-sm:hidden">{sideLabel.replace("{letter}", "").trim()}</span>
              <span
                className={cn(
                  "font-display leading-none font-bold",
                  compact ? "text-[2.375rem] md:text-[3rem]" : "text-[2rem] md:text-[3.25rem]",
                  active ? "text-primary" : "text-foreground",
                )}
              >
                {side.letter}
              </span>
              {!compact && (
                <span className="flex min-w-0 flex-col">
                  <span className="text-label line-clamp-2 max-sm:text-[0.625rem]">{side.area}</span>
                  <span className="text-label hidden text-muted-foreground sm:block">{side.count}</span>
                </span>
              )}
            </>
          )}
        </span>
      </span>
    </ViewTransition>
  );
}
