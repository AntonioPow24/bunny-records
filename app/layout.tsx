import type { Metadata } from "next";
import "./globals.css";

// Layout raíz provisional del paso 2. En el paso 4 pasa a app/[locale]/layout.tsx
// (<html lang> por idioma) y en el paso 3 se cargan las fuentes de la marca.
export const metadata: Metadata = {
  title: "Bunny Records",
  description: "Portfolio de Antonio García Romero.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning solo cubre los atributos de <html>: extensiones como
    // LanguageTool añaden data-lt-installed antes de que React hidrate.
    <html lang="es" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
