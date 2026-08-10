import type { Metadata } from "next";
import HomeClient from "../components/home-client";
import { buildMetadata } from "../i18n/metadata";

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
export default function Page() {
	return <HomeClient />;
}
