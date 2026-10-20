import Link from "next/link";
import { ArrowRight } from "@/components/Arrows";
import { CtaBand, PageHero } from "@/components/Blocks";
import { BarChart } from "@/components/Graphics";
import { IconExternal } from "@/components/Icons";
import Img from "@/components/Img";
import { Mix, R } from "@/components/Type";
import StoryPhone from "@/components/fx/StoryPhone";
import { JsonLd, pageJsonLd, pageMeta } from "@/lib/seo";
import { IMG, WENDICO } from "@/lib/site";

const DESC = "Ayleen Podgorny ist Head of Social Media bei Wendico in der Schweiz: Ideen, Redaktionsplan, Foto- und Videoproduktion und Auswertung. Dazu ihr Social-Media-Workshop «Make it Click!» bei Swisscom.";
export const metadata = pageMeta({ title: "Head of Social Media bei Wendico", description: DESC, path: "/social-media/", image: IMG.edKamera });

const SURVEY = [
  { label: "Unterhaltung", value: 25 },
  { label: "Kontakt halten", value: 22 },
  { label: "Information", value: 20 },
  { label: "Zeitvertreib", value: 13 },
  { label: "Kein Vorteil", value: 4 },
];

export default function SocialMediaPage() {
  return (
    <>
      <JsonLd data={pageJsonLd({ name: "Social Media", path: "/social-media/", description: DESC })} />
      <PageHero kicker="Wendico" title="Social *Media*" img={IMG.edKamera} alt="Ayleen hält eine analoge Kamera" />

      <section className="panel section">
        <div className="container split split--center">
          <div>
            <R><span className="kicker">Head of Social Media</span></R>
            <R><Mix text="Ich verantworte die Kanäle von *Wendico*." /></R>
            <R><p className="lead" style={{ margin: "1.25rem 0 1.75rem" }}>Von der ersten Idee bis zum veröffentlichten Beitrag, mit eigenem Blick durch die Kamera.</p></R>
            <R><a href={WENDICO} className="btn-rect" target="_blank" rel="noopener noreferrer">wendico.ch <IconExternal /></a></R>
          </div>
          <R delay={0.1}>
            <span className="kicker" style={{ marginBottom: "1rem" }}>Formate</span>
            <ul className="chips">
              {["Reels", "Stories", "Carousels", "Fotografie", "Video", "Kampagnen"].map((c) => <li key={c} className="chip">{c}</li>)}
            </ul>
          </R>
        </div>
      </section>

      {/* Ablauf als Story-Handy */}
      <StoryPhone />

      {/* Fallbeispiel Workshop (Midnight-Karte) + echte Umfragedaten */}
      <section className="section bg-ivory">
        <div className="container">
          <R as="article" className="tab" style={{ position: "relative", top: 0 }}>
            <div className="tab-head"><span>Fallbeispiel</span><span>Swisscom</span></div>
            <div className="tab-body">
              <div>
                <Mix text="Workshop «Make it *Click!*»" />
                <p>Mein Social-Media-Workshop als Abschlussarbeit: selbst konzipiert, mit eigenem Flyer beworben und vor Publikum präsentiert.</p>
                <dl className="tab-meta">
                  <dt>Rolle</dt><dd>Konzept, Inhalt, Flyer, Präsentation</dd>
                  <dt>Publikum</dt><dd>Über 20 Gäste</dd>
                  <dt>Umfrage</dt><dd>37 Antworten</dd>
                </dl>
                <Link href="/portfolio/" className="btn-rect">Zum Portfolio <ArrowRight /></Link>
              </div>
              <div className="tab-media"><Img name={IMG.workshop} alt="Ayleen präsentiert ihren Social-Media-Workshop" sizes="(max-width: 850px) 100vw, 35vw" /></div>
            </div>
          </R>
          <div className="mt-l">
            <BarChart title="Vorteile von Social Media" sub="Umfrage aus meinem Workshop · 37 Antworten · Mehrfachnennung möglich" data={SURVEY} total={37} />
          </div>
        </div>
      </section>

      <CtaBand title="Social Media für *deine* Marke?" text="Schreib mir, was du vorhast." />
    </>
  );
}
