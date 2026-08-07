"use client";

import "./home-section.css";
import Panel from "./panel";
import SectionLink from "./section-link";
import type { SectionId } from "./nav";

interface HomeSectionProps {
	onNavigate: (id: SectionId) => void;
}

const TOOLSET: { label: string; value: string }[] = [
	{ label: "LANGUAGES", value: "Python · JavaScript" },
	{ label: "FRAMEWORKS", value: "Django · DRF · React · Next.js" },
	{ label: "INFRASTRUCTURE", value: "AWS · Cloudflare · Sentry · Linux" },
	{ label: "AI INTEGRATION", value: "ChatGPT API · Google Imagen" },
	{ label: "DESIGN", value: "UX/UI · Figma" },
	{ label: "LEADERSHIP", value: "Team lead · Mentoring" },
	{ label: "IT / ADMIN", value: "Google Workspace · security training" },
];

const STATUS: { label: string; value: string }[] = [
	{ label: "ENGAGEMENT", value: "Freelance" },
	{ label: "LOCATION", value: "France" },
];

const LANGUAGES: { label: string; value: string }[] = [
	{ label: "FRENCH", value: "Native" },
	{ label: "ENGLISH", value: "Professional" },
	{ label: "JAPANESE", value: "Intermediate" },
];

// Homepage hero: name, tagline, hire_me/view_work actions, and the
// toolset/status panels.
export default function HomeSection({ onNavigate }: HomeSectionProps) {
	return (
		<>
			<SectionLink
				id="inspiration"
				onNavigate={onNavigate}
				className="home-inspiration-link"
				aria-label="Where the design came from"
			>
				?
			</SectionLink>

			<div className="home-meta">
				NODE: REMOTE · STATUS:{" "}
				<span className="home-meta-available">AVAILABLE</span>
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

					<p className="home-tagline">
						Freelance full-stack engineer based in France with 8 years of
						international experience. I take product from a blank page to
						a live release, start to finish.
					</p>

					<div className="home-actions">
						<SectionLink
							id="contact"
							onNavigate={onNavigate}
							className="home-action home-action--primary"
						>
							&gt; hire_me
						</SectionLink>
						<SectionLink
							id="projects"
							onNavigate={onNavigate}
							className="home-action home-action--secondary"
						>
							&gt; view_work
						</SectionLink>
					</div>
				</div>

				<div className="home-panels">
					<Panel title="TOOLSET" badge="8 YRS" items={TOOLSET} />
					<Panel title="STATUS" badge="FREELANCE" items={STATUS} />
					<Panel title="LANGUAGES" badge="3" items={LANGUAGES} />
				</div>
			</section>
		</>
	);
}
