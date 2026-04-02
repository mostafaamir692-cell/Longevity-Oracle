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
    img: `${BASE}images/skin.png${V}`,
    beforeLabel: "Dull · Uneven · Fatigued",
    afterLabel: "Radiant · Even · Luminous",
    title: "Skin Rejuvenation",
    description: "HydraFacial + PRP + Exosome Therapy — 8 weeks"
  },
  hair: {
    img: `${BASE}images/hair.png${V}`,
    beforeLabel: "Thinning · Sparse · Fragile",
    afterLabel: "Full · Dense · Restored",
    title: "Hair Restoration",
    description: "PRP + Exosome Hair Therapy — 12 weeks"
  },
  aging: {
    img: `${BASE}images/aging.png${V}`,
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
    <section id="results" className="py-24 bg-background relative z-10">
      <div className="max-w-5xl mx-auto px-6 md:px-8">

        <FadeIn className="text-center mb-12">
          <span className="text-primary font-semibold tracking-widest uppercase text-sm mb-4 block">Real Results</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Visual Transformations</h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            Drag the slider to reveal what FOY regenerative science delivers. Real client outcomes.
          </p>
        </FadeIn>

        {/* Tabs */}
        <FadeIn delay={0.15} className="flex flex-wrap justify-center gap-3 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSliderPos(50); }}
              className={cn(
                "px-6 py-2.5 rounded-full font-medium transition-all duration-300 border text-sm",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground border-primary shadow-[0_0_20px_rgba(13,148,136,0.35)]"
                  : "bg-transparent text-foreground/70 border-white/10 hover:bg-white/5 hover:border-primary/30"
              )}
            >
              {tab.label}
            </button>
          ))}
        </FadeIn>

        <FadeIn delay={0.2} className="text-center mb-6">
          <p className="text-sm text-foreground/40 tracking-widest uppercase font-mono">{active.description}</p>
        </FadeIn>

        {/* Slider */}
        <FadeIn delay={0.25}>
          <div
            ref={containerRef}
            className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-3xl overflow-hidden cursor-ew-resize select-none touch-none border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.7)] bg-black"
            onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
            onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX); }}
          >

            {/* ── BEFORE side: full frame, desaturated + dimmed ── */}
            <div className="absolute inset-0">
              <img
                src={active.img}
                alt="Before treatment"
                className="w-full h-full object-cover"
                style={{
                  filter: "grayscale(0.85) brightness(0.7) contrast(0.9) sepia(0.15)"
                }}
                draggable={false}
              />
              {/* Cool blue-grey tint overlay */}
              <div className="absolute inset-0 bg-slate-900/30 mix-blend-color" />

              {/* BEFORE label */}
              <div className="absolute top-5 left-5 flex flex-col gap-1.5">
                <span className="px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-full text-white/90 font-semibold text-xs tracking-[0.15em] uppercase border border-white/10">
                  BEFORE
                </span>
                <span className="px-3 py-1 bg-black/50 rounded-full text-white/50 text-[11px] border border-white/5">
                  {active.beforeLabel}
                </span>
              </div>
            </div>

            {/* ── AFTER side: clipped left, full vivid color ── */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <img
                src={active.img}
                alt="After treatment"
                className="w-full h-full object-cover"
                style={{
                  filter: "saturate(1.15) brightness(1.05) contrast(1.02)"
                }}
                draggable={false}
              />
              {/* Subtle warm glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400/5 via-transparent to-transparent" />

              {/* AFTER label */}
              <div className="absolute top-5 right-5 flex flex-col gap-1.5 items-end">
                <span className="px-3 py-1.5 bg-primary/85 backdrop-blur-sm rounded-full text-white font-semibold text-xs tracking-[0.15em] uppercase shadow-[0_0_18px_rgba(13,148,136,0.6)] border border-white/20">
                  AFTER
                </span>
                <span className="px-3 py-1 bg-primary/30 rounded-full text-white/80 text-[11px] border border-primary/20">
                  {active.afterLabel}
                </span>
              </div>
            </div>

            {/* ── Divider line ── */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_24px_rgba(255,255,255,0.95),0_0_48px_rgba(13,148,136,0.6)] z-20 pointer-events-none"
              style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
            >
              {/* Drag handle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_4px_24px_rgba(0,0,0,0.5)] border-2 border-primary/50 pointer-events-auto z-30 transition-transform duration-150 hover:scale-110 active:scale-95">
                <MoveHorizontal className="text-primary w-5 h-5" />
              </div>
            </div>

            {/* Hint */}
            {!isDragging && sliderPos === 50 && (
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-5 py-2 bg-black/60 backdrop-blur-sm rounded-full text-white/60 text-xs border border-white/10 pointer-events-none">
                ← Drag to compare →
              </div>
            )}
          </div>
        </FadeIn>

        {/* Stats */}
        <FadeIn delay={0.35} className="mt-10 grid grid-cols-3 gap-4 text-center">
          {[
            { num: "97%", label: "Client Satisfaction" },
            { num: "10K+", label: "Transformations" },
            { num: "12 wks", label: "Average Results" },
          ].map((stat) => (
            <div key={stat.label} className="bg-card/60 border border-white/5 rounded-2xl py-5 px-4">
              <div className="text-2xl md:text-3xl font-display font-bold text-primary mb-1">{stat.num}</div>
              <div className="text-xs text-foreground/50 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
