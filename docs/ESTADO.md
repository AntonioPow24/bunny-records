# Estado

Actualizar en una línea al cerrar algo relevante; nunca como bitácora (el historial va a Notion).

**Ahora:** sitio completo en `main` y publicado en `bunnyrecords.dev` (indexable; `bunny-records.vercel.app` redirige con 308). Fase de mejoras: hasta la 29 (créditos sin herramientas de IA) hecha. Sin bloque en curso.

## Pendiente

- Validar tarjetas en Facebook/LinkedIn. Hacia el 2026-11-05, comprobar si Google ya muestra el favicon; si no, volver a inspeccionar `/es` en Search Console.
- Portadas definitivas (las actuales son provisionales) y concepto de los proyectos planeados.
- Sacar `idea/`, `imagelogo/` y lo pesado de `design/character/` a un archivo fuera del proyecto (ya ignorados en Git).
- Figma: limpiar en `01 Sistema` los componentes de la primera versión que ya no se usen (comprobar instancias antes; con autorización).
- No hecho aún: prueba con lector de pantalla real (NVDA).
- Al actualizar dependencias, revisar el aviso de `npm audit` por `braces` (aceptado en `PORTFOLIO.md` §10).

## Decisiones recientes

- 2026-10-22: mejora 29: Claude Code y Codex fuera de los créditos de los proyectos; ya no se exige code-review antes del merge (hook retirado en Claude y Codex).
- 2026-10-22: mejora 27: Next.js 16.4.2 (corrige RCE en Image Optimization y DoS en Server Actions).
- 2026-10-22: mejora 26: textos de los tres casos de estudio más cercanos y menos técnicos (los detalles de implementación quedan en cada repo).
- 2026-10-22: mejora 24 (SEO) desplegada: manifiesto e iconos grandes, Organization con logo y ProfilePage, descripciones completas, sitemap con portadas. Indexación de `/es` pedida y sitemap reenviado; Rich Results Test válido (ProfilePage, Breadcrumbs).
- 2026-10-22: UI Component pasa de planeado a publicado (caso de estudio en 5 pistas a partir de los docs de `ui-component`); portada aún provisional y sin videoclip.
- 2026-10-16: el conejo de la colección baila solo 4 s cada 8 s (animación CSS); el clic mantiene su baile corto.
- 2026-10-14: históricos sintetizados y verificados en [Antonio Development Hub / Bunny Records](https://app.notion.com/p/3f95744bc2fe81f4be76f89a32ea5fc3); migración aprobada y referencias documentales corregidas en `reorg-contexto`. Respaldo conservado en `~/.ai-backup/2026-10-14-reorganizacion/`.
- 2026-10-14: correo de Contacto como enlace `mailto` (sin botón Copiar).
- 2026-10-14: "Ampliar" el videoclip abre un modal centrado (hasta 960 px).
- 2026-10-14: documentación reorganizada con contexto progresivo (`~/.ai`, `PROJECT.yaml`, este archivo).

## Bloqueos

Ninguno.
