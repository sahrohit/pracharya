import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { BiLeftDownArrowCircle, BiRightDownArrowCircle } from "react-icons/bi";
import { type Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface PaginationProps<TData> {
	table: Table<TData>;
	pageSizeOptions?: number[];
}

const Pagination = <TData,>({
	table,
	pageSizeOptions = [10, 20, 30, 40, 50],
}: PaginationProps<TData>) => (
	<div className="flex w-full flex-col items-center justify-between gap-4 overflow-auto px-2 py-1 sm:flex-row sm:gap-8">
		<div className="flex-1 whitespace-nowrap text-sm text-muted-foreground">
			{table.getFilteredSelectedRowModel().rows.length} of{" "}
			{table.getFilteredRowModel().rows.length} row(s) selected.
		</div>
		<div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
			<div className="flex items-center space-x-2">
				<p className="whitespace-nowrap text-sm font-medium">Rows per page</p>
				<Select
					value={`${table.getState().pagination.pageSize}`}
					onValueChange={(value) => {
						table.setPageSize(Number(value));
					}}
				>
					<SelectTrigger className="h-8 w-[70px]">
						<SelectValue placeholder={table.getState().pagination.pageSize} />
					</SelectTrigger>
					<SelectContent side="top">
						{pageSizeOptions.map((pageSize) => (
							<SelectItem key={pageSize} value={`${pageSize}`}>
								{pageSize}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<div className="flex w-[100px] items-center justify-center text-sm font-medium">
				Page {table.getState().pagination.pageIndex + 1} of{" "}
				{table.getPageCount()}
			</div>
			<div className="flex items-center space-x-2">
				<Button
					aria-label="Go to first page"
					variant="outline"
					className="hidden h-8 w-8 p-0 lg:flex"
					onClick={() => table.setPageIndex(0)}
					disabled={!table.getCanPreviousPage()}
				>
					<BiLeftDownArrowCircle className="h-4 w-4" aria-hidden="true" />
				</Button>
				<Button
					aria-label="Go to previous page"
					variant="outline"
					className="h-8 w-8 p-0"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					<LuChevronLeft className="h-4 w-4" aria-hidden="true" />
				</Button>
				<Button
					aria-label="Go to next page"
					variant="outline"
					className="h-8 w-8 p-0"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					<LuChevronRight className="h-4 w-4" aria-hidden="true" />
				</Button>
				<Button
					aria-label="Go to last page"
					variant="outline"
					className="hidden h-8 w-8 p-0 lg:flex"
					onClick={() => table.setPageIndex(table.getPageCount() - 1)}
					disabled={!table.getCanNextPage()}
				>
					<BiRightDownArrowCircle className="h-4 w-4" aria-hidden="true" />
				</Button>
			</div>
		</div>
	</div>
);

export default Pagination;