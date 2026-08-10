"use client";

import "./language-switcher.css";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "../hooks/useTranslations";
import { useLocale } from "../hooks/useLocale";
import { stripLocalePrefix, withLocalePrefix, type Locale } from "../i18n/locale";

const LOCALE_COOKIE = "locale";
// A year: this records an explicit choice, not a one-off session guess.
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

// EN/FR toggle, always showing both options regardless of the current
// locale: a visitor auto-landed on the French version via browser
// detection can still switch to English, and vice versa. The choice is
// persisted in a cookie so the proxy's Accept-Language redirect on "/"
// respects it on future visits instead of re-detecting every time.
export default function LanguageSwitcher() {
	const pathname = usePathname();
	const router = useRouter();
	const locale = useLocale();
	const dict = useTranslations();

	function switchTo(target: Locale) {
		if (target === locale) return;
		document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=${COOKIE_MAX_AGE}`;
		router.push(withLocalePrefix(stripLocalePrefix(pathname), target));
	}

	return (
		<div className="lang-switch" role="group" aria-label="Language">
			<button
				type="button"
				className={
					locale === "en"
						? "lang-switch-option lang-switch-option--active"
						: "lang-switch-option"
				}
				aria-current={locale === "en" ? "true" : undefined}
				onClick={() => switchTo("en")}
			>
				{dict.langSwitch.english}
			</button>
			<span className="lang-switch-divider" aria-hidden="true">
				/
			</span>
			<button
				type="button"
				className={
					locale === "fr"
						? "lang-switch-option lang-switch-option--active"
						: "lang-switch-option"
				}
				aria-current={locale === "fr" ? "true" : undefined}
				onClick={() => switchTo("fr")}
			>
				{dict.langSwitch.french}
			</button>
		</div>
	);
}
