"use client";

import "./project-detail.css";
import { useId, useState } from "react";
import Panel from "./panel";
import SectionLink from "./section-link";
import { useTranslations } from "../hooks/useTranslations";
import { useLocale } from "../hooks/useLocale";
import {
	adjacentProjects,
	getProject,
	getProjectCopy,
	PROJECT_UI,
	type ProjectShot,
} from "../i18n/projects";
import type { SectionId } from "./nav";

interface ProjectDetailProps {
	slug: string;
	onNavigate: (id: SectionId, projectSlug?: string) => void;
}

function Shot({
	shot,
	alt,
	caption,
	pendingLabel,
	sizes,
	priority,
}: {
	shot: ProjectShot;
	alt: string;
	caption?: string;
	pendingLabel: string;
	/** Rendered width of this slot, for picking the right srcSet entry. */
	sizes: string;
	priority?: boolean;
}) {
	return (
		<figure className="project-shot">
			{/* The placeholder is the only state that needs a reserved box:
			    a real shot sets its own height from its width/height attrs. */}
			<div
				className={
					shot.src
						? "project-shot-frame"
						: "project-shot-frame project-shot-frame--pending"
				}
			>
				{shot.src ? (
					/* eslint-disable-next-line @next/next/no-img-element */
					<img
						src={shot.src}
						srcSet={
							shot.srcMobile && shot.width && shot.mobileWidth
								? `${shot.srcMobile} ${shot.mobileWidth}w, ${shot.src} ${shot.width}w`
								: undefined
						}
						sizes={sizes}
						width={shot.width}
						height={shot.height}
						alt={alt}
						loading={priority ? "eager" : "lazy"}
					/>
				) : (
					<span className="project-shot-pending">[ {pendingLabel} ]</span>
				)}
			</div>
			{caption && <figcaption>{caption}</figcaption>}
		</figure>
	);
}

// Prose that shows its opening paragraph and keeps the rest behind a
// toggle: the goal and role sections are the longest thing between a
// reader and the result, and most people want to choose what to read.
function CollapsibleProse({
	paragraphs,
	expandLabel,
	collapseLabel,
}: {
	paragraphs: string[];
	expandLabel: string;
	collapseLabel: string;
}) {
	const [open, setOpen] = useState(false);
	const restId = useId();
	const [first, ...rest] = paragraphs;

	if (rest.length === 0) {
		return (
			<div className="project-prose">
				<p>{first}</p>
			</div>
		);
	}

	return (
		<div className="project-prose">
			<p>{first}</p>

			{/* Always rendered, only hidden: keeps the text findable by
			    in-page search and by crawlers. */}
			<div
				id={restId}
				className={
					open
						? "project-prose-rest"
						: "project-prose-rest project-prose-rest--closed"
				}
			>
				{rest.map((paragraph) => (
					<p key={paragraph}>{paragraph}</p>
				))}
			</div>

			<button
				type="button"
				className="project-more"
				aria-expanded={open}
				aria-controls={restId}
				onClick={() => setOpen((wasOpen) => !wasOpen)}
			>
				{open ? collapseLabel : `${expandLabel} (${rest.length})`}
			</button>
		</div>
	);
}

// Long-form case study for a single project: story (goal → role → build),
// screenshots, then the result as the closing emphasis.
export default function ProjectDetail({ slug, onNavigate }: ProjectDetailProps) {
	const dict = useTranslations();
	const locale = useLocale();
	const project = getProject(slug);
	const copy = getProjectCopy(slug, locale);
	const ui = PROJECT_UI[locale];

	// Unknown or not-yet-written slug: send people back to the grid
	// rather than rendering an empty shell.
	if (!project || !copy) {
		return (
			<section className="project-detail">
				<SectionLink
					id="projects"
					onNavigate={onNavigate}
					className="project-back"
				>
					&lsaquo; {ui.back}
				</SectionLink>
			</section>
		);
	}

	const { prev, next } = adjacentProjects(slug);

	return (
		<section className="project-detail">
			<SectionLink id="projects" onNavigate={onNavigate} className="project-back">
				&lsaquo; {ui.back}
			</SectionLink>

			<header className="project-header">
				<div className="project-title-row">
					<h1 className="project-name">{project.name}</h1>
					<span className="project-badge">
						{dict.projects.badges[project.badgeKey]}
					</span>
				</div>

				{/* Side by side: at full width each of these on its own line
				    left half the row empty. */}
				<div className="project-lede">
					<p className="project-tagline">{copy.tagline}</p>

					<p className="project-stinger">
						<span aria-hidden="true">&rarr;</span> {copy.stinger}
					</p>
				</div>

				<div className="project-meta-row">
					<span className="project-meta-fact">{project.years}</span>
					<span className="project-meta-sep" aria-hidden="true">
						·
					</span>
					<span className="project-meta-fact">{project.note}</span>

					<span className="project-meta-links">
						{project.offline ? (
							<span className="project-cta project-cta--offline">
								{ui.offline}
							</span>
						) : (
							<a
								href={project.url}
								target="_blank"
								rel="noopener noreferrer"
								className="project-cta project-cta--primary"
							>
								{ui.visitSite} &#8599;
							</a>
						)}

						{project.repository && (
							<a
								href={project.repository}
								target="_blank"
								rel="noopener noreferrer"
								className="project-cta"
							>
								{ui.repo} &#8599;
							</a>
						)}
					</span>
				</div>
			</header>

			<section className="project-block">
				<h2 className="project-heading">{ui.buildHeading}</h2>
				<div className="project-stack">
					<div className="panel-tags">
						{project.stack.map((tech) => (
							<span className="panel-tag" key={tech}>
								{tech}
							</span>
						))}
					</div>
				</div>
			</section>

			{/* Hero and gallery share one container so the gap between the
			    big shot and the row below it matches the gap inside that
			    row, and all three read as a single block of screenshots. */}
			<div className="project-shots">
				<Shot
					shot={project.hero}
					alt={`${project.name} screenshot`}
					pendingLabel={ui.shotPending}
					sizes="(max-width: 640px) 100vw, 1136px"
					priority
				/>

				{project.gallery.length > 0 && (
					<div className="project-gallery">
						{project.gallery.map((shot, index) => (
							<Shot
								key={shot.src ?? `pending-${index}`}
								shot={shot}
								alt={copy.shotAlts[index] || `${project.name} screenshot`}
								caption={copy.shotCaptions[index]}
								pendingLabel={ui.shotPending}
								sizes="(max-width: 640px) 100vw, 568px"
							/>
						))}
					</div>
				)}
			</div>

			<section className="project-block">
				<h2 className="project-heading">{ui.goalHeading}</h2>
				<CollapsibleProse
					paragraphs={copy.goal}
					expandLabel={ui.expand}
					collapseLabel={ui.collapse}
				/>
			</section>

			<section className="project-block">
				<h2 className="project-heading">{ui.roleHeading}</h2>
				<CollapsibleProse
					paragraphs={copy.role}
					expandLabel={ui.expand}
					collapseLabel={ui.collapse}
				/>

				<div className="project-role-grid">
					<Panel title={ui.owned}>
						<ul className="project-list">
							{copy.roleOwned.map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
					</Panel>

					<Panel title={ui.workedWith}>
						<ul className="project-list">
							{copy.roleTeam.map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
					</Panel>
				</div>
			</section>

			<section className="project-result">
				<h2 className="project-result-heading">{ui.resultHeading}</h2>

				<p className="project-result-lead">{copy.resultLead}</p>

				<p className="project-result-body">{copy.resultBody}</p>

				{project.clients && (
					<div className="project-clients">
						<span className="project-clients-label">{ui.clients}</span>
						<div className="panel-tags">
							{project.clients.map((client) => (
								<span className="panel-tag" key={client}>
									{client}
								</span>
							))}
						</div>
					</div>
				)}
			</section>

			{/* Closing call to action. Deliberately back on the spine rather
			    than in a box of its own: the result band above it is the
			    page's loud moment, and a second bordered slab would fight
			    it instead of following it. */}
			<section className="project-block project-outro">
				<h2 className="project-heading">{ui.outroHeading}</h2>

				<div className="project-outro-body">
					<p className="project-outro-lead">{copy.outroLead}</p>

					<SectionLink
						id="contact"
						onNavigate={onNavigate}
						className="project-cta project-cta--primary project-cta--lg"
					>
						{dict.nav.cta}
					</SectionLink>

					{/* Only projects that are live products of their own carry
					    this second line: it is for people interested in the
					    project rather than in hiring. */}
					{copy.outroPartner && !project.offline && (
						<p className="project-outro-partner">
							{copy.outroPartner}{" "}
							<a
								href={project.url}
								target="_blank"
								rel="noopener noreferrer"
								className="project-outro-link"
							>
								{project.url.replace("https://", "")} &#8599;
							</a>
						</p>
					)}
				</div>
			</section>

			{(prev || next) && (
				<nav className="project-pager">
					{prev && (
						<SectionLink
							id="project"
							projectSlug={prev.slug}
							onNavigate={onNavigate}
							className="project-pager-link"
						>
							&lsaquo; {ui.prev}: {prev.name}
						</SectionLink>
					)}
					{next && (
						<SectionLink
							id="project"
							projectSlug={next.slug}
							onNavigate={onNavigate}
							className="project-pager-link project-pager-link--next"
						>
							{ui.next}: {next.name} &rsaquo;
						</SectionLink>
					)}
				</nav>
			)}
		</section>
	);
}
