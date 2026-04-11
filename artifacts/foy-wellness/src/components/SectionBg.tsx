import { motion } from "framer-motion";

interface BokehDot {
  size: number;
  x: string;
  y: string;
  color: string;
  delay: number;
  duration: number;
}

function BokehLayer({ dots }: { dots: BokehDot[] }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((d, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: d.size,
            height: d.size,
            left: d.x,
            top: d.y,
            background: `radial-gradient(circle, ${d.color} 0%, transparent 70%)`,
            filter: `blur(${d.size / 3}px)`,
          }}
          animate={{
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.15, 1],
            x: [0, 15, -10, 0],
            y: [0, -10, 8, 0],
          }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function NoiseOverlay({ opacity = 0.03 }: { opacity?: number }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-[1]"
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
      }}
    />
  );
}

function DotGrid({ color = "rgba(67,168,163,0.06)", size = 1, gap = 40 }: { color?: string; size?: number; gap?: number }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `radial-gradient(circle ${size}px, ${color} 100%, transparent 100%)`,
        backgroundSize: `${gap}px ${gap}px`,
      }}
    />
  );
}

function DiagonalLines({ color = "rgba(67,168,163,0.04)", gap = 30 }: { color?: string; gap?: number }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `repeating-linear-gradient(
          135deg,
          transparent,
          transparent ${gap - 1}px,
          ${color} ${gap - 1}px,
          ${color} ${gap}px
        )`,
      }}
    />
  );
}

const presets = {
  problem: (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 90% 70% at 30% 40%, rgba(16,185,171,0.10) 0%, transparent 60%),
            radial-gradient(ellipse 70% 60% at 80% 70%, rgba(197,165,114,0.06) 0%, transparent 55%),
            radial-gradient(circle 500px at 50% 50%, rgba(16,185,171,0.05) 0%, transparent 60%),
            linear-gradient(180deg, hsl(180, 20%, 97%) 0%, hsl(174, 15%, 95%) 50%, hsl(180, 20%, 97%) 100%)
          `,
        }}
      />
      <DotGrid color="rgba(67,168,163,0.05)" size={1} gap={35} />
      <NoiseOverlay opacity={0.025} />
      <BokehLayer dots={[
        { size: 200, x: "10%", y: "20%", color: "rgba(16,185,171,0.08)", delay: 0, duration: 18 },
        { size: 150, x: "80%", y: "60%", color: "rgba(197,165,114,0.06)", delay: 3, duration: 20 },
        { size: 120, x: "50%", y: "80%", color: "rgba(16,185,171,0.05)", delay: 6, duration: 16 },
      ]} />
    </>
  ),
  transformation: (
    <>
      <div
        className="absolute inset-0 animate-bg-breathe"
        style={{
          background: `
            radial-gradient(ellipse 100% 80% at 50% 100%, rgba(16,185,171,0.10) 0%, transparent 55%),
            radial-gradient(ellipse 80% 60% at 0% 30%, rgba(197,165,114,0.07) 0%, transparent 50%),
            conic-gradient(from 180deg at 60% 40%, rgba(16,185,171,0.03) 0deg, transparent 120deg, rgba(197,165,114,0.02) 240deg, transparent 360deg),
            linear-gradient(160deg, hsl(200, 15%, 96%) 0%, hsl(174, 12%, 95%) 50%, hsl(200, 15%, 97%) 100%)
          `,
          backgroundSize: "100% 100%, 100% 100%, 200% 200%, 100% 100%",
        }}
      />
      <DiagonalLines color="rgba(67,168,163,0.03)" gap={45} />
      <NoiseOverlay opacity={0.02} />
      <BokehLayer dots={[
        { size: 180, x: "85%", y: "15%", color: "rgba(16,185,171,0.06)", delay: 0, duration: 22 },
        { size: 140, x: "15%", y: "70%", color: "rgba(197,165,114,0.05)", delay: 2, duration: 18 },
      ]} />
    </>
  ),
  system: (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 70% at 20% 50%, rgba(16,185,171,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 85% 30%, rgba(197,165,114,0.05) 0%, transparent 50%),
            linear-gradient(170deg, hsl(180, 18%, 97%) 0%, hsl(200, 15%, 96%) 100%)
          `,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(67,168,163,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(67,168,163,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      <NoiseOverlay opacity={0.02} />
      <BokehLayer dots={[
        { size: 160, x: "70%", y: "20%", color: "rgba(16,185,171,0.06)", delay: 1, duration: 20 },
        { size: 200, x: "20%", y: "75%", color: "rgba(16,185,171,0.05)", delay: 4, duration: 24 },
      ]} />
    </>
  ),
  services: (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16,185,171,0.20) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 20% 80%, rgba(16,185,171,0.12) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 90% 60%, rgba(197,165,114,0.08) 0%, transparent 50%),
            linear-gradient(180deg, #0a1a1f 0%, #0d2025 40%, #091820 100%)
          `,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle 1px, rgba(67,168,163,0.08) 100%, transparent 100%)`,
          backgroundSize: "30px 30px",
        }}
      />
      <NoiseOverlay opacity={0.04} />
      <BokehLayer dots={[
        { size: 300, x: "50%", y: "10%", color: "rgba(16,185,171,0.10)", delay: 0, duration: 20 },
        { size: 200, x: "10%", y: "70%", color: "rgba(16,185,171,0.06)", delay: 3, duration: 16 },
        { size: 180, x: "85%", y: "50%", color: "rgba(197,165,114,0.05)", delay: 5, duration: 22 },
      ]} />
    </>
  ),
  founder: (
    <>
      <div
        className="absolute inset-0 animate-bg-breathe"
        style={{
          background: `
            radial-gradient(ellipse 70% 80% at 0% 50%, rgba(16,185,171,0.09) 0%, transparent 55%),
            radial-gradient(ellipse 60% 50% at 100% 30%, rgba(197,165,114,0.07) 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 50% 90%, rgba(16,185,171,0.04) 0%, transparent 45%),
            linear-gradient(165deg, hsl(200, 20%, 98%) 0%, hsl(40, 15%, 96%) 50%, hsl(200, 18%, 97%) 100%)
          `,
          backgroundSize: "100% 100%, 100% 100%, 200% 200%, 100% 100%",
        }}
      />
      <NoiseOverlay opacity={0.02} />
      <BokehLayer dots={[
        { size: 200, x: "90%", y: "20%", color: "rgba(197,165,114,0.06)", delay: 0, duration: 18 },
        { size: 160, x: "5%", y: "60%", color: "rgba(16,185,171,0.05)", delay: 2, duration: 22 },
      ]} />
    </>
  ),
  results: (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 80% at 80% 50%, rgba(16,185,171,0.10) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 10% 30%, rgba(197,165,114,0.06) 0%, transparent 50%),
            linear-gradient(175deg, hsl(200, 20%, 98%) 0%, hsl(174, 15%, 96%) 50%, hsl(200, 18%, 97%) 100%)
          `,
        }}
      />
      <DiagonalLines color="rgba(67,168,163,0.025)" gap={35} />
      <NoiseOverlay opacity={0.025} />
      <BokehLayer dots={[
        { size: 180, x: "75%", y: "30%", color: "rgba(16,185,171,0.07)", delay: 0, duration: 16 },
        { size: 140, x: "25%", y: "70%", color: "rgba(197,165,114,0.05)", delay: 4, duration: 20 },
      ]} />
    </>
  ),
  lifestyle: (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 90% 70% at 50% 50%, rgba(16,185,171,0.08) 0%, transparent 65%),
            radial-gradient(ellipse 60% 50% at 10% 80%, rgba(34,197,94,0.04) 0%, transparent 50%),
            linear-gradient(180deg, hsl(200, 18%, 97%) 0%, hsl(160, 12%, 96%) 100%)
          `,
        }}
      />
      <DotGrid color="rgba(67,168,163,0.04)" size={1} gap={32} />
      <NoiseOverlay opacity={0.02} />
    </>
  ),
  testimonials: (
    <>
      <div
        className="absolute inset-0 animate-bg-flow"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 30% 50%, rgba(16,185,171,0.10) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 40%, rgba(197,165,114,0.06) 0%, transparent 55%),
            radial-gradient(ellipse 50% 80% at 50% 100%, rgba(16,185,171,0.05) 0%, transparent 50%),
            linear-gradient(160deg, hsl(180, 18%, 97%) 0%, hsl(174, 12%, 95%) 40%, hsl(200, 15%, 97%) 100%)
          `,
          backgroundSize: "200% 200%, 200% 200%, 100% 100%, 100% 100%",
        }}
      />
      <NoiseOverlay opacity={0.02} />
      <BokehLayer dots={[
        { size: 250, x: "15%", y: "30%", color: "rgba(16,185,171,0.06)", delay: 0, duration: 24 },
        { size: 200, x: "75%", y: "60%", color: "rgba(197,165,114,0.05)", delay: 3, duration: 20 },
        { size: 150, x: "50%", y: "10%", color: "rgba(16,185,171,0.04)", delay: 6, duration: 18 },
      ]} />
    </>
  ),
  booking: (
    <>
      <div
        className="absolute inset-0 animate-bg-breathe"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 40%, rgba(16,185,171,0.09) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 70%, rgba(197,165,114,0.07) 0%, transparent 55%),
            radial-gradient(ellipse 40% 40% at 50% 20%, rgba(16,185,171,0.04) 0%, transparent 45%),
            linear-gradient(170deg, hsl(200, 20%, 98%) 0%, hsl(174, 15%, 96%) 100%)
          `,
          backgroundSize: "100% 100%, 100% 100%, 200% 200%, 100% 100%",
        }}
      />
      <DotGrid color="rgba(67,168,163,0.035)" size={1} gap={40} />
      <NoiseOverlay opacity={0.02} />
      <BokehLayer dots={[
        { size: 180, x: "80%", y: "25%", color: "rgba(16,185,171,0.06)", delay: 0, duration: 20 },
        { size: 160, x: "10%", y: "65%", color: "rgba(197,165,114,0.05)", delay: 4, duration: 22 },
      ]} />
    </>
  ),
  faq: (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 100% 60% at 0% 100%, rgba(16,185,171,0.08) 0%, transparent 55%),
            radial-gradient(ellipse 80% 60% at 100% 0%, rgba(197,165,114,0.06) 0%, transparent 50%),
            linear-gradient(180deg, hsl(200, 15%, 96%) 0%, hsl(174, 10%, 95%) 100%)
          `,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(67,168,163,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(67,168,163,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
      <NoiseOverlay opacity={0.02} />
    </>
  ),
};

export function SectionBg({ variant }: { variant: keyof typeof presets }) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {presets[variant]}
    </div>
  );
}
