/* eslint-disable no-console */

import { db } from ".";
import { chapters, courses } from "./schema";

const runSeed = async () => {
	console.log("⏳ Seeding database...");

	const start = Date.now();

	await db.insert(courses).values([
		{
			id: "computer-engineering",
			name: "Computer Engineering",
		},
		{
			id: "mechanical-engineering",
			name: "Mechanical Engineering",
		},
	]);

	await db.insert(chapters).values([
		{
			id: "basic-electrical-and-electronics-engineering",
			name: "Basic Electrical and Electronics Engineering",
		},
		{
			id: "digital-logic-and-microprocessor",
			name: "Digital Logic and Microprocessor",
		},
		{
			id: "programming-language-and-its-applications",
			name: "Programming Language and Its Applications",
		},
		{
			id: "computer-organization-and-embedded-system",
			name: "Computer Organization and Embedded System",
		},
		{
			id: "computer-network-and-network-security-system",
			name: "Computer Network and Network Security System",
		},
		{
			id: "theory-of-computation-and-computer-graphics",
			name: "Theory of Computation and Computer Graphics",
		},
		{
			id: "data-structures-and-algorithm-database-system-and-operating-system",
			name: "Data Structures and Algorithm Database System and Operating System",
		},
		{
			id: "software-engineering-and-object-oriented-analysis-and-design",
			name: "Software Engineering and Object Oriented Analysis and Design",
		},
		{
			id: "artificial-intelligence-and-neural-networks",
			name: "Artificial Intelligence and Neural Networks",
		},
		{
			id: "project-planning-design-and-implementation",
			name: "Project Planning, Design and Implementation",
		},
	]);

	const end = Date.now();

	console.log(`✅ Database see in ${end - start}ms`);

	process.exit(0);
};

runSeed().catch((err) => {
	console.error("❌ Migration failed");
	console.error(err);
	process.exit(1);
});
