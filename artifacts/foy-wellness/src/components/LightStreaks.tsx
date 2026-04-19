import { motion, useReducedMotion } from "framer-motion";

interface Streak {
  top: string;
  width: number;
  delay: number;
  duration: number;
  color: string;
  angle: number;
}

const defaultStreaks: Streak[] = [
  { top: "15%", width: 320, delay: 0, duration: 8, color: "rgba(16,185,171,0.4)", angle: -15 },
  { top: "40%", width: 240, delay: 3, duration: 10, color: "rgba(197,165,114,0.3)", angle: -10 },
  { top: "65%", width: 380, delay: 6, duration: 9, color: "rgba(16,185,171,0.35)", angle: -20 },
  { top: "85%", width: 220, delay: 1.5, duration: 11, color: "rgba(34,197,94,0.25)", angle: -12 },
];

export function LightStreaks({ streaks = defaultStreaks, opacity = 1 }: { streaks?: Streak[]; opacity?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity }}>
      {streaks.map((s, i) => (
        <motion.div
          key={i}
          className="absolute h-[2px] rounded-full"
          style={{
            top: s.top,
            width: s.width,
            background: `linear-gradient(90deg, transparent 0%, ${s.color} 50%, transparent 100%)`,
            boxShadow: `0 0 20px ${s.color}, 0 0 40px ${s.color}`,
            transform: `rotate(${s.angle}deg)`,
            filter: "blur(0.5px)",
          }}
          initial={{ x: "-50%", opacity: 0 }}
          animate={{
            x: ["-30%", "130%"],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.2, 0.8, 1],
            repeatDelay: 2,
          }}
        />
      ))}
    </div>
  );
}
