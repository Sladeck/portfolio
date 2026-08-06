"use client";

import "./home-section.css";
import Panel from "./panel";
import type { SectionId } from "./nav";

interface HomeSectionProps {
	onNavigate: (id: SectionId) => void;
}

// Everything that fits the "equipped gear" toolset panel, one tile each,
// laid out in a responsive grid so it can hold more than 3 without the
// panel turning into a tall single column.
const TOOLSET: { label: string; value: string }[] = [
	{ label: "LANGUAGES", value: "Python · JavaScript" },
	{ label: "FRAMEWORKS", value: "Django · DRF · React · Next.js" },
	{ label: "INFRASTRUCTURE", value: "AWS · Cloudflare · Sentry · Linux" },
	{ label: "AI INTEGRATION", value: "ChatGPT API · Google Imagen" },
	{ label: "DESIGN", value: "UX/UI · Figma" },
	{ label: "LEADERSHIP", value: "Team lead · intern mentoring" },
	{ label: "IT / ADMIN", value: "Google Workspace · security training" },
	{ label: "SPOKEN", value: "French · English · Japanese" },
];

// Current engagement, separate from TOOLSET since it's about availability
// right now, not accumulated skills.
const STATUS: { label: string; value: string }[] = [
	{ label: "ENGAGEMENT", value: "Freelance" },
	{ label: "LOCATION", value: "France" },
];

export default function HomeSection({ onNavigate }: HomeSectionProps) {
	return (
		<>
			<div className="home-meta">
				NODE: REMOTE · STATUS:{" "}
				<span className="home-meta-available">AVAILABLE</span>
			</div>

			<section className="home-section">
				<div className="home-intro">
					<h1 className="home-name">
						<span className="home-name-text">MOULIN GUILLAUME</span>
						<span className="home-name-ghost" aria-hidden="true">
							MOULIN GUILLAUME
						</span>
					</h1>

					<p className="home-tagline">
						Freelance full-stack engineer based in France with 8 years of
						international experience. I take product from a blank page to
						a live release, start to finish.
					</p>

					<div className="home-actions">
						<button
							type="button"
							className="home-action home-action--primary"
							onClick={() => onNavigate("contact")}
						>
							&gt; hire_me
						</button>
						<button
							type="button"
							className="home-action home-action--secondary"
							onClick={() => onNavigate("projects")}
						>
							&gt; view_work
						</button>
					</div>
				</div>

				<div className="home-panels">
					<Panel title="TOOLSET" badge="8 YRS" items={TOOLSET} />
					<Panel title="STATUS" badge="FREELANCE" items={STATUS} />
				</div>
			</section>
		</>
	);
}
