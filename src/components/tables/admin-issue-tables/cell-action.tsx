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
	DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { type SelectIssueWithQuestion } from "@/server/db/types";
import { extractFirstCharacter } from "@/components/helpers";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import QuestionForm from "@/components/forms/question-form";

interface CellActionProps {
	data: SelectIssueWithQuestion;
}

const CellAction = ({ data }: CellActionProps) => {
	const [detailModalOpen, setDetailModalOpen] = useState(false);

	return (
		<>
			<Dialog open={detailModalOpen} onOpenChange={setDetailModalOpen}>
				<DialogContent className="bg-card sm:max-w-3xl">
					<DialogHeader>
						<DialogTitle className="flex flex-row gap-4">
							{data.question?.name ? data.question.name : data.title}
							<div>
								<Badge variant="outline">{data.status}</Badge>
							</div>
						</DialogTitle>
						<DialogDescription className="flex flex-col gap-4">
							{data.questionId ? (
								<QuestionForm
									initialValues={{
										id: data.id,
										name: data.question?.name ?? undefined,
										options:
											data.question?.options.map((option) => ({
												name: option.name,
												isAnswer: Boolean(option.isAnswer),
											})) ?? undefined,
										answer:
											data.question?.options.find((option) => option.isAnswer)
												?.name ?? undefined,
										subChapter: data.subChapterId,
										chapter: data.subChapter.chapterId,
									}}
								/>
							) : (
								<p>{data.description}</p>
							)}

							<div className="my-2 flex items-center space-x-4">
								<Avatar>
									<AvatarImage
										src={
											data.creator.image ??
											`https://api.dicebear.com/7.x/adventurer/svg?seed=${data.creator.name}`
										}
									/>
									<AvatarFallback>
										{extractFirstCharacter(data.creator.name)}
									</AvatarFallback>
								</Avatar>
								<div>
									<p className="text-sm font-medium leading-none">
										{data.creator.name}
									</p>
								</div>
							</div>
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button variant="destructive" size="sm" type="submit">
							Deny Changes
						</Button>
						<Button size="sm" type="submit">
							Accept Changes
						</Button>
					</DialogFooter>
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
