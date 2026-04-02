import { FadeIn } from "../animations/FadeIn";
import { Activity, Microscope, Leaf, Sparkles } from "lucide-react";

const pillars = [
  {
    icon: <Microscope className="w-5 h-5 text-primary" />,
    title: "Longevity Diagnostics",
    desc: "Advanced biomarker panels and biological age assessment that reveal how your body is truly aging."
  },
  {
    icon: <Activity className="w-5 h-5 text-primary" />,
    title: "Metabolic Optimization",
    desc: "Precision interventions that restore insulin sensitivity, energy regulation, and body composition."
  },
  {
    icon: <Leaf className="w-5 h-5 text-primary" />,
    title: "Regenerative Medicine",
    desc: "Science-led therapies supporting cellular repair, tissue recovery, and long-term physical resilience."
  },
  {
    icon: <Sparkles className="w-5 h-5 text-primary" />,
    title: "Aesthetic Longevity",
    desc: "Medical-grade aesthetic treatments that align outer vitality with your inner biological health."
  }
];

export function ProblemSection() {
  return (
    <section id="problem" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8">

        {/* Editorial header row */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-16">
          <FadeIn className="lg:w-5/12 shrink-0">
            <span className="section-label">What is FOY?</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-[1.1] mb-6">
              A New Standard in<br />Preventive Medicine
            </h2>
            <div className="rule-accent mb-6" />
          </FadeIn>

          <FadeIn delay={0.15} className="lg:w-7/12">
            <p className="text-muted-foreground text-lg leading-relaxed mb-5 font-light">
              FOY Clinic was founded to introduce a different model of healthcare — one that focuses not on treating illness after it appears, but on preserving vitality, optimizing function, and extending healthspan.
            </p>
            <p className="text-muted-foreground leading-relaxed font-light">
              We help patients understand how their body is aging, identify early metabolic dysfunction, and build personalized strategies for long-term health — guided at every stage by physician expertise.
            </p>
          </FadeIn>
        </div>

        {/* 4 pillars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {pillars.map((p, idx) => (
            <FadeIn key={idx} delay={idx * 0.08} direction="up" className="h-full">
              <div className="group h-full card-elevated card-interactive p-7 flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors duration-300">
                  {p.icon}
                </div>
                <div className="rule mb-4 opacity-50" />
                <h3 className="font-semibold text-sm text-foreground mb-2 tracking-wide">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light flex-grow">{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Feature quote — full width dark band */}
        <FadeIn delay={0.3}>
          <div className="relative overflow-hidden rounded-3xl bg-[#091617] px-10 md:px-16 py-12 text-white">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="shrink-0">
                <span className="text-[80px] font-display text-primary/20 leading-none">"</span>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-display italic leading-relaxed text-white/85 mb-4">
                  FOY is more than a clinic. It is the beginning of a new approach to modern healthcare.
                </p>
                <p className="text-sm text-primary font-medium tracking-wide">— Dr. Ahmed Amer, Founder, FOY Clinic</p>
              </div>
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
