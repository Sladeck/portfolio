import type { MetadataRoute } from "next";
import { SITE_URL } from "./i18n/routes";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			// Route handlers, not pages: nothing here is worth indexing.
			disallow: "/api/",
		},
		sitemap: `${SITE_URL}/sitemap.xml`,
	};
}
