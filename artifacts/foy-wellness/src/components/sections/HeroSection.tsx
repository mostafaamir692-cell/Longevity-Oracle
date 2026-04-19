import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PremiumButton } from "../ui/PremiumButton";
import { ChevronDown, ShieldCheck } from "lucide-react";
import { DnaTreeCanvas } from "../DnaTreeCanvas";
import { FloatingOrbs } from "../FloatingOrbs";
import { ParticleField } from "../ParticleField";
import { LightStreaks } from "../LightStreaks";
import { PulseRings } from "../PulseRings";

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
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        {/* Light teal-gold gradient — luxury medical spa aesthetic */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16,185,171,0.28) 0%, transparent 60%),
              radial-gradient(ellipse 70% 60% at 20% 70%, rgba(16,185,171,0.20) 0%, transparent 55%),
              radial-gradient(ellipse 60% 50% at 85% 50%, rgba(197,165,114,0.24) 0%, transparent 50%),
              linear-gradient(180deg, hsl(174, 38%, 92%) 0%, hsl(178, 32%, 89%) 50%, hsl(43, 32%, 92%) 100%)
            `,
          }}
        />

        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle 1px, rgba(16,185,171,0.18) 100%, transparent 100%)`,
            backgroundSize: "30px 30px",
          }}
        />

        {/* Noise texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.03,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />

        <FloatingOrbs />
        <PulseRings
          origins={[
            { x: "15%", y: "30%", color: "rgba(16, 185, 171, 0.30)", delay: 0, size: 500, count: 3 },
            { x: "85%", y: "70%", color: "rgba(197, 165, 114, 0.28)", delay: 2, size: 450, count: 3 },
          ]}
        />
        <ParticleField
          density={60}
          color="rgba(16, 185, 171, 0.55)"
          lineColor="rgba(16, 185, 171, 0.18)"
          maxDistance={150}
          speed={0.3}
        />
        <LightStreaks opacity={0.5} />
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
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-primary border border-primary/30 bg-primary/10 px-4 py-1.5 rounded-full backdrop-blur-md">
            Longevity &amp; Regenerative Medicine
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-4"
        >
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight max-w-4xl text-foreground"
          >
            Healing. Thriving.{" "}
            <span className="text-gradient-teal-gold">Living Beautifully.</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base md:text-lg max-w-2xl mb-3 font-light leading-relaxed text-muted-foreground"
        >
          FOY Clinic combines longevity medicine, metabolic optimization, and regenerative science — helping individuals live healthier, stronger, and longer lives.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-sm tracking-widest uppercase font-medium mb-12 text-primary"
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

          <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-medium">
            {[
              { icon: <ShieldCheck className="w-4 h-4 text-primary" />, label: "Physician-Led Care" },
              { icon: <ShieldCheck className="w-4 h-4 text-primary" />, label: "Evidence-Based Protocols" },
              { icon: <ShieldCheck className="w-4 h-4 text-secondary" />, label: "10,000+ Patients" },
            ].map((badge, i) => (
              <span
                key={i}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md border border-primary/20 bg-white/40 text-foreground/75"
              >
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-foreground/45 hover:text-primary transition-colors cursor-pointer z-10"
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
