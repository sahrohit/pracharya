/* eslint-disable @typescript-eslint/no-unsafe-member-access */

"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import dynamic from "next/dynamic";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Form,
	FormField,
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { type SelectTestWithQuestions } from "@/server/db/types";
import { questionWeightEnum } from "@/server/db/schema";

const Timer = dynamic(() => import("@/components/shared/timer"), {
	ssr: false,
});

dayjs.extend(relativeTime);

export function getDirtyValues<
	DirtyFields extends Record<string, unknown>,
	Values extends Record<keyof DirtyFields, unknown>,
>(dirtyFields: DirtyFields, values: Values): Partial<typeof values> {
	const dirtyValues = Object.keys(dirtyFields).reduce((prev, key) => {
		// Unsure when RFH sets this to `false`, but omit the field if so.
		if (!dirtyFields[key]) return prev;

		return {
			...prev,
			[key]:
				typeof dirtyFields[key] === "object"
					? getDirtyValues(
							dirtyFields[key] as DirtyFields,
							values[key] as Values
						)
					: values[key],
		};
	}, {});

	return dirtyValues;
}

export const TestSchema = z.object({
	questions: z.array(
		z.object({
			markedForReview: z.boolean(),
			answer: z.string().optional(),
			weight: z.enum(questionWeightEnum.enumValues),
			testId: z.string(),
			questionNumber: z.coerce.number(),
			questionId: z.string(),
			question: z.string(),
			options: z.array(
				z.object({
					id: z.string(),
					name: z.string(),
					questionId: z.string(),
				})
			),
		})
	),
});

type TestValues = z.infer<typeof TestSchema>;

const Test = ({
	onSuccess,
	test,
}: {
	onSuccess?: () => void;
	test: SelectTestWithQuestions;
}) => {
	const form = useForm<TestValues>({
		resolver: zodResolver(TestSchema),
		defaultValues: {
			questions: test.questions
				.map((question) => ({
					markedForReview: false,
					answer: "",
					testId: test.id,
					questionNumber: question.questionNumber,
					questionId: question.questionId,
					question: question.question.name ?? "",
					weight: question.question.weight,
					options: question.question.options.map((option) => ({
						id: option.id,
						name: option.name,
						questionId: option.questionId,
					})),
				}))
				.sort((a, b) => a.questionNumber - b.questionNumber),
		},
	});

	const { fields } = useFieldArray({
		control: form.control,
		name: "questions",
	});

	const onSubmit = (_values: TestValues) => {
		onSuccess?.();
	};

	console.log(getDirtyValues(form.formState.dirtyFields, form.getValues()));

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="container flex flex-col gap-12 md:flex-row">
					<div className="my-16 flex max-w-4xl flex-col gap-6">
						{fields.map((mfield, index) => (
							<FormField
								key={mfield.questionId}
								control={form.control}
								name={`questions.${index}.answer`}
								render={({ field }) => (
									<FormItem
										id={`question-number-${mfield.questionNumber}`}
										className="space-y-3"
									>
										<FormLabel className="flex select-none flex-row justify-between gap-4">
											<p className="whitespace-pre-line">
												{mfield.questionNumber}. {mfield.question}
											</p>
											<p className="whitespace-nowrap">
												[{mfield.weight} Marks]
											</p>
										</FormLabel>
										<FormControl>
											<RadioGroup
												onValueChange={(val) => {
													field.onChange(val);
													form.setValue(
														`questions.${index}.markedForReview`,
														false
													);
												}}
												defaultValue={field.value}
												className="flex flex-col space-y-1"
											>
												{mfield.options.map((option) => (
													<FormItem
														key={option.id}
														className="flex items-center space-x-3 space-y-0"
													>
														<FormControl>
															<RadioGroupItem value={option.id} />
														</FormControl>
														<FormLabel className="select-none font-normal">
															{option.name}
														</FormLabel>
													</FormItem>
												))}
											</RadioGroup>
										</FormControl>
										<FormMessage />
										<div className="flex flex-row gap-4">
											<Button
												size="sm"
												variant="link"
												onClick={() =>
													form.setValue(
														`questions.${index}.markedForReview`,
														true
													)
												}
											>
												Mark for Review
											</Button>
										</div>
									</FormItem>
								)}
							/>
						))}
					</div>

					<div className="relative">
						<div className="sticky top-0 flex h-screen flex-col justify-between gap-1 py-8">
							<div>
								<h2 className="text-lg uppercase ">
									TOTAL: {test.questions.length} questions <br />
									ATTEMPTED:{" "}
									{
										form
											.watch("questions")
											.filter((question) => !!question.answer).length
									}{" "}
									questions <br />
									REMAINING:{" "}
									{test.questions.length -
										form
											.watch("questions")
											.filter((question) => !!question.answer).length}{" "}
									questions
								</h2>

								<div className="flex flex-col gap-2 p-4 text-center">
									{test.endTime && (
										<Timer duration={2 * 60 * 60} endTime={test.endTime} />
									)}
								</div>
							</div>
							<div className="grid max-w-sm grid-cols-8 gap-1">
								{form.watch("questions").map((question) => (
									<Link
										key={`quick-preview-question-${question.questionNumber}`}
										className={buttonVariants({
											variant: question.answer
												? "secondary"
												: question.markedForReview
													? "ghost"
													: "default",
											size: "sm",
										})}
										href={`#question-number-${question.questionNumber}`}
									>
										{question.questionNumber}
									</Link>
								))}
							</div>
							<div className="flex flex-col gap-2">
								<Button type="submit" className="w-full">
									Submit
								</Button>
								<Button type="button" variant="destructive" className="w-full">
									Quit
								</Button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</Form>
	);
};

export default Test;
