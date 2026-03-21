import { useState, useEffect } from "react";
import { FadeIn } from "../animations/FadeIn";
import { Star, Quote } from "lucide-react";
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

  return (
    <section className="py-24 bg-background relative z-10 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <FadeIn mb-12>
          <span className="text-primary font-semibold tracking-widest uppercase text-sm mb-4 block">Testimonials</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold">What Our Clients Say</h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="relative h-[300px] flex items-center justify-center">
            {testimonials.map((t, idx) => (
              <div 
                key={idx}
                className={cn(
                  "absolute inset-0 w-full transition-all duration-1000 flex flex-col items-center justify-center",
                  idx === current ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-8 pointer-events-none"
                )}
              >
                <Quote className="w-12 h-12 text-primary/30 mb-6" />
                <p className="text-xl md:text-3xl font-display font-medium leading-relaxed mb-8 max-w-3xl">
                  "{t.text}"
                </p>
                <div className="flex gap-1 text-gold mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="fill-current w-5 h-5" />)}
                </div>
                <h4 className="font-bold tracking-wide">{t.name}</h4>
                <p className="text-sm text-foreground/50">{t.location}</p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300",
                  idx === current ? "bg-primary w-8" : "bg-white/20 hover:bg-white/40"
                )}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
