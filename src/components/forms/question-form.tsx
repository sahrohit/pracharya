"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";

import { toast } from "sonner";
import { z } from "zod";
import { LuCheck, LuChevronsUpDown } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormField,
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { api } from "@/trpc/react";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";

export const QuestionFormSchema = z.object({
	course: z.string().min(1, {
		message: "Course is required",
	}),
	chapter: z.string().min(1, {
		message: "Chapter is required",
	}),
	name: z.string().min(1, {
		message: "Name is required",
	}),
	options: z.array(
		z.object({
			name: z.string().describe("Variant Name"),
			isAnswer: z.coerce.boolean().describe("Variant Symbol"),
		})
	),
	answer: z.string().describe("Answer"),
});

type QuestionFormValues = z.infer<typeof QuestionFormSchema>;

interface QuestionFormProps {
	initialValues?: Partial<QuestionFormValues>;
}

const QuestionForm = ({ initialValues }: QuestionFormProps) => {
	const [isPending, startTransition] = useTransition();

	const form = useForm<QuestionFormValues>({
		resolver: zodResolver(QuestionFormSchema),
		defaultValues: initialValues ?? {
			course: "",
			chapter: "",
			name: "",
			options: [
				{ name: "", isAnswer: false },
				{ name: "", isAnswer: false },
				{ name: "", isAnswer: false },
				{ name: "", isAnswer: false },
			],
		},
	});

	const { fields } = useFieldArray({
		control: form.control,
		name: "options",
	});

	const onSubmit = (_values: QuestionFormValues) => {
		startTransition(() => {
			toast.info("Working on it");
		});
	};

	return (
		<Form {...form}>
			<form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
				<div className="space-y-4">
					<div className="flex w-full flex-col gap-2 md:flex-row">
						<FormField
							control={form.control}
							name="course"
							render={({ field }) => {
								const { data, isLoading } = api.course.get.useQuery({});

								return (
									<FormItem className="flex w-full flex-col">
										<FormLabel>Courses</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant="outline"
														role="combobox"
														className={cn(
															"justify-between",
															!field.value && "text-muted-foreground"
														)}
													>
														{isLoading
															? "Loading..."
															: field.value && data
																? data.find(
																		(course) => course.id === field.value
																	)?.name
																: "Select Course"}
														<LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="p-0">
												<Command>
													<CommandInput placeholder="Search courses..." />
													<CommandEmpty>No courses found.</CommandEmpty>
													<CommandGroup>
														{data?.map((course) => (
															<CommandItem
																value={course.id}
																key={course.id}
																onSelect={() => {
																	form.setValue("course", course.id);
																}}
															>
																<LuCheck
																	className={cn(
																		"mr-2 h-4 w-4",
																		course.id === field.value
																			? "opacity-100"
																			: "opacity-0"
																	)}
																/>
																{course.name}
															</CommandItem>
														))}
													</CommandGroup>
												</Command>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								);
							}}
						/>

						<FormField
							control={form.control}
							name="chapter"
							render={({ field }) => {
								const { data, isLoading } = api.chapter.get.useQuery({});

								return (
									<FormItem className="flex w-full flex-col">
										<FormLabel>Chapter</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant="outline"
														role="combobox"
														className={cn(
															"justify-between",
															!field.value && "text-muted-foreground"
														)}
													>
														{isLoading
															? "Loading..."
															: field.value && data
																? data.find(
																		(chapter) => chapter.id === field.value
																	)?.name
																: "Select Chapter"}
														<LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="p-0">
												<Command>
													<CommandInput placeholder="Search chapters..." />
													<CommandEmpty>No chapters found.</CommandEmpty>
													<CommandGroup>
														{data?.map((chapter) => (
															<CommandItem
																value={chapter.id}
																key={chapter.id}
																onSelect={() => {
																	form.setValue("chapter", chapter.id);
																}}
															>
																<LuCheck
																	className={cn(
																		"mr-2 h-4 w-4",
																		chapter.id === field.value
																			? "opacity-100"
																			: "opacity-0"
																	)}
																/>
																{chapter.name}
															</CommandItem>
														))}
													</CommandGroup>
												</Command>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
					</div>

					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Question"
										disabled={isPending}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="grid grid-cols-1 gap-2 md:grid-cols-2">
						{fields.map((field, index) => (
							<FormField
								control={form.control}
								name={`options.${index}.name`}
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Option {index + 1}</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						))}
					</div>
				</div>
				<FormField
					control={form.control}
					name="answer"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Answer</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select a verified email to display" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{form.watch("options").map((option) => {
										if (!option.name) {
											return null;
										}

										return (
											<SelectItem value={option.name}>{option.name}</SelectItem>
										);
									})}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button disabled={isPending} type="submit">
					Create Issue
				</Button>
			</form>
		</Form>
	);
};

export default QuestionForm;
