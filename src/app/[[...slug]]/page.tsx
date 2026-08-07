import type { Metadata } from "next";
import HomeClient from "./home-client";

const SITE_NAME = "Moulin Guillaume";

const TITLES: Record<string, string> = {
	"": `${SITE_NAME} — Freelance Full-Stack Engineer`,
	about: `About — ${SITE_NAME}`,
	projects: `Projects — ${SITE_NAME}`,
	changelog: `Changelog — ${SITE_NAME}`,
	contact: `Contact — ${SITE_NAME}`,
	inspiration: `Inspiration — ${SITE_NAME}`,
};

const DESCRIPTIONS: Record<string, string> = {
	"": "Freelance full-stack engineer based in France. Django, React and Next.js, eight years of shipping product end to end.",
	about: "Background, toolbelt, and adjacent fields.",
	projects: "A selection of projects, including ax3.io, Manzanita, and The Obsidian Table.",
	changelog: "Latest public commits from github.com/Sladeck.",
	contact: "Get in touch about freelance work.",
	inspiration: "The references behind this site's terminal look.",
};

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const key = slug?.[0] ?? "";
	const title = TITLES[key] ?? TITLES[""];
	const description = DESCRIPTIONS[key] ?? DESCRIPTIONS[""];
	// Next shallow-merges openGraph/twitter with the layout's, so the
	// image has to be repeated here or this route's override would drop it.
	const images = [{ url: "/og-image.png", width: 1200, height: 630 }];

	return {
		title,
		description,
		openGraph: { title, description, images, type: "website" },
		twitter: { title, description, images: images.map((i) => i.url) },
	};
}

// Server wrapper so each section can get its own <title>/description;
// HomeClient owns the actual client-driven routing/animation.
export default function Page() {
	return <HomeClient />;
}
