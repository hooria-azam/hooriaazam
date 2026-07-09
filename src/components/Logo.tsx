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
 * Hooria Azam — bespoke monogram
 * Concept: two parallel stems of "H" morph into the ascending diagonal of "A",
 * capped by a luxury signature dot. Timeless, geometric, editorial.
 */
export const LogoMark = forwardRef<SVGSVGElement, { tone?: Tone; className?: string }>(
  ({ tone = "gradient", className }, ref) => {
    const gid = "ha-luxe-grad";
    const gid2 = "ha-luxe-metal";
    const stroke =
      tone === "light" ? "#0a0a0f" : tone === "dark" ? "#ffffff" : `url(#${gid})`;
    const accent = tone === "light" ? "#7c3aed" : `url(#${gid2})`;
    return (
      <svg
        ref={ref}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden
      >
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="50%" stopColor="#e879f9" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <linearGradient id={gid2} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#e879f9" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
        </defs>
        {/* Left stem (H) */}
        <path
          d="M12 8 L12 56"
          stroke={stroke}
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Right stem morphing into A's right leg — slight inward taper at top */}
        <path
          d="M52 56 L52 22 L36 8"
          stroke={stroke}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Diagonal — the H crossbar that also serves as the A's rising spine */}
        <path
          d="M12 40 L52 22"
          stroke={stroke}
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* A's inner crossbar */}
        <path
          d="M28 44 L46 44"
          stroke={stroke}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
        />
        {/* Luxury signature dot */}
        <circle cx="56" cy="56" r="3" fill={accent} />
      </svg>
    );
  },
);
LogoMark.displayName = "LogoMark";

export function Logo({ variant = "full", tone = "gradient", className, title }: LogoProps) {
  if (variant === "icon") {
    return <LogoMark tone={tone} className={className} />;
  }
  const textColor =
    tone === "light" ? "text-[#0a0a0f]" : tone === "dark" ? "text-white" : "text-white";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`} aria-label={title ?? "Hooria Azam"}>
      <LogoMark tone={tone} className="h-8 w-8 shrink-0" />
      {variant === "full" ? (
        <span className="flex flex-col leading-none">
          <span className={`font-display text-[15px] sm:text-base font-semibold tracking-[0.14em] uppercase ${textColor}`}>
            Hooria<span className="text-[var(--neon)]">·</span>Azam
          </span>
          <span className="mt-1 text-[9px] tracking-[0.32em] uppercase text-[var(--muted-foreground)]">
            Frontend Studio
          </span>
        </span>
      ) : (
        <span className={`font-display text-lg font-semibold tracking-[0.18em] uppercase ${textColor}`}>
          HA<span className="text-[var(--neon)]">.</span>
        </span>
      )}
    </span>
  );
}
