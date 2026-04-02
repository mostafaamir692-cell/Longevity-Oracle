import { FadeIn } from "../animations/FadeIn";
import { useEffect, useState, useRef } from "react";

function Counter({ end, suffix = "", duration = 2200 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(ease * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function TransformationSection() {
  return (
    <section className="bg-[#091617] overflow-hidden">
      {/* Top thin accent bar */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* Stats band */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/8">
          {[
            { end: 97, suffix: "%", label: "Patient Satisfaction", sub: "Across all treatment programs" },
            { end: 10000, suffix: "+", label: "Patients Treated", sub: "Since our founding in Cairo" },
            { end: 15, suffix: "+", label: "Years of Excellence", sub: "Leading regenerative medicine" },
          ].map(({ end, suffix, label, sub }, i) => (
            <FadeIn key={i} delay={i * 0.15} className="py-10 md:py-0 md:px-16 first:md:pl-0 last:md:pr-0 text-center">
              <div className="text-5xl md:text-6xl font-display font-bold text-primary mb-2 tracking-tight">
                <Counter end={end} suffix={suffix} />
              </div>
              <div className="text-sm font-semibold text-white/70 uppercase tracking-widest mb-1">{label}</div>
              <div className="text-xs text-white/30 font-light">{sub}</div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Image & caption panel */}
      <FadeIn delay={0.3}>
        <div className="relative">
          <div className="aspect-[21/7] w-full overflow-hidden">
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-[2000ms] hover:scale-[1.02]"
              style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/transformation.jpg?v=4)` }}
            />
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#091617] via-[#091617]/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#091617]/60 via-transparent to-transparent" />
          </div>

          {/* Bottom caption */}
          <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 md:px-8 pb-10 flex flex-col md:flex-row items-end justify-between gap-4">
            <div>
              <span className="section-label text-primary">The FOY Standard</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight">
                Medicine Designed<br />
                <em className="text-primary not-italic">Around You.</em>
              </h2>
            </div>
            <p className="text-white/40 text-sm font-light max-w-xs text-right leading-relaxed">
              We combine longevity diagnostics, metabolic science, and regenerative medicine into a single, physician-guided program — built entirely around your individual biology.
            </p>
          </div>
        </div>
      </FadeIn>

      {/* Bottom thin accent bar */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </section>
  );
}
