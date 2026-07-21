import React from "react";
import { Link } from "@/lib/router-compat";

const cases = [
  {
    tag: "Infectious Disease",
    title: "tREP-18: a first-in-class anti-leishmanial peptide",
    summary:
      "How a non-translating RNA-derived peptide achieved 22nM IC50 against Leishmania, validated in vitro and in vivo.",
    metric: "22nM IC50",
  },
  {
    tag: "Oncology",
    title: "Tumor-selective Class I peptides for solid tumors",
    summary:
      "A partnership engagement designing dark-DNA-derived peptides with differential cytotoxicity across cancer lines.",
    metric: "6 lead candidates",
  },
  {
    tag: "Industrial Biotech",
    title: "Engineered biocatalysts for specialty chemistry",
    summary:
      "Co-developed enzymes from synthetic translation frames cut process steps and improved yield for a chemicals partner.",
    metric: "34% yield uplift",
  },
];

export default function CaseStudies() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#f0f4f8] dark:bg-[#0c131f] transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 mb-8">
        <Link
          to="/"
          className="text-xs tracking-[0.25em] uppercase text-muted-foreground hover:text-foreground transition"
        >
          ← Back to home
        </Link>
      </div>

      <section className="max-w-5xl mx-auto px-6">
        <p className="text-xs tracking-[0.3em] text-accent-purple uppercase">
          Insights · Case Studies
        </p>
        <h1 className="font-serif-display text-[clamp(2rem,5vw,3.75rem)] mt-3 leading-tight">
          Discover how we make a difference
        </h1>
        <p className="mt-5 text-lg text-muted-foreground max-w-3xl">
          Selected engagements that show how the Deep Codon platform translates dark genome science
          into measurable outcomes for partners.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 mt-14 space-y-5">
        {cases.map((c) => (
          <article
            key={c.title}
            className="p-7 rounded-2xl border border-foreground/10 bg-white/60 dark:bg-white/5 backdrop-blur grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6 items-start sci-panel"
          >
            <div>
              <p className="text-[10px] font-mono-data tracking-[0.3em] text-accent-emerald uppercase">
                {c.tag}
              </p>
              <h2 className="mt-2 font-serif-display text-2xl leading-snug">{c.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-2xl">
                {c.summary}
              </p>
            </div>
            <div className="md:text-right">
              <div className="font-mono-data font-bold text-2xl md:text-3xl bg-gradient-to-r from-accent-blue to-accent-emerald bg-clip-text text-transparent">
                {c.metric}
              </div>
              <p className="text-xs font-mono-data uppercase tracking-wider text-muted-foreground mt-1">
                Key Outcome
              </p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
