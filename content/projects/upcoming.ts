import aiEstimatorCover from "@/public/images/projects/ai-construction-estimator/cover.jpg";
import educationalCover from "@/public/images/projects/educational-platform/cover.jpg";
import officeCover from "@/public/images/projects/office-to-pdf-converter/cover.jpg";
import uiLibraryCover from "@/public/images/projects/ui-component-library/cover.jpg";
import type { UpcomingProject } from "@/types/content";

// Próximos lanzamientos. Concepto, stack y validación salen de idea/reporte-proyectos-bunny.html (2026-10-11)
// y de BUNNY-RECORDS.md §5.3. Sin demos ni resultados: aún no están construidos.

const placeholderAlt = (es: string, en: string) => ({
  es: `Portada provisional: ${es}`,
  en: `Placeholder cover: ${en}`,
});

export const uiComponentLibrary: UpcomingProject = {
  slug: "ui-component-library",
  status: "planned",
  title: { es: "UI Component Library", en: "UI Component Library" },
  tagline: {
    es: "Los patrones probados en el portfolio, extraídos para acelerar los siguientes productos.",
    en: "Patterns proven in the portfolio, extracted to speed up the next products.",
  },
  categories: ["library"],
  year: 2026,
  featured: false,
  order: 3,
  cover: {
    src: uiLibraryCover,
    alt: placeholderAlt("dibujo técnico de piezas de interfaz sobre una cuadrícula.", "technical drawing of interface pieces on a grid."),
  },
  concept: {
    es: "Extraer los patrones ya probados en el portfolio para acelerar los siguientes productos, sin crear un framework propio: tokens, 8–12 componentes accesibles, documentación y un paquete privado instalable.",
    en: "Extract the patterns already proven in the portfolio to speed up the next products, without building my own framework: tokens, 8–12 accessible components, documentation and an installable private package.",
  },
  format: { es: "Paquete de componentes React", en: "React component package" },
  credits: [
    { tech: "react", role: { es: "componentes", en: "components" } },
    { tech: "typescript", role: { es: "API tipada", en: "typed API" } },
    { tech: "vite", role: { es: "empaquetado en modo biblioteca", en: "library-mode bundling" } },
    { tech: "storybook", role: { es: "documentación interactiva", en: "interactive documentation" } },
    { tech: "tailwindcss", role: { es: "tokens y estilos", en: "tokens and styles" } },
  ],
  nextValidation: {
    es: "Que dos proyectos la consuman sin adaptaciones frágiles.",
    en: "Two projects consuming it without fragile workarounds.",
  },
};

export const officeToPdfConverter: UpcomingProject = {
  slug: "office-to-pdf-converter",
  status: "planned",
  title: { es: "Office to PDF Converter", en: "Office to PDF Converter" },
  tagline: {
    es: "Carpetas de documentos de Office convertidas a PDF por lotes, sin tocar los originales.",
    en: "Folders of Office documents converted to PDF in batches, without touching the originals.",
  },
  categories: ["desktop"],
  year: 2026,
  featured: false,
  order: 4,
  cover: {
    src: officeCover,
    alt: placeholderAlt("documentos apilados que se convierten en una hoja limpia.", "stacked documents turning into a single clean sheet."),
  },
  concept: {
    es: "Convertir carpetas de documentos de Word, Excel y PowerPoint en PDF por lotes, con una cola clara, errores comprensibles y los originales intactos.",
    en: "Convert folders of Word, Excel and PowerPoint documents to PDF in batches, with a clear queue, understandable errors and the originals left intact.",
  },
  format: { es: "Escritorio Windows, sin conexión", en: "Windows desktop, offline" },
  credits: [
    { tech: "tauri", role: { es: "app de escritorio para Windows", en: "Windows desktop app" } },
    { tech: "rust", role: { es: "cola de trabajos", en: "job queue" } },
    { tech: "react", role: { es: "interfaz de la cola", en: "queue interface" } },
    { tech: "libreoffice", role: { es: "motor de conversión (a evaluar)", en: "conversion engine (to be evaluated)" } },
  ],
  nextValidation: {
    es: "Probar el motor de conversión con documentos reales y aceptar sus límites de fidelidad antes de pulir la interfaz.",
    en: "Test the conversion engine with real documents and accept its fidelity limits before polishing the interface.",
  },
};

export const educationalPlatform: UpcomingProject = {
  slug: "educational-platform",
  status: "planned",
  title: { es: "Educational Platform", en: "Educational Platform" },
  tagline: {
    es: "Varias aulas por docente, con menos trabajo repetitivo de asistencia y evaluación.",
    en: "Several classrooms per teacher, with less repetitive attendance and grading work.",
  },
  categories: ["saas"],
  year: 2026,
  featured: false,
  order: 5,
  cover: {
    src: educationalCover,
    alt: placeholderAlt("un libro abierto del que sale una escalera.", "an open book with a staircase rising from it."),
  },
  concept: {
    es: "Organizar varias aulas por docente y reducir el trabajo repetitivo de asistencia y evaluación, con datos aislados entre docentes y copias de seguridad probadas.",
    en: "Organize several classrooms per teacher and cut the repetitive work of attendance and grading, with data isolated between teachers and tested backups.",
  },
  format: { es: "App web con login", en: "Web app with login" },
  credits: [
    { tech: "react", role: { es: "interfaz", en: "interface" } },
    { tech: "vite", role: { es: "app de una sola página", en: "single-page app" } },
    { tech: "supabase", role: { es: "datos y permisos con RLS", en: "data and permissions with RLS" } },
    { tech: "zod", role: { es: "validación de notas e importaciones", en: "grade and import validation" } },
  ],
  nextValidation: {
    es: "Entrevistas con 3–5 docentes y un piloto con 2–3 aulas.",
    en: "Interviews with 3–5 teachers and a pilot with 2–3 classrooms.",
  },
};

export const aiConstructionEstimator: UpcomingProject = {
  slug: "ai-construction-estimator",
  status: "planned",
  title: { es: "AI Construction Estimator", en: "AI Construction Estimator" },
  tagline: {
    es: "De planos a cantidades y presupuestos trazables, con una IA que propone y un profesional que revisa.",
    en: "From blueprints to traceable quantities and budgets, with AI that proposes and a professional who reviews.",
  },
  categories: ["ai"],
  year: 2026,
  featured: false,
  order: 6,
  cover: {
    src: aiEstimatorCover,
    alt: placeholderAlt("estructura de un edificio en construcción bajo una red de nodos.", "a building frame under construction beneath a network of nodes."),
  },
  concept: {
    es: "Pasar de planos a cantidades y presupuestos trazables: medir sobre el plano, vincular cada cantidad a su partida y dejar que la IA proponga, siempre con revisión humana.",
    en: "Go from blueprints to traceable quantities and budgets: measure on the drawing, link every quantity to its line item and let AI propose, always with human review.",
  },
  format: { es: "App web con editor e IA", en: "Web app with editor and AI" },
  credits: [
    { tech: "react", role: { es: "editor de metrados", en: "quantity editor" } },
    { tech: "pdfjs", role: { es: "visor de planos (a evaluar)", en: "blueprint viewer (to be evaluated)" } },
    { tech: "supabase", role: { es: "datos y archivos privados", en: "data and private files" } },
  ],
  nextValidation: {
    es: "Validar el dominio con un especialista y un corpus de planos antes de añadir IA.",
    en: "Validate the domain with a specialist and a corpus of blueprints before adding AI.",
  },
};
