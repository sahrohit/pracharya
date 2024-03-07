"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useSearchParams } from "next/navigation";

import { FaFacebook, FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/config/routes";

const Social = () => {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams?.get("callbackUrl");

	const onClick = async (provider: "google" | "github") => {
		await signIn(provider, {
			callbackUrl: callbackUrl ?? DEFAULT_LOGIN_REDIRECT,
		});
	};

	return (
		<div className="flex w-full flex-col gap-2">
			<Button
				size="lg"
				className="flex w-full flex-row gap-2"
				variant="outline"
				onClick={() => onClick("google")}
			>
				<FcGoogle className="h-5 w-5" />
				Continue with Google
			</Button>
			<div className="relative flex justify-center text-xs uppercase">
				<span className="bg-background px-2 text-muted-foreground">Or</span>
			</div>
			<Button
				disabled
				size="lg"
				className="flex w-full flex-row gap-2"
				variant="outline"
				onClick={() => onClick("google")}
			>
				<FaGithub className="h-5 w-5" />
				Continue with Github
			</Button>
			<div className="relative flex justify-center text-xs uppercase">
				<span className="bg-background px-2 text-muted-foreground">Or</span>
			</div>
			<Button
				disabled
				size="lg"
				className="flex w-full flex-row gap-2"
				variant="outline"
				onClick={() => onClick("google")}
			>
				<FaFacebook className="h-5 w-5" />
				Continue with Facebook
			</Button>
		</div>
	);
};

export default Social;
