"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { SectionId } from "../components/nav";

// Terminal-style path shown in the lifeline header for each section.
const PATHS: Record<SectionId, string> = {
  home: "~/home",
  about: "~/about",
  stack: "~/stack",
  changelog: "~/changelog.log",
  projects: "~/projects",
  contact: "~/contact",
};

const INITIAL_SECTION: SectionId = "home";

// Timing (ms) for the erase → pause → retype → reveal choreography.
// Tuned to read as a fast terminal edit, not a slow typewriter.
const ERASE_STEP_MS = 16;
const ERASE_PAUSE_MS = 90;
const TYPE_STEP_MS = 30;
const REVEAL_PAUSE_MS = 200;

interface SectionRouter {
  activeSection: SectionId;
  /** True while the lifeline is erasing/retyping. Gate section content on this. */
  transitioning: boolean;
  /** What the lifeline header should display right now. */
  lifelineText: string;
  goTo: (id: SectionId) => void;
}

/**
 * Owns which section is on screen and drives the lifeline's
 * erase-then-retype animation whenever it changes. Section content
 * should only render once `transitioning` is false. That's what makes
 * the reveal wait for the lifeline to finish typing.
 */
export function useSectionRouter(): SectionRouter {
  const [activeSection, setActiveSection] = useState<SectionId>(INITIAL_SECTION);
  const [transitioning, setTransitioning] = useState(false);
  const [lifelineText, setLifelineText] = useState(PATHS[INITIAL_SECTION]);

  // Pending setTimeout ids, so clicking a new link mid-transition cancels
  // the old animation instead of letting both run at once.
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  // Cancel any in-flight timers on unmount.
  useEffect(() => clearTimers, [clearTimers]);

  const goTo = useCallback(
    (id: SectionId) => {
      if (transitioning || id === activeSection) return;

      clearTimers();
      const from = lifelineText;
      const to = PATHS[id];
      const schedule = (delay: number, fn: () => void) => {
        timers.current.push(setTimeout(fn, delay));
      };

      setTransitioning(true);

      let t = 0;
      // Erase down to the root "~/", never below 2 characters.
      for (let len = from.length; len > 2; len--) {
        const next = from.slice(0, len - 1);
        schedule(t, () => setLifelineText(next));
        t += ERASE_STEP_MS;
      }
      t += ERASE_PAUSE_MS;

      // Type the new path back in, one character at a time.
      for (let len = 2; len <= to.length; len++) {
        const next = to.slice(0, len);
        schedule(t, () => setLifelineText(next));
        t += TYPE_STEP_MS;
      }
      t += REVEAL_PAUSE_MS;

      // Only now does the new section actually appear.
      schedule(t, () => {
        setTransitioning(false);
        setActiveSection(id);
      });
    },
    [activeSection, transitioning, lifelineText, clearTimers]
  );

  return { activeSection, transitioning, lifelineText, goTo };
}
