"use client";

import { LuMoreHorizontal } from "react-icons/lu";
import Link from "next/link";
import { type SelectTest } from "@/server/db/types";

interface CellActionProps {
	data: SelectTest;
}

const CellAction = ({ data }: CellActionProps) => (
	<Link href={`/admin/patterns/${data.id}`}>
		<span className="sr-only">Open menu</span>
		<LuMoreHorizontal className="h-4 w-4" />
	</Link>
);

export default CellAction;
