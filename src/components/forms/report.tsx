/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

"use client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { type SelectTestWithQuestionsForReport } from "@/server/db/types";
import { Label } from "../ui/label";

dayjs.extend(relativeTime);

const Report = ({ report }: { report: SelectTestWithQuestionsForReport }) => (
	<div className="container flex flex-col gap-12 md:flex-row">
		<div className="my-16 flex max-w-4xl flex-col gap-12">
			{report.questions
				.sort((a, b) => a.questionNumber - b.questionNumber)
				.map((question) => (
					<div key={question.questionId}>
						<div
							id={`question-number-${question.questionNumber}`}
							className="space-y-3"
						>
							<Label className="flex select-none flex-row justify-between gap-4">
								<p className="whitespace-pre-line">
									{question.questionNumber}. {question.question.name}
								</p>
								<p
									className={`whitespace-nowrap ${question.selectedAnswer === question.question.options.find((option) => option.isAnswer)?.id ? "text-green-500" : "text-red-500"}`}
								>
									[{question.question.weight} Marks]
								</p>
							</Label>
							<RadioGroup
								disabled
								value={question.selectedAnswer ?? undefined}
								className="flex flex-col space-y-1"
							>
								{question.question.options.map((option) => (
									<div
										key={option.id}
										className="flex items-center space-x-3 space-y-0"
									>
										<RadioGroupItem value={option.id} />
										<Label className="select-none font-normal">
											{option.name}{" "}
											{option.id === question.selectedAnswer && (
												<strong>(Your Answer)</strong>
											)}{" "}
											{option.isAnswer && "✅"}
										</Label>
									</div>
								))}
							</RadioGroup>
							<pre className="max-w-4xl whitespace-pre-wrap">
								<strong>Solution:</strong> {question.question.solution}
							</pre>
							{question.question.remarks && (
								<p>
									<strong>Remarks:</strong> {question.question.remarks}
								</p>
							)}
						</div>
					</div>
				))}
		</div>

		<div className="relative">
			<div className="sticky top-0 flex h-screen flex-col justify-between gap-1 py-8">
				<div>
					<h2 className="text-lg uppercase ">
						TOTAL: {report.questions.length} questions <br />
						ATTEMPTED: {
							report.questions.filter((q) => q.selectedAnswer).length
						}{" "}
						question(s)
						<br />
						SCORE:{" "}
						{
							report.questions.filter(
								(q) =>
									q.selectedAnswer ===
									q.question.options.find((option) => option.isAnswer)?.id
							).length
						}{" "}
						/ {report.questions.length}
					</h2>

					{/* <div className="flex flex-col gap-2 p-4 text-center">
							{test.endTime && (
								<Timer duration={2 * 60 * 60} endTime={test.endTime} />
							)}
						</div> */}
				</div>
				<div className="grid max-w-sm grid-cols-8 gap-1">
					{report.questions.map((question, index) => (
						<Link
							key={`quick-preview-question-${index + 1}`}
							className={buttonVariants({
								variant:
									question.selectedAnswer ===
									question.question.options.find((option) => option.isAnswer)
										?.id
										? "default"
										: "destructive",
								size: "sm",
							})}
							href={`#question-number-${index + 1}`}
						>
							{index + 1}
						</Link>
					))}
				</div>
				<div className="flex flex-col gap-2">
					<Link
						href="/dashboard"
						className={buttonVariants({ variant: "default" })}
					>
						Go Dashboard
					</Link>
					<Link href="/" className={buttonVariants({ variant: "default" })}>
						Go Home
					</Link>
				</div>
			</div>
		</div>
	</div>
);

export default Report;
