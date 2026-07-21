import contactImg from "../contact.png";
import { PillButton } from "./PillButton";
import { Reveal } from "@/components/shared/Reveal";

export function ContactHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-grid-bg absolute inset-0 -z-10" />
      <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-background to-transparent" />

      <div className="mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-12 px-6 py-[clamp(5rem,10vw,7rem)]">
        <Reveal>
          <div className="max-w-xl">
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Contact
            </p>
            <h1
              className="font-semibold leading-[1.1] text-foreground"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3.25rem)" }}
            >
              <span className="block">Your Goals,</span>
              <span className="block">Our Commitment</span>
              <span className="font-serif-italic mt-2 block" style={{ color: "#2563eb" }}>
                — Let&rsquo;s Build Together
              </span>
            </h1>
            <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
              Tell us what you&rsquo;re building and we&rsquo;ll help you ship it. Our team replies
              to every message within one business day.
            </p>
            <div className="mt-10">
              <PillButton asChildHref="#form">Get in touch</PillButton>
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="relative">
            <div
              className="absolute -bottom-6 -right-6 h-3/4 w-3/4 rounded-3xl md:-bottom-8 md:-right-8"
              style={{ backgroundColor: "#2563eb" }}
            />
            <div className="relative overflow-hidden rounded-3xl shadow-xl ring-1 ring-border">
              <img
                src={contactImg}
                alt="Customer support specialist with headset working at a laptop"
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
