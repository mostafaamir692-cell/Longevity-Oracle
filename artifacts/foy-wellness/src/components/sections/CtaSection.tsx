import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { ParticleField } from "../ParticleField";
import { PulseRings } from "../PulseRings";

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

          <div className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 60%),
                radial-gradient(ellipse 80% 80% at 20% 80%, rgba(197,165,114,0.3) 0%, transparent 60%),
                radial-gradient(ellipse 60% 60% at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
                radial-gradient(circle 200px at 50% 50%, rgba(255,255,255,0.12) 0%, transparent 50%)
              `
            }}
          />

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 500,
                height: 500,
                left: "50%",
                top: "50%",
                marginLeft: -250,
                marginTop: -250,
                background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 60%)",
                filter: "blur(40px)",
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 300,
                height: 300,
                left: "20%",
                top: "60%",
                background: "radial-gradient(circle, rgba(197,165,114,0.12) 0%, transparent 60%)",
                filter: "blur(30px)",
              }}
              animate={{
                x: [0, 30, 0],
                y: [0, -20, 0],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <ParticleField
            density={50}
            color="rgba(255, 255, 255, 0.7)"
            lineColor="rgba(255, 255, 255, 0.18)"
            maxDistance={140}
            speed={0.25}
          />

          <PulseRings origins={[
            { x: "50%", y: "50%", color: "rgba(255,255,255,0.35)", delay: 0, size: 600, count: 4 },
            { x: "85%", y: "30%", color: "rgba(197,165,114,0.4)", delay: 1.5, size: 350, count: 3 },
          ]} />

          <div className="absolute inset-0 pointer-events-none" style={{
            opacity: 0.05,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }} />

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
