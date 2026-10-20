"use client";

import type Lenis from "lenis";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Phase = "initial" | "idle" | "cover" | "reveal";
const COVER_MS = 800; // Vorhang fährt hoch
const HOLD_MS = 450; // Name bleibt kurz stehen
const SETTLE_MS = 250; // neue Seite rendern lassen
const REVEAL_MS = 850; // Vorhang fährt weg

// Seitenübergang: Bordeaux-Vorhang deckt den Bildschirm ab, in der Mitte steht
// "Ayleen Podgorny", dann wird navigiert und der Vorhang zieht nach oben weg.
// Beim ersten Laden zeigt derselbe Vorhang kurz den Namen (reines CSS, auch ohne JS).
export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("initial");
  const pending = useRef<string | null>(null);
  const timers = useRef<number[]>([]);

  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));

  // Erstes Laden: CSS-Animation blendet aus, danach in den Ruhezustand
  useEffect(() => {
    later(() => setPhase((p) => (p === "initial" ? "idle" : p)), 1900);
    const t = timers.current;
    return () => t.forEach(clearTimeout);
  }, []);

  // Klicks auf interne Links abfangen (Capture-Phase, vor dem Next-Link-Handler)
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onClick = (e: MouseEvent) => {
      if (reduced || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const href = a.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith("//")) return;
      const url = new URL(href, location.href);
      if (url.pathname === location.pathname) return; // gleiche Seite (z. B. Anker): normal
      e.preventDefault();
      e.stopPropagation();
      if (pending.current) return;
      pending.current = url.pathname + url.search + url.hash;
      setPhase("cover");
      later(() => router.push(pending.current!, { scroll: false }), COVER_MS + HOLD_MS);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  // Neue Seite ist da: nach oben springen, Vorhang wegziehen
  useEffect(() => {
    if (!pending.current) return;
    const lenis = (window as Window & { __lenis?: Lenis }).__lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
    later(() => {
      setPhase("reveal");
      later(() => {
        setPhase("idle");
        pending.current = null;
      }, REVEAL_MS);
    }, SETTLE_MS);
  }, [pathname]);

  return (
    <div className="pt" data-phase={phase} aria-hidden="true">
      <div>
        <p className="pt-name">Ayleen <em>Podgorny</em></p>
        <span className="pt-sub">Zürich</span>
      </div>
    </div>
  );
}
