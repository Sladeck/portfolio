"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { URL_PATHS } from "../hooks/useSectionRouter";
import type { SectionId } from "./nav";

interface SectionLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	id: SectionId;
	onNavigate: (id: SectionId) => void;
}

// A real <Link> (correct href, opens in a new tab on ctrl/cmd/middle
// click) that otherwise runs the in-app erase/retype transition instead
// of a full navigation.
export default function SectionLink({
	id,
	onNavigate,
	onClick,
	...rest
}: SectionLinkProps) {
	function handleClick(event: MouseEvent<HTMLAnchorElement>) {
		onClick?.(event);
		if (event.defaultPrevented) return;
		if (event.button !== 0) return;
		if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
			return;
		}
		event.preventDefault();
		onNavigate(id);
	}

	return <Link href={URL_PATHS[id]} onClick={handleClick} {...rest} />;
}
