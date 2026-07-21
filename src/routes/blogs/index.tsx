import { createFileRoute } from "@tanstack/react-router";
import Blogs from "@/pages/blogs/Blogs";

export const Route = createFileRoute("/blogs/")({
  head: () => ({
    meta: [
      { title: "Blogs — Quantum Codon" },
      {
        name: "description",
        content: "Ideas, trends, and stories from the world of AI and dark genome science.",
      },
      { property: "og:title", content: "Blogs — Quantum Codon" },
      {
        property: "og:description",
        content: "Ideas, trends, and stories from the world of AI and dark genome science.",
      },
    ],
  }),
  component: Blogs,
});
