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
	const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
	const csp = contentSecurityPolicy(nonce);

	const headers = new Headers(request.headers);
	headers.set(LOCALE_HEADER, localeFromPathname(pathname));
	// Next reads the nonce back out of this request header while rendering
	// and stamps it on every script and style tag it emits.
	headers.set("Content-Security-Policy", csp);

	const response = NextResponse.next({ request: { headers } });
	response.headers.set("Content-Security-Policy", csp);
	return response;
}

// Pages are already rendered per request (the root layout reads headers()
// for the locale), so a fresh nonce on each one costs nothing extra.
function contentSecurityPolicy(nonce: string): string {
	const isDev = process.env.NODE_ENV === "development";
	return [
		"default-src 'self'",
		// React's dev build needs eval for its error overlay; production
		// never does.
		`script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}`,
		`style-src 'self' ${isDev ? "'unsafe-inline'" : `'nonce-${nonce}'`}`,
		"img-src 'self' blob: data:",
		"font-src 'self'",
		"object-src 'none'",
		"base-uri 'self'",
		"form-action 'self'",
		"frame-ancestors 'none'",
		"upgrade-insecure-requests",
	].join("; ");
}

export const config = {
	// Every page path: not Next's own assets, not the route handlers, and
	// nothing with a file extension (robots.txt, sitemap.xml, images).
	matcher: "/((?!_next/|api/|.*\\.).*)",
};
