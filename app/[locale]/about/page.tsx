import type { Metadata } from "next";

import { AboutTracks, type AboutTrack } from "@/components/sections/about-tracks";
import { Turntable } from "@/components/sections/turntable";
import { profile } from "@/content/profile";
import { getTechnologies } from "@/lib/content";
import { getDictionary, getLocale } from "@/lib/i18n/get-dictionary";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return { title: dict.about.metaTitle, description: profile.bio[locale] };
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
            <li key={p.title.es} className="flex gap-4 rounded-lg border border-border bg-card p-4">
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
      content: (
        <div className="flex flex-col gap-4">
          <p className="text-body-sm text-muted-foreground">{dict.about.gearIntro}</p>
          {GEAR_GROUPS.map((group) => (
            <div key={group} className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
              <p className="text-mono w-40 shrink-0 text-muted-foreground">{dict.about.gearGroups[group]}</p>
              <ul className="flex flex-wrap gap-2">
                {gear
                  .filter((t) => t.group === group)
                  .map((t) => (
                    <li key={t.id} className="text-body-sm rounded-full border border-border bg-secondary px-3.5 py-2">
                      {t.name}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <Turntable kind="about" discLabel={dict.about.discLabel} pose="curious-right">
      <div className="flex min-h-0 flex-1 flex-col gap-5">
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
