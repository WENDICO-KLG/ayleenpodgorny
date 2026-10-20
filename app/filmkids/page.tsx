import Link from "next/link";
import { CtaBand, PageHero } from "@/components/Blocks";
import { IconCamera, IconFilm, IconMic, IconStage } from "@/components/Icons";
import Img from "@/components/Img";
import { Mix, R } from "@/components/Type";
import { JsonLd, pageJsonLd, pageMeta } from "@/lib/seo";
import { IMG, type ImgName } from "@/lib/site";

const DESC = "Mit zwölf Jahren hat Ayleen Podgorny bei Filmkids eine Schauspiel- und Filmausbildung gemacht. Daraus wurden Mikrofon (SRF Kids), Bühne (Workshop) und Kamera (Model).";
export const metadata = pageMeta({ title: "Filmkids", description: DESC, path: "/filmkids/", image: IMG.edClose });

const FLOW = [
  { href: null, kicker: "Mit 12", title: "Filmkids", text: "Schauspiel und Film.", Icon: IconFilm },
  { href: "/srf-kids/", kicker: "2023–2024", title: "Mikrofon", text: "SRF Kids Reporterin.", Icon: IconMic },
  { href: "/portfolio/", kicker: "Swisscom", title: "Bühne", text: "Workshop vor über 20 Gästen.", Icon: IconStage },
  { href: "/model/", kicker: "Heute", title: "Kamera", text: "Model für Editorial und Kampagne.", Icon: IconCamera },
];

const FRAMES: { img: ImgName; alt: string; label: string }[] = [
  { img: IMG.edClose, alt: "Portrait von Ayleen in Schwarz-Weiss", label: "Szene 01" },
  { img: IMG.srf, alt: "Ayleen im SRF-Studio", label: "Mikrofon" },
  { img: IMG.nachtSwLachend, alt: "Ayleen lacht, Schwarz-Weiss", label: "Szene 02" },
  { img: IMG.praesentation, alt: "Ayleen präsentiert am Rednerpult", label: "Bühne" },
  { img: IMG.edKamera, alt: "Ayleen mit analoger Kamera", label: "Kamera" },
  { img: IMG.edKinn, alt: "Editorial-Portrait von Ayleen", label: "Szene 03" },
  { img: IMG.nachtSw, alt: "Ayleen unter einer Strassenlaterne", label: "Szene 04" },
];

export default function FilmkidsPage() {
  return (
    <>
      <JsonLd data={pageJsonLd({ name: "Filmkids", path: "/filmkids/", description: DESC })} />
      <PageHero kicker="Ausbildung · mit 12" title="Film*kids*" img={IMG.edClose} alt="Schwarz-weisses Portrait von Ayleen" />

      <section className="panel section">
        <div className="container">
          <div className="head">
            <R><span className="kicker">Schauspiel- und Filmausbildung</span></R>
            <R><Mix text="Hier habe ich gelernt, vor der *Kamera* präsent zu sein." /></R>
          </div>
          <div className="head"><R><span className="kicker">Was daraus wurde</span></R></div>
          <ol className="flow">
            {FLOW.map(({ href, kicker, title, text, Icon }, i) => {
              const inner = (<><Icon className="icon" /><span className="kicker">{kicker}</span><h3>{title}</h3><p>{text}</p></>);
              return (
                <R as="li" key={title} delay={i * 0.08}>
                  {href ? <Link href={href} className="flow-node">{inner}</Link> : <div className="flow-node">{inner}</div>}
                </R>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Filmstreifen läuft beim Scrollen seitwärts */}
      <section className="film" aria-label="Filmstreifen mit Bildern von Ayleen">
        <div className="film-strip" data-hscroll>
          {FRAMES.map((f, i) => (
            <figure key={f.img} className="film-frame">
              <Img name={f.img} alt={f.alt} sizes="(max-width: 900px) 55vw, 22vw" />
              <figcaption><span>{String(i + 1).padStart(2, "0")}</span>{f.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
