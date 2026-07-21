import React from "react";

export function QcAbout() {
  return (
    <section
      id="about"
      className="relative py-28 px-6 bg-[#f8fafc] dark:bg-[#0f172a] transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">
        <p className="text-xs tracking-[0.3em] text-accent-blue">ABOUT QUANTUM CODON</p>
        <h2 className="font-bagel text-[clamp(1.75rem,4vw,3rem)] mt-3">
          Unlocking the Genome's Hidden Moat
        </h2>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-12 mt-12 items-center">
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              Quantum Codon was founded to explore the final frontier of biology: the non-coding and
              silent DNA regions that constitute 98% of our genome. Long dismissed as "junk DNA",
              these regions hold the instructions for creating stable, highly potent therapeutic
              candidates that do not exist in nature.
            </p>
            <p>
              Led by Prof. Pawan K Dhar, a pioneer with over 15 years of continuous dark genome
              research, we integrate advanced bioinformatics, state-of-the-art AI structural
              predictions (AlphaFold), and quantum mechanics to design and synthesize novel peptides
              and proteins.
            </p>
            <p className="text-sm border-l-2 border-accent-blue pl-4 italic">
              "We are building a parallel biology universe. By synthetically expressing genes that
              nature kept silent, we are creating a completely new class of medicines."
              <span className="block not-italic mt-2 text-xs font-semibold text-foreground">
                — Prof. Pawan K Dhar, CSO
              </span>
            </p>
          </div>
          <div className="glass-effect rounded-3xl p-8 dark:border-white/10 dark:bg-white/5 backdrop-blur">
            <h3 className="font-bagel text-xl mb-4">Our Anchors</h3>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-accent-blue/10 flex items-center justify-center shrink-0 text-accent-blue font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Academic Heritage</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Research initiated at Jawaharlal Nehru University (JNU), New Delhi, with proof
                    of concept validated across multiple peer-reviewed studies.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-accent-emerald/10 flex items-center justify-center shrink-0 text-accent-emerald font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Amaravati Quantum Valley</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Anchor corporate laboratory in Amaravati, designing advanced
                    quantum-computational simulations of molecular docking and folding dynamics.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
