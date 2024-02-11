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

	const onSubmit = (_values: ReportFormValues) => {
		startTransition(() => {
			toast.success("Idea Form Submitted");
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
				<Button disabled={isPending} type="submit">
					Save
				</Button>
			</form>
		</Form>
	);
};

export default ReportForm;
