import config from "seo.config";
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
	name: config.applicationName!,
	description: config.description!,
	url: env.NEXT_PUBLIC_APP_URL,
	ogImage: `${env.NEXT_PUBLIC_APP_URL}/opengraph-image.webp`,
	links: {
		github: "https://github.com/sahrohit/pracharya",
		email: "mailto:sahrohit9586@gmail.com",
		support: `${env.NEXT_PUBLIC_APP_URL}/contribute`,
	},
	mailSupport: "sahrohit9586@gmail.com",
};

export default siteConfig;
