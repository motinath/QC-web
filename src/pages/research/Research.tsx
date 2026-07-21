import { useState, useEffect } from "react";
import PageShell from "../_PageShell";
import { QcUntapped } from "./components/QcUntapped";
import { QcClasses } from "./components/QcClasses";
import { QcResults } from "./components/QcResults";
import { QcPipeline } from "@/components/shared/QcPipeline";
import { QcPaper } from "./components/QcPaper";

export default function ResearchPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Platform Overview" },
    { id: "classes", label: "Classes I & II" },
    { id: "results", label: "Proof & Results" },
    { id: "publications", label: "Publications" },
  ];

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const cleanHash = hash.replace("#", "");
      if (cleanHash === "platform" || cleanHash === "pipeline") {
        setActiveTab("overview");
      } else if (cleanHash === "classes") {
        setActiveTab("classes");
      } else if (cleanHash === "results") {
        setActiveTab("results");
      } else if (cleanHash === "paper") {
        setActiveTab("publications");
      }
    }
  }, []);

  return (
    <PageShell className="!pb-0" spotlight="from-accent-emerald/15 via-transparent to-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <p className="badge-meta text-accent-blue">Scientific Platform</p>
        <h1 className="heading-hero mt-4">Dark Genome Research</h1>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          Explore our experimental proof, genomic classifications, and the technological framework
          behind the Deep Codon Initiative.
        </p>

        {/* Tab Switcher */}
        <div className="flex flex-wrap justify-center gap-2.5 mt-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                // Also update hash to keep links working
                if (tab.id === "overview") window.location.hash = "platform";
                else if (tab.id === "classes") window.location.hash = "classes";
                else if (tab.id === "results") window.location.hash = "results";
                else if (tab.id === "publications") window.location.hash = "paper";
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-mono-data uppercase font-semibold tracking-wider transition-all duration-300 border focus-visible:ring-2 focus-visible:ring-accent-blue ${
                activeTab === tab.id
                  ? "bg-foreground text-background border-foreground shadow-md font-semibold"
                  : "bg-white/5 border-white/10 hover:bg-white/10 text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
        {activeTab === "overview" && (
          <div>
            <QcUntapped />
            <QcPipeline />
          </div>
        )}
        {activeTab === "classes" && <QcClasses />}
        {activeTab === "results" && <QcResults />}
        {activeTab === "publications" && <QcPaper />}
      </div>
    </PageShell>
  );
}
