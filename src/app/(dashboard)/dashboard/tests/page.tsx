import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/layouts/dashboard/header";
import DashboardShell from "@/components/layouts/dashboard/shell";
import DataTableSkeleton from "@/components/tables/skeleton";
import TestsTableShell from "@/components/tables/test-tables/shell";
import { type SearchParams } from "@/types/table";
import getTests from "@/components/tables/test-tables/fetcher";
import NewTestModal from "@/components/tables/test-tables/new-test";

export const metadata = {
	title: "Tests",
};

export interface IssuesTablePageProps {
	searchParams: SearchParams;
}

const TestsPage = async ({ searchParams }: IssuesTablePageProps) => {
	const testsPromise = getTests(searchParams);

	return (
		<DashboardShell>
			<DashboardHeader heading="Tests" text="Manage Tests here">
				<NewTestModal />
			</DashboardHeader>
			<Suspense
				fallback={
					<DataTableSkeleton columnCount={4} filterableColumnCount={1} />
				}
			>
				<TestsTableShell testsPromise={testsPromise} />
			</Suspense>
		</DashboardShell>
	);
};

export default TestsPage;
