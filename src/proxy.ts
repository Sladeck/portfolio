import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALE_HEADER, localeFromPathname } from "./app/i18n/locale";

const LOCALE_COOKIE = "locale";

function prefersFrench(acceptLanguage: string | null): boolean {
	if (!acceptLanguage) return false;
	// e.g. "fr-FR,fr;q=0.9,en-US;q=0.8" -> just the highest-priority tag.
	const first = acceptLanguage.split(",")[0]?.trim().toLowerCase();
	return first?.startsWith("fr") ?? false;
}

// Only the ambiguous entry point (bare "/") gets auto-detected. Every
// other URL is already unambiguous via its /fr prefix (or lack of one),
// so a shared link always opens in the language it was shared in rather
// than bouncing the visitor somewhere they didn't ask for.
function frenchRedirect(request: NextRequest): NextResponse | null {
	const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
	if (cookieLocale === "en") return null;

	const shouldRedirectToFrench =
		cookieLocale === "fr" ||
		(!cookieLocale && prefersFrench(request.headers.get("accept-language")));

	return shouldRedirectToFrench
		? NextResponse.redirect(new URL("/fr", request.url))
		: null;
}

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	if (pathname === "/") {
		const redirect = frenchRedirect(request);
		if (redirect) return redirect;
	}

	// Every other path just carries its locale through to the root layout,
	// which can't work it out for itself (see LOCALE_HEADER).
	const headers = new Headers(request.headers);
	headers.set(LOCALE_HEADER, localeFromPathname(pathname));
	return NextResponse.next({ request: { headers } });
}

export const config = {
	// Every page path: not Next's own assets, not the route handlers, and
	// nothing with a file extension (robots.txt, sitemap.xml, images).
	matcher: "/((?!_next/|api/|.*\\.).*)",
};
