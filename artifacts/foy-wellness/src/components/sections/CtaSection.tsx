import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-teal-600" />
          <div className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(ellipse 80% 80% at 20% 80%, rgba(197,165,114,0.3) 0%, transparent 60%),
                radial-gradient(ellipse 60% 60% at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)`
            }}
          />

          <div className="relative z-10 px-8 py-20 md:px-16 md:py-24 text-center flex flex-col items-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block text-white/60 text-xs font-semibold tracking-[0.25em] uppercase mb-6"
            >
              Begin Your Transformation
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6 max-w-3xl"
            >
              Your Health Deserves a{" "}
              <span className="italic text-gold">New Standard</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white/70 text-base md:text-lg font-light max-w-xl mb-10 leading-relaxed"
            >
              Schedule a consultation with Dr. Ahmed Amer and discover a physician-led, data-driven approach to longevity.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
              className="group flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-full text-sm font-bold tracking-wide hover:bg-white/90 transition-all duration-300 animate-pulse-glow"
            >
              Book a Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
