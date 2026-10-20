# Ayleen Podgorny – Website-Kit (Editorial Personal Brand)

Alles, was für den Bau der neuen Brand-Website nach der Vorlage
[`assets/referenzen/design-vorlage-tiara-coaching.webp`](assets/referenzen/design-vorlage-tiara-coaching.webp) bereitliegt.
Inhalte und Fakten stammen aus [`ayleen-personal-brand-jimdo.md`](ayleen-personal-brand-jimdo.md); offene Freigaben stehen dort unter „Vor Veröffentlichung bestätigen“.

## Ordnerstruktur

```
assets/
  brand/
    tokens.css                 Farben, Schriften, Abstände als CSS-Variablen
    icons/arrow-*.svg          handgezeichnete Pfeile (currentColor)
  images/
    ai-png/                    ChatGPT-Neuerstellungen, PNG, für die Website gedacht
      01-portrait/  02-lifestyle/  03-medien-arbeit/  04-eiskunstlauf/
      05-grafiken/  06-mood/  07-texturen/
    originale/                 unveränderte Quelldateien (Kamera, Jimdo, VSCO)
      01-portrait/  02-lifestyle/  03-medien-arbeit/  04-eiskunstlauf/
      05-grafiken/  06-mood/
      99-privat-nicht-verwenden/   VSCO-Bilder mit Drittpersonen – nicht publizieren
    freigestellt/              transparente PNGs ohne Hintergrund (siehe unten)
      01-portrait/  02-lifestyle/  03-medien-arbeit/  04-eiskunstlauf/  05-grafiken/
      vorschau.html            alle Freisteller auf Schachbrett/Markenfarben ansehen
      jimdo-*.png              ältere Freisteller aus den Jimdo-Originalen
tools/
  freistellen.swift            Freistell-Tool (Apple Vision), Nutzung im Dateikopf
  referenzen/                  Designvorlage, Jimdo-Übersichten, Bildquellen-JSON
```

Dateinamen: `<motiv>-<format>.png`, z. B. `portrait-bambus-hoch-2x3.png`. Originale tragen die Quelle im Namen (`jimdo-07-…`, `vsco-05-…`, `…_IMG_0576`).

## Design-System (aus der Vorlage abgeleitet)

| Element | Vorlage | Ayleen |
|---|---|---|
| Primärfarbe | Bordeaux | `--color-bordeaux #7a1c2b` (wie bestehende `index.html`) |
| Flächen | Blush-Hero, Ivory-Body | `--color-blush #e9dccf`, `--color-ivory #fbf6ee`, `--color-cream #f6ece3` |
| Display-Schrift | hohe, schmale Didone in Versalien, „I'm“ kursiv | **Instrument Serif** (Google Fonts), uppercase, `line-height: .85` |
| Signatur | Handschrift „Hey, I'm Tiara“ | **Mrs Saint Delafield** |
| Fliesstext | Schreibmaschine | **Courier Prime** |
| Navigation/Buttons | kleine Versalien, Pill-Buttons | **Inter** 0.7rem, `letter-spacing .12em`, `border-radius: 999px` |
| Logo-Badge | runder Bordeaux-Kreis | `assets/images/freigestellt/05-grafiken/monogramm-ap-bordeaux.png` bzw. `monogramm-ap-weiss.png` auf Bordeaux (AP-Monogramm aus der Visitenkarte, transparent) |

Alle Werte stehen in [`assets/brand/tokens.css`](assets/brand/tokens.css).

## Seitenaufbau und Bildzuordnung

### 1 · Navigation
Wortmarke „AYLEEN PODGORNY“ (Instrument Serif) links · Über mich · Projekte · Medien · Eiskunstlauf · Kontakt · Pill-Button „Kontakt“.

### 2 · Hero (Blush-Fläche)
- Riesige Headline **HI, *I'M* AYLEEN**, das Portrait steht davor und überdeckt die Buchstaben teilweise.
- Bild: `assets/images/freigestellt/01-portrait/hero-studio-blush.png` (transparent) – mit `position: absolute` vor die Headline legen, Unterkante bündig mit dem Sektionsende.
- Alternative ohne Freisteller: `assets/images/ai-png/01-portrait/portrait-bambus-quer-3x2.png` als Vollbild.
- Kleine Labels mit Pfeilen (`icons/arrow-*.svg`):
  - links: „ANGEHENDE MEDIAMATIKERIN BEI SWISSCOM“
  - rechts: „EHEMALIGE SRF KIDS-REPORTERIN“
  - unten links: „SEIT 2016 AUF DEM EIS“ *(Jahreszahl vorher bestätigen)*
- Button „Meine Projekte“.
- Monogramm-Badge oben links überlappend (wie das Squarespace-Logo in der Vorlage).

### 3 · Intro (Ivory-Fläche)
- Signatur: „Hey, ich bin Ayleen“
- Titel: **MEDIAMATIKERIN, STORYTELLERIN UND TEAMPLAYERIN**
- Linke Spalte (Mono, Versalien): „Seit ich klein bin, fotografiere, filme und präsentiere ich – heute mache ich daraus meinen Beruf.“
- Rechte Spalte: Lehre bei Swisscom, Filmkids, SRF Kids, Synchroneiskunstlauf (Texte aus der Recherche).
- Polaroid oben rechts (weisser Rand, leicht gedreht, `--shadow-polaroid`): `assets/images/ai-png/01-portrait/nacht-laterne-sw-lachend-2x3.png`
- Grosses Bild links: `assets/images/ai-png/01-portrait/nacht-laterne-farbig-2x3.png` oder `assets/images/ai-png/02-lifestyle/berge-fotografiert-mit-handy-2x3.png` (Streifenshirt passt farblich perfekt zum Bordeaux)
- Button „Mehr über mich“.

### 4 · Laufband „MEINE WERTE“
Endlos-Marquee in `--fs-marquee`, Bordeaux auf Ivory. Die Marquee-Logik existiert bereits in `index.html` und kann übernommen werden.

### 5 · Werte (Fotohintergrund + 4 Bordeaux-Kacheln)
- Hintergrund: `assets/images/ai-png/07-texturen/beton-schatten-3x2.png` (`background-size: cover`)
- Kacheln (Titel Instrument Serif, Text Courier Prime, cream auf Bordeaux):
  1. **KREATIVITÄT** – Fotografieren, Filmen, Gestalten: Ideen sichtbar machen.
  2. **DISZIPLIN** – vier bis fünf Trainings pro Woche auf dem Eis.
  3. **TEAMGEIST** – im Synchroneiskunstlauf gewinnt nur das ganze Team.
  4. **NEUGIER** – vom SRF-Studio bis zur Swisscom-Lehre: immer etwas Neues lernen.
  *(Werte aus „Ehrgeiz, Disziplin, Verantwortung im Team“ der Recherche abgeleitet – mit Ayleen abstimmen.)*

### 6 · Projekte
- Social-Media-Workshop „Make it Click!“: `assets/images/ai-png/03-medien-arbeit/social-media-workshop-vortrag-3x4.png`, `assets/images/ai-png/03-medien-arbeit/praesentation-am-laptop-2x3.png`, Titelgrafik bereits im Bordeaux-Look: `assets/images/ai-png/05-grafiken/make-it-click-bordeaux-16x9.png`
- Visitenkarte / eigenes Logo: `originale/05-grafiken/jimdo-08-visitenkarte-monogramm.png`
- Kennenlern-Bingo: `originale/05-grafiken/jimdo-10-kennenlern-bingo-swisscom.png` (enthält Swisscom-Logo → Logonutzung klären)

### 7 · Medien / SRF Kids
- `assets/images/ai-png/03-medien-arbeit/srf-kids-schreibend-3x2.png`
- Links zu den drei SRF-Beiträgen (siehe Recherche).

### 8 · Eiskunstlauf
- Galerie/Slider aus `assets/images/ai-png/04-eiskunstlauf/` (Fallback: `originale/04-eiskunstlauf/`).
- Headline-Idee aus der alten Seite: **PASSION** / „SINCE 2016“.

### 9 · Lifestyle-Streifen (optional)
Horizontale Bildleiste mit `assets/images/ai-png/02-lifestyle/` (Boutique, Kleiderständer, Altstadt) und `assets/images/ai-png/06-mood/` (Meer, Palmen, Teller-Wand, Bar bei Nacht, gedeckter Tisch, Buch) – gibt der Seite den persönlichen VSCO-Look. Das Selfie `assets/images/ai-png/01-portrait/selfie-zimmer-16x9.png` passt als „Behind the scenes“-Kachel.

### 10 · Kontakt / Footer
Bordeaux-Fläche, Signatur „Ich freue mich, dich kennenzulernen!“, Kontakt-Button, Monogramm, Social Links.

## Freisteller (transparente PNGs)

Erstellt aus den KI-PNGs mit `tools/freistellen.swift` (Apple Vision, lokal). Kanten leicht nach innen gezogen gegen helle Ränder; auf Schachbrett, Blush und Bordeaux geprüft.

| Datei | Einsatz |
|---|---|
| `01-portrait/hero-studio-blush.png` | **Hero** vor „HI, I'M AYLEEN“ |
| `01-portrait/portrait-bambus-hoch.png` | Alternative Hero / Über mich |
| `01-portrait/nacht-laterne-farbig.png`, `nacht-laterne-sw.png`, `nacht-laterne-sw-lachend.png` | Ganzkörper für Intro, Kontakt, Polaroid-Ersatz |
| `01-portrait/selfie-zimmer.png` | Behind-the-scenes-Kachel |
| `02-lifestyle/berge-fotografiert-mit-handy.png` | Content-Creation-Teaser (unten weich ausgeblendet) |
| `02-lifestyle/kleiderstaender-rueckenansicht.png` | Lifestyle-Akzent |
| `03-medien-arbeit/praesentation-am-laptop.png` | Projekte / Präsentieren (inkl. Rednerpult) |
| `03-medien-arbeit/social-media-workshop-vortrag-oberkoerper.png` | Workshop-Projekt (ab Hüfte; kleines Original, nur bis ca. 400 px Breite nutzen) |
| `04-eiskunstlauf/medaillen-haende.png` | Eiskunstlauf-Sektion |
| `05-grafiken/monogramm-ap-bordeaux.png` / `monogramm-ap-weiss.png` | Logo-Badge, Favicon-Basis, Footer |
| `05-grafiken/make-it-click-bordeaux.png` | Projekt-Titel Workshop |

Nicht freigestellt: SRF Kids schreibend (Tisch und Sessel lassen sich nicht sauber trennen, wirkt mit rotem Studio besser), Pokal (kein Motiv erkannt), Mood-Bilder und Gruppenbilder.

## Hinweise zu den KI-Bildern

- Erstellt mit ChatGPT (Bildgenerierung) am 20.10.2026, je ein eigener Chat pro Bild. Auflösung: 1024 × 1536 (hoch), 1536 × 1024 (quer) bzw. 1254 × 1254 (quadratisch). Das ist das Maximum von ChatGPT.
- Für Retina-Hero-Bilder in voller Breite ist das knapp. Bei Bedarf mit einem Upscaler (z. B. Topaz, Magnific, Photoshop „Super Resolution“) auf 2× hochrechnen.
- Gesichter wurden möglichst originalgetreu gehalten, KI verändert Details aber minimal. **Ayleen (bzw. Erziehungsberechtigte, da minderjährig) sollte die KI-Versionen vor Veröffentlichung freigeben.**
- Logos, Marken und Schilder wurden in den KI-Versionen bewusst entfernt.
- Für Web-Auslieferung die PNGs in WebP/AVIF konvertieren (PNG bleibt Master).

## Nicht verwenden / nicht neu erstellt

- `originale/99-privat-nicht-verwenden/`: VSCO-Bilder mit Freund/Freundinnen bzw. unklarer Person. Ohne Einverständnis der Abgebildeten nicht publizieren.
- Eiskunstlauf-Teambilder (KI-Versionen und Originale) zeigen weitere Minderjährige → Einverständnis des Teams bzw. der Eltern klären.
- Bewusst **nicht** mit ChatGPT neu erstellt: Jimdo 03 (Ausstellung, zwei Personen von hinten), 10 (Bingo mit Swisscom-Logo, besser als HTML nachbauen), 11/12 (SRF Kids mit anderen Kindern), 16 (Team hinter der Bande), VSCO 11 (Sneaker-Store mit Markenprodukten). Die Originale liegen sortiert bereit.
- **Noch manuell herunterzuladen:** Die KI-Versionen von Jimdo 14 (Team in der Kathedrale), 18 (Team auf dem Eis) und 19 (vier Läuferinnen) sind in ChatGPT fertig, der automatische Download wurde aber blockiert. Bei Bedarf manuell speichern als `assets/images/ai-png/04-eiskunstlauf/team-kathedrale-2x3.png`, `team-auf-eis-2x3.png` und `vier-laeuferinnen-3x2.png`.
- `assets/images/ai-png/01-portrait/selfie-zimmer-16x9.png`: Die Halskette zeigt wie im Original ein Marken-Monogramm. Bei Bedarf retuschieren.

## Quellen

- Kamera-Fotos (Canon, Sept./Okt. 2026) und Screenshots aus dem Projektordner
- Jimdo-Website (21 Bilder, siehe `assets/referenzen/jimdo-bildquellen.json`)
- VSCO-Galerie `vsco.co/ayruscala` (14 Bilder, abgerufen am 20.10.2026 in Originalgrösse 2048 px)
