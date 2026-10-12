import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Los capítulos de los casos de estudio son MDX que se importan desde content/ (no son páginas).
  pageExtensions: ["ts", "tsx", "mdx"],
  experimental: {
    // app/global-not-found.tsx: 404 para URLs fuera de /es y /en (el layout raíz depende del idioma).
    globalNotFound: true,
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
