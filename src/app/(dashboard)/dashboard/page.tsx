import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/layouts/dashboard/header";
import DashboardShell from "@/components/layouts/dashboard/shell";
import EmptyPlaceholder from "@/components/shared/empty-placeholder";
import { auth } from "@/server/auth";

export const metadata = {
	title: "Dashboard",
};

const DashboardPage = async () => {
	const session = await auth();

	if (!session?.user) {
		redirect("auth/login");
	}

	return (
		<DashboardShell>
			<DashboardHeader heading="Panel" text="Create and manage content.">
				<Button>Fake button</Button>
			</DashboardHeader>
			<div>
				<EmptyPlaceholder>
					<EmptyPlaceholder.Icon name="post" />
					<EmptyPlaceholder.Title>No content created</EmptyPlaceholder.Title>
					<EmptyPlaceholder.Description>
						You don&apos;t have any content yet. Start creating content.
					</EmptyPlaceholder.Description>
					<Button variant="outline">Fake button</Button>
				</EmptyPlaceholder>
			</div>
		</DashboardShell>
	);
};

export default DashboardPage;
