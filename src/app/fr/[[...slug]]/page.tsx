import type { Metadata } from "next";
import HomeClient from "../../components/home-client";
import { notFound } from "next/navigation";
import { buildMetadata } from "../../i18n/metadata";
import { hasCaseStudy } from "../../i18n/projects";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
	const { slug } = await params;
	return buildMetadata("fr", slug);
}

// Mirrors ../../[[...slug]]/page.tsx exactly, just localized: this is the
// /fr/* tree (French), the sibling route is / (English, unprefixed default).
// Both render the same HomeClient, which derives the locale from the URL.
export default async function Page({
	params,
}: {
	params: Promise<{ slug?: string[] }>;
}) {
	const { slug } = await params;

	// /projects/<slug> only exists for projects that have a case study
	// written; anything else under it is a real 404 rather than a page
	// that silently falls back to the home section.
	if (slug?.[0] === "projects" && slug.length > 1) {
		if (slug.length > 2 || !hasCaseStudy(slug[1])) notFound();
	}

	return <HomeClient />;
}
