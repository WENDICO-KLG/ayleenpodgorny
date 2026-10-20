import Link from "next/link";
import { ArrowRight } from "@/components/Arrows";
import { CtaBand, PageHero } from "@/components/Blocks";
import Img from "@/components/Img";
import { Mix, R } from "@/components/Type";
import ModelGallery from "@/components/fx/ModelGallery";
import SplitReveal from "@/components/fx/SplitReveal";
import { JsonLd, pageJsonLd, pageMeta } from "@/lib/seo";
import { IMG, type ImgName } from "@/lib/site";

const DESC = "Ayleen Podgorny, Model aus Zürich: Editorial-, Kampagnen-, Beauty- und Content-Shootings. Ausdruck aus der Filmkids-Ausbildung, Haltung aus dem Leistungssport.";
export const metadata = pageMeta({ title: "Model aus Zürich", description: DESC, path: "/model/", image: IMG.edBlazer });

const GALLERY: { img: ImgName; alt: string; caption: string }[] = [
  { img: IMG.edKinn, alt: "Editorial-Portrait vor dunkelrotem Hintergrund", caption: "Editorial" },
  { img: IMG.nachtSwLachend, alt: "Lachend unter einer Strassenlaterne", caption: "Street" },
  { img: IMG.edClose, alt: "Nahaufnahme in Schwarz-Weiss", caption: "Beauty" },
  { img: IMG.bambus, alt: "Lachend vor Bambus", caption: "Natural" },
  { img: IMG.edSitzend, alt: "Sitzend im Studio", caption: "Kampagne" },
  { img: IMG.nachtFarbig, alt: "Abends unter einer Strassenlaterne", caption: "Street" },
  { img: IMG.edKamera, alt: "Mit analoger Kamera", caption: "Editorial" },
  { img: IMG.berge, alt: "Fotografiert ein Bergpanorama", caption: "Content" },
];

export default function ModelPage() {
  return (
    <>
      <JsonLd data={pageJsonLd({ name: "Model", path: "/model/", description: DESC })} />
      <PageHero kicker="Editorial · Kampagne · Content" title="Vor der *Kamera*" img={IMG.edBlazer} alt="Schwarz-weisses Editorial-Portrait von Ayleen im Blazer" />

      <section className="panel section">
        <div className="container split split--wl split--center">
          <div>
            <R><span className="kicker">Model aus Zürich</span></R>
            <R><Mix text="Editorial, Kampagne und *Content*." /></R>
            <R as="dl" className="sedcard" style={{ margin: "2rem 0" }}>
              <div><dt>Basis</dt><dd>Zürich, Schweiz</dd></div>
              <div><dt>Bereiche</dt><dd>Editorial · Kampagne · Beauty · Content</dd></div>
              <div><dt>Hintergrund</dt><dd>Schauspiel- und Filmausbildung bei Filmkids</dd></div>
              <div><dt>Stärken</dt><dd>Ausdruck, Haltung, Ausdauer am Set</dd></div>
            </R>
            <R><Link href="/kontakt/" className="btn">Shooting anfragen <ArrowRight /></Link></R>
          </div>
          <R as="figure" className="photo photo--45" delay={0.1}><Img name={IMG.edSitzend} alt="Ayleen sitzt im Studio vor dunkelrotem Hintergrund" sizes="(max-width: 900px) 100vw, 40vw" /></R>
        </div>
      </section>

      {/* Zwei Stärken, ein Bild */}
      <SplitReveal left="Ausdruck" right="Haltung" img={IMG.edWide} alt="Editorial-Portrait von Ayleen im Studio" caption="Ausdruck aus der Filmausbildung, Haltung vom Eis" />

      {/* Galerie: Parallax-Spalten, Klick öffnet gross */}
      <section className="section bg-cream">
        <div className="container">
          <div className="head">
            <R><span className="kicker">Portfolio</span></R>
            <Mix text="Ausgewählte *Bilder*" />
          </div>
          <ModelGallery shots={GALLERY} />
        </div>
      </section>

      <CtaBand title="Shooting *geplant?*" text="Schreib mir mit Datum, Ort und Idee." />
    </>
  );
}
