import { FadeIn } from "../animations/FadeIn";
import { Apple, Moon, Waves, Infinity } from "lucide-react";
import { cn } from "@/lib/utils";

export function LifestyleSection() {
  const pillars = [
    {
      icon: <Apple className="w-6 h-6 text-primary" />,
      title: "Nutritional Strategy",
      desc: "Personalized, anti-inflammatory nutrition plans grounded in your metabolic testing results.",
      delay: 0.1
    },
    {
      icon: <Moon className="w-6 h-6 text-primary" />,
      title: "Sleep Optimization",
      desc: "Evidence-based sleep protocols to support cellular recovery and hormonal balance.",
      delay: 0.2
    },
    {
      icon: <Waves className="w-6 h-6 text-primary" />,
      title: "Stress & Mental Clarity",
      desc: "Structured approaches to reduce allostatic load and restore cognitive performance.",
      delay: 0.3
    },
    {
      icon: <Infinity className="w-6 h-6 text-primary" />,
      title: "Long-Term Monitoring",
      desc: "Regular biomarker review and protocol refinement to ensure sustained, measurable results.",
      delay: 0.4
    }
  ];

  return (
    <section className="py-24 bg-background relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <span className="text-primary font-semibold tracking-widest uppercase text-xs mb-5 block">Why Program-Based Care</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
              Health Requires a<br />Structured Approach
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-5 font-light">
              Isolated treatments yield isolated results. Lasting change requires the integration of medical evaluation, precise data, personalized planning, and continuous monitoring.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Every FOY program extends beyond the clinic — guiding how you eat, recover, and build the daily habits that compound over time.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {pillars.map((pillar, i) => (
              <FadeIn key={i} delay={pillar.delay} direction="up" className={cn("h-full", i % 2 !== 0 ? "sm:mt-8" : "")}>
                <div className="group h-full border border-border bg-card rounded-2xl p-6 hover:border-primary/25 hover:shadow-md hover:-translate-y-1 transition-all duration-400">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                    {pillar.icon}
                  </div>
                  <h4 className="font-bold text-sm mb-2 text-foreground">{pillar.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{pillar.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
