# Bunny Brand — Portfolio personal · Especificación

*Fase: planificación (sin código). Última revisión: 2026-10-12.*

Documento de referencia del portfolio. El **diseño visual lo entrega el usuario**; este documento define stack, arquitectura y base del sistema de diseño para implementarlo. Antes de cada fase se confirma aquí el alcance.

Concepto, marca, personaje y lista de imágenes: **`BUNNY-RECORDS.md`** (manda en lo visual y de interacción).

Fuentes: `~/.claude/PROJECT-PLAYBOOK.md`, `imagelogo/Palette.png` y el repositorio de **Vidriería Antonio** (`C:\APPS\vidrieria-antonio`, solo lectura), cuya arquitectura se reutiliza donde aplica.

Etiquetas: **[VERIFICAR]** = dato externo (versión, precio, límite) que hay que confirmar antes de usarlo.

---

## 1. Resumen

Portfolio de desarrollador, **bilingüe desde el inicio (es/en)** y preparado para más idiomas. Muestra perfil, tecnologías, experiencia, proyectos con su estado (completado / en desarrollo / planificado) y un medio de contacto.

**Tipo de proyecto (playbook §0): A, web de contenido con SEO**, sin base de datos, autenticación ni panel admin. Se reutiliza la arquitectura de Vidriería Antonio y se quita todo lo que dependía de Supabase.

**Proyectos:**

| Proyecto | Estado |
|---|---|
| Vidriería Antonio | Completado (MVP, en periodo de prueba con el cliente). Marca genérica a propósito: no se publica el nombre real del negocio |
| UI Component Library | Planificado (confirmado 2026-10-12) |
| Office to PDF Converter | Planificado (conceptos de todos los planeados en `BUNNY-RECORDS.md` §5.3) |
| Educational Platform | Planificado |
| AI Construction Estimator | Planificado |

No se inventan métricas, experiencia ni datos personales. Los proyectos planificados no se presentan como construidos.

---

## 2. Stack

### 2.1 Decisión

| Capa | Elección | Versión actual (npm, 2026-10-11) | Por qué |
|---|---|---|---|
| Framework | **Next.js (App Router)** | 16.4.0 | Igual que Vidriería. SEO, metadata, sitemap/robots/OG nativos, `next/image`, `next/font`. Todo el sitio se prerenderiza en build (SSG) |
| UI | **React** | 19.x | — |
| Lenguaje | **TypeScript strict** | la que fije `create-next-app` **[VERIFICAR]** | TS 7 ya existe; se usa la versión compatible con Next |
| Estilos | **Tailwind CSS v4** | 4.3.x | Igual que Vidriería: tokens como variables CSS + `@theme inline` |
| Componentes | **shadcn/ui** (estilo `base-nova`, primitivos **Base UI**) | 4.x | Igual que Vidriería (`components.json` reutilizable). Solo se añaden los componentes que pida el diseño |
| Iconos | **Lucide** | 1.x | Igual que Vidriería |
| Animación | **Motion** (antes Framer Motion; misma API, paquete `motion`) | 14.x | Solo microinteracciones puntuales; respeta `prefers-reduced-motion` |
| i18n | **Nativo de Next.js** (segmento `[locale]` + diccionarios tipados + `proxy.ts`) | — | Sin dependencias, compatible con SSG y fácil de ampliar (§4). `next-intl` queda como alternativa si en el futuro hacen falta plurales ICU complejos o rutas traducidas |
| Contenido | **TypeScript tipado + MDX** (`@next/mdx`) para el texto largo de los casos de estudio | 16.4.0 | Sin base de datos ni CMS (§6) |
| Utilidades | `clsx`, `tailwind-merge`, `class-variance-authority` | — | Vienen con shadcn; `cn()` reutilizado de Vidriería |
| Paquetes | **npm** | — | Playbook |
| Hosting | **Vercel Hobby** (decisión del usuario, 2026-10-12) | — | Permitido porque el sitio es personal e **informativo**: sus condiciones (consultadas 2026-10-12) cuentan como comercial "anunciar la venta de un producto o servicio", por eso Contacto no ofrece servicios ni disponibilidad freelance. **Regla:** no añadir precios, pagos, anuncios ni ofertas de servicios; si algún día se quieren, pasar a Netlify Free o Vercel Pro (el código es el mismo) |
| Dominio | **Cloudflare Registrar** | — | Playbook |

### 2.2 Qué se reutiliza de Vidriería Antonio

| Elemento | Origen | Cambio |
|---|---|---|
| `tsconfig.json` (strict, alias `@/*`) | Vidriería | Ninguno |
| `eslint.config.mjs` (`core-web-vitals` + `typescript`) | Vidriería | Se añade la regla de capas (§7.2) |
| `components.json` (shadcn `base-nova`, Lucide, alias) | Vidriería | Ninguno |
| `lib/utils.ts` → `cn()` | Vidriería | Sin `slugify` (los slugs se escriben a mano) |
| `lib/seo.ts` → `buildMetadata()` con imagen OG explícita, `SITE_URL`, `NOINDEX` | Vidriería | Se añaden `locale` y `alternates.languages` (hreflang) |
| `app/robots.ts`, `app/sitemap.ts`, `opengraph-image.tsx`, `icon.svg` + `apple-icon` | Vidriería | Sitemap con alternativas por idioma; sin `/admin` |
| `components/motion/reveal.tsx` (reveal con `useReducedMotion`) | Vidriería | Import de `motion/react` |
| `components/layout/container.tsx` | Vidriería | Ninguno |
| `proxy.ts` (nombre de Next 16, antes `middleware`) | Vidriería | Ahora detecta el idioma en vez de proteger `/admin` |
| Variables `NEXT_PUBLIC_SITE_URL` y `SITE_NOINDEX` | Vidriería | Ninguno |
| Organización `components/{ui,layout,sections,motion}` | Vidriería | Se añaden `patterns/`, `brand/` y `portfolio/` para la futura librería (§7) |
| Convenciones: kebab-case en archivos, PascalCase en componentes, sin comentarios de "qué hace", sin abstracciones "por si acaso" | `CLAUDE.md` de Vidriería | Ninguno |
| Flujo por fases, ramas y QA | Playbook §4 | Ninguno |

**No se reutiliza:** Supabase (cliente, migraciones, RLS, Storage, workflow keep-alive), panel admin, React Hook Form + Zod (no hay formularios), dnd-kit, compresión de imágenes en el navegador ni `revalidatePath` (no hay escrituras).

### 2.3 Descartado

Supabase, base de datos, autenticación, backend propio, Zustand, TanStack Query/SWR, `next-themes` (un solo tema oscuro), CMS externo, monorepo, paquete npm de componentes y analítica en el MVP.

---

## 3. Identidad visual

### 3.1 Logo

Definido: `imagelogo/Bunnylogo.png`. Rasgos, usos y versión SVG en `BUNNY-RECORDS.md` §2 y §7.1.

### 3.2 Paleta oficial

| Token | Nombre | HEX | Función |
|---|---|---|---|
| `brand-midnight` | Midnight Charcoal | `#0C111C` | Fondo principal |
| `brand-teal` | Signature Teal | `#329DA8` | Identidad y acentos |
| `brand-teal-deep` | Deep Teal | `#267B84` | Variantes, hover y detalles |
| `brand-ivory` | Soft Ivory | `#F4F4F2` | Textos claros y superficies |
| `brand-ink` | Ink Black | `#080A0D` | Contornos y detalles |

Distribución orientativa: 50 % oscuro · 25 % marfil · 22 % teal · 3 % negro.

### 3.3 Tonos derivados

Son mezclas o ajustes de los colores oficiales; no añaden colores de marca.

| Derivado | HEX | Uso |
|---|---|---|
| `surface-1` | `#121927` | Tarjetas, popovers |
| `surface-2` | `#182031` | Superficies secundarias, chips |
| `teal-tint` | `#112530` | Hover/selección sutil (Midnight + 14 % Teal) |
| `line` | `#263042` | Separadores decorativos |
| `control` | `#6B7689` | Bordes de controles interactivos (≥3:1) |
| `muted-text` | `#9BA3B0` | Texto secundario sobre oscuro |
| `ivory-2` | `#E6E6E2` | Superficie secundaria en zonas marfil |
| `ink-muted` | `#4A5260` | Texto secundario sobre marfil |
| `teal-ink` | `#1F6971` | Enlaces/acentos sobre marfil |
| `destructive` | `#F2555A` | Solo errores (color funcional, fuera de la marca) |

### 3.4 Tokens semánticos (Tailwind v4 + shadcn)

Tema único oscuro. Las zonas marfil usan la clase `.surface-ivory`, que reasigna los mismos tokens; así los componentes no necesitan variantes por fondo.

| Token | Base (oscuro) | `.surface-ivory` |
|---|---|---|
| `background` / `foreground` | `#0C111C` / `#F4F4F2` | `#F4F4F2` / `#080A0D` |
| `card` / `card-foreground` | `#121927` / `#F4F4F2` | `#E6E6E2` / `#080A0D` |
| `primary` / `primary-foreground` | `#329DA8` / `#080A0D` | `#1F6971` / `#F4F4F2` |
| `secondary` / `secondary-foreground` | `#182031` / `#F4F4F2` | `#E6E6E2` / `#080A0D` |
| `accent` / `accent-foreground` | `#112530` / `#F4F4F2` | `#E6E6E2` / `#080A0D` |
| `muted` / `muted-foreground` | `#182031` / `#9BA3B0` | `#E6E6E2` / `#4A5260` |
| `border` | `#263042` | `#080A0D` |
| `input` | `#6B7689` | `#4A5260` |
| `ring` | `#329DA8` | `#080A0D` |
| `destructive` | `#F2555A` | — |

### 3.5 Contraste (WCAG AA) — reglas que salen del cálculo

| Combinación | Ratio | Regla |
|---|---|---|
| Ivory sobre Midnight | 17.14 | ✅ |
| Teal sobre Midnight | 5.86 | ✅ válido para enlaces y texto de acento |
| Ink sobre Teal | 6.16 | ✅ → **botón primario: fondo teal, texto ink** |
| **Ivory sobre Teal** | **2.92** | ❌ nunca para texto |
| **Ivory / Ink sobre Deep Teal** | **4.49 / 4.01** | ❌ en texto normal (✅ a partir de 24 px). Deep Teal se reserva para hover no textual, bordes, sombras y detalles |
| **Teal sobre Ivory** | **2.92** | ❌ → en zonas marfil se usa `teal-ink` (5.75) |
| `muted-text` sobre Midnight / `surface-1` | 7.42 / 6.92 | ✅ |
| `control` sobre Midnight / `surface-1` | 4.11 / 3.83 | ✅ borde de control |
| Anillo de foco Teal sobre oscuro / Ink sobre marfil | 5.86 / 18.0 | ✅ |

### 3.6 Tipografía

Las tres familias son variables y se cargan con `next/font` (alojadas en el propio sitio, subconjunto `latin` + `latin-ext` para el español, `display: swap`). Son distintas de las de Vidriería.

| Rol | Fuente |
|---|---|
| Títulos | **Sora**: geométrica, moderna y amable |
| Texto e interfaz | **Geist Sans**: muy legible en fondo oscuro |
| Código, etiquetas y datos técnicos | **Geist Mono**: misma familia que el texto |

Escala base de 16 px; `line-height` 1.6 en el cuerpo y 1.1 en títulos con `text-wrap: balance`. Si el diseño entregado trae otra tipografía, se reemplaza solo la configuración de `next/font` y las variables CSS.

### 3.7 Motion

- Excepciones del personaje (respiración, parpadeo, perspectiva de portadas): ver `BUNNY-RECORDS.md` §8.
- CSS por defecto (hover, foco, transiciones) y CSS/JS para el personaje. Motion no está instalado; no añadirlo sin una necesidad justificada.
- **Transiciones entre rutas:** `<ViewTransition>` de React 19.3, sin flag `viewTransition` en Next.js 16.4. Comportamientos y excepciones vigentes en `DESARROLLO.md` (pasos 11 y mejoras posteriores); no asumir que todos los paneles deben animarse.
- Duraciones de 150 a 400 ms, sin bucles infinitos ni parallax.
- No se anima la opacidad del elemento LCP.
- `prefers-reduced-motion` desactiva los desplazamientos mediante CSS y el manejo del personaje en CSS/JS; no se usa `MotionConfig`.

---

## 4. Internacionalización

### 4.1 Decisión

- **Idiomas:** `es` (por defecto) y `en`, definidos en **un único array** `lib/i18n/config.ts`. Añadir un idioma consiste en sumar su código a ese array, crear su diccionario y traducir el contenido; TypeScript señala lo que falte.
- **URLs con prefijo siempre:** `/es/...` y `/en/...`. Así cada idioma es una página estática distinta, indexable y con su propio `hreflang`.
- **Segmentos de ruta iguales en todos los idiomas** (`/es/projects/x`, `/en/projects/x`) y slugs de proyecto, pista y tecnología compartidos. Si en el futuro se quieren rutas traducidas, se añaden con `rewrites` sin cambiar la estructura.
- **`/` y rutas sin prefijo:** `proxy.ts` redirige según la cookie de idioma elegido, luego `Accept-Language` y por último `es`. Su `matcher` solo cubre rutas sin prefijo de idioma, para que no se ejecute en cada petición. En Netlify corre como función edge: confirmar los límites del plan gratuito **[VERIFICAR]**. Alternativa sin función: `redirects` estático de `/` a `/es` en `next.config.ts`.
- **Selector de idioma** en el header: mantiene la ruta actual (`/es/projects/x` ↔ `/en/projects/x`) y guarda la elección en una cookie.

### 4.2 Textos de interfaz

- Diccionarios JSON por idioma: `dictionaries/es.json` y `dictionaries/en.json`.
- `getLocale()` lee el segmento actual mediante `next/root-params`; `getDictionary()` no recibe argumentos e importa dinámicamente el JSON de ese idioma. Ambos se usan en Server Components.
- El tipo `Dictionary` se deriva de `es.json`; si a `en.json` le falta una clave, el typecheck falla.
- Fechas y números con `Intl.DateTimeFormat` / `Intl.NumberFormat` según el idioma, sin librerías.
- Los Client Components reciben ya traducidos solo los textos que necesitan, por props.

### 4.3 Contenido

- Los campos traducibles usan el tipo `Localized<T> = Record<Locale, T>`. Si falta un idioma, no compila.
- Casos de estudio en MDX: **un archivo por pista y por idioma** (`case-studies/vidrieria-antonio/es/01-el-problema.mdx`…), porque cada pista tiene su propia ruta (§5).

### 4.4 SEO multilingüe

- `<html lang>` dinámico desde `app/[locale]/layout.tsx`, que actúa como layout raíz.
- `generateStaticParams` genera todas las combinaciones de idioma y slug.
- `alternates.languages` (hreflang) más `x-default` en cada página.
- Sitemap con las alternativas de cada URL.
- Open Graph con `locale` y `alternateLocale` (`es_PE` / `en_US`).

---

## 5. Arquitectura y carpetas

**Renderizado:** todo SSG, con Cache Components y Partial Prefetching activos en Next.js 16.4. Las rutas parametrizadas usan `generateStaticParams`; el layout de `[locale]` declara `ensureStatic = "navigation"`. No usar `dynamicParams` con Cache Components. Server Components por defecto; Client Components solo para lo interactivo: conejo, carrusel de portadas, filtro, bandeja, menú móvil, selector de idioma y transiciones.

**Patrón de navegación:** se ve como una sola página que se transforma, pero cada estado es una ruta real. Los `layout.tsx` de Next no se vuelven a montar al navegar, así que lo que vive en un layout persiste (el conejo no reinicia su animación; la portada y la demo no se recargan al cambiar de pista). Experiencia y motivos: `BUNNY-RECORDS.md` §4.4, §5.2 y §5.4.

**Rutas (revisadas contra el código el 2026-10-13):**

| Ruta | Contenido | Layout que persiste |
|---|---|---|
| `/[locale]` | Colección (Inicio) con filtro por estado | `[locale]/layout`: conejo + bandeja |
| `/[locale]/projects/[slug]` | Álbum: lista de pistas, créditos y notas de producción; o edición "planeado" | `projects/[slug]/layout`: portada, demo y detalles del disco |
| `/[locale]/projects/[slug]/[track]` | Pista abierta (capítulo del caso de estudio) | Ídem |
| `/[locale]/stack/[tech]` | Ficha de tecnología: **panel** sobre el álbum (ruta interceptada `(.)` en el slot paralelo `@panel`) o **página completa** si se entra directamente | — |
| `/[locale]/about` | Perfil, experiencia y enfoque | `[locale]/layout` |
| `/[locale]/contact` | Contacto como pase backstage: datos y enlaces, sin formulario ni backend | `[locale]/layout` |

No hay listado `/projects`: la colección es el Inicio.

**Estructura:**

```
portfolio-antonio/
├─ PORTFOLIO.md
├─ AGENTS.md                       # reparto y reglas de colaboración; instrucciones de Codex
├─ CLAUDE.md                       # instrucciones operativas de Claude; referencia AGENTS.md
├─ proxy.ts                        # detección de idioma
├─ app/
│  ├─ [locale]/
│  │  ├─ layout.tsx                # layout raíz: <html lang>, fuentes, header, conejo, bandeja, slot @panel
│  │  ├─ page.tsx                  # colección
│  │  ├─ projects/[slug]/
│  │  │  ├─ layout.tsx             # portada + demo + detalles (persisten entre pistas)
│  │  │  ├─ page.tsx               # lista de pistas, créditos, notas
│  │  │  ├─ [track]/page.tsx       # pista abierta
│  │  │  └─ opengraph-image.tsx
│  │  ├─ stack/[tech]/page.tsx     # ficha como página completa
│  │  ├─ @panel/
│  │  │  ├─ default.tsx            # null
│  │  │  └─ (.)stack/[tech]/page.tsx   # ficha como panel (navegación interna)
│  │  ├─ about/page.tsx
│  │  ├─ contact/page.tsx
│  │  └─ not-found.tsx
│  ├─ globals.css                  # tokens §3.4
│  ├─ sitemap.ts  robots.ts  icon.svg  apple-icon.tsx  opengraph-image.tsx
├─ components/
│  ├─ ui/                          # primitivos shadcn (Button, Badge, Sheet…)
│  ├─ patterns/                    # reutilizables y agnósticos (SectionHeading, StatusPill, TechChip, MediaCard…)
│  ├─ brand/                       # logo y piezas de marca
│  ├─ motion/                      # Reveal y similares
│  ├─ portfolio/                   # dependen del modelo de contenido (CoverArc, AlbumHeader, Tracklist, Credits, TechPanel…)
│  ├─ sections/                    # secciones de página (Collection, Contact…)
│  ├─ bunny/                       # personaje: capas, grafo de poses, colocación escenario/bandeja
│  └─ layout/                      # Header, PlayerTray, MobileNav, LocaleSwitcher, Footer, Container, SkipLink
├─ content/
│  ├─ site.ts  profile.ts  experience.ts  technologies.ts
│  └─ projects/{index.ts, <slug>.ts, case-studies/<slug>/<locale>/<nn>-<track>.mdx}
├─ dictionaries/{es.json, en.json}
├─ lib/
│  ├─ i18n/{config.ts, get-dictionary.ts, localized.ts}
│  ├─ content/                     # getProjects(locale), getProjectBySlug()…
│  ├─ seo.ts                       # buildMetadata() (de Vidriería + hreflang)
│  └─ utils.ts                     # cn()
├─ types/content.ts
├─ mdx-components.tsx
└─ public/brand/  public/images/projects/<slug>/
```

**Variables de entorno** (ninguna es secreta): `NEXT_PUBLIC_SITE_URL` (sitemap, canónicas, OG) y `SITE_NOINDEX` (`true` en previsualizaciones). Las `NEXT_PUBLIC_*` se fijan en el build: si cambian, hay que volver a desplegar.

---

## 6. Modelo de contenido

**Implementado en el paso 5** (`types/content.ts`; estados `published` · `in-development` · `planned`; los próximos lanzamientos llevan `concept`, `format` y `nextValidation`). Lo de abajo es la forma original.

Los datos estructurados van en TypeScript, que valida en build y facilita filtrar y derivar información. Solo la narrativa larga de los casos de estudio va en MDX. **Añadir un proyecto** consiste en crear `content/projects/<slug>.ts`, registrarlo en `index.ts` y, si tiene caso de estudio, añadir el `.mdx` de cada pista por idioma. Rutas, colección, sitemap y OG se generan solos. Correspondencia con la metáfora: `BUNNY-RECORDS.md` §5.1.

```ts
// Forma ilustrativa (se implementa al desarrollar)
type Locale = "es" | "en";                      // derivado de lib/i18n/config.ts
type Localized<T> = Record<Locale, T>;

type ProjectStatus = "completed" | "in-development" | "planned";

interface ProjectBase {
  slug: string;                                 // estable: no cambia tras publicar
  title: Localized<string>;
  tagline: Localized<string>;
  summary: Localized<string>;
  categories: ProjectCategory[];
  year: number;
  role: Localized<string>;                      // "Diseño y desarrollo"… (detalles del disco)
  credits: Credit[];                            // créditos = stack con su función en ESTE proyecto
  productionNotes?: Localized<string[]>;        // notas de producción = aprendizajes y decisiones
  featured: boolean;
  order: number;
  cover?: { src: StaticImageData; alt: Localized<string> };
  demo?: { src: string; poster: StaticImageData; alt: Localized<string> };  // minivídeo; solo si existe de verdad
}

interface Credit { tech: TechnologyId; role: Localized<string> }   // TechnologyId = clave de content/technologies.ts

interface Track {
  slug: string;                                 // estable y compartido entre idiomas: "el-problema"
  title: Localized<string>;
  subtitle?: Localized<string>;
  // el cuerpo es content/projects/case-studies/<project>/<locale>/<nn>-<slug>.mdx
  // readingMinutes se calcula en build a partir del MDX (la "duración" de la pista)
}

// Unión discriminada: un proyecto planificado no puede tener resultados, galería ni demo
type Project =
  | (ProjectBase & { status: "completed"; tracks: Track[]; gallery?: Image[]; results?: VerifiableResult[]; links?: ProjectLink[] })
  | (ProjectBase & { status: "in-development" | "planned"; tracks?: Track[]; plannedScope?: Localized<string[]>; demo?: never });

interface VerifiableResult { statement: Localized<string>; source: string; verifiedOn: string }

// content/technologies.ts: la ficha compartida
interface Technology { name: string; group: "frontend" | "backend" | "design" | "workflow"; inGear: boolean }  // la ficha solo muestra "Aparece en" (derivado de los créditos); sin álbumes: noindex y fuera del sitemap
// "En qué álbumes aparece" se deriva de los credits; no se escribe a mano.
```

`lib/content` comprueba en build que los slugs (de proyecto, de pista y de tecnología) no estén duplicados, que exista el MDX de cada pista en cada idioma y que todo `Credit.tech` exista en `technologies.ts`.

---

## 7. Componentes y futura UI Component Library

### 7.1 Capas

1. **`ui/`** — primitivos de shadcn adaptados a los tokens.
2. **`patterns/`** — compuestos reutilizables que reciben todo por props.
3. **`portfolio/`** — conocen el modelo de contenido y adaptan esos datos a los patrones.
4. **`sections/`** — secciones concretas de una página.
5. **`layout/`** — estructura global.

`brand/` y `motion/` son piezas reutilizables que acompañan a las capas 1 y 2.

### 7.2 Reglas para poder extraer componentes después

- `ui/`, `patterns/`, `brand/` y `motion/` **no importan** `@/content`, `@/lib/content`, `@/lib/i18n`, `portfolio/` ni `sections/`. Se hace cumplir con `no-restricted-imports` en ESLint.
- Esas capas no incluyen textos propios: los reciben ya traducidos por props.
- Solo usan tokens semánticos, nunca HEX sueltos.
- Variantes con `cva`, composición con `cn()` y polimorfismo con `render`/`asChild` de Base UI para no acoplarse a `next/link`.
- Se construye solo lo que pida el diseño. No hay paquete npm ni monorepo todavía.
- **Extracción futura:** copiar `ui/`, `patterns/`, `brand/`, `motion/`, los tokens y `lib/utils.ts` a un repositorio propio y cambiar los imports en el portfolio. Las capas 3 a 5 no cambian.

---

## 8. Calidad: SEO, accesibilidad, rendimiento y seguridad

**SEO**
- `buildMetadata()` (heredado de Vidriería) en todas las páginas, con imagen OG explícita, canónica y hreflang.
- OG generada por proyecto e idioma y Twitter `summary_large_image`.
- Sitemap y robots según `SITE_NOINDEX`.
- JSON-LD: `Person` + `WebSite` en Inicio; `CreativeWork` + `BreadcrumbList` en álbumes y pistas.
- La ficha de tecnología tiene canónica a su página completa aunque se abra como panel.

**Accesibilidad (WCAG 2.2 AA)**
- Contrastes de §3.5.
- HTML semántico con un `h1` por página, skip link y navegación completa por teclado.
- Foco visible, `aria-current` en la navegación y menú móvil con trampa de foco y cierre con `Esc`.
- Estados de proyecto con texto además del color.
- `alt` obligatorio (por idioma) y objetivos táctiles de al menos 24 px.
- `prefers-reduced-motion` respetado.

**Rendimiento**
- 100 % SSG y JavaScript mínimo, limitado a las islas cliente.
- `next/image` con import estático y `sizes` correcto. `priority` está deprecado en Next 16: usar `preload` / `fetchPriority` **[VERIFICAR en `node_modules/next/dist/docs/`]**.
- Fuentes variables con `next/font`.
- Sin scripts de terceros.
- Objetivo, medido con Lighthouse en móvil: LCP < 2.5 s, CLS < 0.1, INP < 200 ms.

**Seguridad**
- Sin secretos; `.env*` en `.gitignore`.
- Cabeceras en `next.config.ts` (`nosniff`, `Referrer-Policy`, `Permissions-Policy`, CSP básica compatible con SSG **[VERIFICAR]**).
- Enlaces externos con `rel="noopener noreferrer"`. MDX solo local.
- No se publican datos del cliente de Vidriería (nombre real, teléfonos, claves, cotización).

---

## 9. Hosting y costes

| Concepto | Coste |
|---|---|
| Vercel Hobby (sitio personal e informativo; ver §2.1) | US$0 |
| GitHub | US$0 |
| Figma Starter (diseño; si hace falta, Professional ~US$20 un solo mes, ver `FIGMA-DESIGN.md` §9.0) | US$0 |
| Dominio `.com` en Cloudflare (opcional, recomendado) | ~US$10.5/año **[VERIFICAR]** |
| Vercel Pro o plan de pago de Netlify (solo si se agota el plan gratuito) | ~US$19–20/mes **[VERIFICAR]** |

**Obligatorio: US$0.** Los deploys de producción se hacen al hacer merge de un bloque completo a `main`. El código no usa nada propio del hosting, así que mudarse es barato (playbook §1.1). **Si el portfolio llegara a vender servicios directamente** (precios, pagos), dejaría de ser personal: entonces habría que pasar a Netlify Free o a Vercel Pro. Las previsualizaciones llevan `SITE_NOINDEX=true`.

---

## 10. Roadmap

Cada fase en su propia rama. Typecheck, lint y build en verde, revisión del usuario y merge a `main` (playbook §4).

| Fase | Contenido | Criterio de aceptación |
|---|---|---|
| **0. Diseño** | El usuario diseña en Figma siguiendo `FIGMA-DESIGN.md`; se ajusta este documento | Pantallas y prototipo de transiciones aprobados; logo disponible |
| **1. Base** | `create-next-app`, leer docs de Next en `node_modules`, configs reutilizadas de Vidriería, `CLAUDE.md`, tokens, fuentes, i18n (config, diccionarios, `proxy.ts`, selector), layout (header, nav móvil, footer), primitivos necesarios, regla ESLint de capas | `/es` y `/en` navegables; un diccionario incompleto rompe el typecheck; foco y teclado correctos |
| **2. Contenido** | Tipos, `content/`, 5 proyectos en ambos idiomas, MDX de Vidriería | Un planificado con `results` no compila; los datos de Vidriería tienen fuente |
| **3. Navegación Records** | Colección con filtro, álbum, pistas, créditos, panel de tecnología, bandeja, conejo en escenario/bandeja, View Transitions, OG por proyecto | Todas las combinaciones de idioma, slug y pista estáticas; Atrás deshace cada paso; entrada directa sin animación; filtros accesibles; con `prefers-reduced-motion` no hay desplazamientos |
| **4. About y contacto** | Secciones según el diseño | Ningún texto personal sin aportar por el usuario |
| **5. Calidad** | SEO (hreflang, sitemap, JSON-LD), axe, teclado, Lighthouse, responsive 320–1920, cabeceras | Objetivos de §8 medidos y registrados |
| **6. Publicación** | Repo remoto y Netlify (con autorización), dominio, Search Console | Primer deploy de producción aprobado por el usuario |

**Post-MVP:** página `/lab` como escaparate de componentes (semilla de la UI Library), tercer idioma, analítica sin cookies y nuevos casos de estudio.

---

## 11. Pendiente del usuario

1. ~~Logo, diseño y portadas~~ → diseño cerrado en Figma (2026-10-12); portadas IA provisionales.
7. **Limpieza de la carpeta (anotado 2026-10-12):** `idea/`, `imagelogo/` y los archivos pesados de `design/character/` (`.blend`, `backup/`, `blockout/`, `lab/`, `sheet/`, renders PNG de `poses/` y `layers/`) se sacarán del proyecto a una carpeta de archivo fuera del repo. Mientras tanto, `.gitignore` los excluye. `ME.md` también se excluye; sus datos pasan a `content/profile.ts`.
2. Contenido personal: nombre público, rol, ciudad, biografía (3–4 líneas), trayectoria (años, rol, empresa), email, GitHub, LinkedIn, disponibilidad, foto o retrato (opcional) y si apruebas el "Manifiesto del sello" propuesto. En ambos idiomas, o en español para traducirlo (`BUNNY-RECORDS.md` §5.3.1).
3. ~~Repo de Vidriería~~ → **privado** (2026-10-12). Un repo público no deja que otros cambien el código (solo pueden copiarlo o proponer cambios que tú apruebas), pero expone el historial completo, la lógica y los datos de prueba del cliente. Se queda privado y el álbum no enlaza ni al repo ni a la demo temporal.
4. ~~UI Component Library~~ → planificado.
5. Dominio: aún sin decidir; primero `*.vercel.app` y al final Cloudflare. Visibilidad del repo del portfolio: pendiente.
6. ~~`Co-Authored-By`~~ → solo en los commits donde la IA hizo una parte sustancial del trabajo, no en todos.

---

## Historial

- **2026-10-12:** rutas confirmadas (pista como ruta con layout persistente, ficha de tecnología como ruta interceptada); se quita el listado `/projects`; modelo de contenido con `tracks`, `credits`, `productionNotes` y `demo`; MDX por pista; transiciones con View Transitions; fase 0 apunta a `FIGMA-DESIGN.md`.
- **2026-10-11:** primera versión.
- **2026-10-11:** se añade `BUNNY-RECORDS.md` (concepto Bunny Studio + Bunny Records); logo definido; excepciones de movimiento para el personaje.
- **2026-10-11:** simplificado a stack y arquitectura. Logo pendiente; tipografía y tonos decididos; bilingüe (es/en) desde el inicio y ampliable; reutilización explícita de la arquitectura de Vidriería Antonio.
