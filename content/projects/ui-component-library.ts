import cover from "@/public/images/projects/ui-component-library/cover.jpg";
import type { PublishedProject } from "@/types/content";

// Sistema de diseño de la casa (repo privado ui-component). Fuentes: sus docs/CONCEPTO.md, ARQUITECTURA.md y ESTADO.md
// y su historial de Git (v0.1.0–v0.3.0, octubre de 2026). Sin demo grabada ni resultados de negocio.
export const uiComponentLibrary: PublishedProject = {
  slug: "ui-component-library",
  status: "published",
  title: { es: "UI Component", en: "UI Component" },
  tagline: {
    es: "El sistema de diseño de la casa: tokens, lógica y componentes accesibles que cada proyecto adapta sin bifurcarlo.",
    en: "My in-house design system: tokens, logic and accessible components that each project adapts without forking it.",
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
    es: "Un sistema de diseño para no rehacer en cada proyecto los mismos botones, formularios y tablas: tokens tematizables, lógica sin DOM y más de 40 componentes React accesibles, con Bunny Records como tema por defecto y un catálogo público. Para mis proyectos y los de colegas. Mi participación: concepto, diseño en Figma y desarrollo.",
    en: "A design system so I don’t rebuild the same buttons, forms and tables in every project: themeable tokens, DOM-free logic and over 40 accessible React components, with Bunny Records as the default theme and a public catalogue. For my projects and colleagues’. My part: concept, Figma design and development.",
  },
  tracks: [
    {
      slug: "la-idea",
      title: { es: "La idea", en: "The idea" },
      subtitle: { es: "Extraer lo probado, no inventar un framework", en: "Extract what works, don’t invent a framework" },
    },
    {
      slug: "el-diseno",
      title: { es: "El diseño", en: "The design" },
      subtitle: { es: "Tokens primero, tres temas y Figma al día", en: "Tokens first, three themes and Figma in sync" },
    },
    {
      slug: "como-lo-construi",
      title: { es: "Cómo lo construí", en: "How I built it" },
      subtitle: { es: "Dos paquetes, un registro y cada historia como test", en: "Two packages, a registry and every story as a test" },
    },
    {
      slug: "decisiones-importantes",
      title: { es: "Decisiones importantes", en: "Key decisions" },
      subtitle: { es: "Defaults, nunca imperativos", en: "Defaults, never imperatives" },
    },
    {
      slug: "lo-que-aprendi",
      title: { es: "Lo que aprendí", en: "What I learned" },
      subtitle: { es: "Usarlo como un colega", en: "Using it like a colleague" },
    },
  ],
  credits: [
    { tech: "react", role: { es: "componentes y UIProvider", en: "components and UIProvider" } },
    { tech: "react-aria", role: { es: "primitivas accesibles por debajo", en: "accessible primitives underneath" } },
    { tech: "typescript", role: { es: "lógica sin DOM y API tipada", en: "DOM-free logic and typed API" } },
    { tech: "tailwindcss", role: { es: "tokens como variables CSS", en: "tokens as CSS variables" } },
    { tech: "shadcn-ui", role: { es: "registro: el código se copia al proyecto", en: "registry: code is copied into the project" } },
    { tech: "storybook", role: { es: "catálogo público y tests", en: "public catalogue and tests" } },
    { tech: "figma", role: { es: "variables y componentes sincronizados", en: "synced variables and components" } },
    { tech: "github-actions", role: { es: "CI en tres navegadores y regresión visual", en: "CI on three browsers and visual regression" } },
    { tech: "git", role: { es: "un lote, una rama y un PR", en: "one batch, one branch, one PR" } },
    { tech: "claude-code", role: { es: "implementación asistida por lotes", en: "assisted implementation in batches" } },
    { tech: "codex", role: { es: "revisión adversarial de cada lote", en: "adversarial review of each batch" } },
    { tech: "vercel", role: { es: "catálogo y registro", en: "catalogue and registry" } },
  ],
  productionNotes: {
    es: [
      "Las historias y los tests no encontraron lo que encontró un proyecto que lo instaló como lo haría un colega: doce problemas, desde el lint de Next.js hasta pasos que faltaban en la guía.",
      "Ante entradas extremas, una guarda general en un solo punto vale más que un caso por cada variante.",
    ],
    en: [
      "Stories and tests missed what a project installing it the way a colleague would turned up: twelve issues, from Next.js lint to missing steps in the guide.",
      "For extreme inputs, one general guard in a single place beats a special case for every variant.",
    ],
  },
};
