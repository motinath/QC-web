import React, { useState } from "react";
import PageShell from "../_PageShell";
import { Link } from "@/lib/router-compat";
import {
  Dna,
  Sparkles,
  Award,
  ShieldCheck,
  Cpu,
  FlaskConical,
  TestTube,
  GraduationCap,
  Microscope,
  CheckCircle2,
  Globe2,
  Mail,
  ArrowRight,
  FileCheck2,
} from "lucide-react";

export default function About() {
  const [activeTab, setActiveTab] = useState<number | null>(null);

  const verticals = [
    {
      icon: <Dna className="w-6 h-6 text-accent-blue" />,
      title: "Bioinformatics",
      description:
        "Turning genomic, transcriptomic, and clinical data into actionable insight through NGS analysis, multi-omics integration, and AI-driven predictive modelling.",
      highlight: "NGS & AI Multi-Omics",
    },
    {
      icon: <FlaskConical className="w-6 h-6 text-accent-emerald" />,
      title: "Biomanufacturing",
      description:
        "Designing scalable, commercially viable bioprocesses from fermentation through downstream purification.",
      highlight: "Fermentation & Purification",
    },
    {
      icon: <TestTube className="w-6 h-6 text-accent-purple" />,
      title: "Analytics & Testing",
      description:
        "Delivering audit-ready analytical data, from method validation to stability testing under ICH guidelines.",
      highlight: "ICH Audit-Ready Testing",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-500" />,
      title: "Regulatory & Compliance",
      description:
        "Embedding regulatory strategy and quality systems into every stage of development, rather than treating compliance as a final hurdle.",
      highlight: "Embedded Quality Strategy",
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-indigo-500" />,
      title: "Training & Workforce Development",
      description: "Building the scientific talent the next generation of biotech needs.",
      highlight: "Next-Gen Talent",
    },
  ];

  const quickLinksRow1 = [
    { label: "About", href: "/about" },
    { label: "Media", href: "/blogs" },
    { label: "Events", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const quickLinksRow2 = [
    { label: "Team", href: "/about#our-story" },
    { label: "Publications", href: "/research" },
    { label: "Careers", href: "/careers" },
    { label: "Visit Us", href: "/contact" },
  ];

  return (
    <PageShell
      className="pb-24 relative overflow-hidden"
      spotlight="from-accent-blue/15 via-accent-purple/5 to-transparent"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-20 md:space-y-24">
        {/* HERO HEADER & 2% vs 98% GENOME SPLIT VISUALIZER */}
        <section className="text-center max-w-4xl mx-auto space-y-8 pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-blue/10 dark:bg-accent-blue/20 border border-accent-blue/20 text-accent-blue badge-meta">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About Quantum Codon</span>
          </div>

          <h1 className="heading-hero text-foreground">
            Unlocking the <em className="italic text-accent-purple font-serif">98%</em> Silent
            Genome to Power the Next-Gen Bioeconomy
          </h1>

          <p className="text-base md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Quantum Codon was founded to take dark genome research out of the lab and into an
            industrial pipeline — creating first-in-class therapeutics, molecules, and scalable
            bioprocesses.
          </p>

          {/* Interactive Visualizer: 2% Mined vs 98% Dark Genome */}
          <div className="mt-10 p-6 md:p-8 rounded-3xl bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-2xl space-y-6 text-left relative overflow-hidden sci-panel">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border/40 pb-4">
              <div>
                <span className="badge-meta text-accent-blue">Biological Frontier Contrast</span>
                <h3 className="font-serif-display text-2xl text-foreground mt-1">
                  The Genomic Opportunity Gap
                </h3>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-accent-purple/10 text-accent-purple font-bold">
                98% Dark Genome Moat
              </span>
            </div>

            {/* Split Progress Bar */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:justify-between text-xs font-semibold gap-1">
                <span className="text-muted-foreground">Crowded 2% Protein-Coding Regions</span>
                <span className="text-accent-purple font-bold">
                  Untapped 98% Dark Matter (Quantum Codon)
                </span>
              </div>
              <div className="h-7 w-full rounded-full bg-slate-200 dark:bg-slate-800 flex overflow-hidden p-1 gap-1">
                <div className="w-[15%] sm:w-[12%] bg-rose-500/80 rounded-l-full flex items-center justify-center text-[10px] font-bold text-white transition-all duration-500">
                  2%
                </div>
                <div className="w-[85%] sm:w-[88%] bg-gradient-to-r from-accent-blue via-accent-purple to-accent-emerald rounded-r-full flex items-center justify-center text-[10px] sm:text-[11px] font-bold text-white shadow-md animate-pulse px-2 truncate">
                  98% Quantum Codon Biological Frontier
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-2 text-xs text-muted-foreground">
              <div className="p-4 rounded-xl bg-rose-500/5 dark:bg-rose-500/10 border border-rose-500/20">
                <strong className="text-rose-600 dark:text-rose-400 font-semibold block mb-1">
                  Traditional Focus (2%)
                </strong>
                A century of pharmaceutical research mining the exact same protein-coding sequences,
                resulting in dry pipelines and reformulations.
              </div>
              <div className="p-4 rounded-xl bg-accent-blue/5 dark:bg-accent-blue/10 border border-accent-blue/20">
                <strong className="text-accent-blue font-semibold block mb-1">
                  Quantum Codon Frontier (98%)
                </strong>
                15+ years of foundational science unlocking silent DNA & untranslated RNA to produce
                genuinely novel chemistry with zero prior art.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: OUR STORY */}
        <section id="our-story" className="relative">
          <div className="w-full space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-accent-blue">
                <Microscope className="w-4 h-4" />
                <span>Foundational Heritage</span>
              </div>
              <h2 className="font-serif-display text-3xl md:text-4xl text-foreground">Our Story</h2>

              <div className="space-y-6 text-slate-700 dark:text-slate-300 text-base md:text-lg leading-relaxed font-normal">
                <p>
                  Quantum Codon was founded on a simple but overlooked observation: nearly all
                  modern medicine comes from the same 2% of the human genome — the protein-coding
                  regions that pharmaceutical research has mined for the better part of a century.
                  The remaining 98%, long dismissed as "junk DNA," was left unexplored.
                </p>
                <p>
                  Our founding scientific team spent over fifteen years building the case that this
                  "dark matter" of the genome — its silent DNA and untranslated RNA — is not
                  evolutionary waste, but an untapped source of functional peptides, proteins, and
                  pathways. That body of work, published across more than a dozen peer-reviewed
                  studies and presented to institutions including the U.S. National Academy of
                  Sciences and the Organisation for the Prohibition of Chemical Weapons, forms the
                  scientific foundation Quantum Codon is built on.
                </p>
                <p className="p-6 rounded-2xl bg-accent-blue/5 dark:bg-accent-blue/10 border-l-4 border-accent-blue text-foreground font-medium text-base">
                  We started the company to take that research out of the lab and into a pipeline —
                  turning fifteen years of foundational discovery into medicines, molecules, and
                  manufacturing processes the industry can actually use.
                </p>
              </div>
            </div>

            {/* Scientific Credibility Wall (Horizontal Grid under story) */}
            <div className="p-8 rounded-3xl bg-white/80 dark:bg-white/[0.04] backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-xl space-y-6 w-full max-w-4xl mx-auto">
              <h3 className="font-serif-display text-xl font-semibold text-foreground text-center">
                Scientific Credibility Wall
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-accent-blue/10 dark:bg-accent-blue/20 border border-accent-blue/20 flex flex-col items-center text-center gap-3">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-accent-blue/10 text-accent-blue border border-accent-blue/10">
                    <Award className="w-5 h-5 shrink-0" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">15+ Years Discovery</h4>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                      Foundational research proving silent DNA & untranslated RNA function.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-accent-purple/10 dark:bg-accent-purple/20 border border-accent-purple/20 flex flex-col items-center text-center gap-3">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-accent-purple/10 text-accent-purple border border-accent-purple/10">
                    <Dna className="w-5 h-5 shrink-0" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">
                      12+ Peer-Reviewed Studies
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                      Published body of peer-validated scientific literature.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-accent-emerald/10 dark:bg-accent-emerald/20 border border-accent-emerald/20 flex flex-col items-center text-center gap-3">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/10">
                    <Globe2 className="w-5 h-5 shrink-0" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">
                      U.S. NAS & OPCW Keynotes
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                      Presented to top international scientific and regulatory bodies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: WHAT WE DO */}
        <section id="what-we-do" className="space-y-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold tracking-widest uppercase text-accent-purple">
              Integrated Value Chain
            </span>
            <h2 className="font-serif-display text-3xl md:text-5xl text-foreground">What We Do</h2>
          </div>

          {/* Core Drug Discovery Engine Showcase */}
          <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-accent-blue/10 via-accent-purple/10 to-accent-emerald/10 dark:from-accent-blue/20 dark:to-accent-purple/20 border border-accent-blue/30 shadow-2xl relative overflow-hidden">
            <div className="max-w-4xl space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-blue/20 text-accent-blue text-xs font-bold uppercase tracking-wider">
                <Cpu className="w-3.5 h-3.5" /> Core Drug Discovery Engine
              </span>
              <p className="text-lg md:text-xl text-foreground font-medium leading-relaxed">
                Drug discovery is at the center of everything we do. Using our proprietary
                genome-mining <strong className="text-accent-blue font-bold">DEEP CODON</strong>{" "}
                platform, we generate first-in-class lead candidates from biological space no other
                company is working in — producing genuinely novel chemistry rather than the generics
                and combination therapies too often marketed as innovation.
              </p>
            </div>
          </div>

          {/* 5 Service Verticals Cards */}
          <div className="space-y-6 pt-4">
            <p className="text-base text-muted-foreground font-medium">
              Around that core, we've built five service verticals that not only help us in the drug
              discovery pipeline but also enable the full journey for the startups and industry to
              quickly move from discovery to market:
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {verticals.map((v, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setActiveTab(i)}
                  onMouseLeave={() => setActiveTab(null)}
                  className={`p-7 rounded-3xl bg-white/70 dark:bg-white/[0.03] backdrop-blur-lg border transition-all duration-300 flex flex-col justify-between group ${
                    activeTab === i
                      ? "border-accent-blue shadow-2xl scale-[1.02]"
                      : "border-black/10 dark:border-white/10 hover:border-accent-blue/40"
                  }`}
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      {v.icon}
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-accent-blue/10 text-accent-blue mb-3 inline-block">
                      {v.highlight}
                    </span>
                    <h3 className="font-serif-display text-xl font-semibold mb-3 text-foreground">
                      {v.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border/30 flex items-center gap-2 text-xs font-semibold text-accent-blue">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Active Capability</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: WHY QUANTUM CODON */}
        <section id="why-quantum-codon" className="relative">
          <div className="p-8 md:p-12 rounded-3xl bg-[#edf2f7] dark:bg-[#0a1118] border border-black/10 dark:border-white/10 shadow-lg space-y-8">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-accent-emerald">
                Competitive Advantage
              </span>
              <h2 className="font-serif-display text-3xl md:text-4xl text-foreground mt-2">
                Why Quantum Codon
              </h2>
            </div>

            <p className="text-base md:text-xl text-slate-800 dark:text-slate-200 leading-relaxed font-normal max-w-4xl">
              Most of the industry is competing for the same 2% of the genome everyone else has
              already searched. We're not. Our platform gives us access to biological space with no
              prior art and a founding team whose published track record de-risks the science years
              ahead of a typical early-stage biotech. The result is a pipeline of validated,
              licensable molecules, backed by end-to-end capabilities to take them from discovery
              through regulatory approval.
            </p>

            {/* Strategic Edge Highlight Grid */}
            <div className="grid md:grid-cols-3 gap-6 pt-4">
              <div className="p-6 rounded-2xl bg-white/80 dark:bg-white/[0.04] border border-black/10 dark:border-white/10">
                <div className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center mb-4 text-accent-blue">
                  <Dna className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-base mb-1 text-foreground">Zero Prior Art</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Access to untapped genomic territory with high IP value and zero prior art
                  competition.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/80 dark:bg-white/[0.04] border border-black/10 dark:border-white/10">
                <div className="w-10 h-10 rounded-xl bg-accent-purple/10 flex items-center justify-center mb-4 text-accent-purple">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-base mb-1 text-foreground">De-Risked Science</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  15+ years of published track record de-risks the science years ahead of typical
                  biotech startups.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/80 dark:bg-white/[0.04] border border-black/10 dark:border-white/10">
                <div className="w-10 h-10 rounded-xl bg-accent-emerald/10 flex items-center justify-center mb-4 text-accent-emerald">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-base mb-1 text-foreground">
                  Licensable Molecules
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Validated, licensable molecules backed by end-to-end regulatory and manufacturing
                  capabilities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: OUR VISION */}
        <section id="our-vision" className="relative text-center max-w-4xl mx-auto">
          <div className="p-10 md:p-16 rounded-3xl bg-gradient-to-br from-[#1e3a8a]/10 via-background to-[#5b21b6]/10 dark:from-[#1e3a8a]/30 dark:to-[#5b21b6]/30 border border-accent-blue/30 shadow-2xl space-y-6">
            <span className="text-xs font-semibold tracking-widest uppercase text-accent-purple">
              Our Vision
            </span>
            <h2 className="font-serif-display text-3xl md:text-5xl text-foreground">
              Leading the Frontier
            </h2>
            <blockquote className="text-lg md:text-2xl text-foreground font-serif italic leading-relaxed max-w-3xl mx-auto">
              "We believe the next generation of medicines won't come from searching harder in the
              same genome — it will come from finally exploring the non-expressed and non-translated
              nucleic acids. Quantum Codon exists to lead that search."
            </blockquote>
          </div>
        </section>

        {/* SECTION 5: CONTACT & QUICK DIRECTORY HUB */}
        <section id="directory-contact" className="pt-8 border-t border-border/40 space-y-12">
          <div className="p-8 md:p-12 rounded-3xl bg-slate-900 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="space-y-3 max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent-blue">
                Get In Touch
              </span>
              <h3 className="font-serif-display text-3xl md:text-4xl text-white">
                Connect with Quantum Codon
              </h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                Partner with us for drug discovery collaborations, bioinformatics analyses,
                biomanufacturing, and regulatory strategy.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <a
                href="mailto:contact@qcodon.com"
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-accent-blue hover:bg-accent-blue/90 text-white font-semibold text-sm transition-all shadow-lg hover:scale-105"
              >
                <Mail className="w-4 h-4" />
                <span>contact@qcodon.com</span>
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/20 hover:bg-white/10 text-white text-sm font-medium transition-all"
              >
                <span>Contact Form</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Navigation Directory Grid */}
          <div className="p-8 rounded-3xl bg-white/60 dark:bg-white/[0.02] border border-black/10 dark:border-white/10 space-y-6 text-center">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Quick Navigation Directory
            </h4>

            <div className="space-y-4 max-w-3xl mx-auto">
              <div className="flex flex-wrap justify-center gap-3">
                {quickLinksRow1.map((link, idx) => (
                  <Link
                    key={idx}
                    to={link.href}
                    className="px-5 py-2 rounded-full border border-foreground/15 text-xs font-medium uppercase tracking-wider text-foreground hover:bg-accent-blue/10 hover:border-accent-blue hover:text-accent-blue transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                {quickLinksRow2.map((link, idx) => (
                  <Link
                    key={idx}
                    to={link.href}
                    className="px-5 py-2 rounded-full border border-foreground/15 text-xs font-medium uppercase tracking-wider text-foreground hover:bg-accent-purple/10 hover:border-accent-purple hover:text-accent-purple transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
