// Endlos-Laufband (Tiara "MY VALUES" bzw. Midnight-Ghost-Schriftzug)
export default function Marquee({ text, ghost = false }: { text: string; ghost?: boolean }) {
  return (
    <div className={`marquee${ghost ? " marquee--ghost" : ""}`} aria-hidden={ghost ? true : undefined} aria-label={ghost ? undefined : text}>
      <div className="marquee-track">
        {Array.from({ length: 6 }, (_, i) => <span key={i} aria-hidden="true">{text}</span>)}
      </div>
    </div>
  );
}
