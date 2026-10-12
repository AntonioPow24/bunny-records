import "server-only";

import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";

import { projects } from "@/content/projects";
import { technologies, type TechnologyId } from "@/content/technologies";
import { locales, type Locale } from "@/lib/i18n/config";
import type { Project, PublishedProject, Technology, Track } from "@/types/content";

// Acceso al contenido (PORTFOLIO.md §6). Todo se resuelve en build: el sitio es estático.

const CASE_STUDIES_DIR = path.join(process.cwd(), "content", "projects", "case-studies");
const WORDS_PER_MINUTE = 200;

export type TechnologyEntry = Technology & { id: TechnologyId };

/** Proyectos en el orden de la colección. */
export function getProjects(): Project[] {
  return [...projects].sort((a, b) => a.order - b.order);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function isPublished(project: Project): project is PublishedProject {
  return project.status === "published";
}

/** Archivo MDX de una pista: case-studies/<proyecto>/<idioma>/<nn>-<slug>.mdx */
function trackFile(project: PublishedProject, track: Track, locale: Locale) {
  const index = project.tracks.indexOf(track) + 1;
  return `${String(index).padStart(2, "0")}-${track.slug}.mdx`;
}

function trackPath(project: PublishedProject, track: Track, locale: Locale) {
  return path.join(CASE_STUDIES_DIR, project.slug, locale, trackFile(project, track, locale));
}

/** "Duración" de la pista: tiempo de lectura real del MDX (mínimo 1 min). */
export function getReadingMinutes(project: PublishedProject, track: Track, locale: Locale): number {
  const raw = readFileSync(trackPath(project, track, locale), "utf8");
  const words = raw.match(/[\p{L}\p{N}]+/gu)?.length ?? 0;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

/** Duración total del álbum (suma de sus pistas). */
export function getAlbumMinutes(project: PublishedProject, locale: Locale): number {
  return project.tracks.reduce((total, track) => total + getReadingMinutes(project, track, locale), 0);
}

/** Componente MDX de una pista. */
export async function loadTrackBody(
  project: PublishedProject,
  track: Track,
  locale: Locale,
): Promise<ComponentType> {
  const file = trackFile(project, track, locale);
  const mod = await import(`@/content/projects/case-studies/${project.slug}/${locale}/${file}`);
  return mod.default as ComponentType;
}

export function getTechnology(id: string): TechnologyEntry | undefined {
  if (!(id in technologies)) return undefined;
  const techId = id as TechnologyId;
  return { id: techId, ...technologies[techId] };
}

export function getTechnologies(): TechnologyEntry[] {
  return (Object.keys(technologies) as TechnologyId[]).map((id) => ({ id, ...technologies[id] }));
}

/** "Aparece en": proyectos cuyos créditos incluyen la tecnología, con su función en cada uno. */
export function getProjectsUsing(id: TechnologyId) {
  return getProjects().flatMap((project) => {
    const credit = project.credits.find((c) => c.tech === id);
    return credit ? [{ project, role: credit.role }] : [];
  });
}

/** Resumen del sello para la ficha técnica de Contacto ("1 álbum publicado · 4 planeados"). */
export function getLabelStats() {
  const all = getProjects();
  return {
    published: all.filter((p) => p.status === "published").length,
    inDevelopment: all.filter((p) => p.status === "in-development").length,
    planned: all.filter((p) => p.status === "planned").length,
  };
}

/**
 * Comprobaciones de build (PORTFOLIO.md §6): si algo falla, el build se detiene con un mensaje claro.
 * Se llama desde generateStaticParams del layout raíz.
 */
export function validateContent(): void {
  const errors: string[] = [];
  const seen = new Set<string>();

  for (const project of projects) {
    if (seen.has(project.slug)) errors.push(`Slug de proyecto duplicado: ${project.slug}`);
    seen.add(project.slug);

    for (const credit of project.credits) {
      if (!(credit.tech in technologies)) errors.push(`${project.slug}: crédito con tecnología inexistente "${credit.tech}"`);
    }

    if (!isPublished(project)) continue;
    if (project.tracks.length === 0) errors.push(`${project.slug}: un álbum publicado necesita al menos una pista`);

    const trackSlugs = new Set<string>();
    for (const track of project.tracks) {
      if (trackSlugs.has(track.slug)) errors.push(`${project.slug}: pista duplicada "${track.slug}"`);
      trackSlugs.add(track.slug);
      for (const locale of locales) {
        if (!existsSync(trackPath(project, track, locale))) {
          errors.push(`${project.slug}: falta el MDX ${locale}/${trackFile(project, track, locale)}`);
        }
      }
    }
  }

  if (errors.length > 0) {
    throw new Error(`Contenido inválido:\n- ${errors.join("\n- ")}`);
  }
}
