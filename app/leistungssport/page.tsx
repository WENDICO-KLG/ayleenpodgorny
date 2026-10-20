import { CtaBand, Facts, PageHero } from "@/components/Blocks";
import { IceTraces } from "@/components/Graphics";
import Img from "@/components/Img";
import { Mix, R } from "@/components/Type";
import FormationMorph from "@/components/fx/FormationMorph";
import HorizontalGallery from "@/components/fx/HorizontalGallery";
import { JsonLd, pageJsonLd, pageMeta } from "@/lib/seo";
import { IMG, SITE_URL } from "@/lib/site";

const DESC = "Ayleen Podgorny läuft Synchronized Skating im Team Starlight Switzerland, dem Schweizer Nachwuchskader von Swiss Ice Skating: 4–5 Trainings pro Woche, Schweizer- und Weltmeisterschaften.";
export const metadata = pageMeta({ title: "Eiskunstlauf – Synchronized Skating", description: DESC, path: "/leistungssport/", image: IMG.eisJubel });

const JOURNEY = [
  { when: "Mit 3", what: "Erste Schritte auf dem Eis." },
  { when: "Mit 4", what: "Eislaufclub Kloten." },
  { when: "Mit 6", what: "Eislaufclub Dübendorf." },
  { when: "Mit 12", what: "Einstieg ins Synchronized Skating." },
  { when: "Heute", what: "Team Starlight Switzerland." },
];

export default function LeistungssportPage() {
  return (
    <>
      <JsonLd data={pageJsonLd({ name: "Eiskunstlauf", path: "/leistungssport/", description: DESC, extra: [{ "@type": "SportsTeam", name: "Team Starlight Switzerland", sport: "Synchronized Skating", member: { "@id": `${SITE_URL}/#person` } }] })} />
      <PageHero kicker="Team Starlight Switzerland" title="Auf dem *Eis*" img={IMG.eisJubel} alt="Zwei Skaterinnen jubeln mit Medaillen" />

      <section className="panel section panel--traces">
        <IceTraces />
        <div className="container">
          <div className="head">
            <R><span className="kicker">Spitzensport</span></R>
            <Mix text="Synchronized Skating im *Schweizer* Nachwuchskader." />
          </div>
          <Facts items={[
            { value: "4–5", label: "Trainings pro Woche" },
            { value: "bis 16", label: "Läuferinnen gleichzeitig auf dem Eis" },
            { value: "SM & WM", label: "Schweizer- und Weltmeisterschaften" },
          ]} />
          <div className="graphic-card graphic-card--wide">
            <div>
              <h3>Trainingswoche</h3>
              <p>Vier bis fünf Einheiten pro Woche, dazu Wettkämpfe.</p>
            </div>
            <div className="week" role="img" aria-label="4 bis 5 Trainings pro Woche">
              <span>1</span><span>2</span><span>3</span><span>4</span><span className="opt">+1</span>
            </div>
          </div>
        </div>
      </section>

      {/* Formationen als Scroll-Grafik */}
      <FormationMorph />

      {/* Zeitstrahl */}
      <section className="section bg-ivory">
        <div className="container">
          <div className="head">
            <R><span className="kicker">Mein Weg</span></R>
            <Mix text="Vom ersten Schritt bis zum *Kader*" />
          </div>
          <ol className="journey" style={{ ["--n" as string]: JOURNEY.length }}>
            {JOURNEY.map((j, i) => (
              <R as="li" key={j.when} className="journey-step" delay={i * 0.08}>
                <p className="journey-when">{j.when}</p>
                <p className="journey-what">{j.what}</p>
              </R>
            ))}
          </ol>
        </div>
      </section>

      <HorizontalGallery
        kicker="Eindrücke"
        title={<Mix text="Training und *Wettkampf*" />}
        items={[
          { img: IMG.eisBewegung, alt: "Synchronized Skaterinnen gleiten über das Eis", caption: "Kür" },
          { img: IMG.eisTeam, alt: "Das Team in Kostümen auf dem Eis", caption: "Team" },
          { img: IMG.eisVier, alt: "Vier Skaterinnen Arm in Arm im Training", caption: "Training" },
          { img: IMG.eisMedaillen, alt: "Hände mit Goldmedaillen", caption: "Medaillen" },
          { img: IMG.eisPokal, alt: "Hände halten einen goldenen Pokal", caption: "Pokal" },
          { img: IMG.eisReise, alt: "Das Team auf Reisen in einer Kathedrale", caption: "Unterwegs" },
        ]}
      />

      <section className="ghost ghost--photo">
        <div className="ghost-bg"><Img name={IMG.eisFormation} alt="" sizes="100vw" /></div>
        <div className="container">
          <span className="kicker">Warum ich laufe</span>
          <div data-words><Mix text="Auf dem Eis finde ich Abstand vom *Alltag.*" size="xl" /></div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
