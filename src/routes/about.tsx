import { createFileRoute } from "@tanstack/react-router";
import AboutPage from "@/pages/about/About";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Quantum Codon" },
      {
        name: "description",
        content:
          "Quantum Codon was founded to explore the final frontier of biology: the silent 98% of the genome.",
      },
    ],
  }),
  component: AboutPage,
});
