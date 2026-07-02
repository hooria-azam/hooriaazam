import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "@/hooks/use-lenis";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hooria Azam — Frontend & WordPress Developer" },
      { name: "description", content: "5+ years crafting cinematic, premium digital experiences. Frontend, WordPress, UI/UX." },
      { property: "og:title", content: "Hooria Azam — Frontend & WordPress Developer" },
      { property: "og:description", content: "Creating digital experiences worth remembering." },
    ],
  }),
  component: Portfolio,
});

/* ───────── Cursor ───────── */
function CursorFX() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 200, damping: 25 });
  const ringY = useSpring(y, { stiffness: 200, damping: 25 });
  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);
  return (
    <>
      <motion.div aria-hidden style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-[var(--neon)] shadow-[0_0_18px_var(--neon),0_0_40px_var(--primary)]" />
      <motion.div aria-hidden style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden md:block -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-[rgba(192,132,252,0.4)]" />
    </>
  );
}

/* ───────── Nav ───────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links: [string, string][] = [
    ["About", "#about"], ["Services", "#services"], ["Skills", "#skills"],
    ["Work", "#projects"], ["Pricing", "#pricing"], ["Contact", "#contact"],
  ];
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
      className={`fixed left-1/2 top-3 sm:top-5 z-50 -translate-x-1/2 transition-all duration-500 w-[min(94vw,1200px)] ${scrolled ? "max-w-[1100px]" : ""}`}
    >
      <div className="glass-strong flex items-center justify-between rounded-full pl-5 pr-3 py-2.5 sm:pl-6 sm:pr-4 sm:py-3 gap-3">
        <a href="#hero" className="font-display text-base sm:text-lg font-bold tracking-wide shrink-0">
          <span className="text-gradient">HA</span><span className="text-[var(--neon)]">.</span>
        </a>
        <ul className="hidden lg:flex items-center gap-7 min-w-0">
          {links.map(([label, href]) => (
            <li key={href}>
              <a href={href} className="text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--neon)]">{label}</a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 shrink-0">
          <a href="#contact" className="hidden sm:inline-flex btn-primary !py-2 !px-5 text-sm">Hire Me</a>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen(v => !v)}
            className="lg:hidden grid place-items-center h-10 w-10 rounded-full border border-[var(--border)] bg-white/[0.04]"
          >
            <span className="block h-0.5 w-4 bg-current relative before:absolute before:-top-1.5 before:left-0 before:h-0.5 before:w-4 before:bg-current after:absolute after:top-1.5 after:left-0 after:h-0.5 after:w-4 after:bg-current" />
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden mt-2 glass-strong rounded-3xl p-4">
          <ul className="grid gap-1">
            {links.map(([label, href]) => (
              <li key={href}>
                <a href={href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-sm text-[var(--muted-foreground)] hover:bg-white/5 hover:text-[var(--neon)]">{label}</a>
              </li>
            ))}
            <li><a href="#contact" onClick={() => setOpen(false)} className="btn-primary w-full mt-2 !py-3 text-sm">Hire Me</a></li>
          </ul>
        </div>
      )}
    </motion.nav>
  );
}

/* ───────── Section helpers ───────── */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.2, 0.8, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 inline-flex items-center gap-3 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[var(--muted-foreground)]">
      <span className="h-px w-8 bg-[var(--neon)]" />
      {children}
    </div>
  );
}

/* ───────── HERO — radar spotlight centerpiece (contained, reference-driven) ───────── */
/*
 * Layout invariants (do not violate):
 *  - Section height locked to ~97vh, overflow clipped so nothing escapes.
 *  - Radar node anchored at (50%, 62%). All skill chips sit on a ring around it
 *    using polar coordinates (angle, radius). Radius is clamped in vmin so cards
 *    always stay inside the hero on every viewport.
 *  - Spotlight beam rotation: atan2(dy, dx) in CSS space (y grows down).
 *    Conic-gradient beam base points UP at rotate=0deg, so rotate = deg + 90
 *    so the bright sector points TOWARD the hovered card.
 */

// 11 skills — evenly distributed on a ring around the radar core.
const HERO_SKILLS_RAW = [
  { t: "HTML5",                i: "🅗" },
  { t: "CSS3",                 i: "🅒" },
  { t: "JavaScript",           i: "🅙" },
  { t: "Front-End Developer",  i: "⚡" },
  { t: "WordPress",            i: "◆" },
  { t: "Elementor Pro",        i: "◇" },
  { t: "WooCommerce",          i: "🛒" },
  { t: "Figma to Website",     i: "✦" },
  { t: "Bootstrap",            i: "▤" },
  { t: "Responsive Design",    i: "▢" },
  { t: "UI/UX Design",         i: "✺" },
];

const HERO_SKILLS = HERO_SKILLS_RAW.map((s, i, arr) => {
  // Start at the top-right and go clockwise; skip the top so the headline stays clean.
  const a = -Math.PI / 2 + Math.PI / 6 + (i / arr.length) * Math.PI * 2;
  return { ...s, ang: a };
});

function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Cursor tracking (normalized -1..1) — drives the center arrow + bg parallax.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 80, damping: 20 });
  const smy = useSpring(my, { stiffness: 80, damping: 20 });

  // Spotlight beam angle (radians). Idle = gentle scan; hover = lock to card.
  const angle = useMotionValue(Math.PI / 2);
  const sAngle = useSpring(angle, { stiffness: 55, damping: 18, mass: 1 });
  const [lockedAngle, setLockedAngle] = useState<number | null>(null);

  // Center arrow — smoothly rotates toward the cursor.
  const arrowRot = useSpring(0, { stiffness: 90, damping: 20 });

  const pxBg = useTransform(smx, (v) => v * -22);
  const pyBg = useTransform(smy, (v) => v * -22);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 700], [1, 0]);
  const heroY = useTransform(scrollY, [0, 700], [0, 80]);

  // Idle scan + hover lock loop.
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const start = last;
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (lockedAngle === null) {
        const t = (now - start) / 1000;
        const target = Math.PI / 2 + Math.sin(t * 0.4) * 0.7;
        angle.set(angle.get() + (target - angle.get()) * Math.min(1, dt * 1.6));
      } else {
        const cur = angle.get();
        let diff = lockedAngle - cur;
        diff = ((diff + Math.PI) % (Math.PI * 2)) - Math.PI;
        angle.set(cur + diff * Math.min(1, dt * 5));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [angle, lockedAngle]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      const cx = Math.max(-1, Math.min(1, nx));
      const cy = Math.max(-1, Math.min(1, ny));
      mx.set(cx);
      my.set(cy);
      // Arrow points toward cursor relative to radar center (~50%, 62%).
      const dx = (e.clientX - r.left) - r.width * 0.5;
      const dy = (e.clientY - r.top) - r.height * 0.62;
      const deg = (Math.atan2(dy, dx) * 180) / Math.PI + 90; // svg arrow points up at 0
      arrowRot.set(deg);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, arrowRot]);

  // FIX: bright sector of conic beam points UP at rotate=0.
  // atan=π/2 (down in CSS y) must rotate 180deg.
  const spotRotate = useTransform(sAngle, (a) => `${(a * 180) / Math.PI + 90}deg`);

  return (
    <motion.section
      ref={sectionRef}
      id="hero"
      style={{ opacity: heroOpacity, y: heroY }}
      className="relative isolate w-full overflow-hidden"
    >
      <div className="relative w-full" style={{ height: "97vh", minHeight: 680 }}>
        {/* Layer 1 — luxury background wash */}
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse at 20% 10%, #1a0b2e 0%, transparent 55%), radial-gradient(ellipse at 80% 90%, #2a0a3a 0%, transparent 55%), linear-gradient(180deg, #06040f 0%, #020207 100%)",
          }}
        />

        {/* Layer 2 — drifting ambient orbs (clipped to hero) */}
        <motion.div className="absolute inset-0" style={{ x: pxBg, y: pyBg }} aria-hidden>
          <div className="hero-orb" style={{ top: "8%", left: "10%", width: 380, height: 380, background: "rgba(124,58,237,0.38)" }} />
          <div className="hero-orb" style={{ top: "60%", left: "75%", width: 460, height: 460, background: "rgba(232,121,249,0.26)", animationDelay: "-6s" }} />
          <div className="hero-orb" style={{ top: "80%", left: "5%", width: 320, height: 320, background: "rgba(34,211,238,0.16)", animationDelay: "-10s" }} />
        </motion.div>

        <Particles count={28} />

        {/* RADAR SYSTEM — anchored at (50%, 62%). Everything sized in vmin to stay inside. */}
        <div
          className="absolute pointer-events-none z-[3]"
          style={{ left: "50%", top: "62%", transform: "translate(-50%, -50%)" }}
          aria-hidden
        >
          {/* Animated radar rings — sized in vmin so they never exceed viewport */}
          {[0, 1.2, 2.4, 3.6, 4.8, 6].map((d) => (
            <div
              key={d}
              className="radar-ring"
              style={{
                width: "min(80vmin, 900px)", height: "min(80vmin, 900px)",
                marginLeft: "calc(min(80vmin, 900px) / -2)",
                marginTop: "calc(min(80vmin, 900px) / -2)",
                animationDelay: `-${d}s`,
              }}
            />
          ))}

          {/* Concentric guide rings */}
          {[16, 26, 36, 46, 58].map((s) => (
            <div
              key={s}
              className="absolute left-1/2 top-1/2 rounded-full border border-[rgba(192,132,252,0.10)]"
              style={{ width: `${s}vmin`, height: `${s}vmin`, marginLeft: `-${s / 2}vmin`, marginTop: `-${s / 2}vmin` }}
            />
          ))}

          {/* SPOTLIGHT BEAM — layered, feathered cone */}
          <motion.div
            className="absolute left-1/2 top-1/2"
            style={{
              width: "min(120vmin, 1400px)",
              height: "min(120vmin, 1400px)",
              marginLeft: "calc(min(120vmin, 1400px) / -2)",
              marginTop: "calc(min(120vmin, 1400px) / -2)",
              rotate: spotRotate,
            }}
          >
            {/* Widest, softest outer wash */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "conic-gradient(from 240deg, transparent 0deg, rgba(232,121,249,0.06) 40deg, rgba(232,121,249,0.14) 60deg, rgba(232,121,249,0.22) 75deg, rgba(244,114,182,0.28) 90deg, rgba(232,121,249,0.22) 105deg, rgba(232,121,249,0.14) 120deg, rgba(232,121,249,0.06) 140deg, transparent 180deg, transparent 360deg)",
                filter: "blur(42px)",
                maskImage: "radial-gradient(circle at center, black 4%, black 55%, transparent 82%)",
              }}
            />
            {/* Mid cone */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "conic-gradient(from 255deg, transparent 0deg, transparent 55deg, rgba(232,121,249,0.18) 75deg, rgba(255,182,234,0.36) 90deg, rgba(232,121,249,0.18) 105deg, transparent 125deg, transparent 360deg)",
                filter: "blur(22px)",
                maskImage: "radial-gradient(circle at center, black 4%, black 48%, transparent 74%)",
              }}
            />
            {/* Inner soft core beam (no hard edge) */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "conic-gradient(from 268deg, transparent 0deg, transparent 82deg, rgba(255,210,243,0.42) 90deg, transparent 98deg, transparent 360deg)",
                filter: "blur(12px)",
                maskImage: "radial-gradient(circle at center, black 3%, black 42%, transparent 68%)",
              }}
            />
          </motion.div>

          {/* Central glow halo */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: 220, height: 220,
              background: "radial-gradient(circle, rgba(232,121,249,0.55), rgba(124,58,237,0.18) 50%, transparent 75%)",
              filter: "blur(10px)",
            }}
          />

          {/* RADAR NODE with cursor-following arrow */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div
              className="relative grid place-items-center h-20 w-20 sm:h-24 sm:w-24 rounded-full"
              style={{
                background: "radial-gradient(circle at 30% 30%, #1a1424, #07050d)",
                border: "1px solid rgba(232,121,249,0.4)",
                boxShadow:
                  "0 0 0 1px rgba(192,132,252,0.15), 0 0 40px rgba(232,121,249,0.55), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              <motion.svg
                viewBox="0 0 24 24"
                className="h-9 w-9 sm:h-10 sm:w-10 text-[var(--neon)]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ rotate: arrowRot }}
              >
                {/* Unique navigator glyph — a stylized compass needle */}
                <circle cx="12" cy="12" r="9" opacity="0.35" />
                <path d="M12 3.5 L15.2 13 L12 11.2 L8.8 13 Z" fill="currentColor" opacity="0.95" />
                <path d="M12 20.5 L9.5 14.5 L12 15.6 L14.5 14.5 Z" opacity="0.55" />
                <circle cx="12" cy="12" r="1.1" fill="currentColor" />
              </motion.svg>
            </div>
          </div>
        </div>

        {/* Readability vignette + bottom fade */}
        <div
          className="absolute inset-0 z-[4] pointer-events-none"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse at 50% 22%, rgba(2,2,7,0.72) 0%, rgba(2,2,7,0.28) 38%, transparent 72%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 z-[4] h-32 bg-gradient-to-b from-transparent to-[var(--background)] pointer-events-none" aria-hidden />

        {/* FLOATING SKILL CARDS — polar ring, clamped inside hero (desktop) */}
        <div className="absolute inset-0 z-[6] hidden lg:block pointer-events-none">
          {HERO_SKILLS.map((s, i) => {
            // Elliptical ring — wider than tall so cards don't clash with headline.
            const RX = 34; // vmin
            const RY = 26; // vmin
            const dx = `calc(${Math.cos(s.ang)} * min(${RX}vmin, 380px))`;
            const dy = `calc(${Math.sin(s.ang)} * min(${RY}vmin, 300px))`;
            // Actual visual angle of the card center from radar origin (ellipse-adjusted).
            // The beam rotation must track THIS, not the raw parametric angle.
            const displayAng = Math.atan2(Math.sin(s.ang) * RY, Math.cos(s.ang) * RX);
            return (
              <FloatingSkill
                key={s.t}
                label={s.t}
                icon={s.i}
                delay={i * 0.06}
                style={{
                  left: "50%",
                  top: "62%",
                  transform: `translate(calc(-50% + ${dx}), calc(-50% + ${dy}))`,
                }}
                onEnter={() => setLockedAngle(displayAng)}
                onLeave={() => setLockedAngle(null)}
              />
            );
          })}
        </div>

        {/* CONTENT — headline stack, upper section */}
        <div className="container-x relative z-[7] flex flex-col items-center text-center pt-24 sm:pt-28 pb-6 pointer-events-none">
          <div className="pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative inline-block"
            >
              {/* Orbiting particles around the badge */}
              <span aria-hidden className="absolute inset-0 pointer-events-none">
                <span className="badge-orbit" style={{ width: "160%", height: "160%", left: "-30%", top: "-30%", animationDuration: "9s" }}>
                  <span className="badge-orbit-dot" style={{ background: "#c084fc", boxShadow: "0 0 10px #c084fc" }} />
                </span>
                <span className="badge-orbit" style={{ width: "180%", height: "140%", left: "-40%", top: "-20%", animationDuration: "13s", animationDirection: "reverse" }}>
                  <span className="badge-orbit-dot" style={{ background: "#e879f9", boxShadow: "0 0 12px #e879f9" }} />
                </span>
                <span className="badge-orbit" style={{ width: "200%", height: "170%", left: "-50%", top: "-35%", animationDuration: "17s" }}>
                  <span className="badge-orbit-dot" style={{ background: "#22d3ee", boxShadow: "0 0 10px #22d3ee" }} />
                </span>
                <span className="badge-ambient" />
              </span>
              <div className="relative glass-strong inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-[10px] sm:text-xs uppercase tracking-[0.28em] text-white shadow-[0_0_30px_rgba(192,132,252,0.25)]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                </span>
                <span className="text-white">Available · 5+ Years Experience</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-5 sm:mt-6 signature-glow"
          >
            <div className="font-display italic text-xl sm:text-2xl md:text-3xl tracking-[0.04em] shimmer-text">
              Hooria Azam
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-4 sm:mt-5 max-w-[18ch] mx-auto font-display !normal-case font-extrabold leading-[1.02] tracking-tight text-white"
            style={{ fontSize: "clamp(1.9rem, 5vw, 4.4rem)", textShadow: "0 4px 30px rgba(0,0,0,0.6)" }}
          >
            Creating <span className="text-gradient">Digital Experiences</span> Worth Remembering
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.75, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4 pointer-events-auto"
          >
            <MagneticButton href="#projects" variant="primary">View My Work</MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Start a Project
              <motion.span
                className="inline-block ml-1"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >→</motion.span>
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Mobile / tablet skills grid — below the 97vh hero, still visually connected */}
      <div className="relative z-[7] lg:hidden px-4 py-8 bg-[var(--background)]">
        <div className="container-x grid grid-cols-2 sm:grid-cols-3 gap-2">
          {HERO_SKILLS.map((s) => (
            <div key={s.t} className="glass rounded-2xl px-3 py-2.5 flex items-center gap-2 min-w-0">
              <span className="text-base shrink-0">{s.i}</span>
              <span className="text-[10px] sm:text-xs text-white/90 truncate font-medium">{s.t}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function Particles({ count = 24 }: { count?: number }) {
  const particles = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      d: 6 + Math.random() * 12,
      delay: Math.random() * 8,
      size: 1 + Math.random() * 2.5,
      o: 0.3 + Math.random() * 0.5,
    })),
  ).current;
  return (
    <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.o,
            boxShadow: `0 0 ${p.size * 4}px rgba(192,132,252,0.8)`,
          }}
          animate={{ y: [0, -40, 0], opacity: [p.o, p.o * 0.3, p.o] }}
          transition={{ duration: p.d, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
        />
      ))}
    </div>
  );
}

function FloatingSkill({
  label, icon, delay, style, onEnter, onLeave,
}: {
  label: string; icon: string; delay: number;
  style: React.CSSProperties;
  onEnter: () => void; onLeave: () => void;
}) {
  return (
    <motion.div
      style={style}
      className="absolute pointer-events-auto"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 1.2 + delay, ease: [0.2, 0.8, 0.2, 1] }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5 + delay * 2, repeat: Infinity, ease: "easeInOut", delay: 1.2 + delay }}
        className="glass-strong group flex items-center gap-2 rounded-full pl-2.5 pr-3.5 py-1.5 cursor-pointer hover:border-[var(--neon)]/60 hover:shadow-[0_0_36px_rgba(192,132,252,0.5)] transition-all duration-500 will-change-transform"
        whileHover={{ scale: 1.08 }}
      >
        <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-[var(--primary)]/40 to-[var(--pink)]/30 text-[11px] shrink-0">{icon}</span>
        <span className="text-[10.5px] font-medium text-white/95 whitespace-nowrap">{label}</span>
      </motion.div>
    </motion.div>
  );
}

function MagneticButton({
  href, variant, children,
}: { href: string; variant: "primary" | "ghost"; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18 });
  const sy = useSpring(y, { stiffness: 220, damping: 18 });
  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.25);
        y.set((e.clientY - r.top - r.height / 2) * 0.4);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={variant === "primary" ? "btn-primary" : "btn-ghost"}
    >
      {children}
    </motion.a>
  );
}

/* ───────── PRICING — luxury redesign ───────── */
type Plan = { name: string; price: number; blurb: string; features: readonly string[]; cta: string; featured?: boolean };
const PLANS: readonly Plan[] = [
  {
    name: "Starter",
    price: 750,
    blurb: "Perfect for individuals and small projects that need a polished web presence.",
    features: ["Up to 5 pages", "Custom responsive design", "WordPress or static build", "Basic SEO setup", "1 round of revisions", "2-week delivery"],
    cta: "Start Small",
  },
  {
    name: "Professional",
    price: 1850,
    blurb: "Most chosen — for serious brands ready to stand out with cinematic polish.",
    features: ["Up to 12 pages", "Custom UI/UX system", "Premium animations & interactions", "WooCommerce integration", "Full SEO + performance pass", "3 rounds of revisions", "Priority delivery"],
    cta: "Go Professional",
    featured: true,
  },
  {
    name: "Premium",
    price: 3500,
    blurb: "For agencies, founders, and brands building flagship experiences end-to-end.",
    features: ["Unlimited pages", "Bespoke design system", "Advanced motion choreography", "Full e-commerce architecture", "Multi-round design sprints", "Post-launch support (30 days)", "Dedicated direct line"],
    cta: "Go Premium",
  },
] as const;

function AnimatedPrice({ value }: { value: number }) {
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const controls = mv.on("change", (v) => setDisplay(Math.round(v)));
    const anim = { current: 0 };
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1400);
      const eased = 1 - Math.pow(1 - t, 3);
      mv.set(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); controls(); anim.current = 0; };
  }, [mv, value]);
  return <span>${display.toLocaleString()}</span>;
}

function PricingCard({ p, i }: { p: Plan; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0); // 0..100
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [0, 100], [4, -4]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 100], [-4, 4]), { stiffness: 150, damping: 18 });
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: i * 0.12, ease: [0.2, 0.8, 0.2, 1] }}
      className={p.featured ? "lg:-mt-6 lg:mb-6" : ""}
    >
      <motion.div
        ref={ref}
        onMouseMove={(e) => {
          const r = ref.current!.getBoundingClientRect();
          mx.set(((e.clientX - r.left) / r.width) * 100);
          my.set(((e.clientY - r.top) / r.height) * 100);
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => { setHover(false); mx.set(50); my.set(50); }}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
        className={`group relative h-full overflow-hidden rounded-3xl p-7 sm:p-9 transition-all duration-500
          ${p.featured
            ? "glass-strong ring-1 ring-[var(--neon)]/40 shadow-[0_30px_80px_-20px_rgba(192,132,252,0.55)] lg:scale-[1.04]"
            : "glass hover:-translate-y-1"
          }`}
      >
        {/* cursor-tracking spotlight */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useTransform(
              [mx, my] as any,
              ([x, y]: any) => `radial-gradient(400px circle at ${x}% ${y}%, rgba(232,121,249,0.22), transparent 60%)`,
            ),
          }}
        />
        {/* animated border on featured */}
        {p.featured && (
          <div className="pointer-events-none absolute inset-0 rounded-3xl"
            style={{
              padding: 1,
              background: "linear-gradient(135deg, rgba(192,132,252,0.7), rgba(34,211,238,0.4), rgba(232,121,249,0.7))",
              WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />
        )}

        <div className="relative">
          {p.featured && (
            <div className="mb-5 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.25em] font-bold text-black shimmer-text"
              style={{ background: "linear-gradient(90deg,#c084fc,#e879f9,#22d3ee)", color: "#0b0712" }}>
              ✦ Most Popular
            </div>
          )}
          <h3 className="text-xl sm:text-2xl font-semibold text-white">{p.name}</h3>
          <p className="mt-2 text-sm text-[var(--muted-foreground)] leading-relaxed min-h-[3rem]">{p.blurb}</p>

          <div className="mt-6 flex items-baseline gap-2">
            <span className="font-display text-5xl sm:text-6xl font-extrabold text-gradient leading-none">
              {hover || p.featured ? <AnimatedPrice value={p.price} /> : <span>${p.price.toLocaleString()}</span>}
            </span>
            <span className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider">/ project</span>
          </div>

          <div className="my-7 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          <ul className="space-y-3 mb-8">
            {p.features.map((f, idx) => (
              <motion.li
                key={f}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + idx * 0.06 }}
                className="flex items-start gap-3 text-sm text-white/85"
              >
                <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[var(--neon)] to-[var(--cyan)] text-[10px] text-black font-bold">✓</span>
                <span>{f}</span>
              </motion.li>
            ))}
          </ul>

          <a href="#contact" className={p.featured ? "btn-primary w-full" : "btn-ghost w-full"}>
            {p.cta}
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute -top-20 left-1/4 h-80 w-80 rounded-full bg-[var(--primary)]/15 blur-3xl float-y" aria-hidden />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-[var(--cyan)]/12 blur-3xl float-y" style={{ animationDelay: "-4s" }} aria-hidden />
      <div className="container-x relative">
        <div className="mb-14 sm:mb-20 text-center">
          <Reveal className="flex justify-center"><SectionTag>Investment</SectionTag></Reveal>
          <Reveal delay={0.1}>
            <h2 className="leading-[1.05]">Pricing that matches<br /><span className="text-gradient">ambition.</span></h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-[var(--muted-foreground)]">
              Choose the engagement that best fits your goals. Every project is crafted with strategy,
              design excellence, and attention to detail.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-6 lg:gap-7 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          {PLANS.map((p, i) => <PricingCard key={p.name} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}


/* ───────── About — immersive 3D glass panel with orbiting info cards ───────── */
function About() {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 90, damping: 18 });
  const sry = useSpring(ry, { stiffness: 90, damping: 18 });

  const stats = [
    { k: "5+",   l: "Years Experience" },
    { k: "40+",  l: "Projects Shipped" },
    { k: "98%",  l: "Client Retention" },
    { k: "∞",    l: "Details Obsessed" },
  ];

  return (
    <section id="about" className="relative py-28 md:py-36 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0" aria-hidden style={{
        background:
          "radial-gradient(ellipse at 15% 20%, rgba(124,58,237,0.18), transparent 55%), radial-gradient(ellipse at 85% 80%, rgba(232,121,249,0.14), transparent 55%)",
      }} />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[520px] w-[520px] rounded-full bg-[var(--primary)]/10 blur-[120px] float-y" aria-hidden />
      <Particles count={22} />

      <div className="container-x relative">
        <div className="mb-12 sm:mb-16 text-center">
          <Reveal className="flex justify-center"><SectionTag>About Me</SectionTag></Reveal>
          <Reveal delay={0.1}>
            <h2 className="leading-[1.05]">Design that thinks.<br /><span className="text-gradient">Code that performs.</span></h2>
          </Reveal>
        </div>

        <div
          ref={ref}
          onMouseMove={(e) => {
            const r = ref.current!.getBoundingClientRect();
            const nx = (e.clientX - r.left) / r.width - 0.5;
            const ny = (e.clientY - r.top) / r.height - 0.5;
            ry.set(nx * 10);
            rx.set(-ny * 10);
          }}
          onMouseLeave={() => { rx.set(0); ry.set(0); }}
          className="relative perspective-1200"
        >
          <motion.div
            style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
            className="relative mx-auto max-w-5xl"
          >
            {/* Orbiting decorative rings behind the panel */}
            <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
              <div className="absolute h-[540px] w-[540px] rounded-full border border-[rgba(192,132,252,0.12)] spin-slow" />
              <div className="absolute h-[420px] w-[420px] rounded-full border border-[rgba(232,121,249,0.10)] spin-slow" style={{ animationDuration: "26s", animationDirection: "reverse" }} />
              <div className="absolute h-[300px] w-[300px] rounded-full bg-[conic-gradient(from_120deg,#7c3aed,#e879f9,#22d3ee,#7c3aed)] opacity-25 blur-2xl pulse-glow" />
            </div>

            {/* Main glass panel */}
            <div
              className="relative glass-strong rounded-[32px] p-8 sm:p-12 lg:p-16 overflow-hidden"
              style={{
                transform: "translateZ(40px)",
                boxShadow:
                  "0 40px 120px -30px rgba(124,58,237,0.55), 0 0 0 1px rgba(255,255,255,0.06) inset",
              }}
            >
              {/* animated gradient border */}
              <div className="pointer-events-none absolute inset-0 rounded-[32px]"
                style={{
                  padding: 1,
                  background:
                    "linear-gradient(135deg, rgba(192,132,252,0.55), rgba(34,211,238,0.25), rgba(232,121,249,0.55))",
                  WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />
              <div className="pointer-events-none absolute -top-32 -left-32 h-72 w-72 rounded-full bg-[var(--primary)]/25 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-[var(--pink)]/20 blur-3xl" />

              <div className="relative grid gap-10 lg:grid-cols-[1.15fr_1fr] items-center">
                <div className="min-w-0" style={{ transform: "translateZ(30px)" }}>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-white/85">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                    Hooria Azam · Frontend & WordPress
                  </div>
                  <p className="text-lg sm:text-xl leading-relaxed text-white/90">
                    I craft <span className="text-gradient font-semibold">cinematic digital experiences</span> that
                    balance beauty and function. With <strong className="text-[var(--neon)]">5+ years</strong> of
                    hands-on work in frontend engineering, WordPress, and interaction design, I bring your ideas
                    to life with precision and soul.
                  </p>
                  <p className="mt-5 text-base sm:text-lg text-[var(--muted-foreground)] leading-relaxed">
                    I don't just build websites — I architect immersive interfaces that engage,
                    convert, and leave a lasting impression.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {["UI/UX","Frontend","WordPress","WooCommerce","Elementor Pro","Responsive","Animations"].map((p) => (
                      <span key={p} className="glass rounded-full px-3.5 py-1.5 text-[10.5px] uppercase tracking-wider text-white/80 hover:text-[var(--neon)] transition-colors">{p}</span>
                    ))}
                  </div>
                </div>

                {/* Floating stats grid */}
                <div className="grid grid-cols-2 gap-4" style={{ transform: "translateZ(60px)" }}>
                  {stats.map((s, i) => (
                    <motion.div
                      key={s.l}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
                      whileHover={{ y: -4 }}
                      className="glass relative overflow-hidden rounded-2xl p-5 sm:p-6"
                    >
                      <div className="absolute -top-16 -right-16 h-32 w-32 rounded-full bg-[var(--primary)]/25 blur-3xl" />
                      <div className="relative">
                        <div className="font-display text-3xl sm:text-4xl font-extrabold text-gradient leading-none">{s.k}</div>
                        <div className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.22em] text-white/75">{s.l}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating holographic accents */}
            <div aria-hidden className="pointer-events-none absolute -top-6 -left-6 h-16 w-16 rounded-2xl glass rotate-12 float-y" style={{ transform: "translateZ(80px) rotate(12deg)" }} />
            <div aria-hidden className="pointer-events-none absolute -bottom-8 -right-4 h-20 w-20 rounded-full glass float-y" style={{ animationDelay: "-3s", transform: "translateZ(90px)" }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}


/* ───────── Services ───────── */
const SERVICES = [
  { icon: "⚡", title: "Frontend Development", desc: "Clean, semantic, and performant code using HTML5, CSS3, and JavaScript. I build interfaces that move fast, scale elegantly, and feel genuinely alive.", featured: true },
  { icon: "✦", title: "UI/UX Design", desc: "Interfaces designed to solve real problems beautifully. Wireframes turned into visual systems users actually enjoy." },
  { icon: "◆", title: "WordPress Development", desc: "Custom WordPress builds using Elementor Pro, WooCommerce, and tailored CSS. Flexible, manageable, built right." },
  { icon: "🛒", title: "WooCommerce Stores", desc: "E-commerce experiences that convert. Clean product layouts, optimized checkout, performance-first architecture." },
  { icon: "📱", title: "Responsive Design", desc: "Pixel-perfect on every device. Mobile-first, fluid, carefully tested across screen sizes and browsers." },
  { icon: "✨", title: "Website Redesign", desc: "Modernize outdated sites while keeping what works. A fresh identity with improved UX and performance." },
];

function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="mb-12 sm:mb-16 grid items-end gap-6 md:gap-8 md:grid-cols-2">
          <div className="min-w-0">
            <Reveal><SectionTag>What I Do</SectionTag></Reveal>
            <Reveal delay={0.1}>
              <h2 className="leading-[1.05]">Services built<br /><span className="text-gradient">to scale.</span></h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="text-base sm:text-lg text-[var(--muted-foreground)]">
              Every project gets my full creative and technical attention — no templates, no shortcuts.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <TiltCard featured={s.featured}>
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)]/30 to-[var(--pink)]/20 text-2xl">{s.icon}</div>
                <h3 className="mb-3 text-lg sm:text-xl font-semibold text-white">{s.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">{s.desc}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TiltCard({ children, featured }: { children: React.ReactNode; featured?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(useTransform(y, [-50, 50], [6, -6]), { stiffness: 200, damping: 20 });
  const rotY = useSpring(useTransform(x, [-50, 50], [-6, 6]), { stiffness: 200, damping: 20 });
  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set(e.clientX - r.left - r.width / 2);
        y.set(e.clientY - r.top - r.height / 2);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 1000 }}
      className={`glass group relative h-full overflow-hidden rounded-3xl p-6 sm:p-8 ${featured ? "ring-1 ring-[var(--primary)]/40" : ""}`}
    >
      <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
           style={{ background: "linear-gradient(135deg, rgba(192,132,252,0.4), rgba(34,211,238,0.2))", maskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)", maskComposite: "exclude", padding: 1 }} />
      <div className="relative">{children}</div>
    </motion.div>
  );
}

/* ───────── SKILLS — premium glass redesign ───────── */
const SKILLS = [
  { name: "HTML5 & CSS3", pct: 97, icon: "◆", desc: "Semantic markup, modern layouts, fluid typography." },
  { name: "JavaScript", pct: 88, icon: "⟨⟩", desc: "Vanilla JS, ES6+, DOM interactions, animation logic." },
  { name: "WordPress & Elementor", pct: 95, icon: "◇", desc: "Custom themes, Elementor Pro, ACF, page-builder mastery." },
  { name: "UI/UX Design", pct: 90, icon: "✦", desc: "Wireframes, prototypes, visual systems in Figma & XD." },
  { name: "WooCommerce", pct: 85, icon: "▤", desc: "Stores, checkout flows, product templates, conversions." },
  { name: "Responsive Design", pct: 98, icon: "▢", desc: "Mobile-first layouts that adapt across every viewport." },
] as const;
const TECH = ["HTML5","CSS3","JavaScript","WordPress","Elementor Pro","WooCommerce","Figma","Adobe XD","GSAP","CSS Animations","Git","Sass/SCSS","Bootstrap","Flexbox","CSS Grid","SEO Basics"];

function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden">
      {/* Floating ambient blobs */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[var(--primary)]/15 blur-3xl float-y" aria-hidden />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[var(--cyan)]/15 blur-3xl float-y" style={{ animationDelay: "-3s" }} aria-hidden />

      <div className="container-x relative">
        <div className="text-center mb-14 sm:mb-20">
          <Reveal className="flex justify-center"><SectionTag>Technical Skills</SectionTag></Reveal>
          <Reveal delay={0.1}>
            <h2 className="leading-[1.05]">Expertise that<br /><span className="text-gradient">delivers results.</span></h2>
          </Reveal>
        </div>

        {/* Skill cards grid */}
        <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-10 sm:mb-14">
          {SKILLS.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.05}>
              <div className="glass group relative h-full overflow-hidden rounded-3xl p-6 sm:p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgba(192,132,252,0.5)]">
                {/* hover glow */}
                <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-[var(--primary)]/30 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[var(--primary)]/40 to-[var(--cyan)]/20 text-xl font-bold text-white shrink-0">
                      {s.icon}
                    </div>
                    <div className="font-display text-2xl font-extrabold text-gradient">{s.pct}%</div>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2 truncate">{s.name}</h3>
                  <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed mb-5">{s.desc}</p>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, ease: [0.2, 0.8, 0.2, 1], delay: 0.2 }}
                      className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] via-[var(--pink)] to-[var(--cyan)] shadow-[0_0_18px_rgba(192,132,252,0.7)]"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Tech stack — floating glass pill cluster */}
        <Reveal delay={0.1}>
          <div className="glass-strong rounded-3xl p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-40 w-40 rounded-full bg-[var(--pink)]/20 blur-3xl" aria-hidden />
            <div className="relative">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-8 bg-[var(--neon)]" />
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[var(--muted-foreground)]">Full Stack</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {TECH.map((t) => (
                  <span key={t} className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/[0.04] px-3 py-1.5 text-[11px] sm:text-xs text-white/90 hover:bg-white/[0.08] hover:border-[var(--neon)]/50 transition-all">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon)] shadow-[0_0_8px_var(--neon)]" />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────── PROCESS — premium storytelling redesign ───────── */
const STEPS = [
  { n: "01", title: "Discover & Define", desc: "Deep-dive into your goals, audience, and vision. I ask the right questions to understand what success actually looks like.", icon: "◐" },
  { n: "02", title: "Design & Prototype", desc: "Wireframes and high-fidelity mockups crafted with intent. Visual systems that feel cohesive, modern, and on-brand.", icon: "◑" },
  { n: "03", title: "Build & Animate", desc: "Clean, semantic code. Smooth interactions. Pixel-perfect implementation that performs beautifully.", icon: "◒" },
  { n: "04", title: "Launch & Optimize", desc: "Thorough testing, performance optimization, and a smooth handoff. Production-ready and set for long-term success.", icon: "◓" },
] as const;

function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 30%"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <section id="process" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.08),transparent_70%)]" aria-hidden />
      <div className="absolute top-1/4 left-10 h-72 w-72 rounded-full bg-[var(--primary)]/10 blur-3xl float-y" aria-hidden />
      <div className="absolute bottom-1/4 right-10 h-72 w-72 rounded-full bg-[var(--cyan)]/10 blur-3xl float-y" style={{ animationDelay: "-4s" }} aria-hidden />

      <div className="container-x relative">
        <div className="mb-16 sm:mb-20 text-center">
          <Reveal className="flex justify-center"><SectionTag>My Process</SectionTag></Reveal>
          <Reveal delay={0.1}>
            <h2 className="leading-[1.05]">How I turn ideas<br /><span className="text-gradient">into experiences.</span></h2>
          </Reveal>
        </div>

        <div ref={ref} className="relative max-w-5xl mx-auto">
          {/* Animated connector */}
          <div className="absolute left-5 top-0 h-full w-px bg-white/5 md:left-1/2 md:-translate-x-1/2" aria-hidden />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-5 top-0 w-px bg-gradient-to-b from-[var(--primary)] via-[var(--pink)] to-[var(--cyan)] shadow-[0_0_16px_var(--neon)] md:left-1/2 md:-translate-x-1/2"
          />

          <div className="space-y-10 sm:space-y-14">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.05}>
                <div className={`relative grid items-center gap-6 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                  <div className={`pl-14 md:pl-0 min-w-0 ${i % 2 ? "md:pl-14 md:text-left" : "md:pr-14 md:text-right"}`}>
                    <div className="glass-strong relative overflow-hidden rounded-3xl p-6 sm:p-7 group hover:-translate-y-1 transition-transform duration-500">
                      <div className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[var(--primary)]/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <div className="relative">
                        <div className={`flex items-center gap-3 mb-3 ${i % 2 ? "md:justify-start" : "md:justify-end"}`}>
                          <span className="font-display text-4xl sm:text-5xl font-extrabold text-gradient leading-none">{s.n}</span>
                          <span className="text-2xl text-[var(--neon)]">{s.icon}</span>
                        </div>
                        <h3 className="mb-3 text-lg sm:text-xl font-semibold text-white">{s.title}</h3>
                        <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block" />
                  <div className="absolute left-5 top-8 -translate-x-1/2 md:left-1/2">
                    <div className="relative grid h-5 w-5 place-items-center rounded-full bg-[var(--neon)] shadow-[0_0_18px_var(--neon)] ring-4 ring-[var(--background)]">
                      <div className="absolute inset-0 rounded-full bg-[var(--neon)] animate-ping opacity-60" />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── PROJECTS — cinematic case-study redesign ───────── */
const PROJECTS = [
  { glyph: "🛒", label: "WooCommerce · WordPress", name: "Luxury Brand E-Commerce Store", desc: "A full-featured WooCommerce store with custom product pages, optimized checkout, and a premium identity that lifted conversions by 38%.", tags: ["WordPress","WooCommerce","Elementor","Custom CSS"], grad: "linear-gradient(135deg,rgba(124,58,237,0.6),rgba(232,121,249,0.4))", large: true, metric: "+38% Conv." },
  { glyph: "✦", label: "UI/UX · Frontend", name: "SaaS Dashboard Redesign", desc: "A full visual overhaul — cleaner hierarchy, modern components, reduced user drop-off by 52%.", tags: ["Figma","HTML/CSS","JS"], grad: "linear-gradient(135deg,rgba(34,211,238,0.4),rgba(124,58,237,0.4))", metric: "-52% Drop-off" },
  { glyph: "🔷", label: "Landing Page · Frontend", name: "Animated Product Launch", desc: "High-converting launch page with scroll-triggered animations, spotlight effects, and fully responsive design.", tags: ["HTML5","CSS3","GSAP"], grad: "linear-gradient(135deg,rgba(232,121,249,0.4),rgba(34,211,238,0.3))", metric: "Cinematic" },
  { glyph: "🌐", label: "WordPress · Brand", name: "Corporate Website Rebuild", desc: "Full WordPress rebuild with custom Elementor templates, optimized performance, brand-focused design across 20+ pages.", tags: ["WordPress","Elementor Pro","SEO"], grad: "linear-gradient(135deg,rgba(124,58,237,0.5),rgba(34,211,238,0.3))", metric: "20+ Pages" },
  { glyph: "⬡", label: "UI Design · Frontend", name: "Agency Portfolio Website", desc: "Dark luxury aesthetic with cinematic scroll animations, glassmorphism UI components, and fully responsive layouts.", tags: ["HTML/CSS","JavaScript","Animations"], grad: "linear-gradient(135deg,rgba(232,121,249,0.5),rgba(124,58,237,0.3))", metric: "Awwwards-feel" },
];

function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden">
      <div className="container-x">
        <div className="mb-12 sm:mb-16 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:gap-6">
          <div className="min-w-0">
            <Reveal><SectionTag>Featured Work</SectionTag></Reveal>
            <Reveal delay={0.1}>
              <h2 className="leading-[1.05]">Projects that<br /><span className="text-gradient">speak louder.</span></h2>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="shrink-0">
            <a href="#contact" className="btn-ghost !py-2.5 !px-4 sm:!py-3 sm:!px-6 text-xs sm:text-sm whitespace-nowrap">All Projects →</a>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.05} className={p.large ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""}>
              <ProjectCard {...p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ glyph, label, name, desc, tags, grad, large, metric }: typeof PROJECTS[number]) {
  return (
    <article className="glass group relative flex h-full flex-col overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_-20px_rgba(192,132,252,0.4)]">
      {/* Cinematic image area */}
      <div className={`relative flex items-center justify-center overflow-hidden ${large ? "h-72 sm:h-80 lg:h-[28rem]" : "h-52 sm:h-56"}`} style={{ background: grad }}>
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(2,2,7,0.6)_100%)]" />
        {/* Floating glyph with zoom */}
        <div className="relative text-6xl sm:text-7xl drop-shadow-[0_0_30px_rgba(192,132,252,0.7)] transition-transform duration-[900ms] ease-out group-hover:scale-125 group-hover:rotate-3">{glyph}</div>
        {/* Glass overlay reveal */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--background)]/95 via-[var(--background)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Metric chip */}
        <div className="absolute top-4 right-4 glass-strong rounded-full px-3 py-1.5 text-[10px] sm:text-xs font-semibold text-white uppercase tracking-wider">
          {metric}
        </div>
        {/* View arrow */}
        <div className="absolute bottom-4 right-4 grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-full bg-white/95 text-black opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          <span className="text-lg">→</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="mb-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[var(--cyan)]">{label}</div>
        <h3 className="mb-3 text-lg sm:text-xl font-semibold text-white">{name}</h3>
        <p className="mb-5 flex-1 text-sm text-[var(--muted-foreground)] leading-relaxed">{desc}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="rounded-full border border-[var(--border)] bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">{t}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

/* ───────── Why Me ───────── */
const WHY = [
  ["🎯","Purpose-Driven Design","Every decision is grounded in user behavior and business goals. I design for results, not aesthetics alone."],
  ["⚡","Speed Without Compromise","Fast delivery, clean code, optimized performance. I move efficiently without cutting craftsmanship."],
  ["🤝","Clear Communication","Transparent timelines, regular updates, honest feedback. You always know where your project stands."],
  ["📐","Pixel-Perfect Precision","I obsess over the details — spacing, rhythm, timing — the things that separate good from exceptional."],
  ["🔮","Modern Practices","Always current with web trends, CSS techniques, WordPress updates. Built for today, ready for tomorrow."],
  ["🌱","Long-Term Thinking","I build for scale. Clean architecture, readable code, flexible layouts that grow with your business."],
] as const;

function Why() {
  return (
    <section id="why" className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="mb-12 sm:mb-16 text-center">
          <Reveal className="flex justify-center"><SectionTag>Why Work With Me</SectionTag></Reveal>
          <Reveal delay={0.1}>
            <h2 className="leading-[1.05]">The difference is in<br /><span className="text-gradient">the details.</span></h2>
          </Reveal>
        </div>
        <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map(([icon, title, text], i) => (
            <Reveal key={title} delay={i * 0.05}>
              <TiltCard>
                <div className="mb-4 text-3xl">{icon}</div>
                <h3 className="mb-3 text-base sm:text-lg font-semibold text-white">{title}</h3>
                <p className="text-sm text-[var(--muted-foreground)]">{text}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Testimonials ───────── */
const TESTIS = [
  { stars: 5, text: "Hooria redesigned our entire site from scratch. The result was stunning — clean, fast, and on-brand. She understood our vision immediately and executed flawlessly.", initials: "SR", name: "Sarah R.", role: "Founder, Creative Agency" },
  { stars: 5, text: "Our WooCommerce store went from generic to genuinely impressive. Hooria's attention to detail in design and functionality was remarkable. Sales increased within the first month.", initials: "MK", name: "Marcus K.", role: "E-Commerce Business Owner" },
  { stars: 5, text: "Working with Hooria was effortless. She delivered a premium landing page with animations that impressed our investors. Highly recommended for any serious digital project.", initials: "AP", name: "Aisha P.", role: "Product Manager, Tech Startup" },
];

function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 md:py-32">
      <div className="container-x">
        <Reveal><SectionTag>Client Voices</SectionTag></Reveal>
        <Reveal delay={0.1}>
          <h2 className="mb-12 sm:mb-16 leading-[1.05]">What clients<br /><span className="text-gradient">say about the work.</span></h2>
        </Reveal>
        <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <div className="glass flex h-full flex-col rounded-3xl p-6 sm:p-7">
                <div className="mb-4 text-[var(--neon)] tracking-widest">{"★".repeat(t.stars)}</div>
                <p className="mb-6 flex-1 text-sm italic leading-relaxed text-[var(--muted-foreground)]">"{t.text}"</p>
                <div className="flex items-center gap-3 min-w-0">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--pink)] text-sm font-semibold text-white">{t.initials}</div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-white truncate">{t.name}</div>
                    <div className="text-xs text-[var(--muted-foreground)] truncate">{t.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Contact ───────── */
const CONTACT_EMAIL = "hooria.webdesigns@gmail.com";

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New project inquiry from ${form.name || "website"}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nProject type: ${form.type}\n\n${form.message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(124,58,237,0.2),transparent_60%)]" aria-hidden />
      <div className="container-x relative max-w-4xl">
        <div className="mb-12 sm:mb-16 text-center">
          <Reveal className="flex justify-center"><SectionTag>Get In Touch</SectionTag></Reveal>
          <Reveal delay={0.1}>
            <h2 className="leading-[1.05]">Let's build something<br /><span className="text-gradient">remarkable.</span></h2>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8 md:p-12">
            <div className="absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[var(--primary)]/30 blur-3xl" aria-hidden />
            <div className="relative">
              <h3 className="mb-3 text-xl sm:text-2xl font-semibold text-white">Ready to start?</h3>
              <p className="mb-8 text-sm sm:text-base text-[var(--muted-foreground)]">
                Tell me about your project — I'd love to hear what you're building and explore how we can make it exceptional.
              </p>
              <form className="space-y-4" onSubmit={onSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field required maxLength={100} placeholder="Your name" value={form.name} onChange={(e: any) => setForm({ ...form, name: e.target.value })} />
                  <Field required type="email" maxLength={255} placeholder="Email address" value={form.email} onChange={(e: any) => setForm({ ...form, email: e.target.value })} />
                </div>
                <Field maxLength={120} placeholder="Project type (e.g. WordPress site, Landing page, UI design…)" value={form.type} onChange={(e: any) => setForm({ ...form, type: e.target.value })} />
                <Field as="textarea" rows={5} required maxLength={2000} placeholder="Tell me about your project…" value={form.message} onChange={(e: any) => setForm({ ...form, message: e.target.value })} />
                <button type="submit" className="btn-primary w-full !py-4" disabled={sent}>
                  {sent ? "Opening your email…  ✓" : "Send Message"}
                </button>
              </form>
              <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm">
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-[var(--muted-foreground)] transition-colors hover:text-[var(--neon)]">📧 {CONTACT_EMAIL}</a>
                <a href="https://www.linkedin.com/in/hooria-azam-web-developer/" target="_blank" rel="noopener noreferrer" className="text-[var(--muted-foreground)] transition-colors hover:text-[var(--neon)]">💼 LinkedIn</a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ as, ...props }: any) {
  const Cmp = as || "input";
  return (
    <Cmp
      {...props}
      className="w-full rounded-2xl border border-[var(--border)] bg-white/[0.02] px-4 sm:px-5 py-3.5 sm:py-4 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] outline-none transition-all focus:border-[var(--neon)] focus:bg-white/[0.04] focus:shadow-[0_0_0_4px_rgba(192,132,252,0.12)]"
    />
  );
}

/* ───────── Footer — floating glass card, premium 3D ───────── */
function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 90, damping: 20 });
  const sry = useSpring(ry, { stiffness: 90, damping: 20 });

  const nav: [string, string][] = [
    ["Home", "#hero"], ["About", "#about"], ["Projects", "#projects"],
    ["Services", "#services"], ["Contact", "#contact"],
  ];
  const socials: [string, string, string][] = [
    ["LinkedIn", "https://www.linkedin.com/in/hooria-azam-web-developer/", "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.3-.02-3-1.83-3-1.83 0-2.12 1.43-2.12 2.9V21h-4V9Z"],
    ["Email",    "mailto:hooria.webdesigns@gmail.com", "M2.5 5.5a2 2 0 0 1 2-2h15a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2v-13Zm1.9-.1L12 12l7.6-6.6H4.4ZM20.5 6.7l-8 6.9a1 1 0 0 1-1.2 0L3.5 6.7v11.8h17V6.7Z"],
  ];

  return (
    <footer className="relative pt-24 pb-10 overflow-hidden">
      {/* Top separator glow */}
      <div className="absolute inset-x-0 top-0 h-24 pointer-events-none" aria-hidden style={{
        background: "radial-gradient(ellipse at 50% 0%, rgba(192,132,252,0.22), transparent 60%)"
      }} />
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="hero-orb" style={{ top: "-10%", left: "5%", width: 360, height: 360, background: "rgba(124,58,237,0.22)" }} />
        <div className="hero-orb" style={{ bottom: "-15%", right: "10%", width: 420, height: 420, background: "rgba(232,121,249,0.18)", animationDelay: "-6s" }} />
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 h-[600px] w-[600px] rounded-full border border-[rgba(192,132,252,0.08)] spin-slow" />
      </div>
      <Particles count={16} />

      <div className="container-x relative">
        <div
          ref={ref}
          onMouseMove={(e) => {
            const r = ref.current!.getBoundingClientRect();
            const nx = (e.clientX - r.left) / r.width - 0.5;
            const ny = (e.clientY - r.top) / r.height - 0.5;
            ry.set(nx * 6);
            rx.set(-ny * 6);
          }}
          onMouseLeave={() => { rx.set(0); ry.set(0); }}
          className="perspective-1200"
        >
          <motion.div
            style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative mx-auto glass-strong rounded-[36px] px-6 py-10 sm:px-10 sm:py-12 lg:p-14 overflow-hidden"
          >
            {/* Gradient border */}
            <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[36px]" style={{
              padding: 1,
              background: "linear-gradient(135deg, rgba(192,132,252,0.55), rgba(34,211,238,0.2), rgba(232,121,249,0.55))",
              WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }} />
            <div aria-hidden className="pointer-events-none absolute -top-40 -left-24 h-80 w-80 rounded-full bg-[var(--primary)]/25 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-24 h-80 w-80 rounded-full bg-[var(--pink)]/20 blur-3xl" />

            <div className="relative grid gap-10 lg:gap-14 lg:grid-cols-4">
              {/* Brand */}
              <div className="min-w-0" style={{ transform: "translateZ(30px)" }}>
                <div className="font-display text-3xl sm:text-4xl font-extrabold text-gradient">Hooria Azam</div>
                <p className="mt-4 text-sm text-white/75 leading-relaxed max-w-xs">
                  Crafting immersive digital experiences with strategy, creativity, and modern development.
                </p>
                <div className="mt-5 inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-[10.5px] uppercase tracking-[0.22em] text-white/85">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-70" />
                    <span className="relative h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                  </span>
                  Available for Freelance
                </div>
              </div>

              {/* Navigation */}
              <div style={{ transform: "translateZ(20px)" }}>
                <div className="mb-4 text-[11px] uppercase tracking-[0.28em] text-white/60">Explore</div>
                <ul className="space-y-2.5">
                  {nav.map(([l, h]) => (
                    <li key={l}>
                      <a href={h} className="group inline-flex items-center gap-2 text-sm text-white/85 hover:text-white transition-all duration-300 hover:translate-x-1">
                        <span className="relative">
                          {l}
                          <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-gradient-to-r from-[var(--primary)] to-[var(--pink)] transition-all duration-300 group-hover:w-full shadow-[0_0_8px_var(--neon)]" />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Connect */}
              <div style={{ transform: "translateZ(20px)" }}>
                <div className="mb-4 text-[11px] uppercase tracking-[0.28em] text-white/60">Connect</div>
                <div className="flex flex-col gap-3">
                  {socials.map(([n, h, path]) => (
                    <motion.a
                      key={n}
                      href={h}
                      aria-label={n}
                      target={h.startsWith("http") ? "_blank" : undefined}
                      rel={h.startsWith("http") ? "noopener noreferrer" : undefined}
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="group inline-flex items-center gap-3 rounded-full glass border border-white/10 pl-2 pr-4 py-2 text-sm text-white/85 hover:text-white hover:border-[var(--neon)]/60 hover:shadow-[0_0_24px_rgba(192,132,252,0.45)] transition-all"
                    >
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[var(--primary)]/40 to-[var(--pink)]/25">
                        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d={path} /></svg>
                      </span>
                      <span className="truncate">{n === "Email" ? "hooria.webdesigns@gmail.com" : "linkedin.com/in/hooria-azam"}</span>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div style={{ transform: "translateZ(40px)" }}>
                <div className="mb-2 text-[11px] uppercase tracking-[0.28em] text-white/60">Let's collaborate</div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">Have an idea?</h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">
                  Let's transform it into an unforgettable digital experience.
                </p>
                <MagneticButton href="#contact" variant="primary">
                  Start a Project
                  <motion.span
                    className="inline-block ml-1"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  >→</motion.span>
                </MagneticButton>
              </div>
            </div>

            {/* Divider */}
            <div className="relative mt-10 h-px overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--neon)]/40 to-transparent" />
              <motion.div
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent"
                animate={{ x: ["-100%", "300%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Bottom bar */}
            <div className="relative mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] uppercase tracking-[0.22em] text-white/60">
              <div>© 2026 Hooria Azam. All Rights Reserved.</div>
              <div className="text-center">Designed &amp; Developed with Passion.</div>
              <a
                href="#hero"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="group inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-white/85 hover:text-white hover:border-[var(--neon)]/60 hover:shadow-[0_0_20px_rgba(192,132,252,0.4)] transition-all"
              >
                Back to Top
                <motion.span
                  className="inline-block"
                  whileHover={{ rotate: -10, y: -2 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                >↑</motion.span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}


/* ───────── Page ───────── */
function Portfolio() {
  useLenis();
  return (
    <main className="relative">
      <CursorFX />
      <Nav />
      <Hero />
      <About />
      <Services />
      <Skills />
      <Process />
      <Projects />
      <Pricing />

      <Why />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
