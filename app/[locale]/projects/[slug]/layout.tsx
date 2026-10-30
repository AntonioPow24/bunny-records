import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, ViewTransition } from "react";

import { Container } from "@/components/layout/container";
import { StatusPill } from "@/components/patterns/status-pill";
import { CoverArt } from "@/components/portfolio/cover-art";
import { DemoClip } from "@/components/portfolio/demo-clip";
import { NoSignal } from "@/components/portfolio/no-signal";
import { ScrollPanel } from "@/components/portfolio/scroll-panel";
import { getAlbumMinutes, getProject, getProjects, isPublished } from "@/lib/content";
import { format, getDictionary, getLocale } from "@/lib/i18n/get-dictionary";

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

// Álbum (Figma V2-D04/D09, M04; BUNNY-RECORDS.md §5.2): portada y cabecera fijas a la izquierda/arriba, que
// persisten al cambiar de pista (este layout no se vuelve a montar). Lo largo hace scroll solo en su panel.
// Lo que depende de `params` va en <Suspense>: ver app/[locale]/projects/[slug]/page.tsx.
export default function AlbumLayout({ children, params }: LayoutProps<"/[locale]/projects/[slug]">) {
  return (
    <Suspense>
      <Album params={params}>{children}</Album>
    </Suspense>
  );
}

async function Album({ children, params }: Pick<LayoutProps<"/[locale]/projects/[slug]">, "children" | "params">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);

  const statusLabel = {
    published: dict.status.published,
    "in-development": dict.status.inDevelopment,
    planned: dict.status.planned,
  }[project.status];
  const title = project.title[locale];
  const published = isPublished(project);

  return (
    <Container className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)] content-start gap-4 py-3 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] md:grid-rows-[auto_minmax(0,1fr)] md:gap-x-14 md:gap-y-4 md:py-6">
      <Link
        href={`/${locale}`}
        className="text-body-sm inline-flex h-11 items-center gap-2 self-start justify-self-start rounded-full pr-3 text-muted-foreground transition-colors hover:text-foreground md:col-span-2"
      >
        <ArrowLeft className="size-4" />
        {dict.album.back}
      </Link>

      {/* Portada y videoclip: columna persistente al cambiar de pista (Figma T15). */}
      <div className="flex flex-col gap-4 md:row-start-2">
        <div className="flex items-center gap-4 md:block">
          <ViewTransition name={`cover-${project.slug}`} share="morph" default="none">
            <CoverArt
              src={project.cover.src}
              alt={project.cover.alt[locale]}
              title={title}
              sticker={published ? undefined : statusLabel}
              sizes="(min-width: 48rem) 352px, 96px"
              eager
              titleSize="none"
              className="w-24 shrink-0 md:w-full"
            />
          </ViewTransition>
          {/* Móvil: cabecera compacta junto a la portada (Figma M04). */}
          <div className="min-w-0 md:hidden">
            <p className="text-label text-primary">
              {published ? format(dict.album.label, { year: String(project.year) }) : dict.album.upcomingLabel}
            </p>
            <p className="text-h3 mt-1">{title}</p>
          </div>
        </div>
        {published && project.demo && (
          <DemoClip
            mp4={project.demo.mp4}
            webm={project.demo.webm}
            poster={project.demo.poster.src}
            description={project.demo.alt[locale]}
            labels={{
              caption: dict.album.demoCaption,
              play: dict.album.demoPlay,
              pause: dict.album.demoPause,
              expand: dict.album.demoExpand,
              close: dict.album.demoClose,
            }}
            className="w-full max-w-70 md:max-w-none"
          />
        )}
        {published && !project.demo && (
          <NoSignal
            channel={String(project.order).padStart(2, "0")}
            labels={{ caption: dict.album.noSignalCaption, description: dict.album.noSignalDescription }}
            className="w-full max-w-70 md:max-w-none"
          />
        )}
      </div>

      <section className="relative flex min-h-0 flex-col gap-5 md:row-start-2">
        <header className="flex flex-col gap-3">
          <p className="text-label hidden text-primary md:block">
            {published ? format(dict.album.label, { year: String(project.year) }) : dict.album.upcomingLabel}
          </p>
          <h1 className="text-display sr-only md:not-sr-only">{title}</h1>
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-body-sm text-muted-foreground">
              {published
                ? `${project.role[locale]} · ${format(dict.album.minutes, { n: String(getAlbumMinutes(project, locale)) })}`
                : project.format[locale]}
            </p>
            <StatusPill status={project.status} label={statusLabel} />
          </div>
          <p className="text-body max-w-prose text-foreground/90">
            {published ? project.summary[locale] : project.concept[locale]}
          </p>
        </header>
        <ScrollPanel className="min-h-0 flex-1 md:-mr-4 md:overflow-y-auto md:pr-4">{children}</ScrollPanel>
      </section>
    </Container>
  );
}
