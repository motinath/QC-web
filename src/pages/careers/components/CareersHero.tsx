import { ArrowRight } from "lucide-react";
import { useContactModal } from "@/components/shared/ContactModal";
import heroVideo from "../careerp.mp4";

export default function CareersHero() {
  const { open } = useContactModal();

  return (
    <section className="relative overflow-hidden">
      {/* faint geometric line backdrop */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07] dark:opacity-[0.12]"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="careers-grid" width="120" height="120" patternUnits="userSpaceOnUse">
            <path
              d="M0 60 L120 60 M60 0 L60 120 M0 0 L120 120 M120 0 L0 120"
              stroke="currentColor"
              strokeWidth="0.6"
              fill="none"
              className="text-accent-blue"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#careers-grid)" />
      </svg>

      <div className="relative max-w-7xl mx-auto px-6 py-[clamp(4rem,8vw,6rem)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] gap-12 items-center">
        {/* Copy */}
        <div className="order-2 lg:order-1">
          <p className="text-[11px] tracking-[0.32em] uppercase text-accent-blue font-semibold">
            Careers · Quantum Codon
          </p>
          <h1 className="font-bagel mt-5 leading-[1.05] text-[clamp(2.5rem,6vw,4.5rem)]">
            <span className="text-accent-blue/80 mr-2 align-top text-[clamp(1.75rem,3vw,2.5rem)]">
              “
            </span>
            Shape the Future.
            <br />
            <em className="italic">Engineer it with Quantum Codon.</em>
            <span className="text-accent-blue/80 ml-2 align-top text-[clamp(1.75rem,3vw,2.5rem)]">
              ”
            </span>
          </h1>
          <p className="mt-6 w-full max-w-xl text-[clamp(0.875rem,1.5vw,1.125rem)] text-muted-foreground leading-relaxed">
            We're recruiting pioneers across biology, quantum computation, and software engineering.
            If you're driven to decode the genome's untouched frontier — there's a bench, a
            terminal, and a team waiting for you here.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={open}
              className="group inline-flex items-center gap-2 rounded-full bg-accent-blue px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-blue/25 hover:opacity-90 transition"
            >
              Get in touch
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <a
              href="#open-positions"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition story-link"
            >
              See open roles
            </a>
          </div>
        </div>

        {/* Video */}
        <div className="order-1 lg:order-2">
          <div className="relative rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 shadow-[0_30px_80px_-30px_rgba(30,58,138,0.35)] bg-black/5 dark:bg-white/5">
            <video
              className="block w-full h-full object-cover aspect-[4/3]"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src={heroVideo} type="video/mp4" />
            </video>
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
