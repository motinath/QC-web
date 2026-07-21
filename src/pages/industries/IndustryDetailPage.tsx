import React from "react";
import { Link } from "@/lib/router-compat";
import { getIndustry, industries } from "@/lib/industries-data";

export default function IndustryDetailPage({ slug }: { slug: string }) {
  const i = getIndustry(slug);
  if (!i) return null; // Safe fallback, though loader should already check this
  const Icon = i.icon;

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
        <div
          className={`premium-glow-container rounded-3xl border p-10 md:p-14 ${i.color} backdrop-blur`}
        >
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-blue/10 text-accent-blue">
                  <Icon className="h-6 w-6" />
                </div>
                <span className={`font-mono text-xs tracking-widest uppercase ${i.accent}`}>
                  {i.eyebrow}
                </span>
              </div>
              <h1 className="font-serif-display text-[clamp(2rem,4.5vw,3.75rem)] mt-2 leading-tight">
                {i.headline}
              </h1>
              <p className="mt-5 text-[clamp(0.875rem,1.5vw,1.125rem)] text-muted-foreground leading-relaxed">
                {i.subtext}
              </p>
            </div>

            <div className="lg:col-span-5 mt-6 lg:mt-0 relative w-full aspect-[4/3] lg:aspect-square overflow-hidden rounded-2xl border border-accent-blue/10 shadow-2xl bg-slate-950/5 dark:bg-slate-950/25">
              <img
                src={`/industry-${i.slug.toLowerCase()}-hero.png`}
                alt={`${i.title} Industry Graphic`}
                decoding="async"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/industry-healthcare-hero.png";
                }}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 mt-16">
        <p className="text-xs tracking-[0.3em] text-accent-blue uppercase">Overview</p>
        <h2 className="font-serif-display text-3xl md:text-4xl mt-3">
          How we serve {i.title}
        </h2>
        <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-3xl">
          {i.overview}
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 mt-16">
        <p className="text-xs tracking-[0.3em] text-accent-purple uppercase">Highlights</p>
        <h2 className="font-serif-display text-[clamp(1.75rem,3vw,2.5rem)] mt-3">What we bring</h2>
        <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6">
          {i.highlights.map((h) => {
            const HIcon = h.icon;
            return (
              <div
                key={h.title}
                className="group p-8 rounded-2xl border border-foreground/10 bg-white/60 dark:bg-white/5 backdrop-blur flex flex-col items-center text-center gap-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-accent-blue/30 hover:bg-white/80 dark:hover:bg-white/10"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-blue text-white shadow-md transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <HIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif-display text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-accent-blue leading-snug">
                    {h.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-sm">
                    {h.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 mt-16">
        <p className="text-xs tracking-[0.3em] text-accent-blue uppercase">Use Cases</p>
        <h2 className="font-serif-display text-[clamp(1.75rem,3vw,2.5rem)] mt-3">
          Where it applies
        </h2>
        <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-5">
          {i.useCases.map((u) => (
            <div
              key={u.title}
              className="group p-6 rounded-2xl border border-foreground/10 bg-white/60 dark:bg-white/5 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-accent-blue/30 hover:bg-white/85 dark:hover:bg-white/10"
            >
              <h3 className="font-semibold text-base transition-colors duration-300 group-hover:text-accent-blue mb-2">
                {u.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{u.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 mt-20">
        <p className="text-xs tracking-[0.3em] text-accent-purple uppercase font-bold">
          Collaboration Model
        </p>
        <h2 className="font-serif-display text-[clamp(1.75rem,3vw,2.5rem)] mt-3 text-foreground">
          How We Partner
        </h2>
        <p className="mt-4 text-sm text-muted-foreground max-w-2xl leading-relaxed">
          An integrated framework designed to transition dark genome insights directly into your
          institutional research and deployment pipelines.
        </p>
        <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] gap-4 relative">
          {i.workflow.map((w) => (
            <div
              key={w.step}
              className="group p-6 rounded-2xl border border-foreground/5 bg-white/70 dark:bg-white/[0.02] shadow-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-accent-blue/20 hover:bg-white/90 dark:hover:bg-white/5"
            >
              <div>
                <span className="font-serif-display text-3xl font-bold bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent block mb-4 transition-transform duration-300 group-hover:scale-110 origin-left">
                  {w.step}
                </span>
                <h4 className="font-semibold text-sm text-foreground mb-2 transition-colors duration-300 group-hover:text-accent-blue">
                  {w.title}
                </h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mt-2">{w.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 mt-20">
        <div className="rounded-3xl border border-foreground/10 p-10 md:p-14 bg-gradient-to-br from-accent-blue/10 via-accent-purple/10 to-accent-emerald/10 text-center">
          <h2 className="font-serif-display text-[clamp(1.75rem,3vw,2.5rem)]">
            Partner with us in {i.title}
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Tell us about your goals and we'll map the right Deep Codon capabilities to your
            roadmap.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="px-6 py-3 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-90 transition"
            >
              Partner with us
            </Link>
            <Link
              to="/"
              className="px-6 py-3 rounded-full border border-foreground/20 text-sm hover:bg-foreground/5 transition"
            >
              Explore other industries
            </Link>
          </div>
        </div>

        <div className="mt-14">
          <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
            Other industries
          </p>
          <div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-4">
            {industries
              .filter((x) => x.slug !== i.slug)
              .map((x) => {
                const XIcon = x.icon;
                return (
                  <Link
                    key={x.slug}
                    to="/industries/$slug"
                    params={{ slug: x.slug }}
                    className="offering-card group p-3.5"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <XIcon className="h-4 w-4 text-foreground/80 shrink-0 group-hover:text-accent-blue transition-colors" />
                      <h3 className="text-sm font-semibold leading-tight text-foreground group-hover:text-accent-blue transition-colors">
                        {x.title}
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-snug line-clamp-2">
                      {x.subtext}
                    </p>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
}
