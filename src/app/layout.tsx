import "@/styles/globals.css";

import { SessionProvider } from "next-auth/react";
import { GeistSans } from "geist/font/sans";
import siteConfig from "@/config/site";
import { TRPCReactProvider } from "@/trpc/react";
import ThemeProvider from "@/components/providers";
import Analytics from "@/components/analytics";
import ModalProvider from "@/components/modal-provider";
import TailwindIndicator from "@/components/tailwind-indicator";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/server/auth";

export const metadata = {
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
	keywords: [
		"Notes",
		"Engineering License Exam",
		"License Syllabus",
		"Mock Test",
		"Pracharya",
		"Study Buddy",
		"Peer to Peer Learning",
		"Student Community",
	],
	authors: [
		{
			name: "sahrohit",
		},
		{
			name: "avintimilsina",
		},
	],
	creator: "sahrohit",
	metadataBase: new URL(siteConfig.url),
	openGraph: {
		type: "website",
		locale: "en_US",
		url: siteConfig.url,
		title: siteConfig.name,
		description: siteConfig.description,
		siteName: siteConfig.name,
	},
	twitter: {
		card: "summary_large_image",
		title: siteConfig.name,
		description: siteConfig.description,
		images: [siteConfig.ogImage],
		creator: "@sahrohit",
	},
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
	manifest: `${siteConfig.url}/site.webmanifest`,
};
export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();

	return (
		<html suppressHydrationWarning lang="en" className={GeistSans.className}>
			<body>
				<SessionProvider session={session}>
					<TRPCReactProvider>
						<ThemeProvider
							attribute="class"
							defaultTheme="light"
							enableSystem
							disableTransitionOnChange
						>
							{children}
							<Analytics />
							<Toaster richColors />
							<ModalProvider />
							<TailwindIndicator />
						</ThemeProvider>
					</TRPCReactProvider>
				</SessionProvider>
			</body>
		</html>
	);
}
