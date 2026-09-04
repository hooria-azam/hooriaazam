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
 * Hooria Azam — "The Aperture Stem"
 *
 * Concept: a monoline aperture (lens) opened at the top-right, wrapped around
 * two parallel stems bridged by a rising diagonal — the H and the A read as a
 * single continuous ligature. The open arc suggests a lens focusing; the offset
 * spark marks the point of light. Distinct at 16px, luxurious at 400px.
 */
export const LogoMark = forwardRef<SVGSVGElement, { tone?: Tone; className?: string }>(
  ({ tone = "gradient", className }, ref) => {
    const g = "ha-ap-grad";
    const stroke =
      tone === "light" ? "#0a0a0f" : tone === "dark" ? "#ffffff" : `url(#${g})`;
    const spark = tone === "light" ? "#0a0a0f" : "#22d3ee";

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
          <linearGradient id={g} x1="8" y1="10" x2="56" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="55%" stopColor="#e879f9" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>

        {/* Aperture arc — open at the top-right */}
        <path
          d="M46.5 12.8 A24 24 0 1 0 55 30"
          stroke={stroke}
          strokeWidth="2.6"
          strokeLinecap="round"
        />

        {/* Left stem */}
        <path d="M23 20 V44" stroke={stroke} strokeWidth="3.6" strokeLinecap="round" />
        {/* Right stem */}
        <path d="M41 20 V44" stroke={stroke} strokeWidth="3.6" strokeLinecap="round" />
        {/* Rising diagonal — the A apex tying both stems */}
        <path d="M23 44 L41 20" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
        {/* Shared crossbar */}
        <path d="M23 33 H41" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />

        {/* Focal spark at the aperture opening */}
        <circle cx="53.4" cy="16.2" r="3.1" fill={spark} />
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
          Hooria<span className="text-[var(--cyan)]">.</span>
        </span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-2.5 sm:gap-3 ${className ?? ""}`}
      aria-label={title ?? "Hooria Azam"}
    >
      <LogoMark tone={tone} className="h-8 w-8 sm:h-9 sm:w-9 shrink-0" />
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={`font-display text-[18px] sm:text-[23px] font-semibold tracking-[-0.01em] ${wordColor}`}
        >
          Hooria Azam
        </span>
        <span className="mt-1 sm:mt-1.5 hidden sm:block text-[10px] tracking-[0.34em] uppercase text-[var(--muted-foreground)]">
          Design · Code · Craft
        </span>
      </span>
    </span>
  );
}
