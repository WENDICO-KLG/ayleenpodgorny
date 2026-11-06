"use client";

import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useRef } from "react";
import Img from "@/components/Img";
import { DESKTOP, enterDelay, gsap, MOTION_OK } from "@/lib/gsap";
import { BRAND, HERO_SIZES, IMG } from "@/lib/site";

// Home-Hero nach der Inspiration «Serina.C»: Foto-Karte mit runden Ecken auf weinrotem Rahmen,
// riesiger Name oben, Ayleens Kopf steht vor den Buchstaben (Foto hinten, Name, Freisteller vorne,
// beide Bildebenen deckungsgleich), Claim mit kursivem Wort, Pill-Button, Badge am Rand.
export default function HeroHome() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const q = gsap.utils.selector(root);
      const layers = q(".hero-layer");
      // Intro erst starten, wenn beide Bildebenen dekodiert sind (sonst steht der Name kurz ohne Foto da)
      const tl = gsap.timeline({ paused: true, delay: enterDelay(), defaults: { ease: "expo.out" } });
      tl.from(q(".hero-card"), { clipPath: "inset(6% 4% 6% 4% round 2.5rem)", duration: 1.6, ease: "expo.inOut", clearProps: "clipPath" }, 0)
        .from(layers, { scale: 1.08, duration: 2.2 }, 0)
        .from(q(".hero-word-text"), { yPercent: 105, duration: 1.5 }, 0.55)
        .from(q(".hero-claim-line > span"), { yPercent: 110, duration: 1.2, stagger: 0.1 }, 0.95)
        .from(q(".hero-cta"), { opacity: 0, y: 16, duration: 1 }, 1.35)
        .from(q(".hero-badge"), { scale: 0, rotation: -120, duration: 1.3, ease: "back.out(1.6)" }, 1.25);
      const imgs = q(".hero-layer img") as HTMLImageElement[];
      const ready = Promise.all(imgs.map((i) => (i.complete ? i.decode() : new Promise((r) => i.addEventListener("load", r, { once: true })).then(() => i.decode())).catch(() => {})));
      Promise.race([ready, new Promise((r) => setTimeout(r, 2500))]).then(() => tl.play());

      // Scroll: Foto und Freisteller zoomen gemeinsam, der Name bleibt zurück (Tiefe)
      const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
      gsap.to(layers, { scale: 1.1, transformOrigin: "50% 35%", ease: "none", scrollTrigger: st });
      gsap.to(q(".hero-word"), { yPercent: 35, ease: "none", scrollTrigger: st });
    });

    // Desktop: Claim und Badge gleiten beim Scrollen weg
    mm.add(DESKTOP, () => {
      const q = gsap.utils.selector(root);
      gsap.to(q(".hero-claim, .hero-badge"), { yPercent: -30, opacity: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "60% top", scrub: true } });
    });

    // Maus-Parallaxe: nur der Name bewegt sich gegen die Bildebenen (die bleiben deckungsgleich)
    mm.add(`${DESKTOP} and (pointer: fine)`, () => {
      const word = root.current?.querySelector(".hero-word-text");
      if (!word) return;
      const x = gsap.quickTo(word, "x", { duration: 1.4 });
      const y = gsap.quickTo(word, "y", { duration: 1.4 });
      const onMove = (e: PointerEvent) => { x((e.clientX / window.innerWidth - 0.5) * -18); y((e.clientY / window.innerHeight - 0.5) * -8); };
      root.current?.addEventListener("pointermove", onMove);
      return () => root.current?.removeEventListener("pointermove", onMove);
    });
  }, { scope: root });

  return (
    <section ref={root} className="hero-home">
      <div className="hero-frame">
        <div className="hero-card">
          <div className="hero-layer hero-photo">
            <Img name={IMG.hero} alt="Ayleen Podgorny lächelt, Portrait im Freien" priority sizes={HERO_SIZES} />
          </div>

          <h1 className="hero-word">
            <span className="hero-word-text" aria-hidden="true">Ayleen.P</span>
            <span className="visually-hidden">Ayleen Podgorny – Mediamatikerin, Head of Social Media, Eiskunstläuferin und Model aus Zürich</span>
          </h1>

          <div className="hero-layer hero-person" aria-hidden="true">
            <Img name={IMG.heroPerson} alt="" priority sizes={HERO_SIZES} />
          </div>

          <div className="hero-claim">
            <p className="hero-claim-text">
              <span className="hero-claim-line"><span>Vom Eis</span></span>
              <span className="hero-claim-line"><span><em>vor</em> die</span></span>
              <span className="hero-claim-line"><span>Kamera</span></span>
            </p>
            <Link href="/kontakt/" className="hero-cta">Kontakt & Anfrage</Link>
          </div>
        </div>

        <div className="hero-badge" aria-hidden="true">
          <img src={BRAND.monogrammWeiss} alt="" width="45" height="48" />
        </div>
      </div>
    </section>
  );
}
