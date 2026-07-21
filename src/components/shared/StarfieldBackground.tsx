import { useEffect, useMemo, useRef } from "react";
import { useTheme } from "./ThemeProvider";

type Star = { x: number; y: number; r: number; tw: number; phase: number };

export default function StarfieldBackground() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  // Pre-generate stars once; positions are normalized 0..1.
  const stars = useMemo<Star[]>(() => {
    const count = 140;
    const arr: Star[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 1.1 + 0.3,
        tw: Math.random() * 0.7 + 0.3,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return arr;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    // Shooting star state
    let shooting: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
    } | null = null;
    let nextShootingAt = performance.now() + 4000 + Math.random() * 5000;

    function spawnShooting(now: number) {
      const startX = Math.random() * width * 0.7;
      const startY = Math.random() * height * 0.4;
      const speed = 9 + Math.random() * 5;
      shooting = {
        x: startX,
        y: startY,
        vx: speed,
        vy: speed * 0.45,
        life: 0,
        maxLife: 700,
      };
      nextShootingAt = now + 6000 + Math.random() * 8000;
    }

    const isDark = theme === "dark";

    function draw(now: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      if (isDark) {
        // Orbit lines
        ctx.save();
        ctx.strokeStyle = "rgba(160, 180, 255, 0.06)";
        ctx.lineWidth = 1;
        const cx = width * 0.7;
        const cy = height * 0.35;
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          const rx = 220 + i * 140;
          const ry = 90 + i * 60;
          ctx.ellipse(cx, cy, rx, ry, Math.PI / 6, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      }

      // Stars / dots
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const sx = s.x * width;
        const sy = s.y * height;
        const twinkle = isDark
          ? 0.45 + Math.sin(now * 0.002 * s.tw + s.phase) * 0.45
          : 0.18 + Math.sin(now * 0.001 * s.tw + s.phase) * 0.08;
        const radius = isDark ? s.r : s.r * 0.55;
        ctx.beginPath();
        ctx.fillStyle = isDark
          ? `rgba(220, 230, 255, ${Math.max(0.05, Math.min(1, twinkle))})`
          : `rgba(60, 80, 120, ${Math.max(0.04, Math.min(0.18, twinkle))})`;
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      if (isDark) {
        // Shooting star
        if (!shooting && now >= nextShootingAt) spawnShooting(now);
        if (shooting) {
          shooting.life += 16;
          shooting.x += shooting.vx;
          shooting.y += shooting.vy;
          const alpha = Math.max(0, 1 - shooting.life / shooting.maxLife);
          const tailX = shooting.x - shooting.vx * 10;
          const tailY = shooting.y - shooting.vy * 10;
          const grad = ctx.createLinearGradient(shooting.x, shooting.y, tailX, tailY);
          grad.addColorStop(0, `rgba(255, 255, 255, ${0.9 * alpha})`);
          grad.addColorStop(1, "rgba(255, 255, 255, 0)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(shooting.x, shooting.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();
          if (
            shooting.life > shooting.maxLife ||
            shooting.x > width + 100 ||
            shooting.y > height + 100
          ) {
            shooting = null;
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [theme, stars]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ opacity: theme === "dark" ? 0.9 : 0.6 }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
