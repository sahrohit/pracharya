import { notFound } from "next/navigation";

import NavBar from "@/components/layouts/navbar";
import SiteFooter from "@/components/layouts/footer";
import { auth } from "@/server/auth";
import { DASHBOARD_NAV_ITEM, NAV_ITEM } from "@/config/marketing";
import DashboardNav from "@/components/layouts/navbar/dashboard-nav";

interface DashboardLayoutProps {
	children?: React.ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
	const session = await auth();

	if (!session?.user) {
		return notFound();
	}

	return (
		<div className="flex min-h-screen flex-col space-y-6">
			<NavBar user={session?.user} items={NAV_ITEM} scroll={false} />

			<div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
				<aside className="hidden w-[200px] flex-col md:flex">
					<DashboardNav items={DASHBOARD_NAV_ITEM} />
				</aside>
				<main className="flex w-full flex-1 flex-col overflow-hidden">
					{children}
				</main>
			</div>
			<SiteFooter className="border-t" />
		</div>
	);
};

export default DashboardLayout;
