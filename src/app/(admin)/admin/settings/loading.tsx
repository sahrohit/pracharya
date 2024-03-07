import DashboardHeader from "@/components/layouts/dashboard/header";
import DashboardShell from "@/components/layouts/dashboard/shell";
import CardSkeleton from "@/components/shared/card-skeleton";

const DashboardSettingsLoading = () => (
	<DashboardShell>
		<DashboardHeader
			heading="Settings"
			text="Manage account and website settings."
		/>
		<div className="grid gap-10">
			<CardSkeleton />
		</div>
	</DashboardShell>
);

export default DashboardSettingsLoading;
