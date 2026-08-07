"use client";

import "../home.css";
import Nav from "../components/nav";
import Screen from "../components/screen";
import Lifeline from "../components/lifeline";
import HomeSection from "../components/home-section";
import AboutSection from "../components/about-section";
import ChangelogSection from "../components/changelog-section";
import ProjectsSection from "../components/projects-section";
import ContactSection from "../components/contact-section";
import Footer from "../components/footer";
import { useSectionRouter } from "../hooks/useSectionRouter";

// Optional catch-all route: every section has its own URL (/about,
// /projects, ...) but they're all this one client-driven page, since the
// lifeline's erase-retype transition needs to own the swap.
export default function Home() {
	const { activeSection, transitioning, lifelineText, goTo } =
		useSectionRouter();

	return (
		<div className="home">
			<Nav activeSection={activeSection} onNavigate={goTo} />

			<Screen>
				<Lifeline
					text={lifelineText}
					activeSection={activeSection}
					transitioning={transitioning}
				/>

				<main className="home-main">
					{!transitioning && activeSection === "home" && (
						<HomeSection onNavigate={goTo} />
					)}
					{!transitioning && activeSection === "about" && <AboutSection />}
					{!transitioning && activeSection === "changelog" && (
						<ChangelogSection />
					)}
					{!transitioning && activeSection === "projects" && (
						<ProjectsSection onNavigate={goTo} />
					)}
					{!transitioning && activeSection === "contact" && (
						<ContactSection />
					)}
				</main>

				<Footer />
			</Screen>
		</div>
	);
}
