"use client";

import { Play, SkipBack, SkipForward } from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { ViewTransition } from "react";

import { Bunny } from "@/components/bunny/bunny";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

export type TrayAlbum = {
  slug: string;
  title: string;
  published: boolean;
  /** Resumen ya traducido: "5 pistas · 5 min" o "Próximo lanzamiento". */
  summary: string;
  tracks: { slug: string; title: string }[];
};

type TrayLabels = {
  label: string;
  trackNow: string;
  prevTrack: string;
  nextTrack: string;
  firstTrack: string;
  backToAlbum: string;
};

type PlayerTrayProps = { locale: Locale; albums: TrayAlbum[]; labels: TrayLabels };

type Control = { href: string; label: string } | null;

const iconButton =
  "inline-flex size-11 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-secondary";

// Bandeja tipo reproductor (BUNNY-RECORDS.md §5.3.2): solo existe en el flujo de proyectos.
// En la lista de pistas de un álbum publicado hay un solo ▶ (abre la pista 1); dentro de una pista,
// ⏮ ⏭ cambian de pista (⏮ en la 1 vuelve a la lista; ⏭ en la última queda desactivado, como al final
// de un disco). En un próximo lanzamiento solo muestra el título.
export function PlayerTray({ locale, albums, labels }: PlayerTrayProps) {
  // Segmentos de la página de fondo (ver nav-disc.tsx): con el panel de tecnología abierto sobre un álbum,
  // la bandeja sigue ahí.
  const [section, slug, trackSlug] = useSelectedLayoutSegments();
  const album = section === "projects" ? albums.find((a) => a.slug === slug) : undefined;
  if (!album) return null;

  const base = `/${locale}/projects/${album.slug}`;
  let subtitle = album.summary;
  let prev: Control = null;
  let next: Control = null;
  let play: Control = null;

  if (album.published) {
    const index = album.tracks.findIndex((t) => t.slug === trackSlug);
    if (index >= 0) {
      const number = String(index + 1).padStart(2, "0");
      subtitle = labels.trackNow.replace("{number}", number).replace("{title}", album.tracks[index].title);
      prev =
        index > 0
          ? { href: `${base}/${album.tracks[index - 1].slug}`, label: labels.prevTrack }
          : { href: base, label: labels.backToAlbum };
      next =
        index < album.tracks.length - 1
          ? { href: `${base}/${album.tracks[index + 1].slug}`, label: labels.nextTrack }
          : null;
    } else if (album.tracks[0]) {
      play = { href: `${base}/${album.tracks[0].slug}`, label: labels.firstTrack };
    }
  }

  const control = (c: Control, Icon: typeof SkipBack, fallback: string) =>
    c ? (
      <Link href={c.href} prefetch aria-label={c.label} className={iconButton}>
        <Icon className="size-4 fill-current" />
      </Link>
    ) : (
      <span aria-hidden="true" title={fallback} className={cn(iconButton, "opacity-30 hover:bg-transparent")}>
        <Icon className="size-4 fill-current" />
      </span>
    );

  return (
    <section aria-label={labels.label} className="relative z-30 shrink-0 border-t border-border bg-card">
      <div className="mx-auto flex h-16 w-full max-w-312 items-center gap-2 px-3 md:h-18 md:gap-4 md:px-6">
        <ViewTransition name="host-bunny" default="host-bunny">
          {/* Figma V2-D06: 60×80, las orejas sobresalen ~22 px por encima de la bandeja. */}
          <Bunny mode="lite" className="mb-3 w-12 shrink-0 self-end md:mb-3.5 md:w-15" />
        </ViewTransition>
        <div className="min-w-0 flex-1" aria-live="polite">
          <p className="text-body-strong truncate">{album.title}</p>
          <p className="text-body-sm truncate text-muted-foreground">{subtitle}</p>
        </div>
        {play && (
          <Link
            href={play.href}
            prefetch
            aria-label={play.label}
            title={play.label}
            className={cn(iconButton, "bg-primary text-primary-foreground hover:bg-foreground hover:text-background")}
          >
            <Play className="size-4 translate-x-px fill-current" />
          </Link>
        )}
        {(prev || next) && (
          <div className="flex items-center">
            {control(prev, SkipBack, labels.prevTrack)}
            {control(next, SkipForward, labels.nextTrack)}
          </div>
        )}
      </div>
    </section>
  );
}
