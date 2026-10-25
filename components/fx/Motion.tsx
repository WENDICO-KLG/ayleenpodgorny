"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { enterDelay, gsap, MOTION_OK, ScrollTrigger, SplitText } from "@/lib/gsap";

const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(sel));

// Ein .reveal-Element (CSS-Einblendung) wird von GSAP übernommen: sofort sichtbar, ohne CSS-Transition.
function claim(el: Element | null) {
  let n: HTMLElement | null = el as HTMLElement | null;
  while (n && n.tagName !== "MAIN") {
    if (n.classList.contains("reveal")) { n.classList.add("in"); n.style.transition = "none"; }
    n = n.parentElement;
  }
}
const inView = (el: Element) => el.getBoundingClientRect().top < window.innerHeight;

// Seitenweite Scroll-Effekte, über Klassen/Datenattribute gesteuert. Läuft bei jedem Seitenwechsel neu.
export default function Motion() {
  const pathname = usePathname();

  // Persistente Teile (Header, Footer)
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      // Header blendet beim Runterscrollen aus, beim Hochscrollen wieder ein
      const header = document.querySelector<HTMLElement>(".site-header");
      const st = ScrollTrigger.create({
        start: 0, end: "max",
        onUpdate: (self) => {
          if (!header || document.body.classList.contains("nav-open")) return;
          header.classList.toggle("is-hidden", self.direction === 1 && self.scroll() > 240);
        },
      });
      // Footer-Schriftzug: Buchstaben steigen beim Erreichen des Seitenendes auf
      const word = document.querySelector<HTMLElement>(".footer-word");
      let split: SplitText | undefined;
      if (word) {
        split = SplitText.create(word, { type: "chars", mask: "chars", charsClass: "fc" });
        gsap.from(split.chars, { yPercent: 105, ease: "none", stagger: 0.04, scrollTrigger: { trigger: ".site-footer", start: "top 85%", end: "bottom bottom", scrub: 0.6 } });
      }
      return () => { st.kill(); split?.revert(); };
    });
    return () => mm.revert();
  }, []);

  useEffect(() => {
    document.querySelector(".site-header")?.classList.remove("is-hidden");
    const mm = gsap.matchMedia();
    const d = enterDelay();

    mm.add(MOTION_OK, (ctx) => {
      const main = document.getElementById("main");
      if (!main) return;
      const own = (el: Element) => !!el.closest("[data-own]");

      // 1) Titel: Zeilen steigen aus einer Maske. Geteilt wird erst mit geladenen Schriften
      //    (richtige Zeilenumbrüche); danach wird das Original-HTML wiederhergestellt, damit
      //    keine Maske kursive Ober-/Unterlängen abschneidet.
      const titles = $$(".mix, .serif-title", main).filter((el) => !own(el) && !el.closest(".page-hero, .hero-home, .offer, [data-words]"));
      titles.forEach((el) => { claim(el); gsap.set(el, { autoAlpha: 0 }); });
      document.fonts.ready.then(() => ctx.add(() => {
        titles.forEach((el) => {
          if (!el.isConnected) return;
          const delay = inView(el) ? d : 0;
          gsap.set(el, { autoAlpha: 1 });
          const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "sl" });
          gsap.from(split.lines, { yPercent: 115, duration: 1.15, stagger: 0.09, delay, scrollTrigger: { trigger: el, start: "top 90%", once: true }, onComplete: () => split.revert() });
        });
        ScrollTrigger.refresh();
      }));

      // 2) Unterseiten-Hero: Buchstaben, Bild öffnet sich, danach Scroll-Tiefe
      $$(".page-hero", main).forEach((hero) => {
        const h1 = hero.querySelector("h1");
        const media = hero.querySelector(".page-hero-media");
        const img = media?.querySelector("img");
        const tl = gsap.timeline({ delay: d });
        if (media) tl.from(media, { clipPath: "inset(0% 0% 0% 100%)", duration: 1.5, ease: "apio" }, 0);
        if (img) tl.from(img, { scale: 1.35, duration: 1.9 }, 0);
        if (h1) {
          const s = SplitText.create(h1, { type: "chars,words", mask: "chars", charsClass: "sc" });
          tl.from(s.chars, { yPercent: 120, duration: 1.1, stagger: 0.035, onComplete: () => s.revert() }, 0.35);
        }
        tl.from(hero.querySelector(".kicker"), { opacity: 0, y: 12, duration: 0.8 }, 0.6);
        if (img) gsap.to(img, { yPercent: 12, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
        const text = hero.querySelector(".page-hero-text");
        if (text) gsap.to(text, { yPercent: -18, opacity: 0.2, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
      });

      // 3) Bilder: Clip-Reveal von unten (das Bild füllt den Rahmen immer ganz, ohne Lücken)
      $$(".photo, .journey-img, .tab-media, .contact-media", main).filter((el) => !own(el)).forEach((fig) => {
        claim(fig);
        const img = fig.querySelector("img");
        const delay = inView(fig) ? d : 0;
        gsap.from(fig, { clipPath: "inset(100% 0% 0% 0%)", duration: 1.4, ease: "apio", delay, scrollTrigger: { trigger: fig, start: "top 88%", once: true } });
        if (!img) return;
        gsap.from(img, { scale: 1.3, duration: 1.8, delay, scrollTrigger: { trigger: fig, start: "top 88%", once: true } });
      });

      // 4) Parallaxe über data-speed (z. B. 0.2 = langsamer, -0.2 = Gegenrichtung)
      const k = window.innerWidth < 900 ? 0.35 : 1;
      $$("[data-speed]", main).forEach((el) => {
        const s = parseFloat(el.dataset.speed || "0") * k;
        gsap.fromTo(el, { y: () => -s * window.innerHeight * 0.5 }, { y: () => s * window.innerHeight * 0.5, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true } });
      });

      // 4b) Streifen läuft beim Scrollen seitwärts (z. B. Filmstreifen)
      $$("[data-hscroll]", main).forEach((el) => {
        gsap.fromTo(el, { x: () => window.innerWidth * 0.15 }, { x: () => -(el.scrollWidth - window.innerWidth * 0.85), ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: 0.5, invalidateOnRefresh: true } });
      });

      // 5) Zahlen zählen hoch (Originaltext bleibt in data-orig, auch bei Revert)
      const stops: (() => void)[] = [];
      $$(".fact strong, .bar-val, [data-count]", main).forEach((el) => {
        el.dataset.orig ??= el.textContent || "";
        if (/^\s*(19|20)\d\d\s*$/.test(el.dataset.orig)) return; // Jahreszahlen nicht hochzählen
        const m = el.dataset.orig.match(/^(\D*?)(\d+)(.*)$/s);
        if (!m) return;
        const [, pre, num, post] = m;
        const o = { v: 0 };
        let running = false;
        stops.push(() => { running = false; el.textContent = el.dataset.orig!; });
        claim(el);
        gsap.to(o, {
          v: +num, duration: 1.6, ease: "power2.out", delay: inView(el) ? d : 0,
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
          onUpdate: () => { if (running) el.textContent = `${pre}${Math.round(o.v)}${post}`; },
          onStart: () => { running = true; },
          onComplete: () => { el.textContent = el.dataset.orig!; },
        });
      });

      // 6) Wort für Wort aufhellen (Scroll-gebunden)
      $$("[data-words]", main).forEach((el) => {
        claim(el);
        const target = el.matches(".mix, p, h2, h3") ? el : el.querySelector(".mix, p, h2") || el;
        const s = SplitText.create(target, { type: "words", wordsClass: "sw" });
        gsap.fromTo(s.words, { opacity: 0.14 }, { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 50%", scrub: true } });
      });

      // 7) Unterschrift schreibt sich (Maske von links nach rechts)
      $$("[data-sign]", main).forEach((el) => {
        claim(el);
        if (inView(el)) gsap.fromTo(el, { "--sign": "-10%" }, { "--sign": "110%", ease: "power1.inOut", duration: 2.2, delay: d + 0.4 });
        else gsap.fromTo(el, { "--sign": "-10%" }, { "--sign": "110%", ease: "none", scrollTrigger: { trigger: el, start: "top 85%", end: "bottom 45%", scrub: 0.8 } });
      });

      // 8) SVG-Linien zeichnen sich
      $$("[data-draw]", main).forEach((svg) => {
        gsap.from(svg.querySelectorAll("path, line, polyline, circle.draw"), { drawSVG: 0, ease: "none", stagger: 0.08, scrollTrigger: { trigger: svg, start: "top 85%", end: svg.dataset.draw === "long" ? "bottom 20%" : "bottom 60%", scrub: 0.8 } });
      });

      // 9) Zeitstrahl: Linie füllt sich, Stationen werden aktiv
      $$(".journey", main).forEach((j) => {
        const steps = $$(".journey-step", j);
        steps.forEach(claim);
        gsap.set(steps, { opacity: 0.25 });
        ScrollTrigger.create({
          trigger: j, start: "top 75%", end: "bottom 55%", scrub: true,
          onUpdate: (self) => {
            j.style.setProperty("--p", self.progress.toFixed(3));
            steps.forEach((s, i) => {
              const on = self.progress >= (steps.length === 1 ? 0 : i / (steps.length - 1)) - 0.02;
              if (on !== s.classList.contains("on")) { s.classList.toggle("on", on); gsap.to(s, { opacity: on ? 1 : 0.25, duration: 0.5 }); }
            });
          },
        });
      });

      // 11) Chips fallen wie Sticker ein, Sedcard-Zeilen und Wochenbalken nacheinander
      $$(".chips", main).filter((el) => !own(el)).forEach((list) => {
        claim(list);
        gsap.from(list.children, { y: 50, opacity: 0, rotation: () => gsap.utils.random(-14, 14), duration: 1, stagger: 0.06, ease: "back.out(1.6)", scrollTrigger: { trigger: list, start: "top 88%", once: true } });
      });
      $$(".sedcard", main).forEach((dl) => {
        claim(dl);
        gsap.from(dl.children, { x: -24, opacity: 0, duration: 0.9, stagger: 0.07, delay: inView(dl) ? d : 0, scrollTrigger: { trigger: dl, start: "top 88%", once: true } });
      });
      $$(".week", main).forEach((w) => {
        gsap.from(w.children, { scaleY: 0, transformOrigin: "bottom", duration: 0.9, stagger: 0.1, ease: "back.out(1.4)", scrollTrigger: { trigger: w, start: "top 90%", once: true } });
      });

      const tickers: (() => void)[] = [];
      // 12) Laufbänder: Tempo und Richtung folgen der Scroll-Geschwindigkeit
      $$(".marquee-track", main).forEach((track) => {
        const loop = gsap.fromTo(track, { xPercent: 0 }, { xPercent: -50, ease: "none", duration: track.closest(".marquee--ghost") ? 50 : 38, repeat: -1 });
        let boost = 0;
        let dir = 1;
        ScrollTrigger.create({
          trigger: track, start: "top bottom", end: "bottom top",
          onUpdate: (self) => { boost = gsap.utils.clamp(-5, 5, self.getVelocity() / 300); dir = self.direction; },
        });
        loop.totalTime(loop.duration() * 200); // Puffer, damit auch Rückwärtslaufen endlos geht
        const tick = () => { loop.timeScale(dir * (1 + Math.abs(boost))); boost *= 0.92; };
        gsap.ticker.add(tick);
        tickers.push(tick);
      });

      // Positionen neu berechnen, sobald Bilder/Schriften fertig sind
      const refresh = () => ScrollTrigger.refresh();
      const t = window.setTimeout(refresh, 400);
      document.fonts?.ready.then(refresh);
      window.addEventListener("load", refresh, { once: true });
      return () => { window.clearTimeout(t); window.removeEventListener("load", refresh); tickers.forEach((f) => gsap.ticker.remove(f)); stops.forEach((f) => f()); };
    });

    return () => mm.revert();
  }, [pathname]);

  return null;
}
