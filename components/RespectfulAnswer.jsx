"use client";

import { motion } from "framer-motion";
import { HeartHandshake } from "lucide-react";
import { TeddyBear } from "./TeddyDecorations";

/**
 * Shown if Nuri picks "NO". The answer is respected — nothing is trapped,
 * nothing is pushed. She can simply look around, or answer again later.
 */
export default function RespectfulAnswer({ onExplore, onBack }) {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-5 py-20 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card relative z-20 w-full max-w-2xl rounded-[2rem] px-6 py-10 text-center sm:px-12 sm:py-14"
      >
        <TeddyBear
          variant="letter"
          tone="blush"
          className="mx-auto h-32 w-auto animate-float-slow sm:h-40"
          title="Teddy bear holding a small love letter"
        />

        <h1 className="mt-6 font-display text-3xl leading-snug text-[#7c3a55] sm:text-4xl">
          That&apos;s completely okay, Nuri 🤍
        </h1>

        <p className="mt-5 text-base leading-relaxed text-[#8a5d70] sm:text-lg">
          Thank you for answering honestly. Your feelings and your choices always
          matter, and nothing here is a test or a race.
        </p>
        <p className="mt-4 text-base leading-relaxed text-[#8a5d70] sm:text-lg">
          This little website was made with care, so you are welcome to look
          around at it whenever you feel like it — or not at all.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <motion.button
            type="button"
            onClick={onExplore}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ffb1cb] via-[#ff7fa8] to-[#d9415e] px-7 py-3.5 text-sm font-semibold text-white shadow-lg sm:text-base"
          >
            <HeartHandshake className="h-5 w-5" aria-hidden="true" />
            I&apos;ll look around anyway
          </motion.button>

          <motion.button
            type="button"
            onClick={onBack}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="focus-ring rounded-full border border-white/70 bg-white/70 px-7 py-3.5 text-sm font-semibold text-[#a1556e] backdrop-blur transition hover:bg-white sm:text-base"
          >
            Let me answer again ❤️
          </motion.button>
        </div>
      </motion.div>

      <p className="absolute bottom-6 left-0 right-0 z-20 text-center text-xs text-[#a97389] sm:text-sm">
        With love and respect, Mr Hamza ❤️
      </p>
    </section>
  );
}
