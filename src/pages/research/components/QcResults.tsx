import React from "react";
import { Card } from "@/components/ui/card";

const results = [
  {
    year: "2009",
    cls: "Class I",
    author: "Dhar et al — JNU, New Delhi",
    area: "Proof of Concept",
    title: "World's First Dark Genome Expression",
    body: "Six E. coli intergenic sequences cloned and expressed. All six produced stable proteins, with Eka1 causing potent reversible growth inhibition.",
    stats: "6/6 expressed · Eka1 inhibition · 2 stable tertiary structures",
  },
  {
    year: "2013–15",
    cls: "Class I",
    author: "Joshi, Krishnan et al",
    area: "Anti-Malaria",
    title: "Plasmodium falciparum Invasion Blocked",
    body: "Synthetic peptides from S. cerevisiae intergenic sequences screened against P. falciparum invasion proteins. >60% inhibition of parasite entry.",
    stats: ">60% invasion inhibition · clinical strain validated",
  },
  {
    year: "2015–23",
    cls: "Class I",
    author: "Raj, Verma et al",
    area: "Alzheimer's",
    title: "BACE1 Inhibition: 86.7% at 1μM",
    body: "From 2,500 intergenic sequences and 424 novel peptides, ECOI2 achieved 86.7% BACE1 inhibition and reduced amyloid Aβ 1-40 and 1-42 in SH-SY5Y cells.",
    stats: "ECOI2 86.7% · Aβ reduction · non-toxic",
  },
  {
    year: "2023",
    cls: "Class II",
    author: "Dhar et al — Published",
    area: "Anti-Leishmania",
    title: "First Functional tRNA-Derived Peptide",
    body: "E. coli tRNAs computationally translated into tREPs. tREP-18 showed IC50 = 22.13 nM against L. donovani and remained safe for human macrophages.",
    stats: "IC50 = 22.13 nM · membrane disruption",
  },
  {
    year: "2024",
    cls: "Class II",
    author: "Shanthappa et al",
    area: "Vaccines",
    title: "tREP-Derived Antiviral Vaccine Epitopes",
    body: "tRNA-encoded peptides screened as vaccine epitopes. RRHIDIVV and IMVRFSAE showed favorable HLA binding and 200 ns MD stability.",
    stats: "2 validated epitopes · 200 ns MD stable",
  },
  {
    year: "2016–23",
    cls: "Class I",
    author: "Varughese, Garg et al",
    area: "Enzymes",
    title: "Antisense and Reverse Protein Landscape",
    body: "Full-length antisense and reverse proteins mapped across E. coli, S. cerevisiae, D. melanogaster — many predicted enzymatic, transporter, or secretory functions.",
    stats: "Thousands mapped · multi-organism",
  },
];

export function QcResults() {
  return (
    <section
      id="results"
      className="relative py-28 px-6 bg-slate-900 text-white transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">
        <p className="text-xs tracking-[0.3em] text-accent-emerald">PEER-REVIEWED VALIDATION</p>
        <h2 className="font-bagel text-[clamp(1.75rem,4vw,3rem)] mt-3 max-w-3xl">
          15+ years of peer-reviewed validation
        </h2>
        <p className="mt-6 text-slate-400 max-w-3xl">
          Our platform is built on continuous research from JNU and partner labs. From anti-malarial
          leads to anti-leishmanial candidates, Deep Codon translates computational theory into
          wet-lab outcomes.
        </p>

        <div className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-6">
          {results.map((r) => (
            <Card
              key={r.title}
              className="p-6 border border-white/10 bg-white/80 dark:bg-white/[0.03] backdrop-blur-md shadow-sm hover:shadow-md transition text-foreground dark:text-white"
            >
              <div className="flex justify-between text-xs text-muted-foreground">
                <span className="font-mono">{r.year}</span>
                <span className="px-2 py-0.5 rounded-full border border-black/10 dark:border-white/15 text-foreground/80 dark:text-white/80">
                  {r.cls}
                </span>
              </div>
              <div className="mt-3 text-xs text-accent-purple">{r.area}</div>
              <h3 className="font-bagel text-xl mt-2">{r.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{r.author}</p>
              <p className="mt-3 text-sm text-muted-foreground dark:text-slate-300">{r.body}</p>
              <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/10 text-xs font-mono text-accent-emerald">
                {r.stats}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
