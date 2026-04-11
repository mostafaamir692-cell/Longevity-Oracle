import { motion } from "framer-motion";

const orbs = [
  { size: 400, x: "15%", y: "15%", color: "rgba(16,185,171,0.10)", delay: 0, duration: 22 },
  { size: 350, x: "70%", y: "25%", color: "rgba(197,165,114,0.08)", delay: 2, duration: 20 },
  { size: 280, x: "55%", y: "65%", color: "rgba(16,185,171,0.07)", delay: 4, duration: 24 },
  { size: 220, x: "20%", y: "70%", color: "rgba(34,197,94,0.05)", delay: 1, duration: 18 },
  { size: 180, x: "85%", y: "10%", color: "rgba(16,185,171,0.08)", delay: 3, duration: 16 },
  { size: 250, x: "5%", y: "45%", color: "rgba(197,165,114,0.06)", delay: 5, duration: 26 },
  { size: 160, x: "45%", y: "5%", color: "rgba(16,185,171,0.06)", delay: 6, duration: 20 },
  { size: 300, x: "90%", y: "60%", color: "rgba(16,185,171,0.05)", delay: 7, duration: 22 },
];

export function FloatingOrbs() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: "blur(50px)",
          }}
          animate={{
            x: [0, 40, -30, 20, 0],
            y: [0, -35, 20, -15, 0],
            scale: [1, 1.15, 0.9, 1.1, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
