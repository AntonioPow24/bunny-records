"use client";

import { ChevronLeft, ChevronRight, Disc3, Play } from "lucide-react";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, ViewTransition, type KeyboardEvent, type PointerEvent } from "react";

import { Bunny, type BunnyHandle } from "@/components/bunny/bunny";
import type { BunnySide } from "@/components/bunny/engine";
import { statusGlyphs, type ProjectStatusVariant } from "@/components/patterns/status-pill";
import { buttonVariants } from "@/components/ui/button";
import { useSessionState } from "@/lib/session-state";
import { cn } from "@/lib/utils";

import "./collection.css";
import { CoverArt } from "./cover-art";

export type CollectionItem = {
  slug: string;
  href: string;
  title: string;
  tagline: string;
  /** Ya traducido: "2026 · 5 pistas · 5 min" o "Próximo lanzamiento". */
  meta: string;
  status: ProjectStatusVariant;
  statusLabel: string;
  cover: { src: StaticImageData; alt: string };
};

type Filter = "all" | ProjectStatusVariant;
type CollectionView = { filter: Filter; slug: string | null };
const INITIAL_VIEW: CollectionView = { filter: "all", slug: null };

type CollectionLabels = {
  filterLabel: string;
  filters: Record<Filter, string>;
  collectionLabel: string;
  collectionRole: string;
  prev: string;
  next: string;
  select: string;
  position: string;
  hint: string;
  open: string;
  openPlanned: string;
  empty: string;
  dance: string;
};

const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, k: string) => String(values[k] ?? ""));

/** Distancia a la seleccionada → posición en el arco (collection.css). Circular: vecinas a los dos lados. */
function offsetOf(index: number, selected: number, total: number) {
  let d = index - selected;
  if (total >= 3) {
    d = (((d % total) + total) % total);
    if (d > total / 2) d -= total;
  }
  if (d < -2) return "far-left";
  if (d > 2) return "far-right";
  return String(d);
}

// Colección (Figma D01, D02 y M01; BUNNY-RECORDS.md §5.2 pasos 1–2).
// Seleccionar = explorar (la portada avanza y aparece su ficha); abrir = entrar al álbum.
export function Collection({ items, labels }: { items: CollectionItem[]; labels: CollectionLabels }) {
  const router = useRouter();
  const bunny = useRef<BunnyHandle>(null);
  const swipeStart = useRef<number | null>(null);
  const arc = useRef<HTMLElement>(null);
  // Filtro y portada elegida, por slug: se conservan al cambiar de idioma (lib/session-state.ts).
  const [view, setView] = useSessionState("collection", INITIAL_VIEW);

  const filters = (["all", "published", "in-development", "planned"] as Filter[]).filter(
    (f) => f === "all" || items.some((i) => i.status === f),
  );
  const filter = filters.includes(view.filter) ? view.filter : "all";
  const visible = filter === "all" ? items : items.filter((i) => i.status === filter);
  const found = visible.findIndex((i) => i.slug === view.slug);
  const selected = found >= 0 ? found : 0;
  const current = visible[selected];

  // La selección restaurada al cargar se coloca sin animar; a partir de ahí, las portadas se deslizan.
  useEffect(() => {
    const frame = requestAnimationFrame(() => arc.current?.setAttribute("data-settled", ""));
    return () => cancelAnimationFrame(frame);
  }, []);

  function chooseFilter(f: Filter) {
    const list = f === "all" ? items : items.filter((i) => i.status === f);
    const keep = list.some((i) => i.slug === current?.slug);
    setView({ filter: f, slug: keep ? (current?.slug ?? null) : (list[0]?.slug ?? null) });
  }

  function select(index: number) {
    if (visible.length === 0) return;
    setView({ filter, slug: visible[(index + visible.length) % visible.length].slug });
  }

  /** Lado del conejo hacia el que queda un elemento (mira o señala hacia él). */
  function sideOf(el: Element): BunnySide {
    const head = bunny.current?.headPoint();
    const r = el.getBoundingClientRect();
    if (!head) return "right";
    const dx = r.left + r.width / 2 - head.x;
    const dy = r.top + r.height / 2 - head.y;
    if (dy < -120 && Math.abs(dx) > 60) return dx < 0 ? "up-left" : "up-right";
    return dx < 0 ? "left" : "right";
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      select(selected - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      select(selected + 1);
    } else if (e.key === "Enter" && e.target === e.currentTarget && current) {
      router.push(current.href);
    }
  }

  function onPointerDown(e: PointerEvent) {
    if (e.pointerType !== "mouse") swipeStart.current = e.clientX;
  }
  function onPointerUp(e: PointerEvent) {
    if (swipeStart.current === null) return;
    const dx = e.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(dx) > 40) select(selected + (dx < 0 ? 1 : -1));
  }

  const arrow = "inline-flex size-12 items-center justify-center rounded-full border border-border bg-card transition-colors hover:bg-secondary";

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 md:gap-6">
      {filters.length > 2 && (
        <div role="group" aria-label={labels.filterLabel} className="flex shrink-0 gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => chooseFilter(f)}
              className={cn(
                "text-body-sm h-11 shrink-0 rounded-full border px-4 transition-colors",
                filter === f
                  ? "border-transparent bg-foreground text-background"
                  : "border-border text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              {labels.filters[f]}
            </button>
          ))}
        </div>
      )}

      {visible.length === 0 || !current ? (
        <p className="text-body text-muted-foreground">{labels.empty}</p>
      ) : (
        <div className="stage -mx-4 flex flex-col items-center gap-3 overflow-x-clip px-4 md:mx-0 md:block md:px-0">
          {/* El conejo anfitrión baja del escenario a la bandeja al abrir un álbum (misma transición). */}
          <ViewTransition name="host-bunny" share="host-bunny" default="none">
            <Bunny ref={bunny} mode="full" priority danceLabel={labels.dance} autoDance className="stage-bunny" />
          </ViewTransition>

          <section
            ref={arc}
            aria-roledescription={labels.collectionRole}
            aria-label={labels.collectionLabel}
            tabIndex={0}
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            className="arc w-full rounded-lg"
          >
            {visible.map((item, index) => {
              const offset = offsetOf(index, selected, visible.length);
              const isCurrent = offset === "0";
              // Misma transición que la portada del álbum: al abrirlo, la portada viaja a la cabecera.
              const art = (
                <ViewTransition name={`cover-${item.slug}`} share="morph" default="none">
                <CoverArt
                  src={item.cover.src}
                  alt=""
                  title={item.title}
                  sticker={item.status === "published" ? undefined : item.statusLabel}
                  sizes="(min-width: 48rem) 320px, 200px"
                  eager={index === 0}
                  titleSize={isCurrent ? "lg" : "sm"}
                />
                </ViewTransition>
              );
              return (
                <div
                  key={item.slug}
                  data-offset={offset}
                  className="arc-item"
                  onPointerEnter={(e) => bunny.current?.setHover(sideOf(e.currentTarget))}
                  onPointerLeave={() => bunny.current?.setHover(null)}
                >
                  {isCurrent ? (
                    <Link href={item.href} prefetch className="block rounded-lg">
                      {art}
                      <span className="sr-only">
                        {fill(labels.position, { title: "", position: index + 1, total: visible.length }).replace(/^,\s*/, ", ")}
                      </span>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={(e) => {
                        bunny.current?.present(sideOf(e.currentTarget), 1600);
                        select(index);
                      }}
                      className="block w-full cursor-pointer rounded-lg"
                    >
                      <span className="sr-only">{fill(labels.select, { title: "" }).trim()} </span>
                      {art}
                    </button>
                  )}
                </div>
              );
            })}
          </section>

          <div className="stage-arrows flex items-center gap-4 md:justify-between md:gap-0">
            <button type="button" aria-label={labels.prev} onClick={() => select(selected - 1)} className={arrow}>
              <ChevronLeft className="size-5" />
            </button>
            <ol aria-hidden="true" className="flex gap-1.5 md:hidden">
              {visible.map((item, index) => (
                <li
                  key={item.slug}
                  className={cn("size-1.5 rounded-full", index === selected ? "bg-primary" : "bg-border")}
                />
              ))}
            </ol>
            <button type="button" aria-label={labels.next} onClick={() => select(selected + 1)} className={arrow}>
              <ChevronRight className="size-5" />
            </button>
          </div>

          {/* Ficha breve como pegatina (mejora 5; Figma "Mejoras · T5"): la portada ya lleva el título, así que
              aquí no se repite (queda para lectores de pantalla). Estado y meta, la frase y ▶. */}
          <div aria-live="polite" className="stage-info flex w-full flex-col items-center gap-3 text-center">
            <h2 className="sr-only">{current.title}</h2>
            {/* Texto corrido (no flex): si no cabe, se parte entre palabras y el "·" no queda al principio. */}
            <p className="text-label text-balance text-muted-foreground">
              <span className={current.status === "published" ? "text-primary" : undefined}>
                <span aria-hidden="true">{statusGlyphs[current.status]} </span>
                {current.statusLabel}
              </span>{" "}
              · {current.meta}
            </p>
            <p className="text-body-sm line-clamp-2 text-muted-foreground [@media(max-height:44rem)]:hidden">{current.tagline}</p>
            <Link
              href={current.href}
              prefetch
              className={buttonVariants({ size: "sm", variant: current.status === "published" ? "primary" : "secondary" })}
            >
              {current.status === "published" ? (
                <Play aria-hidden="true" className="size-3.5 fill-current" />
              ) : (
                <Disc3 aria-hidden="true" />
              )}
              {current.status === "published" ? labels.open : labels.openPlanned}
            </Link>
          </div>

          <p className="text-mono absolute right-0 bottom-0 hidden text-muted-foreground [@media(min-height:52rem)]:md:block">
            {labels.hint}
          </p>
        </div>
      )}
    </div>
  );
}
