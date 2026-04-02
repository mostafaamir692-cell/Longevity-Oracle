import { motion } from "framer-motion";
import { PremiumButton } from "../ui/PremiumButton";
import { ParticleCanvas } from "../ParticleCanvas";
import { DnaTreeCanvas } from "../DnaTreeCanvas";
import { ChevronDown, ShieldCheck } from "lucide-react";
import { useMouseParallax } from "../../hooks/useMouseParallax";

export function HeroSection() {
  const parallaxOffset = useMouseParallax(14);

  const scrollToBooking = () => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
  const scrollToServices = () => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });

  const badges = [
    { label: "Physician-Led Care" },
    { label: "Evidence-Based Protocols" },
    { label: "10,000+ Patients" },
  ];

  return (
    <section className="min-h-screen flex overflow-hidden">
      {/* ── Left panel: white editorial ── */}
      <div className="w-full lg:w-[52%] flex flex-col justify-center px-8 md:px-14 lg:px-20 py-28 bg-background relative z-10">
        <div className="max-w-[500px] lg:ml-auto">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="section-label"
          >
            Longevity &amp; Regenerative Medicine
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="text-5xl md:text-6xl xl:text-7xl font-display font-bold leading-[1.06] text-foreground mb-6"
          >
            Healing.<br />Thriving.<br />
            <em className="text-primary not-italic">Living Beautifully.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-muted-foreground text-lg font-light leading-relaxed mb-3"
          >
            FOY Clinic combines longevity medicine, metabolic optimization, and regenerative science — helping individuals live healthier, stronger, and longer lives.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xs text-foreground/40 uppercase tracking-[0.2em] font-medium mb-10"
          >
            Led by Dr. Ahmed Amer · Cairo, Egypt
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-3 mb-10"
          >
            <PremiumButton size="lg" onClick={scrollToBooking}>
              Book a Consultation
            </PremiumButton>
            <PremiumButton size="lg" variant="outline" onClick={scrollToServices}>
              Explore Programs
            </PremiumButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap gap-x-5 gap-y-2"
          >
            {badges.map((b) => (
              <span key={b.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" />
                {b.label}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Subtle left edge accent line */}
        <div className="absolute left-0 top-1/4 bottom-1/4 w-[3px] bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
      </div>

      {/* ── Right panel: dark with canvas ── */}
      <div className="hidden lg:flex w-[48%] relative bg-[#091617] overflow-hidden">
        {/* Ambient radial */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_40%,rgba(13,148,136,0.18)_0%,transparent_70%)] pointer-events-none z-0" />

        <div
          className="absolute inset-0 z-0 transition-transform duration-75 ease-out"
          style={{ transform: `translate(${parallaxOffset.x * 0.4}px, ${parallaxOffset.y * 0.4}px)` }}
        >
          <DnaTreeCanvas />
        </div>
        <ParticleCanvas />

        {/* Fade from left panel */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/25 via-transparent to-transparent pointer-events-none z-10" />

        {/* Bottom info card */}
        <div className="absolute bottom-10 left-10 right-10 z-20">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5">
            <div className="grid grid-cols-3 divide-x divide-white/10">
              {[
                { num: "97%", label: "Satisfaction" },
                { num: "10K+", label: "Patients" },
                { num: "15+", label: "Years" },
              ].map(s => (
                <div key={s.label} className="text-center px-4 first:pl-0 last:pr-0">
                  <div className="text-2xl font-display font-bold text-primary mb-0.5">{s.num}</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute top-1/2 -translate-y-1/2 right-6 flex flex-col items-center gap-2 text-white/20 cursor-pointer hover:text-primary transition-colors z-20"
          onClick={() => document.querySelector("#problem")?.scrollIntoView({ behavior: "smooth" })}
        >
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown size={18} />
          </motion.div>
          <span className="text-[9px] uppercase tracking-[0.2em] [writing-mode:vertical-rl] rotate-180">Scroll</span>
        </motion.div>
      </div>
    </section>
  );
}
