"use client";

import "./home.css";
import Nav from "./components/nav";
import { useSectionRouter } from "./hooks/useSectionRouter";

export default function Home() {
  const { activeSection, transitioning, lifelineText, goTo } =
    useSectionRouter();

  return (
    <div className="home">
      <Nav activeSection={activeSection} onNavigate={goTo} />

      {/* Stand-in for the CRT screen, until <Screen>/<Lifeline> exist. */}
      <div className="home-screen-stub">
        <p className="home-lifeline-stub">
          {lifelineText}
          <span className="home-cursor" aria-hidden="true" />
        </p>
        <p className="home-status-stub">
          active: {activeSection}
          {transitioning ? " (transitioning…)" : ""}
        </p>
      </div>
    </div>
  );
}
