import Link from "next/link";
import Social from "@/components/auth/social";
import NewPasswordForm from "@/components/forms/new-password-form";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardContent,
	CardFooter,
} from "@/components/ui/card";

const NewPasswordPage = () => (
	<div className="grid h-screen w-full place-items-center bg-zinc-900">
		<Card className="w-[400px] shadow-md">
			<CardHeader>
				<div className="flex w-full flex-col items-center justify-center gap-y-4">
					<h1 className="text-3xl font-semibold">Enter your New Password</h1>
					<p className="text-sm text-muted-foreground">
						You`ll be logged out of all other devices.
					</p>
				</div>
			</CardHeader>
			<CardContent>
				<NewPasswordForm />
			</CardContent>
			<CardFooter className="flex flex-col gap-2">
				<Button variant="link" className="w-full font-normal" size="sm" asChild>
					<Link href="/auth/login">Dont need a reset, Login?</Link>
				</Button>
			</CardFooter>
		</Card>
	</div>
);

export default NewPasswordPage;
