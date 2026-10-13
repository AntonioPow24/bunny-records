---
name: portfolio-qa
description: "QA incremental y orientado a riesgos para Bunny Records. Usar al pedir QA, revisión visual, revisión responsive, regresiones, validación de cambios, revisión previa a merge o release. Selecciona controles según el diff; no hace auditorías completas por defecto."
---

# Portfolio QA — Bunny Records (v1)

> **Ámbito:** únicamente este repositorio. Skill manual o invocada cuando corresponda. No sustituye `AGENTS.md`, las decisiones del usuario ni los documentos de especificación.
>
> **Objetivo:** detectar problemas reales con el menor trabajo repetido razonable; hacer QA más profundo cuando el riesgo lo justifique, sin sacrificar seguridad, accesibilidad ni verificación.

## 0. Prioridad documental y lectura selectiva

1. `AGENTS.md` y `AGENTS.md`: reglas operativas vigentes.
2. `DESARROLLO.md`: paso actual, objetivos y criterios de cierre; **consultarlo al inicio de cada sesión**, conforme al `AGENTS.md` del proyecto.
3. `PORTFOLIO.md`: stack, arquitectura, contenido, i18n, accesibilidad, SEO, calidad.
4. `BUNNY-RECORDS.md`: experiencia, navegación, personaje y movimiento; **prevalece en asuntos visuales o de interacción**.
5. `FIGMA-DESIGN.md`: pantallas, frames, componentes y prototipos; consultar sección relevante.
6. `PLAN-IMAGENES.md`: logo, poses, capas, exportaciones y aprobación; consultar solamente para cambios de medios/personaje.

No cargar todos los documentos completos por rutina. Localizar y leer las secciones relevantes, y corroborar el estado actual de los archivos: el plan no garantiza que algo esté implementado. Si dos fuentes parecen contradecirse, seguir su jerarquía explícita y señalar conflictos que afecten al resultado; no inventar un consenso.

## 1. Inicio: delimitar el cambio antes de gastar contexto

- Identificar petición, paso de `DESARROLLO.md`, rama y estado de Git.
- Inspeccionar `git status --short`, diff de la rama o diff de trabajo y archivos impactados. Elegir base apropiada; **no asumir `main` sin comprobar el historial**.
- Si el usuario pide revisión general sin cambios específicos, acotar a la fase actual o pedir el alcance indispensable.
- Clasificar el impacto: **local / compartido / flujo / arquitectura / release**.
- Elaborar internamente una matriz sencilla: `archivo o componente -> rutas y estados afectados -> riesgo -> verificación`.
- No modificar código durante una auditoría a menos que el usuario pida corregirlo; proponer correcciones concretas primero.

## 2. Niveles de QA (mínimo suficiente, ampliable por riesgo)

| Nivel | Disparador típico | Alcance |
|---|---|---|
| **Q1 Local** | Color, sombra, texto, espaciado o asset aislado | Componente afectado, estilo/estado relevante, foco y contraste si aplica; comprobación técnica focalizada |
| **Q2 Visual importante** | Hero, portada, navegación, layout, tokens compartidos, responsive, interacción o animación | Pantallas y estados afectados, comparación con Figma, tamaños relevantes, accesibilidad, regresión por elementos compartidos |
| **Q3 Funcional/arquitectura** | Rutas, i18n, contenido tipado, reproductor, persistencia, transiciones entre vistas, dependencias | Recorridos afectados, teclado/estado/historial, pruebas pertinentes, typecheck/lint y build cuando corresponda |
| **Q4 Hito/release** | Paso terminado, merge o despliegue | Checklist integral de pasos implementados, flujos críticos, revisión móvil, accesibilidad, SEO, producción y `npm run check` |

**Reglas de escalado:**
- Si un token compartido cambia, comprobar todos los tipos de superficie o componentes dependientes; no solo el lugar del diff.
- Si una ruta o estado persistente cambia, verificar navegación hacia delante/atrás y entrada directa.
- Si se modifica la animación del conejo o de las portadas, comprobar cancelación/interrupción, visibilidad y reduced motion.
- Si aparece un fallo fuera del alcance, ampliar QA solo hacia sus dependencias plausibles.
- No ejecutar Q4 automáticamente por un ajuste Q1.
- **Regla invariable del proyecto:** al cerrar **cada bloque** ejecutar `npm run check` (typecheck + lint + build), y seguir el flujo de commit/push y revisión establecido en `AGENTS.md`. QA focalizado durante el trabajo no elimina esa obligación.

## 3. Lista de controles: activar solo lo relevante

### A. Diseño, Figma y responsive

- Comparar con el frame/componente aprobado de Figma cuando esté disponible; el identificador del archivo figura en `AGENTS.md`. No afirmar equivalencia píxel a píxel sin evidencia.
- Respetar tokens semánticos; no introducir HEX sueltos ni colores ajenos a la paleta salvo excepciones funcionales documentadas.
- Contraste según `PORTFOLIO.md` §3.5: botón primario **teal + ink**, no ivory sobre teal; en superficies marfil usar `teal-ink` para acentos de texto.
- Comprobar tamaños **1920×911, 390×844 y 375×667** en toda nueva pantalla; sumar 1440×900 si corresponde al frame Figma y 320 px durante QA integral.
- **No scroll de página**: interfaz dentro de `100dvh`; únicamente los paneles internos definidos pueden desplazarse. Evitar cortes, superposición del header/footer/bandeja, scroll lateral y contenido inaccesible.
- En móvil comprobar controles táctiles de al menos **44×44 px** conforme a `FIGMA-DESIGN.md`, menús, portadas, bandeja y panel tecnológico.
- Verificar variantes pertinentes: default/hover/focus/selected/disabled; cambio de idioma, textos largos y estados «Planeado».

### B. Navegación tipo sello discográfico

Cuando el cambio afecte a la navegación:
- Seleccionar una portada muestra su ficha sin abrirla.
- Abrir un álbum mueve la portada a la cabecera y el conejo a la bandeja; la URL es compartible.
- Abrir una pista conserva portada, demo y bandeja; «Mostrar todas» regresa al listado.
- El crédito tecnológico abre su ficha como panel (hoja inferior en móvil) y la entrada directa muestra la página adecuada.
- Cerrar un panel preserva el estado anterior; comprobar foco, Escape, botón Atrás y reentrada.
- Verificar los recorridos de `FIGMA-DESIGN.md` §6: D01→D02→D04→D06→D04→D01, D04→D07 y equivalentes móviles, solo si los estados ya existen.
- Verificar estados sin animación o sin soporte de View Transitions: la funcionalidad no debe depender de efectos visuales.

### C. Conejo, Blender y movimiento

Cuando se alteren assets, capas o animaciones:
- La base es el personaje **aprobado**; no recrear su identidad ni volver a Blender para arreglos CSS.
- Según `PLAN-IMAGENES.md`, CSS/JS + capas/fotogramas ya es la opción decidida en C9; no reabrir Rive/Three.js por defecto.
- Una sola cabeza y un solo cuerpo visibles por instante; evitar transparencias, parpadeos, saltos a reposo no previstos o manejadores de estado que compitan.
- Los cambios rápidos de selección y los giros interrumpidos no deben dejar el conejo en pose incorrecta.
- Pausar las animaciones cuando la pantalla/pestaña esté oculta o el estado del componente no esté activo; usar pose fija con `prefers-reduced-motion`.
- No iniciar animación pesada durante una transición; carga inicial de pose necesaria y diferimiento de recursos adicionales.
- Comprobar peso real de los assets si se modifican; distinguir **objetivos antiguos de presupuesto** de medidas y decisiones posteriores de `PLAN-IMAGENES.md`. Reportar desviaciones, no fallos ficticios.
- Los renderizados `.blend`, masters y material pesado no deben aparecer accidentalmente en Git; no ejecutar código de Blender MCP sin entender su alcance y sin proteger el archivo fuente.

### D. Código, contenido, i18n y seguridad

- Respetar Next.js 16.4, TypeScript strict, React, Tailwind v4, arquitectura y límites de dependencias definidos en `PORTFOLIO.md`.
- No introducir dependencias, CMS, base de datos o backend por una revisión de QA.
- Contenido UI en `es` y `en`, diccionarios consistentes, rutas localizadas, `lang` y metadatos correctos donde aplique.
- Proyectos planeados o en desarrollo **no deben** mostrar demos, pistas, métricas ni resultados inexistentes; no exponer datos reales del cliente.
- Si se modifican componentes compartidos, respetar las reglas de capas e imports del proyecto.
- Verificar accesibilidad: navegación con teclado, foco visible y restaurado, roles/etiquetas, contraste y manejo de movimiento reducido.
- No divulgar secretos, credenciales, datos privados ni modificar producción por hacer QA.

### E. Rendimiento, SEO y salida a producción

Aplicar cuando el cambio afecte rendimiento, contenido público o una entrega:
- Medir con **build de producción**, nunca inferir el rendimiento de `npm run dev`.
- En Lighthouse revisar LCP observado; no concluir problemas por LCP simulado sin corroboración según las instrucciones del proyecto.
- Para el hito de calidad de `DESARROLLO.md`: objetivos LCP < 2,5 s, CLS < 0,1, INP < 200 ms, y revisión de tamaños 320–1920 px; registrar dispositivo, modo de medición y resultado, no inventar métricas.
- Para publicación, revisar sitemap, hreflang, robots/noindex, OG, favicon y URLs en ambos idiomas según implementación.
- La web se mantiene **personal e informativa** en Vercel Hobby: no introducir ventas, precios, pagos, anuncios ni disponibilidad freelance.
- No realizar despliegue productivo sin aprobación explícita.

## 4. Ejecución eficaz y herramientas

1. **Primero evidencia existente:** Git diff, código, logs o capturas recientes pertinentes; evitar generar idénticas evidencias de nuevo sin motivo.
2. **Luego comprobaciones focalizadas:** usar scripts ya disponibles y verificar cómo se llaman en `package.json`; no asumir que existen `test`, Playwright o axe si no están instalados.
3. **QA visual solo si se dispone de navegador/capturas/Figma:** inspeccionar estados necesarios y documentar condiciones. Sin estas herramientas, marcar «no verificado visualmente».
4. **Un solo bloque de validación por conjunto coherente de cambios**, en lugar de reiterar build/auditorías en cada microajuste.
5. **Antes de cerrar el bloque:** ejecutar `npm run check`; no declarar «aprobado» si falló o no se ejecutó. Reportar limitaciones.
6. No crear reportes nuevos ni guardar capturas por defecto; solo si son necesarios para reproducir un defecto o para un hito de entrega. Respetar `.gitignore`.
7. Si la sesión acumula otros temas o contexto obsoleto, recomendar `/compact` cuando importa conservar continuidad, o `/clear` **después** de persistir la información esencial. No asegurar recuentos exactos de tokens sin medirlos.

## 5. Evidencia, severidades y salida breve

Reportar primero los defectos comprobados, ordenados por severidad:
- **Bloqueante:** impide recorrido principal, rompe build o introduce riesgo serio de seguridad/datos.
- **Alta:** regresión visible/funcional importante, accesibilidad crítica o error reproducible significativo.
- **Media:** defecto localizado con impacto moderado.
- **Baja:** pulido visual o mejora opcional.

Formato predeterminado, conciso:

```text
QA Bunny Records — Q[1-4] | Paso [N] | Rama [rama]
Alcance: [rutas/archivos/estados]
Resultado: [aprobado / aprobado con observaciones / bloqueado / incompleto]
Hallazgos:
- [severidad] [archivo/ruta + condición] — [reproducción + causa probable, si hay evidencia] — [corrección sugerida]
Comprobado: [herramienta/comando, resultado]
No comprobado: [motivo]
Siguiente acción: [una acción concreta]
```

- No decir «cero errores» si solo se ha revisado parte del producto.
- Separar hallazgos confirmados de hipótesis.
- Si no hay incidencias, reportar el alcance y la evidencia en pocas líneas.
- No hacer cambios de código o commits fuera de la autorización y reglas del proyecto.
- Proponer **una mejora de proceso** solo si surge una repetición clara (regresión reincidente, componente duplicado, QA redundante).

## 6. Evolución hacia una skill genérica

Mantener aquí solamente reglas de Bunny Records. Después de varias ejecuciones reales, registrar qué controles fueron útiles, falsos positivos, duración y comprobaciones innecesarias. Extraer a otra skill **solo** el núcleo general: diff→riesgo→pruebas proporcionales→evidencia→reporte. Mover las reglas específicas (sello, Figma, 100dvh, conejo, paleta, i18n y comandos) a una referencia o configuración del proyecto.

No automatizar instalaciones, acceso a cuentas, cambios de archivos críticos ni despliegues sin permiso.
