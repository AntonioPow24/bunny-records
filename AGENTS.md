# Bunny Records — entrada común para agentes

Portfolio personal de Antonio Garcia Romero presentado como un sello discográfico. Sitio estático y bilingüe (es/en), sin backend. Stack declarado en `PROJECT.yaml`: de `~/.ai/stacks/` solo aplican esos ids.

## Al empezar

Leer `PROJECT.yaml` y `docs/ESTADO.md` (cortos). Nada más por defecto: consultar solo la sección pertinente de

| Documento | Autoridad |
|---|---|
| `PORTFOLIO.md` | Técnica: stack, tokens, i18n, rutas, contenido, calidad, hosting, mantenimiento |
| `BUNNY-RECORDS.md` | Experiencia, marca, navegación, personaje, movimiento y assets; manda en lo visual |
| `FIGMA-DESIGN.md` | Archivo de Figma, diseños aprobados vigentes y traspaso de diseño |
| `.claude/skills/portfolio-qa/SKILL.md` | Controles de QA propios (los niveles están en `~/.ai/WORKFLOW.md` §2) |

El historial está en [Bunny Records / Portfolio — Antonio Development Hub](https://app.notion.com/p/3f95744bc2fe81f4be76f89a32ea5fc3). Consultarlo solo cuando la tarea necesite antecedentes; corroborar el estado vigente con el código y Git.

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

## Advertencias técnicas

- Mantener el sitio estático y pausar animaciones al ocultarse las páginas con `<Activity>`.
- Configuración y recetas de Next.js, i18n, Tailwind y personaje: `PORTFOLIO.md` §5.1, solo si la tarea las toca. Reglas generales: stack `nextjs` declarado.

## Git y despliegue

- Una rama por tarea (`mejora-N-…`); commits en español con la identidad personal (`garciaromeroantonio24@gmail.com`), nunca la corporativa.
- Permisos de Git según `~/.ai/CORE.md`. Un merge a `main` despliega solo en Vercel (`bunnyrecords.dev`, indexable; `bunny-records.vercel.app` redirige con 308).
- No versionar referencias, renders pesados ni notas personales (`.gitignore`).

## Colaboración

- Responsables por alcance en `PROJECT.yaml` (`roles`), según `~/.ai/CORE.md`; el usuario puede reasignarlos. Roles vacíos no son pendientes obligatorios ni requieren completar fases ajenas al trabajo solicitado.
- El usuario aprueba los diseños e indica cuándo implementar. Sin trabajo simultáneo de ambos agentes salvo petición expresa; no enviarse tareas sin autorización.
- Flujo de diseño a código: `~/.ai/WORKFLOW.md` §5; archivo y estado en `FIGMA-DESIGN.md`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
