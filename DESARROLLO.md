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
| 7.5 | Optimización (todo el proyecto) | `paso-7.5-optimizacion` | Transiciones sin tirones (ningún fotograma > 32 ms) y de ≤ 350 ms; conejo que no bloquea al navegar; Lighthouse móvil medido antes y después |
| 7.9 | Iluminación de escenario | `paso-7.9-luz` | La luz de Figma (sección "7.9 · Iluminación") en todas las páginas, con un solo elemento fijo de CSS; contraste AA intacto; sin coste medible en las transiciones |
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

## Paso 3 — Sistema de diseño en código ✅ (pendiente de revisión)

**Objetivo:** que el código use exactamente los tokens y estilos de Figma.

- `app/globals.css`: paleta oficial (`brand-*`), tokens semánticos del tema oscuro, `.surface-ivory`, radios (6/12/20), estilos de texto de Figma como utilidades (`text-display`, `text-h2`, `text-h3`, `text-body`, `text-body-sm`, `text-body-strong`, `text-label`, `text-mono`), anillo de foco teal de 2 px y `prefers-reduced-motion`.
- `lib/fonts.ts`: Sora, Geist y Geist Mono con `next/font` (`latin` + `latin-ext`).
- `components.json` (shadcn `base-nova`) y `lib/utils.ts` con `cn()`. Dependencias: `clsx`, `tailwind-merge`, `class-variance-authority`, `lucide-react`, `@base-ui/react`.
- Componentes: `ui/button` (primary · secondary · ghost; default 48 px · sm 44 px · icon 44 px; hover, foco y deshabilitado como en Figma), `patterns/status-pill` y `brand/logo`. Sheet se añade en el paso 9, cuando haga falta.
- Regla ESLint de capas: `components/{ui,patterns,brand,motion}` no pueden importar contenido, idiomas ni capas de página (probada con un import prohibido).
- `/lab` (noindex): banco de pruebas del sistema de diseño; pasa a `/[locale]/lab` en el paso 4.
- **Verificado en Chrome:** fuentes, colores, tamaño del botón y anillo de foco coinciden con Figma; sin errores en consola.

## Paso 4 — Idiomas (es/en) ✅ (pendiente de revisión)

**Objetivo:** todas las rutas existen en los dos idiomas desde el principio.

- `lib/i18n/config.ts`: un único array `["es", "en"]`, `es` por defecto, `hasLocale`, nombres de idioma, locales de Open Graph y `switchLocalePath`. `lib/i18n/localized.ts`: tipo `Localized<T>` para el contenido del paso 5.
- `dictionaries/es.json` y `en.json`. El tipo sale de `es.json` y una comprobación de tipos exige que los dos tengan las mismas claves (probado: si falta una, el typecheck falla).
- `getLocale()` y `getDictionary()` leen el idioma con `next/root-params`: cualquier Server Component lo obtiene sin pasarlo por props. Los Client Components reciben los textos ya traducidos.
- `app/[locale]/layout.tsx` es el layout raíz: `<html lang>` por idioma, metadata por idioma, `generateStaticParams` y `ensureStatic = "navigation"` (si algo vuelve dinámica una ruta, el build falla). Con Cache Components ya no existe `dynamicParams`.
- `proxy.ts`: las rutas sin idioma se redirigen a `/{idioma}/…`, primero según la cookie del selector, luego `Accept-Language` y, si no, `es`. No toca `/_next`, los archivos ni `/es` o `/en`.
- `LocaleSwitcher` (ES / EN): conserva la ruta, marca el idioma actual con `aria-current` y guarda la cookie un año.
- 404: `app/[locale]/not-found.tsx` (traducida, para `notFound()` en páginas) y `app/global-not-found.tsx` (en los dos idiomas, para URLs que no existen; flag `experimental.globalNotFound`). El diseño "Lado C" llega en el paso 10.
- `/lab` pasa a `/es/lab` y `/en/lab`.
- **Verificado:** `/` → `/es` (o `/en` con navegador en inglés; la cookie gana), `/about` → `/es/about`, `/es` y `/en` estáticas con `lang` correcto, páginas inexistentes → 404 con `noindex`, cambio de idioma y cookie probados en Chrome.
- Comportamiento aceptado: `/fr` se trata como ruta sin idioma → `/es/fr` → 404.

## Paso 5 — Contenido tipado ✅ (pendiente de revisión)

**Objetivo:** todo el contenido sale de `content/` y se valida en el build.

- `types/content.ts`: `Project` = `PublishedProject | UpcomingProject`. Un proyecto planeado o en desarrollo **no puede** tener demo, resultados ni pistas: lo impide TypeScript (probado). Pistas, créditos, notas de producción y fichas de tecnología tipadas.
- `content/technologies.ts`: 25 tecnologías con "cómo la uso" en los dos idiomas. Solo se afirma uso real; las que solo están propuestas para planeados lo dicen y no salen en "Equipo de estudio".
- `content/profile.ts`: datos de `ME.md` (bio, cómo trabajo, gira, ficha técnica y contacto). `ME.md` se puede archivar.
- `content/projects/`: Vidriería Antonio (publicado, 5 pistas, 10 créditos y notas de producción) y 4 próximos lanzamientos con el concepto, el stack propuesto y la próxima validación del reporte.
- Capítulos en MDX (`@next/mdx`), español e inglés: `content/projects/case-studies/vidrieria-antonio/{es,en}/NN-slug.mdx`. Los estilos de MDX usan los tokens (`mdx-components.tsx`).
- Portadas provisionales en `public/images/projects/<slug>/cover.jpg` (las dos con marco claro, recortadas).
- `lib/content`: proyectos ordenados, tecnologías, "aparece en", estadísticas del sello, tiempo de lectura calculado del MDX (200 palabras/min) y `validateContent()`, que se ejecuta en cada build (slugs duplicados, MDX que falta en algún idioma, créditos con tecnologías inexistentes). Probado: quitar un MDX detiene el build con un mensaje claro.
- `/lab` muestra el contenido de los dos idiomas y renderiza una pista desde MDX.
- `npm audit`: 5 avisos "high" solo en dependencias de desarrollo (`braces`, vía ESLint); 0 en producción. No se fuerza la actualización.

## Paso 6 — Layout persistente y conejo ✅ (pendiente de revisión)

**Objetivo:** el esqueleto que no se vuelve a montar al navegar.

- `app/[locale]/layout.tsx`: enlace "Saltar al contenido", header, `<main id="contenido">`, footer y bandeja. Las páginas ya no ponen su propio `<main>`.
- **Header** (Figma): logo → colección, Sobre mí y Contacto con `aria-current`, ES / EN. En móvil: ☰ abre el **menú a pantalla completa** (M13) con Base UI Dialog: trampa de foco, cierre con Esc y vuelta del foco al botón (probado); `+` en la página actual y `−` en el resto; selector de idioma y conejo.
- **Footer**: logo, © con el año del build, Sobre mí, Contacto, GitHub, LinkedIn, Créditos del sitio (→ Sobre mí, "Equipo de estudio") y ES / EN. Sin ofertas de servicios.
- **Bandeja** (`PlayerTray`): no aparece en la colección; dentro de un álbum publicado muestra el título, "5 pistas · 5 min" o "Pista 03 · …" y ⏮ ⏭ (en el álbum, ⏭ abre la 01; en la última pista ⏭ queda desactivado); en el resto (Sobre mí, ficha, planeados) queda en reposo: "Bunny Records · Elige un álbum" + "Colección". Reserva su alto para no tapar el final de la página. El modo reproductor se verá en el paso 8, cuando existan las rutas de álbum.
- **Conejo** (`components/bunny/`): motor portado del prototipo (grafo de poses con fotogramas intermedios, parpadeo, respiración, mirada al puntero con histéresis, presentación, baile). Dos modos: *full* (escenario; 96 capas) y *lite* (bandeja y menú; 6 capas: reposo + parpadeo). Se pinta primero como imagen fija desde el servidor y se sustituye por el montaje animado al descodificarse; con `prefers-reduced-motion` se queda la imagen fija. Se pausa fuera de pantalla, con la pestaña oculta y cuando Activity oculta la página. Capas en `public/bunny/` (2,5 MB en total; el reposo pesa ~111 KB).
- La portada provisional muestra el conejo completo (baila al pulsarlo) hasta el paso 7.
- Next 16.4 no deja usar `new Date()` al prerenderizar: el año del footer sale de `getBuildYear()` con `"use cache"`.
- **Verificado en Chrome:** el conejo pasa a curiosidad izquierda y a mirar arriba a la derecha según el puntero; bandeja en reposo en `/es/lab` y oculta en `/es`; vista móvil de 390 px (header, bandeja y menú) probada dentro de un iframe; sin errores en consola.

## Paso 7 — Colección, Sobre mí y Contacto, sin scroll (v2) ✅ (pendiente de revisión)

**Objetivo:** la portada del sitio y la navegación por discos (`BUNNY-RECORDS.md` §5.3.2, aprobada el 2026-10-12).

- **Una sola pantalla fija:** `<html>`/`<body>` a `100dvh` sin scroll; si algo no cabe, se desplaza dentro de `<main>` (o de su panel). Sin footer.
- **Barra** (Figma Header v2): logo = volver a la colección; discos **Sobre mí** (etiqueta teal) y **Contacto** (marfil) con `aria-current`; ES / EN. El disco activo deja su hueco (aro discontinuo). En móvil, solo los discos (sin menú ☰).
- **Transición del disco:** `<ViewTransition name="disc-about|disc-contact" share="morph">` en la barra y en la escena; el disco baja (450 ms, leve desenfoque) y el resto se funde (280 ms). La barra queda fija (`site-header`). Probado: al pasar de Sobre mí a Contacto el navegador anima los grupos `disc-about` y `disc-contact` a la vez. Sin animación con `prefers-reduced-motion`.
- **Colección** (`/[locale]`): arco circular, filtros (solo estados con álbumes), flechas, teclado, deslizar, ficha bajo la portada, conejo que mira y presenta. Todo se dimensiona desde `--cover`, que depende del alto de la pantalla: cabe sin scroll en 1920×911, 390×844 y 375×667 (medido).
- **Sobre mí** (`/[locale]/about`): escena de tocadiscos (disco girando + conejo DJ mirando el contenido) y cuatro **pistas** accesibles (`tablist`, flechas, Inicio/Fin): Quién soy · Cómo trabajo · Gira · Equipo de estudio. Cambiar de pista funde el contenido; `#bio|#principles|#tour|#gear` enlaza una pista.
- **Contacto** (`/[locale]/contact`): escena con el disco marfil y el conejo señalando; ficha técnica, email con Copiar, GitHub, LinkedIn y, al final, © y "Créditos del sitio" (→ `/about#gear`). En móvil, escena compacta (disco pequeño, sin conejo).
- **Bandeja:** solo en el flujo de proyectos.
- Se eliminaron `footer.tsx`, `mobile-nav.tsx` y `nav-links.tsx`.
- **Verificado en Chrome (build de producción):** transiciones de discos, pistas con teclado, enlace a créditos, sin scroll en escritorio y en tres tamaños móviles, sin desbordes horizontales.
- **Aviso:** el servidor de desarrollo puede quedarse con módulos antiguos tras borrar o renombrar exportaciones ("Element type is invalid… ContactSheet" / "did not produce a static shell"); se arregla reiniciando `npm run dev` (y, si persiste, borrando `.next`).

## Paso 7.5 — Optimización de todo el proyecto ✅ (pendiente de revisión)

**Objetivo:** que las transiciones y la carga se sientan inmediatas, con mediciones antes y después (no a ojo). Se adelanta parte del paso 13 porque la navegación por discos lo necesita ya.

**Medición inicial (2026-10-12, build de producción, Chrome de escritorio, Sobre mí ↔ Contacto):**

| Fase | Medido |
|---|---|
| Clic → empieza la transición | 29–37 ms (la ruta ya estaba precargada: la red no es el problema) |
| Empieza → primer fotograma animado | 47–60 ms |
| Animación (nominal 450 ms) | **~600 ms reales** |
| Peor fotograma durante la animación | **146 ms** (tirón visible; el objetivo es ≤ 32 ms) |
| Página nueva | 98 `<img>` y 339 nodos: el conejo completo crea sus 96 capas al montarse |

**Diagnóstico:** no es que se "renderice toda la página", sino que, mientras el disco viaja, el hilo principal monta el conejo completo de la página nueva (96 imágenes, grafo de poses) y el navegador aplica un desenfoque (`filter: blur`) a las instantáneas del disco en cada fotograma. Además, 450 ms es largo para un gesto que se repite.

**Hecho (2026-10-12):**

1. **Transición de discos:** 450 → 320 ms con salida suave; sin `filter: blur`; fundido del resto 200 ms; el vinilo deja de girar durante la transición (`:active-view-transition`).
2. **Conejo en pose fija:** solo reposo + esa pose + su arista. Capas en Sobre mí / Contacto: 98 → 32 (contando las dos escenas que Activity mantiene ocultas).
3. **Conejo, arranque diferido:** imagen fija hasta que termina la transición (360 ms) y el navegador está libre (`requestIdleCallback`).
4. **Activity:** al ocultarse la página el motor se pausa (no se destruye) y se reanuda al volver; solo se destruye si sale del DOM.
5. **Capas en tandas:** las capas que no son del reposo se crean de 8 en 8 en momentos libres.
6. **Pantallas táctiles:** la colección carga solo curiosidad y presentación (sin "mirar arriba"): ~40 capas menos.
7. **CSS en el HTML** (`experimental.inlineCss`): fuera 3 peticiones que bloqueaban el render.
8. **Fuentes:** solo el subconjunto `latin` (ya trae á é í ó ú ñ ü ¿ ¡); Geist Mono sin precarga. Precargas de fuentes: 6 → 2.
9. **Portadas en AVIF** con WebP de respaldo (−24 % a 384 px).
10. **Accesibilidad (WCAG 2.5.3):** el nombre accesible del selector de idioma y de las portadas del arco empieza por su texto visible.
11. Prefetch completo en los discos de la barra.

**Resultados.** Transición de discos, A/B en la misma sesión (build de producción; `main` frente a la rama), 4 navegaciones cada uno:

| | Antes | Después |
|---|---|---|
| Clic → fin de la transición | 623–738 ms | 479–519 ms |
| Fotogramas largos por navegación | 1–6 (50–146 ms) | 1 (88–117 ms) |

El fotograma largo que queda no es JavaScript nuestro (los scripts suman 6 ms): es el navegador capturando las instantáneas de la View Transition.

Lighthouse móvil (simulación por defecto):

| Página | Rendimiento | LCP sim. | TBT | Peso | Accesib. | Buenas prác. | SEO |
|---|---|---|---|---|---|---|---|
| Colección | 83 → **90** | 4,1 → 3,6 s | 220 → **50 ms** | 2,6 → **1,7 MB** | 100 | 92 | 100 |
| Sobre mí | 93 → **95** | 3,2 → 3,0 s | 50 → 40 ms | 762 → 730 KB | 100 | 96 | 100 |
| Contacto | 95 → **96** | 3,0 → 2,8 s | 50 → 40 ms | 686 → 654 KB | 100 | 100 | 100 |

**El LCP simulado no es real:** el LCP **observado** es de 95–373 ms; con limitación real (`--throttling-method=devtools`: 4G lento y CPU ×4) sale **LCP 1,3 s (colección) y 1,0 s (Sobre mí), rendimiento 96–97**. La simulación asume que el texto depende del JavaScript.

**Quedan para el paso 13** (calidad): el 404 en consola de la colección (precarga de `/es/projects/…`, desaparece en el paso 8), "imágenes de baja resolución" en las capas del conejo (falso positivo: el lienzo de 1200 px se escala con CSS) y JavaScript sin usar del framework (~29 KB).

**Bugs corregidos tras la revisión del usuario (2026-10-12):**
- El disco pasaba por delante del conejo durante la transición y "saltaba" detrás al terminar: el conejo DJ ahora tiene su propia capa de transición (`scene-bunny`, z-index 120) por encima de los discos (110), y los discos por encima de la barra (100). Comprobado leyendo el z-index de cada grupo durante la transición.
- Pulsar el disco de la sección actual relanzaba la navegación: el disco activo ya no es un enlace (marcador `aria-current="page"`).

**Cómo juzgar la velocidad:** siempre con el build de producción (`npm run build && npm run start`). `npm run dev` compila bajo demanda y lleva las comprobaciones de desarrollo de React: es bastante más lento.

## Paso 7.9 — Iluminación de escenario ✅ (aprobado por el usuario)

**Objetivo:** que el sitio no se vea plano ni oscuro sin perder sobriedad. Referencia: `idea/fondoluz1.jpg`, traducida a la marca (teal, sin vidrio). Diseño en Figma → `02 Pantallas` → "7.9 · Iluminación".

- `components/layout/stage-lights.tsx`: un único `<div>` fijo detrás del contenido (z-index −1) con degradados radiales CSS. **Luz global:** baño teal desde arriba, brillos laterales asimétricos y viñeta. **Foco por escena** (`data-scene` según la ruta, fundido de 400 ms): colección (portada central y "suelo" del arco), Sobre mí (teal detrás del disco), Contacto (marfil + teal; en móvil, sobre el disco compacto).
- Utilidad `surface-lit` (filo superior Ivory 10 %, sombra profunda y halo teal) en la ficha de la portada y las tarjetas de "Cómo trabajo".
- **Header transparente:** la luz continúa por detrás de la barra.
- Rendimiento: `contain: strict` en el bloque de luces y `will-change: opacity` en los focos, para que el fundido lo haga la GPU. Sin imágenes ni `filter`.
- **Medido:** transición de discos 482–545 ms con 1–3 fotogramas largos (antes de la luz: 479–519 ms, 1); el coste extra (~20 ms) es la luz dentro de la instantánea de la transición. Lighthouse móvil con limitación real: rendimiento 96–97, LCP 1,1–1,3 s, **contraste aprobado** en las tres páginas.

**Bug corregido en el mismo paso:** el botón para hacer bailar al conejo ocupaba toda la caja 3:4 del lienzo (301×401 px en escritorio) y tapaba las portadas de la izquierda. Ahora el contenedor deja pasar los clics y solo la silueta (25–75 % de ancho, 9–92 % de alto) es pulsable. Probado con un clic real en el hueco: selecciona la portada y el conejo la presenta.

**Observación:** justo después de reconstruir el servidor, la primera navegación puede hacer una recarga completa (el navegador tenía precargas del build anterior y Next recarga para no mezclar versiones). Es el comportamiento esperado tras un despliegue; revisar la protección de "version skew" en el paso 14.

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
