import { motion } from "framer-motion";
import { PremiumButton } from "../ui/PremiumButton";
import { ParticleCanvas } from "../ParticleCanvas";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  const scrollToServices = () => {
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  };
  
  const scrollToBooking = () => {
    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image / Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/hero-bg.png)` }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
      
      {/* Particles */}
      <ParticleCanvas />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 text-center flex flex-col items-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="inline-block py-1 px-3 rounded-full border border-primary/30 bg-primary/10 text-primary uppercase tracking-[0.2em] text-xs font-semibold mb-6">
            The Future of Longevity
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight mb-6 max-w-4xl"
        >
          Redefine Your Age. <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-green-400 to-gold text-glow-gold">
            Elevate Your Life.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg md:text-xl text-foreground/70 max-w-2xl mb-12 font-light leading-relaxed"
        >
          Experience the future of beauty, health, and longevity powered by precision science, AI intelligence, and inner balance.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <PremiumButton onClick={scrollToBooking} size="lg" className="w-full sm:w-auto">
            Start Your Transformation
          </PremiumButton>
          <PremiumButton variant="outline" onClick={scrollToServices} size="lg" className="w-full sm:w-auto">
            Explore Services
          </PremiumButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-foreground/50 hover:text-primary transition-colors cursor-pointer"
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
