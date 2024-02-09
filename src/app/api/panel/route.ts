/* eslint-disable import/prefer-default-export */
import { NextResponse } from "next/server";
import { renderTrpcPanel } from "trpc-panel";
import { appRouter } from "@/server/api/root";

export const GET = async (_: Request) => {
	if (process.env.NODE_ENV === "production") {
		return new NextResponse(null, { status: 404 });
	}
	return new NextResponse(
		renderTrpcPanel(appRouter, {
			url: "/api/trpc",
			transformer: "superjson",
		}),
		{
			status: 200,
			headers: [["Content-Type", "text/html"] as [string, string]],
		}
	);
};
