import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Collection, type CollectionItem } from "@/components/portfolio/collection";
import { ContactSection } from "@/components/sections/contact";
import { profile } from "@/content/profile";
import { getProjects } from "@/lib/content";
import { format, getDictionary, getLocale } from "@/lib/i18n/get-dictionary";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return { title: { absolute: dict.meta.title }, description: dict.meta.description };
}

// Inicio = colección (BUNNY-RECORDS.md §5.2) + contacto al final (#contact).
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
    status: p.status,
    statusLabel: statusLabel[p.status],
    cover: { src: p.cover.src, alt: p.cover.alt[locale] },
  }));

  return (
    <>
      <Container className="flex flex-col gap-8 pt-8 pb-16 md:pt-12">
        <div className="flex max-w-xl flex-col gap-3">
          <p className="text-label text-primary">{dict.home.eyebrow}</p>
          <h1 className="text-h2">{dict.home.title}</h1>
          <p className="text-body text-muted-foreground">
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
      <ContactSection />
    </>
  );
}
