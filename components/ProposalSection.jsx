"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import HeartBurst from "./HeartBurst";
import { TeddyBear } from "./TeddyDecorations";

/* ---------------------------------------------------------------------------
   The playful NO button — full-screen escape
   ---------------------------------------------------------------------------
   The real button is drawn through a portal so `position: fixed` is always
   relative to the viewport (never to a transformed ancestor), while an
   invisible placeholder keeps its original spot reserved in the layout.
--------------------------------------------------------------------------- */
const EDGE_MARGIN = 16; // never let the button touch the viewport edges
const DETECT_RADIUS = 140; // pointer / finger proximity that triggers an escape
const MIN_HOP = 300; // minimum travel, so it feels like a full-screen jump
const ESCAPE_COOLDOWN = 150; // ms between escapes (kills jitter / flicker)
const MAX_ESCAPES = 14; // after this it calms down and can be answered
const AVOID_PADDING = 24; // breathing room around important UI
const NO_BUTTON_CLASS =
  "focus-ring inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-7 py-4 text-base font-semibold text-[#a1556e] shadow-sm backdrop-blur transition-colors duration-200 hover:bg-white sm:px-9 sm:text-lg";

export default function ProposalSection({ onYes, onNo }) {
  const prefersReducedMotion = useReducedMotion();
  const [celebrating, setCelebrating] = useState(false);
  const [escapes, setEscapes] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState(null);
  const [rotation, setRotation] = useState(0);

  const noButtonRef = useRef(null);
  const slotRef = useRef(null);
  const yesRef = useRef(null);
  const headingRef = useRef(null);
  const replyTimerRef = useRef(null);

  // Read by the global listeners; kept in refs so moving the button never
  // triggers a React re-render.
  const sizeRef = useRef({ w: 0, h: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const escapesRef = useRef(0);
  const cooldownRef = useRef(0);
  const rotationRef = useRef(0);
  const reducedRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    reducedRef.current = Boolean(prefersReducedMotion);
  }, [prefersReducedMotion]);

  useEffect(() => {
    return () => {
      if (replyTimerRef.current) clearTimeout(replyTimerRef.current);
    };
  }, []);

  /* --- geometry helpers --------------------------------------------------- */

  // offsetWidth / offsetHeight ignore transforms, so a tilted or mid-spring
  // button still reports its true, un-rotated size.
  const readSize = useCallback(() => {
    const node = noButtonRef.current;
    if (node) {
      sizeRef.current = { w: node.offsetWidth, h: node.offsetHeight };
    } else if (slotRef.current) {
      sizeRef.current = {
        w: slotRef.current.offsetWidth,
        h: slotRef.current.offsetHeight,
      };
    }
    return sizeRef.current;
  }, []);

  const avoidRects = useCallback(() => {
    const rects = [];
    const add = (node) => {
      if (!node) return;
      const r = node.getBoundingClientRect();
      if (!r.width && !r.height) return;
      rects.push({
        left: r.left - AVOID_PADDING,
        right: r.right + AVOID_PADDING,
        top: r.top - AVOID_PADDING,
        bottom: r.bottom + AVOID_PADDING,
      });
    };
    add(yesRef.current);
    add(headingRef.current);
    return rects;
  }, []);

  const pickTarget = useCallback(() => {
    const { w, h } = readSize();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const minX = EDGE_MARGIN;
    const maxX = Math.max(EDGE_MARGIN, vw - w - EDGE_MARGIN);
    const minY = EDGE_MARGIN;
    const maxY = Math.max(EDGE_MARGIN, vh - h - EDGE_MARGIN);

    const from = targetRef.current;
    const minHop = Math.min(MIN_HOP, Math.hypot(vw, vh) * 0.45);
    const avoid = avoidRects();
    const overlaps = (x, y) =>
      avoid.some(
        (r) => x < r.right && x + w > r.left && y < r.bottom && y + h > r.top,
      );

    let fallback = null;
    // Prefer a spot that is far away *and* clear of the YES button / heading.
    for (let attempt = 0; attempt < 40; attempt += 1) {
      const x = minX + Math.random() * (maxX - minX);
      const y = minY + Math.random() * (maxY - minY);
      if (Math.hypot(x - from.x, y - from.y) < minHop) continue;
      if (!overlaps(x, y)) return { x, y };
      if (!fallback) fallback = { x, y };
    }
    if (fallback) return fallback;
    return {
      x: minX + Math.random() * (maxX - minX),
      y: minY + Math.random() * (maxY - minY),
    };
  }, [readSize, avoidRects]);

  const escape = useCallback(() => {
    if (reducedRef.current || escapesRef.current >= MAX_ESCAPES) return;

    const now = performance.now();
    // Ignore repeat triggers while the button is still flying to safety.
    if (now - cooldownRef.current < ESCAPE_COOLDOWN) return;
    cooldownRef.current = now;

    const next = pickTarget();
    targetRef.current = next;
    escapesRef.current += 1;

    // A fresh tilt that always differs noticeably from the previous one.
    let tilt = rotationRef.current;
    for (let attempt = 0; attempt < 6; attempt += 1) {
      const candidate = (Math.random() * 2 - 1) * 16;
      if (Math.abs(candidate - rotationRef.current) > 5) {
        tilt = candidate;
        break;
      }
    }
    rotationRef.current = tilt;

    setPos(next);
    setRotation(tilt);
    setEscapes(escapesRef.current);
  }, [pickTarget]);

  const pointerDistance = useCallback((x, y) => {
    const { w, h } = sizeRef.current;
    const t = targetRef.current;
    const cx = Math.min(Math.max(x, t.x), t.x + w);
    const cy = Math.min(Math.max(y, t.y), t.y + h);
    return Math.hypot(x - cx, y - cy);
  }, []);

  const handlePointer = useCallback(
    (x, y) => {
      if (reducedRef.current || escapesRef.current >= MAX_ESCAPES) return;
      if (pointerDistance(x, y) <= DETECT_RADIUS) escape();
    },
    [escape, pointerDistance],
  );

  /* --- home placement, then keep it on screen ----------------------------- */

  useEffect(() => {
    if (!mounted) return undefined;

    const place = () => {
      // Never snap back if the button already started escaping.
      if (escapesRef.current > 0 || !slotRef.current) return;
      const r = slotRef.current.getBoundingClientRect();
      readSize();
      const home = { x: r.left, y: r.top };
      targetRef.current = home;
      setPos(home);
    };

    place();
    // Re-measure once the entrance animation has settled, so the button lands
    // exactly over its reserved slot. Skipped if the user already interacted.
    const settle = setTimeout(place, 1000);
    return () => clearTimeout(settle);
  }, [mounted, readSize]);

  useEffect(() => {
    if (!mounted) return undefined;

    const onMouseMove = (event) => handlePointer(event.clientX, event.clientY);
    const onTouchStart = (event) => {
      const touch = event.touches[0];
      if (touch) handlePointer(touch.clientX, touch.clientY);
    };
    const onTouchMove = (event) => {
      const touch = event.touches[0];
      if (touch) handlePointer(touch.clientX, touch.clientY);
    };
    const onResize = () => {
      if (!noButtonRef.current) return;
      const { w, h } = readSize();
      const maxX = Math.max(EDGE_MARGIN, window.innerWidth - w - EDGE_MARGIN);
      const maxY = Math.max(EDGE_MARGIN, window.innerHeight - h - EDGE_MARGIN);
      const clamped = {
        x: Math.min(Math.max(targetRef.current.x, EDGE_MARGIN), maxX),
        y: Math.min(Math.max(targetRef.current.y, EDGE_MARGIN), maxY),
      };
      targetRef.current = clamped;
      setPos(clamped);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, [mounted, handlePointer, readSize]);

  /* --- interaction -------------------------------------------------------- */

  const handleYes = () => {
    if (celebrating) return;
    setCelebrating(true);
    replyTimerRef.current = setTimeout(() => {
      onYes();
    }, 900);
  };

  const handleNoClick = (event) => {
    // A genuine "No" always stays possible: keyboard activation, or a tap once
    // the playful escaping has settled (or when motion is reduced).
    const fromKeyboard = event.detail === 0;
    if (
      fromKeyboard ||
      reducedRef.current ||
      escapesRef.current >= MAX_ESCAPES
    ) {
      onNo();
      return;
    }
    escape();
  };

  // Built lazily: the button only exists on the client, once its home spot
  // has been measured (so it is never rendered during server prerendering).
  const noButtonNode = pos ? (
    <motion.button
      ref={noButtonRef}
      type="button"
      onClick={handleNoClick}
      onPointerDown={(event) => handlePointer(event.clientX, event.clientY)}
      initial={false}
      animate={
        prefersReducedMotion
          ? { x: pos.x, y: pos.y, rotate: 0 }
          : { x: pos.x, y: pos.y, rotate: rotation, scale: [1, 1.12, 1] }
      }
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : {
              x: { type: "spring", stiffness: 340, damping: 22, mass: 0.7 },
              y: { type: "spring", stiffness: 340, damping: 22, mass: 0.7 },
              rotate: { type: "spring", stiffness: 200, damping: 14 },
              scale: { duration: 0.5, ease: "easeInOut", times: [0, 0.35, 1] },
            }
      }
      style={{ position: "fixed", left: 0, top: 0, zIndex: 45 }}
      className={NO_BUTTON_CLASS}
    >
      NO
      <span aria-hidden="true">🙈</span>
    </motion.button>
  ) : null;

  return (
    <section
      id="proposal"
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-5 pb-24 pt-20 sm:px-8"
    >
      {celebrating ? (
        <HeartBurst count={26} mode="burst" seed={88} className="z-10" />
      ) : null}

      {noButtonNode ? createPortal(noButtonNode, document.body) : null}

      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 flex w-full max-w-3xl flex-col items-center text-center"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="glass-soft rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.32em] text-[#b3708a] sm:text-xs"
        >
          A little story, just for you
        </motion.p>

        <h1
          ref={headingRef}
          className="mt-6 font-display text-4xl leading-tight sm:text-6xl md:text-7xl"
        >
          <span className="text-gradient">Hey Nuri!</span>{" "}
          <span className="inline-block animate-float-soft">❤️</span>
        </h1>

        <p className="mt-4 max-w-xl text-base text-[#8a5d70] sm:text-lg">
          I have something special to ask you...
        </p>

        <motion.div
          animate={
            prefersReducedMotion ? {} : { y: [0, -12, 0], rotate: [-1.5, 1.5, -1.5] }
          }
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="mt-8 sm:mt-10"
        >
          <TeddyBear
            variant="heart"
            className="h-40 w-auto drop-shadow-[0_18px_30px_rgba(226,87,127,0.28)] sm:h-52"
            title="Teddy bear holding a pink heart"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card mt-8 w-full rounded-[2rem] px-6 py-8 sm:px-10 sm:py-10"
        >
          <Sparkles className="mx-auto h-6 w-6 text-[#e2577f]" aria-hidden="true" />
          <h2 className="mt-4 font-display text-2xl leading-snug text-[#7c3a55] sm:text-3xl md:text-4xl">
            Nuri, would you like to start a beautiful journey with me?
          </h2>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <motion.button
              ref={yesRef}
              type="button"
              onClick={handleYes}
              whileHover={prefersReducedMotion ? {} : { scale: 1.06 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      boxShadow: [
                        "0 16px 38px -14px rgba(226,87,127,0.65)",
                        "0 20px 52px -12px rgba(226,87,127,0.95)",
                        "0 16px 38px -14px rgba(226,87,127,0.65)",
                      ],
                    }
              }
              transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
              className="focus-ring relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ffb1cb] via-[#ff7fa8] to-[#d9415e] px-8 py-4 text-base font-semibold text-white sm:px-11 sm:text-lg"
            >
              <Heart className="h-5 w-5" aria-hidden="true" />
              YES
              <span className="text-lg">❤️</span>
            </motion.button>

            {/* Invisible placeholder that reserves the NO button's original
                spot in the layout; the real button lives in the portal. */}
            <span
              ref={slotRef}
              aria-hidden="true"
              className={`${NO_BUTTON_CLASS} pointer-events-none select-none opacity-0`}
            >
              NO
              <span aria-hidden="true">🙈</span>
            </span>
          </div>

          <p
            aria-live="polite"
            className="mt-5 min-h-[20px] text-xs text-[#a97389] sm:text-sm"
          >
            {escapes > 1 && escapes < MAX_ESCAPES && !prefersReducedMotion
              ? "Hehe, the NO button is a little shy 🙈 — keep going, it's yours to press."
              : null}
            {escapes >= MAX_ESCAPES && !prefersReducedMotion
              ? "Okay, it stopped running — your answer is always welcome, whatever it is."
              : null}
          </p>
        </motion.div>
      </motion.div>

      <p className="absolute bottom-6 left-0 right-0 z-20 text-center text-xs text-[#a97389] sm:text-sm">
        Made with love by Mr Hamza ❤️
      </p>
    </section>
  );
}
