import { useState, useMemo } from "react";
import PageShell from "../../_PageShell";
import {
  GraduationCap,
  Search,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  X,
  BookOpen,
  FileText,
  SlidersHorizontal,
} from "lucide-react";
import { Card } from "@/components/ui/card";

// --- Mock Data ---

interface EducationItem {
  id: string;
  type: "courses" | "resources";
  categoryType: string; // e.g. "Certification", "Whitepaper"
  topic: string; // e.g. "Bioinformatics"
  product: string; // e.g. "Deep Codon SDK"
  title: string;
  description: string;
  durationOrDate: string;
  tags: string[];
  gradient: string; // Background gradient class for the card thumbnail placeholder
  thumbnail?: string;
}

const mockEducationItems: EducationItem[] = [
  // --- Courses ---
  {
    id: "course-1",
    type: "courses",
    categoryType: "Certification",
    topic: "Bioinformatics",
    product: "Deep Codon Platform",
    title: "Introduction to Non-Coding Genome Analysis",
    description:
      "Learn the fundamentals of identifying and annotating non-expressing DNA sequences using state-of-the-art computational pipelines.",
    durationOrDate: "6 Weeks · Self-Paced",
    tags: ["Certification", "Bioinformatics"],
    gradient: "from-emerald-600/40 via-cyan-600/30 to-blue-600/40",
    thumbnail: "/courses/course_genome_analysis.png",
  },
  {
    id: "course-2",
    type: "courses",
    categoryType: "Workshop",
    topic: "Quantum Computing",
    product: "Quantum Simulator",
    title: "Quantum Molecular Dynamics in Drug Discovery",
    description:
      "Bespoke practical training in molecular docking simulation and electrostatic energy modeling on virtual quantum architectures.",
    durationOrDate: "3 Days · Hands-On",
    tags: ["Workshop", "Quantum Computing"],
    gradient: "from-purple-600/40 via-indigo-600/30 to-blue-600/40",
    thumbnail: "/courses/course_quantum_molecular.png",
  },
  {
    id: "course-3",
    type: "courses",
    categoryType: "Degree Course",
    topic: "Molecular Genetics",
    product: "tREP Toolkit",
    title: "Synthetic Translation Frameworks for tRNA Peptides",
    description:
      "An advanced curriculum exploring in silico translation, candidate cloning, expression loops, and synthetic assay validation.",
    durationOrDate: "1 Semester · Academic",
    tags: ["Degree Course", "Genetics"],
    gradient: "from-rose-600/40 via-purple-600/30 to-indigo-600/40",
    thumbnail: "/courses/course_trna_peptides.png",
  },
  {
    id: "course-4",
    type: "courses",
    categoryType: "Certification",
    topic: "Machine Learning",
    product: "Deep Codon Platform",
    title: "AlphaFold & AI-Driven Structural Biology",
    description:
      "Master structure prediction for novel synthetic proteins. Analyze model metrics, solubility scoring, and ADMET profiles.",
    durationOrDate: "8 Weeks · Advanced",
    tags: ["Certification", "AI / ML"],
    gradient: "from-cyan-600/40 via-teal-600/30 to-emerald-600/40",
    thumbnail: "/courses/course_alphafold_ai.png",
  },
  {
    id: "course-5",
    type: "courses",
    categoryType: "Workshop",
    topic: "Bioinformatics",
    product: "API SDK",
    title: "Integrating the Deep Codon API in R&D Pipelines",
    description:
      "A developer-focused workshop on running automated sequence annotations and candidate scoring libraries via standard SDK packages.",
    durationOrDate: "1 Day · Technical",
    tags: ["Workshop", "API Dev"],
    gradient: "from-amber-600/40 via-orange-600/30 to-rose-600/40",
    thumbnail: "/courses/course_api_integration.png",
  },

  // --- Resources ---
  {
    id: "resource-1",
    type: "resources",
    categoryType: "Whitepaper",
    topic: "Bioinformatics",
    product: "Deep Codon Platform",
    title: "Mapping the Untapped 98% Dark Genome",
    description:
      "A technical whitepaper explaining the classification of Class I and Class II silent sequences and the AI models backing our discovery platform.",
    durationOrDate: "Published: June 2026",
    tags: ["Whitepaper", "Dark Genome"],
    gradient: "from-teal-600/40 via-cyan-600/30 to-indigo-600/40",
    thumbnail: "/blog-dark-matter.jpg",
  },
  {
    id: "resource-2",
    type: "resources",
    categoryType: "Research Paper",
    topic: "Molecular Genetics",
    product: "tREP Toolkit",
    title: "Anti-Leishmanial Activity of Synthetic tRNA Peptides",
    description:
      "Reviewing the membrane disruption and binding coordinates of tREP-18 against Leishmania donovani at low nM IC50 thresholds.",
    durationOrDate: "Published: May 2025",
    tags: ["Research", "tREP-18"],
    gradient: "from-pink-600/40 via-purple-600/30 to-indigo-600/40",
    thumbnail: "/blog-precision-therapeutics.png",
  },
  {
    id: "resource-3",
    type: "resources",
    categoryType: "Tutorial Video",
    topic: "Quantum Computing",
    product: "Quantum Simulator",
    title: "Simulating Electron Distribution on Quantum Hardware",
    description:
      "Walkthrough of variational quantum eigensolver scripts for chemical structure optimization and reaction energy modelling.",
    durationOrDate: "Duration: 45 Mins",
    tags: ["Video", "Quantum Simulation"],
    gradient: "from-indigo-600/40 via-violet-600/30 to-fuchsia-600/40",
    thumbnail: "/blog-quantum-simulations.png",
  },
  {
    id: "resource-4",
    type: "resources",
    categoryType: "Case Study",
    topic: "Molecular Genetics",
    product: "Deep Codon Platform",
    title: "Targeting BACE1: EcoI2 in Alzheimer's Research",
    description:
      "Examining the screening, MD validation, and 86% in vitro validation curves of novel intergenic peptides in neurodegeneration models.",
    durationOrDate: "Published: March 2026",
    tags: ["Case Study", "BACE1"],
    gradient: "from-blue-600/40 via-emerald-600/30 to-teal-600/40",
    thumbnail: "/blog-life-sciences.jpg",
  },
];

export default function EducationPage() {
  const [activeTab, setActiveTab] = useState<"courses" | "resources">("courses");
  const [searchQuery, setSearchQuery] = useState("");

  // Collapsible dropdown states
  const [isTypeOpen, setIsTypeOpen] = useState(true);
  const [isTopicOpen, setIsTopicOpen] = useState(true);
  const [isProductOpen, setIsProductOpen] = useState(true);

  // Selected filter states
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  // Dynamically populated filter option placeholders based on loaded mock items
  const filterOptions = useMemo(() => {
    const items = mockEducationItems.filter((item) => item.type === activeTab);
    return {
      types: Array.from(new Set(items.map((i) => i.categoryType))),
      topics: Array.from(new Set(items.map((i) => i.topic))),
      products: Array.from(new Set(items.map((i) => i.product))),
    };
  }, [activeTab]);

  // Reset category filters when switching tabs
  const handleTabChange = (tab: "courses" | "resources") => {
    setActiveTab(tab);
    setSelectedTypes([]);
    setSelectedTopics([]);
    setSelectedProducts([]);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedTypes([]);
    setSelectedTopics([]);
    setSelectedProducts([]);
  };

  const handleToggleFilter = (value: string, type: "type" | "topic" | "product") => {
    const updateList = (prev: string[]) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value];

    if (type === "type") setSelectedTypes(updateList);
    if (type === "topic") setSelectedTopics(updateList);
    if (type === "product") setSelectedProducts(updateList);
  };

  // Filter content based on active selections
  const filteredItems = useMemo(() => {
    return mockEducationItems.filter((item) => {
      // Must match the active tab (Courses vs Resources)
      if (item.type !== activeTab) return false;

      // Keyword search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const titleMatch = item.title.toLowerCase().includes(query);
        const descMatch = item.description.toLowerCase().includes(query);
        const tagMatch = item.tags.some((t) => t.toLowerCase().includes(query));
        if (!titleMatch && !descMatch && !tagMatch) return false;
      }

      // Check category filters
      if (selectedTypes.length > 0 && !selectedTypes.includes(item.categoryType)) return false;
      if (selectedTopics.length > 0 && !selectedTopics.includes(item.topic)) return false;
      if (selectedProducts.length > 0 && !selectedProducts.includes(item.product)) return false;

      return true;
    });
  }, [activeTab, searchQuery, selectedTypes, selectedTopics, selectedProducts]);

  return (
    <PageShell spotlight="from-accent-purple/15 via-amber-500/5 to-transparent">
      {/* 1. Dark Hero Section */}
      <section className="max-w-6xl mx-auto px-6 mb-12">
        <div className="rounded-3xl border border-accent-purple/20 bg-accent-purple/[0.03] dark:bg-accent-purple/[0.05] p-10 md:p-14 backdrop-blur-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-purple/10 text-accent-purple">
              <GraduationCap className="h-6 w-6" />
            </div>
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-accent-purple font-semibold">
              Offering — Education
            </span>
          </div>
          <h1 className="font-serif-display text-4xl md:text-6xl leading-tight text-foreground font-medium">
            Training the next generation of dark genome scientists
          </h1>
          <p className="mt-5 text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            University programs, certifications, and corporate workshops that bring computational
            biology and quantum-molecular science to learners worldwide.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="max-w-6xl mx-auto px-6 mt-16">
        {/* Section Header & Toggle Pill */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-8 mb-10">
          <div>
            <h2 className="font-serif-display text-4xl md:text-5xl font-bold text-foreground">
              Education
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Browse professional curriculums, publications, and study aids.
            </p>
          </div>

          {/* Toggle pill selector */}
          <div className="bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-1.5 rounded-full inline-flex self-start md:self-center shadow-inner">
            <button
              onClick={() => handleTabChange("courses")}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                activeTab === "courses"
                  ? "bg-foreground text-background shadow-md"
                  : "text-slate-600 dark:text-slate-400 hover:text-foreground"
              }`}
            >
              Courses
            </button>
            <button
              onClick={() => handleTabChange("resources")}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                activeTab === "resources"
                  ? "bg-foreground text-background shadow-md"
                  : "text-slate-600 dark:text-slate-400 hover:text-foreground"
              }`}
            >
              Resources
            </button>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Filter Sidebar */}
          <aside className="lg:col-span-3 space-y-6 bg-slate-50/50 dark:bg-slate-900/[0.15] border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-serif-display font-semibold text-lg text-foreground">
                <SlidersHorizontal className="w-4 h-4 text-slate-400" />
                Filter
              </div>
              {(searchQuery ||
                selectedTypes.length > 0 ||
                selectedTopics.length > 0 ||
                selectedProducts.length > 0) && (
                <button
                  onClick={handleClearFilters}
                  className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:opacity-85 flex items-center gap-1 transition"
                >
                  <X className="w-3.5 h-3.5" />
                  Clear Filters
                </button>
              )}
            </div>

            {/* Keyword Search */}
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Keyword search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-sm bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-foreground placeholder-slate-400 focus:outline-none focus:border-slate-400 dark:focus:border-slate-600 transition"
                />
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-3 text-slate-400 hover:text-foreground"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Collapsible Dropdown: Type */}
            <div className="border-t border-slate-200/80 dark:border-slate-850 pt-4">
              <button
                onClick={() => setIsTypeOpen(!isTypeOpen)}
                className="w-full flex items-center justify-between text-xs font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase hover:text-foreground transition py-1"
              >
                <span>Type</span>
                {isTypeOpen ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>
              {isTypeOpen && (
                <div className="mt-3 space-y-2.5 max-h-48 overflow-y-auto pr-1 animate-in fade-in slide-in-from-top-2 duration-200">
                  {filterOptions.types.map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300 cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => handleToggleFilter(type, "type")}
                        className="rounded border-slate-300 text-emerald-600 dark:bg-slate-950/60 dark:border-slate-800 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Collapsible Dropdown: Topic */}
            <div className="border-t border-slate-200/80 dark:border-slate-850 pt-4">
              <button
                onClick={() => setIsTopicOpen(!isTopicOpen)}
                className="w-full flex items-center justify-between text-xs font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase hover:text-foreground transition py-1"
              >
                <span>Topic</span>
                {isTopicOpen ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>
              {isTopicOpen && (
                <div className="mt-3 space-y-2.5 max-h-48 overflow-y-auto pr-1 animate-in fade-in slide-in-from-top-2 duration-200">
                  {filterOptions.topics.map((topic) => (
                    <label
                      key={topic}
                      className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300 cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTopics.includes(topic)}
                        onChange={() => handleToggleFilter(topic, "topic")}
                        className="rounded border-slate-300 text-emerald-600 dark:bg-slate-950/60 dark:border-slate-800 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                      />
                      <span>{topic}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Collapsible Dropdown: Product */}
            <div className="border-t border-slate-200/80 dark:border-slate-850 pt-4">
              <button
                onClick={() => setIsProductOpen(!isProductOpen)}
                className="w-full flex items-center justify-between text-xs font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase hover:text-foreground transition py-1"
              >
                <span>Product</span>
                {isProductOpen ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>
              {isProductOpen && (
                <div className="mt-3 space-y-2.5 max-h-48 overflow-y-auto pr-1 animate-in fade-in slide-in-from-top-2 duration-200">
                  {filterOptions.products.map((product) => (
                    <label
                      key={product}
                      className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300 cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product)}
                        onChange={() => handleToggleFilter(product, "product")}
                        className="rounded border-slate-300 text-emerald-600 dark:bg-slate-950/60 dark:border-slate-800 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                      />
                      <span>{product}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </aside>

          {/* Right Column: Grid Content */}
          <main className="lg:col-span-9 space-y-6">
            {/* Content header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-900 pb-4">
              <div className="font-serif-display font-semibold text-xl text-foreground capitalize">
                {activeTab}
                <span className="text-sm font-sans font-normal text-slate-400 ml-2">
                  ({filteredItems.length} {filteredItems.length === 1 ? "item" : "items"} found)
                </span>
              </div>
              <button
                onClick={handleClearFilters}
                className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition"
              >
                View All
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Empty State */}
            {filteredItems.length === 0 && (
              <div className="text-center py-20 bg-slate-50/50 dark:bg-slate-900/10 border border-dotted border-slate-200 dark:border-slate-800 rounded-3xl">
                <SlidersHorizontal className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                <h3 className="font-semibold text-base text-foreground">No matches found</h3>
                <p className="text-sm text-slate-400 mt-1 max-w-xs mx-auto">
                  Try refining your keyword search or resetting category filters.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="mt-5 px-5 py-2 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/60 text-xs font-semibold transition"
                >
                  Reset Filters
                </button>
              </div>
            )}

            {/* Content Cards Grid */}
            {filteredItems.length > 0 && (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <Card
                    key={item.id}
                    className="group border border-slate-200/80 dark:border-slate-900 bg-white dark:bg-slate-950/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-850 hover:-translate-y-0.5 transition-all duration-300 flex flex-col h-full"
                  >
                    {/* Thumbnail Container */}
                    <div className="relative aspect-video w-full overflow-hidden border-b border-slate-100 dark:border-slate-900/80 bg-slate-950">
                      {item.thumbnail ? (
                        <>
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                        </>
                      ) : (
                        <>
                          <div
                            className={`absolute inset-0 bg-gradient-to-tr ${item.gradient} opacity-85 transition-transform duration-700 group-hover:scale-105`}
                          />
                          <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.4)_1px,transparent_1px)] bg-[size:16px_16px]" />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 group-hover:opacity-55 transition-opacity">
                            {item.type === "courses" ? (
                              <BookOpen className="w-10 h-10 text-white" />
                            ) : (
                              <FileText className="w-10 h-10 text-white" />
                            )}
                          </div>
                        </>
                      )}

                      {/* Overlaid Badges */}
                      <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5">
                        <span className="text-xs tracking-wide font-bold uppercase rounded-md px-2.5 py-1 bg-slate-900/90 text-white backdrop-blur shadow-sm">
                          {item.categoryType}
                        </span>
                        <span className="text-xs tracking-wide font-bold uppercase rounded-md px-2.5 py-1 bg-[#10b981]/90 text-white backdrop-blur shadow-sm">
                          {item.topic}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Duration or Date */}
                        <div className="text-xs font-bold text-[#10b981] tracking-wider uppercase mb-2">
                          {item.durationOrDate}
                        </div>

                        {/* Title (constrained line clamp) */}
                        <h3 className="font-serif-display font-bold text-lg text-slate-800 dark:text-slate-100 leading-snug line-clamp-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {item.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed line-clamp-3">
                          {item.description}
                        </p>
                      </div>

                      {/* Footer Link */}
                      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-900 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-foreground">
                        <span className="group-hover:underline">Explore Details</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </main>
        </div>
      </section>
    </PageShell>
  );
}
