import PageShell from "../_PageShell";
import CareersHero from "./components/CareersHero";
import ValuesHexGrid from "./components/ValuesHexGrid";
import OpenPositions from "./components/OpenPositions";

export default function CareersPage() {
  return (
    <PageShell spotlight="from-amber-500/10 via-transparent to-transparent">
      <CareersHero />
      <ValuesHexGrid />
      <OpenPositions />
    </PageShell>
  );
}
