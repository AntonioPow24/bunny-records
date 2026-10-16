# Bunny Records — Concepto, personaje y recursos visuales

Marca, concepto, experiencia, navegación, personaje, movimiento y assets **vigentes**. Manda en lo visual y de interacción; la técnica está en `PORTFOLIO.md` y el archivo de Figma en `FIGMA-DESIGN.md`.

---

## 1. La idea en una frase

Un portfolio de desarrollador presentado como **un sello discográfico de autor**: cada proyecto es un álbum, su caso de estudio son las pistas, las tecnologías aparecen en los créditos, y un **conejo anfitrión** con aspecto de juguete de vinilo 3D acompaña la visita sin robarle protagonismo al trabajo.

Dos sistemas que trabajan juntos:

| Sistema | Qué define |
|---|---|
| **Bunny Studio** | El personaje: cómo es, sus poses y cómo se comporta |
| **Bunny Records** | La navegación: cómo se explora el trabajo |

---

## 2. Marca

### 2.1 Logo (definido)

`imagelogo/Bunnylogo.png`: cabeza de conejo **marfil** con **contorno negro grueso** y una **sombra desplazada teal** hacia abajo-izquierda que le da relieve. Rasgos de identidad que **no se cambian**:

- **Ojos en forma de cruz (`+`)**. Nunca pupilas.
- **Nariz en forma de píldora** negra.
- Orejas largas, rectas y ligeramente separadas.
- La sombra teal desplazada (es lo que da "volumen" al logo plano).

Elementos derivados que ya aparecen en la hoja del logo y se usarán como sistema gráfico: `+`, `−`, las orejas solas y el corchete `{`.

**Idea de uso:** el `−` sirve como **parpadeo** del personaje (los ojos `+` pasan a `−` durante un instante). Así el parpadeo sale del propio sistema de la marca.

### 2.2 Paleta

La paleta oficial y sus derivados están en `PORTFOLIO.md` §3.2–3.5 (Midnight Charcoal `#0C111C`, Signature Teal `#329DA8`, Deep Teal `#267B84`, Soft Ivory `#F4F4F2`, Ink Black `#080A0D`). Aplicada al personaje:

| Parte del personaje | Color |
|---|---|
| Cuerpo y cabeza | Soft Ivory (con sombreado cálido, nunca gris sucio) |
| Ojos `+`, nariz, detalles | Ink Black |
| Auriculares, interior de orejas o detalles de ropa | Signature Teal / Deep Teal |
| Luz de contorno (rim light) | Teal suave: es la traducción 3D de la sombra teal del logo |

### 2.3 Dos niveles de la marca

| Nivel | Estilo | Dónde se usa |
|---|---|---|
| **Logo** | Plano, vectorial, contorno negro + sombra teal | Header, favicon, OG, footer, pantallas pequeñas |
| **Personaje anfitrión** | Juguete de vinilo con aspecto 3D (como las referencias 4 y 5) | Inicio, apertura de proyectos, contacto |

El logo no se sustituye por el personaje. El personaje es **la versión "figura de colección"** del logo.

---

## 3. Dirección visual

**Una discoteca de autor:** fondo oscuro, portadas grandes, acentos teal, composición asimétrica, profundidad por capas y perspectiva moderada. Limpio, nada recargado.

Lo que tomamos de cada referencia:

| Referencia | Qué nos sirve | Qué no |
|---|---|---|
| `Referenceimage1.webp` (anime/manga) | Personaje protagonista **integrado** en la interfaz, saliendo de los bloques; tarjetas redondeadas; tipografía display fuerte | La paleta amarilla y el fondo claro/vidrio |
| `imagereference2.jpg` (conejo pastel) | Proporción **chibi** (cabeza ≈ cuerpo), formas simples y redondas, hoja de proporciones | Los colores pastel; las pupilas (nuestros ojos son `+`) |
| `imagereference4.jpg` (Mr. Panda) | **Acabado de juguete de vinilo**: material mate con brillo suave, piezas limpias, **hoja de tres vistas** con línea; ojos gráficos sin pupila | El casco y el exceso de accesorios |
| `imagereference5.jpg` (Audube) | Misma calidad de render; un solo accesorio fuerte que define al personaje (para nosotros: los auriculares) | El fondo azul |

**Advertencia importante:** las referencias 4 y 5 están sobre **fondo claro**. Nuestro fondo es casi negro. Un juguete marfil sobre Midnight necesita **luz de contorno (rim light) teal** y una **sombra de contacto** suave debajo; si no, parece un recorte pegado. Esto hay que tenerlo en cuenta al producir las imágenes (§6.3).

---

## 4. Bunny Studio — el personaje

### 4.1 Diseño del personaje

- Juguete de vinilo, proporción chibi (cabeza aprox. igual al cuerpo, como la referencia 2).
- Formas simples: cabeza redondeada, orejas tipo cápsula, cuerpo pequeño, brazos cortos.
- Ojos `+` y nariz píldora exactamente como el logo.
- **Un solo accesorio fijo y opcional: auriculares teal**, que lo conectan con Records. Sin vestuario distinto por sección.
- Contorno: **ninguno** (como las referencias fino 1–4). La conexión con el logo la dan la silueta, la cara y la luz teal.

### 4.2 Poses

| Pose | Cuándo aparece | Qué comunica | Cómo se obtiene |
|---|---|---|---|
| **Reposo** | Inicio y exploración | Está presente, deja protagonismo al contenido | Pose base |
| **Curiosidad** | Al seleccionar una portada | Inclina la cabeza hacia el proyecto | Base + cabeza en ángulo 3/4 + orejas inclinadas |
| **Presentación** | Al abrir un caso | Señala el título o la demo | Base + **brazo señalando** |
| **Escucha** | Al reproducir una demo | Auriculares puestos, marca el ritmo | Base + auriculares + balanceo suave |
| **Despedida** | En contacto | Saluda e invita a conversar | Base + **brazo saludando** |

Todas salen de **la misma base por capas**: solo cambian cabeza, brazos y accesorio. No son cinco ilustraciones distintas.

### 4.3 Comportamiento

| Acción | Comportamiento | Límite |
|---|---|---|
| Mirar el puntero | Cabeza inclinada unos grados; orejas acompañan con retraso | Solo cuando el puntero está cerca del personaje |
| Respirar (reposo) | Leve subida y bajada del cuerpo | Muy discreto; se pausa fuera de pantalla |
| Parpadear | Ojos `+` → `−` durante ~120 ms | Cada 4–7 s, al azar |
| Reaccionar a una portada | Gesto breve de curiosidad | Una vez por selección |
| Presentar un proyecto | Señala al abrir el álbum | Termina en pose estable |
| Bailar | Balanceo y movimiento de orejas | En la colección baila solo 4 s cada 8 s (sin forzar el reposo; se salta si está en pausa). Al pulsarlo, baile corto de 1,6 s |
| Despedirse | Saludo corto | Una vez al entrar en contacto |

Reglas: el conejo **no persigue al cursor** por la pantalla; tiene un sitio fijo por pantalla (§4.4). En móvil reacciona al toque.

### 4.4 Dónde está (decidido 2026-10-12)

| Pantalla | Sitio | Tamaño | Papel |
|---|---|---|---|
| Colección | **En el escenario, delante y a la izquierda del arco**, mirando la portada central (no la tapa) | Grande | Anfitrión: recibe al visitante y señala el trabajo |
| Álbum, pista, ficha de tecnología | **Sentado en la bandeja inferior** (reproductor), a la izquierda | Pequeño (avatar) | DJ en la consola: escucha contigo |
| Sobre mí | Bandeja inferior | Pequeño | — |
| Contacto | Junto a la ficha técnica | Mediano | Presentación (señala la ficha) |

Por qué: dentro del álbum el contenido es lo importante y un personaje animado roba la atención (el movimiento se percibe incluso en la periferia). La bandeja está en todas las pantallas, así que el conejo no desaparece y el visitante siempre sabe dónde está (memoria espacial). Al abrir un álbum, el conejo **se encoge y se desliza a la bandeja** a la vez que la portada viaja a la cabecera: son dos elementos compartidos que cuentan lo mismo, "entramos".

Poses en la bandeja: *escucha* mientras se lee una pista, *baile* mientras suena la demo, *saludo* al entrar en un álbum (las tres son poses v2; hasta tenerlas, *reposo* y *curiosidad*). Sonido apagado salvo que el visitante lo active. Con `prefers-reduced-motion`, poses estáticas.

---

## 5. Bunny Records — la navegación

### 5.1 Metáfora

| Concepto musical | Contenido real |
|---|---|
| Colección | Agrupación de trabajos |
| Álbum | Un proyecto |
| Portada | Identidad visual del proyecto |
| Detalles del disco (año · sello · duración) | Año · tu rol · estado · tiempo de lectura total |
| Pistas | Capítulos **del** caso de estudio del proyecto (un proyecto = un caso de estudio) |
| Duración de una pista | Tiempo de lectura real del capítulo (calculado, no inventado) |
| Créditos técnicos | Stack y función de cada tecnología **en ese proyecto** |
| Videoclip | Demostración del producto: clip de 6 s en bucle bajo la portada del álbum (§5.2.1) |
| Notas de producción (*liner notes*) | Aprendizajes y decisiones |
| Próximo lanzamiento | Proyecto planeado |

Una tecnología **no es una canción**: aparece en los créditos de varios álbumes con una participación distinta en cada uno, como un músico de sesión, y tiene una ficha compartida.

### 5.2 Recorrido

Todo el recorrido **se siente como una sola página que se transforma** (estilo Spotify / Apple Music de escritorio), pero cada estado tiene su URL (§5.4): el botón Atrás funciona, los enlaces se pueden compartir y Google indexa cada capítulo.

1. **Entrar en la colección** (Inicio): las portadas en arco (la central, protagonista, siempre visible entera; las demás parcialmente), el conejo delante y a la izquierda mirándola, presentación breve, accesos a Sobre mí y Contacto, filtro por estado: **Publicados · En desarrollo · Planeados**.
2. **Seleccionar una portada:** avanza un poco en su sitio y muestra justo debajo una ficha breve (título, una línea, estado, "Abrir proyecto"). Seleccionar = explorar; abrir = entrar. Flechas y selección directa, no solo deslizar. En móvil: tarjetas con desplazamiento táctil.
3. **Abrir el álbum:** la portada viaja a la columna izquierda y se convierte en la cabecera; el resto de portadas sale; el conejo se encoge y se sienta en la bandeja. Bajo la portada aparece el **clip de demo**, que empieza a reproducirse solo (§5.2.1). A la derecha: detalles del disco y lo esencial (problema, para quién, participación, estado real).
4. **Pistas = capítulos** numerados con su duración (tiempo de lectura): 01 El problema · 02 La solución · 03 Cómo lo construí · 04 Decisiones importantes · 05 Lo que aprendí. Cada uno puede tener subtítulo propio.
5. **Abrir una pista:** las demás pistas se desvanecen y la elegida se expande **dentro de la misma sección** para mostrar su texto. Portada, demo, conejo y bandeja no se mueven. Al pie: el botón **"Mostrar todas"**, que hace la animación inversa (igual que el botón Atrás).
6. **Créditos técnicos** (bajo las pistas): tecnología → función en este proyecto. Pulsar una tecnología abre su **ficha compartida como panel lateral** (hoja inferior en móvil) encima del álbum atenuado: cómo la uso, en qué álbumes aparece y qué aprendí. Al cerrarla, el álbum sigue como estaba.
7. **Notas de producción:** aprendizajes y decisiones, al final del álbum.
8. **Demostrar y volver:** el clip de demo se comporta como indica §5.2.1. **Nunca se simulan controles de reproducción sobre texto.** La bandeja inferior funciona como un reproductor: **⏮ ⏭ = pista anterior / siguiente** del álbum (en el álbum, ⏭ abre la 01) y "Colección" vuelve al arco. El cambio de álbum se hace desde la colección. No hay bandeja en la colección; al volver, la portada regresa a su sitio en el arco y el conejo al escenario.

#### 5.2.1 Clip de demo bajo la portada (decidido el 2026-10-13)

Petición del usuario. Sustituye al "minivídeo que se reproduce a mano" de la versión anterior.

- **Dónde:** solo en la vista del álbum (`/[locale]/projects/[slug]` y sus pistas), debajo de la portada, en la columna que persiste al cambiar de pista. **No va en el Inicio** (la colección de portadas en arco).
- **Qué:** un clip de **6 s, sin audio y en bucle**, grabado del producto real. Solo en álbumes publicados con grabación propia; los planeados y los que no tienen grabación no muestran nada (ni hueco ni marcador).
- **Reproducción:** empieza **solo al entrar en el álbum**. **Sin controles visibles** (ni barra, ni tiempo, ni botón de pausa dibujado).
- **Interacción:** la caja del vídeo es el control: pulsarla (clic, toque o Enter/Espacio con el foco) **alterna pausa y reproducción**. Necesita nombre accesible que cambie con el estado ("Pausar demo" / "Reproducir demo") y foco visible: es lo que cumple WCAG 2.2.2 (pausar contenido en movimiento) sin controles a la vista.
- **Cuando no se ve, está en pausa:** si el álbum queda oculto (Activity al navegar a otra sección), si sale de la pantalla o si la pestaña está oculta. Al volver a verse, sigue si no lo había pausado el visitante.
- **Movimiento reducido:** con `prefers-reduced-motion` no arranca solo; se ve el póster y pulsar la caja lo reproduce.
- **Ampliar (2026-10-14):** a la derecha del rótulo "En acción", fuera de la caja, la palabra "Ampliar" / "Expand" con un icono pequeño abre el mismo clip centrado en un modal, hasta 960 px (su tamaño real, para no verlo borroso). Palabra y no solo icono porque se explica sola; "Ver" se descartó por ambigua (el clip ya se ve). En el modal se cierra con ✕, Esc o pulsando fuera; pulsar el vídeo pausa o reanuda igual que la caja. El clip pequeño espera en pausa y sigue desde donde iba el grande; la pausa elegida y el movimiento reducido se respetan en los dos.
- **Diseño:** Figma T15 (`FIGMA-DESIGN.md` §3), implementado en `components/portfolio/demo-clip.tsx`. Con clip: Vidriería Antonio y Bunny Records.

Entrada directa por un enlace (a un álbum, una pista o una ficha): la pantalla aparece ya en su estado final, sin animación.

### 5.3 Proyectos planeados

"Edición" distinta del álbum: etiqueta visible **Planeado** o **En desarrollo**, concepto y problema, stack propuesto, boceto o prototipo marcado como tal y próxima validación. **Sin resultados ni demos inventadas.** (Coincide con la unión discriminada de `PORTFOLIO.md` §6.)

**Conceptos** (fuente: `idea/reporte-proyectos-bunny.html`, plan de producto del 2026-10-11; escalas editoriales, no métricas):

| Álbum | Concepto (una línea) | Tipo y stack propuesto | Próxima validación |
|---|---|---|---|
| UI Component Library | Extraer los patrones ya probados en el portfolio para acelerar los siguientes productos, sin crear un framework propio | Paquete React + TypeScript; Vite en modo biblioteca, Storybook; Tailwind + primitivas shadcn/Radix | Que dos proyectos la consuman sin adaptaciones frágiles |
| Office to PDF Converter | Convertir carpetas de documentos de Word, Excel y PowerPoint en PDF por lotes, con una cola clara, errores comprensibles y los originales intactos | Escritorio Windows sin conexión: Tauri + Rust + React/Vite; LibreOffice como motor (a evaluar) | Probar el motor con un corpus real y aceptar sus límites de fidelidad |
| Educational Platform (Plataforma para docentes) | Organizar varias aulas por docente y reducir el trabajo repetitivo de asistencia y evaluación | App web con login: React + Vite + TypeScript, Supabase con RLS, React Hook Form + Zod | Entrevistas con 3–5 docentes y un piloto con 2–3 aulas |
| AI Construction Estimator | Pasar de planos a cantidades y presupuestos trazables, con una IA que propone y un profesional que revisa | App web con editor: React/Vite, visor PDF y capa de geometría, Supabase; IA en servidor, desacoplada | Validar el dominio con un especialista y un corpus de planos antes de añadir IA |

Orden recomendado por el reporte: portfolio primero, la UI Library como extracción en paralelo y un solo piloto después.

### 5.3.1 Páginas del sello (diseñadas 2026-10-12)

| Página | Metáfora | Contenido |
|---|---|---|
| **Sobre mí** | **Ficha del artista** | Retrato opcional, nombre, rol y biografía. **Manifiesto del sello** (cómo trabajo; 3 principios con `+`/`−`). **Gira** (trayectoria: años, rol, empresa). **Equipo de estudio** (herramientas, sin barras de nivel; cada una abre su ficha). **Discografía** (todos los álbumes con su estado). Botones "Escuchar la discografía" y "Booking" |
| **Contacto** (`/[locale]/contact`) | **Contraportada del artista** (T14 v3) | Nombre, rol y base; **Descargar CV**; correo (`mailto`), GitHub y LinkedIn; firma «Antonio G.» junto al disco y créditos del sitio. **Informativo: no ofrece servicios ni disponibilidad freelance** (decisión 2026-10-12, para poder usar Vercel Hobby) |
| **404** | **Lado C** | "Esta pista no existe": los vinilos solo tienen lado A y B. Vinilo rayado con etiqueta "C", conejo curioso mirándolo y botón "Volver a la colección" |
| **Ficha de tecnología** (entrada directa) | Créditos compartidos | Igual que el panel, a página completa, con la bandeja en reposo |
| **Footer** | Contraportada | Logo, © y [Nombre público], Sobre mí, Contacto, GitHub, LinkedIn, **Créditos del sitio** (el stack del propio portfolio) y ES/EN |

**Bandeja fuera de un álbum** (Sobre mí, ficha, 404): modo *reposo*, con "Bunny Records · Elige un álbum" y "Colección", sin ⏮ ⏭.

### 5.3.2 v2 · Sin scroll (aprobada e implementada el 2026-10-12, paso 7)

Petición del usuario: el sitio es una sola pantalla fija; cambiar de sección es una animación, no un desplazamiento.

- **El documento nunca hace scroll.** Lo largo (pistas, créditos y notas de un álbum; el texto de una pista) se desplaza **dentro de su panel**, como en Spotify de escritorio.
- **Excepción móvil (2026-10-13, petición del usuario):** en Sobre mí y Contacto, si el contenido no cabe, se desplaza toda la vista bajo la cabecera fija (no solo el panel de la pista). En escritorio, el bloque de Sobre mí arranca arriba para que las pestañas no cambien de sitio entre pistas.
- **Barra:** logo (= volver a la colección), dos **discos** (Sobre mí, etiqueta teal; Contacto, etiqueta marfil) y ES / EN. Al elegir un disco, **baja de la barra a la escena** (transición compartida) y el contenido anterior se desvanece; en la barra queda su **hueco** (aro discontinuo). En móvil, los discos sin texto sustituyen al menú ☰.
- **Escena de Sobre mí y Contacto = tocadiscos:** disco grande a la izquierda y el conejo de DJ a su lado (mira o señala el contenido).
- **Sobre mí se divide en "pistas"** (01 Quién soy · 02 Cómo trabajo · 03 Gira · 04 Equipo de estudio) para caber sin scroll. "Discografía" desaparece: la colección ya lo es.
- **Contacto pasa a ser una vista propia** (sale del final del inicio) y recoge lo que tenía el footer (©, créditos del sitio). **Ya no hay footer.**
- **Volver:** solo el flujo de proyectos tiene "← Colección"; Sobre mí y Contacto no, se vuelve con el logo. La **bandeja** solo existe en el flujo de proyectos (reproductor); en Sobre mí y Contacto el conejo está en la escena.
- Rutas: se mantienen `/[locale]/about` y `/[locale]/contact` (URL compartible, botón Atrás del navegador), con View Transitions.
- Figma: sección "v2 · Sin scroll" en `02 Pantallas` (V2-D01, V2-D10, V2-D10b, V2-D11, V2-D04, V2-M01, V2-M10, V2-M11) y flujo "v2 · Sin scroll" en `03 Prototipo`. Componentes nuevos: `DiscGraphic`, `NavDisc` y `Header v2`.

### 5.4 Rutas (confirmadas 2026-10-12; implementación en `PORTFOLIO.md` §5)

| Ruta | Pantalla | Qué persiste al llegar desde la anterior |
|---|---|---|
| `/[locale]` | Colección | Conejo (en el escenario). La bandeja no se muestra aquí: sube al entrar en un álbum |
| `/[locale]/projects/[slug]` | Álbum: pistas, créditos y notas (o edición "planeado") | Conejo (en la bandeja); la portada viaja |
| `/[locale]/projects/[slug]/[track]` | Pista abierta dentro del álbum | Portada, demo, cabecera, conejo y bandeja |
| `/[locale]/stack/[tech]` | Ficha de tecnología: panel sobre Sobre mí si vienes de "Equipo de estudio" (los créditos de los álbumes son estáticos desde 2026-10-13); página completa si entras directo | La página de origen, atenuada detrás |
| `/[locale]/about` | Sobre mí | Conejo y bandeja |
| `#contact` | Contacto (con la pose de despedida) | — |

"Pista como ruta" **no es otra página**: visualmente es la animación de §5.2 paso 5; solo cambia la dirección en la barra del navegador. No hay listado `/projects` aparte: la colección es el Inicio.

---

## 6. Personaje: cómo se produce (decidido)

- El aspecto 3D viene del **render**, no de 3D en tiempo real: capas renderizadas en Blender (WebP) animadas con CSS/JS. Sin Three.js, Rive, Spline ni Lottie (decisión C9: basta con CSS).
- Fuente única del personaje: `design/character/bunny.blend` (no versionado). Capas para la web: `design/character/layers/` + `layers.json` → `public/bunny/`; versiones de media resolución en `public/bunny/sm/` con `node scripts/bunny-small.mjs`.
- "left/right" = lado de la **pantalla**. Una cabeza completa por pose y estado de ojos; fotogramas intermedios t25/t50/t75 entre poses.
- Proceso completo (modelado, poses, capas, intermedios): skill `blender-character-renders`.
- El conejo nunca es el LCP: primero la imagen fija y luego la animación.

---

## 7. Assets: convenciones vigentes

- Masters en sRGB y alta calidad, fuera de `public/`; las versiones web (AVIF/WebP, tamaños responsive) se generan a partir de ellos. Nombres en minúsculas con guiones.
- **Sin texto dentro de las imágenes**: el texto va en HTML (traducible, accesible, indexable).
- **Portadas:** una por proyecto, 2000 × 2000 px sin texto, estilo común de discografía; los planeados se marcan en CSS, no con otra imagen. Vinilos, surcos, brillos y texturas se hacen en CSS/SVG. Las actuales son provisionales (`design/covers/`).
- **Videoclip** (§5.2.1): grabación real de 6 s, sin audio, en `public/demos/<slug>/<slug>-demo-6s.{mp4,webm}` + `poster.jpg` (primer fotograma, para que el bucle y la pausa empiecen en la misma imagen) y el campo `demo` del proyecto. Sin datos reales del cliente en Vidriería. Receta (`-ss`/`-t` eligen el tramo; `-an` quita el audio):

```
ffmpeg -i original.mp4 -ss 0 -t 6 -vf "scale=960:540:flags=lanczos,fps=30" -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 26 -preset slow -an -movflags +faststart <slug>-demo-6s.mp4
ffmpeg -i original.mp4 -ss 0 -t 6 -vf "scale=960:540:flags=lanczos,fps=30" -c:v libvpx-vp9 -crf 36 -b:v 0 -an <slug>-demo-6s.webm
ffmpeg -i <slug>-demo-6s.mp4 -frames:v 1 -vf scale=720:-2 -q:v 4 poster.jpg
```

- Iconos de tecnologías, favicon, imágenes OG, fondos y degradados se generan en código; no se producen a mano.

---

## 8. Movimiento (actualiza `PORTFOLIO.md` §3.7)

`PORTFOLIO.md` §3.7 decía "sin bucles infinitos ni parallax". Con el personaje se ajusta así:

- **Permitido:** la respiración y el parpadeo del conejo (bucle muy sutil) y una perspectiva moderada en la colección de portadas.
- **Condiciones:** se pausan fuera de pantalla y en pestañas ocultas; desaparecen con `prefers-reduced-motion` (se muestra la pose fija).
- **Interfaz:** sigue igual (150–400 ms, CSS por defecto, Motion cuando CSS no basta).
- **Transiciones entre rutas** (portada → cabecera, conejo → bandeja, pistas → pista abierta, apertura del panel de tecnología): **View Transitions** del navegador (`<ViewTransition>` de React / `viewTransition` de Next). Se descarta `layoutId` de Motion para esto porque sus animaciones de salida con App Router necesitan trucos frágiles. Sin soporte, la navegación funciona igual sin animación **[VERIFICAR estado en Next 16.4 al implementar]**. Duración: hacia el máximo del rango (~350–400 ms) para la portada; 200–250 ms para las pistas.
- **Pistas:** las no elegidas se desvanecen y bajan unos píxeles; la elegida **sube al lugar de la primera** y su contenido se despliega debajo (así el texto queda a la vista sin desplazarse). Con `prefers-reduced-motion`: fundido corto o corte.
- **Sin sonido** por defecto.
