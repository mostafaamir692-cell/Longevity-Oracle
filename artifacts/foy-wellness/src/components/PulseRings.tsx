import { motion, useReducedMotion } from "framer-motion";

interface RingOrigin {
  x: string;
  y: string;
  color?: string;
  delay?: number;
  size?: number;
  count?: number;
}

const defaultOrigins: RingOrigin[] = [
  { x: "20%", y: "30%", color: "rgba(16,185,171,0.4)", delay: 0, size: 400, count: 3 },
  { x: "80%", y: "70%", color: "rgba(197,165,114,0.3)", delay: 1.5, size: 350, count: 3 },
];

export function PulseRings({ origins = defaultOrigins }: { origins?: RingOrigin[] }) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {origins.map((o, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: o.x,
            top: o.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          {Array.from({ length: o.count ?? 3 }).map((_, ringIdx) => (
            <motion.div
              key={ringIdx}
              className="absolute rounded-full border"
              style={{
                width: o.size ?? 400,
                height: o.size ?? 400,
                left: -(o.size ?? 400) / 2,
                top: -(o.size ?? 400) / 2,
                borderColor: o.color ?? "rgba(16,185,171,0.4)",
                borderWidth: 1.5,
              }}
              animate={{
                scale: [0, 1.4],
                opacity: [0.6, 0],
              }}
              transition={{
                duration: 5,
                delay: (o.delay ?? 0) + ringIdx * 1.6,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
