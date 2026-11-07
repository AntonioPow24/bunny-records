import createMDX from "@next/mdx";
import type { NextConfig } from "next";

// CSP básica compatible con páginas estáticas (guía content-security-policy.md, "Without Nonces"): los
// nonces obligarían a renderizar cada petición. Next mete scripts y estilos en línea, de ahí 'unsafe-inline'.
// Todo se sirve desde el propio dominio: no hay scripts, fuentes ni imágenes de terceros (la analítica de Vercel
// también va por /_vercel/insights). Paso 13; analítica, mejora 40.
const isDev = process.env.NODE_ENV === "development";
const csp = [
  "default-src 'self'",
  // En desarrollo, @vercel/analytics carga su script de depuración (solo registra en consola, no envía datos).
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval' https://va.vercel-scripts.com" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  // Sin formularios en el sitio (el contacto es un mailto): ningún envío permitido. Auditoría, mejora 42.
  "form-action 'none'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  // Aísla la ventana de las que abra o la abran (enlaces externos, pestañas nuevas). Mejora 42.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      // Capas del conejo, videoclips y música: sin hash en el nombre, así que un día de caché (y una semana sirviendo
      // la copia guardada mientras se revalida) en lugar de revalidar cada archivo en cada visita. Un cambio tarda
      // como mucho un día en llegar a quien ya los tenía. Mejora 52.
      {
        source: "/:dir(bunny|demos|audio)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
  partialPrefetching: true,
  // Los capítulos de los casos de estudio son MDX que se importan desde content/ (no son páginas).
  pageExtensions: ["ts", "tsx", "mdx"],
  // Portadas en AVIF cuando el navegador lo admite (más ligero que WebP), con WebP de respaldo. Paso 7.5.
  images: { formats: ["image/avif", "image/webp"] },
  experimental: {
    // app/global-not-found.tsx: 404 para URLs fuera de /es y /en (el layout raíz depende del idioma).
    globalNotFound: true,
    // CSS en el HTML: elimina 3 peticiones que bloqueaban el render (~300 ms de LCP en móvil). Paso 7.5.
    inlineCss: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
