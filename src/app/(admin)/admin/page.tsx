import { Suspense } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import DashboardHeader from "@/components/layouts/dashboard/header";
import DashboardShell from "@/components/layouts/dashboard/shell";
import DataTableSkeleton from "@/components/tables/skeleton";
import IssuesTableShell from "@/components/tables/admin-issue-tables/shell";
import { type SearchParams } from "@/types/table";
import getAdminIssues from "@/components/tables/admin-issue-tables/fetcher";
import { cn } from "@/lib/utils";

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
				<Link
					href="/contribute"
					className={cn(buttonVariants({ variant: "outline" }))}
				>
					New Request
				</Link>
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
