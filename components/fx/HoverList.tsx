"use client";

import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useRef } from "react";
import Img from "@/components/Img";
import { Mix } from "@/components/Type";
import { gsap } from "@/lib/gsap";
import type { ImgName } from "@/lib/site";

export type Offer = { title: string; meta: string; img: ImgName; alt: string };

// Angebotsliste (Midnight à la carte): Beim Überfahren folgt ein Bild dem Mauszeiger.
export default function HoverList({ items }: { items: Offer[] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(gsap.utils.toArray(".offer", root.current), { y: 40, opacity: 0, duration: 1, stagger: 0.08, scrollTrigger: { trigger: root.current, start: "top 85%", once: true } });
    });
    mm.add("(pointer: fine) and (min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(root);
      const float = q(".offer-float")[0] as HTMLElement;
      const imgs = q(".offer-float figure") as HTMLElement[];
      gsap.set(float, { xPercent: -50, yPercent: -50, scale: 0, autoAlpha: 0 });
      const x = gsap.quickTo(float, "x", { duration: 0.7, ease: "power3" });
      const y = gsap.quickTo(float, "y", { duration: 0.7, ease: "power3" });
      const rot = gsap.quickTo(float, "rotation", { duration: 0.9, ease: "power3" });
      let lastX = 0;
      const box = root.current!;
      const onMove = (e: PointerEvent) => {
        const r = box.getBoundingClientRect();
        x(e.clientX - r.left); y(e.clientY - r.top);
        rot(gsap.utils.clamp(-12, 12, (e.clientX - lastX) * 0.6));
        lastX = e.clientX;
      };
      const show = (i: number) => {
        gsap.to(float, { scale: 1, autoAlpha: 1, duration: 0.5, ease: "back.out(1.5)" });
        imgs.forEach((im, k) => gsap.to(im, { clipPath: k === i ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)", duration: 0.6, ease: "apio" }));
      };
      const hide = () => gsap.to(float, { scale: 0, autoAlpha: 0, duration: 0.4 });
      const rows = q(".offer") as HTMLElement[];
      const enters = rows.map((row, i) => { const f = () => show(i); row.addEventListener("pointerenter", f); return f; });
      box.addEventListener("pointermove", onMove);
      box.addEventListener("pointerleave", hide);
      return () => {
        rows.forEach((row, i) => row.removeEventListener("pointerenter", enters[i]));
        box.removeEventListener("pointermove", onMove);
        box.removeEventListener("pointerleave", hide);
      };
    });
  }, { scope: root });

  return (
    <div ref={root} className="offers" data-own>
      {items.map((o) => (
        <Link key={o.title} href="/kontakt/" className="offer">
          <Mix as="span" text={o.title} />
          <span className="kicker">{o.meta}</span>
        </Link>
      ))}
      <div className="offer-float" aria-hidden="true">
        {items.map((o) => <figure key={o.title}><Img name={o.img} alt="" sizes="16rem" /></figure>)}
      </div>
    </div>
  );
}
