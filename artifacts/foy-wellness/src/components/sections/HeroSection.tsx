import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PremiumButton } from "../ui/PremiumButton";
import { ChevronDown, ShieldCheck } from "lucide-react";
import { DnaTreeCanvas } from "../DnaTreeCanvas";
import { FloatingOrbs } from "../FloatingOrbs";

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToServices = () => {
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  };
  
  const scrollToBooking = () => {
    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f0fafa] to-white" />
        <FloatingOrbs />
        <DnaTreeCanvas />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 text-center flex flex-col items-center pt-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <span className="glass inline-block py-1.5 px-5 rounded-full text-primary uppercase tracking-[0.2em] text-xs font-semibold">
            Longevity &amp; Regenerative Medicine
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-4"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight max-w-4xl text-foreground text-glow-white">
            Healing. Thriving.{" "}
            <span className="text-gradient-teal-gold text-glow">
              Living Beautifully.
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base md:text-lg text-muted-foreground max-w-2xl mb-3 font-light leading-relaxed"
        >
          FOY Clinic combines longevity medicine, metabolic optimization, and regenerative science — helping individuals live healthier, stronger, and longer lives.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-sm text-primary tracking-widest uppercase font-medium mb-12"
        >
          Led by Dr. Ahmed Amer — Cairo, Egypt
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col items-center gap-8 w-full"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <PremiumButton onClick={scrollToBooking} size="lg" className="w-full sm:w-auto animate-pulse-glow">
              Book a Consultation
            </PremiumButton>
            <PremiumButton variant="outline" onClick={scrollToServices} size="lg" className="w-full sm:w-auto">
              Explore Programs
            </PremiumButton>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground font-medium">
            {[
              { icon: <ShieldCheck className="w-4 h-4 text-primary" />, label: "Physician-Led Care" },
              { icon: <ShieldCheck className="w-4 h-4 text-primary" />, label: "Evidence-Based Protocols" },
              { icon: <ShieldCheck className="w-4 h-4 text-secondary" />, label: "10,000+ Patients" },
            ].map((badge, i) => (
              <span key={i} className="flex items-center gap-1.5 glass px-3 py-1.5 rounded-full">
                {badge.icon}
                {badge.label}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-muted-foreground/50 hover:text-primary transition-colors cursor-pointer z-10"
        onClick={() => document.querySelector("#problem")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span className="text-[10px] uppercase tracking-widest mb-2 font-medium">Discover</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown size={22} />
        </motion.div>
      </motion.div>
    </section>
  );
}
