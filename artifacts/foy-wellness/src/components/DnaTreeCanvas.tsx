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

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      
      const numPoints = 80;
      const spacing = canvas.height / numPoints;
      
      time += 0.02;

      for (let i = 0; i < numPoints; i++) {
        const y = i * spacing;
        // Calculate x offset for two strands
        const offset = Math.sin(i * 0.15 + time) * 60;
        
        const x1 = centerX + offset;
        const x2 = centerX - offset;

        // Draw connecting rung
        if (i % 3 === 0) {
          ctx.beginPath();
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
          ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Draw strand 1 (Teal)
        ctx.beginPath();
        ctx.arc(x1, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#0D9488";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#0D9488";
        ctx.fill();

        // Draw strand 2 (Gold)
        ctx.beginPath();
        ctx.arc(x2, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#D4AF37";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#D4AF37";
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
      className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen"
    />
  );
}
