import type { Technology } from "@/types/content";

// Fichas compartidas de tecnología (BUNNY-RECORDS.md §5.1: créditos compartidos).
// Solo se afirma uso real donde lo hay (ME.md, proyecto Vidriería, este portfolio). Las tecnologías
// que solo aparecen en proyectos planeados lo dicen y no salen en "Equipo de estudio".
const proposedOnly = {
  es: "Propuesta para un proyecto planeado; todavía no la he usado en un proyecto publicado.",
  en: "Proposed for a planned project; I haven’t used it in a published project yet.",
};

export const technologies = {
  react: {
    name: "React",
    group: "frontend",
    inGear: true,
    howIUseIt: {
      es: "Mi base de trabajo diaria: interfaces y flujos multicanal con componentes reutilizables, en NTT DATA y en mis proyectos.",
      en: "My everyday foundation: interfaces and multichannel flows built from reusable components, at NTT DATA and in my own projects.",
    },
  },
  typescript: {
    name: "TypeScript",
    group: "frontend",
    inGear: true,
    howIUseIt: {
      es: "En modo estricto en todos los proyectos, para que los errores aparezcan al compilar y no en producción.",
      en: "In strict mode on every project, so errors show up at build time instead of in production.",
    },
  },
  nextjs: {
    name: "Next.js",
    group: "frontend",
    inGear: true,
    howIUseIt: {
      es: "En Vidriería Antonio: Server Components que leen de Supabase y Server Actions para el panel. En este portfolio: rutas anidadas con layouts persistentes, todo prerenderizado.",
      en: "In Vidriería Antonio: Server Components reading from Supabase and Server Actions for the admin panel. In this portfolio: nested routes with persistent layouts, all prerendered.",
    },
    learned: {
      es: "Que la caché de producción no es la de desarrollo: hay que revalidar en cada escritura y probar sobre el build.",
      en: "That the production cache isn’t the development one: revalidate on every write and test against the build.",
    },
  },
  tailwindcss: {
    name: "Tailwind CSS",
    group: "frontend",
    inGear: true,
    howIUseIt: {
      es: "Sobre tokens de diseño propios de cada proyecto, nunca con los colores por defecto.",
      en: "On top of each project’s own design tokens, never with the default colors.",
    },
  },
  "shadcn-ui": {
    name: "shadcn/ui",
    group: "frontend",
    inGear: true,
    howIUseIt: {
      es: "Como punto de partida de los componentes base, adaptados a la marca y a la accesibilidad de cada proyecto.",
      en: "As the starting point for base components, adapted to each project’s brand and accessibility.",
    },
  },
  "react-hook-form": {
    name: "React Hook Form",
    group: "frontend",
    inGear: false,
    howIUseIt: {
      es: "En los formularios del panel de Vidriería Antonio, junto con Zod.",
      en: "In the Vidriería Antonio admin forms, together with Zod.",
    },
  },
  zod: {
    name: "Zod",
    group: "frontend",
    inGear: false,
    howIUseIt: {
      es: "Un mismo esquema valida los datos en el navegador y en el servidor.",
      en: "One schema validates the data in the browser and on the server.",
    },
  },
  "framer-motion": {
    name: "Framer Motion",
    group: "frontend",
    inGear: false,
    howIUseIt: {
      es: "Solo para micro-interacciones puntuales, respetando la preferencia de movimiento reducido.",
      en: "Only for small, targeted micro-interactions, respecting reduced-motion preferences.",
    },
  },
  supabase: {
    name: "Supabase",
    group: "backend",
    inGear: true,
    howIUseIt: {
      es: "Base de datos, login y fotos de Vidriería Antonio, con políticas RLS: el público solo lee y solo los administradores escriben.",
      en: "Database, login and photos for Vidriería Antonio, with RLS policies: the public can only read and only admins can write.",
    },
    learned: {
      es: "Que la seguridad real vive en la base, no en ocultar botones; y que el plan gratuito se pausa si nadie lo usa.",
      en: "That real security lives in the database, not in hiding buttons; and that the free plan pauses when idle.",
    },
  },
  firebase: {
    name: "Firebase",
    group: "backend",
    inGear: true,
    howIUseIt: {
      es: "En mi etapa de desarrollo backend, antes de especializarme en frontend.",
      en: "During my backend development years, before I specialized in frontend.",
    },
  },
  java: {
    name: "Java",
    group: "backend",
    inGear: true,
    howIUseIt: {
      es: "En mi etapa de desarrollo backend (2022–2024).",
      en: "During my backend development years (2022–2024).",
    },
  },
  csharp: {
    name: "C#",
    group: "backend",
    inGear: true,
    howIUseIt: {
      es: "En mi etapa de desarrollo backend (2022–2024).",
      en: "During my backend development years (2022–2024).",
    },
  },
  mysql: {
    name: "MySQL",
    group: "backend",
    inGear: true,
    howIUseIt: {
      es: "Bases de datos relacionales en mi etapa de desarrollo backend.",
      en: "Relational databases during my backend development years.",
    },
  },
  figma: {
    name: "Figma",
    group: "design",
    inGear: true,
    howIUseIt: {
      es: "Diseño de las interfaces antes de programarlas, con variables y componentes que luego pasan al código.",
      en: "Designing interfaces before coding them, with variables and components that carry over into the code.",
    },
  },
  blender: {
    name: "Blender",
    group: "design",
    inGear: true,
    howIUseIt: {
      es: "Modelado y render del conejo de Bunny Records, separado en capas para animarlo en la web.",
      en: "Modeling and rendering the Bunny Records bunny, split into layers to animate it on the web.",
    },
  },
  git: {
    name: "Git",
    group: "workflow",
    inGear: true,
    howIUseIt: {
      es: "Una rama por fase y commits por bloque coherente, revisados antes de integrarse.",
      en: "One branch per phase and one commit per coherent block, reviewed before merging.",
    },
  },
  "github-actions": {
    name: "GitHub Actions",
    group: "workflow",
    inGear: true,
    howIUseIt: {
      es: "Una tarea diaria que mantiene activa la base de datos de Vidriería Antonio en el plan gratuito.",
      en: "A daily job that keeps the Vidriería Antonio database awake on the free plan.",
    },
  },
  netlify: {
    name: "Netlify",
    group: "workflow",
    inGear: false,
    howIUseIt: {
      es: "Hosting del periodo de prueba de Vidriería Antonio.",
      en: "Hosting for the Vidriería Antonio trial period.",
    },
  },
  "claude-code": {
    name: "Claude Code",
    group: "workflow",
    inGear: true,
    howIUseIt: {
      es: "Asistente de IA para planificar, programar y revisar; las decisiones y la revisión final son mías.",
      en: "AI assistant to plan, code and review; the decisions and the final review are mine.",
    },
  },
  vite: { name: "Vite", group: "frontend", inGear: false, howIUseIt: proposedOnly },
  storybook: { name: "Storybook", group: "frontend", inGear: false, howIUseIt: proposedOnly },
  tauri: { name: "Tauri", group: "backend", inGear: false, howIUseIt: proposedOnly },
  rust: { name: "Rust", group: "backend", inGear: false, howIUseIt: proposedOnly },
  libreoffice: { name: "LibreOffice", group: "backend", inGear: false, howIUseIt: proposedOnly },
  pdfjs: { name: "PDF.js", group: "frontend", inGear: false, howIUseIt: proposedOnly },
} satisfies Record<string, Technology>;

export type TechnologyId = keyof typeof technologies;
