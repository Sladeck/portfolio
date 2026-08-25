"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { urlForRoute } from "../hooks/useSectionRouter";
import { useLocale } from "../hooks/useLocale";
import { withLocalePrefix } from "../i18n/locale";
import type { SectionId } from "./nav";

interface SectionLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	id: SectionId;
	/** Required when id is "project": which detail page to link to. */
	projectSlug?: string;
	onNavigate: (id: SectionId, projectSlug?: string) => void;
}

// A real <Link> (correct href, opens in a new tab on ctrl/cmd/middle
// click) that otherwise runs the in-app erase/retype transition instead
// of a full navigation.
export default function SectionLink({
	id,
	projectSlug,
	onNavigate,
	onClick,
	...rest
}: SectionLinkProps) {
	const locale = useLocale();

	function handleClick(event: MouseEvent<HTMLAnchorElement>) {
		onClick?.(event);
		if (event.defaultPrevented) return;
		if (event.button !== 0) return;
		if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
			return;
		}
		event.preventDefault();
		onNavigate(id, projectSlug);
	}

	return (
		<Link
			href={withLocalePrefix(urlForRoute(id, projectSlug), locale)}
			onClick={handleClick}
			{...rest}
		/>
	);
}
