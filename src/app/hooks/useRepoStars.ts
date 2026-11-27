"use client";

import { useEffect, useState } from "react";
import type { Locale } from "../i18n/locale";

/** The project's GitHub star count, or null until (or unless) it loads.
 *  Fetched each time the card or page mounts, so every visit is fresh. */
export function useRepoStars(slug: string, enabled: boolean): number | null {
	// Keyed by slug, so a count can never be shown against another project.
	const [loaded, setLoaded] = useState<{ slug: string; count: number } | null>(null);

	useEffect(() => {
		if (!enabled) return;
		const controller = new AbortController();
		fetch("/api/github-stars", { signal: controller.signal, cache: "no-store" })
			.then((res) => (res.ok ? res.json() : null))
			.then((data: { stars?: Record<string, number> } | null) => {
				const count = data?.stars?.[slug];
				if (typeof count === "number") setLoaded({ slug, count });
			})
			.catch(() => {});
		return () => controller.abort();
	}, [slug, enabled]);

	return enabled && loaded?.slug === slug ? loaded.count : null;
}

/** 999, 1k, 1.5k, 10k, 12k, 1.2M. Rounded down, so it never overstates. */
export function formatStars(count: number, locale: Locale): string {
	const decimal = locale === "fr" ? "," : ".";
	const scale = (value: number, suffix: string) => {
		// One decimal below 10 (1.5k), none from 10 up (12k).
		const shown =
			value < 10 ? Math.floor(value * 10) / 10 : Math.floor(value);
		return `${String(shown).replace(".", decimal)}${suffix}`;
	};
	if (count >= 1_000_000) return scale(count / 1_000_000, "M");
	if (count >= 1_000) return scale(count / 1_000, "k");
	return String(count);
}
