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
import { tests } from "@/server/db/schema";

import ColumnHeader from "@/components/tables/column-header";

import CellAction from "./cell-action";
import { type SelectTest } from "@/server/db/types";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

dayjs.extend(relativeTime);

export function fetchTasksTableColumnDefs(): ColumnDef<SelectTest, unknown>[] {
	return [
		{
			accessorKey: "createdAt",
			header: ({ column }) => (
				<ColumnHeader column={column} title="Created At" />
			),
			cell: ({ row }) => (
				<div className="w-[80px]">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								{dayjs(row.getValue("createdAt")).format("DD/MM/YYYY HH:mm:ss")}
							</TooltipTrigger>
							<TooltipContent>
								<p>{dayjs(row.getValue("createdAt")).fromNow()}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			),
			enableHiding: false,
		},
		{
			accessorKey: "status",
			header: ({ column }) => <ColumnHeader column={column} title="Type" />,
			cell: ({ row }) => {
				const type = tests.status.enumValues.find(
					(status) => status === row.original.status
				);

				if (!type) return null;

				return (
					<div className="flex w-[100px] items-center">
						{type === "COMPLETED" || type === "SUBMITTED" ? (
							<CiCirclePlus
								className="mr-2 h-4 w-4 text-muted-foreground"
								aria-hidden="true"
							/>
						) : type === "ABANDONED" ? (
							<LuCheckCircle
								className="mr-2 h-4 w-4 text-muted-foreground"
								aria-hidden="true"
							/>
						) : type === "STARTED" ? (
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
			accessorKey: "id",
			header: ({ column }) => <ColumnHeader column={column} title="Test Id" />,
			cell: ({ row }) => (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate font-medium">
						{row.original.id}
					</span>
				</div>
			),
			enableSorting: false,
		},
		{
			accessorKey: "endTime",
			header: ({ column }) => <ColumnHeader column={column} title="End Time" />,
			cell: ({ row }) => (
				<div className="w-[80px]">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								{dayjs(row.getValue("endTime")).format("DD/MM/YYYY HH:mm:ss")}
							</TooltipTrigger>
							<TooltipContent>
								<p>{dayjs(row.getValue("endTime")).fromNow()}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			),
			enableHiding: false,
		},
		{
			id: "actions",
			cell: ({ row }) => <CellAction data={row.original} />,
		},
	];
}

export const filterableColumns: DataTableFilterableColumn<SelectTest>[] = [
	{
		id: "status",
		title: "Status",
		options: tests.status.enumValues.map((status) => ({
			label: (status[0]?.toUpperCase() ?? "") + status.slice(1),
			value: status,
		})),
	},
];

export const searchableColumns: DataTableSearchableColumn<SelectTest>[] = [
	{
		id: "id",
		title: "id",
	},
];
