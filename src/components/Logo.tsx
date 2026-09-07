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
 * Hooria Azam — "Eclipse"
 *
 * A cinematic mark: a solid eclipse disc crossed by a crescent of light and a
 * single anamorphic flare streak. The negative-space crescent silently forms an
 * "H" gate on the left and an "A" apex on the right. Reads as a lens, a moon,
 * and a projector gate at once — unmistakable at 16px, luxurious at 400px.
 */
export const LogoMark = forwardRef<SVGSVGElement, { tone?: Tone; className?: string }>(
  ({ tone = "gradient", className }, ref) => {
    const id = "ha-eclipse";
    const light = tone === "light" ? "#0a0a0f" : `url(#${id}-g)`;
    const disc = tone === "light" ? "rgba(10,10,15,0.10)" : "rgba(255,255,255,0.06)";
    const flare = tone === "light" ? "#0a0a0f" : "#22d3ee";

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
          <linearGradient id={`${id}-g`} x1="14" y1="8" x2="52" y2="58" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="52%" stopColor="#e879f9" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <linearGradient id={`${id}-f`} x1="2" y1="32" x2="62" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
            <stop offset="45%" stopColor="#22d3ee" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#e879f9" stopOpacity="0" />
          </linearGradient>
          <clipPath id={`${id}-c`}>
            <circle cx="32" cy="32" r="23" />
          </clipPath>
        </defs>

        {/* Eclipse body */}
        <circle cx="32" cy="32" r="23" fill={disc} />
        <circle cx="32" cy="32" r="23" stroke={light} strokeWidth="1.4" strokeOpacity="0.5" />

        {/* Crescent of light — the eclipse rim */}
        <g clipPath={`url(#${id}-c)`}>
          <path
            d="M32 9a23 23 0 0 1 0 46A23 23 0 0 0 32 9Z"
            fill={light}
            opacity="0.95"
          />
          {/* Gate bars: negative-space H on the shadow side */}
          <path d="M20 22 V42" stroke={light} strokeWidth="3.2" strokeLinecap="round" />
          <path d="M20 32 H32" stroke={light} strokeWidth="2.2" strokeLinecap="round" />
          {/* A apex cutting through the lit side */}
          <path d="M38 44 L44 20 L50 44" stroke="#06040f" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" opacity={tone === "light" ? 0.9 : 1} />
        </g>

        {/* Anamorphic flare streak */}
        <path d="M3 32 H61" stroke={`url(#${id}-f)`} strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="48.5" cy="17.5" r="2.6" fill={flare} />
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
