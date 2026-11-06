// Schlichte Linien-Icons (1.5px, currentColor)
const P = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;
type I = { className?: string };

export const IconCamera = ({ className }: I) => (<svg className={className} viewBox="0 0 24 24" {...P} aria-hidden="true"><path d="M3 8h4l2-3h6l2 3h4v11H3z" /><circle cx="12" cy="13" r="3.5" /></svg>);
export const IconFilm = ({ className }: I) => (<svg className={className} viewBox="0 0 24 24" {...P} aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="1" /><path d="M7 4v16M17 4v16M3 8h4M3 12h4M3 16h4M17 8h4M17 12h4M17 16h4" /></svg>);
export const IconMic = ({ className }: I) => (<svg className={className} viewBox="0 0 24 24" {...P} aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg>);
export const IconStage = ({ className }: I) => (<svg className={className} viewBox="0 0 24 24" {...P} aria-hidden="true"><path d="M4 20h16M6 20V9h12v11M9 9V5h6v4" /></svg>);
export const IconPen = ({ className }: I) => (<svg className={className} viewBox="0 0 24 24" {...P} aria-hidden="true"><path d="M4 20l4-1 11-11-3-3L5 16z" /><path d="M14 6l3 3" /></svg>);
export const IconLayers = ({ className }: I) => (<svg className={className} viewBox="0 0 24 24" {...P} aria-hidden="true"><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13l9 5 9-5" /></svg>);
export const IconPhone = ({ className }: I) => (<svg className={className} viewBox="0 0 24 24" {...P} aria-hidden="true"><rect x="7" y="2.5" width="10" height="19" rx="2" /><path d="M11 18h2" /></svg>);
export const IconIdea = ({ className }: I) => (<svg className={className} viewBox="0 0 24 24" {...P} aria-hidden="true"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z" /></svg>);
export const IconCalendar = ({ className }: I) => (<svg className={className} viewBox="0 0 24 24" {...P} aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="1" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>);
export const IconChart = ({ className }: I) => (<svg className={className} viewBox="0 0 24 24" {...P} aria-hidden="true"><path d="M4 20V4M4 20h16M8 16v-5M12 16V8M16 16v-3" /></svg>);
export const IconPlay = ({ className }: I) => (<svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>);
export const IconExternal = ({ className }: I) => (<svg className={className} viewBox="0 0 24 24" width="14" height="14" {...P} aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>);
export const IconSkate = ({ className }: I) => (<svg className={className} viewBox="0 0 24 24" {...P} aria-hidden="true"><path d="M6 4h4v8l7 2c1.5.4 2 1.3 2 2.5V17H6z" /><path d="M4 20h16" /></svg>);
export const IconMail = ({ className }: I) => (<svg className={className} viewBox="0 0 24 24" {...P} aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1.5" /><path d="M3.5 6l8.5 7 8.5-7" /></svg>);
export const IconLinkedIn = ({ className }: I) => (<svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11H3zM9.5 9.75h3.8v1.6h.06c.53-1 1.82-2.05 3.75-2.05 4 0 4.74 2.6 4.74 6v5.45h-4v-4.83c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.91h-4z" /></svg>);
export const IconGlobe = ({ className }: I) => (<svg className={className} viewBox="0 0 24 24" {...P} aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" /></svg>);
