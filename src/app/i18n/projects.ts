import type { Locale } from "./locale";

// ---------------------------------------------------------------------
// Locale-invariant project data: names, URLs, tech stack, image files.
// Localized prose lives in PROJECT_COPY further down, keyed by the same
// slug. A project only gets a detail page once it has copy in every
// locale (see hasCaseStudy) — the others stay link-out cards for now.
// ---------------------------------------------------------------------

export interface ProjectShot {
	/** Full-size WebP. Omit for a not-yet-captured placeholder frame. */
	src?: string;
	/** ~640w variant for the srcSet. */
	srcMobile?: string;
	/** Intrinsic pixel size, set as width/height attrs so the browser
	    reserves the right box before the file lands. Shots render at
	    their own aspect ratio, so these are not interchangeable. */
	width?: number;
	height?: number;
	mobileWidth?: number;
}

export interface ProjectMeta {
	slug: string;
	name: string;
	url: string;
	/** Category chip, resolved against dict.projects.badges. */
	badgeKey: "personal" | "platform" | "companySite" | "clientWork";
	repository?: string;
	/** No SSL on the live domain right now, so the link out is disabled. */
	offline?: boolean;
	years: string;
	/** Languages the project itself ships in, e.g. "EN / JP". */
	note: string;
	stack: string[];
	hero: ProjectShot;
	/** Extra screenshots below the build section. */
	gallery: ProjectShot[];
	/** Publicly listed on the project's own site. */
	clients?: string[];
}

export const PROJECTS: ProjectMeta[] = [
	{
		slug: "ax3",
		name: "ax3",
		url: "https://ax3.io",
		badgeKey: "platform",
		years: "2018 – 2026",
		note: "EN / JP",
		stack: [
			"PYTHON",
			"DJANGO",
			"POSTGRESQL",
			"NEXT.JS",
			"TYPESCRIPT",
			"REACT",
			"MUI",
			"SCSS",
			"STRIPE",
			"AWS S3",
			"OPENAI API",
			"GOOGLE IMAGEN",
			"CLOUDFLARE",
			"NGINX",
			"LINUX",
			"FIGMA",
			"JIRA",
		],
		hero: {
			src: "/projects/ax3.webp",
			srcMobile: "/projects/ax3-sm.webp",
			width: 1280,
			height: 700,
			mobileWidth: 640,
		},
		gallery: [
			{
				src: "/projects/ax3-demo.webp",
				srcMobile: "/projects/ax3-demo-sm.webp",
				width: 1280,
				height: 700,
				mobileWidth: 640,
			},
			{
				src: "/projects/ax3-brief.webp",
				srcMobile: "/projects/ax3-brief-sm.webp",
				width: 1280,
				height: 700,
				mobileWidth: 640,
			},
		],
		// As listed publicly on ax3.io.
		clients: [
			"CHIVAS",
			"COSMO",
			"DENTSU DIGITAL",
			"GENESIS HEALTHCARE",
			"HK EXPRESS",
			"IS BBDO",
			"JIMMY CHOO",
			"PERNOD RICARD",
			"YAMAGATA",
		],
	},
	{
		slug: "hikari-atlas",
		name: "Hikari Atlas",
		url: "https://hikari-atlas.com",
		badgeKey: "personal",
		repository: "https://github.com/Sladeck/hikari-atlas",
		years: "2026",
		note: "EN / JP",
		stack: [
			"VUE.JS",
			"VITE",
			"GSAP",
			"WEBGL",
			"PYTHON",
			"NUMPY",
			"SCIPY",
			"PANDAS",
			"PILLOW",
			"DOCKER",
			"NGINX",
			"TRAEFIK",
		],
		hero: {
			src: "/projects/hikari-atlas.webp",
			srcMobile: "/projects/hikari-atlas-sm.webp",
			width: 1280,
			height: 700,
			mobileWidth: 640,
		},
		// The live animation, then a finished wallpaper with its downloads:
		// what the site shows, then what it gives away.
		gallery: [
			{
				src: "/projects/hikari-atlas-quakes.webp",
				srcMobile: "/projects/hikari-atlas-quakes-sm.webp",
				width: 1280,
				height: 782,
				mobileWidth: 640,
			},
			{
				src: "/projects/hikari-atlas-rivers.webp",
				srcMobile: "/projects/hikari-atlas-rivers-sm.webp",
				width: 1280,
				height: 782,
				mobileWidth: 640,
			},
		],
	},
	{
		slug: "manzanita",
		name: "Manzanita",
		url: "https://mnzt.io",
		badgeKey: "companySite",
		years: "2023",
		note: "EN / JP",
		stack: [
			"TYPESCRIPT",
			"NEXT.JS",
			"REACT",
			"SCSS",
			"I18N",
			"PYTHON",
			"DJANGO",
			"NGINX",
			"LINUX",
			"FIGMA",
		],
		hero: {
			src: "/projects/manzanita.webp",
			srcMobile: "/projects/manzanita-sm.webp",
			width: 1280,
			height: 700,
			mobileWidth: 640,
		},
		// The same section in both languages: the strongest evidence that
		// the layout survives Japanese, which is what made this hard.
		gallery: [
			{
				src: "/projects/manzanita-case-en.webp",
				srcMobile: "/projects/manzanita-case-en-sm.webp",
				width: 1280,
				height: 968,
				mobileWidth: 640,
			},
			{
				src: "/projects/manzanita-case-jp.webp",
				srcMobile: "/projects/manzanita-case-jp-sm.webp",
				width: 1280,
				height: 968,
				mobileWidth: 640,
			},
		],
	},
	{
		slug: "the-obsidian-table",
		name: "The Obsidian Table",
		url: "https://the-obsidian-table.com",
		badgeKey: "personal",
		repository: "https://github.com/Sladeck/TheObsidianTable",
		years: "2026",
		note: "EN",
		stack: [
			"VUE.JS",
			"TYPESCRIPT",
			"VITE",
			"PRIMEVUE",
			"NODE.JS",
			"EXPRESS",
			"PRISMA",
			"POSTGRESQL",
			"DOCKER",
			"TRAEFIK",
			"LINUX",
			"CLOUDFLARE",
		],
		hero: {
			src: "/projects/obsidian-hero.webp",
			srcMobile: "/projects/obsidian-hero-sm.webp",
			width: 1280,
			height: 720,
			mobileWidth: 640,
		},
		gallery: [
			{
				src: "/projects/obsidian-review.webp",
				srcMobile: "/projects/obsidian-review-sm.webp",
				width: 1280,
				height: 900,
				mobileWidth: 640,
			},
			{
				src: "/projects/obsidian-scale.webp",
				srcMobile: "/projects/obsidian-scale-sm.webp",
				width: 1280,
				height: 900,
				mobileWidth: 640,
			},
		],
	},
	{
		slug: "cominauv",
		name: "cominauv",
		url: "https://cominauv.fr",
		badgeKey: "clientWork",
		// The domain no longer resolves at all: the company behind it is
		// gone, so there is nothing left to link out to.
		offline: true,
		years: "2022 \u2013 2024",
		note: "FR / EN",
		stack: ["HTML5", "CSS", "JAVASCRIPT", "FIGMA"],
		hero: {
			src: "/projects/cominauv.webp",
			srcMobile: "/projects/cominauv-sm.webp",
			width: 1280,
			height: 700,
			mobileWidth: 640,
		},
		gallery: [
			{
				src: "/projects/cominauv-sections.webp",
				srcMobile: "/projects/cominauv-sections-sm.webp",
				width: 1280,
				height: 1000,
				mobileWidth: 640,
			},
			{
				src: "/projects/cominauv-produits.webp",
				srcMobile: "/projects/cominauv-produits-sm.webp",
				width: 1280,
				height: 1000,
				mobileWidth: 640,
			},
		],
	},
];

export interface ProjectCopy {
	tagline: string;
	/** One-line outcome shown high on the page, for skim-readers. */
	stinger: string;
	goal: string[];
	role: string[];
	roleOwned: string[];
	roleTeam: string[];
	resultLead: string;
	resultBody: string;
	/** Closing pitch, in the reader's direction rather than the project's. */
	outroLead: string;
	/** Only for projects people might approach about the project itself
	    (a live commercial platform), not about hiring. Paired with the
	    project's own URL in the outro. */
	outroPartner?: string;
	/** Indexed to match ProjectMeta.gallery. */
	shotCaptions: string[];
	shotAlts: string[];
	metaTitle: string;
	metaDescription: string;
}

type CopyBySlug = Record<string, ProjectCopy>;

const EN_COPY: CopyBySlug = {
	"hikari-atlas": {
		tagline:
			"An atlas of Japan drawn only with light, where every picture comes from real scientific data.",
		stinger:
			"Ten subjects, from Mount Fuji to the country at night, each in its own colour of light. Every chapter animates its data live, explains how it was drawn, and ends in free wallpapers.",
		goal: [
			"On an OLED screen a black pixel is not dark, it is off. Hikari Atlas is built on that idea: Japan drawn only with light, where everything that is not data stays switched off. I wanted to take the country I lived in for eight years and see how much of it could be told with real data alone, one subject at a time, each in its own colour.",
			"Japan is an unusually good subject for it. It shakes, erupts, floods and blooms on a schedule, and its agencies publish all of it. Each chapter shows a different side of it: the earthquakes trace the plate boundaries without a single line of coast, the rivers draw the islands by themselves, the sakura and autumn fronts cross them with the seasons, and the railways and the night lights show where people live.",
			"The other goal was the one behind The Obsidian Table, pushed further: see how far I could get by directing an AI agent on something I could not have built alone, in fields I did not know. Seismology, hydrology, tsunami simulation and seasonal phenology were not on my CV, and I wanted to understand how each picture was made, not just to own it.",
		],
		role: [
			"This one I directed rather than wrote. Claude Code wrote most of the code, the Vue site and the Python pipeline behind the images alike. What it should be, what it should look like and whether each picture was true were my calls.",
			"The concept, the scope and the art direction: ten chapters, one subject each, each with its own colour of light, and a front page built as a station departure board where every row rebuilds the same 36,000 points of light into that chapter's scene. Choosing which datasets deserved a chapter, and which did not, was most of the editorial work.",
			"The rest was checking. Every figure on the site is computed from the data, and a number that does not come out of a dataset does not go on the page. The errors worth catching were the quiet ones: the 3D Fuji was 3.2 times too steep for a while and looked perfectly fine. Approximations stay, but they are stated, like the simplified source of the 2011 tsunami or the doubled depth of the 3D plates.",
			"The whole site exists in English and Japanese, one language at a time. Animations pause off-screen, honour reduced motion and fall back to still images without WebGL, and every wallpaper ships in a desktop (3840×2160) and a phone (1290×2796) version.",
			"It runs on the same server as this portfolio and The Obsidian Table: a static build served by nginx in Docker, behind the Traefik already there, with no database and no secrets. I also settled the licences: noncommercial for the code, CC BY-NC for the images, and every data provider credited under its own terms.",
		],
		roleOwned: [
			"Concept, scope and the ten chapters",
			"Art direction and visual system",
			"Front page as a live departure board",
			"Dataset selection (USGS, JMA, NOAA, NASA, Smithsonian, HydroSHEDS)",
			"Review of every render and every figure",
			"Bilingual site (EN / JP)",
			"Deployment on my own server (Docker, nginx, Traefik)",
			"Licensing and data credits",
		],
		roleTeam: [
			"Claude Code (Vue site and Python render pipeline)",
		],
		resultLead:
			"Japan drawn in ten chapters of light, live at hikari-atlas.com, with 45 wallpapers anyone can download for free.",
		resultBody:
			"From Mount Fuji to Japan at night, each chapter has a live animation, a gallery and a section on how it was made and from which sources. Ninety PNG files, desktop and phone, every unlit pixel exactly #000000. It also shows how I work with AI: the agent writes the code quickly, and the hard part, knowing whether the result is right, stays mine.",
		outroLead:
			"Convinced? Send me a message about your project, especially if it starts with data nobody has made readable yet.",
		shotCaptions: [
			"the earthquakes chapter, live",
			"a wallpaper and its downloads",
		],
		shotAlts: [
			"The Earthquakes chapter of Hikari Atlas: the departure board of chapters on the left, a live animation of earthquakes since 1973 tracing Japan's plate boundaries, and the chapter's figures below.",
			"The Rivers wallpaper on Hikari Atlas: every river reach in Japan lit by its flow, shown as desktop and phone versions beside their download buttons.",
		],
		metaTitle:
			"Hikari Atlas",
		metaDescription:
			"Japan drawn only with light from real scientific data, in ten chapters and 45 free OLED wallpapers, directed by me and built with Claude Code.",
	},
	"the-obsidian-table": {
		tagline:
			"A restaurant review site I designed, built and still write, and the reason I run my own server.",
		stinger:
			"It started as a joke among friends. It ended as the machine this portfolio is served from.",
		goal: [
			"My friends called me picky. What I am picky about is the whole thing being right: good ingredients, cooked properly, star on the door or not. Over the years the joke turned into an actual rating system, and eventually into somewhere to put it.",
			"There were two things I wanted to practise on it. Vue was the first: I work in React and Next.js and had never shipped anything in Vue, and reading about a framework is not the same as living with its decisions for two months. The second was building alongside an AI agent. Every team is asking how far it can be trusted right now, and I wanted a real project to form an opinion on rather than a demo.",
			"Then it had to actually be online, which meant a server. That turned out to be the part with the longest tail.",
		],
		role: [
			"Everything here is a decision I made, including the ones about what not to write myself.",
			"The design is mine and so is roughly seventy percent of the frontend, hand-written in Vue and TypeScript. The product thinking is mine too: four separate scores instead of one, because a single number never fairly describes a meal, and a review split along the same four axes so a low score always says which part it came from.",
			"The database schema and the API I built by directing Claude Code, on purpose. The interesting part was not the generation, it was everything after it: reading code you did not write but do own, deciding where it was wrong, and staying responsible for something that has to keep running. That is a different skill from writing it yourself and it is the one worth having now.",
			"Getting it online is what made me rent a server, and I set the machine up from nothing: Linux, dependencies, user accounts, SSH access, pulling and installing the repo, then the domain and DNS through Cloudflare, and Docker behind Traefik with automatic certificates. That box now serves this portfolio as well.",
			"The admin side is a login with a TOTP second factor and rate limiting on both steps, and photos are resized in the browser before they are ever uploaded.",
		],
		roleOwned: [
			"Product concept and the four-axis rating system",
			"Visual design, end to end",
			"Frontend in Vue 3 and TypeScript (~70% hand-written)",
			"Database and API, built by directing Claude Code",
			"Admin panel: login, TOTP 2FA, rate limiting",
			"Image pipeline, resized client-side before upload",
			"Linux server: users, SSH, dependencies, deploy",
			"Domain and DNS (Cloudflare), Docker, Traefik, TLS",
			"Every review on the site",
		],
		roleTeam: ["Claude Code (database and API)"],
		resultLead:
			"A joke among friends became a live product, on a server I set up myself and now run this portfolio from.",
		resultBody:
			"It has been up since July 2026: a Vue frontend I designed and mostly wrote, an API and database I built by directing an AI agent, and infrastructure I put together from an empty Linux box up to the TLS certificates. Two things I had never done before, a framework and a way of working, learned on something real enough that it has to stay up. The reviews are still mine to write.",
		outroLead:
			"Convinced? Send me a message about your project. I have a soft spot for the ones that start as an idea nobody has scoped yet.",
		shotCaptions: ["a review", "the g-scale breakdown"],
		shotAlts: [
			"A restaurant review on The Obsidian Table: the name in Japanese, a score out of ten, a photo carousel and the written impression.",
			"The G-Scale breakdown: quality, atmosphere, price and service each scored on their own segmented bar, beside the address and price level.",
		],
		metaTitle: "The Obsidian Table",
		metaDescription:
			"A restaurant review site in Vue and Express: my own design and frontend, an API built by directing Claude Code, and the server that now runs this portfolio.",
	},
	ax3: {
		tagline:
			"Manzanita's SaaS platform that turns real neuroscience research into marketing decisions.",
		stinger:
			"Now licensed by a major international consulting firm, which delivers the results to its own clients.",
		goal: [
			"The science that explains why people actually buy is buried in academic literature almost nobody outside a research team can reach, let alone put to work. The first challenge had nothing to do with software: the team worked through hundreds of research papers to extract the calculations that turn a set of answers into a reliable personality profile.",
			"From those profiles, ax3 clusters an audience into groups by personality, surfaces the psychological traits behind each cluster, and shows a brand which of those traits can be used to trigger action. That is the product: not a survey tool, but a way to understand who you are talking to and what actually moves them.",
			"The second challenge was making that legible. Psychometric output is dense and easy to misread, and a marketing team acting on a cluster it has misunderstood does real damage. Years of iteration went into it, and not only into the interface: the harder problem was finding a way to present psychometric data so clients read their clusters correctly and could act on them with confidence.",
			"My goal was to understand all of it well enough to build the platform around it, and to bridge three teams that did not naturally speak the same language: data science, psycom (psychology and communication), and marketing. All of it while handling personal, sensitive data responsibly.",
		],
		role: [
			"I led ax3 from its first prototype to production and stayed its sole driver for eight years: six of them solo, the last two alongside a junior developer I mentored. The neuroscience and psychometric research came from Manzanita's science team. Everything that turned it into a product was mine.",
			"Most days were spent writing code, but the part that made the product possible happened between the teams. I had to learn enough data science, psycom, and marketing to push back on each of them, then turn the result into something software could actually do. Getting the psychometrics right was not optional: a clean interface over a wrong calculation is worse than no product at all.",
			"On a team this size design and engineering were the same job, which is why the design system and the frontend that implemented it were built together. I designed the whole product in Figma, from brand guidelines and a component system through to prototypes, and rebuilt the way results are presented many times over as we learned where clients misread them. I worked directly with the neuroscience team to understand what each metric meant before deciding how to show it.",
			"On the engineering side I owned the architecture end to end: the Django and PostgreSQL backend, the data model behind the assessments and the clustering, the Next.js and TypeScript frontend, and every integration the platform runs on, including Stripe for payments, AWS S3 for sensitive data, and OpenAI and Imagen for generated content.",
			"I ran the infrastructure myself: a Linux server with NGINX, DNS and SSL across several domains through Cloudflare, and S3 for the personal data the platform holds. Because that data is sensitive, security was part of the product rather than an afterthought: application security, plus the company's Information Security Policy and disaster recovery plan.",
			"The rest was people. I owned the roadmap and release scope in Jira, mentored a junior developer and a run of design and development interns, and sat in front of clients myself to explain how the platform works and to understand what they actually needed from it.",
		],
		roleOwned: [
			"Product roadmap and release scope (Jira)",
			"UX/UI design, design system, prototyping (Figma)",
			"Psychometric output turned into product logic",
			"Frontend architecture (Next.js, TypeScript)",
			"Backend and database architecture (Django, PostgreSQL)",
			"Assessment and clustering data model",
			"Third-party integrations (Stripe, AWS S3, OpenAI, Imagen)",
			"Linux server, NGINX, DNS and SSL",
			"Sensitive data handling and application security",
			"Security policies (ISP, DRP)",
			"Mentoring: 1 junior developer, design and dev interns",
			"Client-facing technical discussions",
		],
		roleTeam: [
			"Neuroscience team",
			"Data science team",
			"1 junior developer (last 2 years)",
			"Design and developer interns",
			"Company management",
		],
		resultLead:
			"Research that only specialists could read became a product a global consulting firm now puts in front of its own clients.",
		resultBody:
			"Eight years, many design iterations, and one constant: making psychometric data legible without making it wrong. What began as a Django prototype became a production SaaS running on its own infrastructure, serving brand work in English and Japanese: around 200,000 user profiles processed across 95+ psychological traits, 25 client analyses, and a single outage in five years of production.",
		outroLead:
			"Convinced? Send me a message about your own project and we will work out how I can help.",
		outroPartner:
			"Questions about ax3 itself, or a partnership around the platform? Ask me, or go straight to the source:",
		shotCaptions: ["project analytics", "generated brief"],
		shotAlts: [
			"The analytics tab of an ax3 project: people and posts analysed, the source terms that drew the most engagement, how the audience splits into four clusters, and sentiment per term.",
			"A communication brief in ax3: the clusters a trait reaches, who those people are, how to trigger them, and three generated example ads.",
		],
		metaTitle: "ax3",
		metaDescription:
			"Manzanita's SaaS platform bridging neuroscience and marketing, led from prototype to production over eight years.",
	},
	manzanita: {
		tagline:
			"Manzanita's public site, rebuilt in English and Japanese, and the first project I handed over end to end.",
		stinger:
			"The developer who built it went from features inside ax3 to taking a whole site from first frame to running service.",
		goal: [
			"Manzanita's old site had stopped representing the company. The rebuild had one job: explain Gen3 marketing to someone who had never heard of it, clearly enough that they write in at the end. Understanding first, enquiries second.",
			"It had a second goal that had nothing to do with the site. Until then the junior developer on my team had only built features inside ax3, always within an architecture someone else had already settled. He needed one project he could take end to end, from the first design frame to a service running on the server. A public marketing site was the right size for that: real stakes and a real deadline, but a scope he could hold in his head.",
			"English and Japanese was the hard part. The site is one long page of marketing copy, and Japanese runs at a completely different length and density. Every section had to hold its shape in both, which is the kind of constraint you only learn by hitting it.",
		],
		role: [
			"I did not write most of this site. That was the point, and my job was to make sure it came out right anyway.",
			"We designed it as a pair. He took the copy from the marketing team and we worked through what each section had to say, and in what order, before any of it became a page. I reviewed the structure: what belongs at the top, which section follows which, where the argument loses a reader. Then the details, spacing consistency from section to section, accessibility problems he had not run into before, and the layouts that work in English and fall apart in Japanese.",
			"Feedback ran in rounds. Mine first, then the whole company: marketing on the message, everyone on whether the site actually did the job it was built for. He rewrote against that feedback rather than against my opinion, which is a different and more useful thing to learn.",
			"Where I did put hands on was the deployment, because he had never done one. We went through it together: a release branch in the repo, then onto the Linux server, pull, install, a Python virtual environment for the small Django service behind the contact form, a service for the Next.js app, and NGINX in front of both. He drove, I explained why each step existed.",
			"Since launch it has been maintenance rather than development: keeping it up, and watching the dependencies for anything that needs patching.",
		],
		roleOwned: [
			"Section structure, hierarchy and order",
			"Design direction, in duo",
			"Design review: spacing, consistency, accessibility",
			"Code review",
			"Bilingual layout review (EN / JP)",
			"Linux server, service setup, NGINX",
			"First deployment, walked through together",
			"Mentoring and feedback rounds",
		],
		roleTeam: [
			"Junior developer (build)",
			"Marketing team (copy)",
			"Company-wide review",
		],
		resultLead:
			"A developer who had only ever built features inside ax3 took a whole site from the first design frame to a running service.",
		resultBody:
			"The site has been live in English and Japanese since 2023 and is what Manzanita points people at: one page that explains Gen3 from nothing and ends in a contact form, and it brings in the enquiries it was built for. It has needed maintenance since, not development.",
		outroLead:
			"Convinced? Send me a message about your project, whether you need it built or someone to make sure it gets built right.",
		shotCaptions: ["the gen3 case study, english", "the same section, japanese"],
		shotAlts: [
			"The Gen3 case study section of Manzanita's site in English: a national fitness chain, a 5x CTR increase across 3.3 million impressions.",
			"The same case study section in Japanese, the layout holding its shape against a different text length and density.",
		],
		metaTitle: "Manzanita",
		metaDescription:
			"Manzanita's bilingual company site, rebuilt in Next.js by the junior developer I mentored through his first end-to-end build and deployment.",
	},
	cominauv: {
		tagline:
			"A five-page bilingual site for an amethyst quarry, built by hand from a brand guide drawn for print.",
		stinger:
			"No dependencies to update, no build to rerun, no framework to migrate off. There is nothing in it that can rot.",
		goal: [
			"A design studio had already produced the brand guide: a display face, a green accent, diagonal section cuts, and a geometric crystal mark. My job was to turn that into a working website without a designer to hand it back to and without changing anything they had decided.",
			"The client set one hard constraint: as little JavaScript as possible. So there is no framework, no build step and not a single .js file on the site. What logic exists is a handful of inline blocks, a mobile menu, a size switcher on the product cards, the copyright year.",
			"The site had to carry a real sales job. Six sections of it explain the quarry, the products and the visits, in French, with the front page and the visits page also in English, and end on a page aimed squarely at investors.",
		],
		role: [
			"Everything on the web side was mine: the whole layout, every page, both languages, all of it written by hand.",
			"The interesting part was translating a print-minded brand guide into something that behaves. Diagonal section edges that hold at any width, a display face that stays readable down to a phone, a palette that alternates light and dark section by section without turning into noise, and a product catalogue with size tabs and price tables that had to look designed rather than tabulated.",
			"Working without a framework changes what you spend your time on. There is no component to reach for, so consistency has to come from the stylesheet and from discipline, and every page is written out. In exchange, nothing sits between the visitor and the page.",
			"No AI was involved at any point. The client did not want it, which is their call to make, and it was theirs to make.",
		],
		roleOwned: [
			"Full web design from the supplied brand guide",
			"Every page, hand-written HTML and CSS",
			"Responsive layout, including the diagonal sections",
			"Product catalogue: size tabs, pricing tables",
			"Bilingual pages (FR / EN)",
			"Favicons, manifest, sitemap, SEO metadata",
		],
		roleTeam: [
			"Design studio (brand guide)",
			"Client (copy, photography, press links)",
		],
		resultLead:
			"A brand guide drawn for print became a working bilingual site, with nothing to install, nothing to compile and nothing to go out of date.",
		resultBody:
			"The venture behind it never found its funding, and the company and its domain are both gone now. That was never something a website could decide. What the site itself did was outlive all of it: with no framework and no build, the whole thing still opens and works today exactly as it did in production, straight from a local folder.",
		outroLead:
			"Convinced? Send me a message about your project, constraints included. The awkward ones are usually the interesting part.",
		shotCaptions: ["the section system", "the product catalogue"],
		shotAlts: [
			"Two sections of the cominauv home page meeting on a diagonal cut, dark above and light below, with the product range and its photography underneath.",
			"The cominauv product catalogue: each amethyst grade as a card with size tabs, a photograph, a description and a price table.",
		],
		metaTitle: "cominauv",
		metaDescription:
			"A bilingual site for a French amethyst quarry, hand-built in HTML and CSS from a supplied brand guide, with no framework and no build step.",
	},
};

const FR_COPY: CopyBySlug = {
	"hikari-atlas": {
		tagline:
			"Un atlas du Japon dessiné uniquement avec de la lumière, où chaque image vient de vraies données scientifiques.",
		stinger:
			"Dix sujets, du mont Fuji au pays de nuit, chacun dans sa propre couleur de lumière. Chaque chapitre anime ses données en direct, explique comment il a été dessiné, et se termine par des fonds d'écran gratuits.",
		goal: [
			"Sur un écran OLED, un pixel noir n'est pas sombre, il est éteint. Hikari Atlas part de cette idée : le Japon dessiné uniquement avec de la lumière, où tout ce qui n'est pas de la donnée reste éteint. Je voulais prendre le pays où j'ai vécu huit ans et voir tout ce qu'on pouvait en raconter avec de vraies données seules, un sujet à la fois, chacun dans sa propre couleur.",
			"Le Japon s'y prête particulièrement bien. Il tremble, entre en éruption, déborde et fleurit selon un calendrier, et ses agences publient tout. Chaque chapitre en montre une autre facette : les séismes tracent les frontières des plaques sans une seule ligne de côte, les rivières dessinent les îles d'elles-mêmes, les fronts des cerisiers et des érables les traversent au fil des saisons, et les chemins de fer et les lumières de la nuit montrent où vivent les gens.",
			"L'autre objectif était celui de The Obsidian Table, poussé plus loin : voir jusqu'où je pouvais aller en dirigeant un agent IA sur quelque chose que je n'aurais pas pu construire seul, dans des domaines que je ne connaissais pas. Sismologie, hydrologie, simulation de tsunami et phénologie n'étaient pas sur mon CV, et je voulais comprendre comment chaque image était faite, pas seulement la posséder.",
		],
		role: [
			"Celui-ci, je l'ai dirigé plutôt qu'écrit. Claude Code a écrit l'essentiel du code, le site Vue comme le pipeline Python derrière les images. Ce que le projet devait être, à quoi il devait ressembler et si chaque image disait vrai, c'étaient mes décisions.",
			"Le concept, le périmètre et la direction artistique : dix chapitres, un sujet chacun, chacun avec sa propre couleur de lumière, et une page d'accueil construite comme un tableau des départs de gare, où chaque ligne reconstruit les mêmes 36 000 points de lumière en la scène de son chapitre. Choisir quels jeux de données méritaient un chapitre, et lesquels non, a été l'essentiel du travail éditorial.",
			"Le reste, c'était vérifier. Chaque chiffre du site est calculé à partir des données, et un nombre qui ne sort pas d'un jeu de données ne va pas sur la page. Les erreurs qui valaient la peine d'être attrapées étaient les discrètes : le Fuji en 3D a été 3,2 fois trop pentu pendant un moment, et avait l'air parfaitement correct. Les approximations restent, mais elles sont annoncées, comme la source simplifiée du tsunami de 2011 ou la profondeur doublée des plaques en 3D.",
			"Tout le site existe en anglais et en japonais, une langue à la fois. Les animations se mettent en pause hors écran, respectent la réduction des animations et basculent sur des images fixes sans WebGL, et chaque fond d'écran existe en version bureau (3840×2160) et téléphone (1290×2796).",
			"Il tourne sur le même serveur que ce portfolio et The Obsidian Table : un build statique servi par nginx dans Docker, derrière le Traefik déjà en place, sans base de données ni secrets. J'ai aussi fixé les licences : non commerciale pour le code, CC BY-NC pour les images, et chaque fournisseur de données crédité selon ses propres conditions.",
		],
		roleOwned: [
			"Concept, périmètre et les dix chapitres",
			"Direction artistique et système visuel",
			"Page d'accueil en tableau des départs animé",
			"Choix des données (USGS, JMA, NOAA, NASA, Smithsonian, HydroSHEDS)",
			"Revue de chaque rendu et de chaque chiffre",
			"Site bilingue (EN / JP)",
			"Déploiement sur mon propre serveur (Docker, nginx, Traefik)",
			"Licences et crédits des données",
		],
		roleTeam: [
			"Claude Code (site Vue et pipeline de rendu Python)",
		],
		resultLead:
			"Le Japon dessiné en dix chapitres de lumière, en ligne sur hikari-atlas.com, avec 45 fonds d'écran que tout le monde peut télécharger gratuitement.",
		resultBody:
			"Du mont Fuji au Japon de nuit, chaque chapitre a son animation en direct, sa galerie et une section qui explique comment il a été fait et à partir de quelles sources. Quatre-vingt-dix fichiers PNG, bureau et téléphone, chaque pixel non éclairé exactement #000000. Il montre aussi comment je travaille avec l'IA : l'agent écrit le code vite, et le plus difficile, savoir si le résultat est juste, reste mon travail.",
		outroLead:
			"Ça vous parle ? Écrivez-moi au sujet de votre projet, surtout s'il part de données que personne n'a encore rendues lisibles.",
		shotCaptions: [
			"le chapitre séismes, en direct",
			"un fond d'écran et ses téléchargements",
		],
		shotAlts: [
			"Le chapitre Séismes de Hikari Atlas : le tableau des chapitres à gauche, une animation des séismes depuis 1973 qui trace les frontières des plaques du Japon, et les chiffres du chapitre en dessous.",
			"Le fond d'écran Rivières sur Hikari Atlas : chaque tronçon de rivière du Japon éclairé selon son débit, en versions bureau et téléphone à côté des boutons de téléchargement.",
		],
		metaTitle:
			"Hikari Atlas",
		metaDescription:
			"Le Japon dessiné uniquement avec de la lumière à partir de vraies données scientifiques, en dix chapitres et 45 fonds d'écran OLED gratuits, dirigé par moi et construit avec Claude Code.",
	},
	"the-obsidian-table": {
		tagline:
			"Un site de critiques de restaurants que j'ai conçu, construit et que j'écris encore, et la raison pour laquelle j'ai mon propre serveur.",
		stinger:
			"Ça a commencé comme une blague entre amis. Ça a fini en machine depuis laquelle ce portfolio est servi.",
		goal: [
			"Mes amis me trouvaient difficile. Ce sur quoi je suis difficile, c'est que l'ensemble soit juste : de bons produits, bien cuisinés, avec ou sans étoile à la porte. Au fil des années, la blague est devenue un vrai système de notation, puis il a fallu un endroit où le mettre.",
			"Il y avait deux choses que je voulais travailler dessus. Vue d'abord : je fais du React et du Next.js, je n'avais jamais rien mis en production en Vue, et lire sur un framework n'a rien à voir avec vivre deux mois avec ses partis pris. Ensuite, construire aux côtés d'un agent IA. Toutes les équipes se demandent en ce moment jusqu'où on peut lui faire confiance, et je voulais un vrai projet pour m'en faire une idée, pas une démo.",
			"Et il fallait que ce soit réellement en ligne, donc un serveur. C'est la partie qui a eu la plus longue traîne.",
		],
		role: [
			"Tout ici est une décision que j'ai prise, y compris celles qui portent sur ce que je n'ai pas écrit moi-même.",
			"Le design est de moi, et environ soixante-dix pour cent du front-end aussi, écrits à la main en Vue et TypeScript. La réflexion produit également : quatre notes distinctes plutôt qu'une seule, parce qu'un chiffre unique ne décrit jamais correctement un repas, et une critique découpée selon les mêmes quatre axes pour qu'une note basse dise toujours d'où elle vient.",
			"Le schéma de base de données et l'API, je les ai construits en dirigeant Claude Code, volontairement. L'intéressant n'était pas la génération, c'était tout ce qui vient après : lire du code qu'on n'a pas écrit mais qu'on assume, décider où il a tort, et rester responsable de quelque chose qui doit continuer à tourner. C'est une compétence différente de celle d'écrire soi-même, et c'est celle qui vaut le coup aujourd'hui.",
			"C'est la mise en ligne qui m'a poussé à louer un serveur, et j'ai monté la machine à partir de rien : Linux, dépendances, comptes utilisateurs, accès SSH, récupération et installation du dépôt, puis le domaine et le DNS via Cloudflare, et Docker derrière Traefik avec certificats automatiques. Cette machine sert aussi ce portfolio.",
			"Côté administration, c'est une connexion avec un second facteur TOTP et une limitation de débit sur les deux étapes, et les photos sont redimensionnées dans le navigateur avant même d'être envoyées.",
		],
		roleOwned: [
			"Concept produit et système de notation à quatre axes",
			"Design visuel, de bout en bout",
			"Front-end en Vue 3 et TypeScript (~70% écrit à la main)",
			"Base de données et API, en dirigeant Claude Code",
			"Panneau d'administration : connexion, 2FA TOTP, rate limiting",
			"Pipeline d'images, redimensionnées côté navigateur",
			"Serveur Linux : utilisateurs, SSH, dépendances, déploiement",
			"Domaine et DNS (Cloudflare), Docker, Traefik, TLS",
			"Toutes les critiques du site",
		],
		roleTeam: ["Claude Code (base de données et API)"],
		resultLead:
			"Une blague entre amis est devenue un produit en ligne, sur un serveur que j'ai monté moi-même et depuis lequel tourne ce portfolio.",
		resultBody:
			"Il est en ligne depuis juillet 2026 : un front-end Vue que j'ai conçu et écrit en grande partie, une API et une base de données construites en dirigeant un agent IA, et une infrastructure montée depuis une machine Linux vide jusqu'aux certificats TLS. Deux choses que je n'avais jamais faites, un framework et une manière de travailler, apprises sur quelque chose d'assez réel pour devoir rester en ligne. Les critiques, elles, restent à écrire de ma main.",
		outroLead:
			"Ça vous parle ? Écrivez-moi au sujet de votre projet. J'ai un faible pour ceux qui démarrent comme une idée que personne n'a encore cadrée.",
		shotCaptions: ["une critique", "le détail de la g-scale"],
		shotAlts: [
			"Une critique de restaurant sur The Obsidian Table : le nom en japonais, une note sur dix, un carrousel de photos et l'impression écrite.",
			"Le détail de la G-Scale : qualité, ambiance, prix et service notés chacun sur sa propre barre segmentée, à côté de l'adresse et du niveau de prix.",
		],
		metaTitle: "The Obsidian Table",
		metaDescription:
			"Un site de critiques de restaurants en Vue et Express : mon design et mon frontend, une API construite en dirigeant Claude Code, et le serveur qui héberge aujourd'hui ce portfolio.",
	},
	ax3: {
		tagline:
			"Une plateforme SaaS qui transforme la recherche en neurosciences en décisions marketing.",
		stinger:
			"Aujourd'hui exploitée sous licence par un grand cabinet de conseil international, qui en livre les résultats à ses propres clients.",
		goal: [
			"La science qui explique pourquoi les gens achètent réellement est enfouie dans une littérature académique à laquelle presque personne n'a accès en dehors d'une équipe de recherche, et encore moins les moyens de l'exploiter. Le premier défi n'avait rien à voir avec le logiciel : l'équipe a dépouillé des centaines d'articles de recherche pour en extraire les calculs qui transforment une série de réponses en un profil de personnalité fiable.",
			"À partir de ces profils, ax3 regroupe une audience en clusters selon la personnalité, met en évidence les traits psychologiques propres à chaque groupe, et montre à la marque lesquels de ces traits peuvent déclencher l'action. C'est là le produit : pas un outil de sondage, mais un moyen de comprendre à qui l'on s'adresse et ce qui le fait réellement bouger.",
			"Le second défi était de rendre tout cela lisible. Un résultat psychométrique est dense et facile à mal interpréter, et une équipe marketing qui agit sur un cluster mal compris fait de vrais dégâts. Des années d'itérations y sont passées, et pas seulement sur l'interface : le plus dur a été de trouver comment présenter la donnée psychométrique pour que les clients lisent correctement leurs clusters et s'en servent avec confiance.",
			"Mon objectif était de tout comprendre suffisamment bien pour construire la plateforme autour, et de faire le pont entre trois équipes qui ne parlaient pas naturellement la même langue : data science, psycom (psychologie et communication) et marketing. Le tout en traitant des données personnelles sensibles de manière responsable.",
		],
		role: [
			"J'ai mené ax3 du premier prototype à la production et j'en ai été le seul moteur pendant huit ans : six ans en solo, puis deux ans avec un développeur junior que j'ai encadré. La recherche en neurosciences et en psychométrie venait de l'équipe scientifique de Manzanita. Tout ce qui l'a transformée en produit était de mon ressort.",
			"L'essentiel de mes journées se passait à coder, mais ce qui rendait le produit possible se jouait entre les équipes. Il me fallait comprendre assez de data science, de psycom et de marketing pour pouvoir challenger chacune, puis transformer le résultat en quelque chose qu'un logiciel puisse réellement faire. La justesse psychométrique n'était pas optionnelle : une belle interface posée sur un calcul faux est pire que pas de produit du tout.",
			"Dans une équipe de cette taille, le design et l'ingénierie étaient un seul et même métier : le design system et le front-end qui l'implémentait ont donc été construits ensemble. J'ai conçu l'ensemble du produit sur Figma, des chartes graphiques et du système de composants jusqu'aux prototypes, et j'ai refondu de nombreuses fois la manière dont les résultats sont présentés, à mesure que nous découvrions où les clients se trompaient de lecture. J'ai travaillé directement avec l'équipe neurosciences pour comprendre ce que signifiait chaque métrique avant de décider comment l'afficher.",
			"Côté ingénierie, j'ai porté l'architecture de bout en bout : le back-end Django et PostgreSQL, le modèle de données derrière les évaluations et les clusters, le front-end Next.js et TypeScript, et toutes les intégrations dont dépend la plateforme, dont Stripe pour les paiements, AWS S3 pour les données sensibles, et OpenAI et Imagen pour la génération de contenu.",
			"J'ai géré l'infrastructure moi-même : un serveur Linux avec NGINX, les DNS et les certificats SSL de plusieurs domaines via Cloudflare, et S3 pour les données personnelles que la plateforme héberge. Ces données étant sensibles, la sécurité faisait partie du produit plutôt que d'une réflexion après coup : sécurité applicative, mais aussi la politique de sécurité de l'information et le plan de reprise d'activité de l'entreprise.",
			"Le reste, c'était l'humain. J'ai porté la roadmap et le périmètre des versions dans Jira, encadré un développeur junior ainsi qu'une série de stagiaires design et développement, et je me suis assis moi-même en face des clients pour leur expliquer le fonctionnement de la plateforme et comprendre ce dont ils avaient réellement besoin.",
		],
		roleOwned: [
			"Roadmap produit et périmètre des versions (Jira)",
			"Design UX/UI, design system, prototypage (Figma)",
			"Traduction des résultats psychométriques en logique produit",
			"Architecture front-end (Next.js, TypeScript)",
			"Architecture back-end et base de données (Django, PostgreSQL)",
			"Modèle de données des évaluations et des clusters",
			"Intégrations tierces (Stripe, AWS S3, OpenAI, Imagen)",
			"Serveur Linux, NGINX, DNS et SSL",
			"Traitement des données sensibles et sécurité applicative",
			"Politiques de sécurité (PSI, PRA)",
			"Encadrement : 1 développeur junior, stagiaires design et dev",
			"Échanges techniques avec les clients",
		],
		roleTeam: [
			"Équipe neurosciences",
			"Équipe data science",
			"1 développeur junior (2 dernières années)",
			"Stagiaires design et développement",
			"Direction de l'entreprise",
		],
		resultLead:
			"Une recherche que seuls des spécialistes pouvaient lire est devenue un produit qu'un cabinet de conseil d'envergure internationale présente aujourd'hui à ses propres clients.",
		resultBody:
			"Huit ans, de nombreuses itérations de design, et une constante : rendre la donnée psychométrique lisible sans la trahir. Ce qui a commencé comme un prototype Django est devenu un SaaS en production sur sa propre infrastructure, utilisé pour des marques en anglais et en japonais : environ 200 000 profils utilisateurs traités sur plus de 95 traits psychologiques, 25 analyses clients, et une seule panne en cinq ans de production.",
		outroLead:
			"Ça vous parle ? Écrivez-moi au sujet de votre projet et on verra ensemble comment je peux aider.",
		outroPartner:
			"Des questions sur ax3 lui-même, ou un partenariat autour de la plateforme ? Écrivez-moi, ou allez directement à la source :",
		shotCaptions: ["analyse d'un projet", "brief généré"],
		shotAlts: [
			"L'onglet analytique d'un projet ax3 : personnes et publications analysées, les termes sources qui ont suscité le plus d'engagement, la répartition de l'audience en quatre clusters et le sentiment par terme.",
			"Un brief de communication dans ax3 : les clusters qu'un trait touche, qui sont ces personnes, comment les faire réagir, et trois exemples d'annonces générés.",
		],
		metaTitle: "ax3",
		metaDescription:
			"Une plateforme SaaS entre neurosciences et marketing, menée du prototype à la production pendant huit ans.",
	},
	manzanita: {
		tagline:
			"Le site public de Manzanita, reconstruit en anglais et en japonais, et le premier projet que j'ai confié de bout en bout.",
		stinger:
			"Le développeur qui l'a construit est passé des fonctionnalités dans ax3 à un site entier mené de la première maquette à la mise en production.",
		goal: [
			"L'ancien site de Manzanita ne représentait plus l'entreprise. La refonte avait une mission : expliquer le marketing Gen3 à quelqu'un qui n'en a jamais entendu parler, assez clairement pour qu'il écrive à la fin. La compréhension d'abord, les demandes ensuite.",
			"Elle avait un second objectif qui n'avait rien à voir avec le site. Jusque-là, le développeur junior de mon équipe n'avait construit que des fonctionnalités dans ax3, toujours à l'intérieur d'une architecture déjà décidée par quelqu'un d'autre. Il lui fallait un projet à mener de bout en bout, de la première maquette au service qui tourne sur le serveur. Un site vitrine avait la bonne taille pour ça : de vrais enjeux et une vraie échéance, mais un périmètre qu'il pouvait tenir en tête.",
			"L'anglais et le japonais ont été la vraie difficulté. Le site est une longue page de copie marketing, et le japonais n'a ni la même longueur ni la même densité que l'anglais. Chaque section devait tenir dans les deux, le genre de contrainte qu'on n'apprend qu'en s'y heurtant.",
		],
		role: [
			"Je n'ai pas écrit l'essentiel de ce site. C'était justement le but, et mon travail était de faire en sorte qu'il sorte bien quand même.",
			"Nous l'avons conçu à deux. Il récupérait les textes de l'équipe marketing et nous reprenions ensemble ce que chaque section devait dire, et dans quel ordre, avant que quoi que ce soit ne devienne une page. Je relisais la structure : ce qui doit se trouver en haut, quelle section suit laquelle, où le raisonnement perd le lecteur. Puis les détails : la cohérence des espacements d'une section à l'autre, les problèmes d'accessibilité qu'il n'avait pas encore rencontrés, et les mises en page qui fonctionnent en anglais et s'effondrent en japonais.",
			"Les retours se faisaient par tours. Les miens d'abord, puis ceux de toute l'entreprise : le marketing sur le message, tout le monde sur la question de savoir si le site remplissait bien sa mission. Il corrigeait en réponse à ces retours plutôt qu'à mon avis, ce qui est une chose différente et plus utile à apprendre.",
			"Là où j'ai vraiment mis les mains, c'est le déploiement, parce qu'il n'en avait jamais fait. Nous l'avons traversé ensemble : une branche de release dans le dépôt, puis le serveur Linux, pull, installation, un environnement virtuel Python pour le petit service Django derrière le formulaire de contact, un service pour l'application Next.js, et NGINX devant les deux. Il conduisait, j'expliquais pourquoi chaque étape existait.",
			"Depuis la mise en ligne, c'est de la maintenance plutôt que du développement : le garder en ligne, et surveiller les dépendances.",
		],
		roleOwned: [
			"Structure, hiérarchie et ordre des sections",
			"Direction artistique, à deux",
			"Revue de design : espacements, cohérence, accessibilité",
			"Revue de code",
			"Revue des mises en page bilingues (EN / JP)",
			"Serveur Linux, mise en service, NGINX",
			"Premier déploiement, fait ensemble",
			"Encadrement et tours de relecture",
		],
		roleTeam: [
			"Développeur junior (réalisation)",
			"Équipe marketing (textes)",
			"Relecture par toute l'entreprise",
		],
		resultLead:
			"Un développeur qui n'avait construit que des fonctionnalités dans ax3 a mené un site entier de la première maquette au service en production.",
		resultBody:
			"Le site est en ligne en anglais et en japonais depuis 2023, et c'est ce vers quoi Manzanita oriente ses prospects : une page qui explique le Gen3 en partant de zéro et se termine par un formulaire de contact, et il génère les demandes pour lesquelles il a été construit. Depuis, il a demandé de la maintenance, pas du développement.",
		outroLead:
			"Ça vous parle ? Écrivez-moi au sujet de votre projet, que vous cherchiez quelqu'un pour le construire ou pour vous assurer qu'il soit bien construit.",
		shotCaptions: ["l'étude de cas gen3, en anglais", "la même section, en japonais"],
		shotAlts: [
			"La section étude de cas Gen3 du site de Manzanita en anglais : une chaîne de fitness nationale, un CTR multiplié par 5 sur 3,3 millions d'impressions.",
			"La même section en japonais, la mise en page tenant face à une longueur et une densité de texte différentes.",
		],
		metaTitle: "Manzanita",
		metaDescription:
			"Le site bilingue de Manzanita, reconstruit en Next.js par le développeur junior que j'ai accompagné sur son premier projet mené de bout en bout.",
	},
	cominauv: {
		tagline:
			"Un site bilingue de cinq pages pour une carrière d'améthyste, construit à la main à partir d'une charte graphique pensée pour le papier.",
		stinger:
			"Aucune dépendance à mettre à jour, aucun build à relancer, aucun framework à quitter. Rien là-dedans ne peut se périmer.",
		goal: [
			"Un studio de design avait déjà produit la charte graphique : une police de titrage, un accent vert, des coupes de sections en diagonale et un logo cristal géométrique. Mon travail était d'en faire un site qui fonctionne, sans designer à qui la renvoyer et sans rien changer à ce qu'ils avaient décidé.",
			"Le client avait posé une contrainte ferme : le moins de JavaScript possible. Il n'y a donc aucun framework, aucune étape de build et pas un seul fichier .js sur le site. La logique qui existe tient dans quelques blocs en ligne : un menu mobile, un sélecteur de calibre sur les fiches produits, l'année du copyright.",
			"Le site devait porter un vrai travail commercial. Six sections expliquent la carrière, les produits et les visites, en français, avec la page d'accueil et la page visites également en anglais, et se terminent sur une page qui vise directement les investisseurs.",
		],
		role: [
			"Toute la partie web était à moi : la mise en page complète, chaque page, les deux langues, le tout écrit à la main.",
			"Le plus intéressant a été de traduire une charte pensée pour le papier en quelque chose qui se comporte. Des bords de sections en diagonale qui tiennent à toutes les largeurs, une police de titrage qui reste lisible jusqu'au téléphone, une palette qui alterne clair et sombre section par section sans virer au bruit, et un catalogue produits avec calibres et grilles tarifaires qui devait avoir l'air dessiné plutôt que tabulé.",
			"Travailler sans framework change ce sur quoi on passe son temps. Il n'y a pas de composant vers lequel se tourner, donc la cohérence vient de la feuille de style et de la discipline, et chaque page est écrite en entier. En échange, plus rien ne s'interpose entre le visiteur et la page.",
			"Aucune IA n'a été utilisée, à aucun moment. Le client n'en voulait pas, et c'était à lui d'en décider.",
		],
		roleOwned: [
			"Tout le design web à partir de la charte fournie",
			"Chaque page, HTML et CSS écrits à la main",
			"Mise en page responsive, sections diagonales comprises",
			"Catalogue produits : calibres, grilles tarifaires",
			"Pages bilingues (FR / EN)",
			"Favicons, manifest, sitemap, métadonnées SEO",
		],
		roleTeam: [
			"Studio de design (charte graphique)",
			"Client (textes, photographies, revue de presse)",
		],
		resultLead:
			"Une charte graphique pensée pour le papier est devenue un site bilingue qui fonctionne, sans rien à installer, rien à compiler et rien qui se périme.",
		resultBody:
			"Le projet derrière n'a jamais trouvé son financement, et l'entreprise comme son domaine ont disparu depuis. Ce n'était pas à un site web d'en décider. Ce que le site a fait, lui, c'est leur survivre : sans framework ni build, l'ensemble s'ouvre et fonctionne encore aujourd'hui exactement comme en production, directement depuis un dossier local.",
		outroLead:
			"Ça vous parle ? Écrivez-moi au sujet de votre projet, contraintes comprises. Ce sont souvent elles, le plus intéressant.",
		shotCaptions: ["le système de sections", "le catalogue produits"],
		shotAlts: [
			"Deux sections de la page d'accueil de cominauv se rejoignant sur une coupe en diagonale, sombre en haut et claire en bas, avec la gamme de produits et ses photographies en dessous.",
			"Le catalogue produits de cominauv : chaque qualité d'améthyste en fiche, avec calibres, photographie, description et grille tarifaire.",
		],
		metaTitle: "cominauv",
		metaDescription:
			"Un site bilingue pour une carrière d'améthyste française, construit à la main en HTML et CSS à partir d'une charte fournie, sans framework ni build.",
	},
};

export const PROJECT_COPY: Record<Locale, CopyBySlug> = {
	en: EN_COPY,
	fr: FR_COPY,
};

// Shared chrome for every detail page.
export interface ProjectUi {
	back: string;
	visitSite: string;
	repo: string;
	offline: string;
	goalHeading: string;
	roleHeading: string;
	buildHeading: string;
	resultHeading: string;
	outroHeading: string;
	owned: string;
	workedWith: string;
	clients: string;
	expand: string;
	collapse: string;
	shotPending: string;
	prev: string;
	next: string;
}

export const PROJECT_UI: Record<Locale, ProjectUi> = {
	en: {
		back: "back to projects",
		visitSite: "visit site",
		repo: "repo",
		offline: "site offline",
		goalHeading: "> the_goal",
		roleHeading: "> my_role",
		buildHeading: "> the_build",
		resultHeading: "> the_result",
		outroHeading: "> what_next",
		owned: "OWNED",
		workedWith: "WORKED WITH",
		clients: "PARTNERS",
		expand: "> read_more",
		collapse: "> show_less",
		shotPending: "screenshot pending",
		prev: "prev",
		next: "next",
	},
	fr: {
		back: "retour aux projets",
		visitSite: "voir le site",
		repo: "dépôt",
		offline: "site hors ligne",
		goalHeading: "> l_objectif",
		roleHeading: "> mon_role",
		buildHeading: "> la_stack",
		resultHeading: "> le_resultat",
		outroHeading: "> la_suite",
		owned: "PRIS EN CHARGE",
		workedWith: "EN COLLABORATION AVEC",
		clients: "PARTENAIRES",
		expand: "> lire_la_suite",
		collapse: "> reduire",
		shotPending: "capture à venir",
		prev: "précédent",
		next: "suivant",
	},
};

export function getProject(slug: string): ProjectMeta | undefined {
	return PROJECTS.find((project) => project.slug === slug);
}

export function getProjectCopy(
	slug: string,
	locale: Locale,
): ProjectCopy | undefined {
	return PROJECT_COPY[locale][slug];
}

// A card only links to a detail page once that page has content to show.
export function hasCaseStudy(slug: string): boolean {
	return Boolean(getProject(slug) && PROJECT_COPY.en[slug] && PROJECT_COPY.fr[slug]);
}

/** Previous/next detail pages, for the footer pager. Wraps around. */
export function adjacentProjects(slug: string): {
	prev?: ProjectMeta;
	next?: ProjectMeta;
} {
	const withPages = PROJECTS.filter((project) => hasCaseStudy(project.slug));
	if (withPages.length < 2) return {};
	const index = withPages.findIndex((project) => project.slug === slug);
	if (index === -1) return {};
	const prev = withPages[(index - 1 + withPages.length) % withPages.length];
	const next = withPages[(index + 1) % withPages.length];
	// With only two case studies the wrap makes both ends the same page:
	// one link, not the same one pointed at twice.
	if (prev === next) return { next };
	return { prev, next };
}
