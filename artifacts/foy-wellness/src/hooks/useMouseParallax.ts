import { useEffect, useState, useRef } from "react";

export function useMouseParallax(strength = 20) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);
  const pending = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      pending.current = {
        x: (e.clientX / window.innerWidth - 0.5) * strength,
        y: (e.clientY / window.innerHeight - 0.5) * strength,
      };
      // Throttle state updates via rAF — avoids re-render on every mousemove
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(() => {
          setOffset({ ...pending.current });
          rafId.current = null;
        });
      }
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [strength]);

  return offset;
}