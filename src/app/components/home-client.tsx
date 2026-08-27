"use client";

import "../home.css";
import { useEffect } from "react";
import Nav from "./nav";
import Screen from "./screen";
import Lifeline from "./lifeline";
import HomeSection from "./home-section";
import AboutSection from "./about-section";
import ChangelogSection from "./changelog-section";
import ProjectsSection from "./projects-section";
import ContactSection from "./contact-section";
import InspirationSection from "./inspiration-section";
import ProjectDetail from "./project-detail";
import Footer from "./footer";
import { useSectionRouter } from "../hooks/useSectionRouter";
import { useLocale } from "../hooks/useLocale";

export default function HomeClient() {
	const { activeSection, activeProjectSlug, transitioning, lifelineText, goTo } =
		useSectionRouter();
	const locale = useLocale();

	// Root layout is shared between the / and /fr trees and can't easily
	// read the locale server-side, so the <html lang> is corrected here
	// once the client knows which tree it's in.
	useEffect(() => {
		document.documentElement.lang = locale;
	}, [locale]);

	return (
		<div className="home">
			<Nav activeSection={activeSection} onNavigate={goTo} />

			<Screen>
				<Lifeline
					text={lifelineText}
					activeSection={activeSection}
					activeProjectSlug={activeProjectSlug}
					transitioning={transitioning}
				/>

				{/* Rendered, then hidden while the lifeline animates, rather
				    than unmounted. activeSection is derived from the URL on
				    the server too, so the section's real copy ships in the
				    server-rendered HTML instead of arriving only once the
				    boot sequence finishes — which left crawlers and link
				    unfurlers with nothing but the chrome.

				    visibility (not opacity) so hidden content is also out
				    of the accessibility tree and untabbable, with no
				    aria-hidden/inert to keep in sync. */}
				<main
					className={
						transitioning ? "home-main home-main--hidden" : "home-main"
					}
				>
					{activeSection === "home" && <HomeSection onNavigate={goTo} />}
					{activeSection === "about" && <AboutSection />}
					{activeSection === "changelog" && <ChangelogSection />}
					{activeSection === "projects" && <ProjectsSection onNavigate={goTo} />}
					{activeSection === "contact" && <ContactSection />}
					{activeSection === "inspiration" && <InspirationSection />}
					{activeSection === "project" && activeProjectSlug && (
						<ProjectDetail slug={activeProjectSlug} onNavigate={goTo} />
					)}
				</main>

				<Footer />
			</Screen>
		</div>
	);
}
