import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { type AppRouter } from "api";

export const trpc = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: `${process.env.NEXT_PUBLIC_API_URL}/trpc`, // you should update this to use env variables
		}),
	],
});
