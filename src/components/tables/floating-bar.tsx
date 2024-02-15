"use client";

import { LuCross } from "react-icons/lu";
import { type Table } from "@tanstack/react-table";

import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FloatingBarProps<TData> extends HTMLAttributes<HTMLElement> {
	table: Table<TData>;
}

const FloatingBar = <TData,>({
	table,
	children,
	className,
	...props
}: FloatingBarProps<TData>) => {
	if (table.getFilteredSelectedRowModel().rows.length <= 0) return null;

	return (
		<div
			className={cn(
				"mx-auto flex w-fit items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-white",
				className
			)}
			{...props}
		>
			<Button
				aria-label="Clear selection"
				title="Clear"
				className="h-auto bg-transparent p-1 text-white hover:bg-zinc-700"
				onClick={() => table.toggleAllRowsSelected(false)}
			>
				<LuCross className="h-4 w-4" aria-hidden="true" />
			</Button>
			{table.getFilteredSelectedRowModel().rows.length} row(s) selected
			{children}
		</div>
	);
};

export default FloatingBar;
