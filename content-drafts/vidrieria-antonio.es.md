# Vidriería Antonio — capítulos del caso de estudio (borrador, es)

> **Reemplazado (2026-10-12):** la fuente ahora es `content/projects/case-studies/vidrieria-antonio/{es,en}/*.mdx` y `content/projects/vidrieria-antonio.ts`. Este borrador se conserva solo como referencia.

*Borrador redactado el 2026-10-12 a partir de `C:\APPS\vidrieria-antonio` (README, ARQUITECTURA.md §1–15 e historial de commits). Antes de publicar lo revisa el usuario. Cuando se programe la web, cada capítulo pasa a `content/projects/case-studies/vidrieria-antonio/es/<nn>-<slug>.mdx` (`PORTFOLIO.md` §6).*

**Qué no se publica** (`PORTFOLIO.md` §8): nombre real del negocio, ciudad, teléfonos, precios, condiciones de la propuesta ni capturas con datos del cliente. El proyecto usa a propósito la marca genérica "Vidriería Antonio" mientras dura el periodo de prueba.

**Datos del álbum**
- **Año:** 2026 · **Rol:** propuesta, diseño y desarrollo · **Estado:** publicado (MVP en periodo de prueba con el cliente)
- **Una línea:** Web corporativa con panel de administración para una vidriería local.
- **Créditos:**
  - Next.js — Server Components y Server Actions
  - TypeScript — tipos de punta a punta
  - Tailwind CSS + shadcn/ui — sistema de diseño
  - Supabase — base de datos, login y fotos, protegidos con RLS
  - React Hook Form + Zod — validación compartida entre cliente y servidor
  - Framer Motion — micro-interacciones puntuales
  - GitHub Actions — tarea diaria que evita que la base se pause
  - Netlify — hosting del periodo de prueba
- **Notas de producción:**
  - El mayor riesgo no fue técnico, sino el contenido: sin fotos reales, el diseño no se puede validar.
  - Hacer QA sobre el build de producción encontró errores que en modo desarrollo no existen.

---

## 01 · El problema
*Subtítulo: Un taller con buen trabajo y sin vitrina*

Una vidriería local hacía buenos trabajos (mamparas, fachadas, barandas, ventanas), pero no tenía dónde mostrarlos. Dependía del boca a boca y de enviar fotos sueltas por WhatsApp.

Al analizarlo aparecieron dos públicos que deciden de forma distinta:

- **Particulares**, que eligen por fotos, cercanía y confianza.
- **Estudios de arquitectura y constructoras**, que buscan casos parecidos al suyo, capacidad técnica y rapidez de respuesta.

La web tenía que convencer a los dos con el mismo contenido y, además, el negocio debía poder actualizarla sin depender de un programador.

Este proyecto no fue un encargo: fue una propuesta mía al negocio. Eso cambió las prioridades: la meta era que el dueño dijera "sí" y empezara a usarlo, no entregar una lista de funciones.

## 02 · La solución
*Subtítulo: Proyectos como prueba, WhatsApp como puerta*

Una web corporativa con un panel de administración propio:

- **Proyectos como prueba social.** No es una galería decorativa: se filtran por categoría para que cada público llegue rápido a lo suyo, con fichas de detalle y galería.
- **Servicios** con su ficha y los proyectos reales de esa categoría al final.
- **Contacto directo por WhatsApp** con un mensaje ya escrito. Los clientes del negocio usan WhatsApp, no email, así que un formulario habría sido fricción.
- **Panel de administración** para crear y editar proyectos, servicios, textos y datos de contacto, con subida de fotos.

Todo con una identidad propia (azul y rojo) que salió de las observaciones del cliente sobre una primera versión.

## 03 · Cómo lo construí
*Subtítulo: Next.js, Supabase y seguridad en la base*

- **Next.js (App Router) + TypeScript.** Las páginas públicas son Server Components que leen directamente de la base. No hay una API intermedia que mantener.
- **Supabase** para base de datos, autenticación y almacenamiento de fotos. La seguridad real está en la base: políticas RLS de solo lectura para el público y de escritura solo para administradores. La clave privilegiada nunca llega al navegador.
- **Server Actions** para todo lo que modifica datos desde el panel, con **Zod + React Hook Form** compartiendo el mismo esquema en cliente y servidor.
- **Fotos comprimidas en el navegador** antes de subirlas (un PNG de 4 MB pasa a un JPG de 1600 px) y buckets limitados a JPG, PNG y WEBP de hasta 8 MB.
- **Tailwind CSS + shadcn/ui** sobre tokens de diseño, con contraste AA calculado para cada combinación de color.
- **Una tarea diaria en GitHub Actions** que mantiene activa la base del plan gratuito, que se pausa tras una semana sin actividad.

## 04 · Decisiones importantes
*Subtítulo: Lo que quité también cuenta*

- **WhatsApp en lugar de formulario.** Eliminé el formulario de cotización, la tabla que lo guardaba y el servicio de email: no encajaban con cómo se comunica la clientela.
- **Sin testimonios inventados.** Se descartó la sección hasta tener testimonios reales.
- **Sin CMS externo.** Supabase ya cubría datos, login y archivos; un CMS habría duplicado la capa de datos.
- **Hosting según los términos.** El plan gratuito de Vercel es solo para uso no comercial, así que la prueba corre en Netlify.
- **URLs estables.** Al editar el título de un proyecto, su dirección ya no cambia sola: así no se rompen los enlaces compartidos.
- **Marca genérica durante la prueba.** El sitio usa un nombre neutro y placeholders hasta que el negocio decida.

## 05 · Lo que aprendí
*Subtítulo: Probar en producción y escuchar al cliente*

- **Probar sobre el build de producción.** En desarrollo todo funcionaba. En producción, Next guardaba en caché las consultas por un año y la web no reflejaba los cambios del panel. Lo resolví revalidando el sitio público en cada escritura, con una caducidad de una hora como red de seguridad.
- **El contenido es el cuello de botella.** Sin fotos reales no se valida el diseño; conviene pedirlas antes de maquetar.
- **Una propuesta se gana con una prueba.** Ofrecer un periodo de prueba en una dirección temporal y sin indexar redujo el riesgo para ambos.
- **El feedback visual llega pronto.** La primera paleta no representaba al negocio; cambiarla a tiempo fue más barato que defenderla.
