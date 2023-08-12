import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import { appRouter } from "./server";
// created for each request
const createContext = ({
	req,
	res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = inferAsyncReturnType<typeof createContext>;
const t = initTRPC.context<Context>().create();

const app = express();

app.get("/", (_req, res) => {
	res.json({
		status: "ok",
	});
});

app.use(
	"/trpc",
	trpcExpress.createExpressMiddleware({
		router: appRouter,
		createContext,
		onError: console.log,
	})
);

app.listen(parseInt(process.env.PORT!) || 4000, () =>
	console.log(`Server listening on port ${process.env.PORT!}`)
);

export type { AppRouter } from "./server";
