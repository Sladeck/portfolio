// Latest public commits for the changelog page, cached server-side so
// every visitor doesn't burn into GitHub's unauthenticated rate limit.
const GITHUB_USERNAME = "Sladeck";
const EVENTS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/events/public`;
const ENTRY_CAP = 20;
const ZERO_SHA = /^0+$/;

interface ActivityEntry {
	id: string;
	repo: string;
	summary: string;
	url: string;
	date: string;
}

interface GitHubEvent {
	type: string;
	repo: { name: string };
	created_at: string;
	payload: {
		before?: string;
		head?: string;
	};
}

// PushEvent payloads only carry a before/head SHA range now, not the
// commit list, so each push needs a follow-up request to resolve them.
interface CompareCommit {
	sha: string;
	html_url: string;
	commit: {
		message: string;
		author?: { date?: string };
	};
}

function firstLine(text: string): string {
	return text.split("\n")[0].trim();
}

async function fetchGitHub<T>(url: string): Promise<T | null> {
	const res = await fetch(url, {
		headers: {
			Accept: "application/vnd.github+json",
			"User-Agent": "moulin-portfolio",
		},
		next: { revalidate: 3600 },
	});
	return res.ok ? ((await res.json()) as T) : null;
}

async function commitsForPush(
	repo: string,
	before: string,
	head: string,
): Promise<CompareCommit[]> {
	if (!ZERO_SHA.test(before)) {
		const compare = await fetchGitHub<{ commits: CompareCommit[] }>(
			`https://api.github.com/repos/${repo}/compare/${before}...${head}`,
		);
		if (compare) return compare.commits;
	}
	// New branch (before is all zeros) or the compare failed: just the head.
	const single = await fetchGitHub<CompareCommit>(
		`https://api.github.com/repos/${repo}/commits/${head}`,
	);
	return single ? [single] : [];
}

export const revalidate = 3600;

export async function GET() {
	const events = await fetchGitHub<GitHubEvent[]>(EVENTS_URL);
	if (!events) {
		return Response.json({ entries: [] as ActivityEntry[] });
	}

	const entries: ActivityEntry[] = [];
	// Two push events (e.g. same range pushed to two branches) can
	// resolve to the same commit: key on repo+sha to dedupe.
	const seen = new Set<string>();

	for (const event of events) {
		if (entries.length >= ENTRY_CAP) break;
		if (event.type !== "PushEvent" || !event.payload.before || !event.payload.head) {
			continue;
		}

		const repo = event.repo?.name ?? "unknown/repo";
		const commits = await commitsForPush(
			repo,
			event.payload.before,
			event.payload.head,
		);

		for (const commit of commits) {
			const key = `${repo}:${commit.sha}`;
			if (seen.has(key)) continue;
			seen.add(key);

			entries.push({
				id: commit.sha,
				repo,
				summary: firstLine(commit.commit.message),
				url: commit.html_url,
				date: commit.commit.author?.date ?? event.created_at,
			});
		}
	}

	entries.sort((a, b) => (a.date < b.date ? 1 : -1));

	return Response.json({ entries: entries.slice(0, ENTRY_CAP) });
}
