import { Suspense } from "react";
import DashboardHeader from "@/components/layouts/dashboard/header";
import DashboardShell from "@/components/layouts/dashboard/shell";
import DataTableSkeleton from "@/components/tables/skeleton";
import ExamsTableShell from "@/components/tables/exam-tables/shell";
import getExams from "@/components/tables/exam-tables/fetcher";
import { type SearchParams } from "@/types/table";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ExamForm from "@/components/forms/exam-form";

export interface ExamsTableProps {
	searchParams: SearchParams;
}

const ExamPatterns = ({ searchParams }: ExamsTableProps) => {
	const examsPromise = getExams(searchParams);
	return (
		<DashboardShell>
			<DashboardHeader heading="Exams" text="Exams are managed here.">
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="outline">New Exam</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>New Exam</DialogTitle>
							<DialogDescription>
								This will be the name of the exam and it will appear in the page
								for the user to select.
							</DialogDescription>
						</DialogHeader>
						<ExamForm />
					</DialogContent>
				</Dialog>
			</DashboardHeader>
			<Suspense
				fallback={
					<DataTableSkeleton columnCount={4} filterableColumnCount={1} />
				}
			>
				<ExamsTableShell examsPromise={examsPromise} />
			</Suspense>
		</DashboardShell>
	);
};

export default ExamPatterns;
