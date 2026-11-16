"use client";

import { motion } from "framer-motion";
import {
  Coffee,
  Flower2,
  HeartHandshake,
  Plane,
  Sparkles,
  Sun,
} from "lucide-react";
import { journeySteps } from "@/data/journeySteps";

const ICONS = { Sparkles, Coffee, Plane, HeartHandshake, Flower2, Sun };

/** Six little steps of a possible journey, revealed as she scrolls. */
export default function JourneyTimeline() {
  return (
    <section
      id="journey"
      className="relative px-5 py-20 sm:px-8 sm:py-28"
      aria-labelledby="journey-heading"
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-[0.34em] text-[#b3708a] sm:text-xs">
            Step by step
          </p>
          <h2 id="journey-heading" className="mt-3 font-display text-3xl sm:text-5xl">
            <span className="text-gradient">Our Dream Journey</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#8a5d70] sm:text-base">
            Nothing here is a promise of the future — just gentle little
            imaginings of what could be lovely.
          </p>
        </div>

        <div className="relative mt-14">
          {/* the timeline thread */}
          <span
            aria-hidden="true"
            className="absolute left-6 top-2 h-[calc(100%-1rem)] w-[2px] rounded-full bg-gradient-to-b from-[#ffd3e3] via-[#ff9dbc] to-[#ffd3e3] md:left-1/2 md:-translate-x-1/2"
          />

          <ol className="space-y-8 md:space-y-10">
            {journeySteps.map((step, index) => {
              const Icon = ICONS[step.icon] ?? Sparkles;
              const isLeft = index % 2 === 0;

              return (
                <li key={step.id} className="relative pl-16 sm:pl-20 md:pl-0">
                  {/* number badge on the thread */}
                  <motion.span
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-6 top-7 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-[#ff9dbc] to-[#d9415e] font-display text-sm font-semibold text-white shadow-[0_10px_26px_-10px_rgba(226,87,127,0.9)] md:left-1/2"
                    aria-hidden="true"
                  >
                    {step.number}
                  </motion.span>

                  <motion.article
                    initial={{ opacity: 0, x: 0, y: 30 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -6 }}
                    className={`glass-card rounded-[1.75rem] p-6 sm:p-7 md:w-[calc(50%-3rem)] ${
                      isLeft ? "" : "md:ml-auto"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${step.accent} text-[#c4547a] shadow-inner`}
                      >
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.28em] text-[#b3708a]">
                          Step {step.number}
                        </p>
                        <h3 className="font-display text-xl text-[#7c3a55] sm:text-2xl">
                          {step.title}
                        </h3>
                      </div>
                    </div>

                    <p className="mt-5 font-display text-base italic leading-relaxed text-[#a1556e] sm:text-lg">
                      &ldquo;{step.quote}&rdquo;
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[#8a5d70] sm:text-base">
                      {step.description}
                    </p>
                  </motion.article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
