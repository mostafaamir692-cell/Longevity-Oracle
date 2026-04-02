import { useState, useRef, useEffect } from "react";
import { FadeIn } from "../animations/FadeIn";
import { MoveHorizontal } from "lucide-react";

const BASE = import.meta.env.BASE_URL;

const outcomes = [
  {
    num: "97%",
    label: "Patient Satisfaction",
    desc: "Across all programs and treatment categories"
  },
  {
    num: "8 wks",
    label: "Avg. Visible Results",
    desc: "For metabolic and skin-focused protocols"
  },
  {
    num: "10K+",
    label: "Patients Treated",
    desc: "Since our founding in Cairo, Egypt"
  },
  {
    num: "3×",
    label: "Energy Improvement",
    desc: "Reported by Metabolic Reset patients at 12 weeks"
  },
];

export function BeforeAfterSection() {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
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

  return (
    <section id="results" className="py-24 bg-background relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-8">

        <FadeIn className="mb-12">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-primary border border-primary/25 bg-primary/8 px-3 py-1.5 rounded-full mb-5">
            Real Results
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight text-glow-white">
              What FOY Delivers
            </h2>
            <p className="text-muted-foreground text-base max-w-sm font-light">
              Drag the slider to see the visible difference. Real patient outcomes from our clinical programs.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* Slider – spans 3 cols */}
          <FadeIn delay={0.1} className="lg:col-span-3">
            <div
              ref={containerRef}
              className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden cursor-ew-resize select-none touch-none border border-border shadow-[0_24px_80px_rgba(0,0,0,0.7)] bg-card"
              onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
              onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX); }}
            >
              {/* BEFORE – desaturated */}
              <div className="absolute inset-0">
                <img
                  src={`${BASE}images/skin.jpg?v=5`}
                  alt="Before treatment"
                  className="w-full h-full object-cover"
                  style={{ filter: "grayscale(0.9) brightness(0.65) contrast(0.9)" }}
                  draggable={false}
                />
                <div className="absolute inset-0 bg-slate-900/25 mix-blend-color" />
                <div className="absolute top-5 left-5 flex flex-col gap-1.5">
                  <span className="px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-full text-white/90 font-semibold text-xs tracking-[0.15em] uppercase border border-white/10">
                    BEFORE
                  </span>
                  <span className="px-3 py-1 bg-black/50 rounded-full text-white/50 text-[11px] border border-white/5">
                    Fatigued · Dull · Uneven
                  </span>
                </div>
              </div>

              {/* AFTER – vivid */}
              <div
                className="absolute inset-0"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                <img
                  src={`${BASE}images/skin.jpg?v=5`}
                  alt="After treatment"
                  className="w-full h-full object-cover"
                  style={{ filter: "saturate(1.2) brightness(1.08) contrast(1.03)" }}
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-teal-400/6 via-transparent to-transparent" />
                <div className="absolute top-5 right-5 flex flex-col gap-1.5 items-end">
                  <span className="px-3 py-1.5 bg-primary/85 backdrop-blur-sm rounded-full text-white font-semibold text-xs tracking-[0.15em] uppercase shadow-[0_0_18px_rgba(13,148,136,0.5)] border border-white/20">
                    AFTER
                  </span>
                  <span className="px-3 py-1 bg-primary/30 rounded-full text-white/80 text-[11px] border border-primary/20">
                    Radiant · Lifted · Restored
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div
                className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_24px_rgba(255,255,255,0.9),0_0_48px_rgba(13,148,136,0.5)] z-20 pointer-events-none"
                style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_4px_24px_rgba(0,0,0,0.5)] border-2 border-primary/50 z-30 transition-transform duration-150 hover:scale-110 active:scale-95">
                  <MoveHorizontal className="text-primary w-5 h-5" />
                </div>
              </div>

              {!isDragging && sliderPos === 50 && (
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-5 py-2 bg-black/60 backdrop-blur-sm rounded-full text-white/60 text-xs border border-white/10 pointer-events-none">
                  ← Drag to compare →
                </div>
              )}

              {/* Treatment label */}
              <div className="absolute bottom-5 right-5 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full border border-white/10">
                <p className="text-[11px] text-white/50 font-mono tracking-wider">Skin Rejuvenation · 8 weeks</p>
              </div>
            </div>
          </FadeIn>

          {/* Outcome cards – spans 2 cols */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-3 content-start">
            {outcomes.map((o, i) => (
              <FadeIn key={i} delay={0.1 + i * 0.08} direction="left">
                <div className="group rounded-2xl bg-card border border-border p-5 hover:border-primary/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4),0_0_16px_rgba(16,185,171,0.05)] hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="text-2xl font-display font-bold text-primary mb-1 text-glow">{o.num}</div>
                  <div className="text-xs font-semibold text-foreground/70 mb-2 leading-snug">{o.label}</div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{o.desc}</p>
                </div>
              </FadeIn>
            ))}

            <FadeIn delay={0.5} direction="left" className="col-span-2">
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-5">
                <p className="text-sm text-foreground/60 font-light italic font-display leading-relaxed mb-3">
                  "The results were measurable from the first follow-up. My biomarkers shifted significantly — not just how I looked, but how I felt."
                </p>
                <p className="text-xs text-primary font-medium text-glow">— Dr. M. Khalil, Cairo · Longevity Program</p>
              </div>
            </FadeIn>
          </div>

        </div>

      </div>
    </section>
  );
}
