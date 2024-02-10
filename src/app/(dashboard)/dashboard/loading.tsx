import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/layouts/dashboard/header";
import DashboardShell from "@/components/layouts/dashboard/shell";
import CardSkeleton from "@/components/shared/card-skeleton";

const DashboardLoading = () => (
	<DashboardShell>
		<DashboardHeader heading="Panel" text="Create and manage content.">
			<Button>Fake button</Button>
		</DashboardHeader>
		<div className="divide-border-200 divide-y rounded-md border">
			<CardSkeleton />
			<CardSkeleton />
		</div>
	</DashboardShell>
);

export default DashboardLoading;
