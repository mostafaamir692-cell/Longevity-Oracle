import { FadeIn } from "../animations/FadeIn";
import { ArrowRight } from "lucide-react";

const programs = [
  {
    num: "01",
    title: "Metabolic Reset Program",
    tagline: "Restore metabolic balance. Improve energy. Support long-term health.",
    who: "Designed for individuals experiencing fatigue, weight challenges, insulin resistance, or early metabolic dysfunction.",
    includes: ["Metabolic laboratory testing", "Body composition analysis", "Personalized nutrition strategy", "Sleep & stress optimization", "Ongoing follow-up consultations"],
    duration: "4–6 months"
  },
  {
    num: "02",
    title: "Longevity Optimization Program",
    tagline: "Enhance healthspan. Optimize performance. Support long-term vitality.",
    who: "Designed for proactive individuals seeking to understand their biological age, prevent decline, and sustain high performance.",
    includes: ["Advanced longevity consultation", "Biomarker & biological age assessment", "Personalized longevity plan", "Lifestyle optimization strategies", "Long-term monitoring"],
    duration: "3–6 months"
  },
  {
    num: "03",
    title: "Regeneration Program",
    tagline: "Support recovery. Enhance repair. Integrate regenerative medicine.",
    who: "Designed for individuals seeking advanced regenerative therapies, tissue recovery support, and complementary longevity strategies.",
    includes: ["Regenerative medicine consultation", "Personalized treatment planning", "Integration with longevity programs", "Structured follow-up & monitoring"],
    duration: "Tailored to individual needs"
  }
];

export function ServicesSection() {
  const scrollToBooking = () => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="services" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14">
          <FadeIn>
            <span className="section-label">Signature Programs</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-[1.1]">
              A Different Approach<br />to Care
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <button onClick={scrollToBooking} className="flex items-center gap-2 text-sm text-primary font-medium group hover:gap-3 transition-all">
              Book a Consultation <ArrowRight className="w-4 h-4" />
            </button>
          </FadeIn>
        </div>

        <div className="rule mb-0" />

        {/* Editorial program list */}
        {programs.map((prog, idx) => (
          <FadeIn key={idx} delay={idx * 0.1}>
            <div className="group py-10 border-b border-border grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start hover:bg-muted/30 -mx-4 px-4 rounded-2xl transition-colors duration-300">
              
              {/* Number + Title col */}
              <div className="lg:col-span-4">
                <span className="text-[11px] text-primary font-mono tracking-widest block mb-2">{prog.num}</span>
                <h3 className="text-xl font-bold text-foreground mb-2 leading-tight">{prog.title}</h3>
                <p className="text-sm text-muted-foreground font-light italic leading-relaxed">{prog.tagline}</p>
              </div>

              {/* Description col */}
              <div className="lg:col-span-4">
                <p className="text-sm text-muted-foreground font-light leading-relaxed mb-4">{prog.who}</p>
                <ul className="space-y-1.5">
                  {prog.includes.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Duration + CTA col */}
              <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between h-full gap-4">
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Duration</span>
                  <p className="text-sm font-semibold text-foreground mt-0.5">{prog.duration}</p>
                </div>
                <button
                  onClick={scrollToBooking}
                  className="flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-primary transition-colors group-hover:gap-3"
                >
                  Enquire <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </FadeIn>
        ))}

        {/* Bottom CTA band */}
        <FadeIn delay={0.4} className="mt-12">
          <div className="bg-muted/60 rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 border border-border">
            <div>
              <h4 className="font-bold text-base mb-1">Which program is right for you?</h4>
              <p className="text-sm text-muted-foreground font-light">During your consultation, our physician assesses your current health and goals to recommend the most suitable program.</p>
            </div>
            <button
              onClick={scrollToBooking}
              className="shrink-0 px-7 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm"
            >
              Book Your Consultation
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
