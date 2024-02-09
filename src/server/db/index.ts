/* eslint-disable import/prefer-default-export */
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { env } from "@/env.js";
import * as schema from "./schema";

export const sql = neon(env.DATABASE_URL);

export const db = drizzle(sql, {
	schema,
	logger: true,
});
