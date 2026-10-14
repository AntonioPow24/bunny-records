# Bunny Records — diseño en Figma (vigente)

Archivo: https://www.figma.com/design/o0r1u0aHeXmVXn2TAFME28 (`Bunny Records`). La experiencia está en `BUNNY-RECORDS.md` y los tokens en `PORTFOLIO.md` §3; aquí solo el archivo, sus reglas y los diseños aprobados vigentes. El flujo de traspaso común está en `~/.ai/WORKFLOW.md` §5.

## 1. Estructura del archivo

| Página | Contenido |
|---|---|
| `01 Sistema` | Notas, fundamentos (variables `brand`, `semantic` en modo dark y `dimension`; 10 estilos de texto Sora/Geist/Geist Mono), componentes y recursos (logo, glifos, componente `Bunny` con 8 poses) |
| `02 Pantallas` (`1:21`) | "Actual · Escritorio / Móvil" (capturas del build como capas editables; referencia histórica, no garantiza coincidencia con `main`), "Mejoras · propuestas", T11/T14/T15 y "Referencias vigentes" (plantilla OG 1200×630 y especificación de luz 7.9) |
| `03 Prototipo` | Nota que remite al sitio (el prototipo Smart Animate se retiró) |

Antes de rediseñar una sección, contrastarla con `main`; las capturas "Actual" pueden estar desfasadas.

## 2. Reglas de diseño

- Solo variables `semantic`, nunca HEX sueltos. El modo marfil (`.surface-ivory`) existe solo en código.
- Contraste (`PORTFOLIO.md` §3.5): botón primario teal + ink; Deep Teal no se usa para texto normal; sobre marfil, enlaces en `teal-ink`.
- Objetivos táctiles ≥ 44 px en móvil; foco visible en todo componente interactivo; estados que se entienden sin color.
- Sin datos inventados (métricas, clientes, demos, fechas) y sin controles de reproducción sobre algo que no sea vídeo real.
- El conejo no se redibuja en Figma: se coloca y escala; en código se monta por capas.
- Capas con nombre y componentes usados como instancias. Probar al menos una pantalla con textos en inglés.
- Preservar los originales: proponer sobre copias o secciones nuevas. Un `Redesign Lab` solo si el plan y la utilidad lo justifican (no crearlo por defecto).

## 3. Diseños aprobados vigentes

| Tarea | Qué | Nodos |
|---|---|---|
| T11 · Equipo de estudio | Ficha editorial de instrumentos: 4 categorías numeradas con separadores y las herramientas `inGear` como enlaces | [propuesta](https://www.figma.com/design/o0r1u0aHeXmVXn2TAFME28/Bunny-Records?node-id=137-247): escritorio `137:248`, móvil `137:446`, componente `137:362` |
| T14 v3 · Contacto | Contraportada del artista: disco, giro y conejo originales; firma «Antonio G.» fuera del disco; CV como acción principal; correo y perfiles | [propuesta](https://www.figma.com/design/o0r1u0aHeXmVXn2TAFME28/Bunny-Records?node-id=152-309): escritorio `152:310`, móvil `152:430` (v1 y v2 descartadas). Desviaciones aprobadas: firma más arriba en escritorio; correo como enlace `mailto` (2026-10-14) |
| T15 · Videoclip | Ventana de película bajo la portada: marco mate, perforaciones, etiqueta «En acción», sin controles | [propuesta](https://www.figma.com/design/o0r1u0aHeXmVXn2TAFME28/Bunny-Records?node-id=162-309): escritorio `162:652`, móvil `162:1081`, componente `DemoClip / T15` `162:651`. Añadido sin Figma: "Ampliar" en modal (2026-10-14) |

Los créditos como sobres (mejoras 8–10) partieron de T9 en "Mejoras · propuestas" y se terminaron en código; Figma no refleja el arte final de las fundas.

## 4. Conexión y capturas

- Claude: MCP remoto de Figma (`mcp.figma.com`) con las skills del plugin. Codex: su propio conector. Tener el plugin no demuestra acceso: comprobarlo en cada sesión. No cambiar la configuración de un agente para conectar al otro.
- Plan, asiento y cupo del MCP cambian: verificarlos antes de trabajos largos en el lienzo (`use_figma` consume cupo).
- Capturar el sitio como capas editables: puppeteer con `setBypassCSP`, inyectar `capture.js` y lanzar `captureForDesign` sin esperar la promesa (no se resuelve).
- Lo que no se resuelve bien con código (exploración visual, ilustración) se propone como prompts en inglés para la IA de Figma.
