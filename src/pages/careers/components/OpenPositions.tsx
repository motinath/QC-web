import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useContactModal } from "@/components/shared/ContactModal";

type Job = {
  title: string;
  dept: string;
  track: "Research" | "Engineering" | "Operations";
  type: string;
};

const JOBS: Job[] = [
  // intentionally empty to mirror the "No openings" empty state.
  // Example structure when listings open:
  // { title: "Computational Biologist", dept: "Bio-computational R&D", track: "Research", type: "Full-Time · Amaravati" },
];

const TABS = ["All", "Research", "Engineering", "Operations"] as const;

export default function OpenPositions() {
  const { open } = useContactModal();
  const [active, setActive] = useState<(typeof TABS)[number]>("All");

  const filtered = useMemo(
    () => (active === "All" ? JOBS : JOBS.filter((j) => j.track === active)),
    [active],
  );

  return (
    <section id="open-positions" className="relative py-20 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center">
          <h2 className="font-bagel text-4xl md:text-5xl">Open Positions</h2>
        </div>

        {/* Tabs */}
        <div className="mt-10 border-b border-border">
          <div className="flex items-center justify-center gap-8 md:gap-14 -mb-px">
            {TABS.map((tab) => {
              const isActive = active === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActive(tab)}
                  className={`relative pb-3 text-xs md:text-sm font-mono-data uppercase tracking-wider transition focus-visible:ring-2 focus-visible:ring-accent-blue rounded-sm ${
                    isActive
                      ? "text-accent-blue font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                  <span
                    className={`absolute left-0 right-0 -bottom-px h-[2px] rounded-full transition-all ${
                      isActive ? "bg-accent-blue scale-x-100" : "bg-transparent scale-x-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Jobs / empty state */}
        <div className="mt-14 min-h-[180px]">
          {filtered.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground">
              No openings in this track right now — but we're always reading inbound notes.
            </p>
          ) : (
            <div className="space-y-3">
              {filtered.map((j) => (
                <div
                  key={j.title}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-2xl border border-border bg-card/70 p-6 backdrop-blur hover:bg-card transition"
                >
                  <div>
                    <p className="text-[10px] tracking-[0.24em] uppercase text-accent-purple font-semibold">
                      {j.dept}
                    </p>
                    <h3 className="font-bagel text-xl mt-1">{j.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{j.type}</p>
                  </div>
                  <a
                    href="mailto:contact@qcodon.com"
                    className="self-start md:self-auto inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2 text-xs font-semibold text-background hover:opacity-90 transition"
                  >
                    Apply Now <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA card */}
        <div className="mt-20">
          <div className="rounded-3xl border border-border bg-card shadow-[0_20px_60px_-25px_rgba(0,0,0,0.25)] px-6 py-12 md:px-12 md:py-14 text-center">
            <h3 className="font-bagel text-3xl md:text-4xl">Ready to Build What's Next?</h3>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              We're always reading notes from driven, curious minds. Tell us what you'd build if the
              dark genome was your canvas.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
              <a
                href="mailto:contact@qcodon.com"
                className="text-accent-blue font-medium hover:underline"
              >
                ✉ contact@qcodon.com
              </a>
              <span className="text-muted-foreground hidden sm:inline">|</span>
              <a
                href="https://www.qcodon.com/careers"
                className="text-accent-blue font-medium hover:underline"
              >
                ◍ qcodon.com/careers
              </a>
            </div>
            <button
              type="button"
              onClick={open}
              className="group mt-7 inline-flex items-center gap-2 rounded-full bg-accent-blue px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-blue/25 hover:opacity-90 transition"
            >
              Let's talk
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
