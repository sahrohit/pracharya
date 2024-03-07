"use client";

import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { LuCheck, LuChevronDown } from "react-icons/lu";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { questionWeightEnum } from "@/server/db/schema";
import { api } from "@/trpc/react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import DashboardHeader from "@/components/layouts/dashboard/header";

export const PatternFormSchema = z.object({
	patterns: z.array(
		z.object({
			questionNumber: z.number(),
			subChapterId: z.string().nullable(),
			weight: z.enum(questionWeightEnum.enumValues),
		})
	),
});

type PatternFormValues = z.infer<typeof PatternFormSchema>;

const ExamPatternEdit = ({ params }: { params: { examId: string } }) => {
	const [
		{ data: subChapters, isLoading: subChaptersLoading },
		{ data: exam, isLoading },
	] = api.useQueries((t) => [
		t.subChapter.get(
			{},
			{
				cacheTime: 1000 * 60,
			}
		),
		t.exam.get({ id: params.examId }),
	]);

	const form = useForm<PatternFormValues>({
		resolver: zodResolver(PatternFormSchema),
		defaultValues: {
			patterns: exam?.patterns.map((pattern) => ({
				questionNumber: pattern.questionNumber,
				subChapterId: pattern.subChapterId,
				weight: pattern.weight,
			})),
		},
	});

	const { fields } = useFieldArray({
		name: "patterns",
		control: form.control,
	});

	const fullMarks = useMemo(
		() =>
			form
				.getValues("patterns")
				?.reduce((acc, field) => acc + +field.weight, 0),
		[form.getValues("patterns")]
	);

	const onSubmit = (values: PatternFormValues) => {
		console.log("Values", values);
	};

	useEffect(() => {
		if (exam) {
			form.setValue(
				"patterns",
				exam.patterns.map((pattern) => ({
					questionNumber: pattern.questionNumber,
					subChapterId: pattern.subChapterId,
					weight: pattern.weight,
				}))
			);
		}
	}, [exam]);

	return (
		<Form {...form}>
			<form
				className="flex flex-col gap-4"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<DashboardHeader
					heading={exam?.name ?? "Exam"}
					text="Pattern of the given exam can be edited here."
				>
					<div className="flex flex-row gap-2">
						<p>Full Marks: {fullMarks}</p>
						<Button variant="outline" type="submit">
							Save
						</Button>
					</div>
				</DashboardHeader>
				<div className="rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[100px]">No.</TableHead>
								<TableHead>Sub Chapter Id</TableHead>
								<TableHead className="text-right">Weight</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{isLoading || subChaptersLoading ? (
								Array.from({ length: 100 }).map((_, i) => (
									<TableRow
										key={`table-body-row-${i + 1}`}
										className="hover:bg-transparent"
									>
										{Array.from({ length: 3 }).map((_, i) => (
											<TableCell key={`table-body-column-${i + 1}`}>
												<Skeleton className="h-6 w-full" />
											</TableCell>
										))}
									</TableRow>
								))
							) : fields.length ? (
								fields.map((field, index) => (
									<TableRow key={`question-row-${index + 1}`}>
										<TableCell className="font-medium">
											{field.questionNumber}
										</TableCell>
										<TableCell className="w-full">
											<FormField
												control={form.control}
												name={`patterns.${index}.subChapterId`}
												render={({ field }) => (
													<FormItem className="flex flex-col">
														<Popover>
															<PopoverTrigger asChild>
																<FormControl>
																	<Button
																		variant="outline"
																		role="combobox"
																		className={cn(
																			" justify-between",
																			!field.value && "text-muted-foreground"
																		)}
																	>
																		{field.value
																			? subChapters?.find(
																					(subChapter) =>
																						subChapter.id === field.value
																				)?.name
																			: "Select Sub Chapters"}
																		<LuChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
																	</Button>
																</FormControl>
															</PopoverTrigger>
															<PopoverContent className="p-0">
																<Command>
																	<CommandInput placeholder="Search Sub Chapters..." />
																	<CommandEmpty>
																		No Sub Chapters found.
																	</CommandEmpty>
																	<CommandGroup>
																		{subChapters?.map((subChapter) => (
																			<CommandItem
																				value={subChapter.id}
																				key={subChapter.id}
																				onSelect={() => {
																					form.setValue(
																						`patterns.${index}.subChapterId`,
																						subChapter.id
																					);
																				}}
																			>
																				<LuCheck
																					className={cn(
																						"mr-2 h-4 w-4",
																						subChapter.id === field.value
																							? "opacity-100"
																							: "opacity-0"
																					)}
																				/>
																				{subChapter.name}
																			</CommandItem>
																		))}
																	</CommandGroup>
																</Command>
															</PopoverContent>
														</Popover>
													</FormItem>
												)}
											/>
										</TableCell>
										<TableCell className="w-full">
											<FormField
												control={form.control}
												name={`patterns.${index}.weight`}
												render={({ field }) => (
													<FormItem>
														<Select
															onValueChange={(val) => field.onChange(val)}
															defaultValue={field.value}
														>
															<FormControl>
																<SelectTrigger className="w-[100px]">
																	<SelectValue placeholder="Select Weight" />
																</SelectTrigger>
															</FormControl>
															<SelectContent>
																{questionWeightEnum.enumValues.map((weight) => (
																	<SelectItem
																		key={`${index + 1}-${weight}`}
																		value={weight}
																	>
																		{weight}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
													</FormItem>
												)}
											/>
										</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell colSpan={3} className="h-24 text-center">
										No results.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
			</form>
		</Form>
	);
};

export default ExamPatternEdit;
