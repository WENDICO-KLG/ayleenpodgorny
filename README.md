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

Die Schriften liegen in `app/fonts/` (lateinische Subsets von Instrument Serif, Inter (variabel, Fliesstext), Mrs Saint Delafield; alle OFL) und werden mit `next/font/local` eingebunden. Kein Abruf bei Google nötig, weder beim Build noch beim Besuch.

## Bilder

- Quellen: echte Fotos in `assets/images/originale/`, Editorial-Shooting in `assets/images/ai-png/08-editorial/` (KI-generiert)
- Hero (Startseite): zwei deckungsgleiche Ebenen aus dem Kamera-Original (5184 × 3456). `tools/freistellen.swift person-full` stellt Ayleen in voller Bildgrösse frei (Apple Vision, Maske kantenerhaltend hochgerechnet). `tools/hero-layers.mjs` erzeugt daraus `hero-foto.jpg` (Hintergrund hell, warm, leicht weich) und `hero-person.png` (Freisteller) im selben Ausschnitt. Im Browser liegt der Name zwischen den beiden Ebenen, so steht der Kopf vor den Buchstaben. Befehle stehen im Kopf von `hero-layers.mjs`. Neues Foto: dieselben Befehle mit dem neuen Bild ausführen und in `lib/site.ts` (`FOCUS`) den Bildfokus für beide Ebenen gleich setzen.
- `node tools/build-images.mjs` erzeugt `public/img/` (WebP 640/1080/1800 + JPEG-Fallback) und `lib/images.json`
- `components/Img.tsx` liefert `<picture>` mit `srcset`/`sizes`, Breite/Höhe (kein Layout-Springen) und Bildfokus aus `lib/site.ts` (`FOCUS`)

## Struktur

```
app/                  Seiten (App Router), globals.css, layout.tsx (Fonts, SEO, JSON-LD)
  page.tsx            Startseite
  model/  leistungssport/  portfolio/  kontakt/
                      (Portfolio enthält auch Social Media bei Wendico, SRF Kids und Filmkids)
  sitemap.ts robots.ts
components/           Header, Footer, Blocks (PageHero, CtaBand, Facts), Type (Mix/Serif/R), Graphics (BarChart, IceTraces), Icons,
                      ContactIcons (Kontaktwege als Icons), InquiryForm (Anfrage per mailto), Marquee, Arrows, Img
components/fx/        PageTransition (Bordeaux-Vorhang), SmoothScroll (Lenis + ScrollTrigger, Anker nach Seitenwechsel), RevealObserver,
                      Motion (seitenweite Effekte über Klassen/data-Attribute, s. u.), HeroHome, RoleDeck,
                      ZoomLines, FormationMorph, StoryPhone, SplitReveal, ModelGallery, HorizontalGallery
lib/gsap.ts           GSAP-Plugins, Eases, enterDelay() (wartet auf den Seitenvorhang)
lib/site.ts           Navigation, Bildpfade, Kontakt-E-Mail, Site-URL
public/               ausgelieferte Bilder, favicon, llms.txt
assets/               Originale, Master, Referenzen, Brand-Tokens (nicht ausgeliefert)
legacy/               bisherige "Coming soon"-Seite
tools/                build-images.mjs, freistellen.swift, hero-layers.mjs, hero-cutout.mjs (früherer Freisteller), sort-ai-downloads.sh
```

## Scroll-Effekte

`components/fx/Motion.tsx` animiert automatisch:

- `.mix`, `.serif-title`: Zeilen steigen aus einer Maske · `.page-hero`: Buchstaben, Bild öffnet sich, Scroll-Tiefe
- `.photo`, `.tab-media`, `.contact-media`: Clip-Reveal
- `.fact strong`, `.bar-val`: Zahlen zählen hoch (Jahreszahlen nicht) · `.chips`, `.sedcard`, `.week`
- `.marquee-track`: Tempo folgt der Scroll-Geschwindigkeit
- Datenattribute: `data-speed="0.2"` (Parallaxe), `data-words` (Wort für Wort), `data-sign` (Unterschrift schreibt sich), `data-draw` (SVG zeichnet sich), `data-hscroll` (Streifen läuft seitwärts), `data-own` (Bereich animiert sich selbst)

Gepinnte Szenen (RoleDeck, ZoomLines, FormationMorph, StoryPhone, SplitReveal) nutzen `position: sticky` in einer hohen Sektion; die Höhe gilt nur mit der Klasse `.gs` (JS aktiv, keine reduzierte Bewegung).

## SEO / GEO

- Metadaten pro Seite (Title, Description, Canonical, Open Graph, Twitter Card)
- `sitemap.xml`, `robots.txt`, `llms.txt` (für KI-Suchmaschinen)
- JSON-LD: `WebSite` + `Person` (global, mit E-Mail), pro Seite `WebPage` + `BreadcrumbList`, dazu `CreativeWork` und `PodcastEpisode` (Portfolio), `SportsTeam`, `ContactPage`
- Geo-Meta-Tags (`geo.region` CH-ZH, `geo.placename` Zürich, `geo.position`)

## Vor dem Livegang

- `SITE_URL` in `lib/site.ts` setzen. Kontakt-E-Mail (`CONTACT_EMAIL`, aktuell ayleen@podgorny.ch) prüfen: Das Anfrage-Formular öffnet damit das Mailprogramm (kein Server nötig).
- Frühere URLs `/ueber-mich/`, `/social-media/`, `/srf-kids/`, `/filmkids/` gibt es nicht mehr. Falls sie schon einmal online waren: beim Hoster auf `/` bzw. `/portfolio/` weiterleiten.
- Offene Freigaben aus [ayleen-personal-brand-jimdo.md](ayleen-personal-brand-jimdo.md) klären (Jahreszahlen, KI-Bilder, Gruppenfotos, Swisscom-Logo auf dem Bingo).
- Die Markdown-Dateien im Repo werden beim statischen Export nicht ausgeliefert.
