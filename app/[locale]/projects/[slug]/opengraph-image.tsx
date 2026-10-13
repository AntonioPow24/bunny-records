import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import en from "@/dictionaries/en.json";
import es from "@/dictionaries/es.json";
import { getProject, getProjects } from "@/lib/content";
import { hasLocale } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/seo";

// Imagen al compartir un álbum (Figma "OG · plantilla por álbum", 1200×630). Sus pistas la heredan.
// Se genera en el build: fuentes y portada se leen del disco (Sora y Geist Mono de Google Fonts, licencia OFL).
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Bunny Records";

const dictionaries = { es, en };

// Fuentes, portada y logo se leen del disco una vez y quedan en caché (con Cache Components, leer archivos
// sin caché volvía dinámica la ruta y fallaba al servirla). Se guardan en base64: el valor debe ser serializable.
async function loadAssets(slug: string) {
  "use cache";
  const [sora, geist, mono, cover, logo] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/Sora-Bold.ttf")),
    // Geist normal: la que trae next/og.
    readFile(join(process.cwd(), "node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf")),
    readFile(join(process.cwd(), "assets/fonts/GeistMono-Medium.ttf")),
    readFile(join(process.cwd(), "public/images/projects", slug, "cover.jpg")),
    readFile(join(process.cwd(), "app/icon.svg")),
  ]);
  const b64 = (b: Buffer) => b.toString("base64");
  return { sora: b64(sora), geist: b64(geist), mono: b64(mono), cover: b64(cover), logo: b64(logo) };
}

// Una imagen por álbum, generada en el build (sin esto la ruta de la imagen sería dinámica).
export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project || !hasLocale(locale)) return new Response("Not found", { status: 404 });
  const dict = dictionaries[locale];

  const { sora, geist, mono, cover, logo } = await loadAssets(project.slug);
  const status = {
    published: dict.status.published,
    "in-development": dict.status.inDevelopment,
    planned: dict.status.planned,
  }[project.status];
  const title = project.title[locale];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "radial-gradient(circle at 75% 45%, #14303a 0%, #0C111C 60%)",
          color: "#F4F4F2",
        }}
      >
        <div style={{ position: "absolute", left: 80, top: 150, width: 560, display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "Geist Mono", fontSize: 15, letterSpacing: 1.5, color: "#329DA8", textTransform: "uppercase" }}>
            {`Bunny Records · ${dict.album.label.replace(" · {year}", "")}`}
          </div>
          <div style={{ fontFamily: "Sora", fontSize: 60, lineHeight: 1.05, marginTop: 16 }}>{title}</div>
          <div style={{ fontFamily: "Geist", fontSize: 22, lineHeight: 1.35, color: "#9BA3B0", marginTop: 18, maxWidth: 520 }}>
            {project.tagline[locale]}
          </div>
          <div style={{ display: "flex", marginTop: 20 }}>
            <div
              style={{
                fontFamily: "Geist Mono",
                fontSize: 14,
                letterSpacing: 1.2,
                textTransform: "uppercase",
                color: "#329DA8",
                border: "1px solid #1F4F57",
                background: "#10262D",
                borderRadius: 999,
                padding: "6px 14px",
              }}
            >
              {`+ ${status}`}
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 700,
            top: 135,
            width: 384,
            height: 384,
            display: "flex",
            borderRadius: 18,
            overflow: "hidden",
            transform: "rotate(4deg)",
            boxShadow: "0 30px 60px rgba(0,0,0,0.55)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse solo admite <img> */}
          <img src={`data:image/jpeg;base64,${cover}`} width={384} height={384} alt="" style={{ objectFit: "cover" }} />
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 140,
              display: "flex",
              alignItems: "flex-end",
              padding: "0 22px 22px",
              background: "linear-gradient(to top, rgba(8,10,13,0.9), rgba(8,10,13,0))",
              fontFamily: "Sora",
              fontSize: 24,
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ position: "absolute", left: 80, top: 520, display: "flex", alignItems: "center", gap: 22 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse solo admite <img> */}
          <img src={`data:image/svg+xml;base64,${logo}`} width={35} height={40} alt="" />
          <div style={{ fontFamily: "Geist Mono", fontSize: 16, color: "#9BA3B0" }}>{new URL(SITE_URL).host}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Sora", data: Buffer.from(sora, "base64"), weight: 700 },
        { name: "Geist", data: Buffer.from(geist, "base64"), weight: 400 },
        { name: "Geist Mono", data: Buffer.from(mono, "base64"), weight: 500 },
      ],
    },
  );
}
