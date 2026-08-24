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
 * Hooria Azam — "Aperture HA"
 *
 * Concept: a precision aperture (two mirrored blades cut on a 60° angle)
 * frames a monogram where the H's right stem doubles as the A's spine, and
 * the A's apex is implied by the diagonal blade. Reads as a lens, a diamond
 * facet, and an H/A ligature at once. Geometric, quiet, luxurious.
 */
export const LogoMark = forwardRef<SVGSVGElement, { tone?: Tone; className?: string }>(
  ({ tone = "gradient", className }, ref) => {
    const g = "ha-aperture-grad";
    const stroke =
      tone === "light" ? "#0a0a0f" : tone === "dark" ? "#ffffff" : `url(#${g})`;
    const accent = tone === "light" ? "#0a0a0f" : "#22d3ee";

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
          <linearGradient id={g} x1="10" y1="6" x2="54" y2="58" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="52%" stopColor="#e879f9" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>

        {/* Aperture blades — two mirrored angular cuts forming a faceted frame */}
        <path
          d="M32 5 L57 19.5 V44.5"
          stroke={stroke}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.55"
        />
        <path
          d="M32 59 L7 44.5 V19.5"
          stroke={stroke}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.55"
        />

        {/* H left stem — solid, structural */}
        <path d="M22 20 V44" stroke={stroke} strokeWidth="4.4" strokeLinecap="round" />
        {/* Shared stem — H right / A spine */}
        <path d="M42 20 V44" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />
        {/* Crossbar — the ligature */}
        <path d="M22 32.5 H42" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />
        {/* A apex — implied diagonal rising off the shared stem */}
        <path d="M42 20 L33.5 44" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" opacity="0.85" />

        {/* Facet point */}
        <circle cx="32" cy="5" r="2.4" fill={accent} />
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
