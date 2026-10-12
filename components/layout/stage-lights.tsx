"use client";

import { usePathname } from "next/navigation";

export type Scene = "home" | "about" | "contact" | "project" | "other";

function sceneOf(pathname: string): Scene {
  const section = pathname.split("/")[2];
  if (!section) return "home";
  if (section === "about" || section === "contact") return section;
  if (section === "projects") return "project";
  return "other";
}

// Iluminación de escenario (paso 7.9; Figma "7.9 · Iluminación"). Un único elemento fijo detrás del
// contenido con degradados CSS: sin imágenes ni filtros. El foco de cada escena se funde al cambiar de ruta.
export function StageLights() {
  const scene = sceneOf(usePathname());
  return (
    <div aria-hidden="true" data-scene={scene} className="stage-lights">
      <span className="stage-spot stage-spot-home" />
      <span className="stage-spot stage-spot-about" />
      <span className="stage-spot stage-spot-contact" />
    </div>
  );
}
