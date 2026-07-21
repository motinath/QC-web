import { Link } from "@/lib/router-compat";
import { ContactHero } from "./components/ContactHero";
import { ContactChannels } from "./components/ContactChannels";
import { ContactMap } from "./components/ContactMap";
import { ContactForm } from "./components/ContactForm";

export default function Contact() {
  return (
    <div className="pt-24 pb-16 min-h-screen transition-colors duration-300 bg-background text-foreground relative overflow-hidden">
      {/* Premium Spotlight Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-gradient-to-b from-accent-blue/15 via-transparent to-transparent blur-[120px] rounded-full pointer-events-none -z-10 opacity-60 dark:opacity-40" />

      <div className="max-w-6xl mx-auto px-6 mb-8 relative z-10">
        <Link
          to="/"
          className="text-xs tracking-[0.25em] uppercase text-muted-foreground hover:text-foreground transition"
        >
          ← Back to home
        </Link>
      </div>

      <div className="relative z-10">
        <ContactHero />
        <ContactChannels />
        <ContactMap />
        <ContactForm />
      </div>
    </div>
  );
}
