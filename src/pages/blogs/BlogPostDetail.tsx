import React from "react";
import { Link } from "@/lib/router-compat";
import { getBlogPost, blogPosts } from "./blogs-data";
import {
  Dna,
  Brain,
  Cpu,
  Pill,
  Database,
  Sparkles,
  Activity,
  Atom,
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle2,
  Heart,
  Users,
  Shield,
  Globe,
} from "lucide-react";

export default function BlogPostDetail({ slug }: { slug: string }) {
  const post = getBlogPost(slug);
  if (!post) return null;
  const readNextPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  // Helper to map sections to rich icons
  const getSectionIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("mining") || t.includes("genome") || t.includes("genomics") || t.includes("dna"))
      return Dna;
    if (t.includes("intelligence") || t.includes("ai") || t.includes("brain")) return Brain;
    if (t.includes("quantum") || t.includes("simulate") || t.includes("atom")) return Atom;
    if (
      t.includes("therapeutics") ||
      t.includes("medicine") ||
      t.includes("pill") ||
      t.includes("drug")
    )
      return Pill;
    if (t.includes("datasets") || t.includes("data") || t.includes("process")) return Database;
    if (t.includes("patterns") || t.includes("decode")) return Cpu;
    if (t.includes("bridge") || t.includes("scientific") || t.includes("innovation"))
      return Sparkles;
    return Activity;
  };

  // Helper to map conclusion values to icons
  const getBulletIcon = (text: string) => {
    const t = text.toLowerCase();
    if (t.includes("science")) return Dna;
    if (t.includes("collaboration") || t.includes("interdisciplinary")) return Users;
    if (t.includes("ethical") || t.includes("impact")) return Shield;
    if (t.includes("global") || t.includes("health")) return Globe;
    if (t.includes("genomics") || t.includes("dna")) return Dna;
    if (t.includes("biotechnology")) return Sparkles;
    if (t.includes("drug") || t.includes("therapeutic")) return Pill;
    if (t.includes("quantum")) return Atom;
    if (t.includes("ai") || t.includes("data")) return Brain;
    if (t.includes("precision") || t.includes("medicine")) return Heart;
    return CheckCircle2;
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#f0f4f8] dark:bg-[#0c131f] transition-colors duration-300 page-3d-transition">
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-6 mb-8 animate-fade-in">
        <Link
          to="/blogs"
          id="back-to-blogs-btn"
          className="group inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
        >
          <ArrowLeft className="h-3 w-3 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to blogs
        </Link>
      </div>

      <article className="max-w-4xl mx-auto px-6">
        {/* Article Meta */}
        <header className="mb-8 animate-fade-in">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-accent-blue/10 dark:bg-accent-blue/20 text-accent-blue font-mono text-[10px] tracking-widest uppercase px-3 py-1 rounded-md backdrop-blur">
              {post.eyebrow}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
              <Calendar className="h-3.5 w-3.5" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
              <Clock className="h-3.5 w-3.5" />
              <span>5 min read</span>
            </div>
          </div>

          <h1 className="font-serif-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight">
            {post.title}
          </h1>

          <div className="mt-6 flex items-center gap-3 border-b border-foreground/5 pb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-purple/10 text-accent-purple font-mono text-sm font-semibold">
              QC
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Quantum Codon Research Team</p>
              <p className="text-xs text-muted-foreground">Deep Codon Initiative Authors</p>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-foreground/5 shadow-2xl bg-slate-950 mb-12 animate-fade-in">
          <img
            src={post.image}
            alt={post.title}
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-1000 hover:scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Introduction */}
        <section className="prose prose-slate dark:prose-invert max-w-none mb-14 animate-fade-in">
          <div className="relative pl-6 border-l-4 border-accent-blue py-2">
            <p className="text-lg md:text-xl text-foreground/85 leading-relaxed font-medium italic">
              {post.introduction}
            </p>
          </div>
        </section>

        {/* Main Sections Content */}
        <section className="space-y-8 mb-16">
          <h2 className="text-xs tracking-[0.3em] text-accent-purple uppercase font-bold mb-6">
            Key Core Capabilities
          </h2>
          <div className="grid gap-6">
            {post.sections.map((section) => {
              const SectionIcon = getSectionIcon(section.title);
              return (
                <div
                  key={section.title}
                  className="group relative p-8 rounded-2xl border border-foreground/10 bg-white/40 dark:bg-black/20 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-accent-blue/35 hover:bg-white/60 dark:hover:bg-black/35"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent-blue/10 text-accent-blue transition-all duration-500 group-hover:scale-108 group-hover:rotate-3 shadow-sm border border-accent-blue/10">
                      <SectionIcon className="h-6 w-6" />
                    </div>
                    <div className="space-y-2">
                      <span className="font-mono text-[10px] tracking-widest uppercase text-accent-blue/80 dark:text-accent-blue/90 font-semibold block">
                        {section.subhead}
                      </span>
                      <h3 className="font-serif-display text-2xl font-bold text-foreground transition-colors duration-300 group-hover:text-accent-blue">
                        {section.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-base pt-1">
                        {section.body}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Conclusion / Mission / Value Card */}
        {post.conclusion && (
          <section className="mb-20 animate-fade-in">
            <div className="relative rounded-3xl border border-foreground/10 p-8 md:p-12 bg-gradient-to-br from-accent-blue/10 via-accent-purple/10 to-accent-emerald/10 shadow-lg overflow-hidden">
              {/* Decorative graphic/glow */}
              <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-accent-blue/10 blur-3xl pointer-events-none" />
              <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-accent-purple/10 blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <span className="text-xs tracking-[0.3em] text-accent-purple uppercase font-bold block mb-4">
                  {post.conclusion.headline}
                </span>
                <h2 className="font-serif-display text-3xl md:text-4xl text-foreground font-semibold leading-tight mb-6">
                  {post.conclusion.text}
                </h2>

                {post.conclusion.bulletLabel && post.conclusion.bullets && (
                  <div className="border-t border-foreground/5 pt-8 mt-8">
                    <h4 className="font-mono text-xs tracking-wider uppercase text-foreground mb-6 font-semibold">
                      {post.conclusion.bulletLabel}
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {post.conclusion.bullets.map((bullet) => {
                        const BulletIcon = getBulletIcon(bullet);

                        // Parse title vs description if separated by colon
                        const parts = bullet.split(": ");
                        const title = parts[0];
                        const desc = parts.slice(1).join(": ");

                        return (
                          <div
                            key={bullet}
                            className="flex items-start gap-3 p-4 rounded-2xl border border-foreground/5 bg-white/30 dark:bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:border-accent-blue/20 hover:bg-white/50 dark:hover:bg-white/5"
                          >
                            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent-blue/10 text-accent-blue shrink-0">
                              <BulletIcon className="h-4 w-4" />
                            </div>
                            <span className="text-sm text-foreground/95 leading-normal">
                              {desc ? (
                                <>
                                  <strong className="text-foreground font-semibold">{title}</strong>
                                  <span className="text-muted-foreground block mt-0.5 text-xs">
                                    {desc}
                                  </span>
                                </>
                              ) : (
                                bullet
                              )}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Read Next Section */}
        {readNextPosts.length > 0 && (
          <footer className="border-t border-foreground/10 pt-16 mt-16 animate-fade-in">
            <h3 className="text-xs tracking-[0.3em] text-muted-foreground uppercase font-semibold mb-6">
              Keep Reading
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {readNextPosts.map((nextPost) => (
                <Link
                  key={nextPost.slug}
                  to="/blogs/$slug"
                  params={{ slug: nextPost.slug }}
                  className="group flex flex-col p-5 rounded-3xl border border-foreground/5 bg-white/40 dark:bg-black/20 hover:-translate-y-1 hover:shadow-xl hover:border-accent-blue/35 transition-all duration-500"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-foreground/5 bg-slate-950 mb-4">
                    <img
                      src={nextPost.image}
                      alt={nextPost.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/90 text-white font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-md backdrop-blur">
                      {nextPost.eyebrow}
                    </div>
                  </div>
                  <div className="space-y-2 flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif-display text-lg font-bold text-foreground group-hover:text-accent-blue transition-colors duration-300 line-clamp-2 leading-snug">
                        {nextPost.title}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mt-1">
                        {nextPost.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-semibold text-accent-blue pt-3 border-t border-foreground/5 mt-3">
                      Read Article{" "}
                      <ArrowLeft className="h-3 w-3 rotate-180 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </footer>
        )}
      </article>
    </div>
  );
}
