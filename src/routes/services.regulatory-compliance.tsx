import { createFileRoute } from "@tanstack/react-router";
import RegulatoryCompliancePage from "@/pages/services/regulatory-compliance/RegulatoryCompliance";

export const Route = createFileRoute("/services/regulatory-compliance")({
  head: () => ({
    meta: [
      { title: "Regulatory & Compliance — Quantum Codon" },
      {
        name: "description",
        content:
          "Your regulatory compass in Biotech, Biomanufacturing & BioAI. FDA, EMA, ICH submissions; GMP strategy; AI/ML pathways; investor-ready compliance.",
      },
      { property: "og:title", content: "Regulatory & Compliance — Quantum Codon" },
      {
        property: "og:description",
        content:
          "We transform regulatory complexity into competitive advantage — from molecule to market.",
      },
    ],
  }),
  component: RegulatoryCompliancePage,
});
