"use client";

import { SkipBack, SkipForward } from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { useEffect, ViewTransition } from "react";

import { MusicToggle, TimeBar, VolumeControl, type MusicLabels } from "@/components/layout/album-music";
import { Bunny } from "@/components/bunny/bunny";
import type { Locale } from "@/lib/i18n/config";
import { syncAlbum } from "@/lib/music";
import { cn } from "@/lib/utils";

export type TrayAlbum = {
  slug: string;
  title: string;
  published: boolean;
  /** Resumen ya traducido: "5 pistas · 5 min" o "Próximo lanzamiento". */
  summary: string;
  /** Canción del álbum: "Título · Artista" (solo publicados). */
  song?: string;
  tracks: { slug: string; title: string }[];
};

type TrayLabels = MusicLabels & {
  label: string;
  trackNow: string;
  prevTrack: string;
  nextTrack: string;
  firstTrack: string;
  backToAlbum: string;
};

type PlayerTrayProps = { locale: Locale; albums: TrayAlbum[]; labels: TrayLabels };

type Control = { href: string; label: string } | null;

const iconButton = "inline-flex size-11 shrink-0 items-center justify-center rounded-full transition-colors";

// Bandeja tipo reproductor (BUNNY-RECORDS.md §5.2.2 y §5.3.2): solo existe en el flujo de proyectos. Suena la canción
// del álbum: el botón primario la pausa, la barra central muestra su tiempo y el volumen va a la derecha.
// ⏮ ⏭ cambian de pista (⏭ en el álbum abre la 1; ⏮ en la 1 vuelve a la lista; ⏭ en la última queda desactivado,
// como al final de un disco). En un próximo lanzamiento solo muestra el título.
export function PlayerTray({ locale, albums, labels }: PlayerTrayProps) {
  // Segmentos de la página de fondo (ver nav-disc.tsx): con el panel de tecnología abierto sobre un álbum,
  // la bandeja sigue ahí.
  const [section, slug, trackSlug] = useSelectedLayoutSegments();
  const album = section === "projects" ? albums.find((a) => a.slug === slug) : undefined;
  const musicSlug = album?.song ? album.slug : null;

  useEffect(() => syncAlbum(musicSlug), [musicSlug]);

  if (!album) return null;

  const base = `/${locale}/projects/${album.slug}`;
  let subtitle = album.summary;
  let prev: Control = null;
  let next: Control = null;
  const index = album.tracks.findIndex((t) => t.slug === trackSlug);

  if (album.published) {
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
      next = { href: `${base}/${album.tracks[0].slug}`, label: labels.firstTrack };
    }
  }

  // ⏮ ⏭ son discretos. Desactivado = sin enlace.
  const control = (c: Control, Icon: typeof SkipBack, fallback: string, className?: string) =>
    c ? (
      <Link href={c.href} prefetch aria-label={c.label} title={c.label} className={cn(iconButton, "hover:bg-secondary", className)}>
        <Icon className="size-4 fill-current" />
      </Link>
    ) : (
      <span aria-hidden="true" title={fallback} className={cn(iconButton, "opacity-30", className)}>
        <Icon className="size-4 fill-current" />
      </span>
    );

  return (
    <section aria-label={labels.label} className="relative z-30 shrink-0 border-t border-border bg-card">
      {album.song && <TimeBar edge song={album.song} labels={labels} />}
      <div className="relative mx-auto flex h-16 w-full max-w-312 items-center gap-2 px-3 md:h-18 md:gap-4 md:px-6">
        <ViewTransition name="host-bunny" share="host-bunny" default="none">
          {/* Figma V2-D06: 60×80, las orejas sobresalen ~22 px por encima de la bandeja. */}
          <Bunny mode="lite" className="mb-3 w-12 shrink-0 self-end md:mb-3.5 md:w-15" />
        </ViewTransition>
        <div className="min-w-0 flex-1 lg:max-w-[calc(50%-17rem)]" aria-live="polite">
          <p className="text-body-strong truncate">{album.title}</p>
          <p className={cn("text-body-sm truncate text-muted-foreground", album.song && index < 0 && "hidden lg:block")}>{subtitle}</p>
          {album.song && index < 0 && <p className="text-body-sm truncate text-muted-foreground lg:hidden">{album.song}</p>}
        </div>
        {album.song && <TimeBar song={album.song} labels={labels} />}
        {album.published && (
          <div className="ml-auto flex shrink-0 items-center lg:gap-1">
            {/* En el álbum no hay pista anterior: desactivado en escritorio, oculto en móvil para ganar espacio. */}
            {control(prev, SkipBack, labels.prevTrack, !prev ? "hidden lg:inline-flex" : undefined)}
            {album.song && <MusicToggle labels={labels} />}
            {control(next, SkipForward, labels.nextTrack)}
            {album.song && <VolumeControl labels={labels} />}
          </div>
        )}
      </div>
    </section>
  );
}
