---
name: portfolio-qa
description: QA incremental y orientado a riesgos para Bunny Records. Usar al pedir QA, revisión visual, revisión responsive, regresiones, validación de cambios, revisión previa a merge o release. Selecciona controles según el diff; no hace auditorías completas por defecto.
---

# Portfolio QA — Bunny Records

Texto común para cualquier agente (Claude Code y Codex). Los **niveles Q1–Q4, el escalado y el formato del informe** están en `~/.ai/WORKFLOW.md` §2: aquí solo lo propio de este proyecto.

## 1. Delimitar

- `git status --short` y el diff de la rama frente a su base real (no asumir `main` sin mirar el historial).
- Matriz interna: archivo → rutas y estados afectados → riesgo → nivel → comprobación.
- Leer solo la sección pertinente de `PORTFOLIO.md` (técnica), `BUNNY-RECORDS.md` (manda en lo visual) o `FIGMA-DESIGN.md` (diseño aprobado). No leer históricos.
- Durante una auditoría no se cambia código salvo que el usuario lo pida.
- Escalado propio: tocar la animación del conejo o de las portadas obliga a comprobar interrupción, visibilidad (`<Activity>`) y movimiento reducido.

## 2. Controles (activar solo los relevantes)

**A. Diseño y responsive**
- Comparar con el frame aprobado (`FIGMA-DESIGN.md` §3) cuando exista; no afirmar equivalencia sin evidencia.
- Tokens semánticos, sin HEX sueltos. Contraste `PORTFOLIO.md` §3.5: primario teal + ink; sobre marfil, `teal-ink`.
- **Sin scroll de documento:** 1920×911, 390×844 y 375×667 en cada pantalla nueva (+1440×900 si el frame lo usa; 320 px en QA integral). En móvil, Sobre mí y Contacto pueden desplazar `<main>`; el documento nunca. Sin desborde horizontal.
- Táctiles ≥ 44×44 px; estados default/hover/focus/selected/disabled; textos EN y estados "Planeado".

**B. Navegación de sello** (si el cambio la toca)
- Portada → ficha sin abrir; abrir álbum mueve portada a la cabecera y conejo a la bandeja, con URL compartible.
- Pista: conserva portada, demo y bandeja; "Mostrar todas" vuelve. Ficha de tecnología: panel (hoja en móvil) y página completa en entrada directa.
- Cerrar paneles: foco, Esc, Atrás y reentrada. Sin View Transitions, todo funciona igual.

**C. Conejo y movimiento**
- Personaje aprobado; no volver a Blender para arreglos de CSS. Una cabeza y un cuerpo visibles por instante; sin parpadeos ni saltos a reposo.
- Pausa con la página oculta, fuera de pantalla o pestaña oculta; pose fija con `prefers-reduced-motion`; nada pesado durante una transición.
- Peso real de los assets si cambian; renders y `.blend` fuera de Git.
- Música (`BUNNY-RECORDS.md` §5.2.2), si se toca: arranca con el clic en la colección; sigue entre pistas; se apaga al salir; entrada directa en ▶; pausa, silencio, tiempo y volumen con teclado. iPhone real si cambia el arranque: Chromium y WebKit de escritorio no lo sustituyen.

**D. Contenido, i18n y seguridad**
- Textos en los dos diccionarios; rutas, `lang` y metadatos por idioma.
- Planeados sin demo, pistas, métricas ni resultados. Sin datos reales del cliente de Vidriería.
- Reglas de capas de componentes (`PORTFOLIO.md` §7). Sin secretos ni cambios en producción por hacer QA.

**E. Rendimiento, SEO y publicación** (si aplica)
- Solo sobre el build de producción; LCP observado (`PORTFOLIO.md` §10 tiene la referencia medida y los avisos aceptados: no reportarlos como fallos nuevos).
- Sitemap, hreflang, robots/`noindex`, OG y favicon en los dos idiomas. Nada de ventas, precios ni disponibilidad. La aprobación del resultado cubre el despliegue previamente explicado (`~/.ai/CORE.md`); el QA por sí solo no autoriza publicar ni exige otra aprobación para un despliegue ya autorizado.

## 3. Herramientas

- Scripts reales de `package.json` (`npm run check` al cerrar cada bloque de código). No asumir Playwright ni tests que no existen.
- Responsive: Chrome headless con emulación por CDP (el sitio bloquea iframes y la ventana de Chrome no baja de tamaño). Detener `next start` antes de reconstruir.
- Sin herramientas visuales: indicar "no verificado visualmente".

Cabecera del informe: `QA Bunny Records — Q[n] | Rama [rama] | Alcance [rutas/estados]`, y después el formato de `~/.ai/WORKFLOW.md` §2.
