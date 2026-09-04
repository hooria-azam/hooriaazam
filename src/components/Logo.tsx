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
 * Hooria Azam — "The Facet"
 *
 * A cut-gem diamond frame (precision, craft) whose inner facets resolve into
 * an A apex sitting on an H crossbar. One continuous geometric idea: rotate
 * the square, cut it, and the initials appear in the negative space.
 */
export const LogoMark = forwardRef<SVGSVGElement, { tone?: Tone; className?: string }>(
  ({ tone = "gradient", className }, ref) => {
    const g = "ha-facet-grad";
    const gs = "ha-facet-soft";
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
          <linearGradient id={g} x1="10" y1="6" x2="54" y2="58" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="52%" stopColor="#e879f9" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <linearGradient id={gs} x1="20" y1="10" x2="44" y2="54" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#e879f9" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Gem frame — rotated square with a cut top-right corner */}
        <path
          d="M32 5 L54 24 L46 52 L18 52 L10 24 Z"
          stroke={stroke}
          strokeWidth="2.2"
          strokeLinejoin="round"
        />

        {/* Inner facet wash */}
        <path d="M32 5 L54 24 L32 30 Z" fill={tone === "light" ? "none" : `url(#${gs})`} />

        {/* A — apex strokes rising from the base */}
        <path d="M22.5 44 L32 19 L41.5 44" stroke={stroke} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
        {/* H / A crossbar */}
        <path d="M26.4 35.2 H37.6" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />

        {/* Signature facet point */}
        <circle cx="54" cy="24" r="3" fill={dot} />
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
