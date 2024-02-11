import NavBar from "@/components/layouts/navbar";
import SiteFooter from "@/components/layouts/footer";
import { auth } from "@/server/auth";
import { NAV_ITEM } from "@/config/marketing";

interface ContributeLayoutProps {
	children?: React.ReactNode;
}

const ContributeLayout = async ({ children }: ContributeLayoutProps) => {
	const session = await auth();

	return (
		<div className="flex min-h-screen flex-col space-y-6">
			<NavBar user={session?.user} items={NAV_ITEM} scroll={false} />
			<main className="flex-1">{children}</main>
			<SiteFooter className="border-t" />
		</div>
	);
};

export default ContributeLayout;
