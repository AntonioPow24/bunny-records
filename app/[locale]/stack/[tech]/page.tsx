import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { Container } from "@/components/layout/container";
import { TechSheet } from "@/components/portfolio/tech-sheet";
import { technologies, type TechnologyId } from "@/content/technologies";
import { format, getDictionary, getLocale } from "@/lib/i18n/get-dictionary";
import { getProjectsUsing } from "@/lib/content";
import { NOINDEX, buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return Object.keys(technologies).map((tech) => ({ tech }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/stack/[tech]">): Promise<Metadata> {
  const { tech } = await params;
  if (!(tech in technologies)) return {};
  const t = technologies[tech as TechnologyId];
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  // Sin álbumes, la ficha solo tiene el nombre: descripción honesta y fuera del índice (y del sitemap).
  const inAlbums = getProjectsUsing(tech as TechnologyId).length > 0;
  const description = format(inAlbums ? dict.tech.metaDescription : dict.tech.metaDescriptionNoAlbums, { name: t.name });
  const metadata = buildMetadata({ locale, path: `/stack/${tech}`, title: t.name, description });
  return inAlbums || NOINDEX ? metadata : { ...metadata, robots: { index: false, follow: true } };
}

// Ficha a página completa (Figma D08): entrada directa o recarga. Indexable y con la misma URL que el panel.
// Lo que depende de `params` va en <Suspense>: ver app/[locale]/projects/[slug]/page.tsx.
export default function TechPage({ params }: PageProps<"/[locale]/stack/[tech]">) {
  return (
    <Suspense>
      <TechPageContent params={params} />
    </Suspense>
  );
}

async function TechPageContent({ params }: Pick<PageProps<"/[locale]/stack/[tech]">, "params">) {
  const { tech } = await params;
  if (!(tech in technologies)) notFound();
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return (
    <Container className="flex flex-col gap-4 py-4 md:py-6">
      <Link
        href={`/${locale}`}
        className="text-body-sm inline-flex h-11 items-center gap-2 self-start rounded-full pr-3 text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {dict.tech.back}
      </Link>
      <div className="max-w-2xl">
        <TechSheet id={tech as TechnologyId} titleId="tech-page-title" />
      </div>
    </Container>
  );
}
