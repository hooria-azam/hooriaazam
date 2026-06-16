import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { useLenis } from "@/hooks/use-lenis";

const HeroScene = lazy(() =>
  import("@/components/HeroScene").then((m) => ({ default: m.HeroScene })),
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hooria Azam — Frontend & WordPress Developer" },
      { name: "description", content: "5+ years crafting cinematic, premium digital experiences. Frontend, WordPress, UI/UX." },
      { property: "og:title", content: "Hooria Azam — Frontend & WordPress Developer" },
      { property: "og:description", content: "5+ years crafting cinematic, premium digital experiences." },
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
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-[var(--neon)] shadow-[0_0_18px_var(--neon),0_0_40px_var(--primary)]"
      />
      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden md:block -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-[rgba(192,132,252,0.4)]"
      />
      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[1] hidden md:block -translate-x-1/2 -translate-y-1/2 h-[420px] w-[420px] rounded-full"
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.18)_0%,transparent_65%)]" />
      </motion.div>
    </>
  );
}

/* ───────── Nav ───────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    ["About", "#about"], ["Services", "#services"], ["Skills", "#skills"],
    ["Work", "#projects"], ["Contact", "#contact"],
  ];
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
      className={`fixed left-1/2 top-5 z-50 -translate-x-1/2 transition-all duration-500 ${
        scrolled ? "w-[min(94vw,1100px)]" : "w-[min(94vw,1200px)]"
      }`}
    >
      <div className="glass-strong flex items-center justify-between rounded-full px-6 py-3">
        <a href="#hero" className="font-display text-lg font-bold tracking-wide">
          <span className="text-gradient">HA</span>
          <span className="text-[var(--neon)]">.</span>
        </a>
        <ul className="hidden items-center gap-7 md:flex">
          {links.map(([label, href]) => (
            <li key={href}>
              <a href={href} className="text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--neon)]">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="btn-primary !py-2 !px-5 text-sm">Hire Me</a>
      </div>
    </motion.nav>
  );
}

/* ───────── Section helper ───────── */
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
    <div className="mb-6 inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--muted-foreground)]">
      <span className="h-px w-8 bg-[var(--neon)]" />
      {children}
    </div>
  );
}

/* ───────── Hero ───────── */
function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.25),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(34,211,238,0.15),transparent_55%)]" />

      <div className="absolute inset-0 z-10">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      <div className="relative z-20 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-32 md:px-12">
        <Reveal>
          <div className="glass inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-[var(--cyan)] opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-[var(--cyan)]" />
            </span>
            Available for new projects · 5+ Years Experience
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <h1 className="font-display mt-8 text-[clamp(3.5rem,11vw,9rem)] font-extrabold leading-[0.95] tracking-tight">
            <span className="block">Hooria</span>
            <span className="block text-gradient">Azam.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mt-8 max-w-xl text-lg text-[var(--muted-foreground)] md:text-xl">
            <em className="text-[var(--foreground)]">I build the web you can feel.</em>
            <br />
            Frontend Developer · WordPress Expert · UI/UX Designer
          </p>
        </Reveal>

        <Reveal delay={0.45}>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#projects" className="btn-primary">View My Work</a>
            <a href="#contact" className="btn-ghost">Start a Project →</a>
          </div>
        </Reveal>

        <Reveal delay={0.6}>
          <div className="mt-16 grid max-w-2xl grid-cols-3 gap-6">
            {[
              { n: "5+", l: "Years Experience" },
              { n: "80+", l: "Projects Delivered" },
              { n: "100%", l: "Client Satisfaction" },
            ].map((s) => (
              <div key={s.l} className="glass rounded-2xl p-5">
                <div className="font-display text-3xl font-bold text-gradient md:text-4xl">{s.n}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-[var(--muted-foreground)]">{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
        <div className="mx-auto mb-2 h-10 w-px bg-gradient-to-b from-[var(--neon)] to-transparent" />
        Scroll
      </div>
    </section>
  );
}

/* ───────── About ───────── */
function About() {
  return (
    <section id="about" className="relative px-6 py-32 md:px-12">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(124,58,237,0.12),transparent_60%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        {/* Orbit visual */}
        <Reveal className="relative flex h-[460px] items-center justify-center">
          <div className="relative h-[420px] w-[420px] max-w-full">
            <div className="absolute inset-0 rounded-full border border-[var(--border)] spin-slow" />
            <div className="absolute inset-8 rounded-full border border-[var(--border)] spin-slow" style={{ animationDuration: "22s", animationDirection: "reverse" }} />
            <div className="absolute inset-16 rounded-full border border-[var(--border)] spin-slow" style={{ animationDuration: "16s" }} />
            <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_180deg,#7c3aed,#e879f9,#22d3ee,#7c3aed)] blur-[2px] pulse-glow" />
            <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.15),transparent_70%)]" />
            <div className="font-display absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-bold text-gradient">5+</div>
            <div className="font-display absolute left-1/2 top-1/2 mt-12 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-[var(--muted-foreground)]">Years</div>
            {/* orbit dots */}
            <div className="spin-slow absolute inset-0">
              <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-[var(--neon)] shadow-[0_0_12px_var(--neon)]" />
            </div>
            <div className="spin-slow absolute inset-8" style={{ animationDuration: "22s", animationDirection: "reverse" }}>
              <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-[var(--cyan)] shadow-[0_0_10px_var(--cyan)]" />
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal><SectionTag>About Me</SectionTag></Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl font-bold leading-[1.05] md:text-6xl">
              Design that thinks.
              <br />
              <span className="text-gradient">Code that performs.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 text-lg text-[var(--muted-foreground)]">
              I'm <strong className="text-[var(--foreground)]">Hooria Azam</strong> — a frontend developer and WordPress
              specialist with <strong className="text-[var(--neon)]">5+ years of hands-on experience</strong> crafting
              digital experiences that strike the balance between beautiful and functional.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-5 text-lg text-[var(--muted-foreground)]">
              I don't just build websites — I architect <strong className="text-[var(--foreground)]">digital experiences</strong>{" "}
              that engage, convert, and leave a lasting impression. Every line of code is intentional. Every design decision serves a purpose.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-8 flex flex-wrap gap-2">
              {["UI/UX Design","Frontend Dev","WordPress","WooCommerce","Elementor Pro","Responsive Design","Web Animations"].map((p) => (
                <span key={p} className="glass rounded-full px-4 py-2 text-xs uppercase tracking-wider text-[var(--muted-foreground)] transition-colors hover:text-[var(--neon)]">{p}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ───────── Services ───────── */
const SERVICES = [
  { icon: "⚡", title: "Frontend Development", desc: "Clean, semantic, and performant code using HTML5, CSS3, and JavaScript. I build interfaces that move fast, scale elegantly, and feel genuinely alive. From micro-interactions to full responsive layouts — precision is my standard.", featured: true },
  { icon: "✦", title: "UI/UX Design", desc: "Interfaces designed to solve real problems beautifully. I turn wireframes into visual systems that users actually enjoy using." },
  { icon: "◆", title: "WordPress Development", desc: "Custom WordPress builds using Elementor Pro, WooCommerce, and tailored CSS. Flexible, manageable, and built right." },
  { icon: "🛒", title: "WooCommerce Stores", desc: "E-commerce experiences that convert. Clean product layouts, optimized checkout flows, and performance-focused architecture." },
  { icon: "📱", title: "Responsive Design", desc: "Pixel-perfect on every device. Mobile-first, fluid, and carefully tested across screen sizes and browsers." },
  { icon: "✨", title: "Website Redesign", desc: "Modernize outdated sites while keeping what works. A fresh visual identity with improved UX and performance." },
];

function Services() {
  return (
    <section id="services" className="relative px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 grid items-end gap-8 md:grid-cols-2">
          <div>
            <Reveal><SectionTag>What I Do</SectionTag></Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl font-bold leading-[1.05] md:text-6xl">
                Services built<br /><span className="text-gradient">to scale.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="text-lg text-[var(--muted-foreground)]">
              Every project gets my full creative and technical attention — no templates, no shortcuts.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <TiltCard featured={s.featured}>
                <div className="font-display mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)]/30 to-[var(--pink)]/20 text-2xl">
                  {s.icon}
                </div>
                <h3 className="font-display mb-3 text-xl font-semibold">{s.title}</h3>
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
  const rotX = useSpring(useTransform(y, [-50, 50], [8, -8]), { stiffness: 200, damping: 20 });
  const rotY = useSpring(useTransform(x, [-50, 50], [-8, 8]), { stiffness: 200, damping: 20 });
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
      className={`glass group relative h-full overflow-hidden rounded-3xl p-8 transition-colors ${
        featured ? "ring-1 ring-[var(--primary)]/40" : ""
      }`}
    >
      <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
           style={{ background: "linear-gradient(135deg, rgba(192,132,252,0.4), rgba(34,211,238,0.2))", maskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)", maskComposite: "exclude", padding: 1 }} />
      <div className="relative">{children}</div>
    </motion.div>
  );
}

/* ───────── Skills ───────── */
const SKILLS = [
  ["HTML5 & CSS3", 97], ["JavaScript", 88], ["WordPress & Elementor", 95],
  ["UI/UX Design", 90], ["WooCommerce", 85], ["Responsive Design", 98],
] as const;
const TECH = ["HTML5","CSS3","JavaScript","WordPress","Elementor Pro","WooCommerce","Figma","Adobe XD","GSAP","CSS Animations","Git","Sass/SCSS","Bootstrap","Flexbox","CSS Grid","SEO Basics"];

function Skills() {
  return (
    <section id="skills" className="relative px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <Reveal><SectionTag>Technical Skills</SectionTag></Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display mb-16 text-4xl font-bold leading-[1.05] md:text-6xl">
            Expertise that<br /><span className="text-gradient">delivers results.</span>
          </h2>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-7">
            {SKILLS.map(([name, pct], i) => (
              <Reveal key={name} delay={i * 0.05}>
                <div>
                  <div className="mb-2 flex items-baseline justify-between">
                    <span className="font-display text-sm font-medium">{name}</span>
                    <span className="font-display text-sm text-[var(--neon)]">{pct}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, ease: [0.2, 0.8, 0.2, 1], delay: 0.2 }}
                      className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] via-[var(--pink)] to-[var(--cyan)] shadow-[0_0_20px_rgba(192,132,252,0.6)]"
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="glass rounded-3xl p-8">
              <p className="mb-6 text-sm text-[var(--muted-foreground)]">
                My full stack of tools and technologies — everything I use to bring ideas to life.
              </p>
              <div className="flex flex-wrap gap-2">
                {TECH.map((t) => (
                  <span key={t} className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/[0.02] px-3 py-1.5 text-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon)] shadow-[0_0_8px_var(--neon)]" />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ───────── Process / Timeline ───────── */
const STEPS = [
  ["01", "Discover & Define", "Deep-dive into your goals, audience, and vision. I ask the right questions to understand what success actually looks like for your project."],
  ["02", "Design & Prototype", "Wireframes and high-fidelity mockups crafted with intent. Visual systems that feel cohesive, modern, and on-brand — before a single line of code."],
  ["03", "Build & Animate", "Clean, semantic code. Smooth interactions. Pixel-perfect implementation that matches the design vision and performs beautifully."],
  ["04", "Launch & Optimize", "Thorough testing, performance optimization, and a smooth handoff. I make sure everything is production-ready and you're set for long-term success."],
] as const;

function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 30%"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <section id="process" className="relative px-6 py-32 md:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-20 text-center">
          <Reveal className="flex justify-center"><SectionTag>My Process</SectionTag></Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl font-bold leading-[1.05] md:text-6xl">
              How I turn ideas<br /><span className="text-gradient">into experiences.</span>
            </h2>
          </Reveal>
        </div>

        <div ref={ref} className="relative">
          <div className="absolute left-6 top-0 h-full w-px bg-white/5 md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-6 top-0 w-px bg-gradient-to-b from-[var(--primary)] via-[var(--pink)] to-[var(--cyan)] shadow-[0_0_12px_var(--neon)] md:left-1/2 md:-translate-x-1/2"
          />
          <div className="space-y-16">
            {STEPS.map(([n, title, desc], i) => (
              <Reveal key={n} delay={i * 0.05}>
                <div className={`relative grid items-center gap-6 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                  <div className={`pl-16 md:pl-0 ${i % 2 ? "md:pl-16 md:text-left" : "md:pr-16 md:text-right"}`}>
                    <div className="font-display mb-2 text-5xl font-extrabold text-gradient">{n}</div>
                    <h3 className="font-display mb-3 text-2xl font-semibold">{title}</h3>
                    <p className="text-sm text-[var(--muted-foreground)]">{desc}</p>
                  </div>
                  <div className="hidden md:block" />
                  <div className="absolute left-6 top-2 h-4 w-4 -translate-x-1/2 rounded-full bg-[var(--neon)] shadow-[0_0_16px_var(--neon)] ring-4 ring-[var(--background)] md:left-1/2" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── Projects ───────── */
const PROJECTS = [
  { glyph: "🛒", label: "WooCommerce · WordPress", name: "Luxury Brand E-Commerce Store", desc: "A full-featured WooCommerce store with custom product pages, optimized checkout flow, and a premium visual identity that increased conversions by 38%.", tags: ["WordPress","WooCommerce","Elementor","Custom CSS"], grad: "linear-gradient(135deg,rgba(124,58,237,0.5),rgba(232,121,249,0.3))", large: true },
  { glyph: "✦", label: "UI/UX · Frontend", name: "SaaS Dashboard Redesign", desc: "A complete visual overhaul of a product dashboard — cleaner hierarchy, modern components, reduced user drop-off by 52%.", tags: ["Figma","HTML/CSS","JS"], grad: "linear-gradient(135deg,rgba(34,211,238,0.3),rgba(124,58,237,0.3))" },
  { glyph: "🔷", label: "Landing Page · Frontend", name: "Animated Product Launch Page", desc: "A high-converting product launch page with scroll-triggered animations, spotlight effects, and responsive design across all devices.", tags: ["HTML5","CSS3","GSAP"], grad: "linear-gradient(135deg,rgba(232,121,249,0.3),rgba(34,211,238,0.2))" },
  { glyph: "🌐", label: "WordPress · Brand", name: "Corporate Website Rebuild", desc: "A full WordPress rebuild with custom Elementor templates, optimized performance, and brand-focused visual design across 20+ pages.", tags: ["WordPress","Elementor Pro","SEO"], grad: "linear-gradient(135deg,rgba(124,58,237,0.4),rgba(34,211,238,0.2))" },
  { glyph: "⬡", label: "UI Design · Frontend", name: "Agency Portfolio Website", desc: "Dark luxury aesthetic with cinematic scroll animations, glassmorphism UI components, and fully responsive layouts.", tags: ["HTML/CSS","JavaScript","Animations"], grad: "linear-gradient(135deg,rgba(232,121,249,0.4),rgba(124,58,237,0.2))" },
];

function Projects() {
  return (
    <section id="projects" className="relative px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal><SectionTag>Featured Work</SectionTag></Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl font-bold leading-[1.05] md:text-6xl">
                Projects that<br /><span className="text-gradient">speak louder.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <a href="#contact" className="btn-ghost">All Projects →</a>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.05} className={p.large ? "lg:col-span-2 lg:row-span-2" : ""}>
              <ProjectCard {...p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ glyph, label, name, desc, tags, grad, large }: typeof PROJECTS[number]) {
  return (
    <div className="glass group relative flex h-full flex-col overflow-hidden rounded-3xl transition-transform duration-500 hover:-translate-y-1">
      <div
        className={`relative flex items-center justify-center overflow-hidden ${large ? "h-80 md:h-96" : "h-52"}`}
        style={{ background: grad }}
      >
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(2,2,7,0.6)_100%)]" />
        <div className="relative text-7xl drop-shadow-[0_0_30px_rgba(192,132,252,0.6)] transition-transform duration-700 group-hover:scale-110">{glyph}</div>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <div className="flex flex-1 flex-col p-7">
        <div className="mb-2 text-xs uppercase tracking-[0.2em] text-[var(--cyan)]">{label}</div>
        <h3 className="font-display mb-3 text-xl font-semibold">{name}</h3>
        <p className="mb-5 flex-1 text-sm text-[var(--muted-foreground)]">{desc}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="rounded-full border border-[var(--border)] bg-white/[0.02] px-3 py-1 text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────── Why Me ───────── */
const WHY = [
  ["🎯","Purpose-Driven Design","Every design decision is grounded in user behavior and business goals. I don't design for aesthetics alone — I design for results."],
  ["⚡","Speed Without Compromise","Fast delivery, clean code, and optimized performance. I move efficiently without cutting corners on quality or craftsmanship."],
  ["🤝","Clear Communication","Transparent timelines, regular updates, and honest feedback. You'll always know where your project stands — no surprises."],
  ["📐","Pixel-Perfect Precision","I obsess over the fine details — spacing, typography rhythm, interaction timing — the things that separate good from exceptional."],
  ["🔮","Modern Practices","Always current with web trends, CSS techniques, and WordPress updates. Your site is built for today and ready for tomorrow."],
  ["🌱","Long-Term Thinking","I build with scalability in mind. Clean architecture, readable code, and flexible layouts that grow with your business."],
] as const;

function Why() {
  return (
    <section id="why" className="relative px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <Reveal className="flex justify-center"><SectionTag>Why Work With Me</SectionTag></Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl font-bold leading-[1.05] md:text-6xl">
              The difference is in<br /><span className="text-gradient">the details.</span>
            </h2>
          </Reveal>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {WHY.map(([icon, title, text], i) => (
            <Reveal key={title} delay={i * 0.05}>
              <TiltCard>
                <div className="mb-4 text-3xl">{icon}</div>
                <h3 className="font-display mb-3 text-lg font-semibold">{title}</h3>
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
  { stars: 5, text: "Hooria redesigned our entire site from scratch. The result was stunning — clean, fast, and exactly on-brand. She understood our vision immediately and executed it flawlessly.", initials: "SR", name: "Sarah R.", role: "Founder, Creative Agency" },
  { stars: 5, text: "Our WooCommerce store went from generic to genuinely impressive. Hooria's attention to detail in both design and functionality was remarkable. Sales increased within the first month.", initials: "MK", name: "Marcus K.", role: "E-Commerce Business Owner" },
  { stars: 5, text: "Working with Hooria was effortless. She delivered a premium landing page with animations that genuinely impressed our investors. Highly recommended for any serious digital project.", initials: "AP", name: "Aisha P.", role: "Product Manager, Tech Startup" },
];

function Testimonials() {
  return (
    <section id="testimonials" className="relative px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <Reveal><SectionTag>Client Voices</SectionTag></Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display mb-16 text-4xl font-bold leading-[1.05] md:text-6xl">
            What clients<br /><span className="text-gradient">say about the work.</span>
          </h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <div className="glass flex h-full flex-col rounded-3xl p-7">
                <div className="mb-4 text-[var(--neon)] tracking-widest">{"★".repeat(t.stars)}</div>
                <p className="mb-6 flex-1 text-sm italic leading-relaxed text-[var(--muted-foreground)]">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="font-display flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--pink)] text-sm font-semibold text-white">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-display text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-[var(--muted-foreground)]">{t.role}</div>
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
  return (
    <section id="contact" className="relative px-6 py-32 md:px-12">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(124,58,237,0.2),transparent_60%)]" />
      <div className="relative mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <Reveal className="flex justify-center"><SectionTag>Get In Touch</SectionTag></Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl font-bold leading-[1.05] md:text-6xl">
              Let's build something<br /><span className="text-gradient">remarkable.</span>
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="glass relative overflow-hidden rounded-3xl p-8 md:p-12">
            <div className="absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[var(--primary)]/30 blur-3xl" />
            <div className="relative">
              <h3 className="font-display mb-3 text-2xl font-semibold">Ready to start?</h3>
              <p className="mb-8 text-[var(--muted-foreground)]">
                Tell me about your project — I'd love to hear what you're building and explore how we can make it exceptional.
              </p>
              <form
                className="space-y-4"
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <Field placeholder="Your name" />
                  <Field type="email" placeholder="Email address" />
                </div>
                <Field placeholder="Project type (e.g. WordPress site, Landing page, UI design…)" />
                <Field as="textarea" rows={5} placeholder="Tell me about your project…" />
                <button
                  type="submit"
                  className="btn-primary w-full !py-4"
                  disabled={sent}
                >
                  {sent ? "Message Sent ✓" : "Send Message"}
                </button>
              </form>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm">
                {[
                  ["📧 Email","mailto:hooria@example.com"],
                  ["💼 LinkedIn","#"], ["🐦 Twitter","#"], ["🎨 Behance","#"],
                ].map(([l, h]) => (
                  <a key={l} href={h} className="text-[var(--muted-foreground)] transition-colors hover:text-[var(--neon)]">{l}</a>
                ))}
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
      className="w-full rounded-2xl border border-[var(--border)] bg-white/[0.02] px-5 py-4 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] outline-none transition-all focus:border-[var(--neon)] focus:bg-white/[0.04] focus:shadow-[0_0_0_4px_rgba(192,132,252,0.12)]"
    />
  );
}

/* ───────── Footer ───────── */
function Footer() {
  return (
    <footer className="relative border-t border-[var(--border)] px-6 py-16 md:px-12">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 text-center">
        <div className="font-display text-3xl font-bold text-gradient">Hooria Azam</div>
        <div className="text-xs uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
          © 2024 Hooria Azam · Built with precision &amp; passion
        </div>
        <div className="flex flex-wrap gap-6 text-sm">
          {[["About","#about"],["Services","#services"],["Work","#projects"],["Contact","#contact"]].map(([l,h]) => (
            <a key={l} href={h} className="text-[var(--muted-foreground)] transition-colors hover:text-[var(--neon)]">{l}</a>
          ))}
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
      <Why />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
