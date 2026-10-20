// Zentrale Website-Konfiguration

export const SITE_NAME = "Ayleen Podgorny";
export const SITE_URL = "https://ayleenpodgorny.ch"; // vor dem Livegang anpassen
export const SITE_DESCRIPTION =
  "Ayleen Podgorny aus Zürich: Mediamatikerin in Ausbildung bei Swisscom, Head of Social Media bei Wendico, Synchronized Skaterin im Team Starlight Switzerland und Model.";

// Optional: persönliche E-Mail. Leer = Kontaktseite zeigt nur LinkedIn und Wendico.
export const CONTACT_EMAIL = "";
export const LINKEDIN = "https://www.linkedin.com/in/ayleen-podgorny-858a6b428/";
export const WENDICO = "https://wendico.ch";
export const WENDICO_KONTAKT = "https://wendico.ch/kontakt";

export const NAV = [
  { href: "/ueber-mich/", label: "Über mich" },
  { href: "/social-media/", label: "Social Media" },
  { href: "/leistungssport/", label: "Eiskunstlauf" },
  { href: "/model/", label: "Model" },
  { href: "/portfolio/", label: "Portfolio" },
] as const;

export const NAV_ARCHIVE = [
  { href: "/srf-kids/", label: "SRF Kids (2023–2024)" },
  { href: "/filmkids/", label: "Filmkids" },
] as const;

// Bilder: Basisnamen in public/img (Varianten -640/-1080/-1800.webp + .jpg, siehe tools/build-images.mjs)
export const IMG = {
  // Hero-Freisteller (echtes Foto, freigestellt)
  hero: "hero-portrait",
  // Echte Fotos
  bambus: "bambus",
  nachtFarbig: "nacht-farbig",
  nachtSw: "nacht-sw",
  nachtSwLachend: "nacht-sw-lachend",
  berge: "berge",
  praesentation: "praesentation",
  workshop: "workshop",
  srf: "srf",
  eisJubel: "eis-jubel",
  eisVier: "eis-vier",
  eisBewegung: "eis-bewegung",
  eisFormation: "eis-formation",
  eisTeam: "eis-team",
  eisPokal: "eis-pokal",
  eisMedaillen: "eis-medaillen",
  eisReise: "eis-reise",
  makeItClick: "make-it-click",
  visitenkarte: "visitenkarte",
  bingo: "bingo",
  // Editorial-Shooting
  edWide: "ed-wide",
  edKinn: "ed-kinn",
  edBlazer: "ed-blazer",
  edSitzend: "ed-sitzend",
  edKamera: "ed-kamera",
  edClose: "ed-close",
  // Textur
  beton: "beton",
} as const;
export type ImgName = (typeof IMG)[keyof typeof IMG];

export const BRAND = {
  monogramm: "/brand/monogramm-ap-bordeaux.png",
  monogrammWeiss: "/brand/monogramm-ap-weiss.png",
};

// Bildfokus (object-position), damit Gesichter bei jedem Zuschnitt sichtbar bleiben
export const FOCUS: Partial<Record<ImgName, string>> = {
  "ed-wide": "72% 22%",
  "ed-kinn": "50% 18%",
  "ed-blazer": "55% 16%",
  "ed-sitzend": "45% 30%",
  "ed-kamera": "50% 25%",
  "ed-close": "55% 32%",
  bambus: "45% 28%",
  "nacht-farbig": "48% 55%",
  "nacht-sw": "50% 50%",
  "nacht-sw-lachend": "45% 45%",
  berge: "45% 40%",
  praesentation: "50% 38%",
  workshop: "62% 28%",
  srf: "55% 35%",
  "eis-jubel": "55% 48%",
  "eis-vier": "50% 30%",
  "eis-bewegung": "50% 40%",
  "eis-formation": "50% 45%",
  "eis-team": "50% 55%",
  "eis-reise": "30% 72%",
};

// Angezeigte Breite des Hero-Freistellers (für srcset und Preload)
export const HERO_SIZES = "(max-width: 900px) 100vw, 50vw";

export const imgUrl = (name: ImgName, w?: number) => (w ? `/img/${name}-${w}.webp` : `/img/${name}.jpg`);
export const absUrl = (path: string) => `${SITE_URL}${path}`;
