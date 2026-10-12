import type { Metadata } from "next";

import { fontVariables } from "@/lib/fonts";
import es from "@/dictionaries/es.json";
import en from "@/dictionaries/en.json";
import "./globals.css";

// 404 para URLs que no encajan en ninguna ruta (p. ej. /fr/…). No hay idioma de ruta, así que se muestra en los dos.
// Next salta el layout normal: este archivo trae sus propios estilos, fuentes, <html> y <body>.
export const metadata: Metadata = {
  title: "404 · Bunny Records",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="es" className={`${fontVariables} h-full antialiased`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col">
        <main className="flex flex-1 flex-col items-start justify-center gap-10 px-6 py-24 md:px-30">
          {[
            { lang: "es", dict: es, href: "/es" },
            { lang: "en", dict: en, href: "/en" },
          ].map(({ lang, dict, href }) => (
            <section key={lang} lang={lang} className="flex flex-col items-start gap-3">
              <p className="text-label text-primary">{dict.notFound.eyebrow}</p>
              <h1 className="text-h2">{dict.notFound.title}</h1>
              <a
                href={href}
                className="inline-flex h-11 items-center rounded-full border border-border bg-secondary px-4 text-body-sm font-medium transition-colors hover:bg-accent"
              >
                {dict.notFound.backHome}
              </a>
            </section>
          ))}
        </main>
      </body>
    </html>
  );
}
