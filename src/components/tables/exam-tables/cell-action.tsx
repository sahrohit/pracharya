"use client";

import { LuMoreHorizontal } from "react-icons/lu";
import Link from "next/link";
import { type SelectExam } from "@/server/db/types";

interface CellActionProps {
	data: SelectExam;
}

const CellAction = ({ data }: CellActionProps) => (
	<Link href={`/admin/patterns/${data.id}`}>
		<span className="sr-only">Open menu</span>
		<LuMoreHorizontal className="h-4 w-4" />
	</Link>
);

export default CellAction;
