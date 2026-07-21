import React from "react";
import { Card } from "@/components/ui/card";

const classes = [
  {
    badge: "I",
    tag: "Class I",
    image: "/dna-structure.png",
    color: "from-yellow-500/20 to-orange-500/10 border-yellow-500/30",
    title: "Non-Expressing DNA Sequences",
    intro:
      "DNA regions that are present in every cell but are never transcribed into RNA under natural conditions. Deep Codon's synthetic expression platform unlocks this vast, untouched coding reservoir for the first time.",
    items: [
      [
        "Intergenic regions",
        "Sequences between annotated genes. 6/6 randomly selected E. coli intergenic sequences produced stable, functional proteins.",
      ],
      [
        "Antisense sequences",
        "Complementary strands to coding sequences. Full-length antisense proteins predicted across E. coli, S. cerevisiae, and D. melanogaster.",
      ],
      [
        "Reverse ORFs",
        "Existing coding sequences read in the reverse (-1) frame — a parallel protein universe derived from every annotated gene.",
      ],
      [
        "Repetitive elements",
        "Telomeric repeats, microsatellites, LINE/SINE-derived sequences — an underexplored test bed for novel scaffold motifs.",
      ],
      [
        "Pseudogenes",
        "Once-active genes silenced by mutation. Synthetic reconstruction shows many fold into stable, functional proteins.",
      ],
    ],
    pipeline:
      "Bioinformatics → Synthetic cloning → Expression (E. coli / HEK293 / cell-free) → AlphaFold → Functional assays → Lead optimisation",
  },
  {
    badge: "II",
    tag: "Class II",
    image: "/rna-structure.png",
    color: "from-accent-purple/20 to-pink-500/10 border-accent-purple/30",
    title: "Non-Translating RNA Sequences",
    intro:
      "RNA molecules produced by the cell but never translated into protein. Synthetic translation of these sequences produces biologically active peptides with remarkable therapeutic properties.",
    items: [
      [
        "Introns",
        "Spliced out during mRNA processing — yet translate into stable, bioactive peptides and proteins.",
      ],
      [
        "tREPs (tRNA-derived peptides)",
        "tREP-18, derived from E. coli tRNA, showed anti-leishmanial activity at IC50 = 22.13 nM while safe for human cells.",
      ],
      [
        "Ribosomal RNA",
        "The scaffold of the ribosome itself — never translated in evolution, a unique template for novel functional peptides.",
      ],
      [
        "MicroRNA",
        "Only ~22 nucleotides, but with remarkable precision when synthetically translated.",
      ],
      [
        "Long non-coding RNA",
        "Hundreds to thousands of bases — enormous, uncharted protein-coding reservoir.",
      ],
    ],
    pipeline:
      "tRNA / rRNA / intron ID → Computational translation → Stability prediction → Chemical synthesis → Bioassay → tREP library",
  },
];

export function QcClasses() {
  return (
    <section
      id="classes"
      className="relative py-28 px-6 bg-[#f5f3ff] dark:bg-[#120e24] transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">
        <p className="text-xs tracking-[0.3em] text-accent-purple">THE DEEP CODON CLASSIFICATION</p>
        <h2 className="font-bagel text-4xl md:text-5xl mt-3 max-w-3xl">
          Two classes of dark genomic matter. One drug discovery canvas.
        </h2>

        <div className="mt-14 grid lg:grid-cols-2 gap-8">
          {classes.map((c) => (
            <Card
              key={c.tag}
              className={`relative p-8 border bg-gradient-to-br ${c.color} backdrop-blur-xl flex flex-col md:flex-row gap-6 items-start`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center font-bagel text-2xl">
                    {c.badge}
                  </div>
                  <div className="text-xs tracking-[0.3em] text-muted-foreground">
                    {c.tag.toUpperCase()}
                  </div>
                </div>
                <h3 className="font-bagel text-2xl mb-3">{c.title}</h3>
                <p className="text-sm text-muted-foreground mb-6">{c.intro}</p>
                <ul className="space-y-3 text-sm">
                  {c.items.map(([k, v]) => (
                    <li key={k} className="border-l-2 border-black/10 dark:border-white/10 pl-3">
                      <span className="font-semibold">{k}</span>
                      {" — "}
                      <span className="text-muted-foreground">{v}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 text-xs font-mono text-muted-foreground border-t border-white/10 pt-4">
                  {c.pipeline}
                </div>
              </div>
              {c.image && (
                <div className="w-full md:w-32 shrink-0 rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 bg-white/20 dark:bg-black/20 p-2 shadow-md self-center md:self-start">
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-32 md:h-24 object-cover rounded-xl border border-black/5 dark:border-white/5"
                  />
                </div>
              )}
            </Card>
          ))}
        </div>

        <Card className="mt-10 p-8 border border-white/10 bg-gradient-to-r from-accent-blue/10 via-accent-purple/10 to-accent-emerald/10">
          <h3 className="font-bagel text-2xl">Class I + Class II → First-in-Class Pathways</h3>
          <p className="mt-3 text-muted-foreground">
            By combining Class I proteins and Class II peptides — using domain prediction and
            molecular docking — Deep Codon designs entirely novel cellular pathways: regulatory,
            signalling, or metabolic. These pathways do not exist in nature.
          </p>
        </Card>
      </div>
    </section>
  );
}
