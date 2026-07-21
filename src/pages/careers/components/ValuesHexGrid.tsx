import { useState } from "react";
import { Infinity as InfinityIcon } from "lucide-react";

type Value = {
  title: string;
  body: string;
  accent: string;
  image: string;
};

const VALUES: Value[] = [
  {
    title: "We act boldly with integrity.",
    body: "Curiosity, not convention, drives every hypothesis we test. We push the science even when it's hard.",
    accent: "#a435c4",
    image: "/hex-microscope.png",
  },
  {
    title: "We move with urgency because patients are waiting.",
    body: "We compress discovery cycles without ever compromising the science behind them.",
    accent: "#e6542b",
    image: "/hex-rocket.png",
  },
  {
    title: "We care deeply and engage directly.",
    body: "Open notebooks, candid reviews, fast feedback. We're better together than apart.",
    accent: "#d6248c",
    image: "/hex-gears.png",
  },
  {
    title: "We take ownership and accountability.",
    body: "From wet-lab to wet-ware, every teammate carries the work — and the responsibility — end to end.",
    accent: "#2bb24a",
    image: "/hex-mountain.png",
  },
  {
    title: "We learn actively and adapt rapidly.",
    body: "We grow faster when we share what we got wrong. Iteration is our default mode.",
    accent: "#e0a52b",
    image: "/hex-lightbulb.png",
  },
  {
    title: "We are One Codon.",
    body: "Biologists, physicists, and engineers in the same room. One mission, one team, zero silos.",
    accent: "#1f7fb0",
    image: "/hex-infinity.png",
  },
];

function HexCard({ value, index }: { value: Value; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="hex-flip group"
      onClick={() => setFlipped((f) => !f)}
      onMouseLeave={() => setFlipped(false)}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className={`hex-flip-inner ${flipped ? "is-flipped" : ""}`}>
        {/* FRONT */}
        <div className="hex-face hex-face-front" style={{ backgroundColor: value.accent }}>
          {/* photographic background, desaturated and multiplied with the accent */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${value.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "grayscale(100%) contrast(1.05) brightness(0.9)",
              mixBlendMode: "multiply",
              opacity: 0.85,
            }}
          />

          {/* solid color wash on top to unify into a duotone */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: value.accent,
              mixBlendMode: "screen",
              opacity: 0.25,
            }}
          />

          {/* title — top-left, white, with inline arrow at end */}
          <div className="relative z-10 flex h-full w-full items-start justify-start px-[14%] pt-[26%]">
            <p className="text-left text-white text-[0.95rem] md:text-[1.05rem] leading-[1.25] font-medium tracking-[-0.005em]">
              {value.title}{" "}
              <span aria-hidden className="inline-block translate-y-[1px]">
                →
              </span>
            </p>
          </div>
        </div>

        {/* BACK */}
        <div
          className="hex-face hex-face-back"
          style={{
            backgroundColor: value.accent,
          }}
        >
          <div className="flex h-full w-full flex-col items-start justify-center px-[14%] text-left">
            <p className="text-white text-[0.95rem] md:text-[1.05rem] leading-[1.25] font-medium">
              {value.title}
            </p>
            <div className="my-3 h-[2px] w-10 rounded-full bg-white/60" />
            <p className="text-[12px] md:text-[13px] text-white/90 leading-relaxed">{value.body}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ValuesHexGrid() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-[#f7f5f0]">
      {/* faint background honeycomb */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='156' viewBox='0 0 180 156'><g fill='none' stroke='%23b8b2a3' stroke-width='1'><polygon points='45,4 86,27 86,73 45,96 4,73 4,27'/><polygon points='135,4 176,27 176,73 135,96 94,73 94,27'/><polygon points='90,58 131,81 131,127 90,150 49,127 49,81'/></g></svg>\")",
          backgroundSize: "180px 156px",
        }}
      />
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-bagel text-[clamp(1.75rem,4vw,3rem)] leading-[1.1] text-[#1a1a1a]">
            <span
              style={{
                background: "linear-gradient(90deg, #7c3aed 0%, #5b21b6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Six values.
            </span>{" "}
            One operating system.
          </h2>
          <div className="mx-auto mt-3 h-[2px] w-20 rounded-full bg-[linear-gradient(90deg,#c084fc,#f59e0b)]" />
          <p className="mt-5 text-sm md:text-base text-[#5a5a5a]">
            Hover or tap each value to read how we work.
            <br className="hidden md:block" />
            These aren&apos;t posters on a wall — they&apos;re the decisions we make every day.
          </p>
        </div>

        {/* honeycomb grid */}
        <div className="hex-grid mt-14">
          {VALUES.map((v, i) => (
            <HexCard key={v.title} value={v} index={i} />
          ))}
        </div>

        <div className="relative mt-12 flex items-center justify-center gap-2 text-sm text-[#5a5a5a]">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent-purple/10 text-accent-purple">
            <InfinityIcon className="h-4 w-4" />
          </span>
          <span>
            Different strengths. Shared purpose.{" "}
            <span className="text-accent-purple font-medium">One Codon.</span>
          </span>
        </div>
      </div>
    </section>
  );
}
