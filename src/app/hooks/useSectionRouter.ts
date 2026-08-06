"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { SectionId } from "../components/nav";

// Terminal-style path shown in the lifeline header for each section.
const PATHS: Record<SectionId, string> = {
	home: "~/home",
	about: "~/about",
	changelog: "~/changelog.log",
	projects: "~/projects",
	contact: "~/contact",
};

// Real URL for each section, kept separate from the lifeline's display
// text above (e.g. "changelog.log" isn't an actual route).
const URL_PATHS: Record<SectionId, string> = {
	home: "/",
	about: "/about",
	changelog: "/changelog",
	projects: "/projects",
	contact: "/contact",
};

const SECTION_BY_URL_PATH = Object.fromEntries(
	(Object.entries(URL_PATHS) as [SectionId, string][]).map(([id, path]) => [
		path,
		id,
	]),
) as Record<string, SectionId>;

function sectionFromPathname(pathname: string): SectionId {
	return SECTION_BY_URL_PATH[pathname] ?? "home";
}

// Timing (ms) for the erase → pause → retype → reveal choreography.
// Tuned to read as a fast terminal edit, not a slow typewriter.
const ERASE_STEP_MS = 16;
const ERASE_PAUSE_MS = 90;
const TYPE_STEP_MS = 30;
const REVEAL_PAUSE_MS = 200;

// One-time boot sequence, on mount only: type the landing section's
// path, then hold with the cursor blinking before the rest of the page
// is allowed to appear.
const BOOT_HOLD_MS = 700;

interface SectionRouter {
	activeSection: SectionId;
	/** True while the lifeline is erasing/retyping. Gate section content on this. */
	transitioning: boolean;
	/** True until the initial boot sequence (type path → hold) finishes. */
	booting: boolean;
	/** What the lifeline header should display right now. */
	lifelineText: string;
	goTo: (id: SectionId) => void;
}

/**
 * Owns which section is on screen, keeps it in sync with the URL (so
 * deep links and browser back/forward work), and drives the lifeline's
 * erase-then-retype animation whenever the section changes, plus the
 * one-time boot sequence on mount. Section content should only render
 * once both `booting` and `transitioning` are false.
 */
export function useSectionRouter(): SectionRouter {
	const pathname = usePathname();
	const router = useRouter();

	// Whatever section the URL pointed at on first render, e.g. someone
	// landing straight on /projects. The boot sequence types this path
	// instead of always assuming home. Lazy initializer so it's computed
	// once, not a ref read during render.
	const [initialSection] = useState<SectionId>(() =>
		sectionFromPathname(pathname),
	);

	const [activeSection, setActiveSection] =
		useState<SectionId>(initialSection);
	const [transitioning, setTransitioning] = useState(true);
	const [booting, setBooting] = useState(true);
	const [lifelineText, setLifelineText] = useState("");

	// Pending setTimeout ids, so a new transition (or the boot sequence
	// still running) cancels the old animation instead of letting both
	// run at once.
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
		const target = PATHS[initialSection];
		let t = 0;

		for (let len = 1; len <= target.length; len++) {
			const next = target.slice(0, len);
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

	// Whenever the URL's section differs from what's currently on screen
	// (a nav click that already pushed a new URL via goTo below, or the
	// user hitting back/forward and changing it directly), run the same
	// erase/retype transition to catch the lifeline and content up to it.
	useEffect(() => {
		if (booting) return;
		const target = sectionFromPathname(pathname);
		if (target === activeSection) return;

		clearTimers();
		const from = lifelineText;
		const to = PATHS[target];
		const schedule = (delay: number, fn: () => void) => {
			timers.current.push(setTimeout(fn, delay));
		};

		schedule(0, () => setTransitioning(true));

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
			setActiveSection(target);
		});

		return clearTimers;
		// Only a real URL change should retrigger this, not our own
		// activeSection/lifelineText updates while the animation runs.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname, booting]);

	const goTo = useCallback(
		(id: SectionId) => {
			if (booting || transitioning || id === activeSection) return;
			router.push(URL_PATHS[id]);
		},
		[activeSection, booting, transitioning, router],
	);

	return { activeSection, transitioning, booting, lifelineText, goTo };
}
