import { CtaBand, Facts, PageHero } from "@/components/Blocks";
import { Wave } from "@/components/Graphics";
import { IconPlay } from "@/components/Icons";
import { Mix, R } from "@/components/Type";
import { JsonLd, pageJsonLd, pageMeta } from "@/lib/seo";
import { IMG, SITE_URL } from "@/lib/site";

const DESC = "2023 bis 2024 war Ayleen Podgorny SRF Kids Reporterin: Podcast-Beiträge über Mobbing (mit Nicky B-Fly), Philosophie und Aufklärung, veröffentlicht auf srf.ch.";
export const metadata = pageMeta({ title: "SRF Kids Reporterin", description: DESC, path: "/srf-kids/", image: IMG.srf });

const EPISODES = [
  { kind: "Gespräch", title: "Gemeinsam gegen Mobbing", text: "Mit der Sängerin Nicky B-Fly.", href: "https://www.srf.ch/kids/srf-kids-reporter-in-in-den-pausen-war-ich-ganz-allein" },
  { kind: "Podcast", title: "Philosophie-Runde", text: "Über die grossen Fragen des Lebens.", href: "https://www.srf.ch/kids/podcast-srf-kids-reporter-in-philosophie-runde-was-sagst-du-zu-den-grossen-fragen-des-lebens" },
  { kind: "Podcast", title: "So ist es, die Periode zu haben", text: "Offen und altersgerecht erklärt.", href: "https://www.srf.ch/kids/podcast-srf-kids-reporter-in-so-ist-es-die-periode-zu-haben" },
];

export default function SrfKidsPage() {
  return (
    <>
      <JsonLd data={pageJsonLd({ name: "SRF Kids Reporterin", path: "/srf-kids/", description: DESC, extra: EPISODES.map((e) => ({ "@type": "PodcastEpisode", name: e.title, url: e.href, publisher: { "@type": "Organization", name: "SRF Kids" }, contributor: { "@id": `${SITE_URL}/#person` } })) })} />
      <PageHero kicker="2023 – 2024" title="SRF Kids *Reporterin*" img={IMG.srf} alt="Ayleen schreibt im roten SRF-Studio" landscape />

      <section className="panel section">
        <div className="container">
          <div className="head">
            <R><span className="kicker on-air"><i aria-hidden="true" />Medien · On Air 2023–2024</span></R>
            <R><Mix text="Zwei Jahre *Podcasts*, Interviews und Redaktion." /></R>
          </div>
          <Facts items={[
            { value: "2", label: "Jahre bei SRF Kids" },
            { value: "3", label: "Veröffentlichte Beiträge" },
            { value: "Podcast", label: "Gespräche und Reportagen" },
          ]} />
        </div>
      </section>

      <section className="section bg-cream" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="head"><R><span className="kicker">Reinhören bei SRF</span></R></div>
          <div className="episodes">
            {EPISODES.map((e, i) => (
              <R key={e.href} delay={i * 0.08}>
                <a className="episode" href={e.href} target="_blank" rel="noopener noreferrer">
                  <span className="kicker">{e.kind}</span>
                  <h3>{e.title}</h3>
                  <p>{e.text}</p>
                  <Wave seed={i + 3} />
                  <span className="episode-foot"><span className="play"><IconPlay /></span>Auf srf.ch anhören</span>
                </a>
              </R>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
