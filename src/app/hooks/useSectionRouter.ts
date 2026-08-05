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

// One-time boot sequence, on mount only: type "loading", erase it, type
// the home path, then hold with the cursor blinking before the rest of
// the homepage is allowed to appear.
const BOOT_TEXT = "loading...";
const BOOT_TYPE_STEP_MS = 55;
const BOOT_READ_PAUSE_MS = 1500;
const BOOT_HOLD_MS = 1500;

interface SectionRouter {
  activeSection: SectionId;
  /** True while the lifeline is erasing/retyping. Gate section content on this. */
  transitioning: boolean;
  /** True until the initial boot sequence (loading → home path → hold) finishes. */
  booting: boolean;
  /** What the lifeline header should display right now. */
  lifelineText: string;
  goTo: (id: SectionId) => void;
}

/**
 * Owns which section is on screen and drives the lifeline's
 * erase-then-retype animation whenever it changes, plus the one-time
 * boot sequence on mount. Section content should only render once both
 * `booting` and `transitioning` are false. That's what makes the reveal
 * wait for the lifeline to finish typing.
 */
export function useSectionRouter(): SectionRouter {
  const [activeSection, setActiveSection] = useState<SectionId>(INITIAL_SECTION);
  const [transitioning, setTransitioning] = useState(true);
  const [booting, setBooting] = useState(true);
  const [lifelineText, setLifelineText] = useState("");

  // Pending setTimeout ids, so clicking a new link mid-transition (or the
  // boot sequence still running) cancels the old animation instead of
  // letting both run at once.
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  // Boot sequence, runs once on mount.
  useEffect(() => {
    const schedule = (delay: number, fn: () => void) => {
      timers.current.push(setTimeout(fn, delay));
    };
    const home = PATHS[INITIAL_SECTION];
    let t = 0;

    for (let len = 1; len <= BOOT_TEXT.length; len++) {
      const next = BOOT_TEXT.slice(0, len);
      schedule(t, () => setLifelineText(next));
      t += BOOT_TYPE_STEP_MS;
    }
    t += BOOT_READ_PAUSE_MS;

    for (let len = BOOT_TEXT.length - 1; len >= 0; len--) {
      const next = BOOT_TEXT.slice(0, len);
      schedule(t, () => setLifelineText(next));
      t += ERASE_STEP_MS;
    }
    t += ERASE_PAUSE_MS;

    for (let len = 1; len <= home.length; len++) {
      const next = home.slice(0, len);
      schedule(t, () => setLifelineText(next));
      t += TYPE_STEP_MS;
    }
    t += BOOT_HOLD_MS;

    schedule(t, () => {
      setTransitioning(false);
      setBooting(false);
    });

    return clearTimers;
    // Boot only ever runs once, on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goTo = useCallback(
    (id: SectionId) => {
      if (booting || transitioning || id === activeSection) return;

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
    [activeSection, booting, transitioning, lifelineText, clearTimers]
  );

  return { activeSection, transitioning, booting, lifelineText, goTo };
}
