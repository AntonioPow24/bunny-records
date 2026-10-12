# Bunny Records — Plan de desarrollo

*Creado: 2026-10-12. Sigue `PORTFOLIO.md` (técnica), `BUNNY-RECORDS.md` (experiencia) y el diseño de Figma (`FIGMA-DESIGN.md`).*

Cada paso es **un bloque que se entiende solo**: tiene un objetivo, un resultado que se puede ver o comprobar y su propia rama. Al terminar cada paso: typecheck, lint y build en verde, revisión del usuario, commit y merge a `main` (playbook §4). No se empieza un paso hasta cerrar el anterior.

**Commits:** mensajes en español, por bloque coherente. `Co-Authored-By` solo cuando la IA hizo una parte sustancial del trabajo.

| # | Paso | Rama | Listo cuando… |
|---|---|---|---|
| 1 | Entorno y repositorio | `main` | Git iniciado, `.gitignore` deja fuera lo pesado, primer commit con la documentación |
| 2 | Proyecto Next.js base | `paso-2-base` | `npm run build` en verde con la estructura de carpetas de `PORTFOLIO.md` §5 |
| 3 | Sistema de diseño en código | `paso-3-diseno` | Tokens, fuentes y primitivos iguales a Figma; página de muestra interna |
| 4 | Idiomas (es/en) | `paso-4-i18n` | `/es` y `/en` navegables; `/` redirige; un diccionario incompleto rompe el typecheck |
| 5 | Contenido tipado | `paso-5-contenido` | 5 proyectos, pistas MDX, tecnologías y perfil; un planeado con resultados no compila |
| 6 | Layout persistente y conejo | `paso-6-layout` | Header, footer, bandeja y conejo por capas; el conejo no se reinicia al navegar |
| 7 | Colección (Inicio) | `paso-7-coleccion` | Arco de portadas, filtro, selección con ficha y contacto (#contact) |
| 8 | Álbum y pistas | `paso-8-album` | Álbum, pista abierta, créditos, notas, demo; portada y demo persisten entre pistas |
| 9 | Fichas de tecnología | `paso-9-stack` | Panel sobre el álbum y página completa en entrada directa, con la misma URL |
| 10 | Sobre mí, 404 y menú móvil | `paso-10-sitio` | Ficha del artista, Lado C y menú móvil iguales a Figma |
| 11 | Transiciones | `paso-11-motion` | View Transitions entre rutas; sin desplazamientos con `prefers-reduced-motion` |
| 12 | SEO y compartir | `paso-12-seo` | Metadata, hreflang, sitemap, robots, JSON-LD, OG por álbum e iconos |
| 13 | Calidad | `paso-13-calidad` | Teclado, axe, Lighthouse móvil (LCP < 2,5 s, CLS < 0,1, INP < 200 ms), 320–1920 px, peso del conejo |
| 14 | Publicación | `main` | Remoto, hosting elegido, despliegue de prueba con `noindex` y aprobación del primer despliegue |

---

## Paso 1 — Entorno y repositorio

**Objetivo:** dejar la carpeta lista para trabajar con Git sin subir archivos pesados ni referencias de diseño.

- Comprobar herramientas: Node 24, npm, Git (y `gh` si se va a crear el remoto desde la terminal).
- `git init` con rama `main`.
- `.gitignore` con: `node_modules`, `.next`, `.env*`, `.codex/`, `ME.md`, `idea/`, `imagelogo/` y los archivos pesados de `design/character/` (`.blend`, `backup/`, `blockout/`, `lab/`, `sheet/`, `observations/`, renders PNG de `poses/` y `layers/`).
- Se versionan: los documentos, `content-drafts/`, `design/logo/`, `design/covers/`, los scripts y JSON del personaje y `design/character/prototype/` (las capas WebP que usará la web).
- Primer commit con la documentación.
- **Remoto en GitHub (privado):** se crea cuando el usuario lo confirme.

**Pendiente aparte:** sacar `idea/`, `imagelogo/` y lo pesado de `design/character/` a una carpeta de archivo fuera del proyecto (`PORTFOLIO.md` §11.7).

## Paso 2 — Proyecto Next.js base ✅ (pendiente de revisión)

**Objetivo:** un proyecto Next.js vacío y estricto.

- `create-next-app@16.4.0` generado en una carpeta temporal y traído aquí: App Router, TypeScript strict, Tailwind v4 (por `@tailwindcss/turbopack`), ESLint, sin `src/`, alias `@/*`. La plantilla trae **Cache Components y Partial Prefetching** activados; se mantienen.
- Documentación de Next leída en `node_modules/next/dist/docs/`: lo que afecta al proyecto está en `CLAUDE.md`.
- Scripts `typecheck` (`next typegen && tsc --noEmit`) y `check` (typecheck + lint + build). Node ≥ 24.
- ESLint ignora `design/` y `content-drafts/`.
- `CLAUDE.md` (reglas operativas), `AGENTS.md` (lo genera Next) y `README.md`.
- Página y layout provisionales; las carpetas se crean en el paso que las necesita (no se dejan vacías).
- `components.json`, `cn()` y shadcn pasan al paso 3, donde se usan.
- **Verificado:** `npm run check` en verde; `/` sale como estática y `next start` sirve `lang="es"` y el título.
- Aviso de npm sin resolver: `unrs-resolver` (dependencia de ESLint) tiene un script de instalación que npm 11 bloquea por defecto. ESLint funciona igual; no se aprueba mientras no haga falta.

## Paso 3 — Sistema de diseño en código

**Objetivo:** que el código use exactamente los tokens y estilos de Figma.

- `components.json` (shadcn `base-nova`) y `lib/utils.ts` con `cn()`, reutilizados de Vidriería.

- `globals.css`: paleta (`PORTFOLIO.md` §3.2–3.4) como variables CSS + `@theme inline`.
- `next/font`: Sora, Geist y Geist Mono (subconjuntos `latin` y `latin-ext`).
- Estilos de texto de Figma como utilidades (`display`, `h2`, `h3`, `body`, `body-sm`, `label`, `mono`).
- shadcn/ui (`base-nova`) y solo los primitivos que pide el diseño: Button, Badge, Sheet.
- Regla ESLint de capas (`PORTFOLIO.md` §7.2).
- Ruta interna `/[locale]/lab` (noindex) para ver tokens y componentes; se quita o se protege antes de publicar.

## Paso 4 — Idiomas (es/en)

**Objetivo:** todas las rutas existen en los dos idiomas desde el principio.

- `lib/i18n/config.ts` (un único array de idiomas), diccionarios `es.json` y `en.json` con tipo derivado.
- `proxy.ts`: `/` → idioma por cookie, `Accept-Language` o `es`.
- `app/[locale]/layout.tsx` como layout raíz con `<html lang>`, y selector de idioma que conserva la ruta.

## Paso 5 — Contenido tipado

**Objetivo:** todo el contenido sale de `content/` y se valida en el build.

- Tipos de `PORTFOLIO.md` §6: proyectos (unión discriminada por estado), pistas, créditos, notas, tecnologías y perfil.
- Los 5 proyectos. Vidriería con sus 5 pistas en MDX a partir de `content-drafts/vidrieria-antonio.es.md` (español primero; inglés después). Los planeados con el concepto de `BUNNY-RECORDS.md` §5.3.
- `content/profile.ts` con los datos de `ME.md` (después, `ME.md` se archiva).
- `lib/content`: lectura por idioma, tiempo de lectura calculado y comprobaciones de build (slugs duplicados, MDX que falta, créditos con tecnologías que no existen).

## Paso 6 — Layout persistente y conejo

**Objetivo:** el esqueleto que no se vuelve a montar al navegar.

- Header, footer, bandeja (modo reproductor y modo reposo) y menú móvil.
- Componente del conejo a partir del prototipo (`design/character/prototype/`): capas WebP en `public/`, grafo de poses, parpadeo, respiración y mirada, que se pausan fuera de pantalla y con `prefers-reduced-motion`.
- Dos posiciones: escenario (colección) y bandeja (resto).

## Paso 7 — Colección (Inicio)

**Objetivo:** la portada del sitio.

- Arco de portadas con flechas, teclado y desplazamiento táctil en móvil.
- Filtro por estado; selección con `CoverInfo` debajo de la portada; conejo en curiosidad mirando la central.
- Sección de contacto (#contact) como ficha técnica informativa (sin oferta de servicios), con email copiable, GitHub y LinkedIn.

## Paso 8 — Álbum y pistas

**Objetivo:** el caso de estudio completo.

- `projects/[slug]/layout.tsx` con portada, demo y cabecera fijas; `page.tsx` con pistas, créditos y notas.
- `[track]/page.tsx`: pista abierta, que sube al lugar de la primera; "Mostrar todas"; ⏮ ⏭ en la bandeja.
- Edición "planeado" (D09) sin demo ni resultados.

## Paso 9 — Fichas de tecnología

**Objetivo:** créditos compartidos con URL propia.

- `stack/[tech]/page.tsx` (página completa) y `@panel/(.)stack/[tech]` (panel lateral / hoja inferior).
- "Aparece en" derivado de los créditos; canónica a la página completa.

## Paso 10 — Sobre mí, 404 y menú móvil

**Objetivo:** las páginas del sello.

- Sobre mí como ficha del artista: cómo trabajo, gira, equipo de estudio y discografía.
- 404 "Lado C" y menú móvil abierto.

## Paso 11 — Transiciones

**Objetivo:** la sensación de una sola página que se transforma.

- View Transitions (verificar estado en la versión de Next instalada): portada → cabecera, conejo → bandeja, pistas, panel.
- Duraciones de `PORTFOLIO.md` §3.7; corte limpio si el navegador no las soporta; nada con `prefers-reduced-motion`.

## Paso 12 — SEO y compartir

**Objetivo:** que cada página se indexe y se comparta bien.

- `buildMetadata()` con canónica, hreflang y OG explícita; sitemap y robots según `SITE_NOINDEX`.
- JSON-LD (`Person`, `WebSite`, `CreativeWork`, `BreadcrumbList`); OG por álbum con la plantilla de Figma; `icon.svg` y `apple-icon`.

## Paso 13 — Calidad

**Objetivo:** cumplir `PORTFOLIO.md` §8 con mediciones, no con suposiciones.

- Teclado y foco, axe, lector de pantalla en los flujos principales.
- Lighthouse en móvil y peso del conejo (WebP, carga diferida de poses).
- Responsive de 320 a 1920 px y cabeceras de seguridad.

## Paso 14 — Publicación

**Objetivo:** primer despliegue aprobado.

- Vercel Hobby (`PORTFOLIO.md` §2.1): revisar antes que ningún texto ofrezca servicios, precios ni pagos.
- Remoto privado en GitHub, despliegue de prueba con `SITE_NOINDEX=true` y revisión.
- Dominio en Cloudflare cuando se decida; primer despliegue de producción solo con aprobación del usuario.

---

## Historial

- **2026-10-12:** primera versión. **Paso 1 hecho** (commit `51987d8`): repo con identidad personal local (`git config user.*` solo en este repo; la global es la del trabajo), `.gitignore` y `.gitattributes` (LF). Identidad global de Git cambiada a la personal (no se usa la corporativa en este PC). `gh` instalado; falta `gh auth login` y crear el remoto privado.
