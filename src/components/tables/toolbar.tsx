/* eslint-disable no-nested-ternary */

"use client";

import { LuCross, LuPlusCircle, LuTrash } from "react-icons/lu";
import type { Table } from "@tanstack/react-table";
import { useTransition, type MouseEventHandler } from "react";

import Link from "next/link";
import type {
	DataTableFilterableColumn,
	DataTableSearchableColumn,
} from "@/types/table";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FacetedFilter from "./faceted-filter";
import ViewOptions from "./view-options";

interface ToolbarProps<TData> {
	table: Table<TData>;
	filterableColumns?: DataTableFilterableColumn<TData>[];
	searchableColumns?: DataTableSearchableColumn<TData>[];
	newRowLink?: string;
	deleteRowsAction?: MouseEventHandler<HTMLButtonElement>;
}

const Toolbar = <TData,>({
	table,
	filterableColumns = [],
	searchableColumns = [],
	newRowLink,
	deleteRowsAction,
}: ToolbarProps<TData>) => {
	const isFiltered = table.getState().columnFilters.length > 0;
	const [isPending, startTransition] = useTransition();

	return (
		<div className="flex w-full items-center justify-between space-x-2 overflow-auto p-1">
			<div className="flex flex-1 items-center space-x-2">
				{searchableColumns.length > 0 &&
					searchableColumns.map(
						(column) =>
							table.getColumn(column.id ? String(column.id) : "") && (
								<Input
									key={String(column.id)}
									placeholder={`Filter ${column.title}...`}
									value={
										(table
											.getColumn(String(column.id))
											?.getFilterValue() as string) ?? ""
									}
									onChange={(event) =>
										table
											.getColumn(String(column.id))
											?.setFilterValue(event.target.value)
									}
									className="h-8 w-[150px] lg:w-[250px]"
								/>
							)
					)}
				{filterableColumns.length > 0 &&
					filterableColumns.map(
						(column) =>
							table.getColumn(column.id ? String(column.id) : "") && (
								<FacetedFilter
									key={String(column.id)}
									column={table.getColumn(column.id ? String(column.id) : "")}
									title={column.title}
									options={column.options}
								/>
							)
					)}
				{isFiltered && (
					<Button
						aria-label="Reset filters"
						variant="ghost"
						className="h-8 px-2 lg:px-3"
						onClick={() => table.resetColumnFilters()}
					>
						Reset
						<LuCross className="ml-2 h-4 w-4" aria-hidden="true" />
					</Button>
				)}
			</div>
			<div className="flex items-center space-x-2">
				{deleteRowsAction && table.getSelectedRowModel().rows.length > 0 ? (
					<Button
						aria-label="Delete selected rows"
						variant="outline"
						size="sm"
						className="h-8"
						onClick={(event) => {
							startTransition(() => {
								table.toggleAllPageRowsSelected(false);
								deleteRowsAction(event);
							});
						}}
						disabled={isPending}
					>
						<LuTrash className="mr-2 h-4 w-4" aria-hidden="true" />
						Delete
					</Button>
				) : newRowLink ? (
					<Link aria-label="Create new row" href={newRowLink}>
						<div
							className={cn(
								buttonVariants({
									variant: "outline",
									size: "sm",
									className: "h-8",
								})
							)}
						>
							<LuPlusCircle className="mr-2 h-4 w-4" aria-hidden="true" />
							New
						</div>
					</Link>
				) : null}
				<ViewOptions table={table} />
			</div>
		</div>
	);
};

export default Toolbar;
