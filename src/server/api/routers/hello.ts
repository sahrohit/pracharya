import { z } from "zod";

import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "@/server/api/trpc";

const helloRouter = createTRPCRouter({
	ping: publicProcedure
		.meta({ description: "Returns a Pong" })
		.query(() => "Pong!"),

	secretPing: protectedProcedure
		.meta({ description: "Returns Secrent Pong only for authenticated users" })
		.query(() => "Secret Pong!"),

	hello: publicProcedure
		.meta({ description: "Says Hello to whatever you pass" })
		.input(z.object({ text: z.string().describe("Text to say") }))
		.query(({ input }) => ({
			greeting: `Hello ${input.text}`,
		})),

	me: protectedProcedure
		.meta({ description: "Get information about the current user" })
		.query(({ ctx }) => ctx.session.user),
});

export default helloRouter;
