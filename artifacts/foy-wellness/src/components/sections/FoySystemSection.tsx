import { FadeIn } from "../animations/FadeIn";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    num: "01",
    title: "Consultation",
    desc: "A thorough clinical conversation with our physician to understand your health, lifestyle, goals, and medical history.",
    icon: "🩺"
  },
  {
    num: "02",
    title: "Advanced Testing",
    desc: "Comprehensive biomarker panels, metabolic assessments, and biological age evaluations tailored to your individual profile.",
    icon: "🔬"
  },
  {
    num: "03",
    title: "Personalized Program",
    desc: "A structured, physician-designed protocol built entirely around your biology — not a generic template.",
    icon: "📋"
  },
  {
    num: "04",
    title: "Monitoring & Optimization",
    desc: "Continuous follow-up, data review, and protocol refinements to ensure your results are lasting and measurable.",
    icon: "📈"
  }
];

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-card border border-border rounded-3xl p-8 hover:border-primary/40 transition-all duration-500 overflow-hidden cursor-default"
      whileHover={{
        y: -6,
        boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(16,185,171,0.25), 0 0 30px rgba(16,185,171,0.08)"
      }}
    >
      {/* Animated gradient top accent */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={inView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.3 + index * 0.12 }}
      />

      {/* Background step number */}
      <span className="absolute right-5 bottom-3 text-7xl font-display font-bold text-primary/5 select-none pointer-events-none leading-none group-hover:text-primary/10 transition-colors duration-500">
        {step.num}
      </span>

      {/* Step number badge */}
      <motion.div
        className="w-11 h-11 rounded-2xl bg-primary/8 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:border-primary transition-all duration-300"
        whileHover={{ scale: 1.05 }}
      >
        <span className="text-xs font-bold font-mono text-primary group-hover:text-white transition-colors duration-300">
          {step.num}
        </span>
      </motion.div>

      <h3 className="font-bold text-lg text-foreground/90 mb-3 group-hover:text-primary transition-colors duration-300">
        {step.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed relative z-10">{step.desc}</p>

      {/* Glow orb on hover */}
      <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-primary/0 group-hover:bg-primary/10 rounded-full blur-2xl transition-all duration-500 pointer-events-none" />
    </motion.div>
  );
}

export function FoySystemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="system" className="py-24 bg-muted/30 relative z-10 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[22rem] font-display font-bold text-primary/3 select-none pointer-events-none leading-none pr-8 hidden lg:block">
        FOY
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <FadeIn className="mb-16 max-w-xl">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-primary border border-primary/25 bg-primary/8 px-3 py-1.5 rounded-full mb-5">
            How We Work
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight text-glow-white">
            Your Journey<br />at FOY
          </h2>
          <p className="text-muted-foreground mt-4 font-light text-base leading-relaxed">
            Health cannot be improved through isolated interventions. It requires a structured, data-driven approach.
          </p>
        </FadeIn>

        {/* Steps grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {steps.map((step, idx) => (
            <StepCard key={idx} step={step} index={idx} />
          ))}
        </div>

        {/* Animated connector / progress strip */}
        <FadeIn delay={0.6}>
          <div className="relative rounded-2xl bg-card border border-border px-8 py-5 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            {/* Animated progress bar */}
            <div className="flex items-center gap-4 mb-3">
              {steps.map((s, i) => (
                <div key={i} className="flex items-center gap-2 flex-1">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-primary shrink-0"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6 }}
                    style={{ boxShadow: "0 0 8px rgba(16,185,171,0.8)" }}
                  />
                  <div className="flex-1 h-[1px] bg-border relative overflow-hidden">
                    {i < steps.length - 1 && (
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-teal-300"
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }}
                        style={{ width: "50%" }}
                      />
                    )}
                  </div>
                </div>
              ))}
              <motion.div
                className="w-2 h-2 rounded-full bg-gold shrink-0"
                animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 1.8 }}
                style={{ boxShadow: "0 0 8px rgba(201,162,39,0.8)" }}
              />
            </div>

            <div className="flex items-center justify-between">
              {steps.map((s, i) => (
                <span key={i} className="text-[10px] text-muted-foreground uppercase tracking-widest hidden sm:block">{s.title}</span>
              ))}
              <span className="text-[10px] text-gold uppercase tracking-widest hidden sm:block">Results</span>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.7} className="mt-5">
          <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-card border border-border w-fit">
            <motion.div
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ boxShadow: "0 0 8px rgba(16,185,171,0.8)" }}
            />
            <p className="text-sm text-muted-foreground font-medium">Every step is physician-guided and medically supervised.</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
