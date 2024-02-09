import { db } from "@/server/db";

export const getVerificationTokenByToken = async (token: string) => {
	try {
		const verificationToken = await db.query.verificationTokens.findFirst({
			where: (vt, { eq }) => eq(vt.token, token),
		});

		return verificationToken;
	} catch {
		return null;
	}
};

export const getVerificationTokenByEmail = async (email: string) => {
	try {
		const verificationToken = await db.query.verificationTokens.findFirst({
			where: (vt, { eq }) => eq(vt.email, email),
		});

		return verificationToken;
	} catch {
		return null;
	}
};
