import type { Localized } from "@/lib/i18n/localized";

// Datos personales (fuente: el CV de noviembre de 2026, public/cv/, y el diseño aprobado de Sobre mí y Contacto).
// Regla de hosting (PORTFOLIO.md §2.1): informativo; sin ofertas de servicios, precios ni disponibilidad freelance.

export type TourStop = {
  years: Localized<string>;
  role: Localized<string>;
  place: Localized<string>;
};

export const profile = {
  name: "Antonio Garcia Romero",
  role: { es: "Frontend Developer", en: "Frontend Developer" },
  degree: { es: "Ingeniero de Sistemas e Informática", en: "Systems and Computer Engineer" },
  location: { es: "Lima, Perú", en: "Lima, Peru" },
  bio: {
    es: "Soy Ingeniero de Sistemas e Informática y me dedico al desarrollo frontend: interfaces modernas, intuitivas y funcionales. Hoy trabajo en NTT DATA, en el frontend del portal de siniestros de Pacífico Seguros con React y TypeScript. Cuido por igual el diseño visual y la arquitectura del código, y sigo explorando el backend para construir soluciones completas.",
    en: "I’m a Systems and Computer Engineer focused on frontend development: modern, intuitive and functional interfaces. I currently work at NTT DATA, on the frontend of Pacífico Seguros’ claims portal with React and TypeScript. I care as much about visual design as about code architecture, and I keep exploring the backend to build complete solutions.",
  },
  /** "Cómo trabajo · Tres reglas del sello". */
  principles: [
    {
      glyph: "+",
      title: { es: "Diseño y código, al mismo nivel", en: "Design and code, on equal footing" },
      body: {
        es: "Una interfaz bonita con código frágil no está terminada, y al revés tampoco.",
        en: "A beautiful interface on fragile code isn’t finished, and neither is the reverse.",
      },
    },
    {
      glyph: "+",
      title: { es: "Componentes que se reutilizan", en: "Components that get reused" },
      body: {
        es: "Planifico antes de escribir: piezas pequeñas, ordenadas y fáciles de mantener.",
        en: "I plan before writing: small, organised pieces that are easy to maintain.",
      },
    },
    {
      glyph: "−",
      title: { es: "Estado real, sin cifras inventadas", en: "Real status, no made-up numbers" },
      body: {
        es: "Cada proyecto dice si está publicado, en desarrollo o planeado.",
        en: "Every project says whether it’s published, in development or planned.",
      },
    },
  ],
  /** Trayectoria ("Gira"). */
  tour: [
    {
      years: { es: "2025 – hoy", en: "2025 – now" },
      role: { es: "Frontend Developer", en: "Frontend Developer" },
      place: {
        es: "NTT DATA · interfaces y flujos multicanal para Pacífico Seguros con React y TypeScript",
        en: "NTT DATA · multichannel interfaces and flows for Pacífico Seguros with React and TypeScript",
      },
    },
    {
      years: { es: "2024 – 2025", en: "2024 – 2025" },
      role: { es: "Frontend / Fullstack Developer", en: "Frontend / Fullstack Developer" },
      place: {
        es: "Vidriería local · e-commerce y plataforma de tareas y cotizaciones",
        en: "Local glazing company · e-commerce and a tasks and quotes platform",
      },
    },
    {
      years: { es: "2022 – 2023", en: "2022 – 2023" },
      role: { es: "Backend Developer (Java) · prácticas", en: "Backend Developer (Java) · internship" },
      place: {
        es: "Institución educativa pública · sistema de inventario con Java, Swing y MySQL",
        en: "Public education institution · inventory system with Java, Swing and MySQL",
      },
    },
  ] satisfies TourStop[],
  contact: {
    email: "garciaromeroantonio24@gmail.com",
    github: { handle: "AntonioPow24", url: "https://github.com/AntonioPow24" },
    linkedin: { handle: "antoniogarciaromero", url: "https://www.linkedin.com/in/antoniogarciaromero" },
  },
} as const;
