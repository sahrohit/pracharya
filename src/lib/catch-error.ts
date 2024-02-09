import { TRPCError } from "@trpc/server";
import { toast } from "sonner";
import { z } from "zod";

export const catchError = (
	err: unknown,
	fallback = "Something went wrong, please try again later."
) => {
	if (err instanceof z.ZodError) {
		const errors = err.issues.map((issue) => issue.message);
		return errors.join("\n");
	}
	if (err instanceof TRPCError) {
		return err.message;
	}
	if (err instanceof Error) {
		return err.message;
	}
	return fallback;
};

export const catchErrorWithToast = (
	err: unknown,
	fallback = "Something went wrong."
) => {
	if (err instanceof z.ZodError) {
		const errors = err.issues.map((issue) => issue.message);
		return toast(errors.join("\n"));
	}
	if (err instanceof TRPCError) {
		return toast(err.message);
	}
	if (err instanceof Error) {
		return toast(err.message);
	}
	return toast(fallback);
};
