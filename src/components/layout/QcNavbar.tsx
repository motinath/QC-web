import React, { useEffect, useRef, useState } from "react";
import { Link } from "../../lib/router-compat";
import SkyToggle from "@/components/ui/sky-toggle";
import {
  ChevronDown,
  Info,
  Briefcase,
  BookOpen,
  FileText,
  Microscope,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { industries } from "../../lib/industries-data";
import { offerings } from "../../lib/services-data";
import { useTheme } from "../shared/ThemeProvider";
import { useContactModal } from "../shared/ContactModal";

const _OFFERING_ANCHORS: Record<string, string> = {
  "drug-discovery": "/#drug-discovery",
  "bio-mmg": "/#bio-mmg",
  "analytical-service": "/#analytical-services",
  bioinformatics: "/#bioinformatics",
  "regulatory-compliance": "/services/regulatory-compliance",
  education: "/#education",
};

const companyItems = [
  {
    slug: "about",
    label: "About Us",
    subtext: "Discover who we are, what we do, and why it matters.",
    icon: Info,
    to: "/about",
  },
  {
    slug: "careers",
    label: "Careers",
    subtext: "Join the minds behind intelligent solutions.",
    icon: Briefcase,
    to: "/careers",
  },
];

const insightsItems = [
  {
    slug: "blogs",
    label: "Blogs",
    subtext: "Ideas, trends, and stories from the world of AI.",
    icon: BookOpen,
    to: "/blogs",
  },
  {
    slug: "case-studies",
    label: "Case Studies",
    subtext: "Discover how we make a difference.",
    icon: FileText,
    to: "/case-studies",
  },
  {
    slug: "research",
    label: "Research",
    subtext: "15+ years of peer-reviewed dark genome research.",
    icon: Microscope,
    to: "/research",
  },
];

const industriesItems = industries.map((i) => ({
  slug: i.slug,
  label: i.title,
  subtext: i.subtext,
  icon: i.icon,
  to: `/industries/${i.slug}`,
}));

export function QcNavbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const offeringsRef = useRef<HTMLDivElement | null>(null);
  const companyRef = useRef<HTMLDivElement | null>(null);
  const industriesRef = useRef<HTMLDivElement | null>(null);
  const insightsRef = useRef<HTMLDivElement | null>(null);
  const { theme, setTheme } = useTheme();
  const { open: _openContact } = useContactModal();

  const openMenu = (name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(name);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveMenu(null), 120);
  };

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActiveMenu(null);
    }
    function onPointerDown(e: MouseEvent) {
      const target = e.target as Node;
      const refs = [offeringsRef, companyRef, industriesRef, insightsRef];
      if (!refs.some((r) => r.current?.contains(target))) {
        setActiveMenu(null);
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 glass-navbar">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src="/logo-emblem.png"
            alt="Quantum Codon Logo"
            className="h-7 w-auto object-contain dark:brightness-110"
          />
          <span className="font-serif-display text-base tracking-tight">Quantum Codon</span>
        </Link>

        <nav className="hidden md:flex gap-8 items-center text-sm">
          {/* Offerings mega menu */}
          <div
            ref={offeringsRef}
            className="relative"
            onMouseEnter={() => openMenu("offerings")}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              onClick={() => setActiveMenu(activeMenu === "offerings" ? null : "offerings")}
              className={`flex items-center gap-1 py-2 transition-colors ${activeMenu === "offerings" ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
              aria-expanded={activeMenu === "offerings"}
              aria-haspopup="menu"
            >
              Offerings
              <ChevronDown
                className={`h-3 w-3 transition-transform duration-200 ${activeMenu === "offerings" ? "rotate-180" : ""}`}
              />
            </button>

            {activeMenu === "offerings" && (
              <div
                onMouseEnter={() => openMenu("offerings")}
                onMouseLeave={scheduleClose}
                className="animate-menu-in z-50"
                style={{
                  position: "absolute",
                  top: "calc(100% + 10px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "600px",
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: "14px",
                  padding: "14px",
                  boxShadow: "var(--shadow-mega)",
                }}
              >
                <div className="mb-2 px-1">
                  <p className="text-[9px] tracking-[0.3em] text-accent-emerald uppercase font-semibold">
                    Our Offerings
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0">
                    Explore the full suite of Quantum Codon services.
                  </p>
                </div>
                <div className="grid grid-cols-2" style={{ gap: "8px" }}>
                  {offerings.map((o) => {
                    const Icon = o.icon;
                    return (
                      <Link
                        key={o.slug}
                        to={`/services/${o.slug}`}
                        onClick={() => setActiveMenu(null)}
                        className="offering-card group p-3"
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <Icon className="h-4 w-4 text-foreground/80 shrink-0 group-hover:text-accent-blue transition-colors" />
                          <h3 className="text-[12px] font-semibold leading-tight text-foreground group-hover:text-accent-blue transition-colors">
                            {o.title}
                          </h3>
                        </div>
                        <p className="text-[11px] leading-snug text-muted-foreground offering-desc">
                          {o.description}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Industries dropdown */}
          <div
            ref={industriesRef}
            className="relative"
            onMouseEnter={() => openMenu("industries")}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              onClick={() => setActiveMenu(activeMenu === "industries" ? null : "industries")}
              className={`flex items-center gap-1 py-2 transition-colors ${activeMenu === "industries" ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
              aria-expanded={activeMenu === "industries"}
              aria-haspopup="menu"
            >
              Industries
              <ChevronDown
                className={`h-3 w-3 transition-transform duration-200 ${activeMenu === "industries" ? "rotate-180" : ""}`}
              />
            </button>

            {activeMenu === "industries" && (
              <div
                onMouseEnter={() => openMenu("industries")}
                onMouseLeave={scheduleClose}
                className="animate-menu-in z-50"
                style={{
                  position: "absolute",
                  top: "calc(100% + 10px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "360px",
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: "14px",
                  padding: "14px",
                  boxShadow: "var(--shadow-mega)",
                }}
              >
                <div className="mb-2 px-1">
                  <p className="text-[9px] tracking-[0.3em] text-accent-emerald uppercase font-semibold">
                    Industries
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0">
                    Where Deep Codon creates impact.
                  </p>
                </div>
                <div className="flex flex-col" style={{ gap: "8px" }}>
                  {industriesItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.slug}
                        to={item.to}
                        onClick={() => setActiveMenu(null)}
                        className="offering-card group p-3"
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <Icon className="h-4 w-4 text-foreground/80 shrink-0 group-hover:text-accent-blue transition-colors" />
                          <h3 className="text-[12px] font-semibold leading-tight text-foreground group-hover:text-accent-blue transition-colors">
                            {item.label}
                          </h3>
                        </div>
                        <p className="text-[11px] leading-snug text-muted-foreground offering-desc line-clamp-2">
                          {item.subtext}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Insights dropdown */}
          <div
            ref={insightsRef}
            className="relative"
            onMouseEnter={() => openMenu("insights")}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              onClick={() => setActiveMenu(activeMenu === "insights" ? null : "insights")}
              className={`flex items-center gap-1 py-2 transition-colors ${activeMenu === "insights" ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
              aria-expanded={activeMenu === "insights"}
              aria-haspopup="menu"
            >
              Insights
              <ChevronDown
                className={`h-3 w-3 transition-transform duration-200 ${activeMenu === "insights" ? "rotate-180" : ""}`}
              />
            </button>

            {activeMenu === "insights" && (
              <div
                onMouseEnter={() => openMenu("insights")}
                onMouseLeave={scheduleClose}
                className="animate-menu-in z-50"
                style={{
                  position: "absolute",
                  top: "calc(100% + 10px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "360px",
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: "14px",
                  padding: "14px",
                  boxShadow: "var(--shadow-mega)",
                }}
              >
                <div className="mb-2 px-1">
                  <p className="text-[9px] tracking-[0.3em] text-accent-emerald uppercase font-semibold">
                    Insights
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0">
                    Ideas, stories, and science from our team.
                  </p>
                </div>
                <div className="flex flex-col" style={{ gap: "8px" }}>
                  {insightsItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.slug}
                        to={item.to}
                        onClick={() => setActiveMenu(null)}
                        className="offering-card group p-3"
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <Icon className="h-4 w-4 text-foreground/80 shrink-0 group-hover:text-accent-blue transition-colors" />
                          <h3 className="text-[12px] font-semibold leading-tight text-foreground group-hover:text-accent-blue transition-colors">
                            {item.label}
                          </h3>
                        </div>
                        <p className="text-[11px] leading-snug text-muted-foreground offering-desc line-clamp-2">
                          {item.subtext}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Company dropdown */}
          <div
            ref={companyRef}
            className="relative"
            onMouseEnter={() => openMenu("company")}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              onClick={() => setActiveMenu(activeMenu === "company" ? null : "company")}
              className={`flex items-center gap-1 py-2 transition-colors ${activeMenu === "company" ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
              aria-expanded={activeMenu === "company"}
              aria-haspopup="menu"
            >
              Company
              <ChevronDown
                className={`h-3 w-3 transition-transform duration-200 ${activeMenu === "company" ? "rotate-180" : ""}`}
              />
            </button>

            {activeMenu === "company" && (
              <div
                onMouseEnter={() => openMenu("company")}
                onMouseLeave={scheduleClose}
                className="animate-menu-in z-50"
                style={{
                  position: "absolute",
                  top: "calc(100% + 10px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "320px",
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: "14px",
                  padding: "14px",
                  boxShadow: "var(--shadow-mega)",
                }}
              >
                <div className="mb-2 px-1">
                  <p className="text-[9px] tracking-[0.3em] text-accent-emerald uppercase font-semibold">
                    Company
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0">
                    Learn more about Quantum Codon.
                  </p>
                </div>
                <div className="flex flex-col" style={{ gap: "8px" }}>
                  {companyItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.slug}
                        to={item.to}
                        onClick={() => setActiveMenu(null)}
                        className="offering-card group p-3"
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <Icon className="h-4 w-4 text-foreground/80 shrink-0 group-hover:text-accent-blue transition-colors" />
                          <h3 className="text-[12px] font-semibold leading-tight text-foreground group-hover:text-accent-blue transition-colors">
                            {item.label}
                          </h3>
                        </div>
                        <p className="text-[11px] leading-snug text-muted-foreground offering-desc">
                          {item.subtext}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <Link
            to="/contact"
            className="transition-colors text-muted-foreground hover:text-foreground"
          >
            Contact
          </Link>
        </nav>

        {/* Desktop CTA & Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-accent-blue text-white hover:opacity-90 transition font-semibold shadow-lg shadow-accent-blue/20"
          >
            Connect with us
          </Link>
          <SkyToggle
            checked={theme === "dark"}
            onChange={(checked) => setTheme(checked ? "dark" : "light")}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          />
        </div>

        {/* Mobile Hamburger & Actions */}
        <div className="flex md:hidden items-center gap-2">
          <SkyToggle
            checked={theme === "dark"}
            onChange={(checked) => setTheme(checked ? "dark" : "light")}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          />
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Drawer Navigation */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bottom-0 bg-background/95 backdrop-blur-2xl z-50 overflow-y-auto px-6 py-6 border-t border-border flex flex-col justify-between animate-fade-in">
          <div className="space-y-6">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-accent-blue mb-3">
                Offerings & Services
              </p>
              <div className="grid grid-cols-1 gap-2">
                {offerings.map((o) => (
                  <Link
                    key={o.slug}
                    to={`/services/${o.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl bg-card border border-border/60 text-sm font-medium text-foreground hover:border-accent-blue transition-colors"
                  >
                    <span>{o.title}</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-accent-purple mb-3">
                Company & Insights
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/about"
                  onClick={() => setMobileOpen(false)}
                  className="p-3 rounded-xl bg-card border border-border/60 text-xs font-semibold text-foreground text-center"
                >
                  About Us
                </Link>
                <Link
                  to="/research"
                  onClick={() => setMobileOpen(false)}
                  className="p-3 rounded-xl bg-card border border-border/60 text-xs font-semibold text-foreground text-center"
                >
                  Research
                </Link>
                <Link
                  to="/blogs"
                  onClick={() => setMobileOpen(false)}
                  className="p-3 rounded-xl bg-card border border-border/60 text-xs font-semibold text-foreground text-center"
                >
                  Blogs
                </Link>
                <Link
                  to="/case-studies"
                  onClick={() => setMobileOpen(false)}
                  className="p-3 rounded-xl bg-card border border-border/60 text-xs font-semibold text-foreground text-center"
                >
                  Case Studies
                </Link>
                <Link
                  to="/careers"
                  onClick={() => setMobileOpen(false)}
                  className="p-3 rounded-xl bg-card border border-border/60 text-xs font-semibold text-foreground text-center"
                >
                  Careers
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="p-3 rounded-xl bg-card border border-border/60 text-xs font-semibold text-foreground text-center"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-border/40 mt-6 space-y-3">
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="w-full py-3 rounded-full bg-accent-blue text-white text-center font-semibold text-sm block shadow-lg shadow-accent-blue/20"
            >
              Connect with us
            </Link>
            <p className="text-center text-xs text-muted-foreground">
              Quantum Codon — Powering the next-generation bioeconomy
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
