"use client";

import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useRef } from "react";
import Img from "@/components/Img";
import { DESKTOP, enterDelay, gsap, MOTION_OK, SplitText } from "@/lib/gsap";
import { BRAND, HERO_SIZES, IMG } from "@/lib/site";

function Star({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 1.5c.5 5.6 4.9 10 10.5 10.5-5.6.5-10 4.9-10.5 10.5C11.5 16.9 7.1 12.5 1.5 12 7.1 11.5 11.5 7.1 12 1.5z" fill="currentColor" />
    </svg>
  );
}

// Home-Hero im Editorial-Cover-Stil: Riesen-Wortmarke "AYLEEN" in Blush auf Weinrot,
// Ayleen (echter Freisteller) steht davor, Pinselstriche, Schreibschrift links, Profil rechts.
export default function HeroHome() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const q = gsap.utils.selector(root);
      const word = q(".hero-word-text")[0] as HTMLElement;
      const split = SplitText.create(word, { type: "chars", mask: "chars", charsClass: "hc" });
      const tl = gsap.timeline({ delay: enterDelay() });
      tl.from(q(".hero-disc"), { scale: 0.6, opacity: 0, duration: 1.8 }, 0)
        .from(split.chars, { yPercent: 105, duration: 1.3, stagger: 0.06, ease: "expo.out", onComplete: () => split.revert() }, 0.05)
        .from(q(".hero-figure-inner"), { yPercent: 14, opacity: 0, duration: 1.7, ease: "expo.out" }, 0.3)
        .from(q(".hero-brush path"), { drawSVG: 0, duration: 1.6, stagger: 0.12, ease: "power2.inOut" }, 0.45)
        .fromTo(q(".hero-script"), { "--sign": "-10%" }, { "--sign": "110%", duration: 1.8, ease: "power1.inOut" }, 0.9)
        .from(q(".hero-script-line path"), { drawSVG: 0, duration: 0.9, ease: "power2.inOut" }, 2.2)
        .from(q(".hero-info > *"), { opacity: 0, y: 22, duration: 1, stagger: 0.09 }, 1.1)
        .from(q(".hero-badge"), { scale: 0, rotation: -140, duration: 1.3, ease: "back.out(1.5)" }, 1.3)
        .from(q(".hero-scroll"), { opacity: 0, duration: 0.8 }, 1.8);

      gsap.to(q(".hero-badge-ring"), { rotation: 360, duration: 26, ease: "none", repeat: -1 });

      // Scroll: Wortmarke bleibt zurück, Ayleen kommt näher, Texte gleiten weg
      const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
      gsap.to(word, { yPercent: 28, ease: "none", scrollTrigger: st });
      gsap.to(q(".hero-figure-inner img"), { scale: 1.08, transformOrigin: "50% 100%", ease: "none", scrollTrigger: st });
      gsap.to(q(".hero-brush"), { yPercent: 12, ease: "none", scrollTrigger: st });
      return () => split.revert();
    });

    // Desktop: Texte gleiten beim Scrollen weg (auf dem Handy stehen sie unter dem Bild und bleiben)
    mm.add(DESKTOP, () => {
      const q = gsap.utils.selector(root);
      gsap.to(q(".hero-script-wrap, .hero-info, .hero-badge"), { yPercent: -40, opacity: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "55% top", scrub: true } });
    });

    // Maus-Parallaxe in vier Ebenen (nur Desktop mit Maus)
    mm.add(`${DESKTOP} and (pointer: fine)`, () => {
      const q = gsap.utils.selector(root);
      const layers = [
        { el: q(".hero-word")[0], k: -12 },
        { el: q(".hero-figure-inner")[0], k: 10 },
        { el: q(".hero-brush")[0], k: -24 },
        { el: q(".hero-disc")[0], k: -6 },
      ].filter((l) => l.el);
      const movers = layers.map((l) => ({ k: l.k, x: gsap.quickTo(l.el, "x", { duration: 1.4 }), y: gsap.quickTo(l.el, "y", { duration: 1.4 }) }));
      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        movers.forEach((m) => { m.x(nx * m.k); m.y(ny * m.k * 0.6); });
      };
      root.current?.addEventListener("pointermove", onMove);
      return () => root.current?.removeEventListener("pointermove", onMove);
    });
  }, { scope: root });

  return (
    <section ref={root} className="hero-home">
      {/* Bühne: dunkle Scheibe, Pinselstriche, Korn */}
      <div className="hero-bg" aria-hidden="true">
        <span className="hero-disc" />
        <svg className="hero-brush" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <filter id="hero-dry-brush" x="-20%" y="-40%" width="140%" height="180%">
              <feTurbulence type="fractalNoise" baseFrequency="0.008 0.02" numOctaves="3" seed="8" result="warp" />
              <feDisplacementMap in="SourceGraphic" in2="warp" scale="60" xChannelSelector="R" yChannelSelector="G" result="bent" />
              <feTurbulence type="fractalNoise" baseFrequency="0.03 0.09" numOctaves="2" seed="3" result="grain" />
              <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -0.9 1.25" result="soft" />
              <feComposite in="bent" in2="soft" operator="in" result="dry" />
              <feGaussianBlur in="dry" stdDeviation="5" />
            </filter>
          </defs>
          <g filter="url(#hero-dry-brush)" fill="none" stroke="currentColor" strokeLinecap="round">
            <path d="M-60 640 C 60 520, 170 430, 330 330" strokeWidth="92" opacity=".5" />
            <path d="M-30 700 C 90 600, 200 520, 380 430" strokeWidth="44" opacity=".32" />
            <path d="M1060 660 C 940 560, 830 480, 690 400" strokeWidth="86" opacity=".42" />
            <path d="M1060 720 C 960 640, 860 590, 720 520" strokeWidth="36" opacity=".28" />
          </g>
        </svg>
      </div>

      <div className="container hero-stage">
        <h1 className="hero-word">
          <span className="hero-word-text">Ayleen</span>
          <span className="visually-hidden"> Podgorny – Mediamatikerin, Head of Social Media, Eiskunstläuferin und Model aus Zürich</span>
        </h1>

        <figure className="hero-figure">
          <div className="hero-figure-inner">
            <Img name={IMG.hero} alt="Ayleen Podgorny lächelt, Portrait" priority sizes={HERO_SIZES} />
          </div>
        </figure>

        <div className="hero-script-wrap">
          <p className="hero-script">Vom Eis<br />vor die<br />Kamera.</p>
          <svg className="hero-script-line" viewBox="0 0 220 30" aria-hidden="true"><path d="M4 22 C 60 8, 130 4, 216 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
        </div>

        <div className="hero-info">
          <p className="hero-name">Ayleen Podgorny <Star className="hero-star" /></p>
          <p className="hero-desc">
            <Link href="/ueber-mich/">Mediamatikerin</Link> bei Swisscom, <Link href="/social-media/">Head of Social Media</Link> bei Wendico,
            Spitzensportlerin im <Link href="/leistungssport/">Eiskunstlauf</Link> und <Link href="/model/">Model</Link>.
          </p>
          <p className="hero-based"><span>Based in</span>Zürich, Schweiz</p>
        </div>

        <div className="hero-badge" aria-hidden="true">
          <svg className="hero-badge-ring" viewBox="0 0 100 100">
            <defs><path id="badge-circle" d="M50 50m-39 0a39 39 0 1 1 78 0a39 39 0 1 1-78 0" /></defs>
            <text><textPath href="#badge-circle">Mediamatik · Social Media · Eis · Model ·</textPath></text>
          </svg>
          <img src={BRAND.monogrammWeiss} alt="" width="45" height="48" />
        </div>

        <span className="hero-scroll" aria-hidden="true">Scroll</span>
      </div>
    </section>
  );
}
