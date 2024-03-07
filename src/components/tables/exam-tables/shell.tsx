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
import { type ExamsPromise } from "./fetcher";
import { type SelectExam } from "@/server/db/types";

interface ExamsTableShellProps {
	examsPromise: ExamsPromise;
}

const ExamsTableShell = ({
	examsPromise: issuesPromise,
}: ExamsTableShellProps) => {
	// Learn more about React.use here: https://react.dev/reference/react/use
	const { data, pageCount } = React.use(issuesPromise);

	const [isPending] = React.useTransition();

	// Memoize the columns so they don't re-render on every render
	const columns = React.useMemo<ColumnDef<SelectExam, unknown>[]>(
		() => fetchTasksTableColumnDefs(),
		[isPending]
	);

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

export default ExamsTableShell;
