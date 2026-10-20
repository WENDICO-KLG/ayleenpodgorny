"use client";

import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import Img from "@/components/Img";
import { DESKTOP, gsap } from "@/lib/gsap";
import type { ImgName } from "@/lib/site";

export type Shot = { img: ImgName; alt: string; caption: string };

// Model-Galerie: drei Spalten laufen beim Scrollen unterschiedlich schnell,
// ein Klick öffnet das Bild gross (FLIP-Übergang vom Vorschaubild aus).
export default function ModelGallery({ shots }: { shots: Shot[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const from = useRef<DOMRect | null>(null);
  const cols: Shot[][] = [[], [], []];
  shots.forEach((s, i) => cols[i % 3].push(s));

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(DESKTOP, () => {
      const q = gsap.utils.selector(root);
      // Spalten starten bündig (nichts ragt in den Titel) und laufen unterschiedlich weit
      (q(".mg-col") as HTMLElement[]).forEach((col, i) => {
        const y = [30, -70, 60][i];
        gsap.fromTo(col, { y: 0 }, { y, ease: "none", scrollTrigger: { trigger: root.current, start: "top 80%", end: "bottom 20%", scrub: true } });
      });
      // Cursor-Hinweis "Ansehen"
      const cur = q(".mg-cursor")[0] as HTMLElement;
      gsap.set(cur, { xPercent: -50, yPercent: -50, scale: 0 });
      const x = gsap.quickTo(cur, "x", { duration: 0.5, ease: "power3" });
      const y = gsap.quickTo(cur, "y", { duration: 0.5, ease: "power3" });
      const box = root.current!;
      const move = (e: PointerEvent) => { const r = box.getBoundingClientRect(); x(e.clientX - r.left); y(e.clientY - r.top); };
      const over = (e: PointerEvent) => gsap.to(cur, { scale: (e.target as HTMLElement).closest("button") ? 1 : 0, duration: 0.35 });
      box.addEventListener("pointermove", move);
      box.addEventListener("pointerover", over);
      const leave = () => gsap.to(cur, { scale: 0, duration: 0.3 });
      box.addEventListener("pointerleave", leave);
      return () => { box.removeEventListener("pointermove", move); box.removeEventListener("pointerover", over); box.removeEventListener("pointerleave", leave); };
    });
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>(".mg-item", root.current).forEach((el) => {
        gsap.from(el, { clipPath: "inset(100% 0% 0% 0%)", duration: 1.3, ease: "apio", scrollTrigger: { trigger: el, start: "top 92%", once: true } });
        gsap.from(el.querySelector("img"), { scale: 1.3, duration: 1.7, scrollTrigger: { trigger: el, start: "top 92%", once: true } });
      });
    });
  }, { scope: root });

  // Lightbox öffnen: vom Vorschaubild aus aufziehen
  useEffect(() => {
    if (open === null) return;
    const big = document.querySelector<HTMLElement>(".lightbox-img img");
    const r = from.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    from.current = null;
    if (big && !r && !reduced) gsap.from(big, { opacity: 0, scale: 0.97, duration: 0.5 });
    if (big && r && !reduced) {
      const t = big.getBoundingClientRect();
      gsap.fromTo(big, { x: r.left - t.left, y: r.top - t.top, scaleX: r.width / t.width, scaleY: r.height / t.height, transformOrigin: "0 0" }, { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 0.9, ease: "apio" });
      gsap.from(".lightbox", { backgroundColor: "rgba(20,11,12,0)", duration: 0.6 });
      gsap.from(".lightbox-meta", { opacity: 0, y: 12, duration: 0.6, delay: 0.5 });
    }
    const lenis = (window as Window & { __lenis?: { stop(): void; start(): void } }).__lenis;
    lenis?.stop();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((o) => (o === null ? o : (o + 1) % shots.length));
      if (e.key === "ArrowLeft") setOpen((o) => (o === null ? o : (o - 1 + shots.length) % shots.length));
    };
    window.addEventListener("keydown", key);
    document.querySelector<HTMLElement>(".lightbox-close")?.focus();
    return () => { window.removeEventListener("keydown", key); lenis?.start(); };
  }, [open, shots.length]);

  const show = (i: number, el: HTMLElement) => { from.current = el.querySelector("img")?.getBoundingClientRect() ?? null; setOpen(i); };

  return (
    <div ref={root} className="mg" data-own>
      <div className="mg-cols">
        {cols.map((col, c) => (
          <div key={c} className="mg-col">
            {col.map((s) => {
              const i = shots.indexOf(s);
              return (
                <figure key={s.img} className="mg-item">
                  <button type="button" onClick={(e) => show(i, e.currentTarget)} aria-label={`${s.alt} gross ansehen`}>
                    <Img name={s.img} alt={s.alt} sizes="(max-width: 900px) 50vw, 30vw" />
                  </button>
                  <figcaption>{s.caption}</figcaption>
                </figure>
              );
            })}
          </div>
        ))}
      </div>
      <span className="mg-cursor" aria-hidden="true">Ansehen</span>

      {open !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={shots[open].alt} onClick={() => setOpen(null)}>
          <div className="lightbox-img" key={open}><Img name={shots[open].img} alt={shots[open].alt} sizes="90vw" priority /></div>
          <div className="lightbox-meta" onClick={(e) => e.stopPropagation()}>
            <span>{String(open + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")} · {shots[open].caption}</span>
            <span className="lightbox-nav">
              <button type="button" onClick={() => setOpen((open - 1 + shots.length) % shots.length)} aria-label="Vorheriges Bild">←</button>
              <button type="button" onClick={() => setOpen((open + 1) % shots.length)} aria-label="Nächstes Bild">→</button>
              <button type="button" className="lightbox-close" onClick={() => setOpen(null)} aria-label="Schliessen">Schliessen</button>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
