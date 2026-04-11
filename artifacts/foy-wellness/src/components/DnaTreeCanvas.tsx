import { useEffect, useRef } from "react";

export function DnaTreeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    let frameCount = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    const draw = () => {
      frameCount++;
      // Throttle to ~30fps by skipping every other frame
      if (frameCount % 2 !== 0) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;

      // Reduced from 80 to 40 points — halves the draw calls per frame
      const numPoints = 40;
      const spacing = canvas.height / numPoints;

      time += 0.015;

      // Disable shadow before loop — shadowBlur forces software rendering
      ctx.shadowBlur = 0;

      for (let i = 0; i < numPoints; i++) {
        const y = i * spacing;
        const offset = Math.sin(i * 0.15 + time) * 60;
        const x1 = centerX + offset;
        const x2 = centerX - offset;

        if (i % 3 === 0) {
          ctx.beginPath();
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
          ctx.strokeStyle = "rgba(67, 168, 163, 0.12)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(x1, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(67, 168, 163, 0.55)";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x2, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(197, 165, 114, 0.45)";
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none opacity-50"
    />
  );
}
