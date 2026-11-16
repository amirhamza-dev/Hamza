"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play, Quote } from "lucide-react";
import HeartShape from "./HeartShape";
import { loveQuotes } from "@/data/loveQuotes";

const AUTO_DELAY = 8000;

/** A calm, one-at-a-time quote carousel made of glass cards. */
export default function LoveQuotes() {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [paused, setPaused] = useState(false);
  const directionRef = useRef(1);

  const go = useCallback((step) => {
    directionRef.current = step;
    setIndex((current) => {
      const next = current + step;
      if (next < 0) return loveQuotes.length - 1;
      if (next >= loveQuotes.length) return 0;
      return next;
    });
  }, []);

  useEffect(() => {
    if (!autoPlay || paused || prefersReducedMotion) return undefined;

    const timer = setInterval(() => go(1), AUTO_DELAY);
    return () => clearInterval(timer);
  }, [autoPlay, paused, prefersReducedMotion, go]);

  const quote = loveQuotes[index];
  const offset = directionRef.current >= 0 ? 40 : -40;

  return (
    <section
      id="quotes"
      className="relative px-5 py-20 sm:px-8 sm:py-28"
      aria-labelledby="quotes-heading"
    >
      <div className="mx-auto w-full max-w-3xl text-center">
        <p className="text-[11px] uppercase tracking-[0.34em] text-[#b3708a] sm:text-xs">
          Little promises
        </p>
        <h2
          id="quotes-heading"
          className="mt-3 font-display text-3xl sm:text-5xl"
        >
          <span className="text-gradient">Words I wanted to write down</span>
        </h2>

        <div
          className="relative mt-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-2 -top-6 hidden text-[#ffb1cb] sm:block"
          >
            <HeartShape className="h-10 w-10 animate-float-soft opacity-70" />
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-6 -right-2 hidden text-[#ffb1cb] sm:block"
          >
            <HeartShape
              className="h-7 w-7 animate-float-slow opacity-60"
              style={{ animationDelay: "1.2s" }}
            />
          </span>

          <div className="glass-card relative flex min-h-[268px] flex-col items-center justify-center rounded-[2rem] px-6 py-10 sm:min-h-[300px] sm:px-12">
            <Quote
              className="h-8 w-8 rotate-180 text-[#f0a7c1]"
              aria-hidden="true"
            />

            <div
              className="mt-5 flex w-full items-center justify-center"
              aria-live="polite"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.blockquote
                  key={quote.id}
                  initial={{ opacity: 0, x: offset }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -offset }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-xl leading-relaxed text-[#7c3a55] sm:text-3xl"
                >
                  &ldquo;{quote.text}&rdquo;
                </motion.blockquote>
              </AnimatePresence>
            </div>

            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#b3708a]">
              — Mr Hamza
            </p>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous quote"
            className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/70 text-[#c4547a] backdrop-blur transition hover:scale-105 hover:bg-white active:scale-95"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="flex items-center gap-2" aria-label="Choose a quote">
            {loveQuotes.map((item, dotIndex) => (
              <button
                key={item.id}
                type="button"
                aria-current={dotIndex === index ? "true" : undefined}
                aria-label={`Show quote ${dotIndex + 1}`}
                onClick={() => {
                  directionRef.current = dotIndex > index ? 1 : -1;
                  setIndex(dotIndex);
                }}
                className={`focus-ring h-2.5 rounded-full transition-all duration-300 ${
                  dotIndex === index
                    ? "w-7 bg-gradient-to-r from-[#ff9dbc] to-[#e2577f]"
                    : "w-2.5 bg-[#ffd3e3] hover:bg-[#ffb1cb]"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next quote"
            className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/70 text-[#c4547a] backdrop-blur transition hover:scale-105 hover:bg-white active:scale-95"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => setAutoPlay((value) => !value)}
            aria-pressed={autoPlay}
            aria-label={autoPlay ? "Pause automatic quotes" : "Play automatic quotes"}
            className="focus-ring ml-1 flex items-center gap-2 rounded-full border border-white/70 bg-white/60 px-4 py-2 text-xs font-semibold text-[#a1556e] backdrop-blur transition hover:bg-white sm:text-sm"
          >
            {autoPlay ? (
              <>
                <Pause className="h-3.5 w-3.5" aria-hidden="true" /> Auto
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5" aria-hidden="true" /> Auto
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
