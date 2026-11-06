# Änderungswünsche Website (Feedback Ayleen)

## Feedback auf Hochdeutsch

- **Seitenstruktur:** Startseite, Model, eine Seite für Eislaufen, Portfolio, Kontakt.
- **Buchungen:** Man kann mich nicht für Präsentationen usw. buchen. Mach vielleicht einfach eine Seite „Kontakt & Anfrage“, dort kann man mir dann schreiben.
- **Einheitlicher:** Statt der Kontakte lieber Icons machen und dann einen Link, über den man auf die Website kommt, damit es einheitlicher aussieht.
- **Schriftarten:** maximal 3 verschiedene: Titel, normale Beschreibungen, etwas Spezielles.
- **Zeitstrahl entfernen:** Eiskunstlauf, „vor der Kamera“ usw.
- **Social Media:** Das Social-Media-Material usw. ins Portfolio einbauen.
- **Bilder:** noch ersetzen.
- **Startseite:** Das Bild ersetzen, sobald ich meine neuen Bilder habe.
- **Startseite:** Das Weisse im Hintergrund entfernen. Inspiration folgt.

## Antworten von Ayleen (6. November 2026)

- **Über mich / Steckbrief:** ganz weg.
- **SRF Kids und Filmkids:** ins Portfolio übernehmen, zu den echten Seiten verlinken, Bilder durch Icons ersetzen.
- **Kontakt & Anfrage:** mailto an ayleen@podgorny.ch.
- **Unklare Stelle:** „eine Seite für Eislaufen“ stimmt.

## To-do-Liste

### 1. Seitenstruktur auf 5 Seiten reduzieren ✅

Neue Navigation: **Start (Wortmarke) · Model · Eiskunstlauf · Portfolio · Kontakt**

- [x] `NAV` in `lib/site.ts` angepasst. „Über mich“ und „Social Media“ sind keine eigenen Menüpunkte mehr.
- [x] Seite **Über mich** inklusive Steckbrief entfernt.
- [x] Seite **Social Media** ins Portfolio verschoben und entfernt.
- [x] **SRF Kids** und **Filmkids** als Projekte ins Portfolio übernommen, mit Icons statt Bildern. SRF Kids verlinkt die drei Podcasts auf srf.ch, Filmkids verlinkt filmkids.ch. Die eigenen Seiten sind entfernt.
- [x] Links aufgeräumt: Hero-Profiltext und Rollen-Kartendeck zeigen auf `/portfolio/` bzw. `/portfolio/#social-media`. Footer, Sitemap und `llms.txt` sind angepasst.
- [ ] Alte URLs: `/ueber-mich/`, `/social-media/`, `/srf-kids/`, `/filmkids/` liefern jetzt 404. Falls sie schon einmal öffentlich waren: beim Hoster weiterleiten.

### 2. Kein „Buchen“ mehr, stattdessen „Kontakt & Anfrage“ ✅

- [x] Angebotsliste „Wofür du mich anfragen kannst“ von der Startseite entfernt.
- [x] CTA-Texte neutral: überall „Kontakt & Anfrage“ mit „Du hast eine Frage oder eine Idee? Schreib mir.“
- [x] Kontaktseite heisst **„Kontakt & Anfrage“**. Ein kurzes Formular (Thema, Name, Nachricht) öffnet das Mailprogramm mit einer fertigen Nachricht an ayleen@podgorny.ch. Kein externer Dienst nötig.

### 3. Kontakt mit Icons, einheitlich ✅

- [x] Kontaktwege als einheitliche Liste mit Icons: E-Mail, LinkedIn, Wendico (`components/ContactIcons.tsx`).
- [x] Dieselben Icons im Footer.

### 4. Social Media ins Portfolio ✅

- [x] Portfolio enthält jetzt den Bereich „Head of Social Media bei Wendico“ (Anker `#social-media`), das Story-Handy und die Workshop-Umfrage.
- [x] Keine Doppelung: „Make it Click!“ bleibt als Projekt, die Umfrage verweist darauf.

### 5. Zeitstrahle entfernen ✅

- [x] Eiskunstlauf: „Vom ersten Schritt bis zum Kader“ entfernt.
- [x] Über mich und Filmkids: fallen mit den Seiten weg.
- [x] Ungenutzte Styles und die Zeitstrahl-Logik in `Motion.tsx` entfernt.

### 6. Maximal 3 Schriftarten ✅ (am 30. Oktober umgesetzt)

| Rolle | Schrift |
|---|---|
| Titel | **Instrument Serif** |
| Beschreibungen | **Inter** |
| Speziell | **Mrs Saint Delafield** (Schreibschrift) |

### 7. Bilder (später, sobald neue Bilder da sind)

- [ ] Hero-Bild auf der Startseite ersetzen (`assets/images/freigestellt/hero-portrait.png` → neu freistellen mit `tools/freistellen.swift person` + `tools/hero-cutout.mjs`)
- [ ] Übrige Bilder ersetzen (Quellen in `assets/images/`, danach `node tools/build-images.mjs`)

### 8. Startseite: Hero nach der Inspiration (Bild „Serina.C“) ✅ (mit Platzhalter-Foto)

Was die Vorlage ausmacht:

- **Foto als Hintergrund:** Ein ganzes Foto (Person in ihrer Umgebung) füllt den Hero, statt Freisteller auf einfarbigem Grund. Pinselstriche, Rauch und Korn fallen weg (das „Weisse im Hintergrund“).
- **Rahmen:** Das Foto liegt in einer Karte mit abgerundeten Ecken auf einem dunklen, warmen Rahmen (bei uns Weinrot/Bordeaux statt Braun).
- **Name:** Riesiger Name in einer hohen, schmalen Serifenschrift über die ganze Breite oben, in der Rahmenfarbe. Der Kopf der Person steht vor den Buchstaben (Tiefen-Effekt: Foto hinten, Schrift, Freisteller derselben Person vorne).
- **Claim:** Unten links ein kurzer Satz in Grossbuchstaben (Serifenschrift) mit einem kursiven Wort, darunter ein kleiner Pill-Button.
- **Badge:** rundes Badge mit Monogramm, das rechts über den Rahmen ragt.

To-do:

- [x] Hero neu aufgebaut: Foto-Karte mit runden Ecken auf weinrotem Rahmen, Name «AYLEEN.P» gross in Instrument Serif, Kopf vor der Schrift, Claim «Vom Eis *vor* die Kamera», Pill-Button «Kontakt & Anfrage», Badge mit AP-Monogramm am rechten Rand.
- [x] Pinselstriche, dunkle Scheibe, Korn, Schreibschrift und Profiltext entfernt.
- [x] Platzhalter-Foto: Bambus-Portrait (Kamera-Original), Hintergrund hell und warm gegradet, Ayleen unverändert. Ebenen mit `tools/hero-layers.mjs`.
- [ ] Ayleens Wunsch-Foto einsetzen, sobald es da ist: **Foto mit Hintergrund**, Kopf im oberen Drittel, links Platz für den Claim, mind. 3000 px breit. Ein heller, ruhiger Hintergrund (z. B. weisse Wand) wirkt am besten.

### 9. Startseite: weitere Anpassungen ✅

- [x] «Was ich mache»: Betonwand ersetzt durch hellen Cremeton.
- [x] Polaroid «Zürich» im Intro entfernt.
- [x] «Ausgewählte Arbeiten»: Bildstreifen ersetzt durch nummerierten Projekt-Index mit Icons (verlinkt ins Portfolio).

## Noch offen

1. **Hero-Foto:** Aktuell Platzhalter (Bambus-Portrait). Sobald Ayleens neues Foto da ist, wird es mit `tools/hero-layers.mjs` eingesetzt.
2. **Weitere Kanäle:** Aktuell E-Mail, LinkedIn und Wendico. Soll Instagram oder ein anderer Kanal dazu?
