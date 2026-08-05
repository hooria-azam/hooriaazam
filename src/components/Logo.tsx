import { forwardRef } from "react";

type Variant = "full" | "monogram" | "icon";
type Tone = "light" | "dark" | "gradient";

interface LogoProps {
  variant?: Variant;
  tone?: Tone;
  className?: string;
  title?: string;
}

/**
 * Hooria Azam — "The Prism"
 *
 * Concept: light entering a prism and leaving as a spectrum — design (light),
 * code (structure), craft (refraction). The mark is a hexagonal prism drawn in
 * one continuous hairline, with an H/A ligature carved inside it: two pillars
 * (the H) bridged by a rising diagonal that resolves into the apex of an A.
 * A single refracted beam exits the right facet — the "output".
 */
export const LogoMark = forwardRef<SVGSVGElement, { tone?: Tone; className?: string }>(
  ({ tone = "gradient", className }, ref) => {
    const g = "ha-prism-grad";
    const gBeam = "ha-prism-beam";
    const stroke =
      tone === "light" ? "#0a0a0f" : tone === "dark" ? "#ffffff" : `url(#${g})`;

    return (
      <svg
        ref={ref}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden
        fill="none"
      >
        <defs>
          <linearGradient id={g} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="52%" stopColor="#e879f9" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <linearGradient id={gBeam} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#e879f9" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Prism silhouette — hexagon, hairline */}
        <path
          d="M32 4.5 L54.5 17.5 V46.5 L32 59.5 L9.5 46.5 V17.5 Z"
          stroke={stroke}
          strokeWidth="2"
          strokeLinejoin="round"
          opacity="0.85"
        />

        {/* H/A ligature — two pillars + rising diagonal resolving into an apex */}
        <path
          d="M22 44 V22 M42 44 V22 M22 33.5 H42 M22 44 L32 20 L42 44"
          stroke={stroke}
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Refracted beam exiting the right facet */}
        <path d="M46 32 H62" stroke={`url(#${gBeam})`} strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="32" cy="20" r="2.1" fill="#e879f9" />
      </svg>
    );
  },
);
LogoMark.displayName = "LogoMark";

export function Logo({ variant = "full", tone = "gradient", className, title }: LogoProps) {
  if (variant === "icon") {
    return <LogoMark tone={tone} className={className} />;
  }

  const wordColor = tone === "light" ? "text-[#0a0a0f]" : "text-white";

  if (variant === "monogram") {
    return (
      <span
        className={`inline-flex items-center gap-2.5 ${className ?? ""}`}
        aria-label={title ?? "Hooria Azam"}
      >
        <LogoMark tone={tone} className="h-8 w-8 shrink-0" />
        <span className={`font-display text-xl leading-none tracking-tight font-semibold ${wordColor}`}>
          Hooria<span className="text-[var(--neon)]">.</span>
        </span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-3 ${className ?? ""}`}
      aria-label={title ?? "Hooria Azam"}
    >
      <LogoMark tone={tone} className="h-9 w-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[21px] sm:text-[23px] font-semibold tracking-[-0.01em] ${wordColor}`}
        >
          Hooria Azam
        </span>
        <span className="mt-1.5 text-[10px] tracking-[0.34em] uppercase text-[var(--muted-foreground)]">
          Design · Code · Craft
        </span>
      </span>
    </span>
  );
}
