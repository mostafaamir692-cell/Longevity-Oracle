import { motion } from "framer-motion";

const orbs = [
  { size: 300, x: "15%", y: "20%", color: "rgba(16,185,171,0.08)", delay: 0, duration: 20 },
  { size: 250, x: "75%", y: "30%", color: "rgba(212,170,40,0.06)", delay: 2, duration: 18 },
  { size: 200, x: "60%", y: "70%", color: "rgba(16,185,171,0.06)", delay: 4, duration: 22 },
  { size: 180, x: "25%", y: "75%", color: "rgba(34,197,94,0.04)", delay: 1, duration: 16 },
  { size: 120, x: "85%", y: "15%", color: "rgba(16,185,171,0.07)", delay: 3, duration: 14 },
  { size: 160, x: "10%", y: "50%", color: "rgba(212,170,40,0.05)", delay: 5, duration: 24 },
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
            filter: "blur(40px)",
          }}
          animate={{
            x: [0, 30, -20, 15, 0],
            y: [0, -25, 15, -10, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
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
