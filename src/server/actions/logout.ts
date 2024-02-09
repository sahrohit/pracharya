"use server";

import { signOut } from "@/server/auth";

const logout = async () => {
	await signOut();
};

export default logout;
