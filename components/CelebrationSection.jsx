"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import HeartBurst from "./HeartBurst";
import { TeddyDuo } from "./TeddyDecorations";

/** The happy moment right after Nuri presses YES. */
export default function CelebrationSection({ onContinue }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="celebration"
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-5 py-24 sm:px-8"
    >
      {/* Framer Motion already softens these under `reducedMotion="user"`,
          so the layer can always be rendered (no hydration surprises). */}
      <HeartBurst count={22} mode="float" seed={212} />

      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,158,190,0.5) 0%, rgba(255,158,190,0) 68%)",
        }}
        animate={
          prefersReducedMotion
            ? {}
            : { opacity: [0.5, 0.95, 0.5], scale: [0.92, 1.06, 0.92] }
        }
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-20 flex w-full max-w-3xl flex-col items-center text-center">
        <TeddyDuo />

        <motion.h1
          initial={{ opacity: 0, scale: 0.9, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 font-display text-4xl leading-tight sm:text-6xl md:text-7xl"
        >
          <span className="text-gradient">You Just Made My Day, Nuri!</span> ❤️
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="mt-5 font-display text-xl text-[#8c3f5c] sm:text-2xl"
        >
          With love, Mr Hamza.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          className="glass-card mt-10 w-full rounded-[2rem] px-6 py-7 sm:px-10 sm:py-9"
        >
          <p className="font-display text-lg leading-relaxed text-[#7c3a55] sm:text-2xl">
            Let&apos;s imagine the beautiful memories we could create together.
          </p>

          <motion.button
            type="button"
            onClick={onContinue}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="focus-ring mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ffb1cb] via-[#ff7fa8] to-[#d9415e] px-8 py-3.5 text-sm font-semibold text-white shadow-lg sm:text-base"
          >
            Continue
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
