import React, { useEffect, useRef } from "react";

export default function DnaHelix3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;

    // Track component mount time for continuous animation
    const startTime = Date.now();

    // 3D scene parameters
    const cameraDistance = 350;
    const fov = 300;

    // DNA Geometry Config
    const numNodes = 26; // Number of base pairs along the helix
    const spacing = 9; // Vertical distance between successive base pairs
    const helixRadius = 42;
    const turns = 1.3; // How many times it wraps (turns * 2 * PI)

    // Particle Config
    const numParticles = 40;
    const particles: {
      x: number;
      y: number;
      z: number;
      size: number;
      speedY: number;
      amplitude: number;
      phase: number;
    }[] = [];

    // Initialize random floating background particles
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 350,
        y: (Math.random() - 0.5) * 350,
        z: (Math.random() - 0.5) * 350,
        size: Math.random() * 2 + 1,
        speedY: -0.2 - Math.random() * 0.3,
        amplitude: Math.random() * 20 + 5,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Resize handler
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      // Support high-DPI screens for crisp visuals
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    const resizeObserver = new ResizeObserver(() => handleResize());
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // 3D Point Interface
    interface DrawItem {
      type: "node" | "rung-node" | "particle";
      x3: number;
      y3: number;
      z3: number;
      scale: number;
      screenX: number;
      screenY: number;
      // Drawing styles
      colorType: "strandA" | "strandB" | "rung" | "particle";
      rungRatio?: number; // 0 (Strand A) to 1 (Strand B)
      baseSize: number;
    }

    // Render loop
    const render = () => {
      const time = (Date.now() - startTime) / 1000;

      // Clear with background color and draw a rich, ambient dark-blue background gradient
      // resembling the 2nd picture (deep cyan/blue space with warm backlight)
      ctx.fillStyle = "#0a1622";
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw background glow
      const radialGlow = ctx.createRadialGradient(
        centerX - 30,
        centerY - 40,
        10,
        centerX,
        centerY,
        Math.max(width, height) * 0.8,
      );
      radialGlow.addColorStop(0, "#1c3858"); // Lighter core
      radialGlow.addColorStop(0.5, "#0b1b2f"); // Mid-tone blue
      radialGlow.addColorStop(1, "#040a12"); // Dark edge
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // Draw soft lighting beams (sunrays) from top-left, matching the 2nd image's lighting
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      const beamGrad = ctx.createLinearGradient(0, 0, width * 0.7, height * 0.7);
      beamGrad.addColorStop(0, "rgba(100, 180, 255, 0.12)");
      beamGrad.addColorStop(0.3, "rgba(140, 100, 220, 0.04)");
      beamGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = beamGrad;
      // Draw 3 triangular light cones
      for (let angleOffset = 0; angleOffset < 3; angleOffset++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        const endAngle1 = (15 + angleOffset * 22) * (Math.PI / 180);
        const endAngle2 = (30 + angleOffset * 22) * (Math.PI / 180);
        ctx.lineTo(Math.cos(endAngle1) * width * 1.5, Math.sin(endAngle1) * height * 1.5);
        ctx.lineTo(Math.cos(endAngle2) * width * 1.5, Math.sin(endAngle2) * height * 1.5);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // Dynamic rotation angles
      // Y-axis = Continuous slow rotation
      const rotY = time * 0.55;
      // X-axis = tilt forward slightly + slow sway
      const rotX = 0.5 + Math.sin(time * 0.4) * 0.05;
      // Z-axis = diagonal axis alignment + tiny sway
      const rotZ = -0.55 + Math.cos(time * 0.3) * 0.04;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosZ = Math.cos(rotZ);
      const sinZ = Math.sin(rotZ);

      // Helper function to rotate and project a 3D point (x, y, z)
      const project = (x: number, y: number, z: number) => {
        // 1. Rotate Y (Continuous axis spin)
        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;
        const y1 = y;

        // 2. Rotate X (Tilt)
        const y2 = y1 * cosX - z1 * sinX;
        const z2 = y1 * sinX + z1 * cosX;
        const x2 = x1;

        // 3. Rotate Z (Diagonal alignment)
        const x3 = x2 * cosZ - y2 * sinZ;
        const y3 = x2 * sinZ + y2 * cosZ;
        const z3 = z2;

        // 4. Perspective projection
        const scale = fov / (fov + z3 + cameraDistance);
        const screenX = centerX + x3 * scale;
        const screenY = centerY + y3 * scale;

        return { x3, y3, z3, scale, screenX, screenY };
      };

      const drawItems: DrawItem[] = [];

      // 1. Process and add Background Floating Particles (Bokeh)
      particles.forEach((p) => {
        // Slow Y-drifting motion
        p.y += p.speedY;
        // Horizontal drifting oscillation
        const driftX = Math.sin(time * 0.5 + p.phase) * 0.2;
        p.x += driftX;

        // Wrap around bounds
        if (p.y < -200) p.y = 200;
        if (p.y > 200) p.y = -200;
        if (p.x < -200) p.x = 200;
        if (p.x > 200) p.x = -200;

        const proj = project(p.x, p.y, p.z);
        drawItems.push({
          type: "particle",
          ...proj,
          colorType: "particle",
          baseSize: p.size,
        });
      });

      // 2. Process and add DNA Helix Strands (Backbone + Rungs)
      const helixHeight = (numNodes - 1) * spacing;

      for (let i = 0; i < numNodes; i++) {
        // Theta angle along the helix
        const t = (i / (numNodes - 1)) * Math.PI * 2 * turns;
        const y = (i / (numNodes - 1)) * helixHeight - helixHeight / 2;

        // Strand A coordinates
        const xa = helixRadius * Math.cos(t);
        const za = helixRadius * Math.sin(t);

        // Strand B coordinates (180 degree offset)
        const xb = helixRadius * Math.cos(t + Math.PI);
        const zb = helixRadius * Math.sin(t + Math.PI);

        // Project backbone nodes
        const projA = project(xa, y, za);
        const projB = project(xb, y, zb);

        // Add Strand A node (Pink)
        drawItems.push({
          type: "node",
          ...projA,
          colorType: "strandA",
          baseSize: 10.5, // Large sphere size for DNA backbone
        });

        // Add Strand B node (Blue)
        drawItems.push({
          type: "node",
          ...projB,
          colorType: "strandB",
          baseSize: 10.5,
        });

        // Draw connecting rungs (Base Pairs)
        // Instead of a simple single line, we draw a series of intermediate beads
        // to match the gorgeous, high-detail atomic look of the 2nd photo.
        const numRungNodes = 6;
        for (let j = 1; j < numRungNodes; j++) {
          const ratio = j / numRungNodes;
          // Interpolate coordinates
          const rx = xa + (xb - xa) * ratio;
          const ry = y; // Both strands share the same vertical height coordinate
          const rz = za + (zb - za) * ratio;

          const projRung = project(rx, ry, rz);
          drawItems.push({
            type: "rung-node",
            ...projRung,
            colorType: "rung",
            rungRatio: ratio,
            baseSize: 4.8, // Smaller bead size for connecting base pairs
          });
        }
      }

      // 3. Depth Sorting (Painters Algorithm)
      // Sort in descending order of z3 (depth value)
      // High z3 is furthest away (draw first), low z3 is closest (draw last)
      drawItems.sort((a, b) => b.z3 - a.z3);

      // 4. Render All Depth-Sorted Items
      drawItems.forEach((item) => {
        const radius = item.baseSize * item.scale;
        if (radius <= 0.1) return;

        ctx.save();

        if (item.type === "particle") {
          // Soft out-of-focus background glow particles (Bokeh)
          const grad = ctx.createRadialGradient(
            item.screenX,
            item.screenY,
            0,
            item.screenX,
            item.screenY,
            radius * 4,
          );
          // Blended teal-blue particle
          grad.addColorStop(0, "rgba(100, 220, 255, 0.4)");
          grad.addColorStop(0.3, "rgba(80, 140, 230, 0.15)");
          grad.addColorStop(1, "rgba(0, 0, 0, 0)");

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(item.screenX, item.screenY, radius * 4, 0, Math.PI * 2);
          ctx.fill();
        } else if (item.type === "node") {
          // Main DNA Backbone Nodes (Spheres with 3D Shading)
          ctx.beginPath();
          ctx.arc(item.screenX, item.screenY, radius, 0, Math.PI * 2);

          // Specular highlights slightly shifted top-left to simulate 3D volume
          const grad = ctx.createRadialGradient(
            item.screenX - radius * 0.3,
            item.screenY - radius * 0.3,
            radius * 0.08,
            item.screenX,
            item.screenY,
            radius,
          );

          if (item.colorType === "strandA") {
            // Pink/Rose color palette (2nd picture)
            grad.addColorStop(0, "#ffb3d9"); // Specular highlight
            grad.addColorStop(0.2, "#ff7db6"); // Core pink
            grad.addColorStop(0.7, "#d81b7a"); // Mid rose
            grad.addColorStop(1, "#660033"); // Ambient shadow
          } else {
            // Blue/Cyan color palette (2nd picture)
            grad.addColorStop(0, "#dffcff"); // Specular highlight
            grad.addColorStop(0.2, "#64dfdf"); // Light cyan
            grad.addColorStop(0.7, "#00b4d8"); // Strong blue
            grad.addColorStop(1, "#003b5c"); // Deep blue shadow
          }

          ctx.fillStyle = grad;
          ctx.shadowColor =
            item.colorType === "strandA" ? "rgba(216, 27, 122, 0.4)" : "rgba(0, 180, 216, 0.4)";
          ctx.shadowBlur = radius * 0.5;
          ctx.fill();
        } else if (item.type === "rung-node") {
          // Rung bead: color transitions from Strand A (Pink) to Strand B (Blue)
          ctx.beginPath();
          ctx.arc(item.screenX, item.screenY, radius, 0, Math.PI * 2);

          const grad = ctx.createRadialGradient(
            item.screenX - radius * 0.25,
            item.screenY - radius * 0.25,
            radius * 0.05,
            item.screenX,
            item.screenY,
            radius,
          );

          const ratio = item.rungRatio || 0.5;

          // Interpolated colors from pink (0) to blue (1)
          if (ratio < 0.33) {
            // Mostly pink
            grad.addColorStop(0, "#ffaed1");
            grad.addColorStop(0.4, "#e05b9b");
            grad.addColorStop(1, "#5e0033");
          } else if (ratio < 0.66) {
            // Purple blend
            grad.addColorStop(0, "#ecd1ff");
            grad.addColorStop(0.4, "#b364e6");
            grad.addColorStop(1, "#440d6c");
          } else {
            // Mostly blue
            grad.addColorStop(0, "#cefaff");
            grad.addColorStop(0.4, "#3cb1e6");
            grad.addColorStop(1, "#044265");
          }

          ctx.fillStyle = grad;
          ctx.fill();
        }

        ctx.restore();
      });

      animationId = requestAnimationFrame(render);
    };

    // Start rendering
    render();

    // Clean up
    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="w-full h-full block" style={{ background: "transparent" }} />
  );
}
