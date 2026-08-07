"use client";

import "./projects-section.css";
import Panel from "./panel";
import SectionLink from "./section-link";
import type { SectionId } from "./nav";

interface ProjectsSectionProps {
	onNavigate: (id: SectionId) => void;
}

interface Project {
	name: string;
	url: string;
	badge: string;
	description: string;
	stack: string[];
	note: string;
	image: string;
	/** No SSL on the live domain right now, so the link out is disabled. */
	offline?: boolean;
	repository?: string;
}

const PROJECTS: Project[] = [
	{
		name: "The Obsidian Table",
		url: "https://the-obsidian-table.com",
		badge: "PERSONAL",
		description:
			"My own food blog, reviewing restaurants I love around the world. Design and frontend by me, backend built with Claude.",
		stack: ["VUE.JS", "NODE.JS"],
		note: "EN",
		image: "/projects/obsidian_table.png",
		repository: "https://github.com/Sladeck/TheObsidianTable"
	},
	{
		name: "ax3",
		url: "https://ax3.io",
		badge: "PLATFORM",
		description:
			"SaaS platform blending marketing with real neuroscience research. I owned product, design, and engineering at Manzanita for eight years. Login-gated, so the link only shows the front door.",
		stack: ["DJANGO", "NEXT.JS", "I18N"],
		note: "EN / JP",
		image: "/projects/ax3.png",
	},
	{
		name: "Manzanita",
		url: "https://mnzt.io",
		badge: "COMPANY SITE",
		description: "Public website for Manzanita, my previous company in Tokyo. We built ax3's technology together.",
		stack: ["NEXT.JS", "I18N"],
		note: "EN / JP",
		image: "/projects/manzanita.png",
	},
	{
		name: "cominauv",
		url: "https://cominauv.fr",
		badge: "CLIENT WORK",
		description:
			"Website for a startup that bought an amethyst quarry. Plain HTML/CSS by client request, no framework.",
		stack: ["HTML5", "CSS"],
		note: "FR / EN",
		image: "/projects/cominauv.png",
		offline: true,
	},
];

// Project cards, plus a small link over to the changelog page.
export default function ProjectsSection({ onNavigate }: ProjectsSectionProps) {
	return (
		<section className="projects-section">
			<h1 className="sr-only">Projects</h1>
			<SectionLink
				id="changelog"
				onNavigate={onNavigate}
				className="projects-changelog-link"
			>
				&gt; See latest changelogs...
			</SectionLink>

			<div className="projects-list">
				{PROJECTS.map((project) => (
					<Panel key={project.name} title={project.name} badge={project.badge}>
						<div className="project-body">
							<div className="project-thumb">
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={project.image}
									alt={`Screenshot of ${project.name}`}
									loading="lazy"
								/>
								{project.offline && (
									<span className="project-offline-stamp">OFFLINE</span>
								)}
							</div>

							<p className="project-description">{project.description}</p>

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

							<div className="project-links">
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
										repo &#8599;
									</a>
								)}
							</div>
						</div>
					</Panel>
				))}
			</div>
		</section>
	);
}
