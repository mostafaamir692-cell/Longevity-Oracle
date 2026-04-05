import { FadeIn } from "../animations/FadeIn";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Award, GraduationCap, Microscope, Globe } from "lucide-react";

const credentials = [
  { icon: <GraduationCap className="w-4 h-4" />, text: "Medical Doctor — Cairo University" },
  { icon: <Microscope className="w-4 h-4" />, text: "Specialist in Regenerative & Longevity Medicine" },
  { icon: <Award className="w-4 h-4" />, text: "15+ Years Clinical Experience" },
  { icon: <Globe className="w-4 h-4" />, text: "Founder, FOY Clinic — El Mohandseen, Cairo" },
];

const pillars = [
  { label: "Longevity Science", desc: "Evidence-based protocols that address biological aging at its root." },
  { label: "Metabolic Medicine", desc: "Precision metabolic assessments and personalized interventions." },
  { label: "Regenerative Therapy", desc: "Advanced science supporting the body's own repair systems." },
];

export function FounderSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 bg-background relative z-10 overflow-hidden">
      {/* Ambient orbs */}
      <motion.div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/4 rounded-full blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gold/4 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">

        <FadeIn className="mb-14">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-primary border border-primary/25 bg-primary/8 px-3 py-1.5 rounded-full mb-5">
            Meet the Founder
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight text-glow-white">
            Led by Dr. Ahmed Amer
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5" ref={ref}>

          {/* Main bio card – 3 cols */}
          <motion.div
            className="lg:col-span-3 rounded-3xl bg-[#040b14] border border-border overflow-hidden relative"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-primary/8 rounded-full blur-3xl pointer-events-none" />

            {/* Name banner */}
            <div className="bg-gradient-to-r from-primary/10 to-transparent border-b border-border px-10 py-7 relative">
              <div className="flex items-start gap-5">
                {/* Monogram / avatar */}
                <div className="relative shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center shadow-[0_0_24px_rgba(16,185,171,0.2)]">
                    <span className="text-2xl font-display font-bold text-primary text-glow">AA</span>
                  </div>
                  <motion.div
                    className="absolute -inset-1 rounded-2xl border border-primary/20"
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-foreground/90 mb-1">Dr. Ahmed Amer</h3>
                  <p className="text-xs text-primary font-medium text-glow tracking-wide">Founder & Medical Director, FOY Clinic</p>
                  <p className="text-xs text-muted-foreground mt-1">El Mohandseen, Cairo, Egypt</p>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="p-10 relative z-10">
              <p className="text-foreground/55 text-base font-light leading-relaxed mb-5">
                Dr. Ahmed Amer founded FOY Clinic to introduce a fundamentally different model of healthcare — one that does not wait for illness to develop, but focuses on preserving vitality, optimizing metabolic function, and extending healthspan through science, personalization, and precision medicine.
              </p>
              <p className="text-foreground/40 text-sm font-light leading-relaxed mb-8">
                With over 15 years of clinical experience and a deep specialization in longevity medicine and regenerative therapies, Dr. Amer built FOY around one core belief: that every individual deserves a healthcare strategy as unique as their own biology — not a generic protocol, but a physician-guided, data-driven program designed to produce measurable, lasting results.
              </p>

              {/* Quote */}
              <div className="border-l-2 border-primary/40 pl-5 mb-8">
                <p className="text-sm font-display italic text-foreground/50 leading-relaxed">
                  "FOY is more than a clinic. It is the beginning of a new approach to modern healthcare — one that treats the person, not just the condition."
                </p>
                <p className="text-xs text-primary mt-2 font-medium text-glow">— Dr. Ahmed Amer</p>
              </div>

              <button
                onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary/12 border border-primary/25 text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-300 group"
              >
                Book a Consultation with Dr. Amer
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Right column – 2 cols */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {/* Credentials */}
            <motion.div
              className="rounded-3xl bg-card border border-border overflow-hidden"
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="bg-[#040b14] px-7 py-4 border-b border-border relative">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.2em]">Credentials</p>
              </div>
              <div className="divide-y divide-border">
                {credentials.map((c, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-4 px-7 py-4 hover:bg-primary/3 transition-colors group"
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.25 + i * 0.08 }}
                  >
                    <span className="text-primary shrink-0 group-hover:scale-110 transition-transform duration-200">{c.icon}</span>
                    <span className="text-xs text-foreground/65 font-medium leading-snug">{c.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Clinical pillars */}
            <motion.div
              className="flex-1 rounded-3xl bg-primary/5 border border-primary/20 p-7 relative overflow-hidden"
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
              <p className="text-[10px] font-semibold text-primary/60 uppercase tracking-[0.2em] mb-5">Clinical Focus</p>
              <div className="space-y-4 relative z-10">
                {pillars.map((p, i) => (
                  <motion.div
                    key={i}
                    className="group"
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-primary"
                        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.8 }}
                        style={{ boxShadow: "0 0 6px rgba(16,185,171,0.8)" }}
                      />
                      <span className="text-xs font-bold text-foreground/80">{p.label}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed pl-3.5">{p.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* Animated border pulse */}
              <motion.div
                className="absolute inset-0 rounded-3xl border border-primary/0 pointer-events-none"
                animate={{ borderColor: ["rgba(16,185,171,0)", "rgba(16,185,171,0.15)", "rgba(16,185,171,0)"] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
