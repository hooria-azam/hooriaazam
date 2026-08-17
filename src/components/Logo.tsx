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
 * Hooria Azam — "Orbit H"
 *
 * Concept: the H is drawn with two deliberately different weights — a solid
 * stem (code: structural, engineered) and a hairline stem (design: light,
 * considered) — joined by a single crossbar. An open orbit arc sweeps around
 * them and terminates in a signature dot, the mark of a finished piece.
 * No frames, no arrows, no clip-art: one idea, one gesture.
 */
export const LogoMark = forwardRef<SVGSVGElement, { tone?: Tone; className?: string }>(
  ({ tone = "gradient", className }, ref) => {
    const g = "ha-orbit-grad";
    const stroke =
      tone === "light" ? "#0a0a0f" : tone === "dark" ? "#ffffff" : `url(#${g})`;
    const dot = tone === "light" ? "#0a0a0f" : "#e879f9";

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
          <linearGradient id={g} x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="50%" stopColor="#e879f9" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>

        {/* Orbit — open arc, sweeping clockwise from lower-left to upper-right */}
        <path
          d="M15.5 47.8 A21 21 0 1 1 50.5 44.2"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.62"
        />

        {/* H — solid stem (engineering) */}
        <path d="M23 19 V45" stroke={stroke} strokeWidth="4.6" strokeLinecap="round" />
        {/* H — crossbar */}
        <path d="M23 32 H41" stroke={stroke} strokeWidth="2.6" strokeLinecap="round" />
        {/* H — hairline stem (design), extended as a subtle ascender */}
        <path d="M41 16 V45" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />

        {/* Signature dot at the orbit terminus */}
        <circle cx="50.5" cy="44.2" r="3" fill={dot} />
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
