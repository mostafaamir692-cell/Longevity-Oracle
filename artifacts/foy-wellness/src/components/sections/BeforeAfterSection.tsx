import { useState, useRef, useEffect } from "react";
import { FadeIn } from "../animations/FadeIn";
import { MoveHorizontal } from "lucide-react";

export function BeforeAfterSection() {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPos(percent);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const stopDragging = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", stopDragging);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", stopDragging);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", stopDragging);
    };
  }, [isDragging]);

  return (
    <section id="results" className="py-24 bg-background relative z-10">
      <div className="max-w-5xl mx-auto px-6 md:px-8 text-center">
        <FadeIn mb-16>
          <span className="text-primary font-semibold tracking-widest uppercase text-sm mb-4 block">Real Results</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Visual Transformations</h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            See the profound impact of our holistic regenerative protocols on skin vitality, firmness, and overall youthfulness.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div 
            ref={containerRef}
            className="relative w-full aspect-square md:aspect-[16/9] rounded-3xl overflow-hidden cursor-ew-resize select-none touch-none border border-white/10 shadow-2xl"
            onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
            onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX); }}
          >
            {/* Before Image (Background) - Using gradient placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-stone-900 flex items-center justify-start p-8">
               <span className="absolute top-6 left-6 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-white/80 font-medium text-sm tracking-wider">BEFORE</span>
               <div className="w-full h-full opacity-30 flex items-center justify-center text-4xl font-display text-white/20">Dull & Fatigued</div>
            </div>

            {/* After Image (Foreground, clipped) */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-teal-800 via-emerald-900 to-black flex items-center justify-end p-8"
              style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
            >
              <span className="absolute top-6 right-6 px-4 py-2 bg-primary/80 backdrop-blur-md rounded-full text-white font-medium text-sm tracking-wider shadow-lg">AFTER (12 Weeks)</span>
              <div className="w-full h-full opacity-50 flex items-center justify-center text-4xl font-display text-white/40">Radiant & Revitalized</div>
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-ew-resize z-20"
              style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <MoveHorizontal className="text-primary w-6 h-6" />
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
