"use client";

import Link from "next/link";
import { type SelectTest } from "@/server/db/types";
import { buttonVariants } from "@/components/ui/button";

interface CellActionProps {
	data: SelectTest;
}

const CellAction = ({ data }: CellActionProps) => (
	<div className="flex flex-row gap-2">
		{data.endTime.getTime() > new Date().getTime() &&
		data.status === "STARTED" ? (
			<Link
				className={buttonVariants({ variant: "default", size: "sm" })}
				href={`/exam/${data.id}`}
			>
				Continue Test
			</Link>
		) : (
			<Link
				className={buttonVariants({ variant: "default", size: "sm" })}
				href={`/report/${data.id}`}
			>
				View Report
			</Link>
		)}
	</div>
);

export default CellAction;
