"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useSession } from "next-auth/react";

import { toast } from "sonner";
import { type z } from "zod";
import { Switch } from "@/components/ui/switch";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import settings from "@/server/actions/settings";
import {
	Form,
	FormField,
	FormControl,
	FormItem,
	FormLabel,
	FormDescription,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SettingsFormSchema } from "@/components/schema/settings";

type SettingFormValues = z.infer<typeof SettingsFormSchema>;

const SettingsForm = () => {
	const session = useSession();

	const [isPending, startTransition] = useTransition();

	const form = useForm<SettingFormValues>({
		resolver: zodResolver(SettingsFormSchema),
		defaultValues: {
			password: undefined,
			newPassword: undefined,
			name: session.data?.user?.name ?? undefined,
			email: session.data?.user?.email ?? undefined,
			role: session.data?.user?.role ?? undefined,
		},
	});

	const onSubmit = (values: SettingFormValues) => {
		startTransition(() => {
			toast.promise(settings(values), {
				loading: "Updating settings...",
				success: async () => {
					await session.update();
					return "Settings updated!";
				},
				error: "Something went wrong!",
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
										placeholder="John Doe"
										disabled={isPending}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{session.data?.user?.isOAuth === false && (
						<>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="john.doe@example.com"
												type="email"
												disabled={isPending}
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
												placeholder="******"
												type="password"
												disabled={isPending}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="newPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>New Password</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="******"
												type="password"
												disabled={isPending}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</>
					)}
					<FormField
						control={form.control}
						name="role"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Role</FormLabel>
								<Select
									disabled={isPending}
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a role" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="ADMIN">Admin</SelectItem>
										<SelectItem value="USER">User</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					{session.data?.user?.isOAuth === false && (
						<FormField
							control={form.control}
							name="isTwoFactorEnabled"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
									<div className="space-y-0.5">
										<FormLabel>Two Factor Authentication</FormLabel>
										<FormDescription>
											Enable two factor authentication for your account
										</FormDescription>
									</div>
									<FormControl>
										<Switch
											disabled={isPending}
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					)}
				</div>
				<Button disabled={isPending} type="submit">
					Save
				</Button>
			</form>
		</Form>
	);
};

export default SettingsForm;
