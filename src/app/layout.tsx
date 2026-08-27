import type { Metadata } from "next";
import { headers } from "next/headers";
import { JetBrains_Mono, Cinzel } from "next/font/google";
import "./globals.css";
import { asLocale, LOCALE_HEADER } from "./i18n/locale";
import { SITE_URL } from "./i18n/routes";

const jetbrainsMono = JetBrains_Mono({
	variable: "--font-jetbrains-mono",
	subsets: ["latin"],
	weight: ["400", "700"],
});

const cinzel = Cinzel({
	variable: "--font-cinzel",
	subsets: ["latin"],
	weight: ["700", "900"],
});

// Fallback only: each route's generateMetadata (en and fr trees) overrides
// this with the localized title/description.
const TITLE = "Moulin Guillaume · Freelance Full-Stack Engineer";
const DESCRIPTION =
	"Freelance full-stack engineer based in France. Django, React and Next.js, eight years of shipping product end to end.";

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: TITLE,
	description: DESCRIPTION,
	icons: { icon: "/favicon.svg" },
	openGraph: {
		title: TITLE,
		description: DESCRIPTION,
		type: "website",
		images: [{ url: "/og-image.png", width: 1200, height: 630 }],
	},
	twitter: {
		card: "summary_large_image",
		title: TITLE,
		description: DESCRIPTION,
		images: ["/og-image.png"],
	},
};

// One layout above both the / and /fr trees, so it has no params to read
// the locale from: the proxy puts it on the request instead. Set here
// rather than only patched client-side, so the served HTML is already
// correct for crawlers and assistive tech. HomeClient still corrects it
// after a client-side language switch, which never re-renders this.
export default async function RootLayout({ children }: LayoutProps<"/">) {
	const locale = asLocale((await headers()).get(LOCALE_HEADER));

	return (
		<html
			lang={locale}
			className={`${jetbrainsMono.variable} ${cinzel.variable}`}
		>
			<body>{children}</body>
		</html>
	);
}
