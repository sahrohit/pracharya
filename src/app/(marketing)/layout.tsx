import { Suspense } from "react";

import { NAV_ITEM } from "@/config/marketing";
import SiteFooter from "@/components/layouts/footer";
import { auth } from "@/server/auth";
import NavBar from "@/components/layouts/navbar";

interface MarketingLayoutProps {
	children: React.ReactNode;
}

const MarketingLayout = async ({ children }: MarketingLayoutProps) => {
	const session = await auth();

	return (
		<div className="flex min-h-screen flex-col">
			<Suspense fallback="...">
				<NavBar user={session?.user} items={NAV_ITEM} scroll />
			</Suspense>
			<main className="flex-1">{children}</main>
			<SiteFooter />
		</div>
	);
};

export default MarketingLayout;
