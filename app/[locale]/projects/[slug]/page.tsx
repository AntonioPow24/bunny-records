import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { CreditsList } from "@/components/portfolio/credits-list";
import { JsonLd } from "@/components/seo/json-ld";
import { TrackRow } from "@/components/portfolio/track-row";
import { getProject, getReadingMinutes, getTechnology, isPublished } from "@/lib/content";
import { format, getDictionary, getLocale } from "@/lib/i18n/get-dictionary";
import { SITE_URL, absoluteUrl, albumImage, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

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

  const credits = project.credits.map((c) => {
    const tech = getTechnology(c.tech);
    return {
      id: c.tech,
      name: tech?.name ?? c.tech,
      role: c.role[locale],
      href: `/${locale}/stack/${c.tech}`,
      group: tech?.group ?? "workflow",
    };
  });
  const plural = new Intl.PluralRules(locale);
  const count = (forms: { one: string; other: string }, n: number) =>
    format(plural.select(n) === "one" ? forms.one : forms.other, { count: String(n) });
  const creditsProps = {
    items: credits,
    groupLabels: dict.about.gearGroups,
    summary: `${count(dict.album.creditsCount, credits.length)} · ${count(dict.album.areasCount, new Set(credits.map((c) => c.group)).size)}`,
  };

  if (!isPublished(project)) {
    return (
      <div className="flex flex-col gap-8 pb-6">
        {jsonLd}
        <CreditsList title={dict.album.proposedStack} {...creditsProps} />
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
      <CreditsList title={dict.album.credits} {...creditsProps} />
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
