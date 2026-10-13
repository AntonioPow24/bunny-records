import demoPoster from "@/public/demos/bunny-records/poster.jpg";
import cover from "@/public/images/projects/bunny-records/cover.jpg";
import type { PublishedProject } from "@/types/content";

// El propio portfolio. Fuente: DESARROLLO.md (pasos, mediciones y mejoras) y el historial de Git.
// Solo se citan cifras medidas allí; nada de resultados de negocio.
export const bunnyRecords: PublishedProject = {
  slug: "bunny-records",
  status: "published",
  title: { es: "Bunny Records", en: "Bunny Records" },
  tagline: {
    es: "Este portfolio: un sello discográfico donde cada proyecto es un álbum.",
    en: "This portfolio: a record label where every project is an album.",
  },
  categories: ["web"],
  year: 2026,
  featured: true,
  order: 2,
  cover: {
    src: cover,
    alt: {
      es: "Portada: un vinilo negro con la etiqueta teal y el conejo del logo en el centro.",
      en: "Cover: a black vinyl record with a teal label and the logo’s bunny in the centre.",
    },
  },
  role: { es: "Concepto, diseño y desarrollo", en: "Concept, design and development" },
  summary: {
    es: "Un portfolio que no se lee como un currículum, sino que se recorre como un sello: proyectos como álbumes, capítulos como pistas y tecnologías como créditos. Para quien quiera ver cómo trabajo. Mi participación: concepto, diseño, personaje y desarrollo.",
    en: "A portfolio you don’t read like a CV but browse like a record label: projects as albums, chapters as tracks and technologies as credits. For anyone who wants to see how I work. My part: concept, design, character and development.",
  },
  tracks: [
    {
      slug: "la-idea",
      title: { es: "La idea", en: "The idea" },
      subtitle: { es: "Un portfolio que se recorre como un sello", en: "A portfolio you browse like a label" },
    },
    {
      slug: "el-diseno",
      title: { es: "El diseño", en: "The design" },
      subtitle: { es: "Figma primero, un conejo y ningún scroll", en: "Figma first, a bunny and no scrolling" },
    },
    {
      slug: "como-lo-construi",
      title: { es: "Cómo lo construí", en: "How I built it" },
      subtitle: { es: "Next.js 16, todo estático y transiciones nativas", en: "Next.js 16, fully static and native transitions" },
    },
    {
      slug: "decisiones-importantes",
      title: { es: "Decisiones importantes", en: "Key decisions" },
      subtitle: { es: "Menos pantallas, menos enlaces", en: "Fewer screens, fewer links" },
    },
    {
      slug: "lo-que-aprendi",
      title: { es: "Lo que aprendí", en: "What I learned" },
      subtitle: { es: "Medir antes de optimizar", en: "Measure before optimising" },
    },
  ],
  credits: [
    { tech: "nextjs", role: { es: "Cache Components y rutas estáticas", en: "Cache Components and static routes" } },
    { tech: "react", role: { es: "View Transitions y Activity", en: "View Transitions and Activity" } },
    { tech: "typescript", role: { es: "contenido y diccionarios tipados", en: "typed content and dictionaries" } },
    { tech: "tailwindcss", role: { es: "tokens de Figma en CSS", en: "Figma tokens in CSS" } },
    { tech: "shadcn-ui", role: { es: "componentes base", en: "base components" } },
    { tech: "figma", role: { es: "sistema de diseño y pantallas", en: "design system and screens" } },
    { tech: "blender", role: { es: "el conejo, renderizado por capas", en: "the bunny, rendered in layers" } },
    { tech: "git", role: { es: "una rama por paso", en: "one branch per step" } },
    { tech: "claude-code", role: { es: "implementación asistida y QA", en: "assisted implementation and QA" } },
    { tech: "codex", role: { es: "revisión UX y propuestas en Figma", en: "UX review and Figma proposals" } },
    { tech: "vercel", role: { es: "hosting", en: "hosting" } },
  ],
  productionNotes: {
    es: [
      "La regla de no hacer scroll obligó a decidir qué cabe en cada pantalla, y eso mejoró el contenido.",
      "Medir sobre el build de producción cambió el diagnóstico: el problema de las transiciones no era la red, sino el conejo montándose a mitad de animación.",
    ],
    en: [
      "The no-scroll rule forced me to decide what fits on each screen, and that improved the content.",
      "Measuring the production build changed the diagnosis: the transitions weren’t slow because of the network, but because the bunny was mounting mid-animation.",
    ],
  },
  demo: {
    mp4: "/demos/bunny-records/bunny-records-demo-6s.mp4",
    webm: "/demos/bunny-records/bunny-records-demo-6s.webm",
    poster: demoPoster,
    alt: {
      es: "Recorrido por el sitio: la colección de portadas con el conejo y el disco de Sobre mí bajando al tocadiscos.",
      en: "A walk through the site: the cover collection with the bunny, and the About disc dropping onto the turntable.",
    },
  },
};
