import { FadeIn } from "../animations/FadeIn";
import { useEffect, useState, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

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
    <section className="py-24 bg-muted/30 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* Left – headline + stats */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <FadeIn className="flex-1">
              <div className="h-full rounded-3xl bg-[#040b14] border border-border p-10 relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/15 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-primary block mb-5 text-glow">The FOY Standard</span>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground leading-tight text-glow-white">
                    Medicine Designed<br />
                    <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-300 glow-gradient">
                      Around You.
                    </span>
                  </h2>
                  <p className="text-foreground/35 text-sm font-light mt-4 leading-relaxed">
                    We combine longevity diagnostics, metabolic science, and regenerative medicine into a single physician-guided program.
                  </p>
                </div>
                <button
                  onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
                  className="relative z-10 mt-8 self-start flex items-center gap-2 text-xs font-semibold text-primary hover:text-teal-300 transition-colors group text-glow"
                >
                  Book a Consultation
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </FadeIn>

            <FadeIn delay={0.1} className="grid grid-cols-3 gap-3">
              {[
                { end: 97, suffix: "%", label: "Satisfaction" },
                { end: 10000, suffix: "+", label: "Patients" },
                { end: 15, suffix: "+", label: "Years" },
              ].map(({ end, suffix, label }) => (
                <div key={label} className="rounded-2xl bg-card border border-border p-5 text-center hover:border-primary/30 transition-colors">
                  <div className="text-xl font-display font-bold text-primary leading-none mb-1 text-glow">
                    <Counter end={end} suffix={suffix} />
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">{label}</div>
                </div>
              ))}
            </FadeIn>
          </div>

          {/* Right – large image */}
          <FadeIn delay={0.2} className="lg:col-span-3 h-full">
            <div className="h-full min-h-[400px] rounded-3xl overflow-hidden relative border border-border shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
              <div
                className="absolute inset-0 bg-cover bg-center hover:scale-105 transition-transform duration-[1500ms]"
                style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/transformation.jpg?v=4)` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-foreground/60 text-sm font-light italic font-display">
                  "A new approach to preventive medicine, metabolic optimization, and regenerative science."
                </p>
                <p className="text-primary text-xs font-medium mt-2 text-glow">— Dr. Ahmed Amer, Founder</p>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
