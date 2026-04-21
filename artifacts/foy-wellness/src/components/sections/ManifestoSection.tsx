import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { FadeIn } from "../animations/FadeIn";
import { ParticleField } from "../ParticleField";
import { PulseRings } from "../PulseRings";

const PILLARS = [
  { num: "01", title: "Measure", body: "Deep biomarker panels, biological-age scoring, genomic and metabolic mapping." },
  { num: "02", title: "Engineer", body: "Personalized regenerative protocols, peptides, IV therapeutics, lifestyle calibration." },
  { num: "03", title: "Sustain", body: "Continuous monitoring with concierge access — refined quarter after quarter." },
];

export function ManifestoSection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineScaleRaw = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);
  const lineScale = reduceMotion ? 1 : lineScaleRaw;

  return (
    <section ref={ref} className="relative py-32 md:py-40 overflow-hidden">
      {/* Cinematic deep teal-black gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 0%, rgba(16,185,171,0.30) 0%, transparent 55%),
            radial-gradient(ellipse 70% 50% at 100% 100%, rgba(197,165,114,0.22) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 50% 50%, rgba(16,185,171,0.10) 0%, transparent 60%),
            linear-gradient(135deg, #07131a 0%, #0a1f25 50%, #0e1a14 100%)
          `,
        }}
      />

      {/* Editorial diagonal lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: `repeating-linear-gradient(
            115deg,
            transparent,
            transparent 120px,
            rgba(197,165,114,0.06) 120px,
            rgba(197,165,114,0.06) 121px
          )`,
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle 1px, rgba(94,234,212,0.10) 100%, transparent 100%)`,
          backgroundSize: "32px 32px",
        }}
      />

      <ParticleField
        density={50}
        color="rgba(94, 234, 212, 0.55)"
        lineColor="rgba(94, 234, 212, 0.16)"
        maxDistance={140}
        speed={0.25}
      />
      <PulseRings origins={[
        { x: "85%", y: "20%", color: "rgba(197, 165, 114, 0.32)", delay: 0, size: 460, count: 4 },
        { x: "10%", y: "80%", color: "rgba(94, 234, 212, 0.30)", delay: 1.4, size: 480, count: 4 },
      ]} />

      {/* Noise */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.05,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <FadeIn className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px w-12 bg-gradient-to-r from-transparent via-secondary to-secondary/40" />
            <span className="text-[11px] font-semibold tracking-[0.32em] uppercase" style={{ color: "rgba(212, 175, 100, 0.95)" }}>
              The FOY Manifesto
            </span>
          </div>

          <h2
            className="font-display font-bold leading-[0.95] mb-8"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
              color: "rgba(255,255,255,0.96)",
              textWrap: "balance",
            }}
          >
            Aging is not a verdict —{" "}
            <span className="italic font-normal" style={{
              background: "linear-gradient(90deg, #5eead4 0%, #d4af64 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              it's a variable we engineer.
            </span>
          </h2>

          <p className="max-w-2xl text-base md:text-lg font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
            We treat longevity as architecture, not aspiration. Every protocol is measured, calibrated, and tuned to your biology — quarter after quarter, decade after decade.
          </p>
        </FadeIn>

        {/* Pillars row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
          {/* Animated horizontal connector */}
          <motion.div
            className="hidden md:block absolute top-6 left-[10%] right-[10%] h-px origin-left"
            style={{
              scaleX: lineScale,
              background: "linear-gradient(90deg, transparent 0%, rgba(94,234,212,0.5) 30%, rgba(212,175,100,0.5) 70%, transparent 100%)",
            }}
          />

          {PILLARS.map((p, i) => (
            <FadeIn key={i} delay={0.15 + i * 0.12}>
              <div className="relative">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-6 font-display font-bold text-lg"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(212,175,100,0.35)",
                    color: "rgba(212, 175, 100, 0.95)",
                    boxShadow: "0 0 30px rgba(212,175,100,0.15)",
                  }}
                >
                  {p.num}
                </div>
                <h3
                  className="font-display text-2xl md:text-3xl font-bold mb-3 leading-tight"
                  style={{ color: "rgba(255,255,255,0.95)" }}
                >
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed font-light" style={{ color: "rgba(255,255,255,0.62)" }}>
                  {p.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Signature line */}
        <FadeIn delay={0.6} className="mt-20 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <p
              className="font-display italic text-xl md:text-2xl leading-snug max-w-2xl"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              "Medicine should give you back the years —{" "}
              <span style={{ color: "rgba(212,175,100,0.95)" }}>not just the days.</span>"
            </p>
            <span className="text-[10px] font-semibold tracking-[0.3em] uppercase" style={{ color: "rgba(94,234,212,0.85)" }}>
              — Dr. Ahmed Amer
            </span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
