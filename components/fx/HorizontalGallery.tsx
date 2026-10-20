"use client";

import { useEffect, useRef, useState } from "react";
import Img from "@/components/Img";
import type { ImgName } from "@/lib/site";

export type GalleryItem = { img: ImgName; alt: string; caption?: string };

// Beim vertikalen Scrollen fährt die Bildreihe horizontal durch (Desktop mit Maus).
// Bilder behalten ihr Seitenverhältnis: nichts wird beschnitten.
// Touch/schmal: seitlich wischbare Reihe (CSS, Transform wird dort ignoriert).
export default function HorizontalGallery({ items, title, kicker }: { items: GalleryItem[]; title: React.ReactNode; kicker?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    let dist = 0;
    let raf = 0;
    const measure = () => {
      dist = Math.max(0, track.scrollWidth - window.innerWidth);
      setDistance(dist);
    };
    const update = () => {
      raf = 0;
      const r = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      track.style.transform = `translate3d(${-p * dist}px, 0, 0)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    measure();
    update();
    const ro = new ResizeObserver(() => { measure(); update(); });
    ro.observe(track);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { ro.disconnect(); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section ref={sectionRef} className="hgallery" style={{ ["--hg-distance" as string]: `${distance}px` }}>
      <div className="hgallery-sticky">
        <div className="container">
          {kicker && <span className="kicker" style={{ marginBottom: ".8rem" }}>{kicker}</span>}
          {title}
        </div>
        <div ref={trackRef} className="hgallery-track">
          {items.map((it) => (
            <figure key={it.img} className="hgallery-item">
              <Img name={it.img} alt={it.alt} sizes="(max-width: 900px) 70vw, 40vw" />
              {it.caption && <figcaption>{it.caption}</figcaption>}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
