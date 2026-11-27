"use client";

import type { ReactNode } from "react";
import { useLocale } from "../hooks/useLocale";
import { formatStars, useRepoStars } from "../hooks/useRepoStars";
import { useTranslations } from "../hooks/useTranslations";

interface StarCountProps {
	slug: string;
	enabled: boolean;
	className?: string;
	/** Rendered just before the count, only once there is one to show
	 *  (a separator dot, say), so nothing dangles while it loads. */
	before?: ReactNode;
}

// Below this, a count reads as a weakness rather than a credential.
const MIN_STARS_SHOWN = 50;

// Live GitHub star count. Renders nothing until it has a number, nothing
// if GitHub could not be reached, and nothing below MIN_STARS_SHOWN.
export default function StarCount({ slug, enabled, className, before }: StarCountProps) {
	const dict = useTranslations();
	const locale = useLocale();
	const stars = useRepoStars(slug, enabled);

	if (stars === null || stars < MIN_STARS_SHOWN) return null;

	return (
		<>
			{before}
			<span className={className}>
				{/* Screen readers get the exact number, not the "1.5k" form. */}
				<span aria-hidden="true">&#9733; {formatStars(stars, locale)}</span>
				<span className="sr-only">
					{stars.toLocaleString(locale === "fr" ? "fr-FR" : "en-GB")}{" "}
					{/* French takes the singular for 0 and 1, English only for 1. */}
					{stars === 1 || (locale === "fr" && stars === 0)
						? dict.projects.starLabel
						: dict.projects.starsLabel}
				</span>
			</span>
		</>
	);
}
