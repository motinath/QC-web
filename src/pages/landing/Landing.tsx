import { Link } from "@/lib/router-compat";

// Retained hero video import reference
import _heroVideo from "./hero.mp4";
import { QcLandingContent } from "./components/QcLandingContent";
import { ArrowRight } from "lucide-react";

export default function Landing() {
  return (
    <div className="flex flex-col w-full page-3d-transition">
      {/* Hero Section */}
      <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden section-base">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[480px] bg-gradient-to-tr from-accent-blue/10 via-accent-purple/10 to-accent-emerald/10 blur-3xl -z-10 rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex flex-col items-center space-y-6">
            {/* Main Headline */}
            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.08] text-foreground font-bold tracking-tight">
              The genome holds a secret{" "}
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-accent-purple via-accent-blue to-accent-emerald">
                98%
              </span>
              .<br />
              We are decoding it.
            </h1>

            {/* Subtitle / Description */}
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground font-normal leading-relaxed max-w-2xl mx-auto">
              A scientific platform unlocking non-expressing DNA and non-translating RNA to design
              first-in-class therapeutic molecules and transform computational bioeconomy.
            </p>

            {/* Call to Action Group */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/services/drug-discovery"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-foreground text-background font-semibold text-sm shadow-xl hover:opacity-90 transition-all duration-200 group"
              >
                <span>Explore Drug Discovery</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/research"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-card border border-border/80 text-foreground font-semibold text-sm hover:bg-secondary/60 transition-all duration-200 shadow-sm"
              >
                <span>Read Scientific Research</span>
              </Link>
            </div>

            {/* Metrics Band */}
            <div className="pt-8 border-t border-border/40 grid grid-cols-3 gap-8 max-w-xl mx-auto w-full">
              <div>
                <p className="text-2xl sm:text-3xl font-bold font-serif-display text-foreground">
                  98%
                </p>
                <p className="text-xs text-muted-foreground font-medium mt-0.5">
                  Untapped Dark Genome
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold font-serif-display text-foreground">
                  Single
                </p>
                <p className="text-xs text-muted-foreground font-medium mt-0.5">
                  Integrated Operating System
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold font-serif-display text-foreground">
                  1st
                </p>
                <p className="text-xs text-muted-foreground font-medium mt-0.5">
                  Quantum Valley Mover
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <QcLandingContent />
    </div>
  );
}
