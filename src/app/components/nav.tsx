"use client";

import "./nav.css";
import { useState } from "react";

// Single source of truth for section ids, shared by this menu, the
// lifeline header, and the page router.
export type SectionId =
	| "home"
	| "about"
	| "changelog"
	| "projects"
	| "contact";

// "home" and "contact" render separately below (brand mark, CTA button).
// "changelog" is reachable from a link on the projects page instead of
// taking up a top-level nav slot.
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

// Top nav: brand mark, section links, and a contact CTA. Below the
// mobile breakpoint, links collapse behind a MENU/CLOSE toggle instead.
export default function Nav({ activeSection, onNavigate }: NavProps) {
	const [menuOpen, setMenuOpen] = useState(false);

	function navigate(id: SectionId) {
		setMenuOpen(false);
		onNavigate(id);
	}

	return (
		<nav className="nav">
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
						aria-current={activeSection === id ? "page" : undefined}
						onClick={() => navigate(id)}
					>
						{label}
					</button>
				))}

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
