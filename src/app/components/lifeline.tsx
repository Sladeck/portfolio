"use client";

import "./lifeline.css";
import type { SectionId } from "./nav";

// Small flavor text shown after the path once it's settled. Hidden
// while the text itself is still erasing/retyping.
const SUBLABELS: Record<SectionId, string> = {
	home: "cat home.md",
	about: "cat about.md",
	changelog: "curl api.github.com/events",
	projects: "ls -la --status",
	contact: "",
	inspiration: "cat inspiration.md",
	// Overridden per-project below, using the slug as the file name.
	project: "cat case-study.md",
};

interface LifelineProps {
	/** What the path currently reads, may be mid erase/retype. */
	text: string;
	activeSection: SectionId;
	/** Set while activeSection is "project"; names the sublabel's file. */
	activeProjectSlug?: string;
	transitioning: boolean;
}

// Persistent "~/section" header pinned to the top-left of the screen.
// Stays mounted across every section, only its own text changes.
export default function Lifeline({
	text,
	activeSection,
	activeProjectSlug,
	transitioning,
}: LifelineProps) {
	const subLabel = transitioning
		? ""
		: activeSection === "project" && activeProjectSlug
			? `cat ${activeProjectSlug}.md`
			: SUBLABELS[activeSection];

	return (
		<div className="lifeline">
			<span className="lifeline-bullet" aria-hidden="true">
				◆
			</span>
			<span className="lifeline-text">
				{text}
				<span className="lifeline-cursor" aria-hidden="true" />
			</span>
			{subLabel && <span className="lifeline-sub">{subLabel}</span>}
		</div>
	);
}
