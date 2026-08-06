"use client";

import "./nav.css";
import { useState } from "react";

// The section ids every nav-aware piece (this menu, the lifeline header,
// the page router) needs to agree on. Keep this the single source of
// truth until it's worth moving to a shared module.
export type SectionId =
	| "home"
	| "about"
	| "changelog"
	| "projects"
	| "contact";

// Ordered nav links, in the same order they render. "hero" and "contact"
// are handled separately below since they render differently (brand mark
// and CTA button rather than a plain link). "changelog" is intentionally
// missing: it's reachable from a small link on the projects page instead
// of taking up a top-level nav slot.
const NAV_LINKS: { id: SectionId; label: string }[] = [
	{ id: "home", label: "~/home" },
	{ id: "about", label: "~/about" },
	{ id: "projects", label: "~/projects" },
];

interface NavProps {
	/** Currently visible section, used to highlight the matching link. */
	activeSection: SectionId;
	/** Called with the section id whenever a link/brand/CTA is clicked. */
	onNavigate: (id: SectionId) => void;
}

export default function Nav({ activeSection, onNavigate }: NavProps) {
	// Only relevant below the mobile breakpoint, where nav-links collapses
	// into a dropdown behind this toggle instead of a row of links.
	const [menuOpen, setMenuOpen] = useState(false);

	function navigate(id: SectionId) {
		setMenuOpen(false);
		onNavigate(id);
	}

	return (
		<nav className="nav">
			{/* Brand mark on the left doubles as a "go to hero" link */}
			<button
				type="button"
				className="nav-brand"
				onClick={() => navigate("home")}
			>
				<span className="nav-name">MOULIN GUILLAUME</span>
				<span className="nav-role">/ full-stack engineer</span>
			</button>

			<button
				type="button"
				className="nav-toggle"
				aria-expanded={menuOpen}
				aria-controls="nav-links"
				onClick={() => setMenuOpen((open) => !open)}
			>
				[{" "}
				{/* key remounts this span on every toggle, so the glitch
				    animation below replays from scratch each time */}
				<span className="nav-toggle-label" key={menuOpen ? "close" : "menu"}>
					{menuOpen ? "CLOSE" : "MENU"}
				</span>{" "}
				]
			</button>

			<div
				id="nav-links"
				className={menuOpen ? "nav-links nav-links--open" : "nav-links"}
			>
				{NAV_LINKS.map(({ id, label }) => (
					<button
						key={id}
						type="button"
						className={
							activeSection === id ? "nav-link nav-link--active" : "nav-link"
						}
						// aria-current tells assistive tech which link matches the
						// page currently on screen, same idea as :active-page in CSS
						aria-current={activeSection === id ? "page" : undefined}
						onClick={() => navigate(id)}
					>
						{label}
					</button>
				))}

				{/* Always gold, a call to action, not a regular nav state */}
				<button
					type="button"
					className="nav-cta"
					onClick={() => navigate("contact")}
				>
					&gt; initiate_contact
				</button>
			</div>
		</nav>
	);
}
