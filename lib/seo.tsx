import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, absUrl, imgUrl, type ImgName } from "@/lib/site";

// Metadaten pro Seite: Titel, Beschreibung, Canonical, Open-Graph-Bild
export function pageMeta({ title, description, path, image }: { title: string; description: string; path: string; image: ImgName }): Metadata {
  const img = imgUrl(image, 1080);
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", locale: "de_CH", siteName: SITE_NAME, url: path, title: `${title} | ${SITE_NAME}`, description, images: [{ url: img, alt: `${title} – ${SITE_NAME}` }] },
    twitter: { card: "summary_large_image", title: `${title} | ${SITE_NAME}`, description, images: [img] },
  };
}

// Breadcrumb + WebPage als JSON-LD
export function pageJsonLd({ name, path, description, extra = [] }: { name: string; path: string; description: string; extra?: object[] }) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}${path}#webpage`,
        url: `${SITE_URL}${path}`,
        name: `${name} | ${SITE_NAME}`,
        description,
        inLanguage: "de-CH",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Start", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name, item: `${SITE_URL}${path}` },
        ],
      },
      ...extra,
    ],
  };
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export { absUrl };
