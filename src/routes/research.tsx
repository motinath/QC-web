import { createFileRoute } from "@tanstack/react-router";
import ResearchPage from "@/pages/research/Research";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research — Quantum Codon" },
      {
        name: "description",
        content: "15+ years of peer-reviewed dark genome research across six disease areas.",
      },
    ],
  }),
  component: ResearchPage,
});
