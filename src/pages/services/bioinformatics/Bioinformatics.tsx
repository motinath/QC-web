import React, { useState } from "react";
import PageShell from "../../_PageShell";
import { Link } from "@/lib/router-compat";
import { Database, Cpu, Search, BookOpen, Code, CheckCircle2, ListFilter } from "lucide-react";
import bioinformaticsConsoleImg from "./bioinformatics-genomics-suite.png";

type DatabaseItem = {
  name: string;
  category: string;
  description: string;
  useCase: string;
  source: string;
  keywords: string[];
};

const databasesData: DatabaseItem[] = [
  {
    name: "GenBank (NCBI)",
    category: "Sequence Databases",
    description:
      "The primary US nucleotide sequence archive, syncing daily with ENA (Europe) and DDBJ (Japan) under the INSDC collaboration.",
    useCase:
      "Comparing unknown DNA sequences against millions of records to find species origin or gene identity.",
    source: "NCBI (National Center for Biotechnology Information)",
    keywords: ["sequence", "nucleotide", "dna", "blast", "genbank", "insdc"],
  },
  {
    name: "RefSeq (NCBI)",
    category: "Sequence Databases",
    description:
      "A curated, non-redundant set of reference sequences representing genomes, transcripts, and proteins, cleaned up from raw public submissions.",
    useCase:
      "Using a single canonical transcript sequence to design PCR primers or annotate new genomes.",
    source: "NCBI",
    keywords: ["refseq", "canonical", "reference", "transcript", "primer", "mrna"],
  },
  {
    name: "UniProt",
    category: "Sequence Databases",
    description:
      "The global hub for protein sequence and functional annotation, split into Swiss-Prot (manually curated) and TrEMBL (automatically annotated).",
    useCase:
      "Pulling functional annotations, domain coordinates, modifications, and disease links for a protein.",
    source: "EMBL-EBI / SIB / PIR",
    keywords: ["uniprot", "protein", "swiss-prot", "trembl", "annotation", "enzyme"],
  },
  {
    name: "Ensembl / UCSC Browser",
    category: "Genome & Annotation",
    description:
      "Interactive visual browsers hosting reference genomes, gene models, regulatory elements, and comparative genomics tracks.",
    useCase:
      "Visually inspecting the exon/intron structure of genes or checking sequence conservation across species.",
    source: "EMBL-EBI / UCSC",
    keywords: ["ensembl", "ucsc", "genome", "browser", "exon", "intron", "chromosome"],
  },
  {
    name: "GENCODE",
    category: "Genome & Annotation",
    description:
      "The gold-standard reference annotation database for human and mouse genomes, utilized by major research consortia globally.",
    useCase:
      "Providing high-confidence gene boundaries and splicing variants for transcriptome alignment.",
    source: "GENCODE Consortium",
    keywords: ["gencode", "annotation", "human", "mouse", "splicing", "transcriptome"],
  },
  {
    name: "dbSNP & dbVar",
    category: "Variant & Clinical",
    description:
      "Universal catalogs for short genetic variants (SNPs, indels) and structural variants, assigning global rsIDs to variants.",
    useCase:
      "Querying allele frequencies and genome coordinates for single nucleotide polymorphisms.",
    source: "NCBI",
    keywords: ["dbsnp", "dbvar", "rsid", "snp", "indel", "variant", "mutation"],
  },
  {
    name: "ClinVar",
    category: "Variant & Clinical",
    description:
      "A public archive aggregating interpretations of clinical significance for human variants, linking variants to health conditions.",
    useCase:
      "Annotating patient VCF files to flag pathogenic or likely pathogenic variants during clinical diagnoses.",
    source: "NCBI",
    keywords: ["clinvar", "pathogenic", "benign", "clinical", "vcf", "patient"],
  },
  {
    name: "COSMIC / TCGA",
    category: "Variant & Clinical",
    description:
      "Specialized cancer databases cataloging somatic mutations, gene fusions, and multi-omic tumor samples across patient cohorts.",
    useCase:
      "Checking if a specific mutation in a tumor biopsy is a recognized cancer driver mutation.",
    source: "Sanger Institute / NIH",
    keywords: ["cosmic", "tcga", "cancer", "somatic", "mutation", "tumor"],
  },
  {
    name: "gnomAD",
    category: "Variant & Clinical",
    description:
      "A database compiling population allele frequencies from hundreds of thousands of whole-genome and exome sequencing samples.",
    useCase:
      "Distinguishing common benign population polymorphisms from rare, disease-causing candidate variants.",
    source: "Broad Institute",
    keywords: ["gnomad", "allele", "frequency", "population", "exome", "rare"],
  },
  {
    name: "PDB (Protein Data Bank)",
    category: "Structural Biology",
    description:
      "The global, canonical archive for three-dimensional structures of proteins, nucleic acids, and complexes resolved experimentally.",
    useCase: "Downloading 3D atomic coordinates (PDB/CIF files) to inspect ligand-binding pockets.",
    source: "wwPDB (RCSB, PDBe, PDBj)",
    keywords: ["pdb", "structure", "3d", "protein", "crystallography", "cryo-em", "nmr"],
  },
  {
    name: "AlphaFold DB",
    category: "Structural Biology",
    description:
      "An AI-driven database hosting predicted 3D structures for hundreds of millions of proteins, built by Google DeepMind and EMBL-EBI.",
    useCase:
      "Obtaining structural models for uncharacterized proteins with no experimental structures available.",
    source: "DeepMind / EMBL-EBI",
    keywords: ["alphafold", "deepmind", "prediction", "ai", "model", "structural"],
  },
  {
    name: "KEGG & Reactome",
    category: "Pathways & Interactions",
    description:
      "Databases mapping genes and proteins to metabolic pathways, cellular signaling cascades, and disease pathway systems.",
    useCase:
      "Performing pathway enrichment analysis on gene expression lists to identify altered pathways.",
    source: "Kanehisa Labs / Reactome Consortium",
    keywords: ["kegg", "reactome", "pathway", "metabolism", "enrichment", "cascade"],
  },
  {
    name: "STRING",
    category: "Pathways & Interactions",
    description:
      "A database compiling physical and functional protein-protein interaction networks from experimental, prediction, and text-mined data.",
    useCase:
      "Building interaction networks around genes of interest to locate central hub proteins.",
    source: "STRING Consortium",
    keywords: ["string", "interaction", "ppi", "network", "protein-protein", "co-expression"],
  },
  {
    name: "Gene Ontology (GO)",
    category: "Pathways & Interactions",
    description:
      "A standardized vocabulary describing gene products in terms of Biological Process, Molecular Function, and Cellular Component.",
    useCase:
      "Running functional annotation tests to categorize the molecular functions of differentially expressed genes.",
    source: "Gene Ontology Consortium",
    keywords: ["go", "ontology", "biological", "molecular", "cellular", "function"],
  },
  {
    name: "GEO / ArrayExpress / SRA",
    category: "Expression & Functional",
    description:
      "Public repositories storing raw high-throughput sequencing reads (SRA) and processed expression matrices (GEO, ArrayExpress) from publications.",
    useCase:
      "Downloading raw RNA-seq reads or microarray data to perform independent meta-analyses.",
    source: "NCBI / EMBL-EBI",
    keywords: ["geo", "sra", "arrayexpress", "expression", "rna-seq", "microarray", "reads"],
  },
  {
    name: "Human Protein Atlas (HPA)",
    category: "Expression & Functional",
    description:
      "A database mapping the spatial distribution and tissue-specific expression profiles of proteins across human tissues and cells.",
    useCase:
      "Checking the protein localization of a candidate biomarker inside healthy vs. cancerous tissues.",
    source: "KTH Royal Institute of Technology",
    keywords: ["hpa", "protein", "atlas", "expression", "tissue", "immunohistochemistry"],
  },
];

export default function BioinformaticsPage() {
  const [activeTab, setActiveTab] = useState<"databases" | "programming">("databases");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(databasesData.map((db) => db.category)))];

  const filteredDatabases = databasesData.filter((db) => {
    const matchesSearch =
      db.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      db.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      db.useCase.toLowerCase().includes(searchQuery.toLowerCase()) ||
      db.keywords.some((k) => k.includes(searchQuery.toLowerCase()));

    const matchesCategory = filterCategory === "All" || db.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <PageShell spotlight="from-cyan-500/15 via-transparent to-transparent">
      {/* 1. Hero Section */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="relative rounded-3xl border border-cyan-500/20 bg-cyan-500/[0.03] dark:bg-cyan-500/[0.05] p-10 md:p-16 backdrop-blur-md overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(6,182,212,0.1),transparent_50%)] pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Title, Eyebrow, Description & CTAs */}
            <div className="lg:col-span-6 text-left">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 shadow-sm">
                  <Cpu className="h-6 w-6" />
                </div>
                <span className="font-mono text-xs tracking-[0.2em] uppercase text-cyan-500 font-bold">
                  Offering 04 — Bioinformatics
                </span>
              </div>
              <h1 className="font-serif-display text-4xl md:text-5xl lg:text-6xl leading-[1.12] text-foreground font-medium">
                Intelligent Bioinformatics Platforms & Frameworks
              </h1>
              <p className="mt-6 text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Empower your research and diagnostic workflows with clinical-grade databases,
                standardized pipelines, and scalable computational engines.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#portal"
                  className="px-6 py-3 rounded-full bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-semibold hover:opacity-95 transition shadow-lg shadow-cyan-500/10"
                >
                  Access Platform
                </a>
                <a
                  href="#contact"
                  className="px-6 py-3 rounded-full border border-foreground/20 text-sm font-semibold hover:bg-foreground/5 transition"
                >
                  Partner With Us
                </a>
              </div>
            </div>

            {/* Right Column: Right-side Card fitting 100% of the image (aspect-16/9 + object-contain) */}
            <div className="lg:col-span-6 flex justify-center w-full">
              <div className="relative w-full rounded-3xl overflow-hidden border border-cyan-500/20 shadow-2xl bg-slate-950 p-2 sm:p-2.5 sci-panel group">
                <div className="relative w-full aspect-[16/9.5] rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center">
                  <img
                    src={bioinformaticsConsoleImg}
                    alt="Bioinformatics Computational Suite Dashboard"
                    className="w-full h-full object-contain saturate-110 transition-transform duration-700 group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Navigation Tabs */}
      <section id="portal" className="max-w-6xl mx-auto px-6 mb-8">
        <div className="flex border-b border-foreground/10 pb-1 gap-6">
          <button
            onClick={() => setActiveTab("databases")}
            className={`pb-4 text-base font-semibold tracking-wide relative transition-colors ${
              activeTab === "databases"
                ? "text-cyan-500"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {activeTab === "databases" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-500 rounded-full" />
            )}
            Biological Databases Guide
          </button>
          <button
            onClick={() => setActiveTab("programming")}
            className={`pb-4 text-base font-semibold tracking-wide relative transition-colors ${
              activeTab === "programming"
                ? "text-cyan-500"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {activeTab === "programming" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-500 rounded-full" />
            )}
            Computational Developer Toolkit
          </button>
        </div>
      </section>

      {/* Tab Content 1: Databases Directory */}
      {activeTab === "databases" && (
        <div className="animate-fade-in max-w-6xl mx-auto px-6 space-y-16">
          {/* Overview text */}
          <section className="max-w-3xl">
            <h2 className="font-serif-display text-3xl md:text-4xl text-foreground font-semibold">
              The Backbone of Modern Life Science Research
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Biological databases are essential repositories storing, standardizing, and making
              searchable the staggering volume of data generated by genomics, proteomics, and
              structural biology projects globally. Public resources solve key research bottlenecks:
              they eliminate redundant experiments, facilitate cross-species analysis, and secure
              long-term data preservation.
            </p>
          </section>

          {/* Interactive filter & search */}
          <section className="p-6 rounded-3xl border border-foreground/10 bg-white/40 dark:bg-black/20 backdrop-blur-md">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search databases by keyword (e.g. DNA, structural)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-white/80 dark:bg-black/40 border border-foreground/10 rounded-2xl focus:outline-none focus:border-cyan-500 transition"
                />
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <ListFilter className="h-4 w-4 text-cyan-500" />
                <span className="text-xs font-mono uppercase text-muted-foreground whitespace-nowrap">
                  Filter By:
                </span>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full md:w-56 px-3 py-2 text-xs bg-white/80 dark:bg-black/40 border border-foreground/10 rounded-xl focus:outline-none focus:border-cyan-500 transition"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {filteredDatabases.length > 0 ? (
                filteredDatabases.map((db) => (
                  <div
                    key={db.name}
                    className="group p-6 rounded-2xl border border-foreground/5 bg-white/60 dark:bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-cyan-500/30 hover:bg-white/90 dark:hover:bg-white/5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[9px] tracking-widest font-mono uppercase bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 px-2 py-0.5 rounded">
                          {db.category}
                        </span>
                        <Database className="h-4 w-4 text-muted-foreground/60" />
                      </div>
                      <h3 className="font-serif-display text-xl font-bold text-foreground transition-colors group-hover:text-cyan-500">
                        {db.name}
                      </h3>
                      <p className="text-xs text-muted-foreground/90 font-mono mt-1 mb-3">
                        Maintained by: {db.source}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {db.description}
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-foreground/5 text-xs">
                      <strong className="text-foreground font-semibold block mb-1">
                        Use Case:
                      </strong>
                      <span className="text-muted-foreground italic leading-relaxed">
                        {db.useCase}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-muted-foreground">
                  No databases match your search criteria. Try a different keyword.
                </div>
              )}
            </div>
          </section>

          {/* Database Comparison Table */}
          <section className="space-y-6">
            <div className="max-w-2xl">
              <span className="text-xs tracking-[0.2em] uppercase font-bold text-cyan-500">
                Quick Reference
              </span>
              <h2 className="font-serif-display text-3xl mt-2 font-semibold">
                Choosing the Right Database
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                A simple workflow guide designed to direct bioinformaticians to the optimal starting
                point based on their experimental goals.
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-foreground/10 bg-white/40 dark:bg-black/20 backdrop-blur-md shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-foreground/10 bg-cyan-500/5 font-mono text-xs uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                      <th className="p-4 font-semibold">Research Need / Task</th>
                      <th className="p-4 font-semibold">Best Starting Point</th>
                      <th className="p-4 font-semibold">Primary Core Resource</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-foreground/5">
                    {[
                      {
                        need: "Identify an unknown DNA/protein sequence",
                        starting: "GenBank / UniProt + BLAST",
                        resource: "INSDC / UniProt",
                      },
                      {
                        need: "Browse gene structure and regulatory areas",
                        starting: "Ensembl / UCSC Genome Browser",
                        resource: "GENCODE",
                      },
                      {
                        need: "Check clinical significance of a variant",
                        starting: "ClinVar + gnomAD",
                        resource: "dbSNP / gnomAD",
                      },
                      {
                        need: "Find a protein's 3D structure",
                        starting: "PDB, then AlphaFold DB if unavailable",
                        resource: "wwPDB / DeepMind",
                      },
                      {
                        need: "Map genes to biological pathways",
                        starting: "KEGG / Reactome",
                        resource: "Systems Biology",
                      },
                      {
                        need: "Explore protein-protein interaction matrices",
                        starting: "STRING",
                        resource: "STRING Networks",
                      },
                      {
                        need: "Reuse published expression datasets",
                        starting: "GEO / ArrayExpress / SRA",
                        resource: "NCBI / EMBL-EBI",
                      },
                      {
                        need: "Research somatic cancer mutations",
                        starting: "COSMIC / TCGA",
                        resource: "Cancer Atlas",
                      },
                    ].map((row) => (
                      <tr
                        key={row.need}
                        className="hover:bg-white/40 dark:hover:bg-white/5 transition-colors"
                      >
                        <td className="p-4 font-medium text-foreground">{row.need}</td>
                        <td className="p-4 text-cyan-600 dark:text-cyan-400 font-semibold">
                          {row.starting}
                        </td>
                        <td className="p-4 text-muted-foreground font-mono text-xs">
                          {row.resource}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Database Tips */}
          <section className="p-8 rounded-3xl border border-foreground/10 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-500 shrink-0">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-lg text-foreground">
                  Pro-Tip for Clinical Researchers
                </h4>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  When structuring bioinformatics portals or reports, group content by{" "}
                  <strong>task</strong> (e.g., "Finding a Reference Genome") rather than
                  alphabetically. Beginners and domain investigators arrive with specific
                  operational questions. Linking directly to API endpoints or citing the most recent
                  database description in <em>Nucleic Acids Research</em> ensures your team operates
                  with maximum scientific accuracy.
                </p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Tab Content 2: Programming Resources */}
      {activeTab === "programming" && (
        <div className="animate-fade-in max-w-6xl mx-auto px-6 space-y-16">
          {/* Overview text */}
          <section className="max-w-3xl">
            <h2 className="font-serif-display text-3xl md:text-4xl text-foreground font-semibold">
              Turning Raw Data Into Biological Insights
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Modern genomic datasets are too vast for manual inspections. Computational scripting
              is crucial to parsing sequences, running alignments, and executing reproducible
              statistical models.
            </p>
          </section>

          {/* 1. Core Languages */}
          <section className="space-y-6">
            <h3 className="text-xs tracking-[0.3em] text-cyan-500 uppercase font-bold">
              Languages & Ecosystems
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  name: "Python",
                  purpose: "General Scripting & Machine Learning",
                  use: "Sequence manipulation, data wrangling, AlphaFold modelling, and deep learning pipelines.",
                  pct: "95%",
                  color: "text-cyan-500",
                },
                {
                  name: "R",
                  purpose: "Statistical Genomics & Plots",
                  use: "Differential expression, statistical distributions, single-cell clustering, and publication-ready plots.",
                  pct: "85%",
                  color: "text-indigo-500",
                },
                {
                  name: "Bash / Shell",
                  purpose: "Workflow Automation & HPC",
                  use: "Chaining CLI aligners, job scheduling on cluster nodes, and handling directories with raw FASTQs.",
                  pct: "90%",
                  color: "text-emerald-500",
                },
                {
                  name: "SQL",
                  purpose: "Relational Queries",
                  use: "Querying local schemas of genomic annotations, LIMS logs, and metadata databases directly.",
                  pct: "60%",
                  color: "text-amber-500",
                },
              ].map((lang) => (
                <div
                  key={lang.name}
                  className="p-6 rounded-2xl border border-foreground/5 bg-white/40 dark:bg-black/20 backdrop-blur flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-serif-display text-2xl font-bold text-foreground">
                        {lang.name}
                      </h4>
                      <Code className="h-4 w-4 text-muted-foreground/60" />
                    </div>
                    <span className="text-[10px] tracking-wide font-semibold text-cyan-500 font-mono block mb-2">
                      {lang.purpose}
                    </span>
                    <p className="text-sm text-muted-foreground leading-relaxed">{lang.use}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-foreground/5">
                    <span className="text-[10px] text-muted-foreground uppercase font-mono block mb-1">
                      Ecosystem Adoption
                    </span>
                    <div className="w-full bg-foreground/10 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-cyan-500 h-full rounded-full"
                        style={{ width: lang.pct }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 2. Interactive Code Playground */}
          <section className="space-y-6">
            <div className="max-w-2xl">
              <span className="text-xs tracking-[0.2em] uppercase font-bold text-cyan-500">
                Live Templates
              </span>
              <h2 className="font-serif-display text-3xl mt-2 font-semibold">
                Standard Script Templates
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                Click a language template below to review typical production-grade workflows for
                sequence retrieval and statistical profiling.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Python Snippet */}
              <div className="lg:col-span-6 p-6 rounded-3xl border border-foreground/10 bg-slate-950 text-slate-200 font-mono text-xs overflow-hidden relative">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500" />
                    <div className="h-2 w-2 rounded-full bg-yellow-500" />
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-white font-semibold ml-2">fetch_sequence.py</span>
                  </div>
                  <span className="text-cyan-400 text-[10px] uppercase font-mono tracking-widest">
                    Python 3 + Biopython
                  </span>
                </div>
                <pre className="overflow-x-auto text-slate-300 leading-relaxed py-2">
                  {`from Bio import Entrez, SeqIO

# Provide your institutional email
Entrez.email = "contact@qcodon.com"

# Fetch SRA or RefSeq sequence
print("Querying Entrez NCBI sequence database...")
with Entrez.efetch(
    db="nucleotide", 
    id="NC_045512", # SARS-CoV-2 genome
    rettype="fasta", 
    retmode="text"
) as handle:
    record = SeqIO.read(handle, "fasta")
    print(f"ID: {record.id}")
    print(f"Annotation: {record.description[:42]}...")
    print(f"Sequence Length: {len(record.seq)} bp")`}
                </pre>
              </div>

              {/* R Snippet */}
              <div className="lg:col-span-6 p-6 rounded-3xl border border-foreground/10 bg-slate-950 text-slate-200 font-mono text-xs overflow-hidden relative">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500" />
                    <div className="h-2 w-2 rounded-full bg-yellow-500" />
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-white font-semibold ml-2">deseq2_analysis.R</span>
                  </div>
                  <span className="text-indigo-400 text-[10px] uppercase font-mono tracking-widest">
                    R + Bioconductor
                  </span>
                </div>
                <pre className="overflow-x-auto text-slate-300 leading-relaxed py-2">
                  {`library(DESeq2)

# Load counts matrix and metadata
dds <- DESeqDataSetFromMatrix(
  countData = counts_matrix,
  colData = design_metadata,
  design = ~ condition
)

# Run differential gene expression pipeline
dds <- DESeq(dds)
results_table <- results(dds, contrast=c("condition","treatment","control"))

# Sort and filter significant genes (Adjusted P-Value < 0.05)
significant_genes <- subset(results_table, padj < 0.05)
print(paste("Significant genes found:", nrow(significant_genes)))`}
                </pre>
              </div>
            </div>
          </section>

          {/* 3. Command Line Tool Chest */}
          <section className="space-y-6">
            <h3 className="text-xs tracking-[0.3em] text-cyan-500 uppercase font-bold">
              Standard CLI Tool Chest
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "BLAST",
                  desc: "Aligns sequences against databases to assess homology and trace evolutionary similarities.",
                  cmd: "blastn -query query.fa -db nt -out results.txt",
                },
                {
                  title: "SAMtools / BCFtools",
                  desc: "Manipulates BAM/SAM files (sorting, indexing) and calls/filters genomic VCF records.",
                  cmd: "samtools sort input.bam -o sorted.bam",
                },
                {
                  title: "BWA / Bowtie2",
                  desc: "Short-read aligners that map raw sequencing reads directly back onto a reference genome.",
                  cmd: "bwa mem reference.fa read1.fq read2.fq > aligned.sam",
                },
                {
                  title: "STAR / Salmon",
                  desc: "RNA-seq read alignment and transcript quantification tools utilizing pseudo-alignment.",
                  cmd: "salmon quant -i index -l A -1 r1.fq -2 r2.fq -o quant",
                },
                {
                  title: "GATK Suite",
                  desc: "Broad Institute's gold-standard suite for calling SNPs, indels, and structural variants.",
                  cmd: "gatk HaplotypeCaller -R ref.fa -I input.bam -O var.vcf",
                },
                {
                  title: "Bedtools",
                  desc: "Enables fast mathematical genomic interval operations (intersect, merge, subtract).",
                  cmd: "bedtools intersect -a peak.bed -b gene.bed > intersect.bed",
                },
              ].map((tool) => (
                <div
                  key={tool.title}
                  className="p-6 rounded-2xl border border-foreground/5 bg-white/40 dark:bg-black/20 backdrop-blur flex flex-col justify-between"
                >
                  <div>
                    <h4 className="font-serif-display text-lg font-bold text-foreground mb-2">
                      {tool.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {tool.desc}
                    </p>
                  </div>
                  <div className="p-3 bg-slate-950 text-cyan-400 font-mono text-[10px] rounded-lg overflow-x-auto border border-white/5">
                    <code>{tool.cmd}</code>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. Env Management & Repositories */}
          <section className="grid lg:grid-cols-12 gap-8 items-center border-t border-foreground/10 pt-16">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs tracking-[0.25em] uppercase font-bold text-cyan-500">
                Reproducibility
              </span>
              <h3 className="font-serif-display text-3xl font-bold text-foreground">
                Package Management & Environments
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Bioconda maintains pre-packaged versions of thousands of tools, enabling
                installation in isolated virtual spaces. To enforce absolute reproducibility across
                clusters, labs combine Conda environments with <strong>Docker</strong> or{" "}
                <strong>Singularity (Apptainer)</strong> containers. Chaining these is commonly
                automated using Nextflow or Snakemake pipelines.
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-xs text-foreground font-mono">
                  <CheckCircle2 className="h-4 w-4 text-cyan-500" />
                  <span>Bioconda</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-foreground font-mono">
                  <CheckCircle2 className="h-4 w-4 text-cyan-500" />
                  <span>Docker Containers</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-foreground font-mono">
                  <CheckCircle2 className="h-4 w-4 text-cyan-500" />
                  <span>Git Version Control</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 overflow-hidden rounded-2xl border border-foreground/10 bg-white/40 dark:bg-black/20 backdrop-blur-md shadow-lg p-5">
              <h4 className="font-mono text-[11px] uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-4 font-semibold">
                Choosing a Language or Tool
              </h4>
              <div className="space-y-3">
                {[
                  { task: "General Scripting & APIs", tool: "Python / Biopython" },
                  { task: "RNA-seq Expression Models", tool: "R / Bioconductor (DESeq2)" },
                  { task: "Single-Cell Transcriptomics", tool: "Scanpy (Py) / Seurat (R)" },
                  { task: "Variant Pipeline Execution", tool: "GATK / SAMtools (CLI)" },
                  { task: "Multi-Tool Dependency Control", tool: "Conda / Docker" },
                ].map((item) => (
                  <div
                    key={item.task}
                    className="flex items-center justify-between text-xs p-3 rounded-xl border border-foreground/5 bg-white/30 dark:bg-black/10"
                  >
                    <span className="font-medium text-foreground">{item.task}</span>
                    <span className="font-mono text-cyan-500 font-bold">{item.tool}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* 5. Contact / Partnering CTA */}
      <section id="contact" className="max-w-6xl mx-auto px-6 mt-20">
        <div className="rounded-3xl border border-foreground/10 p-10 md:p-14 bg-gradient-to-br from-cyan-500/10 via-indigo-500/10 to-emerald-500/10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1),transparent_70%)] pointer-events-none" />
          <h2 className="font-serif-display text-3xl md:text-5xl font-medium mb-4 relative z-10">
            Design Your Computational Pipeline
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto text-base relative z-10 leading-relaxed">
            Need customized pipeline deployment, single-cell analysis setups, or large-scale
            molecular queries? Reach out to our scientific software team.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 relative z-10">
            <Link
              to="/contact"
              className="px-6 py-3 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-90 transition shadow-lg"
            >
              Collaborate With Us
            </Link>
            <Link
              to="/services/drug-discovery"
              className="px-6 py-3 rounded-full border border-foreground/20 text-sm font-semibold hover:bg-foreground/5 transition"
            >
              Explore Drug Discovery
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
