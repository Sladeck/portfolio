import type { Metadata } from "next";
import HomeClient from "../components/home-client";
import { notFound } from "next/navigation";
import { buildMetadata } from "../i18n/metadata";
import { isKnownRoute } from "../i18n/routes";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
	const { slug } = await params;
	return buildMetadata("en", slug);
}

// Server wrapper so each section can get its own <title>/description;
// HomeClient owns the actual client-driven routing/animation.
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
