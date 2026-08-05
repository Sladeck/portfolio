"use client";

import "./home.css";
import Nav from "./components/nav";
import Screen from "./components/screen";
import Lifeline from "./components/lifeline";
import HomeSection from "./components/home-section";
import { useSectionRouter } from "./hooks/useSectionRouter";

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
				</main>
			</Screen>
		</div>
	);
}
