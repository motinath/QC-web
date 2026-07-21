/**
 * Centralized Navigation Configuration
 * Single source of truth for header navbar and footer links.
 */

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  badge?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const headerNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services/regulatory-compliance" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Research", href: "/research" },
  { label: "Blogs", href: "/blogs" },
  { label: "Careers", href: "/careers" },
];

export const footerNavigation = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Research & Innovation", href: "/research" },
    { label: "Contact Us", href: "/contact" },
  ],
  services: [
    { label: "Regulatory Compliance", href: "/services/regulatory-compliance" },
    { label: "Drug Discovery Platform", href: "/services/drug-discovery" },
    { label: "Genomic Sequencing AI", href: "/services/genomic-ai" },
    { label: "Bioprocess Automation", href: "/services/bioprocess" },
  ],
  resources: [
    { label: "Blogs & Insights", href: "/blogs" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Documentation", href: "/research" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Security & Compliance", href: "/security" },
  ],
} as const;
