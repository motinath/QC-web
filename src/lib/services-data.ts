import {
  Atom,
  Dna,
  LineChart,
  Cpu,
  ShieldCheck,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";

export type Offering = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  badge: string;
  num: string;
  accentText: string;
  color: string;
  hero: { eyebrow: string; headline: string; sub: string };
  overview: string;
  features: { title: string; body: string }[];
  benefits: string[];
  useCases: { title: string; body: string; img?: string }[];
};

export const offerings: Offering[] = [
  {
    slug: "drug-discovery",
    title: "Drug Discovery",
    description:
      "Accelerate molecule discovery using quantum simulations and AI-powered research workflows.",
    icon: Atom,
    badge: "Discovery Core",
    num: "01",
    accentText: "text-accent-blue",
    color: "border-accent-blue/15 bg-accent-blue/[0.02]",
    hero: {
      eyebrow: "Quantum + AI Discovery",
      headline: "Discover first-in-class molecules from the dark genome.",
      sub: "Systematic conversion of previously unmined genomic regions into active drug candidates with quantum-refined docking and AI ranking.",
    },
    overview:
      "Quantum Codon's discovery platform maps silent sequences directly to cellular receptors, then synthesizes and validates the leading peptide structures for preclinical work — compressing years of iteration into weeks.",
    features: [
      {
        title: "In silico translation",
        body: "Translate intergenic DNA, antisense frames, microRNAs, introns, and tRNA-derived peptides.",
      },
      {
        title: "Dynamic docking",
        body: "Binding affinity optimization using state-of-the-art virtual docking software.",
      },
      {
        title: "Peptide synthesis",
        body: "Candidate synthesis of leading peptide structures for preclinical validations.",
      },
      {
        title: "Lead profiling",
        body: "Iterative refinement loops guided by reinforcement learning and ADMET scoring.",
      },
    ],
    benefits: [
      "Cut early-stage discovery time by up to 60%",
      "Reduce wet-lab spend with high-confidence shortlists",
      "Explore chemical space beyond rule-based libraries",
      "Bring novel modalities to clinical trials sooner",
    ],
    useCases: [
      { title: "Oncology", body: "Selective inhibitors for hard-to-drug kinases." },
      { title: "Anti-infectives", body: "Rapid response pipelines for parasites and pathogens." },
      {
        title: "Neurodegeneration",
        body: "BACE1-class targets validated with synthetic peptides.",
      },
    ],
  },
  {
    slug: "bio-mmg",
    title: "Bio MMG",
    description: "Advanced molecular modeling, genomics, and computational biology solutions.",
    icon: Dna,
    badge: "Wet-Lab Core",
    num: "02",
    accentText: "text-accent-purple",
    color: "border-accent-purple/15 bg-accent-purple/[0.02]",
    hero: {
      eyebrow: "Microbiology & Molecular Genetics",
      headline: "From sequence to structure to validated construct.",
      sub: "End-to-end wet-lab capability that turns computational predictions into expressed, characterized molecules.",
    },
    overview:
      "Our molecular genetics facility validates computational models through rigorous wet-lab experimentation, constructing synthetic gene pathways that do not exist under natural evolutionary parameters.",
    features: [
      {
        title: "High-fidelity cloning",
        body: "Customized plasmids for candidate constructs at scale.",
      },
      { title: "Host engineering", body: "E. coli, S. cerevisiae, and cell-free model systems." },
      {
        title: "Expression verification",
        body: "Western blot, SDS-PAGE, and translational stability checks.",
      },
      {
        title: "Functional bioassays",
        body: "Growth-inhibition, receptor-binding, and multi-well screens.",
      },
    ],
    benefits: [
      "One platform across structural and -omics workflows",
      "Reproducible, version-controlled scientific pipelines",
      "Collaboration-first interface for cross-functional teams",
      "Built-in benchmarking against public datasets",
    ],
    useCases: [
      { title: "Variant interpretation", body: "Predict functional impact of clinical variants." },
      {
        title: "Target validation",
        body: "Confirm druggability with structural and pathway evidence.",
      },
      {
        title: "Biologics design",
        body: "Engineer antibodies and enzymes with improved stability.",
      },
    ],
  },
  {
    slug: "analytical-service",
    title: "Analytical Service",
    description: "Transform scientific data into actionable insights through advanced analytics.",
    icon: LineChart,
    badge: "Structure Validation",
    num: "03",
    accentText: "text-accent-emerald",
    color: "border-accent-emerald/15 bg-accent-emerald/[0.02]",
    hero: {
      eyebrow: "Scientific Analytics",
      headline: "Turn experiments into decisions.",
      sub: "Statistical rigor, modern visualization, and ML on top of your assays, instruments, and study data.",
    },
    overview:
      "Every synthetic candidate undergoes strict analytical characterization. We verify folding coordinates, absolute molecular weight, and pharmacokinetic properties under standard GLP directives.",
    features: [
      {
        title: "HPLC purity",
        body: "Concentration and purity assessment via High-Performance Liquid Chromatography.",
      },
      {
        title: "Mass spectrometry",
        body: "LC-MS/MS for exact molecular weight and sequence validation.",
      },
      {
        title: "Stability assays",
        body: "Solubility, thermal shift, stability, and formulation testing.",
      },
      {
        title: "ADMET checks",
        body: "Preclinical absorption, distribution, metabolism, excretion, and toxicity.",
      },
    ],
    benefits: [
      "Cut reporting cycles from weeks to hours",
      "Catch errors and outliers before they propagate",
      "Empower scientists with self-serve insight",
      "Audit-ready lineage for every metric",
    ],
    useCases: [
      { title: "Assay QC", body: "Real-time monitoring of plate-based assays." },
      { title: "Clinical readouts", body: "Visualize endpoints across cohorts and sites." },
      { title: "R&D portfolio", body: "Compare programs on consistent KPIs." },
    ],
  },
  {
    slug: "bioinformatics",
    title: "Bioinformatics",
    description: "Intelligent bioinformatics platforms for modern healthcare and research.",
    icon: Cpu,
    badge: "Computational Biology",
    num: "04",
    accentText: "text-cyan-600 dark:text-cyan-400",
    color: "border-cyan-500/15 bg-cyan-500/[0.02]",
    hero: {
      eyebrow: "Intelligent Bioinformatics",
      headline: "A bioinformatics platform built for production.",
      sub: "Scalable pipelines, governed data, and AI copilots that meet healthcare-grade requirements out of the box.",
    },
    overview:
      "Bioinformatics gives research and clinical teams a unified workspace to run, share, and govern bioinformatics workloads — with the security, observability, and reproducibility production environments demand.",
    features: [
      {
        title: "Genome-scale mapping",
        body: "Sequence mapping across multi-organism genetic directories.",
      },
      {
        title: "Structural annotation",
        body: "Non-coding sequence annotation with homology indexes.",
      },
      {
        title: "AlphaFold integration",
        body: "Tertiary structure prediction via modern ML metrics.",
      },
      {
        title: "Deep docking",
        body: "High-throughput algorithms for virtual library prioritization.",
      },
    ],
    benefits: [
      "Production-ready from day one",
      "Reduce ops burden on bioinformatics teams",
      "Enable secure collaboration with external partners",
      "Standardize how science gets shipped",
    ],
    useCases: [
      { title: "Hospital genomics", body: "Operate diagnostic pipelines under clinical SLAs." },
      { title: "Biotech R&D", body: "Scale exploratory analysis without sacrificing rigor." },
      { title: "Consortia", body: "Federate analyses across multiple institutions." },
    ],
  },
  {
    slug: "regulatory-compliance",
    title: "Regulatory & Compliance",
    description: "Ensure compliance, quality assurance, and streamlined regulatory processes.",
    icon: ShieldCheck,
    badge: "Compliance & Assurance",
    num: "05",
    accentText: "text-orange-600 dark:text-orange-400",
    color: "border-orange-500/15 bg-orange-500/[0.02]",
    hero: {
      eyebrow: "Compliance & Quality",
      headline: "Stay audit-ready, always.",
      sub: "Modern tooling for regulatory submissions, complaint handling, and quality management.",
    },
    overview:
      "We maintain rigorous data integrity and clinical readiness. Our regulatory team ensures every scientific discovery complies with international biotechnology guidelines and safety controls.",
    features: [
      {
        title: "IND dossiers",
        body: "Investigational New Drug compilation and regulatory support.",
      },
      {
        title: "FDA/EMA filings",
        body: "Complete safety assurance reporting per agency guidelines.",
      },
      {
        title: "GLP/GMP audits",
        body: "Compliant documentation audits and laboratory standard logging.",
      },
      {
        title: "Complaint logging",
        body: "Client reporting, inquiry handling, and full audit trails.",
      },
    ],
    benefits: [
      "Shorten submission cycles",
      "Reduce risk of findings and warning letters",
      "Improve responsiveness to patient and clinician feedback",
      "Unify quality, regulatory, and safety in one system",
    ],
    useCases: [
      { title: "Medical devices", body: "Manage 510(k) and MDR workflows end-to-end." },
      { title: "Pharma post-market", body: "Track adverse events and signal trends." },
      { title: "Diagnostics", body: "Maintain ISO 13485 and IVDR compliance." },
    ],
  },
  {
    slug: "education",
    title: "Education",
    description:
      "Quantum computing education, certifications, workshops, and professional training.",
    icon: GraduationCap,
    badge: "Training & Certification",
    num: "06",
    accentText: "text-accent-purple",
    color: "border-accent-purple/15 bg-accent-purple/[0.02]",
    hero: {
      eyebrow: "Learn & Certify",
      headline: "Build the quantum workforce of tomorrow.",
      sub: "Hands-on courses, certifications, and corporate workshops taught by working quantum scientists.",
    },
    overview:
      "Deep Codon Initiative provides institutional training and certification programs in computational biology, synthetic gene expression, and quantum-molecular mechanics — taught by domain experts.",
    features: [
      { title: "Structured tracks", body: "Curated paths for engineers, scientists, and leaders." },
      { title: "Live workshops", body: "Cohort-based sessions with expert instructors." },
      {
        title: "Certifications",
        body: "Industry-recognized credentials with rigorous assessment.",
      },
      { title: "Corporate training", body: "Bespoke programs aligned to your team's roadmap." },
    ],
    benefits: [
      "Upskill teams on quantum and AI for life sciences",
      "Reduce hiring risk with internal capability",
      "Stay current with a rapidly evolving field",
      "Earn credentials your peers actually recognize",
    ],
    useCases: [
      { title: "Enterprise onboarding", body: "Get new hires productive on quantum stacks." },
      {
        title: "University partnerships",
        body: "Co-develop curriculum with leading institutions.",
      },
      { title: "Executive briefings", body: "Strategy sessions for leadership teams." },
    ],
  },
];

export const getOffering = (slug: string) => {
  const normSlug = slug === "analytical-services" ? "analytical-service" : slug;
  return offerings.find((o) => o.slug === normSlug);
};
