import { FadeIn } from "../animations/FadeIn";
import { useEffect, useState, useRef } from "react";

function Counter({ end, suffix = "", duration = 2000 }: { end: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutExpo
      const easeProgress = 1 === progress ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function TransformationSection() {
  return (
    <section className="relative py-32 flex flex-col items-center justify-center overflow-hidden w-full bg-gradient-to-b from-[#010609] via-primary/20 to-[#010609] animate-gradient-shift">
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center w-full flex flex-col items-center">
        <FadeIn className="mb-12">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight drop-shadow-2xl">
            What if you could reverse time… <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-primary italic">
              naturally and intelligently?
            </span>
          </h2>
        </FadeIn>
        
        <FadeIn delay={0.2} className="max-w-3xl mb-16">
          <p className="text-xl md:text-2xl text-foreground/80 font-light leading-relaxed">
            At FOY, we combine precision science, ancient wisdom, and AI intelligence to help you reclaim your vitality.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mb-24">
          <FadeIn delay={0.3} className="flex flex-col items-center">
            <div className="text-4xl md:text-5xl font-display font-bold text-primary mb-2 text-glow">
              <Counter end={97} suffix="%" />
            </div>
            <div className="text-sm uppercase tracking-wider text-foreground/60 font-medium">Client Satisfaction</div>
          </FadeIn>
          <FadeIn delay={0.4} className="flex flex-col items-center">
            <div className="text-4xl md:text-5xl font-display font-bold text-primary mb-2 text-glow">
              <Counter end={10000} suffix="+" />
            </div>
            <div className="text-sm uppercase tracking-wider text-foreground/60 font-medium">Transformations</div>
          </FadeIn>
          <FadeIn delay={0.5} className="flex flex-col items-center">
            <div className="text-4xl md:text-5xl font-display font-bold text-primary mb-2 text-glow">
              <Counter end={25} suffix="+" />
            </div>
            <div className="text-sm uppercase tracking-wider text-foreground/60 font-medium">Treatments Available</div>
          </FadeIn>
        </div>

        <FadeIn delay={0.6} className="relative w-full max-w-4xl rounded-2xl p-1 animate-border-glow bg-gradient-to-b from-primary/50 to-transparent">
          {/* Large glowing teal orbs (blurred) behind the image for depth */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 blur-[100px] -z-10 rounded-full pointer-events-none" />
          
          <div className="relative rounded-xl overflow-hidden w-full aspect-video md:aspect-[21/9] bg-black">
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-80 mix-blend-screen hover:scale-105 transition-transform duration-1000"
              style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/transformation.png)` }}
            />
            {/* Soft gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
