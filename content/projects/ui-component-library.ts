import cover from "@/public/images/projects/ui-component-library/cover.jpg";
import type { PublishedProject } from "@/types/content";

// Sistema de diseño de la casa (repo privado ui-component). Fuentes: sus docs/CONCEPTO.md, ARQUITECTURA.md y ESTADO.md
// y su historial de Git (v0.1.0–v0.3.0, octubre de 2026). Sin demo grabada ni resultados de negocio.
// Tono del caso de estudio: cercano y poco técnico; los detalles de implementación se quedan en el repo.
export const uiComponentLibrary: PublishedProject = {
  slug: "ui-component-library",
  status: "published",
  title: { es: "UI Component", en: "UI Component" },
  tagline: {
    es: "Mi sistema de diseño: las piezas de interfaz que ya funcionaron, listas para que cada proyecto las haga suyas.",
    en: "My design system: the interface pieces that already worked, ready for each project to make its own.",
  },
  categories: ["library"],
  year: 2026,
  featured: false,
  order: 3,
  cover: {
    src: cover,
    alt: {
      es: "Portada provisional: dibujo técnico de piezas de interfaz sobre una cuadrícula.",
      en: "Placeholder cover: technical drawing of interface pieces on a grid.",
    },
  },
  role: { es: "Concepto, diseño y desarrollo", en: "Concept, design and development" },
  summary: {
    es: "Un sistema de diseño para no rehacer en cada proyecto los mismos botones, formularios y tablas: un estilo común, más de 40 componentes accesibles y un catálogo público, con Bunny Records como identidad de partida. Para mis proyectos y los de colegas. Mi participación: concepto, diseño en Figma y desarrollo.",
    en: "A design system so I don’t rebuild the same buttons, forms and tables in every project: a shared style, over 40 accessible components and a public catalogue, with Bunny Records as the starting identity. For my projects and colleagues’. My part: concept, Figma design and development.",
  },
  tracks: [
    {
      slug: "la-idea",
      title: { es: "La idea", en: "The idea" },
      subtitle: { es: "Reunir lo que ya funcionaba", en: "Gathering what already worked" },
    },
    {
      slug: "el-diseno",
      title: { es: "El diseño", en: "The design" },
      subtitle: { es: "Una base común y tres aspectos", en: "One shared base and three looks" },
    },
    {
      slug: "como-lo-construi",
      title: { es: "Cómo lo construí", en: "How I built it" },
      subtitle: { es: "Piezas que cada proyecto puede hacer suyas", en: "Pieces each project can make its own" },
    },
    {
      slug: "decisiones-importantes",
      title: { es: "Decisiones importantes", en: "Key decisions" },
      subtitle: { es: "Proponer, no imponer", en: "Suggest, don’t impose" },
    },
    {
      slug: "lo-que-aprendi",
      title: { es: "Lo que aprendí", en: "What I learned" },
      subtitle: { es: "Usarlo como lo usaría otra persona", en: "Using it the way someone else would" },
    },
  ],
  credits: [
    { tech: "react", role: { es: "los componentes", en: "the components" } },
    { tech: "react-aria", role: { es: "base accesible", en: "accessible foundation" } },
    { tech: "typescript", role: { es: "comportamientos compartidos", en: "shared behaviours" } },
    { tech: "tailwindcss", role: { es: "el estilo común", en: "the shared style" } },
    { tech: "shadcn-ui", role: { es: "componentes que se copian al proyecto", en: "components copied into the project" } },
    { tech: "storybook", role: { es: "catálogo público", en: "public catalogue" } },
    { tech: "figma", role: { es: "diseño en sintonía con el código", en: "design in step with the code" } },
    { tech: "github-actions", role: { es: "comprobaciones en cada cambio", en: "checks on every change" } },
    { tech: "git", role: { es: "avance por etapas", en: "progress in stages" } },
    { tech: "vercel", role: { es: "publicación del catálogo", en: "hosting the catalogue" } },
  ],
  productionNotes: {
    es: [
      "Probarlo como lo haría otra persona destapó una docena de problemas que desde dentro no se veían.",
      "Una solución sencilla y general suele valer más que un arreglo para cada caso.",
    ],
    en: [
      "Trying it the way someone else would uncovered a dozen problems that couldn’t be seen from the inside.",
      "One simple, general solution is usually worth more than a fix for every case.",
    ],
  },
};
