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
  /** "start": el contenido arranca arriba y no se mueve al cambiar de pista (Sobre mí); el disco sigue centrado. */
  align?: "center" | "start";
  /** Firma decorativa fija (Contacto, Figma T14 v3): fuera del disco que gira; debajo en escritorio, al lado en móvil. */
  signature?: ReactNode;
};

// Escena de tocadiscos de Sobre mí y Contacto (Figma V2-D10/V2-D11; BUNNY-RECORDS.md §5.3.2):
// el disco que bajó de la barra gira a la izquierda y el conejo hace de DJ a su lado.
// En escritorio todo cabe en la pantalla (lo largo se desplaza en su panel); en móvil la escena crece
// con el contenido y se desplaza toda la vista (<main>), sin que el documento haga scroll.
export function Turntable({ kind, discLabel, pose, children, compact = false, align = "center", signature }: TurntableProps) {
  return (
    <Container className="grid flex-1 grid-cols-[minmax(0,1fr)] content-start gap-4 py-4 md:min-h-0 md:grid-cols-[minmax(0,1fr)_minmax(0,40rem)] md:grid-rows-1 md:content-stretch md:items-center md:gap-12 md:py-8">
      <div className={cn("relative mx-auto flex w-full max-w-104 items-end gap-2 md:max-w-none md:justify-start", compact ? "justify-start" : "justify-center")}>
        <ViewTransition name={`disc-${kind}`} share="morph" default="none">
          <Disc
            kind={kind}
            label={discLabel}
            spinning
            className={compact ? "w-24 md:w-[min(34vw,48vh,30rem)]" : "w-[min(46vw,13rem)] md:w-[min(34vw,48vh,30rem)]"}
          />
        </ViewTransition>
        {/* El conejo DJ tiene su propia capa de transición, por encima del disco: así el disco pasa
            por detrás de él también durante la animación (antes lo tapaba y "saltaba" al terminar).
            El nombre va en CSS y no en <ViewTransition>: React no activa la capa cuando la escena entra
            desde otra ruta (Inicio → Sobre mí), y el conejo quedaba en `root`, debajo del disco. Las
            páginas ocultas por <Activity> tienen display: none, así que nunca hay dos con el mismo nombre. */}
        <Bunny
          mode="full"
          hold={pose}
          className={cn(
            "w-[min(22vw,7rem)] shrink-0 [view-transition-class:scene-bunny] [view-transition-name:scene-bunny] md:absolute md:bottom-[-8%] md:left-[58%] md:block md:w-[min(15vw,26vh,13rem)]",
            compact && "hidden",
          )}
        />
        {signature}
      </div>
      <div className={cn("relative flex min-w-0 flex-col md:min-h-0", align === "start" && "md:self-stretch md:pt-[max(0px,calc(50dvh-26rem))]")}>
        {children}
      </div>
    </Container>
  );
}
