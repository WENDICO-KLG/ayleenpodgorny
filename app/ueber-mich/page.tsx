import Link from "next/link";
import { ArrowRight } from "@/components/Arrows";
import { CtaBand, Facts, PageHero } from "@/components/Blocks";
import { IconCamera, IconFilm, IconLayers, IconMic, IconPen, IconPhone, IconStage } from "@/components/Icons";
import Img from "@/components/Img";
import { Mix, R } from "@/components/Type";
import { JsonLd, pageJsonLd, pageMeta } from "@/lib/seo";
import { IMG, SITE_URL, type ImgName } from "@/lib/site";

const DESC = "Kurzprofil von Ayleen Podgorny aus Zürich: Mediamatik-Lehre bei Swisscom (seit 2026), Head of Social Media bei Wendico, Synchronized Skating im Team Starlight Switzerland, Model. Früher SRF Kids Reporterin und Filmkids.";
export const metadata = pageMeta({ title: "Über mich", description: DESC, path: "/ueber-mich/", image: IMG.bambus });

const JOURNEY: { when: string; what: string; img?: ImgName; alt?: string }[] = [
  { when: "Mit 3", what: "Zum ersten Mal auf dem Eis." },
  { when: "Mit 12", what: "Filmkids-Ausbildung und Einstieg ins Synchronized Skating.", img: IMG.eisVier, alt: "Vier Skaterinnen im Training" },
  { when: "2023–24", what: "SRF Kids Reporterin: Podcasts und Interviews.", img: IMG.srf, alt: "Ayleen im SRF-Studio" },
  { when: "2026", what: "Lehre als Mediamatikerin bei Swisscom.", img: IMG.praesentation, alt: "Ayleen präsentiert am Rednerpult" },
  { when: "Heute", what: "Head of Social Media bei Wendico, Team Starlight Switzerland, Model.", img: IMG.edKinn, alt: "Editorial-Portrait von Ayleen" },
];

const TOOLS = [
  { label: "Fotografie", Icon: IconCamera },
  { label: "Video", Icon: IconFilm },
  { label: "Social Media", Icon: IconPhone },
  { label: "Präsentation", Icon: IconStage },
  { label: "Podcast & Interview", Icon: IconMic },
  { label: "Adobe", Icon: IconLayers },
  { label: "Procreate", Icon: IconPen },
];

export default function UeberMichPage() {
  return (
    <>
      <JsonLd data={pageJsonLd({ name: "Über mich", path: "/ueber-mich/", description: DESC, extra: [{ "@type": "ProfilePage", "@id": `${SITE_URL}/ueber-mich/#profile`, mainEntity: { "@id": `${SITE_URL}/#person` } }] })} />
      <PageHero kicker="Über mich" title="Hey, ich bin *Ayleen*" img={IMG.bambus} alt="Ayleen Podgorny lacht vor Bambus" />

      {/* Kurzprofil */}
      <section className="panel section">
        <div className="container split split--wl split--center">
          <div>
            <R><span className="kicker">Kurzprofil</span></R>
            <R><Mix text="Mediamatik bei *Swisscom*, Social Media bei *Wendico*, Eis und Kamera." /></R>
            <R as="dl" className="sedcard" style={{ marginTop: "2rem" }}>
              <div><dt>Wohnort</dt><dd>Zürich, Schweiz</dd></div>
              <div><dt>Ausbildung</dt><dd>Lehre als Mediamatikerin bei Swisscom, seit 2026</dd></div>
              <div><dt>Beruf</dt><dd>Head of Social Media bei Wendico</dd></div>
              <div><dt>Sport</dt><dd>Synchronized Skating, Team Starlight Switzerland</dd></div>
              <div><dt>Vor der Kamera</dt><dd>Model für Editorial, Kampagne und Content</dd></div>
              <div><dt>Früher</dt><dd>SRF Kids Reporterin (2023–2024), Filmkids-Ausbildung</dd></div>
            </R>
          </div>
          <R as="figure" className="photo photo--45" delay={0.1}><Img name={IMG.nachtSw} alt="Ayleen abends unter einer Strassenlaterne, Schwarz-Weiss" sizes="(max-width: 900px) 100vw, 40vw" /></R>
        </div>
      </section>

      {/* In Zahlen */}
      <section className="section--tight dark dark--wine numbers">
        <div className="container">
          <Facts items={[
            { value: "3", label: "Jahre alt beim ersten Mal auf dem Eis" },
            { value: "12", label: "Jahre alt bei Filmkids" },
            { value: "2026", label: "Start der Lehre bei Swisscom", from: 2000 },
            { value: "4–5", label: "Trainings pro Woche" },
          ]} />
        </div>
      </section>

      {/* Zeitstrahl */}
      <section className="section bg-cream">
        <div className="container">
          <div className="head">
            <R><span className="kicker">Mein Weg</span></R>
            <Mix text="Vom Eis ins Studio und an den *Laptop*" />
          </div>
          <ol className="journey" style={{ ["--n" as string]: JOURNEY.length }}>
            {JOURNEY.map((j, i) => (
              <R as="li" key={j.when} className="journey-step" delay={i * 0.08}>
                <p className="journey-when">{j.when}</p>
                <p className="journey-what">{j.what}</p>
                {j.img && <div className="journey-img"><Img name={j.img} alt={j.alt ?? ""} sizes="(max-width: 900px) 60vw, 20vw" /></div>}
              </R>
            ))}
          </ol>
        </div>
      </section>

      {/* Werkzeuge */}
      <section className="section bg-ivory">
        <div className="container split split--center">
          <div>
            <R><span className="kicker">Werkzeuge</span></R>
            <R><Mix text="Womit ich *arbeite*" /></R>
          </div>
          <R as="ul" className="chips" delay={0.1}>
            {TOOLS.map(({ label, Icon }) => <li key={label} className="chip"><Icon />{label}</li>)}
          </R>
        </div>
      </section>

      {/* Früher */}
      <section className="section--tight bg-ivory" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="head"><R><span className="kicker">Früher</span></R></div>
          <div className="archive">
            {[
              { href: "/srf-kids/", label: "2023–2024", title: "SRF Kids Reporterin", img: IMG.srf, alt: "Ayleen im SRF-Studio" },
              { href: "/filmkids/", label: "Ausbildung", title: "Filmkids", img: IMG.nachtSwLachend, alt: "Ayleen lacht, Schwarz-Weiss" },
            ].map((a, i) => (
              <R key={a.href} delay={i * 0.08}>
                <Link href={a.href} className="archive-card">
                  <div><Img name={a.img as ImgName} alt={a.alt} sizes="120px" /></div>
                  <div><span className="kicker">{a.label}</span><h3>{a.title}</h3></div>
                  <ArrowRight />
                </Link>
              </R>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
