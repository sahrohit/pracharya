"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import newVerification from "@/server/actions/new-verification";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";

const NewVerificationPage = () => {
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();

	const searchParams = useSearchParams();

	const token = searchParams?.get("token");

	const onSubmit = useCallback(() => {
		if (success ?? error) return;

		if (!token) {
			setError("Missing token!");
			return;
		}

		newVerification(token)
			.then((data) => {
				setSuccess(data.success);
				setError(data.error);
			})
			.catch(() => {
				setError("Something went wrong!");
			});
	}, [token, success, error]);

	useEffect(() => {
		onSubmit();
	}, [onSubmit]);

	return (
		<div className="flex w-full items-center justify-center">
			{!success && !error && <p>Loading...</p>}
			<FormSuccess message={success} />
			{!success && <FormError message={error} />}
		</div>
	);
};

export default NewVerificationPage;
