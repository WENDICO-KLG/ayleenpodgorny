"use client";

import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";

// Einmal registrieren (nur im Browser)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, CustomEase);
  CustomEase.create("ap", "0.22, 1, 0.36, 1");
  CustomEase.create("apio", "0.76, 0, 0.24, 1");
  gsap.defaults({ ease: "ap", duration: 1 });
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const DESKTOP = "(min-width: 900px) and (prefers-reduced-motion: no-preference)";

// Verzögerung, bis der Seitenvorhang die Seite freigibt
// (erstes Laden: Vorhang hebt sich nach ~0.9 s; Seitenwechsel: ~0.25 s nach dem Routenwechsel)
export function enterDelay() {
  const t = performance.now() / 1000;
  return t < 3 ? Math.max(0.2, 1.25 - t) : 0.45;
}

export { gsap, ScrollTrigger, SplitText, DrawSVGPlugin };
