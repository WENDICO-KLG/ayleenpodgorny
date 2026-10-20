"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Img from "@/components/Img";
import { gsap, MOTION_OK } from "@/lib/gsap";
import type { ImgName } from "@/lib/site";

// Zwei grosse Wörter gleiten auseinander, dazwischen wächst ein Bild auf volle Breite.
export default function SplitReveal({ left, right, img, alt, caption }: { left: string; right: string; img: ImgName; alt: string; caption?: string }) {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const q = gsap.utils.selector(root);
      const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.6 } });
      tl.fromTo(q(".sr-media"), { clipPath: "inset(16% 13% 16% 57%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1 }, 0)
        .fromTo(q(".sr-media img"), { scale: 1.3 }, { scale: 1, duration: 1 }, 0)
        .to(q(".sr-left"), { xPercent: -70, opacity: 0, duration: 0.8 }, 0.1)
        .to(q(".sr-right"), { xPercent: 70, opacity: 0, duration: 0.8 }, 0.1)
        .from(q(".sr-caption"), { opacity: 0, y: 16, duration: 0.25 }, 0.8)
        .to({}, { duration: 0.3 });
    });
  }, { scope: root });

  return (
    <section ref={root} className="sr" data-own>
      <div className="sr-sticky">
        <figure className="sr-media"><Img name={img} alt={alt} sizes="100vw" /></figure>
        <p className="sr-words" aria-hidden="true"><span className="sr-left">{left}</span><span className="sr-right">{right}</span></p>
        {caption && <p className="sr-caption kicker">{caption}</p>}
      </div>
    </section>
  );
}
