"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Weiches Scrollen (Lenis), synchron mit GSAP ScrollTrigger. Respektiert prefers-reduced-motion.
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    (window as Window & { __lenis?: Lenis }).__lenis = lenis;
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete (window as Window & { __lenis?: Lenis }).__lenis;
    };
  }, []);

  // bei Seitenwechsel nach oben, bzw. zum Anker (z. B. /portfolio/#social-media), sobald der Vorhang weg ist
  useEffect(() => {
    const lenis = (window as Window & { __lenis?: Lenis }).__lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
    const hash = window.location.hash;
    if (!hash) return;
    const t = window.setTimeout(() => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!el) return;
      const l = (window as Window & { __lenis?: Lenis }).__lenis;
      if (l) l.scrollTo(el, { offset: -70, duration: 1.4 });
      else el.scrollIntoView({ behavior: "smooth" });
    }, 1100);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return null;
}
