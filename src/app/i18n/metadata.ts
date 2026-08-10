import type { Metadata } from "next";
import { dictionaries } from "./dictionary";
import type { Locale } from "./locale";

// Shared by both the / (en) and /fr route trees' generateMetadata.
export function buildMetadata(locale: Locale, slug?: string[]): Metadata {
	const dict = dictionaries[locale];
	const key = (slug?.[0] ?? "") as keyof typeof dict.meta.titles;
	const title = dict.meta.titles[key] ?? dict.meta.titles[""];
	const description = dict.meta.descriptions[key] ?? dict.meta.descriptions[""];
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
