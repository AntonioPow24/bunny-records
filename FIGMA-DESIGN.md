# Bunny Records — Guía de diseño en Figma

*Fase 0 del roadmap (`PORTFOLIO.md` §10). Creada: 2026-10-12.*

Qué diseñar en Figma Design, en qué orden y cómo entregarlo para que pase a código sin reinterpretaciones. La experiencia está definida en `BUNNY-RECORDS.md` §4.4 y §5, y la paleta y la tipografía en `PORTFOLIO.md` §3. Este documento no las repite: las traduce a frames, componentes y prototipo.

---

## 0. Qué estamos buscando (en un párrafo)

Un **portfolio editorial con sensación de aplicación**: un sello discográfico de autor. Se ve como **una sola pantalla que se transforma**, como Spotify o Apple Music de escritorio. Pulsas una portada y viaja a la cabecera mientras el resto de álbumes se va. Pulsas una pista y las demás se desvanecen mientras esa se despliega. Portada, minivídeo y conejo siguen en su sitio. Por debajo, cada estado es una URL real (`BUNNY-RECORDS.md` §5.4). El diseño tiene que dejar claras **tres cosas**: qué persiste, qué se mueve y hacia dónde.

Tono visual: una discoteca de autor. Fondo Midnight, portadas grandes, acentos teal, composición asimétrica y profundidad moderada. Limpio, nada recargado (`BUNNY-RECORDS.md` §3).

---

## 1. Preparar el archivo

1. Crea un archivo de Figma Design llamado **`Bunny Records — Web`** (o lo crea Claude por MCP, §9.A).
2. El plan gratuito (Starter) admite **3 páginas por archivo**, así que el contenido se agrupa en 3 páginas, cada una con **secciones** de Figma. Si más adelante pasas a Professional, se puede separar cada sección en su propia página sin rehacer nada.

| Página | Secciones dentro | Contenido |
|---|---|---|
| `01 Sistema` | Notas · Fundamentos · Componentes · Recursos | Decisiones, variables, estilos de texto, rejillas, componentes (§4), logo, poses del conejo y portadas provisionales |
| `02 Pantallas` | Escritorio · Móvil | Pantallas a 1440 × 900 y a 390 × 844 (§5) |
| `03 Prototipo` | Escritorio · Móvil | Copias de las pantallas conectadas con Smart Animate (§6) |

En el resto del documento, "página `01`/`02`/`99`" se refiere a estas secciones.

---

## 2. Fundamentos (página `01`)

### 2.1 Variables de color

Crea **dos colecciones**, igual que en el código:

- **`brand`** (primitivas): los 5 colores oficiales y los derivados de `PORTFOLIO.md` §3.2 y §3.3, con los mismos nombres (`brand-midnight`, `surface-1`, `teal-tint`, `muted-text`…).
- **`semantic`**, con el modo `dark`. El modo `ivory` (`.surface-ivory`) no cabe en Starter, que admite un solo modo por colección; se añade en código. Contiene: `background`, `foreground`, `card`, `primary`, `muted-foreground`, `border`, `ring`… Cada una es un alias de una primitiva según la tabla de `PORTFOLIO.md` §3.4.

**Regla:** en las pantallas y los componentes solo se usan variables `semantic`, nunca un HEX suelto. Así cada color pasa directo a un token de Tailwind.

Reglas de contraste que hay que respetar al diseñar (`PORTFOLIO.md` §3.5):
- Botón primario: fondo teal, texto **ink** (nunca marfil sobre teal).
- Deep Teal no se usa para texto normal.
- Sobre marfil, los enlaces van en `teal-ink`.

### 2.2 Tipografía

Estilos de texto con Sora (títulos), Geist Sans (texto e interfaz) y Geist Mono (números de pista, duraciones, etiquetas técnicas). Base de 16 px. Propuesta de escala:

| Estilo | Fuente | Tamaño / interlineado | Uso |
|---|---|---|---|
| `display` | Sora 700 | 56 / 1.1 (móvil 36) | Título del álbum |
| `h2` | Sora 600 | 32 / 1.15 (móvil 26) | Título de pista abierta |
| `h3` | Sora 600 | 20 / 1.3 | Bloques (Créditos, Notas) |
| `body` | Geist 400 | 16 / 1.6 | Texto |
| `body-sm` | Geist 400 | 14 / 1.5 | Detalles, fichas |
| `label` | Geist Mono 500 | 12 / 1.4, mayúsculas, +6 % de espaciado | `ÁLBUM · 2026`, estados |
| `mono` | Geist Mono 400 | 14 / 1.4 | `01`, `3 min` |

### 2.3 Espaciado, radios y rejilla

- **Espaciado:** variables `space-1…12` en múltiplos de 4 px (4, 8, 12, 16, 24, 32, 48, 64, 96…).
- **Radios:** `radius-sm` 6 · `radius-md` 12 (tarjetas) · `radius-lg` 20 (portadas, paneles) · `radius-full`.
- **Rejilla de escritorio:** 12 columnas, contenido máximo 1200 px, medianil de 24 px. Álbum: columna izquierda de 4 columnas (portada + demo) y derecha de 8.
- **Rejilla de móvil:** 4 columnas, márgenes de 16 px y medianil de 16 px.
- **Objetivos táctiles:** como mínimo 44 × 44 px en móvil (la norma pide 24; 44 es más cómodo).

---

## 3. Recursos (página `99`)

| Recurso | Archivo | Uso en Figma |
|---|---|---|
| Logo | `design/logo/bunny-logo.svg`, `bunny-icon.svg`, monocromos | Header, footer, favicon |
| Glifos | `design/logo/glyph-plus.svg`, `glyph-minus.svg`, `glyph-ears.svg` | Detalles gráficos, separadores, iconos de estado |
| Conejo (poses completas con fondo transparente) | `design/character/poses/*-alpha.png` | `bunny-rest-alpha` en el escenario; `bunny-curious-*`, `bunny-present-*`, `bunny-listen-alpha`, `bunny-wave-*` para los estados |
| Portadas | **Todavía no existen** (`BUNNY-RECORDS.md` §7.3) | Cuadrados con el nombre del proyecto y un degradado de la paleta. Que se note que son provisionales |
| Demo | — | Póster gris con ▶ (se sustituye por la grabación real) |

El conejo **no se redibuja** en Figma. Solo se coloca y se escala: en código se monta por capas (`design/character/layers/`).

---

## 4. Componentes (página `02`)

Construye cada uno con Auto Layout, variables `semantic` y propiedades de variante. Los nombres van en inglés porque así se llamarán en el código (`PORTFOLIO.md` §5).

| Componente | Variantes / estados | Notas |
|---|---|---|
| `Header` | escritorio / móvil | Logo, Sobre mí, Contacto, selector ES/EN |
| `FilterTabs` | Publicados · En desarrollo · Planeados · Todos; activo / inactivo / foco | El estado activo lleva texto, no solo color |
| `Cover` | `size`: arc-side / arc-center / header / mini · `state`: default / hover / selected / focus · `planned`: sí/no | Con `planned`, sello "Planeado" o "En desarrollo" sobre la portada |
| `CoverInfo` | — | Ficha breve: título, una línea, `StatusPill` y botón "Abrir proyecto" |
| `StatusPill` | published / in-development / planned | Texto + icono `+` / `−` de la marca |
| `AlbumHeader` | completo / planeado | `label` "ÁLBUM · 2026", `display` con el título y los detalles del disco: rol · estado · tiempo total |
| `AlbumEssentials` | — | Problema, para quién y participación (2 a 4 líneas) |
| `DemoPlayer` | póster / reproduciendo / sin demo (no se muestra) | Controles **solo** porque es vídeo real |
| `TrackRow` | default / hover / focus / active (abierta) / dimmed (saliendo) | `mono` "01", título y subtítulo, `mono` "3 min" |
| `TrackBody` | — | Contenedor del texto de la pista: `h2`, párrafos, imagen y cita |
| `TrackNav` | — | Solo el botón **"Mostrar todas"** (anterior/siguiente pista van en la bandeja) |
| `CreditRow` | default / hover / focus | Icono de la tecnología, nombre, función en el proyecto y › |
| `ProductionNotes` | — | Lista de aprendizajes y decisiones |
| `PlayerTray` | escritorio / móvil · `bunny`: listen / dance / wave / rest | Ranura del conejo a la izquierda, título actual, **⏮ ⏭ pista anterior/siguiente** (juntos, 44 px) y "Colección" |
| `BunnySlot` | stage (grande) / tray (pequeño) / peek (contacto) | Marco con el PNG y el halo teal bajo los pies (elipse con desenfoque) |
| `TechPanel` | lateral (escritorio) / hoja inferior (móvil) / página completa | Nombre e icono, "Aparece en" (portadas `mini` con la función en cada álbum), cerrar ✕. Sin "Cómo la uso" ni "Qué aprendí" desde la mejora 2 |
| `Button` | primary / secondary / ghost · default / hover / focus / disabled | Primario: teal + ink |
| `Scrim` | — | Atenuado del álbum detrás del panel |

---

## 5. Pantallas (páginas `03` y `04`)

Usa **contenido real**: los 5 proyectos de `PORTFOLIO.md` §1. Vidriería Antonio es el álbum completo con sus 5 pistas, y los demás son ediciones "Planeado" o "En desarrollo". **No inventes métricas, resultados ni demos.** Los textos que falten van como `[texto pendiente]`. Prueba al menos una pantalla en inglés para comprobar la longitud de los textos.

Nombre de los frames: `D01 Colección`, `M01 Colección`… (D = escritorio, M = móvil).

| # | Pantalla | URL | Qué debe verse |
|---|---|---|---|
| 01 | Colección | `/es` | Conejo grande en el centro, arco de portadas detrás, presentación breve y filtro |
| 02 | Colección · portada seleccionada | `/es` | La portada central avanza en su sitio, `CoverInfo` justo debajo y conejo (a la izquierda) en *curiosidad* mirándola |
| 03 | Colección · filtro "Planeados" | `/es` | Arco reducido y sellos visibles |
| 04 | Álbum | `/es/projects/vidrieria-antonio` | Portada y demo a la izquierda; cabecera, esenciales, pistas, créditos y notas a la derecha; conejo en la bandeja |
| 05 | Álbum · con scroll | ídem | Portada y demo **fijas**; la columna derecha se desplaza |
| 06 | Pista abierta | `/es/projects/vidrieria-antonio/como-lo-construi` | Solo la pista 03 en su fila, con `TrackBody` debajo y "Mostrar todas" al pie. Portada, demo y bandeja idénticas a 04 |
| 07 | Panel de tecnología | `/es/stack/nextjs` | Álbum 04 atenuado detrás y `TechPanel` lateral a la derecha |
| 08 | Ficha de tecnología, página completa | `/es/stack/nextjs` (entrada directa) | La misma ficha a página completa, con conejo en la bandeja |
| 09 | Álbum planeado | `/es/projects/office-to-pdf` | Sello "Planeado", concepto, problema, stack propuesto y próxima validación. Sin demo ni resultados |
| 10 | Sobre mí | `/es/about` | Perfil y enfoque; conejo en la bandeja |
| 11 | Contacto | `#contact` | Bloque de contacto con el conejo asomándose (pose de despedida) |
| 12 | 404 | — | Pequeña: "Esta pista no existe" y volver a la colección |

### 5.1 Esquemas de escritorio

```
D01 Colección
┌──────────────────────────────────────────────────────────┐
│ [logo]                       Sobre mí · Contacto · ES/EN │
│   Publicados · En desarrollo · Planeados                 │
│        ┌──┐   ┌────┐   ╭─────╮   ┌────┐   ┌──┐           │
│        │  │   │    │   │ 🐰  │   │    │   │  │           │
│        └──┘   └────┘   ╰─────╯   └────┘   └──┘           │
│      ◀        portadas en arco detrás del conejo     ▶   │
│   ┌ CoverInfo ─────────────────────────┐                 │
│   │ Vidriería Antonio · Publicado      │                 │
│   │ Una línea…      [ Abrir proyecto → ]│                 │
│   └────────────────────────────────────┘                 │
└──────────────────────────────────────────────────────────┘

D04 Álbum
┌──────────────────────────────────────────────────────────┐
│ ← Colección                                              │
│ ┌──────────┐  ÁLBUM · 2026                               │
│ │ PORTADA  │  Vidriería Antonio                          │
│ └──────────┘  Diseño y desarrollo · Publicado · 14 min   │
│ ┌──────────┐  Problema · Para quién                      │
│ │ ▶ demo   │  01  El problema               2 min        │
│ └──────────┘  02  La solución               3 min        │
│   (fijos)     03  Cómo lo construí          4 min        │
│               04  Decisiones importantes    3 min        │
│               05  Lo que aprendí            2 min        │
│               CRÉDITOS                                   │
│               Next.js ······ producción y rutas  ›       │
│               NOTAS DE PRODUCCIÓN …                      │
├──────────────────────────────────────────────────────────┤
│ 🐰  ◀ anterior   Vidriería Antonio   siguiente ▶   ⌂     │
└──────────────────────────────────────────────────────────┘

D06 Pista abierta (solo cambia la columna derecha bajo la cabecera)
│ ┌──────────┐  03  Cómo lo construí          4 min        │
│ │ PORTADA  │  ────────────────────────────────────       │
│ └──────────┘  Texto del capítulo, imágenes…              │
│ ┌──────────┐  ‹ 02 La solución    04 Decisiones ›        │
│ │ ▶ demo   │  [ ☰ Mostrar todas ]                         │

D07 Panel de tecnología
│ (álbum atenuado)              ┌────────────── ✕ ┐        │
│                               │ ⬡ Next.js        │        │
│                               │ Aparece en ▢ ▢ ▢ │        │
│                               └──────────────────┘        │
```

### 5.2 Móvil

- **M01:** el conejo arriba en el centro y debajo un carrusel horizontal de portadas (la seleccionada más grande). El filtro va en pestañas desplazables.
- **M04:** la portada se encoge a una cabecera compacta (≈ 96 px, con título y detalles al lado) que queda fija al hacer scroll. La demo va debajo, a ancho completo, y después las pistas, los créditos y las notas.
- **M06:** igual que M04; la pista abierta ocupa el ancho completo.
- **M07:** `TechPanel` como hoja inferior al 85 % de la altura, con asa.
- **Bandeja:** de 64 px de alto, con el conejo como avatar y botones de 44 px.

---

## 6. Prototipo de transiciones (página `05`)

Sirve para validar la sensación antes de programar. En código se hará con View Transitions (`BUNNY-RECORDS.md` §8), pero **Smart Animate de Figma** aproxima bien el resultado.

**La regla que lo hace funcionar:** Smart Animate une las capas que se llaman igual en los dos frames. Pon nombres idénticos a lo que persiste o viaja:

- `cover/vidrieria-antonio`: la misma portada en el arco (D02) y en la cabecera (D04).
- `bunny`: el conejo en el escenario (D01) y en la bandeja (D04).
- `track/03`: la fila de la pista en D04 y en D06.
- `demo`, `album-header` y `tray`: idénticos en D04 y D06, por lo que no se mueven.

| De → a | Disparador | Animación | Duración / curva |
|---|---|---|---|
| D01 → D02 | Clic en una portada | La portada avanza en su sitio y aparece `CoverInfo` debajo | 300 ms, ease-out |
| D02 → D04 | "Abrir proyecto" | La portada viaja a la cabecera, el conejo baja a la bandeja y el resto se desvanece | 400 ms, ease-in-out |
| D04 → D06 | Clic en la pista 03 | Las otras pistas bajan 8 px y se desvanecen; aparece `TrackBody` | 250 ms, ease-out |
| D06 → D04 | "Mostrar todas" | La inversa | 250 ms |
| D04 → D07 | Clic en un crédito | Panel desde la derecha y atenuado del fondo | 300 ms, ease-out |
| D07 → D04 | ✕ / clic en el atenuado | La inversa | 200 ms |
| D04 → D01 | ← Colección / ⌂ | La portada vuelve al arco y el conejo al escenario | 400 ms |

Las duraciones respetan `PORTFOLIO.md` §3.7 (150–400 ms). Haz al menos los flujos D01 → D02 → D04 → D06 → D04 → D01 y D04 → D07, y el equivalente en móvil.

---

## 7. Revisión antes de entregar

- [ ] Ningún color fuera de las variables; contraste según `PORTFOLIO.md` §3.5.
- [ ] Los estados de proyecto se entienden sin color (texto o icono).
- [ ] Cada componente interactivo tiene estado de **foco** visible.
- [ ] Objetivos táctiles ≥ 44 px en móvil.
- [ ] Ningún dato inventado: métricas, clientes, demos o fechas.
- [ ] No hay controles de reproducción sobre algo que no sea vídeo o audio real.
- [ ] Portada, demo y bandeja están en la misma posición exacta en D04, D05 y D06.
- [ ] Al menos una pantalla probada con textos en inglés.
- [ ] Capas con nombre (nada de `Frame 123`) y componentes usados como instancias.

---

## 8. Entrega a Claude

1. Codex analiza la sección actual, propone alternativas y refina el diseño en Figma Design cuando la conexión y sus capacidades estén comprobadas. El usuario aprueba la definitiva; el original se conserva.
2. Codex prepara un resumen compacto con sección, enlaces al original y al frame aprobado, diferencias visuales y funcionales, componentes, responsive, interacciones y animaciones, criterios de aceptación y aspectos que conservar.
3. El usuario entrega manualmente ese resumen a Claude y le indica cuándo implementar. Claude consulta los frames con las herramientas disponibles y aplica sus reglas de código y verificación; una propuesta no autoriza implementación ni cambios de tokens.
4. Las decisiones aprobadas que cambien navegación o identidad se registran en `BUNNY-RECORDS.md`; los cambios técnicos en `PORTFOLIO.md` y el avance en `DESARROLLO.md`, sin duplicar especificaciones. Reparto y límites en `AGENTS.md`.

**Espacio experimental pendiente:** `Redesign Lab` es una opción, no una página obligatoria. Evaluar primero el plan/asiento vigente, capacidades MCP, consumo de llamadas y utilidad del espacio. Preferir una copia de los frames afectados o una sección existente cuando sea suficiente y compatible con el plan. No crear un lab ni ampliar el plan por defecto.

### 8.1 T11 — Equipo de estudio: instrumentos del repertorio (2026-10-13)

**Estado: propuesta de Codex, pendiente de aprobación; sin implementación.** En `02 Pantallas`, sección independiente junto a las existentes; no se creó una página Lab. Original Sobre mí conservado (`103:2197`).

- [Propuesta completa](https://www.figma.com/design/o0r1u0aHeXmVXn2TAFME28/Bunny-Records?node-id=137-247): escritorio `137:248`, detalle móvil `137:446`, componente `StudioToolLink / T11` `137:362`.
- **Concepto:** el repertorio representa los instrumentos con los que se construye cada proyecto. Sustituir las cápsulas de herramientas por una ficha editorial con separadores, cuatro categorías numeradas y nombres enlazables. Mantener las pestañas como navegación y conservar las 15 tecnologías `inGear` actuales.
- **Responsive:** categoría a la izquierda + tres columnas de herramientas en escritorio; categoría encima + dos columnas en móvil. El detalle móvil muestra el contenido completo; al implementar, integrarlo en el panel `#gear` con su scroll interno, conservando `100dvh`, disco, conejo, cabecera y navegación.
- **Interacción:** enlaces a `/[locale]/stack/[tech]`; reposo transparente, hover con fondo/acento teal, foco de 2 px; objetivo táctil de 44 px. La propuesta incluye muestras default/hover/focus; el comportamiento navegable sigue pendiente de implementación.
- **Contenido propuesto:** «Instrumentos del estudio» y «Las herramientas con las que doy forma a cada proyecto». Traducir a ES/EN al implementar. Sin niveles de dominio, herramientas nuevas ni resultados inventados.
- **Traspaso tras aprobación:** afecta al contenido de `gear` en `app/[locale]/about/page.tsx` y sus textos en los diccionarios. Conservar `AboutTracks`, `#gear`, rutas de tecnologías y reglas del layout. Validar móvil 390×844 y 375×667, escritorio, teclado, textos EN y ausencia de scroll del documento.
- **Verificación de diseño:** 30 instancias (15 por tamaño), UI editable y tipografía Sora/Geist/Geist Mono; colores vinculados al sistema existente. Captura de composición revisada. No se probó el responsive en navegador ni se modificó el código.

---

## 9. Atajos (elegidos 2026-10-12)

### 9.0 Plan de Figma y costes (consultado el 2026-10-12)

**Registro histórico, no comprobación de cuenta en vivo:** se empezó en Starter con asiento Full y el 2026-10-12 se documentó el paso a Professional por un mes (§9.0.2). La vigencia, renovación y límites efectivos deben verificarse antes de decidir cómo trabajar. La tabla conserva los datos consultados entonces; no constituye una tarifa ni un cupo vigente confirmado.

**Conexión de Codex comprobada (2026-10-13):** cuenta personal con plan Professional, asiento Full y permiso de IA; lectura del archivo y escritura de la propuesta T11 verificadas mediante el conector Figma. `02 Pantallas` es accesible con el ID `1:21`, aunque el listado inicial sin nodo solo devolvió `01 Sistema`. Fecha de renovación y cupo restante no comprobados.

| | Starter (consulta histórica) | Professional, asiento Full (consulta histórica) |
|---|---|---|
| Precio | US$0 | US$16/mes en facturación anual; ~US$20/mes en mensual **[VERIFICAR al pagar; puede haber impuestos]** |
| Páginas por archivo | 3 | Ilimitadas |
| Archivos de diseño en el equipo | 3 (los borradores personales no tienen límite) | Ilimitados |
| Créditos de IA (First Draft, Make…) | 150/día, hasta 500/mes | 3.000/mes |
| MCP: herramientas de **lectura** (`get_design_context`, `get_screenshot`…) | **20 llamadas al mes** | 200/día (10/min) |
| MCP: herramientas de **escritura** (crear archivo, editar el lienzo) | La documentación dice que están exentas, **pero en la práctica `use_figma` sí cuenta** (ver abajo) | 200/día |
| Modos por colección de variables | **1** (no hay modo marfil en Figma; se resuelve en código) | Varios |

**Lo que pasó realmente (2026-10-12):** con unas 12 llamadas al MCP (crear el archivo, subir recursos y 9 `use_figma`) se alcanzó el límite de Starter. **`use_figma` consume cupo.** En Starter, el MCP solo da para arrancar, no para construir un archivo entero.

**Opciones para seguir:**
- **Professional un mes con facturación mensual (~US$20):** el MCP pasa a 200 llamadas al día. Después se cancela. El asiento Dev (US$12) no sirve, porque no permite editar diseños.
- **Seguir a mano en Starter:** los componentes ya están hechos; las pantallas se montan con ellos siguiendo §5, y la IA de Figma (§9.B) gasta créditos de IA, no cupo de MCP.
- **Esperar a que se renueve el cupo mensual.**

### 9.0.2 Estado documentado del archivo (revisión 2026-10-13)

**Estado frente al repositorio:** `main` ya incluye mejoras posteriores a las capturas de `mejora-3`: créditos como sobres, corrección de sus transiciones y arte de las fundas (tareas 8–10 en `DESARROLLO.md`), además de las mejoras 4–7. T4–T6 se implementaron; T9 sirvió de referencia para los sobres y la tarea 10 se hizo directamente en código. Las capturas tituladas "Actual" son una base histórica, no una reproducción confirmada de `main`. Antes de rediseñar, contrastar únicamente la sección afectada y, si hace falta, actualizar su referencia con autorización; no se ha modificado ni inspeccionado el lienzo durante esta revisión documental.

Archivo: https://www.figma.com/design/o0r1u0aHeXmVXn2TAFME28

- **Hecho:**
  - Páginas `01 Sistema`, `02 Pantallas` y `03 Prototipo`.
  - Variables `brand` (15), `semantic` (18, modo dark) y `dimension` (espaciado y radios).
  - 10 estilos de texto (Sora, Geist y Geist Mono).
  - Sección Notas; sección Fundamentos con muestras y tipografía; sección Recursos con el logo, los glifos y el componente `Bunny` (8 poses).
  - Componentes `Button`, `StatusPill`, `Tab`, `Cover`, `TrackRow`, `CreditRow`, `Header`, `CoverInfo`, `DemoPlayer`, `PlayerTray`, `TrackNav` y `TechPanel`.
- **Plan:** el mismo día se pasó a Professional (un mes, para cancelar antes de la renovación) y se completó lo que faltaba:
  - **`02 Pantallas`:** D01 Colección, D02 Colección con portada seleccionada, D04 Álbum, D05 Álbum a página completa, D06 Pista abierta, D07 Panel de tecnología, D09 Álbum planeado, M01 Colección, M04 Álbum, M06 Pista abierta y M07 Hoja de tecnología. Todas con captura de comprobación.
  - **`03 Prototipo`:** copias conectadas con Smart Animate (16 interacciones, 2 flujos de inicio) y una nota con las instrucciones para probarlo.
- **Revisión del 2026-10-12, ya aplicada:**
  - botones táctiles de 44 px (bandeja, "←", cerrar);
  - estados hover, foco y deshabilitado en `Button`, `Tab`, `TrackRow` y `CreditRow`;
  - pausa y tiempo en la demo;
  - D09 sin stack inventado;
  - álbum con scroll y capas fijas, y créditos y notas en móvil (M07 ya se puede abrir);
  - glifo `+` en "En desarrollo";
  - prueba en inglés `D01-EN`;
  - conejo a la izquierda del arco (A);
  - bandeja = pistas (B);
  - ficha debajo de la portada seleccionada (C).
- **Añadido después:**
  - componentes `Footer` y `PlayerTray` en modo `idle`;
  - D08 Ficha de tecnología a página completa, D10 Sobre mí (ficha del artista), D11 Contacto (booking), D12 404 (Lado C);
  - M10 Sobre mí, M11 Contacto, M12 404 y M13 Menú abierto;
  - plantilla OG de 1200×630.
  - `02 Pantallas` queda ordenada en secciones: Colección, Álbum, Sitio y Móvil.
- **Pulido con contenido real (2026-10-12):**
  - datos de `ME.md`: nombre, rol, bio, gira, equipo de estudio, email y GitHub (LinkedIn se oculta hasta que exista la URL);
  - los capítulos y créditos de Vidriería, a partir de `content-drafts/vidrieria-antonio.es.md`;
  - portadas provisionales generadas con la IA de Figma (`design/covers/`);
  - "Cómo trabajo" reescrito;
  - el conejo presenta al artista en lugar de una foto;
  - prototipo rehecho.
- **2026-10-12, más tarde:** Contacto (D11, M11) rediseñado como ficha técnica informativa, sin oferta freelance; los botones "Booking" de Sobre mí pasan a "Contacto"; trayectoria con "Vidriería local"; LinkedIn añadido; concepto de Office to PDF en D09.
- **Falta (para ti):** las portadas definitivas, la grabación de la demo, los años en Vidriería Garatea, el concepto de los proyectos planeados y el dominio.
- **Decisiones que salieron al diseñar:**
  - la pista elegida sube al lugar de la primera;
  - en la colección no hay bandeja (aparece al entrar en un álbum);
  - las duraciones de pista del diseño son de ejemplo.

- **2026-10-13 · limpieza y estado actual:**
  - Borradas las pantallas obsoletas de `02 Pantallas` (primera versión con scroll D01–D12/M01–M13, "v2 · Sin scroll" a mano, comparativa de luz 7.9) y todo el prototipo de Smart Animate de `03 Prototipo` (su nota ahora remite al sitio). Se conservan la plantilla OG y la especificación de luz en "Referencias vigentes".
  - Secciones **"Actual · Escritorio / Móvil"**: capturas del build (rama `mejora-3`, con las mejoras 1–3) como capas editables con `generate_figma_design`: A-D01 Colección, A-D04 Álbum, A-D06 Pista, A-D07 Panel de tecnología, A-D09 Planeado, A-D10 Sobre mí, A-D11 Contacto, A-D12 404; A-M01, A-M04, A-M06, A-M10, A-M11. Método: puppeteer con `setBypassCSP`, inyectar `capture.js` y lanzar `captureForDesign` sin esperar la promesa (no se resuelve).
  - Sección **"Mejoras · propuestas"** (sobre copias de las capturas, con variables y estilos del sistema): T4 créditos como "notas del disco" (rejilla por área, función en mono teal arriba y nombre debajo, una tarjeta en hover); T5 ficha breve de la colección como "pegatina" (sin título ni caja: estado y meta en mono, frase y ▶ "Escuchar álbum"; variante planeado con "Ver concepto"); T6 Contacto como "pase backstage" (franja All Access, nombre y rol, cifras del sello, datos en 2 columnas, corte perforado, email con "Copiar", GitHub y LinkedIn).
  - Pendiente de verificar y limpiar en `01 Sistema`: componentes de la primera versión posiblemente sin uso (`Footer`, `Header` v1, `TrackNav`, `CoverInfo`, `CreditRow`…). T4–T6 ya se implementaron; comprobar instancias y dependencias antes de proponer su eliminación, con autorización del usuario.

### 9.0.1 Cómo funciona la conexión

- **Conexión documentada de Claude:** MCP remoto de Figma (`mcp.figma.com`), sin necesidad de Figma Desktop para ese servidor. La autenticación actual de Claude y la conexión de Codex deben comprobarse por separado; tener el plugin y las skills de Figma instalados no demuestra acceso al archivo ni herramientas activas. No cambiar la configuración de Claude para conectar Codex.
- Para ver el resultado, abre el enlace del archivo en el navegador o en la app mientras Claude trabaja; los cambios aparecen en vivo.
- Lo que no se puede hacer bien con código (exploración visual, ilustración, texturas, ideas de composición) Claude te lo pasa como **prompts en inglés** para la IA de Figma (§9.B) o para tu propio trabajo.

**A. Claude monta el esqueleto en Figma.** Con el MCP de Figma, Claude crea el archivo, las páginas, las variables (§2), los componentes básicos (§4) y los wireframes en escala de grises de D01, D04, D06 y D07. Tú te encargas después del pulido visual. Es la vía más rápida y deja los nombres y las variables bien puestos desde el principio.

**B. IA de Figma (First Draft / Make).** Para explorar ideas de composición, no como diseño final. Cada prompt gasta créditos de IA (en Starter, 150 al día). Prompt de ejemplo (en inglés, porque esas herramientas responden mejor):

```
Dark, editorial developer portfolio styled as an independent record label.
Desktop 1440x900. Background #0C111C, accent #329DA8, text #F4F4F2.
Fonts: Sora for headings, Geist for body, Geist Mono for numbers.
Screen: album view. Left column (4/12): large square album cover with
rounded corners and a small video player below it, both sticky.
Right column (8/12): small mono label "ALBUM · 2026", big title,
one-line details "Design & development · Published · 14 min",
two short lines of summary, then a numbered tracklist (01–05) with
mono durations, then a "Credits" list (technology icon, name, role),
then "Production notes". Bottom: a 72px player-style tray with a small
3D vinyl-toy bunny on the left, previous/next album and a home icon.
Clean, asymmetric, generous spacing, no glassmorphism, no fake metrics.
```

---

## Historial

- **2026-10-12:** primera versión, tras cerrar la navegación (`BUNNY-RECORDS.md` §4.4, §5).
