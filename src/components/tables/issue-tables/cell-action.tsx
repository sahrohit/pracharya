"use client";

import { LuMoreHorizontal } from "react-icons/lu";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogDescription,
	DialogHeader,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { extractFirstCharacter } from "@/components/helpers";
import { type SelectIssueWithQuestion } from "@/server/db/types";

interface CellActionProps {
	data: SelectIssueWithQuestion;
}

const CellAction = ({ data }: CellActionProps) => {
	const [detailModalOpen, setDetailModalOpen] = useState(false);

	return (
		<>
			<Dialog open={detailModalOpen} onOpenChange={setDetailModalOpen}>
				<DialogContent className="bg-card sm:max-w-lg">
					<DialogHeader>
						<DialogTitle className="flex flex-row gap-4">
							{/* // TODO: Specify color based on type  */}
							Log Details (Id: {data.id}){" "}
							<Badge variant="outline">{data.status}</Badge>
						</DialogTitle>
						<DialogDescription>
							<div className="my-2 flex flex-col gap-2 ">
								<div>{data.title}</div>
								<div className="my-2 flex items-center space-x-4 self-end">
									<Avatar>
										<AvatarImage src="https://api.dicebear.com/7.x/adventurer/svg?seed=hellp" />
										<AvatarFallback>
											{extractFirstCharacter("Hello")}
										</AvatarFallback>
									</Avatar>
									<div>
										<p className="text-sm font-medium leading-none">Hello</p>
									</div>
								</div>
							</div>
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
			<Button
				onClick={() => setDetailModalOpen(true)}
				variant="ghost"
				className="h-8 w-8 p-0"
			>
				<span className="sr-only">Open menu</span>
				<LuMoreHorizontal className="h-4 w-4" />
			</Button>
		</>
	);
};

export default CellAction;
