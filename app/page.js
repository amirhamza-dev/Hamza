"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProposalSection from "@/components/ProposalSection";
import RespectfulAnswer from "@/components/RespectfulAnswer";
import CelebrationSection from "@/components/CelebrationSection";
import LoveQuotes from "@/components/LoveQuotes";
import JourneyTimeline from "@/components/JourneyTimeline";
import DreamDateCards from "@/components/DreamDateCards";
import FinalMessage from "@/components/FinalMessage";

const sceneTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
};

export default function Home() {
  const [view, setView] = useState("proposal");
  const [answeredYes, setAnsweredYes] = useState(false);
  const storyAnchorRef = useRef(null);
  const shouldScrollRef = useRef(false);

  // Once she continues, glide down to the beginning of the story.
  useEffect(() => {
    if (view !== "story" || !shouldScrollRef.current) return undefined;

    shouldScrollRef.current = false;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const frame = requestAnimationFrame(() => {
      storyAnchorRef.current?.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [view]);

  const openStory = () => {
    shouldScrollRef.current = true;
    setView("story");
  };

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        {view === "proposal" ? (
          <motion.div key="proposal" {...sceneTransition}>
            <ProposalSection
              onYes={() => {
                setAnsweredYes(true);
                setView("celebration");
              }}
              onNo={() => setView("declined")}
            />
          </motion.div>
        ) : null}

        {view === "declined" ? (
          <motion.div key="declined" {...sceneTransition}>
            <RespectfulAnswer
              onExplore={openStory}
              onBack={() => setView("proposal")}
            />
          </motion.div>
        ) : null}

        {view === "celebration" ? (
          <motion.div key="celebration" {...sceneTransition}>
            <CelebrationSection onContinue={openStory} />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {view === "story" ? (
        <motion.div
          key="story"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            ref={storyAnchorRef}
            id="story"
            className="h-px w-full scroll-mt-20"
            aria-hidden="true"
          />

          {answeredYes ? (
            <section className="px-5 pt-16 sm:px-8 sm:pt-20">
              <p className="mx-auto max-w-2xl text-center font-display text-xl text-[#8c3f5c] sm:text-2xl">
                Thank you for saying yes to a little journey of imagination,
                Nuri. ❤️
              </p>
            </section>
          ) : null}

          <LoveQuotes />
          <JourneyTimeline />
          <DreamDateCards />
          <FinalMessage />
        </motion.div>
      ) : null}
    </>
  );
}
