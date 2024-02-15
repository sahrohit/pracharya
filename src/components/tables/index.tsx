import { type ReactNode, type MouseEventHandler } from "react";
import {
	flexRender,
	type ColumnDef,
	type Table as TanstackTable,
} from "@tanstack/react-table";
import type {
	DataTableFilterableColumn,
	DataTableSearchableColumn,
} from "@/types/table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import AdvancedToolbar from "@/components/tables/advanced/advanced-toolbar";
import FloatingBar from "./floating-bar";
import Pagination from "./pagination";
import Toolbar from "./toolbar";

interface DataTableProps<TData, TValue> {
	/**
	 * The table instance returned from useDataTable hook with pagination, sorting, filtering, etc.
	 * @type TanstackTable<TData>
	 */
	dataTable: TanstackTable<TData>;

	/**
	 * The columns of the table
	 * @default []
	 * @type ColumnDef<TData, TValue>[]
	 */
	columns: ColumnDef<TData, TValue>[];

	/**
	 * The searchable columns of the table
	 * @default []
	 * @type {id: keyof TData, title: string}[]
	 * @example searchableColumns={[{ id: "title", title: "titles" }]}
	 */
	searchableColumns?: DataTableSearchableColumn<TData>[];

	/**
	 * The filterable columns of the table. When provided, renders dynamic faceted filters, and the advancedFilter prop is ignored.
	 * @default []
	 * @type {id: keyof TData, title: string, options: { label: string, value: string, icon?: ComponentType<{ className?: string }> }[]
	 * @example filterableColumns={[{ id: "status", title: "Status", options: ["todo", "in-progress", "done", "canceled"]}]}
	 */
	filterableColumns?: DataTableFilterableColumn<TData>[];

	/**
	 * Show notion like filters when enabled
	 * @default false
	 * @type boolean
	 */
	advancedFilter?: boolean;

	/**
	 * The content to render in the floating bar on row selection, at the bottom of the table. When null, the floating bar is not rendered.
	 * The datTable instance is passed as a prop to the floating bar content.
	 * @default null
	 * @type ReactNode | null
	 * @example floatingBarContent={TasksTableFloatingBarContent(dataTable)}
	 */
	floatingBarContent?: ReactNode | null;

	/**
	 * The action to delete rows
	 * @default undefined
	 * @type MouseEventHandler<HTMLButtonElement> | undefined
	 * @example deleteRowsAction={(event) => deleteSelectedRows(dataTable, event)}
	 */
	deleteRowsAction?: MouseEventHandler<HTMLButtonElement>;
}

const DataTable = <TData, TValue>({
	dataTable,
	columns,
	searchableColumns = [],
	filterableColumns = [],
	advancedFilter = false,
	floatingBarContent,
	deleteRowsAction,
}: DataTableProps<TData, TValue>) => (
	<div className="w-full space-y-2.5 overflow-auto">
		{advancedFilter ? (
			<AdvancedToolbar
				dataTable={dataTable}
				filterableColumns={filterableColumns}
				searchableColumns={searchableColumns}
			/>
		) : (
			<Toolbar
				table={dataTable}
				filterableColumns={filterableColumns}
				searchableColumns={searchableColumns}
				deleteRowsAction={deleteRowsAction}
			/>
		)}
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					{dataTable.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{dataTable.getRowModel().rows?.length ? (
						dataTable.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
		<div className="space-y-2.5">
			<Pagination table={dataTable} />
			{floatingBarContent ? (
				<FloatingBar table={dataTable}>{floatingBarContent}</FloatingBar>
			) : null}
		</div>
	</div>
);

export default DataTable;
