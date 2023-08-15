import { TRPCError, inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpressAdpater from "@trpc/server/adapters/express";
import { verify } from "jsonwebtoken";
import superjson from "superjson";
import { ZodError } from "zod";
import { User } from "./db/schema";

export const createContext = ({
	req,
	res,
}: trpcExpressAdpater.CreateExpressContextOptions) => ({ req, res });

export type Context = inferAsyncReturnType<typeof createContext>;
const t = initTRPC.context<Context>().create({
	transformer: superjson,
	errorFormatter({ shape, error }) {
		return {
			...shape,
			data: {
				...shape.data,
				zodError:
					error.cause instanceof ZodError ? error.cause.flatten() : null,
			},
		};
	},
});

export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;

export const authorizedProcedure = publicProcedure.use(({ ctx, next }) => {
	const authorization = ctx.req.headers["authorization"];

	if (!authorization) {
		throw new TRPCError({
			code: "FORBIDDEN",
			message: "Not Authenticated",
		});
	}

	try {
		const token = authorization.split(" ")[1];
		const payload = verify(token, process.env.ACCESS_TOKEN_SECRET) as User & {
			iat: number;
			eat: number;
		};

		if (!payload) {
			throw new TRPCError({
				code: "FORBIDDEN",
				message: "Not Authenticated",
			});
		}
		return next();
	} catch (err) {
		console.log("Error", err);
		throw new TRPCError({
			code: "FORBIDDEN",
			message: "Not Authenticated",
		});
	}
});
