import type { Metadata } from "next";
import HomeClient from "../../components/home-client";
import { notFound } from "next/navigation";
import { buildMetadata } from "../../i18n/metadata";
import { isKnownRoute } from "../../i18n/routes";

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

	// The client router falls back to the home section for any path it
	// doesn't recognise, so without this every made-up URL would answer
	// 200 with a copy of the homepage. Checked against the same route
	// table the router itself uses.
	if (!isKnownRoute(slug)) notFound();

	return <HomeClient />;
}
