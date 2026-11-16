"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import HeartShape from "./HeartShape";
import { createRandom, range } from "@/lib/random";

const COLOURS = ["#ff6f9c", "#ff9dbc", "#ffc2d6", "#e2577f", "#cba8ff", "#fff0c9"];

/**
 * Reusable heart animation.
 *
 * `mode="burst"`  → hearts pop outwards, perfect for the YES moment.
 * `mode="float"`  → hearts keep rising softly, used as a celebration layer.
 */
export default function HeartBurst({
  count = 16,
  mode = "burst",
  className = "",
  seed = 314,
}) {
  const hearts = useMemo(() => {
    const random = createRandom(seed);
    return Array.from({ length: count }, (_, index) => {
      const angle = range(random, 0, Math.PI * 2);
      const distance = range(random, 90, 260);

      return {
        id: index,
        angle,
        distance,
        size: Math.round(range(random, 14, 34)),
        colour: COLOURS[Math.floor(random() * COLOURS.length)],
        delay: range(random, 0, mode === "float" ? 6 : 0.35),
        duration: range(random, mode === "float" ? 7 : 1.5, mode === "float" ? 12 : 2.4),
        spin: Math.round(range(random, -160, 160)),
        drift: Math.round(range(random, -60, 60)),
      };
    });
  }, [count, mode, seed]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {hearts.map((heart) => {
        const x = Math.cos(heart.angle) * heart.distance;
        const y = Math.sin(heart.angle) * heart.distance;

        const animate =
          mode === "float"
            ? {
                y: [0, -420],
                x: [0, heart.drift, 0],
                opacity: [0, 0.85, 0],
                scale: [0.7, 1, 0.9],
                rotate: [0, heart.spin],
              }
            : {
                x: [0, x],
                y: [0, y - 40],
                opacity: [0, 1, 1, 0],
                scale: [0.3, 1.15, 0.9],
                rotate: [0, heart.spin],
              };

        const transition =
          mode === "float"
            ? {
                duration: heart.duration,
                delay: heart.delay,
                repeat: Infinity,
                repeatDelay: heart.delay / 2,
                ease: "linear",
              }
            : {
                duration: heart.duration,
                delay: heart.delay,
                ease: [0.22, 1, 0.36, 1],
              };

        return (
          <motion.span
            key={heart.id}
            className="absolute left-1/2 top-1/2 block"
            style={{
              width: heart.size,
              height: heart.size,
              color: heart.colour,
              marginLeft: -heart.size / 2,
              marginTop: -heart.size / 2,
              filter: "drop-shadow(0 4px 10px rgba(226,87,127,0.35))",
            }}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0.3 }}
            animate={animate}
            transition={transition}
          >
            <HeartShape className="h-full w-full" />
          </motion.span>
        );
      })}
    </div>
  );
}
