import { useState, useRef, useEffect } from "react";
import { FadeIn } from "../animations/FadeIn";
import { MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

type TabKey = "skin" | "hair" | "aging";

const BASE = import.meta.env.BASE_URL;
const V = "?v=4";

const content: Record<TabKey, {
  img: string;
  beforeLabel: string;
  afterLabel: string;
  title: string;
  description: string;
}> = {
  skin: {
    img: `${BASE}images/skin.jpg${V}`,
    beforeLabel: "Dull · Uneven · Fatigued",
    afterLabel: "Radiant · Even · Luminous",
    title: "Skin Rejuvenation",
    description: "HydraFacial + PRP + Exosome Therapy — 8 weeks"
  },
  hair: {
    img: `${BASE}images/hair.jpg${V}`,
    beforeLabel: "Thinning · Sparse · Fragile",
    afterLabel: "Full · Dense · Restored",
    title: "Hair Restoration",
    description: "PRP + Exosome Hair Therapy — 12 weeks"
  },
  aging: {
    img: `${BASE}images/aging.jpg${V}`,
    beforeLabel: "Fine Lines · Sagging · Tired",
    afterLabel: "Lifted · Firm · Youthful",
    title: "Anti-Aging Protocol",
    description: "Peptide Therapy + Laser + NAD+ — 10 weeks"
  }
};

export function BeforeAfterSection() {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("skin");
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  const handleMouseMove = (e: MouseEvent) => { if (isDragging) handleMove(e.clientX); };
  const handleTouchMove = (e: TouchEvent) => { if (isDragging) handleMove(e.touches[0].clientX); };
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

  const tabs: { id: TabKey; label: string }[] = [
    { id: "skin", label: "Skin Rejuvenation" },
    { id: "hair", label: "Hair Restoration" },
    { id: "aging", label: "Anti-Aging" }
  ];

  const active = content[activeTab];

  return (
    <section id="results" className="py-24 bg-muted/50">
      <div className="max-w-5xl mx-auto px-6 md:px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 mb-12">
          <FadeIn className="lg:w-5/12">
            <span className="section-label">Real Results</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-[1.1]">
              Visual<br />Transformations
            </h2>
          </FadeIn>
          <FadeIn delay={0.1} className="lg:w-7/12 flex flex-col justify-end">
            <p className="text-muted-foreground text-lg font-light leading-relaxed">
              Drag the slider to reveal what FOY regenerative science delivers. Real client outcomes.
            </p>
          </FadeIn>
        </div>

        {/* Tabs */}
        <FadeIn delay={0.1} className="flex flex-wrap gap-3 mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSliderPos(50); }}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                activeTab === tab.id
                  ? "bg-foreground text-white border-foreground"
                  : "bg-transparent text-muted-foreground border-border hover:border-primary/40 hover:text-primary"
              )}
            >
              {tab.label}
            </button>
          ))}
          <span className="ml-auto self-center text-xs text-muted-foreground font-mono tracking-widest">{active.description}</span>
        </FadeIn>

        {/* Slider */}
        <FadeIn delay={0.2}>
          <div
            ref={containerRef}
            className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden cursor-ew-resize select-none touch-none border border-border bg-foreground shadow-[0_8px_40px_rgba(0,0,0,0.12)]"
            onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
            onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX); }}
          >
            {/* Before side */}
            <div className="absolute inset-0">
              <img
                src={active.img}
                alt="Before treatment"
                className="w-full h-full object-cover"
                style={{ filter: "grayscale(0.85) brightness(0.68) contrast(0.92) sepia(0.1)" }}
                draggable={false}
              />
              <div className="absolute inset-0 bg-slate-900/20 mix-blend-color" />
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                <span className="px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-full text-white/90 font-semibold text-xs tracking-[0.15em] uppercase border border-white/10">
                  BEFORE
                </span>
                <span className="px-3 py-1 bg-black/50 rounded-full text-white/50 text-[11px] border border-white/8">
                  {active.beforeLabel}
                </span>
              </div>
            </div>

            {/* After side */}
            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
              <img
                src={active.img}
                alt="After treatment"
                className="w-full h-full object-cover"
                style={{ filter: "saturate(1.12) brightness(1.04) contrast(1.02)" }}
                draggable={false}
              />
              <div className="absolute top-4 right-4 flex flex-col gap-1.5 items-end">
                <span className="px-3 py-1.5 bg-primary/90 backdrop-blur-sm rounded-full text-white font-semibold text-xs tracking-[0.15em] uppercase border border-white/20">
                  AFTER
                </span>
                <span className="px-3 py-1 bg-primary/30 rounded-full text-white/80 text-[11px] border border-primary/20">
                  {active.afterLabel}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div
              className="absolute top-0 bottom-0 w-[1px] bg-white/80 z-20 pointer-events-none"
              style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.3)] pointer-events-auto z-30 hover:scale-110 active:scale-95 transition-transform">
                <MoveHorizontal className="text-primary w-4 h-4" />
              </div>
            </div>

            {!isDragging && sliderPos === 50 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-black/60 backdrop-blur-sm rounded-full text-white/60 text-xs border border-white/10 pointer-events-none">
                ← Drag to compare →
              </div>
            )}
          </div>
        </FadeIn>

        {/* Stats */}
        <FadeIn delay={0.3} className="mt-8 grid grid-cols-3 gap-4">
          {[
            { num: "97%", label: "Client Satisfaction" },
            { num: "10K+", label: "Transformations" },
            { num: "12 wks", label: "Average Results" },
          ].map(stat => (
            <div key={stat.label} className="card-elevated py-5 px-4 text-center">
              <div className="text-2xl md:text-3xl font-display font-bold text-primary mb-1">{stat.num}</div>
              <div className="text-[11px] text-muted-foreground uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
