import { FadeIn } from "../animations/FadeIn";
import { Apple, Moon, Waves, Infinity, ArrowUpRight } from "lucide-react";

const pillars = [
  {
    icon: <Apple className="w-5 h-5" />,
    title: "Nutritional Strategy",
    desc: "Personalized, anti-inflammatory nutrition plans grounded in your metabolic testing results.",
    glowColor: "rgba(34,197,94,0.15)",
    iconClass: "text-green-400 bg-green-500/10 border-green-500/20",
  },
  {
    icon: <Moon className="w-5 h-5" />,
    title: "Sleep Optimization",
    desc: "Evidence-based protocols to support cellular recovery and hormonal balance during rest.",
    glowColor: "rgba(99,102,241,0.15)",
    iconClass: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  },
  {
    icon: <Waves className="w-5 h-5" />,
    title: "Stress & Clarity",
    desc: "Structured approaches to reduce allostatic load and restore cognitive performance.",
    glowColor: "rgba(56,189,248,0.15)",
    iconClass: "text-sky-400 bg-sky-500/10 border-sky-500/20",
  },
  {
    icon: <Infinity className="w-5 h-5" />,
    title: "Long-Term Monitoring",
    desc: "Regular biomarker review and protocol refinement to ensure sustained, measurable results.",
    glowColor: "rgba(16,185,171,0.15)",
    iconClass: "text-primary bg-primary/10 border-primary/20",
  }
];

export function LifestyleSection() {
  return (
    <section className="py-24 bg-grid-fine relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <FadeIn>
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-primary border border-primary/25 bg-primary/8 px-3 py-1.5 rounded-full mb-5">
              Why Program-Based Care
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-5 leading-tight text-glow-white">
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
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all duration-200 group text-glow"
            >
              View Programs
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </FadeIn>

          <div className="grid grid-cols-2 gap-4">
            {pillars.map((p, i) => (
              <FadeIn key={i} delay={i * 0.1} direction="up" className="h-full">
                <div
                  className="group h-full rounded-3xl border border-border bg-card p-6 flex flex-col gap-4 hover:-translate-y-1.5 transition-all duration-300"
                  style={{
                    ['--glow' as string]: p.glowColor,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px rgba(0,0,0,0.4), 0 0 24px ${p.glowColor}`;
                    (e.currentTarget as HTMLElement).style.borderColor = p.glowColor.replace('0.15', '0.4');
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '';
                    (e.currentTarget as HTMLElement).style.borderColor = '';
                  }}
                >
                  <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center ${p.iconClass}`}>
                    {p.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground/90 mb-1.5 leading-snug">{p.title}</h4>
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
