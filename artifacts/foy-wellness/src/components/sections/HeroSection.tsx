import { motion } from "framer-motion";
import { PremiumButton } from "../ui/PremiumButton";
import { ParticleCanvas } from "../ParticleCanvas";
import { DnaTreeCanvas } from "../DnaTreeCanvas";
import { ChevronDown, ShieldCheck } from "lucide-react";
import { useMouseParallax } from "../../hooks/useMouseParallax";

export function HeroSection() {
  const parallaxOffset = useMouseParallax(20);

  const scrollToServices = () => {
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  };
  
  const scrollToBooking = () => {
    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#040b14]">
      {/* Radial ambient glow */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_30%,rgba(13,148,136,0.18)_0%,transparent_70%)] pointer-events-none" />
      
      {/* Animated Canvases */}
      <div 
        className="absolute inset-0 z-0 transition-transform duration-75"
        style={{ transform: `translate(${parallaxOffset.x * 0.5}px, ${parallaxOffset.y * 0.5}px)` }}
      >
        <DnaTreeCanvas />
      </div>
      <ParticleCanvas />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 text-center flex flex-col items-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative overflow-hidden mb-6"
        >
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent animate-[scan-line_3s_ease-in-out_infinite]" />
          <span className="inline-block py-1.5 px-5 rounded-full border border-primary/40 bg-primary/15 text-primary uppercase tracking-[0.2em] text-xs font-semibold mt-1">
            Longevity &amp; Regenerative Medicine
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative mb-4"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[150%] bg-primary/15 blur-[100px] rounded-full pointer-events-none" />
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight max-w-4xl relative z-10 text-white">
            Healing. Thriving.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-300 to-gold text-glow-gold">
              Living Beautifully.
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-base md:text-lg text-white/60 max-w-2xl mb-3 font-light leading-relaxed relative z-10"
        >
          FOY Clinic combines longevity medicine, metabolic optimization, and regenerative science — helping individuals live healthier, stronger, and longer lives.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.75 }}
          className="text-sm text-primary/80 tracking-widest uppercase font-medium mb-12 relative z-10"
        >
          Led by Dr. Ahmed Amer — Cairo, Egypt
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex flex-col items-center gap-8 w-full relative z-10"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <div className="relative group w-full sm:w-auto">
              <div className="absolute -inset-1 bg-primary/40 rounded-full blur animate-[pulse-ring_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
              <PremiumButton onClick={scrollToBooking} size="lg" className="w-full sm:w-auto relative z-10">
                Book a Consultation
              </PremiumButton>
            </div>
            <PremiumButton variant="outline" onClick={scrollToServices} size="lg" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10">
              Explore Programs
            </PremiumButton>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-white/50 font-medium">
            <span className="flex items-center gap-1.5 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/8">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Physician-Led Care
            </span>
            <span className="hidden sm:inline-block w-1 h-1 bg-primary/40 rounded-full" />
            <span className="flex items-center gap-1.5 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/8">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Evidence-Based Protocols
            </span>
            <span className="hidden sm:inline-block w-1 h-1 bg-primary/40 rounded-full" />
            <span className="flex items-center gap-1.5 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/8">
              <ShieldCheck className="w-4 h-4 text-gold" />
              10,000+ Patients
            </span>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/30 hover:text-primary transition-colors cursor-pointer z-10"
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
