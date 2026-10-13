import Link from "next/link";

import { StatusPill } from "@/components/patterns/status-pill";
import type { TechnologyId } from "@/content/technologies";
import { getProjectsUsing, getTechnology } from "@/lib/content";
import { format, getDictionary, getLocale } from "@/lib/i18n/get-dictionary";

import { CoverArt } from "./cover-art";

// Contenido de la ficha de tecnología (Figma TechPanel / D08). Lo usan el panel sobre el álbum y la
// página completa. Solo "Aparece en", derivado de los créditos de cada proyecto: la ficha escala sin
// textos propios por tecnología (la función en cada álbum ya va en su crédito).
export async function TechSheet({ id, titleId }: { id: TechnologyId; titleId: string }) {
  const tech = getTechnology(id);
  if (!tech) return null;
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const uses = getProjectsUsing(id);
  const plural = new Intl.PluralRules(locale).select(uses.length) === "one" ? "one" : "other";
  const statusLabel = {
    published: dict.status.published,
    "in-development": dict.status.inDevelopment,
    planned: dict.status.planned,
  } as const;

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        {/* pr-12: en el panel, el botón de cerrar ocupa la esquina superior derecha. */}
        <p className="text-label pr-12 text-primary">{dict.tech.eyebrow}</p>
        <h1 id={titleId} className="text-h2">
          {tech.name}
        </h1>
        <p className="text-body-sm text-muted-foreground">
          {uses.length > 0
            ? format(dict.tech.appearsCount[plural], { count: String(uses.length) })
            : dict.tech.notInAlbums}
        </p>
      </header>

      {uses.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-h3">{dict.tech.appearsIn}</h2>
          <ul className="flex flex-col gap-2">
            {uses.map(({ project, role }) => (
              <li key={project.slug}>
                <Link
                  href={`/${locale}/projects/${project.slug}`}
                  prefetch
                  className="surface-lit flex items-center gap-3 rounded-md border border-border bg-card p-2.5 pr-3 transition-colors hover:bg-accent"
                >
                  <CoverArt
                    src={project.cover.src}
                    alt=""
                    title={project.title[locale]}
                    sizes="56px"
                    titleSize="none"
                    className="w-14 shrink-0 rounded-sm"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="text-body-strong block truncate">{project.title[locale]}</span>
                    <span className="text-body-sm block truncate text-muted-foreground">{role[locale]}</span>
                  </span>
                  <StatusPill status={project.status} label={statusLabel[project.status]} className="hidden sm:inline-flex" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
