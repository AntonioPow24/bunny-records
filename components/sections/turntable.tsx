import { ViewTransition, type ReactNode } from "react";

import { Disc, type DiscKind } from "@/components/brand/disc";
import { Bunny } from "@/components/bunny/bunny";
import type { BunnyPose } from "@/components/bunny/engine";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

type TurntableProps = {
  kind: DiscKind;
  discLabel: string;
  /** Pose del conejo DJ (mira o señala el contenido). */
  pose: BunnyPose;
  children: ReactNode;
  /** Móvil compacto: disco pequeño y sin conejo, para fichas largas (Contacto, Figma V2-M11). */
  compact?: boolean;
};

// Escena de tocadiscos de Sobre mí y Contacto (Figma V2-D10/V2-D11; BUNNY-RECORDS.md §5.3.2):
// el disco que bajó de la barra gira a la izquierda y el conejo hace de DJ a su lado.
export function Turntable({ kind, discLabel, pose, children, compact = false }: TurntableProps) {
  return (
    <Container className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)] grid-rows-[auto_minmax(0,1fr)] gap-4 py-4 md:grid-cols-[minmax(0,1fr)_minmax(0,40rem)] md:grid-rows-1 md:items-center md:gap-12 md:py-8">
      <div className={cn("relative mx-auto flex w-full max-w-104 items-end gap-2 md:max-w-none md:justify-start", compact ? "justify-start" : "justify-center")}>
        <ViewTransition name={`disc-${kind}`} share="morph" default="none">
          <Disc
            kind={kind}
            label={discLabel}
            spinning
            className={compact ? "w-24 md:w-[min(34vw,48vh,30rem)]" : "w-[min(46vw,13rem)] md:w-[min(34vw,48vh,30rem)]"}
          />
        </ViewTransition>
        <Bunny
          mode="full"
          hold={pose}
          className={cn("w-[min(22vw,7rem)] shrink-0 md:absolute md:bottom-[-8%] md:left-[58%] md:block md:w-[min(15vw,26vh,13rem)]", compact && "hidden")}
        />
      </div>
      <div className="flex min-h-0 min-w-0 flex-col">{children}</div>
    </Container>
  );
}
