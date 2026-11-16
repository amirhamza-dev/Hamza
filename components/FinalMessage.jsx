"use client";

import { motion } from "framer-motion";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import HeartBurst from "./HeartBurst";
import { TeddyBear } from "./TeddyDecorations";
import { useMusic } from "./AppProviders";

const LETTER = `Dear Nuri,

I created this little website with a lot of thought and care.

I don't know exactly what the future holds, but I would love the opportunity to know you better, share beautiful moments, and discover where our journey might lead.

Whatever your answer is, your feelings and choices will always matter.

With love and respect,

Mr Hamza ❤️`;

/** The closing letter, with its own gentle music controls. */
export default function FinalMessage() {
  const { isPlaying, toggle, muted, volume, setVolume, toggleMute } = useMusic();

  return (
    <section
      id="final-message"
      className="relative px-5 pb-24 pt-20 sm:px-8 sm:pb-32 sm:pt-28"
      aria-labelledby="final-heading"
    >
      <HeartBurst count={14} mode="float" seed={5150} />

      <div className="relative z-20 mx-auto w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="text-[11px] uppercase tracking-[0.34em] text-[#b3708a] sm:text-xs">
            One last thought
          </p>
          <h2
            id="final-heading"
            className="mt-3 font-display text-3xl leading-snug sm:text-5xl"
          >
            <span className="text-gradient">
              Maybe This Is The Beginning of Something Beautiful
            </span>{" "}
            ❤️
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card mt-10 rounded-[2rem] px-6 py-9 sm:px-12 sm:py-12"
        >
          <TeddyBear
            variant="letter"
            className="mx-auto h-32 w-auto animate-float-slow sm:h-40"
            title="Teddy bear holding a small love letter"
          />

          <p className="mt-7 whitespace-pre-line text-center font-display text-base leading-relaxed text-[#7c3a55] sm:text-lg">
            {LETTER}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3 border-t border-white/60 pt-7">
            <button
              type="button"
              onClick={toggle}
              className="focus-ring inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ffb1cb] via-[#ff7fa8] to-[#d9415e] px-6 py-3 text-xs font-semibold text-white shadow-lg transition hover:scale-[1.04] active:scale-95 sm:text-sm"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-4 w-4" aria-hidden="true" /> Pause the music
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" aria-hidden="true" /> Play a little music
                </>
              )}
            </button>

            <button
              type="button"
              onClick={toggleMute}
              aria-pressed={muted}
              aria-label={muted ? "Unmute music" : "Mute music"}
              className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/70 text-[#c4547a] transition hover:bg-white"
            >
              {muted || volume === 0 ? (
                <VolumeX className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Volume2 className="h-4 w-4" aria-hidden="true" />
              )}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={muted ? 0 : volume}
              onChange={(event) => setVolume(Number(event.target.value))}
              aria-label="Music volume"
              className="volume-slider w-32 sm:w-44"
            />
          </div>
        </motion.div>

        <p className="mt-10 text-center text-xs text-[#a97389] sm:text-sm">
          Made with love by Mr Hamza ❤️
        </p>
      </div>
    </section>
  );
}
