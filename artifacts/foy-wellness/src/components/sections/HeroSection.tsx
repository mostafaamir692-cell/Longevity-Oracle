import { motion } from "framer-motion";
import { PremiumButton } from "../ui/PremiumButton";
import { ParticleCanvas } from "../ParticleCanvas";
import { DnaTreeCanvas } from "../DnaTreeCanvas";
import { ChevronDown, ShieldCheck } from "lucide-react";
import { useMouseParallax } from "../../hooks/useMouseParallax";

export function HeroSection() {
  const parallaxOffset = useMouseParallax(30);

  const scrollToServices = () => {
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  };
  
  const scrollToBooking = () => {
    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Deep background gradient — no photo needed, canvas handles the visuals */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background to-background" />
      {/* Radial ambient glow */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_20%,rgba(13,148,136,0.12)_0%,transparent_70%)] pointer-events-none" />
      
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative overflow-hidden mb-6"
        >
          {/* Scanner line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent animate-[scan-line_3s_ease-in-out_infinite]" />
          <span className="inline-block py-1.5 px-4 rounded-full border border-primary/30 bg-primary/10 text-primary uppercase tracking-[0.2em] text-xs font-semibold mt-1">
            The Future of Longevity
          </span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative mb-6"
        >
          {/* Radial Teal-to-transparent glow behind headline text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[150%] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight max-w-4xl relative z-10">
            Redefine Your Age. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-green-400 to-gold text-glow-gold">
              Elevate Your Life.
            </span>
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg md:text-xl text-foreground/70 max-w-2xl mb-12 font-light leading-relaxed relative z-10"
        >
          Experience the future of beauty, health, and longevity powered by precision science, AI intelligence, and inner balance.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col items-center gap-8 w-full relative z-10"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            {/* Primary button with pulsing ring */}
            <div className="relative group w-full sm:w-auto">
              <div className="absolute -inset-1 bg-primary/50 rounded-full blur animate-[pulse-ring_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
              <PremiumButton onClick={scrollToBooking} size="lg" className="w-full sm:w-auto relative z-10">
                Start Your Transformation
              </PremiumButton>
            </div>
            
            <PremiumButton variant="outline" onClick={scrollToServices} size="lg" className="w-full sm:w-auto backdrop-blur-sm">
              Explore Services
            </PremiumButton>
          </div>

          {/* Trust Stats */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-foreground/60 font-medium mt-4">
            <span className="flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
              <ShieldCheck className="w-4 h-4 text-primary" />
              10,000+ Clients
            </span>
            <span className="hidden sm:inline-block w-1 h-1 bg-primary/50 rounded-full" />
            <span className="flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
              <ShieldCheck className="w-4 h-4 text-primary" />
              15 Years Experience
            </span>
            <span className="hidden sm:inline-block w-1 h-1 bg-primary/50 rounded-full" />
            <span className="flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
              <ShieldCheck className="w-4 h-4 text-gold" />
              Award-Winning
            </span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-foreground/50 hover:text-primary transition-colors cursor-pointer z-10"
        onClick={() => document.querySelector("#problem")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span className="text-xs uppercase tracking-widest mb-2 font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}
