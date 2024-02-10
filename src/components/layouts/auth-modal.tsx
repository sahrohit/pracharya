"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import useAuthModal from "@/components/store/use-auth-modal";
import { Button } from "@/components/ui/button";
import Modal from "@/components/shared/modal";
import LoginForm from "@/components/forms/login-form";
import Logo from "@/components/logo";
import Social from "../auth/social";

const AuthModal = () => {
	const router = useRouter();
	const authModal = useAuthModal();
	const [signInClicked, setSignInClicked] = useState(false);

	return (
		<Modal showModal={authModal.isOpen} setShowModal={authModal.onClose}>
			<div className="w-full">
				<div className="flex flex-col items-center justify-center space-y-3 border-b bg-card px-4 py-6 pt-8 text-center md:px-16">
					<Logo className="size-10" />
					<h3 className="font-urban text-2xl font-bold">Sign In</h3>
					<Button
						disabled={signInClicked}
						className="flex flex-row gap-1 bg-card text-primary underline-offset-4 hover:bg-card "
						onClick={async () => {
							setSignInClicked(true);
							router.push("/auth/register");
							authModal.onClose();
							setSignInClicked(false);
						}}
					>
						Don&apos;t have an account?
						<span className="underline underline-offset-4"> Sign Up</span>
					</Button>
					<Social />
				</div>
				<div className="flex flex-col space-y-4 bg-card px-4 py-8 md:px-16">
					<LoginForm />
				</div>
			</div>
		</Modal>
	);
};

export default AuthModal;
