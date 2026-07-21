import { createFileRoute } from "@tanstack/react-router";
import CareersPage from "@/pages/careers/Careers";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Quantum Codon" },
      {
        name: "description",
        content:
          "Join the Deep Codon team — pioneers in biology, quantum computation, and software engineering.",
      },
    ],
  }),
  component: CareersPage,
});
