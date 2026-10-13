import createMDX from "@next/mdx";
import type { NextConfig } from "next";

// CSP básica compatible con páginas estáticas (guía content-security-policy.md, "Without Nonces"): los
// nonces obligarían a renderizar cada petición. Next mete scripts y estilos en línea, de ahí 'unsafe-inline'.
// Todo se sirve desde el propio dominio: no hay scripts, fuentes ni imágenes de terceros. Paso 13.
const isDev = process.env.NODE_ENV === "development";
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  poweredByHeader: false,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
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
