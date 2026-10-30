import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Motion from "@/components/fx/Motion";
import PageTransition from "@/components/fx/PageTransition";
import RevealObserver from "@/components/fx/RevealObserver";
import SmoothScroll from "@/components/fx/SmoothScroll";
import { LINKEDIN, SITE_DESCRIPTION, SITE_NAME, SITE_URL, WENDICO, absUrl, imgUrl } from "@/lib/site";

// Schriften liegen im Projekt (app/fonts, lateinische Subsets aus Google Fonts, OFL):
// kein Abruf beim Build/Dev nötig, keine Anfrage an Google beim Besuch.
const serif = localFont({ src: [{ path: "./fonts/instrument-serif-400.woff2", weight: "400", style: "normal" }, { path: "./fonts/instrument-serif-400-italic.woff2", weight: "400", style: "italic" }], variable: "--nf-serif", display: "swap", fallback: ["Times New Roman", "serif"] });
const ui = localFont({ src: "./fonts/inter-variable.woff2", weight: "100 900", variable: "--nf-ui", display: "swap", fallback: ["system-ui", "sans-serif"] });
const script = localFont({ src: "./fonts/mrs-saint-delafield-400.woff2", weight: "400", variable: "--nf-script", display: "swap", preload: false, fallback: ["cursive"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} – Mediamatikerin, Social Media, Eiskunstlauf & Model aus Zürich`, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: "Wendico",
  keywords: ["Ayleen Podgorny", "Mediamatikerin Zürich", "Swisscom Lehre", "Head of Social Media", "Wendico", "Model Zürich", "Synchronized Skating", "Team Starlight Switzerland", "Eiskunstlauf Schweiz", "SRF Kids Reporterin", "Filmkids"],
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.png", apple: "/favicon.png" },
  openGraph: { type: "profile", locale: "de_CH", siteName: SITE_NAME, title: SITE_NAME, description: SITE_DESCRIPTION, images: [{ url: imgUrl("ed-wide", 1080), width: 1080, height: 608, alt: "Ayleen Podgorny" }] },
  twitter: { card: "summary_large_image", title: SITE_NAME, description: SITE_DESCRIPTION, images: [imgUrl("ed-wide", 1080)] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  other: { "geo.region": "CH-ZH", "geo.placename": "Zürich", "geo.position": "47.3769;8.5417", ICBM: "47.3769, 8.5417", "content-language": "de-CH" },
};

export const viewport: Viewport = { themeColor: "#6b1424", width: "device-width", initialScale: 1 };

// Strukturierte Daten (für Suchmaschinen und KI-Antwortmaschinen)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "de-CH",
      publisher: { "@id": `${SITE_URL}/#person` },
      creator: { "@type": "Organization", name: "Wendico", url: WENDICO },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE_NAME,
      givenName: "Ayleen",
      familyName: "Podgorny",
      url: SITE_URL,
      image: absUrl(imgUrl("bambus", 1080)),
      description: SITE_DESCRIPTION,
      jobTitle: ["Mediamatikerin in Ausbildung", "Head of Social Media", "Model"],
      address: { "@type": "PostalAddress", addressLocality: "Zürich", addressRegion: "ZH", addressCountry: "CH" },
      homeLocation: { "@type": "Place", name: "Zürich, Schweiz", geo: { "@type": "GeoCoordinates", latitude: 47.3769, longitude: 8.5417 } },
      worksFor: [
        { "@type": "Organization", name: "Swisscom", url: "https://www.swisscom.ch" },
        { "@type": "Organization", name: "Wendico", url: WENDICO },
      ],
      memberOf: { "@type": "SportsTeam", name: "Team Starlight Switzerland", sport: "Synchronized Skating" },
      alumniOf: [{ "@type": "Organization", name: "Filmkids" }],
      knowsAbout: ["Mediamatik", "Social Media", "Content Creation", "Fotografie", "Video", "Präsentation", "Podcast", "Synchronized Skating", "Modeln"],
      knowsLanguage: "de",
      sameAs: [LINKEDIN],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de-CH" className={`${serif.variable} ${ui.variable} ${script.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js');if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('gs')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a className="skip-link" href="#main">Zum Inhalt springen</a>
        <PageTransition />
        <SmoothScroll />
        <RevealObserver />
        <Motion />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
