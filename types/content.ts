import type { StaticImageData } from "next/image";

import type { TechnologyId } from "@/content/technologies";
import type { Localized } from "@/lib/i18n/localized";

// Modelo de contenido (PORTFOLIO.md §6) con la metáfora de BUNNY-RECORDS.md §5.1:
// proyecto = álbum, capítulos = pistas, stack = créditos, aprendizajes = notas de producción.

export type ProjectStatus = "published" | "in-development" | "planned";

export type ProjectCategory = "web" | "library" | "desktop" | "saas" | "ai";

export type Image = {
  src: StaticImageData;
  alt: Localized<string>;
};

/** Crédito: una tecnología y su función en ESTE proyecto. */
export type Credit = {
  tech: TechnologyId;
  role: Localized<string>;
};

/** Pista = capítulo del caso de estudio. El cuerpo vive en case-studies/<proyecto>/<idioma>/<nn>-<slug>.mdx */
export type Track = {
  /** Estable y compartido entre idiomas; forma parte de la URL. */
  slug: string;
  title: Localized<string>;
  subtitle?: Localized<string>;
};

/** Resultado con fuente comprobable. Nunca se inventa. */
export type VerifiableResult = {
  statement: Localized<string>;
  source: string;
  verifiedOn: string;
};

export type ProjectLink = {
  label: Localized<string>;
  href: string;
};

type ProjectBase = {
  /** Estable: no cambia tras publicar. */
  slug: string;
  title: Localized<string>;
  /** Una línea para la ficha breve de la colección. */
  tagline: Localized<string>;
  categories: ProjectCategory[];
  year: number;
  featured: boolean;
  /** Orden en la colección (menor = antes). */
  order: number;
  cover: Image;
};

/** Álbum publicado: caso de estudio completo. */
export type PublishedProject = ProjectBase & {
  status: "published";
  /** Detalles del disco: tu rol en el proyecto. */
  role: Localized<string>;
  /** Lo esencial: problema, para quién y participación. */
  summary: Localized<string>;
  tracks: Track[];
  credits: Credit[];
  /** Notas de producción: aprendizajes y decisiones. */
  productionNotes: Localized<string[]>;
  /** Minivídeo bajo la portada. Solo si existe una grabación real. */
  demo?: { src: string; poster: StaticImageData; alt: Localized<string> };
  results?: VerifiableResult[];
  links?: ProjectLink[];
};

/** Próximo lanzamiento (planeado o en desarrollo): sin demo, resultados ni pistas. */
export type UpcomingProject = ProjectBase & {
  status: "in-development" | "planned";
  /** Concepto y problema. */
  concept: Localized<string>;
  /** Tipo de producto y plataforma, para los detalles del disco. */
  format: Localized<string>;
  /** Stack propuesto, con la función prevista de cada tecnología. */
  credits: Credit[];
  nextValidation: Localized<string>;
  demo?: never;
  results?: never;
  tracks?: never;
};

export type Project = PublishedProject | UpcomingProject;

/** Ficha compartida de una tecnología: solo nombre y grupo; "Aparece en" se deriva de los créditos. */
export type Technology = {
  name: string;
  /** Grupo del "Equipo de estudio" en Sobre mí. */
  group: "frontend" | "backend" | "design" | "workflow";
  /** Si sale en "Equipo de estudio". Las tecnologías solo propuestas para planeados no salen. */
  inGear: boolean;
};
