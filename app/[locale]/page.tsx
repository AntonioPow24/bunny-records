import { Bunny } from "@/components/bunny/bunny";
import { getDictionary } from "@/lib/i18n/get-dictionary";

// Inicio provisional: en el paso 7 se convierte en la colección (arco de portadas y conejo en el escenario).
// Muestra el conejo completo: sigue al puntero, parpadea, respira y baila al pulsarlo.
export default async function HomePage() {
  const dict = await getDictionary();

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-12 text-center">
      <p className="text-label text-primary">{dict.home.eyebrow}</p>
      <h1 className="text-h2">{dict.home.title}</h1>
      <p className="text-label text-muted-foreground">{dict.home.comingSoon}</p>
      <Bunny mode="full" priority danceLabel={dict.bunny.dance} className="w-64 md:w-80" />
    </div>
  );
}
