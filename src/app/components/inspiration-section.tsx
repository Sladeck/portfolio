"use client";

import "./inspiration-section.css";
import { useTranslations } from "../hooks/useTranslations";
import type { Dictionary } from "../i18n/dictionary";

interface InspirationItem {
	key: keyof Dictionary["inspiration"]["captions"];
	image: string;
	/** width, in px, of `image` — needed for the srcSet width descriptor. */
	imageWidth: number;
	imageMobile: string;
	imageMobileWidth: number;
}

const INSPIRATIONS: InspirationItem[] = [
	{
		key: "terminal",
		image: "/inspiration/terminal.webp",
		imageWidth: 900,
		imageMobile: "/inspiration/terminal-sm.webp",
		imageMobileWidth: 450,
	},
	{
		key: "warhammer",
		image: "/inspiration/warhammer-40k.webp",
		imageWidth: 640,
		imageMobile: "/inspiration/warhammer-40k-sm.webp",
		imageMobileWidth: 320,
	},
	{
		key: "oldTv",
		image: "/inspiration/old-tv.webp",
		imageWidth: 641,
		imageMobile: "/inspiration/old-tv-sm.webp",
		imageMobileWidth: 320,
	},
];

// Inspiration page: the references behind the site's look, reachable
// from the "?" badge on the homepage.
export default function InspirationSection() {
	const dict = useTranslations();

	return (
		<section className="inspiration-section">
			<h1 className="inspiration-heading">{dict.inspiration.heading}</h1>

			<div className="inspiration-intro">
				{dict.inspiration.paragraphs.map((paragraph) => (
					<p className="inspiration-paragraph" key={paragraph}>
						{paragraph}
					</p>
				))}
			</div>

			<div className="inspiration-grid">
				{INSPIRATIONS.map((item) => (
					<figure className="inspiration-card" key={item.key}>
						<div className="inspiration-thumb">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src={item.image}
								srcSet={`${item.imageMobile} ${item.imageMobileWidth}w, ${item.image} ${item.imageWidth}w`}
								sizes="(max-width: 640px) 100vw, 300px"
								alt={dict.inspiration.alts[item.key]}
								loading="lazy"
							/>
						</div>
						<figcaption>{dict.inspiration.captions[item.key]}</figcaption>
					</figure>
				))}
			</div>
		</section>
	);
}
