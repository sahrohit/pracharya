import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/layouts/dashboard/header";
import DashboardShell from "@/components/layouts/dashboard/shell";
import DataTableSkeleton from "@/components/tables/skeleton";
import IssuesTableShell from "@/components/tables/admin-issue-tables/shell";
import { type SearchParams } from "@/types/table";
import getAdminIssues from "@/components/tables/admin-issue-tables/fetcher";

export const metadata = {
	title: "Dashboard",
};

export interface IssuesTablePageProps {
	searchParams: SearchParams;
}

const DashboardPage = async ({ searchParams }: IssuesTablePageProps) => {
	const adminIssuesPromise = getAdminIssues(searchParams);

	return (
		<DashboardShell>
			<DashboardHeader heading="Requests" text="Manage Requests here">
				<Button>New Request</Button>
			</DashboardHeader>
			<Suspense
				fallback={
					<DataTableSkeleton columnCount={4} filterableColumnCount={1} />
				}
			>
				<IssuesTableShell adminIssuesPromise={adminIssuesPromise} />
			</Suspense>
		</DashboardShell>
	);
};

export default DashboardPage;
