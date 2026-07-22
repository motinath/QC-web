import { Link } from "../../lib/router-compat";
import { Facebook, Instagram, Linkedin, Twitter, Youtube, MapPin } from "lucide-react";

interface FooterLink {
  label: string;
  to: string;
  params?: Record<string, string>;
}

const columns = [
  {
    title: "Offerings",
    links: [
      { label: "Drug Discovery", to: "/services/$slug", params: { slug: "drug-discovery" } },
      { label: "Bio MFG", to: "/services/$slug", params: { slug: "bio-mfg" } },
      {
        label: "Analytical Service",
        to: "/services/$slug",
        params: { slug: "analytical-service" },
      },
      { label: "Bioinformatics", to: "/services/$slug", params: { slug: "bioinformatics" } },
      { label: "Regulatory & Compliance", to: "/services/regulatory-compliance" },
    ] as FooterLink[],
  },
  {
    title: "Industries",
    links: [
      { label: "Life Science", to: "/industries/$slug", params: { slug: "life-science" } },
      { label: "Education", to: "/industries/$slug", params: { slug: "education" } },
      { label: "Bio-Manufacturing", to: "/industries/$slug", params: { slug: "manufacturing" } },
    ] as FooterLink[],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Careers", to: "/careers" },
      { label: "Research", to: "/research" },
      { label: "Case Studies", to: "/case-studies" },
      { label: "Blog", to: "/blogs" },
      { label: "Contact", to: "/contact" },
    ] as FooterLink[],
  },
];

const socials = [
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: MapPin, href: "https://maps.app.goo.gl/bAURtJ7543zqQ3qG8", label: "Location" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div>
            <div className="font-serif-italic text-3xl text-foreground">
              Quantum Codon<span className="text-primary"></span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Empowering the future of biotechnology with cutting-edge solutions.
            </p>
            <a
              href="https://www.qcodon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
              style={{ color: "#2563eb" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              www.qcodon.com
            </a>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background text-foreground transition-colors hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  <s.icon className="h-4 w-4" strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-foreground">
                {col.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to as string}
                      params={l.params}
                      className="text-sm text-muted-foreground transition-colors hover:text-blue-600"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Quantum Codon. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
