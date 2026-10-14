> **HISTÓRICO — pendiente de migrar a Notion (Antonio Development Hub).** No es fuente vigente ni lectura de inicio. Lo vigente está en `docs/ESTADO.md`, `PORTFOLIO.md`, `BUNNY-RECORDS.md` y `FIGMA-DESIGN.md`. Se borrará del repo cuando la migración esté validada.

# Plan de imágenes — Logo y personaje

*Fase: planificación. Última revisión: 2026-10-11.*

Hoja de ruta **solo de recursos visuales**, fase por fase. El concepto y la marca están en `BUNNY-RECORDS.md`; la parte técnica de la web, en `PORTFOLIO.md`. Este documento manda sobre **qué imagen se hace, en qué orden, quién la hace y cómo se aprueba**.

Etiquetas: **[VERIFICAR]** = dato externo que hay que confirmar antes de pagar o instalar.

---

## 0. Resumen

| Bloque | Qué sale | Coste | Estado |
|---|---|---|---|
| **Fase L — Logo** | Logo en SVG + variantes, favicon e iconos | US$0 | ✅ L1–L4 (logo aprobado 2026-10-11) · ✅ iconos y metadatos en `design/logo/meta/` (favicon, iconos de app, Open Graph; revisión en `meta/preview.html`) |
| **Fase C — Personaje** | Conejo 3D estilo juguete de vinilo, en capas, animado en la web | US$0 | ✅ C0–C7 · ✅ C8 (corte limpio, fotogramas intermedios, grafo de poses) · ⏳ C9 decisión CSS / Rive · C10 poses v2 tras la v1 de la web |
| Fases siguientes | Portadas, iconos de stack, demos, OG | US$0 | Después de L y C |

---

## 1. Decisión: ¿Rive o Blender?

**No compiten: hacen cosas distintas.**

| | Blender | Rive |
|---|---|---|
| Qué es | Programa 3D: modela, aplica materiales y luces, y **renderiza** | Editor de **animación 2D** interactiva (huesos, deformación, estados) |
| ¿Produce el aspecto de las referencias "fino"? | **Sí.** Ese acabado de vinilo mate, con luz suave y volumen real, es un render 3D | **No por sí solo.** Dibuja en vector plano; para verse 3D tendría que animar imágenes renderizadas en otro sitio |
| Para qué lo usaríamos | Crear el personaje y sacar sus capas y poses | Solo si las animaciones con CSS se quedan rígidas (§4, C9) |
| Coste | Gratis (código abierto) | Gratis para diseñar, pero **las exportaciones gratuitas muestran una pantalla de presentación de Rive**; para quitarla hace falta el plan **Cadet, US$9/mes por puesto** (precio en rive.app/pricing a 2026-10-11) **[VERIFICAR al pagar]** |
| Dificultad para ti | Alta si lo haces solo; **baja con el conector de Claude** (§3) | Media: interfaz propia, huesos y máquina de estados |

**Recomendación: Blender + conector MCP de Claude** para crear el personaje, y **CSS/Motion** (ya incluido en el stack) para animarlo en la web. Rive queda como plan B para la animación, no para el diseño.

Por qué Blender resulta *más fácil* aquí:

1. Las referencias fino 1–4 son figuras de **formas simples** (cápsulas, esferas, cilindros redondeados). No hace falta escultura compleja.
2. **Con el conector puedo construir el modelo yo**, por código, dentro de tu Blender. Tú revisas capturas y das indicaciones ("orejas más largas", "más mate").
3. En 3D, cada pieza está **completa por detrás**. Al renderizar una oreja sola no hay que pintar a mano lo que queda oculto: se elimina de raíz el efecto "papel recortado".
4. Cambiar de pose o de ángulo es girar una pieza y volver a renderizar, sin redibujar nada.

---

## 2. Coste total

| Concepto | Necesario | Coste |
|---|---|---|
| Blender | Sí | **US$0** |
| Conector MCP de Blender (oficial de Blender Lab / conector de Claude) | Sí (recomendado) | **US$0**. Usa tu plan actual de Claude |
| Animación en la web con CSS + Motion | Sí | **US$0** |
| Imágenes de concepto con IA (ChatGPT, Gemini o similar) | Opcional, solo como inspiración | US$0 en los niveles gratuitos |
| Rive Cadet | Solo si en C9 decidimos que CSS no basta | US$9/mes **[VERIFICAR]**. Se podría pagar un solo mes para exportar; confirmar antes en los términos que el `.riv` exportado se puede seguir usando sin suscripción **[VERIFICAR]** |
| Generadores 3D con IA (Meshy, Tripo…) | **No recomendados** | El plan gratuito de Meshy usa licencia CC BY 4.0 (obliga a citarles) y Pro es de pago **[VERIFICAR]**. Además generan mallas desordenadas en una sola pieza, difíciles de separar en orejas, brazos y cabeza |
| Spline / Three.js | No | Descartados (`BUNNY-RECORDS.md` §6.1) |

**Plan de pago obligatorio: ninguno.** El único gasto posible es Rive Cadet, y solo si la prueba de animación lo justifica.

---

## 3. Conexiones para agilizar el trabajo

| Conexión | Qué permite | Estado |
|---|---|---|
| **Blender MCP** (complemento oficial de Blender Lab; Anthropic lo publicó como conector de Claude el 2026-04-28) | Claude crea y edita objetos, materiales, luces y cámara, y lanza renders en tu Blender abierto, a través de su API de Python | **Por instalar** (guía en C0) |
| **Figma MCP** | Ya está conectado en esta sesión. Útil más adelante para maquetar la web, la hoja de personaje o la presentación de la marca | Disponible; la generación de imágenes en Figma puede consumir créditos de IA del plan de Figma **[VERIFICAR]** |
| **Rive MCP** | Rive incluye un servidor MCP en su editor de escritorio (acceso anticipado) | Solo si llegamos al plan B **[VERIFICAR]** |
| Scripts locales (`py`, `sharp`) | Recortar, redimensionar y convertir a AVIF/WebP en lote | Los preparo yo cuando haga falta |

**Precaución con Blender MCP:** la documentación de Blender avisa de que el servidor ejecuta, sin restricciones, el código que genera el modelo. Para trabajar con tranquilidad: usar un archivo de Blender dedicado solo al conejo, guardar copias y no tener abiertos en Blender otros proyectos importantes. Yo solo operaré sobre ese archivo.

**Versión de Blender:** la página del conector de Claude pide 4.2 o superior y la de Blender Lab, 5.1 o superior. Instala **la última estable** y ambas se cumplen **[VERIFICAR la versión al descargar]**.

---

## 4. Dirección de arte del personaje (a partir de fino 1–4)

| Referencia | Qué tomamos |
|---|---|
| **fino4** (Momo, conejo blanco) | La referencia más cercana: conejo de vinilo, orejas largas y redondeadas, cuerpo sencillo y un único accesorio de color (en él, la bufanda; en el nuestro, los auriculares teal) |
| **fino2** (furu) | El **material**: marfil mate, sombras suaves, cara mínima con rasgos gráficos negros; proporción cabeza grande / cuerpo pequeño |
| **fino3** (Have a Bread) | Las **tres vistas** limpias (frente, perfil, espalda) como entregable de aprobación; volúmenes muy redondeados |
| **fino1** (Gaga) | Presentación de personaje como "ficha de producto"; formas geométricas exageradas y piezas claramente separadas (cabeza, cuerpo, brazos), algo ideal para animar por capas |

Especificación inicial (se ajusta en C1):

- **Proporción:** cabeza ≈ 45–50 % de la altura total (sin orejas); orejas ≈ 0,8× la altura de la cabeza.
- **Material:** vinilo mate marfil `#F4F4F2` con brillo muy suave; nada de plástico brillante.
- **Cara:** ojos `+` y nariz píldora, en relieve sutil y negro `#080A0D`, exactamente como el logo. Sin pupilas, sin boca permanente y sin mejillas rosadas (no son de nuestra paleta).
- **Contorno:** **ninguno.** Ninguna referencia fino lo usa; la conexión con el logo la dan la silueta, la cara y la luz teal. *(Esto resuelve la decisión 2 de `BUNNY-RECORDS.md` §10.)*
- **Color de acento:** teal `#329DA8` solo en los auriculares (y quizá el interior de las orejas, a probar).
- **Luz:** principal arriba-izquierda, relleno suave y **contraluz teal** (la traducción 3D de la sombra teal del logo), pensada para el fondo Midnight `#0C111C`.

---

## 5. Fase L — Logo

Objetivo: tener el logo en vectores limpios y todas sus variantes de uso.

| Paso | Quién | Qué | Entregable | Aprobación |
|---|---|---|---|---|
| **L1** | **Tú** | Extraer **solo la cabeza principal** de `imagelogo/Bunnylogo.png` en un PNG independiente | `design/logo/bunny-logo-source.png` | — |
| **L2** | Claude | Redibujarlo **a mano en SVG** (formas simples, pocos nodos; no auto-trace) | `bunny-logo.svg` (completo, con sombra teal) | Superpuesto al PNG: coinciden silueta, ojos, nariz y sombra |
| **L3** | Claude | Variantes | `bunny-logo-mono-ivory.svg`, `bunny-logo-mono-ink.svg`, `bunny-icon.svg` (simplificado para 16–32 px), glifos `plus.svg`, `minus.svg`, `ears.svg`, `brace.svg` | — |
| **L4** | Tú + Claude | Revisión | Lámina de prueba en HTML: el logo sobre Midnight, Teal e Ivory y a 16, 32, 64, 180 y 512 px | Tu visto bueno |
| **L5** | Claude | Derivados para la web | `icon.svg`, `apple-icon` 180 px, base para imágenes OG | Se generan en la fase 1 de la web |

**Requisitos del PNG de L1:**

- Solo la cabeza grande de arriba, **sin** los iconos, glifos ni líneas de la hoja.
- Fondo **transparente** (si no puedes, déjalo sobre el fondo oscuro original y lo recorto yo).
- Lo más grande posible: **mínimo 1024 px** de lado; ideal 2048 px.
- Sin comprimir más (PNG tal cual).

Si te resulta más cómodo, también me vale **la hoja completa**: yo recorto la cabeza. Lo que importa es que el vector se dibuje sobre la mejor resolución disponible.

---

### Estado de L1 (2026-10-11)

`imagelogo/logo.png`: 1254 × 1254 px, fondo transparente ✅. Notas para L2:

- La nariz de esta versión es una **barra horizontal más larga** que la píldora de `Bunnylogo.png`. Se toma `logo.png` como referencia oficial.
- La sombra desplazada del PNG es `#107989`, fuera de la paleta. **Decidido: se usan colores de la paleta.** La hoja original (`Bunnylogo.png`) usa `#23A0A7` sobre fondo oscuro y `#1D7780` sobre fondo teal, así que: **Signature Teal `#329DA8`** como sombra normal y **Deep Teal `#267B84`** cuando el logo va sobre fondo teal.

### Estado de L2–L3 (2026-10-11)

Vectorizado con trazado de contornos + ajuste de curvas Bézier (algoritmo de Schneider), sin auto-trace de miles de nodos: la silueta tiene 18 curvas. La sombra teal es **la misma silueta desplazada** (−38, −9), igual que en el original. Ojos y nariz son geometría exacta (trazos de 25 px con extremos redondos y una cápsula de 123 × 41 px). Colores: Ivory `#F4F4F2`, Ink `#080A0D` y los teal de arriba.

Verificación (render del SVG frente a `logo.png`, píxel a píxel): blanco 99,4 %, negro 97,4 %, teal 92,4 %. La diferencia del teal se debe a que ahora es un desplazamiento exacto de la silueta en lugar del trazo irregular del PNG.

Archivos en `design/logo/`:

| Archivo | Uso |
|---|---|
| `bunny-logo.svg` | Logo principal (fondos oscuros, marfil y negro) |
| `bunny-logo-on-teal.svg` | Sobre fondo teal (sombra Deep Teal) |
| `bunny-logo-mono-ink.svg` / `bunny-logo-mono-ivory.svg` | Una sola tinta: silueta sólida con la cara calada |
| `bunny-icon.svg` | Mismo dibujo y proporciones que `bunny-logo.svg`, en lienzo cuadrado (favicon e iconos de app). Se descartó la versión con la cara engrosada |
| `glyph-plus.svg`, `glyph-minus.svg` | Glifos `+` y `−` con **la misma proporción exacta que los ojos y la nariz del logo** (brazo de 25,5 × 91 px medido en `logo.png`; comparación en `preview.html`) |
| `glyph-ears.svg` | Orejas con borde inferior. **Provisional**: el corte es recto; si se va a usar, lo redibujo con la base redondeada de tu hoja |
| `preview.html` | Lámina de revisión (L4): todos los fondos y tamaños |

Pendiente: el corchete `{` de la hoja (no está en `logo.png`; si hace falta, lo trazo desde `Bunnylogo.png`).

## 6. Fase C — Personaje (paso a paso)

Cada paso termina con **capturas para que apruebes** antes de seguir. No pasamos al siguiente sin tu visto bueno.

| Paso | Quién | Qué | Entregable | Aprobación |
|---|---|---|---|---|
| **C0. Preparación** | Tú (te guío) | Instalar Blender (última estable), el complemento MCP de Blender Lab y conectarlo a Claude Code. Antes puedo revisar, en modo lectura, si tu GPU y tu RAM van bien para renderizar | Blender abierto con el servidor MCP activo; `design/character/bunny.blend` creado | Prueba: creo un cubo y lo ves aparecer |
| **C1. Brief** | Tú + Claude | Fijar proporciones, cara, accesorio y paleta (§4). Opcional: 1–3 imágenes de concepto con IA **de frente** solo como inspiración | `design/character/brief.md` con medidas y decisiones | Tu visto bueno al brief |
| **C2. Volúmenes (blockout)** | Claude vía MCP | Modelar con primitivas: cabeza, orejas, cuerpo, brazos, piernas, ojos `+` y nariz. **Cada parte es un objeto separado, con su punto de giro en la articulación** (base de oreja, cuello, hombro) | Capturas de frente, 3/4 y perfil | Proporción y silueta; iteramos aquí lo que haga falta, es lo barato |
| **C3. Material y luz** | Claude vía MCP | Vinilo mate marfil, negro y teal; luz principal, relleno y contraluz teal; vista previa sobre fondo Midnight | Render de prueba | ¿Se ve como fino2/fino4, pero nuestro? |
| **C4. Hoja de personaje** | Claude vía MCP | Render de tres vistas (frente, perfil, espalda) + 3/4 + primer plano de la cara | `design/character/sheet/*.png` | **Aprobación de identidad**: a partir de aquí el personaje queda fijado |
| **C5. Poses v1** | Claude vía MCP | Reposo, Curiosidad (cabeza 3/4, orejas inclinadas) y Presentación (brazo señalando) | Renders de cada pose | Lectura de cada gesto |
| **C6. Capas para la web** | Claude vía MCP | Render de cada pieza por separado, con fondo transparente, cámara fija y **mismo lienzo (1200 × 1600 px)**, conservando las sombras que una pieza proyecta sobre otra | `design/character/layers/` (lista en §7) | Superpuestas, las capas coinciden píxel a píxel con el render completo |
| **C7. Prueba de animación** | Claude | Página de prueba con CSS/Motion: respiración, parpadeo `+`→`−`, mirada al puntero, curiosidad, presentación y un primer baile; se mide el peso | `design/character/prototype/index.html` | La ves en el navegador: ¿se siente vivo o se ve recortado? |
| **C8. Ajustes** | Claude | Ángulos, tiempos, efecto muelle de las orejas; más renders si algún giro lo pide | Prueba actualizada | Tu visto bueno |
| **C9. Punto de decisión** | Tú + Claude | ¿CSS basta? Si no: (a) Rive Cadet con las mismas capas, o (b) secuencia corta renderizada en Blender solo para el baile | **Decidido (2026-10-11): basta con CSS/JS.** Capas + fotogramas intermedios + grafo de poses. Sin Rive ni Three.js | — |
| **C10. Poses v2** | Claude vía MCP | Saludo (Despedida), auriculares (Escucha), brazos de baile | Capas adicionales | Después de lanzar la v1 de la web |

### C0 — Diagnóstico del PC (2026-10-11, solo lectura)

| Componente | Resultado | ¿Suficiente? |
|---|---|---|
| GPU | NVIDIA GeForce RTX 3060, **12 GB VRAM**, driver 617.14 (sept. 2026) | ✅ Sobrada: render Cycles por GPU (OptiX) y Eevee en tiempo real |
| CPU | Intel Core i7-10700, 8 núcleos / 16 hilos | ✅ |
| RAM | 48 GB (≈25 GB libres en uso normal) | ✅ Sobrada |
| Disco C: | NVMe Kingston 1 TB, **198 GB libres** | ✅ Instalar Blender y trabajar aquí |
| Disco D: | SSD SATA 240 GB, 43 GB libres | Opcional |
| Disco E: | HDD 1 TB, 656 GB libres | Copias de seguridad de `.blend` y renders antiguos; no para trabajo activo |

Una escena como la nuestra (un personaje simple, 1200 × 1600 px) debería renderizar en segundos con esta GPU.

Software que falta: Blender (no instalado). Claude Code ✅. Claude Desktop y `uv` no están instalados (solo harían falta para algunas formas de conectar el MCP; ver pasos).

### C0 — Estado de la conexión (2026-10-11) ✅

- Blender **5.2.2 LTS** instalado; complemento **MCP 1.0.3** (Blender Lab) instalado por arrastre. Es solo el *puente*: abre `localhost:9876` dentro de Blender.
- El **servidor MCP** (la otra mitad, la que habla con Claude Code) es el paquete oficial `blender-1.0.3.mcpb` (releases de projects.blender.org, SHA-256 `d6fe04dd…b97e`). Pide `uv`; en su lugar se instaló en un entorno virtual aislado: `C:\Users\Usuario\.blender-mcp\venv` (Python 3.13, `mcp` 1.30.0).
- Registrado en Claude Code **solo para este proyecto** (ámbito *local*, en `~/.claude.json`): `claude mcp add --scope local blender -- C:\Users\Usuario\.blender-mcp\venv\Scripts\blender-mcp.exe`. `claude mcp list` → *blender ✔ Connected*.
- **Prueba (2026-10-11):** tras reiniciar Claude Code con Blender ya abierto, se leyó la escena y se creó la esfera `Prueba_MCP`, que apareció en el visor ✅.
- **Para trabajar:** abrir Blender primero (el puente arranca con *Auto Start*) y después Claude Code. Para actualizar: descargar el nuevo `.mcpb` y reinstalarlo con `pip install` en ese entorno.
- **Desinstalar:** `claude mcp remove blender -s local`, borrar `C:\Users\Usuario\.blender-mcp` y quitar el complemento en Blender.

### C0 — Instalación (guiada)

1. **Blender:** descargar la última versión estable desde **blender.org/download** (instalador de Windows `.msi`) e instalar en `C:` con las opciones por defecto. La documentación del complemento MCP de Blender Lab pide **5.1 o superior**.
2. **Complemento MCP** (versión 1.0.3, archivo `mcp-1.0.3.zip`). Dos formas:
   - **Arrastrar:** con Blender abierto y el navegador al lado, en **blender.org/lab/mcp-server** (sección *Installation → Add-on*) mantener pulsado el botón **"Drag and Drop into Blender"**, arrastrarlo hasta la ventana de Blender y soltar. La 1.ª vez Blender pregunta si añadir el repositorio *Blender Lab*: aceptar. Repetir el arrastre una 2.ª vez para instalar el complemento.
   - **Descargar (más sencilla):** pulsar el enlace **"download"** de esa sección, que baja `mcp-1.0.3.zip`. En Blender: **Edit → Preferences → Add-ons →** menú **⌄** arriba a la derecha → **Install from Disk…** → elegir el `.zip` (sin descomprimirlo). Con esta forma no hay avisos automáticos de actualización.
3. En Blender: **Edit → Preferences → Add-ons → MCP**: comprobar *Host* `localhost`, puerto (por defecto `9876`), activar *Auto Start* y verificar que diga **"Server is running"**.
4. **Conectar Claude Code:** lo hago yo cuando Blender esté listo. Primero reviso, en modo lectura, lo que instaló el complemento para elegir la vía correcta en Windows. Si hace falta, la alternativa documentada es instalar Claude Desktop, añadir su conector de Blender y registrar ese servidor en Claude Code con `claude mcp add --scope project blender -- <ruta del ejecutable>` **[VERIFICAR la ruta en Windows]**.
5. **Prueba:** reiniciar Claude Code, `claude mcp list` debe mostrar *blender ✓ Connected*; creo un cubo y lo ves aparecer.
6. Crear `design/character/bunny.blend` y trabajar **solo** en ese archivo (§3, precaución).

**Si no quieres instalar Blender:** el plan B es IA de imagen + retoque manual de capas (`BUNNY-RECORDS.md` §6.3, vía 2). Funciona, pero cada pose nueva arriesga la consistencia del personaje y el trabajo de separar capas recae en ti. No lo recomiendo para este estilo.

---

## 7. Capas que salen de C6

Todas en PNG RGBA sRGB, **1200 × 1600 px, mismo encuadre**. Yo las convierto a AVIF/WebP para la web.

| Archivo | Contenido |
|---|---|
> **Actualizado en C6 (2026-10-11).** "left/right" = lado de la pantalla. Cámara `Cam_Main` (−10°, 85 mm). Orden de dibujo, de atrás hacia delante: sombra → cuerpo → orejas (solo en reposo) → cabeza.

| Archivo | Contenido |
|---|---|
| `bunny-full-rest.png` | Personaje completo en reposo (imagen fija, primera pintura y movimiento reducido) |
| `bunny-shadow.png` | Sombra de contacto (debajo va el halo teal en CSS) |
| `bunny-body-rest.png` | Cuerpo + brazos en reposo + cola + auriculares (los brazos van fundidos, así que el cuerpo se cambia entero) |
| `bunny-body-point-left.png` / `-right.png` | Cuerpo con el brazo señalando a la izquierda o a la derecha de la pantalla |
| `bunny-ear-left.png` / `-right.png` | Orejas sueltas, solo para la cabeza en reposo (muelle, baile) |
| `bunny-head-rest-open.png` / `-blink.png` | Cabeza de frente con nariz y ojos `+` o `−`, sin orejas. El parpadeo cambia una imagen por la otra |
| `bunny-head-{curious,present,look-up}-{left,right}-{open,blink}.png` | Cabezas de las poses con las orejas integradas |
| `layers.json` | Orden de dibujo, recuadro de cada capa y puntos de giro en píxeles. Lo exporto **automáticamente desde Blender**: tú no tienes que medir nada |

**Por qué así:** los ojos `+` están medio hundidos en la cabeza, así que una capa de ojos suelta mostraba la parte oculta y perdía su sombra. Una cabeza completa por cada estado de ojos es exacta. Las cabezas se renderizan dos veces, una para el color y otra con el cuerpo como máscara (*holdout*) para el recorte, porque el cuello tapa la parte inferior de la cabeza. Comprobación: las capas del reposo superpuestas difieren del render completo en 0,05/255 de media.

---

## 8. Fases siguientes (después de L y C)

Se detallarán cuando lleguemos; las especificaciones ya están en `BUNNY-RECORDS.md` §7.

| Fase | Contenido | Quién |
|---|---|---|
| **P — Portadas** | 5 portadas 2000 × 2000 px sin texto, con estilo común (¿quizá el conejo aparece en ellas, renderizado desde Blender?) | Tú (+ Claude si se renderizan en Blender) |
| **S — Iconos de stack** | SVG monocromos de React, Tauri, Rust, etc., revisando las condiciones de marca | Claude |
| **D — Demos y capturas** | Vídeos de 10–30 s y capturas reales por proyecto existente | Tú graba / Claude optimiza |
| **O — Imágenes sociales** | OG por página e idioma, generadas por código | Claude |
| **A — Sobre mí** | Foto o avatar (opcional) | Tú |

---

## 9. Organización de archivos

```
design/                     # originales; no se publican tal cual
├─ logo/                    # PNG fuente y SVG finales (Fase L)
├─ character/
│  ├─ bunny.blend           # modelo único: fuente de verdad del personaje
│  ├─ brief.md
│  ├─ sheet/                # hoja de personaje (C4)
│  ├─ poses/                # renders de pose (C5)
│  ├─ layers/               # capas para la web + pivots.json (C6)
│  └─ prototype/            # prueba de animación (C7)
└─ covers/                  # Fase P
```

Las versiones optimizadas para la web se copian a `public/` cuando empiece el desarrollo.

---

## 10. Siguiente acción

C0 cerrado: `design/character/bunny.blend` guardado (escena vacía con cámara y luz, lienzo 1200 × 1600).

C1 cerrado: brief v1 aprobado (decisiones en `brief.md` §7).

C2 cerrado: blockout v4 (v3 con las piernas más cortas).

**Flujo de trabajo:** `design/character/bunny.blend` es el original aprobado. Las pruebas se hacen en el clon `design/character/lab/bunny-lab.blend`, y lo que se aprueba se pasa al original por script, nunca copiando el archivo encima.

**Modelo aprobado (2026-10-11) y pasado al original:** `bunny.blend` = estado v10 del clon (renders en `design/character/blockout/blockout-final-*.png`). Copia del original anterior en `design/character/backup/bunny-c2-v4.blend`. Material: vinilo mate marfil + auriculares de gomita teal.

**C3 v2 en el clon (2026-10-11):** fondo transparente (suelo como *shadow catcher*), PNG RGBA de 8 bits a 1200 × 1600; luces principal, relleno, cenital y dos contraluces teal; AgX con exposición +0,35. Marfil sin quemar (0 % de píxeles saturados; percentil 99 = 236/255). Gomita: transmisión 0,45 + subsurface 0,7 (antes, el volumen la oscurecía); copas de radio 0,115. La sombra de contacto existe (alfa ≤ 0,89), pero no se ve sobre Midnight: se propone un halo teal en CSS bajo los pies. **C3 cerrado (v3):** gomita sobre base Deep Teal (subsurface 0,45, transmisión 0,35), con un teal medio de rgb(50,126,133) frente al rgb(50,157,168) del logo. **Halo teal bajo los pies aprobado** (se hará en CSS en la web; la sombra negra queda en el PNG). Pasado al original, con un render idéntico al del clon; copia del original anterior en `backup/bunny-c2-final.blend`. Renders: `design/character/lab/c3-v3-*.png`. Las versiones intermedias se borraron con permiso del usuario.

**Ajuste posterior:** banda de los auriculares más gruesa (radio 2,6 → **3,5 cm**; recorrido por la nuca bajado a z 0,85), hecho directamente en el original (copia previa en `backup/bunny-c3-v3.blend`); 0 intersecciones y 3 mm de margen bajo la cabeza. **El clon `lab/bunny-lab.blend` está desfasado:** antes de la próxima prueba, volver a crearlo desde el original.

**C4, hoja de personaje (2026-10-11):** `design/character/sheet/`: frente, 3/4, perfil y espalda con `Cam_Sheet` ortográfica, más primer plano de la cara con `Cam_Face` (85 mm). Cada vista se guarda como `-alpha.png` (transparente) y `.png` (sobre Midnight con el halo), y todas juntas en `bunny-sheet.png`. La luz gira con la cámara (plató giratorio), así que todas las vistas tienen la misma iluminación.

**C4 aprobado (2026-10-11): identidad fijada.** Desde aquí solo cambian las poses; la forma, la cara, los materiales y los auriculares no se tocan.

**C5 v1 (2026-10-11, en el clon):** 5 poses en `design/character/poses/` (Reposo, Curiosidad izquierda y derecha, Presentación izquierda y derecha; cada una en `-alpha.png` y sobre Midnight; juntas en `bunny-poses.png`). Las poses no modifican el modelo: se aplican por script a partir de `poses.json`. La cabeza gira sobre el pivote (0,0,1.0) y en Curiosidad sube 3 cm para no chocar con la banda; el brazo señala a 80° de elevación y 15° hacia delante (más alto, atraviesa la copa). 0 intersecciones en todas. Se quitó del original una referencia de biblioteca al clon que había quedado tras el traspaso, y que impedía sobrescribirlo.
**Cámara de la web: casi frontal (elegido por el usuario).** `Cam_Main` a −10° (antes −30°), a 7,3 m, z 1,0, apuntando a (0,0,1,28), 85 mm. Las dos direcciones se leen casi igual. Poses vueltas a renderizar con ella (de momento solo en el clon).

**Poses añadidas a petición del usuario:** `look-up-left` y `look-up-right` (cabeza 18° hacia arriba y ±18° de giro, sube 3 cm, orejas 6° hacia atrás), para cuando el conejo esté abajo en el centro y el proyecto arriba. 7 poses en total en `bunny-poses.png`. **C6 tendrá que incluir también estas cabezas.**

**C5 aprobado** (7 poses; mirar arriba a 18°).

**C6 hecho (2026-10-11):** 25 capas PNG en `design/character/layers/` (9,7 MB como originales; para la web se convertirán a AVIF/WebP recortadas a su recuadro) + `layers.json` (orden de dibujo, recuadros, puntos de giro, combinación de capas de cada pose y datos del halo en CSS). Comprobación: cada pose montada desde sus capas coincide con su render de C5 (diferencia media de 0,05 a 0,19 sobre 255; percentil 99,9 ≤ 5). Las capas se limpiaron: borde de 6 px sin restos del eliminador de ruido y color a cero en los píxeles transparentes (el peso bajó a la mitad). Script reutilizable en `design/character/scripts/layers_lib.py` (funciones `apply`, `set_visibility`, `render_head`…; se ejecuta en Blender con `exec`). Cámara −10° pasada al original (copia previa en `backup/bunny-c5.blend`). Vista previa del montaje: `lab/c6-poses-desde-capas.png`.

**C7, prototipo (2026-10-11):** `design/character/prototype/index.html` (se abre con doble clic; no necesita servidor). HTML/CSS/JS sin dependencias. Capas recortadas a su recuadro y convertidas a WebP calidad 88 en `prototype/assets/` (colores idénticos al PNG, alfa exacto); datos en `layers.web.json` / `layers.web.js`. **Peso: reposo 97 KB, todas las capas 605 KB, imagen fija 86 KB.** Incluye respiración, parpadeo cada 4–7 s, mirada al puntero (micro-giro con orejas de muelle cerca; cambio a curiosidad o mirar arriba según la dirección), portadas de prueba alrededor (pasar el ratón = curiosidad o mirar arriba; clic = presentación), baile al hacer clic en el conejo y modo de movimiento reducido (imagen fija). Verificado en Chrome sin errores de consola.

**C8, primer hallazgo del usuario:** al cambiar de dirección "parpadeaba". Causa: fundido cruzado de 90 ms; a mitad del cambio las dos cabezas (y los dos cuerpos) quedaban al 50 % y se veía el fondo a través del conejo. Arreglo aplicado: corte limpio sin fundidos y todas las capas descodificadas antes de mostrar nada. Queda un salto seco entre ángulos, porque no hay ángulos intermedios. **Propuesta:** fotogramas intermedios (3 por pose: cabeza + cuerpo, incluido el brazo que sube) reproducidos como secuencia de ~20 ms por fotograma; ~36 capas más (~0,9 MB, carga diferida tras el reposo). Alternativa descartada salvo que el usuario la pida: Three.js con el modelo en tiempo real (fluidez total, pero peor material y más peso).

**Fotogramas intermedios hechos (aprobados por el usuario):** 36 capas `bunny-{body,head}-{pose}-t{25,50,75}` (cabeza sin parpadeo) con 0 choques comprobados en los 24 estados. `layers.json` → `sequences`. En la web, A→B recorre los fotogramas de A al revés hasta el reposo y luego los de B, a 22 ms por fotograma (izquierda→derecha: 8 fotogramas, ~160 ms). Si el objetivo cambia a mitad, sigue desde donde está. Sin parpadeo durante un giro. Pesos: intermedios 807 KB, todo 1,4 MB; el reposo (97 KB) se muestra primero y lo demás se descodifica después. Tira de comprobación: `lab/c8-secuencias.png`. Verificado en Chrome (orden de fotogramas y una sola cabeza y un solo cuerpo visibles).

**Segundo hallazgo del usuario:** al salir de una portada el conejo iba hacia el centro y volvía (dos manejadores competían) y entre portadas del mismo lado pasaba por el reposo. Arreglo: una sola función `desired()` con histéresis y confirmación con espera (60/140 ms) + **grafo de poses** con 6 transiciones directas (arriba↔lado, lado↔presentar, arriba↔presentar en cada lado; 36 capas, 809 KB) y camino más corto. Verificado en Chrome: A → fuera → C → fuera → B → hueco → D sin pasar por el reposo salvo al cruzar de lado. Total: 97 capas, 2,2 MB (reposo 97 KB).

**C9 decidido:** basta con CSS/JS.

**C10, poses v2 (2026-10-11, en el clon, pendientes de aprobación):** `design/character/poses/bunny-poses-v2.png`.
- **Escucha (`listen`):** auriculares puestos (`Bunny_Headphones_Head`, hijo de la cabeza: copas de 0,135 m a los lados, diadema por detrás de las orejas; 0 choques). Los del cuello se ocultan.
- **Despedida (`wave-left`/`-right` + `-b`):** saludo "de juguete", con el brazo alternando 80° ↔ 55° (20° hacia delante). **Límite físico:** con la cabeza al 52 % y brazos de 0,38 m, la mano no puede subir por encima de la cabeza (a 145° llega a z 1,06, bajo el ala de la cabeza; desde 90° choca con la banda de los auriculares).
- **Baile (`dance-a`/`-b`):** brazos alternos 78°/40°, cabeza ±7° y orejas acompañando.
- Script: `apply` admite `arms` (varios brazos) y `headphones: "head"`; `clashes()` comprueba también brazo↔cabeza/orejas y auriculares de cabeza↔orejas.

1. **Tú:** aprobar las poses v2 → después, capas, fotogramas intermedios y conexión en el prototipo.
2. Después, C9: punto de decisión (¿basta con CSS, o Rive / secuencia renderizada para el baile?).

---

## Historial

- **2026-10-11:** C1 aprobado (auriculares al cuello, orejas marfil y rectas de 0,9 × la cabeza, con cola, sin concept art). C2: blockout v3 en `bunny.blend` (la v1 tenía la cabeza ovalada; la v2 quedó con un pliegue y se descartó).
- **2026-10-11:** C0 cerrado (prueba MCP OK, `bunny.blend` creado). Borrador v1 del brief (C1) con las proporciones de la cara medidas sobre `bunny-logo.svg`.
- **2026-10-11:** icono rehecho con la cara exacta del logo; Blender 5.2.2 + MCP conectado a Claude Code.
- **2026-10-11:** L2–L3 hechos: logo en SVG con colores de la paleta, variantes, icono, glifos y lámina de revisión. Instrucciones de instalación del complemento detalladas.
- **2026-10-11:** L1 recibido (`imagelogo/logo.png`); Blender aceptado; diagnóstico del PC y pasos de instalación de C0.
- **2026-10-11:** primera versión. Recomendación (pendiente de confirmar): Blender + MCP para crear el personaje, CSS/Motion para animarlo, Rive como plan B. Sin planes de pago obligatorios. Contorno del personaje: ninguno.
