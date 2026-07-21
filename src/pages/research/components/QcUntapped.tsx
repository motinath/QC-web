import React from "react";
import dnaVideo from "../dna.mp4";

export function QcUntapped() {
  return (
    <section
      id="platform"
      className="relative py-28 px-6 bg-[#f0f4f8] dark:bg-[#0c131f] transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left column: Text & progress bars */}
        <div className="lg:col-span-7">
          <p className="text-xs tracking-[0.3em] text-accent-emerald">UNTAPPED BIOLOGICAL SPACE</p>
          <h2 className="font-bagel text-[clamp(1.75rem,4vw,3rem)] mt-3">
            The Untapped Scale of the Dark Genome
          </h2>
          <p className="mt-6 text-muted-foreground text-sm leading-relaxed">
            Every genome — bacterial, yeast, fly, worm, human — contains an overwhelming majority of
            sequences that have never been expressed as proteins. These are not gaps or errors. They
            are the unexplored majority of life's coding potential.
          </p>

          <div className="mt-10 space-y-4">
            {[
              { label: "Protein-coding DNA", pct: 2, color: "from-cyan-400 to-accent-blue" },
              {
                label: "Class I — Non-expressing DNA",
                pct: 40,
                color: "from-yellow-500 to-orange-500",
              },
              {
                label: "Class II — Non-translating RNA",
                pct: 56,
                color: "from-accent-purple to-pink-500",
              },
            ].map((b) => (
              <div key={b.label}>
                <div className="flex justify-between text-xs mb-1.5 font-medium">
                  <span>{b.label}</span>
                  <span className="font-mono text-muted-foreground">{b.pct}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${b.color}`}
                    style={{ width: `${b.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-muted-foreground font-medium leading-relaxed">
            Approximate proportions vary by organism and annotation methodology. Class I + Class II
            form Deep Codon's therapeutic reservoir.
          </p>
        </div>

        {/* Right column: 3D Visualization Card */}
        <div className="lg:col-span-5 flex justify-center w-full">
          <div className="relative w-full max-w-sm rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 bg-white/40 dark:bg-black/20 p-4 shadow-xl backdrop-blur-md">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-emerald/10 via-transparent to-accent-blue/10 opacity-40 pointer-events-none" />
            <div className="w-full h-64 rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 relative bg-[#091b2c]">
              <video
                className="w-full h-full object-cover rounded-2xl"
                src={dnaVideo}
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
            <div className="mt-4 text-center">
              <span className="text-xs tracking-[0.25em] uppercase font-mono text-accent-emerald font-bold">
                98% Dark Genome Reservoir
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
