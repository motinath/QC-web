import { createFileRoute } from "@tanstack/react-router";
import CaseStudies from "@/pages/case-studies/CaseStudies";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies — Quantum Codon" },
      {
        name: "description",
        content:
          "Discover how Quantum Codon makes a difference across therapeutics, diagnostics, and industrial biotech.",
      },
      { property: "og:title", content: "Case Studies — Quantum Codon" },
      {
        property: "og:description",
        content:
          "Discover how Quantum Codon makes a difference across therapeutics, diagnostics, and industrial biotech.",
      },
    ],
  }),
  component: CaseStudies,
});
