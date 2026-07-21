import {
  HeartPulse,
  Factory,
  GraduationCap,
  Microscope,
  Dna,
  Activity,
  ShieldCheck,
  Cpu,
  Atom,
  Scale,
  FileText,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

export type Industry = {
  slug: string;
  title: string;
  icon: LucideIcon;
  eyebrow: string;
  headline: string;
  subtext: string;
  overview: string;
  highlights: { title: string; body: string; icon: LucideIcon }[];
  useCases: { title: string; body: string }[];
  color: string;
  accent: string;
  workflow: { step: string; title: string; body: string }[];
};

export const industries: Industry[] = [
  {
    slug: "life-science",
    title: "Life Science",
    icon: HeartPulse,
    eyebrow: "Industry — Life Science",
    headline: "Accelerating discovery and care with the dark genome",
    subtext:
      "From novel therapeutic leads to precision diagnostics, Quantum Codon empowers life science innovators to translate hidden biology into clinical impact.",
    overview:
      "We partner with hospitals, biotech firms, and research institutions to apply Deep Codon technology to drug discovery pipelines, biomarker development, and translational research initiatives.",
    highlights: [
      {
        title: "Advanced Biotechnology & Therapeutics Research",
        body: "Driving breakthroughs in genomics, molecular biology, therapeutics & life sciences.",
        icon: Microscope,
      },
      {
        title: "Precision Genomics & Bioinformatics",
        body: "Turning complex data into actionable insights for better outcomes.",
        icon: Dna,
      },
      {
        title: "Novel Therapeutics",
        body: "First-in-class peptides and proteins designed from non-expressing DNA regions.",
        icon: Activity,
      },
      {
        title: "Clinical Biomarkers",
        body: "Dark RNA signatures as biomarkers for early-stage disease detection and validation.",
        icon: ShieldCheck,
      },
    ],
    useCases: [
      {
        title: "Oncology",
        body: "Designing tumor-selective peptides from Class I dark DNA libraries.",
      },
      {
        title: "Neurodegeneration",
        body: "Modulating non-translating RNA implicated in protein aggregation.",
      },
      {
        title: "Infectious Disease",
        body: "Rapid screening against resistant pathogens — e.g. tREP-18 vs Leishmania.",
      },
    ],
    workflow: [
      {
        step: "01",
        title: "Target Identification",
        body: "We map disease-associated genomic loci to non-coding (dark genome) transcripts, locating novel translation frames and key regulatory RNA targets.",
      },
      {
        step: "02",
        title: "Molecule & Cassette Design",
        body: "Using quantum-molecular modeling and machine learning, we design synthetic peptides, small molecules, or regulatory elements to modulate these hidden targets.",
      },
      {
        step: "03",
        title: "Preclinical Validation",
        body: "Lead candidates undergo high-throughput in vitro screening, toxicity evaluation, and binding-affinity validation in partnership with GLP-certified wet labs.",
      },
      {
        step: "04",
        title: "Pipeline Integration",
        body: "We deliver full-package IND-ready dossiers and preclinical validation reports, facilitating seamless licensing, co-development, and clinical translation.",
      },
    ],
    color: "border-accent-blue/20 bg-accent-blue/[0.04]",
    accent: "text-accent-blue",
  },
  {
    slug: "manufacturing",
    title: "Manufacturing",
    icon: Factory,
    eyebrow: "Industry — Manufacturing",
    headline: "Bioprocess and industrial biotech at quantum scale",
    subtext:
      "Engineer enzymes, biomaterials, and bioproducts using synthetic translation frames sourced from the unexplored 98% of the genome.",
    overview:
      "Quantum Codon supports manufacturers in scaling sustainable, high-yield bio-production — from enzyme engineering to specialty chemicals and biomaterials grounded in dark genome science.",
    highlights: [
      {
        title: "Enzyme Engineering",
        body: "Designer biocatalysts for greener, more selective industrial chemistry.",
        icon: Cpu,
      },
      {
        title: "Bio-based Materials",
        body: "Novel proteins for textiles, packaging, and specialty polymers.",
        icon: Atom,
      },
      {
        title: "Process Optimization",
        body: "Strain design and expression tuning across microbial chassis.",
        icon: Activity,
      },
      {
        title: "Quality Analytics",
        body: "HPLC, mass spec, and ADMET-style profiling for industrial QC.",
        icon: Scale,
      },
    ],
    useCases: [
      {
        title: "Specialty Chemicals",
        body: "Custom catalytic peptides for fine-chemical synthesis.",
      },
      {
        title: "Food & Agri-Tech",
        body: "Functional proteins and bioactives for next-gen food systems.",
      },
      {
        title: "Sustainable Materials",
        body: "Biodegradable polymers from engineered protein backbones.",
      },
    ],
    workflow: [
      {
        step: "01",
        title: "Enzyme Mining",
        body: "We mine dark genome transcripts for novel protein sequences with high thermal and chemical stability to act as custom biocatalysts.",
      },
      {
        step: "02",
        title: "Strain Design",
        body: "We write codon-optimized synthetic genes and construct high-performance expression vectors for insertion into host yeast or bacterial strains.",
      },
      {
        step: "03",
        title: "Yield Tuning",
        body: "We run parallel micro-fermentation assays to optimize feed inputs, media formulations, and aeration controls for maximum batch yield.",
      },
      {
        step: "04",
        title: "Industrial Transfer",
        body: "We deliver fully optimized production strains, fermentation SOPs, and analytical QC metrics ready for industrial scale-up.",
      },
    ],
    color: "border-accent-purple/20 bg-accent-purple/[0.04]",
    accent: "text-accent-purple",
  },
  {
    slug: "education",
    title: "Education",
    icon: GraduationCap,
    eyebrow: "Industry — Education",
    headline: "Training the next generation of dark genome scientists",
    subtext:
      "University programs, certifications, and corporate workshops that bring computational biology and quantum-molecular science to learners worldwide.",
    overview:
      "Through the Deep Codon Initiative, we collaborate with universities and research institutes to deliver curricula, training fellowships, and joint research programs in synthetic biology and dark genome analytics.",
    highlights: [
      {
        title: "University Curricula",
        body: "Modular courses on dark DNA, RNA, and synthetic gene expression.",
        icon: GraduationCap,
      },
      {
        title: "Certification Programs",
        body: "Hands-on tracks in bioinformatics, AI structural biology, and lab methods.",
        icon: FileText,
      },
      {
        title: "Research Fellowships",
        body: "Joint projects with JNU and Amaravati Quantum Valley.",
        icon: Microscope,
      },
      {
        title: "Corporate Workshops",
        body: "Bespoke trainings for R&D teams transitioning into dark genome science.",
        icon: Briefcase,
      },
    ],
    useCases: [
      {
        title: "Graduate Training",
        body: "Dark genome mapping, annotation, and synthetic translation labs.",
      },
      {
        title: "Continuing Education",
        body: "Refresher tracks for clinicians, biotech engineers, and analysts.",
      },
      {
        title: "Joint Research",
        body: "Co-authored peer-reviewed studies and shared infrastructure.",
      },
    ],
    workflow: [
      {
        step: "01",
        title: "Syllabus Integration",
        body: "We work with university academic councils to align training material with state-of-the-art computational biology requirements.",
      },
      {
        step: "02",
        title: "Hands-on Projects",
        body: "Students gain practical experience annotating genomic regions, predicting protein structures, and configuring bioreactor workflows.",
      },
      {
        step: "03",
        title: "Evaluation & Badge",
        body: "Learners complete capstone assignments and structured tests evaluated by our leading researchers to earn certifications.",
      },
      {
        step: "04",
        title: "Career Placement",
        body: "We connect certified dark genome scholars directly with global biopharma innovators, academic labs, and research portals.",
      },
    ],
    color: "border-accent-emerald/20 bg-accent-emerald/[0.04]",
    accent: "text-accent-emerald",
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
