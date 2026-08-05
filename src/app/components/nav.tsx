"use client";

import "./nav.css";

// The section ids every nav-aware piece (this menu, the lifeline header,
// the page router) needs to agree on. Keep this the single source of
// truth until it's worth moving to a shared module.
export type SectionId =
	| "home"
	| "about"
	| "stack"
	| "changelog"
	| "projects"
	| "contact";

// Ordered nav links, in the same order they render. "hero" and "contact"
// are handled separately below since they render differently (brand mark
// and CTA button rather than a plain link).
const NAV_LINKS: { id: SectionId; label: string }[] = [
	{ id: "home", label: "~/home" },
	{ id: "about", label: "~/about" },
	{ id: "stack", label: "~/stack" },
	{ id: "changelog", label: "changelog.log" },
	{ id: "projects", label: "~/projects" },
];

interface NavProps {
	/** Currently visible section, used to highlight the matching link. */
	activeSection: SectionId;
	/** Called with the section id whenever a link/brand/CTA is clicked. */
	onNavigate: (id: SectionId) => void;
}

export default function Nav({ activeSection, onNavigate }: NavProps) {
	return (
		<nav className="nav">
			{/* Brand mark on the left doubles as a "go to hero" link */}
			<button
				type="button"
				className="nav-brand"
				onClick={() => onNavigate("home")}
			>
				<span className="nav-cursor" aria-hidden="true" />
				<span className="nav-name">SEBASTIAN_HOLLOWAY</span>
				<span className="nav-role">/ full-stack</span>
			</button>

			<div className="nav-links">
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
						onClick={() => onNavigate(id)}
					>
						{label}
					</button>
				))}

				{/* Always gold — a call to action, not a regular nav state */}
				<button
					type="button"
					className="nav-cta"
					onClick={() => onNavigate("contact")}
				>
					&gt; initiate_contact
				</button>
			</div>
		</nav>
	);
}
