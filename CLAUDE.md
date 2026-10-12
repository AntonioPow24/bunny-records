@AGENTS.md

# Bunny Records — reglas del proyecto

Portfolio personal de Antonio García Romero presentado como un sello discográfico. Documentos que mandan:

| Documento | Para qué |
|---|---|
| `DESARROLLO.md` | Pasos de desarrollo y en cuál vamos. **Leerlo al empezar cada sesión** |
| `PORTFOLIO.md` | Técnica: stack, i18n, rutas, modelo de contenido, calidad, hosting |
| `BUNNY-RECORDS.md` | Experiencia: metáfora, navegación, conejo, movimiento. Manda en lo visual |
| `FIGMA-DESIGN.md` | Diseño en Figma (archivo `o0r1u0aHeXmVXn2TAFME28`) y su estado |

## Forma de trabajar

- Un paso de `DESARROLLO.md` por rama (`paso-N-…`). Antes de tocar código, decir qué se cambia y qué archivos se tocan.
- Al cerrar cada bloque: `npm run check` (typecheck + lint + build) en verde, commit y push. Merge a `main` cuando el paso está completo y revisado por el usuario.
- Commits en español. `Co-Authored-By` solo cuando la IA hizo una parte sustancial del trabajo.
- Identidad de Git: la personal (`garciaromeroantonio24@gmail.com`). Nunca la corporativa.
- No versionar referencias, renders pesados ni notas personales (ver `.gitignore`).

## Next.js 16.4 en este proyecto (leído en `node_modules/next/dist/docs/`)

- **Cache Components y Partial Prefetching activos** (`next.config.ts`). Todo el sitio es estático: cuando existan las rutas con idioma, usar `ensureStatic` (guía `keeping-pages-static.md`) en el layout de `[locale]` para que un cambio no vuelva dinámica una ruta sin querer.
- **Las páginas no se desmontan al navegar:** se ocultan con `<Activity>` (guía `preserving-ui-state.md`). El conejo, la demo y cualquier animación deben pausarse cuando su página queda oculta, y los paneles abiertos deben cerrarse al ocultarse.
- **View Transitions sin configuración:** `<ViewTransition>` de React 19.3 (guía `view-transitions.md`). Los pares con `name` llevan `share` y `default="none"`; respetar `prefers-reduced-motion`.
- **Tailwind v4** entra por `@tailwindcss/turbopack` (sin PostCSS).
- **Idioma:** `getLocale()` / `getDictionary()` (`lib/i18n/get-dictionary.ts`) en Server Components; los Client Components reciben los textos traducidos por props. Todo texto de interfaz va en los dos diccionarios.
- `LayoutProps<"/ruta">` y `PageProps<…>` son tipos globales generados por `next typegen` (incluido en `npm run typecheck`).

## Reglas de producto que no se rompen

- **Hosting en Vercel Hobby:** el sitio es personal e informativo. Nunca añadir precios, pagos, anuncios ni ofertas de servicios o disponibilidad freelance (`PORTFOLIO.md` §2.1).
- Sin métricas ni resultados inventados. Los proyectos planeados no tienen demo ni resultados.
- El proyecto de la vidriería se llama "Vidriería Antonio" a propósito: no publicar el nombre real del cliente, su ciudad, teléfonos ni precios.
- Contraste según `PORTFOLIO.md` §3.5 (botón primario: fondo teal, texto ink).
