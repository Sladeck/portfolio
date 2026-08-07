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
};

interface LifelineProps {
	/** What the path currently reads, may be mid erase/retype. */
	text: string;
	activeSection: SectionId;
	transitioning: boolean;
}

// Persistent "~/section" header pinned to the top-left of the screen.
// Stays mounted across every section, only its own text changes.
export default function Lifeline({
	text,
	activeSection,
	transitioning,
}: LifelineProps) {
	const subLabel = transitioning ? "" : SUBLABELS[activeSection];

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
