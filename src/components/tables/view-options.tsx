"use client";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { LuCross } from "react-icons/lu";
import { type Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface LogTableViewOptionsProps<TData> {
	table: Table<TData>;
}

const LogTableViewOptions = <TData,>({
	table,
}: LogTableViewOptionsProps<TData>) => (
	<DropdownMenu>
		<DropdownMenuTrigger asChild>
			<Button
				variant="outline"
				size="sm"
				className="ml-auto hidden h-8 lg:flex"
			>
				<LuCross className="mr-2 h-4 w-4" />
				View
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end" className="w-[150px]">
			<DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
			<DropdownMenuSeparator />
			{table
				.getAllColumns()
				.filter(
					(column) =>
						typeof column.accessorFn !== "undefined" && column.getCanHide()
				)
				.map((column) => (
					<DropdownMenuCheckboxItem
						key={column.id}
						className="capitalize"
						checked={column.getIsVisible()}
						onCheckedChange={(value) => column.toggleVisibility(!!value)}
					>
						{column.id}
					</DropdownMenuCheckboxItem>
				))}
		</DropdownMenuContent>
	</DropdownMenu>
);

export default LogTableViewOptions;
