import { ArrowRight } from "@/components/Arrows";
import Img from "@/components/Img";
import { Serif } from "@/components/Type";
import { JsonLd, pageJsonLd, pageMeta } from "@/lib/seo";
import { CONTACT_EMAIL, IMG, LINKEDIN, WENDICO_KONTAKT } from "@/lib/site";

const DESC = "Kontakt zu Ayleen Podgorny in Zürich für Shootings, Social Media, Workshops und Kooperationen: über LinkedIn oder geschäftlich über Wendico.";
export const metadata = pageMeta({ title: "Kontakt", description: DESC, path: "/kontakt/", image: IMG.nachtFarbig });

export default function KontaktPage() {
  const ways = [
    ...(CONTACT_EMAIL ? [{ label: "E-Mail", title: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, ext: false }] : []),
    { label: "LinkedIn", title: "Ayleen Podgorny", href: LINKEDIN, ext: true },
    { label: "Geschäftlich", title: "Anfrage über Wendico", href: WENDICO_KONTAKT, ext: true },
  ];
  return (
    <>
      <JsonLd data={pageJsonLd({ name: "Kontakt", path: "/kontakt/", description: DESC, extra: [{ "@type": "ContactPage", name: "Kontakt" }] })} />
      <section className="contact">
        <div className="contact-text">
          <span className="kicker" style={{ color: "rgba(243,235,225,.65)" }}>Kontakt</span>
          <Serif as="h1" text="Sag *hallo*" />
          <p>Für Shootings, Social Media, Workshops und Kooperationen.</p>
          <ul className="ways">
            {ways.map((w) => (
              <li key={w.href}>
                <a href={w.href} {...(w.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <span className="kicker">{w.label}</span>
                  <strong>{w.title}</strong>
                  <ArrowRight />
                </a>
              </li>
            ))}
          </ul>
          <span className="script contact-sign" data-sign aria-hidden="true">Ayleen</span>
        </div>
        <figure className="contact-media"><Img name={IMG.nachtFarbig} alt="Ayleen abends unter einer Strassenlaterne" priority sizes="(max-width: 900px) 100vw, 45vw" /></figure>
      </section>
    </>
  );
}
