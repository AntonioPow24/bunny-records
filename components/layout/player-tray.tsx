"use client";

import { LayoutGrid, SkipBack, SkipForward } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  idleTitle: string;
  idleSubtitle: string;
  trackNow: string;
  prevTrack: string;
  nextTrack: string;
  firstTrack: string;
  backToAlbum: string;
  collection: string;
};

type PlayerTrayProps = { locale: Locale; albums: TrayAlbum[]; labels: TrayLabels };

type Control = { href: string; label: string } | null;

const iconButton =
  "inline-flex size-11 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-secondary";

// Bandeja persistente tipo reproductor (BUNNY-RECORDS.md §4.4 y §5.2; Figma PlayerTray).
// No se muestra en la colección (allí el conejo está en el escenario). En un álbum publicado ⏮ ⏭ cambian de
// pista; fuera de un álbum queda en reposo, sin controles.
export function PlayerTray({ locale, albums, labels }: PlayerTrayProps) {
  const pathname = usePathname();
  const [, , section, slug, trackSlug] = pathname.split("/");
  if (!section) return null;

  const album = section === "projects" ? albums.find((a) => a.slug === slug) : undefined;
  const base = album ? `/${locale}/projects/${album.slug}` : "";

  let title = labels.idleTitle;
  let subtitle = labels.idleSubtitle;
  let prev: Control = null;
  let next: Control = null;
  const player = Boolean(album?.published);

  if (album) {
    title = album.title;
    subtitle = album.summary;
  }
  if (album?.published) {
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
      next = { href: `${base}/${album.tracks[0].slug}`, label: labels.firstTrack };
    }
  }

  const control = (c: Control, Icon: typeof SkipBack, fallback: string) =>
    c ? (
      <Link href={c.href} aria-label={c.label} className={iconButton}>
        <Icon className="size-4 fill-current" />
      </Link>
    ) : (
      <span aria-hidden="true" title={fallback} className={cn(iconButton, "opacity-30 hover:bg-transparent")}>
        <Icon className="size-4 fill-current" />
      </span>
    );

  return (
    <>
      {/* Reserva el alto de la bandeja para que no tape el final de la página. */}
      <div aria-hidden="true" className="h-16 md:h-18" />
      <section
        aria-label={labels.label}
        className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card"
      >
        <div className="mx-auto flex h-16 w-full max-w-312 items-center gap-2 px-3 md:h-18 md:gap-4 md:px-6">
          <Bunny mode="lite" className="-mt-6 w-12 shrink-0 self-end" />
          <div className="min-w-0 flex-1" aria-live="polite">
            <p className="text-body-strong truncate">{title}</p>
            <p className="text-body-sm hidden truncate text-muted-foreground md:block">{subtitle}</p>
          </div>
          {player && (
            <div className="flex items-center">
              {control(prev, SkipBack, labels.prevTrack)}
              {control(next, SkipForward, labels.nextTrack)}
            </div>
          )}
          <Link
            href={`/${locale}`}
            aria-label={labels.collection}
            className="text-body-sm inline-flex h-11 shrink-0 items-center gap-2 rounded-full border border-border px-3 transition-colors hover:bg-secondary md:px-4"
          >
            <LayoutGrid className="size-4 md:hidden" />
            <span className="hidden md:inline">{labels.collection}</span>
          </Link>
        </div>
      </section>
    </>
  );
}
