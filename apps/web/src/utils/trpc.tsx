import { httpBatchLink } from "@trpc/client";
import { type AppRouter } from "api";
import { createTRPCNext } from "@trpc/next";
import superjson from "superjson";

export const trpc = createTRPCNext<AppRouter>({
	config(opts) {
		return {
			links: [
				httpBatchLink({
					url: `${process.env.NEXT_PUBLIC_API_URL}/trpc`,
					async headers() {
						return {
							authorization: `Bearer ${localStorage.getItem("accessToken")}`,
						};
					},
				}),
			],
			transformer: superjson,
		};
	},
	ssr: false,
});
