"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";

import { toast } from "sonner";
import { z } from "zod";
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
import { api } from "@/trpc/react";
import { catchError } from "@/lib/catch-error";

export const ExamFormSchema = z.object({
	name: z.string(),
	questions: z.number(),
});

type ExamFormValues = z.infer<typeof ExamFormSchema>;

const ExamForm = () => {
	const [isPending, startTransition] = useTransition();

	const form = useForm<ExamFormValues>({
		resolver: zodResolver(ExamFormSchema),
		defaultValues: {
			name: undefined,
			questions: 100,
		},
	});

	const { mutateAsync } = api.exam.create.useMutation();

	const onSubmit = (values: ExamFormValues) => {
		startTransition(() => {
			toast.promise(mutateAsync(values), {
				loading: "Creating Exam...",
				success: "Exam Created",
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
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="License Exam"
										disabled={isPending}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="questions"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Number of Questions</FormLabel>
								<FormControl>
									<Input {...field} placeholder="100" disabled={isPending} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button disabled={isPending} type="submit">
					Create Exam
				</Button>
			</form>
		</Form>
	);
};

export default ExamForm;
