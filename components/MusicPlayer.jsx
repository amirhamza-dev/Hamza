"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Music2, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useMusic } from "./AppProviders";

function Equaliser() {
  return (
    <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
      {[0, 1, 2].map((bar) => (
        <span
          key={bar}
          className="w-[3px] rounded-full bg-[#e2577f]"
          style={{
            height: "100%",
            transformOrigin: "bottom",
            animation: `equalise 1.1s ease-in-out ${bar * 0.18}s infinite`,
          }}
        />
      ))}
    </span>
  );
}

/**
 * Elegant floating music control in the top-right corner:
 * play/pause, mute and volume — with a soft fade in and fade out.
 */
export default function MusicPlayer() {
  const { isPlaying, volume, muted, notice, toggle, setVolume, toggleMute } =
    useMusic();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="fixed right-4 top-4 z-50 flex flex-col items-end gap-3 sm:right-7 sm:top-7"
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Close music controls" : "Open music controls"}
        className="glass-card focus-ring flex h-12 w-12 items-center justify-center rounded-full text-[#d1476c] transition hover:scale-105 active:scale-95 sm:h-14 sm:w-14"
      >
        {isPlaying ? <Equaliser /> : <Music2 className="h-5 w-5 sm:h-6 sm:w-6" />}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card w-[268px] rounded-3xl p-4 sm:w-[288px]"
          >
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#b3708a]">
              Background music
            </p>
            <p className="mt-1 font-display text-base text-[#8c3f5c]">
              A Little Story — Theme
            </p>

            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={toggle}
                aria-label={isPlaying ? "Pause music" : "Play music"}
                className="focus-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#ff9dbc] to-[#e2577f] text-white shadow-lg transition hover:scale-105 active:scale-95"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="ml-[2px] h-5 w-5" />
                )}
              </button>

              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? "Unmute music" : "Mute music"}
                aria-pressed={muted}
                className="focus-ring flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/70 text-[#c4547a] transition hover:bg-white"
              >
                {muted || volume === 0 ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
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
                className="volume-slider w-full"
              />
            </div>

            <p className="mt-3 text-[11px] leading-relaxed text-[#a97389]">
              Gentle piano, written just for this little story — no pressure,
              play it only if you feel like it.
            </p>

            {notice ? (
              <p className="mt-2 text-[11px] font-semibold text-[#d1476c]">
                {notice}
              </p>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
