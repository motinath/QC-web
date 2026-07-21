import { useEffect, useRef, useState } from "react";
import { Headphones, LifeBuoy, MapPin } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";

const channels = [
  {
    icon: Headphones,
    title: "Talk to sales",
    subtitle: "Interested in our offerings? Reach out and we'll tailor a fit.",
    linkLabel: "contact@qcodon.com",
    href: "mailto:contact@qcodon.com",
    // left card: slides up from bottom
    from: "translateY(80px)",
  },
  {
    icon: LifeBuoy,
    title: "Talk to support",
    subtitle: "Already a customer? We're here whenever you need a hand.",
    linkLabel: "contact@qcodon.com",
    href: "mailto:contact@qcodon.com",
    // middle card: slides down from top
    from: "translateY(-80px)",
  },
  {
    icon: MapPin,
    title: "Visit us",
    subtitle: "Amaravati Quantum Valley, Amaravati, Andhra Pradesh 522020, India.",
    linkLabel: "View on Google Maps",
    href: "https://maps.app.goo.gl/bAURtJ7543zqQ3qG8",
    // right card: slides up from bottom
    from: "translateY(80px)",
  },
];

function AnimatedCard({
  channel,
  index,
  inView,
}: {
  channel: (typeof channels)[number];
  index: number;
  inView: boolean;
}) {
  return (
    <div
      className="rounded-2xl border border-border bg-card p-5 hover:shadow-md w-full md:w-64"
      style={{
        transform: inView ? "translateY(0)" : channel.from,
        opacity: inView ? 1 : 0,
        transition: `transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${index * 160}ms, opacity 0.9s ease ${index * 160}ms`,
      }}
    >
      <div
        className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-background"
        style={{ color: "#2563eb" }}
      >
        <channel.icon className="h-5 w-5" strokeWidth={1.5} />
      </div>
      <h3 className="mt-4 text-base font-semibold text-foreground">{channel.title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{channel.subtitle}</p>
      <a
        href={channel.href}
        className="mt-3 inline-block text-sm font-medium underline underline-offset-4 hover:opacity-75"
        style={{ color: "#2563eb" }}
      >
        {channel.linkLabel}
      </a>
    </div>
  );
}

export function ContactChannels() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        // animate in when section is well into view, reset when it leaves
        setInView(entry.isIntersecting);
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-semibold text-foreground sm:text-5xl">
              Turn Your Ideas
              <span className="font-serif-italic mt-1 block" style={{ color: "#2563eb" }}>
                into Reality
              </span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Pick the channel that works best for you. Whether you&rsquo;re scoping a new project,
              troubleshooting, or just want to say hello — we&rsquo;re listening.
            </p>
          </div>
        </Reveal>

        <div ref={gridRef} className="mt-16 flex flex-col md:flex-row justify-center gap-16">
          {channels.map((c, i) => (
            <AnimatedCard key={c.title} channel={c} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
