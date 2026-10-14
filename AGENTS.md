# Bunny Records — entrada común para agentes

Portfolio personal de Antonio Garcia Romero presentado como un sello discográfico. Sitio estático y bilingüe (es/en), sin backend. Stack declarado en `PROJECT.yaml`: de `~/.ai/stacks/` solo aplican esos ids.

## Al empezar

Leer `docs/ESTADO.md` (corto). Nada más por defecto: consultar solo la sección pertinente de

| Documento | Autoridad |
|---|---|
| `PORTFOLIO.md` | Técnica: stack, tokens, i18n, rutas, contenido, calidad, hosting, mantenimiento |
| `BUNNY-RECORDS.md` | Experiencia, marca, navegación, personaje, movimiento y assets; manda en lo visual |
| `FIGMA-DESIGN.md` | Archivo de Figma, diseños aprobados vigentes y traspaso de diseño |
| `.claude/skills/portfolio-qa/SKILL.md` | Controles de QA propios (los niveles están en `~/.ai/WORKFLOW.md` §2) |

`DESARROLLO.md` y `PLAN-IMAGENES.md` son históricos pendientes de migrar a Notion: no leerlos salvo petición expresa. Corroborar el estado con el código y Git.

## Reglas que no se rompen

- **Sin scroll de página** (`BUNNY-RECORDS.md` §5.3.2): todo cabe en `100dvh`; lo largo se desplaza en su panel (en móvil, Sobre mí y Contacto desplazan `<main>` bajo la cabecera). Comprobar 1920×911, 390×844 y 375×667 en cada pantalla nueva.
- **Vercel Hobby:** sitio personal e informativo. Nunca precios, pagos, anuncios ni ofertas de servicios o disponibilidad freelance (`PORTFOLIO.md` §2.1).
- Sin métricas ni resultados inventados. Los proyectos planeados no tienen demo ni resultados.
- "Vidriería Antonio" es un nombre genérico a propósito: no publicar el nombre real del cliente, su ciudad, teléfonos ni precios (única excepción aceptada: el CV descargable).
- Contraste según `PORTFOLIO.md` §3.5 (botón primario: fondo teal, texto ink). Todo texto de interfaz en los dos diccionarios.

## Comandos

| Comando | Uso |
|---|---|
| `npm run check` | typecheck + lint + build; obligatorio al cerrar cada bloque de código |
| `npm run build && npm run start` | Medir y verificar siempre sobre producción |
| `npm run dev` | Desarrollo |

## Next.js 16.4 en este proyecto

Lecciones generales de Next 16 (Cache Components, `<Activity>`, View Transitions, servidor de desarrollo): `~/.ai/stacks/nextjs.md`. Configuración propia:

- **Cache Components y Partial Prefetching activos** (`next.config.ts`); todo el sitio es estático y el layout de `[locale]` usa `ensureStatic` para que una ruta no se vuelva dinámica sin querer.
- Las páginas visitadas se ocultan con `<Activity>`: el conejo, la demo y cualquier animación se pausan al ocultarse y los paneles se cierran.
- Tailwind v4 entra por `@tailwindcss/turbopack` (sin PostCSS).
- Idioma: `getLocale()` / `getDictionary()` (`lib/i18n/get-dictionary.ts`) en Server Components; los Client Components reciben los textos traducidos por props.
- `LayoutProps<"/ruta">` y `PageProps<…>` son globales generados por `next typegen` (incluido en `npm run typecheck`).
- El conejo no arranca durante una transición; en pose fija carga solo esa pose.

## Git y despliegue

- Una rama por tarea (`mejora-N-…`); commits en español con la identidad personal (`garciaromeroantonio24@gmail.com`), nunca la corporativa.
- Commits cuando la tarea lo requiera. **Push, merge y deploy solo con aprobación explícita del usuario.** Un merge a `main` despliega solo en Vercel (`bunny-records.vercel.app`, con `noindex` hasta tener dominio).
- El hook de merge exige una revisión registrada (code-review) antes de integrar.
- No versionar referencias, renders pesados ni notas personales (`.gitignore`).

## Colaboración

- **Codex:** UX/UI, Figma, arquitectura, planificación y revisión. No implementa cambios de producto sin autorización del usuario.
- **Claude Code:** implementa e integra los diseños aprobados, mantiene el código y lo valida.
- **Usuario:** aprueba los diseños e indica cuándo implementar. Los agentes no se envían tareas entre sí ni modifican a la vez los mismos archivos.
- Flujo de diseño a código: `~/.ai/WORKFLOW.md` §5; archivo y estado en `FIGMA-DESIGN.md`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
