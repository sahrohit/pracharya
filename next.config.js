/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

// @ts-expect-error This pacakge is not being recongized, despite being installed
import nextra from "nextra";
import { withAxiom } from "next-axiom";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

const withNextra = nextra({
	theme: "nextra-theme-docs",
	themeConfig: "./theme.config.tsx",
	latex: true,
	staticImage: true,
});

/** @type {import("next").NextConfig} */
const config = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "utfs.io",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "loremflickr.com",
				pathname: "**",
			},
		],
	},
	async redirects() {
		return [
			{
				source: "/discord",
				destination: "https://discord.gg/Ytp8SSrYm7",
				permanent: true,
			},
		];
	},
};

export default withAxiom(withNextra(config));
