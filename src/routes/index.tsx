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
    <div className="mb-6 inline-flex items-center gap-3 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[var(--muted-foreground)]">
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
  const heroOpacity = useTransform(scrollY, [0, 700], [1, 0]);
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
      style={{ opacity: heroOpacity, y: heroY }}
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
            <div className="glass-strong inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-[10px] sm:text-xs uppercase tracking-[0.28em] text-white/95 shadow-[0_0_30px_rgba(192,132,252,0.25)]">
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
            <div className="font-display italic text-lg sm:text-2xl md:text-3xl tracking-[0.04em] shimmer-text">
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
        <span className="text-[11px] font-medium text-white/95 whitespace-nowrap">{label}</span>
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

  const stats = [
    { Icon: Award, value: 5, suffix: "+", label: "Years Experience" },
    { Icon: Rocket, value: 150, suffix: "+", label: "Projects Shipped" },
    { Icon: Target, value: 60, suffix: "+", label: "Happy Clients" },
    { Icon: Zap, value: 99, suffix: "%", label: "On-Time Delivery" },
  ];

  const pillars = [
    { tag: "UI", Icon: Palette, title: "Interface Design", desc: "Considered systems, fluid spacing, premium typography." },
    { tag: "FE", Icon: Code2, title: "Frontend Engineering", desc: "Semantic, accessible, GPU-friendly motion at 60fps." },
    { tag: "WP", Icon: Globe, title: "WordPress & Woo", desc: "Custom themes, Elementor Pro, scalable commerce." },
    { tag: "MX", Icon: Wand2, title: "Micro-interactions", desc: "Spring physics & cinematic detail that delights." },
  ];

  const workflow = [
    { n: "01", t: "Discover", d: "Understand goals, audience, and the story to tell." },
    { n: "02", t: "Design",   d: "Craft a visual system rooted in clarity and feeling." },
    { n: "03", t: "Build",    d: "Engineer clean, performant, animation-ready code." },
    { n: "04", t: "Polish",   d: "Refine every detail until it feels effortless." },
  ];

  return (
    <section id="about" ref={secRef} className="relative py-28 md:py-40 overflow-hidden">
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
            <div className="mt-6 flex items-center gap-4 text-xs uppercase tracking-[0.32em] text-[var(--muted-foreground)]">
              <span className="h-px w-10 bg-[var(--neon)]/60" />
              A frontend studio of one · Karachi → Worldwide
            </div>
          </Reveal>
        </div>

        {/* 3D Layered composition */}
        <div className="relative">
          {/* Back plate — huge signature wordmark */}
          <div aria-hidden className="absolute -top-10 left-1/2 -translate-x-1/2 w-[120%] pointer-events-none select-none opacity-[0.06]">
            <div className="font-display text-[clamp(6rem,18vw,20rem)] leading-[0.8] tracking-tighter text-white text-center whitespace-nowrap">
              HOORIA·AZAM
            </div>
          </div>

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

            {/* Corner luxury glyphs */}
            <div className="absolute top-6 right-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
              <Sparkle size={12} className="text-[var(--neon)]" />
              Est. 2020
            </div>

            <div className="relative grid gap-12 lg:gap-16 lg:grid-cols-[1.15fr_1fr] items-start">
              {/* LEFT — editorial copy */}
              <div className="min-w-0">
                <div className="mb-8 font-display italic text-lg text-white/90">
                  Hooria Azam
                  <span className="ml-3 text-[10px] not-italic uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
                    Frontend · WordPress · UI
                  </span>
                </div>

                <h3 className="font-display text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.08] text-white mb-6">
                  Frontend developer <span className="text-white/50">&</span><br />
                  WordPress specialist crafting<br />
                  <span className="text-gradient">premium digital experiences.</span>
                </h3>

                <p className="text-base sm:text-lg text-[var(--muted-foreground)] leading-relaxed mb-4 max-w-[52ch]">
                  I architect interfaces that strike the balance between beautiful and functional —
                  thoughtful design, clean code, and meticulous detail that elevates every interaction.
                </p>
                <p className="text-sm sm:text-base text-[var(--muted-foreground)]/85 leading-relaxed mb-8 max-w-[52ch]">
                  Over <strong className="text-white">5+ years</strong>, I've partnered with founders, agencies,
                  and brands to ship websites that feel premium, load fast, and convert.
                </p>

                <div className="flex flex-wrap gap-3">
                  <a href="#projects" className="btn-primary !py-3 !px-6 text-sm">Explore my work <ArrowUpRight size={16} /></a>
                  <a href="#contact" className="btn-ghost !py-3 !px-6 text-sm">Start a project</a>
                </div>
              </div>

              {/* RIGHT — stat pillars */}
              <div className="grid grid-cols-2 gap-4 sm:gap-5">
                {stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ delay: 0.15 + i * 0.08, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                    className="group relative overflow-hidden rounded-2xl p-5 sm:p-6"
                    style={{
                      background: "linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-[var(--neon)] via-[var(--pink)] to-[var(--cyan)] opacity-70 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute -top-14 -right-14 h-32 w-32 rounded-full bg-[var(--primary)]/25 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative">
                      <s.Icon className="mb-4 h-5 w-5 text-[var(--neon)]" size={20} />
                      <div className="font-display text-[clamp(2.25rem,4vw,3.25rem)] font-semibold text-white leading-none tracking-tight">
                        <AboutCounter to={s.value} suffix={s.suffix} />
                      </div>
                      <div className="mt-3 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[var(--muted-foreground)]">
                        {s.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Feature badges — moved below the columns, full-width responsive grid */}
            <div className="mt-10 sm:mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {["150+ Projects Shipped","Pixel-perfect Builds","Performance-first","Motion Choreography","WordPress Architect","Conversion-focused"].map((c, i) => (
                <motion.div
                  key={c}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                  className="group relative glass rounded-2xl px-3 py-3 text-center hover:-translate-y-0.5 transition-transform"
                >
                  <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "linear-gradient(135deg, rgba(192,132,252,0.14), rgba(34,211,238,0.10))" }} />
                  <span className="relative text-[10.5px] sm:text-[11px] font-medium uppercase tracking-[0.14em] text-white/85 group-hover:text-white transition-colors">
                    {c}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Divider */}
            <div className="relative my-12 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" aria-hidden />

            {/* Pillars — bento */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.7 }}
                  className="group relative overflow-hidden rounded-2xl p-5 glass hover:-translate-y-1 transition-transform duration-500"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(240px circle at 30% 0%, rgba(192,132,252,0.18), transparent 60%)" }} />
                  <div className="relative">
                    <div className="mb-4 inline-flex items-center gap-2">
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[var(--primary)]/40 to-[var(--pink)]/25 text-[10px] font-bold tracking-wider text-white">{p.tag}</span>
                      <p.Icon size={16} className="text-[var(--neon)]" />
                    </div>
                    <h4 className="text-white text-base font-semibold mb-2">{p.title}</h4>
                    <p className="text-[13px] text-[var(--muted-foreground)] leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Workflow rail */}
            <div className="mt-14">
              <div className="mb-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
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
                      <span className="font-display text-xs tracking-[0.3em] text-[var(--neon)]">{w.n}</span>
                    </div>
                    <h5 className="text-white text-base font-semibold mb-1.5">{w.t}</h5>
                    <p className="text-[13px] text-[var(--muted-foreground)] leading-relaxed max-w-[28ch]">{w.d}</p>
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

function ProcessFloatDecor() {
  // Floating premium decorative assets — wireframes, browser chrome, cursor,
  // code brackets, grid, connection lines. Purely aesthetic; positioned so they
  // never overlap the main timeline column and never break out of the section.
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* subtle grid backdrop */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Browser window — top right */}
      <motion.div
        className="absolute top-[8%] right-[6%] hidden md:block"
        animate={{ y: [0, -14, 0], rotate: [-2, 1, -2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="glass rounded-xl w-56 h-36 p-2 shadow-[0_20px_60px_-20px_rgba(192,132,252,0.4)]">
          <div className="flex gap-1.5 mb-2">
            <span className="h-2 w-2 rounded-full bg-[#ff6b6b]/70" />
            <span className="h-2 w-2 rounded-full bg-[#feca57]/70" />
            <span className="h-2 w-2 rounded-full bg-[#48dbfb]/70" />
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 w-3/4 rounded bg-white/15" />
            <div className="h-1.5 w-1/2 rounded bg-white/10" />
            <div className="mt-3 grid grid-cols-3 gap-1.5">
              <div className="h-6 rounded bg-gradient-to-br from-[var(--primary)]/40 to-[var(--pink)]/20" />
              <div className="h-6 rounded bg-white/5" />
              <div className="h-6 rounded bg-white/5" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Wireframe card — bottom left */}
      <motion.div
        className="absolute bottom-[10%] left-[5%] hidden md:block"
        animate={{ y: [0, 18, 0], rotate: [3, -1, 3] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="glass rounded-xl w-44 h-52 p-3">
          <div className="h-16 w-full rounded-lg bg-gradient-to-br from-[var(--primary)]/25 to-[var(--cyan)]/15 mb-3" />
          <div className="space-y-1.5">
            <div className="h-1.5 w-full rounded bg-white/15" />
            <div className="h-1.5 w-5/6 rounded bg-white/10" />
            <div className="h-1.5 w-2/3 rounded bg-white/10" />
          </div>
          <div className="mt-4 flex gap-2">
            <div className="h-5 w-14 rounded-full bg-gradient-to-r from-[var(--primary)]/50 to-[var(--pink)]/40" />
            <div className="h-5 w-10 rounded-full bg-white/5 border border-white/10" />
          </div>
        </div>
      </motion.div>

      {/* Code snippet — middle right */}
      <motion.div
        className="absolute top-[45%] right-[8%] hidden lg:block"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: -3 }}
      >
        <div className="glass rounded-lg px-3 py-2.5 font-mono text-[10px] leading-relaxed text-white/60">
          <div><span className="text-[var(--pink)]">const</span> <span className="text-[var(--cyan)]">design</span> = ()=&gt;</div>
          <div className="pl-3"><span className="text-[var(--neon)]">craft</span>(<span className="text-white/40">'∞'</span>);</div>
        </div>
      </motion.div>

      {/* Cursor icon — floats through */}
      <motion.svg
        className="absolute top-[30%] left-[42%] hidden lg:block drop-shadow-[0_0_10px_rgba(232,121,249,0.6)]"
        width="22" height="22" viewBox="0 0 24 24" fill="none"
        animate={{ x: [0, 30, -10, 0], y: [0, -20, 15, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M4 3 L20 12 L13 13.5 L10 20 Z" fill="#e879f9" stroke="#fff" strokeWidth="0.8" />
      </motion.svg>

      {/* Floating particles */}
      {[
        { l: "18%", t: "22%", d: 0 },
        { l: "78%", t: "60%", d: 2 },
        { l: "32%", t: "78%", d: 4 },
        { l: "62%", t: "18%", d: 6 },
      ].map((p, i) => (
        <motion.span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-[var(--neon)] shadow-[0_0_12px_var(--neon)]"
          style={{ left: p.l, top: p.t }}
          animate={{ y: [0, -20, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: p.d }}
        />
      ))}

      {/* Connection lines SVG */}
      <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden>
        <defs>
          <linearGradient id="proc-line" x1="0" x2="1">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <line x1="15%" y1="20%" x2="85%" y2="30%" stroke="url(#proc-line)" strokeWidth="1" strokeDasharray="3 6" />
        <line x1="85%" y1="65%" x2="12%" y2="80%" stroke="url(#proc-line)" strokeWidth="1" strokeDasharray="3 6" />
      </svg>
    </div>
  );
}

function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 30%"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <section id="process" className="relative py-24 md:py-32 overflow-hidden">
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

        <div ref={ref} className="relative max-w-3xl mx-auto">
          {/* Timeline rail — always on the left */}
          <div className="absolute left-5 top-0 h-full w-px bg-white/5" aria-hidden />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-5 top-0 w-px bg-gradient-to-b from-[var(--primary)] via-[var(--pink)] to-[var(--cyan)] shadow-[0_0_16px_var(--neon)]"
          />

          <div className="space-y-8 sm:space-y-10">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.05}>
                <div className="relative pl-14">
                  {/* Node dot */}
                  <div className="absolute left-5 top-6 -translate-x-1/2">
                    <div className="relative grid h-5 w-5 place-items-center rounded-full bg-[var(--neon)] shadow-[0_0_18px_var(--neon)] ring-4 ring-[var(--background)]">
                      <div className="absolute inset-0 rounded-full bg-[var(--neon)] animate-ping opacity-60" />
                    </div>
                  </div>

                  {/* Card — fully left-aligned */}
                  <div className="glass-strong relative overflow-hidden rounded-3xl p-6 sm:p-8 text-left group hover:-translate-y-1 hover:shadow-[0_30px_80px_-30px_rgba(192,132,252,0.5)] transition-all duration-500">
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
  const [active, setActive] = useState(0);
  const featured = PROJECTS[0];
  const rest = PROJECTS.slice(1);

  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0 -z-10" aria-hidden style={{
        background:
          "radial-gradient(900px 500px at 85% 5%, rgba(124,58,237,0.18), transparent 60%)," +
          "radial-gradient(700px 400px at 10% 90%, rgba(34,211,238,0.10), transparent 60%)",
      }} />
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[var(--pink)]/12 blur-3xl float-y" aria-hidden />

      <div className="container-x relative">
        <div className="mb-14 sm:mb-16 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:gap-6">
          <div className="min-w-0">
            <Reveal><SectionTag>Featured Work · 2020–2026</SectionTag></Reveal>
            <Reveal delay={0.1}>
              <h2 className="leading-[1.05]">Projects that<br /><span className="text-gradient">speak louder.</span></h2>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="shrink-0">
            <a href="#contact" className="btn-ghost !py-2.5 !px-4 sm:!py-3 sm:!px-6 text-xs sm:text-sm whitespace-nowrap">All Projects →</a>
          </Reveal>
        </div>

        {/* Featured hero project — cinematic full-width */}
        <Reveal>
          <FeaturedProjectCard p={featured} />
        </Reveal>

        {/* Navigation strip */}
        <div className="mt-14 sm:mt-16 mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
            <span className="h-px w-8 bg-[var(--neon)]" />
            More case studies
          </div>
          <div className="flex items-center gap-1.5">
            {rest.map((_, i) => (
              <button
                key={i}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-label={`Project ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${active === i ? "w-8 bg-[var(--neon)] shadow-[0_0_10px_var(--neon)]" : "w-3 bg-white/20 hover:bg-white/40"}`}
              />
            ))}
          </div>
        </div>

        {/* Rest — asymmetric 3D card layout */}
        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
          {rest.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06} className={i === 0 ? "lg:col-span-2" : ""}>
              <ProjectCard {...p} large={i === 0} highlight={active === i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProjectCard({ p }: { p: typeof PROJECTS[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [4, -4]), { stiffness: 120, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 120, damping: 20 });
  const lx = useTransform(mx, (v) => `${v * 100}%`);
  const ly = useTransform(my, (v) => `${v * 100}%`);

  return (
    <motion.article
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onMouseLeave={() => { mx.set(0.5); my.set(0.5); }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1600 }}
      className="group relative overflow-hidden rounded-[32px] glass-strong"
    >
      {/* Gradient hairline */}
      <div className="pointer-events-none absolute inset-0 rounded-[32px]" style={{
        padding: 1,
        background: "linear-gradient(135deg, rgba(192,132,252,0.55), rgba(34,211,238,0.2), rgba(232,121,249,0.55))",
        WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
      } as React.CSSProperties} aria-hidden />

      {/* Cursor spotlight */}
      <motion.div className="pointer-events-none absolute inset-0" style={{ background: useTransform([lx, ly] as any, ([x, y]: any) => `radial-gradient(500px circle at ${x} ${y}, rgba(232,121,249,0.14), transparent 60%)`) }} />

      <div className="relative grid lg:grid-cols-[1.15fr_1fr] gap-0">
        {/* Image / visual */}
        <div className="relative h-72 sm:h-96 lg:h-[30rem] overflow-hidden" style={{ background: p.grad }}>
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(2,2,7,0.55)_100%)]" />
          {/* Floating layered discs */}
          <motion.div
            className="absolute top-8 left-8 h-24 w-24 rounded-2xl glass-strong grid place-items-center text-4xl"
            animate={{ y: [0, -10, 0], rotate: [-4, 2, -4] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            {p.glyph}
          </motion.div>
          <motion.div
            className="absolute bottom-10 right-8 h-16 w-32 rounded-2xl glass-strong px-4 py-3"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="text-[9px] uppercase tracking-[0.3em] text-white/70">Result</div>
            <div className="font-display text-lg text-white leading-tight">{p.metric}</div>
          </motion.div>
          {/* Centerpiece huge glyph */}
          <div className="absolute inset-0 grid place-items-center text-[8rem] sm:text-[10rem] opacity-30 blur-[1px] group-hover:scale-110 transition-transform duration-[900ms]">{p.glyph}</div>
        </div>

        {/* Content */}
        <div className="relative p-8 sm:p-10 lg:p-12 flex flex-col">
          <div className="mb-3 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[var(--cyan)]">
            <span className="grid h-5 w-5 place-items-center rounded-full glass text-white text-[10px] font-bold">01</span>
            Featured Case Study
          </div>
          <div className="mb-2 text-[10px] uppercase tracking-[0.24em] text-[var(--muted-foreground)]">{p.label}</div>
          <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white leading-tight mb-4">{p.name}</h3>
          <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed max-w-[52ch]" style={{ marginBottom: 20 }}>
            {p.desc}
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {p.tags.map((t) => (
              <span key={t} className="rounded-full border border-[var(--border)] bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">{t}</span>
            ))}
          </div>
          <div className="mt-auto flex items-center gap-4">
            <a href="#contact" className="btn-primary !py-3 !px-6 text-sm">View Case Study <ArrowUpRight size={16} /></a>
            <a href="#contact" className="text-xs text-white/70 hover:text-[var(--neon)] transition-colors">Discuss a similar project →</a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectCard({ glyph, label, name, desc, tags, grad, large, metric, highlight }: typeof PROJECTS[number] & { highlight?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [5, -5]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 150, damping: 18 });
  return (
    <motion.article
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onMouseLeave={() => { mx.set(0.5); my.set(0.5); }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      className={`glass group relative flex h-full flex-col overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_-20px_rgba(192,132,252,0.5)] ${highlight ? "ring-1 ring-[var(--neon)]/50 shadow-[0_20px_60px_-20px_rgba(192,132,252,0.5)]" : ""}`}
    >
      <div className={`relative overflow-hidden ${large ? "h-56 sm:h-64" : "h-44 sm:h-48"}`} style={{ background: grad }}>
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(2,2,7,0.7)_100%)]" />
        {/* Layered floating card */}
        <motion.div
          className="absolute top-4 left-4 glass-strong rounded-xl px-3 py-2 text-[9px] uppercase tracking-[0.28em] text-white/80"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          {metric}
        </motion.div>
        <div className="absolute inset-0 grid place-items-center text-5xl sm:text-6xl drop-shadow-[0_0_30px_rgba(192,132,252,0.6)] transition-transform duration-[900ms] group-hover:scale-125">{glyph}</div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--background)]/85 to-transparent" />
        <div className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-black opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          <ArrowUpRight size={14} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[var(--cyan)]">{label}</div>
        <h3 className="mb-3 text-base sm:text-lg font-semibold text-white">{name}</h3>
        <p className="text-[13px] text-[var(--muted-foreground)] leading-relaxed" style={{ marginBottom: 20 }}>{desc}</p>
        <div className="mt-auto flex flex-wrap gap-1.5">
          {tags.slice(0, 3).map((t) => (
            <span key={t} className="rounded-full border border-[var(--border)] bg-white/[0.04] px-2.5 py-0.5 text-[9.5px] uppercase tracking-wider text-[var(--muted-foreground)]">{t}</span>
          ))}
        </div>
      </div>
    </motion.article>
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
  const [active, setActive] = useState(0);

  return (
    <section id="why" className="relative py-24 md:py-32 overflow-hidden">
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
                Six reasons founders and studios choose me — beyond the pixel.
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
                  <div className="mb-4 text-[10px] uppercase tracking-[0.32em] text-[var(--neon)]">
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
                  <motion.button
                    key={title}
                    type="button"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className={`group relative w-full text-left overflow-hidden rounded-2xl transition-all duration-500
                      ${isActive ? "glass-strong lg:translate-x-4" : "glass hover:lg:translate-x-2"}`}
                    style={{ marginLeft: `${i % 2 === 0 ? 0 : 24}px` }}
                  >
                    {isActive && (
                      <span className="pointer-events-none absolute inset-0 rounded-2xl" style={{
                        padding: 1,
                        background: "linear-gradient(90deg, rgba(192,132,252,0.6), rgba(34,211,238,0.3), rgba(232,121,249,0.6))",
                        WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                      } as React.CSSProperties} aria-hidden />
                    )}
                    <div className="relative flex items-center gap-4 p-4 sm:p-5">
                      <span className={`font-display text-xs tracking-[0.3em] w-8 shrink-0 transition-colors ${isActive ? "text-[var(--neon)]" : "text-white/40"}`}>
                        0{i + 1}
                      </span>
                      <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl text-2xl transition-all duration-500 ${isActive ? "bg-gradient-to-br from-[var(--primary)]/50 to-[var(--pink)]/35 scale-110" : "bg-white/[0.04]"}`}>
                        {icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm sm:text-base font-semibold text-white truncate">{title}</div>
                        <div className={`text-[12px] text-[var(--muted-foreground)] transition-all duration-500 ${isActive ? "opacity-100 max-h-20 mt-1" : "opacity-0 max-h-0 overflow-hidden"}`}>
                          {text}
                        </div>
                      </div>
                      <ArrowUpRight
                        size={16}
                        className={`shrink-0 transition-all duration-500 ${isActive ? "text-[var(--neon)] translate-x-0 opacity-100" : "text-white/30 -translate-x-2 opacity-0"}`}
                      />
                    </div>
                  </motion.button>
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
function Contact() {
  const [sent, setSent] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [4, -4]), { stiffness: 120, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-5, 5]), { stiffness: 120, damping: 20 });
  const lx = useTransform(mx, (v) => `${v * 100}%`);
  const ly = useTransform(my, (v) => `${v * 100}%`);

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      {/* Ambient lighting */}
      <div className="absolute inset-0 -z-10" aria-hidden style={{
        background:
          "radial-gradient(900px 500px at 50% 100%, rgba(124,58,237,0.24), transparent 60%)," +
          "radial-gradient(700px 400px at 10% 10%, rgba(232,121,249,0.12), transparent 60%)," +
          "radial-gradient(700px 400px at 90% 20%, rgba(34,211,238,0.10), transparent 60%)",
      }} />

      {/* Floating decorative shapes */}
      <motion.div
        aria-hidden
        className="absolute top-20 left-[6%] hidden md:block h-28 w-28 rounded-3xl glass-strong"
        animate={{ y: [0, -16, 0], rotate: [-4, 4, -4] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-24 right-[8%] hidden md:block h-20 w-20 rounded-full border border-[var(--neon)]/40"
        animate={{ y: [0, 16, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.svg
        aria-hidden
        className="absolute top-1/3 right-[14%] hidden lg:block opacity-40"
        width="32" height="32" viewBox="0 0 24 24" fill="none"
        animate={{ y: [0, -18, 0], rotate: [0, 20, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" fill="#e879f9" opacity="0.6" />
      </motion.svg>

      <div className="container-x relative">
        <div className="mb-14 sm:mb-16 text-center">
          <Reveal className="flex justify-center"><SectionTag>Get In Touch</SectionTag></Reveal>
          <Reveal delay={0.1}>
            <h2 className="leading-[1.05]">Let's build something<br /><span className="text-gradient">remarkable.</span></h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl mx-auto text-base text-[var(--muted-foreground)]">
              Tell me about your project. I'll reply within one business day.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-6 lg:gap-8 lg:grid-cols-[1fr_1.15fr] items-start max-w-6xl mx-auto">
          {/* LEFT — contact info floating card */}
          <Reveal>
            <div className="relative glass-strong rounded-[28px] p-7 sm:p-9 overflow-hidden">
              <div className="pointer-events-none absolute inset-0 rounded-[28px]" style={{
                padding: 1,
                background: "linear-gradient(135deg, rgba(192,132,252,0.55), rgba(34,211,238,0.2), rgba(232,121,249,0.55))",
                WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              } as React.CSSProperties} aria-hidden />
              <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[var(--primary)]/30 blur-3xl" aria-hidden />

              <div className="relative">
                <div className="mb-2 text-[10px] uppercase tracking-[0.3em] text-[var(--neon)]">Direct Line</div>
                <h3 className="font-display text-2xl sm:text-3xl text-white leading-tight mb-6">
                  Prefer to<br />reach out directly?
                </h3>

                <div className="space-y-3">
                  <a
                    href="mailto:hooria.webdesigns@gmail.com"
                    className="group flex items-center gap-4 rounded-2xl p-4 glass hover:-translate-y-0.5 hover:border-[var(--neon)]/50 hover:shadow-[0_10px_30px_-10px_rgba(192,132,252,0.5)] transition-all duration-500"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[var(--primary)]/45 to-[var(--pink)]/30">
                      <Mail size={18} className="text-white" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted-foreground)]">Email</div>
                      <div className="text-sm text-white/95 truncate group-hover:text-[var(--neon)] transition-colors">hooria.webdesigns@gmail.com</div>
                    </div>
                    <ArrowUpRight size={14} className="text-white/40 group-hover:text-[var(--neon)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/hooria-azam-web-developer/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-2xl p-4 glass hover:-translate-y-0.5 hover:border-[var(--neon)]/50 hover:shadow-[0_10px_30px_-10px_rgba(192,132,252,0.5)] transition-all duration-500"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[var(--cyan)]/40 to-[var(--primary)]/30">
                      <Linkedin size={18} className="text-white" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted-foreground)]">LinkedIn</div>
                      <div className="text-sm text-white/95 truncate group-hover:text-[var(--neon)] transition-colors">/in/hooria-azam-web-developer</div>
                    </div>
                    <ArrowUpRight size={14} className="text-white/40 group-hover:text-[var(--neon)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                  </a>
                </div>

                <div className="mt-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[var(--muted-foreground)]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Available · Replies in &lt; 24h
                </div>
              </div>
            </div>
          </Reveal>

          {/* RIGHT — form card with 3D tilt */}
          <Reveal delay={0.15}>
            <motion.div
              ref={cardRef}
              onMouseMove={(e) => {
                const r = cardRef.current!.getBoundingClientRect();
                mx.set((e.clientX - r.left) / r.width);
                my.set((e.clientY - r.top) / r.height);
              }}
              onMouseLeave={() => { mx.set(0.5); my.set(0.5); }}
              style={{ rotateX: rx, rotateY: ry, transformPerspective: 1600 }}
              className="relative glass-strong rounded-[28px] p-7 sm:p-9 overflow-hidden"
            >
              <motion.div className="pointer-events-none absolute inset-0" style={{ background: useTransform([lx, ly] as any, ([x, y]: any) => `radial-gradient(500px circle at ${x} ${y}, rgba(232,121,249,0.16), transparent 60%)`) }} />
              <div className="absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[var(--primary)]/25 blur-3xl" aria-hidden />

              <div className="relative">
                <div className="mb-2 text-[10px] uppercase tracking-[0.3em] text-[var(--neon)]">Project Brief</div>
                <h3 className="font-display text-2xl sm:text-3xl text-white leading-tight mb-6">Tell me about your project.</h3>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field placeholder="Your name" />
                    <Field type="email" placeholder="Email address" />
                  </div>
                  <Field placeholder="Project type (e.g. WordPress site, Landing page, UI design…)" />
                  <Field as="textarea" rows={5} placeholder="Tell me about your project…" />
                  <button type="submit" className="btn-primary w-full !py-4" disabled={sent}>
                    {sent ? "Message Sent ✓" : "Send Message"}
                  </button>
                </form>
              </div>
            </motion.div>
          </Reveal>
        </div>
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
    ["Pricing", "#pricing"], ["Contact", "#contact"],
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
          style={{ rotateX: rx, rotateY: ry, transformPerspective: 1600 }}
          className="relative glass-strong rounded-[36px] p-8 sm:p-12 md:p-14 overflow-hidden badge-float"
        >
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{ background: useTransform([lx, ly] as any, ([x, y]: any) => `radial-gradient(600px circle at ${x} ${y}, rgba(192,132,252,0.16), transparent 60%)`) }}
            aria-hidden
          />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-[60%] rounded-full bg-[var(--neon)]/25 blur-3xl pointer-events-none" aria-hidden />
          <div className="pointer-events-none absolute inset-0 rounded-[36px]" style={{
            padding: 1,
            background: "linear-gradient(135deg, rgba(192,132,252,0.5), rgba(34,211,238,0.25), rgba(232,121,249,0.5))",
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }} aria-hidden />

          {/* HERO ROW — giant editorial signature */}
          <div className="relative mb-12 sm:mb-14 pb-10 sm:pb-12 border-b border-white/10">
            <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] items-end">
              <div className="min-w-0">
                <div className="mb-4"><Logo variant="full" tone="gradient" /></div>
                <h3 className="font-display text-[clamp(1.75rem,4.5vw,3.75rem)] italic text-white leading-[1.05]">
                  Let's craft <span className="text-gradient not-italic">something</span><br />
                  worth remembering.
                </h3>
              </div>
              <div className="flex flex-col items-start md:items-end gap-4">
                <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-white/90">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                  </span>
                  Available for Freelance
                </div>
                <a href="#contact" className="btn-primary !py-3 !px-6 text-sm">
                  Start a Project <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* CONTENT GRID */}
          <div className="relative grid gap-10 lg:gap-12 md:grid-cols-2 lg:grid-cols-3">
            {/* About */}
            <div className="min-w-0">
              <div className="mb-4 text-[10px] uppercase tracking-[0.28em] text-[var(--neon)]">Studio</div>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                A frontend studio of one, crafting premium websites and interfaces for founders,
                agencies, and brands worldwide. Karachi → Everywhere.
              </p>
            </div>

            {/* Nav */}
            <div className="min-w-0">
              <div className="mb-4 text-[10px] uppercase tracking-[0.28em] text-[var(--neon)]">Navigate</div>
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

            {/* Contact — ONLY LinkedIn + Email */}
            <div className="min-w-0">
              <div className="mb-4 text-[10px] uppercase tracking-[0.28em] text-[var(--neon)]">Connect</div>
              <div className="space-y-2.5">
                <a
                  href="mailto:hooria.webdesigns@gmail.com"
                  className="group flex items-center gap-3 rounded-2xl glass px-3.5 py-2.5 hover:border-[var(--neon)]/50 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[var(--primary)]/45 to-[var(--pink)]/30">
                    <Mail size={15} className="text-white" />
                  </span>
                  <span className="min-w-0 flex-1 text-[13px] text-white/90 truncate group-hover:text-[var(--neon)] transition-colors">
                    hooria.webdesigns@gmail.com
                  </span>
                </a>
                <a
                  href="https://www.linkedin.com/in/hooria-azam-web-developer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-2xl glass px-3.5 py-2.5 hover:border-[var(--neon)]/50 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[var(--cyan)]/40 to-[var(--primary)]/30">
                    <Linkedin size={15} className="text-white" />
                  </span>
                  <span className="min-w-0 flex-1 text-[13px] text-white/90 truncate group-hover:text-[var(--neon)] transition-colors">
                    LinkedIn Profile
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="relative mt-12 pt-6">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--neon)]/50 to-transparent" aria-hidden />
            <div className="grid gap-3 sm:grid-cols-3 items-center text-[11px] sm:text-xs text-[var(--muted-foreground)]">
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
      <Pricing />

      <Why />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
