"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MotionConfig } from "framer-motion";

/**
 * Global providers for the little story website.
 *
 * The background music lives here (instead of inside a section) so that it
 * keeps playing while Nuri scrolls through the different parts of the page,
 * and so any section can offer its own gentle play/pause control.
 */

const MusicContext = createContext(null);

const TRACK_SRC = "/audio/a-little-story-theme.wav";
const DEFAULT_VOLUME = 0.5;
const FADE_STEP_MS = 50;

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic() must be used inside <AppProviders>.");
  }
  return context;
}

export default function AppProviders({ children }) {
  const audioRef = useRef(null);
  const fadeTimerRef = useRef(null);
  const volumeRef = useRef(DEFAULT_VOLUME);
  const mutedRef = useRef(false);
  const playingRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [muted, setMuted] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [notice, setNotice] = useState("");

  const clearFade = useCallback(() => {
    if (fadeTimerRef.current) {
      clearInterval(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
  }, []);

  /** Smoothly ramp the volume so music never starts or stops abruptly. */
  const fadeTo = useCallback(
    (target, duration = 900, onDone) => {
      const audio = audioRef.current;
      if (!audio) return;
      clearFade();

      const steps = Math.max(1, Math.round(duration / FADE_STEP_MS));
      const from = audio.volume;
      let step = 0;

      fadeTimerRef.current = setInterval(() => {
        step += 1;
        const next = from + (target - from) * (step / steps);
        audio.volume = Math.min(1, Math.max(0, next));

        if (step >= steps) {
          clearFade();
          if (onDone) onDone();
        }
      }, FADE_STEP_MS);
    },
    [clearFade],
  );

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      setNotice("");
      audio.muted = mutedRef.current;
      audio.volume = 0;
      await audio.play();
      playingRef.current = true;
      setIsPlaying(true);
      setShowInvite(false);
      fadeTo(mutedRef.current ? 0 : volumeRef.current, 1200);
    } catch {
      // Autoplay restrictions or a blocked media request: stay graceful.
      playingRef.current = false;
      setIsPlaying(false);
      setNotice("Music could not start — please tap play once more 🎵");
    }
  }, [fadeTo]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    fadeTo(0, 500, () => {
      audio.pause();
      playingRef.current = false;
      setIsPlaying(false);
    });
  }, [fadeTo]);

  const toggle = useCallback(() => {
    if (playingRef.current) {
      pause();
    } else {
      play();
    }
  }, [pause, play]);

  const changeVolume = useCallback((value) => {
    const next = Math.min(1, Math.max(0, value));
    volumeRef.current = next;
    setVolume(next);

    const audio = audioRef.current;
    if (audio && !mutedRef.current) {
      audio.volume = next;
    }
    if (next > 0 && mutedRef.current) {
      mutedRef.current = false;
      setMuted(false);
      if (audio) audio.muted = false;
    }
  }, []);

  const toggleMute = useCallback(() => {
    const next = !mutedRef.current;
    mutedRef.current = next;
    setMuted(next);

    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = next;
    if (!next) {
      audio.volume = volumeRef.current;
    }
  }, []);

  // Offer the music politely instead of forcing autoplay.
  useEffect(() => {
    const timer = setTimeout(() => setShowInvite(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  // Tidy up timers and audio when the page goes away.
  useEffect(() => {
    return () => {
      clearFade();
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
      }
    };
  }, [clearFade]);

  const value = useMemo(
    () => ({
      isPlaying,
      volume,
      muted,
      notice,
      trackTitle: "A Little Story — Theme",
      play,
      pause,
      toggle,
      setVolume: changeVolume,
      toggleMute,
    }),
    [
      isPlaying,
      volume,
      muted,
      notice,
      play,
      pause,
      toggle,
      changeVolume,
      toggleMute,
    ],
  );

  return (
    <MusicContext.Provider value={value}>
      <MotionConfig reducedMotion="user">
        <audio
          ref={audioRef}
          src={TRACK_SRC}
          loop
          preload="metadata"
          playsInline
          aria-hidden="true"
        />
        {children}
        {showInvite && !isPlaying ? (
          <div className="fixed inset-x-0 bottom-5 z-40 flex justify-center px-4 sm:bottom-8 sm:justify-start sm:pl-8">
            <div className="glass-card flex flex-col items-center gap-3 rounded-3xl px-5 py-4 text-center sm:flex-row sm:text-left">
              <span className="text-sm font-semibold text-[#8c4a62] sm:text-base">
                Play a little music? 🎵
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={play}
                  className="focus-ring rounded-full bg-gradient-to-r from-[#ff9dbc] to-[#e2577f] px-4 py-2 text-xs font-semibold text-white shadow-md transition hover:scale-[1.04] active:scale-95 sm:text-sm"
                >
                  Yes, play it
                </button>
                <button
                  type="button"
                  onClick={() => setShowInvite(false)}
                  className="focus-ring rounded-full border border-white/70 bg-white/60 px-4 py-2 text-xs font-semibold text-[#a1556e] transition hover:bg-white sm:text-sm"
                >
                  Not now
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </MotionConfig>
    </MusicContext.Provider>
  );
}
