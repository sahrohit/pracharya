import { TRPCError, inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpressAdpater from "@trpc/server/adapters/express";
import { verify } from "jsonwebtoken";
import superjson from "superjson";
import { ZodError } from "zod";
import { User } from "./db/schema";

export const createContext = ({
	req,
	res,
}: trpcExpressAdpater.CreateExpressContextOptions) => {
	const user = getUserFromToken(
		req.headers["authorization"]
			?.split(" ")[1]
			.replace('"', "")
			.replace('"', "") ?? ""
	);

	return {
		req,
		res,
		user,
	};
};

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
	if (!ctx.user) {
		throw new TRPCError({
			code: "FORBIDDEN",
			message: "Not Authenticated",
		});
	}

	return next();
});

const getUserFromToken = (token: string) => {
	let user: (User & { ias: number; eas: number }) | null = null;
	try {
		const payload = verify(token, process.env.ACCESS_TOKEN_SECRET) as User & {
			ias: number;
			eas: number;
		};

		if (payload.id) {
			user = payload;
		}
	} catch (err) {
		console.log(err);
		user = null;
	}
	return user;
};
