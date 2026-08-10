"use client";

import { usePathname } from "next/navigation";
import { localeFromPathname, type Locale } from "../i18n/locale";

// Locale is derived from the URL (presence/absence of the /fr prefix),
// not stored in component state: same single-source-of-truth pattern as
// useSectionRouter's URL-driven activeSection.
export function useLocale(): Locale {
	const pathname = usePathname();
	return localeFromPathname(pathname);
}
