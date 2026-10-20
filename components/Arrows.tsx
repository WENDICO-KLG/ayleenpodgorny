// Handgezeichnete Pfeile (identisch mit public/brand/icons/*.svg), inline für currentColor
const common = { fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export function ArrowCurl({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 80" {...common} aria-hidden="true">
      <path d="M8 58c14-2 26-10 30-22 3-9-3-17-10-13-8 5 0 20 14 24 18 6 40-2 62-22" />
      <path d="M92 18l12 7-12 9" />
    </svg>
  );
}

export function ArrowSwoosh({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 60" {...common} aria-hidden="true">
      <path d="M6 20c22 22 58 30 98 18" />
      <path d="M92 28l13 10-14 8" />
    </svg>
  );
}

export function ArrowLoop({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" {...common} aria-hidden="true">
      <path d="M86 10c-8 18-24 26-36 22-10-3-8-16 2-14 12 3 8 26-6 40-8 8-18 14-30 18" />
      <path d="M14 64l2 12 12-2" />
    </svg>
  );
}

export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="16" height="16" {...common} aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}
