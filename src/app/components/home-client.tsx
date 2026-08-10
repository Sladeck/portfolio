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
import Footer from "./footer";
import { useSectionRouter } from "../hooks/useSectionRouter";
import { useLocale } from "../hooks/useLocale";

export default function HomeClient() {
	const { activeSection, transitioning, lifelineText, goTo } =
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
					{!transitioning && activeSection === "inspiration" && (
						<InspirationSection />
					)}
				</main>

				<Footer />
			</Screen>
		</div>
	);
}
