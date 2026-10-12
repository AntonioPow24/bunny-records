"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

type CopyEmailProps = { email: string; labels: { copy: string; copied: string; copyFailed: string } };

/** Email visible y seleccionable + botón para copiarlo, con aviso accesible. */
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
    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
      <a href={`mailto:${email}`} className="text-mono break-all text-foreground underline-offset-4 hover:underline">
        {email}
      </a>
      <Button variant="secondary" size="sm" onClick={copy}>
        {state === "copied" ? <Check /> : <Copy />}
        {labels.copy}
      </Button>
      <span role="status" className="text-body-sm text-primary">
        {state === "copied" ? labels.copied : state === "failed" ? labels.copyFailed : ""}
      </span>
    </div>
  );
}
