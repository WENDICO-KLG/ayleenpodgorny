import Link from "next/link";
import ContactIcons from "@/components/ContactIcons";
import { BRAND, NAV, WENDICO } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src={BRAND.monogrammWeiss} alt="" width="45" height="48" loading="lazy" />
            <p>Mediamatik bei Swisscom. Social Media bei Wendico. Synchronized Skating im Team Starlight Switzerland. Model. Zürich.</p>
          </div>
          <div>
            <h4>Seiten</h4>
            <ul>
              <li><Link href="/">Start</Link></li>
              {NAV.map((n) => <li key={n.href}><Link href={n.href}>{n.label}</Link></li>)}
              <li><Link href="/kontakt/">Kontakt &amp; Anfrage</Link></li>
            </ul>
          </div>
          <div>
            <h4>Kontakt</h4>
            <ContactIcons variant="row" />
          </div>
        </div>
      </div>
      <p className="footer-word" aria-hidden="true">Ayleen Podgorny</p>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Ayleen Podgorny, Zürich</span>
        <span>Powered and Designed by <a href={WENDICO} target="_blank" rel="noopener noreferrer">Wendico</a></span>
      </div>
    </footer>
  );
}
