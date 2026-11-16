"use client";

import { motion } from "framer-motion";
import { dreamDates } from "@/data/dreamDates";

/* ----------------------------------------------------------------------------
   Hand drawn SVG illustrations — one per card, so no external images are needed.
   -------------------------------------------------------------------------- */

const artProps = {
  viewBox: "0 0 120 90",
  className: "h-24 w-full",
  "aria-hidden": "true",
  focusable: "false",
};

function CoffeeArt() {
  return (
    <svg {...artProps}>
      <ellipse cx="60" cy="76" rx="34" ry="6" fill="#e9b79c" opacity="0.35" />
      <path
        d="M36 36h44v20a18 18 0 01-18 18h-8a18 18 0 01-18-18z"
        fill="#fffaf5"
        stroke="#e0a98d"
        strokeWidth="2"
      />
      <path d="M42 44h32v12a10 10 0 01-10 10h-12a10 10 0 01-10-10z" fill="#8a5a3b" opacity="0.75" />
      <path
        d="M80 42h6a9 9 0 010 18h-6"
        fill="none"
        stroke="#e0a98d"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M50 30c-4-5 4-8 0-13M60 28c-4-5 4-8 0-13M70 30c-4-5 4-8 0-13"
        fill="none"
        stroke="#f0b7c6"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}

function MoonArt() {
  return (
    <svg {...artProps}>
      <path
        d="M74 16a26 26 0 100 52 30 30 0 11-4-45 30 30 0 014 4z"
        transform="translate(-6 -2)"
        fill="#e3d1ff"
      />
      <path
        d="M70 14a24 24 0 100 48 27 27 0 01-3-42 28 28 0 013-6z"
        fill="#c9b1ff"
        opacity="0.6"
      />
      {[
        { x: 30, y: 24, s: 1 },
        { x: 44, y: 44, s: 0.7 },
        { x: 22, y: 56, s: 0.8 },
        { x: 40, y: 68, s: 0.55 },
      ].map((star) => (
        <path
          key={`${star.x}-${star.y}`}
          d="M0 -6l1.7 4.3L6 0 1.7 1.7 0 6l-1.7-4.3L-6 0l4.3-1.7z"
          fill="#fff4d6"
          transform={`translate(${star.x} ${star.y}) scale(${star.s})`}
        />
      ))}
      <path
        d="M12 78q18-10 36-4t40-2"
        fill="none"
        stroke="#cbb6e6"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

function SunsetArt() {
  return (
    <svg {...artProps}>
      <circle cx="60" cy="52" r="22" fill="#ffce9c" />
      <circle cx="60" cy="52" r="22" fill="url(#sunsetGlow)" />
      <path d="M0 68h120" stroke="#e29a97" strokeWidth="2.5" opacity="0.55" />
      {[16, 30, 44, 58, 72, 86, 100].map((x, index) => (
        <path
          key={x}
          d={`M${x} 74h${10 + (index % 3) * 4}`}
          stroke="#ffb98f"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.6"
        />
      ))}
      <path
        d="M8 40q10-8 20 0M88 30q10-8 20 0"
        fill="none"
        stroke="#fff2e3"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.85"
      />
      <defs>
        <radialGradient id="sunsetGlow" cx="50%" cy="50%" r="50%">
          <stop offset="45%" stopColor="#ffd9a8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ff9f7a" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function PlaneArt() {
  return (
    <svg {...artProps}>
      <path
        d="M14 70c18-4 32-16 44-30"
        fill="none"
        stroke="#a9cdf0"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray="5 7"
      />
      <path
        d="M52 44l34-26 6 6-24 32-4-8-10-1z"
        fill="#cfe4ff"
        stroke="#8fb6e0"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M52 44l12 4 6 8" fill="none" stroke="#8fb6e0" strokeWidth="1.6" />
      <ellipse cx="30" cy="26" rx="14" ry="6" fill="#ffffff" opacity="0.85" />
      <ellipse cx="44" cy="20" rx="10" ry="5" fill="#ffffff" opacity="0.7" />
      <ellipse cx="92" cy="64" rx="16" ry="6" fill="#ffffff" opacity="0.8" />
    </svg>
  );
}

function CameraArt() {
  return (
    <svg {...artProps}>
      <rect x="22" y="30" width="76" height="46" rx="10" fill="#fff3f8" stroke="#eab3c9" strokeWidth="2" />
      <rect x="46" y="22" width="26" height="12" rx="5" fill="#f7c7da" />
      <circle cx="60" cy="54" r="16" fill="#ffe6ef" stroke="#eab3c9" strokeWidth="2" />
      <circle cx="60" cy="54" r="9" fill="#c9d8ff" />
      <circle cx="56" cy="50" r="3" fill="#ffffff" opacity="0.9" />
      <circle cx="86" cy="41" r="4" fill="#ffd166" />
      <path d="M14 34l8-4M10 46l8-2" stroke="#f0a7c1" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function FlowersArt() {
  return (
    <svg {...artProps}>
      <path
        d="M60 78V50M60 62c-8-2-12-8-12-14M60 68c8-2 12-8 12-14"
        fill="none"
        stroke="#9ed3a4"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {[
        { x: 60, y: 34, c: "#ff9dbc" },
        { x: 38, y: 44, c: "#ffc2d6" },
        { x: 82, y: 44, c: "#d9b3ff" },
      ].map((flower) => (
        <g key={flower.x} transform={`translate(${flower.x} ${flower.y})`}>
          {[0, 72, 144, 216, 288].map((angle) => (
            <ellipse
              key={angle}
              cx="0"
              cy="-8"
              rx="5.4"
              ry="8"
              fill={flower.c}
              transform={`rotate(${angle})`}
              opacity="0.95"
            />
          ))}
          <circle cx="0" cy="0" r="3.6" fill="#ffe37a" />
        </g>
      ))}
      <ellipse cx="60" cy="82" rx="26" ry="4" fill="#e2577f" opacity="0.12" />
    </svg>
  );
}

const ART = {
  coffee: CoffeeArt,
  moon: MoonArt,
  sunset: SunsetArt,
  plane: PlaneArt,
  camera: CameraArt,
  flowers: FlowersArt,
};

export default function DreamDateCards() {
  return (
    <section
      id="dream-dates"
      className="relative px-5 py-20 sm:px-8 sm:py-28"
      aria-labelledby="dream-dates-heading"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-[0.34em] text-[#b3708a] sm:text-xs">
            Little daydreams
          </p>
          <h2
            id="dream-dates-heading"
            className="mt-3 font-display text-3xl sm:text-5xl"
          >
            <span className="text-gradient">Our Dream Dates</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dreamDates.map((card, index) => {
            const Art = ART[card.art] ?? CoffeeArt;

            return (
              <motion.article
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.7,
                  delay: (index % 3) * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -10, rotate: -0.8 }}
                className="glass-card group relative overflow-hidden rounded-[1.75rem] p-6"
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.gradient}`}
                />

                <div className="relative">
                  <div
                    className="animate-float-slow"
                    style={{ animationDelay: `${index * 0.6}s` }}
                  >
                    <Art />
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <span
                      className="text-2xl"
                      role="img"
                      aria-label={card.title}
                    >
                      {card.emoji}
                    </span>
                    <h3 className="font-display text-xl text-[#7c3a55] sm:text-2xl">
                      {card.title}
                    </h3>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-[#8a5d70] sm:text-base">
                    {card.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
