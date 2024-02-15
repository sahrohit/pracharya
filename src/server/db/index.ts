/* eslint-disable import/prefer-default-export */
// import { neon } from "@neondatabase/serverless";
import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";

import { env } from "@/env.js";
import * as schema from "./schema";

export const pool = new Pool({ connectionString: env.DATABASE_URL });

export const db = drizzle(pool, {
	schema,
	logger: true,
});
