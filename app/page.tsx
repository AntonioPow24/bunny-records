import { Logo } from "@/components/brand/logo";

// Página provisional. En el paso 4 la reemplaza app/[locale]/page.tsx (la colección).
export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
      <Logo title="Bunny Records" className="h-20" />
      <h1 className="text-h2">Bunny Records</h1>
      <p className="text-label text-muted-foreground">En construcción</p>
    </main>
  );
}
