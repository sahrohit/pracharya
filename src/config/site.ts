import { env } from "@/env.js";

export type SiteConfig = {
	name: string;
	description: string;
	url: string;
	ogImage: string;
	mailSupport: string;
	links: {
		github: string;
		email: string;
		support: string;
	};
};

const siteConfig: SiteConfig = {
	name: "Pracharya",
	description:
		"Embark on your digital transformation journey with WebTechSubs, where web development meets excellence! 🚀 Discover tailored websites that resonate with your brand and captivate your audience. Our affordable monthly plans, curated for small businesses, offer a spectrum of features to unleash your online potential.",
	url: env.NEXT_PUBLIC_APP_URL,
	ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.webp`,
	links: {
		github: "https://github.com/sahrohit/pracharya",
		email: "mailto:webtechsubs@gmail",
		support: `${env.NEXT_PUBLIC_APP_URL}/contribute`,
	},
	mailSupport: "webtechsubs@gmail.com",
};

export default siteConfig;
