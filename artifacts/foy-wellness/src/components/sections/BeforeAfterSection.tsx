import { useState, useRef, useEffect } from "react";
import { FadeIn } from "../animations/FadeIn";
import { MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

type TabKey = "skin" | "hair" | "aging";

const BASE = import.meta.env.BASE_URL;

const content: Record<TabKey, {
  beforeImg: string;
  afterImg: string;
  beforeLabel: string;
  afterLabel: string;
  title: string;
  description: string;
}> = {
  skin: {
    beforeImg: `${BASE}images/skin-before.png`,
    afterImg: `${BASE}images/skin-after.png`,
    beforeLabel: "Dull • Fine Lines • Uneven Tone",
    afterLabel: "Radiant • Firm • Luminous",
    title: "Skin Rejuvenation",
    description: "HydraFacial + PRP + Exosome Therapy — 8 weeks"
  },
  hair: {
    beforeImg: `${BASE}images/hair-before.png`,
    afterImg: `${BASE}images/hair-after.png`,
    beforeLabel: "Thinning • Low Density",
    afterLabel: "Full • Dense • Restored",
    title: "Hair Restoration",
    description: "PRP + Exosome Hair Therapy — 12 weeks"
  },
  aging: {
    beforeImg: `${BASE}images/aging-before.png`,
    afterImg: `${BASE}images/aging-after.png`,
    beforeLabel: "Fine Lines • Sagging • Tired",
    afterLabel: "Lifted • Firm • Youthful",
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

  const tabs = [
    { id: "skin" as const, label: "Skin Rejuvenation" },
    { id: "hair" as const, label: "Hair Restoration" },
    { id: "aging" as const, label: "Anti-Aging" }
  ];

  const active = content[activeTab];

  return (
    <section id="results" className="py-24 bg-background relative z-10">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <FadeIn className="text-center mb-12">
          <span className="text-primary font-semibold tracking-widest uppercase text-sm mb-4 block">Real Results</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Visual Transformations</h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            Real client results using the FOY regenerative protocol. Drag the slider to reveal the transformation.
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

        {/* Treatment info */}
        <FadeIn delay={0.2} className="text-center mb-6">
          <p className="text-sm text-foreground/50 tracking-wider uppercase">{active.description}</p>
        </FadeIn>

        {/* Slider */}
        <FadeIn delay={0.25}>
          <div
            ref={containerRef}
            className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-3xl overflow-hidden cursor-ew-resize select-none touch-none border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] bg-black"
            onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
            onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX); }}
          >
            {/* BEFORE — full background */}
            <div className="absolute inset-0">
              <img
                src={active.beforeImg}
                alt="Before treatment"
                className="w-full h-full object-cover"
                draggable={false}
              />
              {/* Dark desaturating overlay for "before" feel */}
              <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />

              {/* BEFORE label */}
              <div className="absolute top-5 left-5 flex flex-col gap-1">
                <span className="px-3 py-1.5 bg-black/70 backdrop-blur-md rounded-full text-white/90 font-semibold text-xs tracking-widest uppercase border border-white/10">
                  BEFORE
                </span>
                <span className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-white/60 text-xs border border-white/5">
                  {active.beforeLabel}
                </span>
              </div>
            </div>

            {/* AFTER — clipped on the right side of slider */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <img
                src={active.afterImg}
                alt="After treatment"
                className="w-full h-full object-cover"
                draggable={false}
              />
              {/* Warm glow overlay for "after" feel */}
              <div className="absolute inset-0 bg-teal-900/10 mix-blend-screen" />

              {/* AFTER label */}
              <div className="absolute top-5 right-5 flex flex-col gap-1 items-end">
                <span className="px-3 py-1.5 bg-primary/80 backdrop-blur-md rounded-full text-white font-semibold text-xs tracking-widest uppercase shadow-[0_0_15px_rgba(13,148,136,0.5)] border border-white/20">
                  AFTER
                </span>
                <span className="px-3 py-1 bg-primary/30 backdrop-blur-md rounded-full text-white/80 text-xs border border-primary/20">
                  {active.afterLabel}
                </span>
              </div>
            </div>

            {/* Slider divider line */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_20px_rgba(255,255,255,0.9),0_0_40px_rgba(13,148,136,0.5)] z-20 pointer-events-none"
              style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
            >
              {/* Drag handle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.4)] border-2 border-primary/40 pointer-events-auto z-30 transition-transform hover:scale-110">
                <MoveHorizontal className="text-primary w-5 h-5" />
              </div>
            </div>

            {/* Instruction hint (fades out on drag) */}
            {!isDragging && sliderPos === 50 && (
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full text-white/70 text-xs border border-white/10 pointer-events-none animate-pulse">
                ← Drag to compare →
              </div>
            )}
          </div>
        </FadeIn>

        {/* Bottom stats row */}
        <FadeIn delay={0.35} className="mt-10 grid grid-cols-3 gap-4 text-center">
          {[
            { num: "97%", label: "Client Satisfaction" },
            { num: "10K+", label: "Transformations" },
            { num: "12 wks", label: "Average Results" },
          ].map((stat) => (
            <div key={stat.label} className="bg-card/60 backdrop-blur-sm border border-white/5 rounded-2xl py-5 px-4">
              <div className="text-2xl md:text-3xl font-display font-bold text-primary mb-1">{stat.num}</div>
              <div className="text-xs text-foreground/50 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
