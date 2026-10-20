import type { CSSProperties, ElementType, ReactNode } from "react";

// *Text* in Sternchen wird kursiv (Serifen-Akzent), auch über mehrere Wörter.
export function rich(text: string): ReactNode[] {
  return text.split(/(\*[^*]+\*)/g).filter(Boolean).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? <em key={i}>{part.slice(1, -1)}</em> : part,
  );
}

// Mischtitel im Midnight-Stil: schmale fette Grotesk + kursive Serife
export function Mix({ text, as: Tag = "h2", className = "", size }: { text: string; as?: ElementType; className?: string; size?: "sm" | "xl" }) {
  return <Tag className={`mix${size ? ` mix--${size}` : ""} ${className}`.trim()}>{rich(text)}</Tag>;
}

// Serifen-Titel im Tiara-Stil
export function Serif({ text, as: Tag = "h2", className = "", style }: { text: string; as?: ElementType; className?: string; style?: CSSProperties }) {
  return <Tag className={`serif-title ${className}`.trim()} style={style}>{rich(text)}</Tag>;
}

// Wrapper, der beim Scrollen einblendet
export function R({ children, as: Tag = "div", className = "", delay = 0, ...rest }: { children: ReactNode; as?: ElementType; className?: string; delay?: number; [k: string]: unknown }) {
  return (
    <Tag className={`reveal ${className}`.trim()} style={delay ? ({ "--d": `${delay}s` } as CSSProperties) : undefined} {...rest}>
      {children}
    </Tag>
  );
}
