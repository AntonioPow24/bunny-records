import type { Technology } from "@/types/content";

// Fichas compartidas de tecnología (BUNNY-RECORDS.md §5.1: créditos compartidos).
// Las tecnologías que solo aparecen en proyectos planeados no salen en "Equipo de estudio".
export const technologies = {
  react: {
    name: "React",
    group: "frontend",
    inGear: true,
  },
  typescript: {
    name: "TypeScript",
    group: "frontend",
    inGear: true,
  },
  nextjs: {
    name: "Next.js",
    group: "frontend",
    inGear: true,
  },
  tailwindcss: {
    name: "Tailwind CSS",
    group: "frontend",
    inGear: true,
  },
  "shadcn-ui": {
    name: "shadcn/ui",
    group: "frontend",
    inGear: true,
  },
  "react-hook-form": {
    name: "React Hook Form",
    group: "frontend",
    inGear: false,
  },
  zod: {
    name: "Zod",
    group: "frontend",
    inGear: false,
  },
  "framer-motion": {
    name: "Framer Motion",
    group: "frontend",
    inGear: false,
  },
  supabase: {
    name: "Supabase",
    group: "backend",
    inGear: true,
  },
  firebase: {
    name: "Firebase",
    group: "backend",
    inGear: true,
  },
  java: {
    name: "Java",
    group: "backend",
    inGear: true,
  },
  csharp: {
    name: "C#",
    group: "backend",
    inGear: true,
  },
  mysql: {
    name: "MySQL",
    group: "backend",
    inGear: true,
  },
  figma: {
    name: "Figma",
    group: "design",
    inGear: true,
  },
  blender: {
    name: "Blender",
    group: "design",
    inGear: true,
  },
  git: {
    name: "Git",
    group: "workflow",
    inGear: true,
  },
  "github-actions": {
    name: "GitHub Actions",
    group: "workflow",
    inGear: true,
  },
  netlify: {
    name: "Netlify",
    group: "workflow",
    inGear: false,
  },
  vercel: {
    name: "Vercel",
    group: "workflow",
    inGear: false,
  },
  codex: {
    name: "Codex",
    group: "workflow",
    inGear: false,
  },
  "claude-code": {
    name: "Claude Code",
    group: "workflow",
    inGear: true,
  },
  vite: { name: "Vite", group: "frontend", inGear: false },
  storybook: { name: "Storybook", group: "frontend", inGear: false },
  "react-aria": { name: "React Aria", group: "frontend", inGear: false },
  tauri: { name: "Tauri", group: "backend", inGear: false },
  rust: { name: "Rust", group: "backend", inGear: false },
  libreoffice: { name: "LibreOffice", group: "backend", inGear: false },
  pdfjs: { name: "PDF.js", group: "frontend", inGear: false },
} satisfies Record<string, Technology>;

export type TechnologyId = keyof typeof technologies;
