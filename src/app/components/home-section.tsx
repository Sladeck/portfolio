"use client";

import "./home-section.css";
import Panel from "./panel";
import SectionLink from "./section-link";
import { useTranslations } from "../hooks/useTranslations";
import type { SectionId } from "./nav";

interface HomeSectionProps {
	onNavigate: (id: SectionId) => void;
}

// Homepage hero: name, tagline, hire_me/view_work actions, and the
// toolset/languages panels.
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
						title={dict.home.toolsetTitle}
						badge={dict.home.toolsetBadge}
						items={dict.home.toolset}
						className="panel--span-last"
					/>
					<Panel
						title={dict.home.languagesTitle}
						badge={dict.home.languagesBadge}
						items={dict.home.languages}
					/>
				</div>
			</section>
		</>
	);
}
