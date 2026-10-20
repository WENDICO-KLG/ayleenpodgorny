import images from "@/lib/images.json";
import { FOCUS, type ImgName } from "@/lib/site";

type Meta = { w: number; h: number; widths: number[]; alpha?: boolean };
const DATA = images as Record<string, Meta>;

// Responsives Bild: WebP in mehreren Breiten + JPEG/PNG-Fallback, Bildfokus aus lib/site.ts.
// sizes beschreibt die angezeigte Breite (Standard: volle Breite auf Mobile, halbe auf Desktop).
export default function Img({
  name, alt, sizes = "(max-width: 800px) 100vw, 50vw", priority = false, className, style,
}: { name: ImgName; alt: string; sizes?: string; priority?: boolean; className?: string; style?: React.CSSProperties }) {
  const meta = DATA[name];
  const srcSet = meta.widths.map((w) => `/img/${name}-${w}.webp ${w}w`).join(", ");
  const fallback = meta.alpha ? `/img/${name}.png` : `/img/${name}.jpg`;
  return (
    <picture>
      <source type="image/webp" srcSet={srcSet} sizes={sizes} />
      <img
        src={fallback}
        alt={alt}
        width={meta.w}
        height={meta.h}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        className={className}
        style={{ objectPosition: FOCUS[name] ?? "50% 30%", ...style }}
      />
    </picture>
  );
}
