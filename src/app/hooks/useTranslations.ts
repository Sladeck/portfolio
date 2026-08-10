"use client";

import { useLocale } from "./useLocale";
import { dictionaries, type Dictionary } from "../i18n/dictionary";

export function useTranslations(): Dictionary {
	const locale = useLocale();
	return dictionaries[locale];
}
