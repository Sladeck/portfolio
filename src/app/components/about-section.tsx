"use client";

import "./about-section.css";
import Panel from "./panel";

const TOOLBELT = [
	"MUI",
	"GOOGLE CLOUD",
	"AWS",
	"FIGMA",
	"OPENAI API",
	"PYTEST",
	"PYDANTIC",
	"DJANGO REST FRAMEWORK",
	"JAVASCRIPT",
	"STRIPE",
	"DJANGO",
	"REACT.JS",
	"NEXT.JS",
	"PYTHON",
	"LINUX",
	"NGINX",
	"CLOUDFLARE",
	"GOOGLE WORKSPACE",
	"SENTRY",
	"TYPESCRIPT",
	"CSS/SCSS",
	"HTML5",
	"UX/UI"
];

const ADJACENT_FIELDS = [
	"NEUROSCIENCE",
	"PSYCHOLOGY",
	"MARKETING",
	"DATA SCIENCE",
	"MENTORING",
	"PRIVACY & SECURITY",
	"PROJECT MANAGEMENT",
	"TEAM MANAGEMENT",
	"TEACHING",
];

const HOBBIES = [
	"MOVIES",
	"FANTASY",
	"SCI-FI",
	"NATURE",
	"PRIVACY & SECURITY",
	"GAMING",
	"METAL/ROCK",
	"HIKING",
	"FOOD & CUISINE",
];

function TagPanel({ title, tags }: { title: string; tags: string[] }) {
	return (
		<Panel title={title}>
			<div className="panel-tags">
				{tags.map((tag) => (
					<span className="panel-tag" key={tag}>
						{tag}
					</span>
				))}
			</div>
		</Panel>
	);
}

// About page: bio, then toolbelt/adjacent-fields/hobbies tag panels.
export default function AboutSection() {
	return (
		<section className="about-section">
			<h1 className="sr-only">About</h1>
			<div className="about-intro">
				<p className="about-paragraph">
					At the end of my third year of a Bachelor&apos;s in Paris, I
					moved to Japan alone, left family and friends behind, and
					joined a small startup called Manzanita to build ax3.io: a SaaS platform mixing
					real neuroscience research with marketing. I stayed eight
					years.
				</p>
				<p className="about-paragraph">
					I started as an intern, became the sole full-time developer
					with a junior&apos;s title and a lead&apos;s responsibilities,
					then grew into a platform engineer leading a small team.
					Whatever needed doing, I was the only one who could do it:
					turning ideas into design into working software, running the
					office&apos;s IT, mentoring junior developers and designers,
					acting as security officer, writing documentation and privacy
					policies, and sitting in front of clients to explain the tech
					myself.
				</p>
				<p className="about-paragraph">
					The result: our tech is now used by a major international constuling company.
				</p>
				<p className="about-paragraph">
					All of it in a foreign country, a foreign culture, a foreign
					language. That&apos;s why new challenges don&apos;t worry me.
					Whatever needs to be done gets done. Now I&apos;m back in
					France, freelance, and looking for new challenges and new
					people to build with.
				</p>
			</div>

			<div className="about-panels">
				<TagPanel title="TOOLBELT" tags={TOOLBELT} />
				<TagPanel title="ADJACENT FIELDS" tags={ADJACENT_FIELDS} />
				<TagPanel title="OUTSIDE WORK" tags={HOBBIES} />
			</div>
		</section>
	);
}
