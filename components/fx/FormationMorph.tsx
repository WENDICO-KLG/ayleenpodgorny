"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";

const N = 16;
const C = { x: 200, y: 150 };
type P = { x: number; y: number };

// Die fünf Grundelemente im Synchronized Skating als Punktpositionen
const circle: P[] = Array.from({ length: N }, (_, i) => {
  const a = (i / N) * Math.PI * 2 - Math.PI / 2;
  return { x: C.x + Math.cos(a) * 108, y: C.y + Math.sin(a) * 108 };
});
const line: P[] = Array.from({ length: N }, (_, i) => ({ x: 60 + (i % 8) * 40, y: i < 8 ? 122 : 178 }));
const block: P[] = Array.from({ length: N }, (_, i) => ({ x: C.x - 63 + (i % 4) * 42, y: C.y - 63 + Math.floor(i / 4) * 42 }));
const wheel: P[] = Array.from({ length: N }, (_, i) => {
  const spoke = i % 4;
  const r = 30 + Math.floor(i / 4) * 28;
  const a = (spoke / 4) * Math.PI * 2;
  return { x: C.x + Math.cos(a) * r, y: C.y + Math.sin(a) * r };
});
const cross: P[] = Array.from({ length: N }, (_, i) => {
  const group = i < 8 ? 1 : -1;
  const k = i % 8;
  const d = (k < 4 ? -1 : 1) * (22 + (k % 4) * 34);
  const a = group * (Math.PI / 6);
  return { x: C.x + Math.cos(a) * d, y: C.y + Math.sin(a) * d };
});

const STAGES = [
  { name: "Kreis", pts: circle },
  { name: "Linie", pts: line },
  { name: "Block", pts: block },
  { name: "Rad", pts: wheel },
  { name: "Kreuzung", pts: cross },
];
const ME = 3; // ein hervorgehobener Punkt: "Ich"

// "In Formation": 16 Punkte formieren sich beim Scrollen nacheinander zu den
// Grundelementen im Synchronized Skating (Kreis, Linie, Block, Rad, Kreuzung).
export default function FormationMorph() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const q = gsap.utils.selector(root);
      const dots = q(".f-dot") as Element[];
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.8,
        },
      });
      // Nach dem Rad ist die Gruppe um 90° gedreht: spätere Ziele werden zurückgedreht
      let turned = false;
      const local = (p: P) => (turned ? { x: C.x + (p.y - C.y), y: C.y - (p.x - C.x) } : p);
      STAGES.slice(1).forEach((st, s) => {
        const at = s + 0.4;
        dots.forEach((d, i) => {
          const t = local(st.pts[i]);
          tl.to(d, { x: t.x - circle[i].x, y: t.y - circle[i].y, duration: 0.6 }, at + (i % 8) * 0.008);
        });
        tl.to(q(".f-guide"), { opacity: 0, duration: 0.2 }, at);
        // Rad: Vierteldrehung in der Haltephase
        if (st.name === "Rad") {
          tl.to(q(".f-dots"), { rotation: 90, svgOrigin: `${C.x} ${C.y}`, duration: 0.4, ease: "power1.inOut" }, at + 0.6);
          turned = true;
        }
      });
      tl.to({}, { duration: 0.2 });
      // Ruhepuls auf "meinem" Punkt
      gsap.to(q(".f-me-ring"), { attr: { r: 18 }, opacity: 0, duration: 1.6, repeat: -1, ease: "power1.out" });
    });
  }, { scope: root });

  return (
    <section ref={root} className="formation-scene" data-own aria-labelledby="formation-title">
      <div className="formation-sticky">
        <div className="container formation-grid">
          <h2 id="formation-title" className="mix formation-title">In <em>Formation</em></h2>
          <svg className="formation-svg" viewBox="0 0 400 300" role="img" aria-label="16 Punkte formieren sich nacheinander zu Kreis, Linie, Block, Rad und Kreuzung">
            <circle className="f-guide" cx={C.x} cy={C.y} r="108" fill="none" stroke="currentColor" strokeOpacity=".25" strokeDasharray="3 6" />
            <g className="f-dots">
              {circle.map((p, i) => (
                <g key={i} className={`f-dot${i === ME ? " f-me" : ""}`}>
                  {i === ME && <circle className="f-me-ring" cx={p.x} cy={p.y} r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />}
                  <circle cx={p.x} cy={p.y} r="9" />
                </g>
              ))}
            </g>
          </svg>
          <p className="formation-me" aria-hidden="true"><i /> Eine davon bin ich</p>
        </div>
      </div>
    </section>
  );
}
