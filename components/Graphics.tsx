import { R } from "@/components/Type";

// Balkendiagramm (Werte aus Ayleens Workshop-Umfrage), animiert beim Einblenden
export function BarChart({ title, sub, data, total }: { title: string; sub: string; data: { label: string; value: number }[]; total: number }) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <R as="figure" className="chart" style={{ margin: 0 }}>
      <figcaption>
        <p className="chart-title">{title}</p>
        <p className="chart-sub">{sub}</p>
      </figcaption>
      <div className="bars" role="list">
        {data.map((d, i) => (
          <div key={d.label} className={`bar${d.value === max ? " bar--top" : ""}`} role="listitem">
            <span className="bar-label">{d.label}</span>
            <span className="bar-track" aria-hidden="true">
              <span className="bar-fill" style={{ ["--v" as string]: d.value / total, ["--d" as string]: `${0.15 + i * 0.1}s` }} />
            </span>
            <span className="bar-val">{d.value} · {((d.value / total) * 100).toFixed(1).replace(".", ",")} %</span>
          </div>
        ))}
      </div>
    </R>
  );
}

// Wellenform für Podcast-Karten (deterministisch aus einem Startwert)
export function Wave({ seed = 1, bars = 42 }: { seed?: number; bars?: number }) {
  let s = seed * 9301 + 49297;
  const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  return (
    <div className="wave" aria-hidden="true">
      {Array.from({ length: bars }, (_, i) => {
        const env = Math.sin((i / bars) * Math.PI) * 0.6 + 0.4;
        return <i key={i} style={{ height: `${Math.max(12, Math.round(env * (0.35 + rnd() * 0.65) * 100))}%`, ["--i" as string]: i }} />;
      })}
    </div>
  );
}

// Kufenspuren auf dem Eis: Wellen mit Schlaufen (Trochoide mit wechselnder Schlaufengrösse),
// zeichnen sich beim Scrollen (data-draw).
function trace(seed: number, w: number, h: number) {
  const pts: string[] = [];
  const steps = 260;
  const loops = 7 + seed;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const th = t * loops * Math.PI * 2;
    const b = 26 * (0.25 + 0.95 * Math.sin(Math.PI * (t * (1.6 + seed * 0.3) + seed * 0.4)) ** 2);
    const x = t * w - b * Math.sin(th) * 0.9;
    const y = h / 2 + Math.sin(t * Math.PI * (2 + seed * 0.5) + seed) * h * 0.28 - b * Math.cos(th) * 0.8;
    pts.push(`${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return `M${pts.join("L")}`;
}

export function IceTraces({ className = "" }: { className?: string }) {
  return (
    <svg className={`ice-traces ${className}`.trim()} viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true" data-draw="long">
      {[0, 1, 2].map((s) => <path key={s} d={trace(s, 1200, 400)} fill="none" stroke="currentColor" strokeWidth={s === 0 ? 2 : 1.2} />)}
    </svg>
  );
}
