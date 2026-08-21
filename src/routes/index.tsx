import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "@/hooks/use-lenis";
import {
  Code2, Palette, Braces, MonitorSmartphone, Globe, LayoutTemplate,
  ShoppingCart, Figma, LayoutGrid, Smartphone, Sparkles, Navigation,
  Linkedin, Mail, ArrowUpRight, ArrowUp,
  Zap, Award, Target, Rocket, Check, Sparkle, Layers, Wand2,
} from "lucide-react";
import { Logo } from "@/components/Logo";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hooria Azam — Frontend & WordPress Developer" },
      { name: "description", content: "5+ years crafting cinematic, premium digital experiences. Frontend, WordPress, UI/UX." },
      { property: "og:title", content: "Hooria Azam — Frontend & WordPress Developer" },
      { property: "og:description", content: "5+ years crafting cinematic, premium digital experiences. Frontend, WordPress, UI/UX." },
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
    ["Work", "#projects"], ["Contact", "#contact"],
  ];
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
      className={`fixed left-1/2 top-3 sm:top-5 z-50 -translate-x-1/2 transition-all duration-500 w-[min(94vw,1200px)] ${scrolled ? "max-w-[1100px]" : ""}`}
    >
      <div className="glass-strong flex items-center justify-between rounded-full pl-5 pr-3 py-2.5 sm:pl-6 sm:pr-4 sm:py-3 gap-3">
        <a href="#hero" className="shrink-0 group" aria-label="Hooria Azam — Home">
          <Logo variant="full" tone="gradient" className="transition-opacity group-hover:opacity-80" />
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
    <div className="mb-6 inline-flex items-center gap-3 text-[15px] sm:text-sm uppercase tracking-[0.25em] text-[var(--muted-foreground)]">
      <span className="h-px w-8 bg-[var(--neon)]" />
      {children}
    </div>
  );
}

/* ───────── HERO — radar spotlight (constrained to 97vh, correct beam tracking) ───────── */
type SkillDef = { t: string; Icon: React.ComponentType<{ className?: string; size?: number }>; x: number; y: number };
// Radar anchored at (50%, 62%). Cards placed within safe bounds so they never
// leave the 97vh hero: horizontal 8–92%, vertical 38–90%.
const RADAR_CX = 50;
const RADAR_CY = 62;
const HERO_SKILLS: SkillDef[] = [
  { t: "HTML5",              Icon: Code2,             x: 10, y: 46 },
  { t: "CSS3",               Icon: Palette,           x: 90, y: 46 },
  { t: "JavaScript",         Icon: Braces,            x: 8,  y: 66 },
  { t: "Front-End Developer",Icon: MonitorSmartphone, x: 92, y: 66 },
  { t: "WordPress",          Icon: Globe,             x: 12, y: 86 },
  { t: "Elementor Pro",      Icon: LayoutTemplate,    x: 30, y: 92 },
  { t: "WooCommerce",        Icon: ShoppingCart,      x: 50, y: 94 },
  { t: "Figma to Website",   Icon: Figma,             x: 70, y: 92 },
  { t: "Bootstrap",          Icon: LayoutGrid,        x: 88, y: 86 },
  { t: "Responsive Design",  Icon: Smartphone,        x: 22, y: 40 },
  { t: "UI/UX Design",       Icon: Sparkles,          x: 78, y: 40 },
];

function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const radarRef = useRef<HTMLDivElement>(null);

  // Ambient background parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 18 });
  const smy = useSpring(my, { stiffness: 60, damping: 18 });
  const pxBg = useTransform(smx, (v) => v * -18);
  const pyBg = useTransform(smy, (v) => v * -18);

  // Spotlight angle in radians (single source, no double-spring)
  const angle = useMotionValue(Math.PI / 2);
  const [lockedAngle, setLockedAngle] = useState<number | null>(null);

  // Arrow (center icon) rotation — smoothly springs toward mouse direction
  const arrowRot = useMotionValue(0);
  const sArrowRot = useSpring(arrowRot, { stiffness: 180, damping: 20, mass: 0.4 });

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 80]);

  // Idle scan / hover lock via RAF, with shortest-path normalization
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const start = last;
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const cur = angle.get();
      let target: number;
      if (lockedAngle === null) {
        const t = (now - start) / 1000;
        target = Math.PI / 2 + Math.sin(t * 0.35) * 0.55;
      } else {
        target = lockedAngle;
      }
      let diff = target - cur;
      diff = ((diff + Math.PI) % (Math.PI * 2)) - Math.PI;
      const k = lockedAngle === null ? 1.6 : 6.5;
      angle.set(cur + diff * Math.min(1, dt * k));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [angle, lockedAngle]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = sectionRef.current;
      const rr = radarRef.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
        const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
        mx.set(Math.max(-1, Math.min(1, nx)));
        my.set(Math.max(-1, Math.min(1, ny)));
      }
      // Arrow: rotate toward mouse relative to radar center
      if (rr) {
        const rb = rr.getBoundingClientRect();
        const cx = rb.left + rb.width / 2;
        const cy = rb.top + rb.height / 2;
        const a = Math.atan2(e.clientY - cy, e.clientX - cx);
        // Navigation icon points up-right (~ -π/4). Add offset so it "aims" at the cursor.
        const deg = (a * 180) / Math.PI + 45;
        // Shortest-path unwrap for spring
        const prev = arrowRot.get();
        let d = deg - prev;
        d = ((d + 180) % 360 + 360) % 360 - 180;
        arrowRot.set(prev + d);
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, arrowRot]);

  // Live-compute angle from radar center to hovered card (correct direction guaranteed)
  const lockToCard = (cardEl: HTMLElement) => {
    const rr = radarRef.current;
    if (!rr) return;
    const rb = rr.getBoundingClientRect();
    const cb = cardEl.getBoundingClientRect();
    const cx = rb.left + rb.width / 2;
    const cy = rb.top + rb.height / 2;
    const tx = cb.left + cb.width / 2;
    const ty = cb.top + cb.height / 2;
    setLockedAngle(Math.atan2(ty - cy, tx - cx));
  };

  // Beam's bright sector points UP at rotate=0 (conic-gradient `from 270deg`
  // places the bright wedge at 12 o'clock). Standard math angle a has 0=right,
  // π/2=down, -π/2=up. Rotation to aim beam at a = aDeg - (-90) = aDeg + 90.
  const spotRotate = useTransform(angle, (a) => `${(a * 180) / Math.PI + 90}deg`);
  const arrowRotStr = useTransform(sArrowRot, (v) => `${v}deg`);

  return (
    <motion.section
      ref={sectionRef}
      id="hero"
      style={{ y: heroY }}
      className="relative isolate w-full overflow-hidden"
    >
      {/* Hard-clamped hero canvas — everything below is confined to 97vh */}
      <div className="relative w-full h-[97svh] min-h-[640px] overflow-hidden">
        {/* Layer 1 — luxury wash */}
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse at 20% 10%, #1a0b2e 0%, transparent 55%), radial-gradient(ellipse at 80% 90%, #2a0a3a 0%, transparent 55%), linear-gradient(180deg, #06040f 0%, #020207 100%)",
          }}
        />

        {/* Layer 2 — drifting orbs */}
        <motion.div className="absolute inset-0" style={{ x: pxBg, y: pyBg }} aria-hidden>
          <div className="hero-orb" style={{ top: "8%", left: "10%", width: 380, height: 380, background: "rgba(124,58,237,0.40)" }} />
          <div className="hero-orb" style={{ top: "60%", left: "75%", width: 460, height: 460, background: "rgba(232,121,249,0.28)", animationDelay: "-6s" }} />
          <div className="hero-orb" style={{ top: "80%", left: "5%", width: 320, height: 320, background: "rgba(34,211,238,0.18)", animationDelay: "-10s" }} />
        </motion.div>

        <Particles count={26} />

        {/* RADAR — the centerpiece */}
        <div
          ref={radarRef}
          className="absolute pointer-events-none z-[3]"
          style={{ left: `${RADAR_CX}%`, top: `${RADAR_CY}%`, transform: "translate(-50%, -50%)" }}
          aria-hidden
        >
          {[0, 1.2, 2.4, 3.6, 4.8, 6].map((d) => (
            <div key={d} className="radar-ring"
              style={{ width: 900, height: 900, marginLeft: -450, marginTop: -450, animationDelay: `-${d}s` }} />
          ))}
          {[160, 280, 420, 580, 760].map((s) => (
            <div key={s} className="absolute left-1/2 top-1/2 rounded-full border border-[rgba(192,132,252,0.10)]"
              style={{ width: s, height: s, marginLeft: -s / 2, marginTop: -s / 2 }} />
          ))}

          {/* SPOTLIGHT BEAM */}
          <motion.div
            className="absolute left-1/2 top-1/2"
            style={{ width: 1400, height: 1400, marginLeft: -700, marginTop: -700, rotate: spotRotate }}
          >
            <div className="absolute inset-0" style={{
              background:
                "conic-gradient(from 270deg, transparent 0deg, rgba(232,121,249,0) 55deg, rgba(232,121,249,0.10) 70deg, rgba(232,121,249,0.30) 85deg, rgba(244,114,182,0.46) 90deg, rgba(232,121,249,0.30) 95deg, rgba(232,121,249,0.10) 110deg, transparent 125deg, transparent 360deg)",
              filter: "blur(28px)",
              maskImage: "radial-gradient(circle at center, black 5%, black 60%, transparent 78%)",
              WebkitMaskImage: "radial-gradient(circle at center, black 5%, black 60%, transparent 78%)",
            }} />
            <div className="absolute inset-0" style={{
              background:
                "conic-gradient(from 270deg, transparent 0deg, transparent 80deg, rgba(255,182,234,0.38) 88deg, rgba(255,210,243,0.60) 90deg, rgba(255,182,234,0.38) 92deg, transparent 100deg, transparent 360deg)",
              filter: "blur(10px)",
              maskImage: "radial-gradient(circle at center, black 4%, black 45%, transparent 70%)",
              WebkitMaskImage: "radial-gradient(circle at center, black 4%, black 45%, transparent 70%)",
            }} />
          </motion.div>

          {/* Central halo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: 240, height: 240,
              background: "radial-gradient(circle, rgba(232,121,249,0.55), rgba(124,58,237,0.18) 50%, transparent 75%)",
              filter: "blur(10px)",
            }} />

          {/* RADAR NODE with mouse-following arrow */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative grid place-items-center h-20 w-20 sm:h-24 sm:w-24 rounded-full"
              style={{
                background: "radial-gradient(circle at 30% 30%, #1a1424, #07050d)",
                border: "1px solid rgba(232,121,249,0.4)",
                boxShadow: "0 0 0 1px rgba(192,132,252,0.15), 0 0 40px rgba(232,121,249,0.55), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}>
              <motion.div style={{ rotate: arrowRotStr }} className="grid place-items-center">
                <Navigation className="h-7 w-7 sm:h-8 sm:w-8 text-[var(--neon)] drop-shadow-[0_0_10px_rgba(232,121,249,0.9)]" strokeWidth={1.8} />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Vignette behind text */}
        <div className="absolute inset-0 z-[4] pointer-events-none" aria-hidden
          style={{ background: "radial-gradient(ellipse at 50% 22%, rgba(2,2,7,0.72) 0%, rgba(2,2,7,0.25) 35%, transparent 70%)" }} />
        <div className="absolute inset-x-0 bottom-0 z-[4] h-24 bg-gradient-to-b from-transparent to-[var(--background)] pointer-events-none" aria-hidden />

        {/* FLOATING SKILL CARDS (desktop) — clamped inside hero via containment */}
        <div className="absolute inset-0 z-[6] hidden lg:block pointer-events-none">
          {HERO_SKILLS.map((s, i) => (
            <FloatingSkill
              key={s.t}
              label={s.t}
              Icon={s.Icon}
              delay={i * 0.06}
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
              onEnter={lockToCard}
              onLeave={() => setLockedAngle(null)}
            />
          ))}
        </div>

        {/* CONTENT */}
        <div className="container-x relative z-[7] flex flex-col items-center text-center pt-24 sm:pt-28 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
            className="badge-float pointer-events-auto"
          >
            <div className="glass-strong inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-[15px] sm:text-sm uppercase tracking-[0.28em] text-white/95 shadow-[0_0_30px_rgba(192,132,252,0.25)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
              </span>
              Available · 5+ Years Experience
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-4 sm:mt-5 signature-glow"
          >
            <div className="font-display italic font-semibold text-xl sm:text-[1.75rem] md:text-4xl tracking-[0.04em] shimmer-text">
              Hooria Azam
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-3 sm:mt-4 max-w-[18ch] mx-auto font-display !normal-case font-extrabold leading-[1.02] tracking-tight text-white"
            style={{ fontSize: "clamp(1.75rem, 4.8vw, 4.25rem)", textShadow: "0 4px 30px rgba(0,0,0,0.6)" }}
          >
            Creating <span className="text-gradient">Digital Experiences</span> Worth Remembering
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4 pointer-events-auto"
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

      {/* Mobile / tablet skills grid — sits BELOW hero (not overflowing 97vh) */}
      <div className="relative z-[7] lg:hidden px-4 py-10 bg-[var(--background)]">
        <div className="container-x grid grid-cols-2 sm:grid-cols-3 gap-2">
          {HERO_SKILLS.map((s) => (
            <div key={s.t} className="glass rounded-2xl px-3 py-2.5 flex items-center gap-2 min-w-0">
              <s.Icon className="h-4 w-4 shrink-0 text-[var(--neon)]" />
              <span className="text-[15px] sm:text-sm text-white/90 truncate font-medium">{s.t}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function Particles({ count = 24 }: { count?: number }) {
  // Deterministic pseudo-random so SSR and client markup match exactly.
  const rand = (n: number) => {
    const s = Math.sin(n * 12.9898) * 43758.5453;
    return s - Math.floor(s);
  };
  const particles = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: rand(i + 1) * 100,
      y: rand(i + 2.3) * 100,
      d: 6 + rand(i + 3.7) * 12,
      delay: rand(i + 4.1) * 8,
      size: 1 + rand(i + 5.9) * 2.5,
      o: 0.3 + rand(i + 6.4) * 0.5,
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
          animate={{ y: [0, -30, 0], opacity: [p.o, p.o * 0.3, p.o] }}
          transition={{ duration: p.d, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
        />
      ))}
    </div>
  );
}

function FloatingSkill({
  label, Icon, delay, style, onEnter, onLeave,
}: {
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  delay: number;
  style: React.CSSProperties;
  onEnter: (el: HTMLElement) => void;
  onLeave: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });
  return (
    <motion.div
      ref={ref}
      style={{ ...style, x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      className="absolute pointer-events-auto"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
      transition={{
        opacity: { duration: 0.8, delay: 1.2 + delay },
        scale: { duration: 0.8, delay: 1.2 + delay },
        y: { duration: 5 + delay * 2, repeat: Infinity, ease: "easeInOut", delay: 1.2 + delay },
      }}
      onMouseEnter={() => { if (ref.current) onEnter(ref.current); }}
      onMouseLeave={() => { x.set(0); y.set(0); onLeave(); }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.3);
        y.set((e.clientY - r.top - r.height / 2) * 0.3);
      }}
    >
      <div className="glass-strong group flex items-center gap-2 rounded-full pl-2.5 pr-3.5 py-1.5 cursor-pointer hover:border-[var(--neon)]/60 hover:shadow-[0_0_40px_rgba(192,132,252,0.5)] transition-all duration-500">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-[var(--primary)]/40 to-[var(--pink)]/30 shrink-0">
          <Icon className="h-3.5 w-3.5 text-white" />
        </span>
        <span className="text-[14px] font-medium text-white/95 whitespace-nowrap">{label}</span>
      </div>
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

/* ───────── ABOUT — floating 3D glass card with holographic layers ───────── */
function AboutCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1600;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(to * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

function About() {
  const secRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 120, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 120, damping: 20 });
  const lx = useTransform(mx, (v) => `${v * 100}%`);
  const ly = useTransform(my, (v) => `${v * 100}%`);

  // Scroll parallax for floating shapes
  const { scrollYProgress } = useScroll({ target: secRef, offset: ["start end", "end start"] });
  const blobY1 = useTransform(scrollYProgress, [0, 1], [-40, 80]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], [40, -70]);
  const blobY3 = useTransform(scrollYProgress, [0, 1], [-20, 60]);







  const workflow = [
    { n: "01", t: "Discover", d: "Understand goals, audience, and the story to tell." },
    { n: "02", t: "Design",   d: "Craft a visual system rooted in clarity and feeling." },
    { n: "03", t: "Build",    d: "Engineer clean, performant, animation-ready code." },
    { n: "04", t: "Polish",   d: "Refine every detail until it feels effortless." },
  ];

  return (
    <section id="about" ref={secRef} className="relative py-16 sm:py-28 md:py-40 overflow-hidden">
      {/* Ambient stage */}
      <div className="absolute inset-0 -z-10" aria-hidden style={{
        background:
          "radial-gradient(1000px 500px at 15% 10%, rgba(124,58,237,0.16), transparent 60%)," +
          "radial-gradient(900px 500px at 85% 90%, rgba(232,121,249,0.12), transparent 60%)," +
          "radial-gradient(700px 400px at 50% 50%, rgba(34,211,238,0.06), transparent 65%)",
      }} />

      {/* Organic floating shapes (parallax) */}
      <motion.svg style={{ y: blobY1 }} className="absolute -left-24 top-10 h-[520px] w-[520px] opacity-[0.22] blur-2xl" viewBox="0 0 200 200" aria-hidden>
        <defs>
          <linearGradient id="ab-blob-a" x1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#e879f9" />
          </linearGradient>
        </defs>
        <path fill="url(#ab-blob-a)" d="M46,-63C58,-52,64,-35,68,-18C72,-1,74,17,68,32C61,47,45,58,27,64C10,70,-9,71,-27,66C-45,60,-62,49,-70,32C-78,15,-77,-8,-70,-27C-63,-46,-50,-62,-33,-71C-16,-79,4,-80,21,-77C38,-74,53,-68,46,-63Z" transform="translate(100 100)" />
      </motion.svg>
      <motion.svg style={{ y: blobY2 }} className="absolute -right-24 bottom-10 h-[560px] w-[560px] opacity-[0.18] blur-2xl" viewBox="0 0 200 200" aria-hidden>
        <defs>
          <linearGradient id="ab-blob-b" x1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        <path fill="url(#ab-blob-b)" d="M40,-58C52,-49,62,-38,67,-24C72,-10,72,7,67,22C62,37,52,50,39,58C25,66,8,70,-9,71C-27,72,-45,71,-56,60C-67,50,-70,32,-72,14C-74,-4,-75,-22,-67,-35C-59,-48,-42,-56,-26,-63C-10,-70,4,-76,17,-74C29,-72,28,-67,40,-58Z" transform="translate(100 100)" />
      </motion.svg>
      <motion.div style={{ y: blobY3 }} className="absolute left-1/2 top-1/2 -translate-x-1/2 h-[720px] w-[720px] rounded-[42%_58%_46%_54%/52%_44%_56%_48%] border border-[rgba(192,132,252,0.08)] spin-slow pointer-events-none" aria-hidden />

      <div className="container-x relative">
        {/* Editorial header */}
        <div className="mb-16 sm:mb-24 max-w-4xl">
          <Reveal className="flex"><SectionTag>About — Hooria Azam</SectionTag></Reveal>
          <Reveal delay={0.08}>
            <h2 className="leading-[0.95] mt-6">
              Design that <span className="italic font-display">thinks.</span><br />
              <span className="text-gradient">Code that performs.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-6 flex items-center gap-4 text-sm uppercase tracking-[0.32em] text-[var(--muted-foreground)]">
              <span className="h-px w-10 bg-[var(--neon)]/60" />
              A frontend studio of one · Karachi → Worldwide
            </div>
          </Reveal>
        </div>

        {/* 3D Layered composition */}
        <div className="relative">



          <motion.div
            ref={cardRef}
            onMouseMove={(e) => {
              const r = cardRef.current!.getBoundingClientRect();
              mx.set((e.clientX - r.left) / r.width);
              my.set((e.clientY - r.top) / r.height);
            }}
            onMouseLeave={() => { mx.set(0.5); my.set(0.5); }}
            style={{ rotateX: rx, rotateY: ry, transformPerspective: 1600 }}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative glass-strong rounded-[40px] p-6 sm:p-10 md:p-14 overflow-hidden"
          >
            {/* Gradient hairline border */}
            <div className="pointer-events-none absolute inset-0 rounded-[40px]" style={{
              padding: 1,
              background: "linear-gradient(135deg, rgba(192,132,252,0.55), rgba(34,211,238,0.2) 40%, rgba(232,121,249,0.55))",
              WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            } as React.CSSProperties} aria-hidden />

            {/* Cursor spotlight */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ background: useTransform([lx, ly] as any, ([x, y]: any) => `radial-gradient(600px circle at ${x} ${y}, rgba(232,121,249,0.18), transparent 60%)`) }}
            />

            <div className="relative grid gap-12 lg:gap-16 lg:grid-cols-[1.15fr_1fr] items-start">
              {/* LEFT — editorial copy */}
              <div className="min-w-0">
                <h3 className="font-display text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.08] text-white mb-6">
                  Frontend developer <span className="text-white/50">&</span><br />
                  WordPress specialist crafting<br />
                  <span className="text-gradient">premium digital experiences.</span>
                </h3>

                <p className="text-[17px] sm:text-xl text-[var(--muted-foreground)] leading-relaxed mb-5 max-w-[52ch]">
                  I architect interfaces that strike the balance between beautiful and functional —
                  thoughtful design, clean code, and meticulous detail that elevates every interaction.
                </p>
                <p className="text-[15px] sm:text-[17px] text-[var(--muted-foreground)]/85 leading-relaxed mb-8 max-w-[52ch]">
                  Over <strong className="text-white">5+ years</strong>, I've partnered with founders, agencies,
                  and brands to ship websites that feel premium, load fast, and convert.
                </p>

                <div className="flex flex-wrap gap-3">
                  <a href="#projects" className="btn-primary !py-3 !px-6 text-sm">Explore my work <ArrowUpRight size={16} /></a>
                  <a href="#contact" className="btn-ghost !py-3 !px-6 text-sm">Start a project</a>
                </div>
              </div>

              {/* RIGHT — four uniquely-treated statistics */}
              <div className="grid grid-cols-2 gap-4 sm:gap-5">
                {/* 01 — Years: outlined numeral inside a slow-spinning ring */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7 }}
                  className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.02] p-5 sm:p-6"
                >
                  <div aria-hidden className="absolute -right-10 -top-10 h-32 w-32 rounded-full border border-dashed border-[var(--neon)]/30 spin-slow" />
                  <Award size={20} className="mb-4 text-[var(--neon)]" />
                  <div
                    className="font-display text-[clamp(2.5rem,4.4vw,3.5rem)] leading-none tracking-tight text-transparent transition-all duration-500 group-hover:text-white"
                    style={{ WebkitTextStroke: "1.5px rgba(192,132,252,0.9)" }}
                  >
                    <AboutCounter to={5} suffix="+" />
                  </div>
                  <div className="mt-3 text-[12px] uppercase tracking-[0.24em] text-[var(--muted-foreground)]">Years Experience</div>
                </motion.div>

                {/* 02 — Projects: solid gradient plate with grid texture */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay: 0.08 }}
                  className="group relative overflow-hidden rounded-[26px] p-5 sm:p-6 transition-transform duration-500 hover:-translate-y-1"
                  style={{ background: "linear-gradient(150deg, rgba(124,58,237,0.55), rgba(232,121,249,0.30))", border: "1px solid rgba(255,255,255,0.14)" }}
                >
                  <div aria-hidden className="absolute inset-0 grid-bg opacity-50" />
                  <div className="relative">
                    <Rocket size={20} className="mb-4 text-white" />
                    <div className="font-display text-[clamp(2.5rem,4.4vw,3.5rem)] font-semibold leading-none tracking-tight text-white">
                      <AboutCounter to={150} suffix="+" />
                    </div>
                    <div className="mt-3 text-[12px] uppercase tracking-[0.24em] text-white/80">Projects Shipped</div>
                  </div>
                </motion.div>

                {/* 03 — Clients: layered stacked cards */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay: 0.16 }}
                  className="group relative rounded-[26px]"
                >
                  <span aria-hidden className="absolute inset-x-3 -top-2 h-10 rounded-[22px] border border-white/10 bg-white/[0.03] transition-all duration-500 group-hover:-top-3" />
                  <div className="relative overflow-hidden rounded-[26px] glass-strong p-5 sm:p-6">
                    <div aria-hidden className="absolute -bottom-12 -left-8 h-28 w-28 rounded-full bg-[var(--cyan)]/25 blur-2xl" />
                    <div className="relative">
                      <div className="mb-4 flex -space-x-2">
                        {["#c084fc", "#e879f9", "#22d3ee"].map((c) => (
                          <span key={c} className="h-5 w-5 rounded-full border border-white/25" style={{ background: c }} />
                        ))}
                      </div>
                      <div className="font-display text-[clamp(2.5rem,4.4vw,3.5rem)] font-semibold leading-none tracking-tight text-white">
                        <AboutCounter to={60} suffix="+" />
                      </div>
                      <div className="mt-3 text-[12px] uppercase tracking-[0.24em] text-[var(--muted-foreground)]">Happy Clients</div>
                    </div>
                  </div>
                </motion.div>

                {/* 04 — Delivery: progress arc treatment */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay: 0.24 }}
                  className="group relative overflow-hidden rounded-[26px] border border-[var(--cyan)]/25 bg-[radial-gradient(120%_90%_at_100%_0%,rgba(34,211,238,0.18),transparent_60%)] p-5 sm:p-6"
                >
                  <Zap size={20} className="mb-4 text-[var(--cyan)]" />
                  <div className="font-display text-[clamp(2.5rem,4.4vw,3.5rem)] font-semibold leading-none tracking-tight text-white">
                    <AboutCounter to={99} suffix="%" />
                  </div>
                  <div className="mt-3 text-[12px] uppercase tracking-[0.24em] text-[var(--muted-foreground)]">On-Time Delivery</div>
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }} whileInView={{ width: "99%" }} viewport={{ once: true }}
                      transition={{ duration: 1.6, ease: [0.2, 0.8, 0.2, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-[var(--cyan)] to-[var(--neon)] shadow-[0_0_16px_rgba(34,211,238,0.6)]"
                    />
                  </div>
                </motion.div>
              </div>

            </div>

            {/* Workflow rail */}
            <div className="mt-12">

              <div className="mb-6 flex items-center gap-3 text-[15px] uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
                <Layers size={12} className="text-[var(--neon)]" />
                My Workflow
                <span className="ml-2 h-px flex-1 bg-white/10" />
              </div>
              <div className="relative grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <div aria-hidden className="hidden lg:block absolute top-3 left-4 right-4 h-px bg-gradient-to-r from-[var(--neon)]/40 via-[var(--pink)]/30 to-transparent" />
                {workflow.map((w, i) => (
                  <motion.div
                    key={w.n}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.6 }}
                    className="relative"
                  >
                    <div className="relative flex items-center gap-3 mb-3">
                      <span className="relative grid h-6 w-6 place-items-center rounded-full bg-[var(--background)] border border-[var(--neon)]/50">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon)] shadow-[0_0_8px_var(--neon)]" />
                      </span>
                      <span className="font-display text-sm tracking-[0.3em] text-[var(--neon)]">{w.n}</span>
                    </div>
                    <h5 className="text-white text-base font-semibold mb-1.5">{w.t}</h5>
                    <p className="text-[15px] text-[var(--muted-foreground)] leading-relaxed max-w-[28ch]">{w.d}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ───────── Services ───────── */
const SERVICES = [
  { icon: "◇", title: "Frontend Development", desc: "Clean, semantic, and performant code using HTML5, CSS3, and JavaScript. I build interfaces that move fast, scale elegantly, and feel genuinely alive.", featured: true },
  { icon: "✦", title: "UI/UX Design", desc: "Interfaces designed to solve real problems beautifully. Wireframes turned into visual systems users actually enjoy." },
  { icon: "◆", title: "WordPress Development", desc: "Custom WordPress builds using Elementor Pro, WooCommerce, and tailored CSS. Flexible, manageable, built right." },
  { icon: "◆", title: "WooCommerce Stores", desc: "E-commerce experiences that convert. Clean product layouts, optimized checkout, performance-first architecture." },
  { icon: "▭", title: "Responsive Design", desc: "Pixel-perfect on every device. Mobile-first, fluid, carefully tested across screen sizes and browsers." },
  { icon: "✧", title: "Website Redesign", desc: "Modernize outdated sites while keeping what works. A fresh identity with improved UX and performance." },
];

function Services() {
  return (
    <section id="services" className="relative py-16 sm:py-24 md:py-32">
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
  { name: "HTML5 & CSS3", pct: 100, icon: "◆", desc: "Semantic markup, modern layouts, fluid typography." },
  { name: "JavaScript", pct: 100, icon: "⟨⟩", desc: "Vanilla JS, ES6+, DOM interactions, animation logic." },
  { name: "WordPress & Elementor", pct: 100, icon: "◇", desc: "Custom themes, Elementor Pro, ACF, page-builder mastery." },
  { name: "UI/UX Design", pct: 100, icon: "✦", desc: "Wireframes, prototypes, visual systems in Figma & XD." },
  { name: "WooCommerce", pct: 100, icon: "▤", desc: "Stores, checkout flows, product templates, conversions." },
  { name: "Responsive Design", pct: 100, icon: "▢", desc: "Mobile-first layouts that adapt across every viewport." },
] as const;
const TECH = ["Figma","Adobe XD","Bootstrap","CSS Animations","ACF","SEO Basics","Cross-Browser QA","Performance Tuning","Accessibility"];

function Skills() {
  return (
    <section id="skills" className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
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
                    <div className="font-display text-2xl font-extrabold text-gradient tabular-nums">
                      <AboutCounter to={s.pct} suffix="%" />
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2 truncate">{s.name}</h3>
                  <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed mb-5">{s.desc}</p>
                  <div className="relative h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 1.5 + i * 0.12, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.09 }}
                      className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] via-[var(--pink)] to-[var(--cyan)] shadow-[0_0_18px_rgba(192,132,252,0.7)]"
                    />
                    <motion.span
                      aria-hidden
                      className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/45 to-transparent"
                      initial={{ x: "-4rem", opacity: 0 }}
                      whileInView={{ x: ["-4rem", "100%"], opacity: [0, 1, 0] }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 1.6, delay: 0.5 + i * 0.09, ease: "easeInOut" }}
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
                <span className="text-[15px] sm:text-sm uppercase tracking-[0.25em] text-[var(--muted-foreground)]">Frontend Developer</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {TECH.map((t) => (
                  <span key={t} className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/[0.04] px-3 py-1.5 text-[14px] sm:text-sm text-white/90 hover:bg-white/[0.08] hover:border-[var(--neon)]/50 transition-all">
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

function ProcessFloatDecor() {
  // Small, authentic craft artefacts — a code tag, a WP glyph, a Figma-ish node,
  // a cursor, a colour chip. Deliberately tiny so they read as texture, never
  // competing with the timeline content.
  const bits: { c: string; el: React.ReactNode; d: number; r: number }[] = [
    {
      c: "left-[4%] top-[18%]",
      d: 0,
      r: -6,
      el: (
        <span className="glass rounded-lg px-2.5 py-1 font-mono text-[12px] text-[var(--cyan)]">&lt;div/&gt;</span>
      ),
    },
    {
      c: "right-[5%] top-[14%]",
      d: 1.5,
      r: 5,
      el: (
        <span className="glass grid h-9 w-9 place-items-center rounded-full text-[13px] font-semibold text-white/80">
          WP
        </span>
      ),
    },
    {
      c: "left-[7%] top-[52%]",
      d: 3,
      r: 4,
      el: (
        <span className="glass flex items-center gap-1.5 rounded-full px-2.5 py-1.5">
          {["#c084fc", "#e879f9", "#22d3ee"].map((h) => (
            <span key={h} className="h-2.5 w-2.5 rounded-full" style={{ background: h }} />
          ))}
        </span>
      ),
    },
    {
      c: "right-[6%] top-[48%]",
      d: 2.2,
      r: -5,
      el: (
        <span className="glass block w-24 rounded-lg p-2">
          <span className="mb-1.5 block h-1 w-2/3 rounded bg-white/25" />
          <span className="mb-1.5 block h-1 w-full rounded bg-white/12" />
          <span className="block h-1 w-1/2 rounded bg-white/12" />
        </span>
      ),
    },
    {
      c: "left-[10%] bottom-[12%]",
      d: 4,
      r: 6,
      el: (
        <span className="glass rounded-lg px-2.5 py-1 font-mono text-[12px] text-[var(--neon)]">figma → code</span>
      ),
    },
    {
      c: "right-[9%] bottom-[16%]",
      d: 5,
      r: -4,
      el: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_10px_rgba(232,121,249,0.6)]">
          <path d="M4 3 L20 12 L13 13.5 L10 20 Z" fill="#e879f9" stroke="#fff" strokeWidth="0.8" />
        </svg>
      ),
    },
  ];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-25" />
      {bits.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute hidden lg:block ${b.c}`}
          animate={{ y: [0, -14, 0], rotate: [b.r, b.r * -0.5, b.r] }}
          transition={{ duration: 9 + i, repeat: Infinity, ease: "easeInOut", delay: b.d }}
        >
          {b.el}
        </motion.div>
      ))}
      {[
        { l: "20%", t: "26%", d: 0 },
        { l: "80%", t: "66%", d: 2 },
        { l: "34%", t: "82%", d: 4 },
      ].map((p, i) => (
        <motion.span
          key={`p${i}`}
          className="absolute h-1.5 w-1.5 rounded-full bg-[var(--neon)] shadow-[0_0_12px_var(--neon)]"
          style={{ left: p.l, top: p.t }}
          animate={{ y: [0, -18, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: p.d }}
        />
      ))}
    </div>
  );
}

function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 30%"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <section id="process" className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.08),transparent_70%)]" aria-hidden />
      <div className="absolute top-1/4 left-10 h-72 w-72 rounded-full bg-[var(--primary)]/10 blur-3xl float-y" aria-hidden />
      <div className="absolute bottom-1/4 right-10 h-72 w-72 rounded-full bg-[var(--cyan)]/10 blur-3xl float-y" style={{ animationDelay: "-4s" }} aria-hidden />

      <ProcessFloatDecor />

      <div className="container-x relative">
        <div className="mb-16 sm:mb-20 text-center">
          <Reveal className="flex justify-center"><SectionTag>My Process</SectionTag></Reveal>
          <Reveal delay={0.1}>
            <h2 className="leading-[1.05]">How I turn ideas<br /><span className="text-gradient">into experiences.</span></h2>
          </Reveal>
        </div>

        <div ref={ref} className="relative max-w-5xl mx-auto">
          {/* Timeline rail — left on mobile, centered from md up */}
          <div className="absolute left-5 md:left-1/2 md:-translate-x-1/2 top-0 h-full w-px bg-white/5" aria-hidden />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-5 md:left-1/2 md:-translate-x-1/2 top-0 w-px bg-gradient-to-b from-[var(--primary)] via-[var(--pink)] to-[var(--cyan)] shadow-[0_0_16px_var(--neon)]"
          />

          <div className="space-y-8 sm:space-y-12">
            {STEPS.map((s, i) => {
              const right = i % 2 === 1;
              return (
                <Reveal key={s.n} delay={i * 0.05}>
                  <div
                    className="relative pl-14 md:pl-0 md:grid md:grid-cols-2 md:gap-12"
                  >
                    {/* Node dot */}
                    <div className="absolute left-5 md:left-1/2 top-6 -translate-x-1/2 z-10">
                      <div className="relative grid h-5 w-5 place-items-center rounded-full bg-[var(--neon)] shadow-[0_0_18px_var(--neon)] ring-4 ring-[var(--background)]">
                        <div className="absolute inset-0 rounded-full bg-[var(--neon)] animate-ping opacity-60" />
                      </div>
                    </div>

                    <div className={`glass-strong relative overflow-hidden rounded-3xl p-6 sm:p-8 text-left group hover:-translate-y-1 hover:shadow-[0_30px_80px_-30px_rgba(192,132,252,0.5)] transition-all duration-500 ${right ? "md:col-start-2" : ""}`}>
                      <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-[var(--primary)]/25 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                        padding: 1,
                        background: "linear-gradient(135deg, rgba(192,132,252,0.4), rgba(34,211,238,0.15), rgba(232,121,249,0.4))",
                        WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                      } as React.CSSProperties} />

                      <div className="relative">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="font-display text-4xl sm:text-5xl font-extrabold text-gradient leading-none">{s.n}</span>
                          <span className="text-2xl text-[var(--neon)]">{s.icon}</span>
                        </div>
                        <h3 className="mb-3 text-lg sm:text-xl font-semibold text-white text-left">{s.title}</h3>
                        <p className="text-sm text-[var(--muted-foreground)] leading-relaxed text-left max-w-[54ch]">{s.desc}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── PROJECTS — cinematic case-study redesign ───────── */
const PROJECTS = [
  { glyph: "◆", label: "WooCommerce · WordPress", name: "Luxury Brand E-Commerce Store", desc: "A full-featured WooCommerce store with custom product pages, optimized checkout, and a premium identity that lifted conversions by 38%.", tags: ["WordPress","WooCommerce","Elementor","Custom CSS"], grad: "linear-gradient(135deg,rgba(124,58,237,0.6),rgba(232,121,249,0.4))", large: true, metric: "+38% Conv." },
  { glyph: "✦", label: "UI/UX · Frontend", name: "SaaS Dashboard Redesign", desc: "A full visual overhaul — cleaner hierarchy, modern components, reduced user drop-off by 52%.", tags: ["Figma","HTML/CSS","JS"], grad: "linear-gradient(135deg,rgba(34,211,238,0.4),rgba(124,58,237,0.4))", metric: "-52% Drop-off" },
  { glyph: "◈", label: "Landing Page · Frontend", name: "Animated Product Launch", desc: "High-converting launch page with scroll-triggered animations, spotlight effects, and fully responsive design.", tags: ["HTML5","CSS3","GSAP"], grad: "linear-gradient(135deg,rgba(232,121,249,0.4),rgba(34,211,238,0.3))", metric: "Cinematic" },
  { glyph: "◎", label: "WordPress · Brand", name: "Corporate Website Rebuild", desc: "Full WordPress rebuild with custom Elementor templates, optimized performance, brand-focused design across 20+ pages.", tags: ["WordPress","Elementor Pro","SEO"], grad: "linear-gradient(135deg,rgba(124,58,237,0.5),rgba(34,211,238,0.3))", metric: "20+ Pages" },
  { glyph: "⬡", label: "UI Design · Frontend", name: "Agency Portfolio Website", desc: "Dark luxury aesthetic with cinematic scroll animations, glassmorphism UI components, and fully responsive layouts.", tags: ["HTML/CSS","JavaScript","Animations"], grad: "linear-gradient(135deg,rgba(232,121,249,0.5),rgba(124,58,237,0.3))", metric: "Awwwards-feel" },
];

function Projects() {
  const [active, setActive] = useState(0);
  const p = PROJECTS[active];
  const stageRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [5, -5]), { stiffness: 120, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 120, damping: 20 });

  return (
    <section id="projects" className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10" aria-hidden style={{
        background:
          "radial-gradient(900px 500px at 85% 5%, rgba(124,58,237,0.18), transparent 60%)," +
          "radial-gradient(700px 400px at 10% 90%, rgba(34,211,238,0.10), transparent 60%)",
      }} />

      <div className="container-x relative">
        {/* Editorial header */}
        <div className="mb-12 sm:mb-16 grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div className="min-w-0">
            <Reveal className="flex"><SectionTag>Selected Work · 2020–2026</SectionTag></Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 leading-[1.02]">
                Projects that<br /><span className="text-gradient">speak louder.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-xs text-[15px] leading-relaxed text-[var(--muted-foreground)] md:text-right">
              Five case studies in commerce, product and brand — hover the index to explore.
            </p>
          </Reveal>
        </div>

        {/* Showcase — stage + index */}
        <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10 items-stretch">
          {/* STAGE */}
          <motion.div
            ref={stageRef}
            onMouseMove={(e) => {
              const r = stageRef.current!.getBoundingClientRect();
              mx.set((e.clientX - r.left) / r.width);
              my.set((e.clientY - r.top) / r.height);
            }}
            onMouseLeave={() => { mx.set(0.5); my.set(0.5); }}
            style={{ rotateX: rx, rotateY: ry, transformPerspective: 1800 }}
            className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-[32px] glass-strong"
          >
            <div className="pointer-events-none absolute inset-0 z-20 rounded-[32px]" style={{
              padding: 1,
              background: "linear-gradient(135deg, rgba(192,132,252,0.55), rgba(34,211,238,0.2), rgba(232,121,249,0.55))",
              WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            } as React.CSSProperties} aria-hidden />

            <div className="relative h-64 shrink-0 sm:h-80 lg:h-[26rem] overflow-hidden">
              <motion.div
                key={p.name}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                className="absolute inset-0"
                style={{ background: p.grad }}
              >
                <div className="absolute inset-0 grid-bg opacity-40" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(2,2,7,0.6)_100%)]" />
                <div className="absolute inset-0 grid place-items-center text-[7rem] sm:text-[9rem] opacity-30">{p.glyph}</div>
              </motion.div>

              <motion.div
                className="absolute bottom-6 right-6 rounded-2xl glass-strong px-4 py-3"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="text-[14px] uppercase tracking-[0.28em] text-white/70">Result</div>
                <div className="font-display text-xl text-white leading-tight">{p.metric}</div>
              </motion.div>
              <div className="absolute top-6 left-6 rounded-full glass px-4 py-2 text-[12px] uppercase tracking-[0.24em] text-white/85">
                {p.label}
              </div>
            </div>

            <motion.div
              key={`${p.name}-body`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="relative flex-1 p-6 sm:p-8"
            >
              <h3 className="font-display text-2xl sm:text-3xl text-white leading-tight mb-3">{p.name}</h3>
              <p className="text-[15px] sm:text-base text-[var(--muted-foreground)] leading-relaxed max-w-[56ch]" style={{ marginBottom: 20 }}>
                {p.desc}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-full border border-[var(--border)] bg-white/[0.04] px-3 py-1.5 text-[12px] uppercase tracking-wider text-[var(--muted-foreground)]">{t}</span>
                ))}
                <a href="#contact" className="ml-auto inline-flex items-center gap-1.5 text-[14px] text-white/80 hover:text-[var(--neon)] transition-colors">
                  Discuss a similar project <ArrowUpRight size={15} />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* INDEX */}
          <div className="flex h-full min-w-0 flex-col">
            <div className="mb-4 flex items-center gap-3 text-[12px] uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
              <span className="h-px w-8 bg-[var(--neon)]" />
              Case index
              <span className="ml-auto font-display text-white/70">
                {String(active + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
              </span>
            </div>

            <div className="flex flex-1 flex-col">
              {PROJECTS.map((item, i) => {
                const isActive = i === active;
                return (
                  <motion.button
                    key={item.name}
                    type="button"
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ delay: 0.05 * i, duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className={`group relative flex-1 w-full max-w-full overflow-hidden border-b border-white/10 px-3 sm:px-4 py-5 text-left transition-colors duration-500 ${isActive ? "bg-white/[0.05]" : "hover:bg-white/[0.025]"}`}
                  >
                    <span
                      aria-hidden
                      className={`absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-[var(--neon)] via-[var(--pink)] to-[var(--cyan)] transition-transform duration-500 origin-top ${isActive ? "scale-y-100" : "scale-y-0"}`}
                    />
                    <div className="relative flex items-center gap-4">
                      <span className={`font-display text-[15px] tracking-[0.28em] w-8 shrink-0 transition-colors ${isActive ? "text-[var(--neon)]" : "text-white/40"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl text-xl transition-all duration-500 ${isActive ? "scale-110 bg-gradient-to-br from-[var(--primary)]/50 to-[var(--pink)]/35" : "bg-white/[0.04]"}`}>
                        {item.glyph}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className={`block truncate text-[16px] font-semibold transition-colors ${isActive ? "text-white" : "text-white/75"}`}>
                          {item.name}
                        </span>
                        <span className="block truncate text-[15px] text-[var(--muted-foreground)]">{item.label}</span>
                      </span>
                      <ArrowUpRight
                        size={17}
                        className={`shrink-0 transition-all duration-500 ${isActive ? "text-[var(--neon)] translate-x-0 opacity-100" : "text-white/25 -translate-x-2 opacity-0"}`}
                      />
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-6">
              <a href="#contact" className="btn-ghost !py-3 !px-6 text-sm w-full sm:w-auto">Start your project <ArrowUpRight size={16} /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── Why Me ───────── */
const WHY = [
  ["◉","Purpose-Driven Design","Every decision is grounded in user behavior and business goals. I design for results, not aesthetics alone."],
  ["◇","Speed Without Compromise","Fast delivery, clean code, optimized performance. I move efficiently without cutting craftsmanship."],
  ["◍","Clear Communication","Transparent timelines, regular updates, honest feedback. You always know where your project stands."],
  ["◫","Pixel-Perfect Precision","I obsess over the details — spacing, rhythm, timing — the things that separate good from exceptional."],
  ["◈","Modern Practices","Always current with web trends, CSS techniques, WordPress updates. Built for today, ready for tomorrow."],
  
] as const;

function Why() {
  const [active, setActive] = useState(0);

  return (
    <section id="why" className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0 -z-10" aria-hidden style={{
        background:
          "radial-gradient(700px 400px at 15% 15%, rgba(232,121,249,0.14), transparent 60%)," +
          "radial-gradient(800px 500px at 90% 85%, rgba(34,211,238,0.10), transparent 60%)",
      }} />
      {/* Floating decorative shapes */}
      <motion.div
        aria-hidden
        className="absolute top-16 right-[8%] hidden md:block h-32 w-32 rounded-3xl glass-strong"
        animate={{ y: [0, -20, 0], rotate: [-6, 4, -6] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-24 left-[6%] hidden md:block h-24 w-24 rounded-full border border-[var(--neon)]/30"
        animate={{ y: [0, 18, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] items-start">
          {/* LEFT — editorial */}
          <div className="min-w-0">
            <Reveal><SectionTag>Why Work With Me</SectionTag></Reveal>
            <Reveal delay={0.08}>
              <h2 className="leading-[1.02] mt-4">
                Every project<br />
                <span className="italic font-display text-white/50">deserves</span><br />
                <span className="text-gradient">an obsession.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-md text-base text-[var(--muted-foreground)] leading-relaxed">
                Five reasons founders and studios choose me — beyond the pixel.
                Hover any principle to see how it shows up in the work.
              </p>
            </Reveal>

            {/* Featured "spotlight" panel — mirrors the active item */}
            <Reveal delay={0.24}>
              <div className="relative mt-8 glass-strong rounded-[28px] p-6 sm:p-8 overflow-hidden">
                <div className="pointer-events-none absolute inset-0 rounded-[28px]" style={{
                  padding: 1,
                  background: "linear-gradient(135deg, rgba(192,132,252,0.5), rgba(34,211,238,0.2), rgba(232,121,249,0.5))",
                  WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                } as React.CSSProperties} aria-hidden />
                <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[var(--primary)]/30 blur-3xl" aria-hidden />
                <div className="relative">
                  <div className="mb-4 text-[15px] uppercase tracking-[0.32em] text-[var(--neon)]">
                    Principle · 0{active + 1} / 0{WHY.length}
                  </div>
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.5 }}
                    className="flex items-start gap-4"
                  >
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[var(--primary)]/45 to-[var(--pink)]/30 text-3xl">
                      {WHY[active][0]}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display text-2xl text-white leading-tight mb-2">{WHY[active][1]}</h3>
                      <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{WHY[active][2]}</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT — asymmetric interactive stack */}
          <div className="relative">
            <div className="grid gap-3 sm:gap-4">
              {WHY.map(([icon, title, text], i) => {
                const isActive = active === i;
                return (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                    className={i % 2 === 1 ? "lg:ml-6" : ""}
                  >
                    <motion.button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      animate={{ x: isActive ? 14 : 0 }}
                      transition={{ type: "spring", stiffness: 220, damping: 26, mass: 0.6 }}
                      style={{ willChange: "transform" }}
                      className={`group relative block w-full max-w-full text-left overflow-hidden rounded-2xl ${isActive ? "glass-strong" : "glass"}`}
                    >
                      <motion.span
                        className="pointer-events-none absolute inset-0 rounded-2xl"
                        animate={{ opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        style={{
                          padding: 1,
                          background: "linear-gradient(90deg, rgba(192,132,252,0.6), rgba(34,211,238,0.3), rgba(232,121,249,0.6))",
                          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                          WebkitMaskComposite: "xor",
                          maskComposite: "exclude",
                        } as React.CSSProperties}
                        aria-hidden
                      />
                      <div className="relative flex items-center gap-4 p-4 sm:p-5">
                        <span className={`font-display text-sm tracking-[0.3em] w-8 shrink-0 transition-colors duration-500 ${isActive ? "text-[var(--neon)]" : "text-white/40"}`}>
                          0{i + 1}
                        </span>
                        <motion.div
                          animate={{ scale: isActive ? 1.08 : 1 }}
                          transition={{ type: "spring", stiffness: 220, damping: 24 }}
                          className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl text-2xl transition-colors duration-500 ${isActive ? "bg-gradient-to-br from-[var(--primary)]/50 to-[var(--pink)]/35" : "bg-white/[0.04]"}`}
                        >
                          {icon}
                        </motion.div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm sm:text-base font-semibold text-white truncate">{title}</div>
                          <motion.div
                            className="mt-1 text-[13px] leading-relaxed text-[var(--muted-foreground)]"
                            animate={{ opacity: isActive ? 1 : 0.55 }}
                            transition={{ duration: 0.45, ease: "easeOut" }}
                          >
                            {text}
                          </motion.div>
                        </div>
                        <motion.span
                          className="shrink-0 text-[var(--neon)]"
                          animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -8 }}
                          transition={{ duration: 0.45, ease: "easeOut" }}
                          aria-hidden
                        >
                          <ArrowUpRight size={16} />
                        </motion.span>
                      </div>
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>
          </div>
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
    <section id="testimonials" className="relative py-16 sm:py-24 md:py-32">
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
                    <div className="text-sm text-[var(--muted-foreground)] truncate">{t.role}</div>
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

/* ───────── Contact — 3D floating glass console ───────── */
function Field3D({ as, label, index, ...props }: any) {
  const Cmp = as || "input";
  return (
    <label className="group relative block" style={{ transform: "translateZ(28px)" }}>
      <span className="mb-2 flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.3em] text-white">
        <span className="text-[var(--neon)]">{index}</span>
        {label}
      </span>
      <div className="relative rounded-2xl border border-white/10 bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_40px_-24px_rgba(0,0,0,0.9)] transition-all duration-500 focus-within:border-[var(--neon)]/50 focus-within:bg-white/[0.06] focus-within:shadow-[0_0_0_1px_rgba(192,132,252,0.25),0_26px_60px_-28px_rgba(192,132,252,0.55)]">
        <Cmp
          {...props}
          className="peer w-full resize-none rounded-2xl bg-transparent px-4 py-3.5 text-[16px] text-white placeholder:text-white/25 outline-none"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-4 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-[var(--neon)] via-[var(--pink)] to-[var(--cyan)] transition-transform duration-500 peer-focus:scale-x-100"
        />
      </div>
    </label>
  );
}

function ContactOrb({ className, delay = 0, size = 90 }: { className?: string; delay?: number; size?: number }) {
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute hidden md:block rounded-full ${className ?? ""}`}
      style={{
        width: size,
        height: size,
        background:
          "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.85), rgba(192,132,252,0.55) 34%, rgba(124,58,237,0.18) 62%, transparent 72%)",
        boxShadow: "0 30px 60px -30px rgba(124,58,237,0.8), inset 0 -8px 24px rgba(0,0,0,0.5)",
        filter: "blur(0.3px)",
      }}
      animate={{ y: [0, -18, 0], rotate: [0, 12, 0] }}
      transition={{ duration: 12, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const srx = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 120, damping: 18 });
  const sry = useSpring(useTransform(mx, [0, 1], [-9, 9]), { stiffness: 120, damping: 18 });
  const glowX = useTransform(mx, (v) => `${v * 100}%`);
  const glowY = useTransform(my, (v) => `${v * 100}%`);

  const onMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => { mx.set(0.5); my.set(0.5); };

  return (
    <section id="contact" className="relative py-16 md:py-32 overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            "radial-gradient(1100px 560px at 50% 110%, rgba(124,58,237,0.24), transparent 62%)," +
            "radial-gradient(680px 380px at 10% 4%, rgba(232,121,249,0.12), transparent 62%)",
        }}
      />

      <ContactOrb className="left-[4%] top-[18%]" size={110} />
      <ContactOrb className="right-[5%] top-[30%]" size={64} delay={2.5} />
      <ContactOrb className="left-[10%] bottom-[10%]" size={48} delay={4.5} />

      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal><div className="flex justify-center"><SectionTag>Get In Touch</SectionTag></div></Reveal>
          <Reveal delay={0.08}>
            <h2 className="leading-[1.04]">
              Say hello, <span className="text-gradient">and let&apos;s make it real.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-[var(--muted-foreground)]">
              Four lines below, or reach me directly — either way you get a considered
              reply within one business day.
            </p>
          </Reveal>
        </div>

        {/* 3D console */}
        <div className="mt-12 md:mt-16 [perspective:1600px]">
          <Reveal>
            <motion.div
              ref={cardRef}
              onMouseMove={onMove}
              onMouseLeave={onLeave}
              style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
              className="relative mx-auto w-full max-w-4xl rounded-[32px] border border-white/12 bg-gradient-to-br from-white/[0.09] to-white/[0.02] p-6 sm:p-10 md:p-14 backdrop-blur-2xl shadow-[0_60px_120px_-50px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.14)]"
            >
              {/* cursor glow */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[32px] opacity-70"
                style={{
                  background: useTransform(
                    [glowX, glowY],
                    ([x, y]) =>
                      `radial-gradient(420px 300px at ${x} ${y}, rgba(192,132,252,0.16), transparent 70%)`,
                  ),
                }}
              />
              {/* edge highlight */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[32px]"
                style={{ boxShadow: "inset 0 -30px 60px -40px rgba(232,121,249,0.5)" }}
              />

              <form
                className="relative grid gap-6"
                style={{ transformStyle: "preserve-3d" }}
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field3D index="01" label="Your name" placeholder="Jane Doe" name="name" autoComplete="name" required />
                  <Field3D index="02" label="Email" type="email" placeholder="you@company.com" name="email" autoComplete="email" required />
                </div>
                <Field3D index="03" label="What you need" placeholder="WordPress site, landing page, UI design…" name="scope" />
                <Field3D index="04" label="The story" as="textarea" rows={4} placeholder="Tell me about the project, timeline and budget range…" name="message" />

                <div
                  className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 pt-2"
                  style={{ transform: "translateZ(46px)" }}
                >
                  <button
                    type="submit"
                    disabled={sent}
                    className="group inline-flex items-center gap-4 font-button text-[15px] uppercase tracking-[0.22em] text-white disabled:opacity-70"
                  >
                    <span className="relative">
                      {sent ? "Message sent" : "Send it over"}
                      <span className="absolute -bottom-1 left-0 h-px w-full origin-left bg-gradient-to-r from-[var(--neon)] to-[var(--cyan)] transition-transform duration-500 group-hover:scale-x-0" />
                    </span>
                    <span className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/[0.04] shadow-[0_18px_36px_-18px_rgba(192,132,252,0.8)] transition-all duration-500 group-hover:border-transparent group-hover:bg-gradient-to-br group-hover:from-[var(--primary)] group-hover:to-[var(--pink)] group-hover:rotate-45">
                      <ArrowUpRight size={18} />
                    </span>
                  </button>
                  <span className="text-[14px] text-white/45">
                    {sent ? "Thanks — I'll be in touch shortly." : "Usually replies in under 24 hours."}
                  </span>
                </div>
              </form>
            </motion.div>
          </Reveal>
        </div>

        {/* Floating direct-line chips */}
        <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-2">
          <Reveal delay={0.08}>
            <a
              href="mailto:hooria.webdesigns@gmail.com"
              className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-xl shadow-[0_30px_60px_-40px_rgba(0,0,0,0.9)] transition-all duration-500 hover:-translate-y-1 hover:border-[var(--neon)]/40"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[var(--primary)]/40 to-[var(--pink)]/25 text-[var(--neon)]">
                <Mail size={16} />
              </span>
              <span className="min-w-0">
                <span className="block text-[12px] uppercase tracking-[0.24em] text-white/45">Email</span>
                <span className="block truncate text-[16px] text-white/90 group-hover:text-[var(--neon)]">hooria.webdesigns@gmail.com</span>
              </span>
            </a>
          </Reveal>
          <Reveal delay={0.16}>
            <a
              href="https://www.linkedin.com/in/hooria-azam-web-developer/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-xl shadow-[0_30px_60px_-40px_rgba(0,0,0,0.9)] transition-all duration-500 hover:-translate-y-1 hover:border-[var(--cyan)]/40"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[var(--cyan)]/35 to-[var(--primary)]/25 text-[var(--cyan)]">
                <Linkedin size={16} />
              </span>
              <span className="min-w-0">
                <span className="block text-[12px] uppercase tracking-[0.24em] text-white/45">LinkedIn</span>
                <span className="block truncate text-[16px] text-white/90 group-hover:text-[var(--cyan)]">/in/hooria-azam-web-developer</span>
              </span>
            </a>
          </Reveal>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3 text-[13px] uppercase tracking-[0.24em] text-white/60">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Booking new projects
        </div>
      </div>
    </section>
  );
}


/* ───────── FOOTER — floating 3D glassmorphism card ───────── */
function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [3, -3]), { stiffness: 120, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-4, 4]), { stiffness: 120, damping: 20 });
  const lx = useTransform(mx, (v) => `${v * 100}%`);
  const ly = useTransform(my, (v) => `${v * 100}%`);

  const nav: [string, string][] = [
    ["Home", "#hero"], ["About", "#about"], ["Services", "#services"],
    ["Skills", "#skills"], ["Process", "#process"], ["Projects", "#projects"],
    ["Contact", "#contact"],
  ];

  return (
    <footer className="relative pt-16 pb-10 sm:pt-24 sm:pb-14 overflow-hidden">
      {/* Layered decorative background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-[var(--primary)]/12 blur-3xl float-y" />
        <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-[var(--pink)]/12 blur-3xl float-y" style={{ animationDelay: "-6s" }} />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square w-[70%] max-w-[900px] rounded-full border border-[rgba(192,132,252,0.06)] spin-slow" />
        {/* Floating shapes */}
        <motion.div
          className="absolute top-20 right-[10%] hidden md:block h-16 w-16 rounded-2xl glass-strong"
          animate={{ y: [0, -12, 0], rotate: [-5, 5, -5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-24 left-[8%] hidden md:block h-12 w-12 rounded-full border border-[var(--cyan)]/30"
          animate={{ y: [0, 14, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container-x relative">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          ref={ref}
          onMouseMove={(e) => {
            const r = ref.current!.getBoundingClientRect();
            mx.set((e.clientX - r.left) / r.width);
            my.set((e.clientY - r.top) / r.height);
          }}
          onMouseLeave={() => { mx.set(0.5); my.set(0.5); }}
          style={{ rotateX: rx, rotateY: ry, transformPerspective: 1600, transformStyle: "preserve-3d" }}
          className="relative glass-strong rounded-[36px] p-8 sm:p-12 md:p-14 overflow-hidden badge-float shadow-[0_70px_140px_-60px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.12)]"
        >
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{ background: useTransform([lx, ly] as any, ([x, y]: any) => `radial-gradient(600px circle at ${x} ${y}, rgba(192,132,252,0.16), transparent 60%)`) }}
            aria-hidden
          />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-[60%] rounded-full bg-[var(--neon)]/25 blur-3xl pointer-events-none" aria-hidden />
          {/* animated sheen sweep */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
            animate={{ x: ["-40%", "340%"] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
          />
          <div className="pointer-events-none absolute inset-0 rounded-[36px]" style={{
            padding: 1,
            background: "linear-gradient(135deg, rgba(192,132,252,0.5), rgba(34,211,238,0.25), rgba(232,121,249,0.5))",
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }} aria-hidden />

          {/* CONTENT GRID */}
          <div
            className="relative grid gap-10 lg:gap-16 md:grid-cols-[1.15fr_1fr] items-start"
            style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
          >
            {/* About */}
            <div className="min-w-0">
              <motion.div
                className="mb-5"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                style={{ transform: "translateZ(30px)" }}
              >
                <Logo variant="full" tone="gradient" />
              </motion.div>
              <p className="max-w-md text-sm text-[var(--muted-foreground)] leading-relaxed">
                A frontend studio of one, crafting premium websites and interfaces for founders,
                agencies, and brands worldwide. Karachi → Everywhere.
              </p>
            </div>

            {/* Nav */}
            <div className="min-w-0" style={{ transform: "translateZ(24px)" }}>
              <div className="mb-4 text-[15px] uppercase tracking-[0.28em] text-[var(--neon)]">Navigate</div>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                {nav.map(([l, h]) => (
                  <li key={l}>
                    <a href={h} className="group inline-flex items-center gap-2 text-sm text-white/85 hover:text-[var(--neon)] transition-all duration-300 hover:translate-x-1">
                      <span className="h-px w-3 bg-current opacity-0 group-hover:opacity-100 group-hover:w-5 transition-all" />
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="relative mt-12 pt-6">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--neon)]/50 to-transparent" aria-hidden />
            <div className="grid gap-3 sm:grid-cols-3 items-center text-[14px] sm:text-sm text-[var(--muted-foreground)]">
              <div className="text-center sm:text-left">© 2026 Hooria Azam. All Rights Reserved.</div>
              <div className="text-center">Designed &amp; Developed with Passion.</div>
              <div className="flex sm:justify-end justify-center">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="group inline-flex items-center gap-2 rounded-full glass px-4 py-2 hover:border-[var(--neon)]/60 hover:shadow-[0_0_20px_rgba(192,132,252,0.4)] transition-all"
                  aria-label="Back to top"
                >
                  <span className="group-hover:text-[var(--neon)] transition-colors">Back to Top</span>
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-white/5 group-hover:bg-[var(--neon)]/20 group-hover:rotate-45 transition-all duration-300">
                    <ArrowUp className="h-3 w-3" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
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

      <Why />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
