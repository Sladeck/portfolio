"use client";

import "./changelog-section.css";
import { useEffect, useState } from "react";

interface ActivityEntry {
	id: string;
	repo: string;
	summary: string;
	url: string;
	date: string;
}

const REVEAL_STEP_MS = 90;

function formatDate(iso: string): string {
	const d = new Date(iso);
	const yyyy = d.getFullYear();
	const mm = String(d.getMonth() + 1).padStart(2, "0");
	const dd = String(d.getDate()).padStart(2, "0");
	return `${yyyy}.${mm}.${dd}`;
}

// Latest 20 commits from GitHub, newest first, fetched from our own
// cached Route Handler rather than GitHub's API directly.
export default function ChangelogSection() {
	const [entries, setEntries] = useState<ActivityEntry[] | null>(null);
	const [failed, setFailed] = useState(false);
	const [visibleCount, setVisibleCount] = useState(0);

	useEffect(() => {
		let cancelled = false;

		fetch("/api/github-activity")
			.then((res) => res.json())
			.then((data: { entries: ActivityEntry[] }) => {
				if (!cancelled) setEntries(data.entries);
			})
			.catch(() => {
				if (!cancelled) setFailed(true);
			});

		return () => {
			cancelled = true;
		};
	}, []);

	// Reveal entries one at a time, like the list is being crawled live.
	useEffect(() => {
		if (!entries || entries.length === 0) return;
		const timers: ReturnType<typeof setTimeout>[] = [];
		timers.push(setTimeout(() => setVisibleCount(0), 0));
		for (let i = 1; i <= entries.length; i++) {
			timers.push(setTimeout(() => setVisibleCount(i), i * REVEAL_STEP_MS));
		}
		return () => timers.forEach(clearTimeout);
	}, [entries]);

	const visibleEntries = entries?.slice(0, visibleCount) ?? [];
	const crawling = !!entries && visibleCount < entries.length;

	return (
		<section className="changelog-section">
			<p className="changelog-intro">
				Live from{" "}
				<a
					href="https://github.com/Sladeck"
					target="_blank"
					rel="noopener noreferrer"
				>
					github.com/Sladeck
				</a>
				: latest 20 commits.
			</p>

			{failed && (
				<p className="changelog-empty">Could not reach GitHub right now.</p>
			)}

			{!failed && entries === null && (
				<p className="changelog-empty">Fetching activity…</p>
			)}

			{!failed && entries !== null && entries.length === 0 && (
				<p className="changelog-empty">No recent public commits found.</p>
			)}

			{visibleEntries.length > 0 && (
				<div className="changelog-list">
					{visibleEntries.map((entry) => (
						<a
							// Composite key: a sha could repeat across repos.
							key={`${entry.repo}:${entry.id}`}
							href={entry.url}
							target="_blank"
							rel="noopener noreferrer"
							className="changelog-row"
						>
							<div className="changelog-date">[{formatDate(entry.date)}]</div>
							<div className="changelog-body">
								<span className="changelog-tag">COMMIT</span>{" "}
								<span className="changelog-repo">{entry.repo}</span>
								<div className="changelog-summary">{entry.summary}</div>
							</div>
						</a>
					))}

					{crawling && (
						<div className="changelog-crawling" aria-hidden="true">
							<span className="changelog-crawling-cursor" />
						</div>
					)}
				</div>
			)}
		</section>
	);
}
