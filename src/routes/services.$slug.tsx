import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { getOffering, offerings } from "@/lib/services-data";
import EducationPage from "@/pages/services/education/Education";
import DrugDiscoveryPage from "@/pages/services/drug-discovery/DrugDiscovery";
import AnalyticalServicesPage from "@/pages/services/analytical-services/AnalyticalServices";
import BioMmgPage from "@/pages/services/bio-mmg/BioMmg";
import BioinformaticsPage from "@/pages/services/bioinformatics/Bioinformatics";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const offering = getOffering(params.slug);
    if (!offering) throw notFound();
    return { slug: params.slug };
  },
  head: ({ loaderData }) => {
    const o = loaderData?.slug ? getOffering(loaderData.slug) : null;
    if (!o) return { meta: [{ title: "Service — Quantum Codon" }] };
    return {
      meta: [
        { title: `${o.title} — Quantum Codon` },
        { name: "description", content: o.description },
        { property: "og:title", content: `${o.title} — Quantum Codon` },
        { property: "og:description", content: o.description },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="pt-32 pb-24 px-6 max-w-3xl mx-auto text-center">
      <p className="text-xs tracking-[0.3em] text-accent-emerald uppercase">404</p>
      <h1 className="font-serif-display text-4xl mt-3">Service not found</h1>
      <Link
        to="/"
        className="inline-block mt-6 text-sm text-muted-foreground hover:text-foreground"
      >
        ← Back to home
      </Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="pt-32 pb-24 px-6 max-w-3xl mx-auto text-center">
      <h1 className="font-serif-display text-2xl">Something went wrong</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      <button onClick={reset} className="mt-6 px-4 py-2 rounded-full border text-sm">
        Try again
      </button>
    </div>
  ),
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { slug } = Route.useLoaderData() as { slug: string };
  const o = getOffering(slug);
  if (!o) throw notFound();

  if (o.slug === "education") {
    return <EducationPage />;
  }

  if (o.slug === "drug-discovery") {
    return <DrugDiscoveryPage />;
  }

  if (o.slug === "analytical-service" || o.slug === "analytical-services") {
    return <AnalyticalServicesPage />;
  }
  if (o.slug === "bio-mmg") {
    return <BioMmgPage />;
  }

  if (o.slug === "bioinformatics") {
    return <BioinformaticsPage />;
  }

  const Icon = o.icon;

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

      {/* Hero */}
      <section className={`max-w-5xl mx-auto px-6`}>
        <div className={`rounded-3xl border p-10 md:p-14 ${o.color} backdrop-blur`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-blue/10 text-accent-blue">
              <Icon className="h-6 w-6" />
            </div>
            <span className={`badge-meta ${o.accentText}`}>
              {o.num} · {o.badge}
            </span>
          </div>
          <p className="badge-meta text-accent-emerald">{o.hero.eyebrow}</p>
          <h1 className="heading-hero mt-4">{o.hero.headline}</h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-3xl leading-relaxed">
            {o.hero.sub}
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="max-w-5xl mx-auto px-6 mt-16">
        <p className="text-xs tracking-[0.3em] text-accent-blue uppercase">Overview</p>
        <h2 className="font-serif-display text-3xl md:text-4xl mt-3">What is {o.title}?</h2>
        <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-3xl">
          {o.overview}
        </p>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 mt-16">
        <p className="text-xs tracking-[0.3em] text-accent-purple uppercase">Key Features</p>
        <h2 className="font-serif-display text-3xl md:text-4xl mt-3">What's included</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-5">
          {o.features.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-2xl border border-foreground/10 bg-white/60 dark:bg-white/5 backdrop-blur"
            >
              <h3 className="font-semibold text-base">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-5xl mx-auto px-6 mt-16">
        <p className="text-xs tracking-[0.3em] text-accent-emerald uppercase">Benefits</p>
        <h2 className="font-serif-display text-3xl md:text-4xl mt-3">Why teams choose this</h2>
        <ul className="mt-8 grid md:grid-cols-2 gap-3">
          {o.benefits.map((b) => (
            <li
              key={b}
              className="flex items-start gap-3 p-4 rounded-xl border border-foreground/10 bg-white/40 dark:bg-white/[0.03]"
            >
              <span
                className={`mt-1 h-2 w-2 rounded-full ${o.accentText.replace("text-", "bg-")}`}
              />
              <span className="text-sm text-foreground/90">{b}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Use cases */}
      <section className="max-w-5xl mx-auto px-6 mt-16">
        <p className="text-xs tracking-[0.3em] text-accent-blue uppercase">Use Cases</p>
        <h2 className="font-serif-display text-3xl md:text-4xl mt-3">Where it applies</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {o.useCases.map((u) => (
            <div
              key={u.title}
              className="p-6 rounded-2xl border border-foreground/10 bg-white/60 dark:bg-white/5 backdrop-blur"
            >
              <h3 className="font-semibold text-base">{u.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{u.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 mt-20">
        <div className="rounded-3xl border border-foreground/10 p-10 md:p-14 bg-gradient-to-br from-accent-blue/10 via-accent-purple/10 to-accent-emerald/10 text-center">
          <h2 className="font-serif-display text-3xl md:text-4xl">Ready to explore {o.title}?</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Get in touch with our team to discuss your project, goals, and timeline.
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
              Explore other offerings
            </Link>
          </div>
        </div>

        {/* Related */}
        <div className="mt-14">
          <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
            Other offerings
          </p>
          <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {offerings
              .filter((x) => x.slug !== o.slug)
              .map((x) => {
                const XIcon = x.icon;
                return (
                  <Link
                    key={x.slug}
                    to="/services/$slug"
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
                      {x.description}
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
