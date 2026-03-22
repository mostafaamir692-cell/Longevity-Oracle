import { useState, useEffect } from "react";
import { FadeIn } from "../animations/FadeIn";
import { Star, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Sarah M.",
    location: "Dubai",
    text: "FOY transformed not just my skin but my entire energy. I feel 10 years younger. The holistic approach is unlike anything else in Dubai."
  },
  {
    name: "Ahmed K.",
    location: "Abu Dhabi",
    text: "The AI health analysis was eye-opening. They found deficiencies my regular doctor missed. My energy levels are through the roof now."
  },
  {
    name: "Layla R.",
    location: "Sharjah",
    text: "Best investment I've ever made in myself. The results from the customized peptide protocol speak for themselves."
  },
  {
    name: "Omar T.",
    location: "Dubai",
    text: "The precision science approach gave me results I couldn't find anywhere else. Truly a futuristic wellness experience."
  }
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const getVisibleCards = () => {
    const prev = (current - 1 + testimonials.length) % testimonials.length;
    const next = (current + 1) % testimonials.length;
    return [
      { ...testimonials[prev], pos: "prev", index: prev },
      { ...testimonials[current], pos: "current", index: current },
      { ...testimonials[next], pos: "next", index: next }
    ];
  };

  return (
    <section className="py-24 bg-card relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <FadeIn mb-16>
          <span className="text-primary font-semibold tracking-widest uppercase text-sm mb-4 block">Testimonials</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold">What Our Clients Say</h2>
        </FadeIn>

        <FadeIn delay={0.2} className="relative h-[450px] md:h-[400px] flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {getVisibleCards().map((t) => {
              const isCenter = t.pos === "current";
              const isPrev = t.pos === "prev";

              return (
                <motion.div
                  key={`${t.index}-${t.pos}`}
                  initial={false}
                  animate={{
                    x: isCenter ? 0 : isPrev ? "-100%" : "100%",
                    scale: isCenter ? 1 : 0.8,
                    opacity: isCenter ? 1 : 0.3,
                    zIndex: isCenter ? 10 : 0
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "absolute w-full max-w-lg",
                    isCenter ? "pointer-events-auto" : "hidden md:block pointer-events-none"
                  )}
                >
                  <div className={cn(
                    "bg-background/80 backdrop-blur-xl p-8 md:p-12 rounded-3xl border relative text-left shadow-2xl transition-all duration-500",
                    isCenter ? "border-gold/30 shadow-[0_0_30px_rgba(212,175,55,0.15)]" : "border-white/5"
                  )}>
                    {/* Large Quote Mark */}
                    <div className="absolute -top-10 -left-4 text-9xl font-display text-gold/20 leading-none select-none">"</div>
                    
                    <p className={cn(
                      "font-display leading-relaxed mb-8 relative z-10",
                      isCenter ? "text-xl md:text-2xl text-foreground/90" : "text-lg text-foreground/50"
                    )}>
                      {t.text}
                    </p>
                    
                    <div className="flex justify-between items-end relative z-10">
                      <div>
                        <h4 className="font-bold tracking-wide text-lg">{t.name}</h4>
                        <p className="text-sm text-foreground/50 mb-3">{t.location}</p>
                        <div className="flex gap-1 text-gold">
                          {[...Array(5)].map((_, i) => <Star key={i} className="fill-current w-4 h-4" />)}
                        </div>
                      </div>
                      
                      {isCenter && (
                        <div className="flex items-center gap-1.5 text-xs text-primary bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Verified Client</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </FadeIn>
        
        <div className="flex justify-center gap-4 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={cn(
                "h-2 rounded-full transition-all duration-500",
                idx === current ? "bg-gold w-10 shadow-[0_0_10px_rgba(212,175,55,0.8)]" : "bg-white/20 hover:bg-white/40 w-2"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
