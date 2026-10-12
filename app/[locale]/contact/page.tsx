import type { Metadata } from "next";

import { ContactSheet } from "@/components/sections/contact";
import { Turntable } from "@/components/sections/turntable";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return { title: dict.contact.metaTitle, description: dict.contact.body };
}

// Contacto: el disco marfil baja de la barra a la escena (BUNNY-RECORDS.md §5.3.2).
export default async function ContactPage() {
  const dict = await getDictionary();
  return (
    <Turntable kind="contact" discLabel={dict.contact.discLabel} pose="present-right" compact>
      <ContactSheet />
    </Turntable>
  );
}
