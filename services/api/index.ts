import * as trpcExpress from "@trpc/server/adapters/express";
import { config } from "dotenv";
import express from "express";
import helmet from "helmet";
import { appRouter } from "./src/router/_app";
import { createContext } from "./src/server";
import cors from "cors";

// Required for importing env variable
config();

const app = express();

app.use(helmet());

app.set("trust proxy", 1);

app.use(
	cors({
		origin: (process.env.ALLOWED_ORIGINS!.split(",") || "").map(
			(origin) => origin
		),
		credentials: true,
	})
);

//Home router for testing
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

export type AppRouter = typeof appRouter;
