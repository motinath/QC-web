import React from "react";
import { Card } from "@/components/ui/card";

export function QcPaper() {
  return (
    <section
      id="paper"
      className="relative py-28 px-6 bg-[#fdf6e2] dark:bg-[#15120a] transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto">
        <p className="text-xs tracking-[0.3em] text-accent-purple">LANDMARK PUBLICATION — 2025</p>
        <h2 className="font-bagel text-4xl md:text-5xl mt-3">The Scientific Foundation</h2>
        <p className="mt-6 text-muted-foreground max-w-3xl">
          The Deep Codon platform is anchored in 15+ years of published research, culminating in a
          2025 preprint proposing an integrated AI + quantum framework for dark genome drug
          discovery.
        </p>

        <Card className="mt-10 p-8 border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] backdrop-blur-md shadow-sm">
          <div className="text-xs text-muted-foreground">
            Preprint · Posted 19 May 2025 · Preprints.org · Biology and Biotechnology
          </div>
          <h3 className="font-bagel text-2xl md:text-3xl mt-3">
            Recoding Genomic Elements with AI and Quantum Computation to Build the Next Generation
            Drug Discovery Platform
          </h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Kadalmani Krishnan · Anita Chugh · Vidya Niranjan ·{" "}
            <strong className="text-foreground">Pawan Kumar Dhar*</strong>
          </p>
          <p className="mt-2 text-xs font-mono text-muted-foreground">
            DOI: 10.20944/preprints202505.1422.v1
          </p>
          <blockquote className="mt-5 border-l-2 border-accent-purple pl-4 italic text-muted-foreground">
            "We propose a next-generation, first-in-class drug discovery platform that harnesses the
            vast, untapped genomic landscape through the integration of Artificial Intelligence and
            Quantum Computing."
          </blockquote>
          <div className="mt-5 flex flex-wrap gap-2 text-xs">
            {[
              "dark genome",
              "synthetic biology",
              "drug discovery",
              "AI",
              "quantum computing",
              "tRNA-derived peptides",
            ].map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full border border-white/15 text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://www.preprints.org/manuscript/202505.1422"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple text-white text-sm"
            >
              Read Full Paper →
            </a>
            <a
              href="https://www.preprints.org/frontend/manuscript/a1670eb948afd0978f09cf16d10f08c9/download_pub"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-full glass-effect dark:border-white/15 text-sm"
            >
              Download PDF
            </a>
          </div>
        </Card>

        <p className="mt-8 text-sm text-muted-foreground">
          <strong className="text-foreground">Also see:</strong> Dhar et al 2009, Joshi et al 2013,
          Raj et al 2015, Verma et al 2023, Garg & Dhar 2023a,b, Nayak & Dhar 2023, Shanthappa et al
          2024.
        </p>
      </div>
    </section>
  );
}
