import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FadeIn } from "../animations/FadeIn";
import { Activity, Microscope, Leaf, Sparkles, ArrowUpRight } from "lucide-react";
import { SectionBg } from "../SectionBg";
import { PulseRings } from "../PulseRings";

const pillars = [
  {
    icon: <Microscope className="w-5 h-5" />,
    title: "Longevity Diagnostics",
    desc: "Advanced biomarker panels and biological age assessment that reveal how your body is truly aging at the cellular level.",
    delay: 0
  },
  {
    icon: <Activity className="w-5 h-5" />,
    title: "Metabolic Optimization",
    desc: "Precision interventions that restore insulin sensitivity, energy regulation, and body composition from within.",
    delay: 0.08
  },
  {
    icon: <Leaf className="w-5 h-5" />,
    title: "Regenerative Medicine",
    desc: "Science-led therapies supporting cellular repair, tissue recovery, and long-term physical resilience.",
    delay: 0.16
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: "Aesthetic Longevity",
    desc: "Medical-grade aesthetic care that aligns outer vitality with your inner biological health.",
    delay: 0.24
  }
];

function PillarCard({ pillar }: { pillar: typeof pillars[0] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: pillar.delay, ease: [0.22, 1, 0.36, 1] }}
      className="group h-full rounded-2xl glass-card p-7 cursor-default"
    >
      <motion.div
        className="w-10 h-10 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center text-primary mb-5"
      >
        {pillar.icon}
      </motion.div>
      <h3 className="font-bold text-sm text-foreground mb-2 leading-snug group-hover:text-primary transition-colors duration-300">{pillar.title}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed">{pillar.desc}</p>
    </motion.div>
  );
}

export function ProblemSection() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });

  const stats = [
    { num: 10000, suffix: "+", label: "Patients Treated" },
    { num: 97, suffix: "%", label: "Satisfaction Rate" },
    { num: 15, suffix: "+", label: "Years of Excellence" },
  ];

  return (
    <section id="problem" className="py-24 relative z-10 overflow-hidden">
      <SectionBg variant="problem" />
      <PulseRings origins={[
        { x: "10%", y: "20%", color: "rgba(239, 68, 68, 0.18)", delay: 0, size: 380, count: 3 },
        { x: "90%", y: "80%", color: "rgba(16, 185, 171, 0.22)", delay: 1.8, size: 420, count: 3 },
        { x: "50%", y: "50%", color: "rgba(197, 165, 114, 0.15)", delay: 0.9, size: 600, count: 4 },
      ]} />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <FadeIn className="mb-10">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-primary border border-primary/25 bg-primary/8 px-3 py-1.5 rounded-full">
            What is FOY?
          </span>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
          <FadeIn className="lg:col-span-2 h-full">
            <div className="relative h-full min-h-[340px] rounded-2xl glass-card p-10 flex flex-col justify-between group">
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground text-glow-white leading-tight mb-5">
                  A New Standard in<br />
                  <span className="italic text-primary">
                    Preventive Medicine
                  </span>
                </h2>
                <p className="text-muted-foreground text-base font-light leading-relaxed max-w-lg">
                  FOY was founded to introduce a different model of healthcare — one that focuses on preserving vitality, optimizing function, and extending healthspan long before illness appears.
                </p>
              </div>

              <div className="relative z-10 mt-8 pt-6 border-t border-border">
                <p className="text-sm font-display italic text-muted-foreground">
                  "FOY is more than a clinic. It is the beginning of a new approach to modern healthcare."
                </p>
                <p className="text-xs text-primary mt-2 font-medium tracking-wide">
                  — Dr. Ahmed Amer, Founder
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="h-full">
            <div ref={statsRef} className="h-full min-h-[340px] rounded-2xl glass-card bg-primary/5 p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-primary/70 block mb-6">By the Numbers</span>
                {stats.map((stat, i) => (
                  <div key={stat.label} className="flex items-baseline justify-between py-4 border-b border-primary/10 last:border-0">
                    <motion.span
                      className="text-2xl font-display font-bold text-primary text-glow"
                      initial={{ opacity: 0, x: -10 }}
                      animate={statsInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                    >
                      {stat.num.toLocaleString()}{stat.suffix}
                    </motion.span>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                  </div>
                ))}
              </div>
              <motion.button
                onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
                className="mt-6 w-full flex items-center justify-between px-5 py-3.5 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-300 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Book Consultation</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.button>
            </div>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p, idx) => (
            <PillarCard key={idx} pillar={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
