import type { Metadata } from "next";
import { dictionaries } from "./dictionary";
import { getProjectCopy } from "./projects";
import type { Locale } from "./locale";

const SITE_NAME = "Moulin Guillaume";

// Shared by both the / (en) and /fr route trees' generateMetadata.
export function buildMetadata(locale: Locale, slug?: string[]): Metadata {
	const dict = dictionaries[locale];
	const key = (slug?.[0] ?? "") as keyof typeof dict.meta.titles;

	// Project detail pages (/projects/<slug>) carry their own copy.
	const projectCopy =
		slug?.[0] === "projects" && slug[1]
			? getProjectCopy(slug[1], locale)
			: undefined;

	const title = projectCopy
		? `${projectCopy.metaTitle} · ${SITE_NAME}`
		: (dict.meta.titles[key] ?? dict.meta.titles[""]);
	const description = projectCopy
		? projectCopy.metaDescription
		: (dict.meta.descriptions[key] ?? dict.meta.descriptions[""]);
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
