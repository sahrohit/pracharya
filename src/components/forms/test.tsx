/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
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
import { type SelectTestWithQuestionsForTest } from "@/server/db/types";
import { api } from "@/trpc/react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { catchError } from "@/lib/catch-error";

const Timer = dynamic(() => import("@/components/shared/timer"), {
	ssr: false,
});

dayjs.extend(relativeTime);

export const TestSchema = z.object({
	questions: z.array(
		z.object({
			markedForReview: z.boolean(),
			answer: z.string().optional(),
			testId: z.string(),
			questionId: z.string(),
		})
	),
});

type TestValues = z.infer<typeof TestSchema>;

const Test = ({
	onSuccess,
	test,
}: {
	onSuccess?: () => void;
	test: SelectTestWithQuestionsForTest;
}) => {
	const router = useRouter();
	const { mutateAsync: updateTestQuestion } =
		api.test.updateTestQuestion.useMutation();

	const { mutateAsync: submitTest } = api.test.submitTest.useMutation();

	const form = useForm<TestValues>({
		resolver: zodResolver(TestSchema),
		defaultValues: {
			questions: test.questions
				.sort((a, b) => a.questionNumber - b.questionNumber)
				.map((question) => ({
					markedForReview: !!question.markedForReview,
					answer: question.selectedAnswer ?? undefined,
					testId: test.id,
					questionId: question.questionId,
				})),
		},
	});

	const onSubmit = (values: TestValues) => {
		form.formState.dirtyFields.questions
			?.map((question, index) => question.answer && index)
			.filter((val) => val !== null && val !== false)
			.forEach(async (val) => {
				await updateTestQuestion({
					markedForReview: !!values.questions[val as number]?.markedForReview,
					answer: values.questions[val as number]?.answer,
					testId: test.id,
					questionId: test.questions[val as number]?.questionId ?? "",
				});
			});

		form.reset({}, { keepValues: true });
		onSuccess?.();
	};

	useEffect(() => {
		const subscription = form.watch(() => form.handleSubmit(onSubmit)());
		return () => subscription.unsubscribe();
	}, [form.handleSubmit, form.watch]);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="container flex flex-col gap-12 md:flex-row">
					<div className="my-16 flex max-w-4xl flex-col gap-6">
						{test.questions
							.sort((a, b) => a.questionNumber - b.questionNumber)
							.map((question, index) => (
								<FormField
									key={question.questionId}
									control={form.control}
									name={`questions.${index}.answer`}
									render={({ field }) => (
										<FormItem
											id={`question-number-${question.questionNumber}`}
											className="space-y-3"
										>
											<FormLabel className="flex select-none flex-row justify-between gap-4">
												<p className="whitespace-pre-line">
													{question.questionNumber}. {question.question.name}
												</p>
												<p className="whitespace-nowrap">
													[{question.question.weight} Marks]
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
													{question.question.options.map((option) => (
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
								{form.watch("questions").map((question, index) => (
									<Link
										key={`quick-preview-question-${index + 1}`}
										className={buttonVariants({
											variant: question.answer
												? "secondary"
												: question.markedForReview
													? "ghost"
													: "default",
											size: "sm",
										})}
										href={`#question-number-${index + 1}`}
									>
										{index + 1}
									</Link>
								))}
							</div>
							<div className="flex flex-col gap-2">
								<AlertDialog>
									<AlertDialogTrigger asChild>
										<Button type="button" className="w-full">
											Submit
										</Button>
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>
												Are you absolutely sure you want to submit this test?
											</AlertDialogTitle>
											<AlertDialogDescription>
												Once submitted, you will not be able to change your
												answers.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel>Cancel</AlertDialogCancel>
											<AlertDialogAction
												onClick={() =>
													toast.promise(
														submitTest({
															testId: test.id,
														}),
														{
															loading: "Submitting Test...",
															success: () => {
																router.push(`/report/${test.id}`);
																return "Test Submitted";
															},
															error: catchError,
														}
													)
												}
											>
												Continue
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
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
