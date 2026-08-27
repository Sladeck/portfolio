import type { MetadataRoute } from "next";
import { allRoutes, localizedPath, SITE_URL } from "./i18n/routes";

// Both language trees, built from the same route table the router and the
// page components use, so a new section or a newly published case study
// lands here without a second edit.
export default function sitemap(): MetadataRoute.Sitemap {
	const lastModified = new Date();

	return allRoutes().flatMap((path) => {
		// Every entry carries the full alternates set, itself included:
		// that is what tells a crawler /about and /fr/about are one page
		// in two languages rather than duplicate content.
		const languages = {
			en: `${SITE_URL}${localizedPath(path, "en")}`,
			fr: `${SITE_URL}${localizedPath(path, "fr")}`,
		};

		return (["en", "fr"] as const).map((locale) => ({
			url: `${SITE_URL}${localizedPath(path, locale)}`,
			lastModified,
			changeFrequency: "monthly" as const,
			priority: path === "/" ? 1 : 0.7,
			alternates: { languages },
		}));
	});
}
