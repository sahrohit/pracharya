"use client";

import { useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
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
import { catchError } from "@/lib/catch-error";

export const NoteFormSchema = z.object({
	course: z.string().min(1, {
		message: "Title is required",
	}),
	chapter: z.string().min(1, {
		message: "Title is required",
	}),
	title: z.string().min(1, {
		message: "Title is required",
	}),
	description: z.string().min(1, {
		message: "Description is required",
	}),
});

type NoteFormValues = z.infer<typeof NoteFormSchema>;

interface NoteFormProps {
	initialValues?: Partial<NoteFormValues>;
}

const NoteForm = ({ initialValues }: NoteFormProps) => {
	const [isPending, startTransition] = useTransition();

	const form = useForm<NoteFormValues>({
		resolver: zodResolver(NoteFormSchema),
		defaultValues: initialValues,
	});

	const { mutateAsync } = api.issue.create.useMutation();

	const onSubmit = (values: NoteFormValues) => {
		startTransition(() => {
			toast.promise(
				mutateAsync({
					chapterId: values.chapter,
					title: values.title,
					description: values.description,
				}),
				{
					loading: "Creating Issue...",
					success: "Issue Created",
					error: catchError,
				}
			);
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
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Your Idea"
										disabled={isPending}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder="The more descriptive you are, the more it helps us to understand your idea."
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button className="w-full" disabled={isPending} type="submit">
					Request Update
				</Button>
			</form>
		</Form>
	);
};

export default NoteForm;
