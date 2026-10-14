"use client";

import "./home-section.css";
import Panel from "./panel";
import SectionLink from "./section-link";
import { useTranslations } from "../hooks/useTranslations";
import type { SectionId } from "./nav";

interface HomeSectionProps {
	onNavigate: (id: SectionId) => void;
}

// Homepage hero: name, tagline, hire_me/view_work actions, languages,
// and the services/toolset panels.
export default function HomeSection({ onNavigate }: HomeSectionProps) {
	const dict = useTranslations();

	return (
		<>
			<SectionLink
				id="inspiration"
				onNavigate={onNavigate}
				className="home-inspiration-link"
				aria-label={dict.home.inspirationLinkLabel}
			>
				?
			</SectionLink>

			<div className="home-meta">
				{dict.home.metaNode}{" "}
				<span className="home-meta-available">{dict.home.metaAvailable}</span>
			</div>

			<section className="home-section">
				<div className="home-intro">
					<h1 className="home-name">
						<span className="home-name-text">
							MOULIN
							<br />
							GUILLAUME
						</span>
						<span className="home-name-ghost" aria-hidden="true">
							MOULIN
							<br />
							GUILLAUME
						</span>
					</h1>

					<p className="home-subtitle">{dict.home.subtitle}</p>

					<p className="home-tagline">{dict.home.tagline}</p>

					<div className="home-actions">
						<SectionLink
							id="contact"
							onNavigate={onNavigate}
							className="home-action home-action--primary"
						>
							{dict.home.hireMe}
						</SectionLink>
						<SectionLink
							id="projects"
							onNavigate={onNavigate}
							className="home-action home-action--secondary"
						>
							{dict.home.viewWork}
						</SectionLink>
					</div>
				</div>

				<div className="home-panels">
					<Panel
						title={dict.home.servicesTitle}
						badge={dict.home.servicesBadge}
						items={dict.home.services}
						className="panel--stacked panel--prose"
					/>
					<Panel
						title={dict.home.toolsetTitle}
						badge={dict.home.toolsetBadge}
						items={dict.home.toolset}
						className="panel--two-col"
					/>
				</div>

				{/* Its own grid item rather than part of the intro: on desktop
				    it sits under the actions, on a phone it drops below the
				    panels so services come first. */}
				<Panel
					title={dict.home.languagesTitle}
					badge={dict.home.languagesBadge}
					items={dict.home.languages}
					className="home-languages"
				/>
			</section>
		</>
	);
}
