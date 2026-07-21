import React from "react";
import { Link } from "@/lib/router-compat";
import { blogPosts } from "./blogs-data";

export default function Blogs() {
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
        <p className="text-xs tracking-[0.3em] text-accent-blue uppercase">Insights · Blogs</p>
        <h1 className="font-serif-display text-[clamp(2rem,5vw,3.75rem)] mt-3 leading-tight">
          Ideas, trends, and stories from the world of AI
        </h1>
        <p className="mt-5 text-lg text-muted-foreground max-w-3xl">
          Long-form essays and field notes from the Quantum Codon team on dark genome science,
          computational biology, and the future of therapeutics.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 mt-14 grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] gap-8">
        {blogPosts.map((p) => (
          <Link
            key={p.slug}
            to="/blogs/$slug"
            params={{ slug: p.slug }}
            className="group flex flex-col justify-between p-8 rounded-3xl border border-foreground/10 bg-white/60 dark:bg-white/5 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-accent-blue/30"
          >
            <div>
              <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl border border-foreground/5 bg-slate-100 dark:bg-slate-900/50">
                <img
                  src={p.image}
                  alt={p.title}
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                />
              </div>
              <p className="text-[10px] tracking-[0.3em] text-accent-emerald uppercase mt-6">
                {p.eyebrow}
              </p>
              <h3 className="mt-3 font-serif-display text-2xl group-hover:text-accent-blue transition-colors duration-300 leading-snug">
                {p.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.excerpt}</p>
            </div>
            <div className="mt-6 pt-5 border-t border-foreground/5 flex justify-between items-center text-xs text-muted-foreground font-mono">
              <span>{p.date}</span>
              <span className="font-sans font-semibold group-hover:text-accent-blue transition-colors">
                Read post →
              </span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
