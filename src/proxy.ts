import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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
export function proxy(request: NextRequest) {
	if (request.nextUrl.pathname !== "/") return NextResponse.next();

	const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
	if (cookieLocale === "en") return NextResponse.next();

	const shouldRedirectToFrench =
		cookieLocale === "fr" ||
		(!cookieLocale && prefersFrench(request.headers.get("accept-language")));

	if (shouldRedirectToFrench) {
		return NextResponse.redirect(new URL("/fr", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: "/",
};
