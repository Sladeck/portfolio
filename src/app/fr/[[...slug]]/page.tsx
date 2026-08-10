import type { Metadata } from "next";
import HomeClient from "../../components/home-client";
import { buildMetadata } from "../../i18n/metadata";

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
export default function Page() {
	return <HomeClient />;
}
