import { ArrowRight } from "@/components/Arrows";
import { CtaBand, Facts, PageHero } from "@/components/Blocks";
import { BarChart } from "@/components/Graphics";
import { IconExternal, IconFilm, IconMic } from "@/components/Icons";
import Img from "@/components/Img";
import { Mix, R } from "@/components/Type";
import StoryPhone from "@/components/fx/StoryPhone";
import { JsonLd, pageJsonLd, pageMeta } from "@/lib/seo";
import { FILMKIDS, IMG, SITE_URL, SRF_PODCASTS, WENDICO, type ImgName } from "@/lib/site";

const DESC = "Portfolio von Ayleen Podgorny: Head of Social Media bei Wendico, Social-Media-Workshop «Make it Click!» vor über 20 Gästen, Flyer, Visitenkarte mit eigenem Logo, Kennenlern-Bingo, SRF Kids Podcasts und die Filmausbildung bei Filmkids.";
export const metadata = pageMeta({ title: "Portfolio", description: DESC, path: "/portfolio/", image: IMG.workshop });

const SURVEY = [
  { label: "Unterhaltung", value: 25 },
  { label: "Kontakt halten", value: 22 },
  { label: "Information", value: 20 },
  { label: "Zeitvertreib", value: 13 },
  { label: "Kein Vorteil", value: 4 },
];

type Project = {
  kind: string; ctx: string; title: string; text: string; meta: [string, string][];
  links: { label: string; href: string }[];
  img?: ImgName; alt?: string; contain?: boolean;
  icon?: "mic" | "film"; iconLabel?: string;
};

const PROJECTS: Project[] = [
  { kind: "Workshop", ctx: "Swisscom", title: "Make it *Click!*", text: "Social-Media-Workshop als Abschlussarbeit. Selbst konzipiert und vor Publikum präsentiert.", meta: [["Rolle", "Konzept, Inhalt, Präsentation"], ["Publikum", "Über 20 Gäste"], ["Rahmen", "Abschlussarbeit"]], img: IMG.workshop, alt: "Ayleen präsentiert die Vorteile von Social Media", links: [{ label: "Ansehen", href: "https://drive.google.com/file/d/1wwir16ZOW8KspNlhzN__94OwOy3wr2n1/view" }] },
  { kind: "Print", ctx: "Swisscom", title: "Workshop-*Flyer*", text: "Gestaltet und verteilt, um den Workshop zu bewerben.", meta: [["Rolle", "Gestaltung, Verteilung"], ["Ergebnis", "Zusätzliche Anmeldungen"]], img: IMG.makeItClick, alt: "Titelgrafik «Make it Click! Social-Media-Workshop»", contain: true, links: [{ label: "Ansehen", href: "https://drive.google.com/file/d/1SiGQpVo0RH0yDMLrPKIkStti_YodS4fX/view?usp=sharing" }] },
  { kind: "Branding", ctx: "Bewerbung", title: "Visitenkarte & *Logo*", text: "Ein Logo aus den eigenen Initialen und eine Visitenkarte mit gezeichnetem Portrait.", meta: [["Rolle", "Logo, Illustration, Layout"], ["Tools", "Adobe, Procreate"]], img: IMG.visitenkarte, alt: "Visitenkarte mit gezeichnetem Portrait und AP-Monogramm", contain: true, links: [{ label: "Ansehen", href: "https://drive.google.com/file/d/1EzbBPqO0Afowy5mTunRw9D-7ALRocEJy/view?usp=sharing" }] },
  { kind: "Event", ctx: "ECO Eventmanagement", title: "Kennenlern-*Bingo*", text: "Spielkarte, die Gäste an Events ins Gespräch bringt.", meta: [["Rolle", "Konzept, Gestaltung"], ["Rahmen", "Eventmanagement-Projekt"]], img: IMG.bingo, alt: "Kennenlern-Bingo-Spielkarte", contain: true, links: [{ label: "Ansehen", href: "https://drive.google.com/file/d/1EJDJDyxtliEsXT4ZUptgtEAcC5dFHDxW/view?usp=sharing" }] },
  { kind: "Medien", ctx: "2023–2024", title: "SRF Kids *Reporterin*", text: "Podcasts und Interviews für SRF Kids, mit einem Blick hinter die Kulissen des SRF.", meta: [["Rolle", "Reporterin, Moderation"], ["Beiträge", "3 Podcasts auf srf.ch"]], icon: "mic", iconLabel: "SRF Kids", links: SRF_PODCASTS.map((p) => ({ label: p.title, href: p.href })) },
  { kind: "Ausbildung", ctx: "Mit 12", title: "Film*kids*", text: "Schauspiel- und Filmausbildung an der Film- und Schauspielschule für Kinder und Jugendliche in Zürich.", meta: [["Inhalt", "Schauspiel und Film"], ["Ort", "Zürich"]], icon: "film", iconLabel: "Filmkids", links: [{ label: "filmkids.ch", href: FILMKIDS }] },
];

const ICONS = { mic: IconMic, film: IconFilm };

export default function PortfolioPage() {
  return (
    <>
      <JsonLd data={pageJsonLd({ name: "Portfolio", path: "/portfolio/", description: DESC, extra: [
        ...PROJECTS.filter((p) => !p.icon).map((p) => ({ "@type": "CreativeWork", name: p.title.replace(/\*/g, ""), description: p.text, url: p.links[0].href, creator: { "@id": `${SITE_URL}/#person` } })),
        ...SRF_PODCASTS.map((p) => ({ "@type": "PodcastEpisode", name: p.title, url: p.href, publisher: { "@type": "Organization", name: "SRF Kids" }, contributor: { "@id": `${SITE_URL}/#person` } })),
      ] })} />
      <PageHero kicker="Projekte" title="Ausgewählte *Arbeiten*" img={IMG.workshop} alt="Ayleen hält ihren Social-Media-Workshop" />

      <section className="panel section">
        <div className="container">
          <div className="head">
            <R><span className="kicker">Social Media, Gestaltung und Medien</span></R>
            <R><Mix text="Von Wendico bis *SRF Kids*." /></R>
          </div>
          <Facts items={[
            { value: "6", label: "Projekte" },
            { value: "20+", label: "Gäste beim Workshop" },
            { value: "3", label: "Podcasts auf srf.ch" },
          ]} />
        </div>
      </section>

      {/* Social Media bei Wendico */}
      <section id="social-media" className="section bg-ivory anchor">
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

      {/* Umfrage aus dem Workshop */}
      <section className="section bg-ivory">
        <div className="container">
          <BarChart title="Vorteile von Social Media" sub="Umfrage aus meinem Workshop «Make it Click!» · 37 Antworten · Mehrfachnennung möglich" data={SURVEY} total={37} />
        </div>
      </section>

      {/* Gestapelte Projekt-Tabs (Midnight) */}
      <section id="projekte" className="section bg-cream anchor">
        <div className="container">
          <div className="head"><R><span className="kicker">Projekte</span></R></div>
        </div>
        <div className="container tabs">
          {PROJECTS.map((p, i) => {
            const Icon = p.icon ? ICONS[p.icon] : null;
            return (
              <article key={p.title} className="tab" style={{ ["--i" as string]: i }}>
                <div className="tab-head"><span>Projekt 0{i + 1} · {p.kind}</span><span>{p.ctx}</span></div>
                <div className="tab-body">
                  <div>
                    <Mix as="h2" text={p.title} />
                    <p>{p.text}</p>
                    <dl className="tab-meta">{p.meta.map(([k, v]) => <div key={k} style={{ display: "contents" }}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
                    {p.links.length === 1 ? (
                      <a href={p.links[0].href} className="btn-rect" target="_blank" rel="noopener noreferrer">{p.links[0].label} <ArrowRight /></a>
                    ) : (
                      <ul className="tab-links">
                        {p.links.map((l) => <li key={l.href}><a href={l.href} target="_blank" rel="noopener noreferrer">{l.label} <IconExternal /></a></li>)}
                      </ul>
                    )}
                  </div>
                  {Icon ? (
                    <div className="tab-media tab-media--icon" aria-hidden="true"><Icon /><span>{p.iconLabel}</span></div>
                  ) : (
                    <div className={`tab-media${p.contain ? " contain" : ""}`}>{p.img && <Img name={p.img} alt={p.alt ?? ""} sizes="(max-width: 850px) 100vw, 35vw" />}</div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
