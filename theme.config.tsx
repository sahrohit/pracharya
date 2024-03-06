import Link from "next/link";
import Logo from "@/components/logo";

const config = {
	logo: (
		<>
			<Logo className="nx-h-5 nx-w-5" />
			<span style={{ marginLeft: ".4em", fontWeight: 700, fontSize: "1.25em" }}>
				Pracharya Notes
			</span>
		</>
	),
	banner: {
		key: "contribute",
		text: (
			<Link href="/contribute" target="_blank">
				🤝 You can contribute to these notes by clicking here. Contribute →
			</Link>
		),
	},
	project: {
		link: "https://github.com/sahrohit/pracharya",
	},
	docsRepositoryBase: `https://pracharya.vercel.app/contribute?tab=notes&path=`,
	sidebar: {
		defaultMenuCollapseLevel: 1,
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
