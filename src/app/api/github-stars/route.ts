import { connection } from "next/server";
import { PROJECTS } from "../../i18n/projects";

// Star counts for the projects that show one, keyed by slug. Visitors
// call this each time they open the page, and the answer is computed at
// that moment rather than prerendered.
//
// GitHub is still asked at most once every five minutes: without a token
// it allows 60 calls an hour per server, and the changelog route spends
// up to ~41 of those on its hourly refresh. The cache lives in this
// server process. When the five minutes are up the next visitor waits for
// the fresh number instead of being served the old one, and if GitHub
// fails (rate limit, outage) the last good count is kept.
const GITHUB_REPO = /^https:\/\/github\.com\/([\w.-]+\/[\w.-]+)\/?$/;
const FRESH_FOR_MS = 5 * 60 * 1000;

let cached: { stars: Record<string, number>; at: number } | null = null;
let refreshing: Promise<Record<string, number>> | null = null;

async function starsFor(repository: string): Promise<number | null> {
	const match = GITHUB_REPO.exec(repository);
	if (!match) return null;
	try {
		const res = await fetch(`https://api.github.com/repos/${match[1]}`, {
			headers: {
				Accept: "application/vnd.github+json",
				"User-Agent": "moulin-portfolio",
			},
			cache: "no-store",
		});
		if (!res.ok) return null;
		const repo = (await res.json()) as { stargazers_count?: unknown };
		return typeof repo.stargazers_count === "number" ? repo.stargazers_count : null;
	} catch {
		return null;
	}
}

async function refresh(): Promise<Record<string, number>> {
	// Start from the last good counts, so a repo GitHub fails on this time
	// keeps its previous number.
	const stars: Record<string, number> = { ...cached?.stars };
	await Promise.all(
		PROJECTS.filter((project) => project.showStars && project.repository).map(
			async (project) => {
				const count = await starsFor(project.repository as string);
				if (count !== null) stars[project.slug] = count;
			},
		),
	);
	cached = { stars, at: Date.now() };
	return stars;
}

export async function GET() {
	await connection();

	let stars = cached?.stars;
	if (!cached || Date.now() - cached.at > FRESH_FOR_MS) {
		// Visitors arriving together share one refresh.
		refreshing ??= refresh().finally(() => {
			refreshing = null;
		});
		stars = await refreshing;
	}

	return Response.json(
		{ stars: stars ?? {} },
		// Live data: no browser or proxy should keep a copy.
		{ headers: { "Cache-Control": "no-store" } },
	);
}
