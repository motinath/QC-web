import React from "react";
import { Card } from "@/components/ui/card";

const steps = [
  [
    "01",
    "Dark Genome Mapping",
    "Identify Class I and Class II sequences across model organisms; cross-reference NCBI GEO and NR databases.",
  ],
  [
    "02",
    "AI Prediction",
    "Translate in silico, predict tertiary structure, screen toxicity, and rank stability, solubility, charge, and immunogenicity.",
  ],
  [
    "03",
    "Virtual Screening",
    "Dock dark-genome candidates against kinases, GPCRs, enzymes, viral proteins, and other target classes.",
  ],
  [
    "04",
    "Quantum Simulation",
    "Molecular dynamics + quantum modules for binding, folding, electron distribution, and reaction-energy modeling.",
  ],
  [
    "05",
    "Experimental Validation",
    "Synthesize or express top candidates and validate via cell assays, Western blot, flow cytometry, and preclinical models.",
  ],
];

export function QcPipeline() {
  return (
    <section
      id="pipeline"
      className="relative py-28 px-6 bg-[#edf2f7] dark:bg-[#0a1118] transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">
        <p className="text-xs tracking-[0.3em] text-accent-emerald">
          THE DEEP CODON TECHNOLOGY PLATFORM
        </p>
        <h2 className="font-bagel text-4xl md:text-5xl mt-3 max-w-3xl">
          From dark genome to validated drug candidate
        </h2>
        <p className="mt-6 text-muted-foreground max-w-3xl">
          An integrated pipeline converting silent genomic sequences into therapeutic candidates
          through bioinformatics, AI, molecular simulation, and experimental validation.
        </p>

        <ol className="mt-14 grid md:grid-cols-5 gap-4 relative">
          {steps.map(([n, t, d]) => (
            <li
              key={n}
              className="relative p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] backdrop-blur-md shadow-sm"
            >
              <div className="font-bagel text-3xl bg-gradient-to-br from-accent-blue to-accent-purple bg-clip-text text-transparent">
                {n}
              </div>
              <h3 className="font-bagel text-lg mt-2">{t}</h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{d}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Card className="p-8 border border-black/10 dark:border-white/10 bg-gradient-to-br from-accent-blue/10 to-transparent shadow-sm">
            <p className="text-xs tracking-[0.3em] text-accent-blue">ARTIFICIAL INTELLIGENCE</p>
            <h3 className="font-bagel text-2xl mt-2">Making the Invisible Visible at Scale</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground list-disc pl-5">
              <li>AlphaFold-based tertiary structure prediction</li>
              <li>Multi-omics integration across genetic, immune, and metabolic data</li>
              <li>ADMET and toxicity screening at genome scale</li>
              <li>Automated candidate prioritization by druggability</li>
            </ul>
          </Card>
          <Card className="p-8 border border-black/10 dark:border-white/10 bg-gradient-to-br from-accent-purple/10 to-transparent shadow-sm">
            <p className="text-xs tracking-[0.3em] text-accent-purple">QUANTUM COMPUTING</p>
            <h3 className="font-bagel text-2xl mt-2">
              Simulating Molecular Reality with Precision
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground list-disc pl-5">
              <li>Quantum-level electron distribution modeling</li>
              <li>Variational Quantum Eigensolver for electronic structure</li>
              <li>Quantum pattern recognition in high-dimensional data</li>
              <li>Molecular dynamics refined by quantum accuracy</li>
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
}
