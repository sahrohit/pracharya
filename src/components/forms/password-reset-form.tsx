"use client";

import type * as z from "zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import reset from "@/server/actions/reset";
import { catchError } from "@/lib/catch-error";
import { ResetPasswordSchema } from "../schema/auth";

const PasswordResetForm = () => {
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof ResetPasswordSchema>>({
		resolver: zodResolver(ResetPasswordSchema),
		defaultValues: {
			email: "",
		},
	});

	const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
		startTransition(async () => {
			toast.promise(reset(values), {
				loading: "Sending reset email...",
				success: "Reset email sent!",
				error: catchError,
			});
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<div className="space-y-4">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										{...field}
										disabled={isPending}
										placeholder="john.doe@example.com"
										type="email"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button disabled={isPending} type="submit" className="w-full">
					Send reset email
				</Button>
			</form>
		</Form>
	);
};

export default PasswordResetForm;
