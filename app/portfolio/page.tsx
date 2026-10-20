import { ArrowRight } from "@/components/Arrows";
import { CtaBand, Facts, PageHero } from "@/components/Blocks";
import Img from "@/components/Img";
import { Mix, R } from "@/components/Type";
import { JsonLd, pageJsonLd, pageMeta } from "@/lib/seo";
import { IMG, SITE_URL, type ImgName } from "@/lib/site";

const DESC = "Portfolio von Ayleen Podgorny: Social-Media-Workshop «Make it Click!» vor über 20 Gästen, Workshop-Flyer, Visitenkarte mit eigenem Logo und Kennenlern-Bingo – Projekte aus der Ausbildung bei Swisscom.";
export const metadata = pageMeta({ title: "Portfolio", description: DESC, path: "/portfolio/", image: IMG.workshop });

const PROJECTS: { kind: string; ctx: string; title: string; text: string; meta: [string, string][]; img: ImgName; alt: string; contain?: boolean; href: string }[] = [
  { kind: "Workshop", ctx: "Swisscom", title: "Make it *Click!*", text: "Social-Media-Workshop als Abschlussarbeit. Selbst konzipiert und vor Publikum präsentiert.", meta: [["Rolle", "Konzept, Inhalt, Präsentation"], ["Publikum", "Über 20 Gäste"], ["Rahmen", "Abschlussarbeit"]], img: IMG.workshop, alt: "Ayleen präsentiert die Vorteile von Social Media", href: "https://drive.google.com/file/d/1wwir16ZOW8KspNlhzN__94OwOy3wr2n1/view" },
  { kind: "Print", ctx: "Swisscom", title: "Workshop-*Flyer*", text: "Gestaltet und verteilt, um den Workshop zu bewerben.", meta: [["Rolle", "Gestaltung, Verteilung"], ["Ergebnis", "Zusätzliche Anmeldungen"]], img: IMG.makeItClick, alt: "Titelgrafik «Make it Click! Social-Media-Workshop»", contain: true, href: "https://drive.google.com/file/d/1SiGQpVo0RH0yDMLrPKIkStti_YodS4fX/view?usp=sharing" },
  { kind: "Branding", ctx: "Bewerbung", title: "Visitenkarte & *Logo*", text: "Ein Logo aus den eigenen Initialen und eine Visitenkarte mit gezeichnetem Portrait.", meta: [["Rolle", "Logo, Illustration, Layout"], ["Tools", "Adobe, Procreate"]], img: IMG.visitenkarte, alt: "Visitenkarte mit gezeichnetem Portrait und AP-Monogramm", contain: true, href: "https://drive.google.com/file/d/1EzbBPqO0Afowy5mTunRw9D-7ALRocEJy/view?usp=sharing" },
  { kind: "Event", ctx: "ECO Eventmanagement", title: "Kennenlern-*Bingo*", text: "Spielkarte, die Gäste an Events ins Gespräch bringt.", meta: [["Rolle", "Konzept, Gestaltung"], ["Rahmen", "Eventmanagement-Projekt"]], img: IMG.bingo, alt: "Kennenlern-Bingo-Spielkarte", contain: true, href: "https://drive.google.com/file/d/1EJDJDyxtliEsXT4ZUptgtEAcC5dFHDxW/view?usp=sharing" },
];

export default function PortfolioPage() {
  return (
    <>
      <JsonLd data={pageJsonLd({ name: "Portfolio", path: "/portfolio/", description: DESC, extra: PROJECTS.map((p) => ({ "@type": "CreativeWork", name: p.title.replace(/\*/g, ""), description: p.text, url: p.href, creator: { "@id": `${SITE_URL}/#person` } })) })} />
      <PageHero kicker="Projekte" title="Ausgewählte *Arbeiten*" img={IMG.workshop} alt="Ayleen hält ihren Social-Media-Workshop" />

      <section className="panel section">
        <div className="container">
          <div className="head">
            <R><span className="kicker">Aus der Ausbildung bei Swisscom</span></R>
            <R><Mix text="Workshop, Print, Branding und *Events*." /></R>
          </div>
          <Facts items={[
            { value: "4", label: "Projekte" },
            { value: "20+", label: "Gäste beim Workshop" },
            { value: "2", label: "Kontexte: Firststeps 2026, ECO Eventmanagement" },
          ]} />
        </div>
      </section>

      {/* Gestapelte Projekt-Tabs (Midnight) */}
      <section className="section bg-cream" style={{ paddingTop: 0 }}>
        <div className="container tabs">
          {PROJECTS.map((p, i) => (
            <article key={p.href} className="tab" style={{ ["--i" as string]: i }}>
              <div className="tab-head"><span>Projekt 0{i + 1} · {p.kind}</span><span>{p.ctx}</span></div>
              <div className="tab-body">
                <div>
                  <Mix as="h2" text={p.title} />
                  <p>{p.text}</p>
                  <dl className="tab-meta">{p.meta.map(([k, v]) => <div key={k} style={{ display: "contents" }}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
                  <a href={p.href} className="btn-rect" target="_blank" rel="noopener noreferrer">Ansehen <ArrowRight /></a>
                </div>
                <div className={`tab-media${p.contain ? " contain" : ""}`}><Img name={p.img} alt={p.alt} sizes="(max-width: 850px) 100vw, 35vw" /></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand title="Ein Projekt im *Kopf?*" text="Gestaltung, Content oder ein Auftritt: Schreib mir." />
    </>
  );
}
