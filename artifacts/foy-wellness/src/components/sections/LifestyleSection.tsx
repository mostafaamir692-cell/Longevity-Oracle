import { FadeIn } from "../animations/FadeIn";
import { Apple, Moon, Waves, Infinity, ArrowUpRight } from "lucide-react";
import { SectionBg } from "../SectionBg";

const pillars = [
  {
    icon: <Apple className="w-5 h-5" />,
    title: "Nutritional Strategy",
    desc: "Personalized, anti-inflammatory nutrition plans grounded in your metabolic testing results.",
    iconClass: "text-green-600 bg-green-50 border-green-200",
  },
  {
    icon: <Moon className="w-5 h-5" />,
    title: "Sleep Optimization",
    desc: "Evidence-based protocols to support cellular recovery and hormonal balance during rest.",
    iconClass: "text-indigo-600 bg-indigo-50 border-indigo-200",
  },
  {
    icon: <Waves className="w-5 h-5" />,
    title: "Stress & Clarity",
    desc: "Structured approaches to reduce allostatic load and restore cognitive performance.",
    iconClass: "text-sky-600 bg-sky-50 border-sky-200",
  },
  {
    icon: <Infinity className="w-5 h-5" />,
    title: "Long-Term Monitoring",
    desc: "Regular biomarker review and protocol refinement to ensure sustained, measurable results.",
    iconClass: "text-primary bg-primary/8 border-primary/20",
  }
];

export function LifestyleSection() {
  return (
    <section className="py-24 relative z-10 overflow-hidden">
      <SectionBg variant="lifestyle" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <FadeIn>
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-primary border border-primary/25 bg-primary/8 px-3 py-1.5 rounded-full mb-5">
              Why Program-Based Care
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-5 leading-tight text-foreground text-glow-white">
              Health Requires a<br />Structured Approach
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-5 font-light">
              Isolated treatments yield isolated results. Lasting change requires the integration of medical evaluation, precise data, personalized planning, and continuous monitoring.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8 font-light">
              Every FOY program extends beyond the clinic — guiding how you eat, recover, and build the daily habits that compound over time.
            </p>
            <button
              onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all duration-200 group"
            >
              View Programs
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </FadeIn>

          <div className="grid grid-cols-2 gap-4">
            {pillars.map((p, i) => (
              <FadeIn key={i} delay={i * 0.1} direction="up" className="h-full">
                <div className="group h-full rounded-2xl glass-card p-6 flex flex-col gap-4">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${p.iconClass}`}>
                    {p.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground mb-1.5 leading-snug">{p.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
