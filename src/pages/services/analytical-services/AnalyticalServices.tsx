import PageShell from "../../_PageShell";
import {
  LineChart,
  ArrowRight,
  ShieldAlert,
  Eye,
  CheckCircle,
  Sliders,
  BrainCircuit,
  TrendingUp,
  BookmarkCheck,
  FileCheck2,
  Clock3,
  Network,
  Activity,
  Dna,
  Target,
  GitFork,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useContactModal } from "@/components/shared/ContactModal";
import molVideo from "./mol_9x9_1.mp4";

export default function AnalyticalServicesPage() {
  const { open: openContact } = useContactModal();

  const challenges = [
    {
      icon: ShieldAlert,
      title: "Emerging Modalities",
      desc: "mRNA, LNPs, and gene therapies demand a new level of analytical rigor that legacy platforms cannot meet.",
    },
    {
      icon: Eye,
      title: "Opaque CRO Processes",
      desc: "Traditional CROs deliver slow turnarounds and limited visibility, blocking critical go/no-go decisions.",
    },
    {
      icon: CheckCircle,
      title: "Uncompromising Standards",
      desc: "Quality, safety, and efficacy must be verified at every stage - from discovery to commercialization.",
    },
  ];

  const solutions = [
    {
      title: "BioAnalysis Platform",
      desc: "GMP-compliant analytical services with audit-ready reporting and industry-grade quality systems.",
    },
    {
      title: "Dash Intelligence",
      desc: "Faster bioanalysis workflows with transparent pricing, structured data delivery, and rapid result turnaround.",
    },
    {
      title: "IncuScience Integration",
      desc: "Integrated CRO support combining sequencing, biological sciences, and analytical chemistry for emerging biotech innovators.",
    },
  ];

  const assays = [
    {
      title: "LC-MS & HPLC",
      desc: "Precision compound quantitation, impurity profiling, and molecular characterization.",
      img: "/precision/hplc.png",
      icon: LineChart,
    },
    {
      title: "Analytical Ultracentrifugation",
      desc: "Size distribution and aggregate detection for LNPs, antibodies, and biologics safety.",
      img: "/precision/ultracentrifugation.png",
      icon: Target,
    },
    {
      title: "Next-Generation Sequencing",
      desc: "Genomic analysis for target validation, biomarker discovery, and gene therapy characterization.",
      img: "/precision/next_gen.png",
      icon: Dna,
    },
    {
      title: "Proteomics",
      desc: "Ultrasensitive protein measurement to accelerate discovery and de-risk therapeutic development.",
      img: "/precision/proteomics.png",
      icon: GitFork,
    },
  ];

  const workflow = [
    {
      num: "01",
      title: "Sample Intake",
      desc: "Secure onboarding of samples, metadata, study objectives, and analytical requirements.",
    },
    {
      num: "02",
      title: "Assay Selection",
      desc: "Selection of LC-MS, HPLC, NGS, proteomics, or custom analytical workflows.",
    },
    {
      num: "03",
      title: "Data Generation",
      desc: "Validated instruments and controlled laboratory processes generate high-integrity molecular data.",
    },
    {
      num: "04",
      title: "AI-Assisted Interpretation",
      desc: "Analytical outputs are transformed into structured insights, anomaly detection, and decision-ready summaries.",
    },
    {
      num: "05",
      title: "Audit-Ready Reporting",
      desc: "Clear, traceable, regulatory-aligned reports support go/no-go decisions and partner communication.",
    },
  ];

  const benefits = [
    {
      icon: Clock3,
      title: "Faster Timelines",
      desc: "Rapid analytical workflows help teams move from preclinical studies to clinical decisions faster.",
    },
    {
      icon: ShieldAlert,
      title: "Reduced Risk",
      desc: "Targeted analytical strategies and expert regulatory guidance help de-risk your pipeline at every stage.",
    },
    {
      icon: TrendingUp,
      title: "Data-Driven Decisions",
      desc: "Raw molecular data is converted into clear, actionable insights your scientific and business teams can use immediately.",
    },
  ];

  const trustPoints = [
    {
      icon: BookmarkCheck,
      title: "Scientific Rigor",
      desc: "Validated protocols, meticulous QC, and publication-ready data quality.",
    },
    {
      icon: FileCheck2,
      title: "Transparent Communication",
      desc: "Scheduled updates, structured reporting, and milestone-based visibility.",
    },
    {
      icon: Sliders,
      title: "Tailored Solutions",
      desc: "Custom analytical strategies aligned with each therapeutic program's unique needs.",
    },
  ];

  return (
    <PageShell spotlight="from-accent-emerald/15 via-transparent to-transparent">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] p-8 md:p-14 backdrop-blur-md grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-blue/10 text-accent-blue">
                <LineChart className="h-6 w-6" />
              </div>
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-accent-blue font-semibold">
                Offering — Analytical Services
              </span>
            </div>
            <h1 className="font-serif-display text-4xl md:text-6xl leading-tight text-foreground font-medium">
              Precision in Every Molecule
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Analytical services for tomorrow's therapeutics - combining bioanalysis, AI-driven
              insights, and audit-ready reporting to accelerate drug discovery.
            </p>
            <button
              onClick={openContact}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-90 transition shadow-lg"
            >
              Request Partnership
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="md:col-span-5 flex justify-center w-full">
            <div className="relative w-full rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-white/40 dark:bg-black/20 p-1.5 shadow-xl backdrop-blur-md">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-transparent to-accent-purple/10 opacity-30 pointer-events-none" />
              <video
                src={molVideo}
                poster="/precision_others/molecule_glass.png"
                className="w-full h-auto object-cover rounded-xl border border-black/5 dark:border-white/5 shadow-inner"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Unseen Frontier Section */}
      <section className="bg-card py-20 px-6 mt-16 border-y border-border transition-colors duration-300">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4 space-y-6 text-left">
            <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              <span className="text-[#0a192f] dark:text-white">The Unseen</span>
              <br />
              <span className="text-[#d946ef]">Fron</span>
              <span className="text-[#f97316]">tier</span>
            </h2>
            <div className="h-[3px] w-12 bg-gradient-to-r from-[#d946ef] to-[#f97316] rounded-full my-4" />
            <p className="text-slate-600 dark:text-slate-300 text-[15px] leading-relaxed font-medium">
              Every therapeutic that reaches a patient is built on a foundation of analytical
              certainty. Behind every clinical milestone, regulatory approval, and breakthrough
              discovery lies a critical layer of data – invisible to the world, but indispensable to
              science.
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-[15px] leading-relaxed font-medium">
              Analytical data is not a commodity. It is the backbone of every decision made in drug
              development.
            </p>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Molecule Card (Light themed) */}
            <div className="flex flex-col bg-white dark:bg-[#111c35] rounded-[24px] border border-slate-200/80 dark:border-slate-800 shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <img
                  src="/precision_others/molecule_ref.png"
                  alt="Molecule"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-3.5 p-5 border-t border-slate-100 dark:border-slate-800">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 text-[#0c1f40] dark:text-sky-400 bg-slate-50 dark:bg-slate-900">
                  <Network className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <h3 className="font-sans font-bold text-sm text-[#0c1f40] dark:text-white leading-tight">
                    Molecule
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-tight mt-0.5">
                    The building blocks of innovation
                  </p>
                </div>
              </div>
            </div>

            {/* Data Signal Card (Light themed) */}
            <div className="flex flex-col bg-white dark:bg-[#111c35] rounded-[24px] border border-slate-200/80 dark:border-slate-800 shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <img
                  src="/precision_others/data_signal_ref.png"
                  alt="Data Signal"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-3.5 p-5 border-t border-slate-100 dark:border-slate-800">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 text-[#0c1f40] dark:text-sky-400 bg-slate-50 dark:bg-slate-900">
                  <Activity className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <h3 className="font-sans font-bold text-sm text-[#0c1f40] dark:text-white leading-tight">
                    Data Signal
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-tight mt-0.5">
                    Insights hidden within complexity
                  </p>
                </div>
              </div>
            </div>

            {/* Decision Card (Light themed) */}
            <div className="flex flex-col bg-white dark:bg-[#111c35] rounded-[24px] border border-slate-200/80 dark:border-slate-800 shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <img
                  src="/precision_others/decision_ref.png"
                  alt="Decision"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-3.5 p-5 border-t border-slate-100 dark:border-slate-800">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 text-[#0c1f40] dark:text-sky-400 bg-slate-50 dark:bg-slate-900">
                  <BrainCircuit className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <h3 className="font-sans font-bold text-sm text-[#0c1f40] dark:text-white leading-tight">
                    Decision
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-tight mt-0.5">
                    Intelligence driving better outcomes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Challenge Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 border-t border-slate-100 dark:border-slate-900 mt-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs tracking-[0.3em] text-rose-500 uppercase font-semibold">
            The challenge
          </p>
          <h2 className="font-serif-display text-3xl md:text-4xl font-bold leading-tight text-foreground mt-3">
            Navigating Complexity in Drug Development
          </h2>
          <p className="text-slate-500 text-sm mt-3">
            Modern therapeutic programs require clearer analytical evidence, faster decisions, and
            stronger confidence at every stage.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {challenges.map((c, idx) => {
            const Icon = c.icon;
            return (
              <Card
                key={idx}
                className="p-5 border border-slate-200/60 dark:border-slate-900 bg-white/60 dark:bg-slate-950/20 rounded-xl backdrop-blur-sm shadow-sm flex flex-col items-start gap-4"
              >
                <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif-display font-bold text-lg text-foreground">{c.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {c.desc}
                </p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* The Solution Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-100 dark:border-slate-900 mt-12">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <p className="text-xs tracking-[0.3em] text-accent-blue uppercase font-semibold">
              Our solution
            </p>
            <h2 className="font-serif-display text-3xl md:text-4xl font-bold leading-tight text-foreground">
              A Tech-First Approach to Bioanalysis
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Quantum Codon Analytical Services brings together advanced analytical capabilities,
              transparent reporting, and AI-assisted data interpretation to help biotech teams move
              from complex biological questions to clear development decisions.
            </p>
            <button
              onClick={openContact}
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent-blue hover:opacity-85 transition"
            >
              Learn more about the platform
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="lg:col-span-7 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {solutions.map((s, idx) => (
              <Card
                key={idx}
                className="p-6 border border-slate-200/60 dark:border-slate-900 bg-white/40 dark:bg-slate-950/10 rounded-2xl backdrop-blur-sm shadow-sm flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <span className="font-mono text-xs text-accent-blue font-bold uppercase tracking-wider">
                    0{idx + 1}
                  </span>
                  <h3 className="font-serif-display font-semibold text-base text-foreground mt-3 leading-snug">
                    {s.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-4">
                  {s.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Capabilities Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-100 dark:border-slate-900 mt-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif italic text-3xl md:text-4xl text-[#0c1f40] dark:text-white leading-tight font-medium">
            High-integrity assays for complex molecular programs
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-3 leading-relaxed font-medium">
            A practical analytical stack for emerging modalities, translational teams, and
            partner-ready development decisions.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {assays.map((a, idx) => {
            const Icon = a.icon;
            return (
              <div
                key={idx}
                className="group relative flex flex-col bg-white dark:bg-[#111c35] rounded-[24px] border border-slate-200/80 dark:border-slate-800 shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-slate-100 dark:border-slate-800/50">
                  <img
                    src={a.img}
                    alt={a.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Centered overlapping circle icon */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#081026] text-white shadow-md">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="pt-8 pb-6 px-5 flex-1 flex flex-col items-center text-center">
                  <h3 className="font-serif italic font-medium text-[16px] text-[#0c1f40] dark:text-white leading-tight">
                    {a.title}
                  </h3>
                  {/* Colored horizontal blue divider line */}
                  <div className="w-6 h-[1.5px] bg-[#38bdf8] my-3 rounded-full" />
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    {a.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Platform Workflow Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-100 dark:border-slate-900 mt-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs tracking-[0.3em] text-accent-blue uppercase font-semibold">
            Platform workflow
          </p>
          <h2 className="font-serif-display text-3xl md:text-4xl font-bold leading-tight text-foreground mt-3">
            From sample intake to audit-ready reports
          </h2>
          <p className="text-slate-500 text-sm mt-3">
            A clear operating model for turning complex molecular inputs into aligned scientific and
            business decisions.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {workflow.map((w, idx) => (
            <Card
              key={idx}
              className="p-6 border border-slate-200/60 dark:border-slate-900 bg-white/40 dark:bg-slate-950/10 rounded-2xl backdrop-blur-sm shadow-sm"
            >
              <span className="font-mono text-2xl font-bold text-accent-blue">{w.num}</span>
              <h3 className="font-serif-display font-bold text-sm text-foreground mt-3 leading-snug">
                {w.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-2.5">
                {w.desc}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-100 dark:border-slate-900 mt-12 grid md:grid-cols-2 gap-8">
        {/* Market Journey */}
        <Card className="p-5 border border-slate-200/60 dark:border-slate-900 bg-white/60 dark:bg-slate-950/10 rounded-xl shadow-sm space-y-5">
          <h3 className="font-serif-display text-lg font-bold text-foreground">
            Accelerating Your Journey to Market
          </h3>
          <div className="space-y-4">
            {benefits.map((b, idx) => {
              const BIcon = b.icon;
              return (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="p-2 rounded-lg bg-accent-blue/10 text-accent-blue shrink-0 mt-0.5">
                    <BIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">{b.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Partnership Trust */}
        <Card className="p-5 border border-slate-200/60 dark:border-slate-900 bg-white/60 dark:bg-slate-950/10 rounded-xl shadow-sm space-y-5">
          <h3 className="font-serif-display text-lg font-bold text-foreground">
            A Partnership Built on Trust and Expertise
          </h3>
          <div className="space-y-4">
            {trustPoints.map((tp, idx) => {
              const TPIcon = tp.icon;
              return (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500 shrink-0 mt-0.5">
                    <TPIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">{tp.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {tp.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </section>

      {/* CTA Footer Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="rounded-3xl border border-black/10 dark:border-white/10 p-10 md:p-14 overflow-hidden relative shadow-xl backdrop-blur-md">
          {/* background image cover */}
          <div className="absolute inset-0 z-0">
            <img
              src="/precision_last/partner.png"
              alt="Scientific Partnership background"
              className="w-full h-full object-cover opacity-15 dark:opacity-20 blur-[1px]"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-transparent to-accent-purple/10" />
          </div>

          <div className="relative z-10 text-center max-w-2xl mx-auto space-y-6">
            <span className="text-[10px] tracking-[0.25em] uppercase font-mono text-accent-blue font-semibold">
              Analytical partnership
            </span>
            <h2 className="font-serif-display text-3xl md:text-5xl font-bold leading-tight">
              The Future of Therapeutics Starts Here
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed max-w-lg mx-auto">
              Partner with Quantum Codon to transform complex analytical challenges into clear
              pathways for groundbreaking therapies. Let's accelerate discovery and bring
              life-changing treatments to patients faster.
            </p>
            <div className="pt-2">
              <button
                onClick={openContact}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-90 transition shadow-lg"
              >
                Contact Analytical Services
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
