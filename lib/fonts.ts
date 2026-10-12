import { Geist, Geist_Mono, Sora } from "next/font/google";

// Tres familias variables (PORTFOLIO.md §3.6), alojadas por next/font.
// Paso 7.5: solo el subconjunto "latin", que ya incluye las letras del español (á é í ó ú ñ ü ¿ ¡);
// "latin-ext" (lenguas de Europa central) duplicaba las descargas. Geist Mono no se precarga: solo
// aparece en etiquetas pequeñas y no debe competir con el contenido principal.
export const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

export const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const fontVariables = `${sora.variable} ${geist.variable} ${geistMono.variable}`;
