import HeartShape from "./HeartShape";
import { createRandom, range } from "@/lib/random";

/**
 * A slow, endless stream of pink hearts floating from the bottom of the
 * screen to the top. Everything is CSS driven so the browser can keep the
 * animation on the compositor and remain smooth while scrolling.
 *
 * The values come from a seeded generator, which keeps the very first client
 * render identical to the server render (no hydration mismatch).
 */
const HEART_COLOURS = [
  "#ffa8c4",
  "#ff86ac",
  "#f9c2d6",
  "#ffd3e3",
  "#e2577f",
  "#cba8ff",
];

const random = createRandom(20260214);

const hearts = Array.from({ length: 18 }, (_, index) => {
  const size = Math.round(range(random, 14, 44));

  return {
    id: index,
    left: range(random, 1, 96),
    size,
    duration: range(random, 17, 34),
    delay: range(random, 0, 24),
    driftX: Math.round(range(random, -70, 70)),
    spin: Math.round(range(random, -75, 75)),
    opacity: range(random, 0.28, 0.7),
    colour: HEART_COLOURS[Math.floor(random() * HEART_COLOURS.length)],
    blur: range(random, 0, 1) > 0.72,
    big: size > 32,
  };
});

export default function FloatingHearts() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className={`absolute ${heart.big ? "hidden sm:block" : ""}`}
          style={{
            left: `${heart.left}%`,
            bottom: "-12vh",
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            color: heart.colour,
            opacity: heart.opacity,
            filter: heart.blur
              ? "blur(1.6px) drop-shadow(0 0 10px rgba(255,134,172,0.55))"
              : "drop-shadow(0 0 8px rgba(255,134,172,0.5))",
            animation: `heartRise ${heart.duration}s linear ${heart.delay}s infinite`,
            "--drift-x": `${heart.driftX}px`,
            "--spin": `${heart.spin}deg`,
            willChange: "transform, opacity",
          }}
        >
          <HeartShape className="h-full w-full" />
        </span>
      ))}
    </div>
  );
}
