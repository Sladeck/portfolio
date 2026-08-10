"use client";

import "./language-switcher.css";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "../hooks/useLocale";
import { stripLocalePrefix, withLocalePrefix, type Locale } from "../i18n/locale";

const LOCALE_COOKIE = "locale";
// A year: this records an explicit choice, not a one-off session guess.
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function isLocale(value: string): value is Locale {
	return value === "en" || value === "fr";
}

// EN/FR dropdown, always showing both options regardless of the current
// locale: a visitor auto-landed on the French version via browser
// detection can still switch to English, and vice versa. The choice is
// persisted in a cookie so the proxy's Accept-Language redirect on "/"
// respects it on future visits instead of re-detecting every time.
export default function LanguageSwitcher() {
	const pathname = usePathname();
	const router = useRouter();
	const locale = useLocale();

	function switchTo(target: Locale) {
		if (target === locale) return;
		document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=${COOKIE_MAX_AGE}`;
		router.push(withLocalePrefix(stripLocalePrefix(pathname), target));
	}

	return (
		<select
			className="lang-switch"
			value={locale}
			onChange={(event) => {
				const { value } = event.target;
				if (isLocale(value)) switchTo(value);
			}}
			aria-label="Language"
		>
			<option value="en">EN</option>
			<option value="fr">FR</option>
		</select>
	);
}
