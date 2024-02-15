import Logo from "@/components/logo";
import { env } from "@/env";

const config = {
	logo: (
		<>
			<Logo className="nx-h-8 nx-w-8" />
			<span style={{ marginLeft: ".4em", fontWeight: 500, fontSize: "1.25em" }}>
				Pracharya Study
			</span>
		</>
	),

	project: {
		link: "https://github.com/sahrohit/pracharya",
	},
	docsRepositoryBase: `${env.NEXT_PUBLIC_APP_URL}/contribute?tab=notes&path=`,
	sidebar: {
		defaultMenuCollapseLevel: 2,
		toggleButton: true,
		autoCollapse: true,
	},
	footer: {
		text: (
			<div className="flex w-full justify-between gap-4 text-sm">
				<span>Copyright © {new Date().getFullYear()} </span>
				<a href="https://www.sahrohit.com.np/">
					Proudly made with love ❤️ by Rohit Sah
				</a>
			</div>
		),
	},
};

export default config;
