import { FadeIn } from "../animations/FadeIn";

const steps = [
  {
    num: "01",
    title: "Consultation",
    desc: "A thorough clinical conversation with our physician to understand your health, lifestyle, goals, and medical history."
  },
  {
    num: "02",
    title: "Advanced Testing",
    desc: "Comprehensive biomarker panels, metabolic assessments, and biological age evaluations tailored to your individual profile."
  },
  {
    num: "03",
    title: "Personalized Program",
    desc: "A structured, physician-designed protocol built entirely around your biology — not a generic template."
  },
  {
    num: "04",
    title: "Monitoring & Optimization",
    desc: "Continuous follow-up, data review, and protocol refinements to ensure your results are lasting and measurable."
  }
];

export function FoySystemSection() {
  return (
    <section id="system" className="py-24 bg-muted/40 relative z-10 overflow-hidden">
      {/* Background decorative number */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[28rem] font-display font-bold text-primary/3 select-none pointer-events-none leading-none pr-8 hidden lg:block">
        FOY
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <FadeIn className="mb-16 max-w-xl">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-primary border border-primary/20 bg-primary/5 px-3 py-1.5 rounded-full mb-5">
            How We Work
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight">
            Your Journey<br />at FOY
          </h2>
          <p className="text-muted-foreground mt-4 font-light text-base leading-relaxed">
            Health cannot be improved through isolated interventions. It requires a structured, data-driven approach.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border rounded-3xl overflow-hidden shadow-sm">
          {steps.map((step, idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <div className="group bg-card p-10 hover:bg-primary/3 transition-colors duration-300 relative overflow-hidden">
                {/* Large background number */}
                <span className="absolute right-6 bottom-4 text-8xl font-display font-bold text-primary/5 select-none pointer-events-none leading-none group-hover:text-primary/8 transition-colors duration-300">
                  {step.num}
                </span>

                <div className="relative z-10 flex items-start gap-5">
                  <div className="shrink-0 w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                    <span className="text-xs font-bold font-mono text-primary group-hover:text-white transition-colors duration-300">{step.num}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors duration-300">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5} className="mt-8">
          <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-card border border-border w-fit">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <p className="text-sm text-muted-foreground font-medium">Every step is physician-guided and medically supervised.</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
