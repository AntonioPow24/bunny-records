import demoPoster from "@/public/demos/bunny-records/poster.jpg";
import cover from "@/public/images/projects/bunny-records/cover.jpg";
import type { PublishedProject } from "@/types/content";

// El propio portfolio. Arquitectura y mediciones de referencia: PORTFOLIO.md §5 y §10.
// Antecedentes en Antonio Development Hub / Bunny Records y el historial de Git; sin resultados de negocio inventados.
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
      subtitle: { es: "Rápido, en dos idiomas y sin saltos", en: "Fast, in two languages and seamless" },
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
    { tech: "nextjs", role: { es: "el sitio, rápido y estático", en: "the site, fast and static" } },
    { tech: "react", role: { es: "las transiciones entre pantallas", en: "the transitions between screens" } },
    { tech: "typescript", role: { es: "contenido sin errores", en: "error-free content" } },
    { tech: "tailwindcss", role: { es: "el estilo visual", en: "the visual style" } },
    { tech: "shadcn-ui", role: { es: "piezas de interfaz", en: "interface pieces" } },
    { tech: "figma", role: { es: "diseño de todas las pantallas", en: "design of every screen" } },
    { tech: "blender", role: { es: "el conejo en 3D", en: "the 3D bunny" } },
    { tech: "git", role: { es: "avance paso a paso", en: "step-by-step progress" } },
    { tech: "vercel", role: { es: "publicación", en: "hosting" } },
  ],
  productionNotes: {
    es: [
      "La regla de no hacer scroll obligó a decidir qué cabe en cada pantalla, y eso mejoró el contenido.",
      "Medir antes de tocar nada cambió el diagnóstico: el paso entre discos no iba lento por la conexión, sino porque el conejo se preparaba a mitad de la animación.",
    ],
    en: [
      "The no-scroll rule forced me to decide what fits on each screen, and that improved the content.",
      "Measuring before changing anything shifted the diagnosis: the disc transition wasn’t slow because of the connection, but because the bunny was getting ready mid-animation.",
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
