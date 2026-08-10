"use client";

import "./about-section.css";
import Panel from "./panel";
import { useTranslations } from "../hooks/useTranslations";

// Tech/tool names are proper nouns, identical in every language, so this
// list isn't part of the translation dictionary.
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
	const dict = useTranslations();

	return (
		<section className="about-section">
			<h1 className="sr-only">About</h1>
			<div className="about-intro">
				{dict.about.paragraphs.map((paragraph) => (
					<p className="about-paragraph" key={paragraph}>
						{paragraph}
					</p>
				))}
			</div>

			<div className="about-panels">
				<TagPanel title={dict.about.toolbeltTitle} tags={TOOLBELT} />
				<TagPanel
					title={dict.about.adjacentFieldsTitle}
					tags={dict.about.adjacentFields}
				/>
				<TagPanel title={dict.about.outsideWorkTitle} tags={dict.about.hobbies} />
			</div>
		</section>
	);
}
