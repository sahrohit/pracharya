"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useSearchParams } from "next/navigation";

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
		<Button
			size="lg"
			className="flex w-full flex-row gap-2"
			variant="outline"
			onClick={() => onClick("google")}
		>
			<FcGoogle className="h-5 w-5" />
			Continue with Google
		</Button>
	);
};

export default Social;
