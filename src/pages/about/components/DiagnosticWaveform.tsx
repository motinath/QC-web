import React, { useEffect, useState } from "react";

export function DiagnosticWaveform({ status }: { status: string }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let animId: number;
    const tick = () => {
      setPhase((p) => p + 0.01);
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  const points = [];
  const width = 250;
  const height = 40;

  // Custom amplitudes and frequencies based on warning status
  const amp = status.includes("CRITICAL") ? 14 : status.includes("BLOCKED") ? 10 : 7;
  const freq = status.includes("CRITICAL") ? 0.035 : status.includes("BLOCKED") ? 0.025 : 0.018;

  for (let x = 0; x <= width; x += 6) {
    const y = height / 2 + Math.sin(x * freq + phase) * amp * (Math.sin(x * 0.006) + 0.35);
    points.push(`${x},${y}`);
  }

  const d = `M ${points.join(" L ")}`;

  return (
    <svg className="w-full h-full" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <line x1="0" y1="20" x2="250" y2="20" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        className="text-rose-500/80 drop-shadow-[0_0_2px_rgba(239,68,68,0.4)]"
      />
    </svg>
  );
}
