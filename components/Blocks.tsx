import Link from "next/link";
import { ArrowRight } from "@/components/Arrows";
import Img from "@/components/Img";
import Marquee from "@/components/Marquee";
import { Mix, R, Serif } from "@/components/Type";
import type { ImgName } from "@/lib/site";

// Unterseiten-Hero (Midnight): Bordeaux, Foto rechts, grosser Serifen-Titel
export function PageHero({ kicker, title, img, alt, landscape = false }: { kicker: string; title: string; img: ImgName; alt: string; landscape?: boolean }) {
  return (
    <section className={`page-hero${landscape ? " page-hero--landscape" : ""}`}>
      <div className="container">
        <figure className="page-hero-media"><Img name={img} alt={alt} priority sizes="(max-width: 800px) 100vw, 50vw" /></figure>
        <div className="page-hero-text">
          <span className="kicker">{kicker}</span>
          <Serif as="h1" text={title} />
        </div>
      </div>
    </section>
  );
}

// Kontakt-Band (dunkel)
export function CtaBand({ title = "Lass uns *zusammen*arbeiten", text = "Für Shootings, Social Media und Kooperationen." }: { title?: string; text?: string }) {
  return (
    <section className="cta-band dark dark--wine section--tight" style={{ paddingBlock: "clamp(4rem, 8vw, 6rem) clamp(7rem, 13vw, 11rem)" }}>
      <Marquee text="Schreib mir ✦" ghost />
      <div className="container">
        <R>
          <Mix text={title} size="xl" />
          <p>{text}</p>
        </R>
        <R delay={0.15}><Link href="/kontakt/" className="btn btn--light">Kontakt <ArrowRight /></Link></R>
      </div>
    </section>
  );
}

// Fakten-Leiste
export function Facts({ items }: { items: { value: string; label: string; from?: number }[] }) {
  return (
    <dl className="facts" style={{ ["--cols" as string]: items.length }}>
      {items.map((f, i) => (
        <R key={f.label} className="fact" delay={i * 0.06}>
          <dt className="visually-hidden">{f.label}</dt>
          <dd style={{ margin: 0 }}><strong data-from={f.from}>{f.value}</strong><span>{f.label}</span></dd>
        </R>
      ))}
    </dl>
  );
}
