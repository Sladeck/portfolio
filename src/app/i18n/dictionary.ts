export interface MetaDictionary {
	titles: Record<"" | "about" | "projects" | "changelog" | "contact" | "inspiration", string>;
	descriptions: Record<"" | "about" | "projects" | "changelog" | "contact" | "inspiration", string>;
}

export interface LabelValue {
	label: string;
	value: string;
}

export interface Dictionary {
	meta: MetaDictionary;
	nav: {
		role: string;
		cta: string;
		menuOpen: string;
		menuClose: string;
		links: {
			home: string;
			about: string;
			projects: string;
		};
	};
	langSwitch: {
		english: string;
		french: string;
	};
	home: {
		metaNode: string;
		metaAvailable: string;
		subtitle: string;
		tagline: string;
		hireMe: string;
		viewWork: string;
		toolsetTitle: string;
		toolsetBadge: string;
		toolset: LabelValue[];
		languagesTitle: string;
		languagesBadge: string;
		languages: LabelValue[];
		inspirationLinkLabel: string;
	};
	about: {
		paragraphs: string[];
		toolbeltTitle: string;
		adjacentFieldsTitle: string;
		adjacentFields: string[];
		outsideWorkTitle: string;
		hobbies: string[];
	};
	projects: {
		changelogLink: string;
		repoLabel: string;
		offlineLabel: string;
		/** Card link to a case study. The "> " prompt in front of it is
		    markup, not part of the string. */
		readMore: string;
		badges: {
			personal: string;
			platform: string;
			companySite: string;
			clientWork: string;
		};
		descriptions: {
			obsidian: string;
			ax3: string;
			manzanita: string;
			cominauv: string;
		};
	};
	contact: {
		heading: string;
		intro: string;
		fromLabel: string;
		fromPlaceholder: string;
		replyToLabel: string;
		replyToPlaceholder: string;
		bodyLabel: string;
		bodyPlaceholder: string;
		submit: string;
		statusSending: string;
		statusSent: string;
		statusError: string;
		/** Rate-limited. The address is appended by the component. */
		statusLimited: string;
		directLabel: string;
		channelsLabel: string;
	};
	inspiration: {
		heading: string;
		paragraphs: string[];
		captions: {
			terminal: string;
			warhammer: string;
			oldTv: string;
		};
		alts: {
			terminal: string;
			warhammer: string;
			oldTv: string;
		};
	};
	changelog: {
		introPrefix: string;
		introSuffix: string;
		errorState: string;
		loadingState: string;
		emptyState: string;
		commitTag: string;
	};
}

const SITE_NAME = "Moulin Guillaume";

const en: Dictionary = {
	meta: {
		titles: {
			"": `${SITE_NAME} · Freelance Full-Stack Engineer`,
			about: `About · ${SITE_NAME}`,
			projects: `Projects · ${SITE_NAME}`,
			changelog: `Changelog · ${SITE_NAME}`,
			contact: `Contact · ${SITE_NAME}`,
			inspiration: `Inspiration · ${SITE_NAME}`,
		},
		descriptions: {
			"": "Freelance full-stack engineer based in France. Django, React and Next.js, eight years of shipping product end to end.",
			about: "Background, toolbelt, and adjacent fields.",
			projects: "A selection of projects, including ax3.io, Manzanita, and The Obsidian Table.",
			changelog: "Latest public commits from github.com/Sladeck.",
			contact: "Get in touch about freelance work.",
			inspiration: "The references behind this site's terminal look.",
		},
	},
	nav: {
		role: "/ full-stack engineer",
		cta: "> initiate_contact",
		menuOpen: "MENU",
		menuClose: "CLOSE",
		links: {
			home: "~/home",
			about: "~/about",
			projects: "~/projects",
		},
	},
	langSwitch: {
		english: "EN",
		french: "FR",
	},
	home: {
		metaNode: "NODE: REMOTE · STATUS:",
		metaAvailable: "AVAILABLE",
		subtitle: "Freelance full-stack engineer",
		tagline:
			"Based in France with 8 years of international experience. I take product from a blank page to a live release, start to finish.",
		hireMe: "> hire_me",
		viewWork: "> view_work",
		toolsetTitle: "TOOLSET",
		toolsetBadge: "8 YRS",
		toolset: [
			{ label: "LANGUAGES", value: "Python · JavaScript" },
			{ label: "FRAMEWORKS", value: "Django · DRF · React · Next.js" },
			{ label: "INFRASTRUCTURE", value: "AWS · Cloudflare · Sentry · Linux" },
			{ label: "AI INTEGRATION", value: "ChatGPT API · Google Imagen" },
			{ label: "DESIGN", value: "UX/UI · Figma" },
			{ label: "LEADERSHIP", value: "Team Lead · Mentoring" },
			{ label: "IT / ADMIN", value: "Google Workspace · Security Training" },
		],
		languagesTitle: "LANGUAGES",
		languagesBadge: "3",
		languages: [
			{ label: "FRENCH", value: "Native" },
			{ label: "ENGLISH", value: "Professional" },
			{ label: "JAPANESE", value: "Intermediate" },
		],
		inspirationLinkLabel: "Where the design came from",
	},
	about: {
		paragraphs: [
			"At the end of my third year of a Bachelor's in Paris, I moved to Japan alone, left family and friends behind, and joined a small startup called Manzanita to build ax3.io: a SaaS platform mixing real neuroscience research with marketing. I stayed eight years.",
			"I started as an intern, became the sole full-time developer with a junior's title and a lead's responsibilities, then grew into a platform engineer leading a small team. Whatever needed doing, I was the only one who could do it: turning ideas into design into working software, running the office's IT, mentoring junior developers and designers, acting as security officer, writing documentation and privacy policies, and sitting in front of clients to explain the tech myself.",
			"The result: our tech is now used by a major international consulting company.",
			"All of it in a foreign country, a foreign culture, a foreign language. That's why new challenges don't worry me. Whatever needs to be done gets done. Now I'm back in France, freelance, and looking for new challenges and new people to build with.",
		],
		toolbeltTitle: "TOOLBELT",
		adjacentFieldsTitle: "ADJACENT FIELDS",
		adjacentFields: [
			"NEUROSCIENCE",
			"PSYCHOLOGY",
			"MARKETING",
			"DATA SCIENCE",
			"MENTORING",
			"PRIVACY & SECURITY",
			"PROJECT MANAGEMENT",
			"TEAM MANAGEMENT",
			"TEACHING",
		],
		outsideWorkTitle: "OUTSIDE WORK",
		hobbies: [
			"MOVIES",
			"FANTASY",
			"SCI-FI",
			"NATURE",
			"PRIVACY & SECURITY",
			"GAMING",
			"METAL/ROCK",
			"HIKING",
			"FOOD & CUISINE",
		],
	},
	projects: {
		changelogLink: "> See latest changelogs...",
		repoLabel: "repo",
		offlineLabel: "OFFLINE",
		readMore: "read_case_study",
		badges: {
			personal: "PERSONAL",
			platform: "PLATFORM",
			companySite: "COMPANY SITE",
			clientWork: "CLIENT WORK",
		},
		descriptions: {
			obsidian:
				"My own food blog, reviewing restaurants I love around the world. Design and frontend by me, backend built with Claude.",
			ax3: "SaaS platform blending marketing with real neuroscience research. I owned product, design, and engineering at Manzanita for eight years. Login-gated, so the link only shows the front door.",
			manzanita:
				"Public website for Manzanita, my previous company in Tokyo. We built ax3's technology together.",
			cominauv:
				"Website for a startup that bought an amethyst quarry. Plain HTML/CSS by client request, no framework.",
		},
	},
	contact: {
		heading: "> initiate_contact",
		intro:
			"Freelance and currently available for new projects. Tell me what's broken or what needs building, I'll get back to you as soon as possible.",
		fromLabel: "--from",
		fromPlaceholder: "name & company",
		replyToLabel: "--reply-to",
		replyToPlaceholder: "your@email.com",
		bodyLabel: "--body",
		bodyPlaceholder: "scope, timeline, budget range",
		submit: "> send --now",
		statusSending: "sending...",
		statusSent: "sent, I'll get back to you soon",
		statusError: "failed to send, email me directly instead",
		statusLimited: "too many attempts, email me directly at",
		directLabel: "DIRECT",
		channelsLabel: "CHANNELS",
	},
	inspiration: {
		heading: "> inspiration",
		paragraphs: [
			"This portfolio draws its look from three things: the computer terminals I work in every day, Warhammer 40k, one of my favorite fantasy universes, and old cathode-ray TVs, with their scanlines and that faint green sweep rolling down the screen.",
			"I wanted to push the effects and animations further, but pulled back. This is still a page professionals will look at, and I didn't want anyone waiting on an animation or getting annoyed by one.",
			"I hope you enjoy the result as much as I do. And if it's not your taste, don't worry, I can do plenty of more conventional work too.",
		],
		captions: {
			terminal: "TERMINAL",
			warhammer: "WARHAMMER 40K",
			oldTv: "CATHODE-RAY TV",
		},
		alts: {
			terminal: "A computer terminal",
			warhammer: "Warhammer 40k artwork",
			oldTv: "An old cathode-ray TV",
		},
	},
	changelog: {
		introPrefix: "Live from",
		introSuffix: ": latest 20 commits.",
		errorState: "Could not reach GitHub right now.",
		loadingState: "Fetching activity…",
		emptyState: "No recent public commits found.",
		commitTag: "COMMIT",
	},
};

const fr: Dictionary = {
	meta: {
		titles: {
			"": `${SITE_NAME} · Ingénieur Full-Stack Freelance`,
			about: `À propos · ${SITE_NAME}`,
			projects: `Projets · ${SITE_NAME}`,
			changelog: `Changelog · ${SITE_NAME}`,
			contact: `Contact · ${SITE_NAME}`,
			inspiration: `Inspiration · ${SITE_NAME}`,
		},
		descriptions: {
			"": "Ingénieur full-stack freelance basé en France. Django, React et Next.js, huit ans à livrer des produits de bout en bout.",
			about: "Parcours, boîte à outils, et domaines connexes.",
			projects: "Une sélection de projets, dont ax3.io, Manzanita, et The Obsidian Table.",
			changelog: "Derniers commits publics depuis github.com/Sladeck.",
			contact: "Contactez-moi pour une mission freelance.",
			inspiration: "Les références derrière le style terminal de ce site.",
		},
	},
	nav: {
		role: "/ ingénieur full-stack",
		cta: "> initier_contact",
		menuOpen: "MENU",
		menuClose: "FERMER",
		links: {
			home: "~/home",
			about: "~/à-propos",
			projects: "~/projets",
		},
	},
	langSwitch: {
		english: "EN",
		french: "FR",
	},
	home: {
		metaNode: "NODE: DISTANT · STATUT:",
		metaAvailable: "DISPONIBLE",
		subtitle: "Ingénieur full-stack freelance",
		tagline:
			"Basé en France, avec 8 ans d'expérience internationale. Je prends un produit de la page blanche jusqu'à sa mise en ligne, du début à la fin.",
		hireMe: "> me_recruter",
		viewWork: "> voir_projets",
		toolsetTitle: "OUTILS",
		toolsetBadge: "8 ANS",
		toolset: [
			{ label: "LANGAGES", value: "Python · JavaScript" },
			{ label: "FRAMEWORKS", value: "Django · DRF · React · Next.js" },
			{ label: "INFRASTRUCTURE", value: "AWS · Cloudflare · Sentry · Linux" },
			{ label: "INTÉGRATION IA", value: "ChatGPT API · Google Imagen" },
			{ label: "DESIGN", value: "UX/UI · Figma" },
			{ label: "LEADERSHIP", value: "Lead d'équipe · Mentorat" },
			{ label: "INFORMATIQUE / ADMIN", value: "Google Workspace · Formation sécurité" },
		],
		languagesTitle: "LANGUES",
		languagesBadge: "3",
		languages: [
			{ label: "FRANÇAIS", value: "Natif" },
			{ label: "ANGLAIS", value: "Professionnel" },
			{ label: "JAPONAIS", value: "Intermédiaire" },
		],
		inspirationLinkLabel: "D'où vient ce design",
	},
	about: {
		paragraphs: [
			"À la fin de ma troisième année de licence à Paris, je suis parti seul au Japon, laissant famille et amis derrière moi, pour rejoindre une petite startup appelée Manzanita et construire ax3.io : une plateforme SaaS mêlant recherche en neurosciences et marketing. J'y suis resté huit ans.",
			"J'ai commencé comme stagiaire, suis devenu l'unique développeur à temps plein avec un titre de junior mais des responsabilités de lead, puis j'ai évolué vers un rôle d'ingénieur plateforme à la tête d'une petite équipe. Quoi qu'il faille faire, j'étais le seul à pouvoir le faire : transformer des idées en design puis en logiciel fonctionnel, gérer l'informatique du bureau, encadrer développeurs et designers juniors, agir comme responsable sécurité, rédiger documentation et politiques de confidentialité, et m'asseoir en face des clients pour leur expliquer la technique moi-même.",
			"Résultat : notre technologie est aujourd'hui utilisée par un grand cabinet de conseil international.",
			"Tout cela dans un pays étranger, une culture étrangère, une langue étrangère. C'est pourquoi les nouveaux défis ne m'inquiètent pas. Ce qui doit être fait est fait. Je suis maintenant de retour en France, freelance, à la recherche de nouveaux défis et de nouvelles personnes avec qui construire.",
		],
		toolbeltTitle: "BOÎTE À OUTILS",
		adjacentFieldsTitle: "DOMAINES CONNEXES",
		adjacentFields: [
			"NEUROSCIENCES",
			"PSYCHOLOGIE",
			"MARKETING",
			"SCIENCE DES DONNÉES",
			"MENTORAT",
			"CONFIDENTIALITÉ & SÉCURITÉ",
			"GESTION DE PROJET",
			"GESTION D'ÉQUIPE",
			"ENSEIGNEMENT",
		],
		outsideWorkTitle: "EN DEHORS DU TRAVAIL",
		hobbies: [
			"FILMS",
			"FANTASY",
			"SCIENCE-FICTION",
			"NATURE",
			"CONFIDENTIALITÉ & SÉCURITÉ",
			"JEUX VIDÉO",
			"METAL/ROCK",
			"RANDONNÉE",
			"CUISINE & GASTRONOMIE",
		],
	},
	projects: {
		changelogLink: "> Voir les derniers changelogs...",
		repoLabel: "dépôt",
		offlineLabel: "HORS LIGNE",
		readMore: "lire_l_etude",
		badges: {
			personal: "PERSONNEL",
			platform: "PLATEFORME",
			companySite: "SITE D'ENTREPRISE",
			clientWork: "TRAVAIL CLIENT",
		},
		descriptions: {
			obsidian:
				"Mon propre blog culinaire, où je partage les restaurants que j'aime à travers le monde. Design et frontend par moi, backend construit avec Claude.",
			ax3: "Plateforme SaaS mêlant marketing et recherche en neurosciences. J'ai porté le produit, le design et l'ingénierie chez Manzanita pendant huit ans. L'accès nécessite une connexion, le lien ne montre donc que la page d'accueil.",
			manzanita:
				"Site public de Manzanita, ma précédente entreprise à Tokyo. Nous avons construit la technologie d'ax3 ensemble.",
			cominauv:
				"Site web pour une startup qui a acheté une carrière d'améthyste. HTML/CSS pur à la demande du client, sans framework.",
		},
	},
	contact: {
		heading: "> initier_contact",
		intro:
			"Freelance et actuellement disponible pour de nouveaux projets. Dites-moi ce qui est cassé ou ce qu'il faut construire, je vous répondrai dès que possible.",
		fromLabel: "--de",
		fromPlaceholder: "nom et société",
		replyToLabel: "--reponse-a",
		replyToPlaceholder: "votre@email.com",
		bodyLabel: "--message",
		bodyPlaceholder: "périmètre, délais, budget",
		submit: "> envoyer --maintenant",
		statusSending: "envoi en cours...",
		statusSent: "envoyé, je vous répondrai bientôt",
		statusError: "échec de l'envoi, écrivez-moi directement",
		statusLimited: "trop de tentatives, écrivez-moi directement à",
		directLabel: "DIRECT",
		channelsLabel: "CANAUX",
	},
	inspiration: {
		heading: "> inspiration",
		paragraphs: [
			"Ce portfolio tire son style de trois choses : les terminaux informatiques dans lesquels je travaille chaque jour, Warhammer 40k, l'un de mes univers fantastiques préférés, et les vieilles télés à tube cathodique, avec leurs lignes de balayage et ce léger filet vert qui descend l'écran.",
			"J'ai voulu pousser les effets et les animations plus loin, mais je me suis retenu. Cette page reste quelque chose que des professionnels vont consulter, et je ne voulais pas qu'on attende une animation ou qu'on s'en agace.",
			"J'espère que vous apprécierez le résultat autant que moi. Et si ce n'est pas votre style, pas de souci, je sais aussi faire beaucoup plus conventionnel.",
		],
		captions: {
			terminal: "TERMINAL",
			warhammer: "WARHAMMER 40K",
			oldTv: "TÉLÉ À TUBE CATHODIQUE",
		},
		alts: {
			terminal: "Un terminal informatique",
			warhammer: "Illustration Warhammer 40k",
			oldTv: "Une vieille télé à tube cathodique",
		},
	},
	changelog: {
		introPrefix: "En direct de",
		introSuffix: " : les 20 derniers commits.",
		errorState: "Impossible de joindre GitHub pour le moment.",
		loadingState: "Récupération de l'activité…",
		emptyState: "Aucun commit public récent trouvé.",
		commitTag: "COMMIT",
	},
};

export const dictionaries = { en, fr } as const;
