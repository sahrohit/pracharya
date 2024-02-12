import type { Metadata } from "next";
import { env } from "@/env.js";

const config: Metadata = {
	title: "Pracharya: Community of Nepali Aspirants",
	description: "Pracharya: Community of Nepali Aspirants",
	applicationName: "Pracharya",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
	metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
	openGraph: {
		type: "website",
		locale: "en_IE",
		url: env.NEXT_PUBLIC_APP_URL,
		siteName: "Pracharya",
		images: ["/opengraph-image.jpg"],
	},
};

export default config;
