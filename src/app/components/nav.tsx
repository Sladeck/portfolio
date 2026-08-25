"use client";

import "./nav.css";
import { useState } from "react";
import SectionLink from "./section-link";
import LanguageSwitcher from "./language-switcher";
import { useTranslations } from "../hooks/useTranslations";

// Single source of truth for section ids, shared by this menu, the
// lifeline header, and the page router.
export type SectionId =
	| "home"
	| "about"
	| "changelog"
	| "projects"
	| "contact"
	| "inspiration"
	// Slug-driven detail page (/projects/<slug>), reached from a card on
	// the projects grid rather than a nav slot of its own.
	| "project";

// "home" and "contact" render separately below (brand mark, CTA button).
// "changelog" is reachable from a link on the projects page, and
// "inspiration" from the "?" badge on the homepage, instead of taking up
// a top-level nav slot.
const NAV_LINK_IDS: ("home" | "about" | "projects")[] = [
	"home",
	"about",
	"projects",
];

interface NavProps {
	/** Currently visible section, used to highlight the matching link. */
	activeSection: SectionId;
	/** Called with the section id whenever a link/brand/CTA is clicked. */
	onNavigate: (id: SectionId, projectSlug?: string) => void;
}

// Top nav: brand mark, section links, and a contact CTA. Below the
// mobile breakpoint, links collapse behind a MENU/CLOSE toggle instead.
export default function Nav({ activeSection, onNavigate }: NavProps) {
	const dict = useTranslations();
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
				<span className="nav-role">{dict.nav.role}</span>
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
					{menuOpen ? dict.nav.menuClose : dict.nav.menuOpen}
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
				{NAV_LINK_IDS.map((id) => {
				// A project detail page is still "under" the projects grid,
				// so it keeps that nav link highlighted.
				const active =
					activeSection === id ||
					(id === "projects" && activeSection === "project");

				return (
					<SectionLink
						key={id}
						id={id}
						onNavigate={navigate}
						className={active ? "nav-link nav-link--active" : "nav-link"}
						aria-current={active ? "page" : undefined}
					>
						{dict.nav.links[id]}
					</SectionLink>
				);
			})}

				<SectionLink id="contact" onNavigate={navigate} className="nav-cta">
					{dict.nav.cta}
				</SectionLink>

				<LanguageSwitcher />
			</div>
		</nav>
	);
}
