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
      subtitle: { es: "Next.js, Supabase y seguridad en la base", en: "Next.js, Supabase and security in the database" },
    },
    {
      slug: "decisiones-importantes",
      title: { es: "Decisiones importantes", en: "Key decisions" },
      subtitle: { es: "Lo que quité también cuenta", en: "What I removed counts too" },
    },
    {
      slug: "lo-que-aprendi",
      title: { es: "Lo que aprendí", en: "What I learned" },
      subtitle: { es: "Probar en producción y escuchar al cliente", en: "Test in production and listen to the client" },
    },
  ],
  credits: [
    { tech: "nextjs", role: { es: "Server Components y Server Actions", en: "Server Components and Server Actions" } },
    { tech: "typescript", role: { es: "tipos de punta a punta", en: "end-to-end types" } },
    { tech: "tailwindcss", role: { es: "sistema de diseño", en: "design system" } },
    { tech: "shadcn-ui", role: { es: "componentes base", en: "base components" } },
    { tech: "supabase", role: { es: "datos, login y fotos con RLS", en: "data, login and photos with RLS" } },
    { tech: "react-hook-form", role: { es: "formularios del panel", en: "admin forms" } },
    { tech: "zod", role: { es: "validación compartida", en: "shared validation" } },
    { tech: "framer-motion", role: { es: "micro-interacciones", en: "micro-interactions" } },
    { tech: "github-actions", role: { es: "tarea diaria anti-pausa", en: "daily keep-alive job" } },
    { tech: "netlify", role: { es: "hosting de la prueba", en: "trial hosting" } },
  ],
  productionNotes: {
    es: [
      "El mayor riesgo no fue técnico: sin fotos reales, el diseño no se valida.",
      "Hacer QA sobre el build de producción encontró errores que en desarrollo no existían.",
    ],
    en: [
      "The biggest risk wasn’t technical: without real photos, the design can’t be validated.",
      "Running QA against the production build found bugs that didn’t exist in development.",
    ],
  },
  // Sin demo (falta la grabación) ni enlaces: el repositorio es privado y la URL de prueba no se publica.
};
