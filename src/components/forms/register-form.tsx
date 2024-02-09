"use client";

import { type z } from "zod";
import { useForm } from "react-hook-form";
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
import register from "@/server/actions/register";
import { RegisterFormSchema } from "@/components/schema/auth";
import { catchError } from "@/lib/catch-error";

export type RegisterFormValues = z.infer<typeof RegisterFormSchema>;

const RegisterForm = () => {
	const form = useForm<RegisterFormValues>({
		resolver: zodResolver(RegisterFormSchema),
		defaultValues: {
			email: "",
			password: "",
			name: "",
		},
	});

	const onSubmit = (values: RegisterFormValues) => {
		toast.promise(register(values), {
			loading: "Registering...",
			success: "Verification email sent!",
			error: catchError,
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
										disabled={form.formState.isSubmitting}
										placeholder="John Doe"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										{...field}
										disabled={form.formState.isSubmitting}
										placeholder="john.doe@example.com"
										type="email"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										{...field}
										disabled={form.formState.isSubmitting}
										placeholder="******"
										type="password"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button
					disabled={form.formState.isSubmitting}
					type="submit"
					className="w-full"
				>
					Create an account
				</Button>
			</form>
		</Form>
	);
};

export default RegisterForm;
