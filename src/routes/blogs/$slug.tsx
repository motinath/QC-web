import { createFileRoute, notFound } from "@tanstack/react-router";
import { getBlogPost } from "@/pages/blogs/blogs-data";
import BlogPostDetail from "@/pages/blogs/BlogPostDetail";

export const Route = createFileRoute("/blogs/$slug")({
  loader: ({ params }) => {
    const post = getBlogPost(params.slug);
    if (!post) throw notFound();
    return { slug: params.slug };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.slug ? getBlogPost(loaderData.slug) : null;
    if (!p) return { meta: [{ title: "Blog — Quantum Codon" }] };
    return {
      meta: [
        { title: `${p.title} — Quantum Codon` },
        { name: "description", content: p.excerpt },
        { property: "og:title", content: `${p.title} — Quantum Codon` },
        { property: "og:description", content: p.excerpt },
        { property: "og:image", content: p.image },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="pt-32 pb-24 px-6 max-w-3xl mx-auto text-center">
      <p className="text-xs tracking-[0.3em] text-accent-blue uppercase">404</p>
      <h1 className="font-serif-display text-4xl mt-3">Blog post not found</h1>
    </div>
  ),
  component: BlogPostRoute,
});

function BlogPostRoute() {
  const { slug } = Route.useLoaderData() as { slug: string };
  return <BlogPostDetail slug={slug} />;
}
