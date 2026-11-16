import FloatingHearts from "./FloatingHearts";
import HeartShape from "./HeartShape";
import { BackgroundTeddies } from "./TeddyDecorations";
import { createRandom, range } from "@/lib/random";

/**
 * The romantic backdrop that lives behind every section of the website.
 *
 * It is intentionally composed of cheap, GPU friendly CSS animations
 * (transform + opacity only) so scrolling stays smooth on phones, and it is
 * rendered once in the root layout so it never restarts between sections.
 */

const random = createRandom(20260215);

/* --- slowly falling rose petals ------------------------------------------ */
const petals = Array.from({ length: 12 }, (_, index) => ({
  id: index,
  left: range(random, 1, 97),
  size: Math.round(range(random, 12, 26)),
  duration: range(random, 22, 38),
  delay: range(random, 0, 26),
  driftX: Math.round(range(random, -90, 90)),
  spin: Math.round(range(random, 180, 480)),
  colour: ["#ffc2d6", "#ff9dbc", "#f7b6cd", "#ffd9e5"][
    Math.floor(random() * 4)
  ],
  opacity: range(random, 0.4, 0.85),
  smallScreen: range(random, 0, 1) > 0.35,
}));

/* --- tiny glowing particles --------------------------------------------- */
const particles = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  left: range(random, 0, 100),
  top: range(random, 0, 100),
  size: Math.round(range(random, 3, 8)),
  duration: range(random, 5, 11),
  delay: range(random, 0, 6),
  opacity: range(random, 0.25, 0.6),
}));

/* --- animated sparkles --------------------------------------------------- */
const sparkles = Array.from({ length: 22 }, (_, index) => ({
  id: index,
  left: range(random, 0, 100),
  top: range(random, 0, 100),
  size: Math.round(range(random, 8, 20)),
  duration: range(random, 2.4, 5),
  delay: range(random, 0, 4),
  colour: ["#ffffff", "#ffd3e3", "#fff0c9", "#e9d9ff"][
    Math.floor(random() * 4)
  ],
}));

/* --- soft glowing heart lights ------------------------------------------ */
const heartLights = [
  { id: 1, left: "6%", top: "18%", size: 120, delay: "0s", duration: "6s" },
  { id: 2, left: "78%", top: "12%", size: 92, delay: "1.4s", duration: "7.5s" },
  { id: 3, left: "64%", top: "68%", size: 140, delay: "2.6s", duration: "8.5s" },
  { id: 4, left: "16%", top: "74%", size: 104, delay: "3.4s", duration: "7s" },
];

/* --- butterflies --------------------------------------------------------- */
const butterflies = [
  { id: 1, top: "22%", duration: "34s", delay: "0s", size: 26 },
  { id: 2, top: "58%", duration: "46s", delay: "6s", size: 20 },
  { id: 3, top: "80%", duration: "40s", delay: "14s", size: 24 },
];

function Butterfly({ size = 24 }) {
  return (
    <svg
      viewBox="0 0 40 34"
      width={size}
      height={size * 0.85}
      aria-hidden="true"
      className="text-[#ff9fc4]"
    >
      <g
        style={{
          transformBox: "fill-box",
          transformOrigin: "center",
          animation: "wingFlap 0.85s ease-in-out infinite",
        }}
      >
        <ellipse cx="12" cy="13" rx="10" ry="9" fill="currentColor" opacity="0.9" />
        <ellipse cx="28" cy="13" rx="10" ry="9" fill="currentColor" opacity="0.9" />
        <ellipse cx="13" cy="24" rx="7" ry="6" fill="currentColor" opacity="0.65" />
        <ellipse cx="27" cy="24" rx="7" ry="6" fill="currentColor" opacity="0.65" />
      </g>
      <ellipse cx="20" cy="18" rx="1.8" ry="7" fill="#8a4f66" />
      <circle cx="20" cy="10.5" r="2.2" fill="#8a4f66" />
      <path
        d="M20 8q-4-4-6-6M20 8q4-4 6-6"
        stroke="#8a4f66"
        strokeWidth="1.1"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PetalShape({ className = "", style }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M12 2C12 2 3.6 10.4 3.6 15.6a8.4 8.4 0 0016.8 0C20.4 10.4 12 2 12 2z"
        fill="currentColor"
      />
      <path
        d="M12 5.4c-1.6 3.2-3.6 6.2-3.6 10.2"
        stroke="#ffffff"
        strokeWidth="0.9"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}

function SparkleShape({ className = "", style, colour }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M12 0.6l2.1 8.1 8.1 2.1-8.1 2.1-2.1 8.1-2.1-8.1-8.1-2.1 8.1-2.1z"
        fill={colour}
      />
    </svg>
  );
}

export default function LoveBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* base romantic gradient */}
      <div
        className="absolute inset-0 animate-gradient"
        style={{
          backgroundImage:
            "linear-gradient(125deg, #fff7fb 0%, #ffe8f1 28%, #f5ecff 55%, #fff2f6 78%, #ffe3ee 100%)",
          backgroundSize: "260% 260%",
        }}
      />

      {/* soft drifting light blobs */}
      <div
        className="absolute -left-24 top-[-10%] h-[60vh] w-[60vh] animate-drift rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, rgba(255,168,196,0.75), rgba(255,168,196,0) 68%)",
        }}
      />
      <div
        className="absolute right-[-14%] top-[22%] h-[52vh] w-[52vh] animate-drift rounded-full opacity-60 blur-3xl"
        style={{
          animationDelay: "4s",
          background:
            "radial-gradient(circle at 50% 45%, rgba(203,168,255,0.6), rgba(203,168,255,0) 70%)",
        }}
      />
      <div
        className="absolute bottom-[-16%] left-[28%] h-[58vh] w-[58vh] animate-drift rounded-full opacity-60 blur-3xl"
        style={{
          animationDelay: "8s",
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,214,229,0.85), rgba(255,214,229,0) 70%)",
        }}
      />

      {/* glowing heart shaped lights */}
      {heartLights.map((light) => (
        <span
          key={light.id}
          className="absolute hidden text-[#ff86ac] sm:block"
          style={{
            left: light.left,
            top: light.top,
            width: light.size,
            height: light.size,
            opacity: 0.34,
            filter: "blur(7px)",
            animation: `glowPulse ${light.duration} ease-in-out ${light.delay} infinite`,
          }}
        >
          <HeartShape className="h-full w-full" />
        </span>
      ))}

      {/* rose petals */}
      {petals.map((petal) => (
        <span
          key={petal.id}
          className={`absolute ${petal.smallScreen ? "" : "hidden sm:block"}`}
          style={{
            left: `${petal.left}%`,
            top: 0,
            width: petal.size,
            height: petal.size,
            color: petal.colour,
            opacity: petal.opacity,
            animation: `petalFall ${petal.duration}s linear ${petal.delay}s infinite`,
            "--drift-x": `${petal.driftX}px`,
            "--spin": `${petal.spin}deg`,
            willChange: "transform, opacity",
          }}
        >
          <PetalShape className="h-full w-full" />
        </span>
      ))}

      {/* floating hearts */}
      <FloatingHearts />

      {/* sparkling light */}
      {sparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          className="absolute"
          style={{
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            width: sparkle.size,
            height: sparkle.size,
            animation: `twinkle ${sparkle.duration}s ease-in-out ${sparkle.delay}s infinite`,
          }}
        >
          <SparkleShape className="h-full w-full" colour={sparkle.colour} />
        </span>
      ))}

      {/* glowing particles */}
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            boxShadow: "0 0 12px 4px rgba(255,190,214,0.75)",
            animation: `floatY ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
          }}
        />
      ))}

      {/* butterflies */}
      {butterflies.map((butterfly) => (
        <span
          key={butterfly.id}
          className="absolute left-0 hidden sm:block"
          style={{
            top: butterfly.top,
            animation: `butterflyFly ${butterfly.duration}s ease-in-out ${butterfly.delay} infinite`,
          }}
        >
          <Butterfly size={butterfly.size} />
        </span>
      ))}

      {/* cute teddy decorations */}
      <BackgroundTeddies />

      {/* a very subtle vignette keeps the text readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 55%), radial-gradient(100% 70% at 50% 100%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 60%)",
        }}
      />
    </div>
  );
}
