import { FadeIn } from "../animations/FadeIn";
import { ArrowUpRight, TrendingUp } from "lucide-react";

const outcomes = [
  { num: "97%", label: "Patient Satisfaction", desc: "Across all programs and treatment categories" },
  { num: "8 wks", label: "Avg. Visible Results", desc: "For metabolic and skin-focused protocols" },
  { num: "10K+", label: "Patients Treated", desc: "Since our founding in Cairo, Egypt" },
  { num: "3×", label: "Energy Improvement", desc: "Reported by Metabolic Reset patients at 12 weeks" },
];

const metrics = [
  { label: "Fasting Glucose", before: "112 mg/dL", after: "88 mg/dL", improvement: "−21%", positive: true },
  { label: "Biological Age", before: "+6 yrs", after: "−4 yrs", improvement: "10 yr shift", positive: true },
  { label: "Visceral Fat Index", before: "14", after: "9", improvement: "−36%", positive: true },
  { label: "Energy Score", before: "3.2 / 10", after: "8.1 / 10", improvement: "+153%", positive: true },
  { label: "HbA1c", before: "6.1%", after: "5.3%", improvement: "−13%", positive: true },
  { label: "VO₂ Max", before: "28 ml/kg/min", after: "38 ml/kg/min", improvement: "+36%", positive: true },
];

export function BeforeAfterSection() {
  return (
    <section id="results" className="py-24 bg-background relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-8">

        <FadeIn className="mb-14">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-primary border border-primary/25 bg-primary/8 px-3 py-1.5 rounded-full mb-5">
            Clinical Outcomes
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight text-glow-white">
              What FOY Delivers
            </h2>
            <p className="text-muted-foreground text-base max-w-sm font-light">
              Measurable shifts in biomarkers, energy, and biological age — tracked from consultation through follow-up.
            </p>
          </div>
        </FadeIn>

        {/* Biomarker table */}
        <FadeIn delay={0.1} className="mb-5">
          <div className="rounded-3xl border border-border bg-card overflow-hidden">
            <div className="px-8 py-5 bg-[#040b14] border-b border-border flex items-center justify-between">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              <div className="flex items-center gap-3">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-foreground/70 tracking-wide">Avg. Biomarker Improvements · Metabolic Reset Program</span>
              </div>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest hidden sm:block">12-week protocol</span>
            </div>
            <div className="divide-y divide-border">
              {metrics.map((m, i) => (
                <FadeIn key={i} delay={0.05 * i}>
                  <div className="grid grid-cols-4 items-center px-8 py-4 hover:bg-primary/3 transition-colors">
                    <span className="text-sm font-medium text-foreground/70 col-span-1">{m.label}</span>
                    <span className="text-sm text-muted-foreground text-center">{m.before}</span>
                    <span className="text-sm text-foreground/80 font-semibold text-center">{m.after}</span>
                    <span className="text-sm font-bold text-primary text-right text-glow">{m.improvement}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
            <div className="grid grid-cols-4 px-8 py-3 bg-muted/30 border-t border-border">
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest col-span-1">Biomarker</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest text-center">Baseline</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest text-center">At 12 wks</span>
              <span className="text-[10px] text-primary uppercase tracking-widest text-right">Change</span>
            </div>
          </div>
        </FadeIn>

        {/* Outcome stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
          {outcomes.map((o, i) => (
            <FadeIn key={i} delay={0.1 + i * 0.07} direction="up">
              <div className="group rounded-2xl bg-card border border-border p-6 hover:border-primary/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4),0_0_16px_rgba(16,185,171,0.05)] hover:-translate-y-1 transition-all duration-300 h-full">
                <div className="text-2xl font-display font-bold text-primary mb-1 text-glow">{o.num}</div>
                <div className="text-xs font-semibold text-foreground/70 mb-2 leading-snug">{o.label}</div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{o.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Quote + CTA */}
        <FadeIn delay={0.4}>
          <div className="rounded-3xl bg-primary/5 border border-primary/20 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-base text-foreground/60 font-light italic font-display leading-relaxed mb-3 max-w-2xl">
                "The results were measurable from the first follow-up. My biomarkers shifted significantly — not just how I looked, but how I felt at a cellular level."
              </p>
              <p className="text-xs text-primary font-medium text-glow">— Dr. M. Khalil, Cairo · Longevity Optimization Program</p>
            </div>
            <button
              onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
              className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary/12 border border-primary/25 text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-300 group"
            >
              Start Your Journey
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
