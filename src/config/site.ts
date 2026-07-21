/**
 * Centralized Site Configuration
 * Single source of truth for organization details, contact info, and site branding.
 */

export const siteConfig = {
  name: "Quantum Codon",
  legalName: "Quantum Codon Technologies Inc.",
  shortName: "QCodon",
  tagline: "Unlocking the Dark Genome for Next-Generation Therapeutics",
  description:
    "Quantum Codon leverages AI, biocomputing, and multi-omics to decode untranslated regions, dark genome targets, and precision therapeutics.",
  url: "https://qcodon.com",
  domain: "qcodon.com",
  contact: {
    email: "contact@qcodon.com",
    salesEmail: "sales@qcodon.com",
    supportEmail: "support@qcodon.com",
    phone: "+1 (800) 555-0199",
    address: {
      street: "100 Innovation Way, Suite 400",
      city: "Cambridge",
      state: "MA",
      zip: "02142",
      country: "USA",
    },
  },
  themeColor: "#0ea5e9",
  backgroundColor: "#080b11",
} as const;

export type SiteConfig = typeof siteConfig;
