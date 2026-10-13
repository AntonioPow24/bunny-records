"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

type CopyEmailProps = {
  email: string;
  /** copy: nombre accesible ("Copiar email"); copyShort: texto visible ("Copiar"). */
  labels: { copy: string; copyShort: string; copied: string; copyFailed: string };
};

/** Email visible y seleccionable en una píldora, con botón primario para copiarlo y aviso accesible. */
export function CopyEmail({ email, labels }: CopyEmailProps) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
    window.setTimeout(() => setState("idle"), 2500);
  }

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-3 rounded-full border border-border py-1 pr-1 pl-4">
        {/* break-all: en móvil el email se parte en dos líneas en vez de cortarse con "…". */}
        <a
          href={`mailto:${email}`}
          className="text-mono min-w-0 flex-1 break-all text-foreground underline-offset-4 hover:underline max-sm:text-sm"
        >
          {email}
        </a>
        <Button size="sm" onClick={copy} aria-label={labels.copy}>
          {state === "copied" ? <Check /> : <Copy />}
          {labels.copyShort}
        </Button>
      </div>
      <span role="status" className="text-body-sm min-h-5 pl-4 text-primary">
        {state === "copied" ? labels.copied : state === "failed" ? labels.copyFailed : ""}
      </span>
    </div>
  );
}
