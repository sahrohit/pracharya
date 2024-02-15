"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";

import useTable from "@/components/hooks/use-table";
import DataTable from "@/components/tables";

import {
	fetchTasksTableColumnDefs,
	filterableColumns,
	searchableColumns,
} from "./column-def";
import { type IssuesPromise } from "./fetcher";
import { type SelectIssueWithChapterSubChapter } from "@/server/db/types";

interface IssuesTableShellProps {
	issuesPromise: IssuesPromise;
}

const IssuesTableShell = ({ issuesPromise }: IssuesTableShellProps) => {
	// Learn more about React.use here: https://react.dev/reference/react/use
	const { data, pageCount } = React.use(issuesPromise);

	const [isPending] = React.useTransition();

	// Memoize the columns so they don't re-render on every render
	const columns = React.useMemo<
		ColumnDef<SelectIssueWithChapterSubChapter, unknown>[]
	>(() => fetchTasksTableColumnDefs(), [isPending]);

	const { dataTable } = useTable({
		data,
		columns,
		pageCount,
		searchableColumns,
		filterableColumns,
	});

	return (
		<DataTable
			dataTable={dataTable}
			columns={columns}
			searchableColumns={searchableColumns}
			filterableColumns={filterableColumns}
		/>
	);
};

export default IssuesTableShell;
