import { Geist, Geist_Mono, Sora } from "next/font/google";

// Tres familias variables (PORTFOLIO.md §3.6), alojadas por next/font con latin-ext para el español.
export const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const fontVariables = `${sora.variable} ${geist.variable} ${geistMono.variable}`;
