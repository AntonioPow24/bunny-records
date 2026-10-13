import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { CreditSleeves, type CreditSide } from "@/components/portfolio/credits-list";
import { JsonLd } from "@/components/seo/json-ld";
import { TrackRow } from "@/components/portfolio/track-row";
import { technologies } from "@/content/technologies";
import { getProject, getReadingMinutes, isPublished } from "@/lib/content";
import { format, getDictionary, getLocale, plural } from "@/lib/i18n/get-dictionary";
import { SITE_URL, absoluteUrl, albumImage, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const CREDIT_GROUPS = ["frontend", "backend", "design", "workflow"] as const;

export async function generateMetadata({ params }: PageProps<"/[locale]/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  const locale = await getLocale();
  if (!project) return {};
  return buildMetadata({
    locale,
    path: `/projects/${project.slug}`,
    title: project.title[locale],
    description: project.tagline[locale],
    image: albumImage(locale, project.slug, project.title[locale]),
  });
}

// Contenido del álbum: lista de pistas, créditos y notas de producción (publicado), o concepto, stack
// propuesto y próxima validación (próximo lanzamiento, sin pistas ni demo).
// Navegación instantánea (Partial Prefetching): lo que depende de `params` va en <Suspense>, así el
// esqueleto de la ruta no espera al servidor; los enlaces llevan `prefetch` para traer también el
// contenido. En el HTML estático no cambia nada: los parámetros se conocen al compilar.
export default function AlbumPage({ params }: PageProps<"/[locale]/projects/[slug]">) {
  return (
    <Suspense>
      <AlbumContent params={params} />
    </Suspense>
  );
}

async function AlbumContent({ params }: Pick<PageProps<"/[locale]/projects/[slug]">, "params">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);

  const path = `/projects/${project.slug}`;
  // Álbum = CreativeWork del autor, con sus migas (PORTFOLIO.md §8).
  const jsonLd = (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CreativeWork",
            name: project.title[locale],
            description: project.tagline[locale],
            url: absoluteUrl(locale, path),
            image: `${SITE_URL}${project.cover.src.src}`,
            dateCreated: String(project.year),
            inLanguage: locale,
            creativeWorkStatus: dict.status[project.status === "in-development" ? "inDevelopment" : project.status],
            author: { "@id": `${SITE_URL}/#person` },
          },
          breadcrumbJsonLd(locale, [
            { name: dict.album.back, path: "" },
            { name: project.title[locale], path },
          ]),
        ],
      }}
    />
  );

  // validateContent() garantiza que cada crédito apunta a una tecnología existente.
  const credits = project.credits.map((c) => ({
    id: c.tech,
    name: technologies[c.tech].name,
    role: c.role[locale],
    href: `/${locale}/stack/${c.tech}`,
    group: technologies[c.tech].group,
  }));
  // Un lado del disco por área con créditos, en orden fijo y con letra A, B, C…
  const sides: CreditSide[] = CREDIT_GROUPS.map((group) => credits.filter((c) => c.group === group))
    .filter((items) => items.length > 0)
    .map((items, index) => ({
      letter: String.fromCharCode(65 + index),
      area: dict.about.gearGroups[items[0].group],
      count: plural(locale, dict.album.creditsCount, items.length),
      items,
    }));
  const creditsProps = {
    // Id por álbum: los álbumes visitados siguen montados (ocultos con <Activity>).
    id: `credits-${project.slug}`,
    sides,
    summary: `${plural(locale, dict.album.creditsCount, credits.length)} · ${plural(locale, dict.album.sidesCount, sides.length)}`,
    labels: {
      side: dict.album.side,
      hint: dict.album.sidesHint,
      prev: dict.album.prevSide,
      next: dict.album.nextSide,
      all: dict.album.allSides,
    },
  };

  if (!isPublished(project)) {
    return (
      <div className="flex flex-col gap-8 pb-6">
        {jsonLd}
        <CreditSleeves title={dict.album.proposedStack} {...creditsProps} />
        <section className="flex flex-col gap-2">
          <h2 className="text-h3">{dict.album.nextValidation}</h2>
          <p className="text-body max-w-prose text-muted-foreground">{project.nextValidation[locale]}</p>
        </section>
      </div>
    );
  }

  const base = `/${locale}/projects/${project.slug}`;
  return (
    <div className="flex flex-col gap-8 pb-6">
      {jsonLd}
      <section aria-label={format(dict.album.tracklistLabel, { title: project.title[locale] })}>
        <h2 className="sr-only">{dict.album.tracks}</h2>
        <ol className="flex flex-col gap-1">
          {project.tracks.map((track, index) => (
            <li key={track.slug}>
              <TrackRow
                href={`${base}/${track.slug}`}
                number={String(index + 1).padStart(2, "0")}
                title={track.title[locale]}
                subtitle={track.subtitle?.[locale]}
                duration={format(dict.album.minutes, { n: String(getReadingMinutes(project, track, locale)) })}
                transitionName={`track-${project.slug}-${track.slug}`}
              />
            </li>
          ))}
        </ol>
      </section>
      <CreditSleeves title={dict.album.credits} {...creditsProps} />
      <section className="flex flex-col gap-2">
        <h2 className="text-h3">{dict.album.productionNotes}</h2>
        <ul className="flex flex-col gap-2">
          {project.productionNotes[locale].map((note) => (
            <li
              key={note}
              className="text-body relative max-w-prose pl-5 text-muted-foreground before:absolute before:left-0 before:text-primary before:content-['+']"
            >
              {note}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
