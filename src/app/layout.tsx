import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import siteConfig from "@/config/site";

import { TRPCReactProvider } from "@/trpc/react";
import ThemeProvider from "@/components/providers";
import Analytics from "@/components/analytics";
import ModalProvider from "@/components/modal-provider";
import TailwindIndicator from "@/components/tailwind-indicator";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/server/auth";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata = {
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
	keywords: ["Start your business", "Own your website"],
	authors: [
		{
			name: "sahrohit",
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
		creator: "@miickasmt",
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
		<html lang="en">
			<body className={`font-sans ${inter.variable}`}>
				<SessionProvider session={session}>
					<TRPCReactProvider>
						<ThemeProvider
							attribute="class"
							defaultTheme="system"
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
