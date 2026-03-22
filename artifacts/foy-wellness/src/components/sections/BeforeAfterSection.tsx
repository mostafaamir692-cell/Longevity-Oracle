import { useState, useRef, useEffect } from "react";
import { FadeIn } from "../animations/FadeIn";
import { MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

type TabKey = "skin" | "hair" | "aging";

export function BeforeAfterSection() {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("skin");
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
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", stopDragging);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", stopDragging);
    };
  }, [isDragging]);

  const tabs = [
    { id: "skin", label: "Skin Rejuvenation" },
    { id: "hair", label: "Hair Restoration" },
    { id: "aging", label: "Anti-Aging" }
  ] as const;

  const content = {
    skin: {
      before: "from-neutral-800 to-stone-900",
      beforeText: "Dull, Fine Lines",
      after: "from-teal-800 via-emerald-900 to-black",
      afterText: "Radiant, Firm Skin"
    },
    hair: {
      before: "from-gray-800 to-gray-900",
      beforeText: "Thinning, Loss",
      after: "from-primary/80 via-blue-900 to-black",
      afterText: "Density & Growth"
    },
    aging: {
      before: "from-zinc-800 to-zinc-950",
      beforeText: "Fatigue, Cellular Aging",
      after: "from-amber-900 via-orange-950 to-black",
      afterText: "Vitality Restored"
    }
  };

  return (
    <section id="results" className="py-24 bg-background relative z-10">
      <div className="max-w-5xl mx-auto px-6 md:px-8 text-center">
        <FadeIn mb-12>
          <span className="text-primary font-semibold tracking-widest uppercase text-sm mb-4 block">Real Results</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Visual Transformations</h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            See the profound impact of our holistic regenerative protocols on skin vitality, firmness, and overall youthfulness.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mb-10">
          <div className="flex flex-wrap justify-center gap-4">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSliderPos(50); }}
                className={cn(
                  "px-6 py-2 rounded-full font-medium transition-all duration-300 border",
                  activeTab === tab.id 
                    ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(13,148,136,0.3)]" 
                    : "bg-transparent text-foreground/70 border-white/10 hover:bg-white/5"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div 
            ref={containerRef}
            className="relative w-full aspect-square md:aspect-[16/9] rounded-3xl overflow-hidden cursor-ew-resize select-none touch-none border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-black"
            onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
            onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX); }}
          >
            {/* Before Image (Background) */}
            <div className={cn("absolute inset-0 bg-gradient-to-br flex flex-col items-center justify-center p-8 transition-colors duration-1000", content[activeTab].before)}>
               <span className="absolute top-6 left-6 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full text-white/80 font-medium text-sm tracking-wider border border-white/10">BEFORE</span>
               <div className="w-full h-full opacity-30 flex items-center justify-start md:pl-20 text-3xl md:text-5xl font-display text-white/40">{content[activeTab].beforeText}</div>
            </div>

            {/* After Image (Foreground, clipped) */}
            <div 
              className={cn("absolute inset-0 bg-gradient-to-br flex flex-col items-center justify-center p-8 transition-colors duration-1000", content[activeTab].after)}
              style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
            >
              <span className="absolute top-6 right-6 px-4 py-2 bg-primary/80 backdrop-blur-md rounded-full text-white font-medium text-sm tracking-wider shadow-[0_0_15px_rgba(13,148,136,0.5)] border border-white/20">AFTER (12 Weeks)</span>
              <div className="w-full h-full opacity-60 flex items-center justify-end md:pr-20 text-3xl md:text-5xl font-display text-white/80">{content[activeTab].afterText}</div>
            </div>

            {/* Slider Divider */}
            <div 
              className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] cursor-ew-resize z-20 pointer-events-none"
              style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-transform border-4 border-primary/20 hover:scale-110 pointer-events-auto">
                <MoveHorizontal className="text-primary w-6 h-6" />
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
