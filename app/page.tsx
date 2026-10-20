import Link from "next/link";
import { preload } from "react-dom";
import { ArrowRight } from "@/components/Arrows";
import { CtaBand } from "@/components/Blocks";
import Img from "@/components/Img";
import Marquee from "@/components/Marquee";
import { Mix, R, Serif } from "@/components/Type";
import HeroHome from "@/components/fx/HeroHome";
import HoverList, { type Offer } from "@/components/fx/HoverList";
import RoleDeck, { type Role } from "@/components/fx/RoleDeck";
import ZoomLines from "@/components/fx/ZoomLines";
import { JsonLd, pageJsonLd } from "@/lib/seo";
import { HERO_SIZES, IMG, SITE_DESCRIPTION, type ImgName } from "@/lib/site";

const ROLES: Role[] = [
  { href: "/ueber-mich/", title: "Mediamatik", org: "Swisscom · seit 2026", text: "Lehre als Mediamatikerin: Gestaltung, Kommunikation und Technik.", img: IMG.praesentation, alt: "Ayleen präsentiert am Rednerpult" },
  { href: "/social-media/", title: "Social Media", org: "Wendico", text: "Head of Social Media: Ideen, Content und Community.", img: IMG.edKamera, alt: "Ayleen mit analoger Kamera" },
  { href: "/leistungssport/", title: "Eiskunstlauf", org: "Team Starlight Switzerland", text: "Synchronized Skating im Schweizer Nachwuchskader.", img: IMG.eisJubel, alt: "Skaterinnen jubeln mit Medaillen" },
  { href: "/model/", title: "Model", org: "Zürich", text: "Editorial, Kampagne und Content.", img: IMG.edBlazer, alt: "Editorial-Portrait von Ayleen im Blazer" },
];

const OFFERS: Offer[] = [
  { title: "Content *Creation*", meta: "Foto · Video · Reels", img: IMG.berge, alt: "" },
  { title: "Social *Media*", meta: "Konzept · Redaktionsplan · Community", img: IMG.workshop, alt: "" },
  { title: "Model *Shootings*", meta: "Editorial · Kampagne · Beauty", img: IMG.edKinn, alt: "" },
  { title: "Workshops & *Auftritte*", meta: "Präsentation · Moderation", img: IMG.praesentation, alt: "" },
];

// Schwebende Editorial-Collage: Position, Breite und Scroll-Tempo je Bild
const SCATTER: { img: ImgName; label: string; style: React.CSSProperties; speed: number }[] = [
  { img: IMG.edKinn, label: "Editorial", style: { left: "1%", top: "4%", width: "19%" }, speed: 0.08 },
  { img: IMG.edBlazer, label: "Kampagne", style: { left: "25%", top: "26%", width: "21%" }, speed: -0.06 },
  { img: IMG.edClose, label: "Beauty", style: { left: "52%", top: "0%", width: "17%" }, speed: 0.12 },
  { img: IMG.edSitzend, label: "Studio", style: { left: "75%", top: "20%", width: "23%" }, speed: -0.03 },
  { img: IMG.edKamera, label: "Content", style: { left: "54%", top: "58%", width: "15%" }, speed: 0.14 },
];

export default function HomePage() {
  // Hero-Freisteller früh laden (LCP)
  preload("/img/hero-portrait-1100.webp", { as: "image", fetchPriority: "high", imageSrcSet: "/img/hero-portrait-700.webp 700w, /img/hero-portrait-1100.webp 1100w, /img/hero-portrait-1600.webp 1600w", imageSizes: HERO_SIZES });

  return (
    <>
      <JsonLd data={pageJsonLd({ name: "Start", path: "/", description: SITE_DESCRIPTION })} />

      <HeroHome />

      {/* Intro (Tiara): Unterschrift schreibt sich, Polaroid schwebt */}
      <section className="intro section bg-ivory">
        <div className="container">
          <figure className="polaroid" data-speed="-0.12"><Img name={IMG.nachtSwLachend} alt="Ayleen lacht, Schwarz-Weiss" sizes="180px" /><figcaption>Zürich</figcaption></figure>
          <span className="script" data-sign>Hey, ich bin Ayleen</span>
          <Serif text="Mediamatik, Social Media, *Eis* und Kamera" />
          <div className="intro-grid">
            <figure className="photo photo--45"><Img name={IMG.nachtFarbig} alt="Ayleen abends unter einer Strassenlaterne in Zürich" sizes="(max-width: 900px) 100vw, 40vw" /></figure>
            <div>
              <div className="intro-text">
                <R><p className="mono-caps">Mit drei stand ich zum ersten Mal auf dem Eis. Mit zwölf vor der Kamera.</p></R>
                <R delay={0.1}>
                  <p>Heute lerne ich Mediamatik bei Swisscom und verantworte Social Media bei Wendico. Daneben trainiere ich vier- bis fünfmal pro Woche im Schweizer Nachwuchskader.</p>
                  <p style={{ marginTop: "1.5rem" }}><Link href="/ueber-mich/" className="btn">Mehr über mich</Link></p>
                </R>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Was ich mache: Laufband + Kartendeck auf Beton (Tiara) */}
      <div className="bg-ivory" aria-hidden="true"><Marquee text="Was ich mache" /></div>
      <RoleDeck roles={ROLES} />

      {/* Statement Wort für Wort + schwebende Editorial-Collage (Midnight) */}
      <section className="statement dark section with-ghost">
        <div className="container">
          <span className="kicker">Wofür ich stehe</span>
          <div data-words><Mix text="Ich verbinde *Disziplin* vom Eis mit *Kreativität* vor und hinter der Kamera." /></div>
          <R><Link href="/model/" className="btn-rect">Model-Portfolio <ArrowRight /></Link></R>
          <div className="scatter">
            {SCATTER.map((s) => (
              <figure key={s.img} className="scatter-item" style={s.style} data-speed={s.speed}>
                <figcaption>{s.label}</figcaption>
                <Img name={s.img} alt={`${s.label}-Portrait von Ayleen Podgorny`} sizes="(max-width: 900px) 45vw, 22vw" />
              </figure>
            ))}
          </div>
        </div>
        <Marquee text="Ayleen Podgorny" ghost />
      </section>

      {/* Arbeiten (Midnight: Cream-Panel mit runden Ecken) */}
      <section className="panel section">
        <div className="container work">
          <div>
            <span className="kicker">Ausgewählte Arbeiten</span>
            <Mix text="Arbeiten, die *wirken*" size="xl" />
            <R><p>Ein eigener Social-Media-Workshop vor über 20 Gästen, ein Logo aus den eigenen Initialen, Flyer und Gestaltung für Events.</p></R>
            <R><Link href="/portfolio/" className="btn-rect">Portfolio <ArrowRight /></Link></R>
          </div>
          <div className="frame-wrap">
            <div className="frame" data-speed="-0.08">
              <div><Img name={IMG.workshop} alt="Ayleen hält ihren Social-Media-Workshop" sizes="280px" /></div>
              <div className="contain"><Img name={IMG.makeItClick} alt="Titelgrafik «Make it Click!»" sizes="280px" /></div>
              <div className="contain"><Img name={IMG.visitenkarte} alt="Visitenkarte mit AP-Monogramm" sizes="280px" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* Bild öffnet sich, Zeilen fahren herein */}
      <ZoomLines img={IMG.eisFormation} kicker="Vier Rollen, eine Haltung" lines={["Mediamatik.", "Social Media.", "Eiskunstlauf.", "Model."]} />

      {/* Angebote (Midnight à la carte) mit Bild am Cursor */}
      <section className="section bg-ivory">
        <div className="container">
          <div className="head center">
            <R><span className="kicker">Zusammenarbeit</span></R>
            <Mix text="Wofür du mich *anfragen* kannst" />
          </div>
          <HoverList items={OFFERS} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
