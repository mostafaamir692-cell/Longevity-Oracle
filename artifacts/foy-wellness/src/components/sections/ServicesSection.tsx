import { FadeIn } from "../animations/FadeIn";
import { ArrowUpRight, Check } from "lucide-react";
import { SectionBg } from "../SectionBg";

const programs = [
  {
    num: "01",
    title: "Metabolic Reset Program",
    tag: "Most Popular",
    subtitle: "Restore metabolic balance. Improve energy. Support long-term health.",
    who: "Designed for individuals experiencing fatigue, weight challenges, insulin resistance, or early metabolic dysfunction.",
    includes: ["Metabolic laboratory testing", "Body composition analysis", "Personalized nutrition strategy", "Sleep & stress optimization", "Ongoing follow-up consultations"],
    duration: "4–6 months",
    featured: true
  },
  {
    num: "02",
    title: "Longevity Optimization",
    tag: "Advanced",
    subtitle: "Enhance healthspan. Optimize performance. Sustain long-term vitality.",
    who: "For proactive individuals seeking to understand their biological age, prevent decline, and sustain high performance.",
    includes: ["Biomarker & biological age assessment", "Personalized longevity plan", "Lifestyle optimization strategies", "Long-term monitoring"],
    duration: "3–6 months",
    featured: false
  },
  {
    num: "03",
    title: "Regeneration Program",
    tag: "Specialized",
    subtitle: "Support recovery. Enhance repair. Integrate regenerative medicine.",
    who: "For individuals seeking advanced regenerative therapies, tissue recovery support, and complementary longevity strategies.",
    includes: ["Regenerative medicine consultation", "Personalized treatment planning", "Integration with longevity programs", "Structured follow-up & monitoring"],
    duration: "Tailored",
    featured: false
  }
];

export function ServicesSection() {
  const featured = programs[0];
  const secondary = programs.slice(1);

  return (
    <section id="services" className="py-24 relative z-10 overflow-hidden services-dark">
      <SectionBg variant="services" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">

        <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-primary border border-primary/25 bg-primary/8 px-3 py-1.5 rounded-full mb-5">
              Signature Programs
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight text-foreground text-glow-white">
              A Different Approach<br className="hidden md:block" /> to Care
            </h2>
          </div>
          <p className="text-muted-foreground text-base max-w-sm font-light leading-relaxed">
            Structured medical programs — each built around your biology, guided by clinical assessment, focused on measurable outcomes.
          </p>
        </FadeIn>

        <FadeIn className="mb-5">
          <div className="relative rounded-2xl overflow-hidden glass-card group">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              <div className="lg:col-span-2 bg-primary/5 p-10 relative overflow-hidden flex flex-col justify-between border-r border-border">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-mono tracking-widest text-primary/60">{featured.num}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-widest bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">
                      {featured.tag}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3 leading-tight">{featured.title}</h3>
                  <p className="text-muted-foreground text-sm font-light italic leading-relaxed">{featured.subtitle}</p>
                </div>
                <div className="relative z-10 mt-8">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest block mb-1">Duration</span>
                  <span className="text-sm font-semibold text-foreground/80">{featured.duration}</span>
                </div>
              </div>

              <div className="lg:col-span-3 p-10 flex flex-col justify-between">
                <div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-7">{featured.who}</p>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-foreground/50 mb-4 block">What's Included</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                    {featured.includes.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-primary" />
                        </div>
                        <span className="text-sm text-foreground/70">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
                  className="mt-8 self-start flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm font-semibold hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 group"
                >
                  Enquire About This Program
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {secondary.map((prog, idx) => (
            <FadeIn key={idx} delay={(idx + 1) * 0.1} className="h-full">
              <div className="group h-full rounded-2xl glass-card overflow-hidden flex flex-col">
                <div className="bg-primary/5 px-8 py-6 relative overflow-hidden border-b border-border">
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-primary/50 block mb-1">{prog.num}</span>
                      <h3 className="text-lg font-bold text-foreground leading-tight">{prog.title}</h3>
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest bg-muted text-muted-foreground px-3 py-1 rounded-full border border-border">
                      {prog.tag}
                    </span>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{prog.who}</p>
                  <ul className="space-y-2 flex-grow mb-6">
                    {prog.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/60">
                        <span className="mt-2 w-1 h-1 rounded-full bg-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between pt-5 border-t border-border">
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Duration</span>
                      <p className="text-sm font-semibold text-foreground mt-0.5">{prog.duration}</p>
                    </div>
                    <button
                      onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
                      className="flex items-center gap-1 text-xs font-semibold text-primary hover:gap-2 transition-all duration-200"
                    >
                      Enquire <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3} className="mt-5">
          <div className="rounded-2xl glass-card px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-sm text-foreground mb-1">Not sure which program is right for you?</p>
              <p className="text-xs text-muted-foreground">Our physician will guide you to the right program during your initial consultation.</p>
            </div>
            <button
              onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
              className="shrink-0 px-6 py-3 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-300"
            >
              Book a Consultation
            </button>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
