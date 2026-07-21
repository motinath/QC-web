import { useEffect, useRef, useState, useMemo } from "react";
import { Link } from "../../../lib/router-compat";
import { useContactModal } from "../../../components/shared/ContactModal";
import { useTheme } from "../../../components/shared/ThemeProvider";
import { Reveal } from "../../../components/shared/Reveal";
import {
  Search,
  Brain,
  Layers,
  Sparkles,
  ChevronDown,
  ExternalLink,
  Clock,
  ShieldCheck,
  Activity,
  Target,
  FlaskConical,
  Users,
  ChevronRight,
} from "lucide-react";

// --- Sub-component: GenomeAtlasHero ---
export function GenomeAtlasHero({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Array<{
      x: number;
      y: number;
      baseY: number;
      speed: number;
      phase: number;
      amplitude: number;
      size: number;
      color: string;
      glow: boolean;
    }> = [];

    const particleCount = width < 768 ? 85 : 185;
    const darkColors = ["#ffffff", "#e2e8f0", "#94a3b8", "#475569"]; // shades of white and gray only
    const lightColors = ["#1e3a8a", "#3b82f6", "#4f46e5", "#0d9488"]; // navy, medium blue, indigo, teal

    const colors = isDark ? darkColors : lightColors;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        baseY: Math.random() * height,
        y: 0,
        speed: Math.random() * 0.001 + 0.0003,
        phase: Math.random() * Math.PI * 2,
        amplitude: Math.random() * 15 + 5,
        size: Math.random() * 1.8 + 0.6,
        color: colors[Math.floor(Math.random() * colors.length)],
        glow: Math.random() > 0.8,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;
    let scrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    let time = 0;
    const render = () => {
      if (reducedMotion) {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = isDark ? "rgba(96, 165, 250, 0.03)" : "rgba(30, 58, 138, 0.03)";
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, Math.min(width, height) / 3, 0, Math.PI * 2);
        ctx.fill();
        return;
      }

      ctx.clearRect(0, 0, width, height);
      time += 0.25;

      ctx.fillStyle = isDark ? "rgba(10, 11, 13, 0.03)" : "rgba(255, 255, 255, 0.03)";
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = isDark ? "rgba(250, 246, 240, 0.015)" : "rgba(30, 58, 138, 0.02)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let i = 0; i < particles.length; i += 7) {
        for (let j = i + 1; j < Math.min(i + 4, particles.length); j++) {
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (dist < 90) {
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
          }
        }
      }
      ctx.stroke();

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += Math.sin(time * p.speed + p.phase) * 0.15;
        const waveY = p.baseY + Math.cos(p.x * 0.005 + time * p.speed) * p.amplitude;

        const dx = p.x - mouseX;
        const dy = waveY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let currentY = waveY;
        let currentX = p.x;

        if (dist < 140) {
          const force = (140 - dist) / 140;
          currentX += (dx / dist) * force * 12;
          currentY += (dy / dist) * force * 12;
        }

        if (scrollY > 0) {
          currentY += scrollY * 0.2 * (p.size * 0.4);
        }

        ctx.beginPath();
        ctx.arc(currentX, currentY % height, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;

        if (isDark && p.glow) {
          ctx.shadowBlur = 6;
          ctx.shadowColor = p.color;
          ctx.globalAlpha = 0.55;
        } else {
          ctx.globalAlpha = isDark ? 0.3 : 0.4;
        }

        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [reducedMotion, isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 bg-background"
    />
  );
}

// --- Sub-component: AnimatedCounter ---
export function AnimatedCounter({
  value,
  suffix = "",
  decimals = 0,
  duration = 1500,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setCount(easeProgress * value);
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return (
    <span ref={elementRef} className="font-mono tabular-nums">
      {count.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

export function InteractiveDiscoveryPipeline({ isDark }: { isDark: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeStage, setActiveStage] = useState(7); // Culmination cures highlighted by default

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6;
    }
  }, []);

  const stages = [
    {
      num: "01",
      name: "Bioinformatics",
      details: "Scan dark genomes using quantum sequence maps and networks.",
      tag: "AI + Big Data",
      icon: Search,
      phase: "W1-2",
      iconColor: "text-blue-500 bg-blue-500/10",
      badgeColor: "bg-blue-500/5 text-blue-500 border-blue-500/10",
      nodeColor: "border-blue-500 bg-blue-500/20",
      dotColor: "bg-blue-500",
      activeBorder: "border-blue-500/70",
      activeShadow: "shadow-lg shadow-blue-500/10",
      activeBg: "bg-blue-500/5 dark:bg-blue-950/10",
    },
    {
      num: "02",
      name: "Target ID",
      details: "Map 2D to 3D structure of undruggable targets.",
      tag: "AI + Machine Learning",
      icon: Target,
      phase: "W3-4",
      iconColor: "text-teal-500 bg-teal-500/10",
      badgeColor: "bg-teal-500/5 text-teal-500 border-teal-500/10",
      nodeColor: "border-teal-500 bg-teal-500/20",
      dotColor: "bg-teal-500",
      activeBorder: "border-teal-500/70",
      activeShadow: "shadow-lg shadow-teal-500/10",
      activeBg: "bg-teal-500/5 dark:bg-teal-950/10",
    },
    {
      num: "03",
      name: "Hit Discovery",
      details: "Test compound libraries against target RNA models.",
      tag: "Quantum + Docking",
      icon: Sparkles,
      phase: "W5-8",
      iconColor: "text-emerald-500 bg-emerald-500/10",
      badgeColor: "bg-emerald-500/5 text-emerald-500 border-emerald-500/10",
      nodeColor: "border-emerald-500 bg-emerald-500/20",
      dotColor: "bg-emerald-500",
      activeBorder: "border-emerald-500/70",
      activeShadow: "shadow-lg shadow-emerald-500/10",
      activeBg: "bg-emerald-500/5 dark:bg-emerald-950/10",
    },
    {
      num: "04",
      name: "Lead Opt.",
      details: "Refine chemical candidates for optimal efficacy and binding.",
      tag: "GNN + QSAR",
      icon: FlaskConical,
      phase: "W9-14",
      iconColor: "text-amber-500 bg-amber-500/10",
      badgeColor: "bg-amber-500/5 text-amber-500 border-amber-500/10",
      nodeColor: "border-amber-500 bg-amber-500/20",
      dotColor: "bg-amber-500",
      activeBorder: "border-amber-500/70",
      activeShadow: "shadow-lg shadow-amber-500/10",
      activeBg: "bg-amber-500/5 dark:bg-amber-950/10",
    },
    {
      num: "05",
      name: "Preclinical Val.",
      details: "Validate candidate safety and target performance.",
      tag: "In Silico + PD/PK",
      icon: ShieldCheck,
      phase: "M4-8",
      iconColor: "text-orange-500 bg-orange-500/10",
      badgeColor: "bg-orange-500/5 text-orange-500 border-orange-500/10",
      nodeColor: "border-orange-500 bg-orange-500/20",
      dotColor: "bg-orange-500",
      activeBorder: "border-orange-500/70",
      activeShadow: "shadow-lg shadow-orange-500/10",
      activeBg: "bg-orange-500/5 dark:bg-orange-950/10",
    },
    {
      num: "06",
      name: "Clinical Trials",
      details: "Evaluate therapeutic efficacy and side-effects in phases I–III.",
      tag: "AI-Driven Analytics",
      icon: Users,
      phase: "Y1-3",
      iconColor: "text-purple-500 bg-purple-500/10",
      badgeColor: "bg-purple-500/5 text-purple-500 border-purple-500/10",
      nodeColor: "border-purple-500 bg-purple-500/20",
      dotColor: "bg-purple-500",
      activeBorder: "border-purple-500/70",
      activeShadow: "shadow-lg shadow-purple-500/10",
      activeBg: "bg-purple-500/5 dark:bg-purple-950/10",
    },
    {
      num: "07",
      name: "FDA Approval",
      details: "Complete regulatory review and submission for market access.",
      tag: "Compliance + AI",
      icon: ShieldCheck,
      phase: "Final",
      iconColor: "text-indigo-500 bg-indigo-500/10",
      badgeColor: "bg-indigo-500/5 text-indigo-500 border-indigo-500/10",
      nodeColor: "border-indigo-500 bg-indigo-500/20",
      dotColor: "bg-indigo-500",
      activeBorder: "border-indigo-500/70",
      activeShadow: "shadow-lg shadow-indigo-500/10",
      activeBg: "bg-indigo-500/5 dark:bg-indigo-950/10",
    },
    {
      num: "08",
      name: "From Code to Cure",
      details: "Accelerating therapeutics at every step.",
      tag: "Culmination",
      icon: Sparkles,
      phase: "Goal",
      iconColor: "text-violet-500 bg-violet-500/10",
      badgeColor: "bg-violet-500/5 text-violet-500 border-violet-500/10",
      nodeColor: "border-violet-500 bg-violet-500/20",
      dotColor: "bg-violet-500",
      activeBorder: "border-violet-500",
      activeShadow: "shadow-lg shadow-violet-500/25",
      activeBg: "bg-violet-500/10 dark:bg-violet-950/20",
      isHighlighted: true,
    },
  ];

  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden">
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* 1. Centered Widescreen Cinematic Video Player */}
      <div className="w-full max-w-4xl mx-auto mb-8 px-6">
        <div className="relative w-full aspect-[16/10] md:aspect-[19/9] rounded-3xl overflow-hidden bg-zinc-950 border border-border-subtle/30 shadow-2xl">
          <video
            ref={videoRef}
            src="/dd.mp4"
            className="w-full h-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 pointer-events-none" />
        </div>
      </div>

      {/* 2. Top Horizontal Nodes timeline line */}
      <div className="hidden lg:grid lg:grid-cols-8 gap-3 w-full relative mb-8">
        {/* Background dotted line representing the full track length */}
        <div className="absolute top-1/2 left-[6.25%] right-[6.25%] h-0 border-t-2 border-dashed border-border-subtle/30 -translate-y-1/2 -z-10" />

        {/* Dynamic sliding solid gradient connector line */}
        <div
          className="absolute top-1/2 left-[6.25%] h-[3px] bg-gradient-to-r from-blue-500 via-teal-500 via-emerald-500 via-amber-500 via-orange-500 via-purple-500 via-indigo-500 to-violet-500 -translate-y-1/2 -z-10 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(activeStage / 7) * 87.5}%` }}
        />

        {stages.map((stage, idx) => {
          const isActive = idx <= activeStage;
          return (
            <div key={idx} className="flex justify-center">
              {/* Outer ring and center dot */}
              <div
                className={`h-9 w-9 rounded-full bg-bg-raised border-[3px] flex items-center justify-center shadow-md transition-all duration-300 cursor-pointer ${
                  isActive
                    ? stage.nodeColor
                    : "border-border-subtle/40 bg-zinc-800/10 text-zinc-500"
                }`}
                onClick={() => setActiveStage(idx)}
                onMouseEnter={() => setActiveStage(idx)}
              >
                <div
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                    isActive ? stage.dotColor : "bg-text-tertiary/20"
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Cards grid sequence (scrollable on mobile/tablet, 8-col grid on desktop) */}
      <div className="w-full mt-2 relative">
        <div className="flex overflow-x-auto lg:grid lg:grid-cols-8 gap-3 pt-2.5 pb-8 lg:py-3.5 no-scrollbar snap-x snap-mandatory overflow-y-visible">
          {stages.map((stage, idx) => {
            const StageIcon = stage.icon;
            const isCurrent = idx === activeStage;
            const isReached = idx <= activeStage;

            return (
              <div
                key={idx}
                className="relative flex-shrink-0 lg:flex-shrink w-[200px] lg:w-auto snap-center group cursor-pointer"
                onMouseEnter={() => setActiveStage(idx)}
                onClick={() => setActiveStage(idx)}
              >
                {/* Card Container */}
                <div
                  className={`h-full border rounded-2xl p-4 flex flex-col items-center text-center backdrop-blur transition-all duration-350 ${
                    isCurrent
                      ? `${stage.activeBorder} ${stage.activeBg} ${stage.activeShadow} scale-[1.02]`
                      : stage.isHighlighted
                        ? "border-violet-500/40 bg-violet-500/5 dark:bg-violet-950/10 shadow-sm shadow-violet-500/5 hover:border-violet-500/70"
                        : isDark
                          ? "border-border-subtle bg-bg-raised/40 hover:border-accent-blue/30"
                          : "border-slate-200 bg-white hover:border-accent-blue/30 shadow-sm shadow-slate-100/50"
                  }`}
                >
                  {/* Icon Circle */}
                  <div
                    className={`h-11 w-11 rounded-full flex items-center justify-center mb-3.5 transition-transform duration-350 ${
                      isCurrent || isReached
                        ? stage.iconColor
                        : "text-text-secondary bg-border-subtle/5"
                    }`}
                  >
                    <StageIcon className="h-4.5 w-4.5" />
                  </div>

                  {/* Stage Number Label */}
                  <span className="text-xs font-mono font-bold text-text-tertiary block mb-1">
                    {stage.num}
                  </span>

                  {/* Stage Name */}
                  <h4 className="font-sans text-sm font-semibold text-text-primary leading-tight mb-2.5">
                    {stage.name}
                  </h4>

                  {/* Description Centered */}
                  <p className="text-xs text-text-secondary leading-relaxed mb-4 font-medium min-h-[72px]">
                    {stage.details}
                  </p>

                  {/* Bottom tag pill */}
                  <div
                    className={`mt-auto px-2.5 py-1 text-xs font-mono font-bold border rounded-full transition-colors duration-350 ${
                      isCurrent || isReached
                        ? stage.badgeColor
                        : "border-border-subtle/20 text-text-secondary/80 bg-border-subtle/10"
                    }`}
                  >
                    {stage.tag}
                  </div>
                </div>
                {/* Floating Chevron right (desktop only) */}
                {idx < stages.length - 1 && (
                  <div className="absolute right-[-8px] top-[50%] -translate-y-1/2 translate-x-1/2 z-30 hidden lg:block text-text-tertiary">
                    <ChevronRight className="h-4 w-4 opacity-40" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// --- Sub-component: KeyApproachesGrid ---
export function KeyApproachesGrid({ isDark }: { isDark: boolean }) {
  const [filter, setFilter] = useState("all");

  const approaches = [
    {
      title: "Target-based",
      subtitle: "Structure & ligand design",
      desc: "Focused on specific structural receptor folds to model, design, and optimize ligand binding pocket affinity.",
      category: "hypothesis-driven",
      catLabel: "Hypothesis-driven",
      color: "border-blue-500/20 text-blue-500 bg-blue-500/5 hover:border-blue-500",
      dot: "bg-blue-500",
    },
    {
      title: "Phenotypic",
      subtitle: "Whole-cell testing",
      desc: "Screening chemical agents in whole cell environments to record functional biological activity directly.",
      category: "screening-based",
      catLabel: "Screening-based",
      color: "border-emerald-500/20 text-emerald-500 bg-emerald-500/5 hover:border-emerald-500",
      dot: "bg-emerald-500",
    },
    {
      title: "High-throughput",
      subtitle: "Robotic screening",
      desc: "Using advanced automation pipelines to execute thousands of simultaneous assays and screen chemical spaces rapidly.",
      category: "screening-based",
      catLabel: "Screening-based",
      color: "border-emerald-500/20 text-emerald-500 bg-emerald-500/5 hover:border-emerald-500",
      dot: "bg-emerald-500",
    },
    {
      title: "Fragment-based",
      subtitle: "Grow small binders",
      desc: "Identifying and screening small chemical fragments and structurally evolving them into high-affinity candidates.",
      category: "source-based",
      catLabel: "Source-based",
      color: "border-amber-500/20 text-amber-500 bg-amber-500/5 hover:border-amber-500",
      dot: "bg-amber-500",
    },
    {
      title: "Combinatorial",
      subtitle: "Diverse libraries",
      desc: "Synthesizing and mapping massive, structurally cataloged chemical libraries to discover candidate starting shapes.",
      category: "screening-based",
      catLabel: "Screening-based",
      color: "border-emerald-500/20 text-emerald-500 bg-emerald-500/5 hover:border-emerald-500",
      dot: "bg-emerald-500",
    },
    {
      title: "Natural products",
      subtitle: "Plants & biologics",
      desc: "Harnessing molecular agents from evolutionary biological origins, modified to achieve therapeutic compatibility.",
      category: "source-based",
      catLabel: "Source-based",
      color: "border-amber-500/20 text-amber-500 bg-amber-500/5 hover:border-amber-500",
      dot: "bg-amber-500",
    },
    {
      title: "Genomics-driven",
      subtitle: "Omics-based targets",
      desc: "Leveraging multi-omics data models, sequence analysis, and genomics databases to reveal hidden therapeutic targets.",
      category: "hypothesis-driven",
      catLabel: "Hypothesis-driven",
      color: "border-blue-500/20 text-blue-500 bg-blue-500/5 hover:border-blue-500",
      dot: "bg-blue-500",
    },
    {
      title: "Computational/AI",
      subtitle: "In silico design",
      desc: "Using neural networks and physics solvers to simulate binding pockets and predict molecular configurations.",
      category: "computational",
      catLabel: "Computational/Strategic",
      color: "border-purple-500/20 text-purple-500 bg-purple-500/5 hover:border-purple-500",
      dot: "bg-purple-500",
    },
    {
      title: "Drug repurposing",
      subtitle: "Reuse approved drugs",
      desc: "Evaluating clinically verified assets against newly modeled targets to isolate novel treatment indications.",
      category: "computational",
      catLabel: "Computational/Strategic",
      color: "border-purple-500/20 text-purple-500 bg-purple-500/5 hover:border-purple-500",
      dot: "bg-purple-500",
    },
  ];

  const filtered =
    filter === "all" ? approaches : approaches.filter((app) => app.category === filter);

  return (
    <div className="w-full">
      {/* Category filter pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {[
          { id: "all", label: "All Approaches" },
          { id: "hypothesis-driven", label: "Hypothesis-driven", dot: "bg-blue-500" },
          { id: "screening-based", label: "Screening-based", dot: "bg-emerald-500" },
          { id: "source-based", label: "Source-based", dot: "bg-amber-500" },
          { id: "computational", label: "Computational/Strategic", dot: "bg-purple-500" },
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => setFilter(btn.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition duration-300 flex items-center gap-2 border ${
              filter === btn.id
                ? "bg-accent-blue dark:bg-white text-white dark:text-zinc-950 border-accent-blue dark:border-white shadow-md shadow-accent-blue/15"
                : "bg-bg-raised/60 hover:bg-bg-raised text-text-secondary border-border-subtle/80 hover:border-text-secondary"
            }`}
          >
            {btn.dot && <span className={`h-1.5 w-1.5 rounded-full ${btn.dot}`} />}
            {btn.label}
          </button>
        ))}
      </div>

      {/* Approaches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
        {filtered.map((item, idx) => (
          <div key={idx} className="relative group">
            {/* Visual background offset */}
            <div
              className={`absolute -bottom-2 -right-2 h-full w-full rounded-2xl -z-10 transition-all ${
                isDark
                  ? "bg-[#181a1d] border border-border-subtle/50"
                  : "bg-[#f4f0e6] border border-slate-200/50"
              }`}
            />

            <div
              className={`h-full border rounded-2xl p-6 flex flex-col justify-between backdrop-blur transition-all duration-300 group-hover:-translate-y-0.5 ${
                isDark
                  ? "border-border-subtle bg-bg-raised/40 hover:border-zinc-700"
                  : "border-slate-200 bg-white shadow-sm hover:border-slate-350 hover:shadow-md"
              }`}
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-mono font-bold tracking-widest text-text-tertiary uppercase">
                    Approach {idx + 1}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded text-xs font-mono font-bold border uppercase tracking-wider flex items-center gap-1.5 ${item.color}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${item.dot}`} />
                    {item.catLabel}
                  </span>
                </div>

                <h4 className="text-base font-serif-display font-bold text-text-primary mb-1">
                  {item.title}
                </h4>

                <p className="text-xs font-mono text-accent-blue dark:text-accent-emerald font-bold uppercase tracking-wide mb-3">
                  {item.subtitle}
                </p>

                <p className="text-xs text-text-secondary leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border-subtle/20 flex justify-between items-center text-xs font-mono text-text-tertiary font-semibold">
                <span>Standardized Target Lock</span>
                <span>Active Model</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Sub-component: ValueRealization ---
export function ValueRealization({ isDark }: { isDark: boolean }) {
  const [selectedRegion, setSelectedRegion] = useState("all");

  const regions = {
    all: {
      title: "The Unmapped Reservoir",
      desc: "Our platform opens up the 98% non-expressing genome dismissed as 'junk DNA.' Below are the structural sub-domains we map to synthesize functional therapeutic candidates.",
      evidence: "Founding research team spent 15+ years published across 12+ peer-reviewed papers.",
    },
    intergenic: {
      title: "Intergenic DNA & ORFs",
      desc: "Genomic segments lying between genes. We locate hidden open reading frames (ORFs) that evolution preserved but never expressed under normal conditions.",
      evidence: "Creates completely custom, first-in-class assets with clean, defensible IP.",
    },
    introns: {
      title: "Introns & Splice boundaries",
      desc: "Non-coding sections of RNA transcript split out before translation. We map alternative splicing frames to generate high-affinity peptide leads.",
      evidence: "Targeting cancer splice variations and cell-cycle boundaries directly.",
    },
    antisense: {
      title: "Antisense Strands",
      desc: "The opposite DNA sequence that coordinates gene transcript activity. We identify functional templates directly on antisense configurations.",
      evidence: "Allows bypassing standard coding sequence bottlenecks.",
    },
    pseudogenes: {
      title: "Pseudogenes",
      desc: "Defunct gene copies resembling real genes but inactive. Our models re-engineer these elements to output synthetic proteins.",
      evidence: "Creates novel molecular classes with no preexisting prior art.",
    },
    lncrna: {
      title: "lncRNA & tRNA domains",
      desc: "Non-translating structural RNAs that control cell regulation. We model 3D target pockets on long non-coding RNAs and tRNA structures.",
      evidence: "Discovered and named tRNA-encoded peptides (tREPs) class.",
    },
  };

  const current = regions[selectedRegion as keyof typeof regions] || regions.all;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: DNA Helix Interactivity */}
        <div className="lg:col-span-6 relative flex flex-col justify-between border rounded-2xl p-5 md:p-6 overflow-hidden bg-bg-raised/40 border-border-subtle/50 backdrop-blur">
          {/* Subtle grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />

          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent-blue dark:text-zinc-500 font-bold">
                Genomic Dark Matter Interactive Model
              </span>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            </div>

            <h3 className="font-serif-display text-xl font-bold text-text-primary mb-3">
              Explore Non-Coding Regions
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed mb-6">
              Click on different layers of the genomic map to isolate structural elements utilized
              by the Quantum Codon platform.
            </p>

            {/* Buttons list */}
            <div className="relative flex flex-col gap-2.5 w-full my-4">
              {[
                {
                  id: "intergenic",
                  label: "Intergenic DNA",
                  color: "border-blue-500/30 hover:border-blue-500 text-blue-500",
                },
                {
                  id: "introns",
                  label: "Introns & Alternative ORFs",
                  color: "border-emerald-500/30 hover:border-emerald-500 text-emerald-500",
                },
                {
                  id: "antisense",
                  label: "Antisense Strands",
                  color: "border-amber-500/30 hover:border-amber-500 text-amber-500",
                },
                {
                  id: "pseudogenes",
                  label: "Pseudogenes",
                  color: "border-purple-500/30 hover:border-purple-500 text-purple-500",
                },
                {
                  id: "lncrna",
                  label: "lncRNA & tRNA regions",
                  color: "border-rose-500/30 hover:border-rose-500 text-rose-500",
                },
              ].map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => setSelectedRegion(reg.id)}
                  className={`w-full py-2.5 px-4 rounded-xl border text-[11px] font-mono font-semibold uppercase tracking-wider text-left transition-all duration-300 flex justify-between items-center bg-bg-raised hover:scale-[1.01] ${reg.color} ${
                    selectedRegion === reg.id
                      ? "scale-[1.01] border-opacity-100 ring-1 ring-offset-2 ring-accent-blue/30"
                      : "opacity-80"
                  }`}
                >
                  <span>{reg.label}</span>
                  <span className="text-[9px] opacity-75">Inspect →</span>
                </button>
              ))}

              {selectedRegion !== "all" && (
                <button
                  onClick={() => setSelectedRegion("all")}
                  className="text-[10px] font-mono text-center text-text-secondary mt-1 hover:text-text-primary underline self-center"
                >
                  Reset to Overview
                </button>
              )}
            </div>
          </div>

          {/* Dynamic details pane */}
          <div className="mt-8 pt-6 border-t border-border-subtle/20 min-h-[140px] flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-serif-display font-bold text-text-primary mb-1 uppercase tracking-wide">
                {current.title}
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">{current.desc}</p>
            </div>
            <p className="text-[10px] font-mono text-accent-blue dark:text-accent-emerald font-semibold mt-3 italic">
              ✦ {current.evidence}
            </p>
          </div>
        </div>

        {/* Right Column: Investor & Partner Value Props */}
        <div className="lg:col-span-6 flex flex-col gap-6 md:gap-8 justify-between">
          {/* Card 1: Investors */}
          <div className="relative group flex-1">
            <div
              className={`absolute -bottom-2 -right-2 h-full w-full rounded-2xl -z-10 transition-all ${
                isDark
                  ? "bg-[#181a1d] border border-border-subtle"
                  : "bg-[#f4f0e6] border border-slate-200"
              }`}
            />
            <div
              className={`h-full border rounded-2xl p-5 md:p-6 flex flex-col justify-between backdrop-blur transition-all duration-300 group-hover:-translate-y-0.5 ${
                isDark
                  ? "border-border-subtle bg-bg-raised/40 hover:border-zinc-700"
                  : "border-slate-200 bg-white shadow-md shadow-slate-100/50 hover:border-slate-350"
              }`}
            >
              <div className="space-y-3">
                <span className="px-2 py-0.5 rounded text-[8px] font-mono font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20 uppercase tracking-widest">
                  Investor Proposition
                </span>
                <h4 className="text-lg font-serif-display font-bold text-text-primary">
                  Proprietary Discovery Engine
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Sitting on genomic real estate no competitor has staked a claim to — a pipeline of
                  first-in-class assets generated at a fraction of the cost and timeline of
                  conventional discovery, with a founding team whose published track record de-risks
                  the science years ahead of typical seed-stage platforms.
                </p>
              </div>
              <div className="flex items-center gap-2 mt-4 text-[10px] font-mono text-text-tertiary">
                <Clock className="w-3.5 h-3.5" />
                <span>Accelerated timeline to Seed / Series A milestones</span>
              </div>
            </div>
          </div>

          {/* Card 2: Industry Partners */}
          <div className="relative group flex-1">
            <div
              className={`absolute -bottom-2 -right-2 h-full w-full rounded-2xl -z-10 transition-all ${
                isDark
                  ? "bg-[#181a1d] border border-border-subtle"
                  : "bg-[#f4f0e6] border border-slate-200"
              }`}
            />
            <div
              className={`h-full border rounded-2xl p-5 md:p-6 flex flex-col justify-between backdrop-blur transition-all duration-300 group-hover:-translate-y-0.5 ${
                isDark
                  ? "border-border-subtle bg-bg-raised/40 hover:border-zinc-700"
                  : "border-slate-200 bg-white shadow-md shadow-slate-100/50 hover:border-slate-350"
              }`}
            >
              <div className="space-y-3">
                <span className="px-2 py-0.5 rounded text-[8px] font-mono font-bold bg-purple-500/10 text-purple-500 border border-purple-500/20 uppercase tracking-widest">
                  Industry Partner Proposition
                </span>
                <h4 className="text-lg font-serif-display font-bold text-text-primary">
                  Pre-Validated Molecules & Enzyme Candidates
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Access to pre-validated, screened molecules and enzyme candidates ready for
                  licensing or tech transfer — new chemical entities and catalytic scaffolds that
                  expand your pipeline without inheriting the freedom-to-operate constraints of
                  conventionally sourced IP.
                </p>
              </div>
              <div className="flex items-center gap-2 mt-4 text-[10px] font-mono text-text-tertiary">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Clean, defensible IP & freedom-to-operate certainty</span>
              </div>
            </div>
          </div>

          {/* Lead Candidate callout banner */}
          <div className="relative overflow-hidden rounded-2xl border p-4 bg-gradient-to-r from-accent-blue/10 via-indigo-500/5 to-purple-500/10 border-accent-blue/20 dark:border-accent-blue/30 backdrop-blur">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  <span className="text-[10px] font-mono uppercase font-bold text-accent-blue dark:text-zinc-350">
                    Lead Compound Highlight
                  </span>
                </div>
                <h5 className="text-xs font-serif-display font-bold text-text-primary">
                  tREP-18 — Nanomolar Antileishmanial Activity (IC50 ≈ 22 nM)
                </h5>
                <p className="text-[11px] text-text-secondary max-w-xl">
                  Demonstrates potent efficacy against pathogens while completely sparing human
                  cells — verifying that dark genome mapping produces drug-like, non-toxic
                  molecules.
                </p>
              </div>
              <div className="flex items-center justify-start">
                <span className="text-[10px] font-mono border rounded px-2.5 py-1 text-accent-blue dark:text-zinc-350 border-accent-blue/30 whitespace-nowrap">
                  Validated In Vitro
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Sub-component: OutLicensingDatabase ---
export function OutLicensingDatabase({ isDark }: { isDark: boolean }) {
  const contactModal = useContactModal();
  const [search, setSearch] = useState("");
  const [materialFilter, setMaterialFilter] = useState("all");
  const [stageFilter, setStageFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const molecules = [
    {
      id: "qC-36",
      material: "compound",
      market: "Infectious Disease",
      indication: "Malaria",
      moa: "Novel blood-stage target",
      stage: "Preclinical In Vivo",
      differentiator: "Active against artemisinin-resistant strains",
      highlightedData: "100% clearance in the in vivo models",
      badgeColor: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      description:
        "A novel compound targeting malaria blood-stage receptors. Standard therapies have struggled with emerging artemisinin-resistant variations. qC-36 provides complete biochemical clearance in animal trials.",
    },
    {
      id: "qC-45",
      material: "compound",
      market: "Regenerative / Dermatology",
      indication: "Chronic Wound Healing",
      moa: "Angiogenesis / Tissue repair promoter",
      stage: "Preclinical In Vivo",
      differentiator: "Accelerates closure; stable at room temperature",
      highlightedData: "Full re-epithelialization in 14 days in severe models",
      badgeColor: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      description:
        "Designed to trigger cellular tissue repair pathways. It acts as an organic promoter of angiogenesis (blood vessel formation), facilitating tissue healing without cold-chain storage dependencies.",
    },
    {
      id: "qC-63",
      material: "compound",
      market: "Aesthetics / Dermatology",
      indication: "Hair Fall (Alopecia)",
      moa: "Follicle stem cell activator",
      stage: "Preclinical In Vivo",
      differentiator: "Non-hormonal mechanism; higher efficacy than SoC*",
      highlightedData: "3x increase in active hair follicles in vivo",
      badgeColor: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      description:
        "A non-hormonal, high-efficacy candidate that activates follicle stem cells. Overcomes the side-effect profiles associated with current standard of care (SoC) therapies by bypassing hormonal systems.",
    },
    {
      id: "qC-73",
      material: "peptide",
      market: "Infectious Disease",
      indication: "Leishmaniasis",
      moa: "Parasite-specific disruption",
      stage: "In Vitro",
      differentiator: "High efficacy without toxicity",
      highlightedData: "Does not affect human cells even at 10x concentration",
      badgeColor: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      description:
        "A highly selective synthetic peptide that disrupts parasite membranes with surgical accuracy. Efficacy is verified in vitro with an exceptionally clean safety profile in mammalian host cells.",
    },
    {
      id: "qC-99",
      material: "peptide",
      market: "Neurodegenerative",
      indication: "Alzheimer's Disease",
      moa: "Neuroinflammation inhibitor",
      stage: "In Vitro",
      differentiator: "High Blood-Brain Barrier (BBB) penetration; oral",
      highlightedData: "95% reduction in BACE enzyme, cell line results",
      badgeColor: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      description:
        "A blood-brain-barrier penetrating peptide targeting BACE enzyme pathways. It shuts down neuroinflammatory signaling cascades and blocks amyloid plaque formation in cell-line assays.",
    },
  ];

  const filtered = molecules.filter((mol) => {
    const matchesSearch =
      mol.id.toLowerCase().includes(search.toLowerCase()) ||
      mol.indication.toLowerCase().includes(search.toLowerCase()) ||
      mol.market.toLowerCase().includes(search.toLowerCase()) ||
      mol.moa.toLowerCase().includes(search.toLowerCase());

    const matchesMaterial = materialFilter === "all" || mol.material === materialFilter;
    const matchesStage = stageFilter === "all" || mol.stage === stageFilter;

    return matchesSearch && matchesMaterial && matchesStage;
  });

  return (
    <div className="w-full space-y-6">
      {/* Filters & Search Row */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
          <input
            type="text"
            placeholder="Search candidates by ID, Indication, Market..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 text-xs rounded-full border bg-bg-raised transition-all ${
              isDark
                ? "border-zinc-800 focus:border-zinc-650 focus:ring-1 focus:ring-zinc-600 outline-none"
                : "border-slate-200 focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30 outline-none"
            }`}
          />
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Material selector */}
          <div className="flex rounded-full border border-border-subtle p-0.5 bg-bg-raised/50">
            {["all", "compound", "peptide"].map((mat) => (
              <button
                key={mat}
                onClick={() => setMaterialFilter(mat)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-mono uppercase font-bold tracking-wide transition-all ${
                  materialFilter === mat
                    ? "bg-accent-blue dark:bg-white text-white dark:text-zinc-950 shadow"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {mat === "all" ? "All Materials" : mat + "s"}
              </button>
            ))}
          </div>

          {/* Stage selector */}
          <div className="flex rounded-full border border-border-subtle p-0.5 bg-bg-raised/50">
            {["all", "Preclinical In Vivo", "In Vitro"].map((stg) => (
              <button
                key={stg}
                onClick={() => setStageFilter(stg)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-mono uppercase font-bold tracking-wide transition-all ${
                  stageFilter === stg
                    ? "bg-accent-blue dark:bg-white text-white dark:text-zinc-950 shadow"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {stg === "all" ? "All Stages" : stg}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Table/Grid */}
      <div className="overflow-hidden rounded-2xl border border-border-subtle/80 bg-bg-raised/10 backdrop-blur shadow-xl shadow-slate-100/50 dark:shadow-none">
        {/* Desktop Header */}
        <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4 border-b border-border-subtle/40 bg-bg-raised/40 text-xs font-mono uppercase tracking-wider font-bold text-text-tertiary">
          <div className="col-span-1">ID</div>
          <div className="col-span-2">Material</div>
          <div className="col-span-2">Market / Indication</div>
          <div className="col-span-2">Mechanism of Action</div>
          <div className="col-span-2">Current Stage</div>
          <div className="col-span-3">Key Differentiator</div>
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-16 space-y-3">
            <Activity className="h-8 w-8 mx-auto text-text-tertiary animate-pulse" />
            <p className="text-xs text-text-secondary font-medium font-mono">
              No matching molecular candidates found.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setMaterialFilter("all");
                setStageFilter("all");
              }}
              className="text-xs font-mono font-bold uppercase text-accent-blue hover:underline"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Rows */}
        <div className="divide-y divide-border-subtle/20">
          {filtered.map((mol) => {
            const isExpanded = expandedId === mol.id;
            return (
              <div
                key={mol.id}
                className={`transition-all duration-300 ${
                  isExpanded ? "bg-accent-blue/5 dark:bg-zinc-900/30" : "hover:bg-bg-raised/20"
                }`}
              >
                {/* Table Row / Trigger */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : mol.id)}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-6 py-4 items-center cursor-pointer text-xs"
                >
                  {/* ID */}
                  <div className="col-span-1 font-mono font-bold text-text-primary flex items-center justify-between lg:block">
                    <span className="lg:hidden text-[9px] text-text-tertiary uppercase tracking-wider">
                      Candidate ID:
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent-blue dark:bg-accent-emerald animate-pulse" />
                      {mol.id}
                    </span>
                  </div>

                  {/* Material */}
                  <div className="col-span-2 font-mono flex items-center justify-between lg:block">
                    <span className="lg:hidden text-[9px] text-text-tertiary uppercase tracking-wider">
                      Material:
                    </span>
                    <span className="capitalize font-semibold text-text-secondary">
                      {mol.material}
                    </span>
                  </div>

                  {/* Market / Indication */}
                  <div className="col-span-2 flex items-center justify-between lg:block">
                    <span className="lg:hidden text-[9px] text-text-tertiary uppercase tracking-wider">
                      Indication:
                    </span>
                    <div>
                      <p className="font-semibold text-text-primary">{mol.indication}</p>
                      <p className="text-[10px] text-text-secondary">{mol.market}</p>
                    </div>
                  </div>

                  {/* MoA */}
                  <div className="col-span-2 flex items-center justify-between lg:block">
                    <span className="lg:hidden text-[9px] text-text-tertiary uppercase tracking-wider">
                      Mechanism:
                    </span>
                    <span className="text-text-secondary leading-normal">{mol.moa}</span>
                  </div>

                  {/* Current Stage */}
                  <div className="col-span-2 flex items-center justify-between lg:block">
                    <span className="lg:hidden text-[9px] text-text-tertiary uppercase tracking-wider">
                      Stage:
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-semibold border ${mol.badgeColor}`}
                    >
                      {mol.stage}
                    </span>
                  </div>

                  {/* Differentiator & Chevron */}
                  <div className="col-span-3 flex items-center justify-between lg:block">
                    <span className="lg:hidden text-[9px] text-text-tertiary uppercase tracking-wider">
                      Key Feature:
                    </span>
                    <div className="flex items-center justify-end lg:justify-between w-full gap-4">
                      <span className="text-[11px] text-text-secondary italic lg:not-italic font-medium leading-normal text-right lg:text-left">
                        {mol.differentiator}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-text-tertiary transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Expanded Details Pane */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-border-subtle/10 grid md:grid-cols-12 gap-6 items-center animate-fade-in">
                    <div className="md:col-span-8 space-y-3">
                      <p className="text-[10px] font-mono uppercase font-bold text-accent-blue dark:text-accent-emerald tracking-widest">
                        Asset Profile & Structural Description
                      </p>
                      <p className="text-xs text-text-secondary leading-relaxed font-medium">
                        {mol.description}
                      </p>
                    </div>

                    <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-border-subtle/20 pt-4 md:pt-0 md:pl-6 space-y-4">
                      <div>
                        <span className="text-[9px] font-mono uppercase tracking-wider text-text-tertiary block mb-1">
                          In Vivo / In Vitro Highlighted Data
                        </span>
                        <div className="px-3 py-2 rounded-xl bg-accent-blue/5 border border-accent-blue/10 text-xs font-mono font-bold text-accent-blue dark:text-white flex items-center gap-2">
                          <ShieldCheck className="h-4 w-4 text-accent-blue dark:text-accent-emerald shrink-0" />
                          <span>{mol.highlightedData}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => contactModal.open()}
                        className="w-full py-2.5 px-4 rounded-full bg-accent-blue dark:bg-white hover:bg-accent-blue/90 dark:hover:bg-zinc-100 text-white dark:text-zinc-950 text-[10px] font-mono uppercase font-bold tracking-wider transition-all duration-300 hover:scale-[1.02] shadow flex items-center justify-center gap-1.5"
                      >
                        Request Out-Licensing Dossier
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <p className="text-[10px] text-text-tertiary font-mono text-center">
        * SoC = Standard of Care. All clinical targets are backed by internal biological assays and
        peer publications.
      </p>
    </div>
  );
}

// --- Sub-component: PublicationsLibrary ---
export function PublicationsLibrary({ isDark }: { isDark: boolean }) {
  const [search, setSearch] = useState("");
  const [topicFilter, setTopicFilter] = useState("all");

  const publications = [
    {
      num: 1,
      title: "tREPs – a new class of functional tRNA encoded peptides",
      authors: "Chakrabarti, A., Kaushik, M., Khan, J., et al.",
      year: "2022",
      journal: "ACS Omega, 7(22), 18361–18373",
      url: "https://doi.org/10.1021/acsomega.2c01234",
      topic: "tREPs",
      category: "treps",
    },
    {
      num: 2,
      title: "Synthesizing non-natural parts from natural genomic template",
      authors: "Dhar, P. K., Nanduri, B., et al.",
      year: "2009",
      journal: "Journal of Biological Engineering, 3, 2",
      url: "https://doi.org/10.1186/1754-1611-3-2",
      topic: "Dark Genome",
      category: "dark-genome",
    },
    {
      num: 3,
      title: "Repurposing the Dark Genome I: Antisense Proteins",
      authors: "Garg, M., & Dhar, P. K.",
      year: "2023",
      journal: "bioRxiv preprint",
      url: "https://doi.org/10.1101/2023.03.15.532699",
      topic: "Antisense",
      category: "dark-genome",
    },
    {
      num: 4,
      title: "Repurposing The Dark Genome. III - Intronic Proteins",
      authors: "Garg, M., & Dhar, P. K.",
      year: "2023",
      journal: "bioRxiv preprint",
      url: "https://doi.org/10.1101/2023.06.10.544447",
      topic: "Intronic Proteins",
      category: "dark-genome",
    },
    {
      num: 5,
      title:
        "Discovering novel anti-malarial peptides from the not-coding genome—A working hypothesis",
      authors: "Joshi, M., Kundapura, S. V., Poovaiah, T., Ingle, K., & Dhar, P. K.",
      year: "2013",
      journal: "Current Synthetic and Systems Biology, 1(1)",
      url: "#",
      topic: "Malaria",
      category: "disease",
    },
    {
      num: 6,
      title:
        "Computational identification of novel microRNAs and their targets in the malarial vector Anopheles stephensi",
      authors: "Krishnan, R., Kumar, V., Ananth, V., et al.",
      year: "2015",
      journal: "Systems and Synthetic Biology Journal, 9, 11–17",
      url: "#",
      topic: "RNA Target",
      category: "disease",
    },
    {
      num: 7,
      title: "Repurposing the Dark Genome II – Reverse Proteins",
      authors: "Nayak, S., & Dhar, P. K.",
      year: "2023",
      journal: "bioRxiv preprint",
      url: "https://doi.org/10.1101/2023.03.20.533367",
      topic: "Reverse Proteins",
      category: "dark-genome",
    },
    {
      num: 8,
      title: "Repurposing the Dark Genome IV – Noncoding Proteins",
      authors: "Nayak, S., & Dhar, P. K.",
      year: "2023",
      journal: "bioRxiv preprint",
      url: "https://doi.org/10.1101/2023.06.29.547021",
      topic: "Noncoding Proteins",
      category: "dark-genome",
    },
    {
      num: 9,
      title: "In silico study of peptide inhibitors against BACE",
      authors: "Raj, N., Helen, A., Manoj, N., et al.",
      year: "2015",
      journal: "Systems and Synthetic Biology Journal, 9, 67–72",
      url: "#",
      topic: "Alzheimer's",
      category: "disease",
    },
    {
      num: 10,
      title: "Making novel proteins from pseudogenes",
      authors: "Shidhi, P. R., Suravajhala, P., Nayeema, A., et al.",
      year: "2015",
      journal: "Bioinformatics, 31(1), 33–39",
      url: "https://doi.org/10.1093/bioinformatics/btu585",
      topic: "Pseudogenes",
      category: "dark-genome",
    },
    {
      num: 11,
      title:
        "Function annotation of novel peptides generated from the non-expressing genome of Drosophila melanogaster",
      authors: "Varughese, D., Nair, A. S., & Dhar, P. K.",
      year: "2017",
      journal: "Bioinformation, 13(1), 17–20",
      url: "#",
      topic: "Noncoding Proteins",
      category: "dark-genome",
    },
    {
      num: 12,
      title: "Harnessing Escherichia coli’s Dark Genome to Produce Anti-Alzheimer Peptides",
      authors: "Verma, N., Manvati, S., & Dhar, P. K.",
      year: "2023",
      journal: "bioRxiv preprint",
      url: "https://doi.org/10.1101/2023.06.23.546343",
      topic: "Alzheimer's",
      category: "disease",
    },
  ];

  const filtered = publications.filter((pub) => {
    const matchesSearch =
      pub.title.toLowerCase().includes(search.toLowerCase()) ||
      pub.authors.toLowerCase().includes(search.toLowerCase()) ||
      pub.journal.toLowerCase().includes(search.toLowerCase());

    const matchesTopic = topicFilter === "all" || pub.category === topicFilter;

    return matchesSearch && matchesTopic;
  });

  return (
    <div className="w-full space-y-6">
      {/* Search & Topic Selector */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
          <input
            type="text"
            placeholder="Search papers by title, author, journal..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 text-xs rounded-full border bg-bg-raised transition-all ${
              isDark
                ? "border-zinc-800 focus:border-zinc-650 focus:ring-1 focus:ring-zinc-600 outline-none"
                : "border-slate-200 focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30 outline-none"
            }`}
          />
        </div>

        {/* Topic Filters */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: "all", label: "All Papers" },
            { id: "treps", label: "tREPs Research" },
            { id: "dark-genome", label: "Dark Genome" },
            { id: "disease", label: "Disease Targets" },
          ].map((topic) => (
            <button
              key={topic.id}
              onClick={() => setTopicFilter(topic.id)}
              className={`px-3.5 py-1.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wide transition-all border ${
                topicFilter === topic.id
                  ? "bg-accent-blue dark:bg-white text-white dark:text-zinc-950 border-accent-blue dark:border-white shadow"
                  : "bg-bg-raised hover:bg-bg-raised text-text-secondary border-border-subtle/80 hover:border-text-secondary"
              }`}
            >
              {topic.label}
            </button>
          ))}
        </div>
      </div>

      {/* Publications List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {filtered.map((pub) => (
          <div key={pub.num} className="relative group">
            {/* Visual offset background */}
            <div
              className={`absolute -bottom-2 -right-2 h-full w-full rounded-2xl -z-10 transition-all ${
                isDark
                  ? "bg-[#181a1d] border border-border-subtle/50"
                  : "bg-[#f4f0e6] border border-slate-200/50"
              }`}
            />

            <div
              className={`h-full border rounded-2xl p-6 flex flex-col justify-between backdrop-blur transition-all duration-300 group-hover:-translate-y-0.5 ${
                isDark
                  ? "border-border-subtle bg-bg-raised/40 hover:border-zinc-700"
                  : "border-slate-200 bg-white shadow-sm hover:border-slate-350 hover:shadow-md"
              }`}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="px-2 py-0.5 rounded text-[8px] font-mono font-bold bg-accent-blue/10 dark:bg-zinc-800 text-accent-blue dark:text-zinc-350 border border-accent-blue/20 dark:border-zinc-700/50 uppercase tracking-widest">
                    {pub.topic}
                  </span>
                  <span className="text-[10px] font-mono text-text-tertiary">
                    [{pub.num.toString().padStart(2, "0")}] · {pub.year}
                  </span>
                </div>

                <h4 className="text-sm font-serif-display font-bold text-text-primary leading-snug group-hover:text-accent-blue dark:group-hover:text-accent-emerald transition-colors">
                  {pub.title}
                </h4>

                <p className="text-xs text-text-secondary font-medium">{pub.authors}</p>

                <p className="text-[11px] text-text-tertiary font-mono italic">{pub.journal}</p>
              </div>

              <div className="mt-6 pt-3 border-t border-border-subtle/10 flex justify-between items-center">
                <span className="text-[9px] font-mono text-text-tertiary uppercase">
                  Academic Index
                </span>
                {pub.url !== "#" ? (
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase text-accent-blue dark:text-accent-emerald hover:underline"
                  >
                    <span>View DOI Link</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  <span className="text-[9px] font-mono text-text-tertiary uppercase">
                    Manuscript Available
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Sub-component: DarkGenomeSandbox ---
export function DarkGenomeSandbox({ isDark }: { isDark: boolean }) {
  const [activeStage, setActiveStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const stages = useMemo(
    () => [
      {
        id: "01",
        name: "Intro",
        label: "Intro - Capsule Appears",
        desc: "Scene fades in from darkness. Particle field forms. Capsule materializes in the center with a soft glow.",
        durationText: "1.2s",
        easingText: "easeOutCubic",
      },
      {
        id: "02",
        name: "Protein-Coding",
        label: "Connect: Protein-Coding",
        desc: "Top-left node activates. Wavy line draws from capsule top to the Protein-Coding node. Node icon and text fade in with gold glow.",
        durationText: "1.4s",
        easingText: "easeInOutCubic",
      },
      {
        id: "03",
        name: "Currently Mined",
        label: "Connect: Currently Mined",
        desc: "Top-right node activates. Wavy line draws from capsule top-right to the Currently Mined node. Copper glow travels to the node.",
        durationText: "1.4s",
        easingText: "easeInOutCubic",
      },
      {
        id: "04",
        name: "Class I Dark DNA",
        label: "Connect: Class I Dark DNA",
        desc: "Middle-left node activates. Wavy line draws from capsule middle to the Class I Dark DNA node. Amber glow pulses along the line.",
        durationText: "1.4s",
        easingText: "easeInOutCubic",
      },
      {
        id: "05",
        name: "Class I Potential",
        label: "Connect: Class I Potential",
        desc: "Middle-right node activates. Wavy line draws from capsule middle-right to the Class I Potential node. Amber glow pulses.",
        durationText: "1.4s",
        easingText: "easeInOutCubic",
      },
      {
        id: "06",
        name: "Class II Dark RNA",
        label: "Connect: Class II Dark RNA",
        desc: "Lower-left node activates. Wavy line draws from capsule lower section to the Class II Dark RNA node. Indigo glow pulses.",
        durationText: "1.4s",
        easingText: "easeInOutCubic",
      },
      {
        id: "07",
        name: "Class II Potential",
        label: "Connect: Class II Potential",
        desc: "Lower-right node activates. All 6 nodes are now connected. Indigo glow travels to the final node.",
        durationText: "1.4s",
        easingText: "easeInOutCubic",
      },
      {
        id: "08",
        name: "All Active",
        label: "All Connections Active",
        desc: "All 6 nodes are connected. Lines pulse once. Capsule rotation slows and settles in the center.",
        durationText: "1.2s",
        easingText: "easeOutCubic",
      },
      {
        id: "09",
        name: "Rotation Highlight",
        label: "Capsule Rotation Highlight",
        desc: "Capsule rotates 360° on Y-axis. Bands emit sequential glow from top to bottom and back.",
        durationText: "1.2s",
        easingText: "linear",
      },
      {
        id: "10",
        name: "Active Event",
        label: "Active Sequence Event",
        desc: "Bottom info panel expands from center. Text types in with subtle scan effect. Background particles intensify.",
        durationText: "1.6s",
        easingText: "easeOutCubic",
      },
      {
        id: "11",
        name: "Timeline Nav",
        label: "Timeline / Steps Navigation",
        desc: "Step timeline appears at the bottom. Active step is highlighted. User can navigate steps. On hover, corresponding line & node pulse.",
        durationText: "0.6s",
        easingText: "easeInOutCubic",
      },
      {
        id: "12",
        name: "Loop & Idle",
        label: "Loop & Idle State",
        desc: "Subtle ambient loop. Capsule continues slow rotation. Connections breathe softly. Particles drift.",
        durationText: "6.0s",
        easingText: "easeInOutSine",
      },
    ],
    [],
  );

  const stageDurations = useMemo(
    () => [
      3000, // Stage 0 (01 Intro)
      3000, // Stage 1 (02 Protein-Coding)
      3000, // Stage 2 (03 Currently Mined)
      3000, // Stage 3 (04 Class I Dark DNA)
      3000, // Stage 4 (05 Class I Potential)
      3000, // Stage 5 (06 Class II Dark RNA)
      3000, // Stage 6 (07 Class II Potential)
      2500, // Stage 7 (08 All Connections Active)
      2500, // Stage 8 (09 Capsule Rotation Highlight)
      3500, // Stage 9 (10 Active Sequence Event)
      3000, // Stage 10 (11 Timeline / Steps Nav)
      6000, // Stage 11 (12 Loop & Idle State)
    ],
    [],
  );

  // Auto-play loop
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setTimeout(() => {
      setActiveStage((prev) => (prev + 1) % 12);
    }, stageDurations[activeStage] || 3000);
    return () => clearTimeout(timer);
  }, [isPlaying, activeStage, stageDurations]);

  // Typewriter effect
  const [typedDesc, setTypedDesc] = useState("");
  useEffect(() => {
    let index = 0;
    const fullText = stages[activeStage].desc;
    setTypedDesc("");

    // Typewriter active for all stages when transitioning
    const interval = setInterval(() => {
      setTypedDesc((prev) => prev + fullText.charAt(index));
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 15);
    return () => clearInterval(interval);
  }, [activeStage, stages]);

  const isNodeActive = (nodeIndex: number) => {
    if (activeStage >= 7) return true; // stages 7+ = all connected
    if (nodeIndex === 1) return activeStage >= 1; // Protein-Coding
    if (nodeIndex === 4) return activeStage >= 2; // Currently Mined
    if (nodeIndex === 2) return activeStage >= 3; // Class I Dark DNA
    if (nodeIndex === 5) return activeStage >= 4; // Class I Potential
    if (nodeIndex === 3) return activeStage >= 5; // Class II Dark RNA
    if (nodeIndex === 6) return activeStage >= 6; // Class II Potential
    return false;
  };

  const getCapsuleRotationClass = () => {
    if (activeStage === 0) return "dgs-capsule-scroller-intro";
    if (activeStage >= 1 && activeStage <= 6) return "dgs-capsule-scroller-standard";
    if (activeStage === 7) return "dgs-capsule-scroller-slow";
    if (activeStage === 8) return "dgs-capsule-scroller-highlight";
    if (activeStage === 9) return "dgs-capsule-scroller-event";
    if (activeStage === 10) return "dgs-capsule-scroller-standard";
    return "dgs-capsule-scroller-idle";
  };

  const bgParticles = useMemo(() => {
    return Array.from({ length: 25 }).map((_, _i) => ({
      cx: Math.random() * 800,
      cy: Math.random() * 340,
      r: Math.random() * 2 + 0.6,
      delay: Math.random() * 5,
      duration: Math.random() * 6 + 4,
      color: ["#cca54a", "#f59e0b", "#3f4c8c", "#3e6b5c", "#faf6f0"][Math.floor(Math.random() * 5)],
    }));
  }, []);

  type _ColorConfig = {
    activeBorder: string;
    activeBg: string;
    activeText: string;
  };

  const _colorAmber = {
    activeBorder:
      "border-amber-500/60 dark:border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.06)]",
    activeBg: "bg-amber-500/5 dark:bg-amber-500/3",
    activeText: "text-amber-600 dark:text-amber-400",
  };
  const _colorIndigo = {
    activeBorder:
      "border-[#3e6b5c]/60 dark:border-[#3e6b5c]/50 shadow-[0_0_15px_rgba(62,107,92,0.06)]",
    activeBg: "bg-[#3e6b5c]/5 dark:bg-[#3e6b5c]/3",
    activeText: "text-[#3e6b5c] dark:text-[#5fa38d]",
  };
  const _colorAmberPotential = {
    activeBorder:
      "border-amber-500/60 dark:border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.06)]",
    activeBg: "bg-amber-500/5 dark:bg-amber-500/3",
    activeText: "text-amber-600 dark:text-amber-400",
  };
  const _colorIndigoPotential = {
    activeBorder:
      "border-[#3f4c8c]/60 dark:border-[#3f4c8c]/50 shadow-[0_0_15px_rgba(63,76,140,0.06)]",
    activeBg: "bg-[#3f4c8c]/5 dark:bg-[#3f4c8c]/3",
    activeText: "text-[#3f4c8c] dark:text-[#5c6bb0]",
  };

  const capsuleBodyColor = isDark ? "#121316" : "#e4e2da";
  const capsuleLineColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
  const capsuleLineColorStrong = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)";

  const _renderCard = (
    badgeNum: number,
    title: string,
    subtitle: string,
    icon: React.ReactNode,
    colorClass: _ColorConfig,
    isActive: boolean,
  ) => {
    const isHovered = hoveredNode === badgeNum;
    return (
      <div
        onClick={() => {
          const targetStage =
            badgeNum === 1
              ? 1
              : badgeNum === 2
                ? 3
                : badgeNum === 3
                  ? 5
                  : badgeNum === 4
                    ? 2
                    : badgeNum === 5
                      ? 4
                      : 6;
          setActiveStage(targetStage);
          setIsPlaying(false);
        }}
        onMouseEnter={() => setHoveredNode(badgeNum)}
        onMouseLeave={() => setHoveredNode(null)}
        className={`p-3 md:p-4 rounded-2xl border text-left transition-all duration-500 cursor-pointer ${
          isActive
            ? `${colorClass.activeBorder} ${colorClass.activeBg} ${isHovered ? "scale-[1.04] border-opacity-100" : "scale-[1.02]"}`
            : `${isDark ? "border-zinc-800/50 bg-[#0d0e12]/20 text-zinc-500" : "border-slate-200 bg-slate-50/30 text-slate-400"} hover:scale-[1.01]`
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`h-8 w-8 rounded-full border flex items-center justify-center transition-all ${
              isActive ? colorClass.activeBorder : "border-border-subtle"
            } ${isHovered ? "scale-110" : ""}`}
          >
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <h4
              className={`text-[10px] md:text-xs font-mono tracking-wider uppercase font-bold truncate transition-colors ${
                isActive ? colorClass.activeText : "text-text-secondary"
              }`}
            >
              {title}
            </h4>
            <p className="text-[9px] md:text-[10px] text-text-secondary/70 font-mono mt-0.5 truncate">
              {subtitle}
            </p>
          </div>
          <span
            className={`h-5 w-5 rounded-full text-[9px] font-mono font-bold flex items-center justify-center border transition-all ${
              isActive
                ? `${colorClass.activeBorder} ${colorClass.activeText}`
                : "border-border-subtle text-zinc-500"
            } ${isHovered ? "scale-110" : ""}`}
          >
            {badgeNum}
          </span>
        </div>
      </div>
    );
  };

  const renderBadgeOnPath = (
    cx: number,
    cy: number,
    num: number,
    isActive: boolean,
    activeColor: string,
  ) => {
    const isHovered = hoveredNode === num;
    const radius = isHovered ? 13 : isActive ? 10 : 8.5;
    return (
      <g>
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill={isActive ? activeColor : isDark ? "#121316" : "#faf6f0"}
          stroke={isActive ? activeColor : isDark ? "#27272a" : "#cbd5e1"}
          strokeWidth={isHovered ? 2.5 : 1.5}
          className="transition-all duration-300 ease-out"
          style={{
            filter: isHovered ? "url(#glow-filter)" : "none",
          }}
        />
        <text
          x={cx}
          y={cy + 3}
          textAnchor="middle"
          fontSize={isHovered ? "10" : "9"}
          fontWeight="bold"
          fontFamily="monospace"
          fill={isActive ? (isDark ? "#0a0b0d" : "#ffffff") : isDark ? "#71717a" : "#64748b"}
          className="transition-all duration-300"
        >
          {num}
        </text>
      </g>
    );
  };

  const mobileCardContent = [
    {
      title: "01 INTRO - CAPSULE APPEARS",
      subtitle: "Duration: 1.2s • Easing: easeOutCubic",
      desc: "Scene fades in from darkness. Particle field forms. Capsule materializes in the center with a soft glow.",
      color: "border-zinc-800/50 bg-zinc-900/5 text-text-primary",
    },
    {
      title: "02 CONNECT: PROTEIN-CODING",
      subtitle: "Duration: 1.4s • Easing: easeInOutCubic",
      desc: "Top-left node activates. Wavy line draws from capsule top to the Protein-Coding node with a gold glow.",
      color: "border-[#cca54a]/30 bg-[#cca54a]/5 text-[#cca54a]",
    },
    {
      title: "03 CONNECT: CURRENTLY MINED",
      subtitle: "Duration: 1.4s • Easing: easeInOutCubic",
      desc: "Top-right node activates. Wavy line draws from capsule top-right. Copper/green glow travels to the node.",
      color: "border-[#3e6b5c]/30 bg-[#3e6b5c]/5 text-[#3e6b5c]",
    },
    {
      title: "04 CONNECT: CLASS I DARK DNA",
      subtitle: "Duration: 1.4s • Easing: easeInOutCubic",
      desc: "Middle-left node activates. Wavy line draws from capsule middle to the Class I Dark DNA node. Amber glow pulses.",
      color: "border-amber-500/30 bg-amber-500/5 text-amber-500",
    },
    {
      title: "05 CONNECT: CLASS I POTENTIAL",
      subtitle: "Duration: 1.4s • Easing: easeInOutCubic",
      desc: "Middle-right node activates. Wavy line draws to Class I Potential. Amber glow mirrors the left side.",
      color: "border-amber-500/30 bg-amber-500/5 text-amber-500",
    },
    {
      title: "06 CONNECT: CLASS II DARK RNA",
      subtitle: "Duration: 1.4s • Easing: easeInOutCubic",
      desc: "Lower-left node activates. Wavy line draws from capsule lower section to Class II Dark RNA. Indigo glow.",
      color: "border-[#3f4c8c]/30 bg-[#3f4c8c]/5 text-[#3f4c8c]",
    },
    {
      title: "07 CONNECT: CLASS II POTENTIAL",
      subtitle: "Duration: 1.4s • Easing: easeInOutCubic",
      desc: "Lower-right node activates. All 6 nodes are now connected. Indigo glow completes the final connection.",
      color: "border-[#3f4c8c]/30 bg-[#3f4c8c]/5 text-[#3f4c8c]",
    },
    {
      title: "08 ALL CONNECTIONS ACTIVE",
      subtitle: "Duration: 1.2s • Easing: easeOutCubic",
      desc: "All 6 nodes connected. Lines pulse once in sequence. Capsule rotation slows and settles in center.",
      color: "border-emerald-500/30 bg-emerald-500/5 text-emerald-500",
    },
    {
      title: "09 CAPSULE ROTATION HIGHLIGHT",
      subtitle: "Duration: 1.2s • Easing: linear",
      desc: "Capsule rotates 360° on Y-axis. Bands emit sequential glow from top to bottom and back.",
      color: "border-indigo-500/30 bg-indigo-500/5 text-indigo-400",
    },
    {
      title: "10 ACTIVE SEQUENCE EVENT",
      subtitle: "Duration: 1.6s • Easing: easeOutCubic",
      desc: "Bottom info panel expands from center. Text types in with subtle scan effect. Background particles intensify.",
      color: "border-orange-500/30 bg-orange-500/5 text-orange-400",
    },
    {
      title: "11 TIMELINE / STEPS NAVIGATION",
      subtitle: "Duration (per step): 0.6s • Easing: easeInOutCubic",
      desc: "Step timeline appears at the bottom. Active step is highlighted. On hover, corresponding line & node pulse.",
      color: "border-blue-500/30 bg-blue-500/5 text-blue-400",
    },
    {
      title: "12 LOOP & IDLE STATE",
      subtitle: "Loop Duration: 6.0s • Easing: easeInOutSine",
      desc: "Subtle ambient loop. Capsule continues slow rotation. Connections breathe softly. Particles drift.",
      color: "border-teal-500/30 bg-teal-500/5 text-teal-400",
    },
  ];

  return (
    <div
      className={`w-full border rounded-3xl p-5 md:p-8 flex flex-col items-center relative overflow-hidden transition-all duration-300 ${
        isDark
          ? "bg-obsidian/45 border-zinc-850 shadow-2xl shadow-black/40"
          : "bg-white/70 border-slate-200/90 shadow-xl shadow-slate-100/50"
      }`}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes dgs-rotateCapsule {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100px); }
        }
        .dgs-capsule-scroller-intro {
          animation: dgs-rotateCapsule 10s linear infinite;
        }
        .dgs-capsule-scroller-standard {
          animation: dgs-rotateCapsule 22s linear infinite;
        }
        .dgs-capsule-scroller-slow {
          animation: dgs-rotateCapsule 45s linear infinite;
        }
        .dgs-capsule-scroller-highlight {
          animation: dgs-rotateCapsule 1.2s linear 1;
        }
        .dgs-capsule-scroller-event {
          animation: dgs-rotateCapsule 25s linear infinite;
        }
        .dgs-capsule-scroller-idle {
          animation: dgs-rotateCapsule 30s linear infinite;
        }

        @keyframes dgs-pulseGlow {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.65; }
        }
        .dgs-active-band-glow {
          animation: dgs-pulseGlow 2s ease-in-out infinite;
        }

        @keyframes dgs-bandSeqGlow {
          0% { opacity: 0.15; filter: none; }
          25% { opacity: 0.95; filter: url(#glow-filter); }
          50% { opacity: 0.15; filter: none; }
          100% { opacity: 0.15; filter: none; }
        }
        .dgs-band-seq-glow-gold {
          animation: dgs-bandSeqGlow 1.2s cubic-bezier(0.645, 0.045, 0.355, 1) 1;
        }
        .dgs-band-seq-glow-amber {
          animation: dgs-bandSeqGlow 1.2s cubic-bezier(0.645, 0.045, 0.355, 1) 1;
          animation-delay: 0.25s;
        }
        .dgs-band-seq-glow-indigo {
          animation: dgs-bandSeqGlow 1.2s cubic-bezier(0.645, 0.045, 0.355, 1) 1;
          animation-delay: 0.5s;
        }

        @keyframes dgs-flowConnection {
          0% { stroke-dashoffset: 300; }
          100% { stroke-dashoffset: 0; }
        }
        .dgs-flow-particles {
          animation: dgs-flowConnection 4s linear infinite;
        }

        @keyframes dgs-floatParticle {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.05; }
          50% { transform: translateY(-15px) translateX(8px); opacity: 0.3; }
        }
        .dgs-bg-particle {
          animation: dgs-floatParticle 8s ease-in-out infinite;
        }

        @keyframes dgs-particlesIntensify {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.2; }
          50% { transform: translateY(-25px) scale(1.4); opacity: 0.8; }
        }
        .dgs-particles-intensify {
          animation: dgs-particlesIntensify 4s ease-in-out infinite;
        }

        @keyframes dgs-scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .dgs-scanline-effect::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent, rgba(250,250,250,0.06), transparent);
          animation: dgs-scanline 3s linear infinite;
          pointer-events: none;
          z-index: 5;
        }

        @keyframes dgs-connectionBreathing {
          0%, 100% { opacity: 0.75; stroke-width: 2px; }
          50% { opacity: 1; stroke-width: 2.75px; }
        }
        .dgs-connection-breathe {
          animation: dgs-connectionBreathing 3.5s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite;
        }

        @keyframes dgs-linePulse {
          0% { stroke-width: 2px; opacity: 0.65; }
          50% { stroke-width: 4px; opacity: 1; filter: url(#glow-filter); }
          100% { stroke-width: 2px; opacity: 0.65; }
        }
        .dgs-line-pulse-once {
          animation: dgs-linePulse 1.2s cubic-bezier(0.215, 0.610, 0.355, 1) 1;
        }

        .dgs-capsule-intro {
          animation: dgs-capsuleFadeIn 1.2s cubic-bezier(0.215, 0.610, 0.355, 1) forwards;
        }
        @keyframes dgs-capsuleFadeIn {
          0% { opacity: 0; transform: scale(0.85); filter: blur(4px); }
          100% { opacity: 1; transform: scale(1); filter: blur(0); }
        }

        @keyframes dgs-fillProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `,
        }}
      />

      {/* Decorative Particle Cloud behind components */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-[1500ms] ${
          activeStage === 7 ? "opacity-75" : "opacity-40"
        }`}
      >
        <svg className="w-full h-full" fill="none">
          {bgParticles.map((p, i) => (
            <circle
              key={i}
              cx={p.cx}
              cy={p.cy}
              r={p.r}
              fill={p.color}
              className={activeStage === 7 ? "dgs-particles-intensify" : "dgs-bg-particle"}
              style={{
                animationDelay: `${p.delay}s`,
                animationDuration: `${activeStage === 7 ? p.duration / 2 : p.duration}s`,
              }}
            />
          ))}
        </svg>
      </div>

      {/* Visual Sandbox Title Header */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center border-b border-border-subtle/30 pb-6 mb-8 gap-4 z-10">
        <div>
          <h2 className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-amber-500">
            Dark Genome – Interactive Sequence
          </h2>
          <h3 className="font-serif-display text-2xl font-medium tracking-tight text-text-primary mt-1">
            Complete Animation Flow
          </h3>
        </div>
        <div className="flex flex-col md:items-end gap-2 max-w-md">
          <p className="text-[11px] text-text-secondary leading-relaxed md:text-right">
            A continuous, smooth, story-driven animation that connects all nodes one by one with
            capsule rotation, particle fields, glow pulses and elegant transitions.
          </p>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3 py-1.5 rounded-full text-[9px] font-mono uppercase font-bold border transition-all flex items-center gap-1.5 self-start md:self-auto ${
              isDark
                ? "border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300"
                : "border-slate-200 bg-slate-100/50 hover:bg-slate-200/50 text-slate-600"
            }`}
          >
            {isPlaying ? (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Autoplay ON
              </>
            ) : (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-500" />
                Autoplay OFF
              </>
            )}
          </button>
        </div>
      </div>

      {/* DESKTOP: Single full-width SVG — cards + capsule + lines in one coordinate space */}
      <div className="hidden md:block w-full max-w-5xl relative z-10" style={{ height: 440 }}>
        <svg
          viewBox="0 0 900 440"
          className="w-full h-full overflow-visible"
          style={{ pointerEvents: "none" }}
        >
          <defs>
            <filter id="glow-filter" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="card-shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.08" />
            </filter>
            <clipPath id="capsule-clip-path">
              <rect x="400" y="30" width="56" height="148" rx="28" ry="28" />
              <rect x="414" y="178" width="28" height="24" />
              <rect x="400" y="202" width="56" height="148" rx="28" ry="28" />
            </clipPath>
            <linearGradient id="capsule-shading" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={isDark ? "rgba(0,0,0,0.65)" : "rgba(0,0,0,0.15)"} />
              <stop
                offset="18%"
                stopColor={isDark ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.55)"}
              />
              <stop
                offset="50%"
                stopColor={isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0)"}
              />
              <stop offset="85%" stopColor={isDark ? "rgba(0,0,0,0.02)" : "rgba(0,0,0,0)"} />
              <stop offset="100%" stopColor={isDark ? "rgba(0,0,0,0.65)" : "rgba(0,0,0,0.2)"} />
            </linearGradient>
          </defs>

          {/* Card backgrounds — 6 boxes */}
          {(
            [
              [10, 30, "#cca54a", 1],
              [10, 172, "#f59e0b", 2],
              [10, 314, "#3f4c8c", 3],
              [695, 30, "#3e6b5c", 4],
              [695, 172, "#f59e0b", 5],
              [695, 314, "#3f4c8c", 6],
            ] as [number, number, string, number][]
          ).map(([cx, cy, col, num]) => {
            const active = isNodeActive(num);
            const hov = hoveredNode === num || hoveredNode === 99;
            return (
              <rect
                key={`bg-${num}`}
                x={cx}
                y={cy}
                width={195}
                height={96}
                rx={14}
                fill={
                  isDark ? (active ? `${col}20` : "#0d0e1240") : active ? `${col}10` : "#f8f8f680"
                }
                stroke={active ? col : isDark ? "#3f3f46" : "#e2e8f0"}
                strokeWidth={hov ? 2 : 1.5}
                filter="url(#card-shadow)"
                style={{ transition: "stroke 500ms ease, fill 500ms ease" }}
              />
            );
          })}

          {/* Ghost guide lines (static dashes, wavy S-curves) */}
          {(
            [
              { d: "M 400 60  C 360 60,  320 78,  280 78  S 240 78,  205 78", col: "#cca54a" },
              { d: "M 400 150 C 355 150, 310 190, 280 210 S 230 230, 205 220", col: "#f59e0b" },
              { d: "M 400 310 C 355 320, 305 345, 270 358 S 230 368, 205 362", col: "#3f4c8c" },
              { d: "M 456 60  C 496 60,  536 78,  576 78  S 660 78,  695 78", col: "#3e6b5c" },
              { d: "M 456 150 C 501 150, 546 190, 576 210 S 626 230, 695 220", col: "#f59e0b" },
              { d: "M 456 310 C 501 320, 551 345, 586 358 S 626 368, 695 362", col: "#3f4c8c" },
            ] as { d: string; col: string }[]
          ).map(({ d, col: _col }, i) => (
            <path
              key={`ghost-${i}`}
              d={d}
              stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"}
              strokeWidth="1.5"
              strokeDasharray="5 5"
              fill="none"
            />
          ))}
          {/* Animated connection lines — wavy S-curves */}
          {(
            [
              {
                d: "M 400 60  C 360 60,  320 78,  280 78  S 240 78,  205 78",
                col: "#cca54a",
                node: 1,
              },
              {
                d: "M 400 150 C 355 150, 310 190, 280 210 S 230 230, 205 220",
                col: "#f59e0b",
                node: 2,
              },
              {
                d: "M 400 310 C 355 320, 305 345, 270 358 S 230 368, 205 362",
                col: "#3f4c8c",
                node: 3,
              },
              {
                d: "M 456 60  C 496 60,  536 78,  576 78  S 660 78,  695 78",
                col: "#3e6b5c",
                node: 4,
              },
              {
                d: "M 456 150 C 501 150, 546 190, 576 210 S 626 230, 695 220",
                col: "#f59e0b",
                node: 5,
              },
              {
                d: "M 456 310 C 501 320, 551 345, 586 358 S 626 368, 695 362",
                col: "#3f4c8c",
                node: 6,
              },
            ] as { d: string; col: string; node: number }[]
          ).map(({ d, col, node }) => {
            const active = isNodeActive(node);
            const hov = hoveredNode === node || hoveredNode === 99;
            return (
              <g key={`ln-${node}`}>
                <path
                  d={d}
                  stroke={col}
                  strokeWidth={hov ? 3.5 : 2.5}
                  strokeDasharray="700"
                  strokeDashoffset={active ? 0 : 700}
                  fill="none"
                  className={
                    activeStage === 7
                      ? "dgs-line-pulse-once"
                      : activeStage >= 11 && active && !hoveredNode
                        ? "dgs-connection-breathe"
                        : ""
                  }
                  style={{
                    transition:
                      "stroke-dashoffset 1200ms cubic-bezier(0.645,0.045,0.355,1), stroke-width 300ms ease",
                    filter: hov ? `drop-shadow(0 0 6px ${col})` : "none",
                  }}
                />
                {active && (
                  <path
                    d={d}
                    stroke={col}
                    strokeWidth="3"
                    strokeDasharray="8 28"
                    fill="none"
                    className="dgs-flow-particles"
                    opacity={activeStage === 9 || hov ? 0.9 : 0}
                    style={{ transition: "opacity 400ms ease" }}
                  />
                )}
              </g>
            );
          })}

          {/* CHROMOSOME CAPSULE BODY */}
          <g
            clipPath="url(#capsule-clip-path)"
            className={activeStage === 0 ? "dgs-capsule-intro" : ""}
          >
            <g className={getCapsuleRotationClass()}>
              {[0, 100].map((dx) => (
                <g key={dx} transform={`translate(${dx + 370}, 0)`}>
                  <rect x="0" y="0" width="100" height="440" fill={capsuleBodyColor} />
                  <rect x="12" y="0" width="4" height="440" fill={capsuleLineColor} />
                  <rect x="42" y="0" width="7" height="440" fill={capsuleLineColorStrong} />
                  <rect x="75" y="0" width="4" height="440" fill={capsuleLineColor} />
                  <rect x="0" y="46" width="100" height="26" fill="#cca54a" />
                  <rect x="12" y="46" width="9" height="26" fill={isDark ? "#8c6f27" : "#fffbe8"} />
                  <rect
                    x="44"
                    y="46"
                    width="14"
                    height="26"
                    fill={isDark ? "#634e19" : "#f5e6c8"}
                  />
                  <rect
                    x="0"
                    y="124"
                    width="100"
                    height="26"
                    fill={isDark ? "#b45309" : "#f59e0b"}
                  />
                  <rect
                    x="18"
                    y="124"
                    width="12"
                    height="26"
                    fill={isDark ? "#78350f" : "#fef3c7"}
                  />
                  <rect x="0" y="276" width="100" height="30" fill="#3f4c8c" />
                  <rect
                    x="10"
                    y="276"
                    width="9"
                    height="30"
                    fill={isDark ? "#2d3765" : "#e0e7ff"}
                  />
                  <rect
                    x="48"
                    y="276"
                    width="14"
                    height="30"
                    fill={isDark ? "#1e244a" : "#c7d2fe"}
                  />
                </g>
              ))}
            </g>
          </g>

          {/* 3D shading */}
          <g className={activeStage === 0 ? "dgs-capsule-intro" : ""}>
            <rect
              x="400"
              y="30"
              width="56"
              height="148"
              rx="28"
              ry="28"
              fill="url(#capsule-shading)"
              pointerEvents="none"
            />
            <rect
              x="414"
              y="178"
              width="28"
              height="24"
              fill="url(#capsule-shading)"
              pointerEvents="none"
            />
            <rect
              x="400"
              y="202"
              width="56"
              height="148"
              rx="28"
              ry="28"
              fill="url(#capsule-shading)"
              pointerEvents="none"
            />
          </g>
          <rect
            x="400"
            y="30"
            width="56"
            height="148"
            rx="28"
            ry="28"
            stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)"}
            strokeWidth="1.5"
            fill="none"
            className={activeStage === 0 ? "dgs-capsule-intro" : ""}
          />
          <rect
            x="414"
            y="178"
            width="28"
            height="24"
            stroke={isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"}
            strokeWidth="1"
            fill="none"
            className={activeStage === 0 ? "dgs-capsule-intro" : ""}
          />
          <rect
            x="400"
            y="202"
            width="56"
            height="148"
            rx="28"
            ry="28"
            stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)"}
            strokeWidth="1.5"
            fill="none"
            className={activeStage === 0 ? "dgs-capsule-intro" : ""}
          />

          {/* Band glows — stage 8 = sequential pulse, stage >=7 = breathing idle */}
          <rect
            x="400"
            y="46"
            width="56"
            height="26"
            fill="#cca54a"
            filter="url(#glow-filter)"
            opacity={
              activeStage === 8
                ? 1
                : isNodeActive(1) || hoveredNode === 1 || hoveredNode === 4 || hoveredNode === 99
                  ? 0.7
                  : 0
            }
            className={`pointer-events-none transition-opacity duration-700 ${activeStage === 8 ? "dgs-band-seq-glow-gold" : activeStage >= 7 || hoveredNode === 1 || hoveredNode === 4 || hoveredNode === 99 ? "dgs-active-band-glow" : ""}`}
          />
          <rect
            x="400"
            y="124"
            width="56"
            height="26"
            fill="#f59e0b"
            filter="url(#glow-filter)"
            opacity={
              activeStage === 8
                ? 1
                : isNodeActive(2) || hoveredNode === 2 || hoveredNode === 5 || hoveredNode === 99
                  ? 0.7
                  : 0
            }
            className={`pointer-events-none transition-opacity duration-700 ${activeStage === 8 ? "dgs-band-seq-glow-amber" : activeStage >= 7 || hoveredNode === 2 || hoveredNode === 5 || hoveredNode === 99 ? "dgs-active-band-glow" : ""}`}
          />
          <rect
            x="400"
            y="276"
            width="56"
            height="30"
            fill="#3f4c8c"
            filter="url(#glow-filter)"
            opacity={
              activeStage === 8
                ? 1
                : isNodeActive(3) || hoveredNode === 3 || hoveredNode === 6 || hoveredNode === 99
                  ? 0.7
                  : 0
            }
            className={`pointer-events-none transition-opacity duration-700 ${activeStage === 8 ? "dgs-band-seq-glow-indigo" : activeStage >= 7 || hoveredNode === 3 || hoveredNode === 6 || hoveredNode === 99 ? "dgs-active-band-glow" : ""}`}
          />

          {/* Card text via foreignObject */}
          {(
            [
              {
                x: 10,
                y: 30,
                n: 1,
                title: "PROTEIN-CODING",
                sub: "1–2% of genome",
                col: "#cca54a",
                Icon: Brain,
              },
              {
                x: 10,
                y: 172,
                n: 2,
                title: "CLASS I DARK DNA",
                sub: "Non-expressing DNA",
                col: "#f59e0b",
                Icon: Sparkles,
              },
              {
                x: 10,
                y: 314,
                n: 3,
                title: "CLASS II DARK RNA",
                sub: "Non-translating RNA",
                col: "#3f4c8c",
                Icon: Activity,
              },
              {
                x: 695,
                y: 30,
                n: 4,
                title: "CURRENTLY MINED",
                sub: "~2% · explored so far",
                col: "#3e6b5c",
                Icon: Search,
              },
              {
                x: 695,
                y: 172,
                n: 5,
                title: "CLASS I POTENTIAL",
                sub: "~40% untapped DNA",
                col: "#f59e0b",
                Icon: Sparkles,
              },
              {
                x: 695,
                y: 314,
                n: 6,
                title: "CLASS II POTENTIAL",
                sub: "~56% untapped RNA",
                col: "#3f4c8c",
                Icon: Activity,
              },
            ] as {
              x: number;
              y: number;
              n: number;
              title: string;
              sub: string;
              col: string;
              Icon: React.ElementType;
            }[]
          ).map(({ x, y, n, title, sub, col, Icon }) => {
            const active = isNodeActive(n);
            return (
              <foreignObject
                key={`fo-${n}`}
                x={x}
                y={y}
                width={195}
                height={96}
                style={{ pointerEvents: "all", cursor: "pointer" }}
                onClick={() => {
                  const s = n === 1 ? 1 : n === 2 ? 3 : n === 3 ? 5 : n === 4 ? 2 : n === 5 ? 4 : 6;
                  setActiveStage(s);
                  setIsPlaying(false);
                }}
                onMouseEnter={() => setHoveredNode(n)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div className="w-full h-full flex items-center gap-3 px-3">
                  <div
                    className="h-8 w-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300"
                    style={{
                      borderColor: active ? col : isDark ? "#3f3f46" : "#e2e8f0",
                      background: active ? `${col}22` : "transparent",
                      opacity: active ? 1 : 0.45,
                    }}
                  >
                    <Icon
                      style={{
                        width: 14,
                        height: 14,
                        color: active ? col : isDark ? "#71717a" : "#94a3b8",
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-[9px] font-mono font-bold tracking-wider truncate"
                      style={{ color: active ? col : isDark ? "#52525b" : "#94a3b8" }}
                    >
                      {title}
                    </p>
                    <p
                      className="text-[9px] mt-0.5 truncate"
                      style={{ color: isDark ? "#52525b" : "#94a3b8" }}
                    >
                      {sub}
                    </p>
                  </div>
                  <span
                    className="h-5 w-5 rounded-full text-[9px] font-mono font-bold flex items-center justify-center border shrink-0"
                    style={{
                      borderColor: active ? col : isDark ? "#3f3f46" : "#e2e8f0",
                      color: active ? col : isDark ? "#52525b" : "#94a3b8",
                    }}
                  >
                    {n}
                  </span>
                </div>
              </foreignObject>
            );
          })}

          {/* Line-end dots — at wavy path endpoints touching card edges */}
          {(
            [
              { cx: 205, cy: 78, col: "#cca54a", node: 1 },
              { cx: 205, cy: 220, col: "#f59e0b", node: 2 },
              { cx: 205, cy: 362, col: "#3f4c8c", node: 3 },
              { cx: 695, cy: 78, col: "#3e6b5c", node: 4 },
              { cx: 695, cy: 220, col: "#f59e0b", node: 5 },
              { cx: 695, cy: 362, col: "#3f4c8c", node: 6 },
            ] as { cx: number; cy: number; col: string; node: number }[]
          ).map(({ cx, cy, col, node }) => {
            const active = isNodeActive(node);
            return (
              <circle
                key={`dot-${node}`}
                cx={cx}
                cy={cy}
                r={active ? 5.5 : 3.5}
                fill={active ? col : isDark ? "#3f3f46" : "#cbd5e1"}
                style={{
                  transition: "r 400ms ease, fill 600ms ease",
                  filter: active ? `drop-shadow(0 0 5px ${col})` : "none",
                }}
              />
            );
          })}

          {/* Capsule-side start dots */}
          {(
            [
              { cx: 400, cy: 60, col: "#cca54a", node: 1 },
              { cx: 400, cy: 150, col: "#f59e0b", node: 2 },
              { cx: 400, cy: 310, col: "#3f4c8c", node: 3 },
              { cx: 456, cy: 60, col: "#3e6b5c", node: 4 },
              { cx: 456, cy: 150, col: "#f59e0b", node: 5 },
              { cx: 456, cy: 310, col: "#3f4c8c", node: 6 },
            ] as { cx: number; cy: number; col: string; node: number }[]
          ).map(({ cx, cy, col, node }) => {
            const active = isNodeActive(node);
            return (
              <circle
                key={`sdot-${node}`}
                cx={cx}
                cy={cy}
                r={active ? 4 : 2.5}
                fill={active ? col : isDark ? "#3f3f46" : "#cbd5e1"}
                style={{
                  transition: "r 400ms ease, fill 600ms ease",
                  filter: active ? `drop-shadow(0 0 4px ${col})` : "none",
                }}
              />
            );
          })}

          {/* Numbered badges — placed at midpoint of each wavy path */}
          {renderBadgeOnPath(302, 76, 1, isNodeActive(1), "#cca54a")}
          {renderBadgeOnPath(295, 205, 2, isNodeActive(2), "#f59e0b")}
          {renderBadgeOnPath(300, 352, 3, isNodeActive(3), "#3f4c8c")}
          {renderBadgeOnPath(556, 76, 4, isNodeActive(4), "#3e6b5c")}
          {renderBadgeOnPath(563, 205, 5, isNodeActive(5), "#f59e0b")}
          {renderBadgeOnPath(558, 352, 6, isNodeActive(6), "#3f4c8c")}
        </svg>
      </div>

      {/* MOBILE CHROMOSOME DISPLAY */}
      <div className="flex md:hidden flex-col items-center gap-6 w-full max-w-sm relative z-10">
        <div className="h-56 flex justify-center items-center">
          <svg
            viewBox="85 30 50 280"
            className="w-16 h-56 select-none pointer-events-none overflow-visible"
          >
            <defs>
              <filter id="glow-filter-mobile" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <clipPath id="capsule-clip-path-mobile">
                <rect x="85" y="30" width="50" height="125" rx="25" ry="25" />
                <rect x="85" y="185" width="50" height="125" rx="25" ry="25" />
                <circle cx="110" cy="170" r="10" />
              </clipPath>
              <linearGradient id="capsule-shading-mobile" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={isDark ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.18)"} />
                <stop
                  offset="20%"
                  stopColor={isDark ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.6)"}
                />
                <stop
                  offset="45%"
                  stopColor={isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0)"}
                />
                <stop offset="75%" stopColor={isDark ? "rgba(0,0,0,0)" : "rgba(0,0,0,0)"} />
                <stop offset="92%" stopColor={isDark ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.02)"} />
                <stop offset="100%" stopColor={isDark ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.22)"} />
              </linearGradient>
            </defs>

            <g
              clipPath="url(#capsule-clip-path-mobile)"
              className={activeStage === 0 ? "dgs-capsule-intro" : ""}
            >
              <g className={getCapsuleRotationClass()}>
                <g transform="translate(0, 0)">
                  <rect x="0" y="0" width="100" height="340" fill={capsuleBodyColor} />
                  <rect x="15" y="0" width="3.5" height="340" fill={capsuleLineColor} />
                  <rect x="45" y="0" width="6" height="340" fill={capsuleLineColorStrong} />

                  <rect x="0" y="45" width="100" height="20" fill="#cca54a" />
                  <rect x="15" y="45" width="8" height="20" fill={isDark ? "#8c6f27" : "#faf6f0"} />
                  <rect
                    x="45"
                    y="45"
                    width="12"
                    height="20"
                    fill={isDark ? "#634e19" : "#eeddcc"}
                  />

                  <rect
                    x="0"
                    y="95"
                    width="100"
                    height="20"
                    fill={isDark ? "#b45309" : "#f59e0b"}
                  />
                  <rect
                    x="20"
                    y="95"
                    width="10"
                    height="20"
                    fill={isDark ? "#78350f" : "#fef3c7"}
                  />

                  <rect x="0" y="220" width="100" height="25" fill="#3f4c8c" />
                  <rect
                    x="10"
                    y="220"
                    width="8"
                    height="25"
                    fill={isDark ? "#2d3765" : "#e0e7ff"}
                  />
                </g>
                <g transform="translate(100, 0)">
                  <rect x="0" y="0" width="100" height="340" fill={capsuleBodyColor} />
                  <rect x="15" y="0" width="3.5" height="340" fill={capsuleLineColor} />
                  <rect x="45" y="0" width="6" height="340" fill={capsuleLineColorStrong} />

                  <rect x="0" y="45" width="100" height="20" fill="#cca54a" />
                  <rect x="15" y="45" width="8" height="20" fill={isDark ? "#8c6f27" : "#faf6f0"} />

                  <rect
                    x="0"
                    y="95"
                    width="100"
                    height="20"
                    fill={isDark ? "#b45309" : "#f59e0b"}
                  />
                  <rect
                    x="20"
                    y="95"
                    width="10"
                    height="20"
                    fill={isDark ? "#78350f" : "#fef3c7"}
                  />

                  <rect x="0" y="220" width="100" height="25" fill="#3f4c8c" />
                  <rect
                    x="10"
                    y="220"
                    width="8"
                    height="25"
                    fill={isDark ? "#2d3765" : "#e0e7ff"}
                  />
                </g>
              </g>
            </g>

            <rect
              x="85"
              y="30"
              width="50"
              height="125"
              rx="25"
              ry="25"
              fill="url(#capsule-shading-mobile)"
              pointerEvents="none"
              className={activeStage === 0 ? "dgs-capsule-intro" : ""}
            />
            <rect
              x="85"
              y="185"
              width="50"
              height="125"
              rx="25"
              ry="25"
              fill="url(#capsule-shading-mobile)"
              pointerEvents="none"
              className={activeStage === 0 ? "dgs-capsule-intro" : ""}
            />
            <circle
              cx="110"
              cy="170"
              r="10"
              fill="url(#capsule-shading-mobile)"
              pointerEvents="none"
              className={activeStage === 0 ? "dgs-capsule-intro" : ""}
            />

            <rect
              x="85"
              y="30"
              width="50"
              height="125"
              rx="25"
              ry="25"
              stroke={isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}
              strokeWidth="1.5"
              fill="none"
              pointerEvents="none"
              className={activeStage === 0 ? "dgs-capsule-intro" : ""}
            />
            <rect
              x="85"
              y="185"
              width="50"
              height="125"
              rx="25"
              ry="25"
              stroke={isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}
              strokeWidth="1.5"
              fill="none"
              pointerEvents="none"
              className={activeStage === 0 ? "dgs-capsule-intro" : ""}
            />
            <circle
              cx="110"
              cy="170"
              r="10"
              stroke={isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}
              strokeWidth="1.5"
              fill="none"
              pointerEvents="none"
              className={activeStage === 0 ? "dgs-capsule-intro" : ""}
            />

            {/* Glowing active overlays */}
            <rect
              x="85"
              y="45"
              width="50"
              height="20"
              fill="#cca54a"
              filter="url(#glow-filter-mobile)"
              opacity={isNodeActive(1) ? 0.6 : 0}
              className="transition-opacity duration-700 pointer-events-none"
            />
            <rect
              x="85"
              y="95"
              width="50"
              height="20"
              fill="#f59e0b"
              filter="url(#glow-filter-mobile)"
              opacity={isNodeActive(2) ? 0.6 : 0}
              className="transition-opacity duration-700 pointer-events-none"
            />
            <rect
              x="85"
              y="220"
              width="50"
              height="25"
              fill="#3f4c8c"
              filter="url(#glow-filter-mobile)"
              opacity={isNodeActive(3) ? 0.6 : 0}
              className="transition-opacity duration-700 pointer-events-none"
            />
          </svg>
        </div>

        {/* Mobile Active Stage Card */}
        <div
          className={`w-full p-5 rounded-2xl border transition-all duration-500 text-center ${
            isDark ? "bg-[#0d0e12]/60 border-zinc-800/80" : "bg-slate-50/80 border-slate-200"
          } ${mobileCardContent[activeStage].color}`}
        >
          <h4 className="text-xs font-mono font-bold tracking-widest uppercase">
            {mobileCardContent[activeStage].title}
          </h4>
          <p className="text-[9px] opacity-80 font-mono mt-1">
            {mobileCardContent[activeStage].subtitle}
          </p>
          <p className="text-xs text-text-secondary mt-3 leading-relaxed">
            {mobileCardContent[activeStage].desc}
          </p>
        </div>
      </div>

      {/* ACTIVE STAGE DESCRIPTION BOX (DESKTOP) */}
      <div
        className={`hidden md:block w-full mt-6 p-5 rounded-2xl border text-center transition-all duration-500 relative overflow-hidden ${
          isDark
            ? "bg-[#0d0e12]/40 border-zinc-800/80 scanline-effect"
            : "bg-slate-50/50 border-slate-200 scanline-effect"
        }`}
      >
        <div className="flex justify-between items-center border-b border-border-subtle/30 pb-2 mb-3">
          <span className="text-[10px] font-mono uppercase font-bold text-amber-500 tracking-wider">
            {stages[activeStage].id} {stages[activeStage].label}
          </span>
          <span className="text-[9px] font-mono uppercase text-text-tertiary">
            Duration: {stages[activeStage].durationText} • Easing: {stages[activeStage].easingText}
          </span>
        </div>
        <p className="text-sm text-text-primary leading-relaxed max-w-2xl mx-auto font-medium text-left min-h-[40px]">
          {typedDesc}
        </p>
      </div>

      {/* TIMELINE PROGRESS CONTROLS (DOTS + LABEL) */}
      <div className="w-full flex flex-col items-center gap-3 mt-6 pt-4 border-t border-border-subtle/50 z-10">
        <div className="flex items-center gap-2 md:gap-4 flex-wrap justify-center font-mono">
          {[
            { id: "01", name: "Intro", targetStage: 0, hoverNode: null },
            { id: "02", name: "Protein-Coding", targetStage: 1, hoverNode: 1 },
            { id: "03", name: "Currently Mined", targetStage: 2, hoverNode: 4 },
            { id: "04", name: "Class I Dark DNA", targetStage: 3, hoverNode: 2 },
            { id: "05", name: "Class I Potential", targetStage: 4, hoverNode: 5 },
            { id: "06", name: "Class II Dark RNA", targetStage: 5, hoverNode: 3 },
            { id: "07", name: "Class II Potential", targetStage: 6, hoverNode: 6 },
            { id: "08", name: "All Connected", targetStage: 9, hoverNode: 99 },
          ].map((st, idx) => {
            const isButtonActive =
              st.targetStage === 9 ? activeStage >= 7 : activeStage === st.targetStage;

            return (
              <button
                key={idx}
                onClick={() => {
                  setActiveStage(st.targetStage);
                  setIsPlaying(false);
                }}
                onMouseEnter={() => setHoveredNode(st.hoverNode as number | null)}
                onMouseLeave={() => setHoveredNode(null)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase transition-all duration-300 border ${
                  isButtonActive
                    ? "bg-accent-blue dark:bg-white text-white dark:text-zinc-950 border-transparent scale-105"
                    : `${isDark ? "border-zinc-800 hover:border-zinc-700 bg-zinc-900/30 text-zinc-400" : "border-slate-200 hover:border-slate-350 bg-slate-50/50 text-slate-500"}`
                }`}
              >
                {st.id}{" "}
                <span className="hidden sm:inline ml-1 font-sans text-[9px] font-semibold tracking-normal text-opacity-80">
                  {st.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Timeline progress bar indicator */}
        <div
          className={`h-1 w-48 rounded-full overflow-hidden mt-1 bg-opacity-10 ${
            isDark ? "bg-white" : "bg-black"
          }`}
        >
          <div
            key={activeStage + (isPlaying ? "-playing" : "-paused")}
            className="h-full bg-accent-blue dark:bg-white"
            style={{
              width: isPlaying ? "100%" : `${((activeStage + 1) / 12) * 100}%`,
              transition: isPlaying
                ? `width ${stageDurations[activeStage]}ms linear`
                : "width 300ms ease-out",
              // Start at 0 width when playing
              ...(isPlaying
                ? { animation: `dgs-fillProgress ${stageDurations[activeStage]}ms linear forwards` }
                : {}),
            }}
          />
        </div>
      </div>

      {/* ANIMATION PRINCIPLES FOOTER */}
      <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-4 mt-8 pt-6 border-t border-border-subtle/30 text-[10px] font-mono text-text-tertiary">
        <div className="flex items-center gap-1.5 justify-center md:justify-start">
          <Activity className="w-3.5 h-3.5 text-amber-500" />
          <span>Smooth easing (easeInOutCubic)</span>
        </div>
        <div className="flex items-center gap-1.5 justify-center">
          <Layers className="w-3.5 h-3.5 text-[#cca54a]" />
          <span>Dotted drawing (stroke-dasharray)</span>
        </div>
        <div className="flex items-center gap-1.5 justify-center">
          <Sparkles className="w-3.5 h-3.5 text-[#3f4c8c]" />
          <span>Glow pulses on completion</span>
        </div>
        <div className="flex items-center gap-1.5 justify-center">
          <Brain className="w-3.5 h-3.5 text-[#3e6b5c]" />
          <span>Subtle depth & parallax</span>
        </div>
        <div className="flex items-center gap-1.5 justify-center md:justify-end col-span-2 md:col-span-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Respects reduce-motion preferences</span>
        </div>
      </div>
    </div>
  );
}

// --- Main Page Component ---
export default function DrugDiscoveryPage() {
  const contactModal = useContactModal();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen relative overflow-hidden font-sans transition-colors duration-300 bg-background text-foreground">
      {/* Premium Spotlight Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-gradient-to-b from-accent-blue/15 via-transparent to-transparent blur-[120px] rounded-full pointer-events-none -z-10 opacity-60 dark:opacity-40" />

      {/* SECTION 1: THE FRONTIER (Hero) */}
      <section className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden">
        <GenomeAtlasHero isDark={isDark} />

        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background via-transparent to-background/60" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <Reveal>
            <p className="text-[10px] tracking-[0.35em] font-bold uppercase mb-8 text-accent-blue dark:text-zinc-500">
              Scientific Discovery Environment
            </p>
          </Reveal>
          <Reveal delay={120}>
            {/* Heading styled exactly like the Contact page hero (sans-serif with serif-italic blocker) */}
            <h1
              className="font-semibold leading-[1.1] text-text-primary tracking-tight"
              style={{ fontSize: "clamp(2.3rem, 5.5vw, 4.25rem)" }}
            >
              <span>A New Source of Biological IP</span>
              <span className="font-serif-italic block mt-3 text-accent-blue dark:text-white">
                — Validated Across a Decade of Research.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-8 max-w-3xl mx-auto text-base md:text-lg text-text-secondary leading-relaxed font-medium">
              Nearly all approved biotherapeutics originate from the same 2% of the genome. We
              explore the 98% non-coding "junk DNA" reservoir of functional peptides and proteins to
              discover novel assets in weeks instead of years.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-12 w-full">
              <DarkGenomeSandbox isDark={isDark} />
            </div>
          </Reveal>

          {/* Action buttons */}
          <Reveal delay={360}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => scrollToSection("pipeline")}
                className="px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition duration-300 hover:scale-105 active:scale-95 shadow-md bg-accent-blue dark:bg-white text-white dark:text-zinc-950 font-bold"
              >
                Explore the Pipeline
              </button>
              <button
                onClick={() => scrollToSection("out-licensing")}
                className={`px-8 py-3.5 rounded-full border text-xs font-semibold uppercase tracking-wider transition duration-300 hover:scale-105 active:scale-95 shadow-sm ${
                  isDark
                    ? "border-zinc-800 bg-zinc-900/50 hover:bg-zinc-850 hover:border-zinc-700 text-white"
                    : "border-slate-200 bg-white/75 hover:bg-white hover:border-accent-blue text-slate-800"
                }`}
              >
                View Licensing Candidates
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 2: THE DRUG DISCOVERY PIPELINE (Act 1) */}
      <section
        id="pipeline"
        className={`relative z-10 py-24 border-y ${
          isDark ? "border-border-subtle bg-bg-raised/20" : "border-slate-200 bg-slate-50/50"
        }`}
      >
        <div className="max-w-[1350px] mx-auto px-4">
          <div className="text-center mb-14">
            <Reveal>
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-accent-blue dark:text-zinc-500">
                Act 1 · Prediction to Patient
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-semibold leading-[1.1] text-3xl md:text-5xl tracking-tight text-text-primary mt-3">
                <span>The Drug Discovery Pipeline</span>
                <span className="font-serif-italic block mt-1.5 text-accent-blue dark:text-white">
                  — Bypassing the 2% Bottleneck
                </span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-4 text-sm text-text-secondary max-w-2xl mx-auto leading-relaxed font-medium">
                Drug discovery is running out of room. Traditional approaches are limited to the
                same protein-coding areas mined for two decades. Quantum Codon maps candidates from
                sequence scanning directly to therapeutic solutions.
              </p>
            </Reveal>
          </div>

          <Reveal delay={250}>
            <InteractiveDiscoveryPipeline isDark={isDark} />
          </Reveal>
        </div>
      </section>

      {/* SECTION 3: KEY APPROACHES IN DRUG DISCOVERY (Act 2) */}
      <section
        id="approaches"
        className={`relative z-10 py-24 border-b ${
          isDark ? "bg-obsidian border-border-subtle" : "bg-white border-slate-200"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <Reveal>
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-accent-blue dark:text-zinc-500">
                Act 2 · Common Methodologies
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-semibold leading-[1.1] text-3xl md:text-5xl tracking-tight text-text-primary mt-3">
                <span>Key Approaches in Drug Discovery</span>
                <span className="font-serif-italic block mt-1.5 text-accent-blue dark:text-white">
                  — Efficacy Across All Vectors
                </span>
              </h2>
            </Reveal>
            <Reveal delay={250}>
              <p className="mt-4 text-sm text-text-secondary max-w-2xl mx-auto leading-relaxed font-medium">
                Rising R&D costs and shrinking hit rates have led to a pipeline crisis. We map all
                standard approaches across hypothesis-driven, screening-based, source-based, and
                computational categories to deliver breakthrough results.
              </p>
            </Reveal>
          </div>

          <Reveal delay={300}>
            <KeyApproachesGrid isDark={isDark} />
          </Reveal>
        </div>
      </section>

      {/* SECTION 4: VALUE CREATION & DARK GENOME (Act 3) */}
      <section
        id="value-realization"
        className={`relative z-10 py-24 border-b ${
          isDark ? "bg-bg-raised/20 border-border-subtle" : "bg-slate-50/50 border-slate-200"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <Reveal>
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-accent-blue dark:text-zinc-500">
                Act 3 · Biological IP Creation
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-semibold leading-[1.1] text-3xl md:text-5xl tracking-tight text-text-primary mt-3">
                <span>Dark Matter of the Genome</span>
                <span className="font-serif-italic block mt-1.5 text-accent-blue dark:text-white">
                  — Structural Value Propositions
                </span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-4 text-sm text-text-secondary max-w-2xl mx-auto leading-relaxed font-medium">
                Converting unmapped, silent genomic regions into high-affinity, first-in-class
                assets. We generate clean, defensible biological IP that solves the
                freedom-to-operate limitations of conventional chemistry.
              </p>
            </Reveal>
          </div>

          <Reveal delay={300}>
            <ValueRealization isDark={isDark} />
          </Reveal>
        </div>
      </section>

      {/* SECTION 5: OUT-LICENSING DATABASE (Act 4) */}
      <section
        id="out-licensing"
        className={`relative z-10 py-24 border-b ${
          isDark ? "bg-obsidian border-border-subtle" : "bg-white border-slate-200"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <Reveal>
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-accent-blue dark:text-zinc-500">
                Act 4 · Ready for Licensing
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-semibold leading-[1.1] text-3xl md:text-5xl tracking-tight text-text-primary mt-3">
                <span>Lead Candidate Pipeline</span>
                <span className="font-serif-italic block mt-1.5 text-accent-blue dark:text-white">
                  — Molecular Assets Database
                </span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-4 text-sm text-text-secondary max-w-2xl mx-auto leading-relaxed font-medium">
                Browse our therapeutic assets catalog. Click on any molecular ID to inspect clinical
                indications, mechanism profiles, and validated test benchmarks available for
                licensing or co-development.
              </p>
            </Reveal>
          </div>

          <Reveal delay={300}>
            <OutLicensingDatabase isDark={isDark} />
          </Reveal>
        </div>
      </section>

      {/* SECTION 6: SCIENTIFIC EVIDENCE (Act 5) */}
      <section
        id="evidence"
        className={`relative z-10 py-24 border-b ${
          isDark ? "bg-bg-raised/25 border-border-subtle" : "bg-slate-50/50 border-slate-200"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <Reveal>
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-accent-blue dark:text-zinc-500">
                Act 5 · Scientific Validation
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-semibold leading-[1.1] text-3xl md:text-5xl tracking-tight text-text-primary mt-3">
                <span>Publications & Peer Reviews</span>
                <span className="font-serif-italic block mt-1.5 text-accent-blue dark:text-white">
                  — A Decade of Rigorous Research
                </span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-4 text-sm text-text-secondary max-w-xl mx-auto leading-relaxed font-medium">
                Our science is backed by over 15 years of discovery and 12+ major peer-reviewed
                papers mapping non-coding translation pathways.
              </p>
            </Reveal>
          </div>

          <Reveal delay={300}>
            <PublicationsLibrary isDark={isDark} />
          </Reveal>
        </div>
      </section>

      {/* Act 6: Conversion / Closing CTA */}
      <section
        className="relative z-10 py-28 overflow-hidden border-t border-white/5"
        style={{
          background: "linear-gradient(135deg, #060814 0%, #0a0f1e 40%, #0c0f18 70%, #07090d 100%)",
        }}
      >
        {/* Decorative background glow orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-accent-blue/10 blur-[120px] opacity-60" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-accent-purple/10 blur-[100px] opacity-50" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#1e3a8a]/8 blur-[140px]" />
        </div>

        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            {/* Top eyebrow label */}
            <p className="text-xs tracking-[0.35em] text-[#60a5fa] uppercase font-semibold mb-6">
              Partner With Us
            </p>
            {/* Main heading — always bright white */}
            <h2 className="font-semibold leading-[1.1] tracking-tight mb-4 text-3xl md:text-5xl text-white">
              Your Goals, Our Commitment
              <span className="font-serif-italic block mt-3 text-[#a5b4fc]">
                — Let&rsquo;s Build Together.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-[#94a3b8] text-sm md:text-base mb-10 max-w-xl mx-auto leading-relaxed">
              Tell us what you&rsquo;re building and we&rsquo;ll help you ship it. Our team replies
              to every message within one business day.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => contactModal.open()}
                className="px-8 py-3.5 rounded-full bg-[#1e3a8a] hover:bg-[#1d4ed8] text-white font-bold text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-900/40 border border-blue-700/40"
              >
                Get in touch
              </button>
              <Link
                to="/contact"
                className="px-8 py-3.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 backdrop-blur-sm"
              >
                Inquire Online
              </Link>
            </div>
          </Reveal>

          {/* Trust signals */}
          <Reveal delay={360}>
            <div className="mt-12 flex flex-wrap justify-center gap-6 text-[11px] text-[#64748b]">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block" />
                Replies within 1 business day
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 inline-block" />
                Peer-reviewed science
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400 inline-block" />
                Amaravati, India HQ
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
