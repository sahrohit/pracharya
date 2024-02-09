"use client";

import { useSession } from "next-auth/react";
import UserInfo from "@/components/user-info";

const ClientPage = () => {
	const session = useSession();

	return <UserInfo label="📱 Client component" user={session.data?.user} />;
};

export default ClientPage;
