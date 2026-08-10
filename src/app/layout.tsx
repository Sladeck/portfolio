import type { Metadata } from "next";
import { JetBrains_Mono, Cinzel } from "next/font/google";
import "./globals.css";

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

const SITE_URL = "https://gmmoulin.com";

const TITLE = "Moulin Guillaume — Freelance Full-Stack Engineer";
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

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en" className={`${jetbrainsMono.variable} ${cinzel.variable}`}>
			<body>{children}</body>
		</html>
	);
}
