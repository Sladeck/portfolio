"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { SectionId } from "../components/nav";
import { localeFromPathname, stripLocalePrefix, withLocalePrefix } from "../i18n/locale";
import { URL_PATHS, type FixedSectionId } from "../i18n/routes";

// Path shown in the lifeline header (display text, not a real URL). Kept
// identical across locales on purpose, unlike the nav menu labels: it's
// styled to look like literal terminal/file output, not prose.
const PATHS: Record<FixedSectionId, string> = {
	home: "~/home",
	about: "~/about",
	changelog: "~/changelog.log",
	projects: "~/projects",
	contact: "~/contact",
	inspiration: "~/inspiration",
};

const SECTION_BY_URL_PATH = Object.fromEntries(
	(Object.entries(URL_PATHS) as [FixedSectionId, string][]).map(([id, path]) => [
		path,
		id,
	]),
) as Record<string, FixedSectionId>;

// Project detail pages live one level under the projects grid:
// /projects/ax3, and /fr/projects/ax3 for the French tree. The slug
// itself stays locale-independent so a shared link survives a switch.
const PROJECT_PATH = /^\/projects\/([a-z0-9-]+)$/;

export function urlForRoute(id: SectionId, projectSlug?: string): string {
	if (id === "project") {
		return projectSlug ? `/projects/${projectSlug}` : URL_PATHS.projects;
	}
	return URL_PATHS[id];
}

function lifelinePathFor(id: SectionId, projectSlug?: string): string {
	if (id === "project") {
		return projectSlug ? `~/projects/${projectSlug}` : PATHS.projects;
	}
	return PATHS[id];
}

interface Route {
	section: SectionId;
	projectSlug?: string;
}

function routeFromPathname(pathname: string): Route {
	const path = stripLocalePrefix(pathname);
	const projectMatch = PROJECT_PATH.exec(path);
	if (projectMatch) {
		return { section: "project", projectSlug: projectMatch[1] };
	}
	return { section: SECTION_BY_URL_PATH[path] ?? "home" };
}

// The CSS-side prefers-reduced-motion override (globals.css) doesn't
// reach this: the typing effect is driven by setTimeout, not animation.
function prefersReducedMotion(): boolean {
	return (
		typeof window !== "undefined" &&
		window.matchMedia("(prefers-reduced-motion: reduce)").matches
	);
}

// Timing (ms) for the erase → pause → retype → reveal choreography.
const ERASE_STEP_MS = 16;
const ERASE_PAUSE_MS = 90;
const TYPE_STEP_MS = 30;
const REVEAL_PAUSE_MS = 200;

// Hold after the boot sequence types the landing path, before content appears.
const BOOT_HOLD_MS = 400;

interface SectionRouter {
	activeSection: SectionId;
	/** Which project is on screen while activeSection is "project". */
	activeProjectSlug?: string;
	/** True while the lifeline is erasing/retyping. Gate section content on this. */
	transitioning: boolean;
	/** True until the initial boot sequence (type path → hold) finishes. */
	booting: boolean;
	/** What the lifeline header should display right now. */
	lifelineText: string;
	goTo: (id: SectionId, projectSlug?: string) => void;
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

	// Lazy initializer, not a ref: reads the URL once on mount (e.g.
	// someone landing straight on /projects) without a ref-during-render.
	const [initialRoute] = useState<Route>(() => routeFromPathname(pathname));

	const [activeSection, setActiveSection] = useState<SectionId>(
		initialRoute.section,
	);
	const [activeProjectSlug, setActiveProjectSlug] = useState<
		string | undefined
	>(initialRoute.projectSlug);
	const [transitioning, setTransitioning] = useState(true);
	const [booting, setBooting] = useState(true);
	const [lifelineText, setLifelineText] = useState("");

	// Pending timeout ids, so a new transition cancels any still running.
	const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

	const clearTimers = useCallback(() => {
		timers.current.forEach(clearTimeout);
		timers.current = [];
	}, []);

	useEffect(() => {
		const schedule = (delay: number, fn: () => void) => {
			timers.current.push(setTimeout(fn, delay));
		};
		const target = lifelinePathFor(
			initialRoute.section,
			initialRoute.projectSlug,
		);

		if (prefersReducedMotion()) {
			schedule(0, () => {
				setLifelineText(target);
				setTransitioning(false);
				setBooting(false);
			});
			return clearTimers;
		}

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

	// URL is the source of truth: whenever it differs from what's on
	// screen (goTo pushed it, or the user hit back/forward), run the
	// erase/retype transition to catch up to it.
	useEffect(() => {
		if (booting) return;
		const { section: target, projectSlug: targetSlug } =
			routeFromPathname(pathname);
		if (target === activeSection && targetSlug === activeProjectSlug) return;

		clearTimers();
		const from = lifelineText;
		const to = lifelinePathFor(target, targetSlug);
		const schedule = (delay: number, fn: () => void) => {
			timers.current.push(setTimeout(fn, delay));
		};

		if (prefersReducedMotion()) {
			schedule(0, () => {
				setLifelineText(to);
				setActiveSection(target);
				setActiveProjectSlug(targetSlug);
			});
			return clearTimers;
		}

		schedule(0, () => setTransitioning(true));

		let t = 0;
		// Erase down to the root "~/", never below 2 characters.
		for (let len = from.length; len > 2; len--) {
			const next = from.slice(0, len - 1);
			schedule(t, () => setLifelineText(next));
			t += ERASE_STEP_MS;
		}
		t += ERASE_PAUSE_MS;

		for (let len = 2; len <= to.length; len++) {
			const next = to.slice(0, len);
			schedule(t, () => setLifelineText(next));
			t += TYPE_STEP_MS;
		}
		t += REVEAL_PAUSE_MS;

		schedule(t, () => {
			setTransitioning(false);
			setActiveSection(target);
			setActiveProjectSlug(targetSlug);
		});

		return clearTimers;
		// Only a real URL change should retrigger this, not our own
		// activeSection/lifelineText updates while the animation runs.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname, booting]);

	const goTo = useCallback(
		(id: SectionId, projectSlug?: string) => {
			if (booting || transitioning) return;
			if (id === activeSection && projectSlug === activeProjectSlug) return;
			const locale = localeFromPathname(pathname);
			router.push(withLocalePrefix(urlForRoute(id, projectSlug), locale));
		},
		[
			activeSection,
			activeProjectSlug,
			booting,
			transitioning,
			pathname,
			router,
		],
	);

	return {
		activeSection,
		activeProjectSlug,
		transitioning,
		booting,
		lifelineText,
		goTo,
	};
}
