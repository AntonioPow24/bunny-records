import { notFound } from "next/navigation";

import { TechPanel } from "@/components/portfolio/tech-panel";
import { TechSheet } from "@/components/portfolio/tech-sheet";
import { technologies, type TechnologyId } from "@/content/technologies";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export function generateStaticParams() {
  return Object.keys(technologies).map((tech) => ({ tech }));
}

// Ficha como panel encima de la página actual (navegación interna desde los créditos o "Equipo de estudio").
export default async function TechPanelRoute({ params }: PageProps<"/[locale]/stack/[tech]">) {
  const { tech } = await params;
  if (!(tech in technologies)) notFound();
  const dict = await getDictionary();
  return (
    <TechPanel closeLabel={dict.tech.close} titleId="tech-panel-title">
      <TechSheet id={tech as TechnologyId} titleId="tech-panel-title" />
    </TechPanel>
  );
}
