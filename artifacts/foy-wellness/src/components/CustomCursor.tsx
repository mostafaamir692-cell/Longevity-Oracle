import { useEffect, useRef, useState, useCallback } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  const isCoarse = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

  const updateHover = useCallback((e: MouseEvent) => {
    const t = e.target as HTMLElement;
    const isInteractive = !!t.closest("a, button, [role='button'], input, textarea, select, label, .cursor-pointer");
    setHovering(isInteractive);
  }, []);

  useEffect(() => {
    if (isCoarse) return;
    setActive(true);

    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      updateHover(e);
    };

    const enter = () => setVisible(true);
    const leave = () => setVisible(false);

    let rafId: number;
    const followRing = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }
      rafId = requestAnimationFrame(followRing);
    };

    document.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseenter", enter);
    document.addEventListener("mouseleave", leave);
    rafId = requestAnimationFrame(followRing);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseenter", enter);
      document.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(rafId);
    };
  }, [isCoarse, updateHover]);

  if (isCoarse || !active) return null;

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: -4,
          left: -4,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "hsl(174, 78%, 40%)",
          boxShadow: hovering
            ? "0 0 16px rgba(16,185,171,0.6), 0 0 40px rgba(16,185,171,0.3)"
            : "0 0 8px rgba(16,185,171,0.4)",
          zIndex: 99999,
          pointerEvents: "none",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s, box-shadow 0.3s",
          willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: hovering ? -24 : -18,
          left: hovering ? -24 : -18,
          width: hovering ? 48 : 36,
          height: hovering ? 48 : 36,
          borderRadius: "50%",
          border: `1.5px solid rgba(16,185,171,${hovering ? 0.5 : 0.25})`,
          background: hovering ? "rgba(16,185,171,0.06)" : "transparent",
          zIndex: 99998,
          pointerEvents: "none",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s, width 0.35s cubic-bezier(0.22,1,0.36,1), height 0.35s cubic-bezier(0.22,1,0.36,1), top 0.35s cubic-bezier(0.22,1,0.36,1), left 0.35s cubic-bezier(0.22,1,0.36,1), border 0.3s, background 0.3s",
          willChange: "transform",
        }}
      />
    </>
  );
}
