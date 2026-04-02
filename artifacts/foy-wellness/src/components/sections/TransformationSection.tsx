import { FadeIn } from "../animations/FadeIn";
import { useEffect, useState, useRef } from "react";

function Counter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function TransformationSection() {
  return (
    <section className="relative py-28 overflow-hidden bg-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(13,148,136,0.12)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <FadeIn className="mb-6">
          <span className="text-primary font-semibold tracking-widest uppercase text-xs mb-5 block">The FOY Standard</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold leading-tight text-white">
            Medicine Designed<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-300 to-gold italic">
              Around You.
            </span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.2} className="max-w-2xl mx-auto mb-16">
          <p className="text-lg text-white/50 font-light leading-relaxed">
            We combine longevity diagnostics, metabolic science, and regenerative medicine into a single, physician-guided program — built entirely around your individual biology.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-3xl mx-auto mb-20">
          {[
            { end: 97, suffix: "%", label: "Patient Satisfaction" },
            { end: 10000, suffix: "+", label: "Patients Treated" },
            { end: 15, suffix: "+", label: "Years of Excellence" },
          ].map(({ end, suffix, label }) => (
            <FadeIn key={label} delay={0.3} className="flex flex-col items-center">
              <div className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">
                <Counter end={end} suffix={suffix} />
              </div>
              <div className="text-xs uppercase tracking-widest text-white/40 font-medium">{label}</div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5} className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden border border-white/8 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
          <div className="relative aspect-video md:aspect-[21/9] bg-black">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-70 hover:scale-105 transition-transform duration-[1500ms]"
              style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/transformation.jpg?v=4)` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 text-left">
              <p className="text-white/80 text-sm font-light italic">
                "A new approach to preventive medicine, metabolic optimization, and regenerative science."
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
