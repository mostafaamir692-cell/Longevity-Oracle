import { FadeIn } from "../animations/FadeIn";
import { ArrowRight, Activity, TrendingUp, Zap } from "lucide-react";

const programs = [
  {
    icon: <Activity className="w-7 h-7 text-white" />,
    title: "Metabolic Reset Program",
    subtitle: "Restore metabolic balance. Improve energy. Support long-term health.",
    who: "Designed for individuals experiencing fatigue, weight challenges, insulin resistance, or early metabolic dysfunction.",
    includes: ["Metabolic laboratory testing", "Body composition analysis", "Personalized nutrition strategy", "Sleep & stress optimization", "Ongoing follow-up consultations"],
    duration: "4–6 months",
    num: "01"
  },
  {
    icon: <TrendingUp className="w-7 h-7 text-white" />,
    title: "Longevity Optimization Program",
    subtitle: "Enhance healthspan. Optimize performance. Support long-term vitality.",
    who: "Designed for proactive individuals seeking to understand their biological age, prevent decline, and sustain high performance.",
    includes: ["Advanced longevity consultation", "Biomarker & biological age assessment", "Personalized longevity plan", "Lifestyle optimization strategies", "Long-term monitoring"],
    duration: "3–6 months",
    num: "02"
  },
  {
    icon: <Zap className="w-7 h-7 text-white" />,
    title: "Regeneration Program",
    subtitle: "Support recovery. Enhance repair. Integrate regenerative medicine.",
    who: "Designed for individuals seeking advanced regenerative therapies, tissue recovery support, and complementary longevity strategies.",
    includes: ["Regenerative medicine consultation", "Personalized treatment planning", "Integration with longevity programs", "Structured follow-up & monitoring"],
    duration: "Tailored to individual needs",
    num: "03"
  }
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-background relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <FadeIn className="max-w-xl">
            <span className="text-primary font-semibold tracking-widest uppercase text-xs mb-4 block">Signature Programs</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-3">A Different Approach to Care</h2>
            <p className="text-muted-foreground text-lg font-light">
              Structured medical programs — each built around your biology, guided by clinical assessment, and focused on measurable, sustainable outcomes.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <button
              onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-2 text-sm text-primary font-medium hover:gap-3 transition-all group"
            >
              Book a Consultation
              <ArrowRight className="w-4 h-4" />
            </button>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          {programs.map((prog, idx) => (
            <FadeIn key={idx} delay={idx * 0.1} className="h-full">
              <div className="glow-card group relative h-full rounded-2xl border border-border bg-card overflow-hidden flex flex-col">
                {/* Header */}
                <div className="relative bg-foreground p-7 pb-8">
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                  <span className="text-[10px] text-primary/60 font-mono tracking-widest mb-3 block">{prog.num}</span>
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                    {prog.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{prog.title}</h3>
                  <p className="text-sm text-white/50 font-light italic leading-relaxed">{prog.subtitle}</p>
                </div>

                {/* Body */}
                <div className="p-7 flex flex-col flex-grow">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{prog.who}</p>

                  <p className="text-[11px] font-semibold text-foreground/70 uppercase tracking-wider mb-3">What's included</p>
                  <ul className="space-y-2 mb-6 flex-grow">
                    {prog.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-5 border-t border-border flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Duration</span>
                      <p className="text-sm font-semibold text-foreground mt-0.5">{prog.duration}</p>
                    </div>
                    <button
                      onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
                      className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:gap-2.5 transition-all"
                    >
                      Enquire <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="h-[3px] w-0 bg-gradient-to-r from-primary to-teal-300 group-hover:w-full transition-all duration-700 ease-out" />
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Which program is right */}
        <FadeIn delay={0.4} className="mt-12 p-8 rounded-2xl border border-border bg-card">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <h4 className="font-bold text-base mb-1">Which program is right for you?</h4>
              <p className="text-sm text-muted-foreground">During your consultation, we assess your current health status and long-term goals to determine the most suitable program.</p>
            </div>
            <button
              onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
              className="shrink-0 px-6 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm"
            >
              Book Your Consultation
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
