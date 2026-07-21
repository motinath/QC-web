import { useEffect, useState } from "react";

export default function QcPreloader() {
  const [show, setShow] = useState(true);
  const [isOpening, setIsOpening] = useState(false);
  const [fadeLogo, setFadeLogo] = useState(false);

  useEffect(() => {
    // Check if the preloader has already run in this browser tab session
    const hasLoaded = sessionStorage.getItem("qc_preloader_run");
    if (hasLoaded) {
      setShow(false);
      return;
    }

    // Lock scrolling on mobile/desktop during loading
    document.body.style.overflow = "hidden";

    // Fade out logo slightly before panels start opening
    const logoTimer = setTimeout(() => {
      setFadeLogo(true);
    }, 1600);

    // Start opening transition at 1.8s
    const openTimer = setTimeout(() => {
      setIsOpening(true);
      document.body.style.overflow = ""; // Restore scrolling when vault opens
    }, 1800);

    // Completely unmount preloader after panels swing open (1.2s panel animation + 1.8s delay = 3.0s)
    const destroyTimer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("qc_preloader_run", "true");
      document.body.style.overflow = "";
    }, 3000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(openTimer);
      clearTimeout(destroyTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 w-screen h-screen z-[9999] flex select-none overflow-hidden touch-none"
      role="presentation"
      aria-hidden="true"
    >
      {/* Left panel */}
      <div
        className={`w-1/2 h-full bg-[#08090d] border-r border-white/[0.02] ${isOpening ? "preloader-panel-left-open" : ""}`}
      />

      {/* Right panel */}
      <div
        className={`w-1/2 h-full bg-[#08090d] border-l border-white/[0.02] ${isOpening ? "preloader-panel-right-open" : ""}`}
      />

      {/* Center content overlay */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center z-10 transition-all duration-500 pointer-events-none ${fadeLogo ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
      >
        <img
          src="/logo-emblem.png"
          alt="Quantum Codon Logo"
          className="h-20 sm:h-28 w-auto object-contain animate-emblem-preload"
        />

        {/* Glow-bar loader */}
        <div className="w-36 sm:w-48 h-1 bg-white/10 rounded-full mt-6 sm:mt-8 overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-emerald rounded-full animate-preload-progress" />
        </div>

        <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-slate-300 font-mono font-bold mt-4 animate-pulse">
          Quantum Initiative
        </p>
      </div>
    </div>
  );
}
