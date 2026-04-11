import { useEffect, useRef, useState } from "react";
import { FadeIn } from "../animations/FadeIn";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const metrics = [
  { label: "Fasting Glucose", improvement: 21, unit: "mg/dL", before: "112", after: "88", color: "from-primary to-primary/60" },
  { label: "Biological Age", improvement: 62, unit: "yr shift", before: "+6 yrs", after: "−4 yrs", color: "from-primary to-teal-400" },
  { label: "Visceral Fat Index", improvement: 36, unit: "%", before: "14", after: "9", color: "from-teal-500 to-primary" },
  { label: "Energy Score", improvement: 85, unit: "%", before: "3.2/10", after: "8.1/10", color: "from-secondary to-amber-400" },
  { label: "HbA1c", improvement: 13, unit: "%", before: "6.1%", after: "5.3%", color: "from-primary to-teal-300" },
  { label: "VO₂ Max", improvement: 36, unit: "%", before: "28", after: "38", color: "from-teal-400 to-primary" },
];

function AnimatedBar({ value, color, delay = 0 }: { value: number; color: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className="h-1.5 bg-muted rounded-full overflow-hidden">
      <motion.div
        className={`h-full rounded-full bg-gradient-to-r ${color}`}
        initial={{ width: 0 }}
        animate={inView ? { width: `${value}%` } : { width: 0 }}
        transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
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

function RadialStat({ value, label, color = "#43A8A3" }: { value: number; label: string; color?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <div className="relative w-28 h-28">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(200, 15%, 92%)" strokeWidth="6" />
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
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-display font-bold text-primary">
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
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <FadeIn className="mb-14">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-primary border border-primary/25 bg-primary/8 px-3 py-1.5 rounded-full mb-5">
            Clinical Outcomes
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight text-foreground text-glow-white">
              What FOY Delivers
            </h2>
            <p className="text-muted-foreground text-base max-w-sm font-light">
              Measurable biomarker shifts tracked from consultation through follow-up — not estimates.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-5">
          <FadeIn className="lg:col-span-3 h-full">
            <div className="h-full rounded-2xl glass-card overflow-hidden">
              <div className="bg-muted/50 px-8 py-5 border-b border-border">
                <p className="text-xs font-semibold text-foreground/60 uppercase tracking-[0.2em]">Avg. Biomarker Improvements · 12-Week Protocol</p>
              </div>
              <div className="p-8 space-y-7">
                {metrics.map((m, i) => (
                  <FadeIn key={i} delay={i * 0.07} direction="up">
                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-foreground/80">{m.label}</span>
                          <span className="text-[10px] text-muted-foreground font-mono">{m.before} → {m.after}</span>
                        </div>
                        <motion.span
                          className="text-sm font-bold text-primary font-mono"
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

          <div className="lg:col-span-2 flex flex-col gap-5">
            <FadeIn delay={0.2} className="flex-1">
              <div className="h-full rounded-2xl glass-card p-8 flex flex-col items-center justify-center gap-8">
                <div className="grid grid-cols-2 gap-6 relative z-10 w-full">
                  <RadialStat value={97} label="Patient Satisfaction" />
                  <RadialStat value={86} label="Biomarker Improvement" color="#C5A572" />
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
                  <div key={label} className="rounded-xl glass-card p-5 text-center">
                    <div className="text-2xl font-display font-bold text-primary mb-1">
                      <AnimatedNumber value={num} suffix={suffix} />
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>

        <FadeIn delay={0.5}>
          <div className="rounded-2xl bg-primary/5 border border-primary/15 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-primary/25 transition-colors duration-300">
            <div>
              <p className="text-base text-muted-foreground font-light italic font-display leading-relaxed mb-3 max-w-2xl">
                "The results were measurable from the first follow-up. My biomarkers shifted significantly — not just how I looked, but how I felt at a cellular level."
              </p>
              <p className="text-xs text-primary font-medium">— Dr. M. Khalil, Cairo · Longevity Optimization Program</p>
            </div>
            <button
              onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
              className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-300 group"
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
