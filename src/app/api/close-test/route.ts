/* eslint-disable import/prefer-default-export */

import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { tests } from "@/server/db/schema";

export async function POST(req: NextRequest) {
	const data = (await req.json()) as { testId: string };

	if (data?.testId) {
		const updateRes = await db
			.update(tests)
			.set({ status: "SUBMITTED" })
			.where(eq(tests.id, data.testId))
			.returning();

		return NextResponse.json(updateRes);
	}

	return new Response("Invalid Request", {
		status: 500,
	});
}
