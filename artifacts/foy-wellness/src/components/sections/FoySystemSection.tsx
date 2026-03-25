import { FadeIn } from "../animations/FadeIn";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Consultation",
    desc: "A thorough clinical conversation to understand your health, lifestyle, goals, and concerns."
  },
  {
    num: "02",
    title: "Advanced Testing",
    desc: "Comprehensive biomarker panels, metabolic and biological assessments tailored to your profile."
  },
  {
    num: "03",
    title: "Personalized Program",
    desc: "A structured, physician-designed plan built entirely around your individual biology and goals."
  },
  {
    num: "04",
    title: "Monitoring & Optimization",
    desc: "Continuous follow-up, data review, and protocol adjustments to ensure lasting, measurable results."
  }
];

export function FoySystemSection() {
  return (
    <section id="system" className="py-24 bg-muted/40 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <FadeIn className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-primary font-semibold tracking-widest uppercase text-xs mb-4 block">How We Work</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Your Journey at FOY</h2>
          <p className="text-muted-foreground text-lg font-light">
            Health cannot be improved through isolated interventions. It requires a structured, data-driven approach — from first consultation to long-term optimization.
          </p>
        </FadeIn>

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-[52px] left-[12.5%] right-[12.5%] h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <FadeIn key={idx} delay={idx * 0.15} direction="up">
                <div className="relative flex flex-col items-center text-center group">
                  {/* Step circle */}
                  <div className="relative z-10 w-[104px] h-[104px] rounded-full border-2 border-border bg-card flex flex-col items-center justify-center mb-6 group-hover:border-primary group-hover:shadow-[0_0_24px_rgba(13,148,136,0.15)] transition-all duration-400">
                    <span className="text-[11px] text-muted-foreground font-mono tracking-widest">{step.num}</span>
                    <div className="w-8 h-[1px] bg-border my-1.5" />
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider leading-tight px-2">{step.title}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-[220px]">{step.desc}</p>

                  {/* Arrow between steps (mobile) */}
                  {idx < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center mt-6">
                      <ArrowRight className="w-4 h-4 text-primary/40 rotate-90" />
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        <FadeIn delay={0.6} className="mt-20 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border bg-card">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground font-medium">Every step is physician-guided and medically supervised.</span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
