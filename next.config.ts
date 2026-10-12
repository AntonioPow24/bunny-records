import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
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
