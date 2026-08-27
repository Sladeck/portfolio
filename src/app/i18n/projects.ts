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
			"Eight years, many design iterations, and one constant: making psychometric data legible without making it wrong. What began as a Django prototype became a production SaaS running on its own infrastructure, serving brand work in English and Japanese.",
		outroLead:
			"Convinced? Send me a message about your own project and we will work out how I can help.",
		outroPartner:
			"Questions about ax3 itself, or a partnership around the platform? Ask me, or go straight to the source:",
		shotCaptions: ["cluster analytics", "generated brief"],
		shotAlts: [
			"The ax3 analytics dashboard: audience totals, cluster distribution, top performers and keyword sentiment.",
			"A generated brief in ax3: a personality trait, the clusters it maps to, its top markers, and example ad copy.",
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
};

const FR_COPY: CopyBySlug = {
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
			"Huit ans, de nombreuses itérations de design, et une constante : rendre la donnée psychométrique lisible sans la trahir. Ce qui a commencé comme un prototype Django est devenu un SaaS en production sur sa propre infrastructure, utilisé pour des marques en anglais et en japonais.",
		outroLead:
			"Ça vous parle ? Écrivez-moi au sujet de votre projet et on verra ensemble comment je peux aider.",
		outroPartner:
			"Des questions sur ax3 lui-même, ou un partenariat autour de la plateforme ? Écrivez-moi, ou allez directement à la source :",
		shotCaptions: ["analyse des clusters", "brief genere"],
		shotAlts: [
			"Le tableau de bord analytique d'ax3 : volumes d'audience, répartition des clusters, top performers et sentiment par mot-clé.",
			"Un brief généré dans ax3 : un trait de personnalité, les clusters correspondants, ses marqueurs principaux et des exemples de copies publicitaires.",
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
