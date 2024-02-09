"use client";

import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { type z } from "zod";
import { toast } from "sonner";
import { useTransition } from "react";
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
import login from "@/server/actions/login";
import { LoginFormSchema } from "@/components/schema/auth";

export type LoginFormValues = z.infer<typeof LoginFormSchema>;

const LoginForm = () => {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams?.get("callbackUrl");
	const urlError =
		searchParams?.get("error") === "OAuthAccountNotLinked"
			? "Email already in use with different provider!"
			: "";

	const [isPending, startTransition] = useTransition();

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(LoginFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (values: LoginFormValues) => {
		startTransition(async () => {
			const loginToast = toast.loading("Logging in...");

			const res = await login(values, callbackUrl);

			if (res?.success) {
				toast.success(res?.success, {
					id: loginToast,
				});
			} else if (res?.error) {
				toast.error(res?.error, {
					id: loginToast,
				});
			} else if (urlError) {
				toast.error(urlError, {
					id: loginToast,
				});
			}
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
										disabled={form.formState.isSubmitting || isPending}
										placeholder="name@example.com"
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
										disabled={form.formState.isSubmitting || isPending}
										placeholder="********"
										type="password"
									/>
								</FormControl>
								<Button
									size="sm"
									variant="link"
									asChild
									className="px-0 font-normal"
								>
									<Link href="/auth/reset">Forgot password?</Link>
								</Button>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button
					disabled={form.formState.isSubmitting || isPending}
					type="submit"
					className="w-full"
				>
					Sign In
				</Button>
			</form>
		</Form>
	);
};

export default LoginForm;
