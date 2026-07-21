import { createFileRoute } from "@tanstack/react-router";
import Landing from "@/pages/landing/Landing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Quantum Codon — Deep Codon Initiative" },
      {
        name: "description",
        content:
          "Decoding the 98% of the genome that mainstream biology has ignored — to design first-in-class therapeutic molecules.",
      },
    ],
  }),
  component: Landing,
});
