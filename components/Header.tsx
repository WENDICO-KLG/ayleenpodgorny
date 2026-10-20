"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => setOpen(false), [pathname]);
  // Ganz oben auf der Startseite liegt der Header transparent über dem Hero
  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);
  const over = pathname === "/" && atTop && !open;
  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.classList.remove("nav-open"); };
  }, [open]);

  const active = (href: string) => (pathname === href || pathname + "/" === href ? "page" : undefined);

  return (
    <>
      <header className={`site-header${over ? " is-over" : ""}`}>
        <div className="container">
          <Link href="/" className="wordmark">Ayleen Podgorny</Link>
          <nav className="nav" aria-label="Hauptnavigation">
            <ul>{NAV.map((n) => <li key={n.href}><Link href={n.href} aria-current={active(n.href)}>{n.label}</Link></li>)}</ul>
          </nav>
          <Link href="/kontakt/" className="btn header-cta">Kontakt</Link>
          <button type="button" className="nav-toggle" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Menü schliessen" : "Menü öffnen"} onClick={() => setOpen((v) => !v)}>
            <span /><span /><span />
          </button>
        </div>
      </header>
      {open && (
        <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile Navigation">
          <ul>{NAV.map((n) => <li key={n.href}><Link href={n.href} aria-current={active(n.href)}>{n.label}</Link></li>)}</ul>
          <Link href="/kontakt/" className="btn">Kontakt</Link>
        </nav>
      )}
    </>
  );
}
