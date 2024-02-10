import { redirect } from "next/navigation";

import DashboardHeader from "@/components/layouts/dashboard/header";
import DashboardShell from "@/components/layouts/dashboard/shell";
import { auth } from "@/server/auth";

export const metadata = {
	title: "Settings",
	description: "Manage account and website settings.",
};

const SettingsPage = async () => {
	const user = await auth();

	if (!user) {
		redirect("/auth/login");
	}

	return (
		<DashboardShell>
			<DashboardHeader
				heading="Settings"
				text="Manage account and website settings."
			/>
			<div className="grid gap-10">
				<p>Form goes here</p>
			</div>
		</DashboardShell>
	);
};

export default SettingsPage;
