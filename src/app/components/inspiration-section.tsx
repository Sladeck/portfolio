"use client";

import "./inspiration-section.css";

interface InspirationItem {
	image: string;
	alt: string;
	label: string;
}

const INSPIRATIONS: InspirationItem[] = [
	{
		image: "/inspiration/terminal.png",
		alt: "A computer terminal",
		label: "TERMINAL",
	},
	{
		image: "/inspiration/warhammer-40k.webp",
		alt: "Warhammer 40k artwork",
		label: "WARHAMMER 40K",
	},
	{
		image: "/inspiration/old-tv.jpg",
		alt: "An old cathode-ray TV",
		label: "CATHODE-RAY TV",
	},
];

// Inspiration page: the references behind the site's look, reachable
// from the "?" badge on the homepage.
export default function InspirationSection() {
	return (
		<section className="inspiration-section">
			<h1 className="inspiration-heading">&gt; inspiration</h1>

			<div className="inspiration-intro">
				<p className="inspiration-paragraph">
					This portfolio draws its look from three things: the computer
					terminals I work in every day, Warhammer 40k, one of my
					favorite fantasy universes, and old cathode-ray TVs, with
					their scanlines and that faint green sweep rolling down the
					screen.
				</p>
				<p className="inspiration-paragraph">
					I wanted to push the effects and animations further, but
					pulled back. This is still a page professionals will look at,
					and I didn&apos;t want anyone waiting on an animation or
					getting annoyed by one.
				</p>
				<p className="inspiration-paragraph">
					I hope you enjoy the result as much as I do. And if it&apos;s
					not your taste, don&apos;t worry, I can do plenty of more
					conventional work too.
				</p>
			</div>

			<div className="inspiration-grid">
				{INSPIRATIONS.map((item) => (
					<figure className="inspiration-card" key={item.label}>
						<div className="inspiration-thumb">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img src={item.image} alt={item.alt} loading="lazy" />
						</div>
						<figcaption>{item.label}</figcaption>
					</figure>
				))}
			</div>
		</section>
	);
}
