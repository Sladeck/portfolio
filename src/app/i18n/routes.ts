import { hasCaseStudy, PROJECTS } from "./projects";

/** Canonical origin. Shared by the metadata, the sitemap and robots. */
export const SITE_URL = "https://gmmoulin.com";

// Single source of truth for the site's fixed URLs. Deliberately has no
// "use client": the client router routes on this, and the two page.tsx
// server components validate incoming URLs against it, so both sides
// agree on what exists without either re-listing it.
export const URL_PATHS = {
	home: "/",
	about: "/about",
	changelog: "/changelog",
	projects: "/projects",
	contact: "/contact",
	inspiration: "/inspiration",
} as const;

export type FixedSectionId = keyof typeof URL_PATHS;

const FIXED_SECTION_IDS = Object.keys(URL_PATHS) as FixedSectionId[];

// Top-level segments that are real pages: "about" from "/about", etc.
// Home is "/" and so contributes no segment.
const SEGMENTS = new Set(
	FIXED_SECTION_IDS.map((id) => URL_PATHS[id].slice(1)).filter(Boolean),
);

const PROJECT_SLUG = /^[a-z0-9-]+$/;

/**
 * Does this optional-catch-all slug name a page that actually exists?
 * Anything else has to 404 rather than quietly rendering the home
 * section, which is what an unmatched path used to do.
 */
export function isKnownRoute(slug: string[] | undefined): boolean {
	if (!slug || slug.length === 0) return true;

	if (slug[0] === "projects") {
		if (slug.length === 1) return true;
		if (slug.length > 2) return false;
		return PROJECT_SLUG.test(slug[1]) && hasCaseStudy(slug[1]);
	}

	return slug.length === 1 && SEGMENTS.has(slug[0]);
}

/**
 * Every real URL on the site, unprefixed and in nav order. The sitemap
 * builds both locales' trees from this, so a new section or a newly
 * written case study appears there without a second edit.
 */
export function allRoutes(): string[] {
	return [
		...FIXED_SECTION_IDS.map((id) => URL_PATHS[id]),
		...PROJECTS.filter((project) => hasCaseStudy(project.slug)).map(
			(project) => `/projects/${project.slug}`,
		),
	];
}

/** The unprefixed path an optional-catch-all slug corresponds to. */
export function pathFromSlug(slug: string[] | undefined): string {
	return slug && slug.length > 0 ? `/${slug.join("/")}` : "/";
}

/** The same path in a given locale, matching withLocalePrefix's rules. */
export function localizedPath(path: string, locale: "en" | "fr"): string {
	if (locale === "en") return path;
	return path === "/" ? "/fr" : `/fr${path}`;
}
