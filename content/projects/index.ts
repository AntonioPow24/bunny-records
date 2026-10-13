import type { Project } from "@/types/content";

import { bunnyRecords } from "./bunny-records";
import { aiConstructionEstimator, educationalPlatform, officeToPdfConverter, uiComponentLibrary } from "./upcoming";
import { vidrieriaAntonio } from "./vidrieria-antonio";

// Registro de proyectos. Añadir uno: crear su archivo, importarlo aquí y, si es publicado, sus MDX por idioma.
export const projects: Project[] = [
  vidrieriaAntonio,
  bunnyRecords,
  uiComponentLibrary,
  officeToPdfConverter,
  educationalPlatform,
  aiConstructionEstimator,
];
