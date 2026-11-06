import ContactIcons from "@/components/ContactIcons";
import Img from "@/components/Img";
import InquiryForm from "@/components/InquiryForm";
import { Serif } from "@/components/Type";
import { JsonLd, pageJsonLd, pageMeta } from "@/lib/seo";
import { CONTACT_EMAIL, IMG } from "@/lib/site";

const DESC = `Kontakt & Anfrage an Ayleen Podgorny in Zürich: per E-Mail an ${CONTACT_EMAIL}, über LinkedIn oder über Wendico.`;
export const metadata = pageMeta({ title: "Kontakt & Anfrage", description: DESC, path: "/kontakt/", image: IMG.nachtFarbig });

export default function KontaktPage() {
  return (
    <>
      <JsonLd data={pageJsonLd({ name: "Kontakt & Anfrage", path: "/kontakt/", description: DESC, extra: [{ "@type": "ContactPage", name: "Kontakt & Anfrage" }] })} />
      <section className="contact">
        <div className="contact-text">
          <span className="kicker" style={{ color: "rgba(243,235,225,.65)" }}>Kontakt</span>
          <Serif as="h1" text="Kontakt & *Anfrage*" />
          <p>Du hast eine Frage oder eine Idee? Schreib mir, ich melde mich bei dir.</p>
          <InquiryForm />
          <ContactIcons />
        </div>
        <figure className="contact-media"><Img name={IMG.nachtFarbig} alt="Ayleen abends unter einer Strassenlaterne" priority sizes="(max-width: 900px) 100vw, 45vw" /></figure>
      </section>
    </>
  );
}
