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
 * Hooria Azam — Editorial Seal
 *
 * Concept: a luxury magazine masthead. A serif italic "H" set inside a rotated
 * square seal with a hairline internal frame and a signature dot at the corner.
 * The full wordmark pairs a large Katros italic "Hooria" with a tiny, wide-tracked
 * "· AZAM ·" line — like a couture atelier logotype.
 */
export const LogoMark = forwardRef<SVGSVGElement, { tone?: Tone; className?: string }>(
  ({ tone = "gradient", className }, ref) => {
    const gid = "ha-seal-grad";
    const gidText = "ha-seal-text";
    const gidStroke = "ha-seal-stroke";
    const outerFill =
      tone === "light"
        ? "#0a0a0f"
        : tone === "dark"
          ? "#ffffff"
          : `url(#${gid})`;
    const textFill =
      tone === "light" ? "#f5f0e6" : tone === "dark" ? "#0a0a0f" : `url(#${gidText})`;

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
            <stop offset="55%" stopColor="#e879f9" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <linearGradient id={gidText} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f5e6ff" />
          </linearGradient>
          <linearGradient id={gidStroke} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        {/* Rotated diamond seal */}
        <g transform="rotate(45 32 32)">
          {/* Outer filled seal */}
          <rect x="10" y="10" width="44" height="44" rx="6" fill={outerFill} />
          {/* Inner hairline frame */}
          <rect
            x="14.5"
            y="14.5"
            width="35"
            height="35"
            rx="3"
            fill="none"
            stroke={`url(#${gidStroke})`}
            strokeWidth="0.8"
            opacity="0.7"
          />
        </g>

        {/* Serif italic "H" — set upright inside the diamond */}
        <text
          x="32"
          y="41.5"
          textAnchor="middle"
          fontFamily='"Fraunces", "Times New Roman", serif'
          fontStyle="italic"
          fontWeight="500"
          fontSize="30"
          fill={textFill}
          letterSpacing="-0.5"
        >
          H
        </text>

        {/* Signature dot — luxury corner accent */}
        <circle cx="52" cy="52" r="2.4" fill="#e879f9" />
        <circle cx="52" cy="52" r="4.4" fill="none" stroke="#e879f9" strokeOpacity="0.35" strokeWidth="0.6" />
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
  const dotColor = "text-[var(--neon)]";

  if (variant === "monogram") {
    return (
      <span
        className={`inline-flex items-center gap-2 ${className ?? ""}`}
        aria-label={title ?? "Hooria Azam"}
      >
        <LogoMark tone={tone} className="h-8 w-8 shrink-0" />
        <span
          className={`font-display italic text-lg leading-none tracking-tight ${wordColor}`}
        >
          Hooria<span className={dotColor}>.</span>
        </span>
      </span>
    );
  }

  // full — editorial masthead
  return (
    <span
      className={`inline-flex items-center gap-3 ${className ?? ""}`}
      aria-label={title ?? "Hooria Azam"}
    >
      <LogoMark tone={tone} className="h-9 w-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display italic text-[19px] sm:text-[21px] font-medium tracking-[-0.01em] ${wordColor}`}
          style={{ letterSpacing: "-0.01em" }}
        >
          Hooria<span className={dotColor}>.</span>
        </span>
        <span className="mt-1.5 flex items-center gap-1.5 text-[8.5px] tracking-[0.4em] uppercase text-[var(--muted-foreground)]">
          <span className="h-px w-3 bg-[var(--neon)]/60" />
          Azam · Studio
          <span className="h-px w-3 bg-[var(--neon)]/60" />
        </span>
      </span>
    </span>
  );
}
