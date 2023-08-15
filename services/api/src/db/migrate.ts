import { config } from "dotenv";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import db from "./db";

config();

export const migrateDB = async () => {
	console.log("Migrating DB");
	await migrate(db, { migrationsFolder: "drizzle" });
	console.log("DB Migrated");
};

migrateDB()
	.then(() => {
		process.exit(0);
	})
	.catch((err) => console.log(err));
