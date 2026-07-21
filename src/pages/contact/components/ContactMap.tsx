import { MapPin, Navigation, ExternalLink, Microscope } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import buildingImg from "../office-building.jpg";

export function ContactMap() {
  const mapSearchUrl = "https://maps.app.goo.gl/id9xQDzeWBkxHSt28";
  // Standard embeddable Google Maps query URL
  const embedMapUrl =
    "https://maps.google.com/maps?q=Sy.%20No.%2053,%20IT%20Park%20Rd,%20Kesarapalli,%20Gannavaram,%20Andhra%20Pradesh%20521102,%20India&t=&z=14&ie=UTF8&iwloc=&output=embed";

  return (
    <section className="px-6 py-12 md:py-20 bg-[#f0f4f8]/50 dark:bg-[#0c131f]/50 transition-colors duration-300 border-t border-b border-border/10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left side: Address & Details */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-blue block">
                Our Headquarters
              </span>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl font-serif-display leading-tight">
                Flagship Corporate Laboratory
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Located in the heart of Andhra Pradesh's quantum research corridor, our flagship
                laboratory facility houses the computational nodes, molecular genetics host
                engineering platforms, and bio-validation benches that power the Deep Codon
                Initiative.
              </p>

              <div className="p-6 rounded-2xl border border-border/10 bg-white/40 dark:bg-black/20 shadow-sm backdrop-blur-sm space-y-4 hover:shadow-md transition-all duration-300">
                <div className="flex gap-4">
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-accent-blue/10 text-accent-blue shrink-0 border border-accent-blue/10">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">Quantum Codon Pvt Ltd</h3>
                    <p className="text-muted-foreground text-xs mt-2 leading-relaxed">
                      Sy. No. 53, IT Park Rd, Kesarapalli, Gannavaram,
                      <br />
                      Andhra Pradesh 521102,
                      <br />
                      India
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-foreground/5 flex flex-wrap gap-3">
                  <a
                    href={mapSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-accent-blue text-white shadow-lg shadow-accent-blue/20 hover:opacity-90 transition-all duration-300"
                  >
                    <Navigation className="h-3 w-3" />
                    Get Directions
                  </a>
                  <a
                    href={mapSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border border-border text-muted-foreground hover:text-foreground transition-all duration-300"
                  >
                    Open in Google Maps
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right side: Building Photo + Map Cards Side-by-Side */}
            <div className="lg:col-span-7 w-full">
              <Reveal delay={150}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Building Photo Card */}
                  <a
                    href={mapSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-border/10 shadow-lg hover:shadow-xl hover:border-accent-blue/25 transition-all duration-500 bg-[#091b2c]"
                  >
                    <img
                      src={buildingImg}
                      alt="Quantum Codon Flagship Laboratory Building"
                      className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-accent-blue/[0.02] transition-colors duration-300 flex items-end p-4">
                      <span className="px-3 py-1.5 rounded-full bg-slate-900/90 text-white text-[9px] font-semibold tracking-wider uppercase shadow backdrop-blur flex items-center gap-1">
                        <Microscope className="h-3 w-3 text-accent-blue" />
                        Flagship Facility
                      </span>
                    </div>
                  </a>

                  {/* Embedded Iframe Map Card */}
                  <a
                    href={mapSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-border/10 shadow-lg hover:shadow-xl hover:border-accent-blue/25 transition-all duration-500 bg-[#091b2c]"
                  >
                    <iframe
                      title="Quantum Codon Office Location Map"
                      src={embedMapUrl}
                      className="w-full h-full border-0 pointer-events-none transition-transform duration-700 group-hover:scale-[1.015] dark:opacity-85"
                      allowFullScreen={false}
                      loading="lazy"
                      style={{
                        filter: "contrast(1.1) saturate(0.9) brightness(0.95)",
                      }}
                    />

                    {/* Absolute Link Click Overlay */}
                    <div className="absolute inset-0 bg-transparent group-hover:bg-accent-blue/[0.02] transition-colors duration-300 flex items-center justify-center cursor-pointer">
                      <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 px-4 py-2 rounded-full bg-slate-900/95 text-white text-[9px] font-semibold shadow-lg backdrop-blur flex items-center gap-1.5">
                        <Navigation className="h-3.5 w-3.5" />
                        Open Google Maps
                      </div>
                    </div>
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
