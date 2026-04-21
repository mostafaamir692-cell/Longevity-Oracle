import { motion, useScroll, useTransform, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PremiumButton } from "../ui/PremiumButton";
import { ChevronDown, ArrowRight } from "lucide-react";
import { DnaTreeCanvas } from "../DnaTreeCanvas";
import { FloatingOrbs } from "../FloatingOrbs";
import { ParticleField } from "../ParticleField";
import { LightStreaks } from "../LightStreaks";
import { PulseRings } from "../PulseRings";

const ROTATING_WORDS = ["Beautifully.", "Boldly.", "Longer.", "Younger."];

const HERO_STATS = [
  { num: "10K+", label: "Patients Treated" },
  { num: "15", label: "Years Clinical Practice" },
  { num: "98%", label: "Patient Satisfaction" },
  { num: "24/7", label: "Concierge Care" },
];

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgYRaw = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textYRaw = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacityRaw = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const bgY = reduceMotion ? "0%" : bgYRaw;
  const textY = reduceMotion ? "0%" : textYRaw;
  const opacity = reduceMotion ? 1 : opacityRaw;

  const [wordIndex, setWordIndex] = useState(0);
  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setWordIndex((i) => (i + 1) % ROTATING_WORDS.length), 2600);
    return () => clearInterval(id);
  }, [reduceMotion]);

  const scrollToServices = () => {
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToBooking = () => {
    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        {/* Editorial gradient — luxe teal to warm gold */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 70% 80% at 0% 0%, rgba(16,185,171,0.32) 0%, transparent 60%),
              radial-gradient(ellipse 80% 70% at 100% 100%, rgba(197,165,114,0.34) 0%, transparent 60%),
              radial-gradient(ellipse 50% 50% at 50% 50%, rgba(16,185,171,0.10) 0%, transparent 60%),
              linear-gradient(135deg, hsl(174, 38%, 91%) 0%, hsl(178, 30%, 88%) 45%, hsl(43, 36%, 91%) 100%)
            `,
          }}
        />

        {/* Editorial diagonal line accents */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(
              105deg,
              transparent,
              transparent 80px,
              rgba(197,165,114,0.05) 80px,
              rgba(197,165,114,0.05) 81px
            )`,
          }}
        />

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle 1px, rgba(16,185,171,0.20) 100%, transparent 100%)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Noise texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.035,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />

        <FloatingOrbs />
        <PulseRings
          origins={[
            { x: "12%", y: "28%", color: "rgba(16, 185, 171, 0.32)", delay: 0, size: 520, count: 4 },
            { x: "88%", y: "72%", color: "rgba(197, 165, 114, 0.32)", delay: 1.6, size: 480, count: 4 },
            { x: "60%", y: "20%", color: "rgba(197, 165, 114, 0.22)", delay: 0.8, size: 320, count: 3 },
          ]}
        />
        <ParticleField
          density={60}
          color="rgba(16, 185, 171, 0.55)"
          lineColor="rgba(16, 185, 171, 0.18)"
          maxDistance={150}
          speed={0.3}
        />
        <LightStreaks opacity={0.6} />
        <DnaTreeCanvas />
      </motion.div>

      {/* Main content — editorial split layout */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 flex-1 flex items-center max-w-7xl w-full mx-auto px-6 md:px-8 pt-32 pb-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-center">
          {/* LEFT — editorial headline block */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-secondary" />
              <span className="text-[11px] font-semibold tracking-[0.32em] uppercase text-secondary">
                Est. Cairo · Longevity Medicine
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35 }}
              className="font-display font-bold leading-[0.95] text-foreground mb-8"
              style={{ fontSize: "clamp(3rem, 8vw, 7.5rem)" }}
            >
              Healing.<br />
              Thriving.<br />
              <span className="italic font-normal text-foreground/85">Living </span>
              <span className="relative inline-block align-baseline" style={{ minWidth: "5ch" }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ y: 40, opacity: 0, filter: "blur(8px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -40, opacity: 0, filter: "blur(8px)" }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block text-gradient-teal-gold italic"
                  >
                    {ROTATING_WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="text-base md:text-xl max-w-xl mb-10 font-light leading-relaxed text-muted-foreground"
            >
              Longevity medicine, metabolic optimization, and regenerative science — engineered around your biology to extend healthspan, performance, and presence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-5"
            >
              <PremiumButton onClick={scrollToBooking} size="lg" className="w-full sm:w-auto animate-pulse-glow">
                Book a Consultation
              </PremiumButton>
              <button
                onClick={scrollToServices}
                className="group flex items-center gap-2 text-sm font-semibold tracking-wide uppercase text-foreground/80 hover:text-primary transition-colors"
              >
                Explore Programs
                <span className="h-px w-10 bg-foreground/30 group-hover:w-16 group-hover:bg-primary transition-all duration-300" />
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>

          {/* RIGHT — vertical signature card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="lg:col-span-4 hidden lg:block"
          >
            <div className="relative rounded-2xl backdrop-blur-md bg-white/30 border border-primary/15 p-8 shadow-[0_8px_40px_rgba(16,185,171,0.12)]">
              <div className="absolute -top-3 -left-3 w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary/40 to-transparent blur-2xl pointer-events-none" />
              <div className="absolute -bottom-3 -right-3 w-20 h-20 rounded-2xl bg-gradient-to-tl from-primary/40 to-transparent blur-2xl pointer-events-none" />

              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-secondary block mb-4">
                Led By
              </span>
              <p className="font-display text-2xl font-bold text-foreground leading-snug mb-2">
                Dr. Ahmed Amer
              </p>
              <p className="text-sm text-muted-foreground italic mb-5">
                Physician · Longevity & Regenerative Medicine
              </p>
              <div className="h-px w-full bg-gradient-to-r from-primary/40 via-secondary/40 to-transparent mb-5" />
              <blockquote className="text-sm font-light text-foreground/75 leading-relaxed italic">
                "We don't just treat disease — we engineer the conditions for a longer, more vivid life."
              </blockquote>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom signature stat strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.95 }}
        className="relative z-10 border-t border-foreground/10 backdrop-blur-sm bg-white/20"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-2">
          {HERO_STATS.map((s, i) => (
            <div key={i} className="flex flex-col items-start md:items-center text-left md:text-center">
              <span className="font-display text-3xl md:text-4xl font-bold text-gradient-teal-gold leading-none">
                {s.num}
              </span>
              <span className="text-[10px] mt-2 font-semibold tracking-[0.22em] uppercase text-foreground/55">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-28 right-6 md:right-10 flex flex-col items-center text-foreground/40 hover:text-primary transition-colors cursor-pointer z-20"
        onClick={() => document.querySelector("#problem")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] mb-2 font-medium [writing-mode:vertical-rl] rotate-180">Discover</span>
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
          transition={reduceMotion ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={22} />
        </motion.div>
      </motion.div>
    </section>
  );
}
