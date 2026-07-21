import { createFileRoute, notFound } from "@tanstack/react-router";
import { getIndustry } from "@/lib/industries-data";
import IndustryDetailPage from "@/pages/industries/IndustryDetailPage";

export const Route = createFileRoute("/industries/$slug")({
  loader: ({ params }) => {
    const industry = getIndustry(params.slug);
    if (!industry) throw notFound();
    return { slug: params.slug };
  },
  head: ({ loaderData }) => {
    const i = loaderData?.slug ? getIndustry(loaderData.slug) : null;
    if (!i) return { meta: [{ title: "Industry — Quantum Codon" }] };
    return {
      meta: [
        { title: `${i.title} — Quantum Codon` },
        { name: "description", content: i.subtext },
        { property: "og:title", content: `${i.title} — Quantum Codon` },
        { property: "og:description", content: i.subtext },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="pt-32 pb-24 px-6 max-w-3xl mx-auto text-center">
      <p className="text-xs tracking-[0.3em] text-accent-emerald uppercase">404</p>
      <h1 className="font-serif-display text-4xl mt-3">Industry not found</h1>
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
  component: IndustryRoute,
});

function IndustryRoute() {
  const { slug } = Route.useLoaderData() as { slug: string };
  return <IndustryDetailPage slug={slug} />;
}
