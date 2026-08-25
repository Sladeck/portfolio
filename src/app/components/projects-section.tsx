"use client";

import "./projects-section.css";
import Panel from "./panel";
import SectionLink from "./section-link";
import { useTranslations } from "../hooks/useTranslations";
import { hasCaseStudy } from "../i18n/projects";
import type { Dictionary } from "../i18n/dictionary";
import type { SectionId } from "./nav";

interface ProjectsSectionProps {
	onNavigate: (id: SectionId) => void;
}

interface Project {
	key: keyof Dictionary["projects"]["descriptions"];
	/** URL segment for this project's detail page, when it has one. */
	slug: string;
	name: string;
	url: string;
	badgeKey: keyof Dictionary["projects"]["badges"];
	stack: string[];
	note: string;
	image: string;
	/** Smaller variant for mobile, via srcSet. Omitted where the full
	 *  image is already small enough that a second variant isn't worth it. */
	imageMobile?: string;
	/** No SSL on the live domain right now, so the link out is disabled. */
	offline?: boolean;
	repository?: string;
}

// Names, URLs, tech stack, and images are proper nouns/universal terms
// that don't change between languages; badge/description text lives in
// the translation dictionary, looked up by key/badgeKey below.
const PROJECTS: Project[] = [
	{
		key: "obsidian",
		slug: "the-obsidian-table",
		name: "The Obsidian Table",
		url: "https://the-obsidian-table.com",
		badgeKey: "personal",
		stack: ["VUE.JS", "NODE.JS"],
		note: "EN",
		image: "/projects/obsidian_table.webp",
		repository: "https://github.com/Sladeck/TheObsidianTable"
	},
	{
		key: "ax3",
		slug: "ax3",
		name: "ax3",
		url: "https://ax3.io",
		badgeKey: "platform",
		stack: ["DJANGO", "NEXT.JS", "I18N"],
		note: "EN / JP",
		image: "/projects/ax3.webp",
		imageMobile: "/projects/ax3-sm.webp",
	},
	{
		key: "manzanita",
		slug: "manzanita",
		name: "Manzanita",
		url: "https://mnzt.io",
		badgeKey: "companySite",
		stack: ["NEXT.JS", "I18N"],
		note: "EN / JP",
		image: "/projects/manzanita.webp",
		imageMobile: "/projects/manzanita-sm.webp",
	},
	{
		key: "cominauv",
		slug: "cominauv",
		name: "cominauv",
		url: "https://cominauv.fr",
		badgeKey: "clientWork",
		stack: ["HTML5", "CSS"],
		note: "FR / EN",
		image: "/projects/cominauv.webp",
		imageMobile: "/projects/cominauv-sm.webp",
		offline: true,
	},
];

// Project cards, plus a small link over to the changelog page.
export default function ProjectsSection({ onNavigate }: ProjectsSectionProps) {
	const dict = useTranslations();

	return (
		<section className="projects-section">
			<h1 className="sr-only">Projects</h1>
			<SectionLink
				id="changelog"
				onNavigate={onNavigate}
				className="projects-changelog-link"
			>
				{dict.projects.changelogLink}
			</SectionLink>

			<div className="projects-list">
				{PROJECTS.map((project) => (
					<Panel
						key={project.key}
						title={project.name}
						badge={dict.projects.badges[project.badgeKey]}
						className="panel--name-as-authored"
					>
						<div className="project-body">
							<div className="project-thumb">
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={project.image}
									srcSet={
										project.imageMobile
											? `${project.imageMobile} 640w, ${project.image} 1280w`
											: undefined
									}
									sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
									alt={`Screenshot of ${project.name}`}
									loading="lazy"
								/>
								{project.offline && (
									<span className="project-offline-stamp">
										{dict.projects.offlineLabel}
									</span>
								)}
							</div>

							<p className="project-description">
								{dict.projects.descriptions[project.key]}
							</p>

							<div className="project-meta">
								<div className="panel-tags">
									{project.stack.map((tech) => (
										<span className="panel-tag" key={tech}>
											{tech}
										</span>
									))}
								</div>
								<span className="project-note">{project.note}</span>
							</div>

							{/* Once a project has a case study, the card points there
							    and the outbound links live on that page instead. */}
							<div className="project-links">
								{hasCaseStudy(project.slug) ? (
									<SectionLink
										id="project"
										projectSlug={project.slug}
										onNavigate={onNavigate}
										className="project-link project-link--case"
									>
										{dict.projects.readMore}
									</SectionLink>
								) : (
									<>
										{project.offline ? (
											<span className="project-link project-link--offline">
												{project.url.replace("https://", "")}
											</span>
										) : (
											<a
												href={project.url}
												target="_blank"
												rel="noopener noreferrer"
												className="project-link"
											>
												{project.url.replace("https://", "")} &#8599;
											</a>
										)}

										{project.repository && (
											<a
												href={project.repository}
												target="_blank"
												rel="noopener noreferrer"
												className="project-link project-link--repo"
											>
												{dict.projects.repoLabel} &#8599;
											</a>
										)}
									</>
								)}
							</div>
						</div>
					</Panel>
				))}
			</div>
		</section>
	);
}
