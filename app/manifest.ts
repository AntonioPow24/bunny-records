import type { MetadataRoute } from "next";

import { SITE_NAME } from "@/lib/seo";

// Manifiesto con los iconos grandes (design/logo/meta/README.md): Android, accesos directos y buscadores
// que necesitan algo más que el favicon de 48 px.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Bunny",
    start_url: "/",
    display: "standalone",
    background_color: "#0C111C",
    theme_color: "#0C111C",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
