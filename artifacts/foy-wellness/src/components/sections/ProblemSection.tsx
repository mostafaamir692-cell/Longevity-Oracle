import { FadeIn } from "../animations/FadeIn";
import { Activity, Microscope, Leaf, Sparkles, ArrowUpRight } from "lucide-react";

const pillars = [
  {
    icon: <Microscope className="w-5 h-5" />,
    title: "Longevity Diagnostics",
    desc: "Advanced biomarker panels and biological age assessment that reveal how your body is truly aging at the cellular level."
  },
  {
    icon: <Activity className="w-5 h-5" />,
    title: "Metabolic Optimization",
    desc: "Precision interventions that restore insulin sensitivity, energy regulation, and body composition from within."
  },
  {
    icon: <Leaf className="w-5 h-5" />,
    title: "Regenerative Medicine",
    desc: "Science-led therapies supporting cellular repair, tissue recovery, and long-term physical resilience."
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: "Aesthetic Longevity",
    desc: "Medical-grade aesthetic care that aligns outer vitality with your inner biological health."
  }
];

export function ProblemSection() {
  return (
    <section id="problem" className="py-24 bg-background relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-8">

        {/* Section label */}
        <FadeIn className="mb-10">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-primary border border-primary/20 bg-primary/5 px-3 py-1.5 rounded-full">
            What is FOY?
          </span>
        </FadeIn>

        {/* Bento top row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">

          {/* Hero panel – spans 2 cols */}
          <FadeIn className="lg:col-span-2 h-full">
            <div className="relative h-full min-h-[340px] rounded-3xl bg-foreground overflow-hidden p-10 flex flex-col justify-between">
              {/* Ambient glow */}
              <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight mb-5">
                  A New Standard in<br />
                  <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-300">
                    Preventive Medicine
                  </span>
                </h2>
                <p className="text-white/50 text-base font-light leading-relaxed max-w-lg">
                  FOY was founded to introduce a different model of healthcare — one that focuses on preserving vitality, optimizing function, and extending healthspan long before illness appears.
                </p>
              </div>

              <div className="relative z-10 mt-8 pt-6 border-t border-white/10">
                <p className="text-sm font-display italic text-white/60">
                  "FOY is more than a clinic. It is the beginning of a new approach to modern healthcare."
                </p>
                <p className="text-xs text-primary mt-2 font-medium tracking-wide">— Dr. Ahmed Amer, Founder</p>
              </div>
            </div>
          </FadeIn>

          {/* Stats panel */}
          <FadeIn delay={0.1} className="h-full">
            <div className="h-full min-h-[340px] rounded-3xl bg-primary/8 border border-primary/15 p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-primary/70 block mb-6">By the Numbers</span>
                {[
                  { num: "10,000+", label: "Patients Treated" },
                  { num: "97%", label: "Satisfaction Rate" },
                  { num: "15+", label: "Years of Excellence" },
                ].map(stat => (
                  <div key={stat.label} className="flex items-baseline justify-between py-4 border-b border-primary/10 last:border-0">
                    <span className="text-2xl font-display font-bold text-foreground">{stat.num}</span>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
                className="mt-6 w-full flex items-center justify-between px-5 py-3.5 rounded-2xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors group"
              >
                <span>Book Consultation</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </FadeIn>
        </div>

        {/* Pillars – bottom row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p, idx) => (
            <FadeIn key={idx} delay={idx * 0.08} direction="up" className="h-full">
              <div className="group h-full rounded-3xl bg-card border border-border p-7 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 cursor-default">
                <div className="w-10 h-10 rounded-2xl bg-primary/8 border border-primary/15 flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
                  {p.icon}
                </div>
                <h3 className="font-bold text-sm text-foreground mb-2 leading-snug">{p.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
