"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Img from "@/components/Img";
import { gsap, MOTION_OK } from "@/lib/gsap";
import type { ImgName } from "@/lib/site";

// Bild öffnet sich aus einem kleinen Fenster auf volle Grösse, während die Zeilen
// abwechselnd von links und rechts hereinfahren (Midnight "Not your mothers…").
export default function ZoomLines({ img, kicker, lines }: { img: ImgName; kicker: string; lines: string[] }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const q = gsap.utils.selector(root);
      const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.6 } });
      tl.fromTo(q(".zoom-media"), { clipPath: "inset(30% 34% 30% 34% round 1.25rem)" }, { clipPath: "inset(0% 0% 0% 0% round 0rem)", duration: 1 }, 0)
        .fromTo(q(".zoom-media img"), { scale: 1.45 }, { scale: 1, duration: 1 }, 0)
        .fromTo(q(".zoom-shade"), { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.4)
        .from(q(".zoom-kicker"), { opacity: 0, y: 20, duration: 0.3 }, 0.55);
      (q(".zoom-line") as HTMLElement[]).forEach((l, i) => {
        tl.from(l, { xPercent: i % 2 ? 60 : -60, opacity: 0, duration: 0.55 }, 0.45 + i * 0.12);
      });
      tl.to({}, { duration: 0.35 });
    });
  }, { scope: root });

  return (
    <section ref={root} className="zoom" data-own aria-label={lines.join(" ")}>
      <div className="zoom-sticky">
        <div className="zoom-media"><Img name={img} alt="" sizes="100vw" /><span className="zoom-shade" /></div>
        <div className="container zoom-text">
          <span className="kicker zoom-kicker">{kicker}</span>
          <p className="zoom-lines" aria-hidden="true">
            {lines.map((l, i) => <span key={l} className={`zoom-line${i % 2 ? " faded" : ""}`}>{l}</span>)}
          </p>
        </div>
      </div>
    </section>
  );
}
