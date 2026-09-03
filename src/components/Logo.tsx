import { forwardRef, useId } from "react";

type Variant = "full" | "monogram" | "icon";
type Tone = "light" | "dark" | "gradient";

interface LogoProps {
  variant?: Variant;
  tone?: Tone;
  className?: string;
  title?: string;
}

/**
 * Hooria Azam — "The Aperture"
 *
 * A tall, softly-cut squircle acting as a light aperture. A single diagonal
 * shear splits the plate; inside the negative space an H column and an A apex
 * are knocked out of the light, reading as one continuous cut rather than two
 * letters stuck together. Minimal at 16px, sculptural at 96px.
 */
export const LogoMark = forwardRef<SVGSVGElement, { tone?: Tone; className?: string }>(
  ({ tone = "gradient", className }, ref) => {
    const uid = useId().replace(/:/g, "");
    const g = `ap-g-${uid}`;
    const soft = `ap-s-${uid}`;
    const cut = `ap-m-${uid}`;

    const plate =
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
          <linearGradient id={g} x1="8" y1="4" x2="56" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="48%" stopColor="#e879f9" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <linearGradient id={soft} x1="32" y1="0" x2="32" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          <mask id={cut} maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">
            {/* visible plate */}
            <rect x="6" y="2" width="52" height="60" rx="18" fill="#fff" />
            {/* H column — two stems + bar knocked out */}
            <rect x="19" y="17" width="5.4" height="30" rx="2.7" fill="#000" />
            <rect x="19" y="29.4" width="26" height="5.2" rx="2.6" fill="#000" />
            {/* A apex — diagonal rising out of the right stem */}
            <path
              d="M39.6 47 L45 17 L45 47 Z"
              fill="#000"
            />
            {/* the shear: one clean diagonal slicing the whole plate */}
            <path d="M6 54 L58 26 L58 30.5 L6 58.5 Z" fill="#000" />
          </mask>
        </defs>

        <g mask={`url(#${cut})`}>
          <rect x="6" y="2" width="52" height="60" rx="18" fill={plate} />
          {tone !== "light" && <rect x="6" y="2" width="52" height="60" rx="18" fill={`url(#${soft})`} />}
        </g>

        {/* aperture spark riding the shear line */}
        <circle cx="52.5" cy="28.6" r="2.6" fill={tone === "light" ? "#0a0a0f" : "#22d3ee"} />
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
      className={`inline-flex items-center gap-2.5 sm:gap-3 ${className ?? ""}`}
      aria-label={title ?? "Hooria Azam"}
    >
      <LogoMark tone={tone} className="h-7 w-7 sm:h-9 sm:w-9 shrink-0" />
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={`font-display text-[17px] sm:text-[23px] font-semibold tracking-[-0.01em] truncate ${wordColor}`}
        >
          Hooria Azam
        </span>
        <span className="mt-1 hidden sm:block text-[10px] tracking-[0.34em] uppercase text-[var(--muted-foreground)]">
          Design · Code · Craft
        </span>
      </span>
    </span>
  );
}
