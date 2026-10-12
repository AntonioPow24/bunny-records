import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";

import { TrackRow } from "@/components/portfolio/track-row";
import { getProject, getProjects, getReadingMinutes, isPublished, loadTrackBody } from "@/lib/content";
import { format, getDictionary, getLocale } from "@/lib/i18n/get-dictionary";

export function generateStaticParams() {
  return getProjects()
    .filter(isPublished)
    .flatMap((p) => p.tracks.map((t) => ({ slug: p.slug, track: t.slug })));
}

async function resolve(params: PageProps<"/[locale]/projects/[slug]/[track]">["params"]) {
  const { slug, track: trackSlug } = await params;
  const project = getProject(slug);
  if (!project || !isPublished(project)) return null;
  const index = project.tracks.findIndex((t) => t.slug === trackSlug);
  if (index < 0) return null;
  return { project, track: project.tracks[index], index };
}

export async function generateMetadata({ params }: PageProps<"/[locale]/projects/[slug]/[track]">): Promise<Metadata> {
  const found = await resolve(params);
  const locale = await getLocale();
  if (!found) return {};
  const { project, track } = found;
  return {
    title: `${track.title[locale]} · ${project.title[locale]}`,
    description: track.subtitle?.[locale] ?? project.tagline[locale],
  };
}

// Pista abierta (Figma V2-D06; BUNNY-RECORDS.md §5.2 paso 5): la fila sube al lugar de la primera y su
// capítulo se despliega debajo. La flecha ← va pegada a la fila (antes del texto): se vuelve a la lista
// sin recorrerlo. ⏮ ⏭ están en la bandeja.
export default async function TrackPage({ params }: PageProps<"/[locale]/projects/[slug]/[track]">) {
  const found = await resolve(params);
  if (!found) notFound();
  const { project, track, index } = found;
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const Body = await loadTrackBody(project, track, locale);
  const base = `/${locale}/projects/${project.slug}`;

  return (
    <article className="flex flex-col gap-6 pb-6">
      <div className="flex items-center gap-2">
        <Link
          href={base}
          aria-label={dict.album.backToTracks}
          title={dict.album.backToTracks}
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-secondary transition-colors hover:bg-accent"
        >
          <ArrowLeft className="size-4" />
        </Link>
        <div className="min-w-0 flex-1">
          <TrackRow
            href={`${base}/${track.slug}`}
            number={String(index + 1).padStart(2, "0")}
            title={track.title[locale]}
            subtitle={track.subtitle?.[locale]}
            duration={format(dict.album.minutes, { n: String(getReadingMinutes(project, track, locale)) })}
            transitionName={`track-${project.slug}-${track.slug}`}
            active
          />
        </div>
      </div>
      <h2 className="sr-only">
        {format(dict.album.trackOf, { number: String(index + 1), total: String(project.tracks.length) })}
      </h2>
      <ViewTransition enter="track-body" default="none">
        <div className="max-w-prose px-1">
          <Body />
        </div>
      </ViewTransition>
    </article>
  );
}
