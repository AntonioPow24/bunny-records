import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CreditsList } from "@/components/portfolio/credits-list";
import { TrackRow } from "@/components/portfolio/track-row";
import { getProject, getReadingMinutes, getTechnology, isPublished } from "@/lib/content";
import { format, getDictionary, getLocale } from "@/lib/i18n/get-dictionary";

export async function generateMetadata({ params }: PageProps<"/[locale]/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  const locale = await getLocale();
  if (!project) return {};
  return { title: project.title[locale], description: project.tagline[locale] };
}

// Contenido del álbum: lista de pistas, créditos y notas de producción (publicado), o concepto, stack
// propuesto y próxima validación (próximo lanzamiento, sin pistas ni demo).
export default async function AlbumPage({ params }: PageProps<"/[locale]/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);

  const credits = project.credits.map((c) => ({
    id: c.tech,
    name: getTechnology(c.tech)?.name ?? c.tech,
    role: c.role[locale],
    href: `/${locale}/stack/${c.tech}`,
  }));

  if (!isPublished(project)) {
    return (
      <div className="flex flex-col gap-8 pb-6">
        <CreditsList title={dict.album.proposedStack} items={credits} />
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
      <CreditsList title={dict.album.credits} items={credits} />
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
