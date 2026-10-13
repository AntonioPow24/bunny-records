import type { Metadata } from "next";

import { ContactSheet } from "@/components/sections/contact";
import { Turntable } from "@/components/sections/turntable";
import { getDictionary, getLocale } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return buildMetadata({ locale, path: "/contact", title: dict.contact.metaTitle, description: dict.contact.body });
}

// Contacto: el disco marfil baja de la barra a la escena (BUNNY-RECORDS.md §5.3.2).
export default async function ContactPage() {
  const dict = await getDictionary();
  return (
    <Turntable
      kind="contact"
      discLabel={dict.contact.discLabel}
      pose="present-right"
      compact
      signature={
        // Firma de Figma (T14 v3) exportada a SVG: decorativa y estática, no gira con el disco.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/brand/firma-antonio.svg"
          alt=""
          aria-hidden="true"
          width={188}
          height={81}
          className="w-32 self-center md:absolute md:top-[calc(100%-0.5rem)] md:left-[8%] md:w-44 md:self-auto"
        />
      }
    >
      <ContactSheet />
    </Turntable>
  );
}
