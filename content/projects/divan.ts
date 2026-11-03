import demoPoster from "@/public/demos/divan/poster.jpg";
import cover from "@/public/images/projects/divan/cover.jpg";
import type { PublishedProject } from "@/types/content";

// Herramienta para psicólogos independientes (repo privado psy-web). Fuentes: sus docs/CONCEPTO.md, ROADMAP.md y
// ESTADO.md (octubre–noviembre de 2026). Piloto cerrado por invitación: sin enlace ni resultados de uso.
// Tono del caso de estudio: cercano y poco técnico; nada de cómo se protegen los datos ni detalles de implementación.
export const divan: PublishedProject = {
  slug: "divan",
  status: "published",
  music: { title: "Now That I've Clarity", artist: "Martin Garrix" },
  title: { es: "Diván", en: "Diván" },
  tagline: {
    es: "La consulta de un psicólogo independiente, en orden: agenda, pacientes y pagos en un solo lugar.",
    en: "An independent psychologist’s practice, in order: schedule, patients and payments in one place.",
  },
  categories: ["saas"],
  year: 2026,
  featured: true,
  order: 1,
  cover: {
    src: cover,
    alt: {
      es: "Portada: el icono del diván en teal, con un leve resplandor, sobre fondo azul noche.",
      en: "Cover: the couch icon in teal, softly glowing, on a midnight-blue background.",
    },
  },
  role: { es: "Concepto, diseño y desarrollo", en: "Concept, design and development" },
  summary: {
    es: "Una app instalable para que psicólogos que atienden por su cuenta dejen la libreta, el Excel y los recordatorios sueltos: agenda, pacientes, observaciones y pagos, en el móvil y en el ordenador. Ordena lo que el psicólogo escribe y nunca saca conclusiones. En piloto con una psicóloga de Chimbote. Mi participación: concepto, diseño en Figma y desarrollo.",
    en: "An installable app so psychologists in private practice can leave behind the notebook, the spreadsheet and scattered reminders: schedule, patients, notes and payments, on phone and computer. It organizes what the psychologist writes and never draws conclusions. Piloting with a psychologist in Chimbote, Peru. My part: concept, Figma design and development.",
  },
  tracks: [
    {
      slug: "el-problema",
      title: { es: "El problema", en: "The problem" },
      subtitle: { es: "Una consulta repartida entre libreta, Excel y WhatsApp", en: "A practice split between notebook, spreadsheet and WhatsApp" },
    },
    {
      slug: "la-solucion",
      title: { es: "La solución", en: "The solution" },
      subtitle: { es: "El día entero en una pantalla", en: "The whole day on one screen" },
    },
    {
      slug: "como-lo-construi",
      title: { es: "Cómo lo construí", en: "How I built it" },
      subtitle: { es: "Por piezas pequeñas, probadas con quien la usa", en: "In small pieces, tested with the person who uses it" },
    },
    {
      slug: "decisiones-importantes",
      title: { es: "Decisiones importantes", en: "Key decisions" },
      subtitle: { es: "Ordenar, no interpretar", en: "Organize, don’t interpret" },
    },
    {
      slug: "lo-que-aprendi",
      title: { es: "Lo que aprendí", en: "What I learned" },
      subtitle: { es: "Quitar también es diseñar", en: "Removing is designing too" },
    },
  ],
  credits: [
    { tech: "nextjs", role: { es: "la app instalable", en: "the installable app" } },
    { tech: "react", role: { es: "pantallas que responden al momento", en: "screens that respond instantly" } },
    { tech: "typescript", role: { es: "código más fiable", en: "more reliable code" } },
    { tech: "react-aria", role: { es: "componentes accesibles", en: "accessible components" } },
    { tech: "tailwindcss", role: { es: "el estilo y los cuatro temas", en: "the style and the four themes" } },
    { tech: "supabase", role: { es: "datos y cuentas", en: "data and accounts" } },
    { tech: "zod", role: { es: "comprobar lo que se guarda", en: "checking what gets saved" } },
    { tech: "figma", role: { es: "diseño y prototipo, con un flujo de IA", en: "design and prototype, with an AI workflow" } },
    { tech: "claude-code", role: { es: "asistente de diseño y desarrollo", en: "design and development assistant" } },
    { tech: "git", role: { es: "avance pieza a pieza", en: "progress piece by piece" } },
    { tech: "vercel", role: { es: "publicación de la app", en: "hosting the app" } },
  ],
  productionNotes: {
    es: [
      "Una tarde con la psicóloga cambió más pantallas que una semana de diseño a solas.",
      "Cada vez que quité un paso, la app se entendió mejor.",
    ],
    en: [
      "One afternoon with the psychologist changed more screens than a week of designing alone.",
      "Every time I removed a step, the app became easier to understand.",
    ],
  },
  // Sin enlaces: el repositorio es privado y la app es un piloto por invitación. El clip se grabó en local con
  // pacientes ficticios, no con datos reales.
  demo: {
    mp4: "/demos/divan/divan-demo-6s.mp4",
    webm: "/demos/divan/divan-demo-6s.webm",
    poster: demoPoster,
    alt: {
      es: "Recorrido por la app con pacientes ficticios: Hoy con la siguiente sesión, la agenda de la semana con sus horarios libres, la lista de pacientes y la ficha de una paciente.",
      en: "A walk through the app with fictitious patients: Today with the next session, the week’s schedule with its free slots, the patient list and one patient’s record.",
    },
  },
};
