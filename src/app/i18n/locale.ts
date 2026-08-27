export type Locale = "en" | "fr";

export const DEFAULT_LOCALE: Locale = "en";

const LOCALE_PREFIX = "/fr";

// Set by the proxy on every page request so the shared root layout can
// render the right <html lang> server-side. The layout sits above both
// the / and /fr trees and has no params of its own to derive it from.
export const LOCALE_HEADER = "x-locale";

export function asLocale(value: string | null | undefined): Locale {
	return value === "fr" ? "fr" : DEFAULT_LOCALE;
}

export function localeFromPathname(pathname: string): Locale {
	return pathname === LOCALE_PREFIX || pathname.startsWith(`${LOCALE_PREFIX}/`)
		? "fr"
		: "en";
}

// Strips the /fr prefix, if any. Always returns a path starting with "/".
export function stripLocalePrefix(pathname: string): string {
	if (pathname === LOCALE_PREFIX) return "/";
	if (pathname.startsWith(`${LOCALE_PREFIX}/`)) {
		return pathname.slice(LOCALE_PREFIX.length);
	}
	return pathname;
}

// Adds the /fr prefix for French; English (the unprefixed default) is
// returned unchanged.
export function withLocalePrefix(path: string, locale: Locale): string {
	if (locale === "en") return path;
	return path === "/" ? LOCALE_PREFIX : `${LOCALE_PREFIX}${path}`;
}
