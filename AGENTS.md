# Bunny Records — colaboración Codex / Claude Code

## Responsabilidades

- **Codex:** análisis UX/UI, exploración visual, refinamiento en Figma Design, arquitectura, planificación y revisión. Consulta código para entender viabilidad y comportamiento; no implementa cambios de producto sin autorización explícita del usuario.
- **Claude Code:** implementación e integración de los diseños aprobados, mantenimiento del código y validación técnica, responsive y accesible. Sigue este reparto y sus instrucciones operativas en `CLAUDE.md`; no inicia una implementación por una propuesta todavía sin aprobar.
- **Usuario:** elige y aprueba diseños e indica manualmente a Claude cuándo implementar. No iniciar tareas automáticas ni enviar instrucciones entre agentes.
- Ambos comparten este repositorio y las fuentes canónicas. No sobrescribir trabajo pendiente ni modificar simultáneamente los mismos archivos sin coordinación del usuario.

## Fuentes de verdad y lectura selectiva

Leer `DESARROLLO.md` al empezar cada sesión: estado, tarea y criterios de cierre. Consultar solo las secciones pertinentes de:

| Documento | Autoridad |
|---|---|
| `PORTFOLIO.md` | Stack, arquitectura, contenido, i18n, accesibilidad, SEO y hosting |
| `BUNNY-RECORDS.md` | Identidad, experiencia, navegación y movimiento; prevalece en asuntos visuales y de interacción |
| `FIGMA-DESIGN.md` | Archivo, componentes, referencias, estado y traspaso de diseños |
| `PLAN-IMAGENES.md` | Recursos, personaje aprobado, capas y exportaciones |

No duplicar estas especificaciones en instrucciones ni crear documentos equivalentes. Corroborar el estado con código y Git; las capturas antiguas de Figma no garantizan correspondencia con `main`. `CLAUDE.md` conserva las convenciones técnicas útiles para ambos; sus instrucciones de commit/push no constituyen autorización para ejecutarlos.

## Flujo de diseño y entrega

1. Inspeccionar Git, documentación y sección actual; proponer alternativas coherentes y viables.
2. Preservar el diseño original. Elegir copias de frames, sección, página o archivo separado solo tras verificar capacidades, plan y coste de Figma. **`Redesign Lab` es una opción pendiente, no una obligación:** no crear ni contratar nada por defecto.
3. Diseñar y revisar alternativas; el usuario aprueba la definitiva antes de integrar o implementar.
4. Preparar un traspaso compacto: sección, enlaces al original y al aprobado, diferencias, componentes afectados, responsive, interacción/movimiento, criterios de aceptación y aspectos que conservar. El usuario lo entrega a Claude.

## Límites y verificación

- No modificar configuración de Claude sin autorización. No realizar commits, push, merge ni despliegues sin aprobación explícita.
- No cambiar código de producción durante la preparación de herramientas. No instalar o actualizar software sin autorización.
- Mantener interfaz en `100dvh` con scroll interno, ES/EN, identidad y personaje aprobados; respetar contraste y movimiento reducido según las fuentes canónicas.
- Para cambios de código, ejecutar `npm run check` al cerrar el bloque. Para documentación exclusivamente, revisar diff, referencias y consistencia sin generar builds innecesarios.
- QA de Codex: `.agents/skills/portfolio-qa/SKILL.md`; QA de Claude: `.claude/skills/portfolio-qa/SKILL.md`. Aplicar controles proporcionales al riesgo.
- No afirmar que una conexión, diseño o comportamiento está verificado sin evidencia. No exponer credenciales ni incluirlas en Git.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
