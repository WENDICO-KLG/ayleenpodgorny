# Ayleen Podgorny – Personal-Brand-Website

Next.js 16 (App Router, TypeScript) mit serverseitigem Passwortschutz. Design nach den Vorlagen «Tiara Coaching» (helles Editorial) und «Midnight Maven» (Bordeaux, Mischtitel, Cream-Panels). Weiches Scrollen mit `lenis`, Scroll-Effekte mit GSAP (ScrollTrigger, SplitText, DrawSVG). Alle Effekte respektieren `prefers-reduced-motion`; ohne JS bleibt alles sichtbar.

## Entwickeln

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm start          # Produktionsserver
npm run typecheck
```

Lege die Zugangsdaten in `.env.local` ab. Der Loginname steht in `SITE_USERNAME`, das Passwort in `SITE_PASSWORD`; die Datei wird nicht eingecheckt. Der Serverbetrieb ist erforderlich, ein statischer Export ist mit Passwortschutz nicht möglich. Für den Livebetrieb muss HTTPS aktiviert sein.

## Schriften

Die Schriften liegen in `app/fonts/` (lateinische Subsets von Instrument Serif, Oswald, Inter (variabel, Fliesstext), Mrs Saint Delafield; alle OFL) und werden mit `next/font/local` eingebunden. Kein Abruf bei Google nötig, weder beim Build noch beim Besuch.

## Bilder

- Quellen: echte Fotos in `assets/images/originale/`, Editorial-Shooting in `assets/images/ai-png/08-editorial/` (KI-generiert)
- Hero-Freisteller `assets/images/freigestellt/hero-portrait.png`: aus dem Kamera-Original (5184 × 3456) mit Apple Vision Personen-Segmentierung freigestellt (`tools/freistellen.swift person`, Maske kantenerhaltend hochgerechnet), danach mit `tools/hero-cutout.mjs` bereinigt (grüner Saum, Lichtsaum, Schärfe, Grading). Befehle stehen im Kopf von `hero-cutout.mjs`.
- `node tools/build-images.mjs` erzeugt `public/img/` (WebP 640/1080/1800 + JPEG-Fallback) und `lib/images.json`
- `components/Img.tsx` liefert `<picture>` mit `srcset`/`sizes`, Breite/Höhe (kein Layout-Springen) und Bildfokus aus `lib/site.ts` (`FOCUS`)

## Struktur

```
app/                  Seiten (App Router), globals.css, layout.tsx (Fonts, SEO, JSON-LD)
  page.tsx            Startseite
  ueber-mich/  portfolio/  srf-kids/  filmkids/  leistungssport/  kontakt/
  sitemap.ts robots.ts
components/           Header, Footer, Blocks (PageHero, CtaBand, Facts), Type (Mix/Serif/R), Graphics (BarChart, Wave, IceTraces), Icons, Marquee, Arrows, Img
components/fx/        PageTransition (Bordeaux-Vorhang), SmoothScroll (Lenis + ScrollTrigger), RevealObserver,
                      Motion (seitenweite Effekte über Klassen/data-Attribute, s. u.), HeroHome, RoleDeck,
                      ZoomLines, HoverList, FormationMorph, StoryPhone, SplitReveal, ModelGallery, HorizontalGallery
lib/gsap.ts           GSAP-Plugins, Eases, enterDelay() (wartet auf den Seitenvorhang)
lib/site.ts           Navigation, Bildpfade, Kontakt-E-Mail, Site-URL
public/               ausgelieferte Bilder, favicon, llms.txt
assets/               Originale, Master, Referenzen, Brand-Tokens (nicht ausgeliefert)
legacy/               bisherige "Coming soon"-Seite
tools/                build-images.mjs, freistellen.swift, hero-cutout.mjs, sort-ai-downloads.sh
```

## Scroll-Effekte

`components/fx/Motion.tsx` animiert automatisch:

- `.mix`, `.serif-title`: Zeilen steigen aus einer Maske · `.page-hero`: Buchstaben, Bild öffnet sich, Scroll-Tiefe
- `.photo`, `.journey-img`, `.tab-media`, `.contact-media`: Clip-Reveal + leichte Parallaxe
- `.fact strong`, `.bar-val`: Zahlen zählen hoch · `.journey`: Linie füllt sich · `.tabs`: Karten treten zurück · `.chips`, `.sedcard`, `.week`
- `.marquee-track`: Tempo folgt der Scroll-Geschwindigkeit
- Datenattribute: `data-speed="0.2"` (Parallaxe), `data-words` (Wort für Wort), `data-sign` (Unterschrift schreibt sich), `data-draw` (SVG zeichnet sich), `data-hscroll` (Streifen läuft seitwärts), `data-own` (Bereich animiert sich selbst)

Gepinnte Szenen (RoleDeck, ZoomLines, FormationMorph, StoryPhone, SplitReveal) nutzen `position: sticky` in einer hohen Sektion; die Höhe gilt nur mit der Klasse `.gs` (JS aktiv, keine reduzierte Bewegung).

## SEO / GEO

- Metadaten pro Seite (Title, Description, Canonical, Open Graph, Twitter Card)
- `sitemap.xml`, `robots.txt`, `llms.txt` (für KI-Suchmaschinen)
- JSON-LD: `WebSite` + `Person` (global), pro Seite `WebPage` + `BreadcrumbList`, dazu `ProfilePage`, `CreativeWork` (Portfolio), `PodcastEpisode` (SRF), `SportsTeam`, `ContactPage`
- Geo-Meta-Tags (`geo.region` CH-ZH, `geo.placename` Zürich, `geo.position`)

## Vor dem Livegang

- `SITE_URL` in `lib/site.ts` setzen. Optional `CONTACT_EMAIL`: Die Kontaktseite zeigt dann zusätzlich zu LinkedIn und Wendico eine E-Mail-Adresse.
- Offene Freigaben aus [ayleen-personal-brand-jimdo.md](ayleen-personal-brand-jimdo.md) klären (Jahreszahlen, KI-Bilder, Gruppenfotos, Swisscom-Logo auf dem Bingo).
- Die Markdown-Dateien im Repo werden beim statischen Export nicht ausgeliefert.
