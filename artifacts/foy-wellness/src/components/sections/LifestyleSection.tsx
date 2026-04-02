import { FadeIn } from "../animations/FadeIn";
import { Apple, Moon, Waves, Infinity } from "lucide-react";
import { cn } from "@/lib/utils";

const pillars = [
  {
    icon: <Apple className="w-5 h-5 text-primary" />,
    title: "Nutritional Strategy",
    desc: "Personalized, anti-inflammatory nutrition plans grounded in your metabolic testing results.",
    offset: false
  },
  {
    icon: <Moon className="w-5 h-5 text-primary" />,
    title: "Sleep Optimization",
    desc: "Evidence-based sleep protocols to support cellular recovery and hormonal balance.",
    offset: true
  },
  {
    icon: <Waves className="w-5 h-5 text-primary" />,
    title: "Stress & Mental Clarity",
    desc: "Structured approaches to reduce allostatic load and restore cognitive performance.",
    offset: false
  },
  {
    icon: <Infinity className="w-5 h-5 text-primary" />,
    title: "Long-Term Monitoring",
    desc: "Regular biomarker review and protocol refinement to ensure sustained, measurable results.",
    offset: true
  }
];

export function LifestyleSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: Editorial text */}
          <FadeIn>
            <span className="section-label">Why Program-Based Care</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-[1.1] mb-6">
              Health Requires a<br />Structured Approach
            </h2>
            <div className="rule-accent mb-7" />
            <p className="text-muted-foreground text-lg font-light leading-relaxed mb-5">
              Isolated treatments yield isolated results. Lasting change requires the integration of medical evaluation, precise data, personalized planning, and continuous monitoring.
            </p>
            <p className="text-muted-foreground font-light leading-relaxed">
              Every FOY program extends beyond the clinic — guiding how you eat, recover, and build the daily habits that compound over time.
            </p>
          </FadeIn>

          {/* Right: Masonry grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {pillars.map((p, i) => (
              <FadeIn key={i} delay={i * 0.1} direction="up" className={cn("h-full", p.offset ? "mt-8" : "")}>
                <div className="group h-full card-elevated card-interactive p-6 flex flex-col">
                  <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors duration-300">
                    {p.icon}
                  </div>
                  <h4 className="font-semibold text-sm text-foreground mb-2 tracking-wide">{p.title}</h4>
                  <p className="text-xs text-muted-foreground font-light leading-relaxed">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
