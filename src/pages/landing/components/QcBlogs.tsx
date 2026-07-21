import React from "react";
import { Link } from "@/lib/router-compat";
import { blogPosts } from "../../blogs/blogs-data";

export function QcBlogs() {
  return (
    <section
      id="blogs"
      className="relative py-28 px-6 bg-[#f0f4f8] dark:bg-[#0a1118] transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs tracking-[0.3em] text-accent-emerald uppercase">
              Insights · Blogs
            </p>
            <h2 className="font-bagel text-[clamp(1.75rem,4vw,3rem)] mt-3">
              Ideas from the frontier
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl">
              Long-form essays and field notes from the Quantum Codon team on dark genome science,
              AI, and therapeutics.
            </p>
          </div>
          <Link
            to="/blogs"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-foreground/15 text-sm hover:bg-foreground/5 transition shrink-0"
          >
            All posts →
          </Link>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-6">
          {blogPosts.map((p) => (
            <Link
              key={p.slug}
              to="/blogs/$slug"
              params={{ slug: p.slug }}
              className="group block p-7 rounded-2xl border border-foreground/10 bg-white/60 dark:bg-white/5 backdrop-blur hover:-translate-y-1 transition duration-200 hover:border-accent-blue/30 hover:shadow-lg"
            >
              <p className="text-[10px] tracking-[0.3em] text-accent-emerald uppercase">
                {p.eyebrow}
              </p>
              <h3 className="mt-3 font-serif-display text-xl leading-snug group-hover:text-accent-blue transition-colors">
                {p.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {p.excerpt}
              </p>
              <p className="mt-5 text-xs text-muted-foreground font-mono">{p.date}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-foreground/15 text-sm hover:bg-foreground/5 transition"
          >
            All posts →
          </Link>
        </div>
      </div>
    </section>
  );
}
