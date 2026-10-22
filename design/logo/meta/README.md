# Iconos y metadatos

Generados con `node design/logo/meta/build.mjs` (usa el Chrome instalado en modo sin ventana; no instala nada). Fuente: `design/logo/bunny-icon.svg`, `bunny-logo.svg` y `bunny-full-rest.png` de las capas archivadas (`C:\APPS\_archivo\bunny-records\design\character\layers\`). Revisión visual: `preview.html`.

| Archivo | Para qué | Dónde va en Next.js (App Router) |
|---|---|---|
| `favicon.ico` (16/32/48) | Pestañas, marcadores, navegadores antiguos | `app/favicon.ico` |
| `icon.svg` | Favicon nítido en navegadores modernos | `app/icon.svg` |
| `apple-touch-icon.png` (180) | Pantalla de inicio de iPhone/iPad (fondo opaco) | `app/apple-icon.png` |
| `icon-192.png`, `icon-512.png` | App instalada (PWA), Android, favicon grande para buscadores | `public/` + manifiesto; el de 192 también como `app/icon1.png` |
| `icon-maskable-512.png` | Android recorta en círculo/squircle: contenido dentro del 80 % central | `public/` + manifiesto (`purpose: maskable`) |
| `site.webmanifest` | Nombre, colores e iconos de la app | `app/manifest.ts` (mismos datos) |
| `og-default.png` (1200 × 630) | Vista previa al compartir: WhatsApp, Discord, X, LinkedIn, Facebook, Telegram, Slack | `app/opengraph-image.png` y `app/twitter-image.png` como respaldo; cada página genera la suya por idioma (fase O) |

Next.js genera las etiquetas `<link>`/`<meta>` solo con esos nombres de archivo. Además, en `metadata`/`viewport`:

```ts
export const viewport = { themeColor: '#0C111C' };            // barra del navegador móvil y color de la tarjeta en Discord
export const metadata = {
  metadataBase: new URL('https://<dominio>'),                   // obligatorio para URLs absolutas de og:image
  openGraph: { type: 'website', siteName: 'Bunny Records' },   // título y descripción: por página e idioma
  twitter: { card: 'summary_large_image' },
};
```

Notas:

- **WhatsApp** usa la vista pequeña con un recorte cuadrado central: por eso el conejo va centrado. Imagen de menos de 300 KB (esta: 190 KB) y URL absoluta con https.
- **Discord** colorea la barra lateral de la tarjeta con `theme-color`.
- El icono respeta exactamente las proporciones del logo (sin engrosar): a 16 px se lee como silueta.
- Si cambia el logo o el personaje, volver a ejecutar el script.
