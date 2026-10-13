import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Collection, type CollectionItem } from "@/components/portfolio/collection";
import { profile } from "@/content/profile";
import { getAlbumMinutes, getProjects, isPublished } from "@/lib/content";
import { JsonLd } from "@/components/seo/json-ld";
import { format, getDictionary, getLocale, plural } from "@/lib/i18n/get-dictionary";
import { SITE_NAME, SITE_URL, absoluteUrl, buildMetadata, personJsonLd } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return buildMetadata({ locale, path: "", title: dict.meta.title, description: dict.meta.description, absoluteTitle: true });
}

// Inicio = colección (BUNNY-RECORDS.md §5.2 y §5.3.2): una sola pantalla, sin scroll.
export default async function HomePage() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const statusLabel = {
    published: dict.status.published,
    "in-development": dict.status.inDevelopment,
    planned: dict.status.planned,
  } as const;

  const items: CollectionItem[] = getProjects().map((p) => ({
    slug: p.slug,
    href: `/${locale}/projects/${p.slug}`,
    title: p.title[locale],
    tagline: p.tagline[locale],
    // Ficha breve: "2026 · 5 pistas · 5 min" o "Próximo lanzamiento".
    meta: isPublished(p)
      ? `${p.year} · ${format(dict.tray.albumSummary, { tracks: plural(locale, dict.tray.tracks, p.tracks.length), minutes: String(getAlbumMinutes(p, locale)) })}`
      : dict.tray.upcoming,
    status: p.status,
    statusLabel: statusLabel[p.status],
    cover: { src: p.cover.src, alt: p.cover.alt[locale] },
  }));

  return (
    <Container className="flex min-h-0 flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
                name: SITE_NAME,
                url: absoluteUrl(locale, ""),
                inLanguage: locale,
                description: dict.meta.description,
                author: { "@id": `${SITE_URL}/#person` },
              },
              personJsonLd(locale),
            ],
          }}
        />
        <div className="flex max-w-xl shrink-0 flex-col gap-1.5 md:gap-3">
          <p className="text-label text-primary">{dict.home.eyebrow}</p>
          <h1 className="text-h2">{dict.home.title}</h1>
          <p className="text-body hidden text-muted-foreground md:block">
            {format(dict.home.intro, { name: profile.name, role: profile.role[locale] })}
          </p>
        </div>
        <Collection
          items={items}
          labels={{
            filterLabel: dict.home.filterLabel,
            filters: {
              all: dict.home.filterAll,
              published: dict.home.filterPublished,
              "in-development": dict.home.filterInDevelopment,
              planned: dict.home.filterPlanned,
            },
            collectionLabel: dict.home.collectionLabel,
            collectionRole: dict.home.collectionRole,
            prev: dict.home.prev,
            next: dict.home.next,
            select: dict.home.select,
            position: dict.home.position,
            hint: dict.home.hint,
            open: dict.home.open,
            openPlanned: dict.home.openPlanned,
            empty: dict.home.empty,
            dance: dict.bunny.dance,
          }}
        />
    </Container>
  );
}
