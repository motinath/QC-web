import { Link } from "../../../lib/router-compat";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  Download,
  ShieldCheck,
  Microscope,
  FlaskConical,
  Cpu,
  Compass,
  FileCheck2,
  Send,
  Building2,
  Users,
  Briefcase,
  TrendingUp,
  Award,
  Target,
  ScanSearch,
  Clock,
} from "lucide-react";
import { useContactModal } from "../../../components/shared/ContactModal";
import facilityImg from "./work-reg.png";
import biotechImg from "./molecule.jpeg";
import _biomanufacturingImg from "../bio-mmg/bioprocess-control-bioreactor.jpg";
import bioaiImg from "./brainr.jpeg";
import bioRegImg from "./bio-regulatory-compliance.png";
import _analyticalImg from "./analytical-chemistry.jpg";
import heroRegImg from "./hero-reg.png";
import manfImg from "./manf.jpg";

/* ============================================================
   Shared atoms
   ============================================================ */

function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-mono font-semibold tracking-[0.25em] text-emerald-600 dark:text-emerald-400 uppercase">
      {children}
    </p>
  );
}

function _HexBadge({ label }: { label: string }) {
  return (
    <div className="relative">
      <div className="px-5 py-2 rounded-full border border-accent-emerald/30 bg-accent-emerald/[0.06] backdrop-blur text-xs font-mono tracking-[0.25em] text-foreground/90 uppercase">
        {label}
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-accent-emerald/10 animate-pulse" />
    </div>
  );
}

/* ============================================================
   Page
   ============================================================ */

/* ============================================================
   Page
   ============================================================ */

export default function RegulatoryCompliancePage() {
  const { open: openContactModal } = useContactModal();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-x-clip">
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left bg-gradient-to-r from-emerald-500 via-sky-500 to-emerald-500"
        style={{ scaleX: progress }}
      />

      <Hero openContactModal={openContactModal} />
      <ImpactStrip />
      <InvestorTrust />
      <DomainsSection />
      <ProvenProcess />
      <NumbersStrip />
      <ArchitectsGrid />
      <PartnerBand openContactModal={openContactModal} />
      <TagStrip />
    </div>
  );
}

/* ============================================================
   1. Hero — team meeting backdrop
   ============================================================ */

function Hero({ openContactModal }: { openContactModal: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex items-center pt-28 pb-20 px-6 overflow-hidden bg-white dark:bg-slate-950"
    >
      {/* Executive Meeting Background Image (hero-reg.png) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src={heroRegImg}
          alt="Regulatory Executive Team Background"
          className="w-full h-full object-cover object-center opacity-75 dark:opacity-60 filter contrast-[1.08] saturate-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/20 dark:from-slate-950 dark:via-slate-950/85 dark:to-slate-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/30 dark:from-slate-950 dark:via-transparent dark:to-slate-950/30 opacity-70" />
      </div>

      <HexGridOverlay />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.08),transparent_50%)] z-[1]" />

      <motion.div
        className="relative z-[2] max-w-6xl mx-auto w-full"
        style={{ y: yText, opacity: opacityText }}
      >
        {/* Left Content Column */}
        <div className="max-w-2xl">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800 bg-emerald-50/90 dark:bg-emerald-950/80 shadow-sm backdrop-blur-sm">
              <Compass className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-emerald-700 dark:text-emerald-400">
                Regulatory & Compliance
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-7 font-serif-display italic text-5xl md:text-6xl lg:text-7xl leading-[1.04] text-slate-900 dark:text-slate-100">
              Navigating the Future of{" "}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-sky-600 bg-clip-text text-transparent not-italic">
                Bio-Innovation
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed font-normal">
              Your regulatory compass in{" "}
              <span className="text-slate-900 dark:text-slate-100 font-medium">Biotech</span>,{" "}
              <span className="text-slate-900 dark:text-slate-100 font-medium">
                Biomanufacturing
              </span>{" "}
              & <span className="text-slate-900 dark:text-slate-100 font-medium">BioAI</span>.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap gap-3">
              <button
                onClick={openContactModal}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white text-sm font-medium tracking-wide hover:bg-emerald-700 transition-all hover:shadow-[0_14px_40px_-12px_rgba(5,150,105,0.55)]"
              >
                Schedule a Consultation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="#process"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur text-slate-800 dark:text-slate-200 text-sm font-medium tracking-wide hover:bg-white dark:hover:bg-slate-800 transition-all"
              >
                <Download className="h-4 w-4" />
                Download Investor Deck
              </a>
            </div>
          </Reveal>
        </div>
      </motion.div>
    </section>
  );
}

function HexGridOverlay() {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 20]);
  return (
    <motion.svg
      className="absolute inset-0 -z-10 w-full h-full opacity-[0.08] text-emerald-600"
      style={{ rotate }}
      viewBox="0 0 800 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <pattern id="hex" width="60" height="52" patternUnits="userSpaceOnUse">
          <polygon
            points="30,2 56,16 56,44 30,58 4,44 4,16"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hex)" />
    </motion.svg>
  );
}

/* ============================================================
   2. Impact Strip
   ============================================================ */

const IMPACT = [
  {
    icon: TrendingUp,
    title: "Unprecedented Growth",
    body: "Global biotech investment surpassing $100B annually, with regulatory complexity growing in parallel.",
  },
  {
    icon: ShieldCheck,
    title: "Critical Compliance",
    body: "Regulatory missteps cost companies years and millions — our expertise eliminates that risk.",
  },
  {
    icon: Target,
    title: "Clear Pathways",
    body: "We transform complex regulatory challenges into actionable strategies for market success.",
  },
];

function ImpactStrip() {
  return (
    <section className="relative py-28 px-6 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <Eyebrow>The Bio-Revolution</Eyebrow>
          <h2 className="mt-4 font-serif-display italic text-4xl md:text-5xl text-slate-900 dark:text-slate-100 max-w-3xl leading-tight">
            Demands Precision.{" "}
            <span className="text-emerald-600 dark:text-emerald-400 not-italic">
              We provide it.
            </span>
          </h2>
          <p className="mt-5 text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            The biotech, biomanufacturing, and bioAI sectors are experiencing unprecedented growth —
            but navigating the intricate web of regulatory compliance remains the critical hurdle
            for startups seeking investment and market entry.
          </p>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {IMPACT.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="group relative h-full p-8 rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-shadow overflow-hidden"
              >
                <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-emerald-100 dark:bg-emerald-900/30 blur-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-700" />
                <div className="relative">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-100 dark:ring-emerald-900">
                    <it.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 font-serif-display italic text-2xl text-slate-900 dark:text-slate-100">
                    {it.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {it.body}
                  </p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   3. Investor Trust — with dashboard image
   ============================================================ */

function InvestorTrust() {
  return (
    <section className="relative py-28 px-6 border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto">
        {/* Full-Width Header across top */}
        <Reveal>
          <div className="max-w-3xl">
            <Eyebrow>Investor Confidence Starts Here</Eyebrow>
            <h2 className="mt-4 font-serif-display italic text-4xl md:text-5xl text-slate-900 dark:text-slate-100 leading-tight">
              We bridge the gap between groundbreaking science and{" "}
              <span className="text-sky-600 dark:text-sky-400 not-italic">investor readiness.</span>
            </h2>
            <p className="mt-5 text-slate-600 dark:text-slate-400 leading-relaxed">
              Our deep understanding of global regulatory frameworks ensures your company is
              positioned for robust, de-risked growth.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {["FDA", "EMA", "ICH", "PMDA"].map((a) => (
                <div
                  key={a}
                  className="px-5 py-2 rounded-full border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/50 text-xs font-mono tracking-[0.25em] text-emerald-700 dark:text-emerald-400 uppercase"
                >
                  {a}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* 2-Column Grid: 3 Text Boxes on Left, Image on Right */}
        <div className="mt-12 grid lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: 3 Text Boxes */}
          <Reveal delay={0.1}>
            <div className="space-y-4 h-full flex flex-col justify-between">
              {[
                {
                  t: "Deep Regulatory Intelligence",
                  d: "Former agency reviewers and industry veterans on every engagement.",
                  icon: ScanSearch,
                },
                {
                  t: "Accelerated Timelines",
                  d: "Proven strategies that compress approval cycles and reduce capital burn.",
                  icon: Clock,
                },
                {
                  t: "Investor-Ready Documentation",
                  d: "Regulatory packages that instill confidence in due diligence.",
                  icon: ShieldCheck,
                },
              ].map((p) => (
                <div
                  key={p.t}
                  className="flex gap-4 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 hover:border-emerald-500/30 transition-all flex-1 items-center"
                >
                  <div className="flex-shrink-0 h-11 w-11 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 grid place-items-center ring-1 ring-emerald-100 dark:ring-emerald-900">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-slate-100 text-base">
                      {p.t}
                    </h4>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {p.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Right Column: Image directly beside the 3 text boxes */}
          <Reveal delay={0.15} className="h-full">
            <ParallaxImage
              src={bioRegImg}
              alt="Bio Regulatory Compliance certified verification and safety standards"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  return (
    <div ref={ref} className="relative h-full flex flex-col justify-center">
      <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-200/50 via-sky-200/40 to-transparent rounded-[2rem] blur-2xl" />
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl shadow-slate-900/10 bg-slate-900 dark:bg-slate-900">
        <motion.img
          src={src}
          alt={alt}
          style={{ y }}
          className="w-full h-auto object-contain rounded-3xl"
        />
      </div>
    </div>
  );
}

/* ============================================================
   4. Domains — with molecule image backdrop
   ============================================================ */

const DOMAINS = [
  {
    icon: Microscope,
    title: "Biotech Breakthroughs",
    body: "From novel therapeutics to advanced diagnostics, we guide you through FDA, EMA, and global regulatory approvals — navigating IND, NDA, BLA, and CE Mark pathways with precision.",
    tags: ["IND", "NDA", "BLA", "CE Mark"],
    image: biotechImg,
    imageAlt: "Glowing blue and red molecular network on dark background",
  },
  {
    icon: FlaskConical,
    title: "Biomanufacturing Excellence",
    body: "Ensuring compliance across complex manufacturing processes — from cell and gene therapy to large-scale bioprocessing — with GMP strategy, process validation, and facility readiness.",
    tags: ["GMP", "Cell & Gene", "Validation"],
    image: manfImg,
    imageAlt: "Advanced biomanufacturing facility and automated production clean room",
  },
  {
    icon: Cpu,
    title: "BioAI Innovation",
    body: "Pioneering regulatory pathways for AI-driven drug discovery and development, addressing SaMD classifications, algorithmic accountability, and the evolving FDA AI/ML framework.",
    tags: ["SaMD", "AI/ML", "Algorithm Gov."],
    image: bioaiImg,
    imageAlt: "Glowing digital brain with neural network connections in blue and red",
  },
];

function DomainsSection() {
  return (
    <section className="relative py-36 px-6 bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center">
            <Eyebrow>Unlocking Your Company's Potential</Eyebrow>
            <h2 className="mt-4 font-serif-display italic text-4xl md:text-5xl text-slate-900 dark:text-slate-100 leading-tight">
              From molecule to market —{" "}
              <span className="text-emerald-600 dark:text-emerald-400 not-italic">
                specialized expertise
              </span>{" "}
              across the full spectrum.
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid lg:grid-cols-3 gap-8">
          {DOMAINS.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="group relative h-full rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-2xl hover:shadow-emerald-900/10 transition-shadow"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={d.image}
                    alt={d.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* fade image into white card body */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-800 via-white/20 dark:via-slate-800/20 to-transparent" />
                  {/* top-right accent line on hover */}
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Text body */}
                <div className="relative flex flex-col gap-5 p-8">
                  <div>
                    <h3 className="font-serif-display italic text-2xl md:text-3xl text-slate-900 dark:text-slate-100 leading-snug">
                      {d.title}
                    </h3>
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {d.body}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                    {d.tags.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-[10px] font-mono tracking-[0.2em] uppercase text-slate-600 dark:text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   5. Proven Process — sticky pinned timeline with facility imagery
   ============================================================ */

const STEPS = [
  {
    icon: Compass,
    title: "Regulatory Gap Analysis",
    body: "Map current documentation, product claims, scientific evidence, manufacturing status, and jurisdictional risks.",
  },
  {
    icon: FileCheck2,
    title: "Pathway Strategy",
    body: "Define FDA, EMA, ICH, GMP, CE Mark, or AI/ML regulatory pathways based on product category and market goals.",
  },
  {
    icon: FlaskConical,
    title: "Evidence & Documentation",
    body: "Build investor-ready regulatory packages, quality documentation, validation plans, and submission roadmaps.",
  },
  {
    icon: Send,
    title: "Submission Readiness",
    body: "Prepare teams for agency interactions, due diligence, audits, and milestone-based regulatory execution.",
  },
  {
    icon: ShieldCheck,
    title: "Market & Governance Alignment",
    body: "Align founders, boards, investors, and technical teams around approval timelines, risk controls, and commercialization readiness.",
  },
];

function ProvenProcess() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const activeIdx = useTransform(scrollYProgress, (v) =>
    Math.min(STEPS.length - 1, Math.floor(v * STEPS.length)),
  );
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.25]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.35, 0.2]);

  const [active, setActive] = useState(0);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => activeIdx.on("change", (v) => setActive(v as number)), [activeIdx]);

  useEffect(() => {
    const _mq = window.matchMedia("(prefers-color-scheme: dark)");
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="process"
      ref={ref}
      className="relative bg-white dark:bg-slate-950"
      style={{ height: `${100 + STEPS.length * 60}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center px-6 overflow-hidden">
        {/* Facility image as ambient backdrop */}
        <motion.div
          className="absolute inset-0 -z-10"
          style={{ scale: bgScale, opacity: bgOpacity }}
        >
          <img
            src={facilityImg}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/85 via-white/75 to-white/95 dark:from-slate-950/85 dark:via-slate-950/75 dark:to-slate-950/95" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.08),transparent_60%)]" />

        <div className="relative max-w-6xl mx-auto w-full">
          <Eyebrow>Our Proven Process</Eyebrow>
          <h2 className="mt-4 font-serif-display italic text-4xl md:text-5xl text-slate-900 dark:text-slate-100 leading-tight max-w-3xl">
            From <span className="text-emerald-600 dark:text-emerald-400 not-italic">Vision</span>{" "}
            to <span className="text-sky-600 dark:text-sky-400 not-italic">Validation</span>.
          </h2>
          <p className="mt-5 text-slate-600 dark:text-slate-400 max-w-2xl">
            A structured, milestone-driven methodology that transforms regulatory complexity into
            competitive advantage.
          </p>

          <div className="mt-14 relative">
            <div className="absolute left-0 right-0 top-7 h-px bg-slate-200 dark:bg-slate-700" />
            <motion.div
              className="absolute left-0 top-7 h-px bg-gradient-to-r from-emerald-500 via-sky-500 to-emerald-500"
              style={{ width: lineWidth }}
            />

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {STEPS.map((s, i) => {
                const isActive = i <= active;
                return (
                  <div key={s.title} className="relative">
                    <motion.div
                      animate={{
                        scale: isActive ? 1 : 0.85,
                        backgroundColor: isActive
                          ? "rgb(5,150,105)"
                          : isDark
                            ? "rgb(15,23,42)"
                            : "rgb(255,255,255)",
                        borderColor: isActive
                          ? "rgb(16,185,129)"
                          : isDark
                            ? "rgb(51,65,85)"
                            : "rgb(226,232,240)",
                        color: isActive ? "#ffffff" : isDark ? "#94a3b8" : "#475569",
                      }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="relative z-10 mx-auto h-14 w-14 rounded-full border-2 grid place-items-center shadow-md"
                    >
                      <s.icon className="h-5 w-5" />
                    </motion.div>
                    <motion.div
                      animate={{ opacity: isActive ? 1 : 0.5 }}
                      transition={{ duration: 0.4 }}
                      className="mt-6 text-center"
                    >
                      <p className="text-[10px] font-mono tracking-[0.3em] text-emerald-600 uppercase">
                        Step 0{i + 1}
                      </p>
                      <h4 className="mt-2 font-serif-display italic text-xl text-slate-900 dark:text-slate-100">
                        {s.title}
                      </h4>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 max-w-2xl mx-auto text-center min-h-[5rem]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={active}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.4 }}
                  className="text-slate-700 dark:text-slate-300 leading-relaxed"
                >
                  {STEPS[active].body}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <p className="mt-10 text-center text-xs text-slate-500 dark:text-slate-500 max-w-2xl mx-auto">
            Every engagement begins with a comprehensive regulatory gap analysis and concludes with
            a portfolio of investor-ready compliance assets.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   6. Numbers Strip
   ============================================================ */

const STATS = [
  {
    value: 200,
    suffix: "+",
    label: "Regulatory Submissions",
    sub: "Across global agencies",
    icon: Briefcase,
  },
  {
    value: 40,
    suffix: "%",
    label: "Faster Time-to-Market",
    sub: "Average client improvement",
    icon: Clock,
  },
  {
    value: 98,
    suffix: "%",
    label: "First-Cycle Approval",
    sub: "Rate for prepared submissions",
    icon: ShieldCheck,
  },
  {
    value: 50,
    suffix: "+",
    label: "Expert Advisors",
    sub: "Former FDA, EMA & ICH veterans",
    icon: Users,
  },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

function NumbersStrip() {
  return (
    <section className="relative py-28 px-6 border-y border-slate-200 dark:border-slate-800 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <Eyebrow>By the Numbers</Eyebrow>
            <h2 className="mt-4 font-serif-display italic text-4xl md:text-5xl text-slate-900 dark:text-slate-100 leading-tight">
              Every complex journey has a{" "}
              <span className="text-emerald-600 dark:text-emerald-400 not-italic">
                clear path forward.
              </span>
            </h2>
            <p className="mt-5 text-slate-600 dark:text-slate-400 leading-relaxed">
              Regulatory uncertainty is the single greatest threat to biotech investment returns. We
              convert that uncertainty into structured, predictable milestones.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="h-full p-8 rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-lg transition-shadow duration-500">
                <div className="flex items-start justify-between gap-2">
                  <div className="font-sans text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-br from-sky-500 to-emerald-500 bg-clip-text text-transparent">
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-400 grid place-items-center ring-1 ring-rose-100 dark:ring-rose-900/50">
                    <s.icon className="h-4 w-4" />
                  </div>
                </div>
                <p className="mt-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {s.label}
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{s.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   7. Architects
   ============================================================ */

const ARCHITECTS = [
  {
    icon: Award,
    title: "Former Agency Reviewers",
    body: "Veterans from FDA, EMA, and PMDA who understand the reviewer mindset and how to build winning submissions.",
  },
  {
    icon: Briefcase,
    title: "Industry Strategists",
    body: "Senior consultants with decades of experience at top-tier pharma, biotech, and medical device companies.",
  },
  {
    icon: Cpu,
    title: "BioAI Specialists",
    body: "Pioneers in AI/ML regulatory science, bridging computational innovation with emerging global frameworks.",
  },
  {
    icon: ShieldCheck,
    title: "GMP Compliance Experts",
    body: "Deep specialists in biomanufacturing quality systems, facility design, and process validation strategy.",
  },
];

function ArchitectsGrid() {
  return (
    <section className="relative py-28 px-6 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <Eyebrow>Meet the Architects</Eyebrow>
          <h2 className="mt-4 font-serif-display italic text-4xl md:text-5xl text-slate-900 dark:text-slate-100 leading-tight max-w-3xl">
            of your{" "}
            <span className="text-emerald-600 dark:text-emerald-400 not-italic">
              regulatory success
            </span>
            .
          </h2>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {ARCHITECTS.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
                className="group h-full p-7 rounded-3xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 hover:border-emerald-200 dark:hover:border-emerald-700 hover:shadow-xl hover:shadow-emerald-500/5 transition-all"
              >
                <div className="h-12 w-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 grid place-items-center ring-1 ring-emerald-100 dark:ring-emerald-900 group-hover:scale-110 transition-transform">
                  <a.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 font-serif-display italic text-xl text-slate-900 dark:text-slate-100 leading-snug">
                  {a.title}
                </h3>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {a.body}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   8. Partner band
   ============================================================ */

const AUDIENCES = [
  {
    icon: Users,
    title: "For Founders",
    body: "Build a regulatory strategy that accelerates your path to commercialization and scales with your ambition.",
  },
  {
    icon: TrendingUp,
    title: "For Investors",
    body: "Conduct deeper due diligence with confidence — our assessments illuminate regulatory risk and timeline clarity.",
  },
  {
    icon: Building2,
    title: "For Boards",
    body: "Establish governance-grade compliance infrastructure that protects enterprise value at every stage.",
  },
];

function PartnerBand({ openContactModal }: { openContactModal: () => void }) {
  return (
    <section className="relative py-28 px-6 overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.10),transparent_60%)] dark:opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(16,185,129,0.10),transparent_60%)] dark:opacity-50" />

      <div className="relative max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <Eyebrow>Partner With Us</Eyebrow>
            <h2 className="mt-4 font-serif-display italic text-4xl md:text-6xl text-slate-900 dark:text-slate-100 leading-tight">
              Accelerate your{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent not-italic">
                investment trajectory.
              </span>
            </h2>
            <p className="mt-6 text-slate-600 dark:text-slate-400 leading-relaxed">
              Ready to de-risk your venture and attract serious capital? Our regulatory expertise
              becomes your company's most significant competitive asset — from Series A readiness to
              IPO compliance posture.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {AUDIENCES.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.1}>
              <div className="h-full p-8 rounded-3xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl transition-all">
                <div className="h-11 w-11 rounded-xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-100 dark:border-emerald-900 grid place-items-center text-emerald-600 dark:text-emerald-400">
                  <a.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 font-serif-display italic text-2xl text-slate-900 dark:text-slate-100">
                  {a.title}
                </h3>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {a.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-14 flex flex-wrap gap-4 justify-center">
            <button
              onClick={openContactModal}
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-emerald-600 text-white text-sm font-medium tracking-wide hover:bg-emerald-700 transition-all hover:shadow-[0_14px_40px_-12px_rgba(5,150,105,0.55)]"
            >
              Schedule a Consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm font-medium tracking-wide hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
            >
              <Download className="h-4 w-4" />
              Download Investor Deck
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   9. Tag strip
   ============================================================ */

function TagStrip() {
  const tags = [
    "FDA Regulatory Strategy",
    "EMA Submissions",
    "GMP Compliance",
    "AI/ML Pathways",
    "Investor Readiness",
  ];
  return (
    <section className="relative py-16 px-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto text-center">
        <p className="font-serif-display italic text-2xl md:text-3xl text-slate-800 dark:text-slate-200 leading-snug">
          The future of bio-innovation is{" "}
          <span className="text-emerald-600 dark:text-emerald-400">regulated</span>,{" "}
          <span className="text-sky-600 dark:text-sky-400">funded</span>, and built here.
        </p>
        <p className="mt-3 text-xs font-mono tracking-[0.3em] uppercase text-slate-500 dark:text-slate-500">
          Biotech · Biomanufacturing · BioAI
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-400 tracking-wide"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
