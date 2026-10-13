import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { AboutTracks, type AboutTrack } from "@/components/sections/about-tracks";
import { Turntable } from "@/components/sections/turntable";
import { profile } from "@/content/profile";
import { getTechnologies } from "@/lib/content";
import { getDictionary, getLocale } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return buildMetadata({ locale, path: "/about", title: dict.about.metaTitle, description: profile.bio[locale] });
}

const GEAR_GROUPS = ["frontend", "backend", "design", "workflow"] as const;

// Sobre mí = ficha del artista dividida en pistas para caber sin scroll (BUNNY-RECORDS.md §5.3.2).
export default async function AboutPage() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const gear = getTechnologies().filter((t) => t.inGear);
  const [bioTitle, principlesTitle, tourTitle, gearTitle] = dict.about.tracks;

  const tracks: AboutTrack[] = [
    {
      id: "bio",
      title: bioTitle,
      content: <p className="text-body max-w-prose text-foreground">{profile.bio[locale]}</p>,
    },
    {
      id: "principles",
      title: principlesTitle,
      content: (
        <ul className="flex flex-col gap-3">
          {profile.principles.map((p) => (
            <li key={p.title.es} className="surface-lit flex gap-4 rounded-lg border border-border bg-card p-4">
              <span aria-hidden="true" className="text-h2 leading-none text-primary">
                {p.glyph}
              </span>
              <div>
                <p className="text-body-strong">{p.title[locale]}</p>
                <p className="text-body-sm text-muted-foreground">{p.body[locale]}</p>
              </div>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "tour",
      title: tourTitle,
      content: (
        <ol className="flex flex-col">
          {profile.tour.map((stop) => (
            <li key={stop.role.es + stop.years.es} className="flex gap-4 border-b border-border py-3 md:gap-6">
              <span className="text-mono w-24 shrink-0 text-primary md:w-28">{stop.years[locale]}</span>
              <div>
                <p className="text-body-strong">{stop.role[locale]}</p>
                <p className="text-body-sm text-muted-foreground">{stop.place[locale]}</p>
              </div>
            </li>
          ))}
        </ol>
      ),
    },
    {
      id: "gear",
      title: gearTitle,
      // Instrumentos del estudio (Figma T11, FIGMA-DESIGN.md §8.1): ficha editorial con categorías numeradas.
      content: (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-label text-primary">{dict.about.gearTitle}</p>
            <p className="text-body-sm text-muted-foreground">{dict.about.gearIntro}</p>
          </div>
          <ol className="flex flex-col border-t border-border">
            {GEAR_GROUPS.map((group, index) => (
              <li key={group} className="flex flex-col gap-2 border-b border-border py-4 md:flex-row md:gap-4 md:py-3">
                <p className="text-body-sm flex shrink-0 items-baseline gap-2 text-muted-foreground md:w-40 md:pt-3">
                  <span className="text-mono text-primary">{String(index + 1).padStart(2, "0")}</span>
                  {dict.about.gearGroups[group]}
                </p>
                <ul className="grid flex-1 grid-cols-2 gap-x-2 md:grid-cols-3">
                  {gear
                    .filter((t) => t.group === group)
                    .map((t) => (
                      <li key={t.id}>
                        <Link
                          href={`/${locale}/stack/${t.id}`}
                          prefetch
                          className="group text-body-sm flex min-h-11 items-center justify-between gap-2 rounded-md px-2 text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                        >
                          {t.name}
                          <ArrowUpRight
                            aria-hidden="true"
                            className="size-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                          />
                        </Link>
                      </li>
                    ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      ),
    },
  ];

  return (
    <Turntable kind="about" discLabel={dict.about.discLabel} pose="curious-right" align="start">
      <div className="flex flex-col gap-5 md:min-h-0 md:flex-1">
        <div className="flex flex-col gap-2">
          <p className="text-label text-primary">{dict.about.eyebrow}</p>
          <h1 className="text-display">{profile.name}</h1>
          <p className="text-body-sm text-muted-foreground">
            {profile.role[locale]} · {profile.degree[locale]} · {profile.location[locale]}
          </p>
        </div>
        <AboutTracks tracks={tracks} label={dict.about.tracksLabel} />
      </div>
    </Turntable>
  );
}
