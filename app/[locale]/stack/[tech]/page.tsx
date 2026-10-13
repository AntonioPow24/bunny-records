import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { Container } from "@/components/layout/container";
import { TechSheet } from "@/components/portfolio/tech-sheet";
import { technologies, type TechnologyId } from "@/content/technologies";
import { getDictionary, getLocale } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return Object.keys(technologies).map((tech) => ({ tech }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/stack/[tech]">): Promise<Metadata> {
  const { tech } = await params;
  if (!(tech in technologies)) return {};
  const t = technologies[tech as TechnologyId];
  const locale = await getLocale();
  return buildMetadata({ locale, path: `/stack/${tech}`, title: t.name, description: t.howIUseIt[locale] });
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
