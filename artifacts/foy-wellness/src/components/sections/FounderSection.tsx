import { FadeIn } from "../animations/FadeIn";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Award, GraduationCap, Microscope, Globe } from "lucide-react";

const BASE = import.meta.env.BASE_URL;

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
    <section className="py-24 bg-glow-radial relative z-10 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">

        <FadeIn className="mb-14">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-primary border border-primary/25 bg-primary/8 px-3 py-1.5 rounded-full mb-5">
            Meet the Founder
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight text-foreground text-glow-white">
            Led by Dr. Ahmed Amer
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5" ref={ref}>

          <motion.div
            className="lg:col-span-3 rounded-2xl overflow-hidden relative group"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative h-full min-h-[480px] bg-white border border-border overflow-hidden rounded-2xl">
              <img
                src={`${BASE}images/dr-ahmed-amer.jpg`}
                alt="Dr. Ahmed Amer — Founder of FOY Clinic"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                style={{ minHeight: 480 }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-6 pt-16 pb-6">
                <p className="text-white font-display font-bold text-lg leading-tight">Dr. Ahmed Amer</p>
                <p className="text-primary text-xs font-medium tracking-wide mt-1">Founder & Medical Director</p>
                <p className="text-white/50 text-[10px] mt-1">FOY Clinic · Cairo, Egypt</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-5 rounded-2xl glass-card overflow-hidden relative flex flex-col"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="p-8 lg:p-10 flex flex-col flex-1 relative z-10">
              <p className="text-[10px] font-semibold text-primary/70 uppercase tracking-[0.2em] mb-6">His Mission</p>

              <p className="text-foreground/75 text-base font-light leading-relaxed mb-5">
                Dr. Ahmed Amer founded FOY Clinic to introduce a fundamentally different model of healthcare — one that does not wait for illness to develop, but focuses on preserving vitality, optimizing metabolic function, and extending healthspan through science, personalization, and precision medicine.
              </p>
              <p className="text-muted-foreground text-sm font-light leading-relaxed mb-8">
                With over 15 years of clinical experience and a deep specialization in longevity medicine and regenerative therapies, Dr. Amer built FOY around one core belief: that every individual deserves a healthcare strategy as unique as their own biology — not a generic protocol, but a physician-guided, data-driven program designed to produce measurable, lasting results.
              </p>

              <div className="border-l-2 border-primary/30 pl-5 mb-8 flex-1">
                <p className="text-sm font-display italic text-muted-foreground leading-relaxed">
                  "FOY is more than a clinic. It is the beginning of a new approach to modern healthcare — one that treats the person, not just the condition."
                </p>
                <p className="text-xs text-primary mt-2 font-medium">
                  — Dr. Ahmed Amer, Founder
                </p>
              </div>

              <button
                onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
                className="self-start flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-300 group"
              >
                Book with Dr. Amer
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>

          <div className="lg:col-span-4 flex flex-col gap-5">
            <motion.div
              className="rounded-2xl glass-card overflow-hidden"
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="bg-muted/50 px-7 py-4 border-b border-border">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.2em]">Credentials</p>
              </div>
              <div className="divide-y divide-border">
                {credentials.map((c, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-4 px-7 py-4 hover:bg-primary/3 transition-colors group"
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  >
                    <span className="text-primary shrink-0 group-hover:scale-110 transition-transform duration-200">{c.icon}</span>
                    <span className="text-xs text-foreground/70 font-medium leading-snug">{c.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="flex-1 rounded-2xl bg-primary/5 border border-primary/15 p-7 relative overflow-hidden"
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[10px] font-semibold text-primary/70 uppercase tracking-[0.2em] mb-5">Clinical Focus</p>
              <div className="space-y-5 relative z-10">
                {pillars.map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.45 + i * 0.1 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span className="text-xs font-bold text-foreground/80">{p.label}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed pl-3.5">{p.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
