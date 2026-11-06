import { IconGlobe, IconLinkedIn, IconMail } from "@/components/Icons";
import { CONTACT_EMAIL, LINKEDIN, WENDICO } from "@/lib/site";

// Einheitliche Kontaktwege als Icons mit Link (Kontaktseite und Footer)
export const CONTACT_WAYS = [
  { key: "mail", label: "E-Mail", value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, Icon: IconMail, ext: false },
  { key: "linkedin", label: "LinkedIn", value: "Ayleen Podgorny", href: LINKEDIN, Icon: IconLinkedIn, ext: true },
  { key: "wendico", label: "Wendico", value: "wendico.ch", href: WENDICO, Icon: IconGlobe, ext: true },
] as const;

export default function ContactIcons({ variant = "tiles" }: { variant?: "tiles" | "row" }) {
  return (
    <ul className={`contact-icons contact-icons--${variant}`}>
      {CONTACT_WAYS.map(({ key, label, value, href, Icon, ext }) => (
        <li key={key}>
          <a href={href} aria-label={`${label}: ${value}`} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
            <span className="contact-icon"><Icon /></span>
            {variant === "tiles" && <span className="contact-label"><span className="kicker">{label}</span><strong>{value}</strong></span>}
          </a>
        </li>
      ))}
    </ul>
  );
}
