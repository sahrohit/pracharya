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
import { api } from "@/trpc/react";
import { catchError } from "@/lib/catch-error";
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

export const TestFormSchema = z.object({
	examId: z.string(),
});

type TestFormValues = z.infer<typeof TestFormSchema>;

const TestForm = ({ onSuccess }: { onSuccess?: () => void }) => {
	const [isPending, startTransition] = useTransition();

	const form = useForm<TestFormValues>({
		resolver: zodResolver(TestFormSchema),
		defaultValues: {
			examId: undefined,
		},
	});

	const { mutateAsync } = api.test.create.useMutation();

	const onSubmit = (values: TestFormValues) => {
		startTransition(() => {
			toast.promise(mutateAsync(values), {
				loading: "Creating Exam...",
				success: () => {
					onSuccess?.();
					return "Exam Created";
				},
				error: catchError,
			});
		});
	};

	return (
		<Form {...form}>
			<form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
				<div className="space-y-4">
					<FormField
						control={form.control}
						name="examId"
						render={({ field }) => {
							const { data, isLoading } = api.exam.list.useQuery({});

							return (
								<FormItem className="flex w-full flex-col">
									<FormLabel>Exams</FormLabel>
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
														: field.value && data?.data
															? data?.data.find(
																	(exam) => exam.id === field.value
																)?.name
															: "Select Course"}
													<LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="p-0">
											<Command>
												<CommandInput placeholder="Search courses..." />
												<CommandEmpty>No exams found.</CommandEmpty>
												<CommandGroup>
													{data?.data?.map((exam) => (
														<CommandItem
															value={exam.id}
															key={exam.id}
															onSelect={() => {
																form.setValue("examId", exam.id);
															}}
														>
															<LuCheck
																className={cn(
																	"mr-2 h-4 w-4",
																	exam.id === field.value
																		? "opacity-100"
																		: "opacity-0"
																)}
															/>
															{exam.name}
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
				<Button disabled={isPending} type="submit">
					Create Exam
				</Button>
			</form>
		</Form>
	);
};

export default TestForm;
