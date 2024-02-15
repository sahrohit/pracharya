"use server";

import * as z from "zod";
import { api } from "@/trpc/server";
import { type SearchParams } from "@/types/table";

const searchParamsSchema = z.object({
	page: z.string().default("1"),
	perPage: z.string().default("10"),
	sort: z.string().optional(),
	name: z.string().optional(),
	id: z.string().optional(),
	category: z.string().optional(),
	store: z.string().optional(),
	status: z.string().optional(),
	operator: z.string().optional(),
});

const getIssues = async (searchParams: SearchParams) => {
	const { page, perPage, sort, id, status } =
		searchParamsSchema.parse(searchParams);

	return api.issue.list.query({
		id,
		status,
		page,
		perPage,
		sort,
	});
};

export default getIssues;

export type IssuesPromise = ReturnType<typeof getIssues>;
