import Link from "next/link";
import { Serif } from "@/components/Type";

export default function NotFound() {
  return (
    <section className="section bg-blush" style={{ minHeight: "70vh", display: "grid", placeItems: "center", textAlign: "center" }}>
      <div className="container">
        <span className="kicker">404</span>
        <Serif as="h1" text="Seite nicht *gefunden*" style={{ fontSize: "clamp(3rem, 9vw, 7rem)", margin: "1rem 0 2rem" }} />
        <Link href="/" className="btn">Zur Startseite</Link>
      </div>
    </section>
  );
}
