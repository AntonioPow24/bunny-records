# Bunny Records — Concepto, personaje y recursos visuales

*Fase: planificación (sin código). Última revisión: 2026-10-12.*

Este documento define **la marca, el concepto y la experiencia** del portfolio. Es el complemento creativo de `PORTFOLIO.md`, que sigue siendo la especificación técnica (stack, i18n, SEO, arquitectura). Si los dos documentos se contradicen en algo visual o de interacción, manda este; en lo técnico, manda `PORTFOLIO.md`.

Plan de producción de imágenes por fases (logo y personaje): **`PLAN-IMAGENES.md`**.

Fuentes: `idea/PortfolioIdea.txt`, `imagelogo/Bunnylogo.png`, `imagelogo/Palette.png` y las referencias de `idea/`.

Reparto de trabajo: **las imágenes las produce el usuario**; Claude define qué hace falta, las convierte a formatos web, monta la animación y construye la web.

Etiquetas: **[VERIFICAR]** = dato externo (tamaño de librería, plan de precios) que hay que confirmar antes de decidir.

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
- Contorno: **ninguno** (como las referencias fino 1–4). La conexión con el logo la dan la silueta, la cara y la luz teal. Detalle en `PLAN-IMAGENES.md` §4.

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
| Bailar | Dos balanceos y movimiento de orejas | Al pulsar el conejo; dura unos segundos |
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
- **Diseño:** Figma T15 (`FIGMA-DESIGN.md` §8.3), aprobado e implementado el 2026-10-13 (`components/portfolio/demo-clip.tsx`). Falta solo la grabación de cada proyecto: hasta entonces ningún álbum muestra el bloque.

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
| **Contacto** (`#contact`, final del Inicio y footer) | **Ficha técnica** (contraportada del disco) | "Quién está detrás del sello": rol, empresa actual, base, especialidad, qué estoy explorando y qué hay en el sello; después, "Dónde encontrarme" (email con "Copiar", GitHub, LinkedIn). **Informativo: no ofrece servicios ni disponibilidad freelance** (decisión 2026-10-12, para poder usar Vercel Hobby). Conejo en *presentación* señalando la ficha |
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

## 6. Cómo conseguir un protagonista "3D" sin que pese

### 6.1 ¿Hace falta Three.js? → **No.**

El aspecto 3D de las referencias 4 y 5 viene **del render** (material, luz, sombras), no de que el navegador calcule 3D en tiempo real. El conejo solo necesita inclinar la cabeza unos grados, mover orejas y brazos, respirar y bailar un poco: eso se resuelve con **imágenes renderizadas en 3D, separadas por capas y animadas en 2D**. Es la técnica de muchas webs de marca y juegos 2.5D.

Comparación:

| Opción | Peso aprox. en el navegador | Aspecto 3D | Riesgo "papel recortado" | Trabajo de producción | Veredicto |
|---|---|---|---|---|---|
| **A. Capas renderizadas (PNG→AVIF/WebP) + CSS/Motion** | ~150–300 KB de imágenes; 0 KB de librería extra (Motion ya está en el stack) | Alto (es un render real) | Bajo si las capas se preparan bien (§6.2) | Medio | ✅ **Recomendada para v1** |
| **B. Rive** (huesos + deformación de malla + máquina de estados) | Runtime de cientos de KB **[VERIFICAR]** + archivo `.riv` | Alto si se importan las capas renderizadas como imágenes deformables | Muy bajo: las piezas se doblan, no solo giran | Alto (aprender Rive; exportar puede requerir plan de pago **[VERIFICAR]**) | 🔄 Mejora para v2 si A se queda corta |
| **C. Three.js + modelo GLB** | Three ≈ 150–180 KB gzip **[VERIFICAR]** + modelo 0.3–2 MB + coste de GPU en móvil | Máximo (3D real, gira libremente) | Ninguno | Muy alto: modelado, UV, materiales, rig y animaciones | ❌ Desproporcionado para un portfolio |
| D. Spline | Runtime pesado + marca de agua en el plan gratuito **[VERIFICAR]** | Alto | Ninguno | Bajo | ❌ Peso y dependencia |
| E. Lottie | Ligero | Bajo (vectorial plano) | Bajo | Requiere After Effects | ❌ No da el look 3D |
| F. Vídeo con transparencia | Pesado; el canal alfa da problemas entre navegadores | Alto | Ninguno | Medio | ❌ Solo para piezas puntuales, nunca para la mirada |

**Recomendación:** opción **A** en la v1. Si en la prueba (§9) se nota rígido, pasar a **B** reutilizando las mismas capas. Three.js solo tendría sentido si quisiéramos girar al personaje 360° o una escena 3D navegable, y no es el caso.

### 6.2 Por qué a veces parece "papel recortado" y cómo lo evitamos

El efecto aparece cuando se rotan trozos planos de una ilustración que **no fueron pensados para moverse**. Reglas para las imágenes y para la animación:

1. **Zonas de solape ocultas.** Cada pieza continúa por debajo de su vecina. La base de cada oreja entra varios píxeles dentro de la cabeza; el hombro del brazo, dentro del torso; el cuello, dentro de la cabeza. Al girar nunca se ve un hueco ni un borde cortado.
2. **Nada de "huecos" en la capa de abajo.** Si el brazo tapa parte del torso, el torso tiene que estar **completo** (pintado o renderizado) debajo del brazo.
3. **Pivotes en las articulaciones**, dentro de la zona de solape (base de oreja, hombro, cuello).
4. **Ángulos pequeños.** Rotar una imagen renderizada también rota su luz; hasta ~6–8° no se nota. Para girar la cabeza más, **cambiamos a otra imagen renderizada en ese ángulo** (frente → 3/4) con un fundido corto oculto por el propio movimiento.
5. **Movimiento secundario.** Las orejas llegan un poco después que la cabeza y rebotan suave (física de muelle). Esto, más que nada, es lo que hace que parezca vivo y no cartón.
6. **Squash & stretch mínimo.** Al respirar, el cuerpo se estira/encoge un 1–2 % en vertical; la sombra de contacto crece y se reduce a la vez.
7. **Misma luz en todas las piezas.** Idealmente todas las capas salen **del mismo render** (§6.3); así el sombreado encaja al milímetro.
8. **Sin contorno en los bordes de corte.** Si el personaje lleva contorno, solo en el borde exterior real, nunca en la línea donde se separan dos piezas.
9. **Rendimiento:** solo se animan `transform` y `opacity`; el seguimiento del puntero escribe directamente en las capas (sin re-renderizar React); se detiene fuera de pantalla con `IntersectionObserver`.

### 6.3 Cómo producir las imágenes con aspecto 3D

| Vía | Cómo | Ventajas | Riesgos |
|---|---|---|---|
| **1. Blender** (recomendada si puedes hacerlo o encargarlo) | Modelar el conejo con formas simples, material de vinilo, luz principal arriba-izquierda + rim light teal; renderizar **cada pieza por separado con transparencia** (capas de vista / holdout) desde la misma cámara | Luz idéntica en todas las capas; renderizar nuevos ángulos o poses es inmediato; el mismo archivo sirve si algún día se quiere 3D real | Hay que modelar (el personaje es simple: es asequible) |
| **2. IA + retoque** | Generar la hoja de personaje y la pose base con IA; separar las piezas en Photoshop/Krita/Photopea y **pintar lo que queda oculto** debajo de cada pieza | Rápido para conseguir el look | Cada nueva generación cambia proporciones, luz y detalles. Usar la IA **solo para la imagen maestra** y derivar todo lo demás de sus capas; nunca generar cada pose por separado |
| **3. Vector con degradados** (Figma/Illustrator) | Dibujar el conejo en SVG con sombreados por degradado | Pesa poquísimo y escala perfecto; ideal para Rive | Se ve "ilustración", no "juguete 3D" |

Sea cual sea la vía: **una sola imagen maestra aprobada** y todo lo demás derivado de ella.

**Recomendado (2026-10-11), pendiente de que confirmes instalar Blender: vía 1, Blender, con el conector MCP para que Claude construya y renderice el modelo.** Pasos en `PLAN-IMAGENES.md` §6.

### 6.4 Presupuesto de peso

| Elemento | Objetivo |
|---|---|
| Imagen fija del personaje (primera pintura, sin JS) | ≤ 80 KB (AVIF) |
| Todas las capas del personaje en v1 | ≤ 300 KB, cargadas después del contenido principal |
| Librerías nuevas por el personaje | 0 en la v1 (CSS + Motion, que ya está en `PORTFOLIO.md`) |
| Portada en la vista de colección | ≤ 120 KB cada una a tamaño de pantalla |

El conejo **no puede ser el LCP** que retrase la página: se muestra primero la imagen fija y la animación se activa después.

---

## 7. Lista de imágenes que necesito

Convenciones para todo lo que entregues:

- **Espacio de color sRGB.** Fondo **transparente** cuando la pieza no es rectangular.
- **Masters en alta calidad** (PNG o el formato original). Yo genero las versiones AVIF/WebP y los tamaños responsive; **no las comprimas tú**.
- Nombres en minúsculas con guiones: `bunny-ear-left.png`, `cover-office-to-pdf.png`.
- **Sin texto dentro de las imágenes** (títulos, etiquetas): el texto va en HTML para que se traduzca (es/en), lo lean los buscadores y sea accesible.
- Masters en `design/source/` (no se publican); yo coloco las versiones web en `public/`.

### 7.1 Marca

| # | Archivo | Formato | Detalle | Prioridad |
|---|---|---|---|---|
| M1 | Logo completo | **SVG** vectorial limpio (no un "auto-trace" con miles de nodos) | Cabeza + contorno + sombra teal. Si solo tienes el PNG, **lo puedo redibujar yo en SVG**: son formas simples | v1 |
| M2 | Logo monocromo | SVG | Versión en marfil y versión en negro, sin sombra teal | v1 |
| M3 | Icono simplificado | SVG | Legible a 16–32 px (favicon); orejas y ojos más gruesos | v1 |
| M4 | Glifos `+`, `−`, orejas, `{` | SVG | Para el sistema gráfico. También los puedo extraer yo del logo | v1 |
| M5 | Foto o avatar tuyo | PNG/JPG ≥ 1200 px | Opcional, para Sobre mí | Opcional |

El favicon, `apple-icon` y las imágenes Open Graph **los genero yo** a partir de M1–M3.

### 7.2 Personaje (Bunny Studio)

**Lienzo común:** todas las capas en **el mismo lienzo (p. ej. 1200 × 1600 px) y en su posición exacta**, como si exportaras cada capa de un mismo archivo sin recortar. Así encajan solas en la web. El personaje mide en pantalla unos 400 px de alto en escritorio y 220 px en móvil; el lienzo a 3× da nitidez en pantallas retina.

| # | Pieza | Formato | Detalle | Fase |
|---|---|---|---|---|
| P0 | **Hoja de personaje** (frente, 3/4, perfil, espalda) | PNG/JPG | Referencia de proporciones como las refs 4 y 5. **No se publica** | Antes de todo |
| P1 | **Personaje completo en reposo** (una sola imagen) | PNG transparente | Imagen fija: primera pintura, sin JS y movimiento reducido | v1 |
| P2 | Cuerpo / torso | PNG transparente, mismo lienzo | Completo por debajo de brazos y cabeza (§6.2) | v1 |
| P3 | Cabeza de frente **sin ojos** | ídem | Los ojos van en capa aparte | v1 |
| P4 | Ojos `+` | ídem | Abiertos | v1 |
| P5 | Ojos `−` | ídem | Parpadeo | v1 |
| P6 | Oreja izquierda / P7 Oreja derecha | ídem, **una por archivo** | Con la base prolongada dentro de la cabeza | v1 |
| P8 | Brazo izquierdo en reposo / P9 Brazo derecho en reposo | ídem | Con el hombro prolongado dentro del torso | v1 |
| P10 | Brazo derecho **señalando** | ídem | Pose Presentación | v1 |
| P11 | Sombra de contacto | PNG transparente | Elipse suave y difusa bajo los pies (también puedo hacerla en CSS) | v1 |
| P12 | Cabeza en **3/4 izquierda** / P13 **3/4 derecha** (sin ojos) | ídem | Para Curiosidad y para mirar más allá de unos grados | v1 si es posible; si no, v2 |
| P14 | Ojos `+` para cada cabeza 3/4 | ídem | Desplazados según el ángulo | Junto a P12–P13 |
| P15 | Brazo derecho **saludando** | ídem | Pose Despedida | v2 |
| P16 | **Auriculares**: diadema (delante) y almohadillas izq./der. | ídem, piezas separadas | Para Escucha y el baile | v2 |
| P17 | Brazos para el baile (arriba / en jarra) | ídem | Opcionales: el baile puede hacerse solo con balanceo y orejas | v2 |

**Pivotes:** junto con las capas, una imagen (o el archivo de capas `.psd` / `.kra` / `.blend`) donde marques el punto de giro de cada pieza: base de cada oreja, cuello, hombros. Si entregas el archivo de capas original, mucho mejor.

**Iluminación (si renderizas):** luz principal arriba-izquierda, luz de relleno suave, **rim light teal** desde atrás, sin sombra proyectada en el suelo dentro de las capas (la sombra va en P11). Fondo transparente.

### 7.3 Portadas (Bunny Records)

| # | Imagen | Formato | Detalle |
|---|---|---|---|
| C1–C5 | Una portada por proyecto (Vidriería Antonio, UI Component Library, Office → PDF, Plataforma educativa, AI Construction Estimator) | PNG/JPG **2000 × 2000 px** (1:1) | Sin título ni texto. Dejar respirar el centro: en la vista de álbum se recorta y se transforma en cabecera |
| C6 | Variante "Planeado" | — | **No hace falta:** la edición planeada se marca con un tratamiento en CSS (etiqueta, desaturado, trama). Si quieres un boceto propio por proyecto, en el mismo formato y marcado como boceto |

Que las cinco portadas compartan un estilo (misma técnica, paleta de marca) pero se distingan entre sí, como una discografía.

Los **vinilos** que asoman detrás de las portadas, los surcos, los brillos de discoteca y la textura de fondo **los hago yo en CSS/SVG**: no necesitan imagen.

### 7.4 Demos y capturas (por proyecto que exista de verdad)

| # | Recurso | Formato | Detalle |
|---|---|---|---|
| D1 | Clip de demo ("videoclip", §5.2.1) | Grabación de pantalla en MP4, 1920 × 1080 o mayor; el tramo útil se recorta a 6 s | Sin audio. A partir de la grabación se generan MP4 H.264 + WebM ligeros al tamaño de la caja, en bucle limpio, y la imagen de póster |
| D2 | Capturas de escritorio | PNG 1920 × 1200 (16:10) | 3–6 por proyecto, de pantallas reales |
| D3 | Capturas de móvil | PNG a 3× (p. ej. 1170 × 2532) | 2–3 por proyecto |
| D4 | Bocetos de proyectos planeados | PNG/JPG | Solo si existen, y se muestran rotulados como boceto |

Ojo con Vidriería Antonio: sin datos reales del cliente en las capturas (`PORTFOLIO.md` §8).

### 7.5 Lo que **no** necesitas producir

Iconos de tecnologías de los créditos (React, Tauri, Rust…: uso iconos SVG de librería, revisando sus condiciones de marca), favicon e imágenes OG, fondos, texturas, vinilos, brillos y degradados de la "discoteca", y la sombra de contacto si prefieres que sea CSS.

---

## 8. Movimiento (actualiza `PORTFOLIO.md` §3.7)

`PORTFOLIO.md` §3.7 decía "sin bucles infinitos ni parallax". Con el personaje se ajusta así:

- **Permitido:** la respiración y el parpadeo del conejo (bucle muy sutil) y una perspectiva moderada en la colección de portadas.
- **Condiciones:** se pausan fuera de pantalla y en pestañas ocultas; desaparecen con `prefers-reduced-motion` (se muestra la pose fija).
- **Interfaz:** sigue igual (150–400 ms, CSS por defecto, Motion cuando CSS no basta).
- **Transiciones entre rutas** (portada → cabecera, conejo → bandeja, pistas → pista abierta, apertura del panel de tecnología): **View Transitions** del navegador (`<ViewTransition>` de React / `viewTransition` de Next). Se descarta `layoutId` de Motion para esto porque sus animaciones de salida con App Router necesitan trucos frágiles. Sin soporte, la navegación funciona igual sin animación **[VERIFICAR estado en Next 16.4 al implementar]**. Duración: hacia el máximo del rango (~350–400 ms) para la portada; 200–250 ms para las pistas.
- **Pistas:** las no elegidas se desvanecen y bajan unos píxeles; la elegida **sube al lugar de la primera** y su contenido se despliega debajo (así el texto queda a la vista sin desplazarse). Con `prefers-reduced-motion`: fundido corto o corte.
- **Sin sonido** por defecto.

---

## 9. Alcance de la v1 y orden de trabajo

**v1:** colección, vista de álbum con pistas, créditos técnicos y ficha de tecnología, con las transiciones de §8. Personaje en **reposo, mirada (y parpadeo) y presentación**. El baile, la escucha, la despedida y las colecciones por género ("Web", "Herramientas", "Experimentos") entran cuando la navegación esté probada en móvil.

Orden propuesto:

1. **Hoja de personaje (P0) y pose maestra (P1).** Revisamos juntos identidad, proporción y acabado sobre fondo Midnight.
2. **Prueba técnica de animación** (antes de producir todas las capas). Puedo montarla **ya** con el logo separado en capas SVG (cabeza, orejas, ojos `+`/`−`) para validar mirada, parpadeo, respiración y baile, medir el peso y ver cómo se siente. Cuando lleguen P2–P11, se sustituyen las piezas sin tocar la lógica.
3. **Capas del personaje v1 (P2–P11)** y, si es posible, cabezas 3/4 (P12–P14).
4. **Portadas (C1–C5)** y logo en SVG (M1–M4).
5. Desarrollo según el roadmap de `PORTFOLIO.md` §10.

---

## 10. Decisiones pendientes

1. ~~Vía de producción del personaje~~ → Blender + MCP (hecho; ver `PLAN-IMAGENES.md` §6).
2. ~~Contorno en el personaje 3D~~ → sin contorno.
3. ~~Auriculares~~ → colgados del cuello en reposo, de gomita teal; puestos en Escucha (poses v2).
4. ~~Prueba técnica~~ → hecha con el personaje real: `design/character/prototype/index.html`.
5. ~~Logo en SVG~~ → redibujado (`design/logo/`); falta tu revisión de `design/logo/preview.html` (L4).
6. ~~Rutas~~ → confirmadas (§5.4): pistas como rutas animadas, ficha de tecnología como panel con URL, conejo en escenario/bandeja (§4.4).
7. Diseño en Figma: guía en **`FIGMA-DESIGN.md`**.

> Nota (2026-10-11): la lista de capas de §7.2 queda sustituida por la real de `PLAN-IMAGENES.md` §7 (cabezas completas por pose, cuerpos por pose y fotogramas intermedios).

---

## Historial

- **2026-10-13:** clip de demo de 6 s bajo la portada del álbum: se reproduce solo, sin controles, la caja alterna pausa/reproducción y queda en pausa cuando no se ve (§5.2.1). Diseño en Figma aprobado e implementado por Claude; pendientes las grabaciones reales. Duración actualizada a 6 s por el usuario.
- **2026-10-12:** navegación cerrada: una sola página que se transforma con URL por estado; pistas como rutas animadas; ficha de tecnología como panel con URL; conejo en el escenario (colección) y en la bandeja (resto); metáfora ampliada (detalles, duración = tiempo de lectura, notas de producción). Nuevo `FIGMA-DESIGN.md`.
- **2026-10-11:** recomendada vía Blender + MCP; contorno: ninguno; se añaden las referencias fino 1–4.
- **2026-10-11:** primera versión, a partir de `idea/PortfolioIdea.txt`, el logo y las referencias.
