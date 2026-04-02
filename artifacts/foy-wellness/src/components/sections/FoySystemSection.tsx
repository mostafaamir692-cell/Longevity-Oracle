import { FadeIn } from "../animations/FadeIn";

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
    <section id="system" className="py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-6 md:px-8">

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-16">
          <FadeIn className="lg:w-5/12 shrink-0">
            <span className="section-label">How We Work</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-[1.1]">
              Your Journey<br />at FOY
            </h2>
          </FadeIn>
          <FadeIn delay={0.1} className="lg:w-7/12 flex items-center">
            <p className="text-muted-foreground text-lg font-light leading-relaxed">
              Health cannot be improved through isolated interventions. It requires a structured, data-driven approach — from first consultation to long-term optimization.
            </p>
          </FadeIn>
        </div>

        {/* Horizontal steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {steps.map((step, idx) => (
            <FadeIn key={idx} delay={idx * 0.12} className="relative">
              {/* connector line */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-[calc(50%+2rem)] right-0 h-[1px] bg-border z-0" />
              )}
              <div className="relative z-10 p-8 lg:pr-12">
                {/* Large decorative number */}
                <div className="text-[56px] font-display font-bold text-primary/12 leading-none mb-3 select-none">
                  {step.num}
                </div>
                {/* Step title */}
                <h3 className="font-semibold text-base text-foreground mb-2 tracking-wide">{step.title}</h3>
                <div className="rule-accent mb-3" />
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{step.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5} className="mt-10">
          <div className="flex items-center gap-3 text-sm text-muted-foreground border-t border-border pt-8">
            <span className="w-2 h-2 rounded-full bg-primary shrink-0 animate-pulse" />
            Every step is physician-guided and medically supervised.
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
