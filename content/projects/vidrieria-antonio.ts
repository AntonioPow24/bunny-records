import demoPoster from "@/public/demos/vidrieria-antonio/poster.jpg";
import cover from "@/public/images/projects/vidrieria-antonio/cover.jpg";
import type { PublishedProject } from "@/types/content";

// Fuente: C:\APPS\vidrieria-antonio (README, ARQUITECTURA.md, historial). Marca genérica a propósito:
// no se publican el nombre real del negocio, su ciudad, teléfonos ni precios (PORTFOLIO.md §8).
export const vidrieriaAntonio: PublishedProject = {
  slug: "vidrieria-antonio",
  status: "published",
  title: { es: "Vidriería Antonio", en: "Vidriería Antonio" },
  tagline: {
    es: "Web corporativa con panel de administración para una vidriería local.",
    en: "A company website with an admin panel for a local glazing business.",
  },
  categories: ["web"],
  year: 2026,
  featured: true,
  order: 1,
  cover: {
    src: cover,
    alt: {
      es: "Portada provisional: paneles de vidrio superpuestos en teal sobre fondo oscuro.",
      en: "Placeholder cover: overlapping teal glass panes on a dark background.",
    },
  },
  role: { es: "Propuesta, diseño y desarrollo", en: "Proposal, design and development" },
  summary: {
    es: "Una vidriería local hacía buenos trabajos, pero no tenía dónde mostrarlos. Para particulares y constructoras. Mi participación: propuesta, diseño y desarrollo completos.",
    en: "A local glazing business did good work, but had nowhere to show it. For homeowners and builders. My part: proposal, design and full development.",
  },
  tracks: [
    {
      slug: "el-problema",
      title: { es: "El problema", en: "The problem" },
      subtitle: { es: "Un taller con buen trabajo y sin vitrina", en: "A workshop with good work and no shop window" },
    },
    {
      slug: "la-solucion",
      title: { es: "La solución", en: "The solution" },
      subtitle: { es: "Proyectos como prueba, WhatsApp como puerta", en: "Projects as proof, WhatsApp as the door" },
    },
    {
      slug: "como-lo-construi",
      title: { es: "Cómo lo construí", en: "How I built it" },
      subtitle: { es: "Sencilla de mantener y segura", en: "Easy to maintain and secure" },
    },
    {
      slug: "decisiones-importantes",
      title: { es: "Decisiones importantes", en: "Key decisions" },
      subtitle: { es: "Lo que quité también cuenta", en: "What I removed counts too" },
    },
    {
      slug: "lo-que-aprendi",
      title: { es: "Lo que aprendí", en: "What I learned" },
      subtitle: { es: "Probar la versión real y escuchar al cliente", en: "Test the real version and listen to the client" },
    },
  ],
  credits: [
    { tech: "nextjs", role: { es: "la web y el panel", en: "the site and the panel" } },
    { tech: "typescript", role: { es: "código más fiable", en: "more reliable code" } },
    { tech: "tailwindcss", role: { es: "el estilo visual", en: "the visual style" } },
    { tech: "shadcn-ui", role: { es: "piezas de interfaz", en: "interface pieces" } },
    { tech: "supabase", role: { es: "datos, acceso y fotos", en: "data, login and photos" } },
    { tech: "react-hook-form", role: { es: "formularios del panel", en: "admin forms" } },
    { tech: "zod", role: { es: "comprobar los datos", en: "checking the data" } },
    { tech: "framer-motion", role: { es: "pequeñas animaciones", en: "small animations" } },
    { tech: "github-actions", role: { es: "tarea automática diaria", en: "daily automatic task" } },
    { tech: "netlify", role: { es: "publicación de la prueba", en: "hosting the trial" } },
    { tech: "claude-code", role: { es: "ayuda para construir", en: "help building it" } },
  ],
  productionNotes: {
    es: [
      "El mayor riesgo no fue técnico: sin fotos reales, el diseño no se valida.",
      "Revisar la versión publicada, y no solo la de trabajo, destapó fallos que antes no se veían.",
    ],
    en: [
      "The biggest risk wasn’t technical: without real photos, the design can’t be validated.",
      "Checking the published version, not just the working one, uncovered bugs that weren’t visible before.",
    ],
  },
  // Sin enlaces: el repositorio es privado y la URL de prueba no se publica. Las ubicaciones que se ven en el clip
  // son datos de ejemplo, no las del negocio.
  demo: {
    mp4: "/demos/vidrieria-antonio/vidrieria-antonio-demo-6s.mp4",
    webm: "/demos/vidrieria-antonio/vidrieria-antonio-demo-6s.webm",
    poster: demoPoster,
    alt: {
      es: "Recorrido por la web y el panel: la portada, el catálogo de proyectos con fotos, una ficha de proyecto y su edición en el panel de administración.",
      en: "A walk through the site and the admin panel: the home page, the photo catalogue of projects, a project page and editing it in the admin panel.",
    },
  },
};
