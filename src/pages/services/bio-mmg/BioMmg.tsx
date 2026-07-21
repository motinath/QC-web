import React from "react";
import PageShell from "../../_PageShell";
import {
  Dna,
  Building,
  Coins,
  Activity,
  Mail,
  CheckCircle2,
  Calendar,
  Layers,
  Factory,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import bioprocessControlImg from "./bioprocess-control-bioreactor.jpg";
import probioticsProcessImg from "./probiotics-production-process.jpg";

export default function BioMmgPage() {
  return (
    <PageShell spotlight="from-accent-purple/15 via-transparent to-transparent">
      {/* 1. Hero Section */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="relative rounded-3xl border border-accent-purple/20 bg-accent-purple/[0.03] dark:bg-accent-purple/[0.05] p-8 md:p-14 backdrop-blur-md overflow-hidden sci-panel">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.12),transparent_60%)] pointer-events-none" />
          <div className="relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-purple/10 text-accent-purple">
                  <Dna className="h-6 w-6 text-accent-purple" />
                </div>
                <span className="font-mono text-xs tracking-[0.2em] uppercase text-accent-purple font-semibold">
                  Offering 02 — Bio MMG
                </span>
              </div>
              <h1 className="font-serif-display text-4xl md:text-5xl lg:text-6xl leading-[1.12] text-foreground font-semibold">
                Biomanufacturing: Industrializing Biological Science.
              </h1>
              <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                Where breakthrough synthetic biology meets precision bioprocess control —
                engineering industrial-scale fermentation and next-generation bio-products.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#partner"
                  className="px-6 py-3.5 rounded-2xl bg-foreground text-background text-sm font-semibold hover:opacity-90 transition shadow-xl"
                >
                  Partner With Us
                </a>
                <a
                  href="#platform"
                  className="px-6 py-3.5 rounded-2xl border border-border/80 text-sm font-semibold text-foreground hover:bg-secondary/60 transition shadow-sm"
                >
                  Explore Bioprocess Platform
                </a>
              </div>
            </div>

            {/* Bioprocess Control Bioreactor Image Card */}
            <div className="lg:col-span-5 relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-square overflow-hidden rounded-3xl border border-border/60 dark:border-white/10 shadow-2xl bg-slate-950 group">
              <img
                src={bioprocessControlImg}
                alt="Automated 150L Bioprocess Control Bioreactor with Live Telemetry Dashboard"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Shift Section */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4">
            <p className="text-xs tracking-[0.3em] text-accent-purple uppercase font-bold">
              The Opportunity
            </p>
            <h2 className="font-serif-display text-3xl md:text-4xl mt-3 text-foreground leading-tight">
              The industrial bioeconomy is now
            </h2>
          </div>
          <div className="md:col-span-8 space-y-4 text-base text-muted-foreground leading-relaxed">
            <p>
              Traditional manufacturing relies on energy-intensive petrochemical processes that fail
              to scale sustainably. High-yield bioprocess fermentation unlocks bio-identical
              therapeutics, enzymes, and active probiotics.
            </p>
            <p className="font-semibold text-foreground">
              Biology is the ultimate precision manufacturing operating system.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Our Mission / Pillars */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="border-t border-slate-200 dark:border-slate-800 pt-16">
          <div className="max-w-3xl mb-12">
            <p className="text-xs tracking-[0.3em] text-accent-blue uppercase font-bold">
              Our Mission
            </p>
            <h2 className="font-serif-display text-3xl md:text-4xl mt-3 text-foreground leading-tight">
              Quantum Codon connects discovery, infrastructure, and execution so biology can move
              from promising science to industrial reality.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Harnessing Biomanufacturing",
                description:
                  "We transform scientific discoveries into scalable industrial realities — bridging laboratory innovation and global commercial deployment.",
                icon: Layers,
                color: "text-accent-blue bg-accent-blue/10",
              },
              {
                title: "Building Core Infrastructure",
                description:
                  "We create the infrastructure needed to move biotechnology from bench to market, unlocking economic and environmental value.",
                icon: Building,
                color: "text-accent-purple bg-accent-purple/10",
              },
              {
                title: "Driving Global Impact",
                description:
                  "Our platform accelerates time-to-market for bio-based innovations, enabling partners to reach industrial scale with confidence and speed.",
                icon: Activity,
                color: "text-accent-emerald bg-accent-emerald/10",
              },
            ].map((p) => (
              <Card
                key={p.title}
                className="group p-8 border border-foreground/5 bg-white/60 dark:bg-white/5 backdrop-blur shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:bg-white/85 dark:hover:bg-white/10 hover:border-accent-blue/20 transition-all duration-300"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${p.color}`}
                >
                  <p.icon className="h-6 w-6" />
                </div>
                <h3 className="font-serif-display text-xl font-semibold mb-3 text-foreground transition-colors duration-300 group-hover:text-accent-blue">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION: End-to-End Precision Fermentation & Probiotics Process Showcase */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="rounded-3xl border border-accent-emerald/20 bg-accent-emerald/[0.02] dark:bg-accent-emerald/[0.04] p-8 md:p-12 backdrop-blur-lg overflow-hidden relative">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-emerald/10 text-accent-emerald text-xs font-semibold tracking-wider uppercase">
                <Factory className="w-3.5 h-3.5" />
                <span>End-to-End Fermentation Pipeline</span>
              </div>
              <h2 className="font-serif-display text-3xl md:text-5xl font-semibold text-foreground leading-tight">
                Precision Probiotics & Industrial Fermentation Process
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                From targeted strain selection and culture growth to high-density fermentation,
                cellular separation, micro-encapsulation, and final formulation — our integrated
                bioprocess infrastructure delivers maximum yield and potency.
              </p>
              <ul className="space-y-3 pt-2">
                {[
                  "Controlled Multi-Parameter Vessel Fermentation",
                  "Real-Time Analytics & Sensor Regulation",
                  "Automated Downstream Separation & Encapsulation",
                  "Pharmaceutical & Health-Grade Quality Standards",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm font-medium text-foreground"
                  >
                    <CheckCircle2 className="w-4 h-4 text-accent-emerald flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Probiotics Process Image Showcase */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-border/60 dark:border-white/10 shadow-2xl bg-slate-950 group">
                <img
                  src={probioticsProcessImg}
                  alt="Precision Probiotics Production Process Flow and Bioreactor System"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Execution Platform Systems */}
      <section id="platform" className="max-w-6xl mx-auto px-6 py-16">
        <div className="border-t border-slate-200 dark:border-slate-800 pt-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs tracking-[0.3em] text-accent-purple uppercase font-bold">
              Platform Capabilities
            </p>
            <h2 className="font-serif-display text-3xl md:text-5xl mt-3 text-foreground">
              Execution Infrastructure
            </h2>
            <p className="mt-4 text-muted-foreground">
              Sleek, modular, and cloud-connected platforms designed to transition biological
              designs seamlessly from bench to pilot scale.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                system: "System 01",
                title: "Benchtop Bioreactors",
                image: "/startup-bioreactor.png",
                desc: "Sleek glass benchtop clean room bioreactors. Engineered with high-precision flow mechanics and active digital regulation loops for precise cell cultivation.",
              },
              {
                system: "System 02",
                title: "Parallel Fermentation",
                image: "/startup-fermentation.png",
                desc: "High-throughput parallel benchtop fermenters for rapid scale-up. Connected multi-vessel systems log parameters and yield dynamics in real-time.",
              },
              {
                system: "System 03",
                title: "AI Control Dashboards",
                image: "/ai-control-panel.png",
                desc: "Real-time cloud-connected monitoring dashboards. Custom machine learning algorithms track cell growth trajectories and dynamically optimize yields.",
              },
              {
                system: "System 04",
                title: "Automated Purification",
                image: "/startup-purification.png",
                desc: "Automated downstream recovery and liquid handling workstations operating under clean, high-precision laboratory quality controls.",
              },
            ].map((sys) => (
              <div
                key={sys.system}
                className="group rounded-2xl overflow-hidden border border-foreground/5 bg-white/40 dark:bg-black/20 p-4 shadow-lg backdrop-blur-md flex flex-col justify-between hover:-translate-y-2 hover:shadow-2xl hover:border-accent-purple/35 transition-all duration-500"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-foreground/5 bg-slate-950 mb-5">
                  <img
                    src={sys.image}
                    alt={sys.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-slate-900/90 text-white font-mono text-[10px] tracking-widest uppercase px-3 py-1 rounded-md backdrop-blur shadow transition-colors duration-300 group-hover:bg-accent-purple group-hover:text-white">
                    {sys.system}
                  </div>
                </div>
                <div>
                  <h3 className="font-serif-display text-lg font-semibold text-foreground mb-2 transition-colors duration-300 group-hover:text-accent-purple">
                    {sys.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{sys.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Market Opportunity Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-white/[0.02] p-10 md:p-14 backdrop-blur shadow-sm">
          <div className="max-w-3xl mb-12">
            <p className="text-xs tracking-[0.3em] text-accent-blue uppercase font-bold">
              Market Opportunity
            </p>
            <h2 className="font-serif-display text-3xl md:text-4xl mt-3 text-foreground">
              Disrupting massive incumbent industries
            </h2>
            <p className="mt-4 text-muted-foreground">
              Bioindustrial execution sits across large incumbent markets that are actively
              searching for sustainable replacements and resilient supply chains.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              {
                val: "$6T+",
                ind: "Chemical Industry",
                sub: "Transitioning from extraction-based production to regenerative, bio-based methods.",
              },
              {
                val: "$14T+",
                ind: "Manufacturing",
                sub: "Enabling sustainable, lower-carbon production across global supply chains.",
              },
              {
                val: "$14T+",
                ind: "Agriculture",
                sub: "Replacing synthetic chemicals and fertilizers with bio-based inputs.",
              },
              {
                val: "$8T+",
                ind: "Automotive",
                sub: "Developing advanced biofuels and sustainable materials for mobility.",
              },
              {
                val: "$2.5T+",
                ind: "Textiles",
                sub: "Creating next-generation eco-friendly fibers, dyes, and functional materials.",
              },
            ].map((stat) => (
              <div
                key={stat.ind}
                className="flex flex-col justify-between border-l border-slate-200 dark:border-slate-800 pl-5 py-2"
              >
                <div>
                  <span className="font-serif-display text-3xl md:text-4xl font-semibold bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent block">
                    {stat.val}
                  </span>
                  <span className="text-sm font-semibold text-foreground mt-2 block">
                    {stat.ind}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-3 leading-snug">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Our Approach */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="border-t border-slate-200 dark:border-slate-800 pt-16">
          <div className="max-w-3xl mb-12">
            <p className="text-xs tracking-[0.3em] text-accent-purple uppercase font-bold">
              Our Approach
            </p>
            <h2 className="font-serif-display text-3xl md:text-4xl mt-3 text-foreground">
              Connecting science, manufacturing, and capital into one executable platform.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Science",
                desc: "Designing biology with manufacturability from day one, so discoveries are engineered to scale.",
                tag: "Scale-by-Design",
              },
              {
                title: "Manufacturing",
                desc: "Connecting projects to curated CDMO and biomanufacturing networks to de-risk scale-up.",
                tag: "CDMO Coordination",
              },
              {
                title: "Capital",
                desc: "Aligning investors, ventures, and commercialization pathways so breakthroughs are fully supported from lab to market.",
                tag: "Commercial De-Risking",
              },
            ].map((app) => (
              <div
                key={app.title}
                className="group p-5 rounded-2xl border border-foreground/5 bg-white/60 dark:bg-white/5 backdrop-blur shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-accent-purple/20 hover:bg-white/85 dark:hover:bg-white/10"
              >
                <span className="text-[10px] font-mono tracking-widest text-accent-purple uppercase font-bold block mb-4 transition-transform duration-300 group-hover:translate-x-1">
                  {app.tag}
                </span>
                <h3 className="font-serif-display text-lg font-semibold text-foreground mb-2 transition-colors duration-300 group-hover:text-accent-purple">
                  {app.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{app.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Execution Operating System */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="border-t border-slate-200 dark:border-slate-800 pt-16">
          <div className="max-w-3xl mb-12">
            <p className="text-xs tracking-[0.3em] text-accent-blue uppercase font-bold">
              Workflow
            </p>
            <h2 className="font-serif-display text-3xl md:text-4xl mt-3 text-foreground">
              Execution Operating System
            </h2>
            <p className="mt-4 text-muted-foreground">
              An integrated execution engine that synchronizes every critical node — from discovery
              to deployment — into one coordinated platform.
            </p>
          </div>
          <div className="grid sm:grid-cols-5 gap-4 relative">
            {[
              {
                num: "01",
                title: "Discovery Architecture",
                desc: "Identify scalable biological opportunities and define technical feasibility.",
              },
              {
                num: "02",
                title: "Strain/Molecule Engineering",
                desc: "Engineer biological systems, enzymes, molecules, or pathways for industrial performance.",
              },
              {
                num: "03",
                title: "Process Development",
                desc: "Optimize fermentation, yield, purity, cost, and reproducibility.",
              },
              {
                num: "04",
                title: "Scale-Up Network",
                desc: "Move from lab-scale validation to pilot and commercial manufacturing through CDMO partners.",
              },
              {
                num: "05",
                title: "Commercial Deployment",
                desc: "Connect technical validation, regulatory readiness, market demand, and investor support.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="group p-6 rounded-2xl border border-foreground/5 bg-white/70 dark:bg-white/[0.02] shadow-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-accent-blue/20 hover:bg-white/90 dark:hover:bg-white/5"
              >
                <div>
                  <span className="font-serif-display text-3xl font-bold bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent block mb-4 transition-transform duration-300 group-hover:scale-110 origin-left">
                    {step.num}
                  </span>
                  <h4 className="font-semibold text-sm text-foreground mb-2 transition-colors duration-300 group-hover:text-accent-blue">
                    {step.title}
                  </h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mt-2">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Investment Focus */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="border-t border-slate-200 dark:border-slate-800 pt-16">
          <div className="max-w-3xl mb-12">
            <p className="text-xs tracking-[0.3em] text-accent-purple uppercase font-bold">
              Portfolio Focus
            </p>
            <h2 className="font-serif-display text-3xl md:text-4xl mt-3 text-foreground">
              Investment Focus
            </h2>
            <p className="mt-4 text-muted-foreground">
              We focus on category-creating companies where biology, engineering, and computation
              converge.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                title: "Sustainable Biochemicals",
                desc: "Bio-based inputs for cleaner industrial chemistry and lower-carbon supply chains.",
                color:
                  "border-accent-blue/20 bg-accent-blue/[0.01] hover:border-accent-blue/60 hover:bg-accent-blue/[0.04]",
              },
              {
                title: "Advanced Materials",
                desc: "Engineered biomaterials designed for performance, durability, and circularity.",
                color:
                  "border-accent-purple/20 bg-accent-purple/[0.01] hover:border-accent-purple/60 hover:bg-accent-purple/[0.04]",
              },
              {
                title: "Industrial Enzymes",
                desc: "High-value enzymes for manufacturing, agriculture, environment, and specialty production.",
                color:
                  "border-accent-emerald/20 bg-accent-emerald/[0.01] hover:border-accent-emerald/60 hover:bg-accent-emerald/[0.04]",
              },
              {
                title: "Therapeutics Infrastructure",
                desc: "Manufacturing and execution systems that support next-generation therapeutic modalities.",
                color:
                  "border-cyan-500/20 bg-cyan-500/[0.01] hover:border-cyan-500/60 hover:bg-cyan-500/[0.04]",
              },
            ].map((focus) => (
              <div
                key={focus.title}
                className={`p-6 rounded-2xl border ${focus.color} shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg`}
              >
                <h4 className="font-serif-display text-lg font-semibold text-foreground mb-2">
                  {focus.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{focus.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Core Expertise */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="border-t border-slate-200 dark:border-slate-800 pt-16">
          <div className="max-w-3xl mb-12">
            <p className="text-xs tracking-[0.3em] text-accent-blue uppercase font-bold">
              Capabilities
            </p>
            <h2 className="font-serif-display text-3xl md:text-4xl mt-3 text-foreground">
              Core Expertise
            </h2>
            <p className="mt-4 text-muted-foreground">
              A practical operating layer for teams facing the hardest parts of bioindustrial
              commercialization.
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-5">
            {[
              {
                title: "Scale-Up Risk Mitigation",
                desc: "Reducing failure points as ventures move from bench to pilot to commercial production.",
              },
              {
                title: "CAPEX Strategy",
                desc: "Navigating capital-intensive infrastructure and manufacturing models.",
              },
              {
                title: "Cost Parity Planning",
                desc: "Helping bio-based solutions compete with legacy industrial processes.",
              },
              {
                title: "Regulatory & Commercial Pathways",
                desc: "Accelerating adoption through compliance, validation, and market readiness.",
              },
              {
                title: "Execution Infrastructure",
                desc: "Coordinating science, manufacturing, capital, and partnerships in one operating model.",
              },
            ].map((exp) => (
              <div
                key={exp.title}
                className="group p-6 rounded-2xl border border-foreground/5 bg-white/60 dark:bg-white/[0.02] shadow-sm flex flex-col justify-start items-start gap-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-accent-emerald/30 hover:bg-white/85 dark:hover:bg-white/5"
              >
                <CheckCircle2 className="w-5 h-5 text-accent-emerald transition-transform duration-300 group-hover:scale-115" />
                <div>
                  <h4 className="font-semibold text-sm text-foreground mb-2 transition-colors duration-300 group-hover:text-accent-emerald">
                    {exp.title}
                  </h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Partner Section (CTA) */}
      <section id="partner" className="max-w-6xl mx-auto px-6 py-16">
        <div className="rounded-3xl border border-foreground/10 p-10 md:p-16 bg-gradient-to-br from-accent-blue/10 via-accent-purple/10 to-accent-emerald/10 text-center">
          <h2 className="font-serif-display text-4xl md:text-5xl text-foreground font-medium">
            Build with Quantum Codon
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From the smallest strand of DNA to global industrial impact, Quantum Codon closes the
            distance between discovery and deployment.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="mailto:contact@qcodon.com"
              className="px-6 py-3 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-90 transition flex items-center gap-2 shadow"
            >
              <Coins className="w-4 h-4" />
              Request Investment Deck
            </a>
            <a
              href="mailto:contact@qcodon.com"
              className="px-6 py-3 rounded-full bg-accent-blue text-white text-sm font-semibold hover:opacity-95 transition flex items-center gap-2 shadow"
            >
              <Calendar className="w-4 h-4" />
              Schedule a Call
            </a>
            <a
              href="mailto:contact@qcodon.com"
              className="px-6 py-3 rounded-full border border-foreground/20 text-sm font-semibold hover:bg-foreground/5 transition flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Partner With Us
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
