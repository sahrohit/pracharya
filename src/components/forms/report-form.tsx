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
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";
import { catchError } from "@/lib/catch-error";

export const ReportFormSchema = z.object({
	title: z.string().min(1, {
		message: "Title is required",
	}),
	description: z.string().min(1, {
		message: "Description is required",
	}),
});

type ReportFormValues = z.infer<typeof ReportFormSchema>;

const ReportForm = () => {
	const [isPending, startTransition] = useTransition();

	const form = useForm<ReportFormValues>({
		resolver: zodResolver(ReportFormSchema),
		defaultValues: {
			title: "",
			description: "",
		},
	});

	const { mutateAsync } = api.issue.create.useMutation();

	const onSubmit = (values: ReportFormValues) => {
		startTransition(() => {
			toast.promise(
				mutateAsync({
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
					Report Issue
				</Button>
			</form>
		</Form>
	);
};

export default ReportForm;
