import React, { useEffect, useRef, useState } from "react";

export default function QcPreloader3D() {
  const [phase, setPhase] = useState<"playing" | "zooming" | "hidden">("playing");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Lock body scroll during preloader sequence
    document.body.style.overflow = "hidden";

    // Guarantee programmatic video playback on mount
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }

    // Continuous 0-to-full zoom-in animation -> at 4.2s start camera zoom dissolve -> exact 5.0s hard stop completion
    const timer1 = setTimeout(() => {
      setPhase("zooming");
    }, 4200);

    const timer2 = setTimeout(() => {
      setPhase("hidden");
      document.body.style.overflow = "";
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden select-none pointer-events-auto touch-none overscroll-none transition-opacity duration-1000 ${
        phase === "zooming" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ background: "#050608" }}
    >
      {/* Background Video (/d.mp4) Fitted cleanly without extreme zoom */}
      <div
        className={`absolute inset-0 flex items-center justify-center w-full h-full transition-all duration-700 ease-in-out transform-gpu ${
          phase === "zooming" ? "scale-105 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <video
          ref={videoRef}
          src="/d.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover filter brightness-[1.05] contrast-[1.15] animate-slow-zoom"
        />

        {/* Dark Vignette & Glass Glow Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,9,17,0.15)_0%,#050608_85%)] pointer-events-none" />
      </div>

      {/* Cinematic Center Title */}
      <div
        className={`relative z-20 text-center px-6 transition-all duration-700 ease-in-out transform-gpu ${
          phase === "zooming"
            ? "scale-105 opacity-0 -translate-y-2"
            : "scale-100 opacity-100 translate-y-0"
        }`}
      >
        <h1 className="font-serif-display text-5xl md:text-7xl font-normal tracking-tight text-white animate-title-glow">
          Quantum Codon
        </h1>

        <p className="mt-4 font-mono-data text-sm md:text-base font-bold uppercase text-blue-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] animate-tagline-tracking">
          Powering the Next-Generation Bioeconomy
        </p>

        {/* Ambient Pulsing Light Accent */}
        <div className="mt-6 mx-auto w-28 h-[1.5px] bg-gradient-to-r from-transparent via-accent-blue to-transparent animate-pulse" />
      </div>
    </div>
  );
}
