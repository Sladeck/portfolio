"use client";

import "./nav.css";
import { useState } from "react";
import SectionLink from "./section-link";

// Single source of truth for section ids, shared by this menu, the
// lifeline header, and the page router.
export type SectionId =
	| "home"
	| "about"
	| "changelog"
	| "projects"
	| "contact"
	| "inspiration";

// "home" and "contact" render separately below (brand mark, CTA button).
// "changelog" is reachable from a link on the projects page, and
// "inspiration" from the "?" badge on the homepage, instead of taking up
// a top-level nav slot.
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
	// Kept true for the duration of the close animation, so the overlay
	// stays mounted (display: flex) long enough to play it in reverse
	// instead of just vanishing with menuOpen.
	const [menuClosing, setMenuClosing] = useState(false);

	function closeMenu() {
		setMenuOpen(false);
		setMenuClosing(true);
	}

	function navigate(id: SectionId) {
		closeMenu();
		onNavigate(id);
	}

	// Fires after both the open and close overlay animations; only the
	// close one needs to do anything here.
	function handleOverlayAnimationEnd() {
		if (!menuOpen) setMenuClosing(false);
	}

	return (
		<nav className="nav">
			<SectionLink id="home" onNavigate={navigate} className="nav-brand">
				<span className="nav-name">MOULIN GUILLAUME</span>
				<span className="nav-role">/ full-stack engineer</span>
			</SectionLink>

			<button
				type="button"
				className="nav-toggle"
				aria-expanded={menuOpen}
				aria-controls="nav-links"
				onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
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
				className={
					menuOpen
						? "nav-links nav-links--open"
						: menuClosing
							? "nav-links nav-links--closing"
							: "nav-links"
				}
				onAnimationEnd={handleOverlayAnimationEnd}
			>
				{NAV_LINKS.map(({ id, label }) => (
					<SectionLink
						key={id}
						id={id}
						onNavigate={navigate}
						className={
							activeSection === id ? "nav-link nav-link--active" : "nav-link"
						}
						aria-current={activeSection === id ? "page" : undefined}
					>
						{label}
					</SectionLink>
				))}

				<SectionLink id="contact" onNavigate={navigate} className="nav-cta">
					&gt; initiate_contact
				</SectionLink>
			</div>
		</nav>
	);
}
