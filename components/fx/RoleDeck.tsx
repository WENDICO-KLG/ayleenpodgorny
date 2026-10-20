"use client";

import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight } from "@/components/Arrows";
import Img from "@/components/Img";
import { gsap, MOTION_OK } from "@/lib/gsap";
import type { ImgName } from "@/lib/site";

export type Role = { href: string; title: string; org: string; text: string; img: ImgName; alt: string };

// "Was ich mache": Kartendeck auf Betonwand (Tiara). Beim Scrollen fliegt die oberste
// Karte weg und die nächste rückt nach; links zählt die Nummer mit.
export default function RoleDeck({ roles }: { roles: Role[] }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const q = gsap.utils.selector(root);
      const cards = q(".deck-card") as HTMLElement[];
      const n = cards.length;
      // Ausgangslage: gefächerter Stapel
      cards.forEach((c, i) => gsap.set(c, { zIndex: n - i, y: i * 16, scale: 1 - i * 0.045, rotation: i === 0 ? 0 : (i % 2 ? 3.5 : -3) * Math.min(i, 2) }));

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.7,
          onUpdate: (self) => setActive(Math.min(n - 1, Math.floor(self.progress * (n - 0.4) + 0.5))),
        },
      });
      for (let i = 0; i < n - 1; i++) {
        tl.to(cards[i], { yPercent: -135, xPercent: i % 2 ? 22 : -22, rotation: i % 2 ? 14 : -14, duration: 1 }, i)
          .set(cards[i], { pointerEvents: "none" }, i + 1);
        cards.slice(i + 1).forEach((c, k) => {
          tl.to(c, { y: k * 16, scale: 1 - k * 0.045, rotation: k === 0 ? 0 : (k % 2 ? 3.5 : -3) * Math.min(k, 2), duration: 1 }, i);
        });
      }
      tl.to({}, { duration: 0.6 }); // letzte Karte bleibt kurz stehen
    });
  }, { scope: root });

  return (
    <section ref={root} className="roles" style={{ ["--n" as string]: roles.length }} aria-labelledby="roles-title" data-own>
      <div className="roles-sticky" style={{ backgroundImage: "url(/img/beton-1080.webp)" }}>
        <div className="container roles-grid">
          <div className="roles-side">
            <span className="kicker">Was ich mache</span>
            <h2 id="roles-title" className="visually-hidden">Was ich mache</h2>
            <p className="roles-count" aria-hidden="true">
              <span className="roles-count-num" key={active}>0{active + 1}</span>
              <span className="roles-count-total">/ 0{roles.length}</span>
            </p>
            <ol className="roles-list">
              {roles.map((r, i) => (
                <li key={r.href} className={i === active ? "is-active" : undefined}>
                  <Link href={r.href}>{r.title}</Link>
                </li>
              ))}
            </ol>
          </div>
          <div className="deck">
            {roles.map((r) => (
              <Link key={r.href} href={r.href} className="deck-card">
                <div className="deck-img"><Img name={r.img} alt={r.alt} sizes="(max-width: 900px) 80vw, 26rem" /></div>
                <div className="deck-body">
                  <span className="kicker">{r.org}</span>
                  <h3>{r.title}</h3>
                  <p>{r.text}</p>
                  <span className="more">Mehr <ArrowRight /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
