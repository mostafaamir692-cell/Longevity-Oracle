import { useEffect, useRef, useState } from "react";
import { FadeIn } from "../animations/FadeIn";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const metrics = [
  { label: "Fasting Glucose", improvement: 21, unit: "mg/dL", before: "112", after: "88", color: "from-teal-500 to-primary" },
  { label: "Biological Age", improvement: 62, unit: "yr shift", before: "+6 yrs", after: "−4 yrs", color: "from-primary to-teal-300" },
  { label: "Visceral Fat Index", improvement: 36, unit: "%", before: "14", after: "9", color: "from-teal-400 to-cyan-300" },
  { label: "Energy Score", improvement: 85, unit: "%", before: "3.2/10", after: "8.1/10", color: "from-gold to-amber-300" },
  { label: "HbA1c", improvement: 13, unit: "%", before: "6.1%", after: "5.3%", color: "from-primary to-teal-200" },
  { label: "VO₂ Max", improvement: 36, unit: "%", before: "28", after: "38", color: "from-cyan-400 to-primary" },
];

const outcomes = [
  { num: 97, suffix: "%", label: "Patient Satisfaction" },
  { num: 8, suffix: " wks", label: "Avg. Results" },
  { num: 10, suffix: "K+", label: "Treated" },
  { num: 15, suffix: "+", label: "Years" },
];

function AnimatedBar({ value, color, delay = 0 }: { value: number; color: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className="h-1.5 bg-white/5 rounded-full overflow-hidden">
      <motion.div
        className={`h-full rounded-full bg-gradient-to-r ${color}`}
        initial={{ width: 0 }}
        animate={inView ? { width: `${value}%` } : { width: 0 }}
        transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{ boxShadow: "0 0 8px rgba(16,185,171,0.5)" }}
      />
    </div>
  );
}

function AnimatedNumber({ value, suffix = "", duration = 1.5 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: duration * 1000, bounce: 0 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionVal.set(value);
  }, [inView, value]);

  useEffect(() => spring.on("change", (v) => setDisplay(Math.round(v))), [spring]);

  return <span ref={ref}>{display}{suffix}</span>;
}

function RadialStat({ value, label, color = "#0DB5A6" }: { value: number; label: string; color?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <div className="relative w-28 h-28">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
          <motion.circle
            cx="50" cy="50" r="40"
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={inView ? { strokeDashoffset: offset } : {}}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            style={{ filter: `drop-shadow(0 0 6px ${color})` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-display font-bold text-primary text-glow">
            <AnimatedNumber value={value} suffix="%" />
          </span>
        </div>
      </div>
      <span className="text-xs text-muted-foreground text-center font-medium">{label}</span>
    </div>
  );
}

export function BeforeAfterSection() {
  return (
    <section id="results" className="py-24 bg-data-lines relative z-10 overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none animate-float-orb" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-gold/4 rounded-full blur-[80px] pointer-events-none" style={{ animationDelay: "3s" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <FadeIn className="mb-14">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-primary border border-primary/25 bg-primary/8 px-3 py-1.5 rounded-full mb-5">
            Clinical Outcomes
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight text-glow-white">
              What FOY Delivers
            </h2>
            <p className="text-muted-foreground text-base max-w-sm font-light">
              Measurable biomarker shifts tracked from consultation through follow-up — not estimates.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-5">

          {/* Biomarker bars – 3 cols */}
          <FadeIn className="lg:col-span-3 h-full">
            <div className="h-full rounded-3xl bg-card border border-border overflow-hidden">
              <div className="bg-[#040b14] px-8 py-5 border-b border-border relative">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                <p className="text-xs font-semibold text-foreground/50 uppercase tracking-[0.2em]">Avg. Biomarker Improvements · 12-Week Protocol</p>
              </div>
              <div className="p-8 space-y-7">
                {metrics.map((m, i) => (
                  <FadeIn key={i} delay={i * 0.07} direction="up">
                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-foreground/75">{m.label}</span>
                          <span className="text-[10px] text-muted-foreground font-mono">{m.before} → {m.after}</span>
                        </div>
                        <motion.span
                          className="text-sm font-bold text-primary text-glow font-mono"
                          initial={{ opacity: 0, x: 10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + i * 0.07 }}
                        >
                          −{m.improvement}{m.unit === "yr shift" ? " yr" : "%"}
                        </motion.span>
                      </div>
                      <AnimatedBar value={m.improvement} color={m.color} delay={0.2 + i * 0.07} />
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Radial stats – 2 cols */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <FadeIn delay={0.2} className="flex-1">
              <div className="h-full rounded-3xl bg-[#040b14] border border-border p-8 relative overflow-hidden flex flex-col items-center justify-center gap-8">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />

                <div className="grid grid-cols-2 gap-6 relative z-10 w-full">
                  <RadialStat value={97} label="Patient Satisfaction" />
                  <RadialStat value={86} label="Biomarker Improvement" color="#c9a227" />
                  <RadialStat value={94} label="Protocol Completion" />
                  <RadialStat value={78} label="Report Better Sleep" />
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { num: 10, suffix: "K+", label: "Patients Treated" },
                  { num: 15, suffix: "+", label: "Years of Excellence" },
                ].map(({ num, suffix, label }) => (
                  <div key={label} className="rounded-2xl bg-card border border-border p-5 text-center hover:border-primary/30 hover:shadow-[0_0_20px_rgba(16,185,171,0.07)] transition-all duration-300">
                    <div className="text-2xl font-display font-bold text-primary mb-1 text-glow">
                      <AnimatedNumber value={num} suffix={suffix} />
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Quote + CTA */}
        <FadeIn delay={0.5}>
          <motion.div
            className="rounded-3xl bg-primary/5 border border-primary/20 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            whileHover={{ borderColor: "rgba(16,185,171,0.4)", boxShadow: "0 0 32px rgba(16,185,171,0.08)" }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <p className="text-base text-foreground/55 font-light italic font-display leading-relaxed mb-3 max-w-2xl">
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
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}
