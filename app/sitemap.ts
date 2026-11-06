import type { MetadataRoute } from "next";
import { NAV, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...NAV.map((n) => ({ url: `${SITE_URL}${n.href}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${SITE_URL}/kontakt/`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];
}
