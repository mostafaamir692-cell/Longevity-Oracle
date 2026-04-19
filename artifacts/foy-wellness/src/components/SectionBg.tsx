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
            radial-gradient(ellipse 90% 70% at 30% 40%, rgba(16,185,171,0.22) 0%, transparent 60%),
            radial-gradient(ellipse 70% 60% at 80% 70%, rgba(197,165,114,0.18) 0%, transparent 55%),
            radial-gradient(circle 500px at 50% 50%, rgba(16,185,171,0.12) 0%, transparent 60%),
            linear-gradient(180deg, hsl(174, 38%, 92%) 0%, hsl(178, 30%, 88%) 50%, hsl(43, 32%, 92%) 100%)
          `,
        }}
      />
      <DotGrid color="rgba(16,185,171,0.10)" size={1} gap={35} />
      <NoiseOverlay opacity={0.025} />
      <BokehLayer dots={[
        { size: 220, x: "10%", y: "20%", color: "rgba(16,185,171,0.18)", delay: 0, duration: 18 },
        { size: 180, x: "80%", y: "60%", color: "rgba(197,165,114,0.16)", delay: 3, duration: 20 },
        { size: 140, x: "50%", y: "80%", color: "rgba(16,185,171,0.14)", delay: 6, duration: 16 },
      ]} />
    </>
  ),
  transformation: (
    <>
      <div
        className="absolute inset-0 animate-bg-breathe"
        style={{
          background: `
            radial-gradient(ellipse 100% 80% at 50% 100%, rgba(16,185,171,0.22) 0%, transparent 55%),
            radial-gradient(ellipse 80% 60% at 0% 30%, rgba(197,165,114,0.20) 0%, transparent 50%),
            conic-gradient(from 180deg at 60% 40%, rgba(16,185,171,0.10) 0deg, transparent 120deg, rgba(197,165,114,0.08) 240deg, transparent 360deg),
            linear-gradient(160deg, hsl(43, 35%, 93%) 0%, hsl(174, 32%, 90%) 50%, hsl(178, 28%, 92%) 100%)
          `,
          backgroundSize: "100% 100%, 100% 100%, 200% 200%, 100% 100%",
        }}
      />
      <DiagonalLines color="rgba(16,185,171,0.08)" gap={45} />
      <NoiseOverlay opacity={0.02} />
      <BokehLayer dots={[
        { size: 200, x: "85%", y: "15%", color: "rgba(16,185,171,0.16)", delay: 0, duration: 22 },
        { size: 160, x: "15%", y: "70%", color: "rgba(197,165,114,0.16)", delay: 2, duration: 18 },
      ]} />
    </>
  ),
  system: (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 70% at 20% 50%, rgba(16,185,171,0.22) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 85% 30%, rgba(197,165,114,0.18) 0%, transparent 50%),
            linear-gradient(170deg, hsl(174, 35%, 92%) 0%, hsl(190, 30%, 90%) 100%)
          `,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(16,185,171,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16,185,171,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      <NoiseOverlay opacity={0.02} />
      <BokehLayer dots={[
        { size: 180, x: "70%", y: "20%", color: "rgba(16,185,171,0.16)", delay: 1, duration: 20 },
        { size: 220, x: "20%", y: "75%", color: "rgba(16,185,171,0.14)", delay: 4, duration: 24 },
      ]} />
    </>
  ),
  services: (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16,185,171,0.26) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 20% 80%, rgba(16,185,171,0.20) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 90% 60%, rgba(197,165,114,0.22) 0%, transparent 50%),
            linear-gradient(180deg, hsl(174, 38%, 92%) 0%, hsl(178, 32%, 89%) 50%, hsl(43, 32%, 92%) 100%)
          `,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle 1px, rgba(16,185,171,0.14) 100%, transparent 100%)`,
          backgroundSize: "30px 30px",
        }}
      />
      <NoiseOverlay opacity={0.025} />
      <BokehLayer dots={[
        { size: 300, x: "50%", y: "10%", color: "rgba(16,185,171,0.20)", delay: 0, duration: 20 },
        { size: 220, x: "10%", y: "70%", color: "rgba(16,185,171,0.16)", delay: 3, duration: 16 },
        { size: 200, x: "85%", y: "50%", color: "rgba(197,165,114,0.18)", delay: 5, duration: 22 },
      ]} />
    </>
  ),
  founder: (
    <>
      <div
        className="absolute inset-0 animate-bg-breathe"
        style={{
          background: `
            radial-gradient(ellipse 70% 80% at 0% 50%, rgba(16,185,171,0.22) 0%, transparent 55%),
            radial-gradient(ellipse 60% 50% at 100% 30%, rgba(197,165,114,0.28) 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 50% 90%, rgba(16,185,171,0.14) 0%, transparent 45%),
            linear-gradient(165deg, hsl(43, 40%, 93%) 0%, hsl(38, 32%, 90%) 50%, hsl(174, 28%, 92%) 100%)
          `,
          backgroundSize: "100% 100%, 100% 100%, 200% 200%, 100% 100%",
        }}
      />
      <NoiseOverlay opacity={0.02} />
      <BokehLayer dots={[
        { size: 240, x: "90%", y: "20%", color: "rgba(197,165,114,0.20)", delay: 0, duration: 18 },
        { size: 200, x: "5%", y: "60%", color: "rgba(16,185,171,0.16)", delay: 2, duration: 22 },
      ]} />
    </>
  ),
  results: (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 80% at 80% 50%, rgba(16,185,171,0.22) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 10% 30%, rgba(197,165,114,0.20) 0%, transparent 50%),
            linear-gradient(175deg, hsl(174, 32%, 92%) 0%, hsl(178, 28%, 89%) 50%, hsl(43, 30%, 92%) 100%)
          `,
        }}
      />
      <DiagonalLines color="rgba(16,185,171,0.07)" gap={35} />
      <NoiseOverlay opacity={0.025} />
      <BokehLayer dots={[
        { size: 200, x: "75%", y: "30%", color: "rgba(16,185,171,0.18)", delay: 0, duration: 16 },
        { size: 160, x: "25%", y: "70%", color: "rgba(197,165,114,0.16)", delay: 4, duration: 20 },
      ]} />
    </>
  ),
  lifestyle: (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 90% 70% at 50% 50%, rgba(16,185,171,0.20) 0%, transparent 65%),
            radial-gradient(ellipse 60% 50% at 10% 80%, rgba(197,165,114,0.20) 0%, transparent 50%),
            radial-gradient(ellipse 50% 50% at 90% 20%, rgba(34,197,94,0.12) 0%, transparent 50%),
            linear-gradient(180deg, hsl(174, 32%, 92%) 0%, hsl(160, 26%, 90%) 50%, hsl(43, 28%, 93%) 100%)
          `,
        }}
      />
      <DotGrid color="rgba(16,185,171,0.10)" size={1} gap={32} />
      <NoiseOverlay opacity={0.02} />
      <BokehLayer dots={[
        { size: 220, x: "10%", y: "75%", color: "rgba(197,165,114,0.18)", delay: 1, duration: 22 },
        { size: 180, x: "85%", y: "20%", color: "rgba(16,185,171,0.16)", delay: 3, duration: 18 },
      ]} />
    </>
  ),
  testimonials: (
    <>
      <div
        className="absolute inset-0 animate-bg-flow"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 30% 50%, rgba(16,185,171,0.24) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 40%, rgba(197,165,114,0.22) 0%, transparent 55%),
            radial-gradient(ellipse 50% 80% at 50% 100%, rgba(16,185,171,0.16) 0%, transparent 50%),
            linear-gradient(160deg, hsl(174, 32%, 91%) 0%, hsl(178, 28%, 88%) 40%, hsl(43, 30%, 92%) 100%)
          `,
          backgroundSize: "200% 200%, 200% 200%, 100% 100%, 100% 100%",
        }}
      />
      <NoiseOverlay opacity={0.02} />
      <BokehLayer dots={[
        { size: 280, x: "15%", y: "30%", color: "rgba(16,185,171,0.18)", delay: 0, duration: 24 },
        { size: 220, x: "75%", y: "60%", color: "rgba(197,165,114,0.18)", delay: 3, duration: 20 },
        { size: 180, x: "50%", y: "10%", color: "rgba(16,185,171,0.14)", delay: 6, duration: 18 },
      ]} />
    </>
  ),
  booking: (
    <>
      <div
        className="absolute inset-0 animate-bg-breathe"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 40%, rgba(16,185,171,0.24) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 70%, rgba(197,165,114,0.22) 0%, transparent 55%),
            radial-gradient(ellipse 40% 40% at 50% 20%, rgba(16,185,171,0.14) 0%, transparent 45%),
            linear-gradient(170deg, hsl(174, 35%, 93%) 0%, hsl(178, 30%, 90%) 50%, hsl(43, 32%, 93%) 100%)
          `,
          backgroundSize: "100% 100%, 100% 100%, 200% 200%, 100% 100%",
        }}
      />
      <DotGrid color="rgba(16,185,171,0.08)" size={1} gap={40} />
      <NoiseOverlay opacity={0.02} />
      <BokehLayer dots={[
        { size: 200, x: "80%", y: "25%", color: "rgba(16,185,171,0.18)", delay: 0, duration: 20 },
        { size: 180, x: "10%", y: "65%", color: "rgba(197,165,114,0.18)", delay: 4, duration: 22 },
      ]} />
    </>
  ),
  faq: (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 100% 60% at 0% 100%, rgba(16,185,171,0.22) 0%, transparent 55%),
            radial-gradient(ellipse 80% 60% at 100% 0%, rgba(197,165,114,0.22) 0%, transparent 50%),
            linear-gradient(180deg, hsl(43, 32%, 93%) 0%, hsl(174, 30%, 90%) 100%)
          `,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(16,185,171,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16,185,171,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
      <NoiseOverlay opacity={0.02} />
      <BokehLayer dots={[
        { size: 200, x: "15%", y: "20%", color: "rgba(197,165,114,0.16)", delay: 0, duration: 22 },
        { size: 180, x: "85%", y: "80%", color: "rgba(16,185,171,0.16)", delay: 2, duration: 18 },
      ]} />
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
