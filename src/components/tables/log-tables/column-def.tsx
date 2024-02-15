"use client";

import { LuCheckCircle } from "react-icons/lu";
import { CiCirclePlus, CiCircleQuestion, CiCircleRemove } from "react-icons/ci";
import { type ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import type {
	DataTableFilterableColumn,
	DataTableSearchableColumn,
} from "@/types/table";
import { issues } from "@/server/db/schema";

import ColumnHeader from "@/components/tables/column-header";

import CellAction from "./cell-action";
import { type SelectIssueWithChapterSubChapter } from "@/server/db/types";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

dayjs.extend(relativeTime);

export function fetchTasksTableColumnDefs(): ColumnDef<
	SelectIssueWithChapterSubChapter,
	unknown
>[] {
	return [
		{
			accessorKey: "updatedAt",
			header: ({ column }) => (
				<ColumnHeader column={column} title="Timestamp" />
			),
			cell: ({ row }) => (
				<div className="w-[80px]">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								{dayjs(row.getValue("updatedAt")).format("DD/MM/YYYY HH:mm:ss")}
							</TooltipTrigger>
							<TooltipContent>
								<p>{dayjs(row.getValue("updatedAt")).fromNow()}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			),
			enableHiding: false,
		},
		{
			accessorKey: "type",
			header: ({ column }) => <ColumnHeader column={column} title="Type" />,
			cell: ({ row }) => {
				const type = issues.status.enumValues.find(
					(status) => status === row.original.status
				);

				if (!type) return null;

				return (
					<div className="flex w-[100px] items-center">
						{type === "COMPLETED" ? (
							<CiCirclePlus
								className="mr-2 h-4 w-4 text-muted-foreground"
								aria-hidden="true"
							/>
						) : type === "PENDING" ? (
							<LuCheckCircle
								className="mr-2 h-4 w-4 text-muted-foreground"
								aria-hidden="true"
							/>
						) : type === "REJECTED" ? (
							<CiCircleRemove
								className="mr-2 h-4 w-4 text-muted-foreground"
								aria-hidden="true"
							/>
						) : (
							<CiCircleQuestion
								className="mr-2 h-4 w-4 text-muted-foreground"
								aria-hidden="true"
							/>
						)}
						<span className="capitalize">{type}</span>
					</div>
				);
			},
			filterFn: (row, id, value) =>
				value instanceof Array && value.includes(row.getValue(id)),
		},
		{
			accessorKey: "detail",
			header: ({ column }) => <ColumnHeader column={column} title="Detail" />,
			cell: ({ row }) => (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate font-medium">
						{row.getValue("detail")}
					</span>
				</div>
			),
			enableSorting: false,
		},
		{
			id: "actions",
			cell: ({ row }) => <CellAction data={row.original} />,
		},
	];
}

export const filterableColumns: DataTableFilterableColumn<SelectIssueWithChapterSubChapter>[] =
	[
		{
			id: "status",
			title: "Status",
			options: issues.status.enumValues.map((status) => ({
				label: (status[0]?.toUpperCase() ?? "") + status.slice(1),
				value: status,
			})),
		},
	];

export const searchableColumns: DataTableSearchableColumn<SelectIssueWithChapterSubChapter>[] =
	[
		{
			id: "id",
			title: "id",
		},
	];
