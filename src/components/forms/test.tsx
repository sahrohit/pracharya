/* eslint-disable @typescript-eslint/no-unsafe-member-access */

"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
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

export const TestSchema = z.object({
	questions: z.array(
		z.object({
			answer: z.string(),
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
			questions: [],
		},
	});

	const { fields } = useFieldArray({
		control: form.control,
		name: "questions",
	});

	const onSubmit = (_values: TestValues) => {
		onSuccess?.();
		// toast.promise(mutateAsync(values), {
		// 	loading: "Creating Exam...",
		// 	success: () => {
		// 		onSuccess?.();
		// 		return "Exam Created";
		// 	},
		// 	error: catchError,
		// });
	};

	useEffect(
		() =>
			form.setValue(
				"questions",
				test.questions
					.map((question) => ({
						answer: "",
						testId: test.id,
						questionNumber: question.questionNumber,
						questionId: question.questionId,
						question: question.question.name ?? "",
						options: question.question.options.map((option) => ({
							id: option.id,
							name: option.name,
							questionId: option.questionId,
						})),
					}))
					.sort((a, b) => a.questionNumber - b.questionNumber)
			),
		[test]
	);

	return (
		<Form {...form}>
			<form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
				{fields.map((mfield, index) => (
					<FormField
						key={mfield.questionId}
						control={form.control}
						name={`questions.${index}.answer`}
						render={({ field }) => (
							<FormItem className="space-y-3">
								<FormLabel>
									{mfield.questionNumber}. {mfield.question}
								</FormLabel>
								<FormControl>
									<RadioGroup
										onValueChange={field.onChange}
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
												<FormLabel className="font-normal">
													{option.name}
												</FormLabel>
											</FormItem>
										))}
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				))}

				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
};

export default Test;
