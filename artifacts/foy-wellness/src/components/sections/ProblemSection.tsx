import { FadeIn } from "../animations/FadeIn";
import { Activity, Microscope, Leaf, Sparkles } from "lucide-react";

export function ProblemSection() {
  const pillars = [
    {
      icon: <Microscope className="w-7 h-7 text-primary" />,
      title: "Longevity Diagnostics",
      desc: "Advanced biomarker panels and biological age assessment that reveal how your body is truly aging."
    },
    {
      icon: <Activity className="w-7 h-7 text-primary" />,
      title: "Metabolic Optimization",
      desc: "Precision interventions that restore insulin sensitivity, energy regulation, and body composition."
    },
    {
      icon: <Leaf className="w-7 h-7 text-primary" />,
      title: "Regenerative Medicine",
      desc: "Science-led therapies supporting cellular repair, tissue recovery, and long-term physical resilience."
    },
    {
      icon: <Sparkles className="w-7 h-7 text-primary" />,
      title: "Aesthetic Longevity",
      desc: "Medical-grade aesthetic treatments that align outer vitality with your inner biological health."
    }
  ];

  return (
    <section id="problem" className="py-24 bg-background relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <FadeIn>
            <span className="text-primary font-semibold tracking-widest uppercase text-xs mb-5 block">What is FOY?</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
              A New Standard in<br />Preventive Medicine
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              FOY Clinic was founded to introduce a different model of healthcare — one that focuses not on treating illness after it appears, but on preserving vitality, optimizing function, and extending healthspan.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We help patients understand how their body is aging, identify early metabolic dysfunction, and build personalized strategies for long-term health — guided at every stage by physician expertise.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="relative p-8 md:p-10 rounded-3xl bg-foreground text-white overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
              <blockquote className="relative z-10">
                <p className="text-xl md:text-2xl font-display italic leading-relaxed text-white/90 mb-6">
                  "FOY is more than a clinic. It is the beginning of a new approach to modern healthcare."
                </p>
                <footer className="text-sm text-primary font-medium tracking-wide">
                  — Dr. Ahmed Amer, Founder, FOY Clinic
                </footer>
              </blockquote>
            </div>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => (
            <FadeIn key={idx} delay={idx * 0.1} direction="up" className="h-full">
              <div className="group h-full border border-border bg-card rounded-2xl p-7 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-400">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                  {p.icon}
                </div>
                <h3 className="font-bold text-base mb-2 text-foreground">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
